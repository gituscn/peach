"""库外 JAV 作品详情的只读投影，来源资料不构成 ledger 断言。"""
from __future__ import annotations

import re

from . import entities, wants, web_catalog
from .catalog_rules import normalise_code_key, tag_cat
from .genre_decisions import load_genre_decisions
from .genre_taxonomy import resolve_genre
from .javdb_public import (MAX_REVIEW_PAGES, PAGE_SIZE, PUBLIC_API, PublicSourceUnavailable,
                          preview_video_url, public_image_url)


def detail_code(args) -> str:
    raw = str(args.get("code") or "").strip()
    if not re.fullmatch(r"[A-Za-z0-9_-]{2,64}", raw):
        raise ValueError("需要有效的作品番号")
    return normalise_code_key(raw)


def _refs(contract, connection, kind, names):
    refs = []
    for name in dict.fromkeys(str(name or "").strip() for name in names):
        if not name:
            continue
        entity = entities.resolve_entity(connection, kind, name)
        refs.append(web_catalog.entity_ref(contract, kind, entity["id"], entity["canonical_name"])
                    if entity else {"id": None, "name": name, "has_image": False})
    return refs


def q_jav_detail(contract, args) -> dict:
    code = detail_code(args)
    with contract.database.read_connection() as connection:
        row = connection.execute("SELECT * FROM feed_discovery WHERE code=? COLLATE NOCASE LIMIT 1", (code,)).fetchone()
        item = dict(row) if row else {}
    source = None
    message = ""
    try:
        source = PUBLIC_API.movie(code)
    except PublicSourceUnavailable as error:
        message = str(error)
    if source:
        item.update(title=source.get("title") or source.get("origin_title") or item.get("title"),
                    release_date=source.get("release_date") or item.get("release_date"),
                    studio=source.get("maker_name") or item.get("studio"))
    payload = {"ok": True, "state": "ready" if source else "partial", "message": message,
               "code": code, "title": item.get("title") or code,
               "release_date": item.get("release_date"), "studio": item.get("studio")}
    with contract.database.read_connection() as connection:
        decisions = load_genre_decisions(connection)
    payload.update(_source_fields(source or {}, decisions))
    payload.update(_artwork_fields(contract, code, item, source or {}))
    payload.update(_identity_fields(contract, code, item, source or {}))
    return payload


def _identity_fields(contract, code, item, source):
    actors = [actor for actor in source.get("actors", []) if isinstance(actor, dict) and actor.get("name")]
    names = [actor.get("name") for actor in actors]
    if not names:
        names = re.split(r"[、,，]", str(item.get("performers") or ""))
    with contract.database.read_connection() as connection:
        performer_refs = []
        for name in dict.fromkeys(names):
            refs = _refs(contract, connection, "performer", [name])
            if not refs:
                continue
            ref = refs[0]
            actor = next((actor for actor in actors if actor.get("name") == name), {})
            actor_id = str(actor.get("id") or "")
            if re.fullmatch(r"[A-Za-z0-9]{1,64}", actor_id):
                ref["source_actor_id"] = actor_id
                ref["source_avatar"] = public_image_url(actor.get("avatar_url"))
            performer_refs.append(ref)
        studio_refs = _refs(contract, connection, "studio", [item.get("studio")])
        for ref in studio_refs:
            ref["has_logo"] = contract.has_logo(ref["name"])
            ref["logo_version"] = contract.logo_version(ref["name"])
        series_refs = _refs(contract, connection, "series", [(source or {}).get("series_name")])
        wanted = code in wants.wanted_keys(connection, [code])
        want = connection.execute("SELECT id FROM want_item WHERE code_key=? AND state<>'acquired' LIMIT 1", (code,)).fetchone()
    return {"performers": "、".join(ref["name"] for ref in performer_refs),
            "performer_refs": performer_refs, "studio_refs": studio_refs, "series_refs": series_refs,
            "wanted": wanted, "want_id": int(want[0]) if want else None}


def _artwork_fields(contract, code, item, source):
    return {"has_cover": contract.has_cover(code), "cover_version": contract.cover_version(code),
            "cover_url": item.get("cover_url") or "",
            "source_image": bool(source and (source.get("cover_url") or source.get("thumb_url"))),
            "preview_count": min(len(source.get("preview_images") or []), 30),
            "preview_video_url": preview_video_url(source),
            "source_url": "https://javdb.com/v/" + str(source["id"]) if source else item.get("link") or ""}


def _source_fields(source, decisions):
    tags = [str(tag.get("name") or "") if isinstance(tag, dict) else str(tag)
            for tag in source.get("tags", [])]
    tag_refs = []
    for raw in tags:
        label = resolve_genre(raw, decisions)
        if label is None:
            continue
        label = label or raw
        if label and all(ref["name"] != label for ref in tag_refs):
            tag_refs.append({"name": label, "category": tag_cat(label), "source_name": raw})
    return {"duration": source.get("duration"), "score": source.get("score"),
            "summary": source.get("summary") or "", "director": source.get("director_name") or "",
            "publisher": source.get("publisher_name") or "", "tags": [tag for tag in tags if tag],
            "tag_refs": tag_refs,
            "comments_count": int(source.get("comments_count") or 0)}


def q_jav_reviews(contract, args) -> dict:
    code = detail_code(args)
    page = int(args.get("page") or 1)
    try:
        rows = PUBLIC_API.reviews(code, page)
    except PublicSourceUnavailable as error:
        return {"ok": False, "items": [], "more": False, "message": str(error)}
    items = [{"id": str(row.get("id")), "username": str(row.get("username") or "匿名用户"),
              "content": str(row.get("content") or ""), "score": row.get("score"),
              "created_at": str(row.get("created_at") or "")} for row in rows[:PAGE_SIZE] if isinstance(row, dict)]
    return {"ok": True, "items": items, "page": page,
            "more": len(items) == PAGE_SIZE and page < MAX_REVIEW_PAGES,
            "message": ""}


def q_jav_image(contract, args) -> dict:
    code = detail_code(args)
    index = str(args.get("image") or "cover")
    if (index != "cover" and not re.fullmatch(r"actor:[A-Za-z0-9]{1,64}", index)
            and (not index.isdigit() or not 0 <= int(index) < 30)):
        raise ValueError("预览图不存在")
    try:
        image = PUBLIC_API.image(code, index)
    except PublicSourceUnavailable as error:
        return {"ok": False, "image": "", "message": str(error)}
    return {"ok": True, "image": image}


def q_jav_resources(contract, args) -> dict:
    """公开资源列表；只返回候选，下载提交由既有入口接受用户选择。"""
    import time
    from .downloads import parse_magnet

    code = detail_code(args)
    try:
        movie = PUBLIC_API.movie(code)
        rows = PUBLIC_API.magnets(code, refresh=args.get('refresh') == '1')
    except PublicSourceUnavailable as error:
        return {"state": "error", "items": [], "error": str(error), "checked_at": None}
    items = {}
    source_url = "https://javdb.com/v/" + movie["id"]
    for row in rows:
        try:
            magnet = parse_magnet(str(row.get("hash") or ""))
        except ValueError:
            continue
        if magnet.info_hash in items:
            continue
        attributes = [label for key, label in (("cnsub", "中字"), ("hd", "高清")) if row.get(key)]
        items[magnet.info_hash] = {"id": "magnet:" + magnet.info_hash, "protocol": "magnet",
            "info_hash": magnet.info_hash, "uri": magnet.uri, "name": row.get("name") or code,
            "size": str(row.get("size") or ""), "files": str(row.get("files_count") or ""),
            "date": str(row.get("created_at") or ""), "attributes": attributes,
            "source": "JavDB", "source_url": source_url, "origins": ["JavDB"]}
    return {"state": "ready", "items": list(items.values()), "error": "", "source_url": source_url,
            "checked_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()), "warnings": []}
