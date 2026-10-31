"""HTTP 入口只负责探活和导航到 HTTPS origin。"""
from ipaddress import ip_address
from urllib.parse import quote, urlencode, urlsplit

from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse, RedirectResponse


def _local_host(raw: str) -> str | None:
    """来访 Host 里的回环名或 IP 字面量；其他域名不认。

    局域网设备用 IP 打开明文口时不能把它赶去 `peach.local`：Android 上 .local 常常
    不解析，换到 IP 的 HTTPS 端口才连得上。其他域名一律回落到固定 origin。
    """
    if not raw or any(char in raw for char in "/\\@?#"):
        return None
    try:
        host = urlsplit(f"//{raw}").hostname
    except ValueError:
        return None
    if not host:
        return None
    host = host.rstrip(".").lower()
    if host == "localhost":
        return host
    try:
        ip_address(host)
    except ValueError:
        return None
    return host


def create_redirect_app(origin: str) -> FastAPI:
    target = urlsplit(origin)
    if (target.scheme != "https" or not target.hostname or target.username
            or target.password or target.path not in ("", "/")
            or target.query or target.fragment):
        raise ValueError("redirect origin must be an HTTPS origin")
    mdns_host = target.hostname.rstrip(".").lower()
    port = target.port
    app = FastAPI(openapi_url=None, docs_url=None, redoc_url=None)

    @app.api_route("/healthz", methods=["GET", "HEAD"])
    def healthz():
        return {"ok": True, "service": "peach-redirect", "scheme": "http"}

    @app.api_route("/{path:path}", methods=["GET", "HEAD", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"])
    def redirect(request: Request, path: str):
        # 写请求不能因 307/308 在另一个 origin 自动重发口令或正文。
        if request.method not in {"GET", "HEAD"}:
            return JSONResponse({"error": "HTTPS required"}, status_code=426,
                                headers={"Cache-Control": "no-store"})
        # 交换主机时不转发查询串中的口令。
        query = request.query_params.multi_items()
        query = urlencode([(key, value) for key, value in query if key != "t"])
        requested = _local_host(request.headers.get("host", "")) or mdns_host
        host = f"[{requested}]" if ":" in requested else requested
        location = f"https://{host}" + (f":{port}" if port else "")
        location += "/" + quote(path, safe="/@:")
        if query:
            location += "?" + query
        return RedirectResponse(location, status_code=302,
                                headers={"Cache-Control": "no-store"})

    return app
