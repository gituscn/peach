import assert from 'node:assert/strict';
import { after, before, describe, it } from 'node:test';
import type { Browser } from 'playwright-core';
import { launch, layout, requiredEnv, settle, VIEWPORTS } from './harness.ts';
import { JAV_DETAIL, mockJavDetail } from './jav-detail-fixture.ts';

describe('库外 JAV 作品详情', () => {
  let browser: Browser;
  before(async () => { browser = await launch() });
  after(async () => { await browser.close() });
  for (const viewport of VIEWPORTS) {
    it(`${viewport.name} 新作在站内打开、预览切换、评论分页与关闭返回`, { timeout: 60000 }, async () => {
      const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height }, isMobile: viewport.mobile, hasTouch: viewport.mobile, reducedMotion: 'reduce' });
      try {
        await context.addInitScript(() => localStorage.setItem('peach.settings.v1', JSON.stringify({ detailAutoplay: false, feedAutoScroll: false })));
        const page = await context.newPage();
        const errors: string[] = [];
        page.on('pageerror', error => errors.push(error.message));
        await mockJavDetail(page);
        await page.route(/\/api\/entity\/shapes/, route => route.fulfill({ json: { home: { feed: true }, entities: [] } }));
        await page.route(/\/api\/feeds\/discoveries\?/, route => route.fulfill({ json: { ok: true, items: [
          { id: 1, code: 'EXM-001', title: '示例新作', performers: '示例人物', release_date: '2026-10-30' },
        ] } }));
        await page.goto(requiredEnv('PEACH_E2E_ORIGIN') + '/');
        const card = page.locator('#feedNew [data-feed-id="1"]');
        await card.waitFor({ state: 'visible' });
        await card.getByRole('link', { name: '打开 EXM-001 的作品详情' }).click();
        await page.waitForURL('**/jav/movie/EXM-001');
        await page.locator('#stage [data-jav-detail] h1').waitFor({ state: 'visible' });
        assert.ok(await page.locator('#stage').evaluate(el => (el as HTMLDialogElement).open));
        assert.equal(await card.count(), 1, '原列表留在详情底下');
        await page.getByRole('img', { name: 'EXM-001 封面', exact: true }).waitFor({ state: 'visible' });
        const shared = await page.locator('[data-jav-info]').evaluate(el => {
          const faces = [...el.querySelectorAll('[data-identity-primary] [data-id-face]')].map(face => {
            const box = face.getBoundingClientRect(); return { width: box.width, height: box.height, y: box.y };
          });
          const stars = [...el.querySelectorAll('[data-jav-rating] svg')];
          const code = el.querySelector('[data-detail-title] b')!.getBoundingClientRect();
          const range = document.createRange();
          const text = el.querySelector('[data-detail-title]')!.lastChild!;
          range.setStart(text, 1); range.setEnd(text, 2);
          return { faces, stars: stars.length, filled: stars.filter(star => getComputedStyle(star).fill !== 'none').length,
            icons: el.querySelectorAll('[data-stage-meta] [data-spec-item] svg').length,
            codeY: code.y, titleY: range.getBoundingClientRect().y,
            tag: el.querySelector('[data-jav-tags] [data-tag]')?.textContent,
            tagCat: el.querySelector('[data-jav-tags] [data-tag-cat]')?.getAttribute('data-tag-cat') };
        });
        assert.equal(shared.faces.length, 3, '两位女优与厂牌各有独立身份格');
        assert.ok(shared.faces.every(face => face.width === 46 && face.height === 46));
        assert.ok(shared.faces.every(face => Math.abs(face.y - shared.faces[0]!.y) < 1));
        assert.equal(shared.stars, 5);
        assert.equal(shared.filled, 4);
        await page.locator('[data-jav-rating] [data-rate="1"]').hover();
        assert.equal(await page.locator('[data-jav-rating]').evaluate(el => [...el.querySelectorAll('svg')].filter(star => getComputedStyle(star).fill !== 'none').length), 4, '来源评分悬停保持原分数');
        assert.equal(shared.icons, 2);
        assert.ok(Math.abs(shared.codeY - shared.titleY) < 2, '番号与标题在同一行开始');
        assert.equal(shared.tag, '痴女'); assert.equal(shared.tagCat, 'role');
        await page.locator('[data-id-group="performer"] [data-id-face] img').waitFor({ state: 'visible' });
        assert.equal(await page.locator('[data-follow-image-dots] button').count(), 13);
        const dots = await page.locator('[data-follow-image-dots]').evaluate(el => {
          const box = el.getBoundingClientRect();
          return [...el.children].every(child => { const rect = child.getBoundingClientRect(); return rect.left >= box.left && rect.right <= box.right });
        });
        assert.ok(dots, '每个媒体入口都在圆点条内');
        assert.equal(await page.locator('[data-carousel-video]').evaluate(el => el.getBoundingClientRect().width), 20);
        if (viewport.mobile) {
          await page.setViewportSize({ width: 350, height: viewport.height });
          await page.locator('[data-follow-image-count]').waitFor({ state: 'visible' });
          assert.equal(await page.locator('[data-follow-image-count]').textContent(), '1 / 13');
          await page.setViewportSize({ width: viewport.width, height: viewport.height });
          await page.locator('[data-follow-image-dots]').waitFor({ state: 'visible' });
        }
        await page.getByRole('button', { name: '下一项媒体', exact: true }).click();
        await page.getByRole('img', { name: 'EXM-001 预览 1', exact: true }).waitFor({ state: 'visible' });
        await page.getByRole('button', { name: '上一项媒体', exact: true }).click();
        await page.getByRole('button', { name: '视频预览', exact: true }).first().click();
        await page.waitForFunction(() => { const video = document.querySelector<HTMLVideoElement>('[data-jav-video] video'); return video && video.readyState >= 1 && Number.isFinite(video.duration) && video.duration > 0 });
        assert.ok(await page.locator('[data-jav-video] video').evaluate(video => (video as HTMLVideoElement).paused), '预览等待用户播放');
        await page.locator('[data-jav-video] video').evaluate(async node => { const video = node as HTMLVideoElement; video.muted = true; await video.play() });
        await page.waitForFunction(() => (document.querySelector<HTMLVideoElement>('[data-jav-video] video')?.currentTime || 0) > 0);
        await page.getByRole('button', { name: '查看图片', exact: true }).click();
        assert.equal(await page.locator('[data-jav-video] video').count(), 0, '切回图片卸下预览播放器');
        await page.getByRole('button', { name: '查看评论', exact: true }).click();
        await page.waitForFunction(() => document.querySelectorAll('[data-jav-review]').length === 10);
        assert.equal(await page.locator('[data-jav-review] img').count(), 0, '评论正文按文本呈现');
        await page.getByRole('button', { name: '更多评论', exact: true }).click();
        await page.waitForFunction(() => document.querySelectorAll('[data-jav-review]').length === 12);
        assert.equal(await page.getByRole('button', { name: '更多评论', exact: true }).count(), 0);
        await page.getByRole('button', { name: '查看资源', exact: true }).click();
        await page.getByText('EXM-001 示例资源 1', { exact: true }).waitFor({ state: 'visible' });
        assert.equal(await page.locator('[data-jav-resources] [data-resource-protocol]:visible').count(), 3);
        await page.getByText('更多资源（3 条）', { exact: true }).click();
        await page.getByText('EXM-001 示例资源 6', { exact: true }).waitFor({ state: 'visible' });
        assert.equal(await page.locator('[data-jav-resources] [data-resource-protocol]:visible').count(), 6);
        assert.ok(await page.locator('[data-jav-resources]').getByRole('button', { name: '添加下载', exact: true }).first().isDisabled());
        await page.getByRole('button', { name: '想要', exact: true }).click();
        await page.getByRole('button', { name: '取消想要', exact: true }).waitFor({ state: 'visible' });
        await page.getByRole('button', { name: '取消想要', exact: true }).click();
        await page.getByRole('button', { name: '想要', exact: true }).waitFor({ state: 'visible' });
        await settle(page);
        const geometry = await layout(page);
        assert.ok(geometry.scrollWidth <= geometry.viewportWidth + 1);
        assert.deepEqual(errors, []);
        await page.screenshot({ path: `../build/jav-detail-${viewport.name}.png` });
        await page.locator('#closeStage').click();
        await page.waitForURL(requiredEnv('PEACH_E2E_ORIGIN') + '/');
        await card.waitFor({ state: 'visible' });
        assert.equal(await page.locator('#stage').count(), 0);
        await page.goBack();
        await page.locator('#stage [data-jav-detail] h1').waitFor({ state: 'visible' });
        await page.keyboard.press('Escape');
        await page.waitForURL(requiredEnv('PEACH_E2E_ORIGIN') + '/');
      } finally { await context.close() }
    });
    it(`${viewport.name} 深链刷新与来源未取得仍可关闭`, { timeout: 60000 }, async () => {
      const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height }, reducedMotion: 'reduce' });
      try {
        const page = await context.newPage();
        await mockJavDetail(page);
        await page.route(/\/api\/jav\/detail\?/, route => route.fulfill({ json: { ...JAV_DETAIL, state: 'partial', source_image: false,
          preview_count: 0, message: '作品资料未取得，请稍后重试' } }));
        await page.goto(requiredEnv('PEACH_E2E_ORIGIN') + '/jav/movie/EXM-001');
        await page.getByText('作品资料未取得，请稍后重试', { exact: true }).waitFor({ state: 'visible' });
        await page.reload();
        await page.getByText('作品资料未取得，请稍后重试', { exact: true }).waitFor({ state: 'visible' });
        await page.locator('#closeStage').click();
        await page.waitForURL('**/jav?tab=discover');
      } finally { await context.close() }
    });
  }
});
