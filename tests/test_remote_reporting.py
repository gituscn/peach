"""远程诊断只用临时同意文件与内存接收端，不访问 Sentry。"""
import json
import os
import runpy
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path
from unittest import mock

from peach import remote_reporting as reporting
from peach.settings_file import PeachConfig

DSN = "https://public@o123.ingest.us.sentry.io/456"


class RemoteReportingTests(unittest.TestCase):
    def setUp(self):
        folder = tempfile.TemporaryDirectory()
        self.addCleanup(folder.cleanup)
        self.root = Path(folder.name).resolve()
        self.config = PeachConfig(self.root, self.root / "config.toml")
        self.addCleanup(mock.patch.stopall)
        mock.patch.dict(os.environ, {"PEACH_DATA_ROOT": str(self.root), "PEACH_SENTRY_DSN": DSN}).start()
        mock.patch("peach.settings_file.active", return_value=self.config).start()
        self.addCleanup(reporting.close)
        reporting.close()

    def test_missing_invalid_and_disabled_consent_never_constructs_client(self):
        with mock.patch.object(reporting, "_new_client") as client:
            reporting.usage()
            reporting.capture("unhandled-main", ValueError("secret"))
            self.assertFalse(reporting.snapshot()["errors"])
            path = self.config.directory("state") / "remote-reporting.json"
            path.parent.mkdir(parents=True, exist_ok=True)
            for content in ('{"usage": "true", "errors": 1}', '{broken', '[]'):
                path.write_text(content, encoding="utf-8")
                reporting.usage()
                reporting.capture("unhandled-main", ValueError("secret"))
            client.assert_not_called()
        self.assertFalse((path.parent / "remote-reporting-budget.json").exists())

    def test_consent_is_strict_and_independent_and_missing_endpoint_is_visible(self):
        for invalid in ({"usage": "false", "errors": False}, {"usage": True}, []):
            with self.assertRaises(ValueError):
                reporting.save(invalid)
        reporting.save({"usage": True, "errors": False})
        self.assertTrue(reporting.snapshot()["usage"])
        self.assertFalse(reporting.snapshot()["errors"])
        with mock.patch.dict(os.environ, {"PEACH_SENTRY_DSN": ""}):
            self.assertFalse(reporting.snapshot()["available"])
            with mock.patch.object(reporting, "_new_client") as client:
                reporting.usage()
                client.assert_not_called()

    def test_dsn_only_accepts_hosted_public_https_endpoint(self):
        for value in (DSN, DSN.replace('.us.', '.'), DSN.replace('.us.', '.de.')):
            with self.subTest(value=value), mock.patch.dict(os.environ, {"PEACH_SENTRY_DSN": value}):
                self.assertEqual(reporting.dsn(), value)
        for value in ('http://public@o123.ingest.sentry.io/1', 'https://public:secret@o123.ingest.sentry.io/1',
                      'https://public@localhost/1', DSN + '?token=secret', DSN + '#secret',
                      'https://public@o123.ingest.sentry.io.evil/1'):
            with self.subTest(value=value), mock.patch.dict(os.environ, {"PEACH_SENTRY_DSN": value}):
                self.assertEqual(reporting.dsn(), "")

    def test_daily_budget_is_shared_deduplicated_and_bounded(self):
        reporting.save({"usage": True, "errors": True})
        client = mock.Mock()
        with mock.patch.object(reporting, "_new_client", return_value=client):
            reporting.usage()
            reporting.usage()
            for index in range(25):
                event = {"message": str(index)}
                reporting.send("errors", event)
                reporting.send("errors", event)
        self.assertEqual(client.capture_event.call_count, 21)
        payload = json.loads((self.config.directory("state") / "remote-reporting-budget.json").read_text())
        self.assertEqual(len(payload["errors"]), 20)

    def test_actionable_faults_keep_codes_and_omit_private_text(self):
        with mock.patch.object(reporting, "send") as send:
            cause = OSError(13, 'private movie token=secret D:/media/private.mp4')
            error = RuntimeError('private movie')
            error.__cause__ = cause
            reporting.capture("background-job", error, job_id='private-job')
            event = send.call_args.args[1]
            self.assertEqual(event["tags"]["errno"], '13')
            self.assertIn('PermissionError', event['exception']['values'][0]['value'])
            self.assertNotIn('private', json.dumps(event))
            reporting.capture('frame-capture', returncode=69,
                              stderr="private.mp4 Your platform doesn't support hardware accelerated AV1 decoding")
            self.assertEqual(send.call_args.args[1]['tags']['media_failure'], 'av1_decoder_unavailable')

    def test_expected_and_opaque_errors_stay_local(self):
        with mock.patch.object(reporting, "send") as send:
            reporting.capture('logging', message='generic error', level='ERROR')
            reporting.capture('logging', ValueError('source temporarily unavailable'), logger='sentry_sdk.errors')
            reporting.capture('http-request', ValueError('invalid input'), status_code=400)
            reporting.capture('background-result', message='cancelled')
            reporting.capture('browser', message='Script error.', stack='chrome-extension://private/file.js:1:2')
            send.assert_not_called()
            reporting.capture('browser', message='private title', stack='at https://private/dist/peach-app.js:12:34')
            self.assertEqual(send.call_args.args[1]['exception']['values'][0]['stacktrace']['frames'],
                             [{'filename': 'peach-app.js', 'lineno': 12, 'colno': 34}])

    def test_sdk_wire_payload_has_no_local_context_or_consent_path(self):
        from sentry_sdk.transport import HttpTransport
        sent = []
        reporting.save({"usage": True, "errors": True})
        with mock.patch.object(HttpTransport, "_send_envelope", side_effect=lambda envelope: sent.append(envelope.serialize())):
            reporting.capture("unhandled-main", ValueError("private title token=secret"))
            reporting._client.flush(timeout=2)
        self.assertEqual(len(sent), 1)
        wire = sent[0].decode()
        for value in ('private title', 'secret', str(self.root), 'server_name', 'contexts', 'extra', 'consent'):
            self.assertNotIn(value, wire)
        self.assertIn('ValueError', wire)

    def test_queued_event_is_dropped_after_disable_and_reenable(self):
        from sentry_sdk.transport import HttpTransport
        from sentry_sdk.envelope import Envelope
        reporting.save({"usage": True, "errors": True})
        previous = reporting.consent()
        client = reporting._new_client(DSN)
        self.addCleanup(lambda: client.close(timeout=0))
        envelope = Envelope()
        envelope.add_event({"message": "Peach started", "extra": {
            "consent": str(self.config.directory('state') / 'remote-reporting.json'),
            "kind": "usage", "revision": previous['revision']}})
        reporting.save({"usage": False, "errors": False})
        reporting.save({"usage": True, "errors": True})
        with mock.patch.object(HttpTransport, "_send_envelope") as network:
            client.transport._send_envelope(envelope)
            network.assert_not_called()

    def test_sdk_failure_does_not_break_local_error_recording(self):
        from peach import error_reporting
        reporting.save({"usage": False, "errors": True})
        with mock.patch.object(reporting, "_new_client", side_effect=OSError('offline')), \
                mock.patch.object(error_reporting, 'log_directories', return_value=[self.root / 'logs']):
            path = error_reporting.event('unhandled-main', ValueError('local detail'))
        self.assertTrue(path.is_file())

    def test_http_failure_keeps_template_and_error_id_without_request_details(self):
        with mock.patch.object(reporting, "send") as send:
            reporting.capture('http-request', ValueError('private query'), method='POST',
                              route='api/assets/{asset_id}', status_code=500, error_id='a' * 32,
                              query='token=secret', headers={'Authorization': 'secret'})
            event = send.call_args.args[1]
        self.assertEqual(event['event_id'], 'a' * 32)
        self.assertEqual(event['tags']['route_template'], 'api/assets/{asset_id}')
        self.assertEqual(event['tags']['status_code'], '500')
        self.assertNotIn('secret', json.dumps(event))

    def test_installer_choice_is_saved_without_startup_reporting(self):
        reporting.save({"usage": True, "errors": True})
        entry = runpy.run_path(str(Path(__file__).resolve().parents[1] / "scripts/build_app_entry.py"))
        with mock.patch("peach.error_reporting.install", side_effect=reporting.usage), \
                mock.patch.object(reporting, "send") as send:
            self.assertEqual(entry["main"](["Peach.exe", "--installer-reporting", "0", "0"]), 0)
            send.assert_not_called()
        self.assertFalse(reporting.consent()["usage"])
        self.assertFalse(reporting.consent()["errors"])

    def test_installer_helper_persists_explicit_choices_in_fresh_process(self):
        root = Path(__file__).resolve().parents[1]
        env = {**os.environ, 'PYTHONPATH': str(root / 'src'), 'PEACH_SENTRY_DSN': ''}
        for usage, errors in (('0', '1'), ('0', '0')):
            result = subprocess.run([sys.executable, '-X', 'utf8', str(root / 'scripts/build_app_entry.py'),
                                     '--installer-reporting', usage, errors], env=env,
                                    capture_output=True, text=True, encoding='utf-8', timeout=30)
            self.assertEqual(result.returncode, 0, result.stderr)
            self.assertEqual(reporting.consent()['usage'], usage == '1')
            self.assertEqual(reporting.consent()['errors'], errors == '1')
        self.assertFalse(self.config.path.exists())


class RemoteReportingApiTests(unittest.TestCase):
    setUp = RemoteReportingTests.setUp

    def request(self, method, path, *, peer='127.0.0.1', origin='http://test', body=None):
        import asyncio
        import httpx
        from fastapi import FastAPI
        from peach.routes_configuration import router, require_auth
        app = FastAPI()
        app.include_router(router)
        app.dependency_overrides[require_auth] = lambda: {}

        async def run():
            async with httpx.AsyncClient(transport=httpx.ASGITransport(app=app, client=(peer, 1234)),
                                         base_url='http://test') as client:
                return await client.request(method, path, json=body, headers={'Origin': origin})
        return asyncio.run(run())

    def test_local_save_and_remote_and_cross_origin_denial(self):
        endpoint = '/api/configuration/remote-reporting'
        body = {'usage': False, 'errors': True}
        response = self.request('POST', endpoint, body=body)
        self.assertEqual(response.status_code, 200, response.text)
        self.assertTrue(response.json()['errors'])
        for peer, origin in (('198.51.100.7', 'http://test'), ('127.0.0.1', 'https://external.invalid')):
            response = self.request('POST', endpoint, body={'usage': False, 'errors': False}, peer=peer, origin=origin)
            self.assertEqual(response.status_code, 403, response.text)
        self.assertTrue(reporting.consent()['errors'])
