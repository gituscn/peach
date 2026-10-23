(function() {
	try {
		var e = typeof window < "u" ? window : typeof global < "u" ? global : typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : {}, t = new e.Error().stack;
		t && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[t] = "8e1b92cb-2524-4248-8afe-7ba0bac337c2", e._sentryDebugIdIdentifier = "sentry-dbid-8e1b92cb-2524-4248-8afe-7ba0bac337c2");
	} catch {}
})();
import { Al as e, Dl as t, Do as n, Vc as r, Zc as i, cu as a, fs as o, hn as s, ll as c, pu as l, uu as u, zc as d } from "./peach-app.js";
import { t as f } from "./peach-app.site-mark-C-FsZf9f.js";
//#region src/react/follow-manage/source-view.tsx
var p = /* @__PURE__ */ l(u(), 1), m = a();
function h({ provider: e }) {
	return /* @__PURE__ */ (0, m.jsx)(f, { src: t(e) });
}
function g({ group: e, name: t }) {
	let { src: n, fallback: i } = d(e), [a, o] = (0, p.useState)(0), s = [n, i].filter(Boolean)[a];
	return s ? /* @__PURE__ */ (0, m.jsx)("img", {
		src: s,
		alt: "",
		width: 32,
		height: 32,
		loading: "lazy",
		referrerPolicy: "no-referrer",
		onError: () => o(a + 1),
		className: "size-8 shrink-0 rounded-full bg-background-tertiary-default object-cover"
	}) : /* @__PURE__ */ (0, m.jsx)("span", {
		title: "没有可用头像",
		className: "inline-grid size-8 shrink-0 place-items-center rounded-full bg-background-tertiary-default text-caption-1-semibold text-text-secondary",
		children: r(t)
	});
}
function _({ source: t }) {
	let n = !t.enabled || t.history_exhausted ? "gray" : c(t) ? "rose" : t.enabled && t.last_status === "ok" ? "lime" : t.enabled ? "yellow" : "gray";
	return /* @__PURE__ */ (0, m.jsx)(s, {
		variant: "caption",
		color: n,
		children: e(t)
	});
}
function v({ source: e }) {
	return /* @__PURE__ */ (0, m.jsxs)("a", {
		href: e.url,
		target: "_blank",
		rel: "noopener noreferrer",
		title: "打开原来源",
		className: "max-w-full min-w-0 self-start text-body-medium wrap-anywhere text-text-primary underline-offset-2 hover:underline",
		children: [e.label, /* @__PURE__ */ (0, m.jsx)(n, {
			"aria-hidden": !0,
			className: "size-(--icon-inline) shrink-0"
		})]
	});
}
function y({ text: e, prefix: t = "", tone: n = "error" }) {
	let r = (0, p.useRef)(null), [a, s] = (0, p.useState)(!1), [c, l] = (0, p.useState)(!1), u = i(e);
	(0, p.useLayoutEffect)(() => {
		let e = r.current;
		if (!e || a) return;
		let t = () => l(e.scrollWidth > e.clientWidth + 1);
		t();
		let n = new ResizeObserver(t);
		return n.observe(e), () => n.disconnect();
	}, [u, a]);
	let d = c || u !== String(e || "").trim();
	return /* @__PURE__ */ (0, m.jsxs)("span", {
		className: "flex min-w-0 max-w-full flex-col items-start gap-0.5",
		children: [/* @__PURE__ */ (0, m.jsxs)("small", {
			ref: r,
			"data-error-line": "",
			className: `max-w-full text-caption-1-regular ${n === "error" ? "text-text-error-primary" : "text-text-secondary"} ${a ? "whitespace-pre-line wrap-anywhere" : "block truncate"}`,
			children: [t, a ? e : u]
		}), d ? /* @__PURE__ */ (0, m.jsx)(o, {
			variant: "ghost",
			size: "small",
			"data-error-line-toggle": "",
			"data-error-details-toggle": "",
			"aria-expanded": a,
			className: "-ml-2",
			onClick: () => s(!a),
			children: a ? "收起详情" : "查看详情"
		}) : null]
	});
}
//#endregion
export { _ as a, v as i, y as n, h as r, g as t };

//# debugId=8e1b92cb-2524-4248-8afe-7ba0bac337c2