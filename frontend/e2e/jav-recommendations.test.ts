import assert from 'node:assert/strict';
import { after, before, describe, it } from 'node:test';
import type { Browser } from 'playwright-core';
import { launch, layout, settle, visit, VIEWPORTS } from './harness.ts';

describe('JAV 推荐与加载结构', () => {
  let browser: Browser;
  before(async () => { browser = await launch(); });
  after(async () => { await browser?.close(); });
  for (const viewport of VIEWPORTS) it(`${viewport.name}：按实体身份推荐，封面骨架占据卡片尺寸`, { timeout: 60_000 }, async () => {
    const opened = await visit(browser, '/?jav=1', viewport);
    const { page } = opened;
    let release!: () => void;
    const responseReady = new Promise<void>(resolve => { release = resolve; });
    try {
      await settle(page);
      await page.route('**/api/taste?*', async route => {
        await responseReady;
        await route.fulfill({ json: { summary: { history_visits: 20 }, rankings: {
          peach_performers: [{ entity_id: 42, name: '规范姓名', score: 8 }],
        } } });
      });
      await page.route('**/api/feeds/discoveries?*', async route => {
        await responseReady;
        await route.fulfill({ json: { items: [{ id: 777, code: 'DEMO-777', title: '演示新作', performers: '來源姓名',
          performer_refs: [{ id: 42, name: '规范姓名' }], release_date: '2026-10-01', has_cover: false, wanted: false }] } });
      });
      await page.getByRole('tab', { name: '发现', exact: true }).click();
      await page.locator('[data-jav-skeleton-cover]').first().waitFor();
      const cover = await page.locator('[data-jav-skeleton-cover]').first().boundingBox();
      assert.ok(cover && cover.width >= 100 && cover.height >= 60, JSON.stringify(cover));
      assert.ok(cover && Math.abs(cover.width / cover.height - 1.6) < 0.02, '封面占位应与作品封面同一比例');
      const skeletonWidth = await page.locator('[data-skeleton="jav-discover"]').first().boundingBox();
      const main = await page.locator('#main').boundingBox();
      assert.ok(skeletonWidth && main && skeletonWidth.width >= main.width - 40);
      release();
      await page.getByRole('heading', { name: 'DEMO-777 · 演示新作', exact: true }).waitFor();
      await settle(page);
      assert.equal(await page.locator('[data-jav-skeleton-cover]').count(), 0);
      await page.getByRole('textbox', { name: '筛选推荐', exact: true }).fill('规范姓名');
      await page.getByRole('textbox', { name: '筛选推荐', exact: true }).press('Enter');
      await page.getByRole('heading', { name: 'DEMO-777 · 演示新作', exact: true }).waitFor();
      const geometry = await layout(page);
      assert.ok(geometry.scrollWidth <= geometry.viewportWidth + 1);
      assert.deepEqual(geometry.offenders, []);
      assert.deepEqual(opened.problems.filter(line => !line.includes('/api/links/check')), []);
      await page.screenshot({ path: `../build/jav-discover-${viewport.name}.png` });
    } finally { release(); await opened.close(); }
  });
});
