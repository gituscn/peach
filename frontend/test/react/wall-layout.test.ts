import { describe, expect, it } from 'vitest';
import { clampWall, expandedWallTiles, finiteWallFilters, nearestWallTile, visibleWallTiles, wallExtent, wallHasCover, wallShape, wallTileAt } from '../../src/react/video-wall/wall-layout';

const view = { width: 1280, height: 720 };
const camera = { x: 16, y: 16, scale: 1 };
describe('二维播放墙', () => {
  it('只有有封面引用的视频进入墙，缩略图不能替代资格', () => {
    expect(wallHasCover({ id:1, is_jav:true, code:'PCH-001', has_cover:true })).toBe(true);
    expect(wallHasCover({ id:2, cover_key:'custom', has_cover:true })).toBe(true);
    expect(wallHasCover({ id:3, has_cover:false, has_thumb:true })).toBe(false);
    expect(wallHasCover({ id:4, has_cover:true })).toBe(false);
    expect(wallHasCover({ id:5, has_cover:true, code:'PCH-005', medium:'photo' })).toBe(false);
  });
  it('展开所在块完整让位，选中磁贴变成方形 6×6，收起位置可重建', () => {
    for (const position of ['0:0:0','1:0:2','2:1:11','-1:-2:5']) {
      const active = wallTileAt(60, false, position)!;
      const expanded = expandedWallTiles(60, false, active);
      const focus = expanded.get(position)!;
      expect(expanded.size).toBe(12);
      expect(focus.width).toBeCloseTo(614.08);
      expect(focus.height).toBe(focus.width);
      const rects = [...expanded.values()];
      for (let a = 0; a < rects.length; a += 1) for (let b = a + 1; b < rects.length; b += 1) {
        const one = rects[a]!, two = rects[b]!;
        expect(one.x < two.x + two.width && one.x + one.width > two.x && one.y < two.y + two.height && one.y + one.height > two.y).toBe(false);
      }
      expect(wallTileAt(60, false, position)).toEqual(active);
    }
  });
  it('空集合不产生磁贴', () => {
    expect(visibleWallTiles(0, false, camera, view)).toEqual([]);
  });
  it('队列选择落到镜头附近的同一作品实例，有限墙保留唯一位置', () => {
    expect(nearestWallTile(0, false, 0, { x:0,y:0 })).toBeNull();
    for (const point of [{ x:-2500,y:1800 },{ x:2100,y:-3400 }]) {
      const tile = nearestWallTile(25, false, 17, point)!;
      expect(tile.index).toBe(17);
      const candidates = visibleWallTiles(25, false, { x:-point.x + 1500,y:-point.y + 1500,scale:1 }, { width:3000,height:3000 }).filter(row => row.index === 17);
      const distance = (row: typeof tile) => (row.x + row.width / 2 - point.x) ** 2 + (row.y + row.height / 2 - point.y) ** 2;
      expect(candidates.every(row => distance(row) >= distance(tile))).toBe(true);
      expect(nearestWallTile(25, true, 17, point)).toEqual(nearestWallTile(25, true, 17, { x:0,y:0 }));
    }
  });
  it('探索墙在正负两个方向都循环，实例键唯一', () => {
    for (const position of [-100_000, -3000, 16, 3000, 100_000]) {
      const tiles = visibleWallTiles(25, false, { ...camera, x: position, y: -position }, view);
      expect(tiles.length).toBeGreaterThan(0);
      expect(new Set(tiles.map(tile => tile.key)).size).toBe(tiles.length);
      expect(tiles.every(tile => tile.index >= 0 && tile.index < 25)).toBe(true);
    }
  });
  it('有限墙里每个条目只有一个位置，续页不移动已有条目', () => {
    const huge = { width: 3000, height: 3000 };
    const first = visibleWallTiles(17, true, camera, huge);
    const next = visibleWallTiles(53, true, camera, huge);
    expect(first.length).toBe(17);
    expect(new Set(next.map(tile => tile.index)).size).toBe(next.length);
    for (const tile of first) expect(next.find(other => other.index === tile.index)).toEqual(tile);
  });
  it('只有视口附近的磁贴进入渲染，数量不随馆藏增长', () => {
    expect(visibleWallTiles(80_000, true, camera, view).length).toBeLessThan(100);
    expect(visibleWallTiles(80_000, false, camera, view).length).toBeLessThan(100);
  });
  it('有限墙阻止拖向空白，内容小于屏幕时锁定起点', () => {
    expect(clampWall({ ...camera, x: 4000, y: 4000 }, view, wallExtent(12), true)).toEqual(camera);
    const clamped = clampWall({ ...camera, x: -1e8, y: -1e8 }, view, wallExtent(49), true);
    expect(clamped.x).toBe(view.width - wallExtent(49).width - 16);
    expect(clamped.y).toBe(view.height - wallExtent(49).height - 16);
    expect(clampWall({ ...camera, x: -1e8 }, view, wallExtent(49), false).x).toBe(-1e8);
  });
  it('循环单元经过整数圈平移后仍显示相同内容', () => {
    const shape = wallShape(60, false);
    const a = visibleWallTiles(60, false, camera, view);
    const b = visibleWallTiles(60, false, { ...camera, x: camera.x - shape.width, y: camera.y + shape.height }, view);
    expect(b.map(tile => tile.index)).toEqual(a.map(tile => tile.index));
  });
  it('检索、实体条件、状态和时长使用有限墙，默认来源与 JAV 语境仍可探索', () => {
    for (const key of ['q','performer','series','creator','studio','owner','tag','state','orient','len','dur_min','dur_max','region']) {
      expect(finiteWallFilters({ [key]: 'value' })).toBe(true);
    }
    expect(finiteWallFilters({ jav: '1', loc: 'local', sort: 'seed' })).toBe(false);
  });
});
