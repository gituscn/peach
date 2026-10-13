import assert from 'node:assert/strict';
import { resolve } from 'node:path';
import { after, before, describe, it } from 'node:test';
import type { Browser } from 'playwright-core';
import { launch, layout, VIEWPORTS } from './harness.ts';
import { openItemPage } from './item-fixture.ts';

describe('我的收藏弹层', () => {
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
        await page.getByRole('button', { name: '我的收藏', exact: true }).click();
        const dialog = page.getByRole('dialog', { name: '我的收藏', exact: true });
        assert.equal(await dialog.getByRole('link', { name: '已标记', exact: true }).getAttribute('href'), '/flagged');
        assert.equal(await dialog.getByRole('link', { name: '稍后看', exact: true }).getAttribute('href'), '/watch-later');
        await dialog.getByRole('button', { name: '片商与厂牌', exact: true }).click();
        await dialog.getByRole('link', { name: favorites[0].name, exact: true }).waitFor();
        const size = await layout(page);
        assert.equal(size.viewportWidth, viewport.width);
        assert(size.scrollWidth <= size.viewportWidth + 1, JSON.stringify(size));
        assert.deepEqual(size.offenders, []);
        await page.screenshot({ path: resolve('../build', `shortcuts-${viewport.name}.png`) });
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
        await page.getByRole('button', { name: '我的收藏', exact: true }).click();
        await dialog.getByRole('button', { name: '删除筛选VR 待看', exact: true }).click();
        await link.waitFor({ state: 'detached' });
        await dialog.getByRole('button', { name: /^取消收藏/ }).click();
        await dialog.getByRole('heading', { name: '还没有收藏', exact: true }).waitFor();
        await dialog.getByRole('button', { name: '关闭', exact: true }).click();
        await dialog.waitFor({ state: 'hidden' });
        for (const [label, path] of [['已标记', '/flagged'], ['稍后看', '/watch-later']]) {
          await page.getByRole('button', { name: '我的收藏', exact: true }).click();
          await dialog.getByRole('link', { name: label, exact: true }).click();
          await page.waitForURL(url => url.pathname === path);
          await dialog.waitFor({ state: 'hidden' });
        }
        assert.deepEqual(opened.problems, []);
      } finally { await opened.close() }
    });
  }
});
