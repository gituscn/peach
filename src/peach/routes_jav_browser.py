"""JAV 用户脚本的专用权限端点与本机配对设置。"""
from fastapi import APIRouter, Body, Depends, HTTPException, Request
from fastapi.responses import JSONResponse, Response

from .config import PROJECT_ROOT
from .jav_browser import source_sites
from .routes_auth import require_auth


def browser_client(request: Request):
    service = request.app.state.jav_browser
    authorization = request.headers.get("authorization", "")
    token = authorization.removeprefix("Bearer ") if authorization.startswith("Bearer ") else ""
    if not service.authorized(token):
        raise HTTPException(401, "请在 Peach 下载渠道启用浏览器添加并配置专用令牌")
    if not service.downloads.available:
        raise HTTPException(403, "浏览器添加只在账本写入端可用")
    return service


def userscript():
    import json
    sites = source_sites()
    domains = dict.fromkeys(host for site in sites for host in site["domains"])
    matches = "\n".join(line for host in domains for line in (
        f"// @match        https://{host}/*", f"// @match        https://*.{host}/*"))
    template = (PROJECT_ROOT / "web" / "integrations" / "peach-jav.user.js").read_text(encoding="utf-8")
    script = template.replace("// __PEACH_JAV_MATCHES__", matches).replace(
        "__PEACH_JAV_SITES__", json.dumps({"version": 1, "sites": sites}, ensure_ascii=False))
    return Response(script, media_type="application/javascript", headers={"Cache-Control": "no-cache"})


def status(code: str, service=Depends(browser_client)):
    try:
        return JSONResponse(service.status(code), headers={"Cache-Control": "no-store"})
    except ValueError as error:
        raise HTTPException(400, str(error)) from None


def add(body: dict = Body(...), service=Depends(browser_client)):
    try:
        return JSONResponse(service.add(body), headers={"Cache-Control": "no-store"})
    except ValueError as error:
        raise HTTPException(400, str(error)) from None


def settings(request: Request):
    return JSONResponse(request.app.state.jav_browser.settings(), headers={"Cache-Control": "no-store"})


def configure(request: Request, body: dict = Body(...)):
    try:
        return JSONResponse(request.app.state.jav_browser.configure(body), headers={"Cache-Control": "no-store"})
    except ValueError as error:
        raise HTTPException(400, str(error)) from None


def create_router(local_only) -> APIRouter:
    router = APIRouter()
    router.add_api_route("/integrations/peach-jav.user.js", userscript, methods=["GET"])
    router.add_api_route("/api/jav-browser", status, methods=["GET"])
    router.add_api_route("/api/jav-browser", add, methods=["POST"])
    permissions = [Depends(require_auth), Depends(local_only)]
    router.add_api_route("/api/configuration/jav-browser", settings, methods=["GET"], dependencies=permissions)
    router.add_api_route("/api/configuration/jav-browser", configure, methods=["POST"], dependencies=permissions)
    return router
