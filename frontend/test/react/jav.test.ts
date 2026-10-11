import { expect, it, vi } from 'vitest';
import { appSettingsStore } from '../../src/appearance';
import { queryClient } from '../../src/react/query';
import { javTab, prefetchJav, rankedDiscoveries, type Discovery } from '../../src/react/jav/jav';

const work = (id: number, performers: string) => ({ id, performers, code: `ABC-${id}`, release_date: '2026-10-01' }) as Discovery;
it('发现只推荐新作中出演者与真实口味信号一致的作品', () => {
  const ranked = rankedDiscoveries([work(1, '甲、乙'), work(2, '乙'), work(3, '甲的朋友'), work(4, '')], {
    rankings: { peach_performers: [{ name: '甲', score: 10 }], browser_creators: [{ name: '乙', visits: 2 }] },
  });
  expect(ranked.map(item => item.id)).toEqual([1, 2]);
  expect(ranked[0]?.matches).toEqual(['甲', '乙']);
  expect(rankedDiscoveries([work(1, '甲')], {})).toEqual([]);
});
it('JAV 分区从深链恢复，未知分区落在馆藏', () => {
  expect(javTab('discover')).toBe('discover'); expect(javTab('wants')).toBe('wants'); expect(javTab('other')).toBe('library');
});
it('未取得发行日的真实新作可以参与口味排序', () => {
  const items = [{ ...work(1, '甲'), release_date: '' }, work(2, '甲')];
  expect(rankedDiscoveries(items, { rankings: { peach_performers: [{ name: '甲', score: 1 }] } }).map(item => item.id)).toEqual([2, 1]);
});
it('馆藏预取按用户设置的数量请求，使用独立的分页缓存', async () => {
  const settings = appSettingsStore().value;
  const initial = settings.batchSize;
  const fetcher = vi.fn(async (_url: string) => ({ ok: true, json: async () => ({ items: [{ id: 1 }], total: 1 }) }));
  vi.stubGlobal('fetch', fetcher);
  try {
    settings.batchSize = 24;
    await prefetchJav('library', new AbortController().signal);
    expect(new URL(String(fetcher.mock.calls[0]?.[0]), 'https://peach.test').searchParams.get('limit')).toBe('24');
    settings.batchSize = 12;
    await prefetchJav('library', new AbortController().signal);
    expect(fetcher).toHaveBeenCalledTimes(2);
    expect(new URL(String(fetcher.mock.calls[1]?.[0]), 'https://peach.test').searchParams.get('limit')).toBe('12');
  } finally { settings.batchSize = initial; queryClient.clear() }
});
