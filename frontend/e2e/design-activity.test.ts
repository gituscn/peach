import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import type { Browser } from 'playwright-core';
import { installDesignBrowser } from './design-fixture.ts';
import { settle, visit, VIEWPORTS } from './harness.ts';

describe('任务页云下载布局', () => {
  let browser: Browser;
  installDesignBrowser((next) => { browser = next; });
  for (const viewport of VIEWPORTS) it(`${viewport.name} 标题与状态保持一行，长标题可展开`, async () => {
    const title = '制作记录与采访合集：摄影、场景设计及幕后访谈 '.repeat(12);
    const opened = await visit(browser, '/tasks', viewport, async (page) => {
      await page.route('**/api/downloads?*', (route) => route.fulfill({ json: {
        available: false, providers: [], tasks: [{ id: 1, title, code: 'ABC-123', provider: '115',
          provider_label: '115', state: 'ingested', state_label: '已入库',
          postprocess_state: 'complete', postprocess_label: '整理完成', target: '/云下载',
          source_uri: '', submitted_at: '2026-10-01T00:00:00Z' }],
      } }));
    });
    try {
      const page = opened.page;
      await page.locator('[data-download-id="1"]').waitFor();
      await settle(page);
      const geometry = await page.locator('[data-download-id="1"]').evaluate((card) => {
        const heading = card.querySelector('strong')!;
        const row = heading.parentElement!;
        const metadata = row.nextElementSibling!;
        const provider = [...metadata.querySelectorAll('span')].filter((span) => span.textContent === '115').at(-1)!;
        const detail = metadata.lastElementChild!;
        return { title: heading.getBoundingClientRect().height,
          line: Number.parseFloat(getComputedStyle(heading).lineHeight),
          row: row.getBoundingClientRect().height, clipped: heading.scrollWidth > heading.clientWidth,
          overflow: document.documentElement.scrollWidth > window.innerWidth,
          providerTop: provider.getBoundingClientRect().top, detailTop: detail.getBoundingClientRect().top };
      });
      assert.equal(geometry.title, geometry.line);
      assert.ok(geometry.row < geometry.line * 2);
      assert.equal(geometry.clipped, true);
      assert.equal(geometry.overflow, false);
      assert.equal(geometry.providerTop, geometry.detailTop, '来源文字与番号、路径、时间没有对齐');
      await page.screenshot({ path: `../build/agent-verification/browser/activity-${viewport.name}.png`, fullPage: true });
      await page.getByRole('button', { name: '展开标题', exact: true }).click();
      assert.equal(await page.locator('[data-download-title-full]').textContent(), title);
      await page.getByRole('button', { name: '收起标题', exact: true }).click();
      assert.equal(await page.locator('[data-download-title-full]').count(), 0);
      assert.deepEqual(opened.problems, []);
    } finally { await opened.close(); }
  });
});
