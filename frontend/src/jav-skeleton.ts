import { islandButton, islandSearchInput } from './island-skeleton';
import { JAV_TABS } from './react/jav/jav-navigation';
import { cardRatio, gridLayout, javLayout } from './appearance';

const text = (width: string) => `<span class="skeleton block h-5 rounded-md" style="width:${width}" aria-hidden="true"></span>`;
const cover = (classes: string) => `<span data-jav-skeleton-cover class="skeleton ${classes}"></span>`;
export const JAV_RECOMMENDATION_GRID = 'w-full min-w-0';

/** 占位复用推荐卡与想要行的宽度、封面比例和列数。 */
export function javContentSkeleton(tab: string, layout = javLayout()): string {
  if (tab === 'wants') return `<div class="flex w-full flex-col gap-8" data-skeleton="jav-wants">${text('5em')}${Array.from({ length: 3 }, () => `<div class="flex min-w-0 gap-4 rounded-2lg bg-background-secondary-default p-6">${cover('block w-card-cover shrink-0 aspect-card-cover rounded-2lg max-sm:w-24')}<div class="flex min-w-0 flex-1 flex-col gap-3">${text('80%')}${text('60%')}${text('40%')}</div></div>`).join('')}</div>`;
  const ratio = cardRatio({ ...gridLayout({ active: true, home: false, portrait: false }), size: layout });
  return `<div data-media-grid class="${JAV_RECOMMENDATION_GRID}" data-skeleton="jav-discover">${Array.from({ length: 6 }, () => `<div data-jav-skeleton-card class="flex min-w-0 flex-col gap-3">
    <span data-jav-skeleton-cover class="skeleton block w-full rounded-2lg" style="aspect-ratio:${ratio}"></span>
    <div class="flex h-10 flex-col">${text('85%')}${text('65%')}</div>
    <div class="flex h-10 items-center gap-2"><span data-jav-skeleton-avatar class="skeleton block size-9 shrink-0 rounded-full"></span>${text('55%')}</div>
    <div data-media-tags><span class="skeleton block h-5 w-24 rounded-md"></span></div>
    ${text('55%')}
    <span data-jav-skeleton-actions class="skeleton block h-9 w-32 rounded-md"></span>
  </div>`).join('')}</div>`;
}

export function javPageSkeleton(tab: string): string {
  const filterLabel = tab === 'wants' ? '筛选想要' : '筛选推荐';
  return `<div class="peach-react"><div class="flex w-full flex-col gap-6">
    <div class="flex w-full flex-col gap-4"><div class="flex flex-wrap items-center justify-between gap-2"><h2 data-page-title class="text-display-4-medium text-text-primary max-board-narrow:text-title-1-medium">JAV</h2>${islandButton({ variant: 'primary', label: '查找资源', attrs: 'disabled data-skeleton-action' })}</div>
    <div class="relative flex flex-none gap-1 overflow-x-auto max-board-narrow:gap-0">${JAV_TABS.map(([key, label]) => `<span class="relative flex flex-none items-center whitespace-nowrap rounded-md px-3 py-2 text-body-regular max-board-narrow:px-2.25 max-board-narrow:text-body-2-regular ${key === tab ? 'bg-background-tertiary-default text-text-primary' : 'text-text-secondary'}">${label}</span>`).join('')}</div></div>
    <form aria-label="${filterLabel}">${islandSearchInput('筛选番号、女优或标题', '', filterLabel)}</form>
    ${tab === 'wants' ? `<div class="rounded-2lg bg-background-secondary-default px-6 py-5"><h3 class="mb-4 text-title-2-medium text-text-primary">按番号添加</h3>${text('100%')}</div>` : `<div data-filter-frame data-jav-filter class="flex flex-col rounded-2lg bg-background-secondary-default"><div class="flex h-12 items-center gap-2 px-3"><span>库外发现</span><span>馆藏探索</span></div><div class="flex min-h-11.5 items-center px-3">正在读取</div></div>`}${javContentSkeleton(tab)}</div></div>`;
}
