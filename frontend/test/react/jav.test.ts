import { expect, it } from 'vitest';
import { javLibraryPath, javPath, javTab } from '../../src/react/jav/jav';
it('JAV 分区从深链恢复，未知分区落在馆藏', () => {
  expect(javTab('discover')).toBe('discover'); expect(javTab('wants')).toBe('wants'); expect(javTab('other')).toBe('library');
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
