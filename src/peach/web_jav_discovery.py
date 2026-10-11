"""只读 JAV 发现：库外已知作品与少看的馆藏共用口味和展示契约。"""
from __future__ import annotations

import re

from . import entities, feeds, web_catalog, web_feeds, web_settings, wants
from .related import rank_related
from .taste_history import build_taste_dashboard

DIMENSIONS = {
    "performer": ("peach_performers", "browser_creators"),
    "tag": ("peach_tags", "browser_tags"),
    "studio": ("peach_studios",),
    "series": ("peach_series",),
}
LABELS = {"performer": "常看的女优", "tag": "偏好的标签", "studio": "常看的厂牌", "series": "常看的系列"}


def _identity(connection, kind, name):
    found = entities.resolve_entity(connection, kind, name)
    return int(found["id"]) if found else f"name:{entities.normalize_entity_name(name)}"


def _profile(connection, rankings):
    features, names = {}, {}
    for kind, keys in DIMENSIONS.items():
        signals = {}
        for key in keys:
            for row in rankings.get(key, ()):
                value = float(row.get("score") or row.get("visits") or row.get("web_visits") or 0)
                if value <= 0 or not row.get("name"):
                    continue
                identity = row.get("entity_id") or _identity(connection, kind, row["name"])
                # 同一身份的两种证据合并，排序不会因同名投影重复加分。
                previous = signals.get(identity)
                if previous is None or value > previous[0]:
                    signals[identity] = (value, row["name"])
        strongest = sorted(signals.items(), key=lambda pair: (-pair[1][0], str(pair[0])))[:30]
        features[kind] = {identity for identity, _ in strongest}
        names[kind] = {identity: name for identity, (_, name) in strongest}
    return {"id": 0, "entities": features}, names


def _cached_movie(code):
    from .javdb_public import PUBLIC_API
    return PUBLIC_API.peek_movie(code) or {}


def _external(connection, contract):
    feeds.register_functions(connection, web_settings.hidden_compilations(contract.database))
    rows = [dict(row) for row in connection.execute(
        "SELECT d.* FROM feed_discovery d WHERE d.ignored_at IS NULL AND "
        + " AND ".join(web_feeds.LISTED) + " ORDER BY d.id")]
    identities = {}
    for row in rows:
        detail = _cached_movie(row["code"])
        tags = [tag["name"] for tag in detail.get("tags", ()) if tag.get("name")]
        series = detail.get("series_name") or ""
        if detail.get("maker_name"):
            row["studio"] = detail["maker_name"]
        actors = [actor["name"] for actor in detail.get("actors", ()) if actor.get("name")]
        if actors:
            row["performers"] = "、".join(actors)
        row["duration"] = float(detail["duration"]) * 60 if detail.get("duration") else None
        features = {}
        for kind, values in (("performer", re.split(r"[,，、;/]", row["performers"] or "")),
                             ("studio", [row["studio"] or ""]), ("tag", tags), ("series", [series])):
            features[kind] = set()
            for name in values:
                name = name.strip()
                if not name:
                    continue
                key = (kind, name)
                if key not in identities:
                    identities[key] = _identity(connection, kind, name)
                features[kind].add(identities[key])
        row["entities"] = features
        row["tags"] = tags
        row["asset_id"] = None
    return rows


def _library(connection):
    # 完播作品和反复观看作品不属于「少看」；未知时长只按已有观看次数判断。
    rows = [dict(row) for row in connection.execute(
        "SELECT a.id,a.location,a.name,COALESCE(NULLIF(a.catalog_title,''),NULLIF(a.original_title,''),a.name) AS title,a.creator,a.studio,a.code,"
        "a.release_date,a.duration,a.snapshot_path,a.play_count,a.max_reached,a.region,"
        + web_catalog.EFFECTIVE_REGION_SQL + " AS effective_region FROM asset a WHERE "
        + web_catalog.JAV_ASSET_PREDICATE
        + " AND a.medium='video' AND a.disposal IS NULL AND COALESCE(a.feedback,'') NOT IN ('dislike','seen')"
        " AND COALESCE(a.play_count,0)<=1 AND (COALESCE(a.duration,0)<=0"
        " OR COALESCE(a.max_reached,0)<a.duration*0.5) ORDER BY a.id")]
    by_id = {row["id"]: row for row in rows}
    for row in rows:
        row.update({"entities": {}, "tags": [], "asset_id": row["id"], "cover_url": "", "link": ""})
    for offset in range(0, len(rows), 800):
        ids = [row["id"] for row in rows[offset:offset + 800]]
        marks = ",".join("?" * len(ids))
        for aid, identity, kind, name in connection.execute(
            "SELECT ae.asset_id,e.id,e.kind,e.canonical_name FROM asset_entity ae"
            " JOIN entity e ON e.id=ae.entity_id WHERE ae.asset_id IN (" + marks + ")"
            " AND e.kind IN ('performer','tag','studio','series') ORDER BY e.canonical_name", ids):
            row = by_id[aid]
            row["entities"].setdefault(kind, set()).add(identity)
            if kind == "tag" and web_catalog.tag_cat(name) in (
                    "general", "relationship", "role", "appearance", "scene", "story", "position"):
                row["tags"].append(name)
        # 兼容投影仍须同一身份解析，不以名称子串匹配。
        for row in rows[offset:offset + 800]:
            if not row["entities"].get("studio") and row.get("studio"):
                row["entities"]["studio"] = {_identity(connection, "studio", row["studio"])}
    return rows


def q_jav_discoveries(contract, args):
    """发行时间只用于展示；选片依据已有身份、标签、厂牌和系列。"""
    scope = "library" if args.get("scope") == "library" else "external"
    limit = max(1, min(int(args.get("limit") or 60), 100))
    with contract.read_connection() as connection:
        taste = build_taste_dashboard(contract.taste_history_store, connection, exclude_disliked=True)
        profile, names = _profile(connection, taste["rankings"])
        candidates = _library(connection) if scope == "library" else _external(connection, contract)
        unique = {}
        for row in candidates:
            key = web_catalog.normalise_code_key(row["code"]) or row["id"]
            unique.setdefault(key, row)
        candidates = list(unique.values())
        # 已知候选按匹配维度排序后再限定计算量，不以发行时间裁掉旧作。
        candidates.sort(key=lambda row: (-sum(len(profile["entities"][kind] & row["entities"].get(kind, set()))
                                                   for kind in DIMENSIONS), row["id"]))
        picked = rank_related(profile, candidates[:4000], limit, seed=f"jav:{scope}")
        wanted = wants.wanted_keys(connection, (web_catalog.normalise_code_key(row["code"]) for row in picked))
        refs = web_feeds._discovery_performers(connection, contract, picked) if scope == "external" else {}
        for row in picked:
            row["reasons"] = [f"{LABELS[kind]}：" + "、".join(sorted(names[kind][key] for key in
                profile["entities"][kind] & row["entities"].get(kind, set())))
                for kind in DIMENSIONS if profile["entities"][kind] & row["entities"].get(kind, set())]
            row["score"] = row.pop("related_score")
            row["wanted"] = web_catalog.normalise_code_key(row["code"]) in wanted
            row.pop("why", None)
            row.pop("entities", None)
    if scope == "library":
        web_catalog.attach_card_performers(contract, picked)
        for row in picked:
            row["performer_refs"] = row.pop("performer_entities", [])
            row["performers"] = "、".join(row["performers"])
            web_catalog.attach_artwork_fields(contract, row)
            row["has_thumb"] = contract.has_snapshot(row.pop("snapshot_path", None))
    else:
        for row in picked:
            row["performer_refs"] = refs[row["id"]]
            row["has_cover"] = contract.has_cover(row["code"])
            row["cover_frame"] = contract.cover_frame(row["code"])
            row["cover_version"] = contract.cover_version(row["code"])
            row["poster_box"] = contract.poster_box(row["code"])
    return {"scope": scope, "items": picked, "candidate_total": len(candidates),
            "limited": len(candidates) > 4000, "source": "library" if scope == "library" else "known-works"}
