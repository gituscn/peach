/* 媒体库来源色：颜色绑定 `library_id`。默认按 `/api/libraries` 的顺序依次取一档强调色，
 * 设置页可以改成别的强调色或「无颜色」。卡片和列表行只挂 `data-library`，颜色由这里注入的
 * 一张样式表给 `--library-color`，每张卡不用各自重渲染。
 *
 * 色值不另写：每一档取 `[data-accent-ball=…]` 那组 `--color-accent-500`，与设置面板的取色球同源。 */
import { useSyncExternalStore } from 'react';
import { apiGet } from '../../api';

/** 默认依次分配的几档，避开「稍后看」（sky）与「已标记」（rose）两枚状态图标的颜色。 */
const DEFAULT_ORDER = ['blue', 'emerald', 'violet', 'amber', 'teal', 'indigo'] as const;

export interface LibraryTint { id: string; name: string; color: string }

let tints: ReadonlyMap<string, LibraryTint> = new Map();
let requested = false;
const listeners = new Set<() => void>();

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
  void apiGet<{ libraries?: { id: string; name: string }[] }>('/api/libraries').then((body) => {
    const rows = body.libraries || [];
    publish(new Map(rows.map((row, index) => [row.id, {
      id: row.id, name: row.name, color: DEFAULT_ORDER[index % DEFAULT_ORDER.length]!,
    }])));
  }).catch(() => { requested = false });
}

/** 改一个媒体库的来源色；空串表示不上色。 */
export function setLibraryColor(id: string, color: string) {
  const current = tints.get(id);
  if (!current) return;
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
