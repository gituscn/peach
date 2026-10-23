(function() {
	try {
		var e = typeof window < "u" ? window : typeof global < "u" ? global : typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : {}, t = new e.Error().stack;
		t && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[t] = "bb93b80f-2b78-4d32-8341-6b8a062829a6", e._sentryDebugIdIdentifier = "sentry-dbid-bb93b80f-2b78-4d32-8341-6b8a062829a6");
	} catch {}
})();
import { As as e, Ba as t, Bo as n, Bs as r, Cs as i, Ds as a, Es as o, Fs as s, Gl as c, Is as l, Ls as u, Ms as d, Ns as f, Os as p, Ps as m, Ro as ee, Ss as h, Ts as te, Ul as g, Va as _, Vs as v, Wa as y, Wl as b, X as x, Yo as S, au as C, cu as w, fs as T, hn as E, iu as D, js as O, ks as k, oo as ne, pu as A, ro as j, so as M, su as N, uu as P, ws as F, xa as I, xs as re, za as L, zs as R } from "./peach-app.js";
import { t as z } from "./peach-app.code-block-De9b0xOF.js";
import { t as B } from "./peach-app.page-BYr6f5ud.js";
import { n as V, t as H } from "./peach-app.error-excerpt-5tEehQuQ.js";
//#region src/react/activity/background-issues.tsx
var U = /* @__PURE__ */ A(P(), 1), W = w(), G = ["background-issues"];
function K() {
	let e = (0, U.useId)(), t = C({
		queryKey: G,
		queryFn: ({ signal: e }) => g("/api/background-issues", e),
		refetchInterval: 3e4
	}).data?.issues || [];
	return t.length ? /* @__PURE__ */ (0, W.jsxs)("section", {
		"aria-labelledby": e,
		className: "flex min-w-0 flex-col gap-3",
		children: [/* @__PURE__ */ (0, W.jsx)("h3", {
			id: e,
			className: "text-title-2-medium text-text-primary",
			children: "需要处理"
		}), /* @__PURE__ */ (0, W.jsx)("ul", {
			className: "flex min-w-0 flex-col gap-3",
			children: t.map((e) => /* @__PURE__ */ (0, W.jsx)("li", { children: /* @__PURE__ */ (0, W.jsx)(q, { issue: e }) }, e.key))
		})]
	}) : null;
}
function q({ issue: e }) {
	let t = N(), r = D({
		mutationFn: () => b(e.retry, {}),
		onSuccess: () => {
			t.invalidateQueries({ queryKey: G });
		}
	}), i = e.since ? `自 ${m(e.since)} 起` : `发现于 ${m(e.noticed_at)}`;
	return /* @__PURE__ */ (0, W.jsx)(M, {
		tone: "error",
		title: e.title,
		action: /* @__PURE__ */ (0, W.jsxs)("div", {
			className: "flex flex-wrap items-center gap-2",
			children: [/* @__PURE__ */ (0, W.jsx)(y, {
				href: e.href,
				size: "small",
				trailingIcon: n,
				children: e.link_label
			}), e.retry ? /* @__PURE__ */ (0, W.jsx)(T, {
				variant: "secondary",
				size: "small",
				disabled: !e.retry_available,
				...j(r.isPending),
				onClick: () => r.mutate(),
				children: "立即重试"
			}) : null]
		}),
		children: r.error ? `${i}\n没有重试：${c(r.error)}` : i
	});
}
//#endregion
//#region src/react/activity/activity-page.tsx
var J = {
	succeeded: "lime",
	failed: "rose",
	cancelled: "neutral",
	interrupted: "yellow",
	running: "blue",
	pending: "neutral"
};
function Y({ run: e }) {
	let t = e.status === "succeeded" && k(e);
	return /* @__PURE__ */ (0, W.jsx)(E, {
		color: t ? "yellow" : J[e.status] ?? "neutral",
		children: t ? "发现问题" : R(e.status)
	});
}
function ie({ rows: e }) {
	return /* @__PURE__ */ (0, W.jsx)("ul", {
		className: "flex min-w-0 flex-col",
		children: e.map((e) => {
			let t = a(e);
			return /* @__PURE__ */ (0, W.jsxs)("li", {
				"data-status": e.status,
				"data-followup-key": e.followup_key,
				className: "flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 border-t border-separator-border px-5 py-2.5",
				children: [
					/* @__PURE__ */ (0, W.jsx)("span", {
						className: "min-w-0 break-words text-caption-1-regular text-text-primary",
						children: e.task_label
					}),
					/* @__PURE__ */ (0, W.jsx)(Y, { run: e }),
					t ? /* @__PURE__ */ (0, W.jsx)("span", {
						className: "min-w-0 break-words text-caption-1-regular text-text-secondary",
						children: t
					}) : null,
					/* @__PURE__ */ (0, W.jsx)("div", {
						className: "w-full min-w-0",
						children: /* @__PURE__ */ (0, W.jsx)(I, {
							summary: "技术详情",
							contentClassName: "pb-2.5",
							children: /* @__PURE__ */ (0, W.jsx)(z, {
								code: JSON.stringify(e.result_summary, null, 2),
								language: "json",
								label: `${e.task_label}技术详情`
							})
						})
					})
				]
			}, e.id);
		})
	});
}
function X({ run: t, meta: n, children: r, footer: i, followups: a }) {
	return /* @__PURE__ */ (0, W.jsxs)("li", {
		id: `run-${t.id}`,
		"data-status": t.status,
		"data-task-key": t.task_key,
		"data-run-id": t.id,
		className: _({
			padding: "none",
			bordered: "line",
			className: t.status === "failed" ? "flex flex-col border-border-error-default" : "flex flex-col"
		}),
		children: [
			/* @__PURE__ */ (0, W.jsxs)("div", {
				className: "flex flex-col gap-1.5 px-5 pt-5 pb-4",
				children: [
					/* @__PURE__ */ (0, W.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [/* @__PURE__ */ (0, W.jsx)("strong", {
							className: "min-w-0 break-words text-title-1-medium text-text-primary",
							children: t.task_label
						}), /* @__PURE__ */ (0, W.jsx)(Y, { run: t })]
					}),
					/* @__PURE__ */ (0, W.jsx)("p", {
						className: "text-caption-1-regular text-text-secondary",
						children: n
					}),
					r
				]
			}),
			a?.length ? /* @__PURE__ */ (0, W.jsx)("div", {
				className: "border-t border-separator-border px-5 py-2.5",
				children: /* @__PURE__ */ (0, W.jsx)(I, {
					summary: `任务明细 · ${a.length} 项`,
					contentClassName: "pb-2.5",
					defaultOpen: a.some((t) => e(t)),
					children: /* @__PURE__ */ (0, W.jsx)(ie, { rows: a })
				})
			}) : null,
			Object.keys(t.result_summary || {}).length ? /* @__PURE__ */ (0, W.jsx)("div", {
				className: "border-t border-separator-border px-5 py-2.5",
				children: /* @__PURE__ */ (0, W.jsx)(I, {
					summary: "技术详情",
					contentClassName: "pb-2.5",
					children: /* @__PURE__ */ (0, W.jsx)(z, {
						code: JSON.stringify(t.result_summary, null, 2),
						language: "json",
						label: `${t.task_label}技术详情`
					})
				})
			}) : null,
			i ? /* @__PURE__ */ (0, W.jsx)("div", {
				className: "flex min-h-14 flex-col justify-center rounded-b-2xl border-t border-separator-border bg-card-footer px-5 py-3",
				children: /* @__PURE__ */ (0, W.jsx)(V, {
					text: i,
					className: "text-caption-1-regular text-text-secondary"
				})
			}) : null
		]
	});
}
function ae({ run: e, followups: n }) {
	let r = e.progress_total || 0, a = e.progress_current || 0, o = e.progress_label || "正在进行", s = i(e.elapsed_seconds), c = [h[e.trigger] || e.trigger, s && `已跑 ${s}`].filter(Boolean).join(" · ");
	return /* @__PURE__ */ (0, W.jsx)(X, {
		run: e,
		meta: c,
		followups: n,
		children: r > 0 ? /* @__PURE__ */ (0, W.jsxs)("div", {
			className: "flex flex-col gap-1.5",
			children: [/* @__PURE__ */ (0, W.jsx)(L, {
				label: o,
				value: Math.min(a, r),
				max: r
			}), /* @__PURE__ */ (0, W.jsxs)("p", {
				className: "text-caption-1-regular text-text-secondary wrap-anywhere",
				children: [
					o,
					" · ",
					u(a, r),
					" 项"
				]
			})]
		}) : /* @__PURE__ */ (0, W.jsx)(t, { label: o })
	});
}
function Z({ run: e, followups: t, runs: a, latest: o }) {
	let s = r(e.result_summary).filter((t) => t !== e.error), c = v(e), u = l(e, o), d = i(e.elapsed_seconds), f = a && a.length > 1 ? a[a.length - 1] : void 0, p = (f ? [
		h[e.trigger] || e.trigger,
		`近 ${a.length} 轮`,
		`${m(f.finished_at)} – ${m(e.finished_at)}`
	] : [
		h[e.trigger] || e.trigger,
		m(e.finished_at),
		d && `用时 ${d}`
	]).filter(Boolean).join(" · ");
	return /* @__PURE__ */ (0, W.jsxs)(X, {
		run: e,
		meta: p,
		footer: e.error,
		followups: t,
		children: [
			s.length ? /* @__PURE__ */ (0, W.jsx)("ul", {
				className: "list-disc space-y-1 pl-5 text-caption-1-regular text-text-secondary wrap-anywhere",
				children: s.map((e, t) => /* @__PURE__ */ (0, W.jsx)("li", { children: e }, t))
			}) : null,
			c.length ? /* @__PURE__ */ (0, W.jsx)(I, {
				summary: `问题详情 · ${c.length} 项`,
				contentClassName: "pt-2",
				children: /* @__PURE__ */ (0, W.jsx)(H, {
					label: "任务问题详情",
					children: /* @__PURE__ */ (0, W.jsx)("ul", {
						className: "flex min-w-0 flex-col gap-3",
						"data-task-issues": "",
						children: c.map((e, t) => /* @__PURE__ */ (0, W.jsxs)("li", {
							className: "flex min-w-0 flex-col gap-1 text-body-2-regular wrap-anywhere",
							children: [/* @__PURE__ */ (0, W.jsx)("p", {
								className: "text-body-regular text-text-primary",
								children: [
									e.label,
									e.provider,
									e.kind
								].filter(Boolean).join(" · ")
							}), /* @__PURE__ */ (0, W.jsx)(V, {
								text: e.error,
								className: "text-text-primary"
							})]
						}, `${e.source}-${t}`))
					})
				})
			}) : k(e) && ["follow-check", "feed-check"].includes(e.task_key) ? /* @__PURE__ */ (0, W.jsx)("p", {
				className: "text-body-2-regular text-text-secondary",
				children: "未取得本轮逐项详情，可到来源列表查看检查结果。"
			}) : null,
			u ? /* @__PURE__ */ (0, W.jsx)(y, {
				href: u.href,
				size: "small",
				trailingIcon: n,
				className: "self-start",
				children: u.label
			}) : null
		]
	});
}
function Q({ title: e, children: t }) {
	let n = (0, U.useId)();
	return /* @__PURE__ */ (0, W.jsxs)("section", {
		"aria-labelledby": n,
		className: "flex min-w-0 flex-col gap-3",
		children: [/* @__PURE__ */ (0, W.jsx)("h3", {
			id: n,
			className: "text-title-2-medium text-text-primary",
			children: e
		}), t]
	});
}
function $({ live: e = !1, children: t }) {
	return /* @__PURE__ */ (0, W.jsx)("ul", {
		"aria-live": e ? "polite" : void 0,
		className: "flex min-w-0 flex-col gap-3",
		children: t
	});
}
function oe() {
	let t = C({
		queryKey: re,
		queryFn: ({ signal: e }) => te(e),
		refetchInterval: (e) => s(e.state.data)
	}), n = t.data, r = n?.finished, [i, a] = (0, U.useState)([]), [l, u] = (0, U.useState)(!1), [m, h] = (0, U.useState)(r);
	r !== m && (h(r), i.length && m && a(f(i, m)));
	let g = D({
		mutationFn: ({ oldest: e }) => F(e),
		onSuccess: (e, { shown: t }) => {
			a((n) => f(n, t, e.finished || [])), u(!!e.finished_has_more);
		}
	}), _ = t.error ? c(t.error) : "";
	if (!n) return /* @__PURE__ */ (0, W.jsx)(B, { children: /* @__PURE__ */ (0, W.jsx)(M, {
		tone: "error",
		children: _ || "读取任务中心失败"
	}) });
	let v = f(n.finished || [], i), y = [
		...n.running || [],
		...n.skipped || [],
		...v
	], b = p(y), w = new Set(y.map((e) => e.id)), E = (e) => e.filter((e) => !(e.followup_key && e.parent_run_id != null && w.has(e.parent_run_id))), k = E(v), A = k[k.length - 1], N = !!A && (i.length ? l : !!n.finished_has_more), P = () => {
		!g.isPending && A && g.mutate({
			oldest: A,
			shown: v
		});
	}, I = k.filter((t) => b.get(t.id)?.some(e)), L = E(n.running || []), R = E(n.skipped || []), z = k.filter((e) => !I.includes(e) && !R.some((t) => t.id === e.id)), V = o(z, (e) => O(e) && !b.get(e.id)?.length), H = d(y), G = !L.length && !I.length && !R.length && !z.length;
	return /* @__PURE__ */ (0, W.jsxs)(B, { children: [
		_ ? /* @__PURE__ */ (0, W.jsx)(M, {
			tone: "error",
			children: _
		}) : null,
		n.available === !1 ? /* @__PURE__ */ (0, W.jsx)(M, {
			tone: "warning",
			children: n.message || "数据库尚未准备好任务记录表"
		}) : null,
		/* @__PURE__ */ (0, W.jsx)(K, {}),
		G ? /* @__PURE__ */ (0, W.jsx)(ne, {
			icon: S,
			title: "还没有任务记录",
			children: "扫描、追更检查、批量操作和命令行批处理跑起来之后，这里会显示它们的进度与结果。"
		}) : /* @__PURE__ */ (0, W.jsxs)(W.Fragment, { children: [
			/* @__PURE__ */ (0, W.jsx)(Q, {
				title: "正在进行",
				children: L.length || I.length ? /* @__PURE__ */ (0, W.jsxs)($, {
					live: !0,
					children: [L.map((e) => /* @__PURE__ */ (0, W.jsx)(ae, {
						run: e,
						followups: b.get(e.id)
					}, e.id)), I.map((e) => /* @__PURE__ */ (0, W.jsx)(Z, {
						run: e,
						latest: H.has(e.id),
						followups: b.get(e.id)
					}, e.id))]
				}) : /* @__PURE__ */ (0, W.jsx)(M, {
					tone: "neutral",
					children: "没有任务在跑。"
				})
			}),
			R.length ? /* @__PURE__ */ (0, W.jsx)(Q, {
				title: "本次未执行",
				children: /* @__PURE__ */ (0, W.jsx)($, { children: R.map((e) => /* @__PURE__ */ (0, W.jsx)(Z, {
					run: e,
					latest: H.has(e.id),
					followups: b.get(e.id)
				}, e.id)) })
			}) : null,
			z.length || N ? /* @__PURE__ */ (0, W.jsxs)(Q, {
				title: "最近完成",
				children: [
					z.length ? /* @__PURE__ */ (0, W.jsx)($, { children: V.map(({ run: e, runs: t }) => /* @__PURE__ */ (0, W.jsx)(Z, {
						run: e,
						runs: t,
						latest: H.has(e.id),
						followups: b.get(e.id)
					}, e.id)) }) : null,
					g.error ? /* @__PURE__ */ (0, W.jsx)(M, {
						tone: "error",
						children: c(g.error)
					}) : null,
					N ? /* @__PURE__ */ (0, W.jsx)(T, {
						variant: "secondary",
						size: "small",
						leadingIcon: ee,
						className: "self-start",
						...j(g.isPending),
						onClick: P,
						children: "加载更早"
					}) : null
				]
			}) : null
		] }),
		/* @__PURE__ */ (0, W.jsx)(x, {})
	] });
}
//#endregion
export { oe as ActivityPage };

//# debugId=bb93b80f-2b78-4d32-8341-6b8a062829a6