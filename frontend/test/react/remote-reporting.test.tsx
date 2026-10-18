import { describe, expect, it, vi } from 'vitest';

import { RemoteReportingSettings, type RemoteReportingState } from '../../src/react/settings/remote-reporting-settings';
import { buttonNamed, click, mount, settle, switches } from './render';

const initial: RemoteReportingState = {
  usage: false, errors: false, available: false,
  fields: { usage: 'Peach 版本、操作系统类型', errors: '异常链、代码位置和结构化错误码' },
  notice: '不自动发送日志正文或媒体信息。',
};

describe('遥测与错误诊断', () => {
  it('默认关闭，缺少接收端时显示明确状态，两个选项独立保存', async () => {
    const fetcher = vi.fn(async () => ({ ok: true, json: async () => ({ ...initial, errors: true }) }));
    vi.stubGlobal('fetch', fetcher);
    const receipt = vi.fn();
    const host = await mount(<RemoteReportingSettings initial={initial} receipt={receipt} />);
    expect(switches(host).map((node) => node.checked)).toEqual([false, false]);
    expect(host.textContent).toContain('此版本尚未配置诊断接收端');
    await click(switches(host)[1]!);
    await click(buttonNamed('保存配置', host));
    await settle();
    const [url, init] = fetcher.mock.calls[0]! as unknown as [string, RequestInit];
    expect(url).toBe('/api/configuration/remote-reporting');
    expect(JSON.parse(String(init.body))).toEqual({ usage: false, errors: true });
    expect(receipt).toHaveBeenCalledWith('已保存诊断选项');
    expect(switches(host).map((node) => node.checked)).toEqual([false, true]);
  });

  it('保存失败保留选择和错误，关闭选项可以再次提交', async () => {
    const fetcher = vi.fn()
      .mockResolvedValueOnce({ ok: false, status: 403, json: async () => ({ error: '请在本机保存' }) })
      .mockResolvedValueOnce({ ok: true, json: async () => initial });
    vi.stubGlobal('fetch', fetcher);
    const receipt = vi.fn();
    const host = await mount(<RemoteReportingSettings initial={{ ...initial, usage: true, errors: true }} receipt={receipt} />);
    for (const toggle of switches(host)) await click(toggle);
    await click(buttonNamed('保存配置', host));
    await settle();
    expect(host.querySelector('[role="alert"]')?.textContent).toContain('请在本机保存');
    expect(receipt).not.toHaveBeenCalled();
    await click(buttonNamed('保存配置', host));
    await settle();
    expect(JSON.parse(String(fetcher.mock.calls[1]![1].body))).toEqual({ usage: false, errors: false });
    expect(host.querySelector('[role="alert"]')).toBeNull();
  });
});
