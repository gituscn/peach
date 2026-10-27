"""用户脚本的人物补充：只读馆藏、元数据快照与已安装头像。"""
from __future__ import annotations

import base64
import io
import json

from PIL import Image, ImageOps

from . import entities
from .jav_browser import code_key
from .previews import PreviewUnavailable
from .web_jav_detail import visible_actors


def _snapshots(contract, codes):
    cached = getattr(contract, 'jav_discovery_metadata', None)
    if cached is not None:
        return {code: cached.peek(code)[0] for code in codes}
    path = contract.cover_root.parent / 'jav-discovery-metadata.json'
    try:
        if path.stat().st_size > 16 * 1024 * 1024:
            raise ValueError('本地人物快照过大')
        payload = json.loads(path.read_text(encoding='utf-8'))
        if payload.get('version') != 1 or not isinstance(payload.get('records'), dict):
            raise ValueError('本地人物快照格式无效')
        records = payload['records']
        return {code: records.get(code, {}).get('movie', {}) for code in codes}
    except FileNotFoundError:
        return {}
    except (OSError, UnicodeError, json.JSONDecodeError) as error:
        raise ValueError('本地人物快照未取得') from error


def cached_people(contract, preview, value: str) -> dict:
    raw = value.split(',')
    if not 1 <= len(raw) <= 50:
        raise ValueError('每次最多查询 50 个番号')
    codes = list(dict.fromkeys(code_key(code) for code in raw))
    items, avatars = {}, {}
    snapshots = _snapshots(contract, codes)
    with contract.database.read_connection() as connection:
        excluded = entities.male_performer_ids(connection)
        for code in codes:
            people = {}
            for row in connection.execute(
                    "SELECT DISTINCT e.id,e.canonical_name FROM asset a "
                    "JOIN asset_entity ae ON ae.asset_id=a.id JOIN entity e ON e.id=ae.entity_id "
                    "WHERE normalise_code_key(a.code)=? AND a.medium='video' AND a.disposal IS NULL "
                    "AND e.kind='performer' ORDER BY e.canonical_name", (code,)):
                if row['id'] not in excluded:
                    people[entities.normalize_entity_name(row['canonical_name'])] = {
                        'id': row['id'], 'name': row['canonical_name']}
            source = snapshots.get(code, {})
            for actor in visible_actors(connection, source or {}, excluded):
                name = actor['name'].strip()
                key = entities.normalize_entity_name(name)
                if key and key not in people:
                    found = entities.resolve_entity(connection, 'performer', name)
                    people[key] = {'id': found['id'] if found else None, 'name': name}
            for person in people.values():
                entity_id = person['id']
                if entity_id is None or not contract.has_entity_image('performer', entity_id):
                    continue
                if entity_id not in avatars:
                    try:
                        path, _ = preview.entity_image('performer', entity_id)
                        with Image.open(path) as original:
                            image = ImageOps.fit(original.convert('RGB'), (64, 64))
                        output = io.BytesIO()
                        image.save(output, format='JPEG', quality=75)
                        avatars[entity_id] = 'data:image/jpeg;base64,' + base64.b64encode(output.getvalue()).decode('ascii')
                    except (PreviewUnavailable, OSError, ValueError):
                        avatars[entity_id] = ''
                        person['avatar_unavailable'] = True
                if avatars[entity_id]:
                    person['avatar'] = avatars[entity_id]
            items[code] = list(people.values())
    return {'ok': True, 'source': 'local-cache', 'items': items}
