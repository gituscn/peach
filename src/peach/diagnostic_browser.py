"""正式前端包的异常类型、帧与构建映射白名单。"""
import re
import uuid

NAMES = frozenset({"Error", "TypeError", "ReferenceError", "SyntaxError", "RangeError", "URIError",
    "EvalError", "AggregateError", "DOMException", "SecurityError", "NotAllowedError", "InvalidStateError",
    "QuotaExceededError", "NotSupportedError", "TimeoutError", "NetworkError", "DataError", "OperationError"})
BUNDLES = frozenset({"peach-app.js", "peach-pages.js"})


def project(fields):
    frames = []
    pattern = r"(?<![\w.-])(peach-(?:app|pages)\.js)(?:\?[^\s):]*)?:(\d+):(\d+)"
    for line in str(fields.get("stack", "")).splitlines()[:80]:
        if "chrome-extension://" in line or "moz-extension://" in line:
            continue
        for name, row, column in re.findall(pattern, line):
            frames.append({"filename": name, "abs_path": "app:///" + name,
                           "lineno": int(row), "colno": int(column)})
    frames = list(reversed(frames[:20]))
    if not frames and fields.get("source_file") in BUNDLES:
        row, column = fields.get("line"), fields.get("column")
        if type(row) is int and type(column) is int and row > 0 and column > 0:
            bundle = fields["source_file"]
            frames = [{"filename": bundle, "abs_path": "app:///" + bundle, "lineno": row, "colno": column}]
    name = fields.get("error_name")
    name = name if name in NAMES else "BrowserError"
    value = {"type": name, "value": name, "stacktrace": {"frames": frames}}
    images = []
    identities = fields.get("bundle_debug_ids", {})
    if isinstance(identities, dict):
        for bundle in sorted({frame["filename"] for frame in frames}):
            candidate = identities.get(bundle)
            if not isinstance(candidate, str) or len(candidate) != 36:
                continue
            try:
                identity = uuid.UUID(candidate)
                if identity.int and str(identity) == candidate.lower():
                    images.append({"type": "sourcemap", "code_file": "app:///" + bundle, "debug_id": str(identity)})
            except ValueError:
                continue
    return value, {"images": images} if images else None


def clean_debug_meta(value):
    """SDK scope 不能往受限事件中加入任意映射元数据。"""
    if not isinstance(value, dict) or not isinstance(value.get("images"), list):
        return None
    fields = {"stack": "\n".join(bundle + ":1:1" for bundle in sorted(BUNDLES)), "bundle_debug_ids": {}}
    for image in value["images"][:2]:
        if isinstance(image, dict) and image.get("type") == "sourcemap":
            code = image.get("code_file")
            for bundle in BUNDLES:
                if code == "app:///" + bundle:
                    fields["bundle_debug_ids"][bundle] = image.get("debug_id")
    return project(fields)[1]
