import { useEffect, useMemo, useRef, useState } from 'react';

import { SettingsRow } from '@/components/application/settings/settings-rows';
import { Button } from '@/components/base/buttons/button';
import { Checkbox } from '@/components/base/checkbox/checkbox';
import { Switch } from '@/components/base/switch/switch';

import { apiGet, apiSend } from '../../api';
import { wireScrollers } from '../../ui-kit/scroll';
import { Disclosure, ErrorText, Footer, Help, Rows, Stack } from './section';
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
  const [reviewing, setReviewing] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const previewText = useMemo(() => preview ? JSON.stringify(preview.data, null, 2) : '', [preview]);
  const root = useRef<HTMLDivElement>(null);
  const action = useAction();
  useEffect(() => { if (root.current?.parentElement) wireScrollers(root.current.parentElement) }, [preview]);
  const save = (enabled: boolean) => void action.run('save', (signal) =>
    apiSend<LibrarySharingState>('/api/configuration/library-sharing', {
      enabled, schema: value.schema, consent: accepted, preview_token: preview?.token,
    }, 'POST', signal), (saved) => {
    setValue(saved); setPreview(null); setAccepted(false); setReviewing(false); receipt('已保存馆藏与口味上传选项');
  });
  const downloadPreview = () => {
    const url = URL.createObjectURL(new Blob([previewText], { type: 'application/json' }));
    const anchor = document.createElement('a');
    anchor.href = url; anchor.download = 'peach-library-taste-preview.json';
    document.body.append(anchor);
    try { anchor.click() } finally {
      anchor.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000);
    }
  };
  return <>
    <Rows><SettingsRow label="上传馆藏与口味明细" description={value.notice}>
      <Switch aria-label="上传馆藏与口味明细" isSelected={value.enabled}
        onChange={(enabled) => enabled ? setReviewing(true) : save(false)}
        {...busyProps(action.busy === 'save')} />
    </SettingsRow></Rows>
    {!value.available ? <Stack divided><Help>上传服务未配置。</Help></Stack> : null}
    {value.enabled && value.last_attempt?.status === 'failed'
      ? <Stack divided><ErrorText>馆藏与口味上传失败，自动重试。</ErrorText></Stack> : null}
    {reviewing ? <Stack divided>
      <ul className="list-disc space-y-2 pl-5 text-body-2-regular text-text-secondary">
        {value.fields.map((field) => <li key={field}>{field}</li>)}
      </ul>
      <Help>不含账号、设备、文件路径和浏览器历史记录等个人数据。</Help>
    </Stack> : null}
    {preview ? <Stack divided>
      <Help>当前预览包含 {preview.data.library.length} 部作品，约 {(preview.bytes / 1024).toFixed(1)} KiB。</Help>
      <Disclosure summary="上传数据预览" defaultOpen>
        <div ref={root} className="ui-geist-scroller" data-geist-scroller>
          <div className="ui-geist-scroller-overlay" aria-hidden />
          <div className="ui-geist-scroller-container max-h-80" data-overflow="y" tabIndex={0} aria-label="馆藏与口味上传预览">
            <pre className="whitespace-pre-wrap break-all text-caption-1-regular">{previewText.slice(0, 24000)}</pre>
          </div>
        </div>
      </Disclosure>
      {previewText.length > 24000 ? <Help>屏幕显示前 24,000 个字符，下载可查看完整内容。</Help> : null}
      <Button variant="secondary" onClick={downloadPreview}>下载完整预览</Button>
      {!value.enabled ? <Checkbox isSelected={accepted} onChange={setAccepted}>我已查看字段与预览，同意上传馆藏与口味明细</Checkbox> : null}
    </Stack> : null}
    {action.error ? <Stack divided><ErrorText>{action.error}</ErrorText></Stack> : null}
    <Footer>
      <Button variant="secondary" onClick={() => { setReviewing(true); void action.run('preview',
        (signal) => apiGet<Preview>('/api/configuration/library-sharing/preview', signal),
        (data) => { setPreview(data); setAccepted(false) }) }}
        {...busyProps(action.busy === 'preview')}>预览上传内容</Button>
      {!value.enabled && preview ? <Button disabled={!accepted} onClick={() => save(true)}
        {...busyProps(action.busy === 'save')}>同意并开启上传</Button> : null}
      {reviewing && !value.enabled ? <Button variant="secondary" onClick={() => {
        setReviewing(false); setPreview(null); setAccepted(false);
      }}>取消</Button> : null}
    </Footer>
  </>;
}
