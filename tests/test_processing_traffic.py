"""馆藏任务按媒体目录的流量保护选项分账。"""
import gzip
import sqlite3
import subprocess
import tempfile
import unittest
from contextlib import closing
from dataclasses import replace
from pathlib import Path
from types import SimpleNamespace
from unittest.mock import patch

import httpx

from peach.http import HttpRequest, HttpxTransport
from peach.processing_traffic import ProcessingTraffic, download_route, media_statistics, record_download, record_media_read
from peach.settings_file import PeachConfig
from support.ledger import fresh_ledger


class ProcessingTrafficTests(unittest.TestCase):
    def setUp(self):
        temporary = tempfile.TemporaryDirectory()
        self.addCleanup(temporary.cleanup)
        self.root = Path(temporary.name).resolve()
        self.config = PeachConfig(self.root, self.root / 'config.toml', present=True,
            locations={'mounted': ('A:\\Cloud', 'B:\\Cloud'), 'local': ('R:\\Media',)},
            media_costs={'A:\\Cloud': 'metered', 'B:\\Cloud': 'free'})
        self.db = fresh_ledger(self.root)

    def test_media_reads_follow_each_root_and_totals_conserve_bytes(self):
        traffic = ProcessingTraffic(self.config, self.db, 'metadata')
        with traffic.bind():
            record_media_read('A:\\Cloud\\a.nfo', 100)
            record_media_read('B:\\Cloud\\b.jpg', 200)
            record_media_read('R:\\Media\\c.jpg', 300)
            record_download(50)
        result = traffic.snapshot()
        drives = {row['root']: row for row in result['sources'] if row.get('root')}
        self.assertEqual(drives['A:\\Cloud']['used_bytes'], 100)
        self.assertTrue(drives['A:\\Cloud']['metered'])
        self.assertEqual(drives['B:\\Cloud']['used_bytes'], 200)
        self.assertFalse(drives['B:\\Cloud']['metered'])
        self.assertEqual(drives['R:\\Media']['used_bytes'], 0)
        self.assertEqual(result['used_bytes'], 350)
        self.assertEqual(result['used_bytes'], sum(row['used_bytes'] for row in result['sources']))
        self.assertEqual(result['metered_used_bytes'], sum(row['used_bytes'] for row in result['sources'] if row['metered']))

    def test_http_counts_compressed_download_and_failed_partial_stream(self):
        packed = gzip.compress(b'a' * 10000)
        class Broken(httpx.SyncByteStream):
            def __iter__(self):
                yield b'abcd'
                raise httpx.ReadError('断开')
        replies = iter([httpx.Response(200, headers={'content-encoding': 'gzip'}, stream=httpx.ByteStream(packed)),
                        httpx.Response(200, stream=Broken())])
        client = httpx.Client(transport=httpx.MockTransport(lambda request: next(replies)))
        self.addCleanup(client.close)
        transport = HttpxTransport(client)
        traffic = ProcessingTraffic(self.config, self.db, 'metadata')
        with traffic.bind():
            self.assertEqual(len(transport(HttpRequest('GET', 'https://example.com/a', {}), 1, 20000).body), 10000)
            with self.assertRaises(httpx.ReadError):
                transport(HttpRequest('GET', 'https://example.com/b', {}), 1, 20000)
        self.assertEqual(traffic.snapshot()['used_bytes'], len(packed) + 4)

    def test_resume_keeps_counts_and_fresh_task_starts_at_zero(self):
        traffic = ProcessingTraffic(self.config, self.db, 'collect')
        with traffic.bind():
            record_media_read('A:\\Cloud\\a.nfo', 100)
        restored = ProcessingTraffic(self.config, self.db, 'collect', resume_state={'traffic': traffic.snapshot()})
        with restored.bind():
            record_media_read('A:\\Cloud\\a.nfo', 25)
        self.assertEqual(restored.snapshot()['used_bytes'], 125)
        self.assertEqual(ProcessingTraffic(self.config, self.db, 'collect').snapshot()['used_bytes'], 0)

    def test_same_provider_roots_have_independent_proxy_estimates_and_selection(self):
        with closing(sqlite3.connect(self.db)) as connection, connection:
            for path in ('A:\\Cloud\\a.mp4', 'B:\\Cloud\\b.mp4'):
                connection.execute('INSERT INTO asset(location,path,name,medium,size) VALUES(?,?,?,?,?)',
                                   ('mounted', path, 'video.mp4', 'video', 1024**3))
        scan = ProcessingTraffic(self.config, self.db, 'scan').snapshot()
        drives = {row['root']: row for row in scan['sources']}
        self.assertEqual(drives['A:\\Cloud']['estimated_max_bytes'], 0)
        self.assertGreater(drives['B:\\Cloud']['estimated_max_bytes'], 0)
        self.assertEqual(scan['metered_estimated_max_bytes'], 0)
        self.assertEqual(scan['estimated_max_bytes'], sum(row['estimated_max_bytes'] for row in scan['sources']))
        selected = ProcessingTraffic(self.config, self.db, 'scan', [1]).snapshot()
        self.assertFalse(selected['unknown_files'])
        self.assertEqual(selected['estimated_max_bytes'], 0)

    def test_http_route_and_media_statistics_accumulate_without_cross_task_leak(self):
        traffic = ProcessingTraffic(self.config, self.db, 'collect')
        with traffic.bind():
            with download_route(False):
                record_download(50)
            with download_route(True):
                record_download(30)
            media_statistics('A:\\Cloud\\a.mp4', b'Statistics: 100 bytes read, 1 seeks\n')
            media_statistics('B:\\Cloud\\b.mp4', b'ffmpeg timeout')
        record_download(500)
        result = traffic.snapshot()
        self.assertEqual(result['used_bytes'], 180)
        self.assertEqual(result['metered_used_bytes'], 130)
        self.assertTrue(result['partial'])

    def test_read_only_estimate_uses_requested_stage_without_starting_a_job(self):
        from peach.web_library_processing import q_library_processing
        database_root = self.config.directory('database')
        database_root.mkdir(parents=True)
        db = fresh_ledger(database_root)
        contract = SimpleNamespace(db_path=db)
        before = set(self.root.rglob('*'))
        with patch('peach.web_library_processing.settings_file.active', return_value=self.config):
            response = q_library_processing(contract, {'estimate': '1', 'stage': 'scan'})
            with self.assertRaises(ValueError):
                q_library_processing(contract, {'estimate': '1', 'stage': 'invalid'})
        self.assertTrue(response['traffic']['unknown_files'])
        self.assertEqual(response['traffic']['used_bytes'], 0)
        self.assertEqual(set(self.root.rglob('*')), before)

    def test_mount_alias_and_longest_root_own_the_read(self):
        config = replace(self.config, locations={'mounted': ('A:\\Cloud', 'A:\\Cloud\\Direct')},
            mounts={'mounted': ('/mnt/cloud', '/mnt/direct')},
            media_costs={'A:\\Cloud': 'metered', 'A:\\Cloud\\Direct': 'free'})
        traffic = ProcessingTraffic(config, self.db, 'metadata')
        with traffic.bind():
            record_media_read('a:\\cloud\\DIRECT\\a.nfo', 100)
            record_media_read('/mnt/cloud/b.nfo', 50)
            record_media_read('/mnt/direct/c.nfo', 25)
        result = traffic.snapshot()
        self.assertEqual(result['used_bytes'], 175)
        self.assertEqual(result['metered_used_bytes'], 50)

    def test_plan_uses_scanned_workload_without_an_asset_id_parameter_list(self):
        traffic = ProcessingTraffic(self.config, self.db, 'scan')
        rows = [dict(location='mounted', path='B:\\Cloud\\a.mp4', size=1024**3,
                     duration=None, snapshot_path=None)]
        with patch('peach.processing_traffic.sqlite3.connect', side_effect=AssertionError('重复查询')):
            traffic.refresh_plan(rows)
        self.assertGreater(traffic.snapshot()['estimated_max_bytes'], 0)
        self.assertEqual(traffic.snapshot()['metered_estimated_max_bytes'], 0)

    def test_real_ffmpeg_probe_and_frame_report_input_reads(self):
        from peach.ffmpeg import FFmpegResolver
        from peach.frame_capture import capture_frame
        from peach.media_probe import probe_file
        from support.conditions import missing_prerequisite
        resolver = FFmpegResolver(self.root)
        ffmpeg, ffprobe = resolver.ffmpeg(), resolver.ffprobe()
        if ffmpeg is None or ffprobe is None:
            missing_prerequisite('媒体流量实证需要 FFmpeg 与 ffprobe')
        source = self.root / '示例.mp4'
        subprocess.run([str(ffmpeg.path), '-y', '-v', 'error', '-f', 'lavfi', '-i',
                        'color=c=black:s=320x180:r=5:d=1', '-c:v', 'mpeg4', str(source)],
                       capture_output=True, check=True, timeout=20)
        config = replace(self.config, locations={'mounted': ('A:\\Cloud',)},
                         mounts={'mounted': (str(self.root),)})
        traffic = ProcessingTraffic(config, self.db, 'collect')
        with traffic.bind():
            self.assertGreater(probe_file(str(ffprobe.path), str(source))[0], 0)
            probed = traffic.snapshot()['used_bytes']
            self.assertGreater(probed, 0)
            success, _ = capture_frame(str(ffmpeg.path), str(source), 0.1, self.root / 'frame.jpg')
            self.assertTrue(success)
            self.assertGreater(traffic.snapshot()['used_bytes'], probed)
