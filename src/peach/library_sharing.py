"""明确同意的馆藏与口味明细，与错误诊断使用独立接收项目。"""
from __future__ import annotations

import gzip
import io
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

SCHEMA = 3
MAX_BYTES = 18 * 1024 * 1024
MAX_RAW_BYTES = 100 * 1024 * 1024
FILENAME = "peach-library-taste.json.gz"
FIELDS = [
    "作品编号、同编号文件数量、标签、出演者、创作者、厂牌、系列、媒体类型与时长",
    "每部作品的评分、喜欢状态、累计播放次数与观看比例",
    "出演者、创作者、标签、厂牌、系列、年代和时长偏好的名称、强度与证据来源类别",
    "Peach 版本、字段版本与 UTC 自然周",
]
NOTICE = "用于 Peach 群体研究；每周上传完整明细，存在关联风险，接收服务可见 IP。"


def _path(config):
    return config.directory("state") / "library-sharing.json"


def consent(config):
    value = remote_reporting._read(_path(config))
    return value if value.get("enabled") is True and value.get("schema") == SCHEMA else {}


def save_choice(config, enabled):
    """保存设置页或安装器的主动选择，不读取馆藏或初始化上传。"""
    if type(enabled) is not bool:
        raise ValueError("馆藏与口味上传选项必须是布尔值")
    value = {"enabled": enabled, "schema": SCHEMA, "revision": uuid.uuid4().hex,
             "selected_at": datetime.now(timezone.utc).isoformat()}
    atomic_write_text(_path(config), json.dumps(value))
    return snapshot(config)


def target():
    destination = remote_reporting.dsn("PEACH_LIBRARY_SENTRY_DSN", "library_dsn")
    diagnostic = remote_reporting.dsn()
    first, second = urlsplit(destination), urlsplit(diagnostic)
    if destination and diagnostic and (first.hostname, first.path) == (second.hostname, second.path):
        return ""
    return destination


def snapshot(config):
    attempt = remote_reporting._read(config.directory("state") / "library-sharing-attempt.json")
    return {"enabled": bool(consent(config)), "available": bool(target()),
            "schema": SCHEMA, "fields": FIELDS, "notice": NOTICE,
            "last_attempt": attempt if attempt.get("schema") == SCHEMA else {}}


def collect(contract):
    """只读投影完整明细，偏好计算不写本机缓存。"""
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
        for aid, code, medium, duration, rating, plays, ratio in connection.execute(
                "SELECT id,code,medium,duration,rating,play_count,watch_ratio FROM asset WHERE disposal IS NULL"):
            code = normalise_code_key(code) if is_jav_code(code) else None
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
        strengths, names, evidence = preference_profile(connection, contract.taste_history_store, cache=False)
    library = [{**work, "tags": sorted(work["tags"]), "media": sorted(work["media"]),
                "ratings": sorted(work["ratings"]),
                "entities": {kind: sorted(values) for kind, values in work["entities"].items()}}
               for work in works.values()]
    preferences = {kind: [{"name": redact(str(names.get(kind, {}).get(identity, identity))),
                           "strength": round(score, 6), "evidence": evidence[kind][identity]}
                          for identity, score in values.items()]
                   for kind, values in strengths.items()}
    payload = {"schema": SCHEMA, "peach": __version__, "period": datetime.now(timezone.utc).strftime("%G-W%V"),
               "library": library, "preferences": preferences}
    data = json.dumps(payload, ensure_ascii=False, allow_nan=False, separators=(",", ":")).encode()
    if len(data) > MAX_RAW_BYTES:
        raise ValueError("馆藏与口味明细超过 100 MiB，整份未发送")
    return payload, data


def compressed(data):
    """使用无文件名和时间戳的 gzip 附件，保持全部 JSON 字段。"""
    wire = gzip.compress(data, mtime=0)
    if len(wire) > MAX_BYTES:
        raise ValueError("馆藏与口味明细压缩后超过 18 MiB，整份未发送")
    return wire


def valid_payload(payload):
    if (not isinstance(payload, dict) or set(payload) != {"schema", "peach", "period", "library", "preferences"}
            or payload["schema"] != SCHEMA or payload["peach"] != __version__
            or payload["period"] != datetime.now(timezone.utc).strftime("%G-W%V")
            or not isinstance(payload["library"], list) or not isinstance(payload["preferences"], dict)):
        return False
    fields = {"code", "copies", "tags", "entities", "media", "ratings", "liked", "play_count", "watch_ratio", "duration_seconds"}
    for work in payload["library"]:
        if (not isinstance(work, dict) or set(work) != fields or not isinstance(work["entities"], dict)
                or not set(work["entities"]) <= {"performer", "creator", "studio", "series"}
                or not _valid_work_values(work)):
            return False
    if not set(payload["preferences"]) <= {"performer", "creator", "tag", "studio", "series", "era", "length"}:
        return False
    return all(isinstance(rows, list) and all(_valid_preference(row) for row in rows)
               for rows in payload["preferences"].values())


def _public_strings(values):
    from .error_reporting import redact
    return isinstance(values, list) and all(isinstance(value, str) and redact(value) == value for value in values)


def _finite(value):
    return type(value) in (int, float) and math.isfinite(value)


def _valid_work_values(work):
    from .catalog_rules import is_jav_code
    return ((work["code"] is None or isinstance(work["code"], str) and is_jav_code(work["code"]))
            and type(work["copies"]) is int and work["copies"] > 0
            and type(work["play_count"]) is int and work["play_count"] >= 0
            and type(work["liked"]) is bool and _finite(work["watch_ratio"]) and 0 <= work["watch_ratio"] <= 1
            and _finite(work["duration_seconds"]) and work["duration_seconds"] >= 0
            and isinstance(work["ratings"], list) and all(_finite(rating) for rating in work["ratings"])
            and _public_strings(work["tags"]) and isinstance(work["media"], list)
            and set(work["media"]) <= {"video", "image", "audio"}
            and all(_public_strings(names) for names in work["entities"].values()))


def _valid_preference(row):
    return (isinstance(row, dict) and set(row) == {"name", "strength", "evidence"}
            and _public_strings([row["name"]]) and _finite(row["strength"]) and 0 <= row["strength"] <= 1
            and isinstance(row["evidence"], list) and set(row["evidence"]) <= {
                "观看与反馈", "馆藏积累", "浏览记录", "浏览器书签", "关注"})


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
        size = len(compressed(data))
        token = uuid.uuid4().hex
        with self._lock:
            self._preview = token, time.monotonic() + 600
        return {"data": payload, "bytes": len(data), "compressed_bytes": size, "token": token, "schema": SCHEMA}

    def save(self, body):
        if type(body.get("enabled")) is not bool:
            raise ValueError("馆藏与口味上传选项必须是布尔值")
        with self._lock:
            if body["enabled"] and (not self._preview or body.get("preview_token") != self._preview[0]
                    or time.monotonic() > self._preview[1]
                    or body.get("consent") is not True or body.get("schema") != SCHEMA):
                raise ValueError("请先查看字段与数据预览，再明确同意上传")
            save_choice(self.config, body["enabled"])
            self._preview = None
        self._wake.set()
        return snapshot(self.config)

    def _gate(self, revision, envelope):
        current = consent(self.config)
        if self._stop.is_set() or not current or current.get("revision") != revision:
            return False
        if len(envelope.items) != 2 or [item.type for item in envelope.items] != ["event", "attachment"]:
            return False
        attachment = envelope.items[1]
        if attachment.headers.get("filename") != FILENAME:
            return False
        data = attachment.payload.get_bytes()
        if len(data) > MAX_BYTES:
            return False
        try:
            with gzip.GzipFile(fileobj=io.BytesIO(data)) as archive:
                raw = archive.read(MAX_RAW_BYTES + 1)
            if len(raw) > MAX_RAW_BYTES:
                return False
            payload = json.loads(raw)
            if not valid_payload(payload):
                return False
        except (ValueError, KeyError, TypeError, OSError, EOFError):
            return False
        event = envelope.items[0].get_event()
        for key in tuple(event):
            if key not in {"event_id", "timestamp", "platform"}:
                del event[key]
        event.update(message="Peach library and taste research", level="info",
                     tags={"purpose": "population-research", "schema": str(SCHEMA), "period": payload["period"]})
        for key in tuple(envelope.headers):
            if key not in {"event_id", "sent_at"}:
                del envelope.headers[key]
        return True

    def attempt(self):
        current, destination = consent(self.config), target()
        if not current or not destination or self._stop.is_set():
            return
        period = datetime.now(timezone.utc).strftime("%G-W%V")
        state = self.config.directory("state") / "library-sharing-attempt.json"
        from filelock import FileLock
        state.parent.mkdir(parents=True, exist_ok=True)
        with FileLock(str(state) + ".lock", timeout=.1):
            previous = remote_reporting._read(state)
            if previous.get("schema") == SCHEMA and previous.get("period") == period:
                return
            atomic_write_text(state, json.dumps({"schema": SCHEMA, "period": period, "status": "attempted"}))
        payload, data = collect(self.contract)
        data = compressed(data)
        from sentry_sdk.attachments import Attachment
        client = remote_reporting._new_client(destination, envelope_gate=lambda envelope: self._gate(current["revision"], envelope))
        try:
            client.capture_event({"message": "Peach library and taste research", "level": "info",
                                  "tags": {"purpose": "population-research", "schema": str(SCHEMA), "period": payload["period"]}},
                                 hint={"attachments": [Attachment(bytes=data, filename=FILENAME,
                                                                  content_type="application/gzip")]})
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
