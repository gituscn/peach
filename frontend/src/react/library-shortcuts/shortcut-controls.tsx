import { useRef, useState, type FormEvent } from 'react';
import { spinnerHtml } from '@peach/legacy/ui';
import { Button, ButtonLink } from '@/components/base/buttons/button';
import { Input } from '@/components/base/input/input';
import { Avatar } from '@/components/base/avatar/avatar';
import { errorMessage } from '../../api';
import { ModalFrame } from '../components/modal-frame';
import { Note } from '../components/note';
import { EmptyState } from '../components/empty-state';
import { spriteGlyph } from '../components/sprite-glyph';
import { useViewGlide } from '../components/use-view-glide';
import { busyProps } from '../settings/busy-props';
import { favoriteHref, isFavorite, useShortcuts, useShortcutWrite, type Favorite } from './library-shortcuts';
import './shortcuts.css';

const Star = spriteGlyph('star');
const LABELS: Record<string, string> = { performer: '艺人', creator: '创作者', studio: '片商与厂牌', series: '系列', agency: '事务所', tag: '标签' };
const GLYPHS = { all: spriteGlyph('star'), performer: spriteGlyph('user-round'), creator: spriteGlyph('user-round'), studio: spriteGlyph('clapperboard'), series: spriteGlyph('film'), agency: spriteGlyph('briefcase'), tag: spriteGlyph('tags') };

export function FavoriteButton({ item }: { item: Favorite }) {
  return <FavoriteChoice key={`${item.kind}:${item.entity_id}:${item.name}`} item={item} />;
}

function FavoriteChoice({ item }: { item: Favorite }) {
  const query = useShortcuts(false);
  const initial = useRef(query.data);
  const write = useShortcutWrite();
  const selected = query.data && query.data !== initial.current
    ? isFavorite(query.data.favorites || [], item)
    : item.favorite ?? (query.data ? isFavorite(query.data.favorites || [], item) : false);
  return <span className="inline-flex min-w-0 flex-col gap-1">
    <button type="button" data-favorite="" aria-pressed={!!selected}
      aria-label={`${selected ? '取消收藏' : '收藏'}${item.name}`}
      title={`${selected ? '取消收藏' : '收藏'}${item.name}`}
      {...busyProps(write.isPending)} onClick={() => {
        if (!write.isPending) write.mutate({ action: 'favorite', ...item, on: !selected });
      }}>{write.isPending ? <span aria-hidden dangerouslySetInnerHTML={{ __html: spinnerHtml('') }} /> : <Star />}</button>
    {write.isError ? <Note tone="error">{errorMessage(write.error)}</Note> : null}
    {query.isError ? <Button variant="secondary" size="small" onClick={() => void query.refetch()}>重试读取收藏</Button> : null}
  </span>;
}

/** 实体收藏、作品清单与保存筛选的管理入口。 */
export function LibraryShortcuts({ currentHref, kind, glass = false }: { currentHref?: () => string; kind?: string; glass?: boolean }) {
  const [open, setOpen] = useState(false);
  const pane = useRef<HTMLSpanElement>(null), entry = useRef<HTMLSpanElement>(null);
  const glide = useViewGlide(pane, entry, '[data-shortcuts-trigger]', open);
  return <>
    {glass ? <span ref={entry} data-shortcuts-entry="" onPointerLeave={glide.leave}>
      <span ref={pane} data-view-glide="" aria-hidden="true" />
      <button type="button" data-shortcuts-trigger="" data-shortcuts-glass="" aria-haspopup="dialog" aria-expanded={open}
        onPointerEnter={glide.hover} onClick={() => setOpen(true)}>我的收藏</button>
    </span> : <Button variant="secondary" size="small" data-shortcuts-trigger="" onClick={() => setOpen(true)}>我的收藏</Button>}
    <ModalFrame isOpen={open} onOpenChange={setOpen} width="collections" label="我的收藏">
      {open ? <ShortcutContents currentHref={currentHref} kind={kind} close={() => setOpen(false)} /> : null}
    </ModalFrame>
  </>;
}

function ShortcutContents({ currentHref, kind, close }: { currentHref?: () => string; kind?: string; close(): void }) {
  const query = useShortcuts();
  const write = useShortcutWrite();
  const [name, setName] = useState('');
  const [scope, setScope] = useState(kind || 'all');
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState('');
  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!currentHref || !name.trim() || write.isPending) return;
    write.mutate({ action: 'save_filter', name: name.trim(), href: currentHref() }, {
      onSuccess: () => { setName(''); setMessage('筛选已保存') },
    });
  };
  const data = query.data;
  const rows = (data?.favorites || []).filter((row) => (scope === 'all' || row.kind === scope)
    && row.name.toLocaleLowerCase().includes(search.trim().toLocaleLowerCase()));
  return <div data-shortcuts-panel="" className="flex min-h-0 min-w-0 flex-col">
    <div className="flex shrink-0 items-center justify-between gap-3 border-b border-separator-border p-5">
      <h2 className="text-title-2-semibold text-text-primary">我的收藏</h2>
      <Button variant="secondary" size="small" onClick={close}>关闭</Button>
    </div>
    <div data-shortcuts-body="">
      <aside data-shortcuts-categories="" aria-label="收藏类型">
        {[['all', '全部'], ...Object.entries(LABELS)].map(([value, label]) => {
          const Glyph = GLYPHS[value as keyof typeof GLYPHS] || Star;
          const count = (data?.favorites || []).filter(row => value === 'all' || row.kind === value).length;
          return <button key={value} type="button" aria-label={label} aria-pressed={scope === value} onClick={() => setScope(value)}>
            <Glyph aria-hidden className="size-5" /><span>{label}</span><span data-shortcuts-count="">{count}</span>
          </button>;
        })}
      </aside>
      <div data-shortcuts-content="" className="flex min-h-0 min-w-0 flex-col gap-4 overflow-y-auto overscroll-contain p-5">
      <nav aria-label="收藏作品清单" className="flex flex-wrap gap-2">
        <ButtonLink variant="secondary" size="small" href="/flagged" onClick={close}>已标记</ButtonLink>
        <ButtonLink variant="secondary" size="small" href="/watch-later" onClick={close}>稍后看</ButtonLink>
      </nav>
    {query.isPending ? <div aria-busy="true" data-skeleton="" className="h-12 animate-pulse rounded-lg bg-background-secondary-default" /> : null}
    {query.isError ? <Note tone="error" action={<Button variant="secondary" onClick={() => void query.refetch()}>重试</Button>}>{errorMessage(query.error)}</Note> : null}
    {write.isError ? <Note tone="error">{errorMessage(write.error)}</Note> : null}
    {data ? <>
      <h3 className="text-body-medium text-text-primary">实体收藏</h3>
      <Input aria-label="搜索收藏" placeholder="搜索收藏" leadingIcon={spriteGlyph('search')} value={search} onChange={setSearch} />
      {!rows.length ? <EmptyState shell="plain" icon={Star} title={search ? '没有匹配的收藏' : (data.favorites.length ? '还没有此类收藏' : '还没有收藏')}>
        {search ? '试试其他名称。' : '在资料页或标签页收藏常用内容。'}
      </EmptyState> : null}
      <div data-shortcuts-list="">{rows.map((row) => <div key={row.key} data-shortcuts-row="" className="flex min-w-0 items-center justify-between gap-3">
        <a href={favoriteHref(row)} aria-label={row.name} onClick={close} className="flex min-w-0 flex-1 items-center gap-3 text-body-regular text-text-primary">
          <FavoriteAvatar key={row.image_url} item={row} />
          <span className="flex min-w-0 flex-col gap-1"><span className="truncate">{row.name}</span>
            <span className="text-caption-1-regular text-text-secondary">{LABELS[row.kind]}</span></span>
        </a>
        <Button variant="secondary" size="small" aria-label={`取消收藏${row.name}`} {...busyProps(write.isPending)}
          onClick={() => { if (!write.isPending) write.mutate({ action: 'favorite', ...row, on: false }) }}>取消收藏</Button>
      </div>)}</div>
      <h3 className="text-body-medium text-text-primary">保存的筛选</h3>
      {!data.filters.length ? <EmptyState shell="plain" icon={spriteGlyph('list-filter')} title="还没有保存的筛选">在馆藏页保存当前条件，随时打开。</EmptyState> : null}
      {data.filters.map((row) => <div key={row.id} className="flex min-w-0 items-center justify-between gap-2">
        <a href={row.href} title={row.name} onClick={close} className="min-w-0 flex-1 break-all text-body-regular text-text-primary underline">{row.name}</a>
        <Button variant="secondary" size="small" aria-label={`删除筛选${row.name}`} {...busyProps(write.isPending)}
          onClick={() => { if (!write.isPending) write.mutate({ action: 'delete_filter', id: row.id }) }}>删除</Button>
      </div>)}
      {currentHref ? <form onSubmit={submit} className="flex flex-col gap-3" aria-label="保存当前筛选">
        <Input label="筛选名称" value={name} onChange={setName} maxLength={80} />
        <Button type="submit" disabled={!name.trim()} {...busyProps(write.isPending)}>保存当前筛选</Button>
        {message ? <span role="status" className="text-body-2-regular text-text-secondary">{message}</span> : null}
      </form> : null}
    </> : null}
      </div>
    </div>
  </div>;
}

function FavoriteAvatar({ item }: { item: Favorite }) {
  const [failed, setFailed] = useState(false);
  const Glyph = GLYPHS[item.kind as keyof typeof GLYPHS] || Star;
  const src = failed ? undefined : item.image_url;
  return <span data-shortcuts-avatar="" title={item.image_label || item.name} onErrorCapture={() => setFailed(true)}>
    <Avatar size="lg" src={src} alt="" />
    {!src ? <Glyph aria-hidden className="size-5" /> : null}
  </span>;
}
