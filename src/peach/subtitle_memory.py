"""按视频保存字幕内容与选择；文件锁和原子替换复用本机状态存储。"""
from __future__ import annotations

import hashlib
import json
import re
from pathlib import Path

from filelock import FileLock

from .fsutil import atomic_write_bytes, atomic_write_text

MAX_BYTES = 8 * 1024 * 1024
VIDEO_KEY = re.compile(r"(?:item:[1-9][0-9]*|follow:[1-9][0-9]*:(?:main|[0-9]+))")


class SubtitleMemory:
    """字幕按视频隔离，先保存内容，再提交可读取的轨道目录。"""

    def __init__(self, root: Path, video: str):
        if not VIDEO_KEY.fullmatch(video):
            raise ValueError("视频标识无效")
        self.root = root / video.replace(":", "-")
        self.manifest = self.root / "subtitles.json"

    def read(self) -> dict:
        if not self.manifest.exists():
            return {"selected": None, "tracks": []}
        value = json.loads(self.manifest.read_text(encoding="utf-8"))
        return {"selected": value["selected"], "tracks": value["tracks"]}

    def update(self, selected: str | None, track: dict | None = None) -> dict:
        if selected is not None and (not isinstance(selected, str) or len(selected) > 1024):
            raise ValueError("字幕选择无效")
        if track is not None:
            if not isinstance(track, dict):
                raise ValueError("字幕轨道无效")
            key, name, text = (track.get(field) for field in ("key", "name", "text"))
            if (not isinstance(key, str) or not key or len(key) > 1024
                    or not isinstance(name, str) or not name or len(name) > 512
                    or not isinstance(text, str) or not text.startswith("WEBVTT")
                    or len(text.encode("utf-8")) > MAX_BYTES):
                raise ValueError("字幕内容或名称无效")
        self.root.mkdir(parents=True, exist_ok=True)
        with FileLock(str(self.manifest) + ".lock"):
            value = self.read()
            if selected is not None and not selected.startswith("native:") and not re.fullmatch(r"sidecar:[1-9][0-9]*", selected) and not (
                    track is not None and selected == key) and not any(
                    row["key"] == selected for row in value["tracks"]):
                raise ValueError("选择的字幕尚未保存")
            if track is not None:
                filename = hashlib.sha256(key.encode()).hexdigest() + ".vtt"
                atomic_write_bytes(self.root / filename, text.encode("utf-8"))
                value["tracks"] = [row for row in value["tracks"] if row["key"] != key]
                value["tracks"].append({"key": key, "name": name, "file": filename})
            value["selected"] = selected
            atomic_write_text(self.manifest, json.dumps(value, ensure_ascii=False))
            return value

    def track_path(self, filename: str) -> Path | None:
        if not re.fullmatch(r"[a-f0-9]{64}\.vtt", filename):
            return None
        if not any(row["file"] == filename for row in self.read()["tracks"]):
            return None
        path = self.root / filename
        return path if path.is_file() else None
