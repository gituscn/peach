"""明确同意的馆藏与口味研究快照，与错误诊断使用独立接收项目。"""
from __future__ import annotations

import json
import math
import threading
import time
import uuid
from collections import defaultdict
from datetime import datetime, timezone
from urllib.parse import urlsplit

from . import __version__, remote_reporting
from .fsutil import atomic_write_text

SCHEMA = 1
MAX_BYTES = 10 * 1024 * 1024
FIELDS = [
    "作品编号、同编号文件数量、标签、规范人物／创作者／厂牌／系列名称、媒体类型与时长",
    "每部作品的评分、喜欢状态、累计播放次数和观看比例；不含观看时间点",
    "出演者、创作者、标签、厂牌、系列、年代和时长偏好的名称、强度与证据来源类别",
    "Peach 版本、字段版本和 UTC 自然周；不含跨周期安装标识",
]
NOTICE = ("用于 Peach 用户群体的馆藏结构与偏好研究。明细可反映你的成人内容偏好，不能保证匿名。"
          "不发送账号、设备标识、文件名、路径、标题、媒体、网址、搜索词或逐条浏览／观看记录。"
          "开启后每个 UTC 自然周最多尝试上传一份最新快照至独立 Sentry 项目；接收服务会接触连接 IP。"
          "可随时关闭；关闭停止后续发送，已经发送的数据无法通过本机开关撤回。")


def _path(config):
    return config.directory("state") / "library-sharing.json"


def consent(config):
    value = remote_reporting._read(_path(config))
    return value if value.get("enabled") is True and value.get("schema") == SCHEMA else {}


def target():
    destination = remote_reporting.dsn("PEACH_LIBRARY_SENTRY_DSN", "library_dsn")
    diagnostic = remote_reporting.dsn()
    first, second = urlsplit(destination), urlsplit(diagnostic)
    if destination and diagnostic and (first.hostname, first.path) == (second.hostname, second.path):
        return ""
    return destination


def snapshot(config):
    return {"enabled": bool(consent(config)), "available": bool(target()),
            "schema": SCHEMA, "fields": FIELDS, "notice": NOTICE,
            "last_attempt": remote_reporting._read(config.directory("state") / "library-sharing-attempt.json")}


def collect(contract):
    """沿用本机偏好模型，只投影允许分享的公开元数据和汇总行为。"""
    from .taste_preferences import preference_profile
    from .catalog_rules import is_jav_code, normalise_code_key
    from .error_reporting import redact
    with contract.read_connection() as connection:
        tags, entities, likes = defaultdict(set), defaultdict(lambda: defaultdict(set)), set()
        for asset, tag in connection.execute("SELECT asset_id,tag FROM asset_tag"):
            tags[asset].add(redact(str(tag)))
        for asset, kind, name in connection.execute(
                "SELECT ae.asset_id,e.kind,e.canonical_name FROM asset_entity ae JOIN entity e ON e.id=ae.entity_id"):
            if kind in {"performer", "creator", "studio", "series"}:
                entities[asset][kind].add(redact(str(name)))
        for asset, in connection.execute("SELECT asset_id FROM asset_preference WHERE profile_id='local-default' AND liked=1"):
            likes.add(asset)
        works = {}
        for row in connection.execute("SELECT id,code,medium,duration,rating,play_count,watch_ratio FROM asset WHERE disposal IS NULL"):
            aid, code, medium, duration, rating, plays, ratio = row
            code = normalise_code_key(code) if is_jav_code(code) else None
            # 无编号的条目只传元数据，内部行号不进入快照。
            key = ("code", code) if code else ("uncoded", aid)
            work = works.setdefault(key, {"code": code or None, "copies": 0, "tags": set(),
                "entities": defaultdict(set), "media": set(), "ratings": set(), "liked": False,
                "play_count": 0, "watch_ratio": 0, "duration_seconds": 0})
            work["copies"] += 1
            work["tags"].update(tags[aid])
            for kind, names in entities[aid].items():
                work["entities"][kind].update(names)
            if medium in {"video", "image", "audio"}:
                work["media"].add(medium)
            if type(rating) in (int, float) and math.isfinite(rating):
                work["ratings"].add(rating)
            work["liked"] |= aid in likes
            work["play_count"] += max(0, int(plays or 0))
            work["watch_ratio"] = max(work["watch_ratio"], min(1, max(0, float(ratio or 0))))
            work["duration_seconds"] = max(work["duration_seconds"], max(0, float(duration or 0)))
        strengths, names, evidence = preference_profile(connection, contract.taste_history_store)
    library = []
    for work in works.values():
        library.append({**work, "tags": sorted(work["tags"]), "media": sorted(work["media"]),
                        "ratings": sorted(work["ratings"]),
                        "entities": {kind: sorted(values) for kind, values in work["entities"].items()}})
    preferences = {kind: [{"name": redact(str(names.get(kind, {}).get(identity, identity))),
                           "strength": round(score, 6), "evidence": evidence[kind][identity]}
                          for identity, score in values.items()]
                   for kind, values in strengths.items()}
    payload = {"schema": SCHEMA, "peach": __version__, "period": datetime.now(timezone.utc).strftime("%G-W%V"),
               "library": library, "preferences": preferences}
    data = json.dumps(payload, ensure_ascii=False, allow_nan=False, separators=(",", ":")).encode()
    if len(data) > MAX_BYTES:
        raise ValueError("馆藏与口味快照超过 10 MiB，未发送；请关闭分享并反馈快照体积")
    return payload, data


class Service:
    def __init__(self, config, contract):
        self.config, self.contract = config, contract
        self._stop = threading.Event()
        self._wake = threading.Event()
        self._thread = None
        self._preview = None
        self._lock = threading.RLock()

    def preview(self):
        payload, data = collect(self.contract)
        token = uuid.uuid4().hex
        with self._lock:
            self._preview = token, time.monotonic() + 600
        return {"data": payload, "bytes": len(data), "token": token, "schema": SCHEMA}

    def save(self, body):
        if type(body.get("enabled")) is not bool:
            raise ValueError("馆藏与口味分享选项必须是布尔值")
        with self._lock:
            if body["enabled"] and (not self._preview or body.get("preview_token") != self._preview[0]
                    or time.monotonic() > self._preview[1]
                    or body.get("consent") is not True or body.get("schema") != SCHEMA):
                raise ValueError("请先查看字段与数据预览，再明确同意分享")
            value = {"enabled": body["enabled"], "schema": SCHEMA, "revision": uuid.uuid4().hex,
                     "selected_at": datetime.now(timezone.utc).isoformat()}
            atomic_write_text(_path(self.config), json.dumps(value))
            self._preview = None
        self._wake.set()
        return snapshot(self.config)

    def _gate(self, revision, envelope):
        current = consent(self.config)
        if self._stop.is_set() or not current or current.get("revision") != revision:
            return False
        if len(envelope.items) != 2 or [item.type for item in envelope.items] != ["event", "attachment"]:
            return False
        envelope.items[0].get_event().pop("extra", None)
        return envelope.items[1].headers.get("filename") == "peach-library-taste.json"

    def attempt(self):
        current, destination = consent(self.config), target()
        if not current or not destination or self._stop.is_set():
            return
        period = datetime.now(timezone.utc).strftime("%G-W%V")
        state = self.config.directory("state") / "library-sharing-attempt.json"
        from filelock import FileLock
        state.parent.mkdir(parents=True, exist_ok=True)
        with FileLock(str(state) + ".lock", timeout=.1):
            if remote_reporting._read(state).get("period") == period:
                return
            atomic_write_text(state, json.dumps({"period": period, "status": "attempted"}))
        payload, data = collect(self.contract)
        from sentry_sdk.attachments import Attachment
        client = remote_reporting._new_client(destination, envelope_gate=lambda envelope: self._gate(current["revision"], envelope))
        try:
            client.capture_event({"message": "Peach library and taste research", "level": "info", "release": __version__,
                                  "tags": {"purpose": "population-research", "schema": str(SCHEMA), "period": payload["period"]}},
                                 hint={"attachments": [Attachment(bytes=data, filename="peach-library-taste.json",
                                                                  content_type="application/json")]})
            client.flush(timeout=5)
        finally:
            client.close(timeout=0)

    def start(self):
        if self._thread and self._thread.is_alive():
            return
        self._stop.clear()
        def run():
            while not self._stop.is_set():
                try:
                    self.attempt()
                except Exception as error:
                    # 分享失败不把数据或错误原文转交诊断通道。
                    try:
                        state = self.config.directory("state") / "library-sharing-attempt.json"
                        value = remote_reporting._read(state)
                        atomic_write_text(state, json.dumps({**value, "status": "failed", "reason": type(error).__name__}))
                    except OSError:
                        pass
                self._wake.wait(3600)
                self._wake.clear()
        self._thread = threading.Thread(target=run, name="PeachLibrarySharing", daemon=True)
        self._thread.start()

    def stop(self):
        self._stop.set()
        self._wake.set()
        if self._thread:
            self._thread.join(timeout=6)
