import assert from 'node:assert/strict';
import { after, before, describe, it } from 'node:test';
import type { Browser } from 'playwright-core';
import { launch, visit, settle, VIEWPORTS, layout } from './harness.ts';

describe('链接检查身份与断链动效', () => {
  let browser: Browser;
  before(async () => { browser = await launch(); });
  after(async () => { await browser?.close(); });
  for (const viewport of VIEWPORTS) {
    it(`两种结果都有资料入口和站标，只有四条短线持续闪烁（${viewport.name}）`, async () => {
      const opened = await visit(browser, '/data-cleanup?section=links', viewport, async page => {
        await page.emulateMedia({ reducedMotion: 'no-preference' });
        const row = { id: 1, entity: '示例作者', entity_id: 31, entity_kind: 'performer',
          face: { id: 31, name: '示例作者', has_image: true }, link_kind: 'official', label: '示例事务所',
          url: 'https://example.com/profile', note: 'HTTP 404' };
        await page.route('**/api/links/check', route => route.fulfill({ json: {
          status: 'complete', check_id: 'test', checked: 2, total: 2,
          gone: [row], unclear: [{ ...row, id: 2, note: 'HTTP 403\n站点拒绝本次访问，暂时无法确认链接是否失效。链接保留，可稍后重试。' }], scope: 'all',
        } }));
        for (const pattern of ['**/entity-image?**', '**/link-mark?**']) {
          await page.route(pattern, route => route.fulfill({ contentType: 'image/svg+xml',
            body: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="gray"/></svg>' }));
        }
      });
      try {
        const { page } = opened;
        await page.locator('[data-link-check-rays]').waitFor();
        for (const title of ['地址已失效', '本次未访问成功']) {
          const table = page.getByRole('grid', { name: title, exact: true });
          await table.waitFor();
          assert.equal(await table.locator('[data-link-identity]').getAttribute('href'), '/performers/31');
          assert.equal(await table.locator('[data-link-identity] img').count(), 1);
          assert.equal(await table.locator('[data-link-address] img').count(), 1);
          assert.equal(await table.locator('[data-link-name] img').count(), 0);
          assert.ok((await table.innerText()).includes('Peach 资料'));
          assert.ok((await table.innerText()).includes('链接名称'));
        }
        const sections = await page.evaluate(() => {
          const gone = document.querySelector('[data-link-results="gone"]')!;
          const unclear = document.querySelector('[data-link-results="unclear"]')!;
          const action = [...gone.querySelectorAll('button')].find(node => node.textContent?.includes('条失效链接'))!;
          const text = document.querySelector('[data-link-result="unclear"] p')!;
          return { deletionBottom: action.getBoundingClientRect().bottom, unclearTop: unclear.getBoundingClientRect().top,
            textBackground: getComputedStyle(text).backgroundColor,
            footerBackground: getComputedStyle(action.parentElement!).backgroundColor,
            panelBackground: getComputedStyle(gone).backgroundColor };
        });
        assert.ok(sections.deletionBottom < sections.unclearTop);
        assert.equal(sections.textBackground, 'rgba(0, 0, 0, 0)');
        assert.equal(sections.footerBackground, sections.panelBackground);
        assert.equal(await page.locator('[data-link-results="gone"] [data-link-code]').innerText(), 'HTTP 404');
        assert.equal(await page.locator('[data-link-results="unclear"] [data-link-code]').count(), 0);
        await page.locator('[data-link-results="unclear"]').getByRole('button', { name: '查看详情', exact: true }).click();
        await page.getByText('暂时无法确认链接是否失效', { exact: false }).waitFor();
        const motion = await page.locator('[data-link-check-icon]').evaluate(svg => {
          const rays = svg.querySelector('[data-link-check-rays]')!;
          const css = getComputedStyle(rays);
          const animation = rays.getAnimations()[0]!;
          animation.pause(); animation.currentTime = 0;
          const bright = getComputedStyle(rays).opacity;
          animation.currentTime = 600;
          return { count: rays.children.length, name: css.animationName,
            iterations: css.animationIterationCount, bright, dim: getComputedStyle(rays).opacity,
            body: [...svg.querySelectorAll(':scope > path')].map(path => ({
              animation: getComputedStyle(path).animationName, transform: getComputedStyle(path).transform,
            })) };
        });
        assert.equal(motion.count, 4); assert.equal(motion.name, 'peach-link-blink');
        assert.equal(motion.iterations, 'infinite'); assert.ok(Number(motion.dim) < Number(motion.bright));
        assert.deepEqual(motion.body, [{ animation: 'none', transform: 'none' }, { animation: 'none', transform: 'none' }]);
        await page.emulateMedia({ reducedMotion: 'reduce' });
        assert.equal(await page.locator('[data-link-check-rays]').evaluate(node => getComputedStyle(node).animationName), 'none');
        await settle(page);
        const geometry = await layout(page);
        assert.ok(geometry.scrollWidth <= geometry.viewportWidth);
        assert.deepEqual(geometry.offenders, []);
        assert.deepEqual(opened.problems, []);
      } finally { await opened.close(); }
    });

    it(`关注列表空状态有背景边框且添加入口位于框内（${viewport.name}）`, async () => {
      const opened = await visit(browser, '/subscriptions', viewport, async page => {
        await page.route('**/api/follow?summary=1', route => route.fulfill({ json: { sources: [] } }));
      });
      try {
        const { page } = opened;
        const empty = page.locator('[data-empty-state]').filter({ hasText: '还没有关注来源' });
        await empty.waitFor();
        const face = await empty.evaluate(node => {
          const style = getComputedStyle(node);
          return { background: style.backgroundColor, border: style.borderTopWidth,
            action: node.querySelector('a')?.getAttribute('href') };
        });
        assert.notEqual(face.background, 'rgba(0, 0, 0, 0)');
        assert.equal(face.border, '1px'); assert.equal(face.action, '/subscriptions?tab=add');
        await settle(page);
        const geometry = await layout(page);
        assert.ok(geometry.scrollWidth <= geometry.viewportWidth);
        assert.deepEqual(geometry.offenders, []); assert.deepEqual(opened.problems, []);
      } finally { await opened.close(); }
    });
  }
});
