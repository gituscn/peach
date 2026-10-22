/* 媒体库一级的来源色与处理方式（第 2、4、5 条的推荐版原型），由「媒体库与目录」按媒体库分组时
 * 放在每个媒体库的标题行里。三档处理方式的说明在分组上方只写一次；只有选了「自定义」的媒体库
 * 才展开五个步骤。来源色默认不上色，点开色球选一档强调色。
 * 原型阶段处理方式只在本页演示，不随「保存配置」提交；来源色记在本浏览器。 */
import { useRef, useState } from 'react';
import { Dialog, Popover } from 'react-aria-components';
import { UNSAFE_PortalProvider } from 'react-aria';

import { Checkbox } from '@/components/base/checkbox/checkbox';
import { MENU_POPOVER_SURFACE } from '@/components/base/dropdown/menu-styles';
import { Select, SelectItem } from '@/components/base/select/select';
import { ACCENT_CHOICES } from '@peach/appearance';
import { setLibraryColor, useLibraryTints } from '../components/library-tint';
import { overlayHost } from '../components/overlay-host';
import { Disclosure } from './section';
import '../components/glow-preset-grid.css';
import './library-policy-settings.css';

export type Preset = 'auto' | 'local' | 'custom';
export const STAGES = [
  ['probe', '读取视频信息'],
  ['metadata', '联网补资料'],
  ['cover', '联网补封面'],
  ['people', '联网补人物图片'],
  ['preview', '生成九宫格预览'],
] as const;
export type Stage = (typeof STAGES)[number][0];
export const AUTO_STAGES: readonly Stage[] = ['probe', 'metadata', 'cover', 'people', 'preview'];

/** 三档处理方式的说明，分组上方只放一份。 */
export function PolicyLegend() {
  return (
    <dl data-policy-legend="" className="text-body-2-regular text-text-secondary">
      <dt>自动补全</dt><dd>先读本地 NFO 和同目录图片，缺什么联网补什么。本地只有竖版海报时联网找完整封套，找不到就用竖版；FC2 商品图本来就是竖版，不另找。</dd>
      <dt>仅使用本地资料</dt><dd>只读本地 NFO 和同目录图片，不联网补资料、封面和人物图片；只有竖版海报时直接用它。仍读取视频信息、生成九宫格预览。</dd>
      <dt>自定义</dt><dd>逐项选择。关掉的步骤显示为「已跳过」，不算失败也不自动重试，以后打开会补跑。</dd>
    </dl>
  );
}

export function PresetSelect({ name, value, onChange }: { name: string; value: Preset; onChange(value: Preset): void }) {
  return (
    <Select className="w-full" aria-label={`${name} 处理方式`} selectedKey={value}
      onSelectionChange={key => onChange(String(key) as Preset)}>
      <SelectItem id="auto">自动补全</SelectItem>
      <SelectItem id="local">仅使用本地资料</SelectItem>
      <SelectItem id="custom">自定义</SelectItem>
    </Select>
  );
}

export function StageChooser({ name, value, onChange }: { name: string; value: readonly Stage[]; onChange(value: readonly Stage[]): void }) {
  return (
    <Disclosure defaultOpen summary={`${name} 的处理步骤（${value.length}/${STAGES.length}）`}>
      <div className="flex flex-wrap gap-x-6 gap-y-2" role="group" aria-label={`${name} 处理步骤`}>
        {STAGES.map(([key, label]) => (
          <Checkbox key={key} isSelected={value.includes(key)}
            onChange={(on) => onChange(on ? [...value, key] : value.filter(stage => stage !== key))}>
            {label}
          </Checkbox>
        ))}
      </div>
    </Disclosure>
  );
}

/** 一颗显示当前来源色的球；点开是「无颜色」加十二档强调色。 */
export function LibraryColorPicker({ id, name }: { id: string; name: string }) {
  const tints = useLibraryTints();
  const color = tints.get(id)?.color || '';
  const trigger = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const label = ACCENT_CHOICES.find(([key]) => key === color)?.[1] || '无颜色';
  const choose = (next: string) => { setLibraryColor(id, next); setOpen(false) };
  return <>
    <button ref={trigger} type="button" data-glow-chip="" data-library-color-trigger="" aria-haspopup="dialog"
      aria-expanded={open} aria-label={`${name || '未命名媒体库'} 来源色：${label}`} title={label} onClick={() => setOpen(true)}>
      {color
        ? <span data-glow-ball="" aria-hidden="true" data-accent-ball={color} />
        : <span data-glow-ball="" data-library-none="" aria-hidden="true" />}
      <span>{label}</span>
    </button>
    <UNSAFE_PortalProvider getContainer={() => overlayHost(trigger.current)}>
      <Popover triggerRef={trigger} isOpen={open} onOpenChange={setOpen} placement="bottom start" offset={8}
        containerPadding={12} className={MENU_POPOVER_SURFACE}>
        <Dialog aria-label={`${name || '未命名媒体库'} 来源色`} className="outline-none">
          <div data-accent-grid="" data-library-colors="" role="group">
            <button type="button" data-glow-chip="" aria-pressed={!color} title="无颜色" aria-label="无颜色"
              onClick={() => choose('')}>
              <span data-glow-ball="" data-library-none="" aria-hidden="true" />
            </button>
            {ACCENT_CHOICES.map(([key, choice]) => (
              <button type="button" key={key} data-glow-chip="" aria-pressed={key === color} title={choice} aria-label={choice}
                onClick={() => choose(key)}>
                <span data-glow-ball="" aria-hidden="true" data-accent-ball={key} />
              </button>
            ))}
          </div>
        </Dialog>
      </Popover>
    </UNSAFE_PortalProvider>
  </>;
}
