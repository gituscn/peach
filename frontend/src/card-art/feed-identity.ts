import { entityPath, esc } from '@peach/legacy/core';

import { avatarInner, type FaceRef } from './markup';

/** 新作署名共用人物头像、取景与首字回退；已有身份通往人物资料页。 */
export function feedIdentity(item: { performers?: string; performer_refs?: (FaceRef & { name: string })[] }): string {
  const refs = item.performer_refs || [];
  const names = [...new Set((item.performers || '').split(/[,，、;/]/).map(name => name.trim()).filter(Boolean))];
  const people: (FaceRef & { name: string })[] = refs.length ? refs : names.map(name => ({ name }));
  const faces = people.slice(0, 3).map(ref => {
    const html = avatarInner(ref.name, ref, null);
    return 'id' in ref && ref.id
      ? `<a class="mav" href="${esc(entityPath('performer', ref.name, ref.id))}" aria-label="打开女优页：${esc(ref.name)}">${html}</a>`
      : `<span class="mav" title="${esc(ref.name)}">${html}</span>`;
  }).join('');
  return people.length > 1 ? `<div class="mavstack">${faces}</div>` : faces;
}
