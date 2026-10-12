import { useEffect, useRef, useState, useSyncExternalStore, type CSSProperties, type FormEvent } from 'react';
import { useQuery } from '@tanstack/react-query';
import { RiCompassLine, RiExternalLinkLine } from '@remixicon/react';
import { Button, ButtonLink } from '@/components/base/buttons/button';
import { Input } from '@/components/base/input/input';
import { appSettingsStore, javLayout, storeJavLayout, JAV_LAYOUTS, cardRatio, gridLayout } from '@peach/appearance';
import { coverUrl } from '@peach/card-art';
import { relayoutCovers } from '../../card-art/framing';
import { wireHorizontalScroller } from '../../ui-kit/scroll';
import { feedIdentity } from '../../card-art/feed-identity';
import { JAV_RELEASE_SORT } from '../../sort-preferences';
import { javContentSkeleton, JAV_RECOMMENDATION_GRID } from '../../jav-skeleton';
import { errorMessage } from '../../api';
import { CloudDownloadDialog, type DownloadPrefill } from '../activity/cloud-download-dialog';
import { Note } from '../components/note';
import { EmptyState } from '../components/empty-state';
import { WantList } from '../wants/want-list';
import { addWant, invalidateWants } from '../wants/wants';
import { busyProps, useAction } from '../settings/use-action';
import { discoveryArtwork, discoveryKey, fetchDiscoveries, type DiscoveryScope } from './jav';
import { JavHeader } from './jav-header';
import { spriteGlyph } from '../components/sprite-glyph';
import { FilterGlassRows, FilterPill, GlassPill } from '../components/filter-glass';
import { ArtSlot } from '../components/art-slot';
import { Segments, SortKeys } from '../entity-filter/entity-filter-page';

const SearchGlyph = spriteGlyph('search');

export function JavPage({ tab, readOnly, navigate, receipt }: {
  tab: string; readOnly: boolean; navigate(path: string): void; receipt(message: string): void;
}) {
  const [download, setDownload] = useState<DownloadPrefill | null>(null);
  const [text, setText] = useState('');
  const search = (event: FormEvent) => { event.preventDefault() };
  return <div className="flex w-full flex-col gap-6">
    <JavHeader tab={tab} navigate={navigate} find={() => setDownload({})} />
    <form aria-label={tab === 'discover' ? '筛选推荐' : '筛选想要'} onSubmit={search}>
      <Input type="search" aria-label={tab === 'discover' ? '筛选推荐' : '筛选想要'} placeholder="筛选番号、女优或标题" leadingIcon={SearchGlyph}
        value={text} onChange={setText} enterKeyHint="search" />
    </form>
    {tab === 'discover'
      ? <Discover readOnly={readOnly} receipt={receipt} resource={setDownload} query={text.trim()} navigate={navigate} clearText={() => setText('')} />
      : <WantList readOnly={readOnly} toast={receipt} query={text.trim()} />}
    <CloudDownloadDialog prefill={download} close={() => setDownload(null)} receipt={receipt} />
  </div>;
}

function Discover({ readOnly, receipt, resource, query, navigate, clearText }: {
  readOnly: boolean; receipt(message: string): void; resource(work: DownloadPrefill): void; query: string;
  navigate(path: string): void; clearText(): void;
}) {
  const [scope, setScope] = useState<DiscoveryScope>('external');
  const [tag, setTag] = useState('');
  const [sort, setSort] = useState('taste');
  const [ascending, setAscending] = useState(false);
  const section = useRef<HTMLElement>(null);
  useEffect(() => {
    const rows = section.current?.querySelectorAll('[data-catalog-scroll],[data-catalog-tags],[data-filter-row="bottom"]');
    const scrollers = [...(rows || [])].map(row => wireHorizontalScroller(row, { drag: true }));
    return () => scrollers.forEach(scroller => scroller.destroy());
  }, []);
  const settings = appSettingsStore();
  useSyncExternalStore(settings.subscribe, settings.version, settings.version);
  const layout = javLayout();
  const ratio = cardRatio(gridLayout({ active: true, home: false, portrait: false }));
  const discoveries = useQuery({ queryKey: discoveryKey(scope), queryFn: ({ signal }) => fetchDiscoveries(scope, signal) });
  const action = useAction();
  const all = discoveries.data?.items || [];
  const tags = [...new Set(all.flatMap(item => item.tags || []))];
  const items = all.filter(item => (!tag || item.tags?.includes(tag)) &&
    (!query || [item.code, item.title, item.performers, item.studio, ...(item.tags || []), ...(item.performer_refs || []).map(ref => ref.name)].join(' ').toLocaleLowerCase().includes(query.toLocaleLowerCase())));
  if (sort === 'release') items.sort((a, b) => (a.release_date || '').localeCompare(b.release_date || '') * (ascending ? 1 : -1));
  else if (ascending) items.reverse();
  const waiting = discoveries.isPending;
  return <section ref={section} aria-label="为你推荐" aria-busy={waiting} className="flex min-w-0 flex-col gap-4">
    <FilterGlassRows label="发现筛选与排序" topLabel="发现范围与标签" attrs={{ 'data-filter-frame': '', 'data-jav-filter': '', 'data-catalog-frame': '' }}
      busy={waiting} topClassName="gap-1.5 overflow-visible" bottomClassName="min-h-12" top={<div data-catalog-scroll="">
      <div data-catalog-views="">
        {([['external', '库外发现'], ['library', '馆藏探索']] as const).map(([key, label]) =>
          <FilterPill key={key} data-entity-tag={key} data-entity-press="" pressed={scope === key} onPress={() => { setScope(key); setTag('') }}>{label}</FilterPill>)}
        <span data-entity-sep="" aria-hidden="true" />
      </div><div data-catalog-tags="">
        {tags.map(name => <FilterPill key={name} data-catalog-tag={name} data-entity-press="" pressed={tag === name} onPress={() => setTag(tag === name ? '' : name)}>
          {name}<span data-count-badge="">{all.filter(item => item.tags?.includes(name)).length}</span>
        </FilterPill>)}
      </div></div>} bottom={<>
        <span data-catalog-readout="">{waiting ? <span data-skeleton="count" aria-hidden className="relative inline-block h-3.5 w-37.5 rounded-md align-middle skeleton-sheen" /> : `${items.length} 部`}</span>
        {query || tag ? <GlassPill onPress={() => { setTag(''); clearText() }}>清除筛选</GlassPill> : null}
        <span data-entity-sorts="">
        <Segments label="JAV 卡片版式" value={layout} options={JAV_LAYOUTS} onChange={storeJavLayout} />
        <SortKeys sorts={[{ key: 'taste', label: '口味', pressed: sort === 'taste', dir: ascending ? 'asc' : 'desc', ariaLabel: '按口味匹配排序' },
          { key: 'release', label: JAV_RELEASE_SORT[1], pressed: sort === 'release', dir: ascending ? 'asc' : 'desc', ariaLabel: '按发行日期排序' }]} onSort={key => {
          if (key === sort) setAscending(!ascending); else { setSort(key); setAscending(false) }
        }} /></span>
      </>} />
    {waiting ? <div role="status" aria-label="正在读取推荐" dangerouslySetInnerHTML={{ __html: javContentSkeleton('discover', layout) }} /> : null}
    {discoveries.error ? <Note tone="error" title="推荐未取得">{errorMessage(discoveries.error)}</Note> : null}
    {!waiting && !discoveries.error && !items.length ? <EmptyState shell="plain" icon={RiCompassLine} title={query || tag ? '没有符合条件的推荐' : '暂无匹配口味的作品'}
      actions={<ButtonLink href="/taste" variant="secondary">查看口味</ButtonLink>}>
      {query || tag ? '清除筛选后查看其他作品。' : scope === 'library' ? '观看或标记作品后，可以探索少看的馆藏。' : '可以查找番号，或更新关注来源。'}
    </EmptyState> : null}
    {action.error ? <Note tone="error">{action.error}</Note> : null}
    <div data-media-grid="" className={JAV_RECOMMENDATION_GRID} style={{ '--jav-cover-ratio': ratio } as CSSProperties}>
      {items.map(item => {
        const artwork = discoveryArtwork(item, layout, settings.value.javImage);
        return <article key={item.id} data-media-card="" data-jav-card="" onClick={event => {
        if (!(event.target as HTMLElement).closest('a,button,input')) navigate(item.asset_id ? `/item/${item.asset_id}` : `/jav/movie/${encodeURIComponent(item.code)}`);
      }}>
        <a href={item.asset_id ? `/item/${item.asset_id}` : `/jav/movie/${encodeURIComponent(item.code)}`} aria-label={`查看 ${item.code} 详情`}
          onClick={event => { if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button === 0) { event.preventDefault(); navigate(event.currentTarget.getAttribute('href')!) } }}
          data-media-pic="" data-jav-cover-box="" className="relative inline-grid place-items-center overflow-hidden rounded-2lg bg-background-tertiary-default">
          {artwork ? <ArtSlot artwork={{ kind: 'cover', html: artwork }} identity={discoveryArtwork(item, 'small', settings.value.javImage)}
            relayout={root => relayoutCovers(root, layout)} /> : <span data-media-nopic="">无封面</span>}
        </a>
        <h3 data-jav-title="" title={`${item.code} · ${item.title || '标题未取得'}`}>{item.code} · {item.title || '标题未取得'}</h3>
        <div data-jav-identity="">
          <div data-jav-faces="" dangerouslySetInnerHTML={{ __html: feedIdentity(item) }} />
          <p className="min-w-0 truncate text-body-2-regular text-text-secondary" title={item.performers}>{[item.performers, item.release_date].filter(Boolean).join(' · ')}</p>
        </div>
        <div data-jav-tags="" data-media-tags="">{(item.tags || []).slice(0, 4).map(name =>
          <button type="button" data-media-tag="" key={name} aria-pressed={tag === name} onClick={() => setTag(tag === name ? '' : name)}>{name}</button>)}</div>
        <p className="truncate text-body-2-regular text-text-secondary" title={item.reasons?.join(' · ')}>{item.reasons?.join(' · ')}</p>
        <div data-jav-actions="" className="flex flex-wrap gap-2">
          <Button variant="secondary" onClick={() => resource({ ...item, cover: item.has_cover ? coverUrl(item, true) : item.cover_url, origin: `${item.asset_id ? 'asset' : 'feed'}:${item.id}` })}>查找资源</Button>
          <Button variant="ghost" disabled={readOnly || item.wanted || !!item.asset_id} {...busyProps(action.busy === String(item.id))} onClick={() => {
            void action.run(String(item.id), signal => addWant({ code: item.code }, signal), () => {
              receipt('已加入想要'); void invalidateWants(); void discoveries.refetch();
            });
          }}>{item.asset_id ? '已入库' : item.wanted ? '已加入想要' : '想要'}</Button>
          {item.link ? <ButtonLink data-button-link="" variant="secondary" trailingIcon={RiExternalLinkLine} href={item.link} target="_blank" rel="noopener noreferrer">作品来源</ButtonLink> : null}
        </div>
      </article>})}
    </div>
  </section>;
}
