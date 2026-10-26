(function() {
	try {
		var e = typeof window < "u" ? window : typeof global < "u" ? global : typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : {}, t = new e.Error().stack;
		t && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[t] = "8bd46d58-6461-4af6-a195-120f8211c6bd", e._sentryDebugIdIdentifier = "sentry-dbid-8bd46d58-6461-4af6-a195-120f8211c6bd");
	} catch {}
})();
import { require_jsx_runtime as e } from "./peach-app.js";
// src/react/components/page.tsx
var t = e();
function n({ children: e }) {
	return /* @__PURE__ */ (0, t.jsx)("div", {
		className: "mx-auto flex w-full max-w-board flex-col gap-8",
		children: e
	});
}
export { n as Page };

//# debugId=8bd46d58-6461-4af6-a195-120f8211c6bd