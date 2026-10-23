(function() {
	try {
		var e = typeof window < "u" ? window : typeof global < "u" ? global : typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : {}, t = new e.Error().stack;
		t && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[t] = "66035760-4b5b-4ff2-a9ad-92bfa29f35cc", e._sentryDebugIdIdentifier = "sentry-dbid-66035760-4b5b-4ff2-a9ad-92bfa29f35cc");
	} catch {}
})();
import { $l as e, Po as t, cu as n, pu as r, qo as i, uu as a } from "./peach-app.js";
//#region src/react/components/site-mark.tsx
var o = /* @__PURE__ */ r(a(), 1), s = n(), c = "size-(--icon-inline) shrink-0";
function l({ src: e }) {
	let [n, r] = (0, o.useState)("");
	return !e || n === e ? /* @__PURE__ */ (0, s.jsx)(t, {
		"aria-hidden": !0,
		className: c
	}) : /* @__PURE__ */ (0, s.jsx)("img", {
		src: e,
		alt: "",
		width: 16,
		height: 16,
		loading: "lazy",
		onError: () => r(e),
		className: `${c} rounded-none object-contain`
	});
}
function u({ source: t, linkId: n }) {
	if (t === "makers") return /* @__PURE__ */ (0, s.jsx)(i, {
		"aria-hidden": !0,
		className: c
	});
	if (n === void 0 && !t) return /* @__PURE__ */ (0, s.jsx)(l, { src: "" });
	let r = t && [
		"javten",
		"fc2ppvdb",
		"avwikidb",
		"minnano-av",
		"github"
	].includes(t);
	return /* @__PURE__ */ (0, s.jsx)(l, { src: n === void 0 ? r ? `/site-icon/${t}.png` : e({ source: t }) : `/link-mark?id=${n}` });
}
//#endregion
export { u as n, l as t };

//# debugId=66035760-4b5b-4ff2-a9ad-92bfa29f35cc