"""JavDB Web UI 的匿名只读协议；作品身份核对、请求预算与有界缓存。"""
from __future__ import annotations

import hashlib
import io
import json
import re
import threading
import time
from collections import OrderedDict
from urllib.parse import urlencode, urlsplit

from PIL import Image

from .catalog_rules import normalise_code_key
from .http import HttpRequest, HttpxTransport, response_text
from .scripting import HostLimiter

WEB = "https://catembylegacy.fastcdn.dpdns.org"
API = "https://jdforrepam.com/api"
PAGE_SIZE = 10
MAX_REVIEW_PAGES = 8


def public_image_url(value: object) -> bool:
    """公开图片仅取已验证来源主机的 HTTPS 地址。"""
    try:
        parts = urlsplit(str(value or ""))
        return (parts.scheme == "https" and parts.hostname == "tp.spfcas.com"
                and not parts.username and not parts.password and parts.port in (None, 443))
    except ValueError:
        return False


def preview_video_url(movie: dict) -> str:
    """只投影来源作品的公开 HLS 预览入口，不替来源断言播放成功。"""
    value = str(movie.get("preview_video_url") or "")
    try:
        parts = urlsplit(value)
        allowed = (parts.scheme == "https" and parts.hostname == "jdforrepam.com"
                   and not parts.username and not parts.password and parts.port in (None, 443)
                   and not parts.fragment and not any(char.isspace() for char in value)
                   and re.fullmatch(r"/api/v1/movies/ttm3u8/preview/[A-Za-z0-9/_-]+\.m3u8", parts.path))
    except ValueError:
        return ""
    return value if allowed else ""


class PublicSourceUnavailable(ValueError):
    """公开来源当前未取得。"""


class PublicAPI:
    """不带账号凭据；串行取数、3 秒间隔、6 小时缓存，失败冷却 60 秒。"""

    def __init__(self, transport=None, *, clock=time.monotonic, sleeper=time.sleep):
        self.transport = transport
        self.clock = clock
        self.limiter = HostLimiter({}, default_interval=3.0, clock=clock, sleeper=sleeper)
        self.lock = threading.RLock()
        self.cache: OrderedDict[str, tuple[float, object]] = OrderedDict()
        self.signature_parts: tuple[str, str] | None = None
        self.signature_until = 0.0
        self.paused_until = 0.0

    def _get(self, url: str, *, signed=False, limit=2 * 1024 * 1024):
        if self.clock() < self.paused_until:
            raise PublicSourceUnavailable("作品资料来源暂时不可用，请稍后重试")
        self.limiter.wait(url)
        headers = {"Accept": "application/json" if signed else "*/*"}
        if signed:
            stamp = str(int(time.time()))
            middle, suffix = self._signature()
            digest = hashlib.md5((stamp + suffix).encode(), usedforsecurity=False).hexdigest()
            headers["jdsignature"] = f"{stamp}.{middle}.{digest}"
        if self.transport is None:
            self.transport = HttpxTransport()
        try:
            response = self.transport(HttpRequest("GET", url, headers), 15, limit)
        except Exception as error:
            self.paused_until = self.clock() + 60
            raise PublicSourceUnavailable("作品资料未取得，请稍后重试") from error
        if response.status != 200:
            self.paused_until = self.clock() + (900 if response.status in (403, 429) else 60)
            raise PublicSourceUnavailable("作品资料来源暂时不可用，请稍后重试")
        return response

    def _signature(self) -> tuple[str, str]:
        if self.signature_parts and self.clock() < self.signature_until:
            return self.signature_parts
        html = response_text(self._get(WEB + "/"))
        entry = re.search(r'src="(/assets/index-[A-Za-z0-9_-]+\.js)"', html)
        if not entry:
            self.paused_until = self.clock() + 60
            raise PublicSourceUnavailable("作品资料来源格式未识别")
        js = response_text(self._get(WEB + entry[1]))
        middle = re.search(r'\bS1="([^"\r\n]{1,256})"', js)
        suffix = re.search(r'\bE1="([^"\r\n]{1,256})"', js)
        if not middle or not suffix:
            self.paused_until = self.clock() + 60
            raise PublicSourceUnavailable("作品资料来源格式未识别")
        self.signature_parts = middle[1], suffix[1]
        self.signature_until = self.clock() + 24 * 3600
        return self.signature_parts

    def _json(self, path: str, query=None) -> dict:
        # 签名材料取齐后再领取 API 主机间隔，首个签名请求不占用两次间隔。
        self._signature()
        response = self._get(API + path + ("?" + urlencode(query) if query else ""), signed=True)
        try:
            payload = json.loads(response.body)
        except (ValueError, UnicodeError) as error:
            self.paused_until = self.clock() + 60
            raise PublicSourceUnavailable("作品资料来源格式未识别") from error
        if not isinstance(payload, dict) or payload.get("success") != 1:
            self.paused_until = self.clock() + 60
            raise PublicSourceUnavailable("作品资料未取得，请稍后重试")
        data = payload.get("data")
        if not isinstance(data, dict):
            self.paused_until = self.clock() + 60
            raise PublicSourceUnavailable("作品资料来源格式未识别")
        return data

    def _cached(self, key, fetch):
        with self.lock:
            hit = self.cache.get(key)
            if hit and hit[0] > self.clock():
                self.cache.move_to_end(key)
                return hit[1]
            result = fetch()
            self.cache[key] = (self.clock() + 6 * 3600, result)
            self.cache.move_to_end(key)
            while len(self.cache) > 128:
                self.cache.popitem(last=False)
            return result

    def movie(self, code: str) -> dict:
        canonical = normalise_code_key(code)

        def fetch():
            rows = self._rows("/v2/search", "movies", {"q": canonical, "type": "movie", "page": 1})
            match = next((row for row in rows if isinstance(row, dict)
                          and normalise_code_key(row.get("number")) == canonical), None)
            if not match or not re.fullmatch(r"[A-Za-z0-9]+", str(match.get("id", ""))):
                raise PublicSourceUnavailable("未取得这个番号的作品资料")
            movie = self._json("/v4/movies/" + match["id"]).get("movie")
            if (not isinstance(movie, dict) or normalise_code_key(movie.get("number")) != canonical
                    or movie.get("id") != match["id"]):
                raise PublicSourceUnavailable("来源作品身份不匹配")
            return movie

        return self._cached("movie:" + canonical, fetch)

    def _rows(self, path, key, query=None):
        rows = self._json(path, query).get(key, [])
        if not isinstance(rows, list):
            self.paused_until = self.clock() + 60
            raise PublicSourceUnavailable("作品资料来源格式未识别")
        return [row for row in rows if isinstance(row, dict)]

    def peek_movie(self, code: str) -> dict | None:
        """只读已取得的资料，不触发网络；供发现排序投影。"""
        with self.lock:
            hit = self.cache.get("movie:" + normalise_code_key(code))
            return dict(hit[1]) if hit and hit[0] > self.clock() else None

    def reviews(self, code: str, page: int) -> list[dict]:
        if not 1 <= page <= MAX_REVIEW_PAGES:
            raise ValueError("评论页码必须在 1 至 8 之间")
        movie = self.movie(code)
        return self._cached(f"reviews:{movie['id']}:{page}", lambda:
                            self._rows(f"/v1/movies/{movie['id']}/reviews", "reviews", {"page": page}))

    def magnets(self, code: str, *, refresh=False) -> list[dict]:
        movie = self.movie(code)
        if refresh:
            with self.lock:
                self.cache.pop("magnets:" + movie['id'], None)
        return self._cached("magnets:" + movie['id'], lambda:
                            self._rows(f"/v1/movies/{movie['id']}/magnets", "magnets"))

    def image(self, code: str, index: str) -> str:
        movie = self.movie(code)
        if index == "cover":
            url = movie.get("cover_url") or movie.get("thumb_url")
        elif index.startswith("actor:"):
            actor_id = index.removeprefix("actor:")
            actor = next((actor for actor in movie.get("actors") or []
                          if isinstance(actor, dict) and str(actor.get("id")) == actor_id), None)
            if not actor:
                raise ValueError("出演者头像不存在")
            url = actor.get("avatar_url")
        else:
            previews = movie.get("preview_images") or []
            try:
                url = previews[int(index)]
            except (ValueError, IndexError, TypeError):
                raise ValueError("预览图不存在") from None
            if isinstance(url, dict):
                url = url.get("large_url") or url.get("url")
        if not public_image_url(url):
            raise PublicSourceUnavailable("图片未取得")

        def fetch():
            import base64
            body = self._get(str(url), limit=4 * 1024 * 1024).body
            decoded = decode_image(body)
            return "data:image/jpeg;base64," + base64.b64encode(decoded).decode("ascii")

        return self._cached(f"image:{movie['id']}:{index}", fetch)


def decode_image(body: bytes) -> bytes:
    """标准图片与公开前端 XOR 包装，只接受 Pillow 完整解码的图像。"""
    candidates = [body]
    if body:
        candidates.append(bytes(value ^ body[0] for value in body[1:]))
        candidates.extend(bytes(value ^ 0x7f for value in body[skip:]) for skip in (0, 1, 2))
    for raw in candidates:
        try:
            with Image.open(io.BytesIO(raw)) as image:
                if image.width * image.height > 20_000_000:
                    continue
                image.load()
                image.thumbnail((1200, 1200))
                output = io.BytesIO()
                image.convert("RGB").save(output, "JPEG", quality=85)
                return output.getvalue()
        except (OSError, ValueError, Image.DecompressionBombError):
            continue
    raise PublicSourceUnavailable("图片未取得")


PUBLIC_API = PublicAPI()
