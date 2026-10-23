(function() {
	try {
		var e = typeof window < "u" ? window : typeof global < "u" ? global : typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : {}, t = new e.Error().stack;
		t && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[t] = "809acbf1-2e83-4e43-91fe-883feddbd561", e._sentryDebugIdIdentifier = "sentry-dbid-809acbf1-2e83-4e43-91fe-883feddbd561");
	} catch {}
})();
import { Gl as e, Kl as t, So as n, Va as r, Xl as i, Zl as a, au as o, ci as s, cu as c, fs as l, li as u, oo as d, pu as f, q as p, so as m, ui as h, un as g, uu as _ } from "./peach-app.js";
import { t as v } from "./peach-app.page-BYr6f5ud.js";
//#region src/react/quality-goals/quality-goals-page.tsx
var y = /* @__PURE__ */ f(_(), 1), b = c();
function x({ item: e, openItem: n, searchResources: o, javTitleHtml: s, javDisplayName: c, srcBadge: u }) {
	let d = () => n(e.id);
	return /* @__PURE__ */ (0, b.jsxs)("li", {
		"data-goal-id": e.id,
		className: r({
			padding: "none",
			bordered: "soft",
			className: "flex flex-col gap-3 p-3"
		}),
		children: [/* @__PURE__ */ (0, b.jsxs)("div", {
			className: "flex min-w-0 gap-4",
			children: [/* @__PURE__ */ (0, b.jsxs)("button", {
				type: "button",
				onClick: d,
				"aria-label": `打开 ${c(e)}`,
				className: "relative inline-grid w-card-cover shrink-0 self-start aspect-card-cover cursor-pointer place-items-center overflow-hidden rounded-2lg bg-background-tertiary-default",
				children: [/* @__PURE__ */ (0, b.jsx)("span", {
					className: "text-caption-1-regular text-text-secondary",
					children: "暂无预览"
				}), /* @__PURE__ */ (0, b.jsx)("img", {
					src: h(e),
					alt: "",
					loading: "lazy",
					onError: (e) => e.currentTarget.remove(),
					className: "absolute inset-0 size-full object-contain"
				})]
			}), /* @__PURE__ */ (0, b.jsxs)("div", {
				className: "flex min-w-0 flex-col gap-1.5",
				children: [
					/* @__PURE__ */ (0, b.jsx)("h3", {
						className: "text-headline-medium text-text-primary",
						children: /* @__PURE__ */ (0, b.jsx)("button", {
							type: "button",
							onClick: d,
							title: c(e),
							className: "line-clamp-2 w-full cursor-pointer text-left wrap-anywhere",
							dangerouslySetInnerHTML: { __html: s(e) }
						})
					}),
					/* @__PURE__ */ (0, b.jsxs)("p", {
						className: "flex flex-wrap items-center gap-2 text-body-2-regular text-text-secondary",
						children: [
							/* @__PURE__ */ (0, b.jsx)("span", {
								className: "contents",
								dangerouslySetInnerHTML: { __html: u(e.location, e.cost) }
							}),
							/* @__PURE__ */ (0, b.jsx)("span", { children: t[e.location] ?? e.location }),
							/* @__PURE__ */ (0, b.jsx)("span", { children: i(e.duration) }),
							/* @__PURE__ */ (0, b.jsx)("span", { children: Number(e.size) > 0 ? a(Number(e.size)) : "大小未知" })
						]
					}),
					e.reason ? /* @__PURE__ */ (0, b.jsx)("p", {
						className: "border-t border-separator-border pt-3 text-body-2-regular text-text-secondary wrap-anywhere",
						children: e.reason
					}) : null
				]
			})]
		}), /* @__PURE__ */ (0, b.jsxs)("footer", {
			className: "flex flex-wrap justify-end gap-2",
			children: [e.code ? /* @__PURE__ */ (0, b.jsx)(l, {
				variant: "secondary",
				size: "small",
				onClick: () => o({
					code: e.code,
					title: c(e),
					origin: `asset:${e.id}`,
					searchReason: e.reason || "",
					duration: e.duration,
					cover: h(e)
				}),
				children: "查找资源"
			}) : null, /* @__PURE__ */ (0, b.jsx)(l, {
				variant: "secondary",
				size: "small",
				onClick: d,
				children: "查看版本"
			})]
		})]
	});
}
function S({ toast: t, ...r }) {
	let [i, a] = (0, y.useState)(null), c = o({
		queryKey: s,
		queryFn: ({ signal: e }) => u(e)
	}), l = c.data;
	if (!l) return /* @__PURE__ */ (0, b.jsx)(v, { children: /* @__PURE__ */ (0, b.jsx)(m, {
		tone: "error",
		title: "高清版目标读取失败",
		children: c.error ? e(c.error) : "未取得高清版目标，请刷新页面重试。"
	}) });
	let f = l.items || [];
	return f.length ? /* @__PURE__ */ (0, b.jsxs)(v, { children: [
		/* @__PURE__ */ (0, b.jsx)(g, {
			label: "待升级",
			figure: `${Number(l.total || 0).toLocaleString()} 部作品`,
			flush: !0
		}),
		/* @__PURE__ */ (0, b.jsx)("ul", {
			className: "card-grid-cover gap-5",
			children: f.map((e) => /* @__PURE__ */ (0, b.jsx)(x, {
				item: e,
				...r,
				searchResources: a
			}, e.id))
		}),
		Number(l.total || 0) > f.length ? /* @__PURE__ */ (0, b.jsx)("p", {
			className: "mt-6 text-center text-caption-1-regular text-text-secondary",
			children: `显示前 ${f.length.toLocaleString()} 部，共 ${Number(l.total).toLocaleString()} 部。`
		}) : null,
		/* @__PURE__ */ (0, b.jsx)(p, {
			prefill: i,
			close: () => a(null),
			receipt: t
		})
	] }) : /* @__PURE__ */ (0, b.jsx)(v, { children: /* @__PURE__ */ (0, b.jsx)(d, {
		icon: n,
		title: "没有标记中的高清版目标",
		children: "现有版本都已满足条件，或还没有加入追踪。"
	}) });
}
//#endregion
export { S as QualityGoalsPage };

//# debugId=809acbf1-2e83-4e43-91fe-883feddbd561