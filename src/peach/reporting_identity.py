"""远程事件的有限用途、运行环境与构建身份。"""
from __future__ import annotations

import os
import re
import subprocess
import sys
from functools import lru_cache

from . import __version__
from .buildinfo import frozen_build

PURPOSES = {"usage": "version-statistics", "errors": "technical-diagnostics", "research": "population-research"}


@lru_cache(maxsize=1)
def _source_commit():
    from .settings_file import PROJECT_ROOT
    try:
        result = subprocess.run(["git", "rev-parse", "HEAD"], cwd=PROJECT_ROOT,
            capture_output=True, text=True, encoding="utf-8", timeout=2,
            creationflags=subprocess.CREATE_NO_WINDOW if os.name == "nt" else 0)
        commit = result.stdout.strip() if result.returncode == 0 else ""
        return commit if re.fullmatch(r"[a-f0-9]{40}", commit) else None
    except (OSError, subprocess.SubprocessError):
        return None


def event_metadata(kind):
    from .settings_file import PROJECT_ROOT
    runtime = "packaged" if getattr(sys, "frozen", False) else "source"
    environment = os.environ.get("PEACH_REPORTING_ENVIRONMENT", "")
    if environment not in {"production", "development", "test"}:
        environment = "development" if runtime == "source" and (PROJECT_ROOT / ".git").is_file() else "production"
    build = frozen_build() if runtime == "packaged" else None
    commit = build.commit if build else (_source_commit() if runtime == "source" else None)
    result = {"release": __version__, "environment": environment,
              "tags": {"purpose": PURPOSES[kind], "runtime": runtime}}
    if isinstance(commit, str) and re.fullmatch(r"[a-f0-9]{40}", commit):
        result["dist"] = commit
    return result
