"""账本版本号（migration 0038）与按版本缓存的聚合。

口味、复核、垃圾复核的结果不按时间过期，只在账本或它们读的文件变了之后重算。进程外的
写（CLI 脚本、推送发现的扫描连接、账本同步）大多直接 `sqlite3.connect`，服务看不见，
只有库里的触发器看得见，所以这里的写一律走独立连接。
"""
import sqlite3
import tempfile
import unittest
from contextlib import closing
from pathlib import Path
from unittest import mock

from peach import web_state
from peach.web_state import WebContract
from support.ledger import fresh_ledger

#: 不挂触发器的表，理由见 `migrations/0038_ledger_revision.sql` 开头。
EXEMPT = {"ledger_revision", "schema_migration", "task_run"}


def insert_asset(db_path: Path, asset_id: int) -> None:
    with closing(sqlite3.connect(db_path)) as connection, connection:
        connection.execute(
            "INSERT INTO asset(id,location,path,name,medium,size) VALUES(?,?,?,?,?,?)",
            (asset_id, "local", f"R:\\media\\{asset_id}.mp4", f"{asset_id}.mp4", "video", 1))


class LedgerRevisionTests(unittest.TestCase):
    def setUp(self):
        self.directory = tempfile.TemporaryDirectory()
        self.addCleanup(self.directory.cleanup)
        self.db_path = fresh_ledger(self.directory.name)
        self.contract = WebContract(self.db_path)
        self.calls = 0

    def compute(self):
        self.calls += 1
        return self.calls

    def test_every_ledger_table_bumps_its_revision_on_insert_update_and_delete(self):
        with closing(sqlite3.connect(self.db_path)) as connection:
            virtual = [row[0] for row in connection.execute(
                "SELECT name FROM sqlite_master WHERE type='table' "
                "AND sql LIKE 'CREATE VIRTUAL TABLE%'")]
            tables = {row[0] for row in connection.execute(
                "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' "
                "AND sql NOT LIKE 'CREATE VIRTUAL TABLE%'")}
            tracked = {name for name in tables - EXEMPT
                       if not any(name.startswith(v + "_") for v in virtual)}
            triggers = {row[0] for row in connection.execute(
                "SELECT name FROM sqlite_master WHERE type='trigger'")}
            rows = {row[0] for row in connection.execute("SELECT tbl FROM ledger_revision")}
        missing = sorted(f"rev_{table}_{event}" for table in tracked
                         for event in ("insert", "update", "delete")
                         if f"rev_{table}_{event}" not in triggers)
        self.assertEqual(missing, [], "新表要在同一个迁移里补上版本号触发器和 ledger_revision 预置行")
        self.assertEqual(sorted(tracked - rows), [])

    def test_a_write_from_another_connection_recomputes_and_nothing_else_does(self):
        self.assertEqual(self.contract.cached_until_changed("taste", self.compute), 1)
        self.assertEqual(self.contract.cached_until_changed("taste", self.compute), 1)
        insert_asset(self.db_path, 1)
        self.assertEqual(self.contract.cached_until_changed("taste", self.compute), 2)
        self.assertEqual(self.contract.cached_until_changed("taste", self.compute), 2)

    def test_task_center_heartbeats_keep_the_cache(self):
        self.contract.cached_until_changed("review", self.compute)
        run = self.contract.task_runs.start("library-processing", trigger="manual")
        self.contract.task_runs.progress(run.id, current=5, total=10, throttle=0)
        self.contract.task_runs.heartbeat(run.id, throttle=0)
        self.assertEqual(self.contract.cached_until_changed("review", self.compute), 1)

    def test_catalog_cache_survives_download_progress_and_commit_notifications(self):
        from peach.downloads import DownloadStore, DownloadTask, POSTPROCESS_RUNNING
        tables = ('asset', 'asset_entity', 'entity')
        self.assertEqual(self.contract.cached_until_changed('catalog', self.compute, tables=tables), 1)
        task = DownloadStore(self.contract.database).save(DownloadTask(
            id=0, info_hash='a' * 40, provider='115', source_uri='', display_name='',
            target='/115/test', state='ingested'))
        DownloadStore(self.contract.database).postprocess(task.id, POSTPROCESS_RUNNING)
        self.contract.cache_bust()
        self.assertEqual(self.contract.cached_until_changed('catalog', self.compute, tables=tables), 1)
        insert_asset(self.db_path, 1)
        self.assertEqual(self.contract.cached_until_changed('catalog', self.compute, tables=tables), 2)

    def test_concurrent_catalog_requests_share_one_computation(self):
        from concurrent.futures import ThreadPoolExecutor
        from threading import Event
        entered, release = Event(), Event()
        def derive():
            self.calls += 1
            entered.set()
            release.wait(5)
            return self.calls
        with ThreadPoolExecutor(max_workers=2) as pool:
            first = pool.submit(self.contract.cached_until_changed, 'catalog', derive, tables=('asset',))
            self.assertTrue(entered.wait(5))
            second = pool.submit(self.contract.cached_until_changed, 'catalog', derive, tables=('asset',))
            release.set()
            self.assertEqual((first.result(), second.result()), (1, 1))
        self.assertEqual(self.calls, 1)

    def test_a_changed_file_input_recomputes(self):
        self.contract.cached_until_changed("review", self.compute, "csv-1")
        self.assertEqual(self.contract.cached_until_changed("review", self.compute, "csv-1"), 1)
        self.assertEqual(self.contract.cached_until_changed("review", self.compute, "csv-2"), 2)
        self.assertEqual(len([key for key in self.contract.cache if key == "review"]), 1)

    def test_a_ledger_without_revisions_falls_back_to_the_time_limit(self):
        with closing(sqlite3.connect(self.db_path)) as connection, connection:
            connection.execute("DROP TABLE ledger_revision")
        self.assertIsNone(self.contract.ledger_revision())
        with mock.patch.object(web_state.time, "monotonic", return_value=1000.0):
            self.assertEqual(self.contract.cached_until_changed("ads", self.compute), 1)
            self.assertEqual(self.contract.cached_until_changed("ads", self.compute), 1)
        with mock.patch.object(web_state.time, "monotonic",
                               return_value=1000.0 + web_state.CACHE_TTL):
            self.assertEqual(self.contract.cached_until_changed("ads", self.compute), 2)

    def test_a_commit_during_a_versioned_computation_keeps_the_result(self):
        def derive():
            self.calls += 1
            self.contract.cache_bust()
            return self.calls
        self.assertEqual(self.contract.cached_until_changed("catalog", derive, tables=("asset",)), 1)
        self.assertEqual(self.contract.cached_until_changed("catalog", derive, tables=("asset",)), 1)


class CoverIndexTests(unittest.TestCase):
    """封面索引只认封面目录：账本提交与时间都不让它重扫，换名写入的封面与边车立刻生效。"""

    def setUp(self):
        self.directory = tempfile.TemporaryDirectory()
        self.addCleanup(self.directory.cleanup)
        self.db_path = fresh_ledger(self.directory.name)
        self.covers = Path(self.directory.name) / "covers"
        self.covers.mkdir()
        (self.covers / "ABC-001.jpg").write_bytes(b"jpg")
        self.contract = WebContract(self.db_path, cover_root=self.covers)
        self.scans = mock.patch.object(
            self.contract, "_scan_cover_root", wraps=self.contract._scan_cover_root).start()
        self.addCleanup(mock.patch.stopall)

    def test_commits_and_elapsed_time_keep_the_index(self):
        self.assertTrue(self.contract.has_cover("ABC-001"))
        self.contract.cache_bust()
        insert_asset(self.db_path, 1)
        with mock.patch.object(web_state.time, "monotonic",
                               return_value=web_state.time.monotonic() + 10 * web_state.CACHE_TTL):
            self.assertTrue(self.contract.has_cover("ABC-001"))
        self.assertEqual(self.scans.call_count, 1)

    def test_rewritten_sidecars_and_added_or_removed_covers_show_up_at_once(self):
        from peach import jav_poster_crop
        self.assertIsNone(self.contract.poster_box("ABC-001"))
        jav_poster_crop.write_sidecar(self.covers / "ABC-001.jpg", jav_poster_crop.manual_record(
            800, 538, {"x0": 420, "y0": 0, "x1": 800, "y1": 538}))
        self.assertEqual(self.contract.poster_box("ABC-001")["x0"], 420)
        jav_poster_crop.write_sidecar(self.covers / "ABC-001.jpg", jav_poster_crop.manual_record(
            800, 538, {"x0": 400, "y0": 0, "x1": 800, "y1": 538}))
        self.assertEqual(self.contract.poster_box("ABC-001")["x0"], 400)
        self.assertFalse(self.contract.has_cover("XYZ-002"))
        (self.covers / "XYZ-002.jpg").write_bytes(b"jpg")
        self.assertTrue(self.contract.has_cover("XYZ-002"))
        (self.covers / "XYZ-002.jpg").unlink()
        self.assertFalse(self.contract.has_cover("XYZ-002"))


if __name__ == "__main__":
    unittest.main()
