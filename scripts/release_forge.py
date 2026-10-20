"""GitLab 发布的主线与流水线判据；认证和 HTTP 传输复用 glab。"""
from __future__ import annotations

import json
import os
import re
import shutil
import subprocess
import sys
from pathlib import Path
from urllib.parse import quote, urlencode
from urllib.request import Request, urlopen

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "src"))
from peach.user_agent import USER_AGENT


REQUIRED_TEST_JOBS = frozenset({"verify-linux", "verify-windows", "verify-macos", "wheel-smoke"})
TERMINAL_STATUSES = frozenset({"success", "failed", "canceled", "skipped"})


class GitLabForge:
    def __init__(self, host: str, command):
        if not re.fullmatch(r"[a-zA-Z0-9.-]+(?::[0-9]+)?", host):
            raise ValueError("GitLab 主机必须是域名，可附端口")
        self.host = host
        self.command = command

    def api(self, repo: str, endpoint: str):
        executable = os.environ.get("PEACH_GLAB") or shutil.which("glab")
        if not executable:
            raise ValueError("GitLab 发布需要官方 glab；可用 PEACH_GLAB 指定其路径")
        path = f"projects/{quote(repo, safe='')}/{endpoint}"
        try:
            return json.loads(self.command(executable, "api", "--hostname", self.host,
                                           "--method", "GET", path))
        except subprocess.CalledProcessError as error:
            if "403" not in (error.stderr or ""):
                raise
            # 公开项目的只读元数据可匿名取得，不扩大本机细粒度凭据权限。
            request = Request(f"https://{self.host}/api/v4/{path}",
                              headers={"Accept": "application/json", "User-Agent": USER_AGENT})
            with urlopen(request, timeout=60) as response:
                return json.load(response)

    def remote_url(self, repo: str) -> str:
        # 使用已配置的 Git 认证；PAT 和 Runner token 不进入命令参数。
        return f"https://{self.host}/{repo}.git"

    def release_url(self, repo: str, tag: str) -> str:
        return f"https://{self.host}/{repo}/-/releases/{quote(tag, safe='')}"

    def master_sha(self, repo: str) -> str:
        return self.api(repo, "repository/branches/master")["commit"]["id"]

    def require_free_tag(self, repo: str, tag: str) -> None:
        query = urlencode({"search": f"^{re.escape(tag)}$", "per_page": 100})
        if any(item["name"] == tag for item in self.api(repo, f"repository/tags?{query}")):
            raise ValueError(f"{tag} 已存在，不覆盖；发布新版本请先推进 __version__")

    def require_ancestor(self, repo: str, sha: str) -> None:
        remote = self.master_sha(repo)
        # Git 对提交图作精确判定；比较文件差异不能证明祖先关系。
        self.command("git", "fetch", "--no-tags", self.remote_url(repo), "refs/heads/master")
        fetched = self.command("git", "rev-parse", "FETCH_HEAD")
        if fetched != remote:
            raise ValueError("检查期间 GitLab master 已更新，请重新执行")
        if self.command("git", "merge-base", remote, sha) != sha:
            raise ValueError("发布提交不属于远端 master 历史")

    def test_runs(self, repo: str, sha: str) -> list[dict]:
        query = urlencode({"sha": sha, "ref": "master", "source": "push", "per_page": 100})
        pipelines = self.api(repo, f"pipelines?{query}")
        matching = [item for item in pipelines if item["sha"] == sha
                    and item["ref"] == "master" and item["source"] == "push"]
        if not matching:
            return []
        pipeline = max(matching, key=lambda item: item["id"])
        status = pipeline["status"]
        if status == "success":
            self.require_test_jobs(repo, pipeline["id"], sha)
        # 统一 CI 结果字段供唯一发布入口消费，保留真实流水线 ID 与链接。
        return [{"id": pipeline["id"], "head_sha": sha, "head_branch": "master", "event": "push",
                 "status": "completed" if status in TERMINAL_STATUSES else "in_progress",
                 "conclusion": "success" if status == "success" else status,
                 "html_url": pipeline["web_url"]}]

    def require_test_jobs(self, repo: str, pipeline: int, sha: str) -> None:
        jobs = []
        for page in range(1, 11):
            batch = self.api(repo, f"pipelines/{pipeline}/jobs?per_page=100&page={page}")
            jobs.extend(batch)
            if len(batch) < 100:
                break
        else:
            raise ValueError("流水线任务超过可核对上限，发布检查未完成")
        selected = {}
        for job in jobs:
            if job["name"] not in selected or job["id"] > selected[job["name"]]["id"]:
                selected[job["name"]] = job
        bad = [name for name in sorted(REQUIRED_TEST_JOBS)
               if name not in selected or selected[name]["status"] != "success"
               or selected[name].get("allow_failure")
               or selected[name].get("commit", {}).get("id") != sha]
        if bad:
            raise ValueError("GitLab 发布验证缺少同一提交的必需成功任务：" + "、".join(bad))
