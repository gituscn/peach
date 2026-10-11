import { useState, type FormEvent } from 'react';
import { useQuery } from '@tanstack/react-query';
import { RiCompassLine, RiExternalLinkLine } from '@remixicon/react';
import { Button, ButtonLink } from '@/components/base/buttons/button';
import { Input } from '@/components/base/input/input';
import { coverUrl, coverImage } from '@peach/card-art';
import { feedIdentity } from '../../card-art/feed-identity';
import { javContentSkeleton, JAV_RECOMMENDATION_GRID } from '../../jav-skeleton';
import { apiGet, errorMessage } from '../../api';
import { CloudDownloadDialog, type DownloadPrefill } from '../activity/cloud-download-dialog';
import { Note } from '../components/note';
import { EmptyState } from '../components/empty-state';
import { fetchTaste, tasteKey } from '../taste/taste';
import { WantList } from '../wants/want-list';
import { addWant, invalidateWants } from '../wants/wants';
import { busyProps, useAction } from '../settings/use-action';
import { rankedDiscoveries, type Discovery } from './jav';
import { JavHeader } from './jav-header';
import { spriteGlyph } from '../components/sprite-glyph';

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
      ? <Discover readOnly={readOnly} receipt={receipt} resource={setDownload} query={text.trim()} />
      : <WantList readOnly={readOnly} toast={receipt} query={text.trim()} />}
    <CloudDownloadDialog prefill={download} close={() => setDownload(null)} receipt={receipt} />
  </div>;
}

function Discover({ readOnly, receipt, resource, query }: { readOnly: boolean; receipt(message: string): void; resource(work: DownloadPrefill): void; query: string }) {
  const taste = useQuery({ queryKey: tasteKey('all'), queryFn: ({ signal }) => fetchTaste('all', signal) });
  const discoveries = useQuery({ queryKey: ['jav-discoveries'], queryFn: ({ signal }) => apiGet<{ items: Discovery[] }>('/api/feeds/discoveries?limit=100', signal) });
  const action = useAction();
  const items = rankedDiscoveries(discoveries.data?.items || [], taste.data || {}).filter(item =>
    !query || [item.code, item.title, item.performers, ...item.matches].join(' ').toLocaleLowerCase().includes(query.toLocaleLowerCase()));
  const waiting = taste.isPending || discoveries.isPending;
  return <section aria-label="为你推荐" aria-busy={waiting} className="flex min-w-0 flex-col gap-4">
    {waiting ? <div role="status" aria-label="正在读取推荐" dangerouslySetInnerHTML={{ __html: javContentSkeleton('discover') }} /> : null}
    {taste.error || discoveries.error ? <Note tone="error" title="推荐未取得">{errorMessage(taste.error || discoveries.error)}</Note> : null}
    {!waiting && !taste.error && !discoveries.error && !items.length ? <EmptyState shell="plain" icon={RiCompassLine} title={query ? '没有符合条件的推荐' : '暂无匹配口味的新作'}
      actions={<><ButtonLink href="/taste" variant="secondary">查看口味</ButtonLink><ButtonLink href="/follow-manage?tab=feeds" variant="secondary">管理订阅</ButtonLink></>}>
      {query ? '试试其他番号、女优或标题。' : taste.data?.summary?.history_visits || taste.data?.summary?.peach_items ? '可以查找番号，或查看订阅的新作。' : '读取浏览记录后，可按口味推荐新作。'}
    </EmptyState> : null}
    {action.error ? <Note tone="error">{action.error}</Note> : null}
    <div className={JAV_RECOMMENDATION_GRID}>
      {items.map(item => <article key={item.id} data-media-card="" data-jav-card="">
        <div data-media-pic="" data-jav-cover="" className="relative inline-grid aspect-card-cover place-items-center overflow-hidden rounded-2lg bg-background-tertiary-default">
          <span className="text-text-secondary">无封面</span>
          {item.has_cover ? <span className="contents" dangerouslySetInnerHTML={{ __html: coverImage(item, 'big') }} />
            : item.cover_url ? <img alt="" src={item.cover_url} loading="lazy" decoding="async"
              referrerPolicy="no-referrer" onError={event => event.currentTarget.remove()} className="absolute inset-0 size-full object-cover" /> : null}
        </div>
        <h3 data-jav-title="" title={`${item.code} · ${item.title || '标题未取得'}`}>{item.code} · {item.title || '标题未取得'}</h3>
        <div data-jav-identity="">
          <div data-jav-faces="" dangerouslySetInnerHTML={{ __html: feedIdentity(item) }} />
          <p className="min-w-0 truncate text-body-2-regular text-text-secondary" title={item.performers}>{[item.performers, item.release_date].filter(Boolean).join(' · ')}</p>
        </div>
        <p className="truncate text-body-2-regular text-text-secondary" title={`你常看的女优：${item.matches.join('、')}`}>你常看的女优：{item.matches.join('、')}</p>
        <div data-jav-actions="" className="flex flex-wrap gap-2">
          <Button variant="secondary" onClick={() => resource({ ...item, cover: item.has_cover ? coverUrl(item, true) : item.cover_url, origin: `feed:${item.id}` })}>查找资源</Button>
          <Button variant="ghost" disabled={readOnly || item.wanted} {...busyProps(action.busy === String(item.id))} onClick={() => {
            void action.run(String(item.id), signal => addWant({ code: item.code }, signal), () => {
              receipt('已加入想要'); void invalidateWants(); void discoveries.refetch();
            });
          }}>{item.wanted ? '已加入想要' : '想要'}</Button>
          {item.link ? <ButtonLink data-button-link="" variant="secondary" trailingIcon={RiExternalLinkLine} href={item.link} target="_blank" rel="noopener noreferrer">作品来源</ButtonLink> : null}
        </div>
      </article>)}
    </div>
  </section>;
}
