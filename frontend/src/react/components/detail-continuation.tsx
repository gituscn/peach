import type { ReactNode } from 'react';

/** 详情底部：当前作品的分集队列与后续推荐共享一行。 */
export function DetailContinuation({ queue, children }: { queue: ReactNode; children: ReactNode }) {
  return <div data-detail-continuation="">{queue}{children}</div>;
}
