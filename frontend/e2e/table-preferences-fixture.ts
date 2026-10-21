import assert from 'node:assert/strict';
import type { Locator, Page } from 'playwright-core';
import { settle } from './harness.ts';

/** 标题与整组操作共享一行或分行，同组列设置按钮保持在一起。 */
async function verifyToolbarWrapping(page: Page) {
  const viewport = page.viewportSize()!;
  try {
    for (const width of [...new Set([viewport.width, 650, 390])]) {
      await page.setViewportSize({ width, height: viewport.height });
      await settle(page);
      const toolbars = await page.locator('[data-responsive-toolbar]').evaluateAll(roots => roots.map(root => {
        const box = (element: Element) => {
          const r = element.getBoundingClientRect();
          return { left: r.left, right: r.right, top: r.top, bottom: r.bottom };
        };
        const actions = root.querySelector('[data-toolbar-actions]')!;
        return { root: box(root), heading: box(root.querySelector('[data-toolbar-heading]')!),
          actions: box(actions), buttons: [...actions.querySelectorAll('button')].map(box),
          columns: [...actions.querySelectorAll('[role="group"]')].map(group =>
            [...group.querySelectorAll(':scope > button')].map(box)) };
      }));
      for (const toolbar of toolbars) {
        assert.ok(toolbar.actions.left >= toolbar.root.left - 1 && toolbar.actions.right <= toolbar.root.right + 1);
        if (toolbar.actions.top < toolbar.heading.bottom - 1) {
          assert.ok(toolbar.actions.left >= toolbar.heading.right);
          const centers = toolbar.buttons.map(b => (b.top + b.bottom) / 2);
          assert.ok(Math.max(...centers) - Math.min(...centers) < 1,
            `${width}px 工具栏有部分操作被挤到下一行`);
        }
        for (const buttons of toolbar.columns) {
          assert.ok(Math.max(...buttons.map(b => b.top)) - Math.min(...buttons.map(b => b.top)) < 2,
            `${width}px 列设置按钮被拆行`);
        }
      }
      const footers = await page.locator('[data-table-pagination]').evaluateAll(roots => roots.map(root => {
        const r = root.getBoundingClientRect(), a = root.querySelector('[data-toolbar-actions]')!.getBoundingClientRect();
        return a.left >= r.left - 1 && a.right <= r.right + 1;
      }));
      assert.ok(footers.every(Boolean), `${width}px 分页操作越出容器`);
      const pagination = await page.locator('nav').filter({ has: page.getByRole('button', { name: '上一页', exact: true }) })
        .evaluateAll(roots => roots.map(root => {
          const buttons = [...root.querySelectorAll(':scope > button')];
          return buttons.length === 2 && Math.abs(buttons[0]!.getBoundingClientRect().y - buttons[1]!.getBoundingClientRect().y) < 1;
        }));
      assert.ok(pagination.every(Boolean), `${width}px 上一页和下一页被拆到不同行`);
    }
  } finally {
    await page.setViewportSize(viewport);
    await settle(page);
  }
}

/** 在真实表格上核验共享列设置、键盘调整、拖动和刷新恢复。 */
export async function verifyTablePreferences(page: Page, table: Locator, label: string, identity: string, optional: { id: string; label: string }, restoreView?: () => Promise<unknown>) {
  await table.waitFor();
  await verifyToolbarWrapping(page);
  const controls = page.getByRole('group', { name: `${label}列设置`, exact: true });
  const header = table.locator(`th[data-key="${identity}"]`);
  const width = async () => header.evaluate(node => node.getBoundingClientRect().width);
  const initial = await width();
  const handle = header.getByRole('slider');
  await handle.focus(); await handle.press('Enter');
  await handle.press('ArrowRight'); await handle.press('ArrowRight'); await handle.press('Tab');
  await page.waitForFunction(({ node, initial }) => node && node.getBoundingClientRect().width > initial,
    { node: await header.elementHandle(), initial }, { timeout: 5000 });
  const resized = await width(); assert.ok(resized > initial, `${label}: ${initial} → ${resized}`);
  const scroll = table.locator('..');
  const range = await scroll.evaluate(node => node.scrollWidth - node.clientWidth);
  if (range > 1) {
    await scroll.evaluate(node => { node.scrollLeft = 0 });
    await table.locator('tbody tr').first().scrollIntoViewIfNeeded();
    const box = (await scroll.boundingBox())!, row = (await table.locator('tbody tr').first().boundingBox())!;
    const x = box.x + box.width - 20, y = row.y + row.height - 4;
    await page.mouse.move(x, y); await page.mouse.down(); await page.mouse.move(x - 80, y, { steps: 8 }); await page.mouse.up();
    assert.ok(await scroll.evaluate(node => node.scrollLeft) >= Math.min(80, range) - 2, label);
    assert.equal(await table.locator('tbody input[type="checkbox"]:checked:not([role="switch"])').count(), 0, label);
  }
  await controls.getByRole('button', { name: '显示列', exact: true }).click();
  const menu = page.getByRole('dialog', { name: `${label}显示列`, exact: true });
  await menu.locator('label').filter({ has: page.getByRole('checkbox', { name: optional.label, exact: true }) }).click();
  await page.keyboard.press('Escape');
  assert.equal(await table.locator(`th[data-key="${optional.id}"]`).count(), 0);
  await page.reload({ waitUntil: 'load' });
  await restoreView?.();
  await table.waitFor();
  assert.ok(Math.abs(await width() - resized) <= 1, label);
  assert.equal(await table.locator(`th[data-key="${optional.id}"]`).count(), 0);
  await controls.getByRole('button', { name: '重置列宽', exact: true }).click();
  assert.ok(Math.abs(await width() - initial) <= 1, label);
  await controls.getByRole('button', { name: '显示列', exact: true }).click();
  await menu.getByRole('button', { name: '恢复默认显示', exact: true }).click();
  await page.keyboard.press('Escape');
  await table.locator(`th[data-key="${optional.id}"]`).waitFor();
  await scroll.evaluate(node => { node.scrollLeft = 0 });
}
