import type { TasteData } from '../taste/taste';
import { fetchTaste, tasteKey } from '../taste/taste';
import { appSettingsStore } from '@peach/appearance';
import { apiGet } from '../../api';
import { queryClient } from '../query';
import { catalogKey, catalogParams, fetchCatalogPage, nextOffset } from '../catalog-grid/catalog-grid';
import { fetchWants, WANTS_KEY } from '../wants/wants';

export const JAV_TABS = [['library', '我的馆藏'], ['discover', '发现'], ['wants', '想要']] as const;
export const javTab = (value: string | null) => JAV_TABS.some(([key]) => key === value) ? value! : 'library';
export interface Discovery {
  id: number; code: string; title: string; performers: string; release_date: string;
  studio: string; link: string; cover_url: string; has_cover: boolean; wanted: boolean;
}

export async function prefetchJav(tab: string, signal: AbortSignal) {
  if (tab === 'wants') {
    await queryClient.fetchQuery({ queryKey: WANTS_KEY, queryFn: () => fetchWants(signal) }); return;
  }
  if (tab === 'discover') {
    await Promise.all([
      queryClient.fetchQuery({ queryKey: tasteKey('all'), queryFn: () => fetchTaste('all', signal) }),
      queryClient.fetchQuery({ queryKey: ['jav-discoveries'], queryFn: () => apiGet<{ items: Discovery[] }>('/api/feeds/discoveries?limit=100', signal) }),
    ]); return;
  }
  const settings = appSettingsStore().value;
  const batch = settings.batchSize || 60;
  const params = catalogParams({ jav: '1', q: '', sort: settings.defaultSort, dir: settings.defaultSortDirection || '' }, true);
  // 每批数量对应独立的分页缓存，页码和下一批偏移使用同一数量。
  await queryClient.fetchInfiniteQuery({ queryKey: catalogKey(params, batch), initialPageParam: 0,
    queryFn: ({ pageParam }) => fetchCatalogPage(params, pageParam, batch, false, signal), getNextPageParam: nextOffset(batch) });
}

/** 推荐只来自作品的真实出演者与口味榜单中的同名信号。 */
export function rankedDiscoveries(items: Discovery[], taste: TasteData) {
  const signals = [...(taste.rankings?.peach_performers || []), ...(taste.rankings?.browser_creators || [])];
  return items.map(item => {
    const names = (item.performers || '').split(/[,，、;/]/).map(name => name.trim()).filter(Boolean);
    const matches = signals.filter(signal => names.includes(signal.name));
    return { ...item, matches: [...new Set(matches.map(signal => signal.name))],
      score: matches.reduce((sum, signal) => sum + (signal.score || signal.visits || signal.web_visits || 1), 0) };
  }).filter(item => item.matches.length).sort((a, b) => b.score - a.score || (b.release_date || '').localeCompare(a.release_date || ''));
}
