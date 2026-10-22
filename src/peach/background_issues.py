"""后台服务此刻存在的问题：任务中心「需要处理」那一块的数据源。

每一项是一种持续状态（调度连续失败、公网入口断开、网络不通），不是跑过的一轮，所以
不写 `task_run`：那张表每类只留 20 条，持续状态写进去会被挤掉，修好以后还会剩下旧记录。
这里每次请求现读各服务自己的快照，问题消失这一项就不在了。

一项只说是什么、从什么时候开始、去哪儿处理；原因由 `href` 指向的那个设置位置自己讲，
这里不再复述一遍。高频逐条的失败（站点圆标、头像、单个推送文件）不进来：它们各自有
任务记录，汇总在这里只会刷屏。

时间分两种：`since` 是服务自己记下的起点，只有两个调度有（连续失败里第一轮的开始）；
其余服务不记失败时刻，`noticed_at` 是这个进程第一次读到这一项的时间，会晚于实际发生，
重启后重新计。两者不互相顶替。

加一类问题就是往 `PROVIDERS` 里加一个函数：读 `(app_state, contract, config)`，
返回零到多条 `Issue`。服务没装配时 `getattr` 拿到 None，函数照样返回空。
"""
from __future__ import annotations

import logging
import threading
import time
from dataclasses import asdict, dataclass
from datetime import datetime, timezone
from typing import Any, Callable, Iterable

LOGGER = logging.getLogger(__name__)


@dataclass(frozen=True)
class Issue:
    key: str
    title: str
    href: str
    since: str | None = None
    #: 能一键重试时的 POST 地址；只给自成一体、不需要表单与修订号的动作。
    retry: str | None = None
    #: 重试接口在只读端会被写入端闸门挡掉，界面据此把按钮置灰。
    retry_available: bool = False


def _stamp(moment: float) -> str:
    return datetime.fromtimestamp(moment, timezone.utc).isoformat().replace("+00:00", "Z")


def _push_discovery(state, _contract, _config) -> list[Issue]:
    service = getattr(state, "push_discovery", None)
    if service is None:
        return []
    snapshot = service.snapshot()
    if not snapshot.get("enabled"):
        return []
    href = "/settings/library#pushDiscovery"
    issues = []
    if snapshot["queue"].get("last_error"):
        issues.append(Issue("push-discovery", "自动发现新文件入库失败", href))
    if snapshot.get("watch_local") and not snapshot.get("local_running") and snapshot.get("local_message"):
        issues.append(Issue("push-discovery-watch", "本机文件夹监视没有运行", href))
    return issues


def _downloads(_state, contract, _config) -> list[Issue]:
    service = getattr(contract, "downloads", None)
    if service is None or not service.available:
        return []
    from .downloads import TRACKED_STATES
    marks = ",".join("?" * len(TRACKED_STATES))
    with contract.database.read_connection() as connection:
        (count,) = connection.execute(
            f"SELECT count(*) FROM download_task WHERE state IN ({marks}) "
            "AND coalesce(failure_detail, '') <> ''", tuple(TRACKED_STATES)).fetchone()
    if not count:
        return []
    return [Issue("downloads", f"{count} 个云下载任务对账暂时失败", "/tasks#cloudDownloads")]


def _scheduler(attribute: str, key: str, title: str, href: str, retry: str):
    def provider(_state, contract, _config) -> list[Issue]:
        scheduler = getattr(contract, attribute, None)
        if scheduler is None:
            return []
        status = scheduler.status()
        if not status.get("enabled") or status.get("running") or not status.get("last_error"):
            return []
        return [Issue(key, title, href, since=status.get("failing_since"), retry=retry,
                      retry_available=bool(status.get("available")))]
    return provider


def _tunnel(state, _contract, config) -> list[Issue]:
    manager = getattr(state, "tunnel", None)
    # 残留的状态文件在停用后仍带着上一次的错误，所以先看是不是开着。
    if manager is None or config is None or not config.tunnel.enabled:
        return []
    if not manager.snapshot().error:
        return []
    return [Issue("tunnel", "公网入口连接失败", "/settings/network#tunnel")]


def _library_sharing(_state, _contract, config) -> list[Issue]:
    if config is None:
        return []
    from . import library_sharing
    if library_sharing.snapshot(config)["last_attempt"].get("status") != "failed":
        return []
    return [Issue("library-sharing", "馆藏分享上传失败", "/settings/maintenance#librarySharing")]


def _automatic_updates(state, _contract, _config) -> list[Issue]:
    service = getattr(state, "automatic_updates", None)
    if service is None or not service.snapshot().get("error"):
        return []
    return [Issue("automatic-updates", "自动更新出错", "/settings/maintenance#automaticUpdates")]


def _amane_bridge(_state, contract, _config) -> list[Issue]:
    tools_root = getattr(contract, "tools_root", None)
    if tools_root is None:
        return []
    from .metadata_amane import bridge_python
    if bridge_python(tools_root).is_file():
        return []
    return [Issue("amane-bridge", "amane 桥未安装", "/sources#amane")]


def _network(state, _contract, _config) -> list[Issue]:
    monitor = getattr(state, "network_reachability", None)
    # 只读快照，不在这里启动探测：探测线程由页面读 `/api/network-status` 时拉起。
    if monitor is None or monitor.summary().get("state") != "offline":
        return []
    return [Issue("network", "网络不通", "/settings/network#peachProxy")]


Provider = Callable[[Any, Any, Any], Iterable[Issue]]

PROVIDERS: tuple[Provider, ...] = (
    _network,
    _tunnel,
    _scheduler("follow_scheduler", "follow-schedule", "关注自动检查失败",
               "/settings/subscriptions#followScheduleSetting", "/api/follow/schedule/run"),
    _scheduler("feed_scheduler", "feed-schedule", "订阅源自动拉取失败",
               "/settings/subscriptions#feedScheduleSetting", "/api/feeds/schedule/run"),
    _push_discovery,
    _downloads,
    _automatic_updates,
    _library_sharing,
    _amane_bridge,
)


class IssueLog:
    """记下每一项第一次被读到的时刻；那一项消失就忘掉，再出现时重新计。"""

    def __init__(self, clock: Callable[[], float] = time.time):
        self.clock = clock
        self._lock = threading.Lock()
        self._noticed: dict[str, str] = {}

    def collect(self, state, contract, config, providers: Iterable[Provider] = PROVIDERS) -> list[dict]:
        issues: list[Issue] = []
        for provider in providers:
            try:
                issues.extend(provider(state, contract, config))
            except Exception:  # 一个服务读坏了不该让整块消失
                LOGGER.exception("读取后台问题失败：%s", getattr(provider, "__name__", provider))
        now = _stamp(self.clock())
        with self._lock:
            current = {issue.key for issue in issues}
            for key in set(self._noticed) - current:
                del self._noticed[key]
            rows = []
            for issue in issues:
                noticed = self._noticed.setdefault(issue.key, now)
                rows.append({**asdict(issue), "noticed_at": noticed})
        return rows
