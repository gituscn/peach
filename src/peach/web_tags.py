"""标签管理的读取、预览与事务写入端点。"""
from __future__ import annotations

from datetime import datetime, timezone
from uuid import uuid4

from .migrations import sqlite_backup
from .tag_management import apply_plan, duplicate_groups, preview, tag_rows
from . import online_tag_management
from .web_follow import online_tag_inventory


def _online(body):
    scope = body.get('scope', 'local')
    if scope not in ('local', 'online'):
        raise ValueError('未知的标签词表')
    return scope == 'online'


def q_tag_management(contract, args):
    with contract.read_connection() as connection:
        if _online(args):
            return {'items': [{key: value for key, value in row.items() if not key.startswith('_')}
                              for row in online_tag_inventory(connection)], 'duplicate_groups': []}
        rows = tag_rows(connection)
        return {'items': rows, 'duplicate_groups': duplicate_groups(rows)}


def w_tag_preview(contract, body):
    with contract.read_connection() as connection:
        return (online_tag_management.preview(connection, body, online_tag_inventory(connection)) if _online(body)
                else preview(connection, body))


def w_tag_management(contract, body):
    with contract.write_transaction() as connection:
        connection.execute('BEGIN IMMEDIATE')
        online = _online(body)
        rows = online_tag_inventory(connection) if online else None
        plan = online_tag_management.preview(connection, body, rows) if online else preview(connection, body)
        if plan['token'] != body.get('token'):
            raise ValueError('标签已变化，请重新预览操作范围')
        stamp = datetime.now(timezone.utc).strftime('%Y%m%d-%H%M%S')
        backup = contract.db_path.with_name(f'ledger.pre-tag-management-{stamp}-{uuid4().hex[:8]}.db')
        sqlite_backup(contract.db_path, backup)
        result = online_tag_management.apply_plan(connection, body, rows) if online else apply_plan(connection, body)
    contract.cache_bust()
    return result
