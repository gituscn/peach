/* 浏览器异常只记录到当前 Peach 主机。失败不再生成新的错误请求。 */
let installed = false;
const errorNames = new Set(['Error', 'TypeError', 'RangeError', 'ReferenceError', 'SyntaxError', 'URIError', 'EvalError', 'AggregateError', 'DOMException']);
const bundleNames = ['peach-app.js', 'peach-pages.js'] as const;
const debugIdPattern = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i;

function bundleDebugIds(): Partial<Record<typeof bundleNames[number], string>> {
  const globals = globalThis as typeof globalThis & { _sentryDebugIds?: Record<string, unknown> };
  const ids: Partial<Record<typeof bundleNames[number], string>> = {};
  // 官方注入的 stack 只在本机用于识别固定文件名；请求不携带这份 stack 或其中的 URL。
  for (const [stack, id] of Object.entries(globals._sentryDebugIds ?? {})) {
    if (typeof id !== 'string' || !debugIdPattern.test(id)) continue;
    for (const name of bundleNames) {
      if (new RegExp(`(?:^|[/\\\\])${name.replace('.', '\\.')}(?=[:?#)\\s]|$)`).test(stack)) ids[name] = id;
    }
  }
  return ids;
}

export function installErrorReporting(): void {
  if (installed || typeof window === 'undefined') return;
  installed = true;
  let start = Date.now();
  let count = 0;
  const seen = new Set<string>();
  const send = (kind: string, cause: unknown, fallback = '', source?: ErrorEvent) => {
    const rawName = cause instanceof Error || cause instanceof DOMException ? cause.name : '';
    if (rawName === 'AbortError') return;
    const errorName = errorNames.has(rawName) ? rawName : cause instanceof DOMException ? 'DOMException' : 'Error';
    if (Date.now() - start >= 60_000) {
      start = Date.now(); count = 0; seen.clear();
    }
    if (count >= 10) return;
    const message = (cause instanceof Error ? cause.message : typeof cause === 'string' ? cause : fallback).slice(0, 2000);
    if (!message) return;
    const stack = cause instanceof Error ? (cause.stack ?? '').slice(0, 6000) : '';
    const key = `${kind}:${message}:${stack}`;
    if (seen.has(key)) return;
    seen.add(key); count += 1;
    void fetch('/api/diagnostics/client-error', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ kind, message, stack, error_name: errorName, page: window.location.pathname,
        bundle_debug_ids: bundleDebugIds(),
        source_file: bundleNames.find(name => name === source?.filename?.split('/').pop()?.split(/[?#]/)[0]),
        line: source?.lineno, column: source?.colno }), credentials: 'same-origin', keepalive: true,
    }).catch(() => {});
  };
  window.addEventListener('error', event => send('error', event.error, event.message, event));
  window.addEventListener('unhandledrejection', event => send('unhandledrejection', event.reason, 'Promise 未处理的异常'));
}
