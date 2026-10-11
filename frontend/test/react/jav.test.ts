import { expect, it } from 'vitest';
import { javLibraryPath, javPath, javTab, rankedDiscoveries, type Discovery } from '../../src/react/jav/jav';

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
it('JAV 馆藏深链保留搜索和筛选条件，使用目录入口', () => {
  const url = new URL(javLibraryPath('?tab=library&q=ABC-123&studio=演示厂牌&loc=cloud&sort=new&jav=0'), 'https://peach.test');
  expect(url.pathname).toBe('/');
  expect(Object.fromEntries(url.searchParams)).toEqual({ q: 'ABC-123', studio: '演示厂牌', loc: 'cloud', sort: 'new', jav: '1' });
  expect(javPath('library')).toBe('/?jav=1');
  expect(javPath('unknown')).toBe('/?jav=1');
  expect(javPath('discover')).toBe('/jav?tab=discover');
  expect(javPath('wants')).toBe('/jav?tab=wants');
});
it('按实体身份匹配来源别名与口味中的规范姓名', () => {
  const item = { ...work(1, '來源姓名'), performer_refs: [{ id: 42, name: '规范姓名' }] };
  expect(rankedDiscoveries([item], { rankings: { peach_performers: [{ name: '规范姓名', entity_id: 42, score: 3 }] } })[0]?.matches).toEqual(['规范姓名']);
  expect(rankedDiscoveries([item], { rankings: { peach_performers: [{ name: '另一个姓名', entity_id: 43 }] } })).toEqual([]);
});
