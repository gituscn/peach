# 上游同步

本 fork（`gituscn/peach`）的历史经过作者改写，与 `peach-mitao/peach` 没有可用的合并点。GitHub 的 ahead/behind 数字只统计提交谱系，不代表内容差异；内容是否同步以本文件记录的基线为准。

同步按内容差量做，不走 GitHub 的合并入口。Sync fork、`gh repo sync` 与 `POST /repos/{owner}/{repo}/merge-upstream` 都按谱系合并，会把上游已移除的旧路径带回，并在本 fork 的本地改动上产生成片冲突。

## 基线记录

[upstream-sync.json](upstream-sync.json) 记录上一次纳入的上游内容；未更新该文件视为尚未同步。

| 字段 | 含义 |
| --- | --- |
| `upstream` / `branch` | 上游仓库与分支 |
| `commit` | 已纳入的上游提交，下一次差量的起点 |
| `tree` | 该提交的树对象；上游谱系再次改写时用它识别同一份内容 |
| `base_commit` | 本次差量实际使用的上游基线提交 |
| `fork_commit` | 同步合并后的本 fork 主线提交 |
| `synced_at` | 同步日期（Asia/Taipei） |

## 同步步骤

1. 在主检出执行 `git fetch upstream master`；`git rev-parse upstream/master` 等于记录中的 `commit` 时没有新内容。
2. 取二进制差量并排除构建产物：`git diff --binary <commit> upstream/master -- . ':(exclude)web/dist'`。
3. 上游谱系再次改写、`commit` 已不存在时，用 `git log --format='%H %T' upstream/master` 找到树对象等于 `tree` 的提交作为起点；两者都找不到就停下重新取证，不猜基线。
4. 变更在隔离工作树用 `git apply --3way` 应用；`web/dist` 不套用补丁，从前端源码重新构建。
5. 冲突处保留本 fork 的本地能力（WebDAV、mDNS 广播地址、配置页等），只解决到双方内容都在。
6. 按 [测试入口](TESTING.md) 验证，经 PR 集成，推送后核对主线提交。
7. 更新 [upstream-sync.json](upstream-sync.json)：`commit` 与 `tree` 取 `upstream/master`，`base_commit` 保留本次起点，`fork_commit` 取合并后的主线提交，`synced_at` 取当天。

## 回馈上游

分叉历史不影响向上游提 PR：从 `upstream/master` 新建分支，只挑要贡献的提交（`git cherry-pick`），推回本 fork 后向 `peach-mitao:master` 提 PR。不要以本 fork 的 `master` 作为 PR 基底，它不包含上游当前的历史。
