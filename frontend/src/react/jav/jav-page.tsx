import { useEffect, useRef, useState, useSyncExternalStore, type CSSProperties, type FormEvent } from 'react';
import { useQuery } from '@tanstack/react-query';
import { RiCompassLine, RiExternalLinkLine } from '@remixicon/react';
import { Button, ButtonLink } from '@/components/base/buttons/button';
import { Input } from '@/components/base/input/input';
import { appSettingsStore, javLayout, storeJavLayout, JAV_LAYOUTS, cardRatio, gridLayout } from '@peach/appearance';
import { coverUrl } from '@peach/card-art';
import { wireHorizontalScroller } from '../../ui-kit/scroll';
import { feedIdentity } from '../../card-art/feed-identity';
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
    const row = section.current?.querySelector('[data-filter-row="top"]');
    if (!row) return;
    const scroller = wireHorizontalScroller(row, { drag: true });
    return () => scroller.destroy();
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
    (!query || [item.code, item.title, item.performers, item.studio, ...(item.tags || []), ...(item.performer_refs || []).map(ref => ref.name)].join(' ').toLocaleLowerCase().includes(query.toLocaleLowerCase())))
    .sort((a, b) => (sort === 'release' ? (a.release_date || '').localeCompare(b.release_date || '') : (a.score || 0) - (b.score || 0)) * (ascending ? 1 : -1));
  const waiting = discoveries.isPending;
  return <section ref={section} aria-label="为你推荐" aria-busy={waiting} className="flex min-w-0 flex-col gap-4">
    <FilterGlassRows label="发现筛选与排序" topLabel="发现范围与标签" attrs={{ 'data-filter-frame': '', 'data-jav-filter': '' }}
      busy={waiting} bottomClassName="flex-wrap" top={<>
        {([['external', '库外发现'], ['library', '馆藏探索']] as const).map(([key, label]) =>
          <FilterPill key={key} data-entity-tag={key} data-entity-press="" pressed={scope === key} onPress={() => { setScope(key); setTag('') }}>{label}</FilterPill>)}
        {tags.map(name => <FilterPill key={name} data-entity-tag={name} data-entity-press="" pressed={tag === name} onPress={() => setTag(tag === name ? '' : name)}>
          {name}<span data-count-badge="">{all.filter(item => item.tags?.includes(name)).length}</span>
        </FilterPill>)}
      </>} bottom={<>
        <span className="mr-auto whitespace-nowrap text-body-2-regular text-text-secondary">{waiting ? '正在读取' : `${items.length} 部`}</span>
        {query || tag ? <GlassPill onPress={() => { setTag(''); clearText() }}>清除筛选</GlassPill> : null}
        <Segments label="JAV 卡片版式" value={layout} options={JAV_LAYOUTS} onChange={storeJavLayout} />
        <span data-entity-sorts=""><SortKeys sorts={[{ key: 'taste', label: '口味', pressed: sort === 'taste', dir: ascending ? 'asc' : 'desc', ariaLabel: '按口味匹配排序' },
          { key: 'release', label: '发行', pressed: sort === 'release', dir: ascending ? 'asc' : 'desc', ariaLabel: '按发行日期排序' }]} onSort={key => {
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
      {items.map(item => <article key={item.id} data-media-card="" data-jav-card="" onClick={event => {
        if (!(event.target as HTMLElement).closest('a,button,input')) navigate(item.asset_id ? `/item/${item.asset_id}` : `/jav/movie/${encodeURIComponent(item.code)}`);
      }}>
        <a href={item.asset_id ? `/item/${item.asset_id}` : `/jav/movie/${encodeURIComponent(item.code)}`} aria-label={`查看 ${item.code} 详情`}
          onClick={event => { if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button === 0) { event.preventDefault(); navigate(event.currentTarget.getAttribute('href')!) } }}
          data-media-pic="" data-jav-cover="" className="relative inline-grid place-items-center overflow-hidden rounded-2lg bg-background-tertiary-default">
          <span className="text-text-secondary">无封面</span>
          <span className="contents" dangerouslySetInnerHTML={{ __html: discoveryArtwork(item, layout, settings.value.javImage) }} />
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
      </article>)}
    </div>
  </section>;
}
