import { useState, useSyncExternalStore, type FormEvent } from 'react';
import { useQuery } from '@tanstack/react-query';
import { RiSearchLine, RiCompassLine } from '@remixicon/react';
import { Tab, TabList, TabPanel, Tabs } from 'react-aria-components';
import { Button, ButtonLink } from '@/components/base/buttons/button';
import { Input } from '@/components/base/input/input';
import { appSettingsStore } from '@peach/appearance';
import { coverUrl } from '@peach/card-art';
import { pageSkeletonHtml } from '../../management-placeholder';
import { emptyStateHtml } from '../../ui-kit';
import { apiGet, errorMessage } from '../../api';
import { CatalogGridPage } from '../catalog-grid/catalog-grid-page';
import type { MediaCardActions, MediaCardHelpers } from '../catalog-grid/types';
import { CloudDownloadDialog, type DownloadPrefill } from '../activity/cloud-download-dialog';
import { Page } from '../components/page';
import { Note } from '../components/note';
import { EmptyState } from '../components/empty-state';
import { fetchTaste, tasteKey } from '../taste/taste';
import { WantList } from '../wants/want-list';
import { addWant, invalidateWants } from '../wants/wants';
import { busyProps, useAction } from '../settings/use-action';
import { JAV_TABS, rankedDiscoveries, type Discovery } from './jav';

export function JavPage({ tab, readOnly, navigate, receipt, grid }: {
  tab: string; readOnly: boolean; navigate(path: string): void; receipt(message: string): void;
  grid: { helpers: MediaCardHelpers; actions: MediaCardActions };
}) {
  const [download, setDownload] = useState<DownloadPrefill | null>(null);
  const [text, setText] = useState('');
  const [query, setQuery] = useState('');
  const store = appSettingsStore();
  useSyncExternalStore(store.subscribe, store.version);
  const settings = store.value;
  const batch = settings.batchSize || 60;
  const search = (event: FormEvent) => { event.preventDefault(); setQuery(text.trim()) };
  return <Page>
    <div className="flex flex-wrap items-center justify-between gap-2">
      <h2 className="text-title-2-semibold text-text-primary">JAV</h2>
      <Button variant={tab === 'wants' ? 'secondary' : 'primary'} onClick={() => setDownload({})}>查找资源</Button>
    </div>
    <Tabs selectedKey={tab} onSelectionChange={key => navigate(`/jav?tab=${key}`)} className="flex flex-col gap-6">
      <TabList aria-label="JAV 分区" data-section-nav data-section-items className="flex max-w-full overflow-x-auto">
        {JAV_TABS.map(([key, label]) => <Tab key={key} id={key} className="cursor-pointer whitespace-nowrap">{label}</Tab>)}
      </TabList>
      <form aria-label="搜索作品" onSubmit={search}>
        <Input aria-label="搜索作品" placeholder="搜索番号、女优或标题" leadingIcon={RiSearchLine}
          value={text} onChange={setText} enterKeyHint="search" />
      </form>
      <TabPanel id="library" className="flex min-w-0 flex-col gap-4">
        <CatalogGridPage mode="catalog" filters={{ jav: '1', q: query, sort: settings.defaultSort, dir: settings.defaultSortDirection || '' }}
          helpers={grid.helpers} actions={grid.actions} layout={{ active: true, size: settings.javLayout === 'small' ? 'small' : 'big', portrait: false, javImage: settings.javImage }}
          selectMode={false} selected={new Set()} seekSeconds={settings.seekSeconds} revision={batch}
          batchSize={batch} groupCollapse={settings.groupCollapse}
          skeletonHtml={() => pageSkeletonHtml('正在读取馆藏', { cards: true, count: 6 })} wireDrag={() => {}}
          excludeVertical emptyHtml={() => emptyStateHtml('search', '没有符合条件的作品', '试试其他番号、女优或标题。')} />
      </TabPanel>
      <TabPanel id="discover" className="flex min-w-0 flex-col gap-4">
        <Discover readOnly={readOnly} receipt={receipt} resource={setDownload} query={query} />
      </TabPanel>
      <TabPanel id="wants"><WantList readOnly={readOnly} toast={receipt} query={query} /></TabPanel>
    </Tabs>
    <CloudDownloadDialog prefill={download} close={() => setDownload(null)} receipt={receipt} />
  </Page>;
}

function Discover({ readOnly, receipt, resource, query }: { readOnly: boolean; receipt(message: string): void; resource(work: DownloadPrefill): void; query: string }) {
  const taste = useQuery({ queryKey: tasteKey('all'), queryFn: ({ signal }) => fetchTaste('all', signal) });
  const discoveries = useQuery({ queryKey: ['jav-discoveries'], queryFn: ({ signal }) => apiGet<{ items: Discovery[] }>('/api/feeds/discoveries?limit=100', signal) });
  const action = useAction();
  const items = rankedDiscoveries(discoveries.data?.items || [], taste.data || {}).filter(item =>
    !query || [item.code, item.title, item.performers].join(' ').toLocaleLowerCase().includes(query.toLocaleLowerCase()));
  const waiting = taste.isPending || discoveries.isPending;
  return <section aria-label="为你推荐" aria-busy={waiting} className="flex min-w-0 flex-col gap-4">
    {waiting ? <div role="status" aria-label="正在读取推荐" dangerouslySetInnerHTML={{ __html: pageSkeletonHtml('正在读取推荐', { cards: true, count: 6 }) }} /> : null}
    {taste.error || discoveries.error ? <Note tone="error" title="推荐未取得">{errorMessage(taste.error || discoveries.error)}</Note> : null}
    {!waiting && !taste.error && !discoveries.error && !items.length ? <EmptyState shell="plain" icon={RiCompassLine} title="暂无匹配口味的新作"
      actions={<><ButtonLink href="/taste" variant="secondary">查看口味</ButtonLink><ButtonLink href="/follow-manage?tab=feeds" variant="secondary">管理订阅</ButtonLink></>}>
      先读取浏览记录，或关注女优的新作。
    </EmptyState> : null}
    {action.error ? <Note tone="error">{action.error}</Note> : null}
    <div className="inline-grid min-w-0 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map(item => <article key={item.id} className="flex min-w-0 flex-col gap-3">
        <div className="relative inline-grid aspect-card-cover place-items-center overflow-hidden rounded-2lg bg-background-tertiary-default">
          <span className="text-text-secondary">无封面</span>
          {item.has_cover || item.cover_url ? <img alt="" src={item.has_cover ? coverUrl(item, true) : item.cover_url}
            referrerPolicy="no-referrer" onError={event => event.currentTarget.remove()} className="absolute inset-0 size-full object-cover" /> : null}
        </div>
        <h3 className="break-words text-body-medium text-text-primary">{item.code} · {item.title || '标题未取得'}</h3>
        <p className="break-words text-body-2-regular text-text-secondary">{[item.performers, item.release_date].filter(Boolean).join(' · ')}</p>
        <p className="text-body-2-regular text-text-secondary">你常看的女优：{item.matches.join('、')}</p>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" onClick={() => resource({ ...item, cover: item.has_cover ? coverUrl(item, true) : item.cover_url, origin: `feed:${item.id}` })}>查找资源</Button>
          <Button variant="secondary" disabled={readOnly || item.wanted} {...busyProps(action.busy === String(item.id))} onClick={() => {
            void action.run(String(item.id), signal => addWant({ code: item.code }, signal), () => {
              receipt('已加入想要'); void invalidateWants(); void discoveries.refetch();
            });
          }}>{item.wanted ? '已加入想要' : '想要'}</Button>
          {item.link ? <ButtonLink variant="secondary" href={item.link} target="_blank" rel="noopener noreferrer">作品来源</ButtonLink> : null}
        </div>
      </article>)}
    </div>
  </section>;
}
