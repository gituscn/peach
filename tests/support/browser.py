"""浏览器验收共用的本机 Chrome 定位。"""
import os
import shutil
import sys
from pathlib import Path


def chrome_executable() -> str | None:
    """读取显式浏览器路径，否则查找各平台安装位置。"""
    explicit = os.environ.get("PEACH_E2E_CHROME", "").strip()
    if explicit:
        return explicit if Path(explicit).is_file() else None
    candidates: list[Path] = []
    if os.name == "nt":
        for variable in ("PROGRAMFILES", "PROGRAMFILES(X86)", "LOCALAPPDATA"):
            base = os.environ.get(variable)
            if base:
                candidates.append(Path(base) / "Google" / "Chrome" / "Application" / "chrome.exe")
    elif sys.platform == "darwin":
        candidates.append(Path("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"))
    else:
        for name in ("google-chrome", "google-chrome-stable"):
            found = shutil.which(name)
            if found:
                candidates.append(Path(found))
    return next((str(path) for path in candidates if path.is_file()), None)
