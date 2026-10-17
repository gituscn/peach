"""光鸭挂载配置、来源读取与远端写入边界。"""
from contextlib import closing
import json
from pathlib import Path
import sqlite3
import tempfile
import unittest
from unittest.mock import Mock, patch

from peach import media_configuration, onboarding, organize, resource_identification, settings_file
from peach import web_batch, web_organize, web_resource_sync
from peach.media_sources import READ_ONLY_LOCATIONS, SCANNABLE_LOCATIONS, cost_for
from support.ledger import fresh_ledger


class GuangyaSourceTests(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory()
        self.addCleanup(self.temporary.cleanup)
        self.root = Path(self.temporary.name).resolve()

    def test_cloud_only_setup_roundtrips_windows_and_macos_mounts(self):
        for windows, path in ((True, "G:/Movies"), (False, "/Volumes/Guangya/Movies")):
            with self.subTest(windows=windows):
                config = settings_file.load_config(environ={"PEACH_DATA_ROOT": str(self.root)})
                answers = onboarding.Answers(self.root, (), "127.0.0.1", 8900, "peach", [
                    {"location": "guangya", "path": path, "root": "G:/Movies"}])
                prepared = onboarding.configure(config, answers, windows=windows)
                settings_file.write(prepared, force=True)
                loaded = settings_file.load_config(environ={"PEACH_DATA_ROOT": str(self.root)})
                self.assertEqual(loaded.locations, {"guangya": ("G:\\Movies",)})
                self.assertEqual(loaded.mounts, {} if windows else {"guangya": (path,)})
                self.assertEqual(media_configuration.rows(loaded, windows=windows)[0]["path"],
                                 "G:\\Movies" if windows else path)
        self.assertFalse((self.root / "database" / "ledger.db").exists())

    def test_setup_answers_accept_the_guangya_source(self):
        from peach.routes_pages import _read_answers
        config = settings_file.load_config(environ={"PEACH_DATA_ROOT": str(self.root)})
        answers, errors = _read_answers(config, {
            "data_root": str(self.root), "media_dir": ["/Volumes/Guangya"],
            "media_location": ["guangya"], "media_root": ["G:/"], "host": "1",
        }, windows=False)
        self.assertEqual(errors, {})
        self.assertEqual(answers.media_sources[0]["location"], "guangya")
        self.assertIn("只读", dict(media_configuration.SOURCE_OPTIONS)["guangya"])

    def test_guangya_is_scannable_free_and_read_only(self):
        self.assertIn("guangya", SCANNABLE_LOCATIONS)
        self.assertIn("guangya", READ_ONLY_LOCATIONS)
        self.assertEqual(cost_for("guangya"), "free")
        with patch.object(web_resource_sync, "LOCATION_ROOT_DECLARATIONS", {"guangya": ("G:/",)}):
            self.assertEqual(web_resource_sync.configured_resource_locations(), ("guangya",))

    def test_default_identification_reads_guangya_metadata(self):
        with closing(sqlite3.connect(fresh_ledger(self.root))) as connection:
            connection.row_factory = sqlite3.Row
            connection.execute("INSERT INTO asset(id,location,path,name,medium,size) "
                               "VALUES(1,'guangya',?,'FeatureFilm.mp4','video',123)",
                               ("G:\\FeatureFilm.mp4",))
            worklist = resource_identification.build_worklist(connection)
        self.assertEqual(len(worklist), 1)

    def test_organize_refuses_guangya_before_any_filesystem_write(self):
        with patch.object(organize, "location_roots", return_value={"guangya": ("G:/",)}), \
                patch.object(organize.os, "rename") as rename:
            for paths in (("G:\\film.mp4",), ("R:\\film.mp4", "G:\\film.mp4")):
                with self.subTest(paths=paths), self.assertRaisesRegex(ValueError, "只读"):
                    organize.refuse_unverified(paths)
            with self.assertRaisesRegex(ValueError, "只读"):
                organize._rename("G:\\film.mp4", "G:\\renamed.mp4")
            with self.assertRaisesRegex(ValueError, "只读"):
                organize.apply_plan(Mock(), [{"asset_id": 1, "location": "guangya", "action": "rename",
                    "current_path": "G:\\film.mp4", "target_path": "G:\\renamed.mp4"}],
                    generated_root=self.root)
            with self.assertRaisesRegex(ValueError, "只读"):
                with organize.verified_renames("guangya", Mock()):
                    self.fail("只读来源不能注入改名通道")
            log = self.root / "organize.json"
            log.write_text(json.dumps({"entries": [{"asset_id": 1,
                "old_path": "G:\\film.mp4", "new_path": "G:\\renamed.mp4"}]}), encoding="utf-8")
            with self.assertRaisesRegex(ValueError, "只读"):
                organize.rollback_batch(Mock(), log)
            rename.assert_not_called()
        with self.assertRaisesRegex(ValueError, "只读"):
            web_organize.w_organize_apply(Mock(), {"confirm": True, "location": "guangya"})

    def test_permanent_delete_keeps_guangya_file_and_ledger_row(self):
        media = self.root / "film.mp4"
        media.write_bytes(b"media")
        with closing(sqlite3.connect(fresh_ledger(self.root))) as connection:
            connection.row_factory = sqlite3.Row
            connection.execute("INSERT INTO asset(id,location,path,name,medium) "
                               "VALUES(1,'guangya',?,'film.mp4','video')", (str(media),))
            for columns in ("id,location,path,snapshot_path", "id,path,snapshot_path"):
                with self.subTest(columns=columns):
                    result = web_batch.purge_assets(connection, connection.execute(
                        f"SELECT {columns} FROM asset").fetchall())
                    self.assertEqual(result["purged"], 0)
                    self.assertIn("只读", result["blocked"][0]["reason"])
                    self.assertEqual(connection.execute("SELECT count(*) FROM asset").fetchone()[0], 1)
                    self.assertEqual(media.read_bytes(), b"media")

    def test_missing_guangya_row_cleanup_never_cleans_remote_parents(self):
        with closing(sqlite3.connect(fresh_ledger(self.root))) as connection:
            connection.row_factory = sqlite3.Row
            connection.execute("INSERT INTO asset(id,location,path,name,medium) "
                               "VALUES(1,'guangya',?,'missing.mp4','video')", (str(self.root / "missing.mp4"),))
            rows = connection.execute("SELECT id,location,path,snapshot_path FROM asset").fetchall()
            result = web_batch.purge_assets(connection, rows, missing_only=True)
        self.assertEqual(result["purged"], 1)
        self.assertEqual(result["_parents"], [])
        with patch.object(web_batch, "LOCATION_ROOT_DECLARATIONS", {"guangya": (str(self.root),)}):
            self.assertEqual(web_batch._online_source_roots(), {})

    def test_resource_scan_does_not_offer_read_only_empty_directories(self):
        from contextlib import contextmanager
        database = fresh_ledger(self.root)
        @contextmanager
        def read_connection():
            with closing(sqlite3.connect(database)) as connection:
                yield connection
        contract = Mock(read_connection=read_connection)
        with patch.object(web_resource_sync, "LOCATION_ROOT_DECLARATIONS", {"guangya": (str(self.root),)}), \
                patch.object(web_resource_sync, "source_is_online", return_value=True), \
                patch.object(web_resource_sync, "vanished_asset_rows", return_value=[]), \
                patch.object(web_resource_sync, "_keeps_records", return_value=set()), \
                patch.object(web_resource_sync, "_empty_directories") as empty:
            result = web_resource_sync._scan_sources(contract)
        self.assertEqual(result["empty_dirs"], {"guangya": []})
        self.assertEqual(result["sources"][0]["empty"], 0)
        empty.assert_not_called()

    def test_resource_apply_rejects_read_only_directories_in_a_saved_scan(self):
        contract = Mock()
        scan = {"vanished_ids": [], "empty_dirs": {"guangya": [str(self.root / "empty")]},
                "result": {"sources": []}}
        with patch.object(web_resource_sync, "configured_resource_locations", return_value=("guangya",)), \
                patch.object(web_resource_sync, "_completed_scan", return_value=scan), \
                patch.object(web_resource_sync, "_remove_empty_directories") as remove:
            result = web_resource_sync.w_resource_sync_apply(contract,
                {"confirm": True, "scan_id": "scan", "clean_cache": False})
        self.assertEqual(result["dirs_removed"], 0)
        remove.assert_not_called()
