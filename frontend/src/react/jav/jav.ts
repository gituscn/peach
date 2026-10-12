import { apiGet } from '../../api';
import { queryClient } from '../query';
import { fetchWants, WANTS_KEY } from '../wants/wants';
import type { FaceRef, CoverItem } from '@peach/card-art';
import { coverImage, javArtwork } from '@peach/card-art';
import { esc } from '@peach/legacy/core';

export { JAV_TABS, javTab, javPath, javLibraryPath } from './jav-navigation';
export interface Discovery extends CoverItem {
  id: number; code: string; title: string; performers: string; release_date: string;
  studio: string; link: string; cover_url: string; has_cover: boolean; wanted: boolean;
  performer_refs?: (FaceRef & { id: number; name: string })[];
  asset_id?: number | null; tags?: string[]; reasons?: string[]; score?: number;
}
export type DiscoveryScope = 'external' | 'library';
export interface DiscoveryResult { items: Discovery[]; candidate_total: number; limited: boolean }
export const discoveryKey = (scope: DiscoveryScope) => ['jav-discoveries', scope] as const;
export const fetchDiscoveries = (scope: DiscoveryScope, signal: AbortSignal) =>
  apiGet<DiscoveryResult>(`/api/jav/discoveries?scope=${scope}&limit=100`, signal);

export function discoveryArtwork(item: Discovery, layout: 'big' | 'small', javImage: unknown): string {
  const local = javArtwork({ ...item, is_jav: true }, layout, false, javImage);
  if (local.html || !item.cover_url) return local.html;
  return coverImage(item, layout).replace(/ src="[^"]*"/,
    ` src="${esc(item.cover_url)}" referrerpolicy="no-referrer" data-jav-image="${item.id}" data-jav-cover="${esc(item.cover_url)}" data-jav-thumb="" data-jav-image-layout="${layout}"${layout === 'big' ? ' data-panel-prior="1"' : ''}`);
}

export async function prefetchJav(tab: string, signal: AbortSignal) {
  if (tab === 'wants') {
    await queryClient.fetchQuery({ queryKey: WANTS_KEY, queryFn: () => fetchWants(signal) }); return;
  }
  if (tab === 'discover') {
    await queryClient.fetchQuery({ queryKey: discoveryKey('external'), queryFn: () => fetchDiscoveries('external', signal) }); return;
  }
}
