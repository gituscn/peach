"""只读 WebDAV 媒体来源：地址、凭据、扫描、字节范围与配置入口。"""
from __future__ import annotations

import base64
import json
import sqlite3
import tempfile
import threading
import unittest
from contextlib import closing
from email.utils import formatdate
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from unittest.mock import patch
from urllib.parse import quote, unquote, urlsplit

import httpx
from fastapi import FastAPI
from fastapi.testclient import TestClient

from peach import media_configuration, media_identity, scan, settings_file, smb_media, webdav_media
from peach.migrations import upgrade
from peach.routes_auth import require_auth
from peach.routes_configuration import router
from peach.smb_response import SmbResponse
from peach.webdav_transport import READAHEAD, WebDavConnection, WebDavTransport

PREFIX = '/dav/movies'


class _DavServer:
    """只读的 WebDAV 测试服务：PROPFIND 0/1、GET 与 HEAD 的字节范围、写方法一律 405。"""

    def __init__(self, directory: Path, *, username='reader', password='secret'):
        self.directory = directory
        self.username, self.password = username, password
        self.requests: list[tuple[str, str, dict[str, str]]] = []
        self.lock = threading.Lock()
        owner = self

        class Handler(BaseHTTPRequestHandler):
            protocol_version = 'HTTP/1.1'

            def log_message(self, *_args):
                pass

            def _record(self):
                with owner.lock:
                    owner.requests.append((self.command, self.path, dict(self.headers.items())))

            def _authorized(self):
                expected = 'Basic ' + base64.b64encode(
                    f'{owner.username}:{owner.password}'.encode()).decode()
                if self.headers.get('Authorization') != expected:
                    self.send_response(401)
                    self.send_header('WWW-Authenticate', 'Basic realm="dav"')
                    self.send_header('Content-Length', '0')
                    self.end_headers()
                    return False
                return True

            def _target(self):
                path = unquote(urlsplit(self.path).path)
                if not path.startswith(PREFIX):
                    return None
                parts = [part for part in path[len(PREFIX):].split('/') if part]
                if any(part in ('.', '..') for part in parts):
                    return None
                return owner.directory.joinpath(*parts)

            def _href(self, path):
                relative = path.relative_to(owner.directory)
                encoded = '/'.join(quote(part, safe='') for part in relative.parts)
                suffix = '/' if path.is_dir() else ''
                return f'{PREFIX}/{encoded}{suffix}' if encoded else f'{PREFIX}/'

            def _not_found(self):
                self.send_response(404)
                self.send_header('Content-Length', '0')
                self.end_headers()

            def do_PROPFIND(self):
                self._record()
                if not self._authorized():
                    return
                target = self._target()
                if target is None or not target.exists():
                    self._not_found()
                    return
                depth = self.headers.get('Depth', '0')
                paths = [target]
                if depth != '0' and target.is_dir():
                    paths.extend(sorted(target.iterdir(), key=lambda item: item.name))
                rows = []
                for path in paths:
                    info = path.stat()
                    kind = '<D:collection/>' if path.is_dir() else ''
                    size = '' if path.is_dir() else f'<D:getcontentlength>{info.st_size}</D:getcontentlength>'
                    rows.append(
                        '<D:response><D:href>' + self._href(path) + '</D:href><D:propstat><D:prop>'
                        f'<D:resourcetype>{kind}</D:resourcetype>{size}'
                        f'<D:getlastmodified>{formatdate(info.st_mtime, usegmt=True)}</D:getlastmodified>'
                        '</D:prop><D:status>HTTP/1.1 200 OK</D:status></D:propstat></D:response>')
                body = ('<?xml version="1.0" encoding="UTF-8"?>\n<D:multistatus xmlns:D="DAV:">'
                        + ''.join(rows) + '</D:multistatus>').encode('utf-8')
                self.send_response(207)
                self.send_header('Content-Type', 'application/xml; charset=utf-8')
                self.send_header('Content-Length', str(len(body)))
                self.end_headers()
                self.wfile.write(body)

            def do_GET(self):
                self._serve_range(head=False)

            def do_HEAD(self):
                self._serve_range(head=True)

            def _serve_range(self, *, head):
                self._record()
                if not self._authorized():
                    return
                target = self._target()
                if target is None or not target.exists():
                    self._not_found()
                    return
                if target.is_dir():
                    body = b'<!DOCTYPE html><title>index</title>'
                    self.send_response(200)
                    self.send_header('Content-Type', 'text/html; charset=utf-8')
                    self.send_header('Content-Length', str(len(body)))
                    self.end_headers()
                    if not head:
                        self.wfile.write(body)
                    return
                data = target.read_bytes()
                header = self.headers.get('Range', '')
                start, end, status = 0, len(data) - 1, 200
                if header.startswith('bytes='):
                    left, separator, right = header[6:].partition('-')
                    if separator:
                        start = int(left) if left else max(0, len(data) - int(right))
                        end = min(int(right) if left and right else len(data) - 1, len(data) - 1)
                        status = 206 if 0 <= start <= end < len(data) else 416
                if status == 416:
                    self.send_response(416)
                    self.send_header('Content-Range', f'bytes */{len(data)}')
                    self.send_header('Content-Length', '0')
                    self.end_headers()
                    return
                payload = data[start:end + 1]
                self.send_response(status)
                self.send_header('Accept-Ranges', 'bytes')
                self.send_header('Content-Length', str(len(payload)))
                if status == 206:
                    self.send_header('Content-Range', f'bytes {start}-{end}/{len(data)}')
                self.end_headers()
                if not head:
                    self.wfile.write(payload)

            def _refuse_write(self):
                self._record()
                self.send_response(405)
                self.send_header('Allow', 'OPTIONS, PROPFIND, GET, HEAD')
                self.send_header('Content-Length', '0')
                self.end_headers()

            do_PUT = do_DELETE = do_MOVE = do_MKCOL = do_PROPPATCH = _refuse_write

        self.server = ThreadingHTTPServer(('127.0.0.1', 0), Handler)
        self.server.daemon_threads = True
        self.thread = threading.Thread(target=self.server.serve_forever, daemon=True)
        self.thread.start()

    @property
    def url(self):
        return f'http://127.0.0.1:{self.server.server_port}{PREFIX}'

    def close(self):
        self.server.shutdown()
        self.server.server_close()


def _config(directory: Path, url: str, *, username='reader', password='secret'):
    config = settings_file.PeachConfig(
        directory, directory / 'config.toml', present=True,
        locations={'local': ('R:\\WebDAV',)}, mounts={'local': (url,)},
        library_catalog={'lib': {'name': 'WebDAV'}},
        storage_roots={'root-one': {'root': 'R:\\WebDAV', 'location': 'local', 'mount': url,
                                    'cost': 'free', 'library_id': 'lib', 'transport': 'webdav'}})
    if username:
        webdav_media.credential_store(config).save(
            'webdav-root-one', {'username': username, 'password': password})
    return config


class WebDavFixture(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory()
        self.directory = Path(self.temporary.name).resolve()
        self.media = self.directory / 'media'
        (self.media / 'Sub').mkdir(parents=True)
        (self.media / 'ABC-123.mp4').write_bytes(b'0123456789')
        (self.media / 'ABC-123.srt').write_text('1\n00:00:00,000 --> 00:00:01,000\n字幕\n', encoding='utf-8')
        (self.media / 'Sub' / 'DEF-456.mp4').write_bytes(b'abcdefghij')
        self.server = _DavServer(self.media)

    def tearDown(self):
        self.server.close()
        smb_media.close_bridge()
        self.temporary.cleanup()


class AddressTests(unittest.TestCase):
    def test_address_rejects_credentials_queries_and_path_escape(self):
        for value in ('ftp://nas/dav', 'http://user:pass@nas/dav', 'http://nas/dav?x=1',
                      'http://nas/dav#x', 'http://nas/dav/%2e%2e/private', 'http://nas/dav/a%2fb',
                      'http://nas/dav/file:stream', 'http://:80/dav'):
            with self.subTest(value=value), self.assertRaises(ValueError):
                webdav_media.address(value)

    def test_canonical_normalizes_host_port_and_percent_encoding(self):
        self.assertEqual(webdav_media.canonical('HTTP://NAS:80/dav/中文/'),
                         'http://nas/dav/%E4%B8%AD%E6%96%87')
        self.assertEqual(webdav_media.canonical('https://nas:443/dav'), 'https://nas/dav')
        self.assertEqual(webdav_media.canonical('http://[::1]:8900/dav'), 'http://[::1]:8900/dav')
        self.assertTrue(webdav_media.is_address('https://nas/dav'))
        self.assertFalse(webdav_media.is_address('smb://nas/share'))
        self.assertTrue(smb_media.is_remote_address('http://nas/dav'))
        self.assertTrue(smb_media.is_remote_address('smb://nas/share'))
        self.assertFalse(smb_media.is_remote_address('/media'))

    def test_connection_hides_password_from_repr(self):
        connection = WebDavConnection('http://nas/dav', username='reader', password='private-password')
        self.assertNotIn('private-password', repr(connection))
        with self.assertRaises(ValueError):
            WebDavConnection('http://user:pass@nas/dav')
        with self.assertRaises(ValueError):
            WebDavConnection('http://nas/dav', timeout=0)


class TransportTests(WebDavFixture):
    def test_stat_scandir_and_nested_directories(self):
        transport = WebDavTransport(WebDavConnection(self.server.url, 'reader', 'secret', timeout=8))
        try:
            info = transport.stat(())
            self.assertTrue(info.is_dir)
            entries = {entry.name: entry for entry in transport.scandir(())}
            self.assertEqual(set(entries), {'ABC-123.mp4', 'ABC-123.srt', 'Sub'})
            self.assertEqual(entries['ABC-123.mp4'].st_size, 10)
            self.assertTrue(entries['Sub'].is_dir)
            self.assertEqual([entry.name for entry in transport.scandir(('Sub',))], ['DEF-456.mp4'])
            with self.assertRaises(FileNotFoundError):
                transport.stat(('missing',))
        finally:
            transport.close()

    def test_reader_seeks_with_range_requests(self):
        transport = WebDavTransport(WebDavConnection(self.server.url, 'reader', 'secret', timeout=8))
        try:
            with transport.open(('ABC-123.mp4',)) as handle:
                self.assertEqual(handle.read(4), b'0123')
                self.assertEqual(handle.seek(-3, 2), 7)
                self.assertEqual(handle.read(), b'789')
                handle.seek(2)
                self.assertEqual(handle.read(2), b'23')
        finally:
            transport.close()
        transport = WebDavTransport(WebDavConnection(self.server.url, 'reader', 'secret', timeout=8))
        try:
            with transport.open(('ABC-123.mp4',)) as handle:
                self.assertEqual(handle.read(), b'0123456789')
        finally:
            transport.close()
        ranges = [headers.get('Range') for method, _path, headers in self.server.requests
                  if method == 'GET' and 'Range' in headers]
        self.assertTrue(ranges)
        self.assertTrue(all(value.startswith('bytes=') for value in ranges))

    def test_reads_are_authenticated_and_reject_wrong_password(self):
        with self.assertRaises(PermissionError):
            WebDavTransport(WebDavConnection(self.server.url, 'reader', 'wrong')).stat(())
        with self.assertRaises(PermissionError):
            WebDavTransport(WebDavConnection(self.server.url)).stat(())

    def test_mutations_are_refused_and_never_reach_the_server(self):
        config = _config(self.directory, self.server.url)
        resource = smb_media.resolve(r'R:\WebDAV\ABC-123.mp4', config)
        self.assertIsInstance(resource, webdav_media.WebDavResource)
        for operation in (lambda: resource.rename(resource.with_name('other.mp4')),
                          resource.unlink, resource.rmdir, lambda: resource.open('wb'),
                          lambda: resource.mkdir()):
            with self.assertRaises(PermissionError):
                operation()
        with self.assertRaises(PermissionError):
            resource._transport().rename(('ABC-123.mp4',), ('other.mp4',))
        self.assertFalse(any(method in {'PUT', 'DELETE', 'MOVE', 'MKCOL', 'PROPPATCH'}
                             for method, _path, _headers in self.server.requests))

    def test_resource_reads_through_saved_credentials(self):
        config = _config(self.directory, self.server.url)
        resource = smb_media.resolve(r'R:\WebDAV\Sub\DEF-456.mp4', config)
        self.assertEqual((resource.name, resource.relative), ('DEF-456.mp4', ('Sub', 'DEF-456.mp4')))
        self.assertEqual(resource.read_bytes(), b'abcdefghij')
        self.assertEqual(resource.stat().st_size, 10)
        with self.assertRaises(FileNotFoundError):
            smb_media.resolve(r'R:\WebDAV\missing.mp4', config).read_bytes()


class CredentialTests(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory()
        self.directory = Path(self.temporary.name).resolve()
        self.config = _config(self.directory, 'http://nas/dav', username='')
        self.sources = [{'location': 'local', 'path': 'http://nas/dav', 'root': 'R:\\WebDAV',
                         'webdav_username': 'reader', 'webdav_password': 'private-password'}]

    def tearDown(self):
        self.temporary.cleanup()

    def test_blank_password_keeps_saved_value_and_username_change_drops_it(self):
        webdav_media.save_credentials(self.config, self.sources)
        connection = webdav_media.connection_for(self.config, 'root-one', 'http://nas/dav')
        self.assertEqual((connection.username, connection.password), ('reader', 'private-password'))
        webdav_media.save_credentials(self.config, [{**self.sources[0], 'webdav_password': ''}])
        self.assertEqual(webdav_media.connection_for(self.config, 'root-one', 'http://nas/dav').password,
                         'private-password')
        webdav_media.save_credentials(self.config, [{**self.sources[0], 'webdav_username': 'other',
                                                     'webdav_password': ''}])
        connection = webdav_media.connection_for(self.config, 'root-one', 'http://nas/dav')
        self.assertEqual((connection.username, connection.password), ('other', ''))
        webdav_media.save_credentials(self.config, [{**self.sources[0], 'webdav_clear': True}])
        self.assertEqual(webdav_media.connection_for(self.config, 'root-one', 'http://nas/dav').password, '')

    def test_credential_transaction_restores_after_failed_save(self):
        webdav_media.save_credentials(self.config, self.sources)
        with self.assertRaises(OSError):
            with webdav_media.credential_transaction(
                    self.config, [{**self.sources[0], 'webdav_password': 'replacement'}]):
                raise OSError('模拟配置文件替换失败')
        self.assertEqual(webdav_media.connection_for(self.config, 'root-one', 'http://nas/dav').password,
                         'private-password')


class ConfigurationTests(WebDavFixture):
    def test_validation_saves_transport_and_keeps_password_out_of_responses(self):
        config = settings_file.PeachConfig(self.directory, self.directory / 'config.toml',
                                           present=True, locations={})
        sources = media_configuration.prepare_sources([
            {'location': 'local', 'path': self.server.url, 'library': 'WebDAV', 'cost': 'free',
             'webdav_username': 'reader', 'webdav_password': 'secret'}], windows=True, config=config)
        _locations, mounts, errors = media_configuration.validate(sources, windows=True, config=config)
        self.assertEqual(errors, [])
        self.assertEqual(mounts, {'local': (self.server.url,)})
        prepared = media_identity.configure_sources(config, sources, windows=True)
        self.assertEqual(prepared.storage_roots[next(iter(prepared.storage_roots))]['transport'], 'webdav')
        webdav_media.save_credentials(prepared, sources)
        body = settings_file.render(prepared)
        self.assertNotIn('secret', body)
        prepared.path.write_text(body, encoding='utf-8')
        loaded = settings_file.load_config(environ={'PEACH_DATA_ROOT': str(self.directory)})
        rows = media_configuration.rows(loaded, windows=True)
        self.assertEqual(rows[0]['transport'], 'webdav')
        self.assertTrue(rows[0]['webdav_password_saved'])
        self.assertEqual(rows[0]['webdav_username'], 'reader')
        self.assertNotIn('secret', json.dumps(rows))
        self.assertEqual(media_configuration.rows(loaded, windows=True, probe=True)[0]['online'], True)

    def test_webdav_rows_require_an_http_address(self):
        config = settings_file.PeachConfig(self.directory, self.directory / 'config.toml',
                                           present=True, locations={})
        sources = media_configuration.prepare_sources([
            {'location': 'local', 'path': 'smb://nas/share', 'transport': 'webdav', 'root': 'R:\\WebDAV'}],
            windows=True, config=config)
        _locations, _mounts, errors = media_configuration.validate(sources, windows=True, config=config)
        self.assertTrue(errors)


class ScanTests(WebDavFixture):
    def test_scan_uses_webdav_transport_and_pairs_subtitles(self):
        config = _config(self.directory, self.server.url)
        ledger_root = 'R:\\WebDAV'
        db = self.directory / 'ledger.db'
        upgrade(db, Path(__file__).resolve().parents[1] / 'migrations')
        with patch('peach.settings_file.active', return_value=config):
            first = scan.scan_location(db, 'local', ledger_root, declared_roots=config.locations,
                                       mounts=config.mounts, windows=False, report=lambda _line: None)
            second = scan.scan_location(db, 'local', ledger_root, declared_roots=config.locations,
                                        mounts=config.mounts, windows=False, report=lambda _line: None)
        self.assertEqual((first.files, first.subtitles, second.files), (3, 1, 3))
        with closing(sqlite3.connect(db)) as connection:
            paths = {row[0] for row in connection.execute("SELECT path FROM asset WHERE medium='video'")}
            self.assertEqual(paths, {ledger_root + '\\ABC-123.mp4', ledger_root + '\\Sub\\DEF-456.mp4'})
            self.assertEqual(connection.execute('SELECT COUNT(*) FROM asset_subtitle').fetchone()[0], 1)
        self.assertFalse(any(method in {'PUT', 'DELETE', 'MOVE', 'MKCOL'}
                             for method, _path, _headers in self.server.requests))

    def test_smb_response_serves_ranges_from_webdav(self):
        config = _config(self.directory, self.server.url)
        resource = smb_media.resolve(r'R:\WebDAV\ABC-123.mp4', config)
        app = FastAPI()

        @app.api_route('/media', methods=['GET', 'HEAD'])
        def media():
            return SmbResponse(resource)

        with TestClient(app) as client:
            self.assertEqual((client.get('/media', headers={'Range': 'bytes=3-5'}).status_code,
                              client.get('/media', headers={'Range': 'bytes=3-5'}).content), (206, b'345'))
            self.assertEqual(client.get('/media').content, b'0123456789')
            self.assertEqual(client.head('/media').headers['content-length'], '10')
            self.assertEqual(client.get('/media', headers={'Range': 'bytes=100-'}).status_code, 416)
        self.assertFalse(any(method in {'PUT', 'DELETE', 'MOVE', 'MKCOL'}
                             for method, _path, _headers in self.server.requests))

    def test_loopback_bridge_serves_webdav_ranges(self):
        config = _config(self.directory, self.server.url)
        resource = smb_media.resolve(r'R:\WebDAV\ABC-123.mp4', config)
        with patch('peach.settings_file.active', return_value=config):
            url = smb_media.input_url(str(resource))
        self.assertTrue(url.endswith('/ABC-123.mp4'))
        with httpx.Client(trust_env=False) as client:
            response = client.get(url, headers={'Range': 'bytes=3-5'})
            self.assertEqual((response.status_code, response.content), (206, b'345'))
            self.assertEqual(client.head(url).headers['content-length'], '10')
        self.assertEqual(smb_media.source_identity(url), str(resource))

    def test_configuration_test_endpoint_checks_the_webdav_root(self):
        config = _config(self.directory, self.server.url)
        app = FastAPI()
        app.include_router(router)
        app.dependency_overrides[require_auth] = lambda: {}
        body = {'path': self.server.url, 'root_id': 'root-one'}
        with patch('peach.routes_configuration.settings_file.load_config', return_value=config), TestClient(
                app, base_url='http://127.0.0.1', client=('127.0.0.1', 8000)) as client:
            response = client.post('/api/configuration/webdav/test', json=body)
            self.assertEqual(response.status_code, 200, response.text)
            self.assertEqual(response.json(), {'readable': True, 'directories': ['Sub']})
            wrong = client.post('/api/configuration/webdav/test',
                                json={**body, 'webdav_username': 'reader', 'webdav_password': 'wrong'})
            self.assertEqual(wrong.status_code, 403, wrong.text)
            missing = client.post('/api/configuration/webdav/test',
                                  json={**body, 'path': self.server.url + '/missing',
                                        'webdav_username': 'reader', 'webdav_password': 'secret'})
            self.assertEqual(missing.status_code, 404, missing.text)


class ReaderConstraintTests(unittest.TestCase):
    def test_readahead_stays_bounded(self):
        self.assertGreaterEqual(READAHEAD, 1 << 20)
