import { peachHistory } from '@peach/history';
import { isCatalogPath, ROUTE_STATES } from '@peach/legacy/core';

export function wallAddress(from = `${location.pathname}${location.search}`, filters: Readonly<Record<string, string>> = {}): string {
  const source = new URL(from, location.origin);
  const [section, ...parts] = source.pathname.split('/').filter(Boolean);
  const kind = ({ performers: 'performer', creators: 'creator', studios: 'studio', series: 'series' } as Record<string, string>)[section || ''];
  const scoped = (isCatalogPath(source.pathname) && source.pathname !== '/junk-files') || source.pathname === '/jav' || !!(kind && parts.length);
  const params = new URLSearchParams(scoped ? source.search : '');
  for (const [key, value] of Object.entries(filters)) if (value && (scoped || ['jav','loc'].includes(key))) params.set(key, value);
  if (scoped && ROUTE_STATES[source.pathname]) params.set('state', ROUTE_STATES[source.pathname]!);
  if (kind && parts.length) params.set(kind, decodeURIComponent(parts.join('/')));
  params.set('returnTo', `${source.pathname}${source.search}`);
  return `/wall?${params}`;
}

export function exitWall(): void {
  const target = new URLSearchParams(peachHistory.navigation.location.search).get('returnTo') || '/';
  peachHistory.replace(target.startsWith('/') && !target.startsWith('//') && !target.startsWith('/wall') ? target : '/');
}
