import { act } from 'react';
import { afterEach, expect, it, vi } from 'vitest';
import { appSettingsStore } from '../../src/appearance';
import { JavPage } from '../../src/react/jav/jav-page';
import { mount } from './render';

vi.mock('../../src/react/catalog-grid/catalog-grid-page', () => ({
  CatalogGridPage: (props: Record<string, unknown>) => <div data-grid={JSON.stringify(props)} />,
}));

const store = appSettingsStore();
const initial = { batchSize: store.value.batchSize, groupCollapse: store.value.groupCollapse,
  seekSeconds: store.value.seekSeconds, javLayout: store.value.javLayout, javImage: store.value.javImage };
afterEach(async () => { await act(async () => { Object.assign(store.value, initial); store.save() }) });

it('JAV 馆藏读取浏览偏好，修改后立即更新网格并使用对应分页缓存', async () => {
  Object.assign(store.value, { batchSize: 24, groupCollapse: false, seekSeconds: 45, javLayout: 'big', javImage: 'cover' });
  const grid = {} as Parameters<typeof JavPage>[0]['grid'];
  grid.helpers = {} as typeof grid.helpers;
  grid.actions = {} as typeof grid.actions;
  const host = await mount(<JavPage tab="library" readOnly={false} navigate={vi.fn()} receipt={vi.fn()} grid={grid} />);
  expect(host.querySelector('h2')?.textContent).toBe('JAV');
  const props = () => JSON.parse(host.querySelector('[data-grid]')!.getAttribute('data-grid')!);
  expect(props()).toMatchObject({ batchSize: 24, revision: 24, groupCollapse: false, seekSeconds: 45 });
  await act(async () => { Object.assign(store.value, { batchSize: 12, groupCollapse: true, javLayout: 'small' }); store.save() });
  expect(props()).toMatchObject({ batchSize: 12, revision: 12, groupCollapse: true, layout: { size: 'small' } });
});
