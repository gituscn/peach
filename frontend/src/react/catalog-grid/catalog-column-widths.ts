import { useState } from 'react';
import type { ResizableTableContainerProps } from 'react-aria-components';
import type { ColumnVisibilityState, OnChangeFn } from '@tanstack/react-table';

const KEY = 'peach.catalog-column-widths.v1';
export const columnSizes: Record<string, { width: number; min: number; max: number }> = {
  select: { width: 48, min: 48, max: 48 },
  name: { width: 400, min: 260, max: 800 },
  dur: { width: 96, min: 80, max: 240 },
  size: { width: 112, min: 96, max: 240 },
  resolution: { width: 144, min: 128, max: 320 },
  rating: { width: 144, min: 120, max: 240 },
  o: { width: 112, min: 96, max: 240 },
  plays: { width: 112, min: 96, max: 240 },
  new: { width: 184, min: 144, max: 320 },
  played: { width: 184, min: 144, max: 320 },
  release: { width: 144, min: 128, max: 320 },
  code: { width: 144, min: 112, max: 400 },
};

function boundedWidths(value: Record<string, unknown>): Record<string, number> {
  return Object.fromEntries(Object.entries(columnSizes).map(([id, size]) => {
    const width = value[id];
    return [id, typeof width === 'number' && Number.isFinite(width)
      ? Math.max(size.min, Math.min(size.max, width)) : size.width];
  }));
}

/** 列宽只保存到当前浏览器；无效偏好使用各列默认值。 */
export function useCatalogColumnWidths() {
  const [widths, setWidths] = useState(() => {
    try {
      const saved: unknown = JSON.parse(localStorage.getItem(KEY) || '{}');
      return boundedWidths(saved && typeof saved === 'object' && !Array.isArray(saved) ? saved as Record<string, unknown> : {});
    } catch { return boundedWidths({}) }
  });
  const resize: NonNullable<ResizableTableContainerProps['onResize']> = values => {
    setWidths(current => boundedWidths({ ...current, ...Object.fromEntries(values) }));
  };
  const save: NonNullable<ResizableTableContainerProps['onResizeEnd']> = values => {
    const next = boundedWidths({ ...widths, ...Object.fromEntries(values) });
    setWidths(next);
    try { localStorage.setItem(KEY, JSON.stringify(next)) } catch { /* 当前页面保留列宽。 */ }
  };
  const reset = () => {
    setWidths(boundedWidths({}));
    try { localStorage.removeItem(KEY) } catch { /* 当前页面使用默认列宽。 */ }
  };
  return { widths, resize, save, reset };
}

const VISIBLE_KEY = 'peach.catalog-column-visibility.v1';
export const defaultColumnVisibility: ColumnVisibilityState = { code: false, o: false, new: false, played: false, release: false };
function validVisibility(value: unknown): ColumnVisibilityState {
  const saved = value && typeof value === 'object' && !Array.isArray(value) ? value as Record<string, unknown> : {};
  return { ...defaultColumnVisibility, ...Object.fromEntries(Object.keys(columnSizes)
    .filter(id => id !== 'select' && id !== 'name' && typeof saved[id] === 'boolean').map(id => [id, saved[id] === true])) };
}

/** 名称与选择框始终保留，其余列独立控制显示。 */
export function useCatalogColumnVisibility() {
  const [visibility, setVisibility] = useState(() => {
    try { return validVisibility(JSON.parse(localStorage.getItem(VISIBLE_KEY) || '{}')) }
    catch { return validVisibility({}) }
  });
  const change: OnChangeFn<ColumnVisibilityState> = updater => {
    const next = validVisibility(typeof updater === 'function' ? updater(visibility) : updater);
    setVisibility(next);
    try { localStorage.setItem(VISIBLE_KEY, JSON.stringify(next)) } catch { /* 当前页面保留显示选择。 */ }
  };
  return { visibility, change };
}
