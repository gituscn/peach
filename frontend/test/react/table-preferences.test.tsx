import { act } from 'react';
import { beforeEach, expect, it } from 'vitest';
import { useTablePreferences } from '../../src/react/components/table-column-preferences';
import { mountRoot } from './render';

const columns = [{ id: 'name', label: '名称', width: 280, required: true }, { id: 'extra', label: '补充', width: 160 }];
let first!: ReturnType<typeof useTablePreferences>, second!: ReturnType<typeof useTablePreferences>;
function Probe() { first = useTablePreferences('first', columns); second = useTablePreferences('second', columns); return null }
beforeEach(() => localStorage.clear());

it('各表独立保存列显示和列宽，隐藏列保留宽度，身份列保持可见', async () => {
  const root = await mountRoot(<Probe />);
  await act(() => first.save(new Map([['extra', 360]])));
  await act(() => first.change({ name: false, extra: false }));
  expect(first.visibility).toEqual({ extra: false });
  expect(first.widths.extra).toBe(360);
  expect(second.widths.extra).toBe(160);
  expect(second.visibility).toEqual({});
  await root.unmount();
  await mountRoot(<Probe />);
  expect(first.widths.extra).toBe(360);
  expect(first.visibility.extra).toBe(false);
  await act(() => first.reset());
  expect(first.widths.extra).toBe(160);
  expect(first.visibility.extra).toBe(false);
});
