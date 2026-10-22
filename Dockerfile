# syntax=docker/dockerfile:1
FROM ghcr.io/astral-sh/uv:0.13.1 AS uv
FROM python:3.14.8-slim-trixie AS build
COPY --from=uv /uv /usr/local/bin/uv
WORKDIR /app
ENV UV_PYTHON_DOWNLOADS=never UV_LINK_MODE=copy
RUN apt-get update && apt-get install -y --no-install-recommends build-essential \
    && rm -rf /var/lib/apt/lists/*
COPY pyproject.toml uv.lock README.md LICENSE setup.py MANIFEST.in ./
COPY src ./src
COPY migrations ./migrations
COPY web ./web
COPY resources ./resources
COPY tools/amane-bridge ./tools/amane-bridge
COPY scripts/write_reporting_config.py ./scripts/
RUN uv sync --locked --no-dev --no-editable
# 公开 DSN 写进 wheel 的资源目录；发行流水线传 PEACH_REQUIRE_REPORTING=1，缺失时构建失败。
ARG PEACH_SENTRY_DSN="" PEACH_LIBRARY_SENTRY_DSN="" PEACH_REQUIRE_REPORTING=""
RUN target="$(.venv/bin/python -c 'import pathlib, peach; print(pathlib.Path(peach.__file__).parent / "_resources" / "sentry.json")')" \
    && .venv/bin/python scripts/write_reporting_config.py --output "$target" ${PEACH_REQUIRE_REPORTING:+--require}

FROM python:3.14.8-slim-trixie
LABEL org.opencontainers.image.title="Peach" \
      org.opencontainers.image.source="https://github.com/peach-mitao/peach" \
      org.opencontainers.image.licenses="AGPL-3.0-or-later"
RUN apt-get update && apt-get install -y --no-install-recommends ffmpeg openssl ca-certificates mesa-va-drivers vainfo \
    && rm -rf /var/lib/apt/lists/* \
    && groupadd --gid 1000 peach && useradd --uid 1000 --gid 1000 --create-home peach \
    && mkdir /data && chown peach:peach /data
COPY --from=build /app/.venv /app/.venv
ENV PATH="/app/.venv/bin:$PATH" PEACH_DATA_ROOT=/data PYTHONUNBUFFERED=1 \
    PYTHONIOENCODING=utf-8 PYTHONUTF8=1 PEACH_DISTRIBUTION=docker
WORKDIR /data
USER peach
EXPOSE 8900
VOLUME ["/data"]
HEALTHCHECK --interval=30s --timeout=5s --start-period=60s --retries=3 \
    CMD ["python", "-c", "import urllib.request; urllib.request.urlopen('http://127.0.0.1:8900/healthz?ready=1', timeout=3).read()"]
ENTRYPOINT ["python", "-m", "peach.server"]
