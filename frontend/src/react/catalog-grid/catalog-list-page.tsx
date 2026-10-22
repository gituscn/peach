"use client";

import { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import {
  createColumnHelper, flexRender, rowPaginationFeature, rowSelectionFeature, rowSortingFeature,
  columnVisibilityFeature, tableFeatures, useTable, type RowSelectionState, type SortingState,
} from '@tanstack/react-table';
import { cardArtwork, relayoutCovers } from '@peach/card-art';
import { fmtDur, fmtSize, requestErrorMessage } from '@peach/legacy/core';
import { Checkbox } from '@/components/base/checkbox/checkbox';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@/components/base/table/table';
import { ChevronSortDown } from '@/components/foundations/icons/chevrons';
import { apiGet } from '../../api';
import { ArtSlot } from '../components/art-slot';
import { useLibraryTints } from '../components/library-tint';
import { SourceMark } from '../settings/section';
import { DataTableFrame } from '../components/data-table-frame';
import { DataTableFooter, DataTableSort } from '../components/table-controls';
import { RetryNote } from '../components/grid-reveal';
import { LibraryCompletionPrompt, missingPreviewIds } from '../library-processing/library-completion';
import { catalogParams } from './catalog-grid';
import type { CatalogGridProps, MediaItem, MediaPage } from './types';
import { useCatalogTablePreferences } from './catalog-column-widths';
import { CatalogRating, catalogTableDate } from './catalog-table-controls';
import { TableColumnControls, TableColumnResizer } from '../components/table-column-controls';
import { TableSelectionHeader } from '../components/table-selection-header';
import './catalog-list.css';

const features = tableFeatures({ rowSortingFeature, rowSelectionFeature, rowPaginationFeature, columnVisibilityFeature });
const sortOptions = [
  { id: 'name', label: '名称' }, { id: 'dur', label: '时长' }, { id: 'size', label: '体积' },
  { id: 'new', label: '入库时间' }, { id: 'release', label: '发行时间' },
  { id: 'rating', label: '评分' }, { id: 'o', label: '高潮计数' },
  { id: 'plays', label: '观看次数' }, { id: 'played', label: '观看时间' },
];
interface ListState { sorting: SortingState; pagination: { pageIndex: number; pageSize: number } }
// 详情返回保留同一筛选范围内的页码与列排序。
const positions = new Map<string, ListState>();

/** 服务端对完整筛选结果排序、分页；选择集及批量栏归现有馆藏控制器。 */
export function CatalogListPage(props: CatalogGridProps) {
  const preferences = useCatalogTablePreferences();
  const tints = useLibraryTints();
  const params = catalogParams(props.filters || {}, false);
  const [scope] = useState(() => {
    const position = new URLSearchParams(params);
    if (!new URLSearchParams(location.search).has('seed')) position.delete('seed');
    return `${props.mode}:${props.listScope || props.entityKey || ''}:${position}`;
  });
  const [state, setState] = useState<ListState>(() => positions.get(scope) || {
    sorting: [], pagination: { pageIndex: 0, pageSize: 20 },
  });
  const { sorting, pagination } = state;
  useEffect(() => { positions.set(scope, state) }, [scope, state]);
  const offset = pagination.pageIndex * pagination.pageSize;
  const sort = sorting[0];
  const result = useQuery({
    queryKey: ['catalog-grid', 'table', scope, params, props.revision, pagination, sorting],
    placeholderData: keepPreviousData,
    queryFn: async ({ signal }): Promise<MediaPage> => {
      const options = { limit: pagination.pageSize, sort: sort?.id, dir: sort ? sort.desc ? 'desc' : 'asc' : undefined };
      if (props.mode === 'entity') return props.fetchPage?.(offset, signal, options) || { items: [], total: 0 };
      const query = new URLSearchParams(params);
      query.set('offset', String(offset));
      query.set('limit', String(options.limit));
      query.delete('count');
      if (options.sort) query.set('sort', options.sort);
      if (options.dir) query.set('dir', options.dir);
      return apiGet<MediaPage>(`/api/items?${query}`, signal);
    },
  });
  const items = result.data?.items || [];
  const total = Number(result.data?.total || 0);
  useLayoutEffect(() => {
    if (result.isFetching) return;
    let live = true;
    queueMicrotask(() => {
      if (!live) return;
      props.settled?.(props.revision);
      if (result.data) props.onCount?.(total, items.length);
      else props.onCountFailed?.();
    });
    return () => { live = false };
  }, [result.data, result.isFetching, props.revision]);
  useEffect(() => {
    if (!result.data || result.isPlaceholderData || offset < total || pagination.pageIndex === 0) return;
    setState(now => ({ ...now, pagination: { ...now.pagination, pageIndex: Math.max(0, Math.ceil(total / now.pagination.pageSize) - 1) } }));
  }, [result.data, result.isPlaceholderData, offset, total, pagination.pageIndex]);
  const rowSelection: RowSelectionState = props.selectMode ? Object.fromEntries([...props.selected].map(id => [String(id), true])) : {};
  const columns = useMemo(() => {
    const helper = createColumnHelper<typeof features, MediaItem>();
    return helper.columns([
      helper.display({ id: 'select', header: ({ table }) => <TableSelectionHeader table={table} label="全选本页作品" disabled={result.isPlaceholderData} />,
      cell: ({ row }) => <Checkbox slot={null} aria-label={`选择 ${props.helpers.displayName(row.original, row.original.name || '')}`}
        isDisabled={result.isPlaceholderData}
        isSelected={row.getIsSelected()} onChange={on => row.toggleSelected(on)} /> }),
      helper.accessor(item => item.name || '', { id: 'name', header: '名称', enableSorting: true,
        cell: ({ row }) => <ListIdentity item={row.original} props={props} disabled={result.isPlaceholderData} /> }),
      helper.display({ id: 'code', header: '番号', cell: ({ row }) => row.original.code || '—' }),
      helper.accessor(item => item.duration, { id: 'dur', header: '时长', enableSorting: true,
        cell: ({ row }) => fmtDur(row.original.duration) || '—' }),
      helper.display({ id: 'resolution', header: '分辨率', cell: ({ row }) => {
        const { width, height } = row.original;
        return width && height ? `${width} × ${height}` : '—';
      } }),
      helper.accessor(item => item.size, { id: 'size', header: '体积', enableSorting: true,
        cell: ({ row }) => row.original.size == null ? '—' : fmtSize(row.original.size) }),
      helper.accessor(item => item.rating, { id: 'rating', header: '评分', enableSorting: true,
        cell: ({ row }) => <CatalogRating item={row.original} actions={props.actions} /> }),
      helper.accessor(item => item.play_count, { id: 'plays', header: '观看次数', enableSorting: true,
        cell: ({ row }) => Number(row.original.play_count || 0).toLocaleString() }),
      helper.accessor(item => item.o_count, { id: 'o', header: '高潮计数', enableSorting: true,
        cell: ({ row }) => Number(row.original.o_count || 0).toLocaleString() }),
      helper.accessor(item => item.last_played, { id: 'played', header: '观看时间', enableSorting: true,
        cell: ({ row }) => catalogTableDate(row.original.last_played) }),
      helper.accessor(item => item.first_seen, { id: 'new', header: '入库时间', enableSorting: true,
        cell: ({ row }) => catalogTableDate(row.original.first_seen) }),
      helper.accessor(item => item.release_date, { id: 'release', header: '发行时间', enableSorting: true,
        cell: ({ row }) => row.original.release_date || '—' }),
    ]);
  }, [props.helpers, props.actions, props.layout, props.selectMode, result.isPlaceholderData]);
  const table = useTable({
    features, columns, data: items, getRowId: item => String(item.id),
    manualSorting: true, manualPagination: true, rowCount: total,
    state: { sorting, pagination, rowSelection, columnVisibility: { ...preferences.visibility, select: props.selectMode } },
    onColumnVisibilityChange: preferences.change,
    onSortingChange: updater => setState(now => ({
      sorting: typeof updater === 'function' ? updater(now.sorting) : updater,
      pagination: { ...now.pagination, pageIndex: 0 },
    })),
    onPaginationChange: updater => setState(now => ({ ...now,
      pagination: typeof updater === 'function' ? updater(now.pagination) : updater })),
    enableRowSelection: true,
    onRowSelectionChange: updater => {
      const next = typeof updater === 'function' ? updater(rowSelection) : updater;
      for (const item of items) {
        if (Boolean(next[String(item.id)]) !== props.selected.has(item.id)) props.actions.toggleSelection(item.id, false);
      }
    },
  });
  return <div data-catalog-view-mode="list" data-catalog-table="" aria-busy={result.isFetching || undefined} className="flex min-w-0 flex-col gap-4">
    <div className="flex flex-wrap justify-end gap-2" role="toolbar" aria-label="作品列表工具栏">
      <div data-toolbar-actions="">
      <TableColumnControls preferences={preferences} />
      <DataTableSort label="作品列表" options={sortOptions} sorting={sorting}
        onChange={next => table.setSorting(next)} />
      </div>
    </div>
    <LibraryCompletionPrompt assetIds={props.filters?.state === 'trash' ? [] : missingPreviewIds(items, props.layout.javImage)} />
    {result.isError ? <RetryNote message={requestErrorMessage(result.error)} onRetry={() => void result.refetch()} /> : null}
    <DataTableFrame follow preferences={preferences} onRowClick={props.selectMode ? id => { if (!result.isPlaceholderData) props.actions.toggleSelection(Number(id), false) } : undefined}>
      <Table aria-label="作品列表" size="sm"
        sortDescriptor={sort ? { column: sort.id, direction: sort.desc ? 'descending' : 'ascending' } : undefined}
        onSortChange={next => table.setSorting([{ id: String(next.column), desc: next.direction === 'descending' }])}>
        <TableHeader>{table.getHeaderGroups()[0]!.headers.map(header =>
          <TableColumn key={header.id} id={header.id} isRowHeader={header.id === 'name'} allowsSorting={header.column.getCanSort()}
            {...preferences.columnProps(header.id)}>
            {({ sortDirection }) => <>
            <span className="flex items-center gap-0.5">
              {flexRender(header.column.columnDef.header, header.getContext())}
              {header.column.getCanSort() ? <span data-sort-indicator data-direction={sortDirection || undefined}><ChevronSortDown /></span> : null}
            </span>
            <TableColumnResizer preferences={preferences} id={header.id} />
            </>}
          </TableColumn>)}
          <TableColumn id="remaining-space" aria-label="行空白区域" data-table-space="" width={preferences.spaceWidth} minWidth={0} />
        </TableHeader>
        <TableBody renderEmptyState={() => result.isPending
          ? <div data-skeleton="" data-table-skeleton="" aria-busy="true" role="status" aria-label="正在读取作品列表">
            {Array.from({ length: 6 }, (_, index) => <div key={index}><i className="skeleton-sheen" /><span className="skeleton-sheen" /></div>)}
          </div> : result.isError ? '作品列表未取得' : '没有符合的作品'}>
          {table.getRowModel().rows.map(row => <TableRow key={row.id} id={row.id} data-catalog-row="" data-id={row.original.id}
            data-library={tints.get(row.original.library_id || '')?.color ? row.original.library_id : undefined}
            data-board-selected={row.getIsSelected() || undefined}>
            {row.getVisibleCells().map(cell => <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>)}
            <TableCell data-table-space="" />
          </TableRow>)}
        </TableBody>
      </Table>
    </DataTableFrame>
    {result.data ? <DataTableFooter label="作品列表" total={total} pagination={pagination}
      onChange={next => table.setPagination(next)} unit="部作品" pageUnit="部" /> : null}
  </div>;
}

function ListIdentity({ item, props, disabled }: { item: MediaItem; props: CatalogGridProps; disabled: boolean }) {
  const artwork = cardArtwork(item, 'small', false, props.layout.javImage);
  const name = props.helpers.displayName(item, item.name || '').trim() || '未命名作品';
  const who = item.creator || item.performers?.join('、') || item.studio;
  const tints = useLibraryTints();
  const tint = item.library_id ? tints.get(item.library_id) : undefined;
  const flaggedBy = [Number(item.liked) > 0 ? '喜欢' : '', Number(item.o_count) > 0 ? '有高潮记录' : ''].filter(Boolean);
  const glyph = (name: string) => <svg viewBox="0 0 24 24" aria-hidden="true"><use href={`#i-${name}`} /></svg>;
  return <div data-list-identity="">
    <button type="button" data-list-open="" disabled={disabled} aria-label={`打开 ${name}`} onClick={event => {
      if (props.selectMode) {
        props.actions.toggleSelection(item.id, event.shiftKey); return;
      }
      const open = props.filters?.state === 'trash' ? props.actions.openResource : props.actions.open;
      open(item, event.currentTarget);
    }}>
      <span data-list-picture="">{artwork.html
        ? <ArtSlot artwork={artwork} relayout={root => relayoutCovers(root, 'small')} /> : <span>无预览</span>}
        {item.watch_later || flaggedBy.length
          ? <span data-media-status="">
            {item.watch_later ? <span data-status="later" title="稍后看" aria-label="稍后看">{glyph('bookmark')}</span> : null}
            {flaggedBy.length ? <span data-status="flagged" title={`已标记：${flaggedBy.join('、')}`}
              aria-label={`已标记：${flaggedBy.join('、')}`}>{glyph('heart')}</span> : null}
          </span>
          : null}</span>
      <span data-list-text=""><span data-list-name="" title={name}>{name}</span>
        <span data-list-byline="">
          {tint ? <span data-list-library="" title={`媒体库：${tint.name}`}>
            <SourceMark mark={tint.icon} />{tint.name}
          </span> : null}
          {who || '未归属'}
        </span>
      </span>
    </button>
  </div>;
}
