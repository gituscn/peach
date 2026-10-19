"""馆藏任务的逐目录流量读数、代理流量保护分账与粗估。"""
from __future__ import annotations

import math
import re
import threading
import time
from contextlib import contextmanager
from contextvars import ContextVar
from pathlib import PureWindowsPath

from .media_sources import CLOUD_LOCATIONS, cost_for

CURRENT = ContextVar('peach_processing_traffic', default=None)
ROUTE = ContextVar('peach_processing_traffic_route', default='metadata')
MIB = 1024 ** 2
STATISTICS = re.compile(r'Statistics:\s*(\d+) bytes read')


def _key(path):
    return str(PureWindowsPath(path)).rstrip('\\').casefold()


def record_download(size):
    meter = CURRENT.get()
    if meter is not None:
        meter.add(ROUTE.get(), size)


def unobserved(reason):
    meter = CURRENT.get()
    if meter is not None:
        meter.mark(ROUTE.get(), reason)


def record_media_read(path, size):
    meter = CURRENT.get()
    if meter is not None:
        meter.media_read(str(path), size)


def media_statistics(path, stderr):
    """FFmpeg 的输入读取量；挂载缓存和预读由挂载工具管理。"""
    meter = CURRENT.get()
    if meter is None:
        return
    text = stderr.decode('utf-8', 'replace') if isinstance(stderr, bytes) else str(stderr or '')
    sizes = STATISTICS.findall(text)
    if sizes:
        record_media_read(path, sum(map(int, sizes)))
    else:
        meter.media_read(str(path), 0, missing=True)


@contextmanager
def download_route(metered):
    token = ROUTE.set('metadata-proxy' if metered else 'metadata-direct')
    try:
        yield
    finally:
        ROUTE.reset(token)


class ProcessingTraffic:
    def __init__(self, config, db_path, stage, asset_ids=None, *, resume_state=None):
        self.config, self.db_path, self.stage, self.asset_ids = config, db_path, stage, asset_ids
        self.lock = threading.RLock()
        self.publish = lambda: None
        self.published_at = 0
        self.owner = threading.get_ident()
        self.rows = {}
        for location, roots in config.locations.items():
            for root in roots:
                self.rows[f'{location}:{_key(root)}'] = dict(
                    label=config.library_names.get(root) or root, root=root, location=location,
                    metered=cost_for(location, root, config) == 'metered',
                    network=location in CLOUD_LOCATIONS or cost_for(location, root, config) == 'metered',
                    used_bytes=0, remaining_min=0, remaining_max=0, unobserved=[])
        for key, label, metered in [('metadata', '影片资料', True),
                                     ('metadata-proxy', '影片资料', True),
                                     ('metadata-direct', '影片资料', False)]:
            self.rows[key] = dict(label=label, root='', location='metadata', metered=metered,
                network=True, used_bytes=0, remaining_min=0, remaining_max=0, unobserved=[])
        previous = (resume_state or {}).get('traffic') or {}
        for old in previous.get('sources', []):
            if old.get('key') in self.rows:
                self.rows[old['key']].update(used_bytes=old.get('used_bytes', 0),
                                           unobserved=list(old.get('unobserved', [])))
            elif old.get('key') and old.get('used_bytes'):
                self.rows[old['key']] = {key: old[key] for key in
                    ('label', 'root', 'location', 'metered', 'network', 'used_bytes', 'unobserved')}
                self.rows[old['key']].update(remaining_min=0, remaining_max=0)
        self.unknown_files = stage in ('all', 'scan') and asset_ids is None
        from .processing_traffic_plan import TrafficPlan
        self.plan = TrafficPlan(config, stage, self._media_key)
        self.plan.completed.update(previous.get('completed_work', []))
        self.refresh_plan()

    @contextmanager
    def bind(self):
        token = CURRENT.set(self)
        try:
            yield self
        finally:
            CURRENT.reset(token)

    def _media_key(self, path, location=None):
        candidates = []
        for key, row in self.rows.items():
            if not row['root'] or location and row['location'] != location:
                continue
            roots = self.config.locations.get(row['location'], ())
            if row['root'] not in roots:
                continue
            index = roots.index(row['root'])
            mounts = self.config.mounts.get(row['location'], ())
            for prefix in [row['root'], *([mounts[index]] if index < len(mounts) else [])]:
                declared, actual = _key(prefix), _key(path)
                if actual == declared or actual.startswith(declared + '\\'):
                    candidates.append((len(declared), key))
        return max(candidates)[1] if candidates else None

    def refresh_plan(self, rows=None):
        """账本统计不访问媒体目录；保护开启的目录不预估自动探测。"""
        if rows is None:
            from .processing_traffic_plan import ledger_rows
            rows = ledger_rows(self.db_path, self.asset_ids)
        with self.lock:
            self.plan.refresh(rows)
            for row in self.rows.values():
                if row['root'] and row['network']:
                    self._reason(row, '挂载缓存与预读未观测')

    def finish_work(self, stage, code=None):
        with self.lock:
            self.plan.finish(stage, code)

    def prepare_metadata(self, prepared):
        with self.lock:
            self.plan.prepare_metadata(prepared)

    @staticmethod
    def _reason(row, reason):
        if reason not in row['unobserved']:
            row['unobserved'].append(reason)

    def mark(self, key, reason):
        with self.lock:
            self._reason(self.rows[key], reason)

    def add(self, key, size):
        if not isinstance(size, (int, float)) or not math.isfinite(size) or size <= 0:
            return
        with self.lock:
            row = self.rows[key]
            if not row['network']:
                return
            row['used_bytes'] += int(size)
            if threading.get_ident() != self.owner or time.monotonic() - self.published_at < 0.5:
                return
            self.published_at = time.monotonic()
        self.publish()

    def media_read(self, path, size, *, missing=False):
        key = self._media_key(path)
        if key is not None:
            if self.rows[key]['network']:
                self.mark(key, '挂载缓存与预读未观测')
            if missing:
                self.mark(key, '媒体读取量未取得')
            self.add(key, size)

    def snapshot(self, *, finished=False):
        with self.lock:
            sources = []
            remaining = self.plan.remaining(self.rows)
            for key, row in self.rows.items():
                amount = 0 if finished else remaining[key]
                if not row['root'] and not row['used_bytes'] and not amount and not row['unobserved']:
                    continue
                source = {**row, 'unobserved': list(row['unobserved'])}
                sources.append(dict(key=key, **source,
                    estimated_bytes=row['used_bytes'] + amount,
                    estimated_min_bytes=row['used_bytes'],
                    estimated_max_bytes=row['used_bytes'] + amount))
            result = dict(sources=sources, unknown_files=self.unknown_files and not finished,
                          partial=any(row['unobserved'] for row in sources),
                          completed_work=sorted(self.plan.completed))
            for field in ('used_bytes', 'estimated_bytes', 'estimated_min_bytes', 'estimated_max_bytes'):
                result[field] = sum(row[field] for row in sources)
                result['metered_' + field] = sum(row[field] for row in sources if row['metered'])
            return result
