import { useState } from 'react';
import { RiBuildingLine, RiGlobalLine } from '@remixicon/react';
import { siteMarkUrl } from '@peach/legacy/core';

/** 采集来源的站标由本站缓存或随应用提供的静态资源承载。 */
export function SiteMark({ source, linkId }: { source: string; linkId?: never } | { linkId: number | undefined; source?: never }) {
  const [failed, setFailed] = useState('');
  const mark = String(linkId ?? source);
  if (linkId === undefined && !source) return <RiGlobalLine aria-hidden className="size-(--icon-inline) shrink-0" />;
  if (source === 'makers') return <RiBuildingLine aria-hidden className="size-(--icon-inline) shrink-0" />;
  if (failed === mark) return <RiGlobalLine aria-hidden className="size-(--icon-inline) shrink-0" />;
  const bundled = source && ['javten', 'fc2ppvdb', 'avwikidb', 'minnano-av', 'github'].includes(source);
  return <img src={linkId !== undefined ? `/link-mark?id=${linkId}` : bundled ? `/site-icon/${source}.png` : siteMarkUrl({ source: source! })} alt="" width={16} height={16}
    loading="lazy" onError={() => setFailed(mark)} className="size-(--icon-inline) shrink-0 rounded-none object-contain" />;
}
