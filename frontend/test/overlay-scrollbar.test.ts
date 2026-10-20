import { afterEach, expect, it, vi } from 'vitest';
import { attachOverlayScrollbar } from '../src/ui-kit/overlay-scrollbar';

afterEach(() => { document.body.replaceChildren(); vi.restoreAllMocks(); });

it('连续滚动按帧更新位置，内容尺寸变化后刷新滑块比例', async () => {
  const host=document.createElement('div'),container=document.createElement('div');
  host.append(container);document.body.append(host);
  const clock=document.createElement('span');clock.textContent='0:00';container.append(clock);
  let height=100,content=500;
  const measure=vi.fn(()=>height),measureContent=vi.fn(()=>content);
  Object.defineProperties(container,{
    clientHeight:{get:measure},scrollHeight:{get:measureContent},
    clientWidth:{get:()=>200},scrollWidth:{get:()=>200},
  });
  const frame:FrameRequestCallback[]=[];
  vi.spyOn(globalThis,'requestAnimationFrame').mockImplementation(callback=>{frame.push(callback);return frame.length});
  vi.spyOn(HTMLElement.prototype,'clientHeight','get').mockImplementation(function(this:HTMLElement){
    return this.classList.contains('ov-y')?84:0;
  });
  const sync=attachOverlayScrollbar(container)!;
  const thumb=host.querySelector<HTMLElement>('.ov-y .ovthumb')!;
  expect(thumb.style.height).toBe('24px');
  measure.mockClear();measureContent.mockClear();
  clock.textContent='0:01';
  await new Promise(resolve=>setTimeout(resolve,0));
  expect(measure).not.toHaveBeenCalled();expect(measureContent).not.toHaveBeenCalled();
  container.scrollTop=100;container.dispatchEvent(new Event('scroll'));
  container.scrollTop=200;container.dispatchEvent(new Event('scroll'));
  expect(frame).toHaveLength(1);
  frame.shift()!(16);
  expect(thumb.style.transform).toBe('translateY(30px)');
  expect(measure).not.toHaveBeenCalled();expect(measureContent).not.toHaveBeenCalled();
  expect(host.querySelector('.ui-ov-edges')!.classList.contains('ui-can-scroll-top')).toBe(true);
  content=300;sync();
  expect(thumb.style.height).toBe('28px');
  expect(thumb.style.transform).toBe('translateY(56px)');
  expect(host.querySelector('.ui-ov-edges')!.classList.contains('ui-can-scroll-bottom')).toBe(false);
  height=300;sync();
  expect(host.querySelector<HTMLElement>('.ov-y')!.hidden).toBe(true);
  expect(container.hasAttribute('data-scroll-edges')).toBe(false);
});

it('短轨道的滑块保持在可见范围内', () => {
  const host=document.createElement('div'),container=document.createElement('div');
  host.append(container);document.body.append(host);
  Object.defineProperties(container,{
    clientHeight:{get:()=>32},scrollHeight:{get:()=>500},
    clientWidth:{get:()=>32},scrollWidth:{get:()=>500},
  });
  vi.spyOn(HTMLElement.prototype,'clientHeight','get').mockImplementation(function(this:HTMLElement){
    return this.classList.contains('ov-y')?16:0;
  });
  vi.spyOn(HTMLElement.prototype,'clientWidth','get').mockImplementation(function(this:HTMLElement){
    return this.classList.contains('ov-x')?16:0;
  });
  container.scrollTop=468;container.scrollLeft=468;
  attachOverlayScrollbar(container);
  const vertical=host.querySelector<HTMLElement>('.ov-y .ovthumb')!;
  const horizontal=host.querySelector<HTMLElement>('.ov-x .ovthumb')!;
  expect(vertical.style.height).toBe('16px');
  expect(horizontal.style.width).toBe('16px');
  expect(vertical.style.transform).toBe('translateY(0px)');
  expect(horizontal.style.transform).toBe('translateX(0px)');
});
