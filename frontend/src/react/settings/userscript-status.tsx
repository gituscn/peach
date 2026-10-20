/* 用户脚本通过同源桥接页回报版本与当前地址的配对状态。 */
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/base/buttons/button';
import { Note } from '../components/note';
import { LoadingDots } from '../components/loading-dots';
import { ExternalLink } from './section';
import { busyProps } from './busy-props';

interface Installed { version: string; paired: boolean }

function supported(version: string, minimumVersion: string) {
  const current = version.split('.').map(Number);
  const minimum = minimumVersion.split('.').map(Number);
  for (let index = 0; index < 3; index++) {
    if (current[index] !== minimum[index]) return current[index]! > minimum[index]!;
  }
  return true;
}

export function UserscriptStatus({ enabled, release }: {
  enabled: boolean; release: { version: string; minimum_version: string; install_url: string };
}) {
  const frame = useRef<HTMLIFrameElement>(null);
  const [attempt, setAttempt] = useState(0);
  const [status, setStatus] = useState<'checking' | 'missing' | Installed>('checking');
  useEffect(() => {
    const nonce = crypto.randomUUID();
    let settled = false;
    const probe = () => frame.current?.contentWindow?.postMessage({ type: 'peach-userscript:probe', nonce }, window.location.origin);
    const receive = (event: MessageEvent) => {
      if (settled || event.source !== frame.current?.contentWindow || event.origin !== window.location.origin
        || event.data?.type !== 'peach-userscript:ready' || event.data.nonce !== nonce || event.data.protocol !== 1
        || typeof event.data.version !== 'string' || !/^\d{1,5}\.\d{1,5}\.\d{1,5}$/.test(event.data.version)
        || typeof event.data.paired !== 'boolean') return;
      settled = true;
      clearInterval(interval);
      clearTimeout(timeout);
      setStatus({ version: event.data.version, paired: event.data.paired });
    };
    window.addEventListener('message', receive);
    const interval = setInterval(probe, 250);
    const timeout = setTimeout(() => {
      settled = true;
      clearInterval(interval);
      setStatus('missing');
    }, 3000);
    probe();
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
      window.removeEventListener('message', receive);
    };
  }, [attempt]);
  const installed = typeof status === 'object';
  const update = installed && !supported(status.version, release.minimum_version);
  const title = status === 'checking' ? '用户脚本'
    : status === 'missing' ? '未检测到用户脚本'
    : `用户脚本 v${status.version}${status.paired ? ' · 已配对当前 Peach' : ' · 尚未配对当前 Peach'}`;
  return <>
    <iframe ref={frame} key={attempt} title="Peach 用户脚本检测" hidden src="/integrations/peach-userscript-bridge" />
    <div aria-live="polite"><Note tone="neutral" title={title} action={<div className="flex flex-wrap items-center gap-2">
      {status === 'missing' || update ? <ExternalLink href={release.install_url}>{update ? '更新用户脚本' : '安装 Peach 用户脚本'}</ExternalLink> : null}
      <Button variant="secondary" size="small" type="button" {...busyProps(status === 'checking')}
        onClick={() => { if (status !== 'checking') { setStatus('checking'); setAttempt(value => value + 1); } }}>重新检测</Button>
    </div>}>
      {status === 'checking' ? <LoadingDots label="正在检测用户脚本" /> : status === 'missing'
        ? '安装或启用脚本后重新检测；旧版脚本需要更新后才能检测。'
        : update ? `请更新至 v${release.minimum_version} 或更高版本。`
        : status.paired ? enabled ? '可在支持的站点直接加入 Peach 馆藏。' : '启用浏览器添加后，可在支持的站点直接加入 Peach 馆藏。'
        : '生成令牌后复制配对信息，在用户脚本设置中粘贴并保存。'}
    </Note></div>
  </>;
}
