(function() {
	try {
		var e = typeof window < "u" ? window : typeof global < "u" ? global : typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : {}, t = new e.Error().stack;
		t && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[t] = "ff24749c-b6de-462c-a663-c18042059274", e._sentryDebugIdIdentifier = "sentry-dbid-ff24749c-b6de-462c-a663-c18042059274");
	} catch {}
})();
import { t as e } from "./peach-app.createPaginatedRowModel-Cb5ojTIu.js";
import { $c as t, Ai as n, Bc as r, Bi as i, Bl as ee, Cl as te, El as ne, Eo as re, Gi as a, Gl as o, Hc as s, Ia as ie, Ic as c, Io as l, Jc as u, Ji as d, Kc as ae, La as f, Li as oe, Lo as se, Mc as ce, Mi as le, Ml as p, Ni as ue, Ol as de, Pi as fe, Ql as pe, Ra as me, Ri as he, Sc as m, Tl as ge, Uc as _e, Va as ve, Vi as ye, Vo as be, Wc as xe, Wi as h, Xa as g, Xc as Se, Yi as Ce, Z as we, Zc as Te, _a as Ee, _l as De, as as Oe, bl as ke, bo as Ae, cu as _, da as je, ec as Me, fs as v, gl as Ne, go as Pe, hl as Fe, ia as y, is as Ie, iu as b, ji as Le, jl as Re, kc as x, ll as S, mn as ze, na as Be, nc as C, ns as Ve, oo as He, pl as Ue, pu as We, qc as Ge, qi as w, rl as Ke, ro as T, rs as qe, so as E, to as Je, ts as Ye, uu as Xe, zi as Ze, zl as Qe } from "./peach-app.js";
import { a as $e, i as et, n as tt, r as D, t as nt } from "./peach-app.source-view-DaRl5mr9.js";
//#region src/react/follow-manage/source-list.tsx
var O = /* @__PURE__ */ We(Xe(), 1), k = _(), rt = d({
	rowPaginationFeature: a,
	rowSelectionFeature: h,
	rowSortingFeature: ye,
	columnVisibilityFeature: w,
	paginatedRowModel: e()
}), A = (e) => (Number(e) || 0).toLocaleString(), it = Object.fromEntries(Object.entries(x).map(([e, t]) => [t, e])), j = 740;
function at() {
	let [e, t] = (0, O.useState)(!1), n = (0, O.useRef)(null), r = (0, O.useCallback)((e) => {
		if (n.current?.disconnect(), !e) {
			n.current = null;
			return;
		}
		let r = new ResizeObserver(() => t(e.clientWidth < j));
		r.observe(e), n.current = r, t(e.clientWidth < j);
	}, []);
	return (0, O.useEffect)(() => () => n.current?.disconnect(), []), [r, e];
}
var ot = {
	select: "选择",
	author: "创作者",
	source: "来源",
	provider: "站点",
	status: "状态",
	checked: "上次检查",
	actions: "操作"
}, st = Object.entries(ot).map(([e, t]) => ({
	id: e,
	label: t,
	width: e === "select" ? 48 : e === "source" ? 320 : e === "author" ? 240 : e === "actions" ? 208 : 184,
	min: e === "select" ? 48 : e === "actions" ? 200 : e === "source" ? 320 : 112,
	max: e === "select" ? 48 : e === "source" ? 2e3 : 800,
	flex: e === "source",
	required: e === "select" || e === "source"
}));
function M({ source: e, selected: t, onToggle: n, handlers: r }) {
	return /* @__PURE__ */ (0, k.jsxs)("div", {
		"data-selected": t || void 0,
		"data-follow-source-row": "",
		className: "flex min-h-16 flex-wrap items-center gap-3 px-2 py-3 last:rounded-b-lg max-sm:gap-x-2",
		onClick: (e) => {
			y(e, e.currentTarget) && n(!t);
		},
		children: [
			/* @__PURE__ */ (0, k.jsx)(g, {
				isSelected: t,
				onChange: n,
				"aria-label": `选择 ${e.label}`
			}),
			/* @__PURE__ */ (0, k.jsxs)("span", {
				className: "flex min-w-0 grow basis-0 items-center gap-1.5",
				children: [/* @__PURE__ */ (0, k.jsx)("span", {
					"data-follow-source-site": "",
					className: "flex shrink-0 items-center text-body-medium",
					children: /* @__PURE__ */ (0, k.jsx)(D, { provider: e.provider })
				}), /* @__PURE__ */ (0, k.jsx)(et, { source: e })]
			}),
			/* @__PURE__ */ (0, k.jsx)(C, { children: e.provider_label }),
			/* @__PURE__ */ (0, k.jsx)($e, { source: e }),
			e.last_error ? /* @__PURE__ */ (0, k.jsxs)("span", {
				"data-follow-source-error": "",
				className: "flex min-w-0 basis-full gap-3 max-sm:gap-x-2 sm:order-last",
				children: [/* @__PURE__ */ (0, k.jsx)("span", {
					"aria-hidden": !0,
					className: "w-4 shrink-0"
				}), /* @__PURE__ */ (0, k.jsxs)("span", {
					className: "flex min-w-0 grow gap-1.5",
					children: [/* @__PURE__ */ (0, k.jsx)("span", {
						"aria-hidden": !0,
						className: "w-(--icon-inline) shrink-0 text-body-medium"
					}), /* @__PURE__ */ (0, k.jsx)("span", {
						className: "min-w-0 grow",
						children: /* @__PURE__ */ (0, k.jsx)(tt, { text: e.last_error })
					})]
				})]
			}) : null,
			/* @__PURE__ */ (0, k.jsxs)("span", {
				"data-follow-source-controls": "",
				className: "flex w-max max-w-full flex-none flex-wrap items-center gap-1.5 max-sm:w-full",
				children: [
					/* @__PURE__ */ (0, k.jsx)("span", {
						className: "shrink-0 text-body-2-regular whitespace-nowrap text-text-secondary max-sm:mr-auto max-sm:text-caption-1-regular",
						children: u(e)
					}),
					/* @__PURE__ */ (0, k.jsx)(we, {
						"aria-label": `启用 ${e.label}`,
						isSelected: e.enabled,
						isDisabled: r.readOnly,
						onChange: (t) => r.toggle(e, t)
					}),
					/* @__PURE__ */ (0, k.jsxs)("span", {
						className: "flex shrink-0 items-center gap-1",
						children: [/* @__PURE__ */ (0, k.jsx)(v, {
							variant: "secondary",
							size: "small",
							iconOnly: !0,
							leadingIcon: l,
							"aria-label": `检查 ${e.label} 的更新`,
							disabled: !e.enabled || r.readOnly,
							...T(r.busy),
							onClick: () => r.check([e.id])
						}), /* @__PURE__ */ (0, k.jsx)(v, {
							variant: "secondary",
							size: "small",
							iconOnly: !0,
							leadingIcon: Ae,
							"aria-label": `移除 ${e.label}`,
							disabled: r.readOnly,
							onClick: () => r.remove(e)
						})]
					})
				]
			})
		]
	});
}
function ct({ group: e, name: t, open: n, selected: r, handlers: i, onOpen: ee, onToggleGroup: ne, onToggle: re }) {
	let a = e.map((e) => e.id), o = e.filter((e) => e.enabled).map((e) => e.id), s = e.filter(S).length, c = [...new Set(e.map((e) => e.provider_label || e.provider))].join("、"), u = `follow-author-${e[0].id}`, d = te(r, a);
	return /* @__PURE__ */ (0, k.jsxs)("section", {
		"aria-label": `${t} 的关注来源`,
		className: ve({
			variant: "raised",
			padding: "none",
			className: "flex flex-col overflow-hidden p-2"
		}),
		children: [/* @__PURE__ */ (0, k.jsxs)("div", {
			"data-follow-author-header": !0,
			"data-open": n || void 0,
			className: "flex flex-wrap items-center gap-3 px-2 py-2.5",
			children: [
				/* @__PURE__ */ (0, k.jsx)(nt, {
					group: e,
					name: t
				}),
				/* @__PURE__ */ (0, k.jsxs)("span", {
					className: "flex min-w-0 grow basis-0 flex-col gap-1",
					children: [/* @__PURE__ */ (0, k.jsx)("b", {
						className: "min-w-0 text-body-medium wrap-anywhere text-text-primary",
						children: t
					}), /* @__PURE__ */ (0, k.jsxs)("span", {
						"data-follow-author-sites": "",
						className: "flex min-w-0 flex-wrap items-center gap-1 text-body-2-regular",
						title: c,
						children: [
							e.map((e) => /* @__PURE__ */ (0, k.jsx)(D, { provider: e.provider }, e.id)),
							/* @__PURE__ */ (0, k.jsx)(C, { children: `来源：${c}` }),
							s ? /* @__PURE__ */ (0, k.jsx)("span", {
								className: "ml-1 shrink-0 text-text-error-primary",
								children: `${s} 个失败`
							}) : null
						]
					})]
				}),
				/* @__PURE__ */ (0, k.jsxs)("span", {
					"data-follow-author-controls": "",
					className: "flex flex-none items-center gap-2 max-sm:w-full max-sm:justify-end",
					children: [/* @__PURE__ */ (0, k.jsx)(v, {
						variant: "secondary",
						size: "small",
						iconOnly: !0,
						leadingIcon: l,
						"aria-label": `检查 ${t} 的全部来源`,
						disabled: !o.length || i.readOnly,
						...T(i.busy),
						onClick: () => i.check(o)
					}), /* @__PURE__ */ (0, k.jsxs)("span", {
						className: "flex flex-none items-center gap-2",
						children: [/* @__PURE__ */ (0, k.jsx)(v, {
							variant: "secondary",
							size: "small",
							leadingIcon: be,
							"aria-pressed": d.all ? "true" : d.some ? "mixed" : "false",
							"aria-label": `${d.all ? "取消全选" : "全选"} ${t} 的来源`,
							onClick: () => ne(!d.all),
							children: d.all ? "取消全选" : "全选"
						}), /* @__PURE__ */ (0, k.jsx)(v, {
							variant: "secondary",
							size: "small",
							"aria-expanded": n,
							"aria-controls": u,
							leadingIcon: ie,
							"aria-label": `${n ? "收起" : "展开"} ${t} 的来源`,
							onClick: () => ee(!n),
							children: n ? "收起" : "展开"
						})]
					})]
				})
			]
		}), /* @__PURE__ */ (0, k.jsx)(f, {
			id: u,
			open: n,
			"data-source-divider": !0,
			children: e.map((e) => /* @__PURE__ */ (0, k.jsx)(M, {
				source: e,
				handlers: i,
				selected: r.has(e.id),
				onToggle: (t) => re(e.id, t)
			}, e.id))
		})]
	});
}
function lt(e) {
	let { data: a, sort: d, dir: f, page: ye, layout: be, pageSize: h, selected: _, readOnly: y, onSort: S, onPage: We, onLayout: w, onPageSize: Xe, onSelected: j, toast: M, openFollow: lt, onAdd: ut } = e, N = a.sources, P = (0, O.useMemo)(() => a.author_aliases || [], [a.author_aliases]), F = a.counts || {}, [I, dt] = (0, O.useState)(/* @__PURE__ */ new Set()), [ft, pt] = at(), [mt, L] = (0, O.useState)(""), R = (0, O.useMemo)(() => r(N, d, f, P), [
		N,
		d,
		f,
		P
	]), ht = (0, O.useMemo)(() => Re(R, d, f, P), [
		R,
		d,
		f,
		P
	]), { job: z, running: B, outcome: V, start: gt } = ze({
		queryKey: ce,
		queryFn: ({ signal: e }) => t(e),
		start: (e) => de(e),
		onError: (e) => L(o(e)),
		onFinish: (e) => {
			De(), M(e.status === "failed" ? e.error || "检查失败" : ae(e));
		}
	}), H = (e) => {
		B || gt.isPending || (L(""), gt.mutate(e));
	}, _t = (e, t) => j(p(_, [e], t)), vt = (e, t) => j(p(_, e, t)), yt = b({
		mutationFn: (e) => ke(e),
		onSuccess: (e, t) => {
			Se([t]), j(p(_, [t], !1)), M("已取消关注来源");
		},
		onError: (e) => L(o(e))
	}), bt = b({
		mutationFn: (e) => ge(e.id, e.enabled),
		onSuccess: (e, t) => {
			Ne(t.id, { enabled: t.enabled }), L("");
		},
		onError: (e) => L(o(e))
	}), xt = (e) => void m({
		title: "取消关注来源",
		body: "将移除这个来源及已抓取的条目，媒体文件保留。",
		confirmLabel: "取消关注来源",
		danger: !0,
		onConfirm: () => yt.mutateAsync(e.id)
	}), U = b({
		mutationFn: async (e) => {
			let t = await pe(e.ids, 4, async (t) => {
				e.action === "remove" ? await ke(t) : await ge(t, e.action === "enabled");
			});
			return {
				...e,
				done: e.ids.filter((e, n) => t[n]?.ok),
				results: t
			};
		},
		onSuccess: (e) => {
			if (e.action === "remove") Se(e.done);
			else for (let t of e.done) Ne(t, { enabled: e.action === "enabled" });
			j(p(_, e.done, !1));
			let t = e.results.filter((e) => !e.ok);
			if (t.length) {
				L(`${t.length}/${e.ids.length} 个来源未更新：${o(t[0]?.error)}`);
				return;
			}
			L("");
			let n = e.action === "remove" ? "删除" : e.action === "enabled" ? "启用" : "暂停";
			M(`已${n} ${e.done.length} 个关注来源`);
		},
		onError: (e) => L(o(e))
	}), W = b({
		mutationFn: async (e) => {
			let t = ((await Ke()).groups || []).flatMap((e) => [
				e.primary,
				...e.variants,
				...e.duplicates
			]).filter((e) => e.status === "new").map((e) => e.id);
			return {
				ids: t,
				failed: (await pe(t, 6, (t) => Ue(t, e))).filter((e) => !e.ok)
			};
		},
		onSuccess: (e) => {
			De(), e.failed.length ? L(`批量更新 ${e.failed.length}/${e.ids.length} 项未完成`) : (L(""), M(`已批量标记 ${e.ids.length} 项`));
		},
		onError: (e) => L(o(e))
	}), St = (e, t) => bt.mutate({
		id: e.id,
		enabled: t
	}), G = (0, O.useRef)({
		check: H,
		toggle: St,
		remove: xt,
		busy: !1,
		readOnly: y
	});
	G.current = {
		check: H,
		toggle: St,
		remove: xt,
		busy: B || gt.isPending,
		readOnly: y
	};
	let K = G.current, Ct = (0, O.useMemo)(() => {
		let e = Ce(), t = (e) => () => ot[e] || e;
		return e.columns([
			e.display({
				id: "select",
				header: (e) => /* @__PURE__ */ (0, k.jsx)(n, {
					table: e.table,
					label: "全选本页来源",
					page: !0
				}),
				cell: (e) => /* @__PURE__ */ (0, k.jsx)(g, {
					slot: null,
					isSelected: e.row.getIsSelected(),
					onChange: (t) => e.row.toggleSelected(t),
					"aria-label": `选择 ${e.row.original.source.label}`
				})
			}),
			e.accessor((e) => e.author, {
				id: "author",
				header: t("author"),
				cell: (e) => /* @__PURE__ */ (0, k.jsxs)("span", {
					className: "flex min-w-0 items-center gap-2",
					children: [/* @__PURE__ */ (0, k.jsx)(nt, {
						group: e.row.original.group,
						name: e.row.original.author
					}), /* @__PURE__ */ (0, k.jsx)("span", {
						className: "min-w-0 break-words",
						children: e.row.original.author
					})]
				})
			}),
			e.accessor((e) => e.source.label, {
				id: "source",
				header: t("source"),
				cell: (e) => /* @__PURE__ */ (0, k.jsxs)("span", {
					className: "flex min-w-0 flex-col gap-0.5",
					children: [/* @__PURE__ */ (0, k.jsx)(et, { source: e.row.original.source }), e.row.original.source.last_error ? /* @__PURE__ */ (0, k.jsx)(tt, { text: e.row.original.source.last_error }) : null]
				})
			}),
			e.accessor((e) => e.source.provider_label, {
				id: "provider",
				header: t("provider"),
				cell: (e) => /* @__PURE__ */ (0, k.jsxs)("span", {
					className: "flex items-center gap-1.5",
					children: [/* @__PURE__ */ (0, k.jsx)(D, { provider: e.row.original.source.provider }), e.row.original.source.provider_label]
				})
			}),
			e.display({
				id: "status",
				header: t("status"),
				cell: (e) => /* @__PURE__ */ (0, k.jsx)($e, { source: e.row.original.source })
			}),
			e.accessor((e) => e.source.last_checked_at || "", {
				id: "checked",
				header: t("checked"),
				cell: (e) => u(e.row.original.source)
			}),
			e.display({
				id: "actions",
				header: t("actions"),
				cell: (e) => /* @__PURE__ */ (0, k.jsxs)("span", {
					className: "flex items-center gap-1",
					children: [
						/* @__PURE__ */ (0, k.jsx)(we, {
							"aria-label": `启用 ${e.row.original.source.label}`,
							isSelected: e.row.original.source.enabled,
							isDisabled: K.readOnly,
							onChange: (t) => G.current.toggle(e.row.original.source, t)
						}),
						/* @__PURE__ */ (0, k.jsx)(v, {
							variant: "secondary",
							size: "small",
							iconOnly: !0,
							leadingIcon: l,
							"aria-label": `检查 ${e.row.original.source.label} 的更新`,
							disabled: !e.row.original.source.enabled || K.readOnly,
							...T(K.busy),
							onClick: () => G.current.check([e.row.original.source.id])
						}),
						/* @__PURE__ */ (0, k.jsx)(v, {
							variant: "secondary",
							size: "small",
							iconOnly: !0,
							leadingIcon: Ae,
							"aria-label": `移除 ${e.row.original.source.label}`,
							disabled: K.readOnly,
							onClick: () => G.current.remove(e.row.original.source)
						})
					]
				})
			})
		]);
	}, [K]), q = (0, O.useMemo)(() => {
		let e = it[d];
		return e ? [{
			id: e,
			desc: f === "desc"
		}] : [];
	}, [d, f]), wt = (0, O.useMemo)(() => Object.fromEntries([..._].map((e) => [String(e), !0])), [_]), J = be === "table", Y = ue("follow-sources", st), X = Fe(J ? ht.length : R.length, h, ye), Z = i({
		features: rt,
		data: ht,
		columns: Ct,
		getRowId: (e) => String(e.source.id),
		state: {
			sorting: q,
			rowSelection: wt,
			pagination: {
				pageIndex: X.page - 1,
				pageSize: h
			},
			columnVisibility: Y.visibility
		},
		onColumnVisibilityChange: Y.change,
		manualSorting: !0,
		enableRowSelection: !0,
		onSortingChange: (e) => {
			let t = (typeof e == "function" ? e(q) : e)[0];
			if (!t) return;
			let n = x[t.id];
			n && S(n, t.desc ? "desc" : "asc");
		},
		onRowSelectionChange: (e) => {
			let t = typeof e == "function" ? e(wt) : e;
			j(new Set(Object.entries(t).filter(([, e]) => e).map(([e]) => Number(e))));
		},
		onPaginationChange: (e) => {
			let t = {
				pageIndex: X.page - 1,
				pageSize: h
			}, n = typeof e == "function" ? e(t) : e;
			n.pageSize === h ? n.pageIndex !== t.pageIndex && We(n.pageIndex + 1) : Xe(n.pageSize);
		}
	}), Tt = Z.getRowModel().rows, Et = J ? Tt.map((e) => e.original.source.id) : R.slice(X.start, X.end).flatMap((e) => e.map((e) => e.id)), Dt = te(_, Et), Q = [..._], Ot = xe(V), kt = N.filter((e) => e.enabled && (e.last_status === "error" || e.last_status === "unauthorized")).map((e) => e.id), At = _e(V), $ = R.length > 0 && I.size >= R.length;
	return N.length ? /* @__PURE__ */ (0, k.jsxs)("div", {
		className: ve({
			padding: "none",
			className: "flex flex-col gap-4 px-6 py-5 max-sm:px-4"
		}),
		children: [
			/* @__PURE__ */ (0, k.jsxs)("div", {
				ref: ft,
				"data-follow-toolbar": "",
				"data-responsive-toolbar": "",
				children: [/* @__PURE__ */ (0, k.jsxs)("span", {
					"data-follow-toolbar-heading": "",
					"data-toolbar-heading": "",
					children: [/* @__PURE__ */ (0, k.jsx)("h3", {
						className: "text-title-2-medium text-text-primary",
						children: "关注列表"
					}), /* @__PURE__ */ (0, k.jsx)("span", {
						className: "text-body-2-regular text-text-secondary",
						children: `${N.length.toLocaleString()} 个来源${F.new ? ` · ${A(F.new)} 条未看` : ""}`
					})]
				}), /* @__PURE__ */ (0, k.jsxs)("div", {
					"data-follow-toolbar-actions": "",
					"data-toolbar-actions": "",
					children: [
						kt.length ? /* @__PURE__ */ (0, k.jsx)(v, {
							variant: "secondary",
							disabled: y,
							...T(K.busy),
							onClick: () => H(kt),
							children: "检查失败项"
						}) : null,
						/* @__PURE__ */ (0, k.jsx)(v, {
							variant: "primary",
							leadingIcon: l,
							disabled: y,
							"aria-label": "检查全部",
							iconOnly: pt,
							...T(K.busy),
							onClick: () => H([]),
							children: "检查全部"
						}),
						/* @__PURE__ */ (0, k.jsxs)("span", {
							"data-follow-toolbar-controls": "",
							className: "contents",
							children: [
								/* @__PURE__ */ (0, k.jsxs)("span", {
									"data-button-group": !0,
									role: "group",
									"aria-label": "关注列表版式",
									children: [/* @__PURE__ */ (0, k.jsx)(v, {
										variant: "ghost",
										iconOnly: !0,
										leadingIcon: re,
										"aria-label": c[0][1],
										"aria-pressed": !J,
										onClick: () => w("default")
									}), /* @__PURE__ */ (0, k.jsx)(v, {
										variant: "ghost",
										iconOnly: !0,
										leadingIcon: se,
										"aria-label": c[1][1],
										"aria-pressed": J,
										onClick: () => w("table")
									})]
								}),
								J ? /* @__PURE__ */ (0, k.jsx)(Le, {
									preferences: Y,
									label: "关注来源"
								}) : null,
								/* @__PURE__ */ (0, k.jsxs)("span", {
									className: "flex flex-none items-center gap-2",
									children: [/* @__PURE__ */ (0, k.jsx)(oe, {
										"aria-label": "关注列表排序",
										prefix: "排序",
										selectedKey: d,
										onSelectionChange: (e) => {
											if (e === null) return;
											let t = String(e);
											S(t, Qe[t]);
										},
										children: ee.map(([e, t]) => /* @__PURE__ */ (0, k.jsx)(Ee, {
											id: e,
											children: t
										}, e))
									}), /* @__PURE__ */ (0, k.jsx)(v, {
										variant: "secondary",
										iconOnly: !0,
										leadingIcon: je,
										"data-icon-state": f === "asc" ? "a" : "b",
										"aria-label": ne(d, f),
										onClick: () => S(d, f === "asc" ? "desc" : "asc")
									})]
								}),
								J ? null : /* @__PURE__ */ (0, k.jsx)(v, {
									variant: "secondary",
									iconOnly: pt,
									leadingIcon: ie,
									"aria-expanded": !$,
									"aria-label": $ ? "全部展开" : "全部收起",
									onClick: () => dt($ ? /* @__PURE__ */ new Set() : new Set(R.map((e) => String(e[0].author_key || e[0].id)))),
									children: $ ? "全部展开" : "全部收起"
								})
							]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, k.jsxs)("div", {
				"aria-live": "polite",
				className: "flex flex-col gap-3 empty:hidden",
				children: [
					B ? /* @__PURE__ */ (0, k.jsx)(me, {
						embedded: !0,
						label: z?.message || (z?.total ? `${z.older ? "抓取历史" : "检查更新"}：已完成 ${z.checked || 0}/${z.total} 个来源` : "正在准备检查任务"),
						value: z?.checked,
						total: z?.total
					}) : null,
					mt ? /* @__PURE__ */ (0, k.jsx)(E, {
						tone: "error",
						title: "操作未完成",
						children: mt
					}) : null,
					!B && V?.results?.length ? /* @__PURE__ */ (0, k.jsx)(E, {
						tone: "neutral",
						title: "检查结果",
						children: Ge(V)
					}) : null,
					Ot.length ? /* @__PURE__ */ (0, k.jsx)(E, {
						tone: "error",
						title: `${Ot.length} 个来源检查失败`,
						extra: /* @__PURE__ */ (0, k.jsx)("ul", {
							className: "flex flex-col gap-0.5 text-body-2-regular",
							children: Ot.map((e, t) => /* @__PURE__ */ (0, k.jsx)("li", { children: `${e.provider_label || e.provider || ""} ${e.author || e.label || e.ref || ""}：${Te(e.error || "") || "未说明原因"}` }, `${e.provider || ""}-${e.ref || t}`))
						}),
						children: "这些来源这一轮没有取到更新。"
					}) : null,
					At ? /* @__PURE__ */ (0, k.jsx)(E, {
						tone: "warning",
						children: `条目已保存，但这次未保存来源的原始响应：${At}`
					}) : null
				]
			}),
			/* @__PURE__ */ (0, k.jsxs)(Me, {
				label: "关注来源批量操作",
				visible: Q.length > 0,
				count: `已选 ${Q.length} 个来源`,
				children: [
					/* @__PURE__ */ (0, k.jsx)(v, {
						variant: "secondary",
						size: "small",
						disabled: y,
						...T(K.busy),
						onClick: () => H(Q),
						children: "检查所选"
					}),
					/* @__PURE__ */ (0, k.jsx)(v, {
						variant: "secondary",
						size: "small",
						disabled: y,
						...T(U.isPending),
						onClick: () => U.mutate({
							ids: Q,
							action: "enabled"
						}),
						children: "启用"
					}),
					/* @__PURE__ */ (0, k.jsx)(v, {
						variant: "secondary",
						size: "small",
						disabled: y,
						...T(U.isPending),
						onClick: () => U.mutate({
							ids: Q,
							action: "paused"
						}),
						children: "暂停"
					}),
					/* @__PURE__ */ (0, k.jsx)(v, {
						variant: "danger",
						size: "small",
						disabled: y,
						...T(U.isPending),
						onClick: () => void m({
							title: `删除 ${Q.length} 个关注来源`,
							body: "将移除所选关注来源及其已抓取条目，媒体文件保留。",
							confirmLabel: "删除所选来源",
							danger: !0,
							onConfirm: () => U.mutateAsync({
								ids: Q,
								action: "remove"
							})
						}),
						children: "删除"
					}),
					/* @__PURE__ */ (0, k.jsx)(v, {
						variant: "ghost",
						size: "small",
						onClick: () => j(/* @__PURE__ */ new Set()),
						children: "取消选择"
					})
				]
			}),
			J ? /* @__PURE__ */ (0, k.jsx)(he, {
				follow: !0,
				preferences: Y,
				onRowClick: (e) => _t(Number(e), !_.has(Number(e))),
				children: /* @__PURE__ */ (0, k.jsxs)(Ze, {
					"aria-label": "关注来源",
					size: "sm",
					sortDescriptor: q[0] ? {
						column: q[0].id,
						direction: q[0].desc ? "descending" : "ascending"
					} : void 0,
					onSortChange: (e) => Z.setSorting([{
						id: String(e.column),
						desc: e.direction === "descending"
					}]),
					children: [/* @__PURE__ */ (0, k.jsxs)(Oe, { children: [Z.getHeaderGroups()[0].headers.map((e) => {
						let t = e.column.id in x, n = Be(e.column.columnDef.header, e.getContext());
						return /* @__PURE__ */ (0, k.jsx)(Ve, {
							id: e.id,
							allowsSorting: t,
							isRowHeader: e.column.id === "source",
							...Y.columnProps(e.id),
							children: ({ sortDirection: r }) => /* @__PURE__ */ (0, k.jsxs)(k.Fragment, { children: [e.id === "select" ? n : t ? /* @__PURE__ */ (0, k.jsxs)("span", {
								className: "flex items-center gap-0.5",
								children: [n, /* @__PURE__ */ (0, k.jsx)("span", {
									"data-sort-indicator": !0,
									"data-direction": r || void 0,
									children: /* @__PURE__ */ (0, k.jsx)(Je, {})
								})]
							}) : /* @__PURE__ */ (0, k.jsx)(C, { children: n }), /* @__PURE__ */ (0, k.jsx)(le, {
								preferences: Y,
								id: e.id
							})] })
						}, e.id);
					}), /* @__PURE__ */ (0, k.jsx)(Ve, {
						id: "remaining-space",
						"aria-label": "行空白区域",
						"data-table-space": "",
						width: Y.spaceWidth,
						minWidth: 0
					})] }), /* @__PURE__ */ (0, k.jsx)(Ye, {
						renderEmptyState: () => "这一页没有来源",
						children: Tt.map((e) => /* @__PURE__ */ (0, k.jsxs)(qe, {
							id: e.id,
							"data-follow-selected": e.getIsSelected() || void 0,
							children: [e.getVisibleCells().map((e) => /* @__PURE__ */ (0, k.jsx)(Ie, { children: Be(e.column.columnDef.cell, e.getContext()) }, e.id)), /* @__PURE__ */ (0, k.jsx)(Ie, { "data-table-space": "" })]
						}, e.id))
					})]
				})
			}) : /* @__PURE__ */ (0, k.jsxs)(k.Fragment, { children: [/* @__PURE__ */ (0, k.jsx)(g, {
				isSelected: Dt.all,
				isIndeterminate: Dt.some,
				onChange: (e) => vt(Et, e),
				"aria-label": "全选本页来源",
				children: "全选本页"
			}), /* @__PURE__ */ (0, k.jsx)("div", {
				className: "flex flex-col gap-3",
				children: R.slice(X.start, X.end).map((e) => {
					let t = String(e[0].author_key || e[0].id);
					return /* @__PURE__ */ (0, k.jsx)(ct, {
						group: e,
						name: s(e, P),
						handlers: K,
						selected: _,
						open: !I.has(t),
						onOpen: (e) => {
							let n = new Set(I);
							e ? n.delete(t) : n.add(t), dt(n);
						},
						onToggleGroup: (t) => vt(e.map((e) => e.id), t),
						onToggle: _t
					}, t);
				})
			})] }),
			/* @__PURE__ */ (0, k.jsx)(fe, {
				label: "关注列表",
				total: X.total,
				pagination: {
					pageIndex: X.page - 1,
					pageSize: h
				},
				unit: J ? "个来源" : "位创作者",
				pageUnit: J ? "条" : "位",
				onChange: (e) => {
					e.pageSize === h ? Z.setPageIndex(e.pageIndex) : Z.setPageSize(e.pageSize);
				}
			}),
			F.new ? /* @__PURE__ */ (0, k.jsxs)("div", {
				className: "-mx-6 -mb-5 flex flex-wrap items-center gap-2 border-t border-separator-border rounded-b-2xl bg-card-footer px-6 py-4 max-sm:-mx-4 max-sm:px-4",
				children: [
					/* @__PURE__ */ (0, k.jsx)("span", {
						className: "mr-auto text-body-2-regular text-text-secondary",
						children: `未看 ${A(F.new)} · 已看 ${A(F.seen)} · 已保存 ${A(F.saved)} · 已忽略 ${A(F.ignored)}`
					}),
					/* @__PURE__ */ (0, k.jsx)(v, {
						variant: "secondary",
						size: "small",
						onClick: lt,
						children: "去看更新"
					}),
					/* @__PURE__ */ (0, k.jsx)(v, {
						variant: "secondary",
						size: "small",
						disabled: y,
						...T(W.isPending),
						onClick: () => void m({
							title: "标记已看",
							body: "将把当前未看作品标记为已看。",
							confirmLabel: "标记已看",
							onConfirm: () => W.mutateAsync("seen")
						}),
						children: "全部标记已看"
					}),
					/* @__PURE__ */ (0, k.jsx)(v, {
						variant: "secondary",
						size: "small",
						disabled: y,
						...T(W.isPending),
						onClick: () => void m({
							title: "标记已忽略",
							body: "将把当前未看作品标记为已忽略。",
							confirmLabel: "标记已忽略",
							onConfirm: () => W.mutateAsync("ignored")
						}),
						children: "全部忽略"
					})
				]
			}) : null
		]
	}) : /* @__PURE__ */ (0, k.jsx)(He, {
		icon: Pe,
		title: "还没有关注来源",
		actions: /* @__PURE__ */ (0, k.jsx)(v, {
			variant: "primary",
			size: "small",
			onClick: ut,
			children: "添加关注"
		}),
		children: "关注来源及其检查状态会显示在这里。"
	});
}
//#endregion
export { lt as t };

//# debugId=ff24749c-b6de-462c-a663-c18042059274