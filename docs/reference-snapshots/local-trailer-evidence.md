# 本地预告片命名证据

核对日期：2026-10-23。本文件是人工取证笔记，记录网页命名事实与 Peach 的采用范围，不是上游原文，因此不登记进 `docs/reference-sources.json`。

## 公开约定

- **实测**：[Kodi 官方 Trailers 页面](https://kodi.wiki/view/Trailers)的 Local 一节要求本地预告片与正片同目录，文件主名追加 `-trailer`。页面提供的固定历史版本抓取返回 `Cache miss`，本次证据使用官方当前页面，不声称取得固定版本原文。
- **实测**：[Jellyfin 官方 Movies 页面](https://jellyfin.org/docs/general/server/media/movies/#file-name)列出裸名 `trailer`；[File Suffix 一节](https://jellyfin.org/docs/general/server/media/movies/#file-suffix)列出连字符、点、下划线和空格分隔的末尾预告片标记。网页内容按 CC-BY-ND-4.0 发布；本实现只参照文件命名事实，不复制或改写上游文档作为代码。

## Peach 的采用范围

Peach 复用标准库正则表达式独立实现文件名判据，扩展名沿用现有扫描器。它排除预告片的独立作品卡片，不新增预告片播放入口，不扩展到 `sample`、花絮或 `trailers/` 子目录约定。命名明确时不依赖正片先到达，也不读取视频内容；普通短正片和未匹配末尾标记的片名照常登记。

已登记的预告片保留原始行、评分与播放记录，查询时排除；不增加迁移，不清理真实 ledger。临时文件与临时账本用例覆盖截图中的目录、推送发现、首次预检、后台探测、资料采集、列表、搜索、补全、版本组及库存计数。未部署 Kodi 或 Jellyfin，二者完整服务的端到端兼容性未验证。
