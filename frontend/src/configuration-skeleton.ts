import { islandButton, islandSelect } from './island-skeleton';
import { CONFIGURATION_SECTIONS } from './history/settings-route';
import { diagnosticsSkeleton } from './diagnostics-skeleton';
import { LIBRARY_FOLDER_HELP, POLICY_SUMMARY } from './react/settings/library-policy-copy';

const wait = 'disabled data-skeleton-action';
const text = (width = '60%') => `<span class="skeleton skeleton-text" style="width:${width}"></span>`;
const input = (width = '100%') => `<span class="skeleton ui-configuration-skeleton-input" style="width:${width}"></span>`;
const button = (label: string, variant: 'primary' | 'secondary' = 'primary') => islandButton({ label, variant, attrs: wait });
const footer = (content: string) => `<div class="-ml-3 flex flex-wrap items-center justify-end gap-3 rounded-b-2xl border-t border-separator-border bg-card-footer px-3 py-3">${content}</div>`;
const stack = (content: string) => `<div class="flex flex-col gap-4 py-4 pr-3">${content}</div>`;
const section = (title: string, content: string, actions = '') => `<section aria-label="${title}" class="flex w-full flex-col gap-2 wrap-anywhere"><p class="w-full px-3 text-body-2-medium text-text-secondary">${title}</p><div class="flex w-full flex-col rounded-2xl bg-background-secondary-default pl-3">${content}${actions ? footer(actions) : ''}</div></section>`;
const row = (label: string, description = '', control = 'ui-configuration-skeleton-toggle') => `<div class="flex min-h-[52px] w-full items-center justify-between gap-4 py-2.5 pr-2.5 border-b border-separator-border last:border-b-0"><div class="flex min-w-0 flex-col"><p class="text-body-regular text-text-primary">${label}</p>${description ? `<p class="text-body-2-regular text-text-secondary">${description}</p>` : ''}</div><span class="skeleton ${control}"></span></div>`;

/* 「媒体库与目录」按媒体库分组，组数和每组文件夹数各家不同：上次画出来的形状记在本机，
 * 骨架照着它排，第一次打开按一组一个文件夹。CloudDrive 代理与自动发现两块也按上次有没有决定。 */
const MEDIA_SHAPE_KEY = 'peach.configuration.media-shape.v1';
export const CLOUD_PROXY_HELP = 'API 代理用于列目录和查询文件信息，数据代理用于读取视频及配套文件。保存后，同一网盘账号在 CloudDrive 中的其他读取也会使用此设置。';
export interface MediaShape { folders: number[]; cloud: boolean; discovery: boolean }

export function rememberMediaShape(shape: MediaShape): void {
  try { localStorage.setItem(MEDIA_SHAPE_KEY, JSON.stringify(shape)) } catch { /* 下次按默认形状。 */ }
}

/* 自己另取数据、高度随内容变的分区（CloudDrive 代理按账号数与代理方式变高），记下上次画好时的内容高度，
 * 首屏骨架与分区自己的等待块都按它占位。 */
const SECTION_HEIGHTS_KEY = 'peach.configuration.section-heights.v1';
export function rememberSectionHeight(key: string, height: number): void {
  try {
    const value = JSON.parse(localStorage.getItem(SECTION_HEIGHTS_KEY) || '{}') as Record<string, number>;
    localStorage.setItem(SECTION_HEIGHTS_KEY, JSON.stringify({ ...value, [key]: Math.round(height) }));
  } catch { /* 下次按默认高度。 */ }
}
export function rememberedSectionHeight(key: string, fallback: number): number {
  try {
    const value = (JSON.parse(localStorage.getItem(SECTION_HEIGHTS_KEY) || '{}') as Record<string, unknown>)[key];
    return typeof value === 'number' && value > 0 && value < 4000 ? value : fallback;
  } catch { return fallback }
}

function mediaShape(): MediaShape {
  try {
    const value = JSON.parse(localStorage.getItem(MEDIA_SHAPE_KEY) || 'null') as Partial<MediaShape> | null;
    const folders = Array.isArray(value?.folders)
      ? value.folders.filter(count => Number.isInteger(count) && count > 0).slice(0, 12) : [];
    if (folders.length) return { folders, cloud: value?.cloud === true, discovery: value?.discovery === true };
  } catch { /* 用默认形状。 */ }
  return { folders: [1], cloud: false, discovery: false };
}

const field = (label: string, control: string, className: string) =>
  `<div class="flex min-w-0 flex-col gap-1 ${className}"><span class="flex items-center gap-0.5 text-body-medium text-text-primary" aria-hidden="true">${label}</span>${control}</div>`;
const folderRow = (libraries: number) => `<div data-folder-row class="@container flex flex-col gap-2 rounded-2lg border border-separator-border bg-background-primary-default p-3">
    <div class="flex items-start gap-2"><span class="min-w-0 flex-1">${input()}</span>${islandButton({ glyph: 'folder-search', variant: 'secondary', attrs: wait })}</div>
    <div class="flex flex-wrap items-end gap-2"><div class="flex w-full flex-wrap items-start gap-2">${field('来源', islandSelect(text('6em')), 'w-full @lg:w-60')}${field('读取策略', islandSelect(text('4em')), 'w-full @lg:w-32')}${libraries > 1 ? field('移到媒体库', islandSelect(text('4em')), 'w-full @lg:w-48') : ''}</div></div>
  </div>`;
/* 媒体库卡与 `cardClass({ variant: 'raised', padding: 'none' })` 同一组类名。 */
const libraryBlock = (folders: number, libraries: number) => `<div data-library-block class="min-w-0 bg-background-primary-default rounded-2xl shadow-card flex flex-col p-2">
    <div data-library-head>${islandButton({ label: '自动识别', variant: 'secondary', attrs: wait })}${input()}<span class="skeleton ui-configuration-skeleton-input" style="width:136px"></span>${islandSelect(text('4em'), { prefix: '处理方式' })}</div>
    <div data-library-folders>${folderRow(libraries).repeat(folders)}<div class="flex">${islandButton({ label: '添加文件夹', variant: 'secondary', attrs: wait })}</div></div></div>`;
/* 说明区是固定文字：常显那一句照原文写，对比表收着，只画它的展开行。 */
const legend = `<div data-policy-legend class="flex flex-col gap-1"><p class="text-body-2-regular text-text-secondary">${POLICY_SUMMARY}</p>`
  + '<span class="flex items-center gap-1 text-body-2-medium text-text-secondary">三种处理方式对比</span></div>';
const cloudHelp = '<p class="text-body-2-regular text-text-secondary">读取策略选「代理保护」时，会限制自动读取视频。</p>'
  + '<div class="flex flex-col gap-3"><span class="flex items-center gap-1 text-body-2-medium text-text-secondary">CloudDrive 设置帮助</span></div>';

/** 媒体库与目录：图例、每个媒体库的标题行、文件夹行与它自己的添加键，最下面添加媒体库与底部动作。 */
const media = () => {
  const shape = mediaShape();
  return section('媒体库与目录', stack(`${legend}<div class="flex flex-col gap-4">${shape.folders.map(count => libraryBlock(count, shape.folders.length)).join('')}</div>
  <div class="self-start">${button('添加媒体库', 'secondary')}</div>
  <p class="text-body-2-regular text-text-secondary">${LIBRARY_FOLDER_HELP}</p>
  ${shape.cloud ? cloudHelp : ''}<span class="text-body-medium text-text-primary">${text('15em')}</span>`),
  `<span class="mr-auto min-w-0 text-body-2-regular text-text-secondary">保存后 Peach 会重新启动。</span>${button('保存配置')}`)
  + (shape.cloud ? section('CloudDrive 代理', stack(`<p class="text-body-2-regular text-text-secondary">${CLOUD_PROXY_HELP}</p><span class="skeleton ui-configuration-skeleton-input" style="width:100%;height:${rememberedSectionHeight('cloud-proxy', 96)}px"></span>`), button('重新读取', 'secondary')) : '')
  + (shape.discovery ? `<div class="overflow-hidden" style="height:${rememberedSectionHeight('push-discovery', 323)}px">${section('自动发现新文件', stack(`<span class="flex min-h-6 items-center text-body-regular text-text-secondary">${text('8em')}</span>`)
    + row('发现新文件后自动入库') + row('监视本机文件夹') + row('接收 CloudDrive2 通知'), button('保存配置'))}</div>` : '')
  + section('番号识别规则', stack(`${text('90%')}${text('60%')}<span class="skeleton ui-configuration-skeleton-input" style="width:100%;height:88px"></span>`), button('保存配置'))
  + section('视频预览', row('生成视频预览', '为本地视频生成九宫格与时间轴预览；关闭后仍按入库规则探测时长与分辨率。')
    + row('时间轴预览', '按所选间隔抽帧，仅处理本机磁盘上的视频。', 'ui-configuration-skeleton-select')
    + row('抽帧解码方式', '用于生成封面、九宫格和时间轴。', 'ui-configuration-skeleton-select'));
};

/** 各分区复用正式表单的 Section、Stack 与 SettingsRow 几何。 */
export function configurationContentSkeleton(chosen: string): string {
  switch (chosen) {
    case '系统诊断': return diagnosticsSkeleton();
    case '媒体库与入库': return media();
    case '来源与订阅': return `<div>${button('采集来源与登录状态', 'secondary')}</div>`
      + section('来源凭据', stack(`${text('40%')}${input()}${text('70%')}`))
      + section('关注采集', row('首次采集范围', '', 'ui-configuration-skeleton-select') + row('头像刷新') + row('favicon 刷新'))
      + section('资源搜索', stack(`${text('40%')}${input()}`))
      + section('作品资料站点', stack(`${input()}${input()}`), button('保存配置'));
    case '下载渠道': return section('云下载', stack(`${text('35%')}${input()}${input()}${input()}${input()}`), button('保存配置'))
      + section('PikPak 账号', stack(`${input()}${input()}`), button('登录账号'));
    case '网络与访问': return section('本机访问端口', stack(input('128px')), button('保存配置'))
      + section('Peach 代理', row('连接方式', '', 'ui-configuration-skeleton-select'), button('保存配置'))
      + section('访问密码', stack(input()), button('保存配置'))
      + section('公网访问', stack(`${text('60%')}${input()}`));
    case '应用与维护': return section('检查更新', stack(`${text('40%')}${text('40%')}${text('40%')}${text('40%')}`), button('检查更新'))
      + section('自动更新', row('自动检查新版本') + row('自动下载更新') + row('检查频率', '', 'ui-configuration-skeleton-select'), button('保存配置'))
      + section('开机自启', row('开机后启动 Peach') + row('只启动托盘，不打开网页') + row('在桌面创建快捷方式'), button('保存配置'))
      + section('数据上传', row('发送版本统计与错误诊断（推荐）') + row('馆藏与口味明细上传'))
      + section('运行信息', stack(`${text('80%')}${text('60%')}${text('40%')}`));
    default: return media();
  }
}

export function configurationSkeleton(chosen = '媒体库与入库'): string {
  const nav = `<div class="ui-board-local-nav" data-section-nav data-section-items>${Object.values(CONFIGURATION_SECTIONS).map(title => `<button type="button" tabindex="-1" aria-selected="${title === chosen}">${title}</button>`).join('')}</div>`;
  return `<div class="peach-react"><div class="ui-configpage">${nav}<div class="flex min-w-0 flex-col gap-6">${configurationContentSkeleton(chosen)}</div></div></div>`;
}
