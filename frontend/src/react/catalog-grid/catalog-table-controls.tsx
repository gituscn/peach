import { useRef, useState } from 'react';
import { Popover } from 'react-aria-components';
import { Button } from '@/components/base/buttons/button';
import { Checkbox } from '@/components/base/checkbox/checkbox';
import { MENU_POPOVER_SURFACE } from '@/components/base/dropdown/menu-styles';
import { MenuDialog } from '../components/menu-dialog';
import { spriteGlyph } from '../components/sprite-glyph';

const Star = spriteGlyph('star');

export function CatalogRating({ rating }: { rating?: number | null }) {
  const score = Math.max(0, Math.min(5, Number(rating || 0) / 20));
  const label = rating == null ? '未评分' : `评分 ${score} / 5`;
  return <span data-catalog-rating="" role="img" aria-label={label} title={label}>
    {[0, 1, 2, 3, 4].map(index => <span key={index} data-catalog-star="" aria-hidden="true">
      <Star />
      {/* oxlint-disable-next-line shadcn/no-inline-styles -- 星星填充宽度表示实际评分的小数比例 */}
      <span data-catalog-star-fill="" style={{ width: `${Math.max(0, Math.min(1, score - index)) * 100}%` }}><Star /></span>
    </span>)}
  </span>;
}

export function CatalogColumnMenu({ columns, onChange, onReset, onDefaults }: {
  columns: { id: string; label: string; visible: boolean }[];
  onChange(id: string, visible: boolean): void;
  onReset(): void;
  onDefaults(): void;
}) {
  const trigger = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  return <>
    <Button ref={trigger} variant="secondary" size="small" aria-haspopup="dialog" aria-expanded={open}
      onClick={() => setOpen(true)}>显示列</Button>
    <Popover triggerRef={trigger} isOpen={open} onOpenChange={setOpen} placement="bottom end" offset={4}
      className={`${MENU_POPOVER_SURFACE} overscroll-contain`}>
      <MenuDialog aria-label="表格显示列" className="flex w-48 flex-col gap-2 outline-none">
        {columns.map(column => <Checkbox key={column.id} isSelected={column.visible}
          onChange={on => onChange(column.id, on)}>{column.label}</Checkbox>)}
        <Button variant="ghost" size="small" onClick={onReset}>显示全部列</Button>
        <Button variant="ghost" size="small" onClick={onDefaults}>恢复默认显示</Button>
      </MenuDialog>
    </Popover>
  </>;
}

export function catalogTableDate(value: string | number | null | undefined): string {
  if (value == null || value === '') return '—';
  const text = String(value);
  if (/^\d{4}-\d{2}-\d{2}$/.test(text)) return text;
  const date = new Date(/^\d+(?:\.\d+)?$/.test(text) ? Number(value) * 1000 : text);
  return Number.isNaN(date.getTime()) ? '—' : date.toLocaleString('zh-CN', {
    year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false,
  });
}
