import { skeletonHtml } from './ui-kit/skeleton';
import { catalogView } from './react/catalog-grid/catalog-view';
import { esc } from './core';

/** 馆藏与资料页按当前列表偏好使用同一份作品等待态。 */
export function catalogContentSkeletonHtml(label: string, cardRatio: number): string {
  if (catalogView() === 'list') return `<div class="peach-react catalog-skeleton" data-skeleton="catalog/list" role="status" aria-busy="true" aria-label="${esc(label)}"><div data-table-skeleton aria-hidden="true">${'<div><i class="skeleton-sheen"></i><span class="skeleton-sheen"></span></div>'.repeat(6)}</div></div>`;
  return skeletonHtml(label, { variant: 'cards', className: 'catalog-skeleton postercard-skeleton', cardRatio });
}
