(function() {
	try {
		var e = typeof window < "u" ? window : typeof global < "u" ? global : typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : {}, t = new e.Error().stack;
		t && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[t] = "74a05bab-3494-45f9-ba22-a1fde6a6c540", e._sentryDebugIdIdentifier = "sentry-dbid-74a05bab-3494-45f9-ba22-a1fde6a6c540");
	} catch {}
})();
import { t as e } from "./peach-app.createPaginatedRowModel-Cb5ojTIu.js";
import { n as t, t as n } from "./peach-app.use-table-selection-KrR-g6fk.js";
import { Ai as r, Bi as i, Fi as a, Gi as o, Ji as s, Mi as c, Ni as l, Pi as u, Ri as d, Va as f, Vi as p, Wi as m, Xa as h, Yi as g, as as _, cu as v, ec as y, fs as b, is as x, ji as S, na as C, ns as w, pu as T, qi as E, rs as D, to as O, ts as k, uu as A, zi as j } from "./peach-app.js";
//#region src/react/components/data-table.tsx
var M = /* @__PURE__ */ T(A(), 1), N = v(), P = s({
	rowSortingFeature: p,
	rowSelectionFeature: m,
	rowPaginationFeature: o,
	columnVisibilityFeature: E,
	sortedRowModel: t(),
	paginatedRowModel: e()
});
function F({ label: e, items: t, columns: o, rowId: s, rowLabel: p, selected: m, onSelected: v, actions: T, title: E = e, titleId: A, description: F, footerActions: I, panel: L = !0, unit: R = "条记录" }) {
	let [z, B] = (0, M.useState)([]), V = (0, M.useMemo)(() => [{
		id: "select",
		label: "选择",
		width: 48,
		min: 48,
		max: 48,
		required: !0
	}, ...o.map((e, t) => ({
		...e,
		width: e.width ?? (t === 0 ? 320 : 160),
		min: e.min ?? (t === 0 ? 320 : 96),
		flex: e.flex ?? t === 0,
		required: t === 0
	}))], [o]), H = l(`data:${e}`, V), [U, W] = (0, M.useState)({
		pageIndex: 0,
		pageSize: 20
	}), G = n(() => v([])), K = Math.max(1, Math.ceil(t.length / U.pageSize)), q = Math.min(U.pageIndex, K - 1), J = Object.fromEntries(m.map((e) => [e, !0])), Y = (0, M.useMemo)(() => {
		let t = g();
		return t.columns([t.display({
			id: "select",
			header: ({ table: t }) => /* @__PURE__ */ (0, N.jsx)(r, {
				table: t,
				label: `全选${e}`
			}),
			cell: ({ row: e }) => /* @__PURE__ */ (0, N.jsx)(h, {
				slot: null,
				"aria-label": `选择 ${p(e.original)}`,
				isSelected: e.getIsSelected(),
				onChange: (t) => e.toggleSelected(t)
			})
		}), ...o.map((e) => t.accessor((t) => e.value?.(t) ?? "", {
			id: e.id,
			header: e.label,
			enableSorting: !!e.value,
			sortFn: (t, n) => {
				let r = e.value(t.original), i = e.value(n.original);
				return typeof r == "number" && typeof i == "number" ? r - i : String(r).localeCompare(String(i), "zh-CN", { numeric: !0 });
			},
			cell: ({ row: t }) => e.render(t.original)
		}))]);
	}, [
		o,
		e,
		p
	]), X = i({
		features: P,
		data: t,
		columns: Y,
		getRowId: s,
		state: {
			sorting: z,
			rowSelection: J,
			pagination: {
				...U,
				pageIndex: q
			},
			columnVisibility: H.visibility
		},
		onColumnVisibilityChange: H.change,
		onSortingChange: (e) => {
			B(e), W((e) => ({
				...e,
				pageIndex: 0
			}));
		},
		onPaginationChange: W,
		enableRowSelection: !0,
		onRowSelectionChange: (e) => {
			let n = typeof e == "function" ? e(J) : e;
			Object.values(n).some(Boolean) && G(), v(t.filter((e) => n[s(e)]).map(s));
		}
	}), Z = X.getSelectedRowModel().rows.map((e) => e.original);
	return /* @__PURE__ */ (0, N.jsxs)("div", {
		"data-data-table-panel": L || void 0,
		className: L ? f({
			padding: "none",
			bordered: "line",
			className: "flex flex-col gap-4 px-6 py-5 max-sm:px-4"
		}) : "flex min-w-0 flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, N.jsxs)("div", {
				"data-responsive-toolbar": "",
				role: "toolbar",
				"aria-label": `${e}工具栏`,
				children: [/* @__PURE__ */ (0, N.jsxs)("div", {
					"data-toolbar-heading": "",
					children: [/* @__PURE__ */ (0, N.jsx)("h3", {
						id: A,
						className: "text-title-2-medium text-text-primary",
						children: E
					}), /* @__PURE__ */ (0, N.jsx)("span", {
						className: "text-body-2-regular tabular-nums text-text-secondary",
						children: `${t.length.toLocaleString()} ${R}`
					})]
				}), /* @__PURE__ */ (0, N.jsxs)("div", {
					"data-toolbar-actions": "",
					children: [/* @__PURE__ */ (0, N.jsx)(S, {
						preferences: H,
						label: e
					}), /* @__PURE__ */ (0, N.jsx)(a, {
						label: e,
						options: o.filter((e) => e.value).map((e) => ({
							id: e.id,
							label: e.label
						})),
						sorting: z,
						onChange: (e) => {
							B(e), W((e) => ({
								...e,
								pageIndex: 0
							}));
						}
					})]
				})]
			}),
			F ? /* @__PURE__ */ (0, N.jsx)("p", {
				className: "text-body-2-regular text-text-secondary",
				children: F
			}) : null,
			/* @__PURE__ */ (0, N.jsxs)(y, {
				label: `${e}批量操作`,
				visible: Z.length > 0,
				count: `已选 ${Z.length.toLocaleString()} ${R}`,
				children: [T(Z, () => v([])), /* @__PURE__ */ (0, N.jsx)(b, {
					variant: "ghost",
					size: "small",
					onClick: () => v([]),
					children: "取消选择"
				})]
			}),
			/* @__PURE__ */ (0, N.jsx)(d, {
				follow: !0,
				preferences: H,
				onRowClick: (e) => X.getRow(e)?.toggleSelected(),
				children: /* @__PURE__ */ (0, N.jsxs)(j, {
					"aria-label": e,
					size: "sm",
					sortDescriptor: z[0] ? {
						column: z[0].id,
						direction: z[0].desc ? "descending" : "ascending"
					} : void 0,
					onSortChange: (e) => X.getColumn(String(e.column))?.toggleSorting(e.direction === "descending"),
					children: [/* @__PURE__ */ (0, N.jsxs)(_, { children: [X.getHeaderGroups()[0].headers.map((e) => /* @__PURE__ */ (0, N.jsx)(w, {
						id: e.id,
						isRowHeader: e.id === o[0].id,
						allowsSorting: e.column.getCanSort(),
						...H.columnProps(e.id),
						children: ({ sortDirection: t }) => /* @__PURE__ */ (0, N.jsxs)(N.Fragment, { children: [/* @__PURE__ */ (0, N.jsxs)("span", {
							className: "flex items-center gap-0.5",
							children: [C(e.column.columnDef.header, e.getContext()), e.column.getCanSort() ? /* @__PURE__ */ (0, N.jsx)("span", {
								"data-sort-indicator": !0,
								"data-direction": t || void 0,
								children: /* @__PURE__ */ (0, N.jsx)(O, {})
							}) : null]
						}), /* @__PURE__ */ (0, N.jsx)(c, {
							preferences: H,
							id: e.id
						})] })
					}, e.id)), /* @__PURE__ */ (0, N.jsx)(w, {
						id: "remaining-space",
						"aria-label": "行空白区域",
						"data-table-space": "",
						width: H.spaceWidth,
						minWidth: 0
					})] }), /* @__PURE__ */ (0, N.jsx)(k, {
						renderEmptyState: () => "没有记录",
						children: X.getRowModel().rows.map((e) => /* @__PURE__ */ (0, N.jsxs)(D, {
							id: e.id,
							"data-board-selected": e.getIsSelected() || void 0,
							children: [e.getVisibleCells().map((e) => /* @__PURE__ */ (0, N.jsx)(x, { children: C(e.column.columnDef.cell, e.getContext()) }, e.id)), /* @__PURE__ */ (0, N.jsx)(x, { "data-table-space": "" })]
						}, e.id))
					})]
				})
			}),
			/* @__PURE__ */ (0, N.jsx)(u, {
				label: e,
				total: t.length,
				pagination: {
					...U,
					pageIndex: q
				},
				onChange: W,
				unit: R
			}),
			I ? /* @__PURE__ */ (0, N.jsx)("div", {
				className: "flex flex-wrap items-center justify-end gap-2 border-t border-separator-border pt-4",
				children: I
			}) : null
		]
	});
}
//#endregion
export { F as t };

//# debugId=74a05bab-3494-45f9-ba22-a1fde6a6c540