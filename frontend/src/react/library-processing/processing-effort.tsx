/* Effort 公开演示的三档领域适配；视觉参数与证据登记在 HANDOFF。 */
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { Label, Popover, Slider, SliderThumb, SliderTrack } from 'react-aria-components';
import { RiArrowDownSLine } from '@remixicon/react';
import { Button } from '@/components/base/buttons/button';
import { MENU_POPOVER_SURFACE } from '@/components/base/dropdown/menu-styles';
import { MenuDialog } from '../components/menu-dialog';
import type { ProcessingSpeed } from './library-processing';

const MODES: ProcessingSpeed[] = ['low', 'standard', 'high'];
const LABELS = ['低占用', '标准', '全速'];

/** 流光只在最高档浮层可见时运行，暂停、后台页及系统减弱动效时静止。 */
function EffortFlow({ animate }: { animate: boolean }) {
  const [hidden, setHidden] = useState(document.hidden);
  useEffect(() => {
    const changed = () => setHidden(document.hidden);
    document.addEventListener('visibilitychange', changed);
    return () => document.removeEventListener('visibilitychange', changed);
  }, []);
  return <div aria-hidden="true" data-effort-flow="" data-motion={animate && !hidden ? 'running' : 'paused'}>
    <svg viewBox="0 0 240 27" preserveAspectRatio="none">
      <path className="processing-flow-outer" d="M35 13 Q85 8 130 10 Q180 11 240 2 L240 25 Q180 17 130 17 Q80 18 35 13Z" />
      <path className="processing-flow-middle" d="M60 13 Q120 10 170 12 L240 6 L240 22 Q180 16 130 15 Q95 17 60 13Z" />
      <path className="processing-flow-core" d="M100 13 Q160 12 240 10 L240 18 Q170 14 100 13Z" />
    </svg>
    {Array.from({ length: 12 }, (_, at) => <i key={at} style={{ '--particle-y': `${(at * 7 + 3) % 25}px`, '--particle-delay': `${-at * .13}s` } as CSSProperties} />)}
  </div>;
}

export function ProcessingMode({ value, busy, onChange, animate = true }: {
  value: ProcessingSpeed; busy: boolean; onChange(value: ProcessingSpeed): void; animate?: boolean;
}) {
  const trigger = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const index = Math.max(0, MODES.indexOf(value));
  const [draft, setDraft] = useState(index);
  useEffect(() => { if (!busy) setDraft(index) }, [index, busy]);
  return <>
    <Button ref={trigger} size="small" variant="secondary" aria-label={`处理速度：${LABELS[index]}`}
      aria-haspopup="dialog" aria-expanded={open} aria-disabled={busy}
      trailingIcon={RiArrowDownSLine} onClick={() => { if (!busy) setOpen(!open) }}>速度 · {LABELS[index]}</Button>
    <Popover triggerRef={trigger} isOpen={open} onOpenChange={setOpen} placement="top start" offset={8} className={MENU_POPOVER_SURFACE}>
      <MenuDialog aria-label="处理速度" className="processing-effort-panel flex flex-col gap-3 p-2 outline-none">
        <p className="text-body-medium"><span className="text-text-tertiary">处理强度 </span>{LABELS[draft]}</p>
        <div className="flex justify-between text-caption-1-regular text-text-tertiary"><span>最慢</span><span>最快</span></div>
        <Slider aria-label="处理速度" minValue={0} maxValue={2} step={1} value={draft} isDisabled={busy}
          onChange={setDraft} onChangeEnd={next => { if (next !== index) onChange(MODES[next]!) }} className="processing-effort-slider">
          <Label className="processing-effort-label">处理速度</Label>
          <div className="processing-effort-track" data-max={draft === 2 || undefined}>
            <div className="processing-effort-fill" style={{ '--effort-fill': `${draft * 50}%` } as CSSProperties} />
            <div className="processing-effort-stops" aria-hidden="true"><i /><i /><i /></div>
            {draft === 2 ? <EffortFlow animate={animate} /> : null}
            <SliderTrack className="processing-effort-hit">
              <SliderThumb aria-label={LABELS[draft]} className="processing-effort-thumb" />
            </SliderTrack>
          </div>
        </Slider>
        <div className="flex justify-between text-caption-1-regular text-text-tertiary"><span>占用少</span><span>占用多</span></div>
        <div className="flex justify-between text-caption-1-regular text-text-secondary" aria-hidden="true"><span>低占用</span><span>标准</span><span>全速</span></div>
      </MenuDialog>
    </Popover>
  </>;
}
