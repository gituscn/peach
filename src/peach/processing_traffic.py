"""馆藏任务的逐目录流量读数、代理流量保护分账与粗估。"""
from __future__ import annotations

import math
import re
import sqlite3
import threading
import time
from contextlib import closing, contextmanager
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
        query = "SELECT location,path,size,duration,snapshot_path FROM asset WHERE medium='video' AND disposal IS NULL"
        params = []
        if self.asset_ids is not None:
            query += ' AND id IN (' + ','.join('?' for _ in self.asset_ids) + ')'
            params += self.asset_ids
        if rows is None:
            with closing(sqlite3.connect(self.db_path, timeout=30)) as connection:
                assets = connection.execute(query, params).fetchall()
        else:
            assets = [(row['location'], row['path'], row['size'], row['duration'], row['snapshot_path']) for row in rows]
        with self.lock:
            for row in self.rows.values():
                row.update(remaining_min=0, remaining_max=0)
            for location, path, size, duration, preview in assets:
                key = self._media_key(path, location)
                if key is None or self.stage == 'previews' and location != 'local':
                    continue
                row = self.rows[key]
                size = max(0, size or 0)
                from .strm import skip_background_read
                readable = not skip_background_read(path)
                if self.stage != 'previews' and self.stage != 'scan':
                    # 资料和配套图片的工作量只用于粗估，不当作实测下载。
                    self.rows['metadata']['remaining_min'] += MIB // 4
                    self.rows['metadata']['remaining_max'] += 8 * MIB
                    if row['network']:
                        row['remaining_max'] += 2 * MIB
                if self.stage != 'metadata' and duration is None and not row['metered'] and row['network'] and readable:
                    row['remaining_min'] += min(size, MIB)
                    row['remaining_max'] += min(size, 32 * MIB)
                if self.stage in ('all', 'collect', 'previews') and location == 'local' and row['network'] and not preview and readable:
                    from .media_processing_policy import metadata_only
                    if not metadata_only(self.config.directory('state')):
                        row['remaining_max'] += min(size, 9 * 32 * MIB)
                if row['network']:
                    self._reason(row, '挂载缓存与预读未观测')

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
            remaining = self.rows['metadata'] if key.startswith('metadata-') else row
            for field in ('remaining_min', 'remaining_max'):
                remaining[field] = max(0, remaining[field] - int(size))
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
            for key, row in self.rows.items():
                if not row['root'] and not row['used_bytes'] and not row['remaining_max'] and not row['unobserved']:
                    continue
                source = {**row, 'unobserved': list(row['unobserved'])}
                sources.append(dict(key=key, **source,
                    estimated_min_bytes=row['used_bytes'] + (0 if finished else row['remaining_min']),
                    estimated_max_bytes=row['used_bytes'] + (0 if finished else row['remaining_max'])))
            result = dict(sources=sources, unknown_files=self.unknown_files and not finished,
                          partial=any(row['unobserved'] for row in sources))
            for field in ('used_bytes', 'estimated_min_bytes', 'estimated_max_bytes'):
                result[field] = sum(row[field] for row in sources)
                result['metered_' + field] = sum(row[field] for row in sources if row['metered'])
            return result
