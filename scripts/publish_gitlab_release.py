"""将已经完整下载校验的 R2 制品链接登记到 GitLab Release。"""
from __future__ import annotations

import json
import os
from pathlib import Path
import re
import subprocess
import sys
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "src"))
if not __package__:
    sys.path.insert(0, str(ROOT))
    __package__ = "scripts"
from peach.user_agent import USER_AGENT


def r2_release_notes(body: str, version: str, base: str, project_url: str) -> str:
    from .package_windows_release import download_notes
    text = body.split('\n## 下载选择\n', 1)[0].rstrip() + '\n'
    text = text.replace('https://github.com/peach-mitao/peach/blob/master/',
                        f'{project_url.rstrip("/")}/-/blob/v{version}/')
    return text + download_notes(version, lite_installer=True, download_base=f'{base.rstrip("/")}/v{version}',
                                 macos=True)


def publish() -> None:
    tag = os.environ["CI_COMMIT_TAG"]
    sha = os.environ["CI_COMMIT_SHA"]
    if not re.fullmatch(r"v\d+\.\d+\.\d+", tag) or not re.fullmatch(r"[0-9a-f]{40}", sha):
        raise ValueError("Release 必须使用明确的版本标签与完整提交 SHA")
    actual = subprocess.check_output(["git", "rev-parse", f"refs/tags/{tag}^{{commit}}"],
                                     text=True, encoding="utf-8").strip()
    if actual != sha:
        raise ValueError("标签不指向当前已验收的提交")
    notes = Path("release/RELEASE_NOTES.md")
    if not notes.is_file() or not notes.stat().st_size:
        raise ValueError("缺少发行说明")
    command = [os.environ.get("PEACH_GLAB", "glab"), "release", "create", tag,
                    "--repo", os.environ["CI_PROJECT_URL"], "--ref", sha,
                    "--name", f"Peach {tag[1:]} · Windows / macOS 测试版",
                    "--notes-file", str(notes), "--no-close-milestone"]
    backend = os.environ.get("PEACH_DOWNLOAD_BACKEND", "gitgud")
    if backend == "r2":
        subprocess.run([sys.executable, "scripts/release_r2.py", "--root", "release", "--version", tag[1:], "--apply"], check=True)
        base = os.environ["PEACH_R2_PUBLIC_BASE"].rstrip("/")
        with urlopen(Request(f"{base}/{tag}/release.json", headers={"User-Agent": USER_AGENT}), timeout=60) as response:
            release = json.load(response)
        if (release["tag_name"] != tag or release.get("commit_sha") != sha or not release["assets"]
                or any(item["state"] != "uploaded" or not item["browser_download_url"].startswith(f"{base}/{tag}/")
                       for item in release["assets"])):
            raise ValueError("R2 发布清单尚未就绪")
        links = [{"name": item["name"], "url": item["browser_download_url"], "link_type": "package",
                  "direct_asset_path": "/" + item["name"]} for item in release["assets"]]
        notes.write_text(r2_release_notes(notes.read_text(encoding='utf-8'), tag[1:], base,
                                         os.environ['CI_PROJECT_URL']), encoding='utf-8')
        command.extend(["--assets-links", json.dumps(links)])
    elif backend == "gitgud":
        from .release_r2 import inventory
        files = inventory(Path("release"), tag[1:])
        sums = Path("release/SHA256SUMS.txt")
        sums.write_text("".join(f"{item['sha256']}  {item['name']}\n" for item in files), encoding="utf-8")
        command.extend([*(str(Path("release") / item["name"]) for item in files), str(sums),
                        "--use-package-registry", "--package-name", "peach-release"])
    else:
        raise ValueError("未知的下载后端")
    subprocess.run(command, check=True)


if __name__ == "__main__":
    publish()
