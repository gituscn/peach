import { notifyManager, QueryClientProvider } from '@tanstack/react-query';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { confirmModal } from '@peach/legacy/ui';
import { TagManager, type ManagedTag } from '../../src/react/index/tag-manager';
import { queryClient } from '../../src/react/query';
import { buttonNamed, click, mount, mountRoot, settle, submit, type } from './render';

vi.mock('@peach/legacy/ui', async original => ({
  ...await original<typeof import('@peach/legacy/ui')>(),
  confirmModal: vi.fn(async ({ onConfirm }: { onConfirm(): Promise<unknown> }) => ({ confirmed: true, result: await onConfirm() })),
}));
vi.mock('../../src/react/toaster', () => ({ showToast: vi.fn() }));
notifyManager.setScheduler(notify => notify());
afterEach(() => queryClient.clear());

const initial = (): ManagedTag[] => [
  { entity_id: 1, k: '眼镜', aliases: ['眼镜娘'], n: 2, hidden: false },
  { entity_id: 2, k: '旅行', aliases: [], n: 1, hidden: false },
  { entity_id: 3, k: '旧标签', aliases: [], n: 1, hidden: true },
];

function backend(failPreview = false) {
  let rows = initial();
  const fetcher = vi.fn(async (url: string, init?: RequestInit) => {
    const command = init?.body ? JSON.parse(String(init.body)) : null;
    if (url.endsWith('/preview')) return { ok: !failPreview, status: failPreview ? 400 : 200, json: async () =>
      failPreview ? { error: '目标名称已存在，请使用合并标签' } : { token: 'plan', assets: 2, overlap: 0, tags: rows.filter(row => command.ids.includes(row.entity_id)) } };
    if (command) rows = rows.map(row => !command.ids.includes(row.entity_id) ? row :
      { ...row, k: command.operation === 'rename' ? command.name : row.k,
        hidden: command.operation === 'hide' || (command.operation !== 'restore' && row.hidden) });
    return { ok: true, status: 200, json: async () => command ? { ok: true } : { items: rows, duplicate_groups: [] } };
  });
  vi.stubGlobal('fetch', fetcher);
  return fetcher;
}

async function open() {
  const host = await mount(<QueryClientProvider client={queryClient}><TagManager /></QueryClientProvider>);
  await settle(); return host;
}

describe('标签管理', () => {
  it('在线内容屏蔽与标签隐藏各有状态并使用预览计划恢复', async () => {
    let blocked = false;
    const commands: Record<string, unknown>[] = [];
    const row = () => ({ id: 'outdoors', k: 'outdoors', n: 2, aliases: [], hidden: false, blocked, cat: 'general' });
    vi.stubGlobal('fetch', vi.fn(async (url: string, init?: RequestInit) => {
      const command = init?.body ? JSON.parse(String(init.body)) : null;
      if (command) commands.push(command);
      if (url.endsWith('/preview')) return { ok: true, json: async () => ({ token: 'content-plan', assets: 2, overlap: 0, tags: [row()] }) };
      if (command) blocked = command.operation === 'block';
      return { ok: true, json: async () => command ? { ok: true } : { items: [row()], duplicate_groups: [] } };
    }));
    const host = await mount(<QueryClientProvider client={queryClient}><TagManager scope="online" /></QueryClientProvider>);
    await settle();
    await click(host.querySelector('[data-tag-chip]'));
    await click(buttonNamed('屏蔽内容', host)); await settle();
    expect(commands).toEqual([{ operation: 'block', ids: ['outdoors'], scope: 'online' },
      { operation: 'block', ids: ['outdoors'], scope: 'online', token: 'content-plan' }]);
    expect(host.querySelectorAll('[data-tag-chip]')).toHaveLength(0);
    await click(buttonNamed('已隐藏', host));
    expect(host.querySelectorAll('[data-tag-chip]')).toHaveLength(0);
    await click(buttonNamed('已屏蔽内容', host));
    await click(host.querySelector('[data-tag-chip]'));
    await click(buttonNamed('恢复内容', host)); await settle();
    expect(commands.at(-1)).toEqual({ operation: 'unblock', ids: ['outdoors'], scope: 'online', token: 'content-plan' });
    await click(buttonNamed('使用中', host));
    expect(host.querySelectorAll('[data-tag-chip]')).toHaveLength(1);
  });

  it('搜索登记别名并区分使用中与已隐藏标签', async () => {
    backend();
    const view = await mountRoot(<QueryClientProvider client={queryClient}><TagManager search="眼镜娘" /></QueryClientProvider>);
    const host = view.host;
    await settle();
    expect(host.querySelectorAll('[data-tag-chip]')).toHaveLength(1);
    expect(host.textContent).toContain('眼镜');
    await view.rerender(<QueryClientProvider client={queryClient}><TagManager search="" /></QueryClientProvider>);
    await click(buttonNamed('已隐藏', host));
    expect(host.querySelectorAll('[data-tag-chip]')).toHaveLength(1);
    expect(host.textContent).toContain('旧标签');
  });

  it('在线标签沿用字符串身份与在线词表提交改名', async () => {
    const calls: Record<string, unknown>[] = [];
    vi.stubGlobal('fetch', vi.fn(async (url: string, init?: RequestInit) => {
      const command = init?.body ? JSON.parse(String(init.body)) : null;
      if (command) calls.push(command);
      return { ok: true, json: async () => url.endsWith('/preview')
        ? { token: 'online-plan', assets: 2, overlap: 0, tags: [{ id: 'outdoors', k: 'outdoors' }] }
        : { items: [{ id: 'outdoors', k: 'outdoors', n: 2, aliases: [], hidden: false, cat: 'general' }], duplicate_groups: [] } };
    }));
    const host = await mount(<QueryClientProvider client={queryClient}><TagManager scope="online" /></QueryClientProvider>);
    await settle();
    await click(host.querySelector('[aria-label="编辑标签 outdoors"]'));
    await type(document.querySelector('input[aria-label="标签名称"]'), '户外');
    await submit(document.querySelector('form')); await settle();
    expect(calls).toEqual([{ operation: 'rename', scope: 'online', ids: ['outdoors'], name: '户外' },
      { operation: 'rename', scope: 'online', ids: ['outdoors'], name: '户外', token: 'online-plan' }]);
  });

  it('重命名先预览再使用同一计划提交并刷新标签', async () => {
    const fetcher = backend(); const host = await open();
    await click(host.querySelector('[data-tag-chip][data-k="眼镜"]'));
    await click(buttonNamed('重命名'));
    await type(document.querySelector('input[aria-label="标签名称"]'), '我的标签');
    await submit(document.querySelector('form'));
    await settle();
    expect(confirmModal).toHaveBeenCalledWith(expect.objectContaining({ body: expect.stringContaining('2 个资源') }));
    const bodies = fetcher.mock.calls.filter(([, init]) => init?.body).map(([, init]) => JSON.parse(String(init?.body)));
    expect(bodies).toEqual([{ operation: 'rename', ids: [1], name: '我的标签' },
      { operation: 'rename', ids: [1], name: '我的标签', token: 'plan' }]);
    expect(host.querySelector('[data-tag-chip][data-k="我的标签"]')).not.toBeNull();
  });

  it('冲突保留输入和错误且不发送写入', async () => {
    const fetcher = backend(true); const host = await open();
    await click(host.querySelector('[data-tag-chip][data-k="眼镜"]'));
    await click(buttonNamed('重命名'));
    await type(document.querySelector('input[aria-label="标签名称"]'), '旅行');
    await submit(document.querySelector('form')); await settle();
    expect((document.querySelector('input[aria-label="标签名称"]') as HTMLInputElement).value).toBe('旅行');
    expect(document.body.textContent).toContain('目标名称已存在');
    expect(fetcher.mock.calls.filter(([url, init]) => url === '/api/tag-management' && init?.body)).toHaveLength(0);
  });
});
