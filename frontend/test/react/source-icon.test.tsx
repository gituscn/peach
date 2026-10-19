import { act } from 'react';
import { expect, it } from 'vitest';
import { SourceIcon } from '../../src/react/follow-manage/source-view';
import { mount } from './render';

it('站标失败与未知来源显示地球，并保留名称', async () => {
  const host = await mount(<SourceIcon provider="f95zone" label="F95zone" />);
  const image = host.querySelector('img')!;
  expect(image.getAttribute('src')).toBe('/source-icon?provider=f95zone');
  await act(async () => image.dispatchEvent(new Event('error')));
  expect(host.querySelector('img')).toBeNull();
  expect(host.querySelector('svg')).not.toBeNull();
  expect(host.textContent).toContain('F95zone');
  const unknown = await mount(<SourceIcon provider="unknown" />);
  expect(unknown.querySelector('svg')).not.toBeNull();
});
