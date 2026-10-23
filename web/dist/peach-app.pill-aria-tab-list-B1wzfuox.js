(function() {
	try {
		var e = typeof window < "u" ? window : typeof global < "u" ? global : typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : {}, t = new e.Error().stack;
		t && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[t] = "e890244b-a35e-4c10-9efc-6f1875c7f2cb", e._sentryDebugIdIdentifier = "sentry-dbid-e890244b-a35e-4c10-9efc-6f1875c7f2cb");
	} catch {}
})();
import { Hs as e, cu as t, es as n, pu as r, uu as i, ys as a } from "./peach-app.js";
//#region src/react/components/pill-aria-tab-list.tsx
var o = /* @__PURE__ */ r(i(), 1), s = t();
function c({ scrollable: t = !0, ...r }) {
	let [i, c] = (0, o.useState)(null), l = a(c, t);
	return /* @__PURE__ */ (0, s.jsxs)(s.Fragment, { children: [/* @__PURE__ */ (0, s.jsx)(n, {
		...r,
		ref: l,
		"data-pill-nav": ""
	}), /* @__PURE__ */ (0, s.jsx)(e, { container: i })] });
}
//#endregion
export { c as t };

//# debugId=e890244b-a35e-4c10-9efc-6f1875c7f2cb