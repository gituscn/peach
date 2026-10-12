"""匿名协议、身份核对、图片包装与只读详情投影。"""
import io
import json
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

from PIL import Image

from peach.http import HttpResponse
from peach.javdb_public import PublicAPI, PublicSourceUnavailable, decode_image, preview_video_url
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

    def test_preview_entry_accepts_only_the_public_hls_origin_and_path(self):
        url = 'https://jdforrepam.com/api/v1/movies/ttm3u8/preview/123/0/720p.m3u8?token=sample'
        self.assertEqual(preview_video_url({'preview_video_url': url}), url)
        for value in (url.replace('https:', 'http:'), url.replace('jdforrepam.com', 'jdforrepam.com.evil.example'),
                      url.replace('https://', 'https://user:pass@'), url.replace('/preview/', '/private/'),
                      url.replace('.com/', '.com:8443/'), url + '#fragment', 'javascript:alert(1)',
                      'https://jdforrepam.com:wrong/preview.m3u8'):
            with self.subTest(url=value):
                self.assertEqual(preview_video_url({'preview_video_url': value}), '')

    def test_actor_images_are_bound_to_current_work_and_cached(self):
        api = self.api()
        original = io.BytesIO()
        Image.new('RGB', (40, 60)).save(original, 'PNG')
        movie = {'id': 'Exact', 'actors': [{'id': 'Person', 'avatar_url': 'https://tp.spfcas.com/avatars/person.jpg'}]}
        with patch.object(api, 'movie', return_value=movie), \
                patch.object(api, '_get', return_value=HttpResponse(200, {}, original.getvalue())) as get:
            first = api.image('EXM-001', 'actor:Person')
            self.assertTrue(first.startswith('data:image/jpeg;base64,'))
            self.assertEqual(api.image('EXM-001', 'actor:Person'), first)
            get.assert_called_once()
            with self.assertRaises(ValueError):
                api.image('EXM-001', 'actor:OtherPerson')
            movie['actors'][0]['avatar_url'] = 'https://private.example/person.jpg'
            with self.assertRaises(PublicSourceUnavailable):
                api.image('EXM-001', 'actor:Person')
            get.assert_called_once()


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

    def test_source_avatars_and_studio_logos_preserve_each_identity(self):
        movie = {'id': 'Exact', 'actors': [
            {'id': 'Known', 'name': '甲', 'avatar_url': 'https://tp.spfcas.com/a.jpg'},
            {'id': 'Known', 'name': '甲', 'avatar_url': 'https://tp.spfcas.com/a.jpg'},
            {'id': 'Unknown', 'name': '乙', 'avatar_url': 'https://tp.spfcas.com/b.jpg'}], 'maker_name': '示例厂牌'}
        with patch('peach.web_jav_detail.PUBLIC_API.movie', return_value=movie), \
                patch.object(self.contract, 'has_logo', return_value=True), \
                patch.object(self.contract, 'logo_version', return_value='logo-version'):
            result = q_jav_detail(self.contract, {'code': 'EXM-001'})
        self.assertEqual([(ref['name'], ref['source_actor_id']) for ref in result['performer_refs']],
                         [('甲', 'Known'), ('乙', 'Unknown')])
        self.assertTrue(all(ref['source_avatar'] and ref['id'] is None for ref in result['performer_refs']))
        self.assertEqual(result['studio_refs'][0]['has_logo'], True)
        self.assertEqual(result['studio_refs'][0]['logo_version'], 'logo-version')
        with patch('peach.web_jav_detail.PUBLIC_API.image', return_value='data:image/jpeg;base64,sample') as image:
            self.assertTrue(q_jav_image(self.contract, {'code': 'EXM-001', 'image': 'actor:Unknown'})['ok'])
        image.assert_called_once_with('EXM-001', 'actor:Unknown')

    def test_local_performer_reference_keeps_canonical_identity_and_face_crop(self):
        movie = {'id': 'Exact', 'actors': [
            {'id': 'Known', 'name': '来源别名', 'avatar_url': 'https://tp.spfcas.com/a.jpg'},
            {'id': 'Unknown', 'name': '未登记人物', 'avatar_url': 'https://tp.spfcas.com/b.jpg'}]}
        def resolve(connection, kind, name):
            return {'id': 7, 'canonical_name': '规范人物'} if kind == 'performer' and name == '来源别名' else None
        with patch('peach.web_jav_detail.PUBLIC_API.movie', return_value=movie), \
                patch('peach.web_jav_detail.entities.resolve_entity', side_effect=resolve), \
                patch.object(self.contract, 'has_entity_image', return_value=True), \
                patch.object(self.contract, 'entity_image_version', return_value='face-version'), \
                patch.object(self.contract, 'avatar_focus', return_value={'axis': 'y', 'pct': 7}):
            result = q_jav_detail(self.contract, {'code': 'EXM-001'})
        first, second = result['performer_refs']
        self.assertEqual((first['id'], first['name'], first['source_actor_id']), (7, '规范人物', 'Known'))
        self.assertEqual(first['avatar_focus'], {'axis': 'y', 'pct': 7})
        self.assertEqual(first['image_version'], 'face-version')
        self.assertIsNone(second['id'])
        self.assertFalse(second['has_image'])
        self.assertEqual(second['source_actor_id'], 'Unknown')

    def test_tag_projection_uses_taxonomy_and_user_decisions_without_losing_source(self):
        movie = {'id': 'Exact', 'tags': [{'name': name} for name in
                 ('荡妇', '戀腿癖', '恋腿癖', '中出', '足交', 'Creampie', '4小時以上作品', '未知类别')]}
        with patch('peach.web_jav_detail.PUBLIC_API.movie', return_value=movie):
            result = q_jav_detail(self.contract, {'code': 'EXM-001'})
        self.assertEqual(result['tag_refs'], [
            {'name': '痴女', 'category': 'role', 'source_name': '荡妇'},
            {'name': '恋腿', 'category': 'story', 'source_name': '戀腿癖'},
            {'name': '中出内射', 'category': 'position', 'source_name': '中出'},
            {'name': '足交', 'category': 'position', 'source_name': '足交'},
            {'name': '未知类别', 'category': 'general', 'source_name': '未知类别'}])
        self.assertEqual(result['tags'], [tag['name'] for tag in movie['tags']])
        with patch('peach.web_jav_detail.PUBLIC_API.movie', return_value=movie), \
                patch('peach.web_jav_detail.load_genre_decisions', return_value={'荡妇': None, '未知类别': '护士'}):
            result = q_jav_detail(self.contract, {'code': 'EXM-001'})
        self.assertNotIn('痴女', [ref['name'] for ref in result['tag_refs']])
        self.assertEqual(result['tag_refs'][-1], {'name': '护士', 'category': 'role', 'source_name': '未知类别'})

    def test_resource_source_failure_is_explicit(self):
        with patch('peach.web_jav_detail.PUBLIC_API.movie', side_effect=PublicSourceUnavailable('资料未取得')):
            result = q_jav_resources(self.contract, {'code': 'EXM-001'})
        self.assertEqual(result['state'], 'error')
        self.assertEqual(result['items'], [])
        self.assertEqual(result['error'], '资料未取得')
