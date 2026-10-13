import { useRef, useState, type FormEvent } from 'react';
import { Button, ButtonLink } from '@/components/base/buttons/button';
import { Input } from '@/components/base/input/input';
import { errorMessage } from '../../api';
import { ModalFrame } from '../components/modal-frame';
import { Note } from '../components/note';
import { EmptyState } from '../components/empty-state';
import { spriteGlyph } from '../components/sprite-glyph';
import { busyProps } from '../settings/busy-props';
import { favoriteHref, isFavorite, useShortcuts, useShortcutWrite, type Favorite } from './library-shortcuts';

const Star = spriteGlyph('star');
const LABELS: Record<string, string> = { performer: '艺人', creator: '创作者', studio: '厂牌', series: '系列', agency: '事务所', tag: '标签' };

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
    <Button variant="secondary" size="small" leadingIcon={Star} aria-pressed={selected}
      aria-label={`${selected ? '取消收藏' : '收藏'}${item.name}`}
      {...busyProps(write.isPending)} onClick={() => {
        if (!write.isPending) write.mutate({ action: 'favorite', ...item, on: !selected });
      }}>{selected ? '已收藏' : '收藏'}</Button>
    {write.isError ? <Note tone="error">{errorMessage(write.error)}</Note> : null}
    {query.isError ? <Button variant="secondary" size="small" onClick={() => void query.refetch()}>重试读取收藏</Button> : null}
  </span>;
}

/** 收藏名册与保存的馆藏筛选共用入口；只有打开时才读取完整列表。 */
export function LibraryShortcuts({ currentHref, kind }: { currentHref?: () => string; kind?: string }) {
  const [open, setOpen] = useState(false);
  return <>
    <Button variant="secondary" size="small" leadingIcon={Star} onClick={() => setOpen(true)}>收藏与筛选</Button>
    <ModalFrame isOpen={open} onOpenChange={setOpen} width="form" label="收藏与筛选">
      {open ? <ShortcutContents currentHref={currentHref} kind={kind} close={() => setOpen(false)} /> : null}
    </ModalFrame>
  </>;
}

function ShortcutContents({ currentHref, kind, close }: { currentHref?: () => string; kind?: string; close(): void }) {
  const query = useShortcuts();
  const write = useShortcutWrite();
  const [name, setName] = useState('');
  const [scope, setScope] = useState(kind || 'all');
  const [message, setMessage] = useState('');
  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!currentHref || !name.trim() || write.isPending) return;
    write.mutate({ action: 'save_filter', name: name.trim(), href: currentHref() }, {
      onSuccess: () => { setName(''); setMessage('筛选已保存') },
    });
  };
  const data = query.data;
  const rows = (data?.favorites || []).filter((row) => scope === 'all' || row.kind === scope);
  return <div className="flex min-h-0 min-w-0 flex-col">
    <div className="flex shrink-0 items-center justify-between gap-3 border-b border-separator-border p-5">
      <h2 className="text-title-2-semibold text-text-primary">收藏与筛选</h2>
      <Button variant="secondary" size="small" onClick={close}>关闭</Button>
    </div>
    <div className="flex min-h-0 flex-col gap-4 overflow-y-auto overscroll-contain p-5">
    {query.isPending ? <div aria-busy="true" data-skeleton="" className="h-12 animate-pulse rounded-lg bg-background-secondary-default" /> : null}
    {query.isError ? <Note tone="error" action={<Button variant="secondary" onClick={() => void query.refetch()}>重试</Button>}>{errorMessage(query.error)}</Note> : null}
    {write.isError ? <Note tone="error">{errorMessage(write.error)}</Note> : null}
    {data ? <>
      <h3 className="text-body-medium text-text-primary">收藏</h3>
      <div className="flex flex-wrap gap-2" role="group" aria-label="收藏类型">
        {[['all', '全部'], ...Object.entries(LABELS)].map(([value, label]) =>
          <Button key={value} variant="secondary" size="small" aria-pressed={scope === value}
            onClick={() => setScope(value)}>{label}</Button>)}
      </div>
      {!rows.length ? <EmptyState shell="plain" icon={Star} title="还没有收藏">在资料页或标签页收藏常用内容。</EmptyState> : null}
      {rows.map((row) => <div key={row.key} className="flex min-w-0 items-center justify-between gap-2">
        <a href={favoriteHref(row)} className="min-w-0 flex-1 break-all text-body-regular text-text-primary underline">{row.name}</a>
        <Button variant="secondary" size="small" aria-label={`取消收藏${row.name}`} {...busyProps(write.isPending)}
          onClick={() => { if (!write.isPending) write.mutate({ action: 'favorite', ...row, on: false }) }}>取消收藏</Button>
      </div>)}
      <h3 className="text-body-medium text-text-primary">保存的筛选</h3>
      {!data.filters.length ? <EmptyState shell="plain" icon={spriteGlyph('filter')} title="还没有保存的筛选">在馆藏页保存当前条件，随时打开。</EmptyState> : null}
      {data.filters.map((row) => <div key={row.id} className="flex min-w-0 items-center justify-between gap-2">
        <span className="min-w-0 flex-1 overflow-hidden"><ButtonLink variant="secondary" href={row.href} title={row.name}>{row.name}</ButtonLink></span>
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
  </div>;
}
