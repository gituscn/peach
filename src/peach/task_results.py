"""任务中心的领域结果：明细留在原处，摘要保留可读的数量。"""
from __future__ import annotations


RESULT_FIELDS = {
    'link-check': ('gone_count', 'unclear_count'),
    'resource-scan': ('missing', 'unreadable', 'cache_files'),
    'resource-apply': ('cache_blocked_count',),
    'follow-check': ('source_failed', 'source_warning'),
    'feed-check': ('source_failed', 'source_warning'),
    'follow-resolve': ('resolve_failed', 'sources_found', 'source_failed'),
    'taste-refresh': ('warning_count', 'profiles_checked'),
    'organize': ('skipped',),
}


def result_counts(task_key: str, state: dict) -> dict:
    """只折算已知的结果结构；缺失的明细不推断成零。"""
    summary = {}
    if task_key == 'link-check':
        for field in ('gone', 'unclear'):
            if isinstance(state.get(field), list):
                summary[f'{field}_count'] = len(state[field])
    elif task_key == 'resource-scan' and isinstance(state.get('result'), dict):
        result = state['result']
        for field in ('missing', 'purge', 'vanish', 'empty', 'unreadable'):
            if isinstance(result.get(field), int):
                summary[field] = result[field]
        cache = result.get('cache') if isinstance(result.get('cache'), dict) else {}
        for field in ('files', 'bytes'):
            if isinstance(cache.get(field), int):
                summary[f'cache_{field}'] = cache[field]
    elif task_key == 'resource-apply' and isinstance(state.get('cache_blocked'), list):
        summary['cache_blocked_count'] = len(state['cache_blocked'])
    elif task_key in ('follow-check', 'feed-check') and isinstance(state.get('results'), list):
        rows = [row for row in state['results'] if isinstance(row, dict)]
        summary['source_failed'] = sum(row.get('ok') is False for row in rows)
        summary['source_warning'] = sum(bool(row.get('backfill_error')) for row in rows)
        for field in ('added', 'updated', 'discovered', 'without_code'):
            if field not in state and any(field in row for row in rows):
                summary[field] = sum(row.get(field, 0) for row in rows
                                     if isinstance(row.get(field, 0), int))
    elif task_key == 'follow-resolve' and isinstance(state.get('results'), list):
        rows = [row for row in state['results'] if isinstance(row, dict)]
        summary['resolve_failed'] = sum(row.get('kind') == 'error' for row in rows)
        summary['source_failed'] = sum(len(row.get('failures') or []) for row in rows)
        summary['sources_found'] = sum(len(row.get('candidates') or []) for row in rows)
    elif task_key == 'taste-refresh':
        if isinstance(state.get('warnings'), list):
            summary['warning_count'] = len(state['warnings'])
        if isinstance(state.get('refresh'), list):
            summary['profiles_checked'] = len(state['refresh'])
    elif task_key == 'organize' and isinstance(state.get('counts'), dict):
        counts = state['counts']
        if isinstance(counts.get('skip'), int):
            summary['skipped'] = counts['skip']
    return summary
