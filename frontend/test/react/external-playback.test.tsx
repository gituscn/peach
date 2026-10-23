import { expect, it, vi } from 'vitest';
import { ExternalPlayback, LocalPlayback, playerLink } from '../../src/react/item-detail/external-playback';
import { click, mount, settle } from './render';

it('外部播放器只在用户请求后签发链接，并保留网络地址供 VR 播放器使用', async () => {
  const fetcher = vi.fn(async () => ({ ok: true, json: async () => ({
    url: '/external-stream/1?ticket=short', playlist: '/external-playlist/1.m3u?ticket=short',
  }) }));
  vi.stubGlobal('fetch', fetcher);
  const host = await mount(<ExternalPlayback id={1} />);
  expect(fetcher).not.toHaveBeenCalled();
  await click(Array.from(host.querySelectorAll('button')).find(button => button.textContent === '生成播放链接')!);
  await settle();
  expect(fetcher.mock.calls).toHaveLength(1);
  expect(host.querySelector('a')?.getAttribute('href')).toContain('/external-playlist/1.m3u?ticket=short');
  expect(host.querySelector('input')?.value).toContain('/external-stream/1?ticket=short');
});

it('专属协议只编码服务端播放地址', () => {
  const url = 'https://peach.example/external-stream/1?ticket=a.b';
  expect(playerLink('vlc-ios', url, '/list')).toBe(`vlc-x-callback://x-callback-url/stream?url=${encodeURIComponent(url)}`);
  expect(playerLink('iina', url, '/list')).toBe(`iina://weblink?url=${encodeURIComponent(url)}`);
  expect(playerLink('unknown', url, '/list')).toBe('/list');
});

it('本机可选择已安装播放器并在打开成功后回执，失败保留原因', async () => {
  const opened = vi.fn();
  const fetcher = vi.fn(async (url: string) => new Response(JSON.stringify(url === '/api/local-players'
    ? { players: [{ id: 'default', label: '系统默认播放器' }, { id: 'vlc', label: 'VLC' }] } : { opened: true })));
  vi.stubGlobal('fetch', fetcher);
  const host = await mount(<LocalPlayback id={7} onOpened={opened} />);
  await settle();
  expect(host.textContent).toContain('系统默认播放器');
  await click(host.querySelector('[aria-label="使用本地播放器打开"]'));
  expect(fetcher).toHaveBeenLastCalledWith('/api/local-playback?id=7&player=default', expect.objectContaining({ method: 'POST' }));
  expect(opened).toHaveBeenCalledOnce();
  fetcher.mockImplementation(async () => new Response(JSON.stringify({ detail: '无法打开播放器' }), { status: 503 }));
  await click(host.querySelector('[aria-label="使用本地播放器打开"]'));
  expect(host.textContent).toContain('无法打开播放器');
  expect(opened).toHaveBeenCalledOnce();
});
