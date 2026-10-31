"""固定媒体根的只读 WebDAV 传输：PROPFIND 元数据与 GET 字节范围。

只用标准库。工具与浏览器都通过 HTTP Range 读取；写方法一律拒绝，服务器返回的写权限
不改变这一点。
"""
from __future__ import annotations

import base64
import errno
import io
import math
import socket
import threading
from dataclasses import dataclass, field
from datetime import datetime, timezone
from email.utils import parsedate_to_datetime
from typing import Iterable
from urllib.error import HTTPError, URLError
from urllib.parse import quote, unquote, urljoin, urlsplit
from urllib.request import ProxyHandler, Request, build_opener
import xml.etree.ElementTree as ElementTree

from .user_agent import USER_AGENT

PROPFIND_BODY = (
    b'<?xml version="1.0" encoding="utf-8"?>'
    b'<d:propfind xmlns:d="DAV:"><d:prop><d:resourcetype/>'
    b'<d:getcontentlength/><d:getlastmodified/><d:getcontenttype/>'
    b'</d:prop></d:propfind>'
)

#: 每次按范围读取时预取的上限量；顺序读取因此不必每块都新建请求。
READAHEAD = 4 << 20


@dataclass(frozen=True)
class WebDavConnection:
    url: str
    username: str = field(default="", repr=False)
    password: str = field(default="", repr=False)
    timeout: float = 8

    def __post_init__(self):
        parsed = urlsplit(self.url)
        if parsed.scheme not in ("http", "https") or not parsed.hostname:
            raise ValueError("WebDAV 地址必须是 http:// 或 https:// 开头")
        if parsed.username is not None or parsed.password is not None:
            raise ValueError("WebDAV 账号和密码单独填写")
        if not math.isfinite(self.timeout) or self.timeout <= 0:
            raise ValueError("WebDAV 请求期限必须是有限正数")


@dataclass(frozen=True)
class WebDavStat:
    size: int
    mtime: float
    mtime_ns: int
    is_dir: bool
    name: str

    @property
    def st_size(self):
        return self.size

    @property
    def st_mtime(self):
        return self.mtime

    @property
    def st_mtime_ns(self):
        return self.mtime_ns


@dataclass(frozen=True)
class WebDavEntry(WebDavStat):
    is_symlink: bool = False


def _url(base: str, parts: tuple[str, ...]) -> str:
    if not parts:
        return base
    return base.rstrip("/") + "/" + "/".join(quote(part, safe="") for part in parts)


def _local(tag) -> str:
    text = tag if isinstance(tag, str) else str(tag)
    return text.rsplit("}", 1)[-1]


def _child_text(element, name: str) -> str:
    for child in element:
        if _local(child.tag) == name:
            return (child.text or "").strip()
    return ""


def _is_collection(element) -> bool:
    for child in element:
        if _local(child.tag) == "resourcetype":
            return any(_local(item.tag) == "collection" for item in child.iter())
    return False


def _timestamp(value: str) -> tuple[float, int]:
    if not value:
        return 0.0, 0
    try:
        parsed = parsedate_to_datetime(value)
    except (TypeError, ValueError):
        try:
            parsed = datetime.fromisoformat(value.replace("Z", "+00:00"))
        except ValueError:
            return 0.0, 0
    if parsed.tzinfo is None:
        parsed = parsed.replace(tzinfo=timezone.utc)
    delta = parsed - datetime(1970, 1, 1, tzinfo=timezone.utc)
    ns = ((delta.days * 86400 + delta.seconds) * 1_000_000 + delta.microseconds) * 1000
    return ns / 1_000_000_000, ns


def _valid_name(name: str) -> bool:
    return bool(name) and name not in (".", "..") and not any(
        c in name for c in '\\/:*?"<>|\x00') and not any(ord(c) < 32 for c in name)


def _error(status: int) -> OSError:
    if status in (401, 407):
        return PermissionError(errno.EACCES, "WebDAV 登录失败，请检查账号和密码")
    if status == 403:
        return PermissionError(errno.EACCES, "WebDAV 没有读取权限")
    if status == 404:
        return FileNotFoundError(errno.ENOENT, "WebDAV 路径不存在")
    if status in (405, 501):
        return PermissionError(errno.EACCES, "WebDAV 服务不支持此操作")
    return OSError(errno.EIO, f"WebDAV 请求失败：HTTP {status}")


def _network_error(exc: Exception) -> OSError:
    if isinstance(exc, OSError) and exc.errno in (errno.ETIMEDOUT, errno.ENETUNREACH,
                                                  errno.ECONNREFUSED, errno.EHOSTUNREACH):
        return OSError(exc.errno, "WebDAV 服务不可达")
    reason = getattr(exc, "reason", exc)
    if isinstance(reason, (TimeoutError, socket.timeout)):
        return OSError(errno.ETIMEDOUT, "WebDAV 请求超时")
    if isinstance(reason, ConnectionRefusedError):
        return OSError(errno.ENETUNREACH, "WebDAV 服务拒绝连接")
    return OSError(errno.ENETUNREACH, "WebDAV 服务不可达")


class WebDavTransport:
    """一个媒体根的请求入口；每次请求独立连接，close 中止已打开的句柄。"""

    def __init__(self, connection: WebDavConnection):
        self.connection = connection
        self._opener = build_opener(ProxyHandler({}))
        self._closed = False

    def __enter__(self):
        return self

    def __exit__(self, *_):
        self.close()

    def close(self):
        self._closed = True

    def _headers(self, extra: dict[str, str] | None = None) -> dict[str, str]:
        headers = {"User-Agent": USER_AGENT, "Accept": "*/*"}
        if self.connection.username or self.connection.password:
            token = base64.b64encode(
                f"{self.connection.username}:{self.connection.password}".encode("utf-8")).decode("ascii")
            headers["Authorization"] = "Basic " + token
        headers.update(extra or {})
        return headers

    def open_request(self, method: str, parts: tuple[str, ...], *,
                     data: bytes | None = None, headers: dict[str, str] | None = None):
        """发出请求并返回可读取的响应；调用方负责关闭。"""
        if self._closed:
            raise OSError(errno.EBADF, "WebDAV 传输已关闭")
        request = Request(_url(self.connection.url, parts), data=data,
                          headers=self._headers(headers), method=method)
        try:
            return self._opener.open(request, timeout=self.connection.timeout)
        except HTTPError as exc:
            exc.close()
            raise _error(exc.code) from None
        except (URLError, OSError) as exc:
            raise _network_error(exc) from None

    def _propfind(self, parts: tuple[str, ...], depth: int, *, include_self: bool = False) -> list[WebDavEntry]:
        with self.open_request("PROPFIND", parts, data=PROPFIND_BODY,
                               headers={"Depth": str(depth),
                                        "Content-Type": "application/xml; charset=utf-8"}) as response:
            payload = response.read()
        try:
            document = ElementTree.fromstring(payload)
        except ElementTree.ParseError:
            raise OSError(errno.EIO, "WebDAV 目录响应无法解析") from None
        responses = [element for element in document.iter() if _local(element.tag) == "response"]
        return list(self._entries(responses, parts, include_self))

    def _entries(self, responses: Iterable, parts: tuple[str, ...], include_self: bool) -> Iterable[WebDavEntry]:
        request_url = _url(self.connection.url, parts)
        base_path = unquote(urlsplit(request_url).path).rstrip("/")
        self_name = parts[-1] if parts else (
            base_path.rsplit("/", 1)[-1] or urlsplit(self.connection.url).hostname or "")
        join_base = request_url if request_url.endswith("/") else request_url + "/"
        for response in responses:
            href = _child_text(response, "href")
            if not href:
                continue
            path = unquote(urlsplit(urljoin(join_base, href)).path)
            key = path.rstrip("/")
            if key == base_path:
                # Depth 0 与 Depth 1 都会列出请求目标自身。
                if include_self and _valid_name(self_name):
                    yield self._entry(response, self_name)
                continue
            if not key.startswith(base_path + "/"):
                continue
            name = key[len(base_path) + 1:]
            if "/" in name or not _valid_name(name):
                continue
            yield self._entry(response, name)

    def _entry(self, response, name: str) -> WebDavEntry:
        props = [element for element in response.iter() if _local(element.tag) == "prop"]
        is_dir = any(_is_collection(prop) for prop in props)
        size = 0
        for prop in props:
            text = _child_text(prop, "getcontentlength")
            if text.isdigit():
                size = int(text)
                break
        modified = ""
        for prop in props:
            modified = _child_text(prop, "getlastmodified") or _child_text(prop, "creationdate")
            if modified:
                break
        mtime, mtime_ns = _timestamp(modified)
        return WebDavEntry(size, mtime, mtime_ns, is_dir, name)

    def stat(self, relative: tuple[str, ...] | str) -> WebDavStat:
        parts = _parts(relative)
        entries = self._propfind(parts, 0, include_self=True)
        if not entries:
            raise FileNotFoundError(errno.ENOENT, "WebDAV 路径不存在")
        return entries[0]

    def scandir(self, relative: tuple[str, ...] | str) -> list[WebDavEntry]:
        return list(self._propfind(_parts(relative), 1))

    def open(self, relative: tuple[str, ...] | str):
        parts = _parts(relative)
        info = self.stat(parts)
        if info.is_dir:
            raise IsADirectoryError(errno.EISDIR, "WebDAV 路径是目录")
        return WebDavReader(self, parts, info)

    def rename(self, _source, _target):
        raise PermissionError(errno.EACCES, "WebDAV 媒体目录为只读")

    def unlink(self, _relative, *, directory=False):
        raise PermissionError(errno.EACCES, "WebDAV 媒体目录为只读")

    def mkdir(self, _relative):
        raise PermissionError(errno.EACCES, "WebDAV 媒体目录为只读")

    def open_write(self, _relative, mode="wb"):
        raise PermissionError(errno.EACCES, "WebDAV 媒体目录为只读")


def _parts(relative: tuple[str, ...] | str) -> tuple[str, ...]:
    if isinstance(relative, str):
        if relative.startswith(("/", "\\")):
            raise ValueError("WebDAV 路径必须相对媒体根")
        parts = tuple(relative.replace("\\", "/").split("/")) if relative else ()
    elif isinstance(relative, tuple):
        parts = relative
    else:
        raise TypeError("WebDAV 路径必须是字符串或路径分量元组")
    for part in parts:
        if not _valid_name(part if isinstance(part, str) else ""):
            raise ValueError("WebDAV 路径含无效分量")
    return parts


class WebDavReader:
    """可 seek 的只读句柄；每次预取一段 Range，顺序读取时复用同一个响应。"""

    def __init__(self, transport: WebDavTransport, parts: tuple[str, ...], info: WebDavStat):
        self._transport, self._parts = transport, parts
        self._info = info
        self._total: int | None = info.size or None
        self._response = None
        self._offset = 0
        self._lock = threading.Lock()
        self.closed = False

    def __enter__(self):
        self._check()
        return self

    def __exit__(self, *_):
        self.close()

    def _check(self):
        if self.closed:
            raise ValueError("WebDAV 文件已关闭")

    def stat(self):
        self._check()
        if self._total is not None and self._total != self._info.size:
            from dataclasses import replace
            return replace(self._info, size=self._total)
        return self._info

    def tell(self):
        return self._offset

    def seek(self, offset, whence=io.SEEK_SET):
        with self._lock:
            self._check()
            if whence not in (io.SEEK_SET, io.SEEK_CUR, io.SEEK_END):
                raise ValueError("WebDAV seek whence 无效")
            if whence == io.SEEK_END and self._total is None:
                self._total = self._transport.stat(self._parts).size or None
            if whence == io.SEEK_SET:
                base = 0
            elif whence == io.SEEK_CUR:
                base = self._offset
            else:
                base = self._total or 0
            target = base + offset
            if not isinstance(target, int) or target < 0:
                raise ValueError("WebDAV seek 位置无效")
            if target != self._offset:
                self._drop()
            self._offset = target
            return target

    def _drop(self):
        response = self._response
        self._response = None
        if response is not None:
            try:
                response.close()
            except OSError:
                pass

    def _adopt(self, response):
        header = response.headers.get("Content-Range", "")
        total = header.rsplit("/", 1)[-1].strip() if "/" in header else ""
        if total.isdigit():
            self._total = int(total)
        elif self._offset == 0:
            length = response.headers.get("Content-Length", "").strip()
            if length.isdigit():
                self._total = int(length)

    def _open_range(self):
        if self._total is not None and self._offset >= self._total:
            return False
        if self._total is None:
            header = f"bytes={self._offset}-"
        else:
            header = f"bytes={self._offset}-{min(self._total - 1, self._offset + READAHEAD - 1)}"
        response = self._transport.open_request("GET", self._parts, headers={"Range": header})
        try:
            status = response.status
            if status == 200 and self._offset:
                raise OSError(errno.EIO, "WebDAV 服务忽略了字节范围")
            if status not in (200, 206):
                raise OSError(errno.EIO, f"WebDAV 请求失败：HTTP {status}")
            self._adopt(response)
        except BaseException:
            response.close()
            raise
        self._response = response
        return True

    def read(self, size=-1):
        with self._lock:
            self._check()
            if self._total is not None and self._offset >= self._total:
                return b""
            wanted = None if size is None or size < 0 else size
            result = bytearray()
            try:
                while wanted is None or len(result) < wanted:
                    if self._response is None and not self._open_range():
                        break
                    amount = 1 << 20 if wanted is None else min(1 << 20, wanted - len(result))
                    chunk = self._response.read(amount)
                    if not chunk:
                        self._drop()
                        if self._total is not None and self._offset < self._total:
                            raise OSError(errno.EIO, "WebDAV 文件在读取期间发生变化")
                        self._total = self._offset
                        break
                    self._offset += len(chunk)
                    result.extend(chunk)
                    if self._total is not None and self._offset >= self._total:
                        self._drop()
                        break
                return bytes(result)
            except BaseException:
                self._transport.close()
                self._drop()
                raise

    def close(self):
        with self._lock:
            if self.closed:
                return
            self.closed = True
            self._drop()
            self._transport.close()
