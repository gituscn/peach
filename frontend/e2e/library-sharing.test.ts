import assert from 'node:assert/strict';
import { after, before, describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';
import type { Browser } from 'playwright-core';

import { launch, layout, settle, visit, VIEWPORTS } from './harness.ts';

describe('馆藏与口味分享', () => {
  let browser: Browser;
  before(async () => { browser = await launch() });
  after(async () => { await browser?.close() });
  for (const viewport of VIEWPORTS) {
    it(`${viewport.name}：完整预览、主动同意与关闭，长明细在内部滚动`, async () => {
      const posts: Record<string, unknown>[] = [];
      const state = { enabled: false, available: false, schema: 1,
        fields: ['作品编号、同编号文件数量、标签、规范人物／创作者／厂牌／系列名称、媒体类型与时长',
          '每部作品的评分、喜欢状态、累计播放次数和观看比例；不含观看时间点',
          '出演者、创作者、标签、厂牌、系列、年代和时长偏好的名称、强度与证据来源类别'],
        notice: '用于 Peach 用户群体的馆藏结构与偏好研究。明细可反映成人内容偏好，不能保证匿名。默认关闭，先预览并明确同意。' };
      const opened = await visit(browser, '/settings/library?section=' + encodeURIComponent('应用与维护'), viewport,
        async page => {
          await page.route('**/api/configuration', async route => {
            const response = await route.fetch();
            await route.fulfill({ json: { ...await response.json(), library_sharing: state } });
          });
          await page.route('**/api/configuration/library-sharing/preview', route => route.fulfill({ json: {
            token: 'preview-token', schema: 1, bytes: 4096,
            data: { library: Array.from({ length: 40 }, (_, index) => ({ code: `EXM-${index + 1}`, tags: ['标签'.repeat(40)], ratings: [4] })), preferences: {} },
          } }));
          await page.route('**/api/configuration/library-sharing', route => {
            const body = route.request().postDataJSON();
            posts.push(body);
            return route.fulfill({ json: { ...state, enabled: body.enabled } });
          });
        });
      const { page } = opened;
      try {
        const region = page.getByRole('region', { name: '馆藏与口味研究', exact: true });
        await region.getByRole('button', { name: '预览上传内容', exact: true }).click();
        const preview = region.getByLabel('馆藏与口味上传预览', { exact: true });
        await preview.waitFor();
        const enable = region.getByRole('button', { name: '同意并开启分享', exact: true });
        assert.ok(await enable.isDisabled());
        assert.equal(posts.length, 0);
        const geometry = await preview.evaluate(element => ({ height: element.clientHeight, content: element.scrollHeight }));
        assert.ok(geometry.height > 0 && geometry.height <= 321 && geometry.content > geometry.height, JSON.stringify(geometry));
        await region.getByText('我已查看字段与预览，同意每周自动上传馆藏与口味明细用于 Peach 群体研究', { exact: true }).click();
        await settle(page);
        const measured = await layout(page);
        assert.ok(measured.scrollWidth <= measured.viewportWidth + 1, JSON.stringify(measured));
        assert.deepEqual(measured.offenders, []);
        assert.ok(await region.locator('.ui-geist-scroller-overlay').evaluate(element => element.classList.contains('ui-can-scroll-bottom')));
        await page.screenshot({ path: fileURLToPath(new URL(`../../build/library-sharing-${viewport.name}.png`, import.meta.url)) });
        await enable.click();
        const toggle = region.getByRole('switch', { name: '自动分享馆藏与口味明细', exact: true });
        await toggle.waitFor();
        assert.deepEqual(posts[0], { enabled: true, schema: 1, consent: true, preview_token: 'preview-token' });
        await toggle.focus();
        await toggle.press('Space');
        await region.getByRole('button', { name: '预览上传内容', exact: true }).waitFor();
        assert.equal(posts[1]?.enabled, false);
        assert.deepEqual(opened.problems, []);
      } finally { await opened.close() }
    });
  }
});
