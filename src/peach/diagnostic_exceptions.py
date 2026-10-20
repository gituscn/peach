"""只保留代码位置、异常身份与结构化错误码的异常链投影。"""
from pathlib import Path
import re

FRAME_MODULES = {"peach", "asyncio", "anyio", "starlette", "httpx", "sqlite3", "urllib3"}


def project(error, http_status):
    values, codes, chain = [], {}, []
    current, visited = error, set()
    remaining = 40
    while current is not None and id(current) not in visited and len(chain) < 8:
        visited.add(id(current))
        name = type(current).__name__
        chain.append(name)
        for key in ("errno", "winerror", "returncode", "sqlite_errorcode"):
            value = getattr(current, key, None)
            if type(value) is int:
                codes[key] = str(value)
        sqlite_name = getattr(current, "sqlite_errorname", "")
        if isinstance(sqlite_name, str) and re.fullmatch(r"SQLITE_[A-Z_]{1,50}", sqlite_name):
            codes["sqlite_errorname"] = sqlite_name
        if (status := http_status(current)) is not None:
            codes["status_code"] = str(status)
        frames = []
        tb = current.__traceback__
        while tb is not None and remaining:
            filename = Path(tb.tb_frame.f_code.co_filename)
            module = tb.tb_frame.f_globals.get("__name__", "")
            own = filename.parent.name == "peach" or module.startswith("peach.")
            if own or module.split(".", 1)[0] in FRAME_MODULES:
                frame = {"filename": filename.name, "lineno": tb.tb_lineno,
                         "function": tb.tb_frame.f_code.co_name}
                if not own:
                    frame["module"] = module
                frames.append(frame)
                remaining -= 1
            tb = tb.tb_next
        values.append({"type": name, "module": type(current).__module__, "value": name,
                       "stacktrace": {"frames": frames}})
        current = current.__cause__ or (None if current.__suppress_context__ else current.__context__)
    return list(reversed(values)), codes, chain
