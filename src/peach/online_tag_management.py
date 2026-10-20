"""在线标签的本机名称、归类与隐藏决定；来源 metadata 保持原词。"""
from __future__ import annotations

import hashlib
import html
import json
import unicodedata
from datetime import datetime, timezone

from .profiles import DEFAULT_PROFILE_ID, read_settings

SETTINGS_KEY = 'online_tag_management'
TYPE_RANK = {'general': 0, 'metadata': 1, 'copyright': 2, 'character': 3, 'artist': 4}


def tag_key(value: str) -> str:
    return unicodedata.normalize('NFKC', html.unescape(value)).strip().casefold()


class OnlineTagPolicy:
    def __init__(self, connection=None):
        self.groups = read_settings(connection).get(SETTINGS_KEY, {}) if connection is not None else {}
        self.members = {tag_key(member): group_id for group_id, group in self.groups.items()
                        for member in [*group['members'], *group['aliases'], group['name']]}

    def identity(self, tag: str) -> tuple[str, str, bool]:
        key = tag_key(tag)
        group_id = self.members.get(key, key)
        group = self.groups.get(group_id)
        return (group_id, group['name'], group['hidden']) if group else (key, tag, False)

    def query_name(self, tag: str) -> str:
        key = tag_key(tag)
        for group in self.groups.values():
            if key in {tag_key(word) for word in [group['name'], *group['aliases'], *group['members']]}:
                return group['name']
        return self.identity(tag)[1]

    def project(self, tags, *, include_hidden=False) -> list[str]:
        output, seen = [], set()
        for tag in tags:
            group_id, name, hidden = self.identity(tag)
            if group_id not in seen and (include_hidden or not hidden):
                seen.add(group_id)
                output.append(name)
        return output

    def types(self, types: dict[str, str]) -> dict[str, str]:
        output = {}
        for tag, kind in types.items():
            _group_id, name, hidden = self.identity(tag)
            if not hidden and TYPE_RANK[kind] >= TYPE_RANK.get(output.get(name), -1):
                output[name] = kind
        return output


def _validate_rename(connection, rows, ids, name):
    """在线名称须可用于筛选，并避开可见词表与已保存的归类。"""
    if len(ids) != 1 or not 0 < len(name) <= 80 or any(ord(char) < 32 for char in name) or ',' in name:
        raise ValueError('标签名须为 1 至 80 个字符，不含逗号或控制字符')
    for row in rows:
        if row['id'] != ids[0] and tag_key(name) in {tag_key(word) for word in [row['k'], *row['aliases']]}:
            raise ValueError(f'「{name}」已属于标签「{row["k"]}」，请使用合并标签')
    for group_id, group in OnlineTagPolicy(connection).groups.items():
        if group_id != ids[0] and tag_key(name) in {tag_key(word) for word in [group['name'], *group['aliases'], *group['members']]}:
            raise ValueError(f'「{name}」已属于标签「{group["name"]}」，请使用合并标签')


def preview(connection, body, rows):
    operation = body.get('operation')
    if operation not in {'rename', 'merge', 'hide', 'restore'}:
        raise ValueError('未知的在线标签操作')
    ids = body.get('ids')
    if not isinstance(ids, list) or not 0 < len(ids) <= 2000 or any(not isinstance(value, str) or not value for value in ids):
        raise ValueError('请选择有效的在线标签，单次最多 2000 个')
    ids = sorted(set(ids))
    selected = [row for row in rows if row['id'] in ids]
    if len(selected) != len(ids):
        raise ValueError('标签已变化，请刷新后重试')
    name = unicodedata.normalize('NFKC', str(body.get('name', ''))).strip()
    target = body.get('target_id')
    if operation == 'rename':
        _validate_rename(connection, rows, ids, name)
    if operation == 'merge':
        if len(ids) < 2 or target not in ids:
            raise ValueError('请选择至少两个标签，并从中选择保留的标签')
        if len({row['cat'] for row in selected}) > 1:
            raise ValueError('请选择相同来源类型的标签合并')
    releases = {key for row in selected for key in row['_releases']}
    state = read_settings(connection).get(SETTINGS_KEY, {})
    token = hashlib.sha256(json.dumps([operation, ids, name, target, selected, state], sort_keys=True, ensure_ascii=False).encode()).hexdigest()
    return {'operation': operation, 'ids': ids, 'name': name, 'target_id': target,
            'tags': [{key: value for key, value in row.items() if not key.startswith('_')} for row in selected],
            'assets': len(releases), 'overlap': sum(row['n'] for row in selected) - len(releases), 'token': token}


def apply_plan(connection, body, rows):
    plan = preview(connection, body, rows)
    if plan['token'] != body.get('token'):
        raise ValueError('标签已变化，请重新预览操作范围')
    settings = read_settings(connection)
    groups = settings.setdefault(SETTINGS_KEY, {})
    rows = {row['id']: row for row in plan['tags']}
    for group_id, row in rows.items():
        groups.setdefault(group_id, {'name': row['k'], 'hidden': row['hidden'], 'members': row['members'], 'aliases': row['aliases']})
    if plan['operation'] == 'rename':
        group = groups[plan['ids'][0]]
        group['aliases'] = sorted(set([*group['aliases'], group['name']]))
        group['name'] = plan['name']
    elif plan['operation'] == 'merge':
        target = groups[plan['target_id']]
        for group_id in plan['ids']:
            if group_id == plan['target_id']:
                continue
            source = groups.pop(group_id)
            target['members'] = sorted(set([*target['members'], *source['members']]))
            target['aliases'] = sorted(set([*target['aliases'], source['name'], *source['aliases']]))
    else:
        for group_id in plan['ids']:
            groups[group_id]['hidden'] = plan['operation'] == 'hide'
    changed = connection.execute('UPDATE profile SET settings_json=?,updated_at=? WHERE id=?',
        (json.dumps(settings, ensure_ascii=False), datetime.now(timezone.utc).isoformat(), DEFAULT_PROFILE_ID)).rowcount
    if not changed:
        raise ValueError('当前用户设置不存在')
    return {'ok': True, 'operation': plan['operation'], 'assets': plan['assets']}
