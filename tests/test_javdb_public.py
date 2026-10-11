"""匿名协议、身份核对、图片包装与只读详情投影。"""
import io
import json
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

from PIL import Image

from peach.http import HttpResponse
from peach.javdb_public import PublicAPI, PublicSourceUnavailable, decode_image
from peach.web_jav_detail import q_jav_detail, q_jav_image, q_jav_reviews, q_jav_resources
from peach.web_state import WebContract
from peach.web_router import dispatch_api_get
from support.ledger import fresh_ledger


class PublicProtocolTests(unittest.TestCase):
    def api(self, *, wrong_code=False, blocked=False):
        self.requests = []

        def transport(request, timeout, max_bytes):
            self.requests.append(request)
            if request.url.endswith('/'):
                body = b'<script src="/assets/index-test.js"></script>'
            elif '/assets/' in request.url:
                body = b'const S1="test-middle",E1="test-suffix";'
            else:
                if blocked:
                    return HttpResponse(429, {}, b'')
                if '/search' in request.url:
                    data = {'movies': [{'id': 'Exact', 'number': 'EXM-001'}, {'id': 'Other', 'number': 'EXM-002'}]}
                elif '/reviews' in request.url:
                    data = {'reviews': [{'id': 'second' if 'page=2' in request.url else 'first', 'content': '示例评论'}]}
                else:
                    data = {'movie': {'id': 'Exact', 'number': 'EXM-002' if wrong_code else 'EXM-001', 'title': '示例作品'}}
                body = json.dumps({'success': 1, 'data': data}).encode()
            return HttpResponse(200, {}, body)

        return PublicAPI(transport, sleeper=lambda _: None)

    def test_exact_work_is_cached_and_signed_without_credentials(self):
        api = self.api()
        self.assertEqual(api.movie('EXM001')['number'], 'EXM-001')
        self.assertEqual(api.movie('EXM-001')['id'], 'Exact')
        self.assertEqual(len(self.requests), 4)
        for request in self.requests[2:]:
            self.assertIn('jdsignature', request.headers)
            self.assertNotIn('Authorization', request.headers)
            self.assertNotIn('Cookie', request.headers)
        self.assertEqual(api.peek_movie('exm001')['id'], 'Exact')
        self.assertIsNone(api.peek_movie('EXM-999'))

    def test_mismatched_detail_is_rejected(self):
        with self.assertRaisesRegex(PublicSourceUnavailable, '身份不匹配'):
            self.api(wrong_code=True).movie('EXM-001')

    def test_rate_limit_stops_retrying(self):
        api = self.api(blocked=True)
        with self.assertRaises(PublicSourceUnavailable):
            api.movie('EXM-001')
        count = len(self.requests)
        with self.assertRaises(PublicSourceUnavailable):
            api.movie('EXM-001')
        self.assertEqual(len(self.requests), count)

    def test_local_retry_does_not_extend_source_cooldown(self):
        api = self.api(blocked=True)
        stamp = [100.0]
        api.clock = lambda: stamp[0]
        with self.assertRaises(PublicSourceUnavailable):
            api.movie('EXM-001')
        deadline = api.paused_until
        stamp[0] += 890
        with self.assertRaises(PublicSourceUnavailable):
            api.movie('EXM-001')
        self.assertEqual(api.paused_until, deadline)

    def test_missing_work_does_not_block_another_work(self):
        api = self.api()
        with self.assertRaises(PublicSourceUnavailable):
            api.movie('EXM-999')
        self.assertEqual(api.movie('EXM-001')['id'], 'Exact')

    def test_transport_failure_cools_source_without_repeating_io(self):
        api = self.api()
        api._signature()
        with patch.object(api, 'transport', side_effect=OSError('连接未取得')) as transport:
            with self.assertRaises(PublicSourceUnavailable):
                api.movie('EXM-001')
            self.assertGreater(api.paused_until, api.clock())
            with self.assertRaises(PublicSourceUnavailable):
                api.movie('EXM-001')
            self.assertEqual(transport.call_count, 1)

    def test_reviews_request_page_and_enforce_budget(self):
        api = self.api()
        self.assertEqual(api.reviews('EXM-001', 2)[0]['id'], 'second')
        with self.assertRaises(ValueError):
            api.reviews('EXM-001', 9)

    def test_image_wrappers_decode_to_real_pixels(self):
        original = io.BytesIO()
        Image.new('RGB', (40, 20), (40, 100, 160)).save(original, 'PNG')
        raw = original.getvalue()
        for wrapped in (raw, bytes([31]) + bytes(b ^ 31 for b in raw), bytes(b ^ 127 for b in raw)):
            with self.subTest(length=len(wrapped)):
                with Image.open(io.BytesIO(decode_image(wrapped))) as decoded:
                    decoded.load()
                    self.assertEqual(decoded.size, (40, 20))
        with self.assertRaises(PublicSourceUnavailable):
            decode_image(b'<html>unavailable</html>')


class DetailProjectionTests(unittest.TestCase):
    def setUp(self):
        temporary = tempfile.TemporaryDirectory()
        self.addCleanup(temporary.cleanup)
        self.contract = WebContract(fresh_ledger(temporary.name), cover_root=Path(temporary.name) / 'covers')
        self.addCleanup(self.contract.stop_background_jobs)
        self.contract.followups.stop()

    def test_details_project_source_metadata_without_writing_ledger(self):
        movie = {'id': 'Exact', 'number': 'EXM-001', 'title': '示例作品', 'actors': [{'name': '示例人物'}],
                 'maker_name': '示例厂牌', 'series_name': '示例系列', 'tags': [{'name': '示例标签'}],
                 'score': 4.2, 'duration': 120, 'comments_count': 23, 'preview_images': []}
        with self.contract.database.read_connection() as connection:
            before = connection.execute('SELECT COUNT(*) FROM feed_discovery').fetchone()[0]
        with patch('peach.web_jav_detail.PUBLIC_API.movie', return_value=movie):
            result = dispatch_api_get(self.contract, '/api/jav/detail', {'code': 'exm001'})
        self.assertEqual(result['state'], 'ready')
        self.assertEqual(result['performer_refs'][0]['name'], '示例人物')
        self.assertIsNone(result['performer_refs'][0]['id'])
        self.assertEqual(result['tags'], ['示例标签'])
        self.assertEqual(result['source_url'], 'https://javdb.com/v/Exact')
        with self.contract.database.read_connection() as connection:
            self.assertEqual(connection.execute('SELECT COUNT(*) FROM feed_discovery').fetchone()[0], before)

    def test_source_failure_keeps_usable_detail_and_reviews_failure_is_explicit(self):
        with patch('peach.web_jav_detail.PUBLIC_API.movie', side_effect=PublicSourceUnavailable('资料未取得')):
            result = q_jav_detail(self.contract, {'code': 'EXM-001'})
        self.assertEqual(result['code'], 'EXM-001')
        self.assertEqual(result['state'], 'partial')
        self.assertEqual(result['message'], '资料未取得')
        with patch('peach.web_jav_detail.PUBLIC_API.reviews', side_effect=PublicSourceUnavailable('评论未取得')):
            self.assertFalse(q_jav_reviews(self.contract, {'code': 'EXM-001'})['ok'])

    def test_invalid_identity_and_image_are_rejected_before_network(self):
        with patch('peach.web_jav_detail.PUBLIC_API.movie') as movie:
            with self.assertRaises(ValueError):
                q_jav_detail(self.contract, {'code': '../secret'})
            with self.assertRaises(ValueError):
                q_jav_image(self.contract, {'code': 'EXM-001', 'image': '-1'})
            movie.assert_not_called()

    def test_resources_normalize_and_deduplicate_valid_magnets(self):
        fingerprint = 'a' * 40
        rows = [{'hash': fingerprint, 'name': '示例资源', 'cnsub': True, 'hd': True,
                 'size': '3 GB', 'files_count': 2, 'created_at': '2026-10-12'},
                {'hash': fingerprint}, {'hash': 'invalid'}]
        with patch('peach.web_jav_detail.PUBLIC_API.movie', return_value={'id': 'Exact'}), \
                patch('peach.web_jav_detail.PUBLIC_API.magnets', return_value=rows) as magnets:
            result = q_jav_resources(self.contract, {'code': 'EXM-001', 'refresh': '1'})
        magnets.assert_called_once_with('EXM-001', refresh=True)
        self.assertEqual(result['state'], 'ready')
        self.assertEqual(len(result['items']), 1)
        self.assertEqual(result['items'][0]['info_hash'], fingerprint)
        self.assertTrue(result['items'][0]['uri'].startswith('magnet:?'))
        self.assertEqual(result['items'][0]['attributes'], ['中字', '高清'])
        self.assertEqual(result['source_url'], 'https://javdb.com/v/Exact')

    def test_resource_source_failure_is_explicit(self):
        with patch('peach.web_jav_detail.PUBLIC_API.movie', side_effect=PublicSourceUnavailable('资料未取得')):
            result = q_jav_resources(self.contract, {'code': 'EXM-001'})
        self.assertEqual(result['state'], 'error')
        self.assertEqual(result['items'], [])
        self.assertEqual(result['error'], '资料未取得')
