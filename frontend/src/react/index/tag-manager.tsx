/* 标签管理：预览影响范围，确认后提交；来源证据与隐藏决定由服务端保存。 */
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { VisuallyHidden } from 'react-aria';
import { Button } from '@/components/base/buttons/button';
import { apiGet } from '../../api';
import { GlassPill } from '../components/filter-glass';
import { Note } from '../components/note';
import { SelectionDock } from '../components/selection-dock';
import { busyProps, useAction } from '../settings/use-action';
import { ONLINE_TAG_CATEGORIES, TAG_CATEGORIES, tagGroups, type TagView } from './index-data';
import { TagAlphabet, TagCloud, TagFilters } from './index-tags';
import { TagEditor, confirmTagOperation, managedTagId, previewTagOperation, type Command, type ManagedTag, type TagScope } from './tag-operations';

export type { ManagedTag } from './tag-operations';
interface TagInventory { items: ManagedTag[]; duplicate_groups: number[][] }

export function TagManager({ search = '', category = 'all', view = 'cloud', onCategory, onView, onJump, scope = 'local' }:
  { search?: string; category?: string; view?: TagView; scope?: TagScope; onCategory?(category: string): void; onView?(view: TagView): void; onJump?(at: number): void }) {
  const online = scope === 'online';
  const inventory = useQuery({ queryKey: ['tag-management', scope], queryFn: ({ signal }) => apiGet<TagInventory>(`/api/tag-management${online ? '?scope=online' : ''}`, signal) });
  const [hidden, setHidden] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [picked, setPicked] = useState<ReadonlySet<string>>(new Set());
  const [editing, setEditing] = useState<'rename' | 'merge' | null>(null);
  const action = useAction();
  const rows = inventory.data?.items || [];
  const matching = rows.filter(row => blocked ? row.blocked : row.hidden === hidden && (!online || !row.blocked))
    .filter(row => [row.k, ...row.aliases].some(name => name.toLocaleLowerCase().includes(search.trim().toLocaleLowerCase())));
  const visible = matching.filter(row => category === 'all' || (row.cat || 'general') === category);
  const categories = (online ? ONLINE_TAG_CATEGORIES : TAG_CATEGORIES).filter(([key]) => key === 'all' || key === category || inventory.isPending || matching.some(row => (row.cat || 'general') === key));
  const tags = visible.map(row => ({ ...row, label: row.k }));
  const groups = view === 'alphabet' ? tagGroups(tags, key => key) : [];
  const selected = rows.filter(row => picked.has(row.k));
  const run = (command: Command) => { void action.run(command.operation, async signal => {
    const scoped = online ? { ...command, scope } : command;
    const plan = await previewTagOperation(scoped, signal);
    return confirmTagOperation(scoped, plan, signal);
  }, changed => { if (changed) setPicked(new Set()) }) };
  const ids = selected.map(managedTagId);
  const actions = { online, favorites: online, picked,
    edit: (key: string) => { setPicked(new Set([key])); setEditing('rename') },
    press: (key: string) => setPicked(current => {
      const next = new Set(current); if (!next.delete(key)) next.add(key); return next;
    }) };

  return <section aria-label="标签管理" data-tag-manager="" className="flex min-w-0 flex-col">
    <TagFilters categories={categories} category={category} online={online} readout={`${visible.length.toLocaleString()} 个标签`}
      letters={groups.map(([letter]) => letter)} view={view} onCategory={next => { setPicked(new Set()); onCategory?.(next) }}
      onView={next => onView?.(next)} onJump={at => onJump?.(at)} status={{ hidden, blocked,
        onChange: value => { setHidden(value); setBlocked(false); setPicked(new Set()) },
        ...(online ? { onBlocked: () => { setBlocked(true); setHidden(false); setPicked(new Set()) } } : {}) }}
      actions={<>
        {inventory.data?.duplicate_groups.length ? <GlassPill busy={action.busy === 'repair'} onPress={() => run({ operation: 'repair', ids: [] })}>整理重复标签</GlassPill> : null}
        {visible.length ? <GlassPill onPress={() => setPicked(new Set(visible.map(row => row.k)))}>选择当前结果</GlassPill> : null}
        {picked.size ? <GlassPill onPress={() => setPicked(new Set())}>清空选择</GlassPill> : null}
      </>} />
    {inventory.isPending ? <div aria-busy="true" data-skeleton="" className="h-24 rounded-lg bg-background-tertiary-default"><VisuallyHidden>正在读取标签</VisuallyHidden></div>
      : inventory.isError ? <Note tone="error" action={<Button variant="secondary" onClick={() => void inventory.refetch()}>立即重试</Button>}>无法读取标签</Note>
        : visible.length ? (view === 'alphabet' ? <TagAlphabet groups={groups} actions={actions} /> : <TagCloud tags={tags} actions={actions} />)
          : <Note tone="neutral">没有符合条件的标签。</Note>}
    {action.error ? <Note tone="error">{action.error}</Note> : null}
    <SelectionDock label="标签管理操作" count={`已选 ${picked.size} 个标签`} visible={picked.size > 0}>
      <Button variant="secondary" size="small" disabled={selected.length !== 1} onClick={() => setEditing('rename')}>重命名</Button>
      <Button variant="secondary" size="small" disabled={selected.length < 2 || (online && new Set(selected.map(row => row.cat)).size > 1)} onClick={() => setEditing('merge')}>合并</Button>
      <Button variant="secondary" size="small" {...busyProps(Boolean(action.busy))}
        onClick={() => run({ operation: hidden ? 'restore' : 'hide', ids })}>{hidden ? '恢复' : '隐藏'}</Button>
      {online ? <Button variant="secondary" size="small" {...busyProps(Boolean(action.busy))}
        onClick={() => run({ operation: blocked ? 'unblock' : 'block', ids })}>{blocked ? '恢复内容' : '屏蔽内容'}</Button> : null}
    </SelectionDock>
    {editing ? <TagEditor key={editing} operation={editing} selected={selected} scope={scope}
      close={() => setEditing(null)} done={() => setPicked(new Set())} /> : null}
  </section>;
}
