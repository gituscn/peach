import { useId, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { placePop } from '../entity-hero/hero-pop';

/** 图片只在悬停或键盘聚焦时读取；预览浮层复用原生顶层与资料卡定位。 */
export function MediaPreview({ label, children, render }: { label: string; children(description?: string): ReactNode; render(): ReactNode }) {
  const anchor = useRef<HTMLSpanElement>(null);
  const pop = useRef<HTMLDivElement>(null);
  const id = useId();
  const [open, setOpen] = useState(false);
  useLayoutEffect(() => {
    if (!open || !pop.current || !anchor.current) return;
    const node = pop.current;
    node.showPopover();
    const place = () => { if (anchor.current) placePop(anchor.current, node, true) };
    const close = () => setOpen(false);
    const observer = new ResizeObserver(place);
    observer.observe(node);
    addEventListener('scroll', close, true);
    addEventListener('resize', close);
    place();
    return () => {
      observer.disconnect();
      removeEventListener('scroll', close, true);
      removeEventListener('resize', close);
      if (node.matches(':popover-open')) node.hidePopover();
    };
  }, [open]);
  return <span ref={anchor} data-media-preview-anchor=""
    onPointerEnter={event => { if (event.pointerType !== 'touch') setOpen(true) }}
    onPointerLeave={() => { if (!anchor.current?.querySelector(':focus-visible')) setOpen(false) }}
    onFocus={event => { if (event.target.matches(':focus-visible')) setOpen(true) }} onBlur={() => setOpen(false)}
    onKeyDown={event => { if (event.key === 'Escape' && open) { event.preventDefault(); event.stopPropagation(); setOpen(false) } }}>
    {children(open ? id : undefined)}
    {open ? <div ref={pop} id={id} popover="manual" role="tooltip" className="ui-board-tooltip" data-media-preview-tip="">
      {render()}<span>{label}</span>
    </div> : null}
  </span>;
}
