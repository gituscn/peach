import { useEffect, useState } from 'react';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { RiExternalLinkLine } from '@remixicon/react';
import { entityPath, icon } from '@peach/legacy/core';
import { coverUrl } from '@peach/card-art';
import { feedIdentity } from '../../card-art/feed-identity';
import { apiGet, errorMessage } from '../../api';
import { Button, ButtonLink } from '@/components/base/buttons/button';
import { CloudDownloadDialog, type DownloadPrefill } from '../activity/cloud-download-dialog';
import { Note } from '../components/note';
import { RetryNote } from '../components/grid-reveal';
import { busyProps, useAction } from '../settings/use-action';
import { addWant, invalidateWants, removeWants } from '../wants/wants';
import { WantMagnets } from '../wants/want-magnets';
import type { DownloadsSnapshot } from '../bundle';
import { DOWNLOADS_KEY, DOWNLOADS_URL } from '../activity/downloads-panel';
import { queryClient } from '../query';
import { fetchJavDetail, fetchJavReviews, javDetailKey, nextReviewPage, type JavDetail, type JavDetailProps, type JavEntityRef } from './jav-detail';

export function JavDetailPage(props: JavDetailProps) {
  const result = useQuery({ queryKey: javDetailKey(props.code), queryFn: ({ signal }) => fetchJavDetail(props.code, signal) });
  return <div data-jav-detail="" data-stage-grid="">
    {result.data ? <Work key={props.code} {...props} item={result.data} retry={() => { void result.refetch() }} retrying={result.isFetching} /> : <div data-jav-failure="">
      <Close close={props.actions.close} />
      {result.error ? <RetryNote message={errorMessage(result.error)} onRetry={() => { void result.refetch() }} /> : null}
    </div>}
  </div>;
}

const Close = ({ close }: { close(): void }) => <button type="button" data-stage-close="" id="closeStage"
  aria-label="关闭" title="关闭" onClick={close} dangerouslySetInnerHTML={{ __html: icon('x') }} />;

function Work({ code, item, actions, readOnly, retry, retrying }: JavDetailProps & { item: JavDetail; retry(): void; retrying: boolean }) {
  useEffect(() => { if (item.state === 'ready') void queryClient.invalidateQueries({ queryKey: ['jav-discoveries', 'external'] }) }, [item.code, item.state]);
  const [preview, setPreview] = useState<number | null>(null);
  const [download, setDownload] = useState<DownloadPrefill | null>(null);
  const [wantId, setWantId] = useState(item.want_id);
  const want = useAction();
  const toggleWant = () => { void want.run('want', async signal => {
    if (wantId) { await removeWants([wantId], signal); return null }
    return (await addWant({ code: item.code }, signal)).want.id;
  }, id => {
    setWantId(id);
    queryClient.setQueryData<JavDetail>(javDetailKey(code), current => current ? { ...current, wanted: !!id, want_id: id } : current);
    actions.receipt(id ? '已加入想要' : '已取消想要');
    void invalidateWants();
    void queryClient.invalidateQueries({ queryKey: ['feed-new'] });
    void queryClient.invalidateQueries({ queryKey: ['jav-discoveries'] });
  }) };
  return <>
    <div data-stage-media="" data-jav-art="">
      <Close close={actions.close} />
      <JavPicture item={item} image={preview === null ? 'cover' : String(preview)} />
      {item.preview_count > 0 ? <div data-jav-pictures="">
        <Button variant="secondary" aria-pressed={preview === null} onClick={() => setPreview(null)}>封面</Button>
        <Button variant="secondary" disabled={preview === 0} onClick={() => setPreview(Math.max(0, (preview ?? 1) - 1))}>上一张</Button>
        <span>{preview === null ? `${item.preview_count} 张预览` : `${preview + 1} / ${item.preview_count}`}</span>
        <Button variant="secondary" disabled={preview === item.preview_count - 1} onClick={() => setPreview(Math.min(item.preview_count - 1, (preview ?? -1) + 1))}>下一张</Button>
      </div> : null}
    </div>
    <aside data-stage-side=""><div data-stage-side-content="" data-jav-info="">
      <h1 data-stage-title=""><b>{item.code}</b><span>{item.title === item.code ? '' : item.title}</span></h1>
      <div data-jav-cast="" dangerouslySetInnerHTML={{ __html: feedIdentity({ performer_refs: item.performer_refs, performers: item.performers }) }} />
      <p>{item.performers}</p>
      <dl data-jav-facts="">
        <Fact label="发行日期" value={item.release_date} />
        <Fact label="时长" value={item.duration ? `${item.duration} 分钟` : undefined} />
        <Fact label="评分" value={item.score ? String(item.score) : undefined} />
        <EntityFact label="厂牌" kind="studio" refs={item.studio_refs} navigate={actions.navigate} />
        <Fact label="发行商" value={item.publisher} />
        <EntityFact label="系列" kind="series" refs={item.series_refs} navigate={actions.navigate} />
        <Fact label="导演" value={item.director} />
      </dl>
      {item.tags.length ? <div data-jav-tags="">{item.tags.map(tag => <span key={tag}>{tag}</span>)}</div> : null}
      {item.summary ? <p data-jav-summary="">{item.summary}</p> : null}
      {item.message ? <Note tone="neutral" action={<Button variant="secondary" {...busyProps(retrying)} onClick={retry}>重试</Button>}>{item.message}</Note> : null}
      <div data-jav-actions="">
        <Button variant="secondary" disabled={readOnly} aria-pressed={!!wantId} {...busyProps(!!want.busy)} onClick={toggleWant}>{wantId ? '取消想要' : '想要'}</Button>
        <Button variant="primary" onClick={() => setDownload({ code: item.code, title: item.title, performers: item.performers,
          studio: item.studio, release_date: item.release_date, origin: `jav:${item.code}` })}>查找资源</Button>
        {item.source_url ? <ButtonLink href={item.source_url} target="_blank" rel="noreferrer" variant="secondary" trailingIcon={RiExternalLinkLine}>作品来源</ButtonLink> : null}
      </div>
      {want.error ? <Note tone="error">{want.error}</Note> : null}
      <Reviews code={item.code} count={item.comments_count} />
      <Resources item={item} actions={actions} readOnly={readOnly} />
    </div></aside>
    <CloudDownloadDialog prefill={download} close={() => setDownload(null)} receipt={actions.receipt} />
  </>;
}

function JavPicture({ item, image }: { item: JavDetail; image: string }) {
  const local = image === 'cover' && item.has_cover;
  const remote = !local && (image !== 'cover' || item.source_image);
  const result = useQuery({ queryKey: ['jav-image', item.code, image], enabled: remote,
    queryFn: ({ signal }) => apiGet<{ ok: boolean; image: string; message?: string }>(
      `/api/jav/image?code=${encodeURIComponent(item.code)}&image=${image}`, signal) });
  const src = local ? coverUrl(item, true) : result.data?.image || (image === 'cover' && !item.source_image ? item.cover_url : '');
  if (src) return <img data-jav-picture="" src={src} alt={image === 'cover' ? `${item.code} 封面` : `${item.code} 预览 ${Number(image) + 1}`} referrerPolicy="no-referrer" />;
  if (remote && result.isPending) return <div data-jav-picture-wait="" data-skeleton="image" role="status" aria-label="正在读取图片"><span className="skeleton-sheen" /></div>;
  return <div data-jav-picture-wait=""><Note tone="neutral" action={remote ? <Button variant="secondary" {...busyProps(result.isFetching)} onClick={() => { void result.refetch() }}>重试</Button> : undefined}>{result.data?.message || (result.error ? '图片未取得' : '暂无封面')}</Note></div>;
}

const Fact = ({ label, value }: { label: string; value?: string }) => value ? <><dt>{label}</dt><dd>{value}</dd></> : null;
const EntityFact = ({ label, kind, refs, navigate }: { label: string; kind: string; refs: JavEntityRef[]; navigate(path: string): void }) => refs.length ? <><dt>{label}</dt><dd>{refs.map(ref => ref.id
  ? <a key={ref.name} href={entityPath(kind, ref.name)} onClick={event => { if (event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return; event.preventDefault(); navigate(entityPath(kind, ref.name)) }}>{ref.name}</a>
  : <span key={ref.name}>{ref.name}</span>)}</dd></> : null;

function Reviews({ code, count }: { code: string; count: number }) {
  const [opened, setOpened] = useState(false);
  const result = useInfiniteQuery({ queryKey: ['jav-reviews', code], enabled: opened, initialPageParam: 1,
    queryFn: ({ signal, pageParam }) => fetchJavReviews(code, pageParam, signal), getNextPageParam: nextReviewPage });
  const pages = result.data?.pages || [];
  const items = [...new Map(pages.flatMap(page => page.items).map(item => [item.id, item])).values()];
  const failure = result.error ? errorMessage(result.error) : pages.find(page => !page.ok)?.message;
  return <section data-jav-reviews="">
    <h2>评论{count > 0 ? ` · ${count}` : ''}</h2>
    {!opened ? <Button variant="secondary" onClick={() => setOpened(true)}>查看评论</Button> : <>
      {result.isPending ? <div data-skeleton="reviews" role="status" aria-label="正在读取评论"><span className="inline-block h-8 w-full skeleton-sheen" /></div> : null}
      {items.map(item => <article key={item.id} data-jav-review=""><p><b>{item.username}</b><span>{item.score ? `${item.score} 分` : ''}</span><time>{item.created_at}</time></p><p>{item.content}</p></article>)}
      {failure ? <Note tone="neutral" action={<Button variant="secondary" onClick={() => { void result.refetch() }}>重试</Button>}>{failure}</Note>
        : !result.isPending && !items.length ? <Note tone="neutral">暂无评论</Note> : null}
      {result.hasNextPage ? <Button variant="secondary" {...busyProps(result.isFetchingNextPage)} onClick={() => { if (!result.isFetchingNextPage) void result.fetchNextPage() }}>更多评论</Button> : null}
      {!failure && pages.at(-1)?.page === 8 && count > items.length ? <Note tone="neutral">已显示 {items.length} 条评论，其余评论可在 JavDB 查看。</Note> : null}
    </>}
  </section>;
}

function Resources({ item, actions, readOnly }: { item: JavDetail; actions: JavDetailProps['actions']; readOnly: boolean }) {
  const [opened, setOpened] = useState(false);
  const downloads = useQuery({ queryKey: DOWNLOADS_KEY, enabled: opened,
    queryFn: ({ signal }) => apiGet<DownloadsSnapshot>(`${DOWNLOADS_URL}?limit=50`, signal) });
  const provider = downloads.data?.providers.find(row => row.configured)?.key || '';
  return <section data-jav-resources=""><h2>资源</h2>
    {opened ? <WantMagnets want={{ id: 0, code: item.code, title: item.title, release_date: item.release_date || null }}
      queryUrl={`/api/jav/resources?code=${encodeURIComponent(item.code)}`} readOnly={readOnly}
      downloads={downloads.data} provider={provider} toast={actions.receipt} />
      : <Button variant="secondary" onClick={() => setOpened(true)}>查看资源</Button>}
  </section>;
}
