import { useEffect, useRef, useState } from 'react';

import { SettingsRow } from '@/components/application/settings/settings-rows';
import { Button } from '@/components/base/buttons/button';
import { Checkbox } from '@/components/base/checkbox/checkbox';
import { Switch } from '@/components/base/switch/switch';

import { apiGet, apiSend } from '../../api';
import { wireScrollers } from '../../ui-kit/scroll';
import { Disclosure, ErrorText, Footer, Help, Rows, Section, Stack } from './section';
import { busyProps, useAction } from './use-action';

export interface LibrarySharingState {
  enabled: boolean; available: boolean; schema: number; fields: string[]; notice: string;
  last_attempt?: { period?: string; status?: string; reason?: string };
}
interface Preview { data: { library: unknown[]; preferences: unknown }; bytes: number; token: string; schema: number }

export function LibrarySharingSettings({ initial, receipt }: {
  initial: LibrarySharingState; receipt(message: string): void;
}) {
  const [value, setValue] = useState(initial);
  const [preview, setPreview] = useState<Preview | null>(null);
  const [accepted, setAccepted] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const action = useAction();
  useEffect(() => { if (root.current?.parentElement) wireScrollers(root.current.parentElement) }, [preview]);
  const save = (enabled: boolean) => void action.run('save', (signal) => apiSend<LibrarySharingState>(
    '/api/configuration/library-sharing', { enabled, schema: value.schema, consent: accepted,
      preview_token: preview?.token }, 'POST', signal), (saved) => {
    setValue(saved); setPreview(null); setAccepted(false); receipt('已保存馆藏与口味分享选项');
  });
  return <Section title="馆藏与口味研究">
    <Stack>
      <Help>{value.notice}</Help>
      <ul className="list-disc space-y-2 pl-5 text-body-2-regular text-text-secondary">
        {value.fields.map((field) => <li key={field}>{field}</li>)}
      </ul>
      {!value.available ? <Help>此版本尚未配置馆藏与口味接收端，当前不会发送；同意选项保存在本机。</Help> : null}
      {value.last_attempt?.status ? <Help>最近尝试：{value.last_attempt.period}，{value.last_attempt.status === 'failed'
        ? `未完成（${value.last_attempt.reason}）` : '已尝试发送，接收状态需在 Sentry 核对'}。</Help> : null}
    </Stack>
    {value.enabled ? <Rows><SettingsRow label="自动分享馆藏与口味明细" description="关闭后停止后续发送">
      <Switch aria-label="自动分享馆藏与口味明细" isSelected onChange={() => save(false)} />
    </SettingsRow></Rows> : null}
    {preview ? <Stack divided>
      <Help>当前快照包含 {preview.data.library.length} 部作品，约 {(preview.bytes / 1024).toFixed(1)} KiB。开启后每周自动发送相同字段的最新数据。</Help>
      <Disclosure summary="查看完整数据预览" defaultOpen>
        <div ref={root} className="ui-geist-scroller" data-geist-scroller>
          <div className="ui-geist-scroller-overlay" aria-hidden />
          <div className="ui-geist-scroller-container max-h-80" data-overflow="y" tabIndex={0} aria-label="馆藏与口味上传预览">
            <pre className="whitespace-pre-wrap break-all text-caption-1-regular">{JSON.stringify(preview.data, null, 2)}</pre>
          </div>
        </div>
      </Disclosure>
      <Checkbox isSelected={accepted} onChange={setAccepted}>我已查看字段与预览，同意每周自动上传馆藏与口味明细用于 Peach 群体研究</Checkbox>
    </Stack> : null}
    {action.error ? <Stack divided><ErrorText>{action.error}</ErrorText></Stack> : null}
    <Footer>
      {!value.enabled ? <>
        <Button variant="secondary" onClick={() => void action.run('preview',
          (signal) => apiGet<Preview>('/api/configuration/library-sharing/preview', signal),
          (data) => { setPreview(data); setAccepted(false) })} {...busyProps(action.busy === 'preview')}>预览上传内容</Button>
        {preview ? <Button disabled={!accepted} onClick={() => save(true)} {...busyProps(action.busy === 'save')}>同意并开启分享</Button> : null}
      </> : <Help>分享已开启，可用上方开关关闭。</Help>}
    </Footer>
  </Section>;
}
