import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { after, before, describe, it } from 'node:test';
import type { Browser, Page } from 'playwright-core';
import { launch, layout, settle, visit, VIEWPORTS } from './harness.ts';

/** 这台机器的媒体处理偏好：页面写进来的值留在这一份里，重新载入读回的就是它。 */
function mediaProcessing() {
  const state = { disabled: false, timeline: 'coarse', previewAcceleration: 'auto', playbackAcceleration: 'auto' };
  const writes: unknown[] = [];
  const route = async (page: Page) => {
    await page.route('**/api/media-processing', async route => {
      if (route.request().method() === 'POST') {
        const body = route.request().postDataJSON();
        writes.push(body);
        if ('metadata_only' in body) {
          state.disabled = body.metadata_only;
          if (state.disabled) state.timeline = 'off';
        }
        if ('preview_acceleration' in body) state.previewAcceleration = body.preview_acceleration;
        if ('playback_acceleration' in body) state.playbackAcceleration = body.playback_acceleration;
      }
      await route.fulfill({ json: { metadata_only: state.disabled,
        preview_acceleration: state.previewAcceleration, playback_acceleration: state.playbackAcceleration } });
    });
    await page.route('**/api/thumbnail-jobs', route => route.fulfill({ json: { mode: state.timeline, status: 'idle' } }));
  };
  return { state, writes, route };
}

describe('视频预览设置', () => {
  let browser: Browser;
  before(async () => { browser = await launch() });
  after(async () => { await browser?.close() });
  for (const viewport of VIEWPORTS) {
    it(`${viewport.name}：总开关持久化并控制时间轴设置，重新开启后时间轴由用户选择`, async () => {
      const { state, writes, route } = mediaProcessing();
      const opened = await visit(browser, '/settings/library', viewport, route);
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
        await preview.click();
        await page.getByRole('option', { name: '软件解码', exact: true }).click();
        await page.getByText('已保存抽帧解码方式', { exact: true }).waitFor();
        assert.equal(state.previewAcceleration, 'software');
        assert.equal(state.playbackAcceleration, 'auto');
        assert.deepEqual(writes.slice(-1), [{ preview_acceleration: 'software' }]);
        // 播放转码只在设置弹窗「浏览与播放」里，与其它播放设置同处。
        assert.equal(await page.locator('#playbackAccelerationSetting').count(), 0);
        await page.reload();
        await preview.waitFor();
        await settle(page);
        assert.match(await preview.innerText(), /软件解码/);
        const measured = await layout(page);
        assert.ok(measured.scrollWidth <= measured.viewportWidth, JSON.stringify(measured));
        assert.deepEqual(measured.offenders, []);
        const artifacts = path.resolve('..', 'build', 'agent-verification', 'media-processing');
        await mkdir(artifacts, { recursive: true });
        await page.screenshot({ path: path.join(artifacts, `${viewport.name}.png`), fullPage: true });
        assert.deepEqual(opened.problems, []);
      } finally { await opened.close() }
    });

    it(`${viewport.name}：设置弹窗「浏览与播放」里改转码方式，只写这一项，重新打开读回`, async () => {
      const { state, writes, route } = mediaProcessing();
      const opened = await visit(browser, '/settings/playback', viewport, route);
      const { page } = opened;
      try {
        const field = page.locator('#settingsPanel #playbackAccelerationSetting');
        const trigger = field.locator('[data-select-trigger]');
        await trigger.waitFor({ state: 'visible' });
        await page.waitForFunction(() => !document.querySelector('#playbackAccelerationSetting [data-select-trigger]')?.hasAttribute('disabled'));
        await settle(page);
        assert.match(await trigger.innerText(), /自动/);
        await trigger.click();
        await field.locator('[data-select-option="software"]').click();
        await page.getByText('已保存转码方式', { exact: true }).waitFor();
        assert.equal(state.playbackAcceleration, 'software');
        assert.equal(state.previewAcceleration, 'auto');
        assert.deepEqual(writes, [{ playback_acceleration: 'software' }]);
        await page.reload();
        await trigger.waitFor({ state: 'visible' });
        await page.waitForFunction(() => /软件编解码/.test(document.querySelector('#playbackAccelerationSetting [data-select-trigger]')?.textContent || ''));
        const measured = await layout(page);
        assert.ok(measured.scrollWidth <= measured.viewportWidth, JSON.stringify(measured));
        assert.deepEqual(measured.offenders, []);
        assert.deepEqual(opened.problems, []);
      } finally { await opened.close() }
    });
  }
});
