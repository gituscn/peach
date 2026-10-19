import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import type { Browser } from 'playwright-core';
import { installDesignBrowser, PIXEL } from './design-fixture.ts';
import { requiredEnv, settle, visit, VIEWPORTS } from './harness.ts';

describe('任务页云下载布局', () => {
  let browser: Browser;
  installDesignBrowser((next) => { browser = next; });
  for (const viewport of VIEWPORTS) it(`${viewport.name} 左侧封面可见，番号完整，长标题可展开`, async () => {
    const title = '制作记录与采访合集：摄影、场景设计及幕后访谈 '.repeat(12);
    const assetId = Number(requiredEnv('PEACH_E2E_ITEM'));
    const opened = await visit(browser, '/tasks', viewport, async (page) => {
      await page.route('**/cover?*', (route) => route.fulfill({ contentType: 'image/png', body: Buffer.from(PIXEL, 'base64') }));
      await page.route('**/entity-image?*', (route) => route.fulfill({ contentType: 'image/png', body: Buffer.from(PIXEL, 'base64') }));
      await page.route('**/api/downloads?*', (route) => route.fulfill({ json: {
        available: false, providers: [], tasks: [{ id: 1, title, code: 'ABC-123', provider: '115',
          provider_label: '115', state: 'ingested', state_label: '已入库',
          postprocess_state: 'complete', postprocess_label: '整理完成', target: '/云下载',
          source_uri: '', submitted_at: '2026-10-01T00:00:00Z', asset_id: assetId,
          artwork: { id: 10, code: 'ABC-123', has_cover: true, cover_key: 'ABC-123',
            performer_entities: [{ id: 30, name: '测试女优', has_image: true }] } }],
      } }));
    });
    try {
      const page = opened.page;
      await page.locator('[data-download-id="1"]').waitFor();
      await settle(page);
      const geometry = await page.locator('[data-download-id="1"]').evaluate((card) => {
        const heading = card.querySelector('strong')!;
        const titleContent = heading.querySelector('a') || heading;
        const row = heading.parentElement!;
        const metadata = row.nextElementSibling!;
        const provider = [...metadata.querySelectorAll('span')].filter((span) => span.textContent === '115').at(-1)!;
        const detail = metadata.lastElementChild!;
        const cover = card.querySelector('[data-download-cover]')!;
        const detailColumn = cover.nextElementSibling!;
        const picture = cover.querySelector('img') as HTMLImageElement;
        const avatar = card.querySelector('[data-media-avatar] img') as HTMLImageElement;
        const code = document.createRange();
        const headingText = heading.querySelector('a')?.firstChild || heading.firstChild!;
        code.setStart(headingText, 0);
        code.setEnd(headingText, 'ABC-123'.length);
        return { title: heading.getBoundingClientRect().height,
          line: Number.parseFloat(getComputedStyle(heading).lineHeight),
          row: row.getBoundingClientRect().height, clipped: titleContent.scrollWidth > titleContent.clientWidth,
          overflow: document.documentElement.scrollWidth > window.innerWidth,
          providerTop: provider.getBoundingClientRect().top, metadataTop: detail.getBoundingClientRect().top,
          coverLeft: cover.getBoundingClientRect().left, textLeft: heading.getBoundingClientRect().left,
          coverTop: cover.getBoundingClientRect().top, coverBottom: cover.getBoundingClientRect().bottom,
          coverHeight: cover.getBoundingClientRect().height,
          detailTop: detailColumn.getBoundingClientRect().top, detailBottom: detailColumn.getBoundingClientRect().bottom,
          coverReady: picture.complete && picture.naturalWidth > 0, avatarReady: avatar.complete && avatar.naturalWidth > 0,
          codeFits: code.getBoundingClientRect().width <= heading.clientWidth };
      });
      assert.equal(geometry.title, geometry.line);
      assert.ok(geometry.row < geometry.line * 2);
      assert.equal(geometry.clipped, true);
      assert.equal(geometry.codeFits, true, '番号不能被状态标签挤掉');
      assert.equal(geometry.overflow, false);
      assert.ok(geometry.coverLeft < geometry.textLeft);
      if (!viewport.mobile) {
        assert.equal(geometry.coverTop, geometry.detailTop);
        assert.equal(geometry.coverBottom, geometry.detailBottom);
      }
      assert.equal(geometry.coverReady, true);
      assert.equal(geometry.avatarReady, true);
      assert.equal(await page.locator('[data-download-cover]').getByText('无封面').count(), 0);
      assert.equal(geometry.providerTop, geometry.metadataTop, '来源文字与目录、时间没有对齐');
      await page.screenshot({ path: `../build/agent-verification/browser/activity-${viewport.name}.png`, fullPage: true });
      await page.getByRole('button', { name: '展开标题', exact: true }).click();
      assert.equal(await page.locator('[data-download-title-full]').textContent(), `ABC-123 · ${title.trim()}`);
      assert.equal(await page.locator('[data-download-cover]').evaluate(cover => cover.getBoundingClientRect().height), geometry.coverHeight);
      await page.getByRole('button', { name: '收起标题', exact: true }).click();
      assert.equal(await page.locator('[data-download-title-full]').count(), 0);
      for (const selector of ['[data-download-cover-link]', '[data-download-title-link]']) {
        await page.locator(selector).click();
        await page.waitForURL(`**/assets/${assetId}`);
        await page.goBack();
        await page.locator('[data-download-id="1"]').waitFor();
        await settle(page);
      }
      assert.deepEqual(opened.problems, []);
    } finally { await opened.close(); }
  });
});
