# Docker 部署

Peach 的 Docker 镜像用于单人 VPS 与 NAS，通过浏览器管理，镜像仓库为 [longmeidao/peach](https://hub.docker.com/r/longmeidao/peach)。`edge` 随 `master` 分支构建更新，版本号标签对应发布提交。当前镜像目标为 `linux/amd64`；ARM NAS 尚未验收。2026-10-15 在 WSL 的独立 Docker Engine 中，用正式锁定依赖通过空数据卷初始化、非 root、鉴权、配置保存、合成视频扫描、HTTP Range、配置重载与重启持久化验收。

Docker 不使用桌面托盘。Peach 数据库在所有系统上都保存 Windows 格式的媒体路径；Linux 实际读取文件时，由配置把这些路径转换成容器中的目录。这里的盘符是 Peach 数据库的存储格式，Linux 无需创建对应盘符。Windows 安装包、macOS 源码运行和 Docker 的入口分别见 [README](../README.md#下载与使用)。

## 数据与媒体

`/data` 保存配置、SQLite 数据库、凭据和图片缓存，必须使用数据卷保存，重建容器时保留该卷。媒体目录单独挂到 `/media`；默认只读，扫描和播放不需要媒体写权限。整理、移动与删除需要使用者明确提供可写挂载。

CloudDrive2 与 Peach 分别运行。NAS 已有 CloudDrive2 时直接复用；全新机器按 [CloudDrive2 官方 Docker 指南](https://www.clouddrive2.com/docker.html) 安装并绑定网盘。宿主机必须支持 FUSE，并允许把 CloudDrive2 后续挂上的子目录传入 Peach 容器；Compose 中的 `rslave` 用于接收这些挂载。Peach 容器不需要 FUSE 或特权模式。目录权限必须允许容器用户 UID 1000 读取。

需要云下载或推送发现时，Peach 配置中的 CloudDrive2 API 地址使用同一容器网络的服务名或可达的宿主机地址；容器里的 `127.0.0.1` 只指向 Peach 自己。

仓库根的 `compose.yaml` 使用 `PEACH_MEDIA_ROOT` 指定宿主机已有媒体根；容器中固定为 `/media`。先完成 CloudDrive2 挂载，再启动 Peach。命名卷 `peach-data` 保存 `/data`，不要执行删除该卷的操作。需要绑定现有数据目录时，先做完整备份并确保 UID 1000 可写；不要让另一台 Peach 同时写这份账本。

## 首次运行与访问

使用 Compose 启动后，Peach 会为全新数据卷创建配置、数据库和随机登录口令。已有配置保持原值；如果已有数据库但缺少配置文件，服务拒绝启动，需要恢复配置文件。初始化日志只显示口令文件位置。

在容器终端运行 `peach token` 取得登录口令，在浏览器登录后设置访问密码。配置页要求登录，并且连接必须来自容器本机或私有网络；携带代理转发头的管理请求会被拒绝。通过配置页保存后，服务自动读取配置；勾选扫描时会启动资料处理。

容器内 HTTP 端口固定为 8900，访问端口在 Compose 设置。默认只发布到宿主机 `127.0.0.1`，远程访问使用私有 VPN 或 SSH 隧道。需要局域网访问时，通过 `PEACH_BIND` 绑定宿主机的局域网地址，并设置访问密码。公网托管边界见 [安全说明](../SECURITY.md)。Docker 镜像不提供多人账号或租户隔离。

## 配置文件与路径

配置文件位于数据卷内的 `/data/config.toml`。通常在浏览器配置页添加媒体文件夹即可；手动编辑前先备份文件，编辑后重启容器。更新镜像保留这个文件，因此已有文件的注释也保持原样。查看配置说明不需要重新初始化数据卷。

默认模板只包含初始值，不包含已有部署的媒体目录和自定义设置。用默认模板整份替换会同时替换这些值，可能使已有影片无法读取。只更新说明时可以替换注释，保留配置值；需要替换整个文件时，先备份并逐项核对差异。

`[media.locations]` 和 `[media.mounts]` 在 Docker、Linux、macOS 上都需要正确配置。前者写数据库中保存的路径前缀，后者写实际读取文件的目录。数据库保存 Windows 格式是 Peach 当前的数据存储设计，不表示 Linux 上存在相同路径。

以下三个路径各有用途。假设宿主机媒体目录为 `/srv/videos`，Compose 将它挂到容器 `/media`：

| 位置 | 示例 | 用途 |
| --- | --- | --- |
| 宿主机目录 | `/srv/videos` | 填在 Compose 的 `PEACH_MEDIA_ROOT`，目录必须已存在 |
| 容器内目录 | `/media` | 填在配置页的媒体目录或 `[media.mounts]`，Peach 实际读取这里 |
| 数据库中的目录前缀 | `R:\media` | 填在 `[media.locations]`，对应数据库影片路径的开头；无需在 Linux 创建这个目录 |

全新本地馆藏可使用以下映射。将两个表中的条目合入已有配置，不要重复添加同名表：

```toml
[media.locations]
local = 'R:\media'

[media.mounts]
local = '/media'
```

扫描 `/media/a.mp4` 后，Peach 在数据库的影片 `path` 字段中保存 `R:\media\a.mp4`；播放时再把 `R:\media` 替换为 `/media`，读取容器中的 `/media/a.mp4`。数据库中的这段 Windows 路径是字符串，不是 Linux 上实际存在的文件名。

已有影片时，`[media.locations]` 必须继续匹配数据库中的路径前缀。把它改成 `/media` 不会同步修改已有影片记录，反而会使路径无法对应。只搬动实际媒体目录时，保留 `[media.locations]`，调整 `[media.mounts]` 和 Compose 的目录挂载。一个来源有多个目录时，两张表均使用数组，数量和顺序一一对应。

配置页中的「Windows 中的对应路径」填写数据库中的目录前缀，即使只有一台 Linux 服务器也需要这个值。它不表示必须有一台 Windows 电脑。115 的默认前缀为 `B:\`，PikPak 为 `A:\`；已有部署以数据库中的路径为准。实际目录分别填写 `/media/115`、`/media/pikpak` 等容器内路径，并确认 Compose 已挂入这些目录。CloudDrive2 是媒体来源之一，本地目录也可直接挂入 Peach。

容器中的服务固定监听 `0.0.0.0:8900`，宿主机访问地址和端口使用 Compose 的 `PEACH_BIND`、`PEACH_PORT`；`[server]` 的 `host`、`port` 用于直接运行 `peach serve`。独立 Docker 部署保持 `[replication] enabled = false`，无需配置桌面托盘或 SMB 复制。

## 更新与范围

更新镜像并重建容器时保留 `/data`。数据库有待执行迁移时，先备份并按 [运行与配置](OPERATIONS.md) 的迁移流程处理；无桌面入口不会自动迁移已有账本。健康检查使用 `/healthz?ready=1`。

Linux 容器不读取用户电脑上的浏览历史，也不包含交互式浏览器；需要本机浏览器完成验证的来源在此环境不可用。CloudDrive2 的真实账号登录、网盘流量与 NAS 实机挂载需在目标机器验证。

## 镜像发布

构建使用官方 Python `3.14.8-slim-trixie` 与 uv `0.13.1`，依赖由 `uv.lock` 锁定，应用以非 editable 包安装，包含 Web 与迁移资源。镜像以 UID/GID 1000 运行，内置 FFmpeg、FFprobe 和 OpenSSL。构建上下文只允许代码与资源，不包含工作树、媒体、真实账本或凭据。

GitHub Actions 的 `Docker` 工作流先构建并运行临时卷验收，通过后发布。仓库变量 `DOCKERHUB_USERNAME` 和机密 `DOCKERHUB_TOKEN` 用于 Docker Hub 发布；机密只保存在 GitHub，不进入项目文件。未配置发布身份时仍执行构建验收。ARM 镜像需通过同等运行验收后再加入发布。
