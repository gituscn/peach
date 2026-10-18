/* 字幕文件、中文结果选择与 YouTube 层级选项，使用合成字幕和演示视频。 */
import assert from 'node:assert/strict';
import { before, after, describe, it } from 'node:test';
import { join } from 'node:path';
import type { Browser, Page } from 'playwright-core';
import { launch, requiredEnv, visit, VIEWPORTS } from './harness.ts';

const SRT = '1\n00:00:00,000 --> 00:00:02,000\n测试字幕 <b>粗体</b>\n';
async function caption(page: Page, text: string) {
  await page.locator('.vjs-peach-caption-line').filter({ hasText: text }).waitFor({ timeout: 5_000 }).catch(async error => {
    const state = await page.locator('#stage video.vjs-tech').evaluate((video: HTMLVideoElement) => ({
      time: video.currentTime, ready: video.readyState,
      tracks: [...video.textTracks].map(track => ({ mode: track.mode, cues: track.cues?.length, active: track.activeCues?.length })),
      overlay: video.closest('.video-js')?.querySelector('.vjs-peach-captions')?.outerHTML,
    }));
    throw new Error(`${String(error)} ${JSON.stringify(state)}`);
  });
}
async function menu(page: Page) {
  await page.locator('#stage [data-player-quality]>button').click();
  await page.locator('#stage [data-player-subtitles]').click();
}

describe('播放器字幕', () => {
  let browser: Browser;
  before(async () => { browser = await launch() });
  after(async () => { await browser?.close() });
  for (const viewport of VIEWPORTS) {
    it(`${viewport.name}：本地字幕、选项持久化、关闭和重新开启`, { timeout: 60_000 }, async () => {
      const opened = await visit(browser, `/assets/${requiredEnv('PEACH_E2E_ITEM')}`, viewport);
      const { page, problems } = opened;
      try {
        await page.locator('#stage .vjs-peach-bezel').waitFor({ state: 'attached' });
        assert.equal(await page.locator('#stage .vjs-subtitles-control>button>svg path').count(), 1);
        await page.waitForFunction(() => document.querySelector<HTMLVideoElement>('#stage video.vjs-tech')!.readyState >= 2);
        await page.locator('#stage video.vjs-tech').evaluate((video: HTMLVideoElement) => { video.currentTime = .25 });
        await menu(page);
        const chooser = page.waitForEvent('filechooser');
        await page.locator('[data-subtitle-file]').click();
        await (await chooser).setFiles({ name: '测试.chs.srt', mimeType: 'text/plain', buffer: Buffer.from(SRT) });
        await page.waitForFunction(() => [...document.querySelector<HTMLVideoElement>('#stage video.vjs-tech')!.textTracks].some(track => track.label === '测试.chs.srt' && track.mode === 'showing'));
        await caption(page, '测试字幕');
        assert.equal(await page.locator('#stage .vjs-subtitles-control>button').evaluate(node => getComputedStyle(node, '::after').backgroundColor), await page.locator('#stage .vjs-play-progress').evaluate(node => getComputedStyle(node).backgroundColor));
        assert.equal(await page.locator('.vjs-peach-caption-line b').textContent(), '粗体');
        await page.locator('[data-subtitle-options]').click();
        await page.locator('[data-subtitle-style="size"]').click();
        await page.locator('[data-subtitle-value="150"]').click();
        assert.equal(await page.locator('#stage .video-js').evaluate(node => getComputedStyle(node).getPropertyValue('--peach-caption-scale').trim()), '1.5');
        await page.locator('[data-subtitle-style="color"]').click();
        await page.locator('[data-subtitle-value="yellow"]').click();
        assert.equal(await page.locator('.vjs-peach-captions').evaluate(node => getComputedStyle(node).color), 'rgb(255, 255, 0)');
        const bounds = await page.locator('#stage .video-js').evaluate(root => {
          const frame = root.getBoundingClientRect(), menu = root.querySelector('.vjs-peach-settings-menu')!.getBoundingClientRect();
          return { menuTop: menu.top, frameTop: frame.top, menuRight: menu.right, frameRight: frame.right };
        });
        assert.ok(bounds.menuTop >= bounds.frameTop && bounds.menuRight <= bounds.frameRight + 1, JSON.stringify(bounds));
        await page.screenshot({ path: join(process.cwd(), `../build/subtitles-${viewport.name}.png`) });
        await page.locator('[data-subtitle-back]').click();
        await page.getByRole('menuitemradio', { name: '关闭', exact: true }).click();
        await page.locator('.vjs-peach-captions').waitFor({ state: 'hidden' });
        await page.locator('#stage [data-player-quality]>button').click();
        if (viewport.mobile) await page.locator('#stage [data-player-expand]').click();
        await page.locator('#stage .vjs-subtitles-control>button').click();
        await page.locator('.vjs-peach-captions').waitFor({ state: 'visible' });
        await page.reload();
        await page.locator('#stage .vjs-peach-bezel').waitFor({ state: 'attached' });
        assert.equal(await page.locator('#stage .video-js').evaluate(node => getComputedStyle(node).getPropertyValue('--peach-caption-scale').trim()), '1.5');
        await menu(page);
        await page.locator('[data-subtitle-options]').click();
        await page.locator('[data-subtitle-reset]').click();
        assert.equal(await page.locator('#stage .video-js').evaluate(node => getComputedStyle(node).getPropertyValue('--peach-caption-scale').trim()), '1');
        assert.deepEqual(problems, []);
      } finally { await opened.close() }
    });
  }

  it('搜索结果在播放器内选文件并加载，重选同一文件复用会话字幕', { timeout: 60_000 }, async () => {
    let downloads = 0;
    const opened = await visit(browser, `/assets/${requiredEnv('PEACH_E2E_ITEM')}`, VIEWPORTS[0]!, async page => {
      await page.route('**/api/subtitles/search?**', route => {
        assert.equal(new URL(route.request().url()).searchParams.get('q'), 'ABP-758');
        return route.fulfill({ json: { results: [{ id: 'test42', title: 'ABP-758 中文字幕', language: '简体中文', format: 'SRT' }], more: false } });
      });
      await page.route('**/api/subtitles/subtitlecat/test42', route => route.fulfill({ json: { files: [{ index: 0, name: 'ABP-758.chs.srt', language: '简体中文', playable: true }] } }));
      await page.route('**/api/subtitles/subtitlecat/test42/0', route => { downloads++; return route.fulfill({ contentType: 'text/vtt', body: 'WEBVTT\n\n00:00:00.000 --> 00:00:02.000\n在线字幕\n' }) });
    });
    const { page, problems } = opened;
    try {
      await page.locator('#stage .vjs-peach-bezel').waitFor({ state: 'attached' });
      await page.waitForFunction(() => document.querySelector<HTMLVideoElement>('#stage video.vjs-tech')!.readyState >= 2);
      await page.locator('#stage video.vjs-tech').evaluate((video: HTMLVideoElement) => { video.currentTime = .25 });
      await menu(page);
      for (let index = 0; index < 2; index++) {
        await page.locator('[data-subtitle-search]').click();
        await page.getByRole('searchbox', { name: '搜索字幕' }).fill('ABP-758');
        await page.getByRole('searchbox', { name: '搜索字幕' }).press('Enter');
        await page.locator('[data-subtitle-result]').click();
        await page.locator('[data-subtitle-online]').click();
        await page.getByRole('menuitemradio', { name: 'ABP-758.chs.srt', exact: true }).waitFor();
      }
      await caption(page, '在线字幕');
      assert.equal(downloads, 1);
      assert.equal(await page.locator('#stage video.vjs-tech > track').count(), 1);
      assert.deepEqual(problems, []);
    } finally { await opened.close() }
  });
});
