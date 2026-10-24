import { useEffect, useState } from 'react';
import { Button } from '@/components/base/buttons/button';
import { Input } from '@/components/base/input/input';
import { apiGet, apiSend } from '../../api';
import { SelectField } from '../settings-panel/legacy-controls';
import { Disclosure, ErrorText, Help, Stack } from '../settings/section';
import { busyProps, useAction } from '../settings/use-action';

const KEY = 'peach.external-player.v1';
const PLAYERS = [['m3u', 'M3U 播放列表'], ['vlc-ios', 'VLC（iPhone / iPad）'], ['iina', 'IINA（Mac）']] as const;

export function playerLink(player: string, url: string, playlist: string): string {
  if (player === 'vlc-ios') return `vlc-x-callback://x-callback-url/stream?url=${encodeURIComponent(url)}`;
  if (player === 'iina') return `iina://weblink?url=${encodeURIComponent(url)}`;
  return playlist;
}

export function LocalPlayback({ id, onOpened }: { id: number; onOpened?(): void }) {
  const [players, setPlayers] = useState<{ id: string; label: string }[]>([]);
  const [player, setPlayer] = useState(() => {
    try { return localStorage.getItem('peach.local-player.v1') || 'default' } catch { return 'default' }
  });
  const [loadError, setLoadError] = useState('');
  const [epoch, setEpoch] = useState(0);
  const action = useAction();
  useEffect(() => {
    const controller = new AbortController();
    apiGet<{ players: { id: string; label: string }[] }>('/api/local-players', controller.signal).then(result => {
      if (controller.signal.aborted) return;
      setPlayers(result.players);
      setPlayer(current => result.players.some(item => item.id === current) ? current : 'default');
    }).catch(cause => { if (!controller.signal.aborted) setLoadError(String(cause.message || cause)) });
    return () => controller.abort();
  }, [epoch]);
  if (!players.length && !loadError) return null;
  return <div data-local-playback="">
    {players.length ? <div data-local-playback-row="">
      <SelectField id={`local-player-${id}`} label="本地播放器" options={players.map(item => [item.id, item.label] as const)}
        value={player} epoch={epoch} onPick={value => {
          setPlayer(value);
          try { localStorage.setItem('peach.local-player.v1', value) } catch { /* 浏览器未允许保存偏好。 */ }
        }} />
      <Button variant="secondary" aria-label="使用本地播放器打开" {...busyProps(action.busy === 'open')}
        onClick={() => void action.run('open', signal => apiSend(
          `/api/local-playback?id=${id}&player=${encodeURIComponent(player)}`, {}, 'POST', signal), () => {
            document.querySelector<HTMLVideoElement>('#stage video')?.pause();
            onOpened?.();
          })}>打开</Button>
    </div> : null}
    {loadError || action.error ? <ErrorText>{loadError || action.error}</ErrorText> : null}
    {loadError ? <Button variant="secondary" onClick={() => { setLoadError(''); setEpoch(value => value + 1) }}>重新检测播放器</Button> : null}
  </div>;
}

export function ExternalPlayback({ id }: { id: number }) {
  const [player, setPlayer] = useState(() => {
    try { return PLAYERS.find(([key]) => key === localStorage.getItem(KEY))?.[0] || 'm3u' } catch { return 'm3u' }
  });
  const [links, setLinks] = useState<{ url: string; playlist: string } | null>(null);
  const action = useAction();
  return <Disclosure key={id} summary="外部播放器 / VR">
    <Stack>
      <SelectField id={`external-player-${id}`} label="此设备的外部播放器" options={PLAYERS} value={player}
        epoch={0} onPick={(value) => {
          const selected = PLAYERS.find(([key]) => key === value)?.[0] || 'm3u';
          setPlayer(selected);
          try { localStorage.setItem(KEY, selected) } catch { /* 浏览器未允许保存偏好。 */ }
        }} />
      <Button variant="secondary" {...busyProps(action.busy === 'prepare')}
        onClick={() => void action.run('prepare', (signal) => apiSend<{ url: string; playlist: string }>(
          `/api/external-playback?id=${id}`, {}, 'POST', signal), (result) => setLinks({
            url: new URL(result.url, location.origin).href, playlist: new URL(result.playlist, location.origin).href,
          }))}>生成播放链接</Button>
      {action.error ? <ErrorText>{action.error}</ErrorText> : null}
      {links ? <>
        <a href={playerLink(player, links.url, links.playlist)} rel="noreferrer">
          {player === 'm3u' ? '下载 M3U 播放列表' : `打开 ${PLAYERS.find(([key]) => key === player)?.[1]}`}
        </a>
        <Input label="网络播放地址" value={links.url} isReadOnly />
        <Help>链接有效期为 6 小时。VR 播放器可使用网络播放地址；另一台设备需要能访问当前 Peach 地址。</Help>
      </> : null}
    </Stack>
  </Disclosure>;
}
