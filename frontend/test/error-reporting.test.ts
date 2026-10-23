import { afterEach, expect, it, vi } from 'vitest';

afterEach(() => { vi.restoreAllMocks(); vi.unstubAllGlobals(); vi.resetModules() });

it('浏览器异常有上限、去重，网络失败不会触发递归上报', async () => {
  const listeners = new Map<string, (event: unknown) => void>();
  vi.spyOn(window, 'addEventListener').mockImplementation((name, callback) => {
    listeners.set(name, callback as (event: unknown) => void);
  });
  const fetch = vi.fn().mockRejectedValue(new Error('offline'));
  vi.stubGlobal('fetch', fetch);
  const { installErrorReporting } = await import('../src/error-reporting');
  installErrorReporting(); installErrorReporting();
  expect(listeners.size).toBe(2);
  const error = new Error('render failed');
  const event = { error, message: error.message,
    filename: 'https://peach.example/dist/peach-app.js?token=private-token', lineno: 21, colno: 8 };
  listeners.get('error')!(event);
  listeners.get('error')!(event);
  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch.mock.calls[0]![0]).toBe('/api/diagnostics/client-error');
  expect(JSON.parse(fetch.mock.calls[0]![1].body)).toMatchObject({ kind: 'error', message: 'render failed' });
  expect(JSON.parse(fetch.mock.calls[0]![1].body)).toMatchObject({ source_file: 'peach-app.js', line: 21, column: 8 });
  expect(fetch.mock.calls[0]![1].body).not.toContain('private-token');
  for (let i = 0; i < 30; i += 1) listeners.get('unhandledrejection')!({ reason: `failure ${i}` });
  expect(fetch).toHaveBeenCalledTimes(10);
  await Promise.resolve();
  expect(fetch).toHaveBeenCalledTimes(10);
});

it('主动取消请求不生成错误记录，真实异常保留类型', async () => {
  const listeners = new Map<string, (event: unknown) => void>();
  vi.spyOn(window, 'addEventListener').mockImplementation((name, callback) => {
    listeners.set(name, callback as (event: unknown) => void);
  });
  const fetch = vi.fn().mockResolvedValue({ ok: true });
  vi.stubGlobal('fetch', fetch);
  const { installErrorReporting } = await import('../src/error-reporting');
  installErrorReporting();
  const cancelled = new DOMException('request cancelled', 'AbortError');
  listeners.get('unhandledrejection')!({ reason: cancelled });
  listeners.get('error')!({ error: cancelled, message: cancelled.message });
  expect(fetch).not.toHaveBeenCalled();
  listeners.get('unhandledrejection')!({ reason: new TypeError('render failed') });
  expect(fetch).toHaveBeenCalledTimes(1);
  expect(JSON.parse(fetch.mock.calls[0]![1].body)).toMatchObject({ error_name: 'TypeError' });
});

it('正式 bundle 只上报固定文件名与有效 Debug ID，异常类型不携带自定义名称', async () => {
  const listeners = new Map<string, (event: unknown) => void>();
  vi.spyOn(window, 'addEventListener').mockImplementation((name, callback) => {
    listeners.set(name, callback as (event: unknown) => void);
  });
  const appId = '12345678-1234-4123-8123-123456789abc';
  const pagesId = '23456789-1234-4123-8123-123456789abc';
  vi.stubGlobal('_sentryDebugIds', {
    'Error\n at https://private-host/dist/peach-app.js?token=private-token:1:23': appId,
    'Error\nsentry@https://private-host/dist/peach-pages.js:1:12': pagesId,
    'Error\n at https://private-host/dist/other.js:1:2': '34567890-1234-4123-8123-123456789abc',
    'Error\n at https://private-host/dist/peach-app.js:1:2': 'private-value',
  });
  const fetch = vi.fn().mockResolvedValue({ ok: true });
  vi.stubGlobal('fetch', fetch);
  const { installErrorReporting } = await import('../src/error-reporting');
  installErrorReporting();
  const error = new Error('fixture failure');
  error.name = 'private-name';
  error.stack = 'fixture failure';
  listeners.get('error')!({ error, filename: 'https://private-host/secret.js?token=private-token' });
  const body = fetch.mock.calls[0]![1].body;
  expect(JSON.parse(body)).toMatchObject({ error_name: 'Error', bundle_debug_ids: {
    'peach-app.js': appId, 'peach-pages.js': pagesId,
  } });
  expect(JSON.parse(body)).not.toHaveProperty('source_file');
  for (const secret of ['private-host', 'private-token', 'other.js', 'private-name', 'private-value']) expect(body).not.toContain(secret);
});

it('按页拆出的 chunk 也带文件名与 Debug ID 上报，查询串与主机不出本机', async () => {
  const listeners = new Map<string, (event: unknown) => void>();
  vi.spyOn(window, 'addEventListener').mockImplementation((name, callback) => {
    listeners.set(name, callback as (event: unknown) => void);
  });
  const chunk = 'peach-app.stats-page-Ab1_x-Y9.js';
  const chunkId = '45678901-1234-4123-8123-123456789abc';
  vi.stubGlobal('_sentryDebugIds', {
    [`Error\n at https://private-host/dist/${chunk}:1:9\n at https://private-host/dist/peach-app.js:1:2`]: chunkId,
    'Error\n at https://private-host/dist/peach-app.a.b.js:1:2': '56789012-1234-4123-8123-123456789abc',
  });
  const fetch = vi.fn().mockResolvedValue({ ok: true });
  vi.stubGlobal('fetch', fetch);
  const { installErrorReporting } = await import('../src/error-reporting');
  installErrorReporting();
  const error = new TypeError('chunk failure');
  listeners.get('error')!({ error, filename: `https://private-host/dist/${chunk}?token=private-token`, lineno: 3, colno: 4 });
  const body = fetch.mock.calls[0]![1].body;
  expect(JSON.parse(body)).toMatchObject({ source_file: chunk, line: 3, column: 4 });
  expect(JSON.parse(body).bundle_debug_ids).toEqual({ [chunk]: chunkId });
  for (const secret of ['private-host', 'private-token']) expect(body).not.toContain(secret);
});

it('每分钟窗口恢复上报额度', async () => {
  let callback: ((event: unknown) => void) | undefined;
  vi.spyOn(window, 'addEventListener').mockImplementation((name, listener) => {
    if (name === 'unhandledrejection') callback = listener as (event: unknown) => void;
  });
  const now = vi.spyOn(Date, 'now').mockReturnValue(0);
  const fetch = vi.fn().mockResolvedValue({ ok: true });
  vi.stubGlobal('fetch', fetch);
  const { installErrorReporting } = await import('../src/error-reporting');
  installErrorReporting();
  for (let index = 0; index < 11; index += 1) callback!({ reason: `failure ${index}` });
  expect(fetch).toHaveBeenCalledTimes(10);
  now.mockReturnValue(60_000);
  callback!({ reason: 'failure 0' });
  expect(fetch).toHaveBeenCalledTimes(11);
});
