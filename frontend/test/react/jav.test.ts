import { expect, it } from 'vitest';
import { discoveryArtwork, javLibraryPath, javPath, javTab, type Discovery } from '../../src/react/jav/jav';

it('发现封面优先本机缓存，远程封面保留原地大小图取景身份', () => {
  const item = { id: 1, code: 'ABC-001', has_cover: true, cover_url: 'https://example.test/cover.jpg' } as Discovery;
  const local = document.createElement('div');
  local.innerHTML = discoveryArtwork(item, 'big', 'cover');
  expect(local.querySelector('img')?.getAttribute('src')).toContain('/cover?code=ABC-001');
  local.innerHTML = discoveryArtwork({ ...item, has_cover: false }, 'small', 'cover');
  expect(local.querySelector('img')?.getAttribute('src')).toBe(item.cover_url);
  expect(local.querySelector('img')?.dataset.javImageLayout).toBe('small');
  expect(local.querySelector('img')?.dataset.javCover).toBe(item.cover_url);
});
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
