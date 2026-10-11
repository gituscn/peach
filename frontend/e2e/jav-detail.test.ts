import assert from 'node:assert/strict';
import { after, before, describe, it } from 'node:test';
import type { Browser } from 'playwright-core';
import { launch, layout, requiredEnv, settle, VIEWPORTS } from './harness.ts';
import { JAV_DETAIL, mockJavDetail } from './jav-detail-fixture.ts';

describe('库外 JAV 作品详情', () => {
  let browser: Browser;
  before(async () => { browser = await launch() });
  after(async () => { await browser.close() });
  for (const viewport of VIEWPORTS) {
    it(`${viewport.name} 新作在站内打开、预览切换、评论分页与关闭返回`, { timeout: 60000 }, async () => {
      const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height }, isMobile: viewport.mobile, hasTouch: viewport.mobile, reducedMotion: 'reduce' });
      try {
        await context.addInitScript(() => localStorage.setItem('peach.settings.v1', JSON.stringify({ detailAutoplay: false, feedAutoScroll: false })));
        const page = await context.newPage();
        const errors: string[] = [];
        page.on('pageerror', error => errors.push(error.message));
        await mockJavDetail(page);
        await page.route(/\/api\/entity\/shapes/, route => route.fulfill({ json: { home: { feed: true }, entities: [] } }));
        await page.route(/\/api\/feeds\/discoveries\?/, route => route.fulfill({ json: { ok: true, items: [
          { id: 1, code: 'EXM-001', title: '示例新作', performers: '示例人物', release_date: '2026-10-30' },
        ] } }));
        await page.goto(requiredEnv('PEACH_E2E_ORIGIN') + '/');
        const card = page.locator('#feedNew [data-feed-id="1"]');
        await card.waitFor({ state: 'visible' });
        await card.getByRole('link', { name: '打开 EXM-001 的作品详情' }).click();
        await page.waitForURL('**/jav/movie/EXM-001');
        await page.locator('#stage [data-jav-detail] h1').waitFor({ state: 'visible' });
        assert.ok(await page.locator('#stage').evaluate(el => (el as HTMLDialogElement).open));
        assert.equal(await card.count(), 1, '原列表留在详情底下');
        await page.getByRole('img', { name: 'EXM-001 封面', exact: true }).waitFor({ state: 'visible' });
        await page.getByRole('button', { name: '下一张', exact: true }).click();
        await page.getByRole('img', { name: 'EXM-001 预览 1', exact: true }).waitFor({ state: 'visible' });
        await page.getByRole('button', { name: '封面', exact: true }).click();
        await page.getByRole('button', { name: '查看评论', exact: true }).click();
        await page.waitForFunction(() => document.querySelectorAll('[data-jav-review]').length === 10);
        assert.equal(await page.locator('[data-jav-review] img').count(), 0, '评论正文按文本呈现');
        await page.getByRole('button', { name: '更多评论', exact: true }).click();
        await page.waitForFunction(() => document.querySelectorAll('[data-jav-review]').length === 12);
        assert.equal(await page.getByRole('button', { name: '更多评论', exact: true }).count(), 0);
        await page.getByRole('button', { name: '查看资源', exact: true }).click();
        await page.getByText('EXM-001 示例资源 1', { exact: true }).waitFor({ state: 'visible' });
        assert.equal(await page.locator('[data-jav-resources] [data-resource-protocol]:visible').count(), 3);
        await page.getByText('更多资源（3 条）', { exact: true }).click();
        await page.getByText('EXM-001 示例资源 6', { exact: true }).waitFor({ state: 'visible' });
        assert.equal(await page.locator('[data-jav-resources] [data-resource-protocol]:visible').count(), 6);
        assert.ok(await page.locator('[data-jav-resources]').getByRole('button', { name: '添加下载', exact: true }).first().isDisabled());
        await page.getByRole('button', { name: '想要', exact: true }).click();
        await page.getByRole('button', { name: '取消想要', exact: true }).waitFor({ state: 'visible' });
        await page.getByRole('button', { name: '取消想要', exact: true }).click();
        await page.getByRole('button', { name: '想要', exact: true }).waitFor({ state: 'visible' });
        await settle(page);
        const geometry = await layout(page);
        assert.ok(geometry.scrollWidth <= geometry.viewportWidth + 1);
        assert.deepEqual(errors, []);
        await page.screenshot({ path: `../build/jav-detail-${viewport.name}.png` });
        await page.locator('#closeStage').click();
        await page.waitForURL(requiredEnv('PEACH_E2E_ORIGIN') + '/');
        await card.waitFor({ state: 'visible' });
        assert.equal(await page.locator('#stage').count(), 0);
        await page.goBack();
        await page.locator('#stage [data-jav-detail] h1').waitFor({ state: 'visible' });
        await page.keyboard.press('Escape');
        await page.waitForURL(requiredEnv('PEACH_E2E_ORIGIN') + '/');
      } finally { await context.close() }
    });
    it(`${viewport.name} 深链刷新与来源未取得仍可关闭`, { timeout: 60000 }, async () => {
      const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height }, reducedMotion: 'reduce' });
      try {
        const page = await context.newPage();
        await mockJavDetail(page);
        await page.route(/\/api\/jav\/detail\?/, route => route.fulfill({ json: { ...JAV_DETAIL, state: 'partial', source_image: false,
          preview_count: 0, message: '作品资料未取得，请稍后重试' } }));
        await page.goto(requiredEnv('PEACH_E2E_ORIGIN') + '/jav/movie/EXM-001');
        await page.getByText('作品资料未取得，请稍后重试', { exact: true }).waitFor({ state: 'visible' });
        await page.reload();
        await page.getByText('作品资料未取得，请稍后重试', { exact: true }).waitFor({ state: 'visible' });
        await page.locator('#closeStage').click();
        await page.waitForURL('**/jav?tab=discover');
      } finally { await context.close() }
    });
  }
});
