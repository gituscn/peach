import { describe, expect, it, vi } from 'vitest';

import { LibrarySharingSettings, type LibrarySharingState } from '../../src/react/settings/library-sharing-settings';
import { buttonNamed, click, mount, settle, switches } from './render';

const initial: LibrarySharingState = { enabled: false, available: false, schema: 1,
  fields: ['作品编号、标签、评分', '偏好强度与证据来源类别'], notice: '明细反映成人内容偏好，不能保证匿名。' };

describe('馆藏与口味分享的明确同意', () => {
  it('默认关闭且不读取明细，预览后仍须主动勾选，再允许开启', async () => {
    const fetcher = vi.fn(async (url: string) => ({ ok: true, json: async () => url.endsWith('/preview')
      ? { data: { library: [{ code: 'EXM-001', ratings: [4] }], preferences: {} }, bytes: 80, token: 'preview-token', schema: 1 }
      : { ...initial, enabled: true } }));
    vi.stubGlobal('fetch', fetcher);
    const receipt = vi.fn();
    const host = await mount(<LibrarySharingSettings initial={initial} receipt={receipt} />);
    expect(fetcher).not.toHaveBeenCalled();
    expect(host.textContent).toContain(initial.notice);
    expect(buttonNamed('同意并开启分享', host)).toBeNull();
    await click(buttonNamed('预览上传内容', host));
    await settle();
    expect(host.textContent).toContain('EXM-001');
    const accept = host.querySelector<HTMLInputElement>('input[type="checkbox"]')!;
    expect(accept.checked).toBe(false);
    expect(buttonNamed('同意并开启分享', host)?.disabled).toBe(true);
    await click(accept);
    await click(buttonNamed('同意并开启分享', host));
    await settle();
    const call = fetcher.mock.calls[1]! as unknown as [string, RequestInit];
    expect(JSON.parse(String(call[1].body))).toEqual({ enabled: true, schema: 1, consent: true, preview_token: 'preview-token' });
    expect(receipt).toHaveBeenCalledWith('已保存馆藏与口味分享选项');
    expect(switches(host)[0]?.checked).toBe(true);
  });

  it('关闭不要求重新预览或勾选', async () => {
    const fetcher = vi.fn(async () => ({ ok: true, json: async () => initial }));
    vi.stubGlobal('fetch', fetcher);
    const host = await mount(<LibrarySharingSettings initial={{ ...initial, enabled: true }} receipt={vi.fn()} />);
    await click(switches(host)[0]!);
    await settle();
    const call = fetcher.mock.calls[0]! as unknown as [string, RequestInit];
    expect(JSON.parse(String(call[1].body)).enabled).toBe(false);
    expect(switches(host)).toHaveLength(0);
  });
});
