import assert from 'node:assert/strict';
import { after, before, describe, it } from 'node:test';
import { join } from 'node:path';
import type { Browser } from 'playwright-core';
import { launch, requiredEnv, VIEWPORTS } from './harness.ts';

describe('实体页冷启动等待态', () => {
  let browser: Browser;
  before(async () => { browser = await launch() });
  after(async () => { await browser.close() });
  for (const viewport of VIEWPORTS) for (const jav of [false, true]) for (const theme of ['light', 'dark']) {
    it(`${viewport.name} ${theme} ${jav ? 'JAV' : '普通'}艺人直达和刷新保持首次形状`, { timeout: 60_000 }, async () => {
      const context = await browser.newContext({ viewport });
      const releases: (() => void)[] = [];
      const gate = () => new Promise<void>(resolve => { releases.push(resolve) });
      let shapes = gate(), entity = gate(), items = gate();
      const name = '演示艺人';
      const shape = { id: 90001, kind: 'performer', names: [name], parts: jav ? ['facts', 'costars', 'jav'] : [] };
      try {
        await context.addInitScript(theme => {
          localStorage.setItem('peach.settings.v1', JSON.stringify({ theme, detailAutoplay: false }));
          const seen: { facts: boolean; costars: boolean; jav: boolean }[] = [];
          Object.assign(window, { entityWaitingFrames: seen });
          let previous: Element | null = null;
          new MutationObserver(() => {
            const root = document.querySelector('[data-skeleton="entity/performer"]');
            if (!root || root === previous) return;
            previous = root;
            seen.push({ facts: !!root.querySelector('[data-entity-facts]'),
              costars: !!root.querySelector('[data-entity-foot]'), jav: !!root.querySelector('[aria-label="JAV 卡片版式"]') });
          }).observe(document, { childList: true, subtree: true });
        }, theme);
        const page = await context.newPage();
        await page.route('**/performers/90001', async route => {
          const response = await route.fetch({ url: requiredEnv('PEACH_E2E_ORIGIN') + '/' });
          await route.fulfill({ response, body: (await response.text()).replace('</head>',
            `<script type="application/json" id="peach-entity-shape">${JSON.stringify(shape)}</script></head>`) });
        });
        await page.route('**/api/entity/shapes', async route => { await shapes; await route.fulfill({ json: { ok: true, entities: [shape] } }) });
        await page.route(/\/api\/entity\?/, async route => { await entity; await route.fulfill({ json: {
          id: shape.id, kind: shape.kind, canonical_name: name, asset_count: 1, tags: [], links: [],
          related_performers: jav ? [{ id: 90002, k: '同台艺人', rep: null }] : [],
          profile: jav ? { height: 160, birth_date: '1990-01-01', debut_date: '2010-01-01',
            active: { from: '2010', ongoing: true }, tags: ['演示标签'] } : null,
          aliases: [], metadata: {}, entry_links: [],
        } }) });
        await page.route(/\/api\/items\?/, async route => { await items; await route.fulfill({ json: {
          items: [{ id: 91001, name: '演示作品', is_jav: jav, has_thumb: false }], total: 1, has_more: false,
        } }) });
        await page.route(/\/api\/photos\?/, route => route.fulfill({ json: { items: [], total: 0, sets: [], has_more: false } }));
        for (const mode of ['direct', 'refresh']) {
          if (mode === 'refresh') {
            shapes = gate(); entity = gate(); items = gate();
            await page.reload({ waitUntil: 'load' });
          } else await page.goto(requiredEnv('PEACH_E2E_ORIGIN') + '/performers/90001', { waitUntil: 'load' });
          const root = page.locator('[data-skeleton="entity/performer"]');
          await root.waitFor();
          const first = await root.elementHandle();
          assert.equal(await root.locator('[data-entity-portrait="round"]').evaluate(node =>
            getComputedStyle(node).borderTopLeftRadius), '50%', '艺人头像等待态形状不准确');
          assert.equal(await root.locator('[data-entity-facts]').count() > 0, jav, '首次等待态资料栏不准确');
          assert.equal(await root.locator('[data-entity-foot]').count() > 0, jav, '首次等待态相关艺人不准确');
          assert.equal(await root.locator('[aria-label="JAV 卡片版式"]').count() > 0, jav, '首次等待态卡片版式不准确');
          assert.equal(await root.locator('[aria-label="馆藏显示方式"]').count(), 1);
          assert.equal(await root.locator('[data-folder-mode-toggle]').count(), 1);
          await page.waitForFunction(() => !document.querySelector('[data-skeleton="entity/performer"] .skeleton-awaiting'));
          const visibility = await root.evaluate(node => {
            node.classList.add('skeleton-awaiting');
            const leaks = [node, ...node.querySelectorAll('*')].flatMap(child => ['', '::before', '::after'].filter(pseudo => {
              const css = getComputedStyle(child, pseudo || null);
              return (!pseudo || !['none', 'normal'].includes(css.content)) && css.visibility !== 'hidden';
            }).map(pseudo => `${child.tagName}${pseudo}`));
            node.classList.remove('skeleton-awaiting');
            return leaks;
          });
          assert.deepEqual(visibility, [], '等待门槛内出现了单独可见的骨架或微光');
          const controls = async () => page.locator('[data-entity-filter-glass]').evaluate(node => {
            const selectors = ['[data-filter-row="top"]','[data-filter-row="bottom"]','[data-entity-state=""]',
              '[data-entity-batch]','[data-entity-sort="rating"]','[data-folder-mode-toggle]'];
            return selectors.map(selector => {
              const el = node.querySelector(selector)!;
              const css = getComputedStyle(el), box = el.getBoundingClientRect();
              return { selector, height: box.height, width: selector.includes('data-filter-row') ? 0 : box.width,
                padding: css.padding, gap: css.gap, font: css.fontSize };
            });
          });
          const waitingControls = await controls();
          assert.equal(await root.locator('[data-entity-tags] .skeleton').first().evaluate(node => node.getBoundingClientRect().height), 30);
          assert.ok(await root.locator('[data-entity-state]').count(), '静态观看筛选尚未显示');
          const ratio = () => root.locator('[style*="--skeleton-card-ratio"]').first().evaluate(node =>
            Number((node as HTMLElement).style.getPropertyValue('--skeleton-card-ratio')));
          assert.equal(await ratio(), jav ? .75 : 16 / 9);
          if (process.env.PEACH_COLD_EVIDENCE) await page.screenshot({
            path: join(process.env.PEACH_COLD_EVIDENCE, `${viewport.name}-${jav ? 'jav' : 'ordinary'}-${mode}.png`),
            fullPage: false,
          });
          for (const release of releases.splice(0, 2)) release();
          await page.waitForResponse(response => response.url().includes('/api/entity?'));
          assert.equal(await first!.evaluate(node => node === document.querySelector('[data-skeleton="entity/performer"]')), true,
            '解析实体后换成了第二段等待态');
          assert.equal(await ratio(), jav ? .75 : 16 / 9);
          releases.shift()!();
          await root.waitFor({ state: 'detached' });
          assert.deepEqual(await controls(), waitingControls, '筛选按钮的尺寸或间距与就绪状态不一致');
          const frames = await page.evaluate(() =>
            (window as Window & { entityWaitingFrames: { facts: boolean; costars: boolean; jav: boolean }[] }).entityWaitingFrames);
          assert.deepEqual(frames, [{ facts: jav, costars: jav, jav }], '一次打开画出了多段或不准确的等待态');
          assert.equal(await page.locator('[data-entity-facts]').count() > 0, jav);
          assert.equal(await page.locator('[data-entity-foot]').count() > 0, jav);
          await first!.dispose();
        }
      } finally { releases.forEach(release => release()); await context.close() }
    });
  }
});
