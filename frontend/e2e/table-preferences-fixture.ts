import assert from 'node:assert/strict';
import type { Locator, Page } from 'playwright-core';

/** 在真实表格上核验共享列设置、键盘调整、拖动和刷新恢复。 */
export async function verifyTablePreferences(page: Page, table: Locator, label: string, identity: string, optional: { id: string; label: string }, restoreView?: () => Promise<unknown>) {
  await table.waitFor();
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
