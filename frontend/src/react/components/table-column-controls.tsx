import { useRef, useState } from 'react';
import { ColumnResizer, Popover } from 'react-aria-components';
import { Button } from '@/components/base/buttons/button';
import { Checkbox } from '@/components/base/checkbox/checkbox';
import { MENU_POPOVER_SURFACE } from '@/components/base/dropdown/menu-styles';
import { MenuDialog } from './menu-dialog';
import type { TablePreferences } from './table-column-preferences';

export function TableColumnControls({ preferences, label = '表格' }: { preferences: TablePreferences; label?: string }) {
  const trigger = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const columns = preferences.columns.filter(column => !column.required);
  return <div role="group" aria-label={`${label}列设置`} className="flex flex-wrap gap-2">
    <Button ref={trigger} variant="secondary" size="medium" aria-haspopup="dialog" aria-expanded={open}
      onClick={() => setOpen(true)}>显示列</Button>
    <Popover triggerRef={trigger} isOpen={open} onOpenChange={setOpen} placement="bottom end" offset={4}
      className={`${MENU_POPOVER_SURFACE} overscroll-contain`}>
      <MenuDialog aria-label={`${label}显示列`} className="flex w-48 flex-col gap-2 outline-none">
        {columns.map(column => <Checkbox key={column.id} isSelected={preferences.visibility[column.id] !== false}
          onChange={on => preferences.change(current => ({ ...current, [column.id]: on }))}>{column.label}</Checkbox>)}
        <Button variant="ghost" size="small" onClick={() => preferences.change(Object.fromEntries(columns.map(column => [column.id, true])))}>显示全部列</Button>
        <Button variant="ghost" size="small" onClick={() => preferences.change({})}>恢复默认显示</Button>
      </MenuDialog>
    </Popover>
    <Button variant="secondary" size="medium" onClick={preferences.reset}>重置列宽</Button>
  </div>;
}

export function TableColumnResizer({ preferences, id }: { preferences: TablePreferences; id: string }) {
  const column = preferences.columns.find(column => column.id === id)!;
  return preferences.canResize(id) ? <ColumnResizer aria-label={`调整${column.label}列宽`} /> : null;
}
