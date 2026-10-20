"""从官方发行站下载固定版本 CLI，校验 SHA-256 后提取指定二进制。"""
from __future__ import annotations

import hashlib
import io
from pathlib import Path
import re
import tarfile
from urllib.request import Request, urlopen
import zipfile


TOOLS = (
    ("glab", "glab_1.124.0_linux_amd64.tar.gz", "https://gitlab.com/gitlab-org/cli/-/releases/v1.124.0/downloads", "checksums.txt", "bin/glab"),
    ("rclone", "rclone-v1.75.2-linux-amd64.zip", "https://downloads.rclone.org/v1.75.2", "SHA256SUMS", "rclone-v1.75.2-linux-amd64/rclone"),
)


def download(url: str) -> bytes:
    with urlopen(Request(url, headers={"User-Agent": "Peach-release-tools"}), timeout=120) as response:
        return response.read()


def install(destination: Path) -> None:
    destination.mkdir(parents=True, exist_ok=True)
    for name, archive, base, checksums, member in TOOLS:
        document = download(f"{base}/{checksums}").decode("utf-8")
        expected = re.search(rf"^([0-9a-fA-F]{{64}})\s+\*?{re.escape(archive)}$", document, re.MULTILINE)
        content = download(f"{base}/{archive}")
        if expected is None or hashlib.sha256(content).hexdigest() != expected[1].lower():
            raise ValueError(f"官方 CLI 的 SHA-256 不符：{name}")
        if archive.endswith(".zip"):
            with zipfile.ZipFile(io.BytesIO(content)) as package:
                binary = package.read(member)
        else:
            with tarfile.open(fileobj=io.BytesIO(content), mode="r:gz") as package:
                source = package.extractfile(member)
                if source is None:
                    raise ValueError(f"官方 CLI 归档缺少二进制：{name}")
                binary = source.read()
        target = destination / name
        target.write_bytes(binary)
        target.chmod(0o755)
        print(f"已校验固定版本 CLI：{name}")


if __name__ == "__main__":
    install(Path("build/release-tools").resolve())
