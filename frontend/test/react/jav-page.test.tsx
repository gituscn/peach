import { expect, it, vi } from 'vitest';
import { JavHeader } from '../../src/react/jav/jav-header';
import { buttonNamed, click, mount } from './render';

it('JAV 分区导航保留三个入口，馆藏使用目录搜索', async () => {
  const navigate = vi.fn(), find = vi.fn();
  const host = await mount(<JavHeader tab="library" navigate={navigate} find={find} />);
  const tabs = [...host.querySelectorAll('[role="tab"]')];
  expect(tabs.map(tab => tab.textContent?.trim())).toEqual(['我的馆藏', '发现', '想要']);
  expect(tabs[0]?.getAttribute('aria-selected')).toBe('true');
  expect(host.querySelector('input')).toBeNull();
  await click(tabs[1]);
  expect(navigate).toHaveBeenLastCalledWith('/jav?tab=discover');
  await click(tabs[2]);
  expect(navigate).toHaveBeenLastCalledWith('/jav?tab=wants');
  await click(buttonNamed('查找资源', host));
  expect(find).toHaveBeenCalledOnce();
});

it('从想要分区返回馆藏时打开 JAV 目录', async () => {
  const navigate = vi.fn();
  const host = await mount(<JavHeader tab="wants" navigate={navigate} find={vi.fn()} />);
  expect(host.querySelector('[role="tab"][aria-selected="true"]')?.textContent?.trim()).toBe('想要');
  await click(host.querySelector('[role="tab"]'));
  expect(navigate).toHaveBeenCalledWith('/?jav=1');
});
