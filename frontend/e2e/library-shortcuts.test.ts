import assert from 'node:assert/strict';
import { after, before, describe, it } from 'node:test';
import type { Browser } from 'playwright-core';
import { launch, layout, VIEWPORTS } from './harness.ts';
import { openItemPage } from './item-fixture.ts';

describe('收藏与筛选弹层', () => {
  let browser: Browser;
  before(async () => { browser = await launch() });
  after(async () => { await browser.close() });
  for (const viewport of VIEWPORTS) {
    it(`${viewport.name} 保存、应用、删除筛选及收藏分类`, { timeout: 60_000 }, async () => {
      const opened = await openItemPage(browser, '/watch-later?loc=&tag=VR&jav=1', viewport, { ready: '[data-catalog-frame]' });
      const page = opened.page;
      let favorites = [{ key: 'entity:7', entity_id: 7, kind: 'studio', name: '厂牌长名称'.repeat(12) }];
      let filters: { id: string; name: string; href: string }[] = [];
      await page.route(url => url.pathname === '/api/library-shortcuts', async route => {
        if (route.request().method() === 'POST') {
          const body = route.request().postDataJSON();
          if (body.action === 'save_filter') filters.push({ id: 'test', name: body.name, href: body.href });
          if (body.action === 'delete_filter') filters = [];
          if (body.action === 'favorite') favorites = [];
        }
        await route.fulfill({ json: { favorites, filters } });
      });
      try {
        await page.getByRole('button', { name: '收藏与筛选', exact: true }).click();
        const dialog = page.getByRole('dialog', { name: '收藏与筛选', exact: true });
        await dialog.getByRole('button', { name: '厂牌', exact: true }).click();
        await dialog.getByRole('link', { name: favorites[0].name, exact: true }).waitFor();
        const size = await layout(page);
        assert(size.scrollWidth <= size.viewportWidth + 1, JSON.stringify(size));
        assert.deepEqual(size.offenders, []);
        await dialog.getByRole('textbox', { name: '筛选名称' }).fill('VR 待看');
        await dialog.getByRole('button', { name: '保存当前筛选', exact: true }).click();
        const link = dialog.getByRole('link', { name: 'VR 待看', exact: true });
        await link.waitFor();
        const href = await link.getAttribute('href');
        const address = new URL(href!, page.url());
        assert.equal(address.pathname, '/watch-later');
        assert.equal(address.searchParams.get('loc'), '');
        assert.equal(address.searchParams.get('tag'), 'VR');
        assert.equal(address.searchParams.get('jav'), '1');
        await link.click();
        await page.waitForURL(url => url.pathname === '/watch-later' && url.searchParams.get('tag') === 'VR');
        await page.getByRole('button', { name: '收藏与筛选', exact: true }).click();
        await dialog.getByRole('button', { name: '删除筛选VR 待看', exact: true }).click();
        await link.waitFor({ state: 'detached' });
        await dialog.getByRole('button', { name: /^取消收藏/ }).click();
        await dialog.getByRole('heading', { name: '还没有收藏', exact: true }).waitFor();
        await dialog.getByRole('button', { name: '关闭', exact: true }).click();
        await dialog.waitFor({ state: 'hidden' });
        assert.deepEqual(opened.problems, []);
      } finally { await opened.close() }
    });
  }
});
