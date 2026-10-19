# Docker 部署

Peach 的 Linux 无桌面镜像用于单人 VPS 与 NAS，镜像仓库为 [longmeidao/peach](https://hub.docker.com/r/longmeidao/peach)。`edge` 是主线候选，版本号标签对应发布提交。当前镜像目标为 `linux/amd64`；ARM NAS 尚未验收。2026-10-15 在 WSL 的独立 Docker Engine 中，用正式锁定依赖通过空数据卷初始化、非 root、鉴权、配置保存、合成视频扫描、HTTP Range、配置重载与重启持久化验收。

Docker 使用浏览器管理，无需桌面托盘。配置文件中的盘符是账本路径标识，实际媒体目录由容器挂载提供。Windows 安装包、macOS 源码运行和 Docker 的入口分别见 [README](../README.md#下载与使用)。

## 数据与媒体

`/data` 保存配置、SQLite 账本、凭据和图片缓存，必须持久化。媒体通过 `/media` 单独挂入；默认只读，扫描和播放不需要媒体写权限。整理、移动与删除需要使用者明确提供可写挂载。

CloudDrive2 与 Peach 分别运行。NAS 已有 CloudDrive2 时直接复用；全新机器按 [CloudDrive2 官方 Docker 指南](https://www.clouddrive2.com/docker.html) 安装并绑定网盘。宿主机必须支持 FUSE，CloudDrive2 的挂载目录需要共享传播；Peach 用 `rslave` 接收挂载，不需要 FUSE 或特权容器。挂载目录的权限必须允许 UID 1000 读取。

需要云下载或推送发现时，Peach 配置中的 CloudDrive2 API 地址使用同一容器网络的服务名或可达的宿主机地址；容器里的 `127.0.0.1` 只指向 Peach 自己。

仓库根的 `compose.yaml` 使用 `PEACH_MEDIA_ROOT` 指定宿主机已有媒体根；容器中固定为 `/media`。先完成 CloudDrive2 挂载，再启动 Peach。命名卷 `peach-data` 保存 `/data`，不要执行删除该卷的操作。需要绑定现有数据目录时，先做完整备份并确保 UID 1000 可写；不要让另一台 Peach 同时写这份账本。

## 首次运行与访问

使用 Compose 启动后，无桌面入口会为全新数据卷初始化配置、账本和随机内部口令。它不覆盖已有配置；发现只有账本而没有配置时拒绝启动。初始化日志只显示口令文件位置。

在容器终端运行 `peach token` 取得登录口令，在浏览器登录后设置访问密码。配置页接受经过鉴权的回环或私有网络连接，带转发头的管理请求会被拒绝。配置保存会自动重载服务；勾选扫描时使用既有资料处理入口。

容器内 HTTP 端口固定为 8900，访问端口在 Compose 设置。默认只发布到宿主机 `127.0.0.1`，远程访问使用私有 VPN 或 SSH 隧道。需要局域网访问时，通过 `PEACH_BIND` 绑定宿主机的局域网地址，并设置访问密码。公网托管边界见 [安全说明](../SECURITY.md)。Docker 镜像不提供多人账号或租户隔离。

## 配置文件与路径

配置文件位于持久卷内的 `/data/config.toml`。通常在浏览器配置页添加媒体文件夹即可；手动编辑前先备份文件，编辑后重启容器。已有配置不会因更新镜像而自动覆盖，注释示例可对照本节阅读，无需重新初始化数据卷。

以下三个路径各有用途。假设宿主机媒体目录为 `/srv/videos`，Compose 将它挂到容器 `/media`：

| 位置 | 示例 | 用途 |
| --- | --- | --- |
| 宿主机目录 | `/srv/videos` | 填在 Compose 的 `PEACH_MEDIA_ROOT`，目录必须已存在 |
| 容器内目录 | `/media` | 填在配置页的媒体目录或 `[media.mounts]`，Peach 实际读取这里 |
| 账本声明根 | `R:\media` | 填在 `[media.locations]`，作为路径标识，无需在容器创建盘符 |

全新本地馆藏可使用以下映射。将两个表中的条目合入已有配置，不要重复添加同名表：

```toml
[media.locations]
local = 'R:\media'

[media.mounts]
local = '/media'
```

此时容器中的 `/media/a.mp4` 对应账本路径 `R:\media\a.mp4`。已有馆藏保留既有声明根，只调整对应挂载点；不能把 `[media.locations]` 改成 `/media`。一个来源有多个目录时，两张表均使用数组，数量和顺序一一对应。

配置页中的「Windows 中的对应路径」填写账本声明根；该字段用于跨平台路径映射。115 的既有声明根通常为 `B:\`，PikPak 为 `A:\`，实际目录分别填写 `/media/115`、`/media/pikpak` 等容器内路径，并确认 Compose 已挂入这些目录。CloudDrive2 是媒体来源之一，本地目录也可直接挂入 Peach。

容器的网络监听由无桌面入口控制，宿主机绑定地址和端口使用 Compose 的 `PEACH_BIND`、`PEACH_PORT`；`[server]` 的 `host`、`port` 用于直接运行 `peach serve`。独立 Docker 部署保持 `[replication] enabled = false`，无需配置桌面托盘或 SMB 复制。

## 硬件转码（AMD / Intel VAAPI）

Linux 首次重编码时会探测实际可用的硬件编码器，整片 MP4 与 HLS 分片共享探测结果。AMD / Intel 使用 VAAPI；存在 NVIDIA 设备时探测 NVENC。探测失败的后端在当前服务进程内不再尝试，重启服务后重新探测。封装复制不需要硬件探测。

镜像包含 Debian FFmpeg、Mesa VAAPI 驱动与 `vainfo`。AMD 宿主机需加载 `amdgpu` 和对应固件，并提供 `/dev/dri/renderD*`。Intel 需在自定义镜像内安装适配设备的 VAAPI 驱动；Mesa 驱动不代表已覆盖全部 Intel GPU。将下面的条目合入 Compose 的 `services.peach`，设备路径按宿主机调整：

```yaml
    devices:
      - /dev/dri/renderD128:/dev/dri/renderD128
    group_add:
      - "${PEACH_RENDER_GID}"
    environment:
      PEACH_TRANSCODE_BACKEND: auto
      PEACH_VAAPI_DEVICE: /dev/dri/renderD128
```

`PEACH_RENDER_GID` 填宿主机渲染节点所属组的数字 GID。容器以 UID 1000 运行，需要该节点的读写权限；只透传设备但没有组权限仍会初始化失败。Unraid 在容器设置中添加同样的设备映射、环境变量和额外组，无需开启特权模式。默认 Compose 不挂设备，无 GPU 的机器可直接运行。

| 环境变量 | 值与用途 |
| --- | --- |
| `PEACH_TRANSCODE_BACKEND` | 默认 `auto`；可设为 `vaapi`、`nvenc` 或 `software`。指定硬件后端仍会验证能否编码，失败回退软件。 |
| `PEACH_VAAPI_DEVICE` | 指定容器内渲染节点；留空时按名称依次探测 `/dev/dri/renderD*`，使用第一个可用节点。 |

VAAPI 尝试顺序为硬件解码加 `scale_vaapi` / `h264_vaapi`、软件解码加 `hwupload` / `h264_vaapi`、`libx264`。解码能力还受 GPU 型号、片源编码与位深限制；硬件编码可用不能证明每个片源都能硬件解码。NVIDIA 透传还需宿主机驱动及 NVIDIA Container Toolkit，Mesa 不提供 CUDA / NVENC。

出现 CPU 高占用时，先查看日志中的「转码硬件后端」和「转码硬件探测失败」。完成日志「整片转码完成」或「HLS 分片完成」后的 `vaapi` 表示使用硬件解码和编码，`vaapi-encode` 表示软件解码加硬件编码，`libx264` 表示软件转码。再在同一容器、同一用户下检查设备权限与 `vainfo --display drm --device /dev/dri/renderD128` 的结果。`No VA display found` 需结合驱动和设备权限排查，不能仅凭节点存在排除权限问题。

`ffmpeg -hwaccels` 列出构建支持的硬件加速方式，`ffmpeg -h decoder=h264` 等列出对应解码器支持的硬件设备。VAAPI 解码通过普通解码器的硬件加速接口启用，`ffmpeg -decoders` 中没有名为 `vaapi` 的解码器不代表缺少 VAAPI 解码支持。参数含义见 [FFmpeg 官方文档](https://ffmpeg.org/ffmpeg.html#Advanced-Video-options)。目标 GPU 的实际解码、GPU 占用与播放效果需要在部署机器上验证。

## 更新与范围

更新镜像并重建容器时保留 `/data`。数据库有待执行迁移时，先备份并按 [运行与配置](OPERATIONS.md) 的迁移流程处理；无桌面入口不会自动迁移已有账本。健康检查使用 `/healthz?ready=1`。

Linux 容器不读取用户电脑上的浏览历史，也不包含交互式浏览器；需要本机浏览器完成验证的来源在此环境不可用。CloudDrive2 的真实账号登录、网盘流量与 NAS 实机挂载需在目标机器验证。

## 镜像发布

构建使用官方 Python `3.14.8-slim-trixie` 与 uv `0.13.1`，依赖由 `uv.lock` 锁定，应用以非 editable 包安装，包含 Web 与迁移资源。镜像以 UID/GID 1000 运行，内置 FFmpeg、FFprobe 和 OpenSSL。构建上下文只允许代码与资源，不包含工作树、媒体、真实账本或凭据。

GitHub Actions 的 `Docker` 工作流先构建并运行临时卷验收，通过后发布。仓库变量 `DOCKERHUB_USERNAME` 和机密 `DOCKERHUB_TOKEN` 用于 Docker Hub 发布；机密只保存在 GitHub，不进入项目文件。未配置发布身份时仍执行构建验收。ARM 镜像需通过同等运行验收后再加入发布。
