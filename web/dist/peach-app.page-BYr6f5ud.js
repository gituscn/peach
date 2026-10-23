(function() {
	try {
		var e = typeof window < "u" ? window : typeof global < "u" ? global : typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : {}, t = new e.Error().stack;
		t && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[t] = "b472ea20-7041-4802-aeaa-52cf4e5083a9", e._sentryDebugIdIdentifier = "sentry-dbid-b472ea20-7041-4802-aeaa-52cf4e5083a9");
	} catch {}
})();
import { cu as e } from "./peach-app.js";
//#region src/react/components/page.tsx
var t = e();
function n({ children: e }) {
	return /* @__PURE__ */ (0, t.jsx)("div", {
		className: "mx-auto flex w-full max-w-board flex-col gap-8",
		children: e
	});
}
//#endregion
export { n as t };

//# debugId=b472ea20-7041-4802-aeaa-52cf4e5083a9