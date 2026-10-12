import { icon } from '@peach/legacy/core';
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode, type RefObject } from 'react';
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
export function MediaCarousel({ items, position, onSelect, below = false, renderThumbnail }: {
  items: readonly CarouselMedia[]; position: number; onSelect(index: number): void;
  below?: boolean; renderThumbnail?(item: CarouselMedia): ReactNode;
}) {
  const root = useRef<HTMLDivElement>(null);
  const [fits, setFits] = useState(true);
  const mixed = items.some(item => item.video);
  useLayoutEffect(() => {
    const strip = root.current?.querySelector<HTMLElement>('[data-media-thumbnails]');
    const selected = strip?.querySelector<HTMLElement>('[aria-current="true"]');
    if (!strip || !selected) return;
    const left = selected.offsetLeft - strip.offsetLeft;
    if (left < strip.scrollLeft || left + selected.offsetWidth > strip.scrollLeft + strip.clientWidth)
      strip.scrollLeft = left - (strip.clientWidth - selected.offsetWidth) / 2;
  }, [position, items.length]);
  useLayoutEffect(() => {
    const wrapper = root.current;
    const frame = wrapper?.closest<HTMLElement>('[data-stage-media]');
    if (!wrapper || !frame) return;
    const measure = () => {
      if (!frame.clientWidth) return;
      if (below) {
        const media = [...frame.querySelectorAll<HTMLElement>('[data-jav-picture], [data-catalog-picture], .video-js')].find(node => node.offsetWidth > 0);
        const bounds = frame.getBoundingClientRect(), picture = media?.getBoundingClientRect();
        const center = picture ? picture.y - bounds.y + picture.height / 2 : (wrapper.getBoundingClientRect().y - bounds.y) / 2;
        wrapper.style.setProperty('--media-arrow-top', `${Math.max(0, center)}px`);
      }
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
  }, [items.length, mixed, position, below]);
  if (items.length < 2) return null;
  const step = (delta: number) => onSelect(items[(position + delta + items.length) % items.length]!.index);
  const unit = mixed ? '项媒体' : '张图片';
  const indicator = (item: CarouselMedia, index: number) => <button key={item.index} type="button" data-follow-image-item={item.index}
    data-carousel-video={item.video ? '' : undefined} aria-current={index === position ? 'true' : 'false'}
    aria-label={item.label || `第 ${index + 1} 张，共 ${items.length} 张`} title={item.label || `第 ${index + 1} 张`}
    onClick={() => onSelect(item.index)}>{item.video ? <span dangerouslySetInnerHTML={{ __html: icon('play') }} /> : null}</button>;
  return <div ref={root} data-media-carousel="" data-carousel-below={below ? '' : undefined}>
    <button type="button" data-follow-image-step="-1" data-follow-image-arrow="prev" aria-label={mixed ? '上一项媒体' : '上一张图片'} title="上一张"
      onClick={() => step(-1)} dangerouslySetInnerHTML={{ __html: icon('chevron-left') }} />
    <button type="button" data-follow-image-step="1" data-follow-image-arrow="next" aria-label={mixed ? '下一项媒体' : '下一张图片'} title="下一张"
      onClick={() => step(1)} dangerouslySetInnerHTML={{ __html: icon('chevron-right') }} />
    {renderThumbnail ? <div data-media-thumbnails="" role="group" aria-label="媒体缩略图">{items.map((item, index) =>
      <MediaThumbnail key={item.index} item={item} selected={index === position} label={item.label || `第 ${index + 1} 张`}
        onSelect={onSelect} render={renderThumbnail} />)}</div> : null}
    {items.length > MEDIA_DOTS_MAX || !fits ? <span data-follow-image-count="" aria-live="polite" aria-label={`第 ${position + 1} 项，共 ${items.length} 项`}>
      {`${(position + 1).toLocaleString()} / ${items.length.toLocaleString()}`}
    </span> : <div data-follow-image-dots="" role="group" aria-label={`${items.length} ${unit}`}>
      {items.map((item, index) => indicator(item, index))}
    </div>}
  </div>;
}

/** 常驻缩略图条只读取已进入可见范围的小图。 */
function MediaThumbnail({ item, selected, label, onSelect, render }: {
  item: CarouselMedia; selected: boolean; label: string; onSelect(index: number): void; render(item: CarouselMedia): ReactNode;
}) {
  const node = useRef<HTMLButtonElement>(null);
  const [visible, setVisible] = useState(typeof IntersectionObserver === 'undefined');
  useEffect(() => {
    if (!node.current || visible) return;
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { setVisible(true); observer.disconnect() }
    }, { rootMargin: '100px' });
    observer.observe(node.current);
    return () => observer.disconnect();
  }, [visible]);
  return <button ref={node} type="button" data-media-thumbnail={item.index} aria-current={selected ? 'true' : 'false'}
    aria-label={`切换到${label}`} title={label} onClick={() => onSelect(item.index)}>
    {visible ? render(item) : <span className="block h-full w-full skeleton-sheen" />}
    {item.video ? <span data-media-thumbnail-play="" aria-hidden dangerouslySetInnerHTML={{ __html: icon('play') }} /> : null}
  </button>;
}
