"""收藏与命名筛选；偏好保存在当前 profile，同一事务内按动作修改。"""
from __future__ import annotations

import json
import time
import uuid
from urllib.parse import parse_qsl, urlencode, urlsplit

from .entities import resolve_entity, resolve_entity_id
from .web_settings import DEFAULT_PROFILE_ID

KEY = "libraryShortcuts"
KINDS = frozenset({"performer", "creator", "studio", "series", "agency", "tag"})
QUERY_KEYS = frozenset({"loc", "creator", "studio", "owner", "tag", "tag_match", "len",
                        "dur_min", "dur_max", "orient", "region", "sort", "dir", "q", "jav", "thumb", "state"})
PATHS = frozenset({"/", "/unseen", "/watch-later", "/flagged"})


def _profile(c):
    row = c.execute("SELECT settings_json FROM profile WHERE id=?", (DEFAULT_PROFILE_ID,)).fetchone()
    if row is None:
        return {}
    try:
        value = json.loads(row[0] or "{}")
    except (ValueError, TypeError):
        value = {}
    return value if isinstance(value, dict) else {}


def _favorite(c, entry):
    if not isinstance(entry, dict):
        return None
    if entry.get("kind") == "tag" and not entry.get("entity_id"):
        tag = entry.get("name")
        if isinstance(tag, str) and 0 < len(tag.strip()) <= 120:
            entity = resolve_entity(c, "tag", tag.strip())
            if entity:
                return _favorite(c, {"entity_id": entity["id"]})
        return None
    value = entry.get("entity_id")
    if isinstance(value, bool) or not isinstance(value, int) or value <= 0:
        return None
    resolved = resolve_entity_id(c, value)
    row = c.execute("SELECT id,kind,canonical_name FROM entity WHERE id=?", (resolved,)).fetchone() if resolved else None
    if row is None or row[1] not in KINDS:
        return None
    return {"key": "entity:" + str(row[0]), "entity_id": row[0], "kind": row[1], "name": row[2]}


def _snapshot(c, settings):
    stored = settings.get(KEY)
    stored = stored if isinstance(stored, dict) else {}
    favorites = {}
    raw_favorites = stored.get("favorites", [])
    for item in (raw_favorites if isinstance(raw_favorites, list) else [])[:1000]:
        current = _favorite(c, item)
        if current:
            favorites[current["key"]] = current
    raw_filters = stored.get("filters", [])
    filters = []
    for item in (raw_filters if isinstance(raw_filters, list) else [])[:100]:
        if not isinstance(item, dict) or not all(isinstance(item.get(key), str) for key in ("id", "name", "href")):
            continue
        try:
            href = clean_href(item["href"])
        except ValueError:
            continue
        filters.append({"id": item["id"][:80], "name": item["name"][:80], "href": href})
    return {"favorites": list(favorites.values()), "filters": filters}


def clean_href(raw):
    if not isinstance(raw, str) or len(raw) > 4096:
        raise ValueError("筛选地址过长或格式不正确")
    parsed = urlsplit(raw)
    if parsed.scheme or parsed.netloc or parsed.fragment or parsed.path not in PATHS:
        raise ValueError("只能保存馆藏筛选")
    pairs = parse_qsl(parsed.query, keep_blank_values=True, max_num_fields=40)
    if any(key not in QUERY_KEYS or len(value) > 1000 for key, value in pairs):
        raise ValueError("筛选包含不支持的条件")
    query = urlencode(dict(pairs))
    return parsed.path + ("?" + query if query else "")


def q_library_shortcuts(contract, _args=None):
    with contract.read_connection() as c:
        return _snapshot(c, _profile(c))


def favorite_ids(connection):
    return {row["entity_id"] for row in _snapshot(connection, _profile(connection))["favorites"]}


def w_library_shortcuts(contract, body):
    action = body.get("action")
    with contract.write_transaction() as c:
        settings = _profile(c)
        data = _snapshot(c, settings)
        if action == "favorite":
            item = _favorite(c, body)
            if item is None or not isinstance(body.get("on"), bool):
                raise ValueError("收藏对象不存在或状态不正确")
            data["favorites"] = [row for row in data["favorites"] if row["key"] != item["key"]]
            if body["on"]:
                if len(data["favorites"]) >= 1000:
                    raise ValueError("最多收藏 1000 项")
                data["favorites"].append(item)
        elif action == "save_filter":
            name = body.get("name")
            if not isinstance(name, str) or not 0 < len(name.strip()) <= 80:
                raise ValueError("筛选名称须为 1 到 80 个字符")
            if len(data["filters"]) >= 100:
                raise ValueError("最多保存 100 个筛选")
            data["filters"].append({"id": uuid.uuid4().hex, "name": name.strip(), "href": clean_href(body.get("href"))})
        elif action == "delete_filter":
            data["filters"] = [row for row in data["filters"] if row["id"] != body.get("id")]
        else:
            raise ValueError("不支持的收藏操作")
        settings[KEY] = data
        updated = c.execute("UPDATE profile SET settings_json=?,updated_at=? WHERE id=?",
                            (json.dumps(settings, ensure_ascii=False), time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()), DEFAULT_PROFILE_ID)).rowcount
        if not updated:
            raise ValueError("当前用户设置不存在")
    return {"ok": True, **data}
