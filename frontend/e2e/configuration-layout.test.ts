import assert from 'node:assert/strict';
import { after, before, describe, it } from 'node:test';
import type { Browser } from 'playwright-core';
import { launch, layout, settle, visit, VIEWPORTS } from './harness.ts';

describe('配置表单与行间距', () => {
  let browser: Browser;
  before(async () => { browser = await launch() });
  after(async () => { await browser?.close() });
  for (const viewport of VIEWPORTS) {
    it(`${viewport.name}：PikPak 表单直接显示，登录按钮同排`, async () => {
      const opened = await visit(browser, '/settings/library?section=' + encodeURIComponent('下载渠道'), viewport);
      const { page } = opened;
      try {
        await page.route('**/api/configuration/downloads', async route => {
          const body = await (await route.fetch()).json();
          await route.fulfill({ json: { ...body, available: true, pikpak: { ...body.pikpak, logged_in: false },
            pikpak_browser: { available: true, state: 'idle', message: '' } } });
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
