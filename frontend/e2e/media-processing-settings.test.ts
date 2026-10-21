import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { after, before, describe, it } from 'node:test';
import type { Browser } from 'playwright-core';
import { launch, layout, settle, visit, VIEWPORTS } from './harness.ts';

describe('视频预览设置', () => {
  let browser: Browser;
  before(async () => { browser = await launch() });
  after(async () => { await browser?.close() });
  for (const viewport of VIEWPORTS) {
    it(`${viewport.name}：总开关持久化并控制时间轴设置，重新开启后时间轴由用户选择`, async () => {
      let disabled = false;
      let timeline = 'coarse';
      let previewAcceleration = 'auto';
      let playbackAcceleration = 'auto';
      const writes: unknown[] = [];
      const opened = await visit(browser, '/settings/library', viewport, async page => {
        await page.route('**/api/media-processing', async route => {
          if (route.request().method() === 'POST') {
            const body = route.request().postDataJSON();
            writes.push(body);
            if ('metadata_only' in body) {
              disabled = body.metadata_only;
              if (disabled) timeline = 'off';
            }
            if ('preview_acceleration' in body) previewAcceleration = body.preview_acceleration;
            if ('playback_acceleration' in body) playbackAcceleration = body.playback_acceleration;
          }
          await route.fulfill({ json: { metadata_only: disabled,
            preview_acceleration: previewAcceleration, playback_acceleration: playbackAcceleration } });
        });
        await page.route('**/api/thumbnail-jobs', route => route.fulfill({ json: { mode: timeline, status: 'idle' } }));
      });
      const { page } = opened;
      try {
        const toggle = page.getByRole('switch', { name: '生成视频预览', exact: true });
        const interval = page.locator('#videoThumbnailSetting button');
        await toggle.waitFor();
        await settle(page);
        assert.equal(await toggle.isChecked(), true);
        assert.equal(await interval.isDisabled(), false);
        await page.locator('label').filter({ has: toggle }).click();
        await page.getByText('已关闭视频预览生成', { exact: true }).waitFor();
        assert.equal(await toggle.isChecked(), false);
        assert.equal(await interval.isDisabled(), true);
        await page.reload();
        await toggle.waitFor();
        await settle(page);
        assert.equal(await toggle.isChecked(), false);
        assert.equal(await interval.isDisabled(), true);
        assert.match(await interval.innerText(), /关闭/);
        await toggle.focus();
        await page.keyboard.press('Space');
        await page.getByText('已开启视频预览生成', { exact: true }).waitFor();
        assert.equal(await interval.isDisabled(), false);
        assert.match(await interval.innerText(), /关闭/);
        assert.deepEqual(writes, [{ metadata_only: true }, { metadata_only: false }]);
        const preview = page.locator('#previewAccelerationSetting button');
        const playback = page.locator('#playbackAccelerationSetting button');
        await preview.click();
        await page.getByRole('option', { name: '软件解码', exact: true }).click();
        await page.getByText('已保存抽帧解码方式', { exact: true }).waitFor();
        assert.equal(previewAcceleration, 'software');
        assert.equal(playbackAcceleration, 'auto');
        assert.match(await playback.innerText(), /自动/);
        await playback.click();
        await page.getByRole('option', { name: '软件编解码', exact: true }).click();
        await page.getByText('已保存播放编解码方式', { exact: true }).waitFor();
        assert.equal(playbackAcceleration, 'software');
        assert.deepEqual(writes.slice(-2), [{ preview_acceleration: 'software' }, { playback_acceleration: 'software' }]);
        await page.reload();
        await preview.waitFor();
        await settle(page);
        assert.match(await preview.innerText(), /软件解码/);
        assert.match(await playback.innerText(), /软件编解码/);
        const measured = await layout(page);
        assert.ok(measured.scrollWidth <= measured.viewportWidth, JSON.stringify(measured));
        assert.deepEqual(measured.offenders, []);
        const artifacts = path.resolve('..', 'build', 'agent-verification', 'media-processing');
        await mkdir(artifacts, { recursive: true });
        await page.screenshot({ path: path.join(artifacts, `${viewport.name}.png`), fullPage: true });
        assert.deepEqual(opened.problems, []);
      } finally { await opened.close() }
    });
  }
});
