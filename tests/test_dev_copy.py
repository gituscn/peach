"""改字工具保存源文案与动态模板，冲突与代码路径不能误写。"""
from pathlib import Path
import tempfile
import unittest
from peach import dev_copy


class DevCopyTests(unittest.TestCase):
    def test_processing_template_keeps_live_values_and_validates_placeholders(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp).resolve()
            package = root / "src/peach"
            package.mkdir(parents=True)
            path = package / "library_processing.py"
            source = ("# 中文说明\n"
                      "def summary(problems, paused):\n"
                      "    return (f'{problems} 项需要处理，其中 {paused} 项是来源限流；'\n"
                      "            '其余可重试。')\n")
            path.write_text(source, encoding="utf-8")
            original = "768 项需要处理，其中 533 项是来源限流；其余可重试。"
            candidate, = dev_copy.candidates(root, original)
            self.assertEqual(candidate["template"], "{problems} 项需要处理，其中 {paused} 项是来源限流；其余可重试。")
            for replacement in ["处理 {problems} 项", "处理 {unknown} 项", "处理 {problems!r}、{paused}", "{problems} {paused} {paused}"]:
                with self.assertRaises(ValueError):
                    dev_copy.save(root, {"original": original, "replacement": replacement, "candidate": candidate})
                self.assertEqual(path.read_text(encoding="utf-8"), source)
            result = dev_copy.save(root, {"original": original,
                "replacement": "来源限流 {paused} 项，共 {problems} 项待处理。", "candidate": candidate})
            self.assertEqual(result["text"], "来源限流 533 项，共 768 项待处理。")
            namespace = {}
            exec(compile(path.read_text(encoding="utf-8"), str(path), "exec"), namespace)
            self.assertEqual(namespace["summary"](10, 3), "来源限流 3 项，共 10 项待处理。")
            self.assertEqual(len(list((root / "build/copy-editor/backups").rglob(path.name))), 1)
            with self.assertRaises(ValueError):
                dev_copy.save(root, {"original": original, "replacement": "{problems} {paused}", "candidate": candidate})

    def test_template_preserves_expressions_formatting_and_literal_braces(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp).resolve()
            package = root / "src/peach"
            package.mkdir(parents=True)
            path = package / "library_processing.py"
            path.write_text("def summary(total):\n    return f'共 {{数量}} {total + 1:04d} 项'\n", encoding="utf-8")
            candidate, = dev_copy.candidates(root, "共 {数量} 0003 项")
            self.assertEqual(candidate["template"], "共 {{数量}} {value1} 项")
            dev_copy.save(root, {"original": "共 {数量} 0003 项", "replacement": "{{总数}} '{value1}' 项", "candidate": candidate})
            namespace = {}
            exec(compile(path.read_text(encoding="utf-8"), str(path), "exec"), namespace)
            self.assertEqual(namespace["summary"](4), "{总数} '0005' 项")

    def test_library_notice_is_editable_and_other_python_files_are_excluded(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp).resolve()
            package = root / "src/peach"
            package.mkdir(parents=True)
            notice = package / "library_sharing.py"
            notice.write_text('NOTICE = "上传说明"\n', encoding="utf-8")
            (package / "config.py").write_text('SECRET = "上传说明"\n', encoding="utf-8")
            candidate, = dev_copy.candidates(root, "上传说明")
            self.assertEqual(candidate["file"], "src/peach/library_sharing.py")
            dev_copy.save(root, {"original": "上传说明", "replacement": "新的说明", "candidate": candidate})
            self.assertEqual(notice.read_text(encoding="utf-8"), 'NOTICE = "新的说明"\n')
            self.assertEqual((package / "config.py").read_text(encoding="utf-8"), 'SECRET = "上传说明"\n')

    def test_jsx_text_keeps_braces_literal_and_invalid_values_are_rejected(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            (root / "frontend/src").mkdir(parents=True)
            path = root / "frontend/src/example.tsx"
            path.write_text('<p>示例</p>', encoding="utf-8")
            candidate, = dev_copy.candidates(root, "示例")
            dev_copy.save(root, {"original": "示例", "replacement": "文字{原样}", "candidate": candidate})
            self.assertEqual(path.read_text(encoding="utf-8"), '<p>文字&#123;原样&#125;</p>')
            for body in [[], {"original": None, "replacement": "文字"}]:
                with self.assertRaises(ValueError):
                    dev_copy.save(root, body)

    def test_save_preserves_code_and_records_the_original_file(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp).resolve()
            (root / "frontend/src/application").mkdir(parents=True)
            path = root / "frontend/src/application/tutorial.js"
            path.write_text("const label='示例文字';", encoding="utf-8")
            candidate, = dev_copy.candidates(root, "示例文字")
            result = dev_copy.save(root, {"original": "示例文字", "replacement": "新的'文字", "candidate": candidate})
            self.assertTrue(result["ok"])
            self.assertTrue(result["needs_build"])
            self.assertEqual(path.read_text(encoding="utf-8"), "const label='新的\\'文字';")
            self.assertEqual(len(list((root / "build/copy-editor/backups").rglob("tutorial.js"))), 1)
            with self.assertRaises(ValueError):
                dev_copy.save(root, {"original": "示例文字", "replacement": "错误", "candidate": candidate})

    def test_ambiguous_labels_require_a_specific_unchanged_candidate(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            (root / "web").mkdir()
            path = root / "web/index.html"
            path.write_text('<p>示例</p><button>示例</button>', encoding="utf-8")
            choices = dev_copy.candidates(root, "示例")
            self.assertEqual(len(choices), 2)
            dev_copy.save(root, {"original": "示例", "replacement": "按钮", "candidate": choices[1]})
            self.assertEqual(path.read_text(encoding="utf-8"), '<p>示例</p><button>按钮</button>')
            with self.assertRaises(ValueError):
                dev_copy.save(root, {"original": "示例", "replacement": "错误", "candidate": {"file": "../secret"}})
