import { islandButton, islandGlyph } from './island-skeleton';
import { JAV_TABS } from './react/jav/jav-navigation';

const text = (width: string) => `<span class="skeleton block h-5 rounded-md" style="width:${width}" aria-hidden="true"></span>`;
const cover = (classes: string) => `<span data-jav-skeleton-cover class="skeleton ${classes}"></span>`;
const search = `<div class="flex h-11 items-center gap-2 rounded-2lg bg-background-tertiary-default px-3">${islandGlyph('search', 'size-5 shrink-0')}<span class="text-body-regular text-text-secondary">筛选番号、女优或标题</span></div>`;
export const JAV_RECOMMENDATION_GRID = 'inline-grid w-full min-w-0 gap-5 sm:grid-cols-2 lg:grid-cols-3';

/** 占位复用推荐卡与想要行的宽度、封面比例和列数。 */
export function javContentSkeleton(tab: string): string {
  if (tab === 'wants') return `<div class="flex w-full flex-col gap-8" data-skeleton="jav-wants">${text('5em')}${Array.from({ length: 3 }, () => `<div class="flex min-w-0 gap-4 rounded-2lg bg-background-secondary-default p-6">${cover('block w-card-cover shrink-0 aspect-card-cover rounded-2lg max-sm:w-24')}<div class="flex min-w-0 flex-1 flex-col gap-3">${text('80%')}${text('60%')}${text('40%')}</div></div>`).join('')}</div>`;
  return `<div class="${JAV_RECOMMENDATION_GRID}" data-skeleton="jav-discover">${Array.from({ length: 6 }, () => `<div class="flex min-w-0 flex-col gap-3">${cover('block w-full aspect-card-cover rounded-2lg')}${text('85%')}${text('65%')}${text('55%')}<span class="skeleton block h-8 w-32 rounded-md"></span></div>`).join('')}</div>`;
}

export function javPageSkeleton(tab: string): string {
  return `<div class="peach-react"><div class="flex w-full flex-col gap-6"><div class="flex items-center justify-between gap-2"><h2 data-page-title class="text-display-4-medium text-text-primary max-board-narrow:text-title-1-medium">JAV</h2>${islandButton({ variant: 'secondary', label: '查找资源', attrs: 'disabled data-skeleton-action' })}</div><div class="flex gap-1">${JAV_TABS.map(([key, label]) => `<span class="rounded-md px-3 py-2 text-body-regular ${key === tab ? 'bg-background-tertiary-default text-text-primary' : 'text-text-secondary'}">${label}</span>`).join('')}</div>${search}${tab === 'wants' ? `<div class="rounded-2lg bg-background-secondary-default px-6 py-5"><h3 class="mb-4 text-title-2-medium text-text-primary">按番号添加</h3>${text('100%')}</div>` : ''}${javContentSkeleton(tab)}</div></div>`;
}
