"""官方预告的精确作品身份、地址边界、固定成功缓存和短期缺失缓存。"""
import json
import tempfile
import unittest
from pathlib import Path
from unittest.mock import Mock, patch

import httpx

from peach.http import HttpResponse
from peach.jav_official_preview import prestige_preview
from peach.javdb_public import PublicAPI, PublicSourceUnavailable
from peach.preview_cache import PreviewCache
from peach.remote_media_cache import cache_for
from peach.web_jav_detail import q_jav_detail
from peach.web_state import WebContract
from support.ledger import fresh_ledger

UUID = '69fa4c03-103c-482e-aec5-14f971ba4d7d'
VIDEO = 'https://www.prestige-av.com/api/media/6/9/' + UUID + '.mp4'


class OfficialPreviewTests(unittest.TestCase):
    def transport(self, product):
        return Mock(side_effect=[HttpResponse(200, {}, json.dumps({'parentProduct': {'uuid': UUID}}).encode()),
                                 HttpResponse(200, {}, json.dumps(product).encode())])

    def product(self, **values):
        return {'uuid': UUID, 'sku': [{'deliveryItemId': 'EXM-001'}],
                'movie': {'path': '6/9/' + UUID + '.mp4', 'mimeType': 'video/mp4', 'isLimited': 0}, **values}

    def test_exact_sku_provides_declared_public_mp4_without_media_download(self):
        transport = self.transport(self.product())
        self.assertEqual(prestige_preview('EXM-001', Path('unused'), transport=transport), VIDEO)
        self.assertEqual(transport.call_count, 2)
        self.assertTrue(transport.call_args_list[0].args[0].url.endswith('/api/sku/item/EXM-001'))
        self.assertTrue(transport.call_args_list[1].args[0].url.endswith('/api/product/' + UUID))

    def test_undeclared_fields_wrong_identity_and_private_movies_are_unavailable(self):
        missing = self.product()
        del missing['movie']
        for product in [missing, self.product(uuid='another'), self.product(sku=[{'deliveryItemId': 'EXM-002'}]),
                        self.product(movie={'path': '../private.mp4', 'mimeType': 'video/mp4', 'isLimited': 0}),
                        self.product(movie={'path': '6/9/' + UUID + '.mp4', 'mimeType': 'video/mp4', 'isLimited': 1})]:
            with self.subTest(product=product), self.assertRaises(PublicSourceUnavailable):
                prestige_preview('EXM-001', Path('unused'), transport=self.transport(product))

    def test_source_absence_is_distinct_from_transport_failure(self):
        self.assertEqual(prestige_preview('EXM-001', Path('unused'), transport=self.transport(self.product(movie=None))), '')
        with self.assertRaises(PublicSourceUnavailable):
            prestige_preview('EXM-001', Path('unused'), transport=Mock(side_effect=httpx.ConnectError('offline')))

    def test_empty_preview_rechecks_daily_and_good_old_preview_survives_restart(self):
        with tempfile.TemporaryDirectory() as directory:
            now = [1791936000.0]
            root = Path(directory).resolve()
            api = PublicAPI(cache_root=root, clock=lambda: now[0], wallclock=lambda: now[0])
            fetch = Mock(return_value='')
            self.assertEqual(api.official_preview('EXM-001', fetch, released='2020-01-01')['url'], '')
            api.official_preview('EXM-001', fetch, released='2020-01-01')
            self.assertEqual(fetch.call_count, 1)
            now[0] += 86400
            fetch.return_value = VIDEO
            self.assertEqual(api.official_preview('EXM-001', fetch, released='2020-01-01')['url'], VIDEO)
            self.assertEqual(fetch.call_count, 2)
            now[0] += 86400 * 400
            restarted = PublicAPI(cache_root=root, clock=lambda: now[0], wallclock=lambda: now[0])
            forbidden = Mock(side_effect=AssertionError('来源请求不可执行'))
            self.assertEqual(restarted.official_preview('EXM-001', forbidden)['url'], VIDEO)
            forbidden.assert_not_called()

    def test_detail_projects_official_mp4_and_preserves_movie_metadata(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory).resolve()
            contract = WebContract(fresh_ledger(root), cover_root=root / 'covers')
            self.addCleanup(contract.stop_background_jobs)
            movie = {'number': 'EXM-001', 'id': 'Exact', 'maker_name': 'PRESTIGE,プレステージ',
                     'release_date': '2020-01-01', 'preview_video_url': None}
            api = PublicAPI()
            api.movie = Mock(return_value=movie)
            with patch('peach.web_jav_detail.PUBLIC_API', api), \
                    patch('peach.jav_official_preview.prestige_preview', return_value=VIDEO) as official:
                payload = q_jav_detail(contract, {'code': 'EXM-001'})
                again = q_jav_detail(contract, {'code': 'EXM-001'})
            self.assertEqual(payload['preview_state'], 'ready')
            self.assertEqual(payload['preview_video_url'], again['preview_video_url'])
            self.assertFalse(payload['preview_video_url'].endswith('.m3u8'))
            ref = payload['preview_video_url'].rsplit('/', 1)[-1]
            self.assertEqual(PreviewCache(cache_for(contract)).source('EXM-001', ref), {'url': VIDEO, 'playlist': False, 'media_type': 'video/mp4'})
            official.assert_called_once()
            self.assertEqual(movie['preview_video_url'], None)

    def test_failed_official_preview_keeps_detail_and_reports_retryable_state(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory).resolve()
            contract = WebContract(fresh_ledger(root), cover_root=root / 'covers')
            self.addCleanup(contract.stop_background_jobs)
            api = PublicAPI()
            api.movie = Mock(return_value={'number': 'EXM-001', 'id': 'Exact', 'maker_name': 'Prestige'})
            with patch('peach.web_jav_detail.PUBLIC_API', api), \
                    patch('peach.jav_official_preview.prestige_preview', side_effect=PublicSourceUnavailable('预告连接未取得')):
                payload = q_jav_detail(contract, {'code': 'EXM-001'})
            self.assertEqual(payload['state'], 'ready')
            self.assertEqual(payload['preview_state'], 'unavailable')
            self.assertIn('预告连接未取得', payload['message'])
