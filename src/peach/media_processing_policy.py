"""本机视频预览偏好；资料管理模式保留媒体探测、关闭视频抽帧。"""
from __future__ import annotations

import json
from pathlib import Path

from .fsutil import atomic_write_text

FILENAME = 'media-processing.json'


def metadata_only(state_root: Path | None = None) -> bool:
    if state_root is None:
        from .settings_file import active
        state_root = active().directory('state')
    try:
        payload = json.loads((Path(state_root) / FILENAME).read_text(encoding='utf-8'))
    except FileNotFoundError:
        return False
    except (OSError, ValueError):
        return True
    return not isinstance(payload, dict) or payload.get('metadata_only') is not False


def save(state_root: Path, value: bool) -> None:
    if not isinstance(value, bool):
        raise ValueError('请选择视频预览生成状态')
    atomic_write_text(Path(state_root) / FILENAME,
                      json.dumps({'metadata_only': value}) + '\n')


def q_media_processing(contract, _args):
    return {'metadata_only': metadata_only(contract.follow_state_root)}


def w_media_processing(contract, body):
    value = (body or {}).get('metadata_only')
    save(contract.follow_state_root, value)
    if value:
        from .web_timeline_thumbnails import write_mode
        write_mode('off', Path(contract.follow_state_root) / 'timeline-thumbnails.json')
        contract.thumbnail_job.stop(resume=False)
    return q_media_processing(contract, {})
