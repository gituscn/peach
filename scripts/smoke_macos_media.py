"""无 Homebrew 路径下验收包内媒体探测、抽帧、转码与缺索引修复。"""
from __future__ import annotations

import argparse
import json
import os
from pathlib import Path
import subprocess
import sys
import tempfile
from unittest.mock import patch

from build_macos_media import audit_binary
from smoke_desktop import assert_av1_decoder

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "src"))
from peach.ffmpeg import FFmpegResolver
from peach.mp4recover import untrunc_path
from peach.tunnel import resolve_binary


def smoke(app: Path, architecture: str) -> dict:
    executable = app.resolve() / "Contents/MacOS/Peach"
    env = {key: value for key, value in os.environ.items() if not key.startswith(("PEACH_", "DYLD_"))}
    env["PATH"] = "/usr/bin:/bin:/usr/sbin:/sbin"
    with tempfile.TemporaryDirectory(prefix="peach-macos-media-") as directory, \
            patch.dict(os.environ, env, clear=True), patch.object(sys, "executable", str(executable)), \
            patch.object(sys, "frozen", True, create=True):
        root = Path(directory).resolve()
        resolver = FFmpegResolver(root / "tools/ffmpeg")
        ffmpeg, ffprobe = resolver.ffmpeg(), resolver.ffprobe()
        repair, tunnel = untrunc_path(root / "tools"), resolve_binary()
        assert ffmpeg and ffprobe and repair and tunnel, "未找到包内工具"
        assert ffmpeg.source == ffprobe.source == "peach-bundled"
        paths = [ffmpeg.path, ffprobe.path, repair, tunnel]
        for path in paths:
            assert path.is_relative_to(executable.parent), path
            audit_binary(path, architecture)
        for tool in ("ffmpeg", "untrunc"):
            bundle = executable.parent / "tools" / tool
            manifest = json.loads((bundle / "manifest.json").read_text())
            assert manifest["platform"] == "darwin" and manifest["architecture"] == architecture
            from media_tool_bundle import checked_file
            for name, digest in manifest["files"].items():
                checked_file(bundle, name, digest)
        def run(args):
            return subprocess.run([str(arg) for arg in args], cwd=root, env=env, capture_output=True,
                                  text=True, encoding="utf-8", timeout=60, check=True)
        video, converted, image = root / "sample.mp4", root / "converted.mp4", root / "frame.jpg"
        run([ffmpeg.path, "-v", "error", "-f", "lavfi", "-i", "testsrc2=s=640x360:r=25",
             "-f", "lavfi", "-i", "sine=frequency=440:sample_rate=48000", "-t", "2",
             "-c:v", "libx264", "-bf", "0", "-pix_fmt", "yuv420p", "-c:a", "aac", video])
        run([ffmpeg.path, "-v", "error", "-i", video, "-vf", "scale=320:-2", "-c:v", "libx264", "-c:a", "aac", converted])
        run([ffmpeg.path, "-v", "error", "-i", video, "-frames:v", "1", image])
        assert image.stat().st_size > 1000
        def probe(path):
            result = json.loads(run([ffprobe.path, "-v", "error", "-show_streams", "-show_format", "-of", "json", path]).stdout)
            assert {stream["codec_name"] for stream in result["streams"]} == {"h264", "aac"}
            assert 1.8 < float(result["format"]["duration"]) < 2.3
            return result
        probe(video)
        probe(converted)
        assert_av1_decoder(ffmpeg.path, root)
        payload, offset = video.read_bytes(), 0
        while offset + 8 <= len(payload):
            size = int.from_bytes(payload[offset:offset + 4], "big")
            assert size >= 8
            if payload[offset + 4:offset + 8] == b"moov":
                break
            offset += size
        assert offset < len(payload)
        broken, repaired = root / "broken.mp4", root / "repaired.mp4"
        broken.write_bytes(payload[:offset])
        run([repair, "-n", "-s", "-dst", repaired, video, broken])
        probe(repaired)
        decoded = run([ffmpeg.path, "-v", "error", "-i", repaired, "-f", "null", "-"])
        assert not decoded.stderr.strip(), decoded.stderr
        version = run([tunnel, "--version"]).stdout.strip()
        return {"architecture": architecture, "ok": True, "cloudflared": version,
                "checks": ["bundled-resolvers", "manifest-hashes", "architecture", "system-libraries-only",
                           "ad-hoc-signatures", "h264-aac-probe", "jpeg-frame", "software-transcode",
                           "av1-software-decode", "missing-moov-repair", "repaired-full-decode", "no-homebrew-path"]}


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("app", type=Path)
    parser.add_argument("--arch", choices=("arm64", "x86_64"), required=True)
    args = parser.parse_args()
    print(json.dumps(smoke(args.app, args.arch)))
