import assert from 'node:assert/strict';
import { after, before, describe, it } from 'node:test';
import type { Browser } from 'playwright-core';
import { launch, layout, settle, visit, VIEWPORTS } from './harness.ts';

describe('配置表单与行间距', () => {
  let browser: Browser;
  before(async () => { browser = await launch() });
  after(async () => { await browser?.close() });
  for (const viewport of VIEWPORTS) {
    it(`${viewport.name}：云下载空检查报告不占据分隔区域`, async () => {
      const opened = await visit(browser, '/settings/library?section=' + encodeURIComponent('下载渠道'), viewport);
      const { page } = opened;
      try {
        await page.route('**/api/configuration', async route => {
          const data = await (await route.fetch()).json();
          await route.fulfill({ json: { ...data, downloads: { ...data.downloads, media_sources: ['guangya'], token_set: true,
            config: { ...data.downloads.config, clouddrive_address: 'http://127.0.0.1:19798' } } } });
        });
        await page.route('**/api/configuration/downloads/check', route => route.fulfill({ json: {
          ok: true, address: 'http://127.0.0.1:19798', permissions: [], missing: [], root: '/', folder: null,
          quota: null, suggested_target: null, suggested_pikpak_root: '', problems: [],
        } }));
        await page.reload();
        const form = page.getByRole('form', { name: '云下载', exact: true });
        await form.getByRole('button', { name: '检查连接', exact: true }).click();
        await settle(page);
        assert.equal(await form.locator('dl').count(), 0);
        assert.equal(await form.locator('.border-t').count(), 1);
        const empty = await form.locator('div').evaluateAll(nodes => nodes.filter(node =>
          !node.childNodes.length && node.getBoundingClientRect().height > 0).map(node => node.className));
        assert.deepEqual(empty, []);
        assert.ok((await layout(page)).scrollWidth <= viewport.width + 1);
        assert.deepEqual(opened.problems, []);
      } finally { await opened.close() }
    });
    it(`${viewport.name}：来源站标本地提供，帮助链接紧接文字`, async () => {
      const opened = await visit(browser, '/settings/subscriptions', viewport);
      const { page } = opened;
      try {
        const section = page.getByRole('form', { name: '资源搜索', exact: true });
        await section.getByText('索引器连接帮助', { exact: true }).click();
        const link = section.getByRole('link', { name: '详细配置说明', exact: true });
        await link.waitFor({ state: 'visible' });
        assert.equal(await link.evaluate(node => node.parentElement?.tagName), 'P');
        const head = page.locator('b').filter({ hasText: /^F95zone$/ }).locator('..');
        const icon = head.locator('img');
        await icon.scrollIntoViewIfNeeded();
        await page.waitForFunction(() => [...document.querySelectorAll<HTMLImageElement>('img[src*="provider=f95zone"]')].some(image => image.complete && image.naturalWidth > 0));
        assert.equal(await icon.getAttribute('src'), '/source-icon?provider=f95zone');
        await icon.evaluate(image => image.dispatchEvent(new Event('error')));
        await head.locator('svg').waitFor();
        assert.equal(await head.locator('img').count(), 0);
        await section.screenshot({ path: `../build/indexer-help-${viewport.name}.png` });
        assert.deepEqual((await layout(page)).offenders, []);
        assert.deepEqual(opened.problems, []);
      } finally { await opened.close() }
    });
    it(`${viewport.name}：应用更新包说明和体积不越出视口`, async () => {
      const opened = await visit(browser, '/settings/library?section=' + encodeURIComponent('应用与维护'), viewport);
      const { page } = opened;
      try {
        await page.route('**/api/configuration', async route => {
          const data = await (await route.fetch()).json();
          await route.fulfill({ json: { ...data, updates: { ...data.updates, installation: '独立测试包',
            state: 'available', latest_version: '1.0.0', message: '有新版本可下载。', package_kind: 'update',
            asset_size: 12 * 1048576, release_url: 'https://github.com/peach-mitao/peach/releases/tag/v1.0.0' },
            update_job: { state: 'idle', progress: 0 } } });
        });
        await page.reload();
        const region = page.getByRole('region', { name: '检查更新', exact: true });
        await region.getByText('应用更新包 · 12.0 MB', { exact: true }).waitFor();
        assert.ok((await region.innerText()).includes('工具缺失、损坏或版本变化时会另行下载'));
        assert.equal(await region.getByRole('link', { name: '完整安装包', exact: true }).count(), 0);
        await settle(page);
        assert.ok((await layout(page)).scrollWidth <= viewport.width + 1);
        await region.screenshot({ path: `../build/update-download-${viewport.name}.png` });
        assert.deepEqual(opened.problems, []);
      } finally { await opened.close() }
    });
    it(`${viewport.name}：挂载目录的代理保护可切换且不越出视口`, async () => {
      const opened = await visit(browser, '/settings/library?section=' + encodeURIComponent('这台电脑'), viewport);
      const { page } = opened;
      try {
        await page.route('**/api/configuration/cloud-proxies', route => route.fulfill({ json: { accounts: [] } }));
        await page.route('**/api/configuration', async route => {
          const data = await (await route.fetch()).json();
          await route.fulfill({ json: { ...data, editable: true, windows: true, media_sources: [
            { location: 'onedrive', root: 'O:\\Movies', path: 'O:\\Movies', cost: 'metered' },
            { location: 'mounted', root: 'M:\\Movies', path: 'M:\\Movies', cost: 'free' },
            { location: 'guangya', root: 'G:\\Movies', path: 'G:\\Movies', cost: 'free' },
            { location: '115', root: 'B:\\Movies', path: 'B:\\Movies', cost: 'free' },
            { location: 'pikpak', root: 'A:\\Movies', path: 'A:\\Movies', cost: 'metered' },
          ] } });
        });
        await page.reload();
        const form = page.getByRole('form', { name: '媒体目录', exact: true });
        const protectedFolder = form.locator('[data-media-read-policy="0"] [aria-haspopup="listbox"]');
        await protectedFolder.waitFor();
        // 带品牌图的四行，来源、所属媒体库与图标各显示一枚站标。
        await page.waitForFunction(() => {
          const marks = [...document.querySelectorAll<HTMLImageElement>('[data-folder-row] img')];
          return marks.length === 12 &&marks.every(image => image.complete && image.naturalWidth > 0);
        });
        const marks = await form.locator('[data-folder-row] img').evaluateAll(images => images.map(image => {
          const box = image.getBoundingClientRect();
          return { inline: image.getAttribute('src')?.startsWith('data:image/png;base64,'),
            width: box.width, height: box.height };
        }));
        assert.deepEqual(marks, Array.from({ length: 12 }, () => ({ inline: true, width: 16, height: 16 })));
        assert.ok(!(await form.innerText()).includes('（只读）'));
        assert.ok((await protectedFolder.textContent())?.includes('代理保护'));
        assert.ok((await form.locator('[data-media-read-policy="1"]').textContent())?.includes('正常读取'));
        if (!viewport.mobile) {
          for (let index = 0; index < 5; index++) {
            const row = form.locator('[data-folder-row]').nth(index);
            const source = await row.locator('[aria-haspopup="listbox"]').first().boundingBox();
            const policy = await row.locator('[data-media-read-policy] [aria-haspopup="listbox"]').boundingBox();
            const library = await row.getByRole('button', { name: new RegExp(`目录所属媒体库 ${index + 1}`) }).boundingBox();
            const name = await row.getByRole('textbox', { name: `媒体库名称 ${index + 1}`, exact: true }).boundingBox();
            const icon = await row.getByRole('button', { name: `媒体库图标 ${index + 1}`, exact: true }).boundingBox();
            assert.ok(source && policy && library && name && icon);
            // 两排：来源与读取策略一排，所属媒体库、名称、图标一排；同排控件中线对齐，所属媒体库与来源同列。
            const spread = (boxes: { y: number; height: number }[]) => {
              const centers = boxes.map(box => box.y + box.height / 2);
              return Math.max(...centers) - Math.min(...centers);
            };
            assert.ok(spread([source, policy]) <= 3, JSON.stringify({ index, source, policy }));
            assert.ok(spread([library, name, icon]) <= 3, JSON.stringify({ index, library, name, icon }));
            assert.ok(library.y >= source.y + source.height, JSON.stringify({ index, source, library }));
            assert.ok(Math.abs(library.x - source.x) <= 1 && Math.abs(library.width - source.width) <= 1);
            assert.ok(policy.width <= 132);
            const bounds = await row.boundingBox();
            assert.ok(bounds && bounds.x + bounds.width - (icon.x + icon.width) <= 14);
          }
        }
        await protectedFolder.click();
        await page.getByRole('option', { name: '正常读取', exact: true }).click();
        await settle(page);
        assert.ok((await protectedFolder.textContent())?.includes('正常读取'));
        assert.deepEqual((await layout(page)).offenders, []);
        await form.screenshot({ path: `../build/cloud-source-icons-${viewport.name}.png` });
        assert.deepEqual(opened.problems, []);
      } finally { await opened.close() }
    });

    it(`${viewport.name}：PikPak 表单直接显示，登录按钮同排`, async () => {
      const opened = await visit(browser, '/settings/library?section=' + encodeURIComponent('下载渠道'), viewport);
      const { page } = opened;
      try {
        await page.route('**/api/configuration', async route => {
          const data = await (await route.fetch()).json();
          const body = data.downloads;
          await route.fulfill({ json: { ...data, downloads: { ...body, available: true, media_sources: ['pikpak'],
            pikpak: { ...body.pikpak, logged_in: false },
            pikpak_browser: { available: true, state: 'idle', message: '' } } } });
        });
        await page.reload();
        const form = page.getByRole('form', { name: 'PikPak 账号', exact: true });
        await form.getByLabel('账号', { exact: true }).waitFor();
        assert.equal(await form.locator('details').count(), 0);
        const password = await form.getByRole('button', { name: '登录', exact: true }).boundingBox();
        const browserLogin = await form.getByRole('button', { name: '用浏览器登录', exact: true }).boundingBox();
        assert.ok(password && browserLogin && Math.abs(password.y - browserLogin.y) <= 1);
        assert.ok((await layout(page)).scrollWidth <= viewport.width + 1);
        await form.screenshot({ path: `../build/pikpak-form-${viewport.name}.png` });
        assert.deepEqual(opened.problems, []);
      } finally { await opened.close() }
    });
    it(`${viewport.name}：完全卸载行与设置卡片正文对齐`, async () => {
      const opened = await visit(browser, '/settings/library?section=' + encodeURIComponent('应用与维护'), viewport);
      const { page } = opened;
      try {
        await page.route('**/api/configuration', async route => {
          const data = await (await route.fetch()).json();
          await route.fulfill({ json: { ...data, uninstall: { ...data.uninstall, available: false } } });
        });
        await page.reload();
        const region = page.getByRole('region', { name: '卸载 Peach', exact: true });
        await region.getByText('完全卸载', { exact: true }).waitFor();
        await settle(page);
        const geometry = await region.evaluate(node => {
          const card = node.lastElementChild!.getBoundingClientRect();
          const label = [...node.querySelectorAll('p')].find(item => item.textContent === '完全卸载')!.getBoundingClientRect();
          return { top: label.top - card.top, left: label.left - card.left };
        });
        assert.ok(geometry.top <= 12 && geometry.top >= 9, JSON.stringify(geometry));
        assert.ok(Math.abs(geometry.left - 12) <= 1, JSON.stringify(geometry));
        assert.deepEqual(opened.problems, []);
      } finally { await opened.close() }
    });
  }
});
