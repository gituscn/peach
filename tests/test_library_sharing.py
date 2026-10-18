"""群体研究的同意、只读投影、周期限制和独立传输回归。"""
import json
import os
import tempfile
import unittest
from pathlib import Path
from types import SimpleNamespace
from unittest import mock

from peach import library_sharing as sharing
from peach.repository import LedgerDatabase
from peach.settings_file import PeachConfig
from support.ledger import fresh_ledger

DSN = 'https://public@o123.ingest.us.sentry.io/789'


class LibrarySharingTests(unittest.TestCase):
    def setUp(self):
        holder = tempfile.TemporaryDirectory()
        self.addCleanup(holder.cleanup)
        self.root = Path(holder.name).resolve()
        self.config = PeachConfig(self.root, self.root / 'config.toml')
        self.database = LedgerDatabase(fresh_ledger(self.root))
        self.contract = SimpleNamespace(read_connection=self.database.read_connection,
                                        taste_history_store=self.root / 'taste/history.sqlite')
        self.service = sharing.Service(self.config, self.contract)
        self.addCleanup(self.service.stop)
        patcher = mock.patch.dict(os.environ, {'PEACH_SENTRY_DSN': '', 'PEACH_LIBRARY_SENTRY_DSN': DSN})
        patcher.start()
        self.addCleanup(patcher.stop)

    def enable(self):
        preview = self.service.preview()
        return self.service.save({'enabled': True, 'schema': sharing.SCHEMA,
                                  'consent': True, 'preview_token': preview['token']})

    def test_disabled_and_missing_endpoint_do_not_read_library_or_construct_sdk(self):
        with mock.patch.object(sharing, 'collect') as collect, \
                mock.patch('peach.remote_reporting._new_client') as client:
            self.service.attempt()
            collect.assert_not_called()
            client.assert_not_called()
        self.enable()
        with mock.patch.object(sharing, 'target', return_value=''), mock.patch.object(sharing, 'collect') as collect:
            self.service.attempt()
            collect.assert_not_called()

    def test_enable_requires_preview_explicit_consent_and_current_schema(self):
        for body in ({'enabled': True}, {'enabled': 'true'}, {'enabled': True, 'consent': True, 'schema': sharing.SCHEMA}):
            with self.assertRaises(ValueError):
                self.service.save(body)
        preview = self.service.preview()
        with self.assertRaises(ValueError):
            self.service.save({'enabled': True, 'schema': sharing.SCHEMA, 'preview_token': preview['token']})
        self.assertTrue(self.enable()['enabled'])
        self.assertFalse(self.service.save({'enabled': False})['enabled'])
        with mock.patch.object(sharing, 'SCHEMA', sharing.SCHEMA + 1):
            self.assertFalse(sharing.snapshot(self.config)['enabled'])

    def test_preview_expires_and_cannot_be_reused(self):
        preview = self.service.preview()
        body = {'enabled': True, 'consent': True, 'schema': sharing.SCHEMA, 'preview_token': preview['token']}
        with mock.patch.object(sharing.time, 'monotonic', return_value=10**20), self.assertRaises(ValueError):
            self.service.save(body)
        self.service.save(body)
        with self.assertRaises(ValueError):
            self.service.save(body)

    def test_readonly_payload_contains_work_details_and_no_identity_or_timeline(self):
        with self.database.write_transaction() as connection:
            for code, path in (('EXM-001', 'R:/private-person/movie-a.mp4'), ('EXM-001', 'R:/private-person/movie-b.mp4')):
                connection.execute("INSERT INTO asset(location,path,name,code,medium,rating,play_count,watch_ratio,duration) "
                                   "VALUES('local',?,'private-title',?,'video',4,2,.5,600)", (path, code))
            connection.execute("INSERT INTO asset_tag(asset_id,tag,source) VALUES(1,'公开标签','manual')")
            connection.execute("INSERT INTO asset_preference(profile_id,asset_id,liked,updated_at) VALUES('local-default',1,1,'2026-10-18')")
        before = self.database.db_path.read_bytes()
        payload, data = sharing.collect(self.contract)
        self.assertEqual(self.database.db_path.read_bytes(), before)
        self.assertEqual(len(payload['library']), 1)
        work = payload['library'][0]
        self.assertEqual(work['code'], 'EXM-001')
        self.assertEqual(work['copies'], 2)
        self.assertEqual(work['ratings'], [4])
        self.assertEqual(work['play_count'], 4)
        self.assertTrue(work['liked'])
        self.assertEqual(work['tags'], ['公开标签'])
        for private in ('private-person', 'private-title', 'movie-a', 'movie-b', 'asset_id', 'visited_at', 'last_played',
                        'profile_id', 'fingerprint', 'R:/'):
            self.assertNotIn(private, data.decode())
        self.assertIn('preferences', payload)

    def test_research_project_must_be_separate_from_diagnostics(self):
        with mock.patch.dict(os.environ, {'PEACH_SENTRY_DSN': DSN}):
            self.assertEqual(sharing.target(), '')

    def test_real_sdk_sends_only_research_event_and_reviewed_attachment_once_per_week(self):
        from sentry_sdk.transport import HttpTransport
        self.enable()
        sent = []
        with mock.patch.object(HttpTransport, '_send_envelope', side_effect=lambda envelope: sent.append(envelope)):
            self.service.attempt()
            sharing.Service(self.config, self.contract).attempt()
        self.assertEqual(len(sent), 1)
        envelope = sent[0]
        self.assertEqual([item.type for item in envelope.items], ['event', 'attachment'])
        event = envelope.items[0].get_event()
        self.assertNotIn('extra', event)
        self.assertNotIn('server_name', event)
        self.assertNotIn('user', event)
        self.assertEqual(event['tags']['purpose'], 'population-research')
        attachment = json.loads(envelope.items[1].payload.get_bytes())
        self.assertEqual(attachment['schema'], sharing.SCHEMA)
        self.assertEqual(attachment['library'], [])

    def test_disable_invalidates_queued_attachment(self):
        from sentry_sdk.envelope import Envelope
        from sentry_sdk.attachments import Attachment
        self.enable()
        previous = sharing.consent(self.config)['revision']
        envelope = Envelope()
        envelope.add_event({'message': 'Peach research'})
        envelope.add_item(Attachment(bytes=b'{}', filename='peach-library-taste.json').to_envelope_item())
        self.assertTrue(self.service._gate(previous, envelope))
        self.service.save({'enabled': False})
        self.assertFalse(self.service._gate(previous, envelope))

    def test_oversized_snapshot_is_rejected_without_partial_upload(self):
        with mock.patch.object(sharing, 'MAX_BYTES', 1), self.assertRaises(ValueError):
            self.service.preview()
        self.assertFalse(sharing.snapshot(self.config)['enabled'])

    def test_preview_and_consent_api_are_local_authenticated_and_same_origin(self):
        import asyncio
        import httpx
        from fastapi import FastAPI
        from peach.routes_configuration import router, require_auth
        app = FastAPI()
        app.include_router(router)
        app.state.library_sharing = self.service
        app.dependency_overrides[require_auth] = lambda: {}

        async def request(method, path, peer='127.0.0.1', origin='http://test', body=None):
            async with httpx.AsyncClient(transport=httpx.ASGITransport(app=app, client=(peer, 1234)),
                                         base_url='http://test') as client:
                return await client.request(method, path, json=body, headers={'Origin': origin})
        endpoint = '/api/configuration/library-sharing'
        response = asyncio.run(request('GET', endpoint + '/preview'))
        self.assertEqual(response.status_code, 200, response.text)
        self.assertEqual(response.headers['cache-control'], 'no-store')
        token = response.json()['token']
        body = {'enabled': True, 'schema': sharing.SCHEMA, 'consent': True, 'preview_token': token}
        for peer, origin in (('198.51.100.7', 'http://test'), ('127.0.0.1', 'https://external.invalid')):
            self.assertEqual(asyncio.run(request('GET', endpoint + '/preview', peer, origin)).status_code, 403)
            self.assertEqual(asyncio.run(request('POST', endpoint, peer, origin, body)).status_code, 403)
        self.assertFalse(sharing.snapshot(self.config)['enabled'])
        self.assertEqual(asyncio.run(request('POST', endpoint, body=body)).status_code, 200)
