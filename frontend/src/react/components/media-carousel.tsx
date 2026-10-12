import { icon } from '@peach/legacy/core';
import { useLayoutEffect, useRef, useState, type RefObject } from 'react';
import './media-carousel.css';

export const MEDIA_DOTS_MAX = 20;
export interface CarouselMedia { index: number; label?: string; video?: boolean }

/** 翻页箭头按 contain 图片的黑边居中；窄边保留安全内距。 */
export function useCarouselInset(frame: RefObject<HTMLDivElement | null>, selector: string, mediaKey: string | number) {
  const [inset, setInset] = useState<number | null>(null);
  useLayoutEffect(() => {
    const box = frame.current;
    if (!box) return;
    const align = () => {
      const image = box.querySelector<HTMLImageElement>(selector);
      const arrow = box.querySelector<HTMLElement>('[data-follow-image-step]');
      if (!image?.naturalWidth || !image.naturalHeight || !arrow) return;
      const rect = box.getBoundingClientRect();
      const rendered = Math.min(rect.width, rect.height * image.naturalWidth / image.naturalHeight);
      const gutter = Math.max(0, (rect.width - rendered) / 2);
      const safe = matchMedia('(max-width:640px)').matches ? 10 : 16;
      setInset(Math.round(gutter >= arrow.offsetWidth + safe * 2 ? (gutter - arrow.offsetWidth) / 2 : safe));
    };
    const observer = new ResizeObserver(align);
    observer.observe(box);
    box.addEventListener('load', align, true);
    align();
    return () => { observer.disconnect(); box.removeEventListener('load', align, true) };
  }, [frame, selector, mediaKey]);
  return inset;
}

/** 关注与作品预览共用环形切换、圆点与大集合计数。 */
export function MediaCarousel({ items, position, onSelect }: {
  items: readonly CarouselMedia[]; position: number; onSelect(index: number): void;
}) {
  const root = useRef<HTMLDivElement>(null);
  const [fits, setFits] = useState(true);
  const mixed = items.some(item => item.video);
  useLayoutEffect(() => {
    const wrapper = root.current;
    const frame = wrapper?.closest<HTMLElement>('[data-stage-media]');
    if (!wrapper || !frame) return;
    const measure = () => {
      if (!frame.clientWidth) return;
      const style = getComputedStyle(wrapper);
      const value = (name: string) => parseFloat(style.getPropertyValue(name));
      const size = value('--media-dot-size'), selected = value('--media-dot-selected');
      const needed = value('--media-dot-padding') * 2 + Math.max(0, items.length - 1) * value('--media-dot-gap')
        + items.length * size + (selected - size) * (mixed ? 2 : 1);
      if (!Number.isFinite(needed)) return;
      setFits(needed <= frame.clientWidth - value('--media-dot-room'));
    };
    const observer = new ResizeObserver(measure);
    observer.observe(frame);
    measure();
    return () => observer.disconnect();
  }, [items.length, mixed]);
  if (items.length < 2) return null;
  const step = (delta: number) => onSelect(items[(position + delta + items.length) % items.length]!.index);
  const unit = mixed ? '项媒体' : '张图片';
  return <div ref={root} data-media-carousel="">
    <button type="button" data-follow-image-step="-1" data-follow-image-arrow="prev" aria-label={mixed ? '上一项媒体' : '上一张图片'} title="上一张"
      onClick={() => step(-1)} dangerouslySetInnerHTML={{ __html: icon('chevron-left') }} />
    <button type="button" data-follow-image-step="1" data-follow-image-arrow="next" aria-label={mixed ? '下一项媒体' : '下一张图片'} title="下一张"
      onClick={() => step(1)} dangerouslySetInnerHTML={{ __html: icon('chevron-right') }} />
    {items.length > MEDIA_DOTS_MAX || !fits ? <span data-follow-image-count="" aria-live="polite" aria-label={`第 ${position + 1} 项，共 ${items.length} 项`}>
      {`${(position + 1).toLocaleString()} / ${items.length.toLocaleString()}`}
    </span> : <div data-follow-image-dots="" role="group" aria-label={`${items.length} ${unit}`}>
      {items.map((item, index) => <button type="button" key={item.index} data-follow-image-item={item.index}
        data-carousel-video={item.video ? '' : undefined} aria-current={index === position ? 'true' : 'false'}
        aria-label={item.label || `第 ${index + 1} 张，共 ${items.length} 张`} title={item.label || `第 ${index + 1} 张`}
        onClick={() => onSelect(item.index)}>{item.video ? <span dangerouslySetInnerHTML={{ __html: icon('play') }} /> : null}</button>)}
    </div>}
  </div>;
}
