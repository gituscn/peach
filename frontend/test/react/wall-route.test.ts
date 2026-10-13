import { describe, expect, it } from 'vitest';
import { wallAddress } from '../../src/react/video-wall/wall-route';

describe('播放墙独立入口', () => {
  it('继承搜索和筛选，并保留返回地址', () => {
    const target = new URL(wallAddress('/?q=测试&tag=风景&loc=local'), location.origin);
    expect(target.pathname).toBe('/wall');
    expect(target.searchParams.get('q')).toBe('测试');
    expect(target.searchParams.get('tag')).toBe('风景');
    expect(target.searchParams.get('returnTo')).toBe('/?q=%E6%B5%8B%E8%AF%95&tag=%E9%A3%8E%E6%99%AF&loc=local');
  });
  it('实体资料页转换为同一实体的作品范围', () => {
    for (const [section, kind] of [['performers','performer'],['studios','studio'],['creators','creator'],['series','series']]) {
      const target = new URL(wallAddress(`/${section}/Alice?jav=1`), location.origin);
      expect(target.searchParams.get(kind!)).toBe('Alice');
      expect(target.searchParams.get('jav')).toBe('1');
    }
  });
  it('保留状态路径和当前作品筛选', () => {
    const target = new URL(wallAddress('/unseen', { loc:'local', tag:'风景', jav:'1' }), location.origin);
    expect(target.searchParams.get('state')).toBe('fresh');
    expect(target.searchParams.get('tag')).toBe('风景');
    expect(target.searchParams.get('jav')).toBe('1');
  });
});
