/* 每个媒体库的来源色与处理方式（第 2、4、5 条的推荐版原型）。
 *
 * 来源色绑定 `library_id`，取色与侧栏强调色同一组色球；处理方式三档：自动补全、仅使用本地资料、
 * 自定义。本地 NFO 与同目录图片在每一档都会读；三档的差别只在要不要联网，以及本地只有竖版
 * 海报时怎么处理封面。原型只在本页生效，不随「保存配置」提交。 */
import { useState } from 'react';

import { Checkbox } from '@/components/base/checkbox/checkbox';
import { Select, SelectItem } from '@/components/base/select/select';
import { ACCENT_CHOICES } from '@peach/appearance';
import { setLibraryColor, useLibraryTints } from '../components/library-tint';
import type { ConfigurationData } from '../bundle';
import { Note } from '../components/note';
import { FolderField, FolderFieldLine } from './folder-rows';
import { libraryAutoChoice } from './library-icon-picker';
import { Help, Section, SourceMark, Stack } from './section';
import '../components/glow-preset-grid.css';
import './library-policy-settings.css';

type Preset = 'auto' | 'local' | 'custom';
const STAGES = [
  ['probe', '读取视频信息', '时长、分辨率、编码；只读本机文件'],
  ['metadata', '联网补资料', '标题、演员、厂牌等 NFO 里缺的字段'],
  ['cover', '联网补封面', '本地没有封套，或封套不够清晰时'],
  ['people', '联网补人物图片', '女优头像与资料'],
  ['preview', '生成九宫格预览', '抽帧拼图，只读本机文件'],
] as const;
type Stage = (typeof STAGES)[number][0];
const PRESET_STAGES: Record<Exclude<Preset, 'custom'>, readonly Stage[]> = {
  auto: ['probe', 'metadata', 'cover', 'people', 'preview'],
  local: ['probe', 'preview'],
};
const PRESET_HELP: Record<Preset, string> = {
  auto: '先读本地 NFO 和同目录图片，缺什么再联网补。本地只有竖版海报时，联网找完整封套；找不到就用竖版。',
  local: '只用本地 NFO 和同目录图片，不联网补资料、封面和人物图片。本地只有竖版海报时直接用它当封面。',
  custom: '逐项选择。关掉的步骤显示为「已跳过」，不算失败，也不自动重试；以后再打开会补跑。',
};

interface Library { id: string; name: string; icon: string }

export function LibraryPolicySettings({ data }: { data: ConfigurationData }) {
  const tints = useLibraryTints();
  const libraries: Library[] = [...new Map((data.media_sources ?? []).map(row => [row.library_id || '', {
    id: row.library_id || '', name: row.library || '未命名媒体库', icon: row.library_icon || libraryAutoChoice(row.location)[0],
  }])).values()].filter(library => library.id);
  const [presets, setPresets] = useState<Record<string, Preset>>({});
  const [stages, setStages] = useState<Record<string, readonly Stage[]>>({});
  if (!libraries.length) return null;
  return (
    <Section title="媒体库来源色与处理方式">
      <Stack>
        <Note tone="neutral" title="预览">这一块是推荐方案的原型：颜色改动只影响本页打开期间的显示，处理方式不会保存。</Note>
        {libraries.map((library) => {
          const preset = presets[library.id] ?? 'auto';
          const chosen = preset === 'custom' ? stages[library.id] ?? PRESET_STAGES.auto : PRESET_STAGES[preset];
          const color = tints.get(library.id)?.color ?? '';
          return (
            <div key={library.id} data-library-policy="" className="flex flex-col gap-3 border-t border-separator-border pt-4 first:border-t-0 first:pt-0">
              <p className="flex items-center gap-2 text-body-medium text-text-primary"><SourceMark mark={library.icon} />{library.name}</p>
              <FolderFieldLine>
                <FolderField label="来源色" className="w-full">
                  <div data-accent-grid="" data-library-colors="" role="group" aria-label={`${library.name} 来源色`}>
                    <button type="button" data-glow-chip="" aria-pressed={!color} title="无颜色" aria-label="无颜色"
                      onClick={() => setLibraryColor(library.id, '')}>
                      <span data-glow-ball="" data-library-none="" aria-hidden="true" />
                    </button>
                    {ACCENT_CHOICES.map(([key, label]) => (
                      <button type="button" key={key} data-glow-chip="" aria-pressed={key === color} title={label} aria-label={label}
                        onClick={() => setLibraryColor(library.id, key)}>
                        <span data-glow-ball="" aria-hidden="true" data-accent-ball={key} />
                      </button>
                    ))}
                  </div>
                </FolderField>
              </FolderFieldLine>
              <FolderFieldLine>
                <FolderField label="处理方式" className="w-full @lg:w-60">
                  <Select className="w-full" aria-label={`${library.name} 处理方式`} selectedKey={preset}
                    onSelectionChange={key => {
                      const next = String(key) as Preset;
                      setPresets(current => ({ ...current, [library.id]: next }));
                      if (next === 'custom' && !stages[library.id]) {
                        setStages(current => ({ ...current, [library.id]: chosen }));
                      }
                    }}>
                    <SelectItem id="auto">自动补全</SelectItem>
                    <SelectItem id="local">仅使用本地资料</SelectItem>
                    <SelectItem id="custom">自定义</SelectItem>
                  </Select>
                </FolderField>
              </FolderFieldLine>
              <Help>{PRESET_HELP[preset]}</Help>
              <div className="flex flex-col gap-2" role="group" aria-label={`${library.name} 处理步骤`}>
                {STAGES.map(([key, label, hint]) => (
                  <Checkbox key={key} isDisabled={preset !== 'custom'} isSelected={chosen.includes(key)}
                    onChange={(on) => setStages(current => ({
                      ...current,
                      [library.id]: on ? [...chosen, key] : chosen.filter(stage => stage !== key),
                    }))}>
                    {label}<span className="ml-2 text-text-secondary">{hint}</span>
                  </Checkbox>
                ))}
              </div>
            </div>
          );
        })}
      </Stack>
    </Section>
  );
}
