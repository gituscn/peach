"""独立更新包的工具清单与本机文件校验。"""
from __future__ import annotations

import hashlib
import json
from pathlib import Path, PurePosixPath
import re

MANIFEST = "update-manifest.json"
TOOL_PATHS = {
    "ffmpeg": ("tools/ffmpeg", {"bin/ffmpeg.exe", "bin/ffprobe.exe", "manifest.json", "LICENSE.txt", "NOTICE.md", "buildconf.txt"}),
    "untrunc": ("tools/untrunc", {"untrunc.exe", "manifest.json", "LICENSE.txt", "NOTICE.md", "buildconf.txt"}),
    "cloudflared": ("", {"cloudflared.exe", "cloudflared-manifest.json"}),
    "face-models": ("tools/face-models", {"face_detection_yunet_2023mar.onnx", "face_recognition_sface_2021dec.onnx",
                                          "LICENSE-yunet.txt", "LICENSE-sface.txt", "manifest.json"}),
}


def digest(path: Path) -> str:
    with path.open("rb") as stream:
        return hashlib.file_digest(stream, "sha256").hexdigest()


def checked_path(root: Path, name: str) -> Path:
    parts = PurePosixPath(name).parts
    if (not parts or "\\" in name or ":" in name or ".." in parts or any(part.endswith((".", " ")) for part in parts)
            or name.startswith("/") or PurePosixPath(name).as_posix() != name):
        raise ValueError("工具清单路径无效")
    path = root.joinpath(*parts)
    if not path.resolve().is_relative_to(root.resolve()) or any(
            parent.is_symlink() for parent in (path, *path.parents) if parent != root.parent):
        raise ValueError("工具清单路径越界或包含链接")
    return path


def matches(root: Path, files: dict[str, str]) -> bool:
    try:
        return all((path := checked_path(root, name)).is_file() and digest(path) == expected
                   for name, expected in files.items())
    except (OSError, ValueError):
        return False


def read_manifest(stage: Path, version: str) -> dict:
    """读更新包的工具清单，只留本版认得的工具。

    清单可以多出本版不认得的工具：那是更新版本新增的工具包，这一版不下载，装好后由那个
    工具自己的运行时兜底补齐。认得的工具一个都不能少。
    """
    manifest = json.loads((stage / MANIFEST).read_text(encoding="utf-8"))
    if (not isinstance(manifest, dict) or manifest.get("format") != 1 or manifest.get("version") != version
            or not isinstance(manifest.get("tools"), dict)
            or not set(TOOL_PATHS) <= set(manifest.get("tools", {}))):
        raise ValueError("更新包工具清单无效")
    manifest["tools"] = {tool: manifest["tools"][tool] for tool in TOOL_PATHS}
    all_names: set[str] = set()
    for tool, bundle in manifest["tools"].items():
        if not isinstance(bundle, dict):
            raise ValueError("更新包工具清单无效")
        prefix, required = TOOL_PATHS[tool]
        files = bundle.get("files")
        if not isinstance(files, dict) or not files or len(files) > 2000:
            raise ValueError("更新包工具文件清单无效")
        expected_names = {f"{prefix}/{name}" if prefix else name for name in required}
        if not expected_names.issubset(files):
            raise ValueError("更新包工具清单缺少必需文件")
        for name, expected in files.items():
            checked_path(stage, name)
            if ((prefix and not name.startswith(prefix + "/")) or (not prefix and name not in required)
                    or not isinstance(expected, str) or not re.fullmatch(r"[0-9a-f]{64}", expected)
                    or name.casefold() in all_names):
                raise ValueError("更新包工具文件清单无效")
            all_names.add(name.casefold())
        asset = bundle.get("asset", {})
        if (not isinstance(asset, dict) or asset.get("name") != f"Peach-{version}-windows-x64-tools-{tool}.zip"
                or not isinstance(asset.get("size"), int) or not 0 < asset["size"] <= 512 * 1024 * 1024
                or not isinstance(asset.get("sha256"), str) or not re.fullmatch(r"[0-9a-f]{64}", asset["sha256"])):
            raise ValueError("更新包工具下载信息无效")
    return manifest
