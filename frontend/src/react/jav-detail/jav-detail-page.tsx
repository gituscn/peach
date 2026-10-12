import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { RiChat3Line, RiExternalLinkLine } from '@remixicon/react';
import { entityPath, firstGrapheme, icon } from '@peach/legacy/core';
import { tagLabel } from '@peach/legacy/tags';
import { coverUrl } from '@peach/card-art';
import { mountPreviewPlayer } from '../../player';
import { apiGet, errorMessage } from '../../api';
import { Button } from '@/components/base/buttons/button';
import { CloudDownloadDialog, type DownloadPrefill } from '../activity/cloud-download-dialog';
import { Note } from '../components/note';
import { RetryNote } from '../components/grid-reveal';
import { IdentityCell, IdentitySeries } from '../components/identity-cell';
import { MediaCarousel, useCarouselInset } from '../components/media-carousel';
import { useFoldedTitle } from '../components/folded-title';
import { busyProps, useAction } from '../settings/use-action';
import { Disclosure } from '../settings/section';
import { addWant, invalidateWants, removeWants } from '../wants/wants';
import { WantMagnets } from '../wants/want-magnets';
import type { DownloadsSnapshot } from '../bundle';
import { DOWNLOADS_KEY, DOWNLOADS_URL } from '../activity/downloads-panel';
import { queryClient } from '../query';
import { fetchJavDetail, fetchJavReviews, javDetailKey, nextReviewPage, type JavDetail, type JavDetailProps, type JavEntityRef } from './jav-detail';

export function JavDetailPage(props: JavDetailProps) {
  const result = useQuery({ queryKey: javDetailKey(props.code), queryFn: ({ signal }) => fetchJavDetail(props.code, signal) });
  return <div data-jav-detail="" data-item-detail="" data-stage-grid="">
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
  const [preview, setPreview] = useState(-1);
  const frame = useRef<HTMLDivElement>(null);
  const inset = useCarouselInset(frame, '[data-jav-picture]', preview);
  const media = [{ index: -1, label: '封面' }, ...Array.from({ length: item.preview_count }, (_, index) => ({ index, label: `预览 ${index + 1}` })),
    ...(item.preview_video_url ? [{ index: -2, label: '视频预览', video: true }] : [])];
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
    <div ref={frame} data-stage-media="" data-jav-art="" data-jav-playing={preview === -2 ? '' : undefined}
      // oxlint-disable-next-line shadcn/no-inline-styles -- 图片黑边的真实宽度决定翻页箭头位置
      style={{ '--follow-image-arrow-inset': inset === null || preview === -2 ? undefined : `${inset}px` } as CSSProperties}>
      <Close close={actions.close} />
      {item.preview_video_url ? <button type="button" data-jav-preview-toggle="" aria-pressed={preview === -2}
        onClick={() => setPreview(preview === -2 ? -1 : -2)}><Glyph name={preview === -2 ? 'image' : 'play'} />{preview === -2 ? '查看图片' : '视频预览'}</button> : null}
      {preview === -2 && item.preview_video_url ? <PreviewVideo key={item.preview_video_url} src={item.preview_video_url} />
        : <JavPicture key={preview} item={item} image={preview === -1 ? 'cover' : String(preview)} />}
      <MediaCarousel items={media} position={Math.max(0, media.findIndex(entry => entry.index === preview))} onSelect={setPreview}
        below renderThumbnail={entry => <JavPicture item={item} image={entry.index < 0 ? 'cover' : String(entry.index)} thumbnail />} />
    </div>
    <aside data-stage-side=""><div data-stage-side-content="" data-jav-info="">
      <JavTitle item={item} />
      {Number(item.score) > 0 ? <SourceRating score={Number(item.score)} /> : null}
      <div className="mono" data-stage-meta="">
        <Spec glyph="calendar" label="发行日期" value={item.release_date} />
        <Spec glyph="clock" label="时长" value={item.duration ? `${item.duration} 分钟` : undefined} />
      </div>
      <JavIdentity item={item} navigate={actions.navigate} />
      <div data-jav-facts="">
        <Spec glyph="briefcase" label="发行商" value={item.publisher} />
        <Spec glyph="clapperboard" label="导演" value={item.director} />
      </div>
      {(item.tag_refs?.length ?? item.tags.length) > 0 ? <div data-stage-tags="" data-jav-tags="">{(item.tag_refs || item.tags.map(name => ({ name, category: 'general', source_name: name }))).map(tag =>
        <span data-detail-tag="" data-tag-cat={tag.category} key={tag.name}><button type="button" data-tag={tag.name}
          title={tagLabel(tag.name)} onClick={() => actions.openTag(tag.name)}>{tagLabel(tag.name)}</button></span>)}</div> : null}
      {item.summary ? <p data-jav-summary="">{item.summary}</p> : null}
      {item.message ? <Note tone="neutral" action={<Button variant="secondary" {...busyProps(retrying)} onClick={retry}>重试</Button>}>{item.message}</Note> : null}
      <div data-jav-actions="">
        <Button variant="secondary" disabled={readOnly} aria-pressed={!!wantId} {...busyProps(!!want.busy)} onClick={toggleWant}>{wantId ? '取消想要' : '想要'}</Button>
        <Button variant="primary" onClick={() => setDownload({ code: item.code, title: item.title, performers: item.performers,
          studio: item.studio, release_date: item.release_date, origin: `jav:${item.code}` })}>查找资源</Button>
        {item.source_url ? <Button variant="secondary" trailingIcon={RiExternalLinkLine}
          onClick={() => window.open(item.source_url, '_blank', 'noopener,noreferrer')}>作品来源</Button> : null}
      </div>
      {want.error ? <Note tone="error">{want.error}</Note> : null}
      <Reviews code={item.code} count={item.comments_count} />
      <Resources item={item} actions={actions} readOnly={readOnly} />
    </div></aside>
    <CloudDownloadDialog prefill={download} close={() => setDownload(null)} receipt={actions.receipt} />
  </>;
}

function JavPicture({ item, image, thumbnail = false }: { item: JavDetail; image: string; thumbnail?: boolean }) {
  const local = image === 'cover' && item.has_cover;
  const remote = !local && (image !== 'cover' || item.source_image);
  const result = useQuery({ queryKey: ['jav-image', item.code, image], enabled: remote,
    queryFn: ({ signal }) => apiGet<{ ok: boolean; image: string; message?: string }>(
      `/api/jav/image?code=${encodeURIComponent(item.code)}&image=${image}`, signal) });
  const src = local ? coverUrl(item, true) : result.data?.image || (image === 'cover' && !item.source_image ? item.cover_url : '');
  if (src) return <img data-jav-picture={thumbnail ? undefined : ''} src={src} alt={thumbnail ? '' : image === 'cover' ? `${item.code} 封面` : `${item.code} 预览 ${Number(image) + 1}`} referrerPolicy="no-referrer" />;
  if (thumbnail) return remote && result.isPending ? <span className="block h-24 w-full skeleton-sheen" aria-label="正在读取预览" /> : <span>预览未取得</span>;
  if (remote && result.isPending) return <div data-jav-picture-wait="" data-skeleton="image" role="status" aria-label="正在读取图片"><span className="skeleton-sheen" /></div>;
  return <div data-jav-picture-wait=""><Note tone="neutral" action={remote ? <Button variant="secondary" {...busyProps(result.isFetching)} onClick={() => { void result.refetch() }}>重试</Button> : undefined}>{result.data?.message || (result.error ? '图片未取得' : '暂无封面')}</Note></div>;
}

const Glyph = ({ name }: { name: string }) => <span className="contents" aria-hidden="true" dangerouslySetInnerHTML={{ __html: icon(name) }} />;
const Spec = ({ glyph, label, value }: { glyph: string; label: string; value?: string }) => value ? <span data-spec-item="" title={label}><Glyph name={glyph} /><span>{value}</span></span> : null;

function JavTitle({ item }: { item: JavDetail }) {
  const { text, expanded, foldable, toggle } = useFoldedTitle(item.title);
  const title = item.title === item.code ? '' : item.title;
  return <div data-item-title=""><h1 data-stage-title="" data-title-line=""><span ref={text} data-detail-title=""
    data-expanded={expanded ? '' : undefined} data-foldable={foldable ? '' : undefined}
    onClick={() => { if (foldable && !String(getSelection() || '')) toggle() }}><b>{item.code}</b>{title ? ` ${title}` : ''}</span></h1>
    <span data-title-tools=""><button type="button" data-title-fold="" hidden={!foldable} aria-expanded={expanded}
      aria-label={expanded ? '收起标题' : '展开标题'} title={expanded ? '收起标题' : '展开完整标题'} onClick={toggle}><Glyph name={expanded ? 'chevron-up' : 'chevron-down'} /></button></span>
  </div>;
}

function SourceRating({ score, review = false }: { score: number; review?: boolean }) {
  const value = Math.max(0, Math.min(5, score));
  return <div data-item-rating="" data-jav-rating="" data-review-rating={review ? '' : undefined} role="img" aria-label={`${review ? '评论' : 'JavDB'}评分 ${score} / 5`}>
    <div data-rating-stars="" aria-hidden="true">{[1, 2, 3, 4, 5].map(star => {
      const fraction = Math.max(0, Math.min(1, value - star + 1));
      return <span key={star} data-rate={star} data-on={String(fraction === 1)}><span data-rating-icon=""><Glyph name="star" />
        {/* oxlint-disable-next-line shadcn/no-inline-styles -- 星星填充宽度表示实际评分的小数比例 */}
        <span data-rating-fill="" style={{ width: `${fraction * 100}%` }}><Glyph name="star" /></span></span></span>;
    })}</div>
    <span data-rating-value="">{score.toFixed(1)} / 5</span>
  </div>;
}

function JavIdentity({ item, navigate }: { item: JavDetail; navigate(path: string): void }) {
  const onOpen = (kind: string, name: string) => navigate(kind === 'studio' && !item.studio_refs.find(ref => ref.name === name)?.id
    ? `/?jav=1&studio=${encodeURIComponent(name)}` : entityPath(kind, name));
  const group = (kind: string, label: string, refs: JavEntityRef[], gender?: string) => refs.length ? <section data-id-group={kind} data-id-gender={gender}>
    <h5 data-id-label="">{label}</h5><div data-id-row="">{refs.map(person => <IdentityCell key={person.name} kind={kind}
      person={{ ...person, id: person.id ?? null }} onOpen={onOpen} openByName={kind === 'studio'}
      face={kind === 'performer' && !person.has_image && !person.has_avatar && person.source_avatar && person.source_actor_id
        ? <SourceAvatar code={item.code} person={person} /> : undefined} />)}</div>
  </section> : null;
  return <div data-item-identity=""><div data-identity-primary="">
    {group('performer', '女优', item.performer_refs.filter(person => person.gender === 'female'), 'female')}
    {group('performer', '男优', item.performer_refs.filter(person => person.gender === 'male'), 'male')}
    {group('performer', '出演者', item.performer_refs.filter(person => !person.gender || person.gender === 'unknown'), 'unknown')}
    {group('studio', '厂牌', item.studio_refs)}</div>
    <IdentitySeries people={item.series_refs.map(person => ({ ...person, id: person.id ?? null }))} onOpen={onOpen} /></div>;
}

function SourceAvatar({ code, person }: { code: string; person: JavEntityRef }) {
  const result = useQuery({ queryKey: ['jav-actor-image', code, person.source_actor_id], queryFn: ({ signal }) =>
    apiGet<{ ok: boolean; image: string }>(`/api/jav/image?code=${encodeURIComponent(code)}&image=${encodeURIComponent('actor:' + person.source_actor_id)}`, signal) });
  return <span data-id-face=""><span>{firstGrapheme(person.name)}</span>{result.data?.image
    ? <img src={result.data.image} alt="" data-drop="self" /> : null}</span>;
}

function PreviewVideo({ src }: { src: string }) {
  const frame = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  useLayoutEffect(() => {
    const node = frame.current!;
    const video = document.createElement('video');
    video.className = 'video-js vjs-big-play-centered';
    video.controls = true;
    video.setAttribute('playsinline', '');
    video.setAttribute('aria-label', '视频预览');
    node.append(video);
    return mountPreviewPlayer(video, { src, type: /\.m3u8(?:\?|$)/i.test(src) ? 'application/x-mpegURL' : 'video/mp4' }, () => setFailed(true));
  }, [src, attempt]);
  return <div ref={frame} data-jav-video="">{failed ? <Note tone="neutral" action={<Button variant="secondary" onClick={() => { setFailed(false); setAttempt(value => value + 1) }}>重试</Button>}>视频预览未取得</Note> : null}</div>;
}

function Reviews({ code, count }: { code: string; count: number }) {
  const [opened, setOpened] = useState(false);
  const result = useInfiniteQuery({ queryKey: ['jav-reviews', code], enabled: opened, initialPageParam: 1, staleTime: 60_000,
    queryFn: ({ signal, pageParam }) => fetchJavReviews(code, pageParam, signal), getNextPageParam: nextReviewPage });
  const pages = result.data?.pages || [];
  const items = [...new Map(pages.flatMap(page => page.items).map(item => [item.id, item])).values()];
  const failure = result.error ? errorMessage(result.error) : pages.find(page => !page.ok)?.message;
  return <section data-jav-reviews="">
    <Disclosure trailing summary={<><RiChat3Line aria-hidden />评论{count > 0 ? ` · ${count}` : ''}</>}
      onOpenChange={setOpened}>
    {opened || result.data ? <>
      {result.isPending ? <div data-skeleton="reviews" role="status" aria-label="正在读取评论"><span className="inline-block h-8 w-full skeleton-sheen" /></div> : null}
      {items.map(item => <article key={item.id} data-jav-review=""><div data-jav-review-meta=""><b>{item.username}</b>
        {Number(item.score) > 0 ? <SourceRating score={Number(item.score)} review /> : null}
        <time dateTime={item.created_at} title={item.created_at}>{item.created_at.slice(0, 10)}</time></div><p>{item.content}</p></article>)}
      {failure ? <Note tone="neutral" action={<Button variant="secondary" onClick={() => { void result.refetch() }}>重试</Button>}>{failure}</Note>
        : !result.isPending && !items.length ? <Note tone="neutral">暂无评论</Note> : null}
      {result.hasNextPage ? <Button variant="secondary" {...busyProps(result.isFetchingNextPage)} onClick={() => { if (!result.isFetchingNextPage) void result.fetchNextPage() }}>更多评论</Button> : null}
      {!failure && pages.at(-1)?.page === 8 && count > items.length ? <Note tone="neutral">已显示 {items.length} 条评论，其余评论可在 JavDB 查看。</Note> : null}
    </> : null}
    </Disclosure>
  </section>;
}

function Resources({ item, actions, readOnly }: { item: JavDetail; actions: JavDetailProps['actions']; readOnly: boolean }) {
  const [opened, setOpened] = useState(false);
  const downloads = useQuery({ queryKey: DOWNLOADS_KEY, enabled: opened,
    queryFn: ({ signal }) => apiGet<DownloadsSnapshot>(`${DOWNLOADS_URL}?limit=50`, signal) });
  const provider = downloads.data?.providers.find(row => row.configured)?.key || '';
  const [loaded, setLoaded] = useState(false);
  return <section data-jav-resources="">
    <Disclosure trailing summary={<><Glyph name="link" />资源</>} onOpenChange={value => { setOpened(value); if (value) setLoaded(true) }}>
    {loaded ? <WantMagnets want={{ id: 0, code: item.code, title: item.title, release_date: item.release_date || null }}
      queryUrl={`/api/jav/resources?code=${encodeURIComponent(item.code)}`} readOnly={readOnly}
      downloads={downloads.data} provider={provider} toast={actions.receipt} />
      : null}
    </Disclosure>
  </section>;
}
