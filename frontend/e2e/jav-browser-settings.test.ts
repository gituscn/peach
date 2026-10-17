import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { after, before, describe, it } from 'node:test';
import type { Browser } from 'playwright-core';
import { launch, layout, settle, visit, VIEWPORTS } from './harness.ts';

const SITES = JSON.parse(readFileSync(new URL('../../web/integrations/jav-sites.json', import.meta.url), 'utf8')).sites;

describe('浏览器添加 JAV 设置', () => {
  let browser: Browser;
  before(async () => { browser = await launch(); });
  after(async () => { await browser?.close(); });
  for (const viewport of VIEWPORTS) {
    it(`${viewport.name}：启用、轮换与关闭，令牌只在签发响应后显示`, async () => {
      const opened = await visit(browser, '/settings/library?section=' + encodeURIComponent('下载渠道'), viewport);
      const { page } = opened;
      try {
        let enabled = false;
        const posted: Record<string, unknown>[] = [];
        await page.route('**/api/configuration/jav-browser', async route => {
          const request = route.request();
          const state = { enabled, provider: '115', available: true, sites: SITES, providers: [
            { key: '115', label: '115', configured: true, target: '/115/Movies' },
            { key: 'pikpak', label: 'PikPak', configured: true, target: '/Movies' },
          ] };
          if (request.method() === 'POST') {
            const body = request.postDataJSON();
            posted.push(body);
            enabled = body.action !== 'disable';
            await route.fulfill({ json: { ...state, enabled,
              ...(enabled ? { token: 'test-issued-token-' + posted.length } : {}) } });
          } else await route.fulfill({ json: state });
        });
        await page.reload();
        const region = page.getByRole('region', { name: '浏览器添加 JAV', exact: true });
        await region.getByText('支持的站点', { exact: true }).click();
        await region.getByText(/^数据库：自动识别：JavDB、JavBus、JavLibrary/).waitFor();
        await region.getByText(/^发行平台：选中番号：FANZA \/ DMM/).waitFor();
        await region.getByText(/Tokyo-Hot/).waitFor();
        await region.getByRole('button', { name: '启用并生成令牌', exact: true }).click();
        const token = region.getByLabel('浏览器添加专用令牌', { exact: true });
        await token.waitFor();
        assert.equal(await token.inputValue(), 'test-issued-token-1');
        assert.equal(await token.getAttribute('type'), 'password');
        assert.equal(await region.getByRole('link', { name: '安装 Peach 用户脚本' }).getAttribute('href'),
          '/integrations/peach-jav.user.js');
        assert.equal(await region.getByLabel('Peach 地址', { exact: true }).inputValue(), new URL(page.url()).origin);
        await region.getByRole('button', { name: '更新渠道与令牌', exact: true }).click();
        await page.waitForFunction(() => document.querySelector<HTMLInputElement>(
          'input[type="password"][value="test-issued-token-2"]') !== null);
        await region.getByRole('button', { name: '关闭浏览器添加', exact: true }).click();
        await token.waitFor({ state: 'detached' });
        assert.deepEqual(posted.map(body => body.action), ['enable', 'rotate', 'disable']);
        assert.ok(posted.every(body => body.provider === '115'));
        await settle(page);
        assert.ok((await layout(page)).scrollWidth <= viewport.width + 1);
        assert.deepEqual(opened.problems, []);
        await region.screenshot({ path: `../build/jav-browser-settings-${viewport.name}.png` });
      } finally { await opened.close(); }
    });
  }
});
