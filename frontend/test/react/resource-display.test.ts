import { expect, it } from 'vitest';
import { resourceSize } from '../../src/react/wants/resource-display';

it('没有单位的来源大小以未标注呈现', () => {
  for (const value of ['4219', '4,219', '4219.5']) expect(resourceSize(value)).toBe('大小未标注');
  expect(resourceSize('3 GB')).toBe('3 GB');
  expect(resourceSize('4219 MB')).toBe('4219 MB');
  expect(resourceSize('')).toBe('大小未知');
});
