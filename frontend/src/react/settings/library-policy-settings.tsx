/* 每个媒体库的来源色与处理方式（第 2、4、5 条的推荐版原型）。
 *
 * 一个媒体库一行：名称、来源色、处理方式。三档处理方式的说明在表头下只写一次；
 * 只有选了「自定义」的那一行才展开五个步骤。来源色默认不上色，点开色球选一档强调色。
 * 原型阶段处理方式只在本页演示，不随「保存配置」提交；来源色记在本浏览器。 */
import { useRef, useState } from 'react';
import { Dialog, Popover } from 'react-aria-components';
import { UNSAFE_PortalProvider } from 'react-aria';

import { Checkbox } from '@/components/base/checkbox/checkbox';
import { MENU_POPOVER_SURFACE } from '@/components/base/dropdown/menu-styles';
import { Select, SelectItem } from '@/components/base/select/select';
import { ACCENT_CHOICES } from '@peach/appearance';
import { setLibraryColor, useLibraryTints, type LibraryTint } from '../components/library-tint';
import { overlayHost } from '../components/overlay-host';
import { Note } from '../components/note';
import { Disclosure, Help, Section, SourceMark, Stack } from './section';
import '../components/glow-preset-grid.css';
import './library-policy-settings.css';

type Preset = 'auto' | 'local' | 'custom';
const STAGES = [
  ['probe', '读取视频信息'],
  ['metadata', '联网补资料'],
  ['cover', '联网补封面'],
  ['people', '联网补人物图片'],
  ['preview', '生成九宫格预览'],
] as const;
type Stage = (typeof STAGES)[number][0];
const AUTO_STAGES: readonly Stage[] = ['probe', 'metadata', 'cover', 'people', 'preview'];

export function LibraryPolicySettings() {
  const tints = useLibraryTints();
  const [presets, setPresets] = useState<Record<string, Preset>>({});
  const [stages, setStages] = useState<Record<string, readonly Stage[]>>({});
  const libraries = [...tints.values()];
  if (!libraries.length) return null;
  return (
    <Section title="媒体库来源色与处理方式">
      <Stack>
        <Note tone="neutral" title="预览">推荐方案的原型：来源色记在本浏览器，处理方式不会保存。</Note>
        <Help>每个媒体库都会先读本地 NFO 和同目录图片，三种处理方式的差别只在联不联网：</Help>
        <dl data-policy-legend="" className="text-body-2-regular text-text-secondary">
          <dt>自动补全</dt><dd>缺什么联网补什么。本地只有竖版海报时联网找完整封套，找不到就用竖版；FC2 商品图本来就是竖版，不另找。</dd>
          <dt>仅使用本地资料</dt><dd>不联网补资料、封面和人物图片；只有竖版海报时直接用它。仍读取视频信息、生成九宫格预览。</dd>
          <dt>自定义</dt><dd>逐项选择。关掉的步骤显示为「已跳过」，不算失败也不自动重试，以后打开会补跑。</dd>
        </dl>
        <div role="table" aria-label="媒体库来源色与处理方式" data-policy-table="">
          <div role="row" data-policy-head="">
            <span role="columnheader">媒体库</span><span role="columnheader">来源色</span><span role="columnheader">处理方式</span>
          </div>
          {libraries.map((library) => {
            const preset = presets[library.id] ?? 'auto';
            const chosen = stages[library.id] ?? AUTO_STAGES;
            return (
              <div role="rowgroup" key={library.id} data-policy-group="">
                <div role="row" data-policy-row="">
                  <span role="cell" className="flex min-w-0 items-center gap-2 text-text-primary">
                    <SourceMark mark={library.icon} />
                    <span className="truncate">{library.name}</span>
                  </span>
                  <span role="cell"><ColorPicker library={library} /></span>
                  <span role="cell">
                    <Select className="w-full" aria-label={`${library.name} 处理方式`} selectedKey={preset}
                      onSelectionChange={key => setPresets(current => ({ ...current, [library.id]: String(key) as Preset }))}>
                      <SelectItem id="auto">自动补全</SelectItem>
                      <SelectItem id="local">仅使用本地资料</SelectItem>
                      <SelectItem id="custom">自定义</SelectItem>
                    </Select>
                  </span>
                </div>
                {preset === 'custom' ? (
                  <Disclosure defaultOpen summary={`${library.name} 的处理步骤（${chosen.length}/${STAGES.length}）`}>
                    <div className="flex flex-wrap gap-x-6 gap-y-2" role="group" aria-label={`${library.name} 处理步骤`}>
                      {STAGES.map(([key, label]) => (
                        <Checkbox key={key} isSelected={chosen.includes(key)}
                          onChange={(on) => setStages(current => ({
                            ...current,
                            [library.id]: on ? [...chosen, key] : chosen.filter(stage => stage !== key),
                          }))}>
                          {label}
                        </Checkbox>
                      ))}
                    </div>
                  </Disclosure>
                ) : null}
              </div>
            );
          })}
        </div>
      </Stack>
    </Section>
  );
}

/** 一颗显示当前来源色的球；点开是「无颜色」加十二档强调色。 */
function ColorPicker({ library }: { library: LibraryTint }) {
  const trigger = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const label = ACCENT_CHOICES.find(([key]) => key === library.color)?.[1] || '无颜色';
  const choose = (color: string) => { setLibraryColor(library.id, color); setOpen(false) };
  return <>
    <button ref={trigger} type="button" data-glow-chip="" data-library-color-trigger="" aria-haspopup="dialog"
      aria-expanded={open} aria-label={`${library.name} 来源色：${label}`} title={label} onClick={() => setOpen(true)}>
      {library.color
        ? <span data-glow-ball="" aria-hidden="true" data-accent-ball={library.color} />
        : <span data-glow-ball="" data-library-none="" aria-hidden="true" />}
      <span>{label}</span>
    </button>
    <UNSAFE_PortalProvider getContainer={() => overlayHost(trigger.current)}>
      <Popover triggerRef={trigger} isOpen={open} onOpenChange={setOpen} placement="bottom start" offset={8}
        containerPadding={12} className={MENU_POPOVER_SURFACE}>
        <Dialog aria-label={`${library.name} 来源色`} className="outline-none">
          <div data-accent-grid="" data-library-colors="" role="group">
            <button type="button" data-glow-chip="" aria-pressed={!library.color} title="无颜色" aria-label="无颜色"
              onClick={() => choose('')}>
              <span data-glow-ball="" data-library-none="" aria-hidden="true" />
            </button>
            {ACCENT_CHOICES.map(([key, name]) => (
              <button type="button" key={key} data-glow-chip="" aria-pressed={key === library.color} title={name} aria-label={name}
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
