import { fmtSize } from '@peach/legacy/core';
import type { ProcessingTraffic } from './library-processing';
import { useOverlayScrollbar } from '../components/overlay-scrollbar';
import { SourceLabel } from '../components/source-label';
import { Disclosure, SourceMark } from '../settings/section';

const size = (value: number) => fmtSize(value).replace(/\s/g, '');
const range = (low: number, high: number) => {
  if (low === high) return size(high);
  const [start, startUnit] = fmtSize(low).split(' ');
  const [end, endUnit] = fmtSize(high).split(' ');
  return startUnit === endUnit ? `${start}-${end}${endUnit}` : `${size(low)}-${size(high)}`;
};
const forecast = (expected: number | undefined, low: number, high: number) => expected === undefined
  ? range(low, high) : `${expected > 0 ? '约 ' : ''}${size(expected)}`;

/** 确认弹窗、任务卡和管理页共用逐目录分账。 */
export function TrafficProgress({ traffic, initial = false, detailsOpen, onDetailsChange }: {
  traffic?: ProcessingTraffic; initial?: boolean; detailsOpen?: boolean; onDetailsChange?(open: boolean): void;
}) {
  const list = useOverlayScrollbar<HTMLUListElement>();
  if (!traffic) return null;
  return <div data-processing-traffic="" className="flex min-w-0 flex-col gap-2 text-caption-1-regular text-text-secondary tabular-nums wrap-anywhere">
    <dl className="inline-grid grid-cols-2 items-baseline gap-x-4 gap-y-1">
      {!initial ? <><dt>已用流量</dt><dd className="text-right text-text-primary">{traffic.partial ? '约 ' : ''}{size(traffic.used_bytes)}</dd></> : null}
      <dt>预计总流量</dt><dd className="text-right text-body-2-medium text-text-primary">{forecast(traffic.estimated_bytes, traffic.estimated_min_bytes, traffic.estimated_max_bytes)}</dd>
      <dt>其中代理流量</dt><dd className="text-right">{initial ? '' : `已用 ${size(traffic.metered_used_bytes)} / 预计 `}{forecast(traffic.metered_estimated_bytes, traffic.metered_estimated_min_bytes, traffic.metered_estimated_max_bytes)}</dd>
    </dl>
    <Disclosure summary="查看明细" trailing isOpen={detailsOpen} onOpenChange={onDetailsChange}>
      <div className="relative min-w-0">
      <ul ref={list} className="flex max-h-48 flex-col overflow-y-auto overscroll-contain pr-2">
        {traffic.sources.map(source => <li key={source.key} className="flex min-w-0 flex-col gap-1 border-b border-separator-border py-2 last:border-b-0">
          <div className="flex min-w-0 items-start justify-between gap-2">
            {source.root ? <SourceLabel source={source.location} label={source.label} />
              : <span className="inline-flex min-w-0 items-center gap-1.5"><SourceMark mark="globe" />{source.label}</span>}
            <span className="shrink-0">{source.metered ? '代理' : '直连'}</span>
          </div>
          <div className="flex flex-wrap justify-between gap-x-4 text-text-tertiary">
            {!initial ? <span>已用{source.unobserved.length ? '约' : ''} {size(source.used_bytes)}</span> : null}
            <span>预计 {forecast(source.estimated_bytes, source.estimated_min_bytes, source.estimated_max_bytes)}</span>
          </div>
        </li>)}
      </ul>
      </div>
    </Disclosure>
  </div>;
}
