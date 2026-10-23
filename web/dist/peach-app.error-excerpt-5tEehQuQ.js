(function() {
	try {
		var e = typeof window < "u" ? window : typeof global < "u" ? global : typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : {}, t = new e.Error().stack;
		t && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[t] = "8650f95b-cc6b-434f-8052-2a2b3e310c2c", e._sentryDebugIdIdentifier = "sentry-dbid-8650f95b-cc6b-434f-8052-2a2b3e310c2c");
	} catch {}
})();
import { Rs as e, Va as t, Ya as n, cu as r, fs as i, pu as a, uu as o } from "./peach-app.js";
//#region src/react/activity/error-excerpt.tsx
var s = /* @__PURE__ */ a(o(), 1), c = r();
function l({ children: e, label: r, id: i }) {
	let a = n();
	return /* @__PURE__ */ (0, c.jsx)("div", {
		"data-error-details": "",
		className: t({
			bordered: "soft",
			radius: "surface",
			padding: "none",
			className: "relative w-full min-w-0 overflow-hidden bg-background-tertiary-default"
		}),
		children: /* @__PURE__ */ (0, c.jsx)("div", {
			ref: a,
			id: i,
			role: "region",
			"aria-label": r,
			tabIndex: 0,
			className: "max-h-80 overflow-y-auto overscroll-contain p-3 text-body-2-regular whitespace-pre-line wrap-anywhere text-text-primary",
			children: e
		})
	});
}
function u({ text: t, className: n = "" }) {
	let [r, a] = (0, s.useState)(!1), o = (0, s.useId)(), u = String(t || "").trim(), d = e(u);
	if (!d) return null;
	let f = d !== u;
	return /* @__PURE__ */ (0, c.jsxs)("div", {
		"data-error-excerpt": "",
		className: `flex min-w-0 max-w-full flex-col items-start gap-1 ${n}`,
		children: [r ? /* @__PURE__ */ (0, c.jsx)(l, {
			id: o,
			label: "完整错误详情",
			children: u
		}) : /* @__PURE__ */ (0, c.jsx)("p", {
			className: "w-full wrap-anywhere",
			children: d
		}), f ? /* @__PURE__ */ (0, c.jsx)(i, {
			variant: "ghost",
			size: "small",
			"data-error-details-toggle": "",
			className: "-ml-2",
			"aria-expanded": r,
			"aria-controls": r ? o : void 0,
			onClick: () => a(!r),
			children: r ? "收起详情" : "查看详情"
		}) : null]
	});
}
//#endregion
export { u as n, l as t };

//# debugId=8650f95b-cc6b-434f-8052-2a2b3e310c2c