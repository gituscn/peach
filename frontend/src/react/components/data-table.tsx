import { useMemo, useState, type ReactNode } from 'react';
import {
  createColumnHelper, createPaginatedRowModel, createSortedRowModel, flexRender,
  rowPaginationFeature, rowSelectionFeature, rowSortingFeature, tableFeatures, useTable,
  type RowData, type RowSelectionState, type SortingState,
} from '@tanstack/react-table';
import { Button } from '@/components/base/buttons/button';
import { Checkbox } from '@/components/base/checkbox/checkbox';
import { Select, SelectItem } from '@/components/base/select/select';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@/components/base/table/table';
import { ChevronSortDown } from '@/components/foundations/icons/chevrons';
import { DataTableFrame } from './data-table-frame';
import { Pagination } from './table-pagination';

const features = tableFeatures({
  rowSortingFeature, rowSelectionFeature, rowPaginationFeature,
  sortedRowModel: createSortedRowModel(), paginatedRowModel: createPaginatedRowModel(),
});

export interface DataColumn<T> {
  id: string;
  label: string;
  value?(item: T): string | number;
  render(item: T): ReactNode;
}

interface DataTableProps<T> {
  label: string;
  items: T[];
  columns: DataColumn<T>[];
  rowId(item: T): string;
  rowLabel(item: T): string;
  selected: string[];
  onSelected(ids: string[]): void;
  actions(items: T[], clear: () => void): ReactNode;
}

/** 数据表共用排序、跨页选择与分页；业务动作只接收仍在清单里的所选行。 */
export function DataTable<T extends RowData>({ label, items, columns, rowId, rowLabel, selected, onSelected, actions }: DataTableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const pages = Math.max(1, Math.ceil(items.length / pagination.pageSize));
  const pageIndex = Math.min(pagination.pageIndex, pages - 1);
  const rowSelection: RowSelectionState = Object.fromEntries(selected.map((id) => [id, true]));
  const definitions = useMemo(() => {
    const helper = createColumnHelper<typeof features, T>();
    return helper.columns([
      helper.display({ id: 'select', header: ({ table }) => (
        <Checkbox slot={null} aria-label={`全选${label}`} isSelected={table.getIsAllRowsSelected()}
          isIndeterminate={table.getIsSomeRowsSelected()} onChange={(on) => table.toggleAllRowsSelected(on)} />
      ), cell: ({ row }) => (
        <Checkbox slot={null} aria-label={`选择 ${rowLabel(row.original)}`} isSelected={row.getIsSelected()}
          onChange={(on) => row.toggleSelected(on)} />
      ) }),
      ...columns.map((column) => helper.accessor((item: T) => column.value?.(item) ?? '', {
        id: column.id, header: column.label, enableSorting: Boolean(column.value),
        sortFn: (a, b) => {
          const first = column.value!(a.original), second = column.value!(b.original);
          return typeof first === 'number' && typeof second === 'number'
            ? first - second : String(first).localeCompare(String(second), 'zh-CN', { numeric: true });
        },
        cell: ({ row }) => column.render(row.original),
      })),
    ]);
  }, [columns, label, rowLabel]);
  const table = useTable({
    features, data: items, columns: definitions, getRowId: rowId,
    state: { sorting, rowSelection, pagination: { ...pagination, pageIndex } },
    onSortingChange: (updater) => { setSorting(updater); setPagination((now) => ({ ...now, pageIndex: 0 })); },
    onPaginationChange: setPagination, enableRowSelection: true,
    onRowSelectionChange: (updater) => {
      const next = typeof updater === 'function' ? updater(rowSelection) : updater;
      onSelected(items.filter((item) => next[rowId(item)]).map(rowId));
    },
  });
  const chosen = table.getSelectedRowModel().rows.map((row) => row.original);
  return (
    <div className="flex min-w-0 flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2" role="toolbar" aria-label={`${label}批量操作`}>
        <span className="mr-auto text-body-2-regular tabular-nums text-text-secondary">
          {`${items.length.toLocaleString()} 项 · 已选 ${chosen.length.toLocaleString()} 项`}
        </span>
        {actions(chosen, () => onSelected([]))}
        {chosen.length ? <Button variant="secondary" size="small" onClick={() => onSelected([])}>取消选择</Button> : null}
      </div>
      <DataTableFrame follow onRowClick={(id) => table.getRow(id)?.toggleSelected()}>
        <Table aria-label={label} size="sm"
          sortDescriptor={sorting[0] ? { column: sorting[0].id, direction: sorting[0].desc ? 'descending' : 'ascending' } : undefined}
          onSortChange={(sort) => table.getColumn(String(sort.column))?.toggleSorting(sort.direction === 'descending')}>
          <TableHeader>
            {table.getHeaderGroups()[0]!.headers.map((header, index) => (
              <TableColumn key={header.id} id={header.id} isRowHeader={index === 1} allowsSorting={header.column.getCanSort()}>
                {({ sortDirection }) => <span className="flex items-center gap-0.5">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {header.column.getCanSort() ? <span data-sort-indicator data-direction={sortDirection || undefined}><ChevronSortDown /></span> : null}
                </span>}
              </TableColumn>
            ))}
          </TableHeader>
          <TableBody renderEmptyState={() => '没有记录'}>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} id={row.id} data-board-selected={row.getIsSelected() || undefined}>
                {row.getAllCells().map((cell) => <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>)}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DataTableFrame>
      <DataTableFooter label={label} total={items.length} pagination={{ ...pagination, pageIndex }} onChange={setPagination} />
    </div>
  );
}

export function DataTableFooter({ label, total, pagination, onChange }: {
  label: string; total: number; pagination: { pageIndex: number; pageSize: number };
  onChange(next: { pageIndex: number; pageSize: number }): void;
}) {
  const pages = Math.max(1, Math.ceil(total / pagination.pageSize));
  const pageIndex = Math.min(pagination.pageIndex, pages - 1);
  return (
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Select aria-label={`${label}每页条数`} className="w-32" selectedKey={pagination.pageSize}
          onSelectionChange={(key) => { if (key) onChange({ pageIndex: 0, pageSize: Number(key) }); }}>
          {[10, 20, 50, 100].map((size) => <SelectItem key={size} id={size}>{`${size} 项 / 页`}</SelectItem>)}
        </Select>
        <span className="text-caption-1-regular tabular-nums text-text-secondary">{`第 ${pageIndex + 1} / ${pages} 页`}</span>
        <Pagination label={`${label}分页`} page={pageIndex + 1} pages={pages}
          onPage={(page) => onChange({ ...pagination, pageIndex: page - 1 })} />
      </div>
  );
}
