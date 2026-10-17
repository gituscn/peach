"""挂载来源的读取与文件写入能力。"""

SCANNABLE_LOCATIONS = ("local", "115", "pikpak", "guangya")
CLOUD_LOCATIONS = frozenset({"115", "pikpak", "guangya"})
READ_ONLY_LOCATIONS = frozenset({"guangya"})


def require_writable_location(location: str | None) -> None:
    """只读挂载在任何文件系统写入之前拒绝。"""
    if location in READ_ONLY_LOCATIONS:
        raise ValueError("光鸭云盘为只读来源，请在光鸭云盘客户端管理文件")
