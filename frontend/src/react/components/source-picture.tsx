import { useState } from 'react';
import { coverUrl } from '@peach/card-art';
import { Button } from '@/components/base/buttons/button';
import { Note } from './note';
import type { JavDetail } from '../jav-detail/jav-detail';

/** 来源图片（样张、来源封面、来源头像）的地址。服务端取过一次就落盘，回的是图片本身，
 *  浏览器按 ETag 与私有时效缓存；`attempt` 让重试换一个地址，不复用刚失败的那一次。 */
export const javImageUrl = (code: string, image: string, attempt = 0): string =>
  `/jav-image?code=${encodeURIComponent(code)}&image=${encodeURIComponent(image)}${attempt ? `&attempt=${attempt}` : ''}`;

/** 来源图片：本地有封面用本地那张，否则经 `/jav-image` 取。 */
export function SourcePicture({ item, image, thumbnail = false }: {
  item: Pick<JavDetail, 'code' | 'has_cover' | 'source_image' | 'cover_url' | 'cover_version'>;
  image: string; thumbnail?: boolean;
}) {
  const [attempt, setAttempt] = useState(0);
  /* 按地址记加载结果：同一个实例换到另一张图时，新地址自然回到「读取中」。 */
  const [loaded, setLoaded] = useState('');
  const [failed, setFailed] = useState('');
  const local = image === 'cover' && item.has_cover;
  const remote = !local && (image !== 'cover' || item.source_image);
  const alt = thumbnail ? '' : image === 'cover' ? `${item.code} 封面` : `${item.code} 预览 ${Number(image) + 1}`;
  if (!remote) {
    const src = local ? coverUrl(item, true) : image === 'cover' && !item.source_image ? item.cover_url : '';
    if (src) return <img data-jav-picture={thumbnail ? undefined : ''} src={src} alt={alt} referrerPolicy="no-referrer" />;
    return thumbnail ? <span>预览未取得</span> : <div data-jav-picture-wait=""><Note tone="neutral">封面未取得</Note></div>;
  }
  const src = javImageUrl(item.code, image, attempt);
  if (failed === src) {
    if (thumbnail) return <span>预览未取得</span>;
    return <div data-jav-picture-wait=""><Note tone="neutral"
      action={<Button variant="secondary" onClick={() => setAttempt((value) => value + 1)}>立即重试</Button>}>
      图片未取得</Note></div>;
  }
  const ready = loaded === src;
  /* 图片一直挂在同一个位置上：读取中只是藏着，读完揭开，不因换占位而重新请求。
     大图与缩略图条的样式都给 img 写了 display，会压过 `hidden`，藏由 `jav-detail.css` 的
     `[data-source-picture][hidden]` 兜住。 */
  return <>
    {ready ? null : thumbnail
      ? <span className="relative block h-full w-full skeleton-sheen" aria-label="正在读取预览" />
      : <div data-jav-picture-wait="" data-skeleton="image" role="status" aria-label="正在读取图片"><span className="relative skeleton-sheen" /></div>}
    <img data-jav-picture={thumbnail ? undefined : ''} data-source-picture="" src={src} alt={alt} referrerPolicy="no-referrer"
      hidden={!ready} onLoad={() => setLoaded(src)} onError={() => setFailed(src)} />
  </>;
}
