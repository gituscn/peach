import type { TasteData } from '../taste/taste';
import { fetchTaste, tasteKey } from '../taste/taste';
import { apiGet } from '../../api';
import { queryClient } from '../query';
import { fetchWants, WANTS_KEY } from '../wants/wants';

export { JAV_TABS, javTab, javPath, javLibraryPath } from './jav-navigation';
export interface Discovery {
  id: number; code: string; title: string; performers: string; release_date: string;
  studio: string; link: string; cover_url: string; has_cover: boolean; wanted: boolean;
  performer_refs?: { id: number; name: string }[];
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

/** 推荐按账本中的出演者身份匹配口味信号；没有身份引用时使用同名信号。 */
export function rankedDiscoveries(items: Discovery[], taste: TasteData) {
  const signals = [...(taste.rankings?.peach_performers || []), ...(taste.rankings?.browser_creators || [])];
  return items.map(item => {
    const names = (item.performers || '').split(/[,，、;/]/).map(name => name.trim()).filter(Boolean);
    const matches = signals.filter(signal => (item.performer_refs || []).some(ref =>
      (signal.entity_id != null && ref.id === signal.entity_id) || ref.name === signal.name) || names.includes(signal.name));
    return { ...item, matches: [...new Set(matches.map(signal => signal.name))],
      score: matches.reduce((sum, signal) => sum + (signal.score || signal.visits || signal.web_visits || 1), 0) };
  }).filter(item => item.matches.length).sort((a, b) => b.score - a.score || (b.release_date || '').localeCompare(a.release_date || ''));
}
