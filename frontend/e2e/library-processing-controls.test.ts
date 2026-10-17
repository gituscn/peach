import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { after, before, describe, it } from 'node:test';
import type { Browser } from 'playwright-core';
import { launch, layout, settle, visit, VIEWPORTS } from './harness.ts';

describe('扫描与采集控制', () => {
  let browser: Browser;
  before(async () => { browser = await launch() });
  after(async () => { await browser?.close() });
  for (const viewport of VIEWPORTS) {
    it(`${viewport.name}：资源提示、粗估、模式切换与暂停继续`, async () => {
      let state = { status: 'idle', job_id: '', checked: 0, total: 100, speed_mode: 'standard',
        current_asset_name: '', current_action: '', stage: '',
        eta_kind: 'historical', eta_initial: true, eta_seconds_min: 1200, eta_seconds_max: 2400 };
      const writes: Record<string, unknown>[] = [];
      const opened = await visit(browser, '/data-cleanup', viewport, async page => {
        await page.route('**/api/library-processing', async route => {
          if (route.request().method() === 'POST') {
            const body = route.request().postDataJSON();
            writes.push(body);
            if (body.action === 'pause') state.status = 'pausing';
            else if (body.action === 'resume') state = { ...state, status: 'running', eta_initial: false,
              eta_kind: 'measured', eta_seconds_min: 600, eta_seconds_max: 900 };
            else if (body.action === 'set_speed') state.speed_mode = body.speed_mode;
            else state = { ...state, status: 'running', job_id: 'controlled', speed_mode: body.speed_mode,
              checked: 38, current_asset_name: '示例影片.mp4', current_action: 'querying_metadata', stage: '采集缺失资料' };
          }
          await route.fulfill({ json: state });
        });
      });
      const { page } = opened;
      const card = page.getByRole('region', { name: '扫描与采集', exact: true });
      const artifacts = path.resolve('..', 'build', 'agent-verification', 'processing-controls');
      await mkdir(artifacts, { recursive: true });
      try {
        await card.waitFor();
        await settle(page);
        await card.getByRole('button', { name: '同步媒体库', exact: true }).click();
        const dialog = page.getByRole('dialog', { name: '同步媒体库', exact: true });
        await dialog.waitFor();
        assert.match(await dialog.innerText(), /可能让电脑变慢/);
        assert.equal(writes.length, 0);
        const modalLayout = await layout(page);
        assert.ok(modalLayout.scrollWidth <= modalLayout.viewportWidth, JSON.stringify(modalLayout));
        assert.deepEqual(modalLayout.offenders, []);
        const optionFits = await dialog.locator('label').evaluateAll(labels => labels.every(label => {
          const text = label.querySelector('span[aria-hidden="true"]')!.getBoundingClientRect();
          const box = label.getBoundingClientRect();
          return text.top >= box.top && text.bottom <= box.bottom && text.right <= box.right;
        }));
        assert.equal(optionFits, true, '处理模式文字应保持单行并落在控件内');
        await dialog.screenshot({ path: path.join(artifacts, `${viewport.name}-startup.png`) });
        await dialog.getByRole('radio', { name: '低占用', exact: true }).check();
        await dialog.getByRole('button', { name: '同步媒体库', exact: true }).click();
        await card.getByText('预计剩余约 20–40 分钟（粗估）', { exact: true }).waitFor();
        assert.equal(writes[0]?.speed_mode, 'low');
        await card.getByRole('button', { name: '暂停', exact: true }).click();
        await card.getByText('正在暂停，当前步骤结束后暂停', { exact: true }).waitFor();
        state.status = 'paused';
        const resume = card.getByRole('button', { name: '继续', exact: true });
        await resume.waitFor();
        assert.equal(await card.getByRole('button', { name: '同步媒体库', exact: true }).getAttribute('aria-disabled'), 'true');
        await page.reload();
        await resume.waitFor();
        await card.locator('label').filter({ hasText: /^标准$/ }).click();
        await page.waitForFunction(() => document.querySelector('section[aria-label="扫描与采集"] input[value="standard"]:checked'));
        await resume.click();
        await card.getByText('预计剩余约 10–15 分钟', { exact: true }).waitFor();
        assert.ok(writes.some(body => body.action === 'pause' && body.job_id === 'controlled'));
        assert.ok(writes.some(body => body.action === 'resume' && body.job_id === 'controlled'));
        assert.ok(writes.some(body => body.action === 'set_speed' && body.speed_mode === 'standard'));
        // 同步入口在后台任务期间保持忙态；这里只等待有限的控制请求结束。
        await settle(page, 'section[aria-label="扫描与采集"] [data-processing-controls]');
        const measured = await layout(page);
        assert.ok(measured.scrollWidth <= measured.viewportWidth, JSON.stringify(measured));
        assert.deepEqual(measured.offenders, []);
        await page.screenshot({ path: path.join(artifacts, `${viewport.name}-page.png`), fullPage: true });
        await card.screenshot({ path: path.join(artifacts, `${viewport.name}.png`) });
        await page.goto(new URL('/', page.url()).href);
        const banner = page.locator('#libraryProcessingNotice');
        await banner.getByRole('button', { name: '暂停', exact: true }).waitFor();
        await banner.getByRole('radio', { name: '低占用', exact: true }).waitFor();
        await settle(page, '#libraryProcessingNotice');
        const homeLayout = await layout(page);
        assert.ok(homeLayout.scrollWidth <= homeLayout.viewportWidth, JSON.stringify(homeLayout));
        assert.deepEqual(homeLayout.offenders, []);
        await banner.screenshot({ path: path.join(artifacts, `${viewport.name}-notice.png`) });
        assert.deepEqual(opened.problems, []);
      } finally { await opened.close() }
    });
  }
});
