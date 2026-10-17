"""生成完整免安装包、应用更新包及按工具拆分的 ZIP。"""
from __future__ import annotations

import argparse
import json
from pathlib import Path
import sys
import zipfile

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "src"))
from peach.update_packages import MANIFEST, TOOL_PATHS, digest, read_manifest


def archive(destination: Path, root: Path, files: list[Path], manifest: dict | None = None) -> None:
    with zipfile.ZipFile(destination, "w", compression=zipfile.ZIP_DEFLATED) as package:
        for path in files:
            if path.is_symlink() or not path.resolve().is_relative_to(root.resolve()):
                raise ValueError("发行目录包含链接或越界文件")
            package.write(path, "Peach/" + path.relative_to(root).as_posix())
        if manifest is not None:
            package.writestr("Peach/" + MANIFEST, json.dumps(manifest, ensure_ascii=False, sort_keys=True))


def package(root: Path, output: Path, version: str) -> dict:
    import re
    if not re.fullmatch(r"\d+\.\d+\.\d+", version):
        raise ValueError("发行版本无效")
    root, output = root.resolve(), output.resolve()
    if output.is_relative_to(root):
        raise ValueError("发行输出目录须位于程序目录外")
    if not (root / "Peach.exe").is_file() or not (root / "_internal/standalone.txt").is_file():
        raise ValueError("发行目录不是独立 Windows 包")
    output.mkdir(parents=True, exist_ok=True)
    files = sorted(path for path in root.rglob("*") if path.is_file())
    if any(path.name == MANIFEST for path in files):
        raise ValueError("完整程序目录中包含更新清单")
    tools = {}
    tool_files: set[Path] = set()
    for tool, (prefix, required) in TOOL_PATHS.items():
        selected = [path for path in files if (path.is_relative_to(root / prefix) if prefix
                    else path.relative_to(root).as_posix() in required)]
        names = {path.relative_to(root).as_posix(): digest(path) for path in selected}
        expected = {f"{prefix}/{name}" if prefix else name for name in required}
        if not expected.issubset(names):
            raise ValueError(f"发行目录缺少 {tool} 工具与分发材料")
        name = f"Peach-{version}-windows-x64-tools-{tool}.zip"
        archive(output / name, root, selected)
        tools[tool] = {"files": names, "asset": {"name": name, "size": (output / name).stat().st_size,
                                              "sha256": digest(output / name)}}
        tool_files.update(selected)
    manifest = {"format": 1, "version": version, "tools": tools}
    # 用运行时的同一判据验证生成结果，不在完整包内留下更新专用文件。
    import tempfile
    with tempfile.TemporaryDirectory() as temp:
        check = Path(temp).resolve()
        (check / MANIFEST).write_text(json.dumps(manifest), encoding="utf-8")
        read_manifest(check, version)
    archive(output / f"Peach-{version}-windows-x64.zip", root, files)
    archive(output / f"Peach-{version}-windows-x64-update.zip", root,
            [path for path in files if path not in tool_files], manifest)
    (output / "DOWNLOADS.md").write_text(
        "\n## 下载选择\n\n"
        "| 文件 | 用途 | 媒体工具 |\n| --- | --- | --- |\n"
        f"| `Peach-{version}-windows-x64-setup.exe` | 首次安装，推荐 | 包含 FFmpeg、ffprobe、untrunc |\n"
        f"| `Peach-{version}-windows-x64.zip` | 完整免安装包，解压后运行 | 包含 FFmpeg、ffprobe、untrunc |\n"
        f"| `Peach-{version}-windows-x64-update.zip` | 已安装用户的应用更新包，由 Peach 更新器使用 | 复用本机工具 |\n"
        f"| `Peach-{version}-windows-x64-tools-*.zip` | 更新器按需下载的工具包 | 按工具分别打包 |\n\n"
        "已有 Peach 请在「配置 → 应用与维护」检查更新。更新器校验并复用已安装工具，"
        "仅在工具缺失、损坏或版本变化时下载相应工具包。应用更新包不能单独用于首次安装。"
        "旧版更新器首次升级仍下载完整包，之后支持工具复用。\n",
        encoding="utf-8")
    return manifest


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--source", type=Path, required=True)
    parser.add_argument("--output", type=Path, required=True)
    parser.add_argument("--version", required=True)
    args = parser.parse_args()
    manifest = package(args.source, args.output, args.version)
    print(json.dumps({"version": manifest["version"], "tools": list(manifest["tools"])}))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
