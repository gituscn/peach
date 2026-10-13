# 上游依赖与参考来源复核

复核日期：2026-10-13（Asia/Taipei）。本文件是人工复核笔记，不登记为可覆盖的上游快照；原文字节、哈希与 revision 见 [来源登记](../reference-sources.json)。

## amane 桥

采用 [amane 0.20.0](https://github.com/sqzw-x/amane/releases/tag/v0.20.0)，固定 revision `cc42cee6ecf290cf05af1caa347d2dc2d5aeffcd`，GPL-3.0。Python 下限仍为 3.14，桥以独立 venv 和子进程消费；不引入其数据库、整理、任务中心或界面。

[源码差异](https://github.com/sqzw-x/amane/compare/7a980aff9c503f7a5815864d62a6ef309a27808a...cc42cee6ecf290cf05af1caa347d2dc2d5aeffcd)共 29 个提交。适用于 Peach 的变化是 FreeJavBT、AIRAV 精确检索，AIRAV 详情解析及网络层指纹轮换。演员、kin8、giga、字幕、整理与超分的变化不扩展 Peach 来源链；每站唯一归属、身份核对、候选与结算仍由 Peach 管理。

实测：所有 20 个桥声明的爬虫类可导入，`SearchQuery`、`FetchOptions`、`MediaMetadata` 与 17 档失败原因兼容。真实解析器配合合成页面确认 AIRAV、FreeJavBT 精确命中 `ABW-032`，查 `ABW-03` 时不取相近条目；AIRAV 的标题、演员、厂牌、发行日、标签、剧情与封面可解析，片长为空，不采用固定试看时长。

只读在线查询 `ABW-032`：Prestige 2.48 秒、AIRAV 2.54 秒取得同一番号，FreeJavBT 5.32 秒明确未命中。Prestige 返回片长 190 分钟，AIRAV 不给片长；Prestige 配信日与发行日的分离仍按 Peach 既有规则处理。上游测试数据仓库请求为 HTTP 404，真实 fixture 未取得，合成页面不能作为该站所有作品均可抓取的证据。

`max_retries=1` 限普通失败重试；403/406 另可轮换三次 TLS 指纹，单个地址最多五次请求。Peach 保持整次查询 60 秒子进程总时限，超时终止并报可重试失败，不按尝试次数推导完成时长；桥不启用浏览器或 solver。公开请求的 TLS 行为沿用上游，未用于证明 Peach 生产 HTTPS 验收。

桥锁文件同时覆盖 PR #40、#42 的传递依赖要求：Mako 1.4.3、pydantic-ai-slim / pydantic-graph 2.55.0。没有新增直接依赖；传递更新包括 anthropic、openai、genai-prices，桥不调用它们的模型服务。

## Dependabot PR

PR #41、#43、#44、#45、#46、#47、#48 在隔离工作树按项目接管入口处理，保持一 PR 一提交。PR #43 的锁冲突保留主线 `pyahocorasick` 并采用 Pydantic 2.14.0，`uv lock --check` 通过。npm vendor、主界面与独立页面包按清单重建。

Motion 14.0.0 的大版本删除内部兼容 API。Peach 只通过 `motion` 公共入口使用，没有直接引用 `framer-motion`、`motion-dom`、`motion-utils` 或被移除的 timeline 内部 API；版本由其内部精确依赖保持一致，类型检查、组件与浏览器回归由项目完整测试入口核验。

轮播箭头几何用例在图片就绪后等待渲染阶段，再读位置；`ResizeObserver` 的异步测量不能由图片 `complete` 代替。位置、尺寸、黑边中心和桌面／手机断言保持完整。

## 参考来源判断

运行项目 `check_reference_updates.py check --diff`，覆盖 weekly、monthly、quarterly；manual 不在本轮范围。47 个来源中 28 个未变化，19 个报告漂移，另有 amane 运行依赖前移。14 份原文按完整 SHA-256 与 Git revision 接受；5 份人工笔记保留。

| 来源 | 实测变化 | Peach 判断 |
| --- | --- | --- |
| Fluid springs、tabs | 名称与 import 从 Framer Motion 改为 Motion；弹簧参数未变 | 接受原文，Peach 已用 `motion` |
| Vercel report-design | 增加 Vercel 官方 Logo 下载说明 | 上游品牌专属，不采用其 Logo |
| Vercel web-interface-guidelines | 增加细指针设备页面 overscroll 建议与混合输入限制 | 保留现有滚动行为，本轮不扩展为界面改动 |
| Bruno README | 增加 Hindi 翻译链接 | 接受原文，无运行影响 |
| amane 路由与 README | kin8 欧美归类、giga 会话与 Referer、欧美日期号年份形态及称呼 | 锁定证据，Peach 仅使用已接入来源 |
| OpenAver README | 女优排行 Top 25 | 原文接受，不改 Peach 排行数量 |
| SakuraMediaBE README | 新增番号解析开源项目致谢 | 仅参考出处，不新增依赖 |
| SakuraMedia README | VR 外部播放与插件市场说明 | 同类产品信息，不导入其播放协议 |
| JavBoss README | v2.1.2 下载与设置路径说明 | 同类产品信息，不改变 Peach 部署 |
| MDCz README | 平台、安装包、便携数据与自动更新说明 | 保留 Peach 既有分发和运行边界 |
| Cuelume README | press/release、unlock、卸载绑定与关闭声音语义 | 候选参考，无直接消费者，不安装 |
| Atlas README | 女优资料来源改用 JavBus，注明 minnano-av 反爬 | Peach 有自己的传输与来源冷却，不以 README 声明推断本机站点故障 |

PixivUtil2 从 `fc0f9adf44e590dde9242b3755b53528f159720a` 前移到 `22b5fdc9fc83a976d8f4f6f6acbb4d2d3d542f21`，三个提交处理 FFmpeg 8+ 动图转换、`x-userid` 登录身份和独立错误日志。`PixivBrowserFactory.py` 只增登录 ID 赋值，Peach 采用的公开 FANBOX 传输边界不变；保留既有取证 revision，不复制登录逻辑。

OpenAver 从 `8cc17e50453d9f69a81f5fee1a072df80f7aab73` 前移到 `502278a3e09c7520838ffb00b2ff080323a4cdcb`，共 318 个提交；相关推荐源码未变化。DMM 改代理 session、连通探测与失败分类，GraphQL 查询取法不变；自订来源、桌面路径翻译和图片公网守卫属于上游功能，Peach 不迁移。本轮保留相关推荐人工证据及其固定 revision。

`fiu758-studio-logo-discovery`、`rule34-follow-tags-and-collections` 的漂移是人工笔记与动态 HTML 的比较；`f95-masked-gofile-media` 返回的脚本哈希与笔记记录相同，协议未变化。这三份和 FANBOX、OpenAver 的人工笔记均不执行 `accept`，避免被网页或脚本字节覆盖。

数据层、API 和页面结构未改；真实 ledger、媒体与凭据未写入。静态、组件、桌面及手机浏览器和生产运行的验收结果以项目验证记录及 [运行状态](../STATUS.md) 为准。
