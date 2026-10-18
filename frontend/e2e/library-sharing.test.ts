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
    it(`${viewport.name}：离线圆点与文字均为错误色，浅色和暗色可辨识`, async () => {
      const opened = await visit(browser, '/settings/library', viewport, async page => {
        await page.route('**/api/configuration', async route => {
          const response = await route.fetch();
          await route.fulfill({ json: { ...await response.json(), editable: false,
            media_sources: [{ location: 'local', root: 'R:\\Media', path: 'R:\\Media', online: false }] } });
        });
      });
      try {
        const status = opened.page.locator('[data-mount="offline"]').first();
        await status.waitFor();
        for (const theme of ['light', 'dark']) {
          await opened.page.evaluate(value => {
            document.documentElement.dataset.theme = value;
            document.documentElement.classList.toggle('dark', value === 'dark');
          }, theme);
          const colors = await status.evaluate(element => {
            const halo = element.firstElementChild!;
            const dot = halo.firstElementChild!;
            const probe = document.createElement('span');
            probe.style.color = 'var(--color-text-error-primary)';
            element.append(probe);
            const expected = getComputedStyle(probe).color;
            probe.remove();
            return { text: getComputedStyle(element).color, dot: getComputedStyle(dot).backgroundColor,
              halo: getComputedStyle(halo).backgroundColor, expected };
          });
          assert.equal(colors.dot, colors.expected, JSON.stringify(colors));
          assert.equal(colors.text, colors.expected, JSON.stringify(colors));
          assert.notEqual(colors.halo, 'rgba(0, 0, 0, 0)');
        }
        assert.deepEqual(opened.problems, []);
      } finally { await opened.close() }
    });
    it(`${viewport.name}：明细、风险、预览与独立开关可访问`, async () => {
      const posts: Record<string, unknown>[] = [];
      const state = { enabled: false, available: true, schema: 3,
        fields: ['作品编号、标签、人物、评分与全部偏好维度'],
        notice: '每周上传完整明细，存在关联风险，接收服务可见 IP。' };
      const opened = await visit(browser, '/settings/library?section=' + encodeURIComponent('应用与维护'), viewport,
        async page => {
          await page.route('**/api/configuration', async route => {
            const response = await route.fetch();
            await route.fulfill({ json: { ...await response.json(), library_sharing: state } });
          });
          await page.route('**/api/configuration/library-sharing/preview', route => route.fulfill({ json: {
            token: 'preview-token', schema: 3, bytes: 128,
            data: { schema: 3, period: '2026-W42', library: [{ code: 'EXM-001' }], preferences: { performer: [] } },
          } }));
          await page.route('**/api/configuration/library-sharing', route => {
            const body = route.request().postDataJSON();
            posts.push(body);
            return route.fulfill({ json: { ...state, enabled: body.enabled } });
          });
        });
      const { page } = opened;
      try {
        const region = page.getByRole('region', { name: '数据上传', exact: true });
        await region.waitFor();
        assert.equal(await region.getByRole('switch').count(), 2, '两项上传开关同属一个分区');
        const initialToggle = region.getByRole('switch', { name: '上传馆藏与口味明细', exact: true });
        assert.equal(await initialToggle.count(), 1, '关闭状态也应显示上传开关');
        await region.getByRole('button', { name: '预览上传内容', exact: true }).click();
        const preview = region.getByLabel('馆藏与口味上传预览', { exact: true });
        await preview.waitFor();
        assert.equal(posts.length, 0);
        assert.match(await preview.innerText(), /EXM-001/);
        assert.match(await preview.innerText(), /performer/);
        await settle(page);
        const measured = await layout(page);
        assert.ok(measured.scrollWidth <= measured.viewportWidth + 1, JSON.stringify(measured));
        assert.deepEqual(measured.offenders, []);
        await page.screenshot({ path: fileURLToPath(new URL(`../../build/library-sharing-${viewport.name}.png`, import.meta.url)) });
        const toggle = initialToggle;
        await toggle.locator('xpath=ancestor::label').click();
        await settle(page);
        assert.equal(posts.length, 0);
        await region.getByRole('checkbox').focus();
        await region.getByRole('checkbox').press('Space');
        await region.getByRole('button', { name: '同意并开启上传', exact: true }).click();
        await settle(page);
        assert.deepEqual(posts[0], { enabled: true, schema: 3, consent: true, preview_token: 'preview-token' });
        await toggle.focus();
        await toggle.press('Space');
        await settle(page);
        assert.equal(posts[1]?.enabled, false);
        assert.equal(await toggle.isChecked(), false);
        assert.deepEqual(opened.problems, []);
      } finally { await opened.close() }
    });
  }
});
