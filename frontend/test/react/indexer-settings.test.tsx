import { notifyManager, QueryClientProvider } from '@tanstack/react-query';
import { afterEach, expect, it, vi } from 'vitest';
import { queryClient } from '../../src/react/query';
import { IndexerSettings } from '../../src/react/settings/indexer-settings';
import { mount, pending, settle } from './render';

notifyManager.setScheduler(notify => notify());
afterEach(() => queryClient.clear());
it('进入资源搜索设置时先读取当前值，再创建表单草稿', async () => {
  const row = { key: 'one', name: '缓存名称', url: 'https://example.com/api', enabled: true, api_key_set: false };
  queryClient.setQueryData(['indexers'], { indexers: [row], max_indexers: 4 });
  const hold = pending<unknown>();
  vi.stubGlobal('fetch', vi.fn(() => hold.answer));
  const host = await mount(<QueryClientProvider client={queryClient}><IndexerSettings receipt={vi.fn()} /></QueryClientProvider>);
  expect(host.querySelector('form')).toBeNull();
  // 等待期间分区标题照画，正文是骨架；状态名只给辅助技术。
  expect(host.querySelector('section')?.getAttribute('aria-label')).toBe('资源搜索');
  expect(host.querySelector('[data-skeleton][aria-busy="true"]')?.getAttribute('aria-label')).toBe('正在读取资源搜索设置');
  await hold.release({ ok: true, status: 200, json: async () => ({ indexers: [{ ...row, name: '当前名称' }], max_indexers: 4 }) });
  await settle();
  expect(host.querySelector<HTMLInputElement>('input')?.value).toBe('当前名称');
  expect(host.querySelector('[data-skeleton]')).toBeNull();
});
