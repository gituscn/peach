# 浏览器历史导入

「口味」读取网页访问记录。自动发现覆盖默认资料目录；便携版、自定义安装和自定义 Firefox 资料可在「浏览器」中添加资料目录或历史文件。文件格式按 SQLite 表结构识别，不由浏览器名称或文件名决定。

## 目录范围

| 平台 | 自动发现 |
| --- | --- |
| Windows | Chrome、Edge、Firefox、Zen、Aside、Brave、Vivaldi、Opera、Opera GX、115、QQ、360 安全、360 极速、360 极速 X、搜狗新版 |
| macOS | Chrome、Edge、Firefox、Zen、Aside、Brave、Vivaldi、Opera、Opera GX、Safari |
| Linux | Chrome、Chromium、Edge、Firefox、Brave、Vivaldi、Opera；另含 Chrome Flatpak、Firefox Flatpak 与 Snap 默认目录 |

Windows 使用当前设备的 `APPDATA`、`LOCALAPPDATA`，Linux 使用 `XDG_CONFIG_HOME`。资料目录可直接包含历史文件，也可包含一层资料子目录。浏览器配置可以停止和恢复读取，已导入记录单独管理。

## 115 与国产浏览器

- **115**：默认资料目录为 `%LOCALAPPDATA%\115Chrome\User Data`。优先使用包含网页访问记录的 `History`。`HistoryEx` 只有包含受支持的网页访问表结构时才可读取；[115 官方将其称为下载历史](https://115.com/115115/T344887.html)，只有下载记录的文件会提示选择 `History`，不计入口味。目录中同时有两种文件时，下载记录不妨碍网页历史读取。
- **QQ、360 极速、360 极速 X、搜狗新版**：按 Chromium 网页历史读取。默认目录依据维护项目 [HackBrowserData 的 Windows 浏览器目录](https://github.com/moonD4rk/HackBrowserData/blob/master/browser/browser_windows.go)；360 安全目录另有[官方社区说明](https://bbs.360.cn/archiver/tid-15857311.html)。自定义安装路径需手动添加。
- **搜狗旧版**：`HistoryUrl3.db` 的专有格式未支持，不能按 Chromium 格式读取。[取证研究](https://www.huorong.cn/document/tech/vir_report/805)记录的表结构与标准网页访问表不同；完整时间字段语义未取得。
- **Opera**：具体资料目录可从 `opera:about/` 查看，见[官方帮助](https://help.opera.com/en/latest/crashes-and-issues/)。

## 验证与限制

浏览器数据库先经 SQLite backup 取得一致快照，再由固定的 `browserexport==0.4.4` 转换访问时间与记录。Chrome 的可选停留时长、Firefox 的可选描述与预览图缺失时仍可读取；一份资料损坏不阻断其他资料。原始 URL 与标题只保存在私有历史库，不进入 ledger。

临时 SQLite 回归覆盖目录发现、手动添加、停止与恢复、增量去重、可选列、错误格式、特殊路径字符及单份失败隔离。这里的目录支持不表示已对每款浏览器当前版本完成实机验收。issue [#65](https://github.com/peach-mitao/peach/issues/65) 报告者的 `HistoryEx` 表结构与实际导入结果未取得；无需上传含私人历史的完整数据库，可先提供表名与列名确认格式。

桌面与手机页面沿用现有浏览器来源管理，本次没有布局或交互改动。
