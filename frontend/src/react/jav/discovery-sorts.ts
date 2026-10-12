import { JAV_RELEASE_SORT } from '../../sort-preferences';

export const DISCOVERY_SORTS = [
  ['taste', '口味', '按口味匹配排序'],
  ['release_date', JAV_RELEASE_SORT[1], '按发行日期排序'],
  ['source_score', '来源评分', '按来源评分排序'],
  ['duration', '时长', '按时长排序'],
  ['code', '番号', '按番号排序'],
] as const;
export type DiscoverySort = typeof DISCOVERY_SORTS[number][0];
export type DiscoveryDirection = 'asc' | 'desc';

export function discoveryScore(value: number | null | undefined): string {
  return typeof value === 'number' && Number.isFinite(value) ? value.toFixed(3) : '—';
}
