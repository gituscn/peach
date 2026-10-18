# 项目看板与交付关联

[Peach 需求与路线图](https://github.com/orgs/peach-mitao/projects/7)是唯一持续同步的公开看板，展示项目 Issue、计划范围与交付状态。维护者安排的项目任务和使用者提交的反馈通过「来源」及视图区分。个人馆藏修正、账号登录与设备维护留在私有清单。

「需求看板」展示全部项目需求，「维护者待办」和「用户反馈」分别按来源筛选，「路线图」展示计划阶段与优先级。README 顶部和仓库 Projects 提供入口。视图不改变公开范围，同一事项只维护一份。

Issue 列表也可按作者筛选：[维护者待办](https://github.com/peach-mitao/peach/issues?q=is%3Aissue+is%3Aopen+author%3Alongmeidao)、[用户反馈](https://github.com/peach-mitao/peach/issues?q=is%3Aissue+is%3Aopen+-author%3Alongmeidao)。登录后的 Issues 总览可以将相同查询保存为个人视图。

公开仓库的 Issue 始终按仓库权限可见，将它加入私有看板不会隐藏原 Issue。正式事项使用 GitHub Issue 编号；草稿保留已确认范围与优先级，相关事项使用可访问的链接说明关联。

## 状态与版本

| 字段 | 含义 |
| --- | --- |
| Status | 待评估、待安排、进行中、待验证、已完成、已取消；PR 另有已关闭未合入，描述真实处理结果 |
| 来源 | 按配置的维护者账号识别为维护者待办，其余为用户反馈 |
| Priority | P0 紧急、P1 优先、P2 常规、P3 低优先级 |
| 计划阶段 | 近期、后续、探索；不构成交付日期承诺 |
| 等待条件 | 阻止下一步的具体条件；没有阻塞时留空 |
| 实现关联 | 已关联的 PR 或经核对的实现提交 |
| 交付进度 | 未关联实现、尚未合入、已合入待发布、已发布 |
| 发布版本、发布说明 | 首次实际包含实现的可下载版本及其链接 |
| Milestone | 计划交付范围；与实际发布版本分别记录 |

PR 合入表示代码已集成。开放的需求进入待验证；完成验收后关闭 Issue 才进入已完成。关闭原因是「不计划」时进入已取消。发布版本不会代替目标环境或报告者验收。

## 自动同步

`.github/workflows/project-board.yml` 响应 Issue 开关和标签变化、PR 建立和合入、主线推送、Release 发布与变动。使用主线代码，不检出或执行外部 PR 的代码。所有同步串行执行，每次读取当前事实，重复执行不会重复建卡或推进状态。

- 公开路线图自动收录本仓库的新建 Issue，每轮补查开放事项，并同步真实状态与发布版本。PR 用于计算实现关联，内部草稿不复制到公开 Project。
- 来源按 Issue 作者与 `.github/project-board.json` 的维护者账号列表同步；分类视图使用同一份 Issue。
- 重新打开的事项按实际实现恢复为待安排或待验证，已关联开放 PR 的事项为进行中。
- PR 的 GitHub 关联和独立 `Refs #编号` 行建立实现关联；只处理本仓库引用。正文中普通提及某个编号不会被当成交付。
- 已合入 PR 对应的开放需求进入待验证；`status:needs-info` 和 `status:needs-verification` 分别保留等待信息和验收的含义。
- 从有下载制品的已发布 Release 中检查标签提交祖先关系，填写首次包含实现的版本。只有标签、失败构建和发布草稿均不算已发布。
- 通过 Actions 的仓库令牌创建 Release 不会触发另一条 Release 工作流；发布工作流在上架后显式调用同一同步入口。
- 不关闭 Issue，不合入 PR，不修改优先级、排期或归档状态。已归档事项不自动恢复。

历史直接集成而没有 PR 的实现，在 `.github/project-board.json` 登记完整提交 SHA；同步同样验证其是否属于主线和发布标签，不凭文字宣称完成。

## 凭据与验证

组织 Project 不接受仓库默认的 `GITHUB_TOKEN`。`PROJECT_BOARD_TOKEN` 必须具备仓库读取与 Project 写权限，通过 GitHub Actions Secret 注入；不得写入代码、日志或事件正文。GitHub App 可按[官方方法](https://docs.github.com/en/issues/planning-and-tracking-with-projects/automating-your-project/automating-projects-using-actions)替代长期令牌。

本地运行 `scripts/project_board.py` 默认只预览差异，显式传入 `--apply` 才写入。回归覆盖开关、合入、待验收、发布祖先关系和跨仓库引用；线上验收使用手动触发和实际看板读回。
