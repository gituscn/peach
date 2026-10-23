(function() {
	try {
		var e = typeof window < "u" ? window : typeof global < "u" ? global : typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : {}, t = new e.Error().stack;
		t && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[t] = "b7e207ec-1afe-4be9-aa47-743c89380398", e._sentryDebugIdIdentifier = "sentry-dbid-b7e207ec-1afe-4be9-aa47-743c89380398");
	} catch {}
})();
import { createPaginatedRowModel as e } from "./peach-app.createPaginatedRowModel-DKa1ysea.js";
import { createSortedRowModel as t, useTableSelection as n } from "./peach-app.use-table-selection-Bi_E2zbh.js";
import { $2ec61d1d4f780267$export$a8a3e93435678ff9 as r, $542a13ca2fa5b484$export$5b6b19405a83ff9d as i, $76d00c5a4edb230a$export$76ccd210b9029917 as a, $76d00c5a4edb230a$export$816b5d811295e6bc as o, $76d00c5a4edb230a$export$b59bdbef9ce70de2 as s, $76d00c5a4edb230a$export$f6f0c3fe4ec306ea as c, $76d00c5a4edb230a$export$f850895b287ef28e as l, $b4f18e3395fe64d7$export$3d96ec278d3efce4 as u, $b4f18e3395fe64d7$export$3e41faf802a29e71 as d, $b4f18e3395fe64d7$export$b2539bed5023c21c as f, $ea3928288112382f$export$439d29a4e110a164 as p, $f2ff30fde7b014be$export$3ddf2d174ce01153 as m, $l as h, Button as g, ButtonLink as _, Bx as v, Checkbox as y, ChevronSortDown as ee, Chip as b, DataTableFooter as te, DataTableFrame as x, DataTableSort as ne, EmptyFocusButton as S, EmptyState as C, ErrorText as re, ExternalLink as w, FEEDS_KEY as T, FOLLOW_CREDENTIALS_KEY as E, FOLLOW_MANAGE_KEY as D, FOLLOW_RESOLVE_KEY as O, FieldLabel as k, Help as A, Input as j, LoadingDots as M, M6 as N, MENU_ITEM as P, MENU_ITEM_INTERACTIVE as F, MENU_POPOVER_SURFACE as I, ModalFrame as L, Note as R, P7 as ie, SORT_DEFAULT_DIR as z, SelectionDock as ae, SiteLabel as B, Switch as oe, Table as se, TableColumnControls as ce, TableColumnResizer as le, TableSelectionHeader as ue, TaskProgress as V, Wt as de, Xf as fe, __toESM as pe, addAlias as me, addSource as he, avatarInner as H, busyProps as U, cardClass as W, checkFeeds as G, columnVisibilityFeature as ge, confirmModal as _e, createColumnHelper as ve, credentialDone as K, cx as ye, dZ as be, errorHeadline as q, errorMessage as J, feedIntervalText as xe, fetchCredentials as Se, fetchFeeds as Y, fetchFollow as Ce, fetchResolveJob as we, fetchSuggestions as Te, flexRender as Ee, followFeedByName as De, followSuggestKey as Oe, groupByAuthor as ke, isBroken as Ae, isLayout as je, keepSelected as Me, localTime as Ne, lookupFeedActor as Pe, mapLimit as Fe, pageSizeOf as Ie, pageWindow as Le, pv as Re, queryClient as ze, reloadFollowManage as Be, removeAlias as Ve, removeFeed as He, renameAliasGroup as Ue, require_jsx_runtime as We, require_react as Ge, resolveFollowSort as Ke, rowPaginationFeature as qe, rowSelectionFeature as Je, rowSortingFeature as Ye, setFeedEnabled as Xe, startCheck as Ze, startResolve as Qe, tableFeatures as $e, useAction as et, useBackgroundJob as tt, useMutation as nt, useQuery as rt, useTable as it, useTablePreferences as at } from "./peach-app.js";
import { Page as ot } from "./peach-app.page-Irl_Wogd.js";
import { STAT_STRIP_SIX as st } from "./peach-app.stat-card-Q_AB9v0S.js";
import { LEGACY_AVATAR_IMG as ct } from "./peach-app.legacy-avatar-CtPLcaNX.js";
import { PillAriaTabList as lt } from "./peach-app.pill-aria-tab-list-CJ47JigD.js";
import { AuthorAvatar as ut, SourceIcon as dt } from "./peach-app.source-view-Bk_L5GHG.js";
import { SourceList as ft } from "./peach-app.source-list-B2yIEqVl.js";
//#region src/react/follow-manage/add-source.tsx
var X = /* @__PURE__ */ pe(Ge(), 1), Z = We(), pt = ye(P, F, "text-body-2-medium"), mt = "粘贴来源链接，或输入创作者名、id…", ht = "查找中（首次按名字查要下载创作者索引，可能几十秒）", gt = "识别中", _t = "站内没有查到来源", vt = "/settings/subscriptions", yt = (e, t) => `${e}:${t.url}`;
function bt({ field: e, menu: t, options: n, active: r, busy: a, onPick: o, onClose: s }) {
	return (0, X.useEffect)(() => {
		t.current?.querySelector("[aria-current=\"true\"]")?.scrollIntoView({ block: "nearest" });
	}, [t, r]), /* @__PURE__ */ (0, Z.jsxs)(i, {
		ref: t,
		triggerRef: e,
		isOpen: !0,
		isNonModal: !0,
		shouldFlip: !1,
		onOpenChange: (e) => {
			e || s();
		},
		placement: "bottom start",
		offset: 4,
		"aria-label": "来源建议",
		className: ye(I, "flex w-(--trigger-width) flex-col gap-1 overscroll-contain"),
		children: [a && !n.length ? /* @__PURE__ */ (0, Z.jsx)("div", {
			className: "px-2 py-1.5",
			children: /* @__PURE__ */ (0, Z.jsx)(M, { label: "正在查找建议" })
		}) : null, n.map((e, t) => /* @__PURE__ */ (0, Z.jsxs)(X.Fragment, { children: [e.group === n[t - 1]?.group ? null : /* @__PURE__ */ (0, Z.jsx)("div", {
			className: "px-2 pt-1 text-caption-1-regular text-text-tertiary",
			children: e.group
		}), /* @__PURE__ */ (0, Z.jsxs)("button", {
			type: "button",
			"aria-current": t === r ? "true" : void 0,
			className: t === r ? ye(pt, "bg-background-secondary-default") : pt,
			onMouseDown: (e) => e.preventDefault(),
			onClick: () => o(e.value),
			children: [
				/* @__PURE__ */ (0, Z.jsx)("span", {
					className: "min-w-0 grow truncate text-left",
					children: e.value
				}),
				e.matched ? /* @__PURE__ */ (0, Z.jsx)("span", {
					className: "shrink-0 text-caption-1-regular text-text-tertiary",
					children: e.matched
				}) : null,
				e.n ? /* @__PURE__ */ (0, Z.jsx)("span", {
					className: "shrink-0 text-caption-1-regular tabular-nums text-text-tertiary",
					children: e.n.toLocaleString()
				}) : null
			]
		})] }, `${e.group}-${e.value}`))]
	});
}
function xt({ credentials: e, hidden: t, onHidden: n }) {
	let r = (0, X.useRef)(null), [a, o] = (0, X.useState)(!1), s = (e.providers || []).filter((e) => e.followable), c = s.filter((e) => !t.has(e.provider_label)).length, l = c === s.length ? "全部来源" : `${c}/${s.length} 个来源`, u = (e, r) => {
		let i = new Set(t);
		r ? i.delete(e) : i.add(e), n(i);
	};
	return /* @__PURE__ */ (0, Z.jsxs)(Z.Fragment, { children: [/* @__PURE__ */ (0, Z.jsx)(g, {
		ref: r,
		variant: "secondary",
		leadingIcon: h,
		"aria-haspopup": "dialog",
		"aria-expanded": a,
		"aria-label": l,
		onClick: () => o(!0),
		children: l
	}), /* @__PURE__ */ (0, Z.jsx)(i, {
		triggerRef: r,
		isOpen: a,
		onOpenChange: o,
		placement: "bottom end",
		offset: 4,
		className: I,
		children: /* @__PURE__ */ (0, Z.jsxs)(m, {
			"aria-label": "来源筛选",
			className: "flex w-64 flex-col gap-1 outline-none",
			children: [s.length ? /* @__PURE__ */ (0, Z.jsxs)("div", {
				className: "flex items-center gap-2 pb-1",
				children: [/* @__PURE__ */ (0, Z.jsx)(g, {
					variant: "ghost",
					size: "small",
					onClick: () => n(/* @__PURE__ */ new Set()),
					children: "全选"
				}), /* @__PURE__ */ (0, Z.jsx)(g, {
					variant: "ghost",
					size: "small",
					onClick: () => n(new Set(s.map((e) => e.provider_label))),
					children: "全不选"
				})]
			}) : /* @__PURE__ */ (0, Z.jsx)(A, { children: "暂无可用来源" }), s.map((e) => {
				let n = e.requirement === "required" && (!e.present || (e.missing || []).length > 0);
				return /* @__PURE__ */ (0, Z.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, Z.jsx)(y, {
						isSelected: !t.has(e.provider_label),
						onChange: (t) => u(e.provider_label, t),
						children: /* @__PURE__ */ (0, Z.jsxs)("span", {
							className: "flex min-w-0 items-center gap-1.5",
							children: [/* @__PURE__ */ (0, Z.jsx)(dt, { provider: e.provider }), e.provider_label]
						})
					}), n ? /* @__PURE__ */ (0, Z.jsx)(_, {
						variant: "ghost",
						size: "xs",
						className: "ml-auto",
						href: vt,
						onClick: () => o(!1),
						children: "打开凭据设置"
					}) : null]
				}, e.provider);
			})]
		})
	})] });
}
function St({ row: e, at: t, hidden: n, unpicked: r, onPick: i }) {
	if (e.kind === "error") return /* @__PURE__ */ (0, Z.jsx)(R, {
		tone: "error",
		title: e.line,
		children: e.error || "查找失败"
	});
	let a = (e.candidates || []).filter((e) => !n.has(e.provider_label || "")), o = Object.entries(e.failures || {});
	return /* @__PURE__ */ (0, Z.jsxs)("div", {
		className: W({
			variant: "outlined",
			padding: "none",
			className: "flex flex-col gap-2 p-4"
		}),
		children: [
			/* @__PURE__ */ (0, Z.jsx)("b", {
				className: "text-body-medium text-text-primary",
				children: e.line
			}),
			a.length ? a.map((e) => {
				let n = yt(t, e);
				return /* @__PURE__ */ (0, Z.jsx)(y, {
					isSelected: !e.known && !r.has(n),
					isDisabled: e.known,
					onChange: (e) => i(n, e),
					children: /* @__PURE__ */ (0, Z.jsxs)("span", {
						className: "flex min-w-0 flex-wrap items-center gap-1.5",
						children: [
							/* @__PURE__ */ (0, Z.jsx)(dt, { provider: e.provider }),
							/* @__PURE__ */ (0, Z.jsx)("b", {
								className: "text-body-medium",
								children: e.provider_label
							}),
							/* @__PURE__ */ (0, Z.jsx)("span", {
								className: "min-w-0 break-words",
								children: e.label
							}),
							/* @__PURE__ */ (0, Z.jsx)("small", {
								className: "text-caption-1-regular text-text-secondary",
								children: e.known ? "已经关注" : e.evidence
							})
						]
					})
				}, n);
			}) : /* @__PURE__ */ (0, Z.jsx)(A, { children: _t }),
			(e.external_searches || []).map((e) => /* @__PURE__ */ (0, Z.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [/* @__PURE__ */ (0, Z.jsx)("small", {
					className: "text-caption-1-regular text-text-secondary",
					children: e.evidence
				}), /* @__PURE__ */ (0, Z.jsx)(w, {
					href: e.url,
					children: `${e.label}：${e.query}`
				})]
			}, e.url)),
			o.length ? /* @__PURE__ */ (0, Z.jsx)(A, { children: o.map(([e, t]) => `${e}：${t}`).join("；") }) : null
		]
	});
}
function Ct({ data: e, credentials: t, readOnly: n, toast: r }) {
	let [i, a] = (0, X.useState)(""), [o, s] = (0, X.useState)(!1), [c, l] = (0, X.useState)(""), [u, d] = (0, X.useState)(""), [f, p] = (0, X.useState)(!1), [m, h] = (0, X.useState)(null), [_, v] = (0, X.useState)(-1), y = (0, X.useRef)(null), ee = (0, X.useRef)(null), [b, te] = (0, X.useState)(/* @__PURE__ */ new Set()), [x, ne] = (0, X.useState)(/* @__PURE__ */ new Set()), [S, C] = (0, X.useState)(""), [re, w] = (0, X.useState)(0);
	(0, X.useEffect)(() => {
		let e = i.trim();
		if (o || !e || e.includes("/")) {
			d("");
			return;
		}
		let t = setTimeout(() => d(e), 250);
		return () => clearTimeout(t);
	}, [i, o]);
	let T = rt({
		queryKey: Oe(u),
		queryFn: ({ signal: e }) => Te(u, e),
		enabled: u.length > 0 && f && !o && m !== i
	}), E = (0, X.useMemo)(() => (T.data?.groups || []).flatMap((e) => e.items.map((t) => ({
		value: t.value,
		matched: t.matched || "",
		n: t.n || 0,
		group: e.label
	}))), [T.data]), { job: D, running: A, outcome: M, start: N, dismiss: P } = tt({
		queryKey: O,
		queryFn: ({ signal: e }) => we(e),
		start: (e) => Qe([e]),
		onStarted: () => ne(/* @__PURE__ */ new Set()),
		onError: (e) => C(J(e)),
		onFinish: (e) => {
			e.status === "failed" && C(e.error || "查找失败");
		}
	}), F = (e) => {
		let t = e.trim();
		!t || n || o || A || N.isPending || (C(""), v(-1), l(t), a(t), d(""), h(t), N.mutate(t));
	}, I = T.isFetching, L = f && !o && m !== i && (E.length > 0 || I), ie = () => {
		v(-1), h(i);
	}, z = (e) => {
		if (!(o || e.nativeEvent.isComposing || e.nativeEvent.keyCode === 229)) {
			if (e.key === "Escape" && L) ie();
			else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
				if (!E.length) return;
				if (e.preventDefault(), !L) {
					h(null);
					return;
				}
				let t = e.key === "ArrowDown" ? 1 : -1;
				v((e) => {
					let n = e + t;
					return n < 0 ? E.length - 1 : n >= E.length ? 0 : n;
				});
			} else e.key === "Enter" && (e.preventDefault(), F(E[_]?.value || i));
		}
	}, ae = M?.results || [], B = ae.flatMap((e, t) => (e.candidates || []).filter((e) => !e.known && !b.has(e.provider_label || "")).map((e) => ({
		candidate: e,
		key: yt(t, e)
	})).filter((e) => !x.has(e.key))), oe = nt({
		mutationFn: async (e) => {
			let t = [], n = [];
			w(0);
			for (let r of e) {
				try {
					let e = await he(r.candidate);
					n.push(e.source);
				} catch (e) {
					t.push(`${r.candidate.label}：${J(e)}`);
				}
				w((e) => e + 1);
			}
			if (n.length) try {
				await Ze(n);
			} catch (e) {
				t.push(J(e));
			}
			return {
				failures: t,
				sources: n
			};
		},
		onSuccess: (e) => {
			Be(), e.failures.length ? C(e.failures.join("；")) : (C(""), P(), r(`已添加 ${e.sources.length} 个关注来源`));
		},
		onError: (e) => C(J(e))
	}), se = e.suggestions || [], ce = !c.includes("/");
	return /* @__PURE__ */ (0, Z.jsxs)("div", {
		className: W({
			padding: "none",
			className: "flex flex-col gap-4 px-6 py-5 max-sm:px-4"
		}),
		children: [
			/* @__PURE__ */ (0, Z.jsx)("h3", {
				className: "text-title-2-medium text-text-primary",
				children: "添加关注"
			}),
			/* @__PURE__ */ (0, Z.jsxs)("div", {
				className: "flex flex-wrap items-end gap-2",
				children: [
					/* @__PURE__ */ (0, Z.jsxs)("div", {
						ref: y,
						className: "min-w-64 grow",
						onFocus: () => p(!0),
						onBlur: (e) => {
							let t = e.relatedTarget;
							!e.currentTarget.contains(t) && !ee.current?.contains(t) && p(!1);
						},
						children: [/* @__PURE__ */ (0, Z.jsx)(j, {
							"aria-label": "来源链接、名字或 id",
							placeholder: mt,
							value: i,
							leadingIcon: Re,
							enterKeyHint: "search",
							isDisabled: n,
							onChange: a,
							onCompositionStart: () => {
								s(!0), v(-1);
							},
							onCompositionEnd: (e) => {
								s(!1), a(e.currentTarget.value);
							},
							onKeyDown: z
						}), L ? /* @__PURE__ */ (0, Z.jsx)(bt, {
							field: y,
							menu: ee,
							options: E,
							active: _,
							busy: I,
							onPick: F,
							onClose: ie
						}) : null]
					}),
					/* @__PURE__ */ (0, Z.jsx)(xt, {
						credentials: t,
						hidden: b,
						onHidden: te
					}),
					/* @__PURE__ */ (0, Z.jsx)(g, {
						variant: "primary",
						disabled: n || !i.trim(),
						...U(A || N.isPending),
						onClick: () => F(i),
						children: "查找"
					})
				]
			}),
			/* @__PURE__ */ (0, Z.jsxs)("div", {
				"aria-live": "polite",
				className: "flex flex-col gap-3 empty:hidden",
				children: [A || N.isPending ? /* @__PURE__ */ (0, Z.jsx)(V, {
					embedded: !0,
					label: D?.message || (D?.total ? `查找中：${D.checked || 0}/${D.total}` : ce ? ht : gt),
					value: D?.checked,
					total: D?.total
				}) : null, S ? /* @__PURE__ */ (0, Z.jsx)(R, {
					tone: "error",
					title: "这一次没有完成",
					children: S
				}) : null]
			}),
			ae.length ? /* @__PURE__ */ (0, Z.jsxs)("div", {
				className: "flex flex-col gap-3",
				children: [
					/* @__PURE__ */ (0, Z.jsx)(k, { children: "查找结果" }),
					ae.map((e, t) => /* @__PURE__ */ (0, Z.jsx)(St, {
						row: e,
						at: t,
						hidden: b,
						unpicked: x,
						onPick: (e, t) => {
							let n = new Set(x);
							t ? n.delete(e) : n.add(e), ne(n);
						}
					}, `${e.line}-${t}`)),
					/* @__PURE__ */ (0, Z.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [
							/* @__PURE__ */ (0, Z.jsx)(g, {
								variant: "secondary",
								size: "small",
								onClick: () => P(),
								children: "关闭"
							}),
							/* @__PURE__ */ (0, Z.jsx)(g, {
								variant: "primary",
								size: "small",
								disabled: n || !B.length,
								...U(oe.isPending),
								onClick: () => oe.mutate(B),
								children: `添加选中（${B.length}）`
							}),
							oe.isPending ? /* @__PURE__ */ (0, Z.jsx)("span", {
								role: "status",
								className: "text-body-2-regular text-text-secondary",
								children: `添加中… ${re}/${B.length}`
							}) : null
						]
					})
				]
			}) : null,
			se.length ? /* @__PURE__ */ (0, Z.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [/* @__PURE__ */ (0, Z.jsx)("span", {
					className: "text-body-2-regular text-text-secondary",
					children: "猜你喜欢"
				}), se.map((e) => /* @__PURE__ */ (0, Z.jsx)(g, {
					variant: "secondary",
					size: "small",
					disabled: n,
					title: `浏览历史里出现 ${e.visits} 次${e.origin ? ` · ${e.origin}` : ""}`,
					onClick: () => F(e.name),
					children: e.name
				}, e.name))]
			}) : null
		]
	});
}
//#endregion
//#region src/react/follow-manage/alias-rename-dialog.tsx
function wt({ group: e, close: t, receipt: n }) {
	return /* @__PURE__ */ (0, Z.jsx)(L, {
		isOpen: !!e,
		onOpenChange: (e) => {
			e || t();
		},
		width: "form",
		label: "修改统一名称",
		children: e ? /* @__PURE__ */ (0, Z.jsx)(Tt, {
			group: e,
			close: t,
			receipt: n
		}, e.canonical_key) : null
	});
}
function Tt({ group: e, close: t, receipt: n }) {
	let [i, a] = (0, X.useState)(e.canonical_name), o = et();
	return /* @__PURE__ */ (0, Z.jsxs)("form", {
		onSubmit: (r) => {
			r.preventDefault(), i.trim() && i.trim() !== e.canonical_name && o.run("rename", (t) => Ue(e.canonical_key, i.trim(), t), () => {
				Be(), n(`已把统一名称改为 ${i.trim()}`), t();
			});
		},
		className: "flex min-h-0 flex-col gap-4 p-5",
		children: [
			/* @__PURE__ */ (0, Z.jsx)(r, {
				slot: "title",
				className: "text-title-2-semibold text-text-primary",
				children: "修改统一名称"
			}),
			/* @__PURE__ */ (0, Z.jsxs)("p", {
				className: "text-body-2-regular wrap-anywhere text-text-secondary",
				children: ["当前名称：", e.canonical_name]
			}),
			/* @__PURE__ */ (0, Z.jsx)(j, {
				"aria-label": "统一名称",
				autoFocus: !0,
				value: i,
				onChange: a
			}),
			/* @__PURE__ */ (0, Z.jsxs)("div", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ (0, Z.jsx)(k, { children: "选择已有别名" }), /* @__PURE__ */ (0, Z.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: e.aliases.map((e) => /* @__PURE__ */ (0, Z.jsx)(g, {
						variant: "secondary",
						size: "small",
						onClick: () => a(e.name),
						children: e.name
					}, e.key))
				})]
			}),
			/* @__PURE__ */ (0, Z.jsx)("p", {
				className: "text-body-2-regular text-text-secondary",
				children: "原名称保留为别名，关联档案和作品署名会同步更新。"
			}),
			o.error ? /* @__PURE__ */ (0, Z.jsx)(R, {
				tone: "error",
				children: o.error
			}) : null,
			/* @__PURE__ */ (0, Z.jsxs)("div", {
				className: "flex flex-wrap justify-end gap-2",
				children: [/* @__PURE__ */ (0, Z.jsx)(g, {
					variant: "secondary",
					onClick: t,
					children: "取消"
				}), /* @__PURE__ */ (0, Z.jsx)(g, {
					type: "submit",
					variant: "primary",
					disabled: !i.trim() || i.trim() === e.canonical_name,
					...U(!!o.busy),
					children: "修改统一名称"
				})]
			})
		]
	});
}
//#endregion
//#region src/react/follow-manage/alias-manager.tsx
var Et = (e) => `将移除别名「${e}」，对应来源恢复为独立创作者组。`, Dt = $e({
	rowSelectionFeature: Je,
	rowSortingFeature: Ye,
	rowPaginationFeature: qe,
	columnVisibilityFeature: ge,
	sortedRowModel: t(),
	paginatedRowModel: e()
}), Ot = Dt, kt = {
	id: "select",
	label: "选择",
	width: 48,
	min: 48,
	max: 48,
	required: !0
}, At = {
	id: "canonical",
	label: "统一名称",
	width: 280,
	min: 240,
	required: !0,
	flex: !0
}, jt = [
	kt,
	At,
	{
		id: "alias",
		label: "平台别名",
		width: 240
	},
	{
		id: "evidence",
		label: "依据",
		width: 320
	},
	{
		id: "actions",
		label: "操作",
		width: 112
	}
], Mt = [
	kt,
	At,
	{
		id: "aliases",
		label: "平台别名",
		width: 400
	},
	{
		id: "actions",
		label: "操作",
		width: 184,
		min: 168
	}
], Nt = (e) => e.alias;
function Pt(e, t, n) {
	let r = n ? `name:${n}` : "", i = r && e.find((e) => e.author_key === r) || e.find((e) => e.author_name === t || e.entity_name === t);
	return i ? e.filter((e) => e.author_key === i.author_key) : [];
}
function Ft({ sources: e, name: t, canonicalKey: n }) {
	return /* @__PURE__ */ (0, Z.jsxs)("span", {
		className: "flex items-center gap-2",
		children: [/* @__PURE__ */ (0, Z.jsx)(ut, {
			group: Pt(e, t, n),
			name: t
		}), /* @__PURE__ */ (0, Z.jsx)("b", {
			className: "text-body-medium",
			children: t
		})]
	});
}
function It({ groups: e, suggestions: t, sources: r = [], readOnly: i, toast: u }) {
	let d = at("alias-suggestions", jt), f = at("alias-saved", Mt), [p, m] = (0, X.useState)(null), [h, _] = (0, X.useState)({}), [v, b] = (0, X.useState)({}), w = n(() => _({})), T = n(() => b({})), [E, D] = (0, X.useState)([]), [O, A] = (0, X.useState)([]), [M, N] = (0, X.useState)({
		pageIndex: 0,
		pageSize: 20
	}), [P, F] = (0, X.useState)({
		pageIndex: 0,
		pageSize: 20
	}), I = {
		...M,
		pageIndex: Math.min(M.pageIndex, Math.max(0, Math.ceil(t.length / M.pageSize) - 1))
	}, L = {
		...P,
		pageIndex: Math.min(P.pageIndex, Math.max(0, Math.ceil(e.length / P.pageSize) - 1))
	}, [R, z] = (0, X.useState)(""), [B, oe] = (0, X.useState)(""), [V, de] = (0, X.useState)(""), pe = nt({
		mutationFn: async (e) => {
			let t = 0;
			for (let n of e) {
				try {
					await me(n.canonical, n.alias);
				} catch (n) {
					throw t && Be(), Error(`${J(n)}（还有 ${e.length - t} 组没有合并）`);
				}
				t += 1;
			}
			return {
				done: t,
				items: e
			};
		},
		onSuccess: (e) => {
			z(""), _({}), Be(), u(`已合并 ${e.done} 组创作者别名`);
		},
		onError: (e) => z(J(e))
	}), he = nt({
		mutationFn: (e) => me(e.canonical, e.alias),
		onSuccess: () => {
			z(""), oe(""), de(""), Be(), u("已保存创作者别名");
		},
		onError: (e) => z(J(e))
	}), H = nt({
		mutationFn: async (e) => {
			let t = typeof e == "string" ? [e] : e, n = 0;
			try {
				for (let e of t) await Ve(e), n += 1;
			} catch (e) {
				throw Error(`${J(e)}（已移除 ${n} 个别名，还有 ${t.length - n} 个未移除）`);
			} finally {
				Be();
			}
		},
		onSuccess: () => {
			z(""), b({}), u("已移除创作者别名");
		},
		onError: (e) => z(J(e))
	}), G = (e, t) => {
		e.length && _e({
			title: t ? "合并全部创作者别名" : "合并所选创作者别名",
			body: `将合并以下 ${e.length} 组创作者：${e.map((e) => `「${e.alias}」归入「${e.canonical}」`).join("；")}。`,
			confirmLabel: t ? "合并全部别名" : "合并所选别名",
			onConfirm: () => pe.mutateAsync(e)
		});
	}, ge = (e) => void _e({
		title: "移除创作者别名",
		body: Et(e),
		confirmLabel: "移除创作者别名",
		onConfirm: () => H.mutateAsync(e)
	}), K = (0, X.useRef)({
		sources: r,
		readOnly: i,
		merging: pe.isPending,
		removing: H.isPending,
		merge: G,
		remove: ge,
		rename: m
	});
	K.current = {
		sources: r,
		readOnly: i,
		merging: pe.isPending,
		removing: H.isPending,
		merge: G,
		remove: ge,
		rename: m
	};
	let ye = (0, X.useMemo)(() => {
		let e = ve();
		return e.columns([
			e.display({
				id: "select",
				header: (e) => /* @__PURE__ */ (0, Z.jsx)(ue, {
					table: e.table,
					label: "全选待合并别名"
				}),
				cell: (e) => /* @__PURE__ */ (0, Z.jsx)(y, {
					slot: null,
					isSelected: e.row.getIsSelected(),
					"aria-label": `选择别名 ${e.row.original.alias}，归入 ${e.row.original.canonical}`,
					onChange: (t) => e.row.toggleSelected(t)
				})
			}),
			e.accessor("canonical", {
				header: "统一名称",
				cell: (e) => /* @__PURE__ */ (0, Z.jsx)(Ft, {
					sources: K.current.sources,
					name: e.getValue()
				})
			}),
			e.accessor("alias", {
				header: "平台别名",
				cell: (e) => e.getValue()
			}),
			e.accessor("evidence", {
				header: "依据",
				cell: (e) => /* @__PURE__ */ (0, Z.jsx)("span", {
					className: "text-body-2-regular text-text-secondary",
					children: e.getValue()
				})
			}),
			e.display({
				id: "actions",
				header: "操作",
				cell: (e) => /* @__PURE__ */ (0, Z.jsx)(g, {
					variant: "secondary",
					size: "small",
					disabled: K.current.readOnly,
					...U(K.current.merging),
					onClick: () => K.current.merge([e.row.original], !1),
					children: "合并"
				})
			})
		]);
	}, []), be = (0, X.useMemo)(() => {
		let e = ve();
		return e.columns([
			e.display({
				id: "select",
				header: ({ table: e }) => /* @__PURE__ */ (0, Z.jsx)(ue, {
					table: e,
					label: "全选已保存别名"
				}),
				cell: ({ row: e }) => /* @__PURE__ */ (0, Z.jsx)(y, {
					slot: null,
					"aria-label": `选择已保存别名 ${e.original.canonical_name}`,
					isSelected: e.getIsSelected(),
					onChange: (t) => e.toggleSelected(t)
				})
			}),
			e.accessor("canonical_name", {
				id: "canonical",
				header: "统一名称",
				cell: (e) => /* @__PURE__ */ (0, Z.jsx)(Ft, {
					sources: K.current.sources,
					name: e.getValue(),
					canonicalKey: e.row.original.canonical_key
				})
			}),
			e.accessor("aliases", {
				header: "平台别名",
				sortFn: (e, t) => e.original.aliases.map((e) => e.name).join(" ").localeCompare(t.original.aliases.map((e) => e.name).join(" "), "zh-CN"),
				cell: (e) => /* @__PURE__ */ (0, Z.jsx)("span", {
					className: "flex flex-wrap items-center gap-1.5",
					children: e.getValue().map((e) => /* @__PURE__ */ (0, Z.jsxs)("span", {
						className: "inline-flex items-center gap-1 rounded-md bg-background-secondary-default px-1.5 py-1 text-caption-1-medium text-text-secondary",
						children: [e.name, /* @__PURE__ */ (0, Z.jsx)(g, {
							variant: "ghost",
							size: "xs",
							iconOnly: !0,
							leadingIcon: ie,
							"aria-label": `移除别名 ${e.name}`,
							disabled: K.current.readOnly,
							...U(K.current.removing),
							onClick: () => K.current.remove(e.name)
						})]
					}, e.key))
				})
			}),
			e.display({
				id: "actions",
				header: "操作",
				cell: ({ row: e }) => /* @__PURE__ */ (0, Z.jsx)(g, {
					variant: "secondary",
					size: "small",
					disabled: K.current.readOnly,
					"aria-label": `修改 ${e.original.canonical_name} 的统一名称`,
					onClick: () => K.current.rename(e.original),
					children: "修改统一名称"
				})
			})
		]);
	}, []), q = it({
		features: Dt,
		data: t,
		columns: ye,
		getRowId: Nt,
		state: {
			rowSelection: h,
			sorting: E,
			pagination: I,
			columnVisibility: d.visibility
		},
		onColumnVisibilityChange: d.change,
		onRowSelectionChange: (e) => {
			w(), _(e);
		},
		onSortingChange: (e) => {
			D(e), N((e) => ({
				...e,
				pageIndex: 0
			}));
		},
		onPaginationChange: N,
		enableRowSelection: !0
	}), xe = it({
		features: Ot,
		data: e,
		columns: be,
		getRowId: (e) => e.canonical_key,
		state: {
			rowSelection: v,
			sorting: O,
			pagination: L,
			columnVisibility: f.visibility
		},
		onColumnVisibilityChange: f.change,
		onRowSelectionChange: (e) => {
			T(), b(e);
		},
		enableRowSelection: !0,
		onSortingChange: (e) => {
			A(e), F((e) => ({
				...e,
				pageIndex: 0
			}));
		},
		onPaginationChange: F
	}), Se = q.getSelectedRowModel().rows.map((e) => e.original), Y = xe.getSelectedRowModel().rows.flatMap((e) => e.original.aliases.map((e) => e.name)), Ce = U(pe.isPending);
	return /* @__PURE__ */ (0, Z.jsxs)("div", {
		className: W({
			padding: "none",
			className: "flex flex-col gap-4 px-6 py-5 max-sm:px-4"
		}),
		children: [
			/* @__PURE__ */ (0, Z.jsx)("h3", {
				className: "text-title-2-medium text-text-primary",
				children: "创作者别名"
			}),
			/* @__PURE__ */ (0, Z.jsxs)("div", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ (0, Z.jsx)(k, { children: "手动添加别名" }), /* @__PURE__ */ (0, Z.jsxs)("div", {
					className: "flex flex-wrap items-end gap-2",
					children: [
						/* @__PURE__ */ (0, Z.jsx)(j, {
							"aria-label": "统一名称",
							placeholder: "在 Peach 中统一显示的名称",
							value: B,
							onChange: oe,
							isDisabled: i,
							className: "w-56"
						}),
						/* @__PURE__ */ (0, Z.jsx)(j, {
							"aria-label": "平台别名",
							placeholder: "平台别名",
							value: V,
							onChange: de,
							isDisabled: i,
							className: "w-56"
						}),
						/* @__PURE__ */ (0, Z.jsx)(g, {
							variant: "primary",
							disabled: i || !B.trim() || !V.trim(),
							...U(he.isPending),
							onClick: () => he.mutate({
								canonical: B.trim(),
								alias: V.trim()
							}),
							children: "保存别名"
						})
					]
				})]
			}),
			R ? /* @__PURE__ */ (0, Z.jsx)(re, { children: R }) : null,
			t.length ? /* @__PURE__ */ (0, Z.jsxs)("div", {
				className: "flex flex-col gap-2",
				children: [
					/* @__PURE__ */ (0, Z.jsxs)("div", {
						"data-responsive-toolbar": "",
						children: [/* @__PURE__ */ (0, Z.jsxs)("div", {
							"data-toolbar-heading": "",
							children: [/* @__PURE__ */ (0, Z.jsx)(k, { children: "待合并" }), /* @__PURE__ */ (0, Z.jsx)("span", {
								className: "text-body-2-regular text-text-secondary",
								children: `${t.length} 组`
							})]
						}), /* @__PURE__ */ (0, Z.jsxs)("div", {
							"data-toolbar-actions": "",
							children: [
								/* @__PURE__ */ (0, Z.jsx)(g, {
									variant: "primary",
									size: "small",
									disabled: i,
									...Ce,
									onClick: () => G(t, !0),
									children: `全部合并（${t.length}）`
								}),
								/* @__PURE__ */ (0, Z.jsx)(ne, {
									label: "待合并创作者别名",
									sorting: E,
									options: [
										{
											id: "canonical",
											label: "统一名称"
										},
										{
											id: "alias",
											label: "平台别名"
										},
										{
											id: "evidence",
											label: "依据"
										}
									],
									onChange: (e) => {
										D(e), N((e) => ({
											...e,
											pageIndex: 0
										}));
									}
								}),
								/* @__PURE__ */ (0, Z.jsx)(ce, {
									preferences: d,
									label: "待合并创作者别名"
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, Z.jsxs)(ae, {
						label: "待合并别名批量操作",
						visible: Se.length > 0,
						count: `已选 ${Se.length} 组`,
						children: [/* @__PURE__ */ (0, Z.jsx)(g, {
							variant: "secondary",
							size: "small",
							disabled: i,
							...Ce,
							onClick: () => G(Se, !1),
							children: `合并所选（${Se.length}）`
						}), /* @__PURE__ */ (0, Z.jsx)(g, {
							variant: "ghost",
							size: "small",
							onClick: () => _({}),
							children: "取消选择"
						})]
					}),
					/* @__PURE__ */ (0, Z.jsx)(x, {
						follow: !0,
						preferences: d,
						onRowClick: (e) => q.getRow(e)?.toggleSelected(),
						children: /* @__PURE__ */ (0, Z.jsxs)(se, {
							"aria-label": "待合并创作者别名",
							size: "sm",
							sortDescriptor: E[0] ? {
								column: E[0].id,
								direction: E[0].desc ? "descending" : "ascending"
							} : void 0,
							onSortChange: (e) => q.getColumn(String(e.column))?.toggleSorting(e.direction === "descending"),
							children: [/* @__PURE__ */ (0, Z.jsxs)(l, { children: [q.getHeaderGroups()[0].headers.map((e) => /* @__PURE__ */ (0, Z.jsx)(o, {
								id: e.id,
								isRowHeader: e.column.id === "canonical",
								allowsSorting: e.column.getCanSort(),
								...d.columnProps(e.id),
								children: ({ sortDirection: t }) => /* @__PURE__ */ (0, Z.jsxs)(Z.Fragment, { children: [/* @__PURE__ */ (0, Z.jsxs)("span", {
									className: "flex items-center gap-0.5",
									children: [Ee(e.column.columnDef.header, e.getContext()), e.column.getCanSort() ? /* @__PURE__ */ (0, Z.jsx)("span", {
										"data-sort-indicator": !0,
										"data-direction": t || void 0,
										children: /* @__PURE__ */ (0, Z.jsx)(ee, {})
									}) : null]
								}), /* @__PURE__ */ (0, Z.jsx)(le, {
									preferences: d,
									id: e.id
								})] })
							}, e.id)), /* @__PURE__ */ (0, Z.jsx)(o, {
								id: "remaining-space",
								"aria-label": "行空白区域",
								"data-table-space": "",
								width: d.spaceWidth,
								minWidth: 0
							})] }), /* @__PURE__ */ (0, Z.jsx)(a, { children: q.getRowModel().rows.map((e) => /* @__PURE__ */ (0, Z.jsxs)(s, {
								id: e.id,
								"data-board-selected": e.getIsSelected() || void 0,
								children: [e.getVisibleCells().map((e) => /* @__PURE__ */ (0, Z.jsx)(c, { children: Ee(e.column.columnDef.cell, e.getContext()) }, e.id)), /* @__PURE__ */ (0, Z.jsx)(c, { "data-table-space": "" })]
							}, e.id)) })]
						})
					}),
					/* @__PURE__ */ (0, Z.jsx)(te, {
						label: "待合并创作者别名",
						unit: "组",
						total: t.length,
						pagination: I,
						onChange: N
					})
				]
			}) : null,
			/* @__PURE__ */ (0, Z.jsxs)("div", {
				className: "flex flex-col gap-2",
				children: [
					/* @__PURE__ */ (0, Z.jsxs)("div", {
						"data-responsive-toolbar": "",
						children: [/* @__PURE__ */ (0, Z.jsxs)("div", {
							"data-toolbar-heading": "",
							children: [/* @__PURE__ */ (0, Z.jsx)(k, { children: "已保存别名" }), /* @__PURE__ */ (0, Z.jsx)("span", {
								className: "text-body-2-regular text-text-secondary",
								children: `${e.length} 组`
							})]
						}), /* @__PURE__ */ (0, Z.jsxs)("div", {
							"data-toolbar-actions": "",
							children: [/* @__PURE__ */ (0, Z.jsx)(ne, {
								label: "已保存创作者别名",
								sorting: O,
								options: [{
									id: "canonical",
									label: "统一名称"
								}, {
									id: "aliases",
									label: "平台别名"
								}],
								onChange: (e) => {
									A(e), F((e) => ({
										...e,
										pageIndex: 0
									}));
								}
							}), /* @__PURE__ */ (0, Z.jsx)(ce, {
								preferences: f,
								label: "已保存创作者别名"
							})]
						})]
					}),
					/* @__PURE__ */ (0, Z.jsxs)(ae, {
						label: "已保存别名批量操作",
						visible: Y.length > 0,
						count: `已选 ${Y.length} 个别名`,
						children: [/* @__PURE__ */ (0, Z.jsx)(g, {
							variant: "secondary",
							size: "small",
							disabled: i,
							...U(H.isPending),
							onClick: () => void _e({
								title: "移除所选创作者别名",
								body: `将移除以下 ${Y.length} 个别名，对应来源恢复为独立创作者组。`,
								items: Y,
								confirmLabel: "移除所选别名",
								onConfirm: () => H.mutateAsync(Y)
							}),
							children: `移除所选别名（${Y.length}）`
						}), /* @__PURE__ */ (0, Z.jsx)(g, {
							variant: "ghost",
							size: "small",
							onClick: () => b({}),
							children: "取消选择"
						})]
					}),
					e.length ? /* @__PURE__ */ (0, Z.jsxs)(Z.Fragment, { children: [/* @__PURE__ */ (0, Z.jsx)(x, {
						follow: !0,
						preferences: f,
						onRowClick: (e) => xe.getRow(e)?.toggleSelected(),
						children: /* @__PURE__ */ (0, Z.jsxs)(se, {
							"aria-label": "已保存创作者别名",
							size: "sm",
							sortDescriptor: O[0] ? {
								column: O[0].id,
								direction: O[0].desc ? "descending" : "ascending"
							} : void 0,
							onSortChange: (e) => xe.getColumn(String(e.column))?.toggleSorting(e.direction === "descending"),
							children: [/* @__PURE__ */ (0, Z.jsxs)(l, { children: [xe.getHeaderGroups()[0].headers.map((e) => /* @__PURE__ */ (0, Z.jsx)(o, {
								id: e.id,
								isRowHeader: e.column.id === "canonical",
								allowsSorting: e.column.getCanSort(),
								...f.columnProps(e.id),
								children: ({ sortDirection: t }) => /* @__PURE__ */ (0, Z.jsxs)(Z.Fragment, { children: [/* @__PURE__ */ (0, Z.jsxs)("span", {
									className: "flex items-center gap-0.5",
									children: [Ee(e.column.columnDef.header, e.getContext()), e.column.getCanSort() ? /* @__PURE__ */ (0, Z.jsx)("span", {
										"data-sort-indicator": !0,
										"data-direction": t || void 0,
										children: /* @__PURE__ */ (0, Z.jsx)(ee, {})
									}) : null]
								}), /* @__PURE__ */ (0, Z.jsx)(le, {
									preferences: f,
									id: e.id
								})] })
							}, e.id)), /* @__PURE__ */ (0, Z.jsx)(o, {
								id: "remaining-space",
								"aria-label": "行空白区域",
								"data-table-space": "",
								width: f.spaceWidth,
								minWidth: 0
							})] }), /* @__PURE__ */ (0, Z.jsx)(a, { children: xe.getRowModel().rows.map((e) => /* @__PURE__ */ (0, Z.jsxs)(s, {
								id: e.id,
								"data-board-selected": e.getIsSelected() || void 0,
								children: [e.getVisibleCells().map((e) => /* @__PURE__ */ (0, Z.jsx)(c, { children: Ee(e.column.columnDef.cell, e.getContext()) }, e.id)), /* @__PURE__ */ (0, Z.jsx)(c, { "data-table-space": "" })]
							}, e.id)) })]
						})
					}), /* @__PURE__ */ (0, Z.jsx)(te, {
						label: "已保存创作者别名",
						unit: "组",
						total: e.length,
						pagination: L,
						onChange: F
					})] }) : /* @__PURE__ */ (0, Z.jsx)(C, {
						size: "compact",
						icon: fe,
						title: "还没有保存创作者别名",
						actions: i ? void 0 : /* @__PURE__ */ (0, Z.jsx)(S, {
							target: "input[aria-label=\"统一名称\"]",
							children: "添加别名"
						}),
						children: "填写统一名称，以及该创作者在其他平台使用的名字。"
					})
				]
			}),
			/* @__PURE__ */ (0, Z.jsx)(wt, {
				group: p,
				close: () => m(null),
				receipt: u
			})
		]
	});
}
//#endregion
//#region src/react/follow-manage/add-feed.tsx
var Lt = "输入女优名，到 JavDB 找她的演员页";
function Rt(e, t) {
	let n = /* @__PURE__ */ new Map();
	for (let r of e.candidates) t.has(r.id) && r.held_by && n.set(r.held_by.id, r.held_by.name);
	if (n.size > 1) return {
		text: `所勾的卡分属数据库里不同的人：${[...n.values()].join("、")}，先去合并再订`,
		blocked: !0
	};
	let [r] = n.values();
	return r ? {
		text: `会登记到「${r}」名下`,
		blocked: !1
	} : e.known ? {
		text: `会登记到数据库里的「${e.known.name}」名下`,
		blocked: !1
	} : {
		text: `数据库里还没有「${e.q}」，会新建一位`,
		blocked: !1
	};
}
function zt({ card: e, picked: t, onPick: n }) {
	return /* @__PURE__ */ (0, Z.jsxs)("div", {
		className: "flex flex-wrap items-center gap-2",
		children: [/* @__PURE__ */ (0, Z.jsx)(y, {
			isSelected: t,
			onChange: n,
			children: /* @__PURE__ */ (0, Z.jsxs)("span", {
				className: "flex min-w-0 flex-wrap items-center gap-1.5",
				children: [
					/* @__PURE__ */ (0, Z.jsx)("span", {
						className: "min-w-0 break-words",
						children: e.names.join("、")
					}),
					e.record ? /* @__PURE__ */ (0, Z.jsx)(b, {
						variant: "caption",
						color: "neutral",
						children: e.record
					}) : null,
					e.held_by ? /* @__PURE__ */ (0, Z.jsx)("small", {
						className: "text-caption-1-regular text-text-secondary",
						children: `已在「${e.held_by.name}」名下`
					}) : null
				]
			})
		}), /* @__PURE__ */ (0, Z.jsx)(w, {
			href: e.url,
			children: e.id
		})]
	});
}
function Bt({ readOnly: e, toast: t, onAdded: n }) {
	let [r, i] = (0, X.useState)(""), [a, o] = (0, X.useState)(null), [s, c] = (0, X.useState)(/* @__PURE__ */ new Set()), l = et(), u = () => {
		let t = r.trim();
		t && !e && l.run("lookup", (e) => Pe(t, e), (e) => {
			o(e), c(new Set(e.suggested));
		});
	}, d = (e) => {
		e.key === "Enter" && !e.nativeEvent.isComposing && (e.preventDefault(), u());
	}, f = () => {
		o(null), c(/* @__PURE__ */ new Set()), l.setError("");
	}, p = () => {
		a && l.run("follow", (e) => De(a.q, [...s], e), (e) => {
			t(e.created ? `已新建「${e.entity_name}」并订阅她的新作` : `已订阅「${e.entity_name}」的新作`), i(""), f(), n();
		});
	}, m = a ? Rt(a, s) : null;
	return /* @__PURE__ */ (0, Z.jsxs)("div", {
		className: W({
			padding: "none",
			className: "flex flex-col gap-4 px-6 py-5 max-sm:px-4"
		}),
		children: [
			/* @__PURE__ */ (0, Z.jsx)("h3", {
				className: "text-title-2-medium text-text-primary",
				children: "添加 JAV 订阅"
			}),
			/* @__PURE__ */ (0, Z.jsxs)("div", {
				className: "flex flex-wrap items-end gap-2",
				children: [/* @__PURE__ */ (0, Z.jsx)("div", {
					className: "min-w-64 grow",
					children: /* @__PURE__ */ (0, Z.jsx)(j, {
						"aria-label": "女优名",
						placeholder: Lt,
						value: r,
						leadingIcon: Re,
						enterKeyHint: "search",
						isDisabled: e,
						onChange: i,
						onKeyDown: d
					})
				}), /* @__PURE__ */ (0, Z.jsx)(g, {
					variant: "primary",
					disabled: e || !r.trim(),
					...U(l.busy === "lookup"),
					onClick: u,
					children: "查找"
				})]
			}),
			l.error ? /* @__PURE__ */ (0, Z.jsx)(R, {
				tone: "error",
				title: "这一次没有完成",
				children: l.error
			}) : null,
			a ? /* @__PURE__ */ (0, Z.jsxs)("div", {
				className: "flex flex-col gap-3",
				children: [
					/* @__PURE__ */ (0, Z.jsx)(k, { children: "JavDB 上的演员卡" }),
					a.candidates.length ? a.candidates.map((e) => /* @__PURE__ */ (0, Z.jsx)(zt, {
						card: e,
						picked: s.has(e.id),
						onPick: (t) => c((n) => {
							let r = new Set(n);
							return t ? r.add(e.id) : r.delete(e.id), r;
						})
					}, e.id)) : /* @__PURE__ */ (0, Z.jsx)(A, { children: "JavDB 上没有搜到这个名字。" }),
					a.candidates.length ? /* @__PURE__ */ (0, Z.jsx)(A, {
						role: "status",
						children: s.size ? m.text : "勾选她的演员卡；有碼与無碼两条记录都是她的话，两张都勾。"
					}) : null,
					/* @__PURE__ */ (0, Z.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [/* @__PURE__ */ (0, Z.jsx)(g, {
							variant: "secondary",
							size: "small",
							onClick: f,
							children: "关闭"
						}), a.candidates.length ? /* @__PURE__ */ (0, Z.jsx)(g, {
							variant: "primary",
							size: "small",
							disabled: e || !s.size || m.blocked,
							...U(l.busy === "follow"),
							onClick: p,
							children: `添加订阅（${s.size}）`
						}) : null]
					})
				]
			}) : null
		]
	});
}
//#endregion
//#region src/react/follow-manage/feed-sources.tsx
var Vt = $e({
	rowPaginationFeature: qe,
	rowSelectionFeature: Je,
	rowSortingFeature: Ye,
	columnVisibilityFeature: ge,
	sortedRowModel: t(),
	paginatedRowModel: e()
}), Ht = {
	select: "选择",
	name: "名称",
	kind: "类型",
	origin: "来源",
	status: "状态",
	interval: "频率",
	fetched: "上次拉取",
	fresh: "上次新增",
	actions: "操作"
}, Ut = /* @__PURE__ */ new Set(["actions"]), Wt = Object.entries(Ht).map(([e, t]) => ({
	id: e,
	label: t,
	width: e === "select" ? 48 : e === "name" ? 300 : e === "actions" ? 208 : e === "fetched" ? 200 : 160,
	min: e === "select" ? 48 : e === "actions" ? 200 : e === "name" ? 300 : 112,
	max: e === "select" ? 48 : e === "name" ? 2e3 : 800,
	flex: e === "name",
	required: e === "select" || e === "name"
})), Gt = () => ze.invalidateQueries({
	queryKey: T,
	exact: !0
}), Q = (e) => e.name || e.url;
function Kt(e) {
	try {
		return new URL(e).hostname.replace(/^www\./, "");
	} catch {
		return e;
	}
}
function qt({ source: e }) {
	return e.enabled ? e.last_error ? /* @__PURE__ */ (0, Z.jsx)(b, {
		variant: "caption",
		color: "rose",
		children: "拉取失败"
	}) : e.last_fetched_at ? /* @__PURE__ */ (0, Z.jsx)(b, {
		variant: "caption",
		color: "lime",
		children: "正常"
	}) : /* @__PURE__ */ (0, Z.jsx)(b, {
		variant: "caption",
		color: "gray",
		children: "未检查"
	}) : /* @__PURE__ */ (0, Z.jsx)(b, {
		variant: "caption",
		color: "gray",
		children: "已暂停"
	});
}
function Jt({ source: e }) {
	let t = e.entity_id ? {
		id: e.entity_id,
		has_image: !!e.has_image,
		image_version: e.image_version,
		avatar_focus: e.avatar_focus
	} : null;
	return /* @__PURE__ */ (0, Z.jsx)("span", {
		"aria-hidden": !0,
		className: `relative inline-grid size-8 shrink-0 place-items-center overflow-hidden rounded-full bg-background-tertiary-default text-caption-1-semibold text-text-secondary ${ct}`,
		dangerouslySetInnerHTML: { __html: H(Q(e), t, null, "performer") }
	});
}
var Yt = (e, t) => e.entity_id !== null && t.has(e.entity_id) && e.page_name && e.page_name !== e.name ? e.page_name : "";
function Xt(e) {
	let t = /* @__PURE__ */ new Set(), n = /* @__PURE__ */ new Set();
	for (let { entity_id: r } of e) r !== null && (t.has(r) ? n.add(r) : t.add(r));
	return n;
}
function Zt(e, t) {
	let n = e.length === 1 ? e[0] : null;
	return _e({
		title: n ? "移除订阅源" : `移除 ${e.length} 条订阅源`,
		body: n ? `将移除订阅源「${Q(n)}」，之后不再拉取它的新作；已经拉到的新作保留。` : "将移除所选订阅源，之后不再拉取它们的新作；已经拉到的新作保留。",
		confirmLabel: n ? "移除订阅源" : "移除所选订阅源",
		danger: !0,
		onConfirm: t
	});
}
function Qt({ readOnly: e, toast: t }) {
	let n = rt({
		queryKey: T,
		queryFn: ({ signal: e }) => Y(e)
	}), r = et(), i = at("jav-feeds", Wt), u = n.data, d = (0, X.useMemo)(() => u?.sources ?? [], [u]), [f, m] = (0, X.useState)(/* @__PURE__ */ new Set()), [h, _] = (0, X.useState)(1), [b, w] = (0, X.useState)(20), [E, D] = (0, X.useState)([]), O = Le(d.length, b, h);
	(0, X.useEffect)(() => {
		_((e) => Math.min(e, O.pages));
	}, [O.pages]), (0, X.useEffect)(() => {
		m((e) => {
			let t = new Set(d.map((e) => e.id)), n = new Set([...e].filter((e) => t.has(e)));
			return n.size === e.size ? e : n;
		});
	}, [d]);
	let k = nt({
		mutationFn: async (e) => {
			let t = await Fe(e.ids, 4, async (t) => {
				e.action === "remove" ? await He(t) : await Xe(t, e.action === "enabled");
			});
			return {
				...e,
				results: t
			};
		},
		onSuccess: (e) => {
			let n = e.results.filter((e) => !e.ok), i = e.ids.length - n.length;
			if (m(/* @__PURE__ */ new Set()), Gt(), e.action === "remove" && i && t(`已移除 ${i} 条订阅源`), n.length) {
				let e = n[0];
				r.setError(`${n.length} 条没有写入：${e.ok ? "" : J(e.error)}`);
			}
		},
		onError: (e) => r.setError(J(e))
	}), j = (0, X.useMemo)(() => Xt(d), [d]), M = (0, X.useRef)({
		readOnly: e,
		shared: j,
		busy: null,
		toggle: () => {},
		fetch: () => {},
		remove: () => {}
	});
	M.current = {
		readOnly: e,
		shared: j,
		busy: r.busy,
		toggle: (e, t) => void r.run(`enabled-${e.id}`, (n) => Xe(e.id, t, n), () => void Gt()),
		fetch: (e) => void r.run(`check-${e.id}`, (t) => G(t, [e.id]), () => void Gt()),
		remove: (e) => void Zt([e], async () => {
			await He(e.id), t(`已移除订阅源「${Q(e)}」`), Gt();
		})
	};
	let P = (0, X.useMemo)(() => {
		let e = ve(), t = (e) => () => Ht[e] || e;
		return e.columns([
			e.display({
				id: "select",
				header: (e) => /* @__PURE__ */ (0, Z.jsx)(ue, {
					table: e.table,
					label: "全选本页订阅源",
					page: !0
				}),
				cell: (e) => /* @__PURE__ */ (0, Z.jsx)(y, {
					slot: null,
					isSelected: e.row.getIsSelected(),
					onChange: (t) => e.row.toggleSelected(t),
					"aria-label": `选择 ${Q(e.row.original)}`
				})
			}),
			e.accessor(Q, {
				id: "name",
				header: t("name"),
				cell: (e) => {
					let t = Yt(e.row.original, M.current.shared);
					return /* @__PURE__ */ (0, Z.jsxs)("span", {
						className: "flex items-center gap-2 whitespace-nowrap text-body-medium text-text-primary",
						children: [
							/* @__PURE__ */ (0, Z.jsx)(Jt, { source: e.row.original }),
							e.getValue(),
							t ? /* @__PURE__ */ (0, Z.jsx)("span", {
								className: "text-body-2-regular text-text-secondary",
								title: `站上这一页挂在「${t}」名下`,
								children: t
							}) : null
						]
					});
				}
			}),
			e.accessor((e) => e.kind_label, {
				id: "kind",
				header: t("kind"),
				cell: (e) => /* @__PURE__ */ (0, Z.jsx)("span", {
					className: "whitespace-nowrap",
					children: e.getValue()
				})
			}),
			e.accessor((e) => e.url, {
				id: "origin",
				header: t("origin"),
				cell: (e) => /* @__PURE__ */ (0, Z.jsxs)("a", {
					href: e.getValue(),
					target: "_blank",
					rel: "noopener noreferrer",
					title: "打开来源页面",
					className: "text-text-primary underline-offset-2 hover:underline",
					children: [/* @__PURE__ */ (0, Z.jsx)(B, {
						site: e.row.original.kind.startsWith("javdb") ? "javdb" : Kt(e.getValue()),
						label: Kt(e.getValue())
					}), /* @__PURE__ */ (0, Z.jsx)(de, {
						"aria-hidden": !0,
						className: "size-(--icon-inline) shrink-0"
					})]
				})
			}),
			e.accessor((e) => e.last_error ? "拉取失败" : e.enabled ? "已启用" : "已暂停", {
				id: "status",
				header: t("status"),
				cell: (e) => /* @__PURE__ */ (0, Z.jsx)(qt, { source: e.row.original })
			}),
			e.accessor((e) => e.interval_minutes, {
				id: "interval",
				header: t("interval"),
				cell: (e) => /* @__PURE__ */ (0, Z.jsx)("span", {
					className: "whitespace-nowrap",
					children: xe(e.getValue())
				})
			}),
			e.accessor((e) => e.last_fetched_at && Date.parse(e.last_fetched_at) || 0, {
				id: "fetched",
				header: t("fetched"),
				cell: (e) => /* @__PURE__ */ (0, Z.jsx)("span", {
					className: "whitespace-nowrap tabular-nums",
					children: e.row.original.last_fetched_at ? Ne(e.row.original.last_fetched_at) : "还没拉过"
				})
			}),
			e.accessor((e) => e.last_new_count, {
				id: "fresh",
				header: t("fresh"),
				cell: (e) => /* @__PURE__ */ (0, Z.jsx)("span", {
					className: "whitespace-nowrap tabular-nums",
					children: `${e.getValue()} 条`
				})
			}),
			e.display({
				id: "actions",
				header: t("actions"),
				cell: (e) => /* @__PURE__ */ (0, Z.jsxs)("span", {
					className: "flex items-center gap-1",
					children: [
						/* @__PURE__ */ (0, Z.jsx)(oe, {
							"aria-label": `启用 ${Q(e.row.original)}`,
							isSelected: e.row.original.enabled,
							isDisabled: M.current.readOnly,
							onChange: (t) => M.current.toggle(e.row.original, t)
						}),
						/* @__PURE__ */ (0, Z.jsx)(g, {
							variant: "secondary",
							size: "small",
							iconOnly: !0,
							leadingIcon: be,
							"aria-label": `拉取 ${Q(e.row.original)}`,
							disabled: M.current.readOnly,
							...U(M.current.busy === `check-${e.row.original.id}`),
							onClick: () => M.current.fetch(e.row.original)
						}),
						/* @__PURE__ */ (0, Z.jsx)(g, {
							variant: "secondary",
							size: "small",
							iconOnly: !0,
							leadingIcon: N,
							"aria-label": `移除 ${Q(e.row.original)}`,
							disabled: M.current.readOnly,
							onClick: () => M.current.remove(e.row.original)
						})
					]
				})
			})
		]);
	}, []), F = (0, X.useMemo)(() => Object.fromEntries([...f].map((e) => [String(e), !0])), [f]), I = it({
		features: Vt,
		data: d,
		columns: P,
		getRowId: (e) => String(e.id),
		state: {
			rowSelection: F,
			sorting: E,
			pagination: {
				pageIndex: O.page - 1,
				pageSize: b
			},
			columnVisibility: i.visibility
		},
		onColumnVisibilityChange: i.change,
		onSortingChange: (e) => {
			D(e), _(1);
		},
		enableRowSelection: !0,
		onRowSelectionChange: (e) => {
			let t = typeof e == "function" ? e(F) : e;
			m(new Set(Object.entries(t).filter(([, e]) => e).map(([e]) => Number(e))));
		}
	});
	if (!u) return n.error ? /* @__PURE__ */ (0, Z.jsx)(R, {
		tone: "error",
		title: "打不开订阅源",
		children: J(n.error)
	}) : /* @__PURE__ */ (0, Z.jsx)(A, { children: "正在读订阅源。" });
	let L = () => void r.run("check", (e) => G(e), () => void Gt()), ie = (e) => m((t) => {
		let n = new Set(t);
		return n.has(e) ? n.delete(e) : n.add(e), n;
	}), z = d.filter((e) => f.has(e.id)), V = d.filter((e) => e.last_error);
	return /* @__PURE__ */ (0, Z.jsxs)("div", {
		className: "flex flex-col gap-3",
		children: [/* @__PURE__ */ (0, Z.jsx)(Bt, {
			readOnly: e,
			toast: t,
			onAdded: () => void Gt()
		}), /* @__PURE__ */ (0, Z.jsxs)("section", {
			"aria-label": "JAV 订阅列表",
			className: W({
				padding: "none",
				className: "flex flex-col gap-4 px-6 py-5 max-sm:px-4"
			}),
			children: [
				/* @__PURE__ */ (0, Z.jsxs)("div", {
					"data-responsive-toolbar": "",
					children: [/* @__PURE__ */ (0, Z.jsxs)("div", {
						"data-toolbar-heading": "",
						children: [/* @__PURE__ */ (0, Z.jsx)("h3", {
							className: "text-title-2-medium text-text-primary",
							children: "JAV 订阅源"
						}), /* @__PURE__ */ (0, Z.jsx)("span", {
							className: "text-body-2-regular text-text-secondary",
							children: `${d.length.toLocaleString()} 个订阅源 · ${(Number(u.unread) || 0).toLocaleString()} 条未看`
						})]
					}), /* @__PURE__ */ (0, Z.jsxs)("div", {
						"data-toolbar-actions": "",
						children: [
							/* @__PURE__ */ (0, Z.jsx)(g, {
								onClick: L,
								disabled: e,
								...U(r.busy === "check"),
								children: "立即拉取"
							}),
							/* @__PURE__ */ (0, Z.jsx)(ce, {
								preferences: i,
								label: "JAV 订阅源"
							}),
							/* @__PURE__ */ (0, Z.jsx)(ne, {
								label: "JAV 订阅源",
								sorting: E,
								onChange: (e) => {
									D(e), _(1);
								},
								options: [
									"name",
									"kind",
									"origin",
									"status",
									"interval",
									"fetched",
									"fresh"
								].map((e) => ({
									id: e,
									label: Ht[e]
								}))
							})
						]
					})]
				}),
				V.length || r.error ? /* @__PURE__ */ (0, Z.jsxs)("div", {
					className: "flex flex-col gap-3",
					children: [V.length ? /* @__PURE__ */ (0, Z.jsx)(R, {
						tone: "error",
						title: `${V.length.toLocaleString()} 条订阅源拉取失败`,
						extra: /* @__PURE__ */ (0, Z.jsx)("ul", {
							className: "flex flex-col gap-0.5 text-body-2-regular",
							children: V.map((e) => /* @__PURE__ */ (0, Z.jsx)("li", {
								className: "min-w-0 truncate",
								title: e.last_error || "",
								children: `${Q(e)}：${q(e.last_error || "") || "未说明原因"}`
							}, e.id))
						}),
						children: "这些订阅源这一轮没有取到新条目。"
					}) : null, r.error ? /* @__PURE__ */ (0, Z.jsx)(re, { children: r.error }) : null]
				}) : null,
				/* @__PURE__ */ (0, Z.jsxs)(ae, {
					visible: z.length > 0,
					label: "订阅源批量操作",
					count: `已选 ${z.length} 条订阅源`,
					children: [
						/* @__PURE__ */ (0, Z.jsx)(g, {
							variant: "secondary",
							size: "small",
							disabled: e,
							...U(k.isPending),
							onClick: () => k.mutate({
								ids: z.map((e) => e.id),
								action: "enabled"
							}),
							children: "启用"
						}),
						/* @__PURE__ */ (0, Z.jsx)(g, {
							variant: "secondary",
							size: "small",
							disabled: e,
							...U(k.isPending),
							onClick: () => k.mutate({
								ids: z.map((e) => e.id),
								action: "paused"
							}),
							children: "暂停"
						}),
						/* @__PURE__ */ (0, Z.jsx)(g, {
							variant: "danger",
							size: "small",
							disabled: e,
							...U(k.isPending),
							onClick: () => void Zt(z, () => k.mutateAsync({
								ids: z.map((e) => e.id),
								action: "remove"
							})),
							children: "移除"
						}),
						/* @__PURE__ */ (0, Z.jsx)(g, {
							variant: "ghost",
							size: "small",
							onClick: () => m(/* @__PURE__ */ new Set()),
							children: "取消选择"
						})
					]
				}),
				d.length ? /* @__PURE__ */ (0, Z.jsx)(x, {
					follow: !0,
					preferences: i,
					onRowClick: (e) => ie(Number(e)),
					children: /* @__PURE__ */ (0, Z.jsxs)(se, {
						"aria-label": "JAV 订阅源",
						size: "sm",
						sortDescriptor: E[0] ? {
							column: E[0].id,
							direction: E[0].desc ? "descending" : "ascending"
						} : void 0,
						onSortChange: (e) => I.getColumn(String(e.column))?.toggleSorting(e.direction === "descending"),
						children: [/* @__PURE__ */ (0, Z.jsxs)(l, { children: [I.getHeaderGroups()[0].headers.map((e) => {
							let t = Ee(e.column.columnDef.header, e.getContext());
							return /* @__PURE__ */ (0, Z.jsx)(o, {
								id: e.id,
								isRowHeader: e.column.id === "name",
								allowsSorting: e.column.getCanSort(),
								...i.columnProps(e.id),
								children: ({ sortDirection: n }) => /* @__PURE__ */ (0, Z.jsxs)(Z.Fragment, { children: [Ut.has(e.column.id) ? /* @__PURE__ */ (0, Z.jsx)(p, { children: t }) : /* @__PURE__ */ (0, Z.jsxs)("span", {
									className: "flex items-center gap-0.5",
									children: [t, e.column.getCanSort() ? /* @__PURE__ */ (0, Z.jsx)("span", {
										"data-sort-indicator": !0,
										"data-direction": n || void 0,
										children: /* @__PURE__ */ (0, Z.jsx)(ee, {})
									}) : null]
								}), /* @__PURE__ */ (0, Z.jsx)(le, {
									preferences: i,
									id: e.id
								})] })
							}, e.id);
						}), /* @__PURE__ */ (0, Z.jsx)(o, {
							id: "remaining-space",
							"aria-label": "行空白区域",
							"data-table-space": "",
							width: i.spaceWidth,
							minWidth: 0
						})] }), /* @__PURE__ */ (0, Z.jsx)(a, { children: I.getRowModel().rows.map((e) => /* @__PURE__ */ (0, Z.jsxs)(s, {
							id: e.id,
							"data-follow-selected": e.getIsSelected() || void 0,
							children: [e.getVisibleCells().map((e) => /* @__PURE__ */ (0, Z.jsx)(c, { children: Ee(e.column.columnDef.cell, e.getContext()) }, e.id)), /* @__PURE__ */ (0, Z.jsx)(c, { "data-table-space": "" })]
						}, e.id)) })]
					})
				}) : /* @__PURE__ */ (0, Z.jsx)(C, {
					icon: v,
					title: "还没有订阅源",
					size: "compact",
					actions: e ? void 0 : /* @__PURE__ */ (0, Z.jsx)(S, {
						target: "input[aria-label=\"女优名\"]",
						children: "添加订阅"
					}),
					children: "在上面按女优名添加，或在人物页点「订阅新作」。"
				}),
				d.length ? /* @__PURE__ */ (0, Z.jsx)(te, {
					label: "JAV 订阅",
					total: O.total,
					unit: "个订阅源",
					pagination: {
						pageIndex: O.page - 1,
						pageSize: b
					},
					onChange: (e) => {
						w(e.pageSize), _(e.pageIndex + 1);
					}
				}) : null,
				/* @__PURE__ */ (0, Z.jsx)("footer", {
					className: "-mx-6 -mb-5 flex flex-wrap items-center gap-2 border-t border-separator-border rounded-b-2xl bg-card-footer px-6 py-4 max-sm:-mx-4 max-sm:px-4",
					children: /* @__PURE__ */ (0, Z.jsx)("span", {
						role: "status",
						className: "mr-auto text-body-2-regular text-text-secondary",
						children: `未看 ${(Number(u.unread) || 0).toLocaleString()} · 已启用 ${d.filter((e) => e.enabled).length.toLocaleString()} / ${d.length.toLocaleString()}`
					})
				})
			]
		})]
	});
}
//#endregion
//#region src/react/follow-manage/follow-manage-page.tsx
var $t = [
	["list", "关注列表"],
	["add", "添加关注"],
	["feeds", "JAV 订阅源"]
], en = (e) => $t.some(([t]) => t === e);
function $({ term: e, figure: t, unit: n }) {
	return /* @__PURE__ */ (0, Z.jsxs)("div", {
		className: W({
			padding: "none",
			className: "flex flex-col gap-3 px-6 py-5 max-sm:gap-2 max-sm:p-4"
		}),
		children: [/* @__PURE__ */ (0, Z.jsx)("span", {
			className: "text-body-medium text-text-secondary",
			children: e
		}), /* @__PURE__ */ (0, Z.jsxs)("b", {
			"data-follow-reading": "",
			className: `flex min-w-0 flex-wrap items-baseline gap-x-1 tabular-nums text-text-primary ${t >= 1e6 ? "text-headline-medium" : t >= 1e5 ? "text-title-3-medium" : "text-title-1-medium"}`,
			children: [/* @__PURE__ */ (0, Z.jsx)("span", {
				className: "min-w-0 wrap-anywhere",
				children: t.toLocaleString()
			}), /* @__PURE__ */ (0, Z.jsx)("small", {
				className: "whitespace-nowrap text-body-2-regular text-text-secondary",
				children: ` ${n}`
			})]
		})]
	});
}
function tn(e) {
	let { route: t, savePreference: n, toast: r, openFollow: i, readOnly: a, readOnlyMessage: o, writerUrl: s } = e, [c, l] = (0, X.useState)(en(e.tab) ? e.tab : "list"), [p, m] = (0, X.useState)(Math.max(1, Math.floor(e.page) || 1)), [h, g] = (0, X.useState)(() => Ke(e.sort, e.dir).sort), [v, y] = (0, X.useState)(() => Ke(e.sort, e.dir).dir), [ee, b] = (0, X.useState)(je(e.layout) ? e.layout : "default"), [te, x] = (0, X.useState)(Ie(e.pageSize)), [ne, S] = (0, X.useState)(/* @__PURE__ */ new Set()), C = rt({
		queryKey: D,
		queryFn: ({ signal: e }) => Ce(e)
	}), re = rt({
		queryKey: E,
		queryFn: ({ signal: e }) => Se(e)
	}), O = rt({
		queryKey: T,
		queryFn: ({ signal: e }) => Y(e)
	}), k = C.data || { sources: [] }, A = re.data || {
		root: "",
		providers: []
	}, j = k.sources;
	(0, X.useEffect)(() => {
		S((e) => {
			let t = Me(e, j);
			return t.size === e.size ? e : t;
		});
	}, [j]);
	let M = (e) => {
		let n = e.sort ?? h, r = e.dir ?? v;
		t({
			tab: e.tab ?? c,
			page: e.page ?? p,
			sort: n === "checked" ? "" : n,
			dir: r === z[n] ? "" : r
		});
	}, N = ke(j), P = j.filter(Ae).length, F = j.filter((e) => e.enabled).length, I = (A.providers || []).filter((e) => e.requirement === "required" && !K(e)).length, L = new Set((O.data?.sources || []).map((e) => e.entity_id ?? `source-${e.id}`)).size;
	return /* @__PURE__ */ (0, Z.jsxs)(ot, { children: [
		a ? /* @__PURE__ */ (0, Z.jsx)(R, {
			tone: "warning",
			title: "本机只能浏览",
			extra: s ? /* @__PURE__ */ (0, Z.jsx)("p", {
				className: "text-body-2-regular",
				children: /* @__PURE__ */ (0, Z.jsx)(w, {
					href: s,
					children: "前往写入端管理关注"
				})
			}) : void 0,
			children: o
		}) : null,
		/* @__PURE__ */ (0, Z.jsxs)("div", {
			className: st,
			"aria-label": "关注概览",
			children: [
				/* @__PURE__ */ (0, Z.jsx)($, {
					term: "关注创作者",
					figure: N.length,
					unit: "位"
				}),
				/* @__PURE__ */ (0, Z.jsx)($, {
					term: "启用来源",
					figure: F,
					unit: `/ ${j.length}`
				}),
				/* @__PURE__ */ (0, Z.jsx)($, {
					term: "检查失败",
					figure: P,
					unit: "个来源"
				}),
				/* @__PURE__ */ (0, Z.jsx)($, {
					term: "未看更新",
					figure: k.counts?.new || 0,
					unit: "条"
				}),
				/* @__PURE__ */ (0, Z.jsx)($, {
					term: "JAV 订阅",
					figure: L,
					unit: "位"
				}),
				/* @__PURE__ */ (0, Z.jsx)($, {
					term: "未看新作",
					figure: O.data?.unread || 0,
					unit: "条"
				})
			]
		}),
		/* @__PURE__ */ (0, Z.jsxs)(f, {
			selectedKey: c,
			onSelectionChange: (e) => {
				let t = String(e);
				en(t) && (l(t), M({ tab: t }));
			},
			className: "flex flex-col gap-6",
			children: [
				/* @__PURE__ */ (0, Z.jsx)(lt, {
					"aria-label": "关注管理区域",
					"data-section-nav": !0,
					"data-section-items": !0,
					className: "flex max-w-full flex-nowrap overflow-x-auto",
					children: $t.map(([e, t]) => /* @__PURE__ */ (0, Z.jsx)(d, {
						id: e,
						"data-pill-selected": c === e ? "" : void 0,
						"data-pill-variant": "gray",
						className: "cursor-pointer whitespace-nowrap",
						children: t
					}, e))
				}),
				/* @__PURE__ */ (0, Z.jsx)(u, {
					id: "list",
					className: "flex flex-col gap-4",
					children: /* @__PURE__ */ (0, Z.jsx)(ft, {
						data: k,
						sort: h,
						dir: v,
						page: p,
						layout: ee,
						pageSize: te,
						selected: ne,
						readOnly: a,
						toast: r,
						openFollow: i,
						onAdd: () => {
							l("add"), M({ tab: "add" });
						},
						onSort: (e, t) => {
							g(e), y(t), m(1), M({
								sort: e,
								dir: t,
								page: 1
							});
						},
						onPage: (e) => {
							m(e), M({ page: e });
						},
						onSelected: S,
						onLayout: (e) => {
							b(e), m(1), n({ layout: e }), M({ page: 1 });
						},
						onPageSize: (e) => {
							x(e), m(1), n({ pageSize: e }), M({ page: 1 });
						}
					})
				}),
				/* @__PURE__ */ (0, Z.jsxs)(u, {
					id: "add",
					className: "flex flex-col gap-8",
					children: [/* @__PURE__ */ (0, Z.jsx)(Ct, {
						data: k,
						credentials: A,
						readOnly: a,
						toast: r
					}), /* @__PURE__ */ (0, Z.jsx)(It, {
						groups: k.author_aliases || [],
						readOnly: a,
						toast: r,
						suggestions: k.alias_suggestions || [],
						sources: k.sources
					})]
				}),
				/* @__PURE__ */ (0, Z.jsx)(u, {
					id: "feeds",
					className: "flex flex-col gap-4",
					children: /* @__PURE__ */ (0, Z.jsx)(Qt, {
						readOnly: a,
						toast: r
					})
				})
			]
		}),
		/* @__PURE__ */ (0, Z.jsx)("div", { children: /* @__PURE__ */ (0, Z.jsxs)(_, {
			variant: "secondary",
			href: "/settings/subscriptions",
			children: ["来源与订阅设置", I ? `（${I}）` : ""]
		}) })
	] });
}
//#endregion
export { tn as FollowManagePage };

//# debugId=b7e207ec-1afe-4be9-aa47-743c89380398