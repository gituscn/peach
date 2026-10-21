import { useQuery } from '@tanstack/react-query';
import { SettingsRow } from '@/components/application/settings/settings-rows';
import { Switch } from '@/components/base/switch/switch';
import { Select, SelectItem } from '@/components/base/select/select';

import { apiGet, apiSend, errorMessage } from '../../api';
import { queryClient } from '../query';
import { THUMBNAIL_JOBS_KEY } from '../settings-panel/settings-data';
import { LIBRARY_PROCESSING_KEY } from '../library-processing/library-processing';
import { ErrorText, Help, Rows, Section, Stack } from './section';
import { useAction } from './use-action';
import { VideoThumbnailControls } from './service-preferences';

const KEY = ['media-processing'] as const;
interface Policy { metadata_only: boolean; preview_acceleration?: 'auto' | 'software'; playback_acceleration?: 'auto' | 'software' }

export function MediaProcessingSettings({ receipt }: { receipt(message: string): void }) {
  const policy = useQuery({ queryKey: KEY, queryFn: ({ signal }) => apiGet<Policy>('/api/media-processing', signal) });
  const action = useAction();
  const playbackAction = useAction();
  const error = action.error || (policy.error ? errorMessage(policy.error) : '');
  const acceleration = (key: 'preview_acceleration' | 'playback_acceleration', label: string, description: string) => {
    const save = key === 'playback_acceleration' ? playbackAction : action;
    return <SettingsRow label={label} description={description}>
        <div id={key === 'playback_acceleration' ? 'playbackAccelerationSetting' : 'previewAccelerationSetting'}>
        <Select aria-label={label} selectedKey={policy.data?.[key] || 'auto'}
          isDisabled={!policy.data || policy.isFetching || !!save.busy}
          onSelectionChange={(mode) => {
            if (mode === null) return;
            void save.run(key, (signal) => apiSend<Policy>('/api/media-processing',
              { [key]: String(mode) }, 'POST', signal), (saved) => {
              queryClient.setQueryData(KEY, saved);
              receipt(`已保存${label}`);
            });
          }}>
          <SelectItem id="auto">自动（推荐）</SelectItem>
          <SelectItem id="software">仅软件</SelectItem>
        </Select>
        </div>
      </SettingsRow>;
  };
  return <>
    <Section title="视频预览">
    <Rows>
      {acceleration('preview_acceleration', '抽帧加速', '用于封面、九宫格与时间轴预览；自动模式失败后回退软件。保存后用于新任务。')}
      <SettingsRow label="生成视频预览" description="为本地视频生成九宫格与时间轴预览；关闭后仍按入库规则探测时长与分辨率。">
        <Switch aria-label="生成视频预览" isSelected={!!policy.data && !policy.data.metadata_only}
          isDisabled={!policy.data || policy.isFetching || !!action.busy}
          onChange={(value) => void action.run('save', (signal) =>
            apiSend<Policy>('/api/media-processing', { metadata_only: !value }, 'POST', signal), (saved) => {
              queryClient.setQueryData(KEY, saved);
              void queryClient.invalidateQueries({ queryKey: THUMBNAIL_JOBS_KEY });
              void queryClient.invalidateQueries({ queryKey: LIBRARY_PROCESSING_KEY });
              receipt(saved.metadata_only ? '已关闭视频预览生成' : '已开启视频预览生成');
            })} />
      </SettingsRow>
    </Rows>
    <VideoThumbnailControls disabled={!policy.data || policy.data.metadata_only || !!action.busy} />
    {action.busy ? <Stack divided><Help role="status">正在保存…</Help></Stack> : null}
    {error ? <Stack divided><ErrorText>{error}</ErrorText></Stack> : null}
    </Section>
    <Section title="视频播放">
      <Rows>{acceleration('playback_acceleration', '播放转码加速', '仅控制 Peach 服务端转码，不改变浏览器自身解码。保存后用于新任务，正在运行的任务继续完成。')}</Rows>
      {playbackAction.busy ? <Stack divided><Help role="status">正在保存…</Help></Stack> : null}
      {playbackAction.error ? <Stack divided><ErrorText>{playbackAction.error}</ErrorText></Stack> : null}
    </Section>
  </>;
}
