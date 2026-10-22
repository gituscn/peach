import type { ColumnVisibilityState } from '@tanstack/react-table';
import { useTablePreferences } from '../components/table-column-preferences';

const KEY = 'peach.catalog-column-widths.v1';
export const columnSizes: Record<string, { width: number; min: number; max: number }> = {
  select: { width: 48, min: 48, max: 48 },
  name: { width: 400, min: 320, max: 2000 },
  dur: { width: 96, min: 80, max: 240 },
  size: { width: 112, min: 96, max: 240 },
  resolution: { width: 144, min: 128, max: 320 },
  rating: { width: 176, min: 168, max: 320 },
  o: { width: 112, min: 96, max: 240 },
  plays: { width: 112, min: 96, max: 240 },
  new: { width: 184, min: 144, max: 320 },
  played: { width: 184, min: 144, max: 320 },
  release: { width: 144, min: 128, max: 320 },
  code: { width: 144, min: 112, max: 400 },
  tags: { width: 200, min: 144, max: 560 },
};

const VISIBLE_KEY = 'peach.catalog-column-visibility.v1';
export const defaultColumnVisibility: ColumnVisibilityState = { tags: false, code: false, o: false, new: false, played: false, release: false };
const labels: Record<string, string> = { select: '选择', name: '名称', dur: '时长', size: '体积', resolution: '分辨率',
  rating: '评分', o: '高潮计数', plays: '观看次数', new: '入库时间', played: '观看时间', release: '发行时间', code: '番号', tags: '标签' };
const columns = ['select', 'name', 'tags', 'code', 'dur', 'resolution', 'size', 'rating', 'plays', 'o', 'played', 'new', 'release']
  .map(id => ({ id, label: labels[id]!, ...columnSizes[id]!, flex: id === 'name', required: id === 'select' || id === 'name', visible: defaultColumnVisibility[id] !== false }));
export function useCatalogTablePreferences() {
  return useTablePreferences('catalog', columns, { widths: KEY, visibility: VISIBLE_KEY });
}
