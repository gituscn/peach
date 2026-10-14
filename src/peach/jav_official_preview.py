"""官方商品已声明的预告；媒体地址与作品身份同时核对。"""
from __future__ import annotations

import json
import re
import time
from urllib.parse import quote

import httpx

from .catalog_rules import normalise_code_key
from .jav_cover_fetch import HostLimitedTransport, PRESTIGE_MEDIA, PRESTIGE_PRODUCT, _fetch
from .javdb_public import PublicSourceUnavailable
from .scraping_access import SourceTransport

PRESTIGE_SKU = 'https://www.prestige-av.com/api/sku/item/{code}'
_UUID = re.compile(r'[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}')
_MOVIE_PATH = re.compile(r'[a-f0-9]/[a-f0-9]/[a-f0-9-]{36}\.mp4')


def prestige_preview(code, secrets_root, *, transport=None):
    """复用 amane 固定版本的 SKU→UUID 协议，只读取两份 JSON。"""
    owned = transport is None
    transport = transport or HostLimitedTransport(SourceTransport(
        secrets_root, max_requests=3, max_bytes=2 * 1024 * 1024, max_seconds=30), 2)
    deadline = time.monotonic() + 30

    def read(url):
        body = _fetch(transport, url, referer='https://www.prestige-av.com/',
                      limit=1024 * 1024, deadline=deadline)
        payload = json.loads(body)
        if not isinstance(payload, dict):
            raise ValueError('商品资料格式未识别')
        return payload

    try:
        sku = read(PRESTIGE_SKU.format(code=quote(normalise_code_key(code))))
        uuid = (sku.get('parentProduct') or {}).get('uuid')
        if not isinstance(uuid, str) or not _UUID.fullmatch(uuid):
            raise ValueError('商品身份未取得')
        product = read(PRESTIGE_PRODUCT.format(uuid=uuid))
        numbers = [row.get('deliveryItemId') for row in product.get('sku') or [] if isinstance(row, dict)]
        if product.get('uuid') != uuid or not any(normalise_code_key(number) == normalise_code_key(code) for number in numbers):
            raise ValueError('来源作品身份不匹配')
        if 'movie' not in product:
            raise ValueError('公开预告字段未取得')
        movie = product['movie']
        if movie is None:
            return ''
        if not isinstance(movie, dict) or movie.get('mimeType') != 'video/mp4' or movie.get('isLimited') != 0:
            raise ValueError('公开预告格式未识别')
        path = movie.get('path')
        if not isinstance(path, str) or not _MOVIE_PATH.fullmatch(path):
            raise ValueError('公开预告地址未识别')
        return PRESTIGE_MEDIA.format(path=path)
    except (OSError, ValueError, TypeError, AttributeError, RuntimeError, httpx.HTTPError) as error:
        raise PublicSourceUnavailable('官方视频预览未取得，请稍后重试') from error
    finally:
        if owned:
            transport.close()
