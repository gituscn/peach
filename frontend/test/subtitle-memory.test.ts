/* 字幕恢复与用户新选择的先后关系，不依赖浏览器解码器。 */
import { afterEach, describe, expect, it, vi } from 'vitest';
import { SubtitleSession } from '../src/player/subtitle-memory';
import type { VjsPlayer } from '../src/player/types';

function mounted() {
  const video = document.createElement('video'), events = new EventTarget();
  const tracks = Object.assign([] as TextTrack[], {
    addEventListener: events.addEventListener.bind(events),
    removeEventListener: events.removeEventListener.bind(events),
  });
  Object.defineProperty(video, 'textTracks', { value: tracks });
  const disposing: (() => void)[] = [];
  const player = { peachItem: { id: 1 }, on: (_event: string, callback: () => void) => disposing.push(callback),
    isDisposed: () => false } as unknown as VjsPlayer;
  return { video, tracks, player,
    add: (id: string) => {
      const track = { id, kind: 'subtitles', label: id, language: 'zh', mode: 'disabled' } as TextTrack;
      tracks.push(track); events.dispatchEvent(new Event('addtrack')); return track;
    }, dispose: () => disposing.forEach(callback => callback()) };
}
afterEach(() => vi.unstubAllGlobals());

describe('每部视频的字幕选择', () => {
  it('按身份恢复晚到的旁挂轨道，列表顺序不参与选择', async () => {
    const fetcher = vi.fn(async () => new Response(JSON.stringify({ selected: 'sidecar:2', tracks: [] })));
    vi.stubGlobal('fetch', fetcher);
    const view = mounted(), session = new SubtitleSession(view.player, view.video);
    await session.ready;
    const second = view.add('sidecar:2'), first = view.add('sidecar:1');
    expect(second.mode).toBe('showing'); expect(first.mode).toBe('disabled');
    expect(fetcher).toHaveBeenCalledOnce();
    view.dispose();
  });

  it('读取记忆期间选择关闭，迟到的响应和轨道都不能重新开启字幕', async () => {
    let loaded!: (response: Response) => void;
    const response = new Promise<Response>(resolve => { loaded = resolve });
    const writes: unknown[] = [];
    vi.stubGlobal('fetch', vi.fn(async (_url: string, init?: RequestInit) => {
      if (init?.method === 'PUT') { writes.push(JSON.parse(String(init.body))); return new Response('{}') }
      return response;
    }));
    const view = mounted(), session = new SubtitleSession(view.player, view.video);
    await Promise.resolve();
    session.select(null);
    loaded(new Response(JSON.stringify({ selected: 'sidecar:2', tracks: [] })));
    await session.ready;
    const track = view.add('sidecar:2');
    expect(track.mode).toBe('disabled');
    expect(writes).toEqual([{ selected: null }]);
    view.dispose();
  });
});
