/* 媒体库来源色：颜色绑定 `library_id`，默认不上色，用户在设置里给某个媒体库选了颜色才有。
 * 卡片和列表行只挂 `data-library`，颜色由这里注入的一张样式表给 `--library-color`，
 * 每张卡不用各自重渲染。
 *
 * 色值不另写：每一档取 `[data-accent-ball=…]` 那组 `--color-accent-500`，与设置面板的取色球同源。
 * 原型阶段颜色记在本浏览器的 localStorage；定稿时改存进配置的 `media.library_catalog`。 */
import { useSyncExternalStore } from 'react';
import { MEDIA_SOURCE_ICONS } from '@peach/legacy/ui';
import { apiGet } from '../../api';

const STORAGE_KEY = 'peach.preview.libraryColors';

export interface LibraryTint { id: string; name: string; icon: string; location: string; color: string }

let tints: ReadonlyMap<string, LibraryTint> = new Map();
let requested = false;
const listeners = new Set<() => void>();

function stored(): Record<string, string> {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') as Record<string, string>;
  } catch {
    return {};
  }
}

function accentValue(key: string): string {
  const probe = document.createElement('span');
  probe.setAttribute('data-accent-ball', key);
  probe.hidden = true;
  document.body.append(probe);
  const value = getComputedStyle(probe).getPropertyValue('--color-accent-500').trim();
  probe.remove();
  return value;
}

function publish(next: ReadonlyMap<string, LibraryTint>) {
  tints = next;
  let sheet = document.getElementById('peach-library-tints');
  if (!sheet) {
    sheet = document.createElement('style');
    sheet.id = 'peach-library-tints';
    document.head.append(sheet);
  }
  sheet.textContent = [...tints.values()].filter(tint => tint.color)
    .map(tint => `[data-library="${CSS.escape(tint.id)}"]{--library-color:${accentValue(tint.color)}}`).join('\n');
  listeners.forEach(listener => listener());
}

function load() {
  if (requested) return;
  requested = true;
  type Row = { id: string; name: string; icon?: string; roots?: { location: string }[] };
  void apiGet<{ libraries?: Row[] }>('/api/libraries').then((body) => {
    const colors = stored();
    // 图标名换成图形与侧栏媒体库切换器同一张表：来源名取来源标志，其余是雪碧图字形。
    publish(new Map((body.libraries || []).map(row => [row.id, {
      id: row.id, name: row.name, icon: MEDIA_SOURCE_ICONS[row.icon || ''] || row.icon || 'database',
      location: row.roots?.[0]?.location || '', color: colors[row.id] || '',
    }])));
  }).catch(() => { requested = false });
}

/** 改一个媒体库的来源色；空串表示不上色。 */
export function setLibraryColor(id: string, color: string) {
  const current = tints.get(id) ?? { id, name: '', icon: 'database', location: '', color: '' };
  const colors = stored();
  if (color) colors[id] = color;
  else delete colors[id];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(colors));
  publish(new Map([...tints, [id, { ...current, color }]]));
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => { listeners.delete(listener) };
}

export function useLibraryTints(): ReadonlyMap<string, LibraryTint> {
  load();
  return useSyncExternalStore(subscribe, () => tints, () => tints);
}
