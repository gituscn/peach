"""媒体库与存储根目录的持久身份；路径表是兼容投影。"""
from __future__ import annotations

from dataclasses import replace
from pathlib import PureWindowsPath, PurePosixPath
from uuid import NAMESPACE_URL, UUID, uuid4, uuid5


def path_key(path):
    return str(PureWindowsPath(path)).casefold()


def _legacy_value(mapping, root, default=""):
    return next((value for key, value in mapping.items() if path_key(key) == path_key(root)), default)


def catalog(config):
    """已有身份直接读取；路径配置按同名分组执行确定性升级。"""
    if getattr(config, "storage_roots", None):
        return (dict(getattr(config, "library_catalog", {})),
                {key: dict(value) for key, value in config.storage_roots.items()})
    from .media_libraries import LIBRARY_ICONS
    groups, roots, libraries = {}, {}, {}
    for location, paths in config.locations.items():
        mounts = getattr(config, "mounts", {}).get(location, ())
        for index, path in enumerate(paths):
            root = str(path)
            name = _legacy_value(getattr(config, "library_names", {}), root) or PureWindowsPath(root).name or root
            groups.setdefault(name, []).append(root)
            root_id = str(uuid5(NAMESPACE_URL, "peach:storage-root:" + path_key(root)))
            roots[root_id] = dict(root=root, location=location,
                                  mount=str(mounts[index]) if index < len(mounts) else "",
                                  cost=_legacy_value(getattr(config, "media_costs", {}), root),
                                  library_id="")
    for name, paths in groups.items():
        library_id = str(uuid5(NAMESPACE_URL, "peach:library:" + "\0".join(sorted(path_key(p) for p in paths))))
        icon = next((_legacy_value(getattr(config, "library_icons", {}), p) for p in paths
                     if _legacy_value(getattr(config, "library_icons", {}), p)), "")
        libraries[library_id] = dict(name=name, icon=icon if icon in LIBRARY_ICONS else "")
        for value in roots.values():
            if value["root"] in paths:
                value["library_id"] = library_id
    return libraries, roots


def project(config, libraries=None, roots=None):
    """按根目录身份生成扫描、挂载、名称及成本兼容投影。"""
    if libraries is None:
        libraries, roots = catalog(config)
    locations, mounts, names, icons, costs = {}, {}, {}, {}, {}
    for value in roots.values():
        root, location = value["root"], value["location"]
        library = libraries[value["library_id"]]
        locations.setdefault(location, []).append(root)
        mounts.setdefault(location, []).append(value.get("mount", ""))
        names[root] = library["name"]
        if library.get("icon"):
            icons[root] = library["icon"]
        if value.get("cost"):
            costs[root] = value["cost"]
    return replace(config, library_catalog=libraries, storage_roots=roots,
                   locations={key: tuple(values) for key, values in locations.items()},
                   mounts={key: tuple(values) for key, values in mounts.items() if any(values)},
                   library_names=names, library_icons=icons, media_costs=costs)


def overlaps(first, second):
    """两个目录相同或互为父子。"""
    return first == second or first.is_relative_to(second) or second.is_relative_to(first)


def _validate_library(value):
    """媒体库名称为 1 到 80 个可见字符，图标为空或取自内置列表。"""
    from .media_libraries import LIBRARY_ICONS
    name = value.get("name", "")
    if not isinstance(name, str) or not name.strip() or len(name) > 80 or any(ord(c) < 32 for c in name):
        raise ValueError("媒体库名称请使用 1 到 80 个可见字符")
    if value.get("icon", "") not in ("", *LIBRARY_ICONS):
        raise ValueError("请选择列表中的媒体库图标")


def validate_catalog(libraries, roots):
    """拒绝损坏身份、悬空归属及跨库重叠。"""
    from .platform import is_windows_path
    seen, mounted = [], []
    for key, value in libraries.items():
        UUID(key)
        _validate_library(value)
    for key, value in roots.items():
        UUID(key)
        if value.get("library_id") not in libraries:
            raise ValueError("存储根目录的媒体库不存在")
        path = PureWindowsPath(value.get("root", ""))
        if not is_windows_path(str(path)) or not path.is_absolute() or ".." in path.parts:
            raise ValueError("存储根目录必须使用完整 Windows 路径")
        if not value.get("location") or value.get("cost", "") not in ("", "free", "metered"):
            raise ValueError("存储根目录的来源或读取策略无效")
        if any(overlaps(path, other) for other in seen):
            raise ValueError("媒体路径与另一文件夹重复或互相包含")
        seen.append(path)
        mount = value.get("mount", "")
        actual = (PureWindowsPath(mount) if len(mount) > 1 and mount[1] == ":" else PurePosixPath(mount)) if mount else path
        if not actual.is_absolute() or ".." in actual.parts:
            raise ValueError("挂载目录必须使用完整路径")
        if any(overlaps(actual, other) for other in mounted):
            raise ValueError("媒体目录与另一行重复或互相包含")
        mounted.append(actual)
    for index, actual in enumerate(mounted):
        if isinstance(actual, PureWindowsPath) and any(
                (index != other_index or actual != other) and overlaps(actual, other)
                for other_index, other in enumerate(seen)):
            raise ValueError("挂载目录与账本路径重叠，请使用独立目录")


def _match_root(row, root, previous, by_path, *, windows):
    """表单行认回既有根目录：显式 root_id 优先，否则按同一来源的账本前缀；认回的根核对来源、前缀和重定位意图。"""
    path = row["path"]
    supplied = str(row.get("root_id") or "")
    if supplied and supplied not in previous:
        raise ValueError("存储根目录已变更，请刷新配置")
    matched = by_path.get(path_key(root))
    # 只按路径认回同一来源的根；换了来源的同一前缀是另一个目录声明，取新身份。
    if matched and previous[matched]["location"] != row["location"]:
        matched = None
    old = previous.get(supplied or matched or "")
    if old:
        if row["location"] != old["location"] or path_key(root) != path_key(old["root"]):
            raise ValueError("已有根目录的来源和账本路径不可更换；请添加另一目录")
        old_path = old.get("mount") or (root if windows else "")
        equal = path_key(path) == path_key(old_path) if windows else path == old_path
        # 原来没有实际目录的根第一次填上目录，不算重定位。
        if old_path and not equal and row.get("change_mode") != "relocate":
            raise ValueError("请选择重定位此目录，或添加另一目录")
    return supplied or matched or str(uuid4()), old


def configure_sources(config, sources, *, windows):
    """更新根目录与媒体库；既有根的来源和账本前缀保持稳定。"""
    from .media_sources import cost_for
    libraries, previous = catalog(config)
    libraries = {key: dict(value) for key, value in libraries.items()}
    by_path = {path_key(value["root"]): key for key, value in previous.items()}
    roots, declared_libraries = {}, {}
    for row in sources:
        path = row["path"]
        root = str(PureWindowsPath(row.get("root") or path))
        root_id, old = _match_root(row, root, previous, by_path, windows=windows)
        if root_id in roots:
            raise ValueError("同一存储根目录不能登记多次")
        library_id = str(row.get("library_id") or (old or {}).get("library_id") or uuid4())
        UUID(library_id)
        name = str(row.get("library") or libraries.get(library_id, {}).get("name") or PureWindowsPath(root).name or root).strip()
        icon = str(row.get("library_icon", libraries.get(library_id, {}).get("icon", "")))
        value = dict(name=name, icon=icon)
        if library_id in declared_libraries and declared_libraries[library_id] != value:
            raise ValueError("同一媒体库的名称和图标必须一致")
        declared_libraries[library_id] = value
        libraries[library_id] = value
        roots[root_id] = dict(root=root, location=row["location"], library_id=library_id,
                              mount=path if not windows or path_key(path) != path_key(root) else "",
                              cost=row.get("cost") or cost_for(row["location"], root, config))
    # 不在表单来源列表里的扩展连接器仍由其专用设置维护。
    from .media_sources import SOURCE_OPTIONS
    roots.update({key: value for key, value in previous.items() if value["location"] not in dict(SOURCE_OPTIONS)})
    libraries = {key: value for key, value in libraries.items() if any(root["library_id"] == key for root in roots.values())}
    validate_catalog(libraries, roots)
    return project(config, libraries, roots)


def sources_for_paths(config, paths, *, windows, keep_other_sources=False):
    """路径式设置入口按已保存的实际目录接回根目录身份。"""
    from . import media_configuration
    existing = media_configuration.rows(config, windows=windows)
    sources = [dict(row) for row in existing if row["location"] != "local"] if keep_other_sources else []
    for path in paths:
        text = str(path)
        key = path_key(text) if windows else text
        match = next((row for row in existing if row["location"] == "local" and
                      (path_key(row["path"]) if windows else row["path"]) == key), None)
        sources.append(dict(match) if match else {"location": "local", "path": text})
    return media_configuration.prepare_sources(sources, windows=windows, config=config)


def ownership(config, path):
    """复用平台路径归属，将账本路径投影为稳定根目录和媒体库身份。"""
    from .platform import resolve_root
    location, index, _tail = resolve_root(path, config.locations)
    if location is None:
        return {}
    root = config.locations[location][index]
    _libraries, roots = catalog(config)
    return next((dict(root_id=key, library_id=value["library_id"]) for key, value in roots.items()
                 if path_key(value["root"]) == path_key(root)), {})
