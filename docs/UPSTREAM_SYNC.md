# 上游同步

本 fork 的主线与 `peach-mitao/peach` 共享历史：2026-10-31 以 upstream `428d1418`（0.52.0 之后的主线）为基线重建，本地改动集中在该基线之上的提交里。GitHub 的 ahead 只统计本地提交，behind 表示上游新增。

[upstream-sync.json](upstream-sync.json) 记录上一次纳入的上游内容；未更新该文件视为尚未同步。

| 字段 | 含义 |
| --- | --- |
| `upstream` / `branch` | 上游仓库与分支 |
| `commit` | 已纳入的上游提交 |
| `tree` | 该提交的树对象，用于核对同一份内容 |
| `fork_commit` | 重建后的本地提交 |
| `synced_at` | 同步日期（Asia/Taipei） |

## 同步步骤

1. 在主检出执行 `git fetch upstream master`；`git rev-parse upstream/master` 等于记录中的 `commit` 时没有新内容。
2. 在隔离工作树从当前主线新建分支，执行 `git merge upstream/master`。
3. 冲突处保留本 fork 的本地能力（WebDAV、mDNS 广播地址、配置页等）；`web/dist` 不从补丁合入，从前端源码重新构建。
4. 按 [测试入口](TESTING.md) 验证，经 PR 集成，推送后核对主线提交。
5. 更新 [upstream-sync.json](upstream-sync.json)：`commit` 与 `tree` 取本次纳入的 `upstream/master`，`fork_commit` 取合并后的主线提交，`synced_at` 取当天。

## 上游再次分叉时

若上游再次改写历史，常规合并会重新产生大量冲突。此时用记录中的 `tree` 在 `git log --format='%H %T' upstream/master` 里找到同内容提交作为基线，按内容差量应用并排除 `web/dist`；找不到就停下重新取证，不猜基线。

## 回馈上游

从 `upstream/master` 新建分支，只挑要贡献的提交（`git cherry-pick`），推回本 fork 后向 `peach-mitao:master` 提 PR。不要以本 fork 的 `master` 作为 PR 基底。
