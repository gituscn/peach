import assert from 'node:assert/strict';
import { after, before, describe, it } from 'node:test';
import type { Browser } from 'playwright-core';
import { launch, layout, settle, VIEWPORTS } from './harness.ts';
import { openItemPage, SAMPLE_ITEM } from './item-fixture.ts';

describe('馆藏 JAV 官方预览', () => {
  let browser: Browser;
  before(async () => { browser = await launch() });
  after(async () => { await browser.close() });
  for (const viewport of VIEWPORTS) it(`${viewport.name}：图片、缩略图和正片共用媒体切换`, { timeout: 60000 }, async () => {
    const opened = await openItemPage(browser, '/', viewport, { ready: '[data-media-grid]' });
    const { page } = opened;
    const samples: string[] = [];
    try {
      await page.route('**/stream?*', route => route.continue({ url: new URL(`/stream?id=${process.env.PEACH_E2E_ITEM}`, page.url()).href }));
      await page.route(url => ['/sample-image', '/sample-thumb'].includes(url.pathname), route => {
        samples.push(route.request().url());
        return route.fulfill({ contentType: 'image/svg+xml', body: '<svg xmlns="http://www.w3.org/2000/svg" width="900" height="600"><rect width="900" height="600" fill="#777"/></svg>' });
      });
      await page.goto(new URL(`/item/${SAMPLE_ITEM.id}`, page.url()).href);
      const frame = page.locator('[data-item-gallery]');
      await frame.waitFor({ state: 'visible' });
      await page.waitForFunction(() => document.querySelector<HTMLVideoElement>('[data-item-gallery] video')?.readyState === 4);
      assert.equal(samples.length, 0, '播放入口不预取所有官方样张');
      const stats = frame.getByRole('button', { name: '播放统计', exact: true });
      await stats.waitFor({ state: 'visible' });
      const statsBox = await stats.boundingBox(), toggleBox = await frame.getByRole('button', { name: '查看图片', exact: true }).boundingBox();
      assert.ok(statsBox && toggleBox && toggleBox.x >= statsBox.x + statsBox.width, '图片入口与播放统计并列');
      const dots = frame.locator('[data-follow-image-dots]');
      assert.equal(await dots.locator('button').count(), 4);
      const videoBox = await frame.locator('.video-js').boundingBox(), dotsBox = await dots.boundingBox();
      assert.ok(videoBox && dotsBox && dotsBox.y >= videoBox.y + videoBox.height, '馆藏 indicator 位于播放器下方');
      await frame.locator('video').evaluate(node => { const video = node as HTMLVideoElement; video.muted = true; void video.play() });
      await page.waitForFunction(() => (document.querySelector<HTMLVideoElement>('[data-item-gallery] video')?.currentTime || 0) > 0);
      await frame.getByRole('button', { name: '预览 2', exact: true }).click();
      await frame.locator('[data-catalog-picture]').waitFor({ state: 'visible' });
      assert.match(await frame.locator('[data-catalog-picture]').getAttribute('src') || '', /n=3$/);
      assert.ok(await frame.locator('video').evaluate(node => (node as HTMLVideoElement).paused), '查看图片暂停正片');
      assert.ok(await frame.locator('.video-js').isHidden());
      await page.keyboard.press('Tab');
      await frame.getByRole('button', { name: '预览 1', exact: true }).focus();
      const tip = page.locator('[data-media-preview-tip]');
      await tip.locator('img').waitFor({ state: 'visible' });
      assert.match(await tip.locator('img').getAttribute('src') || '', /\/sample-thumb\?.*n=1$/);
      const tipBox = await tip.boundingBox(), focused = await frame.getByRole('button', { name: '预览 1', exact: true }).boundingBox();
      assert.ok(tipBox && focused && tipBox.y + tipBox.height <= focused.y);
      await page.keyboard.press('Escape');
      await frame.getByRole('button', { name: '播放正片', exact: true }).click();
      await frame.locator('.video-js').waitFor({ state: 'visible' });
      assert.ok(await frame.locator('video').evaluate(node => (node as HTMLVideoElement).currentTime > 0), '切回正片保留位置');
      await settle(page);
      const geometry = await layout(page);
      assert.ok(geometry.scrollWidth <= geometry.viewportWidth + 1);
      assert.deepEqual(opened.problems, []);
      await page.screenshot({ path: `../build/item-gallery-${viewport.name}.png` });
    } finally { await opened.close() }
  });
});
