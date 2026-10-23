/* 在线内容的手动标签与内容屏蔽共用标签身份和管理端点。 */
import { useState } from 'react';
import { Button } from '@/components/base/buttons/button';
import { Input } from '@/components/base/input/input';
import { apiGet, apiSend } from '../../api';
import { replaceFollowItem } from '../follow-feed/follow-feed';
import type { FollowGroup } from '../follow-feed/follow-feed';
import { confirmTagOperation, managedTagId, previewTagOperation, type ManagedTag } from '../index/tag-operations';
import { Note } from '../components/note';
import { Select, SelectItem } from '../components/select';
import { busyProps, useAction } from '../settings/use-action';
import { queryClient } from '../query';
import { detailTags, tagCategory, type FollowDetailActions, type FollowDetailData, type FollowDetailItem } from './follow-detail';

export function FollowTags({ item, label, actions }: { item: FollowDetailItem; label(tag: string): string; actions: FollowDetailActions }) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('');
  const [pickedTag, setPickedTag] = useState('');
  const action = useAction();
  const tags = detailTags(item, label);
  const custom = item.custom_tags || [];
  const choices = [...new Set([...tags, ...custom, ...(item.blocked_tags || [])])];
  const selectedTag = choices.includes(pickedTag) ? pickedTag : choices[0] || '';
  const apply = (result: { item: FollowDetailItem; group: FollowGroup }) => {
    replaceFollowItem(result.item);
    queryClient.setQueriesData<FollowDetailData>({ queryKey: ['follow-item'] }, current => current
      ? { ...current, ...(current.item.id === item.id ? { item: result.item, group: result.group } : {}) } : current);
  };
  const write = (operation: 'add' | 'remove', tag: string) => { void action.run(`${operation}:${tag}`, async signal => {
    const result = await apiSend<{ item: FollowDetailItem; group: FollowGroup }>('/api/follow/tag', { id: item.id, operation, tag }, 'POST', signal);
    apply(result);
    await queryClient.invalidateQueries({ predicate: query => query.queryKey[0] !== 'follow-item' });
    return result.item;
  }, () => {
    setName('');
    actions.toast(operation === 'add' ? `已添加标签「${label(tag)}」` : `已移除标签「${label(tag)}」`, {
      undo: async () => {
        const result = await apiSend<{ item: FollowDetailItem; group: FollowGroup }>('/api/follow/tag', { id: item.id, operation: operation === 'add' ? 'remove' : 'add', tag });
        apply(result);
        await queryClient.invalidateQueries();
      },
    });
  }) };
  const block = (tag: string) => { void action.run(`block:${tag}`, async signal => {
    const { items } = await apiGet<{ items: ManagedTag[] }>('/api/tag-management?scope=online', signal);
    const row = items.find(value => value.k === tag);
    if (!row) throw new Error('标签已变化，请关闭详情后重试');
    const command = { scope: 'online' as const, operation: row.blocked ? 'unblock' as const : 'block' as const, ids: [managedTagId(row)] };
    const plan = await previewTagOperation(command, signal);
    return confirmTagOperation(command, plan, signal);
  }, () => {}) };
  return <section aria-label="内容标签" className="flex min-w-0 flex-col gap-2" data-follow-tag-editor="">
    <div data-stage-tags="" data-follow-detail-tags="">
      {tags.map(tag => <button type="button" key={tag} data-tag-cat={tagCategory(item, tag)} data-follow-tag={tag}
        onClick={() => actions.openTag(tag)}>{label(tag)}</button>)}
    </div>
    <div><Button variant="secondary" size="small" aria-expanded={editing} onClick={() => setEditing(value => !value)}>
      {editing ? '收起标签管理' : '管理标签'}
    </Button></div>
    {editing ? <>
      <form className="flex min-w-0 items-center gap-2" aria-label="添加手动标签" aria-busy={!!action.busy}
        onSubmit={event => { event.preventDefault(); if (name.trim() && !action.busy) write('add', name.trim()) }}>
        <div className="min-w-0 flex-1"><Input aria-label="新标签名称" name="tag" autoComplete="off" placeholder="输入新标签" value={name} onChange={setName} maxLength={80}
          onKeyDown={event => { if (event.key === 'Enter' && !event.nativeEvent.isComposing) { event.preventDefault(); event.currentTarget.closest('form')?.requestSubmit() } }} /></div>
        <Button type="submit" variant="secondary" disabled={!name.trim()} {...busyProps(!!action.busy)}>添加标签</Button>
      </form>
      {choices.length ? <div className="flex min-w-0 items-center gap-2">
        <div className="min-w-0 flex-1"><Select size="md" aria-label="屏蔽内容的标签" prefix="标签" selectedKey={selectedTag}
          onSelectionChange={key => setPickedTag(String(key))}>
          {choices.map(tag => <SelectItem key={tag} id={tag}>{label(tag)}</SelectItem>)}
        </Select></div>
        <Button variant="secondary" {...busyProps(!!action.busy)} onClick={() => block(selectedTag)}>
          {item.blocked_tags?.includes(selectedTag) ? '恢复内容' : '屏蔽内容'}
        </Button>
      </div> : null}
      {custom.map(tag => <div key={tag} className="flex min-w-0 flex-wrap items-center gap-2">
        <span className="min-w-0 flex-1 wrap-anywhere text-body-2-regular text-text-secondary">{label(tag)}</span>
        <Button size="small" variant="secondary" {...busyProps(!!action.busy)}
          aria-label={`移除手动标签 ${label(tag)}`} onClick={() => write('remove', tag)}>移除</Button>
      </div>)}
    </> : null}
    {action.error ? <Note tone="error">{action.error}</Note> : null}
  </section>;
}
