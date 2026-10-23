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

it('骨架照终态画底栏两颗禁用的键，索引器行数与展开态按上次读回的结构', async () => {
  const rows = [
    { key: 'one', name: '甲', url: 'https://example.com/a', enabled: true, api_key_set: true },
    { key: 'two', name: '', url: '', enabled: true, api_key_set: false },
  ];
  const state = { indexers: rows, max_indexers: 4 };
  vi.stubGlobal('fetch', vi.fn(async () => ({ ok: true, status: 200, json: async () => state })));
  const first = await mount(<QueryClientProvider client={queryClient}><IndexerSettings receipt={vi.fn()} /></QueryClientProvider>);
  await settle();
  expect(first.querySelector('form[aria-label="资源搜索"]')).not.toBeNull();

  const hold = pending<unknown>();
  vi.stubGlobal('fetch', vi.fn(() => hold.answer));
  const host = await mount(<QueryClientProvider client={queryClient}><IndexerSettings receipt={vi.fn()} /></QueryClientProvider>);
  const skeleton = host.querySelector('[data-skeleton] section[aria-label="资源搜索"]')!;
  const keys = [...skeleton.querySelectorAll<HTMLButtonElement>('button')];
  expect(keys.map((key) => [key.textContent, key.disabled])).toEqual([['移除', true], ['添加索引器', true], ['保存配置', true]]);
  // 两条索引器两行，只有还没填地址的那条展开出三栏输入。
  expect(skeleton.querySelectorAll('.border-t.pt-2')).toHaveLength(2);
  expect([...skeleton.querySelectorAll('span.text-body-medium')].map((node) => node.textContent)).toEqual(['名称', 'Torznab 地址', 'API key']);
  await hold.release({ ok: true, status: 200, json: async () => state });
  await settle();
  expect(host.querySelector('[data-skeleton]')).toBeNull();
  localStorage.clear();
});
