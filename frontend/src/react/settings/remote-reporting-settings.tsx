import { useState } from 'react';

import { SettingsRow } from '@/components/application/settings/settings-rows';
import { Button } from '@/components/base/buttons/button';
import { Switch } from '@/components/base/switch/switch';

import { apiSend } from '../../api';
import { ErrorText, Footer, Help, Rows, Section, Stack } from './section';
import { busyProps, useAction } from './use-action';

export interface RemoteReportingState {
  usage: boolean; errors: boolean; available: boolean;
  fields: { usage: string; errors: string }; notice: string;
}

export function ReportingChoices({ value, onChange }: {
  value: RemoteReportingState; onChange(value: RemoteReportingState): void;
}) {
  return <>
    <Rows>
      <SettingsRow label="发送版本统计与错误诊断（推荐）" description={`${value.fields.usage} ${value.fields.errors}`}>
        <Switch aria-label="发送版本统计与错误诊断（推荐）" isSelected={value.usage && value.errors}
          onChange={(enabled) => onChange({ ...value, usage: enabled, errors: enabled })} />
      </SettingsRow>
    </Rows>
    <Stack divided>
      <Help>{value.notice}</Help>
      {!value.available ? <Help>此版本尚未配置诊断接收端，当前不会发送；选项保存在本机。</Help> : null}
    </Stack>
  </>;
}

export function RemoteReportingSettings({ initial, receipt }: {
  initial: RemoteReportingState; receipt(message: string): void;
}) {
  const [value, setValue] = useState(initial);
  const action = useAction();
  return <Section title="版本统计与错误诊断" onSubmit={(event) => {
    event.preventDefault();
    void action.run('save', (signal) => apiSend<RemoteReportingState>('/api/configuration/remote-reporting',
      { usage: value.usage, errors: value.errors }, 'POST', signal), (saved) => {
      setValue(saved); receipt('已保存诊断选项');
    });
  }}>
    <ReportingChoices value={value} onChange={setValue} />
    {action.error ? <Stack divided><ErrorText>{action.error}</ErrorText></Stack> : null}
    <Footer><Button type="submit" {...busyProps(action.busy === 'save')}>保存配置</Button></Footer>
  </Section>;
}
