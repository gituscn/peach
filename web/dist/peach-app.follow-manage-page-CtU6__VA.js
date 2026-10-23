(function() {
	try {
		var e = typeof window < "u" ? window : typeof global < "u" ? global : typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : {}, t = new e.Error().stack;
		t && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[t] = "d24e1d7f-d204-4120-8c52-d8db621d5248", e._sentryDebugIdIdentifier = "sentry-dbid-d24e1d7f-d204-4120-8c52-d8db621d5248");
	} catch {}
})();
import { t as e } from "./peach-app.createPaginatedRowModel-Cb5ojTIu.js";
import { n as t, t as n } from "./peach-app.use-table-selection-KrR-g6fk.js";
import { $a as r, $o as i, Ai as a, Ba as o, Bi as s, Ca as c, Do as l, Ea as u, Ec as d, Fc as f, Fi as p, Gc as m, Gi as h, Gl as g, Ha as _, Il as v, Io as ee, Ji as y, Lc as b, Mi as x, Nc as S, Ni as te, Nl as C, Oa as w, Ol as T, Pc as E, Pi as D, Qa as O, Qc as k, Ql as A, Qo as j, Ra as ne, Rc as re, Ri as M, Sa as N, Sc as P, Us as F, Va as ie, Vi as I, Vl as L, Wi as R, Wo as ae, Xa as z, Yc as B, Yi as oe, Z as V, Zc as H, Zo as U, _l as W, al as se, ao as ce, as as le, au as G, bo as ue, cl as de, co as K, cs as fe, cu as pe, dl as q, ds as me, ec as he, el as ge, eo as _e, fl as ve, fs as J, go as ye, hl as be, hn as xe, ho as Se, il as Ce, is as we, iu as Te, jc as Ee, ji as De, kl as Oe, ko as ke, ll as Ae, lo as je, ls as Me, ml as Ne, mn as Pe, na as Fe, nc as Ie, nl as Le, ns as Re, ol as ze, oo as Be, ps as Ve, pu as He, qi as Ue, ro as Y, rs as We, sl as Ge, so as X, tl as Ke, to as qe, ts as Je, ul as Ye, uu as Xe, va as Ze, vl as Qe, wl as $e, wo as et, xl as tt, yl as nt, zi as rt, zl as it } from "./peach-app.js";
import { t as at } from "./peach-app.page-BYr6f5ud.js";
import { i as ot } from "./peach-app.stat-card-8t4QGU2C.js";
import { t as st } from "./peach-app.legacy-avatar-CV1xk6vD.js";
import { t as ct } from "./peach-app.pill-aria-tab-list-B1wzfuox.js";
import { r as lt, t as ut } from "./peach-app.source-view-DaRl5mr9.js";
import { t as dt } from "./peach-app.source-list-E8TH3X9X.js";
//#region src/react/follow-manage/add-source.tsx
var Z = /* @__PURE__ */ He(Xe(), 1), Q = pe(), ft = F(O, r, "text-body-2-medium"), pt = "粘贴来源链接，或输入创作者名、id…", mt = "查找中（首次按名字查要下载创作者索引，可能几十秒）", ht = "识别中", gt = "站内没有查到来源", _t = "/settings/subscriptions", vt = (e, t) => `${e}:${t.url}`;
function yt({ field: e, menu: t, options: n, active: r, busy: i, onPick: a, onClose: s }) {
	return (0, Z.useEffect)(() => {
		t.current?.querySelector("[aria-current=\"true\"]")?.scrollIntoView({ block: "nearest" });
	}, [t, r]), /* @__PURE__ */ (0, Q.jsxs)(Me, {
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
		className: F(_e, "flex w-(--trigger-width) flex-col gap-1 overscroll-contain"),
		children: [i && !n.length ? /* @__PURE__ */ (0, Q.jsx)("div", {
			className: "px-2 py-1.5",
			children: /* @__PURE__ */ (0, Q.jsx)(o, { label: "正在查找建议" })
		}) : null, n.map((e, t) => /* @__PURE__ */ (0, Q.jsxs)(Z.Fragment, { children: [e.group === n[t - 1]?.group ? null : /* @__PURE__ */ (0, Q.jsx)("div", {
			className: "px-2 pt-1 text-caption-1-regular text-text-tertiary",
			children: e.group
		}), /* @__PURE__ */ (0, Q.jsxs)("button", {
			type: "button",
			"aria-current": t === r ? "true" : void 0,
			className: t === r ? F(ft, "bg-background-secondary-default") : ft,
			onMouseDown: (e) => e.preventDefault(),
			onClick: () => a(e.value),
			children: [
				/* @__PURE__ */ (0, Q.jsx)("span", {
					className: "min-w-0 grow truncate text-left",
					children: e.value
				}),
				e.matched ? /* @__PURE__ */ (0, Q.jsx)("span", {
					className: "shrink-0 text-caption-1-regular text-text-tertiary",
					children: e.matched
				}) : null,
				e.n ? /* @__PURE__ */ (0, Q.jsx)("span", {
					className: "shrink-0 text-caption-1-regular tabular-nums text-text-tertiary",
					children: e.n.toLocaleString()
				}) : null
			]
		})] }, `${e.group}-${e.value}`))]
	});
}
function bt({ credentials: e, hidden: t, onHidden: n }) {
	let r = (0, Z.useRef)(null), [i, a] = (0, Z.useState)(!1), o = (e.providers || []).filter((e) => e.followable), s = o.filter((e) => !t.has(e.provider_label)).length, c = s === o.length ? "全部来源" : `${s}/${o.length} 个来源`, l = (e, r) => {
		let i = new Set(t);
		r ? i.delete(e) : i.add(e), n(i);
	};
	return /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [/* @__PURE__ */ (0, Q.jsx)(J, {
		ref: r,
		variant: "secondary",
		leadingIcon: Se,
		"aria-haspopup": "dialog",
		"aria-expanded": i,
		"aria-label": c,
		onClick: () => a(!0),
		children: c
	}), /* @__PURE__ */ (0, Q.jsx)(Me, {
		triggerRef: r,
		isOpen: i,
		onOpenChange: a,
		placement: "bottom end",
		offset: 4,
		className: _e,
		children: /* @__PURE__ */ (0, Q.jsxs)(fe, {
			"aria-label": "来源筛选",
			className: "flex w-64 flex-col gap-1 outline-none",
			children: [o.length ? /* @__PURE__ */ (0, Q.jsxs)("div", {
				className: "flex items-center gap-2 pb-1",
				children: [/* @__PURE__ */ (0, Q.jsx)(J, {
					variant: "ghost",
					size: "small",
					onClick: () => n(/* @__PURE__ */ new Set()),
					children: "全选"
				}), /* @__PURE__ */ (0, Q.jsx)(J, {
					variant: "ghost",
					size: "small",
					onClick: () => n(new Set(o.map((e) => e.provider_label))),
					children: "全不选"
				})]
			}) : /* @__PURE__ */ (0, Q.jsx)(w, { children: "暂无可用来源" }), o.map((e) => {
				let n = e.requirement === "required" && (!e.present || (e.missing || []).length > 0);
				return /* @__PURE__ */ (0, Q.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, Q.jsx)(z, {
						isSelected: !t.has(e.provider_label),
						onChange: (t) => l(e.provider_label, t),
						children: /* @__PURE__ */ (0, Q.jsxs)("span", {
							className: "flex min-w-0 items-center gap-1.5",
							children: [/* @__PURE__ */ (0, Q.jsx)(lt, { provider: e.provider }), e.provider_label]
						})
					}), n ? /* @__PURE__ */ (0, Q.jsx)(Ve, {
						variant: "ghost",
						size: "xs",
						className: "ml-auto",
						href: _t,
						onClick: () => a(!1),
						children: "打开凭据设置"
					}) : null]
				}, e.provider);
			})]
		})
	})] });
}
function xt({ row: e, at: t, hidden: n, unpicked: r, onPick: i }) {
	if (e.kind === "error") return /* @__PURE__ */ (0, Q.jsx)(X, {
		tone: "error",
		title: e.line,
		children: e.error || "查找失败"
	});
	let a = (e.candidates || []).filter((e) => !n.has(e.provider_label || "")), o = Object.entries(e.failures || {});
	return /* @__PURE__ */ (0, Q.jsxs)("div", {
		className: ie({
			variant: "outlined",
			padding: "none",
			className: "flex flex-col gap-2 p-4"
		}),
		children: [
			/* @__PURE__ */ (0, Q.jsx)("b", {
				className: "text-body-medium text-text-primary",
				children: e.line
			}),
			a.length ? a.map((e) => {
				let n = vt(t, e);
				return /* @__PURE__ */ (0, Q.jsx)(z, {
					isSelected: !e.known && !r.has(n),
					isDisabled: e.known,
					onChange: (e) => i(n, e),
					children: /* @__PURE__ */ (0, Q.jsxs)("span", {
						className: "flex min-w-0 flex-wrap items-center gap-1.5",
						children: [
							/* @__PURE__ */ (0, Q.jsx)(lt, { provider: e.provider }),
							/* @__PURE__ */ (0, Q.jsx)("b", {
								className: "text-body-medium",
								children: e.provider_label
							}),
							/* @__PURE__ */ (0, Q.jsx)("span", {
								className: "min-w-0 break-words",
								children: e.label
							}),
							/* @__PURE__ */ (0, Q.jsx)("small", {
								className: "text-caption-1-regular text-text-secondary",
								children: e.known ? "已经关注" : e.evidence
							})
						]
					})
				}, n);
			}) : /* @__PURE__ */ (0, Q.jsx)(w, { children: gt }),
			(e.external_searches || []).map((e) => /* @__PURE__ */ (0, Q.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [/* @__PURE__ */ (0, Q.jsx)("small", {
					className: "text-caption-1-regular text-text-secondary",
					children: e.evidence
				}), /* @__PURE__ */ (0, Q.jsx)(c, {
					href: e.url,
					children: `${e.label}：${e.query}`
				})]
			}, e.url)),
			o.length ? /* @__PURE__ */ (0, Q.jsx)(w, { children: o.map(([e, t]) => `${e}：${t}`).join("；") }) : null
		]
	});
}
function St({ data: e, credentials: t, readOnly: n, toast: r }) {
	let [i, a] = (0, Z.useState)(""), [o, s] = (0, Z.useState)(!1), [c, l] = (0, Z.useState)(""), [d, p] = (0, Z.useState)(""), [m, h] = (0, Z.useState)(!1), [_, v] = (0, Z.useState)(null), [ee, y] = (0, Z.useState)(-1), b = (0, Z.useRef)(null), x = (0, Z.useRef)(null), [S, te] = (0, Z.useState)(/* @__PURE__ */ new Set()), [C, w] = (0, Z.useState)(/* @__PURE__ */ new Set()), [E, D] = (0, Z.useState)(""), [O, k] = (0, Z.useState)(0);
	(0, Z.useEffect)(() => {
		let e = i.trim();
		if (o || !e || e.includes("/")) {
			p("");
			return;
		}
		let t = setTimeout(() => p(e), 250);
		return () => clearTimeout(t);
	}, [i, o]);
	let A = G({
		queryKey: Ge(d),
		queryFn: ({ signal: e }) => se(d, e),
		enabled: d.length > 0 && m && !o && _ !== i
	}), j = (0, Z.useMemo)(() => (A.data?.groups || []).flatMap((e) => e.items.map((t) => ({
		value: t.value,
		matched: t.matched || "",
		n: t.n || 0,
		group: e.label
	}))), [A.data]), { job: M, running: N, outcome: P, start: F, dismiss: I } = Pe({
		queryKey: f,
		queryFn: ({ signal: e }) => Ce(e),
		start: (e) => Oe([e]),
		onStarted: () => w(/* @__PURE__ */ new Set()),
		onError: (e) => D(g(e)),
		onFinish: (e) => {
			e.status === "failed" && D(e.error || "查找失败");
		}
	}), L = (e) => {
		let t = e.trim();
		!t || n || o || N || F.isPending || (D(""), y(-1), l(t), a(t), p(""), v(t), F.mutate(t));
	}, R = A.isFetching, z = m && !o && _ !== i && (j.length > 0 || R), B = () => {
		y(-1), v(i);
	}, oe = (e) => {
		if (!(o || e.nativeEvent.isComposing || e.nativeEvent.keyCode === 229)) {
			if (e.key === "Escape" && z) B();
			else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
				if (!j.length) return;
				if (e.preventDefault(), !z) {
					v(null);
					return;
				}
				let t = e.key === "ArrowDown" ? 1 : -1;
				y((e) => {
					let n = e + t;
					return n < 0 ? j.length - 1 : n >= j.length ? 0 : n;
				});
			} else e.key === "Enter" && (e.preventDefault(), L(j[ee]?.value || i));
		}
	}, V = P?.results || [], H = V.flatMap((e, t) => (e.candidates || []).filter((e) => !e.known && !S.has(e.provider_label || "")).map((e) => ({
		candidate: e,
		key: vt(t, e)
	})).filter((e) => !C.has(e.key))), U = Te({
		mutationFn: async (e) => {
			let t = [], n = [];
			k(0);
			for (let r of e) {
				try {
					let e = await re(r.candidate);
					n.push(e.source);
				} catch (e) {
					t.push(`${r.candidate.label}：${g(e)}`);
				}
				k((e) => e + 1);
			}
			if (n.length) try {
				await T(n);
			} catch (e) {
				t.push(g(e));
			}
			return {
				failures: t,
				sources: n
			};
		},
		onSuccess: (e) => {
			W(), e.failures.length ? D(e.failures.join("；")) : (D(""), I(), r(`已添加 ${e.sources.length} 个关注来源`));
		},
		onError: (e) => D(g(e))
	}), ce = e.suggestions || [], le = !c.includes("/");
	return /* @__PURE__ */ (0, Q.jsxs)("div", {
		className: ie({
			padding: "none",
			className: "flex flex-col gap-4 px-6 py-5 max-sm:px-4"
		}),
		children: [
			/* @__PURE__ */ (0, Q.jsx)("h3", {
				className: "text-title-2-medium text-text-primary",
				children: "添加关注"
			}),
			/* @__PURE__ */ (0, Q.jsxs)("div", {
				className: "flex flex-wrap items-end gap-2",
				children: [
					/* @__PURE__ */ (0, Q.jsxs)("div", {
						ref: b,
						className: "min-w-64 grow",
						onFocus: () => h(!0),
						onBlur: (e) => {
							let t = e.relatedTarget;
							!e.currentTarget.contains(t) && !x.current?.contains(t) && h(!1);
						},
						children: [/* @__PURE__ */ (0, Q.jsx)(je, {
							"aria-label": "来源链接、名字或 id",
							placeholder: pt,
							value: i,
							leadingIcon: ae,
							enterKeyHint: "search",
							isDisabled: n,
							onChange: a,
							onCompositionStart: () => {
								s(!0), y(-1);
							},
							onCompositionEnd: (e) => {
								s(!1), a(e.currentTarget.value);
							},
							onKeyDown: oe
						}), z ? /* @__PURE__ */ (0, Q.jsx)(yt, {
							field: b,
							menu: x,
							options: j,
							active: ee,
							busy: R,
							onPick: L,
							onClose: B
						}) : null]
					}),
					/* @__PURE__ */ (0, Q.jsx)(bt, {
						credentials: t,
						hidden: S,
						onHidden: te
					}),
					/* @__PURE__ */ (0, Q.jsx)(J, {
						variant: "primary",
						disabled: n || !i.trim(),
						...Y(N || F.isPending),
						onClick: () => L(i),
						children: "查找"
					})
				]
			}),
			/* @__PURE__ */ (0, Q.jsxs)("div", {
				"aria-live": "polite",
				className: "flex flex-col gap-3 empty:hidden",
				children: [N || F.isPending ? /* @__PURE__ */ (0, Q.jsx)(ne, {
					embedded: !0,
					label: M?.message || (M?.total ? `查找中：${M.checked || 0}/${M.total}` : le ? mt : ht),
					value: M?.checked,
					total: M?.total
				}) : null, E ? /* @__PURE__ */ (0, Q.jsx)(X, {
					tone: "error",
					title: "这一次没有完成",
					children: E
				}) : null]
			}),
			V.length ? /* @__PURE__ */ (0, Q.jsxs)("div", {
				className: "flex flex-col gap-3",
				children: [
					/* @__PURE__ */ (0, Q.jsx)(u, { children: "查找结果" }),
					V.map((e, t) => /* @__PURE__ */ (0, Q.jsx)(xt, {
						row: e,
						at: t,
						hidden: S,
						unpicked: C,
						onPick: (e, t) => {
							let n = new Set(C);
							t ? n.delete(e) : n.add(e), w(n);
						}
					}, `${e.line}-${t}`)),
					/* @__PURE__ */ (0, Q.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [
							/* @__PURE__ */ (0, Q.jsx)(J, {
								variant: "secondary",
								size: "small",
								onClick: () => I(),
								children: "关闭"
							}),
							/* @__PURE__ */ (0, Q.jsx)(J, {
								variant: "primary",
								size: "small",
								disabled: n || !H.length,
								...Y(U.isPending),
								onClick: () => U.mutate(H),
								children: `添加选中（${H.length}）`
							}),
							U.isPending ? /* @__PURE__ */ (0, Q.jsx)("span", {
								role: "status",
								className: "text-body-2-regular text-text-secondary",
								children: `添加中… ${O}/${H.length}`
							}) : null
						]
					})
				]
			}) : null,
			ce.length ? /* @__PURE__ */ (0, Q.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [/* @__PURE__ */ (0, Q.jsx)("span", {
					className: "text-body-2-regular text-text-secondary",
					children: "猜你喜欢"
				}), ce.map((e) => /* @__PURE__ */ (0, Q.jsx)(J, {
					variant: "secondary",
					size: "small",
					disabled: n,
					title: `浏览历史里出现 ${e.visits} 次${e.origin ? ` · ${e.origin}` : ""}`,
					onClick: () => L(e.name),
					children: e.name
				}, e.name))]
			}) : null
		]
	});
}
//#endregion
//#region src/react/follow-manage/alias-rename-dialog.tsx
function Ct({ group: e, close: t, receipt: n }) {
	return /* @__PURE__ */ (0, Q.jsx)(K, {
		isOpen: !!e,
		onOpenChange: (e) => {
			e || t();
		},
		width: "form",
		label: "修改统一名称",
		children: e ? /* @__PURE__ */ (0, Q.jsx)(wt, {
			group: e,
			close: t,
			receipt: n
		}, e.canonical_key) : null
	});
}
function wt({ group: e, close: t, receipt: n }) {
	let [r, i] = (0, Z.useState)(e.canonical_name), a = _();
	return /* @__PURE__ */ (0, Q.jsxs)("form", {
		onSubmit: (i) => {
			i.preventDefault(), r.trim() && r.trim() !== e.canonical_name && a.run("rename", (t) => tt(e.canonical_key, r.trim(), t), () => {
				W(), n(`已把统一名称改为 ${r.trim()}`), t();
			});
		},
		className: "flex min-h-0 flex-col gap-4 p-5",
		children: [
			/* @__PURE__ */ (0, Q.jsx)(me, {
				slot: "title",
				className: "text-title-2-semibold text-text-primary",
				children: "修改统一名称"
			}),
			/* @__PURE__ */ (0, Q.jsxs)("p", {
				className: "text-body-2-regular wrap-anywhere text-text-secondary",
				children: ["当前名称：", e.canonical_name]
			}),
			/* @__PURE__ */ (0, Q.jsx)(je, {
				"aria-label": "统一名称",
				autoFocus: !0,
				value: r,
				onChange: i
			}),
			/* @__PURE__ */ (0, Q.jsxs)("div", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ (0, Q.jsx)(u, { children: "选择已有别名" }), /* @__PURE__ */ (0, Q.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: e.aliases.map((e) => /* @__PURE__ */ (0, Q.jsx)(J, {
						variant: "secondary",
						size: "small",
						onClick: () => i(e.name),
						children: e.name
					}, e.key))
				})]
			}),
			/* @__PURE__ */ (0, Q.jsx)("p", {
				className: "text-body-2-regular text-text-secondary",
				children: "原名称保留为别名，关联档案和作品署名会同步更新。"
			}),
			a.error ? /* @__PURE__ */ (0, Q.jsx)(X, {
				tone: "error",
				children: a.error
			}) : null,
			/* @__PURE__ */ (0, Q.jsxs)("div", {
				className: "flex flex-wrap justify-end gap-2",
				children: [/* @__PURE__ */ (0, Q.jsx)(J, {
					variant: "secondary",
					onClick: t,
					children: "取消"
				}), /* @__PURE__ */ (0, Q.jsx)(J, {
					type: "submit",
					variant: "primary",
					disabled: !r.trim() || r.trim() === e.canonical_name,
					...Y(!!a.busy),
					children: "修改统一名称"
				})]
			})
		]
	});
}
//#endregion
//#region src/react/follow-manage/alias-manager.tsx
var Tt = (e) => `将移除别名「${e}」，对应来源恢复为独立创作者组。`, Et = y({
	rowSelectionFeature: R,
	rowSortingFeature: I,
	rowPaginationFeature: h,
	columnVisibilityFeature: Ue,
	sortedRowModel: t(),
	paginatedRowModel: e()
}), Dt = Et, Ot = {
	id: "select",
	label: "选择",
	width: 48,
	min: 48,
	max: 48,
	required: !0
}, kt = {
	id: "canonical",
	label: "统一名称",
	width: 280,
	min: 240,
	required: !0,
	flex: !0
}, At = [
	Ot,
	kt,
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
], jt = [
	Ot,
	kt,
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
], Mt = (e) => e.alias;
function Nt(e, t, n) {
	let r = n ? `name:${n}` : "", i = r && e.find((e) => e.author_key === r) || e.find((e) => e.author_name === t || e.entity_name === t);
	return i ? e.filter((e) => e.author_key === i.author_key) : [];
}
function Pt({ sources: e, name: t, canonicalKey: n }) {
	return /* @__PURE__ */ (0, Q.jsxs)("span", {
		className: "flex items-center gap-2",
		children: [/* @__PURE__ */ (0, Q.jsx)(ut, {
			group: Nt(e, t, n),
			name: t
		}), /* @__PURE__ */ (0, Q.jsx)("b", {
			className: "text-body-medium",
			children: t
		})]
	});
}
function Ft({ groups: e, suggestions: t, sources: r = [], readOnly: i, toast: o }) {
	let c = te("alias-suggestions", At), l = te("alias-saved", jt), [d, f] = (0, Z.useState)(null), [m, h] = (0, Z.useState)({}), [_, v] = (0, Z.useState)({}), ee = n(() => h({})), y = n(() => v({})), [S, C] = (0, Z.useState)([]), [w, T] = (0, Z.useState)([]), [E, O] = (0, Z.useState)({
		pageIndex: 0,
		pageSize: 20
	}), [k, A] = (0, Z.useState)({
		pageIndex: 0,
		pageSize: 20
	}), j = {
		...E,
		pageIndex: Math.min(E.pageIndex, Math.max(0, Math.ceil(t.length / E.pageSize) - 1))
	}, ne = {
		...k,
		pageIndex: Math.min(k.pageIndex, Math.max(0, Math.ceil(e.length / k.pageSize) - 1))
	}, [re, F] = (0, Z.useState)(""), [I, L] = (0, Z.useState)(""), [R, ae] = (0, Z.useState)(""), B = Te({
		mutationFn: async (e) => {
			let t = 0;
			for (let n of e) {
				try {
					await b(n.canonical, n.alias);
				} catch (n) {
					throw t && W(), Error(`${g(n)}（还有 ${e.length - t} 组没有合并）`);
				}
				t += 1;
			}
			return {
				done: t,
				items: e
			};
		},
		onSuccess: (e) => {
			F(""), h({}), W(), o(`已合并 ${e.done} 组创作者别名`);
		},
		onError: (e) => F(g(e))
	}), V = Te({
		mutationFn: (e) => b(e.canonical, e.alias),
		onSuccess: () => {
			F(""), L(""), ae(""), W(), o("已保存创作者别名");
		},
		onError: (e) => F(g(e))
	}), H = Te({
		mutationFn: async (e) => {
			let t = typeof e == "string" ? [e] : e, n = 0;
			try {
				for (let e of t) await Qe(e), n += 1;
			} catch (e) {
				throw Error(`${g(e)}（已移除 ${n} 个别名，还有 ${t.length - n} 个未移除）`);
			} finally {
				W();
			}
		},
		onSuccess: () => {
			F(""), v({}), o("已移除创作者别名");
		},
		onError: (e) => F(g(e))
	}), U = (e, t) => {
		e.length && P({
			title: t ? "合并全部创作者别名" : "合并所选创作者别名",
			body: `将合并以下 ${e.length} 组创作者：${e.map((e) => `「${e.alias}」归入「${e.canonical}」`).join("；")}。`,
			confirmLabel: t ? "合并全部别名" : "合并所选别名",
			onConfirm: () => B.mutateAsync(e)
		});
	}, se = (e) => void P({
		title: "移除创作者别名",
		body: Tt(e),
		confirmLabel: "移除创作者别名",
		onConfirm: () => H.mutateAsync(e)
	}), G = (0, Z.useRef)({
		sources: r,
		readOnly: i,
		merging: B.isPending,
		removing: H.isPending,
		merge: U,
		remove: se,
		rename: f
	});
	G.current = {
		sources: r,
		readOnly: i,
		merging: B.isPending,
		removing: H.isPending,
		merge: U,
		remove: se,
		rename: f
	};
	let ue = (0, Z.useMemo)(() => {
		let e = oe();
		return e.columns([
			e.display({
				id: "select",
				header: (e) => /* @__PURE__ */ (0, Q.jsx)(a, {
					table: e.table,
					label: "全选待合并别名"
				}),
				cell: (e) => /* @__PURE__ */ (0, Q.jsx)(z, {
					slot: null,
					isSelected: e.row.getIsSelected(),
					"aria-label": `选择别名 ${e.row.original.alias}，归入 ${e.row.original.canonical}`,
					onChange: (t) => e.row.toggleSelected(t)
				})
			}),
			e.accessor("canonical", {
				header: "统一名称",
				cell: (e) => /* @__PURE__ */ (0, Q.jsx)(Pt, {
					sources: G.current.sources,
					name: e.getValue()
				})
			}),
			e.accessor("alias", {
				header: "平台别名",
				cell: (e) => e.getValue()
			}),
			e.accessor("evidence", {
				header: "依据",
				cell: (e) => /* @__PURE__ */ (0, Q.jsx)("span", {
					className: "text-body-2-regular text-text-secondary",
					children: e.getValue()
				})
			}),
			e.display({
				id: "actions",
				header: "操作",
				cell: (e) => /* @__PURE__ */ (0, Q.jsx)(J, {
					variant: "secondary",
					size: "small",
					disabled: G.current.readOnly,
					...Y(G.current.merging),
					onClick: () => G.current.merge([e.row.original], !1),
					children: "合并"
				})
			})
		]);
	}, []), de = (0, Z.useMemo)(() => {
		let e = oe();
		return e.columns([
			e.display({
				id: "select",
				header: ({ table: e }) => /* @__PURE__ */ (0, Q.jsx)(a, {
					table: e,
					label: "全选已保存别名"
				}),
				cell: ({ row: e }) => /* @__PURE__ */ (0, Q.jsx)(z, {
					slot: null,
					"aria-label": `选择已保存别名 ${e.original.canonical_name}`,
					isSelected: e.getIsSelected(),
					onChange: (t) => e.toggleSelected(t)
				})
			}),
			e.accessor("canonical_name", {
				id: "canonical",
				header: "统一名称",
				cell: (e) => /* @__PURE__ */ (0, Q.jsx)(Pt, {
					sources: G.current.sources,
					name: e.getValue(),
					canonicalKey: e.row.original.canonical_key
				})
			}),
			e.accessor("aliases", {
				header: "平台别名",
				sortFn: (e, t) => e.original.aliases.map((e) => e.name).join(" ").localeCompare(t.original.aliases.map((e) => e.name).join(" "), "zh-CN"),
				cell: (e) => /* @__PURE__ */ (0, Q.jsx)("span", {
					className: "flex flex-wrap items-center gap-1.5",
					children: e.getValue().map((e) => /* @__PURE__ */ (0, Q.jsxs)("span", {
						className: "inline-flex items-center gap-1 rounded-md bg-background-secondary-default px-1.5 py-1 text-caption-1-medium text-text-secondary",
						children: [e.name, /* @__PURE__ */ (0, Q.jsx)(J, {
							variant: "ghost",
							size: "xs",
							iconOnly: !0,
							leadingIcon: et,
							"aria-label": `移除别名 ${e.name}`,
							disabled: G.current.readOnly,
							...Y(G.current.removing),
							onClick: () => G.current.remove(e.name)
						})]
					}, e.key))
				})
			}),
			e.display({
				id: "actions",
				header: "操作",
				cell: ({ row: e }) => /* @__PURE__ */ (0, Q.jsx)(J, {
					variant: "secondary",
					size: "small",
					disabled: G.current.readOnly,
					"aria-label": `修改 ${e.original.canonical_name} 的统一名称`,
					onClick: () => G.current.rename(e.original),
					children: "修改统一名称"
				})
			})
		]);
	}, []), K = s({
		features: Et,
		data: t,
		columns: ue,
		getRowId: Mt,
		state: {
			rowSelection: m,
			sorting: S,
			pagination: j,
			columnVisibility: c.visibility
		},
		onColumnVisibilityChange: c.change,
		onRowSelectionChange: (e) => {
			ee(), h(e);
		},
		onSortingChange: (e) => {
			C(e), O((e) => ({
				...e,
				pageIndex: 0
			}));
		},
		onPaginationChange: O,
		enableRowSelection: !0
	}), fe = s({
		features: Dt,
		data: e,
		columns: de,
		getRowId: (e) => e.canonical_key,
		state: {
			rowSelection: _,
			sorting: w,
			pagination: ne,
			columnVisibility: l.visibility
		},
		onColumnVisibilityChange: l.change,
		onRowSelectionChange: (e) => {
			y(), v(e);
		},
		enableRowSelection: !0,
		onSortingChange: (e) => {
			T(e), A((e) => ({
				...e,
				pageIndex: 0
			}));
		},
		onPaginationChange: A
	}), pe = K.getSelectedRowModel().rows.map((e) => e.original), q = fe.getSelectedRowModel().rows.flatMap((e) => e.original.aliases.map((e) => e.name)), me = Y(B.isPending);
	return /* @__PURE__ */ (0, Q.jsxs)("div", {
		className: ie({
			padding: "none",
			className: "flex flex-col gap-4 px-6 py-5 max-sm:px-4"
		}),
		children: [
			/* @__PURE__ */ (0, Q.jsx)("h3", {
				className: "text-title-2-medium text-text-primary",
				children: "创作者别名"
			}),
			/* @__PURE__ */ (0, Q.jsxs)("div", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ (0, Q.jsx)(u, { children: "手动添加别名" }), /* @__PURE__ */ (0, Q.jsxs)("div", {
					className: "flex flex-wrap items-end gap-2",
					children: [
						/* @__PURE__ */ (0, Q.jsx)(je, {
							"aria-label": "统一名称",
							placeholder: "在 Peach 中统一显示的名称",
							value: I,
							onChange: L,
							isDisabled: i,
							className: "w-56"
						}),
						/* @__PURE__ */ (0, Q.jsx)(je, {
							"aria-label": "平台别名",
							placeholder: "平台别名",
							value: R,
							onChange: ae,
							isDisabled: i,
							className: "w-56"
						}),
						/* @__PURE__ */ (0, Q.jsx)(J, {
							variant: "primary",
							disabled: i || !I.trim() || !R.trim(),
							...Y(V.isPending),
							onClick: () => V.mutate({
								canonical: I.trim(),
								alias: R.trim()
							}),
							children: "保存别名"
						})
					]
				})]
			}),
			re ? /* @__PURE__ */ (0, Q.jsx)(N, { children: re }) : null,
			t.length ? /* @__PURE__ */ (0, Q.jsxs)("div", {
				className: "flex flex-col gap-2",
				children: [
					/* @__PURE__ */ (0, Q.jsxs)("div", {
						"data-responsive-toolbar": "",
						children: [/* @__PURE__ */ (0, Q.jsxs)("div", {
							"data-toolbar-heading": "",
							children: [/* @__PURE__ */ (0, Q.jsx)(u, { children: "待合并" }), /* @__PURE__ */ (0, Q.jsx)("span", {
								className: "text-body-2-regular text-text-secondary",
								children: `${t.length} 组`
							})]
						}), /* @__PURE__ */ (0, Q.jsxs)("div", {
							"data-toolbar-actions": "",
							children: [
								/* @__PURE__ */ (0, Q.jsx)(J, {
									variant: "primary",
									size: "small",
									disabled: i,
									...me,
									onClick: () => U(t, !0),
									children: `全部合并（${t.length}）`
								}),
								/* @__PURE__ */ (0, Q.jsx)(p, {
									label: "待合并创作者别名",
									sorting: S,
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
										C(e), O((e) => ({
											...e,
											pageIndex: 0
										}));
									}
								}),
								/* @__PURE__ */ (0, Q.jsx)(De, {
									preferences: c,
									label: "待合并创作者别名"
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, Q.jsxs)(he, {
						label: "待合并别名批量操作",
						visible: pe.length > 0,
						count: `已选 ${pe.length} 组`,
						children: [/* @__PURE__ */ (0, Q.jsx)(J, {
							variant: "secondary",
							size: "small",
							disabled: i,
							...me,
							onClick: () => U(pe, !1),
							children: `合并所选（${pe.length}）`
						}), /* @__PURE__ */ (0, Q.jsx)(J, {
							variant: "ghost",
							size: "small",
							onClick: () => h({}),
							children: "取消选择"
						})]
					}),
					/* @__PURE__ */ (0, Q.jsx)(M, {
						follow: !0,
						preferences: c,
						onRowClick: (e) => K.getRow(e)?.toggleSelected(),
						children: /* @__PURE__ */ (0, Q.jsxs)(rt, {
							"aria-label": "待合并创作者别名",
							size: "sm",
							sortDescriptor: S[0] ? {
								column: S[0].id,
								direction: S[0].desc ? "descending" : "ascending"
							} : void 0,
							onSortChange: (e) => K.getColumn(String(e.column))?.toggleSorting(e.direction === "descending"),
							children: [/* @__PURE__ */ (0, Q.jsxs)(le, { children: [K.getHeaderGroups()[0].headers.map((e) => /* @__PURE__ */ (0, Q.jsx)(Re, {
								id: e.id,
								isRowHeader: e.column.id === "canonical",
								allowsSorting: e.column.getCanSort(),
								...c.columnProps(e.id),
								children: ({ sortDirection: t }) => /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [/* @__PURE__ */ (0, Q.jsxs)("span", {
									className: "flex items-center gap-0.5",
									children: [Fe(e.column.columnDef.header, e.getContext()), e.column.getCanSort() ? /* @__PURE__ */ (0, Q.jsx)("span", {
										"data-sort-indicator": !0,
										"data-direction": t || void 0,
										children: /* @__PURE__ */ (0, Q.jsx)(qe, {})
									}) : null]
								}), /* @__PURE__ */ (0, Q.jsx)(x, {
									preferences: c,
									id: e.id
								})] })
							}, e.id)), /* @__PURE__ */ (0, Q.jsx)(Re, {
								id: "remaining-space",
								"aria-label": "行空白区域",
								"data-table-space": "",
								width: c.spaceWidth,
								minWidth: 0
							})] }), /* @__PURE__ */ (0, Q.jsx)(Je, { children: K.getRowModel().rows.map((e) => /* @__PURE__ */ (0, Q.jsxs)(We, {
								id: e.id,
								"data-board-selected": e.getIsSelected() || void 0,
								children: [e.getVisibleCells().map((e) => /* @__PURE__ */ (0, Q.jsx)(we, { children: Fe(e.column.columnDef.cell, e.getContext()) }, e.id)), /* @__PURE__ */ (0, Q.jsx)(we, { "data-table-space": "" })]
							}, e.id)) })]
						})
					}),
					/* @__PURE__ */ (0, Q.jsx)(D, {
						label: "待合并创作者别名",
						unit: "组",
						total: t.length,
						pagination: j,
						onChange: O
					})
				]
			}) : null,
			/* @__PURE__ */ (0, Q.jsxs)("div", {
				className: "flex flex-col gap-2",
				children: [
					/* @__PURE__ */ (0, Q.jsxs)("div", {
						"data-responsive-toolbar": "",
						children: [/* @__PURE__ */ (0, Q.jsxs)("div", {
							"data-toolbar-heading": "",
							children: [/* @__PURE__ */ (0, Q.jsx)(u, { children: "已保存别名" }), /* @__PURE__ */ (0, Q.jsx)("span", {
								className: "text-body-2-regular text-text-secondary",
								children: `${e.length} 组`
							})]
						}), /* @__PURE__ */ (0, Q.jsxs)("div", {
							"data-toolbar-actions": "",
							children: [/* @__PURE__ */ (0, Q.jsx)(p, {
								label: "已保存创作者别名",
								sorting: w,
								options: [{
									id: "canonical",
									label: "统一名称"
								}, {
									id: "aliases",
									label: "平台别名"
								}],
								onChange: (e) => {
									T(e), A((e) => ({
										...e,
										pageIndex: 0
									}));
								}
							}), /* @__PURE__ */ (0, Q.jsx)(De, {
								preferences: l,
								label: "已保存创作者别名"
							})]
						})]
					}),
					/* @__PURE__ */ (0, Q.jsxs)(he, {
						label: "已保存别名批量操作",
						visible: q.length > 0,
						count: `已选 ${q.length} 个别名`,
						children: [/* @__PURE__ */ (0, Q.jsx)(J, {
							variant: "secondary",
							size: "small",
							disabled: i,
							...Y(H.isPending),
							onClick: () => void P({
								title: "移除所选创作者别名",
								body: `将移除以下 ${q.length} 个别名，对应来源恢复为独立创作者组。`,
								items: q,
								confirmLabel: "移除所选别名",
								onConfirm: () => H.mutateAsync(q)
							}),
							children: `移除所选别名（${q.length}）`
						}), /* @__PURE__ */ (0, Q.jsx)(J, {
							variant: "ghost",
							size: "small",
							onClick: () => v({}),
							children: "取消选择"
						})]
					}),
					e.length ? /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [/* @__PURE__ */ (0, Q.jsx)(M, {
						follow: !0,
						preferences: l,
						onRowClick: (e) => fe.getRow(e)?.toggleSelected(),
						children: /* @__PURE__ */ (0, Q.jsxs)(rt, {
							"aria-label": "已保存创作者别名",
							size: "sm",
							sortDescriptor: w[0] ? {
								column: w[0].id,
								direction: w[0].desc ? "descending" : "ascending"
							} : void 0,
							onSortChange: (e) => fe.getColumn(String(e.column))?.toggleSorting(e.direction === "descending"),
							children: [/* @__PURE__ */ (0, Q.jsxs)(le, { children: [fe.getHeaderGroups()[0].headers.map((e) => /* @__PURE__ */ (0, Q.jsx)(Re, {
								id: e.id,
								isRowHeader: e.column.id === "canonical",
								allowsSorting: e.column.getCanSort(),
								...l.columnProps(e.id),
								children: ({ sortDirection: t }) => /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [/* @__PURE__ */ (0, Q.jsxs)("span", {
									className: "flex items-center gap-0.5",
									children: [Fe(e.column.columnDef.header, e.getContext()), e.column.getCanSort() ? /* @__PURE__ */ (0, Q.jsx)("span", {
										"data-sort-indicator": !0,
										"data-direction": t || void 0,
										children: /* @__PURE__ */ (0, Q.jsx)(qe, {})
									}) : null]
								}), /* @__PURE__ */ (0, Q.jsx)(x, {
									preferences: l,
									id: e.id
								})] })
							}, e.id)), /* @__PURE__ */ (0, Q.jsx)(Re, {
								id: "remaining-space",
								"aria-label": "行空白区域",
								"data-table-space": "",
								width: l.spaceWidth,
								minWidth: 0
							})] }), /* @__PURE__ */ (0, Q.jsx)(Je, { children: fe.getRowModel().rows.map((e) => /* @__PURE__ */ (0, Q.jsxs)(We, {
								id: e.id,
								"data-board-selected": e.getIsSelected() || void 0,
								children: [e.getVisibleCells().map((e) => /* @__PURE__ */ (0, Q.jsx)(we, { children: Fe(e.column.columnDef.cell, e.getContext()) }, e.id)), /* @__PURE__ */ (0, Q.jsx)(we, { "data-table-space": "" })]
							}, e.id)) })]
						})
					}), /* @__PURE__ */ (0, Q.jsx)(D, {
						label: "已保存创作者别名",
						unit: "组",
						total: e.length,
						pagination: ne,
						onChange: A
					})] }) : /* @__PURE__ */ (0, Q.jsx)(Be, {
						size: "compact",
						icon: ke,
						title: "还没有保存创作者别名",
						actions: i ? void 0 : /* @__PURE__ */ (0, Q.jsx)(ce, {
							target: "input[aria-label=\"统一名称\"]",
							children: "添加别名"
						}),
						children: "填写统一名称，以及该创作者在其他平台使用的名字。"
					})
				]
			}),
			/* @__PURE__ */ (0, Q.jsx)(Ct, {
				group: d,
				close: () => f(null),
				receipt: o
			})
		]
	});
}
//#endregion
//#region src/react/follow-manage/add-feed.tsx
var It = "输入女优名，到 JavDB 找她的演员页";
function Lt(e, t) {
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
function Rt({ card: e, picked: t, onPick: n }) {
	return /* @__PURE__ */ (0, Q.jsxs)("div", {
		className: "flex flex-wrap items-center gap-2",
		children: [/* @__PURE__ */ (0, Q.jsx)(z, {
			isSelected: t,
			onChange: n,
			children: /* @__PURE__ */ (0, Q.jsxs)("span", {
				className: "flex min-w-0 flex-wrap items-center gap-1.5",
				children: [
					/* @__PURE__ */ (0, Q.jsx)("span", {
						className: "min-w-0 break-words",
						children: e.names.join("、")
					}),
					e.record ? /* @__PURE__ */ (0, Q.jsx)(xe, {
						variant: "caption",
						color: "neutral",
						children: e.record
					}) : null,
					e.held_by ? /* @__PURE__ */ (0, Q.jsx)("small", {
						className: "text-caption-1-regular text-text-secondary",
						children: `已在「${e.held_by.name}」名下`
					}) : null
				]
			})
		}), /* @__PURE__ */ (0, Q.jsx)(c, {
			href: e.url,
			children: e.id
		})]
	});
}
function zt({ readOnly: e, toast: t, onAdded: n }) {
	let [r, i] = (0, Z.useState)(""), [a, o] = (0, Z.useState)(null), [s, c] = (0, Z.useState)(/* @__PURE__ */ new Set()), l = _(), d = () => {
		let t = r.trim();
		t && !e && l.run("lookup", (e) => ve(t, e), (e) => {
			o(e), c(new Set(e.suggested));
		});
	}, f = (e) => {
		e.key === "Enter" && !e.nativeEvent.isComposing && (e.preventDefault(), d());
	}, p = () => {
		o(null), c(/* @__PURE__ */ new Set()), l.setError("");
	}, m = () => {
		a && l.run("follow", (e) => ze(a.q, [...s], e), (e) => {
			t(e.created ? `已新建「${e.entity_name}」并订阅她的新作` : `已订阅「${e.entity_name}」的新作`), i(""), p(), n();
		});
	}, h = a ? Lt(a, s) : null;
	return /* @__PURE__ */ (0, Q.jsxs)("div", {
		className: ie({
			padding: "none",
			className: "flex flex-col gap-4 px-6 py-5 max-sm:px-4"
		}),
		children: [
			/* @__PURE__ */ (0, Q.jsx)("h3", {
				className: "text-title-2-medium text-text-primary",
				children: "添加 JAV 订阅"
			}),
			/* @__PURE__ */ (0, Q.jsxs)("div", {
				className: "flex flex-wrap items-end gap-2",
				children: [/* @__PURE__ */ (0, Q.jsx)("div", {
					className: "min-w-64 grow",
					children: /* @__PURE__ */ (0, Q.jsx)(je, {
						"aria-label": "女优名",
						placeholder: It,
						value: r,
						leadingIcon: ae,
						enterKeyHint: "search",
						isDisabled: e,
						onChange: i,
						onKeyDown: f
					})
				}), /* @__PURE__ */ (0, Q.jsx)(J, {
					variant: "primary",
					disabled: e || !r.trim(),
					...Y(l.busy === "lookup"),
					onClick: d,
					children: "查找"
				})]
			}),
			l.error ? /* @__PURE__ */ (0, Q.jsx)(X, {
				tone: "error",
				title: "这一次没有完成",
				children: l.error
			}) : null,
			a ? /* @__PURE__ */ (0, Q.jsxs)("div", {
				className: "flex flex-col gap-3",
				children: [
					/* @__PURE__ */ (0, Q.jsx)(u, { children: "JavDB 上的演员卡" }),
					a.candidates.length ? a.candidates.map((e) => /* @__PURE__ */ (0, Q.jsx)(Rt, {
						card: e,
						picked: s.has(e.id),
						onPick: (t) => c((n) => {
							let r = new Set(n);
							return t ? r.add(e.id) : r.delete(e.id), r;
						})
					}, e.id)) : /* @__PURE__ */ (0, Q.jsx)(w, { children: "JavDB 上没有搜到这个名字。" }),
					a.candidates.length ? /* @__PURE__ */ (0, Q.jsx)(w, {
						role: "status",
						children: s.size ? h.text : "勾选她的演员卡；有碼与無碼两条记录都是她的话，两张都勾。"
					}) : null,
					/* @__PURE__ */ (0, Q.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [/* @__PURE__ */ (0, Q.jsx)(J, {
							variant: "secondary",
							size: "small",
							onClick: p,
							children: "关闭"
						}), a.candidates.length ? /* @__PURE__ */ (0, Q.jsx)(J, {
							variant: "primary",
							size: "small",
							disabled: e || !s.size || h.blocked,
							...Y(l.busy === "follow"),
							onClick: m,
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
var Bt = y({
	rowPaginationFeature: h,
	rowSelectionFeature: R,
	rowSortingFeature: I,
	columnVisibilityFeature: Ue,
	sortedRowModel: t(),
	paginatedRowModel: e()
}), Vt = {
	select: "选择",
	name: "名称",
	kind: "类型",
	origin: "来源",
	status: "状态",
	interval: "频率",
	fetched: "上次拉取",
	fresh: "上次新增",
	actions: "操作"
}, Ht = /* @__PURE__ */ new Set(["actions"]), Ut = Object.entries(Vt).map(([e, t]) => ({
	id: e,
	label: t,
	width: e === "select" ? 48 : e === "name" ? 300 : e === "actions" ? 208 : e === "fetched" ? 200 : 160,
	min: e === "select" ? 48 : e === "actions" ? 200 : e === "name" ? 300 : 112,
	max: e === "select" ? 48 : e === "name" ? 2e3 : 800,
	flex: e === "name",
	required: e === "select" || e === "name"
})), Wt = () => v.invalidateQueries({
	queryKey: Ee,
	exact: !0
}), $ = (e) => e.name || e.url;
function Gt(e) {
	try {
		return new URL(e).hostname.replace(/^www\./, "");
	} catch {
		return e;
	}
}
function Kt({ source: e }) {
	return e.enabled ? e.last_error ? /* @__PURE__ */ (0, Q.jsx)(xe, {
		variant: "caption",
		color: "rose",
		children: "拉取失败"
	}) : e.last_fetched_at ? /* @__PURE__ */ (0, Q.jsx)(xe, {
		variant: "caption",
		color: "lime",
		children: "正常"
	}) : /* @__PURE__ */ (0, Q.jsx)(xe, {
		variant: "caption",
		color: "gray",
		children: "未检查"
	}) : /* @__PURE__ */ (0, Q.jsx)(xe, {
		variant: "caption",
		color: "gray",
		children: "已暂停"
	});
}
function qt({ source: e }) {
	let t = e.entity_id ? {
		id: e.entity_id,
		has_image: !!e.has_image,
		image_version: e.image_version,
		avatar_focus: e.avatar_focus
	} : null;
	return /* @__PURE__ */ (0, Q.jsx)("span", {
		"aria-hidden": !0,
		className: `relative inline-grid size-8 shrink-0 place-items-center overflow-hidden rounded-full bg-background-tertiary-default text-caption-1-semibold text-text-secondary ${st}`,
		dangerouslySetInnerHTML: { __html: d($(e), t, null, "performer") }
	});
}
var Jt = (e, t) => e.entity_id !== null && t.has(e.entity_id) && e.page_name && e.page_name !== e.name ? e.page_name : "";
function Yt(e) {
	let t = /* @__PURE__ */ new Set(), n = /* @__PURE__ */ new Set();
	for (let { entity_id: r } of e) r !== null && (t.has(r) ? n.add(r) : t.add(r));
	return n;
}
function Xt(e, t) {
	let n = e.length === 1 ? e[0] : null;
	return P({
		title: n ? "移除订阅源" : `移除 ${e.length} 条订阅源`,
		body: n ? `将移除订阅源「${$(n)}」，之后不再拉取它的新作；已经拉到的新作保留。` : "将移除所选订阅源，之后不再拉取它们的新作；已经拉到的新作保留。",
		confirmLabel: n ? "移除订阅源" : "移除所选订阅源",
		danger: !0,
		onConfirm: t
	});
}
function Zt({ readOnly: e, toast: t }) {
	let n = G({
		queryKey: Ee,
		queryFn: ({ signal: e }) => Ke(e)
	}), r = _(), i = te("jav-feeds", Ut), o = n.data, c = (0, Z.useMemo)(() => o?.sources ?? [], [o]), [u, d] = (0, Z.useState)(/* @__PURE__ */ new Set()), [f, h] = (0, Z.useState)(1), [v, y] = (0, Z.useState)(20), [b, S] = (0, Z.useState)([]), T = be(c.length, v, f);
	(0, Z.useEffect)(() => {
		h((e) => Math.min(e, T.pages));
	}, [T.pages]), (0, Z.useEffect)(() => {
		d((e) => {
			let t = new Set(c.map((e) => e.id)), n = new Set([...e].filter((e) => t.has(e)));
			return n.size === e.size ? e : n;
		});
	}, [c]);
	let E = Te({
		mutationFn: async (e) => {
			let t = await A(e.ids, 4, async (t) => {
				e.action === "remove" ? await nt(t) : await $e(t, e.action === "enabled");
			});
			return {
				...e,
				results: t
			};
		},
		onSuccess: (e) => {
			let n = e.results.filter((e) => !e.ok), i = e.ids.length - n.length;
			if (d(/* @__PURE__ */ new Set()), Wt(), e.action === "remove" && i && t(`已移除 ${i} 条订阅源`), n.length) {
				let e = n[0];
				r.setError(`${n.length} 条没有写入：${e.ok ? "" : g(e.error)}`);
			}
		},
		onError: (e) => r.setError(g(e))
	}), O = (0, Z.useMemo)(() => Yt(c), [c]), j = (0, Z.useRef)({
		readOnly: e,
		shared: O,
		busy: null,
		toggle: () => {},
		fetch: () => {},
		remove: () => {}
	});
	j.current = {
		readOnly: e,
		shared: O,
		busy: r.busy,
		toggle: (e, t) => void r.run(`enabled-${e.id}`, (n) => $e(e.id, t, n), () => void Wt()),
		fetch: (e) => void r.run(`check-${e.id}`, (t) => m(t, [e.id]), () => void Wt()),
		remove: (e) => void Xt([e], async () => {
			await nt(e.id), t(`已移除订阅源「${$(e)}」`), Wt();
		})
	};
	let ne = (0, Z.useMemo)(() => {
		let e = oe(), t = (e) => () => Vt[e] || e;
		return e.columns([
			e.display({
				id: "select",
				header: (e) => /* @__PURE__ */ (0, Q.jsx)(a, {
					table: e.table,
					label: "全选本页订阅源",
					page: !0
				}),
				cell: (e) => /* @__PURE__ */ (0, Q.jsx)(z, {
					slot: null,
					isSelected: e.row.getIsSelected(),
					onChange: (t) => e.row.toggleSelected(t),
					"aria-label": `选择 ${$(e.row.original)}`
				})
			}),
			e.accessor($, {
				id: "name",
				header: t("name"),
				cell: (e) => {
					let t = Jt(e.row.original, j.current.shared);
					return /* @__PURE__ */ (0, Q.jsxs)("span", {
						className: "flex items-center gap-2 whitespace-nowrap text-body-medium text-text-primary",
						children: [
							/* @__PURE__ */ (0, Q.jsx)(qt, { source: e.row.original }),
							e.getValue(),
							t ? /* @__PURE__ */ (0, Q.jsx)("span", {
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
				cell: (e) => /* @__PURE__ */ (0, Q.jsx)("span", {
					className: "whitespace-nowrap",
					children: e.getValue()
				})
			}),
			e.accessor((e) => e.url, {
				id: "origin",
				header: t("origin"),
				cell: (e) => /* @__PURE__ */ (0, Q.jsxs)("a", {
					href: e.getValue(),
					target: "_blank",
					rel: "noopener noreferrer",
					title: "打开来源页面",
					className: "text-text-primary underline-offset-2 hover:underline",
					children: [/* @__PURE__ */ (0, Q.jsx)(Ze, {
						site: e.row.original.kind.startsWith("javdb") ? "javdb" : Gt(e.getValue()),
						label: Gt(e.getValue())
					}), /* @__PURE__ */ (0, Q.jsx)(l, {
						"aria-hidden": !0,
						className: "size-(--icon-inline) shrink-0"
					})]
				})
			}),
			e.accessor((e) => e.last_error ? "拉取失败" : e.enabled ? "已启用" : "已暂停", {
				id: "status",
				header: t("status"),
				cell: (e) => /* @__PURE__ */ (0, Q.jsx)(Kt, { source: e.row.original })
			}),
			e.accessor((e) => e.interval_minutes, {
				id: "interval",
				header: t("interval"),
				cell: (e) => /* @__PURE__ */ (0, Q.jsx)("span", {
					className: "whitespace-nowrap",
					children: k(e.getValue())
				})
			}),
			e.accessor((e) => e.last_fetched_at && Date.parse(e.last_fetched_at) || 0, {
				id: "fetched",
				header: t("fetched"),
				cell: (e) => /* @__PURE__ */ (0, Q.jsx)("span", {
					className: "whitespace-nowrap tabular-nums",
					children: e.row.original.last_fetched_at ? C(e.row.original.last_fetched_at) : "还没拉过"
				})
			}),
			e.accessor((e) => e.last_new_count, {
				id: "fresh",
				header: t("fresh"),
				cell: (e) => /* @__PURE__ */ (0, Q.jsx)("span", {
					className: "whitespace-nowrap tabular-nums",
					children: `${e.getValue()} 条`
				})
			}),
			e.display({
				id: "actions",
				header: t("actions"),
				cell: (e) => /* @__PURE__ */ (0, Q.jsxs)("span", {
					className: "flex items-center gap-1",
					children: [
						/* @__PURE__ */ (0, Q.jsx)(V, {
							"aria-label": `启用 ${$(e.row.original)}`,
							isSelected: e.row.original.enabled,
							isDisabled: j.current.readOnly,
							onChange: (t) => j.current.toggle(e.row.original, t)
						}),
						/* @__PURE__ */ (0, Q.jsx)(J, {
							variant: "secondary",
							size: "small",
							iconOnly: !0,
							leadingIcon: ee,
							"aria-label": `拉取 ${$(e.row.original)}`,
							disabled: j.current.readOnly,
							...Y(j.current.busy === `check-${e.row.original.id}`),
							onClick: () => j.current.fetch(e.row.original)
						}),
						/* @__PURE__ */ (0, Q.jsx)(J, {
							variant: "secondary",
							size: "small",
							iconOnly: !0,
							leadingIcon: ue,
							"aria-label": `移除 ${$(e.row.original)}`,
							disabled: j.current.readOnly,
							onClick: () => j.current.remove(e.row.original)
						})
					]
				})
			})
		]);
	}, []), re = (0, Z.useMemo)(() => Object.fromEntries([...u].map((e) => [String(e), !0])), [u]), P = s({
		features: Bt,
		data: c,
		columns: ne,
		getRowId: (e) => String(e.id),
		state: {
			rowSelection: re,
			sorting: b,
			pagination: {
				pageIndex: T.page - 1,
				pageSize: v
			},
			columnVisibility: i.visibility
		},
		onColumnVisibilityChange: i.change,
		onSortingChange: (e) => {
			S(e), h(1);
		},
		enableRowSelection: !0,
		onRowSelectionChange: (e) => {
			let t = typeof e == "function" ? e(re) : e;
			d(new Set(Object.entries(t).filter(([, e]) => e).map(([e]) => Number(e))));
		}
	});
	if (!o) return n.error ? /* @__PURE__ */ (0, Q.jsx)(X, {
		tone: "error",
		title: "打不开订阅源",
		children: g(n.error)
	}) : /* @__PURE__ */ (0, Q.jsx)(w, { children: "正在读订阅源。" });
	let F = () => void r.run("check", (e) => m(e), () => void Wt()), I = (e) => d((t) => {
		let n = new Set(t);
		return n.has(e) ? n.delete(e) : n.add(e), n;
	}), L = c.filter((e) => u.has(e.id)), R = c.filter((e) => e.last_error);
	return /* @__PURE__ */ (0, Q.jsxs)("div", {
		className: "flex flex-col gap-3",
		children: [/* @__PURE__ */ (0, Q.jsx)(zt, {
			readOnly: e,
			toast: t,
			onAdded: () => void Wt()
		}), /* @__PURE__ */ (0, Q.jsxs)("section", {
			"aria-label": "JAV 订阅列表",
			className: ie({
				padding: "none",
				className: "flex flex-col gap-4 px-6 py-5 max-sm:px-4"
			}),
			children: [
				/* @__PURE__ */ (0, Q.jsxs)("div", {
					"data-responsive-toolbar": "",
					children: [/* @__PURE__ */ (0, Q.jsxs)("div", {
						"data-toolbar-heading": "",
						children: [/* @__PURE__ */ (0, Q.jsx)("h3", {
							className: "text-title-2-medium text-text-primary",
							children: "JAV 订阅源"
						}), /* @__PURE__ */ (0, Q.jsx)("span", {
							className: "text-body-2-regular text-text-secondary",
							children: `${c.length.toLocaleString()} 个订阅源 · ${(Number(o.unread) || 0).toLocaleString()} 条未看`
						})]
					}), /* @__PURE__ */ (0, Q.jsxs)("div", {
						"data-toolbar-actions": "",
						children: [
							/* @__PURE__ */ (0, Q.jsx)(J, {
								onClick: F,
								disabled: e,
								...Y(r.busy === "check"),
								children: "立即拉取"
							}),
							/* @__PURE__ */ (0, Q.jsx)(De, {
								preferences: i,
								label: "JAV 订阅源"
							}),
							/* @__PURE__ */ (0, Q.jsx)(p, {
								label: "JAV 订阅源",
								sorting: b,
								onChange: (e) => {
									S(e), h(1);
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
									label: Vt[e]
								}))
							})
						]
					})]
				}),
				R.length || r.error ? /* @__PURE__ */ (0, Q.jsxs)("div", {
					className: "flex flex-col gap-3",
					children: [R.length ? /* @__PURE__ */ (0, Q.jsx)(X, {
						tone: "error",
						title: `${R.length.toLocaleString()} 条订阅源拉取失败`,
						extra: /* @__PURE__ */ (0, Q.jsx)("ul", {
							className: "flex flex-col gap-0.5 text-body-2-regular",
							children: R.map((e) => /* @__PURE__ */ (0, Q.jsx)("li", {
								className: "min-w-0 truncate",
								title: e.last_error || "",
								children: `${$(e)}：${H(e.last_error || "") || "未说明原因"}`
							}, e.id))
						}),
						children: "这些订阅源这一轮没有取到新条目。"
					}) : null, r.error ? /* @__PURE__ */ (0, Q.jsx)(N, { children: r.error }) : null]
				}) : null,
				/* @__PURE__ */ (0, Q.jsxs)(he, {
					visible: L.length > 0,
					label: "订阅源批量操作",
					count: `已选 ${L.length} 条订阅源`,
					children: [
						/* @__PURE__ */ (0, Q.jsx)(J, {
							variant: "secondary",
							size: "small",
							disabled: e,
							...Y(E.isPending),
							onClick: () => E.mutate({
								ids: L.map((e) => e.id),
								action: "enabled"
							}),
							children: "启用"
						}),
						/* @__PURE__ */ (0, Q.jsx)(J, {
							variant: "secondary",
							size: "small",
							disabled: e,
							...Y(E.isPending),
							onClick: () => E.mutate({
								ids: L.map((e) => e.id),
								action: "paused"
							}),
							children: "暂停"
						}),
						/* @__PURE__ */ (0, Q.jsx)(J, {
							variant: "danger",
							size: "small",
							disabled: e,
							...Y(E.isPending),
							onClick: () => void Xt(L, () => E.mutateAsync({
								ids: L.map((e) => e.id),
								action: "remove"
							})),
							children: "移除"
						}),
						/* @__PURE__ */ (0, Q.jsx)(J, {
							variant: "ghost",
							size: "small",
							onClick: () => d(/* @__PURE__ */ new Set()),
							children: "取消选择"
						})
					]
				}),
				c.length ? /* @__PURE__ */ (0, Q.jsx)(M, {
					follow: !0,
					preferences: i,
					onRowClick: (e) => I(Number(e)),
					children: /* @__PURE__ */ (0, Q.jsxs)(rt, {
						"aria-label": "JAV 订阅源",
						size: "sm",
						sortDescriptor: b[0] ? {
							column: b[0].id,
							direction: b[0].desc ? "descending" : "ascending"
						} : void 0,
						onSortChange: (e) => P.getColumn(String(e.column))?.toggleSorting(e.direction === "descending"),
						children: [/* @__PURE__ */ (0, Q.jsxs)(le, { children: [P.getHeaderGroups()[0].headers.map((e) => {
							let t = Fe(e.column.columnDef.header, e.getContext());
							return /* @__PURE__ */ (0, Q.jsx)(Re, {
								id: e.id,
								isRowHeader: e.column.id === "name",
								allowsSorting: e.column.getCanSort(),
								...i.columnProps(e.id),
								children: ({ sortDirection: n }) => /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [Ht.has(e.column.id) ? /* @__PURE__ */ (0, Q.jsx)(Ie, { children: t }) : /* @__PURE__ */ (0, Q.jsxs)("span", {
									className: "flex items-center gap-0.5",
									children: [t, e.column.getCanSort() ? /* @__PURE__ */ (0, Q.jsx)("span", {
										"data-sort-indicator": !0,
										"data-direction": n || void 0,
										children: /* @__PURE__ */ (0, Q.jsx)(qe, {})
									}) : null]
								}), /* @__PURE__ */ (0, Q.jsx)(x, {
									preferences: i,
									id: e.id
								})] })
							}, e.id);
						}), /* @__PURE__ */ (0, Q.jsx)(Re, {
							id: "remaining-space",
							"aria-label": "行空白区域",
							"data-table-space": "",
							width: i.spaceWidth,
							minWidth: 0
						})] }), /* @__PURE__ */ (0, Q.jsx)(Je, { children: P.getRowModel().rows.map((e) => /* @__PURE__ */ (0, Q.jsxs)(We, {
							id: e.id,
							"data-follow-selected": e.getIsSelected() || void 0,
							children: [e.getVisibleCells().map((e) => /* @__PURE__ */ (0, Q.jsx)(we, { children: Fe(e.column.columnDef.cell, e.getContext()) }, e.id)), /* @__PURE__ */ (0, Q.jsx)(we, { "data-table-space": "" })]
						}, e.id)) })]
					})
				}) : /* @__PURE__ */ (0, Q.jsx)(Be, {
					icon: ye,
					title: "还没有订阅源",
					size: "compact",
					actions: e ? void 0 : /* @__PURE__ */ (0, Q.jsx)(ce, {
						target: "input[aria-label=\"女优名\"]",
						children: "添加订阅"
					}),
					children: "在上面按女优名添加，或在人物页点「订阅新作」。"
				}),
				c.length ? /* @__PURE__ */ (0, Q.jsx)(D, {
					label: "JAV 订阅",
					total: T.total,
					unit: "个订阅源",
					pagination: {
						pageIndex: T.page - 1,
						pageSize: v
					},
					onChange: (e) => {
						y(e.pageSize), h(e.pageIndex + 1);
					}
				}) : null,
				/* @__PURE__ */ (0, Q.jsx)("footer", {
					className: "-mx-6 -mb-5 flex flex-wrap items-center gap-2 border-t border-separator-border rounded-b-2xl bg-card-footer px-6 py-4 max-sm:-mx-4 max-sm:px-4",
					children: /* @__PURE__ */ (0, Q.jsx)("span", {
						role: "status",
						className: "mr-auto text-body-2-regular text-text-secondary",
						children: `未看 ${(Number(o.unread) || 0).toLocaleString()} · 已启用 ${c.filter((e) => e.enabled).length.toLocaleString()} / ${c.length.toLocaleString()}`
					})
				})
			]
		})]
	});
}
//#endregion
//#region src/react/follow-manage/follow-manage-page.tsx
var Qt = [
	["list", "关注列表"],
	["add", "添加关注"],
	["feeds", "JAV 订阅源"]
], $t = (e) => Qt.some(([t]) => t === e);
function en({ term: e, figure: t, unit: n }) {
	return /* @__PURE__ */ (0, Q.jsxs)("div", {
		className: ie({
			padding: "none",
			className: "flex flex-col gap-3 px-6 py-5 max-sm:gap-2 max-sm:p-4"
		}),
		children: [/* @__PURE__ */ (0, Q.jsx)("span", {
			className: "text-body-medium text-text-secondary",
			children: e
		}), /* @__PURE__ */ (0, Q.jsxs)("b", {
			"data-follow-reading": "",
			className: `flex min-w-0 flex-wrap items-baseline gap-x-1 tabular-nums text-text-primary ${t >= 1e6 ? "text-headline-medium" : t >= 1e5 ? "text-title-3-medium" : "text-title-1-medium"}`,
			children: [/* @__PURE__ */ (0, Q.jsx)("span", {
				className: "min-w-0 wrap-anywhere",
				children: t.toLocaleString()
			}), /* @__PURE__ */ (0, Q.jsx)("small", {
				className: "whitespace-nowrap text-body-2-regular text-text-secondary",
				children: ` ${n}`
			})]
		})]
	});
}
function tn(e) {
	let { route: t, savePreference: n, toast: r, openFollow: a, readOnly: o, readOnlyMessage: s, writerUrl: l } = e, [u, d] = (0, Z.useState)($t(e.tab) ? e.tab : "list"), [f, p] = (0, Z.useState)(Math.max(1, Math.floor(e.page) || 1)), [m, h] = (0, Z.useState)(() => L(e.sort, e.dir).sort), [g, _] = (0, Z.useState)(() => L(e.sort, e.dir).dir), [v, ee] = (0, Z.useState)(Ye(e.layout) ? e.layout : "default"), [y, b] = (0, Z.useState)(Ne(e.pageSize)), [x, te] = (0, Z.useState)(/* @__PURE__ */ new Set()), C = G({
		queryKey: E,
		queryFn: ({ signal: e }) => Le(e)
	}), w = G({
		queryKey: S,
		queryFn: ({ signal: e }) => ge(e)
	}), T = G({
		queryKey: Ee,
		queryFn: ({ signal: e }) => Ke(e)
	}), D = C.data || { sources: [] }, O = w.data || {
		root: "",
		providers: []
	}, k = D.sources;
	(0, Z.useEffect)(() => {
		te((e) => {
			let t = q(e, k);
			return t.size === e.size ? e : t;
		});
	}, [k]);
	let A = (e) => {
		let n = e.sort ?? m, r = e.dir ?? g;
		t({
			tab: e.tab ?? u,
			page: e.page ?? f,
			sort: n === "checked" ? "" : n,
			dir: r === it[n] ? "" : r
		});
	}, ne = de(k), re = k.filter(Ae).length, M = k.filter((e) => e.enabled).length, N = (O.providers || []).filter((e) => e.requirement === "required" && !B(e)).length, P = new Set((T.data?.sources || []).map((e) => e.entity_id ?? `source-${e.id}`)).size;
	return /* @__PURE__ */ (0, Q.jsxs)(at, { children: [
		o ? /* @__PURE__ */ (0, Q.jsx)(X, {
			tone: "warning",
			title: "本机只能浏览",
			extra: l ? /* @__PURE__ */ (0, Q.jsx)("p", {
				className: "text-body-2-regular",
				children: /* @__PURE__ */ (0, Q.jsx)(c, {
					href: l,
					children: "前往写入端管理关注"
				})
			}) : void 0,
			children: s
		}) : null,
		/* @__PURE__ */ (0, Q.jsxs)("div", {
			className: ot,
			"aria-label": "关注概览",
			children: [
				/* @__PURE__ */ (0, Q.jsx)(en, {
					term: "关注创作者",
					figure: ne.length,
					unit: "位"
				}),
				/* @__PURE__ */ (0, Q.jsx)(en, {
					term: "启用来源",
					figure: M,
					unit: `/ ${k.length}`
				}),
				/* @__PURE__ */ (0, Q.jsx)(en, {
					term: "检查失败",
					figure: re,
					unit: "个来源"
				}),
				/* @__PURE__ */ (0, Q.jsx)(en, {
					term: "未看更新",
					figure: D.counts?.new || 0,
					unit: "条"
				}),
				/* @__PURE__ */ (0, Q.jsx)(en, {
					term: "JAV 订阅",
					figure: P,
					unit: "位"
				}),
				/* @__PURE__ */ (0, Q.jsx)(en, {
					term: "未看新作",
					figure: T.data?.unread || 0,
					unit: "条"
				})
			]
		}),
		/* @__PURE__ */ (0, Q.jsxs)(i, {
			selectedKey: u,
			onSelectionChange: (e) => {
				let t = String(e);
				$t(t) && (d(t), A({ tab: t }));
			},
			className: "flex flex-col gap-6",
			children: [
				/* @__PURE__ */ (0, Q.jsx)(ct, {
					"aria-label": "关注管理区域",
					"data-section-nav": !0,
					"data-section-items": !0,
					className: "flex max-w-full flex-nowrap overflow-x-auto",
					children: Qt.map(([e, t]) => /* @__PURE__ */ (0, Q.jsx)(j, {
						id: e,
						"data-pill-selected": u === e ? "" : void 0,
						"data-pill-variant": "gray",
						className: "cursor-pointer whitespace-nowrap",
						children: t
					}, e))
				}),
				/* @__PURE__ */ (0, Q.jsx)(U, {
					id: "list",
					className: "flex flex-col gap-4",
					children: /* @__PURE__ */ (0, Q.jsx)(dt, {
						data: D,
						sort: m,
						dir: g,
						page: f,
						layout: v,
						pageSize: y,
						selected: x,
						readOnly: o,
						toast: r,
						openFollow: a,
						onAdd: () => {
							d("add"), A({ tab: "add" });
						},
						onSort: (e, t) => {
							h(e), _(t), p(1), A({
								sort: e,
								dir: t,
								page: 1
							});
						},
						onPage: (e) => {
							p(e), A({ page: e });
						},
						onSelected: te,
						onLayout: (e) => {
							ee(e), p(1), n({ layout: e }), A({ page: 1 });
						},
						onPageSize: (e) => {
							b(e), p(1), n({ pageSize: e }), A({ page: 1 });
						}
					})
				}),
				/* @__PURE__ */ (0, Q.jsxs)(U, {
					id: "add",
					className: "flex flex-col gap-8",
					children: [/* @__PURE__ */ (0, Q.jsx)(St, {
						data: D,
						credentials: O,
						readOnly: o,
						toast: r
					}), /* @__PURE__ */ (0, Q.jsx)(Ft, {
						groups: D.author_aliases || [],
						readOnly: o,
						toast: r,
						suggestions: D.alias_suggestions || [],
						sources: D.sources
					})]
				}),
				/* @__PURE__ */ (0, Q.jsx)(U, {
					id: "feeds",
					className: "flex flex-col gap-4",
					children: /* @__PURE__ */ (0, Q.jsx)(Zt, {
						readOnly: o,
						toast: r
					})
				})
			]
		}),
		/* @__PURE__ */ (0, Q.jsx)("div", { children: /* @__PURE__ */ (0, Q.jsxs)(Ve, {
			variant: "secondary",
			href: "/settings/subscriptions",
			children: ["来源与订阅设置", N ? `（${N}）` : ""]
		}) })
	] });
}
//#endregion
export { tn as FollowManagePage };

//# debugId=d24e1d7f-d204-4120-8c52-d8db621d5248