"""只读 WebDAV 媒体资源：地址、凭据与账本路径的远端身份。"""
from __future__ import annotations

import errno
from contextlib import contextmanager
from dataclasses import dataclass
from urllib.parse import quote, unquote, urlsplit

from .smb_media import SmbResource

_SCHEMES = ("http", "https")
_DEFAULT_PORTS = {"http": 80, "https": 443}


def address(value: str) -> tuple[str, str, int, tuple[str, ...]]:
    """解析不含凭据的媒体根地址；路径层级按百分号解码后的分量保存。"""
    try:
        parsed = urlsplit(value)
    except ValueError:
        raise ValueError("WebDAV 地址或端口无效") from None
    if (parsed.scheme not in _SCHEMES or not parsed.hostname
            or parsed.username is not None or parsed.password is not None
            or parsed.query or parsed.fragment):
        raise ValueError("请填写 http:// 或 https:// 开头的 WebDAV 地址，账号和密码单独填写")
    try:
        port = parsed.port or _DEFAULT_PORTS[parsed.scheme]
    except ValueError:
        raise ValueError("WebDAV 地址或端口无效") from None
    if not 1 <= port <= 65535:
        raise ValueError("WebDAV 地址或端口无效")
    parts = tuple(unquote(part) for part in parsed.path.split("/") if part)
    if any(part in {".", ".."} or any(c in part for c in "\\/:\x00")
           or any(ord(c) < 32 for c in part) for part in parts):
        raise ValueError("WebDAV 地址的目录不能包含上级目录或路径分隔符")
    return parsed.scheme, parsed.hostname, port, parts


def canonical(value: str) -> str:
    scheme, host, port, parts = address(value)
    host = f"[{host}]" if ":" in host else host.lower()
    default = _DEFAULT_PORTS[scheme]
    return (f"{scheme}://{host}" + (f":{port}" if port != default else "")
            + "".join("/" + quote(part, safe="") for part in parts))


def is_address(value) -> bool:
    return isinstance(value, str) and value.startswith(("http://", "https://"))


def credential_store(config):
    from .follow_secrets import CredentialStore
    return CredentialStore(config.directory("secrets"))


def _root_for(config, path):
    return next((key for key, value in config.storage_roots.items()
                 if value.get("transport") == "webdav"
                 and canonical(value["mount"]) == canonical(path)), None)


def save_credentials(config, sources):
    """按根目录身份保存账号与密码；密码为空时保留已保存的值。"""
    store = credential_store(config)
    for row in sources:
        if not is_address(row.get("path")):
            continue
        root_id = _root_for(config, row["path"])
        if root_id is None:
            raise ValueError("WebDAV 媒体目录身份无效")
        key = "webdav-" + root_id
        previous = store.load(key)
        values = dict(previous.values) if previous else {}
        if row.get("webdav_clear") is True:
            store.clear(key)
            _invalidate(root_id)
            continue
        username = row.get("webdav_username", values.get("username", ""))
        password = row.get("webdav_password", "")
        if not isinstance(username, str) or not isinstance(password, str):
            raise ValueError("WebDAV 账号和密码必须是文字")
        if username != values.get("username", ""):
            values.pop("password", None)
        values["username"] = username
        if password:
            values["password"] = password
        if values != (previous.values if previous else {}):
            store.save(key, values)
            _invalidate(root_id)


def _invalidate(root_id):
    from .smb_media import _BRIDGE
    if _BRIDGE is not None:
        _BRIDGE.invalidate(root_id)


@contextmanager
def credential_transaction(config, sources):
    """配置文件替换失败时恢复本次涉及的 WebDAV 凭据。"""
    store = credential_store(config)
    keys = {"webdav-" + key for key, value in config.storage_roots.items()
            if value.get("transport") == "webdav"
            and any(is_address(row.get("path")) and canonical(row["path"]) == canonical(value["mount"])
                    for row in sources)}
    previous = {key: store.load(key) for key in keys}
    try:
        save_credentials(config, sources)
        yield
    except BaseException:
        for key, credential in previous.items():
            if credential is None:
                store.clear(key)
            else:
                store.save(key, credential.values)
        raise


def connection_for(config, root_id: str, uri: str):
    from .webdav_transport import WebDavConnection
    credential = credential_store(config).load("webdav-" + root_id)
    values = credential.values if credential else {}
    return WebDavConnection(canonical(uri), username=values.get("username", ""),
                            password=values.get("password", ""), timeout=8)


@dataclass(frozen=True)
class WebDavResource(SmbResource):
    """以账本路径标识的只读 WebDAV 资源；继承远端路径协议，写方法由传输拒绝。"""

    @property
    def name(self):
        _scheme, host, _port, tail = address(self.uri)
        return self.relative[-1] if self.relative else tail[-1] if tail else host

    @property
    def remote_parts(self):
        return self.relative

    def _transport(self):
        from .webdav_transport import WebDavTransport
        return WebDavTransport(self.connection)

    def open(self, mode="rb"):
        if mode != "rb":
            raise PermissionError(errno.EACCES, "WebDAV 媒体目录为只读")
        transport = self._transport()
        try:
            handle = transport.open(self.relative)
        except BaseException:
            transport.close()
            raise
        from .smb_media import _OwnedReader
        return _OwnedReader(handle, transport)

    def rename(self, _target):
        raise PermissionError(errno.EACCES, "WebDAV 媒体目录为只读")

    def unlink(self, missing_ok=False):
        raise PermissionError(errno.EACCES, "WebDAV 媒体目录为只读")

    def rmdir(self):
        raise PermissionError(errno.EACCES, "WebDAV 媒体目录为只读")

    def mkdir(self, mode=0o777, parents=False, exist_ok=False):
        raise PermissionError(errno.EACCES, "WebDAV 媒体目录为只读")
