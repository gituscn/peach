import type { TasteData } from '../taste/taste';
import { fetchTaste, tasteKey } from '../taste/taste';
import { apiGet } from '../../api';
import { queryClient } from '../query';
import { fetchWants, WANTS_KEY } from '../wants/wants';

export const JAV_TABS = [['library', '我的馆藏'], ['discover', '发现'], ['wants', '想要']] as const;
export const javTab = (value: string | null) => JAV_TABS.some(([key]) => key === value) ? value! : 'library';
export const javPath = (tab: string) => javTab(tab) === 'library' ? '/?jav=1' : `/jav?tab=${tab}`;
export function javLibraryPath(search: string) {
  const params = new URLSearchParams(search);
  params.delete('tab'); params.set('jav', '1');
  return '/?' + params;
}
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
