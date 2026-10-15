import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { DataTable, type DataColumn } from '../../src/react/components/data-table';
import { buttonNamed, click, mountRoot } from './render';

type Item = { id: number; name: string };
const columns: DataColumn<Item>[] = [{ id: 'name', label: '名字', value: (item) => item.name, render: (item) => item.name }];
const items = Array.from({ length: 23 }, (_, index) => ({ id: index + 1, name: `作品 ${23 - index}` }));
const checkbox = (host: ParentNode, name: string) => host.querySelector<HTMLInputElement>(`input[aria-label="${name}"]`);

function Fixture({ data = items, run }: { data?: Item[]; run(ids: number[]): void }) {
  const [selected, setSelected] = useState<string[]>([]);
  return <DataTable label="测试作品" items={data} columns={columns} rowId={(item) => String(item.id)}
    rowLabel={(item) => item.name} selected={selected} onSelected={setSelected}
    actions={(chosen) => <button onClick={() => run(chosen.map((item) => item.id))}>处理所选</button>} />;
}

describe('共用数据表', () => {
  it('排序作用在全集，选择跨页保留，批量范围排除消失的行', async () => {
    const run = vi.fn();
    const { host, rerender } = await mountRoot(<Fixture run={run} />);
    const rows = () => [...host.querySelectorAll('tbody tr')];
    expect(rows()).toHaveLength(10);
    await click(checkbox(host, '选择 作品 23'));
    await click(buttonNamed('下一页', host));
    await click(checkbox(host, '选择 作品 13'));
    await click(buttonNamed('处理所选', host));
    expect(run).toHaveBeenLastCalledWith([1, 11]);
    await click(host.querySelector('th[data-key="name"]'));
    expect(rows()[0]!.textContent).toContain('作品 1');
    expect(rows()[9]!.textContent).toContain('作品 10');
    expect(host.textContent).toContain('已选 2 项');
    await click(buttonNamed('下一页', host));
    await click(buttonNamed('下一页', host));
    await rerender(<Fixture data={[items[0]!, items[1]!]} run={run} />);
    expect(rows()).toHaveLength(2);
    expect(host.textContent).toContain('第 1 / 1 页');
    await click(buttonNamed('处理所选', host));
    expect(run).toHaveBeenLastCalledWith([1]);
    await click(buttonNamed('取消选择', host));
    expect(host.textContent).toContain('已选 0 项');
  });

  it('全选覆盖所有页，再次全选取消整批选择', async () => {
    const run = vi.fn();
    const { host } = await mountRoot(<Fixture run={run} />);
    await click(checkbox(host, '全选测试作品'));
    await click(buttonNamed('处理所选', host));
    expect(run).toHaveBeenLastCalledWith(items.map((item) => item.id));
    await click(buttonNamed('下一页', host));
    expect(checkbox(host, '选择 作品 13')?.checked).toBe(true);
    await click(checkbox(host, '全选测试作品'));
    expect(host.textContent).toContain('已选 0 项');
  });
});
