"""从本地账本、资料缓存与下载预算规划待执行的流量。"""
from __future__ import annotations

from itertools import islice
import os
import sqlite3
from statistics import median
from contextlib import closing

MIB = 1024 ** 2


def cached_names(directory):
    try:
        with os.scandir(directory) as entries:
            return {entry.name.casefold() for entry in entries}
    except OSError:
        return set()


def ledger_rows(db_path, asset_ids=None):
    query = """SELECT asset.*,
        EXISTS(SELECT 1 FROM asset_entity ae JOIN entity e ON ae.entity_id=e.id
               WHERE ae.asset_id=asset.id AND e.kind='performer') AS performers,
        EXISTS(SELECT 1 FROM asset_tag t WHERE t.asset_id=asset.id AND t.tag NOT LIKE '演员:%') AS tags
        FROM asset WHERE medium='video' AND disposal IS NULL"""
    parameters = []
    if asset_ids is not None:
        query += ' AND id IN (' + ','.join('?' for _ in asset_ids) + ')'
        parameters = asset_ids
    with closing(sqlite3.connect(db_path, timeout=30)) as connection:
        connection.row_factory = sqlite3.Row
        return [dict(row) for row in connection.execute(query, parameters)]


def typical_size(directory, pattern, fallback):
    """只在本机缓存抽取至多 256 个文件大小，不访问媒体挂载。"""
    sizes = []
    for path in islice(directory.glob(pattern), 256):
        try:
            size = path.stat().st_size
            if size > 0:
                sizes.append(size)
        except OSError:
            pass
    return int(median(sizes)) if sizes else fallback


class TrafficPlan:
    def __init__(self, config, stage, media_key):
        from .library_processing import _MissCache, _RemoteSession, misses_path
        self.config, self.stage, self.media_key = config, stage, media_key
        self.remote = _RemoteSession(config, None, _MissCache(misses_path(config)), retrying=False)
        self.cover_root = config.directory('generated') / 'covers'
        self.cover_bytes = typical_size(self.cover_root, '*.jpg', MIB // 2)
        self.nfo_bytes = typical_size(config.directory('sources') / 'library-metadata', '*.nfo', 32 * 1024)
        self.units = {}
        self.outside_budget = {}
        self.completed = set()
        self.cover_ready = {}
        self.cover_names = cached_names(self.cover_root)
        self.evidence_names = cached_names(config.directory('sources') / 'library-metadata')
        self.proxy = {}

    def _add(self, token, key, amount, *, budgeted=True):
        if amount <= 0 or token in self.completed or token.partition(':')[0] + ':*' in self.completed:
            return
        unit = self.units.setdefault(token, {})
        unit[key] = unit.get(key, 0) + int(amount)
        if not budgeted:
            outside = self.outside_budget.setdefault(token, {})
            outside[key] = outside.get(key, 0) + int(amount)

    def _ready(self, code):
        from .library_processing import cover_settled
        if code not in self.cover_ready:
            self.cover_ready[code] = ((code + '.jpg').casefold() in self.cover_names
                                     and cover_settled(self.cover_root / (code + '.jpg')))
        return self.cover_ready[code]

    def _network(self, source):
        from . import peach_proxy
        from .scraping_access import values_for
        if source not in self.proxy:
            root = self.config.directory('secrets')
            if values_for(root, source).get('network') == 'direct':
                self.proxy[source] = False
            else:
                try:
                    options = peach_proxy.client_options(root)
                    self.proxy[source] = bool(options.get('proxy') or options.get('trust_env', True))
                except ValueError:
                    self.proxy[source] = True
        return 'metadata-proxy' if self.proxy[source] else 'metadata-direct'

    def refresh(self, rows):
        from .library_processing import _provider_code, _scrapes_as_jav, _missing_fields
        from .catalog_rules import release_code_from_filename
        self.assets = list(rows)
        self.units = {}
        self.outside_budget = {}
        titles = {}
        for row in self.assets:
            if self.stage == 'previews' and row['location'] != 'local':
                continue
            key = self.media_key(row['path'], row['location'])
            if key is None:
                continue
            code = _provider_code(row.get('code')) or release_code_from_filename(row.get('name') or '')
            eligible = bool(code and _scrapes_as_jav(row, code))
            path = str(row['path'])
            if self.stage not in ('scan', 'previews'):
                # 无发行番号的创作者文件只检查配套文件，不进入 JAV 下载链。
                if eligible:
                    self._add('local:' + path, key, self.nfo_bytes)
                    if not self._ready(code):
                        self._add('local:' + path, key, self.cover_bytes)
                    title = titles.setdefault(code, dict(row=row, missing=set()))
                    title['missing'].update(_missing_fields(row))
            self._media(row, key)
        for code, title in titles.items():
            self._downloads(code, title)

    def _media(self, row, key):
        from .media_processing_policy import metadata_only
        from .media_sources import cost_for
        from .strm import skip_background_read
        path = str(row['path'])
        if skip_background_read(path):
            return
        size = max(0, row.get('size') or 0)
        if (self.stage != 'metadata' and row.get('duration') is None
                and cost_for(row['location'], path, self.config) == 'free'):
            self._add('media:' + path, key, min(size, 8 * MIB))
        if (self.stage in ('all', 'collect', 'previews') and row['location'] == 'local'
                and not row.get('snapshot_path') and not metadata_only(self.config.directory('state'))):
            self._add('media:' + path, key, min(size, 9 * 8 * MIB))

    def _downloads(self, code, title):
        from .library_processing import _studio_evidence
        from .metadata_routes import stage_name
        chain = self.remote._chain(code, *_studio_evidence(title['row']))
        askable = self.remote._askable(chain, code)
        names = [source for source in askable if f'{code}-{source}.json'.casefold() in self.evidence_names]
        cached = {source for source, _, _ in self.remote._cached_evidence(names, code)}
        pending = [source for source in askable if source not in cached]
        if title['missing']:
            for source in pending:
                # 每站一至两次请求，沿用采集器约 250KB/次的工作量基准。
                self._add('metadata:' + code, self._network(source), 2 * 250 * 1024,
                          budgeted=stage_name(source) not in ('amane', 'amane_official'))
        if (not self._ready(code) and chain
                and not self.remote._fresh_miss('cover', code, chain)):
            self._add('metadata:' + code, self._network(chain[0]), self.cover_bytes)

    def prepare_metadata(self, prepared):
        """配套文件读完后，使用任务实际取得的字段和核查范围。"""
        from .library_processing import COLLECTED_FIELDS, _missing_fields, _scrapes_as_jav
        for token in list(self.units):
            if token.startswith('metadata:'):
                self.units.pop(token)
                self.outside_budget.pop(token, None)
        titles = {}
        for row, code, verify, local_fields, *_ in prepared:
            if code and _scrapes_as_jav(row, code):
                title = titles.setdefault(code, dict(row=row, missing=set()))
                title['missing'].update(COLLECTED_FIELDS if verify else _missing_fields(row, local_fields))
        for code, title in titles.items():
            self._downloads(code, title)

    def finish(self, stage, code=None):
        from .library_processing import _provider_code
        if stage == 'metadata':
            release = _provider_code(code)
            if not release:
                return
            tokens = ['metadata:' + release]
            self.completed.update(tokens)
        else:
            tokens = [token for token in self.units if token.startswith(stage + ':')]
            self.completed.add(stage + ':*')
        for token in tokens:
            self.units.pop(token, None)
            self.outside_budget.pop(token, None)
        if stage == 'local':
            self.cover_ready.clear()
            self.cover_names = cached_names(self.cover_root)
            self.refresh(self.assets)

    def remaining(self, rows):
        from .library_processing import MAX_SOURCE_BYTES
        planned = dict.fromkeys(rows, 0)
        for unit in self.units.values():
            for key, amount in unit.items():
                if rows[key]['network']:
                    planned[key] += amount
        download_keys = [key for key, row in rows.items() if not row['root']]
        outside = {key: sum(unit.get(key, 0) for unit in self.outside_budget.values()) for key in download_keys}
        wanted = sum(planned[key] - outside[key] for key in download_keys)
        budget = max(0, MAX_SOURCE_BYTES - sum(rows[key]['used_bytes'] for key in download_keys))
        if wanted > budget:
            remaining = budget
            for key in download_keys:
                value = min(remaining, budget * (planned[key] - outside[key]) // wanted)
                planned[key] = outside[key] + value
                remaining -= value
        return planned
