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
        steps: [{ id: 'sources', label: '扫描文件', status: 'complete' },
          { id: 'collect', label: '采集外部资料与封面', status: 'current' }],
        current_asset_name: '', current_action: '', stage: '',
        stalled: false, waited_seconds: 0,
        traffic: { used_bytes: 0, estimated_min_bytes: 1048576, estimated_max_bytes: 8388608,
          workload: { video_files: 200, jav_files: 60, jav_titles: 40 },
          estimated_bytes: 6291456, metered_estimated_bytes: 3145728,
          metered_used_bytes: 0, metered_estimated_min_bytes: 0, metered_estimated_max_bytes: 4194304,
          partial: true, unknown_files: true,
          sources: [{ key: 'drive-a', label: '示例网盘 A', root: 'A:\\Media', location: '115', metered: true,
            used_bytes: 0, estimated_bytes: 3145728, estimated_min_bytes: 0, estimated_max_bytes: 4194304, unobserved: ['挂载缓存与预读未观测'] },
          { key: 'drive-b', label: '示例网盘 B', root: 'B:\\Media', location: 'pikpak', metered: false,
            used_bytes: 0, estimated_bytes: 3145728, estimated_min_bytes: 1048576, estimated_max_bytes: 4194304, unobserved: ['挂载缓存与预读未观测'] }] },
        eta_kind: 'historical', eta_initial: true, eta_seconds_min: 1200, eta_seconds_max: 2400 };
      const writes: Record<string, unknown>[] = [];
      let inventoryComplete = false;
      let inventoryReads = 0;
      const opened = await visit(browser, '/data-cleanup', viewport, async page => {
        await page.route('**/api/library-processing{,?*}', async route => {
          const url = new URL(route.request().url());
          if (url.searchParams.has('estimate')) {
            inventoryReads += 1;
            await route.fulfill({ json: { traffic: { ...state.traffic,
              workload: inventoryComplete ? state.traffic.workload : { video_files: 10, jav_files: 3, jav_titles: 2 },
              inventory: inventoryComplete ? { complete: true, errors: 0 } : { complete: false, errors: 0, token: 'inventory' } } } });
            return;
          }
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
        assert.equal(await card.locator('[data-processing-controls]').count(), 0);
        assert.equal(await card.getByRole('button', { name: '同步媒体库', exact: true }).locator('svg').count(), 0);
        await card.getByRole('button', { name: '更多同步方式', exact: true }).click();
        const menu = page.getByRole('dialog', { name: '同步方式', exact: true });
        assert.equal(await menu.locator('svg').count(), 0);
        assert.equal(await menu.getByRole('button').count(), 4);
        for (const label of ['仅扫描文件', '仅补全已入库影片', '仅补全影片资料', '仅补全预览图']) {
          await menu.getByText(label, { exact: true }).waitFor();
        }
        await menu.getByText('为已入库的本地视频生成九宫格', { exact: true }).waitFor();
        await menu.screenshot({ path: path.join(artifacts, `${viewport.name}-processing-menu.png`) });
        await menu.press('Escape');
        await card.getByRole('button', { name: '同步媒体库', exact: true }).click();
        const dialog = page.getByRole('dialog', { name: '同步媒体库', exact: true });
        await dialog.waitFor();
        assert.match(await dialog.innerText(), /可能让电脑变慢/);
        assert.equal(writes.length, 0);
        const modalLayout = await layout(page);
        assert.ok(modalLayout.scrollWidth <= modalLayout.viewportWidth, JSON.stringify(modalLayout));
        assert.deepEqual(modalLayout.offenders, []);
        await dialog.getByText('正在统计新目录…', { exact: true }).waitFor();
        assert.equal(await dialog.getByRole('button', { name: '同步媒体库', exact: true }).isEnabled(), true);
        await dialog.getByText('视频 10 个', { exact: true }).waitFor();
        const libraryLink = dialog.getByRole('link', { name: '管理媒体库', exact: true });
        assert.equal(await libraryLink.getAttribute('href'), '/settings/library');
        const footerOrder = await dialog.locator('.geist-modal-footer').evaluate(el => {
          const link = el.querySelector('a')!.getBoundingClientRect();
          const confirm = el.querySelector('[data-modal-confirm]')!.getBoundingClientRect();
          return link.left < confirm.left && Math.abs((link.top + link.bottom) / 2 - (confirm.top + confirm.bottom) / 2) < 1;
        });
        assert.equal(footerOrder, true, '管理媒体库与主按钮在右下同排居中');
        await libraryLink.click();
        await page.waitForURL('**/settings/library');
        assert.equal(await page.getByRole('dialog', { name: '同步媒体库', exact: true }).count(), 0);
        const inventoryAtClose = inventoryReads;
        await page.waitForTimeout(600);
        assert.equal(inventoryReads, inventoryAtClose);
        assert.equal(writes.length, 0);
        await page.goto(new URL('/data-cleanup', page.url()).href);
        await card.waitFor();
        await card.getByRole('button', { name: '同步媒体库', exact: true }).click();
        await dialog.getByText('正在统计新目录…', { exact: true }).waitFor();
        inventoryComplete = true;
        await dialog.getByText('预计总流量', { exact: true }).waitFor();
        await dialog.getByText('可识别 JAV 60 个（40 部）', { exact: true }).waitFor();
        const centering = await dialog.locator('.processing-effort-panel').evaluate(el => {
          const panel = el.getBoundingClientRect();
          const modal = el.closest('dialog')!.getBoundingClientRect();
          return Math.abs((panel.left + panel.right) / 2 - (modal.left + modal.right) / 2);
        });
        assert.ok(centering < 1, `处理强度面板居中偏差 ${centering}px`);
        const footer = await dialog.locator('.geist-modal-footer').evaluate(el => ({ display: getComputedStyle(el).display, padding: getComputedStyle(el).padding }));
        assert.equal(footer.display, 'flex');
        assert.notEqual(footer.padding, '0px');
        const disclosure = dialog.locator('summary');
        assert.equal(await disclosure.getAttribute('aria-expanded'), 'false');
        assert.equal(await disclosure.locator('svg').count(), 1);
        await page.emulateMedia({ reducedMotion: 'no-preference' });
        await dialog.getByText('查看明细', { exact: true }).click();
        assert.equal(await disclosure.getAttribute('aria-expanded'), 'true');
        const sources = dialog.locator('[data-processing-traffic] li');
        assert.match(await sources.nth(0).innerText(), /示例网盘 A[\s\S]*代理/);
        assert.match(await sources.nth(1).innerText(), /示例网盘 B[\s\S]*直连/);
        assert.equal(await sources.locator('svg, img').count(), 2);
        assert.equal((await dialog.innerText()).includes('未观测'), false);
        assert.match(await dialog.innerText(), /约 6MB/);
        const collapse = dialog.locator('.ui-fcollapse');
        const transition = await collapse.evaluate(el => ({ property: getComputedStyle(el).transitionProperty, duration: getComputedStyle(el).transitionDuration }));
        assert.equal(transition.property, 'height');
        assert.notEqual(transition.duration, '0s');
        await page.emulateMedia({ reducedMotion: 'reduce' });
        assert.equal(await collapse.evaluate(el => getComputedStyle(el).transitionProperty), 'none');
        await page.emulateMedia({ reducedMotion: 'no-preference' });
        await disclosure.click();
        await page.waitForFunction(() => !document.querySelector('dialog [data-processing-traffic] details')?.hasAttribute('open'));
        await disclosure.click();
        await page.emulateMedia({ reducedMotion: 'reduce' });
        const startupSlider = dialog.getByRole('slider');
        await startupSlider.press('End');
        await dialog.screenshot({ path: path.join(artifacts, `${viewport.name}-high-startup.png`) });
        await startupSlider.press('Home');
        await dialog.screenshot({ path: path.join(artifacts, `${viewport.name}-startup.png`) });
        await dialog.getByRole('button', { name: '同步媒体库', exact: true }).click();
        await card.getByText('预计剩余约 20–40 分钟（粗估）', { exact: true }).waitFor();
        assert.equal(writes[0]?.speed_mode, 'low');
        const dock = page.locator('#toasts [data-processing-dock]');
        await dock.locator('[data-processing-traffic]').waitFor();
        state.traffic = { ...state.traffic, used_bytes: 2097152, metered_used_bytes: 1048576,
          estimated_min_bytes: 2097152, metered_estimated_min_bytes: 1048576, unknown_files: false,
          sources: state.traffic.sources.map(source => ({ ...source, used_bytes: 1048576, estimated_min_bytes: 1048576 })) };
        await dock.getByText('约 2MB', { exact: true }).waitFor();
        const pause = dock.getByRole('button', { name: '暂停', exact: true });
        assert.equal(await pause.innerText(), '');
        assert.equal(await pause.locator('svg').count(), 1);
        await dock.getByRole('button', { name: '暂停', exact: true }).click();
        await dock.getByText('正在暂停，当前步骤结束后暂停', { exact: true }).waitFor();
        state.status = 'paused';
        const resume = dock.getByRole('button', { name: '继续', exact: true });
        await resume.waitFor();
        assert.equal(await resume.innerText(), '');
        assert.equal(await resume.locator('svg').count(), 1);
        assert.equal(await card.getByRole('button', { name: '同步媒体库', exact: true }).getAttribute('aria-disabled'), 'true');
        await page.reload();
        await resume.waitFor();
        const lowSpeed = dock.getByRole('button', { name: '处理速度：低占用' });
        assert.equal(await lowSpeed.innerText(), '低占用');
        assert.equal(await lowSpeed.locator('use[href="#i-snail"]').count(), 1);
        await dock.getByRole('button', { name: '处理速度：低占用' }).click();
        const effort = page.getByRole('dialog', { name: '处理速度', exact: true });
        const scale = effort.locator('.processing-effort-scale');
        const assertSelectedSpeed = async (expected: number) => {
          const marks = await scale.locator(':scope > span').evaluateAll(elements => elements.map(el => ({
            selected: el.hasAttribute('data-selected'), color: getComputedStyle(el).color,
            iconColor: getComputedStyle(el.querySelector('svg')!).color,
          })));
          assert.deepEqual(marks.map(mark => mark.selected), [0, 1, 2].map(index => index === expected));
          assert.ok(marks.every(mark => mark.iconColor === mark.color));
          assert.ok(marks.every((mark, index) => index === expected || mark.color !== marks[expected]!.color));
        };
        await assertSelectedSpeed(0);
        assert.deepEqual(await scale.locator(':scope > span').allTextContents(), ['最慢', '标准', '最快']);
        assert.deepEqual(await scale.locator(':scope > span').evaluateAll(marks => marks.map(mark => mark.querySelectorAll('svg > use, svg > path').length)), [1, 1, 2]);
        const scaleLayout = await scale.evaluate(el => {
          const marks = [...el.children].map(mark => mark.getBoundingClientRect());
          const track = el.parentElement!.querySelector('.processing-effort-track')!.getBoundingClientRect();
          return { above: marks.every(mark => mark.bottom <= track.top),
            centered: Math.abs((marks[1]!.left + marks[1]!.right) / 2 - (track.left + track.right) / 2) < 1 };
        });
        assert.deepEqual(scaleLayout, { above: true, centered: true });
        assert.equal((await effort.innerText()).match(/低占用/g)?.length, 1);
        await effort.screenshot({ path: path.join(artifacts, `${viewport.name}-effort-low.png`) });
        await effort.getByRole('slider').press('ArrowRight');
        await dock.getByRole('button', { name: '处理速度：标准' }).waitFor();
        const standardSpeed = dock.getByRole('button', { name: '处理速度：标准' });
        assert.equal(await standardSpeed.innerText(), '标准');
        assert.equal(await standardSpeed.locator('use[href="#i-zap"]').count(), 1);
        await assertSelectedSpeed(1);
        await effort.screenshot({ path: path.join(artifacts, `${viewport.name}-effort-standard.png`) });
        await effort.press('Escape');
        await resume.click();
        await card.getByText('预计剩余约 10–15 分钟', { exact: true }).waitFor();
        assert.ok(writes.some(body => body.action === 'pause' && body.job_id === 'controlled'));
        assert.ok(writes.some(body => body.action === 'resume' && body.job_id === 'controlled'));
        assert.ok(writes.some(body => body.action === 'set_speed' && body.speed_mode === 'standard'));
        // 同步入口在后台任务期间保持忙态；这里只等待有限的控制请求结束。
        await settle(page, 'section[aria-label="扫描与采集"] [data-processing-traffic]');
        const measured = await layout(page);
        assert.ok(measured.scrollWidth <= measured.viewportWidth, JSON.stringify(measured));
        assert.deepEqual(measured.offenders, []);
        await page.screenshot({ path: path.join(artifacts, `${viewport.name}-page.png`), fullPage: true });
        await card.screenshot({ path: path.join(artifacts, `${viewport.name}.png`) });
        await page.goto(new URL('/', page.url()).href);
        assert.equal(await page.locator('[data-library-completion]').count(), 0, '运行期间首页由常驻任务卡承接进度');
        await dock.getByRole('button', { name: '暂停', exact: true }).waitFor();
        await page.emulateMedia({ reducedMotion: 'no-preference' });
        await dock.getByText('查看明细', { exact: true }).click();
        assert.equal(await dock.locator('summary').getAttribute('aria-expanded'), 'true');
        const expandedHeight = (await dock.boundingBox())!.height;
        const noticeMotion = await dock.evaluate(el => ({
          frame: getComputedStyle(el.querySelector('[data-processing-body]')!).transitionProperty,
          arrow: getComputedStyle(el.querySelector('[data-processing-toggle] > svg')!).transitionProperty,
          arrowDuration: getComputedStyle(el.querySelector('[data-processing-toggle] > svg')!).transitionDuration,
        }));
        assert.ok(noticeMotion.frame.includes('height'));
        assert.equal(noticeMotion.arrow, 'transform');
        assert.notEqual(noticeMotion.arrowDuration, '0s');
        await dock.getByRole('button', { name: '收起任务详情' }).click();
        assert.equal(await dock.locator('summary').getAttribute('aria-expanded'), 'false');
        await page.waitForFunction(() => !document.querySelector('#toasts [data-processing-dock] details')?.hasAttribute('open'));
        assert.ok((await dock.boundingBox())!.height < expandedHeight);
        await dock.getByRole('button', { name: '展开任务详情' }).click();
        assert.equal(await dock.locator('summary').getAttribute('aria-expanded'), 'false');
        await dock.getByRole('button', { name: '收起任务详情' }).click();
        await page.emulateMedia({ reducedMotion: 'reduce' });
        assert.equal(await dock.locator('[data-processing-body]').evaluate(el => getComputedStyle(el).transitionProperty), 'none');
        assert.equal(await dock.locator('[data-processing-traffic]').isVisible(), true);
        const fixed = await dock.boundingBox();
        await dock.hover();
        await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
        await page.waitForTimeout(500);
        const hovered = await dock.boundingBox();
        await page.mouse.move(1, 1);
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.waitForTimeout(500);
        const unhovered = await dock.boundingBox();
        assert.ok(fixed && hovered && unhovered);
        assert.ok(Math.abs(fixed.y - hovered.y) < 1 && Math.abs(fixed.y - unhovered.y) < 1,
          '收起详情后滚动与悬停保持任务卡位置');
        await dock.getByRole('button', { name: '处理速度：标准' }).click();
        const speed = page.getByRole('dialog', { name: '处理速度', exact: true });
        await speed.getByRole('slider').press('End');
        await dock.getByRole('button', { name: '处理速度：全速' }).waitFor();
        const highSpeed = dock.getByRole('button', { name: '处理速度：全速' });
        assert.equal(await highSpeed.innerText(), '全速');
        assert.equal(await highSpeed.locator('svg > use[href="#i-zap"]').count(), 1);
        await assertSelectedSpeed(2);
        const theme = await page.evaluate(() => ({ value: document.documentElement.dataset.theme,
          dark: document.documentElement.classList.contains('dark') }));
        for (const dark of [false, true]) {
          await page.evaluate(dark => { document.documentElement.dataset.theme = dark ? 'dark' : 'light';
            document.documentElement.classList.toggle('dark', dark) }, dark);
          for (const hovered of [false, true]) {
            if (hovered) await highSpeed.hover();
            else await page.mouse.move(1, 1);
            const paint = await highSpeed.evaluate(el => ({
              rear: getComputedStyle(el.querySelector('.processing-effort-double > path')!).fill,
              foreground: getComputedStyle(el.querySelector('.processing-effort-double > use:last-child')!).fill }));
            assert.equal(paint.foreground, 'none', '前方闪电内部透明，适配当前表面');
            assert.equal(paint.rear, 'none', '后方闪电内部透明，适配当前表面');
          }
          await highSpeed.screenshot({ path: path.join(artifacts, `${viewport.name}-double-lightning-${dark ? 'dark' : 'light'}.png`) });
        }
        await page.mouse.move(1, 1);
        await page.evaluate(theme => {
          if (theme.value) document.documentElement.dataset.theme = theme.value;
          else delete document.documentElement.dataset.theme;
          document.documentElement.classList.toggle('dark', theme.dark);
        }, theme);
        assert.ok(writes.some(body => body.action === 'set_speed' && body.speed_mode === 'high'));
        assert.match(await speed.innerText(), /最慢[\s\S]*最快[\s\S]*占用少[\s\S]*占用多/);
        await page.locator('[data-effort-flow]').waitFor();
        const flow = page.locator('.processing-flow-outer');
        const blue = await flow.evaluate(el => getComputedStyle(el).fill);
        const highColor = await highSpeed.evaluate(el => getComputedStyle(el).color);
        assert.equal(await scale.locator(':scope > span[data-selected]').evaluate(el => getComputedStyle(el).color), highColor);
        const readFeedback = () => page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--feedback-success').trim());
        const feedbackBlue = await readFeedback();
        await page.evaluate(() => { document.documentElement.dataset.accent = 'emerald' });
        const emerald = await flow.evaluate(el => getComputedStyle(el).fill);
        assert.notEqual(emerald, blue, '最高档流光跟随站点强调色');
        assert.notEqual(await highSpeed.evaluate(el => getComputedStyle(el).color), highColor, '全速入口跟随站点强调色');
        assert.equal(await scale.locator(':scope > span[data-selected]').evaluate(el => getComputedStyle(el).color),
          await highSpeed.evaluate(el => getComputedStyle(el).color), '全速刻度和入口共用强调色');
        assert.notEqual(await readFeedback(), feedbackBlue, '旧进度反馈色跟随站点强调色');
        assert.equal(await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--feed-mark').trim()), '#F78422', 'RSS 语义色保持橙色');
        await page.screenshot({ path: path.join(artifacts, `${viewport.name}-effort.png`) });
        await page.emulateMedia({ reducedMotion: 'reduce' });
        assert.equal(await page.locator('[data-effort-flow] svg').evaluate(el => getComputedStyle(el).animationName), 'none');
        await page.emulateMedia({ reducedMotion: 'no-preference' });
        await speed.press('Escape');
        await settle(page, '#toasts [data-processing-dock]');
        await dock.getByRole('link', { name: '任务详情' }).click();
        await dock.getByRole('button', { name: '展开任务详情' }).waitFor();
        assert.equal(await dock.count(), 1, '换页保留同一张任务卡');
        await dock.getByRole('button', { name: '展开任务详情' }).click();
        assert.equal(await dock.locator('[data-processing-step="complete"] s').innerText(), '扫描文件');
        assert.equal(await dock.locator('[aria-current="step"] s').count(), 0);
        await page.evaluate(async () => {
          const entry = '/dist/peach-app.js', ui = await import(entry);
          ui.showToast(document.getElementById('toasts'), { success: '', error: '' }, 'processing-proof',
            { html: '设置已保存', alert: false, timeout: 6000, action: null });
        });
        const receipt = page.locator('#toasts [data-sonner-toast]').filter({ hasText: '设置已保存' });
        await receipt.waitFor();
        await page.waitForFunction(() => {
          const task = document.querySelector('#toasts [data-processing-dock]');
          const notice = [...document.querySelectorAll('#toasts [data-sonner-toast]')]
            .find(node => node.textContent?.includes('设置已保存'));
          return task && notice && notice.getBoundingClientRect().bottom <= task.getBoundingClientRect().top - 7;
        });
        const dockBox = await dock.boundingBox(), receiptBox = await receipt.boundingBox();
        assert.ok(dockBox && receiptBox && receiptBox.y + receiptBox.height <= dockBox.y - 7,
          JSON.stringify({ message: '普通回执位于任务卡上方', dockBox, receiptBox,
            space: await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--processing-toast-space')) }));
        const homeLayout = await layout(page);
        assert.ok(homeLayout.scrollWidth <= homeLayout.viewportWidth, JSON.stringify(homeLayout));
        assert.deepEqual(homeLayout.offenders, []);
        await page.screenshot({ path: path.join(artifacts, `${viewport.name}-notice.png`) });
        await page.waitForTimeout(6500);
        assert.equal(await dock.isVisible(), true, '任务卡不会随普通回执超时消失');
        state = { ...state, stalled: true, current_action: 'reading_local_cover',
          current_asset_name: '2026-07-15 创作者合集 多机位完整版.mp4',
          waited_seconds: 33,
          eta_seconds_min: 63, eta_seconds_max: 94 };
        await dock.getByText('等待当前文件响应，剩余时间待更新', { exact: true }).waitFor();
        await page.waitForFunction(() => document.querySelector('[data-processing-dock]')?.textContent?.includes('已等待 33 秒'));
        await page.waitForFunction(() => {
          const elapsed = document.querySelector('[data-processing-dock]')?.textContent?.match(/已等待 (\d+) 秒/);
          return elapsed && Number(elapsed[1]) >= 34;
        }, undefined, { timeout: 5000 });
        assert.match(await dock.innerText(), /读取配套图片/);
        assert.doesNotMatch(await dock.innerText(), /预计剩余/);
        const stalledLayout = await layout(page);
        assert.ok(stalledLayout.scrollWidth <= stalledLayout.viewportWidth, JSON.stringify(stalledLayout));
        assert.deepEqual(stalledLayout.offenders, []);
        await page.screenshot({ path: path.join(artifacts, `${viewport.name}-stalled.png`) });
        state.status = 'complete';
        await dock.waitFor({ state: 'hidden' });
        assert.deepEqual(opened.problems, []);
      } finally { await opened.close() }
    });
  }
});
