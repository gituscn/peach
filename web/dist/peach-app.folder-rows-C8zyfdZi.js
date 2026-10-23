(function() {
	try {
		var e = typeof window < "u" ? window : typeof global < "u" ? global : typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : {}, t = new e.Error().stack;
		t && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[t] = "bcfa9843-8f0e-4105-99f2-40b95275bf31", e._sentryDebugIdIdentifier = "sentry-dbid-bcfa9843-8f0e-4105-99f2-40b95275bf31");
	} catch {}
})();
import { Oa as e, Sa as t, Tc as n, Us as r, _a as i, bo as a, bs as o, cu as s, eu as c, fs as l, ga as u, ja as d, lo as f, mo as p, pu as m, ro as h, tu as g, uu as _ } from "./peach-app.js";
//#region src/react/settings/folder-rows.tsx
var v = /* @__PURE__ */ m(_(), 1), y = s();
function b({ className: e }) {
	return /* @__PURE__ */ (0, y.jsx)("svg", {
		"aria-hidden": !0,
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: 2,
		strokeLinecap: "round",
		strokeLinejoin: "round",
		className: e,
		children: /* @__PURE__ */ (0, y.jsx)("use", { href: "#i-folder-search" })
	});
}
var x = g, S = (e) => n[e] || "database", C = (e) => c.includes(e);
function w({ label: e, className: t, children: n }) {
	return /* @__PURE__ */ (0, y.jsxs)("div", {
		className: r("flex min-w-0 flex-col gap-1", t),
		children: [/* @__PURE__ */ (0, y.jsx)(p, {
			elementType: "span",
			"aria-hidden": !0,
			children: e
		}), n]
	});
}
function T({ children: e }) {
	return /* @__PURE__ */ (0, y.jsx)("div", {
		className: "flex w-full flex-wrap items-start gap-2",
		children: e
	});
}
function E({ index: e, cost: n, error: r, onChange: a }) {
	return /* @__PURE__ */ (0, y.jsxs)("div", {
		"data-media-read-policy": e,
		className: "flex w-full flex-col gap-1 @lg:w-32",
		children: [
			/* @__PURE__ */ (0, y.jsx)(p, {
				elementType: "span",
				"aria-hidden": !0,
				children: "读取策略"
			}),
			/* @__PURE__ */ (0, y.jsxs)(u, {
				"aria-label": `媒体读取策略 ${e + 1}`,
				placeholder: "选择读取策略",
				isRequired: !0,
				validationBehavior: "aria",
				isInvalid: !!r,
				selectedKey: n || null,
				onSelectionChange: (e) => {
					(e === "free" || e === "metered") && a(e);
				},
				children: [/* @__PURE__ */ (0, y.jsx)(i, {
					id: "free",
					children: "正常读取"
				}), /* @__PURE__ */ (0, y.jsx)(i, {
					id: "metered",
					children: "代理保护"
				})]
			}),
			r ? /* @__PURE__ */ (0, y.jsx)(t, { children: r }) : null
		]
	});
}
function D() {
	return /* @__PURE__ */ (0, y.jsx)(e, { children: "读取策略选「代理保护」时，会限制自动读取视频。" });
}
function O({ initial: e, blank: t, pickFolder: n, describe: r, focusAfterPick: i = !1 }) {
	let [a, o] = (0, v.useState)(e), [s, c] = (0, v.useState)([]), [l, u] = (0, v.useState)(null), [d, f] = (0, v.useState)(null), p = (0, v.useRef)(!1), m = (0, v.useRef)([]);
	(0, v.useLayoutEffect)(() => {
		l !== null && (m.current[l]?.focus(), u(null));
	}, [l]);
	let h = (e, t) => o((n) => n.map((n, r) => r === e ? {
		...n,
		...t
	} : n)), g = (e, t) => c((n) => {
		let r = [...n];
		for (; r.length <= e;) r.push("");
		return r[e] = t, r;
	});
	return {
		rows: a,
		edit: h,
		add: () => {
			u(a.length), o((e) => [...e, t()]);
		},
		remove: (e) => {
			o((t) => t.filter((t, n) => n !== e)), c((t) => t.filter((t, n) => n !== e));
		},
		errors: s,
		setErrors: c,
		picking: d,
		pick: async (e) => {
			if (!p.current) {
				p.current = !0, f(e);
				try {
					let t = await n(a[e]?.path ?? "");
					t && (h(e, { path: t }), g(e, "")), i && u(e);
				} catch (t) {
					g(e, r(t));
				} finally {
					p.current = !1, f(null);
				}
			}
		},
		inputRef: (e) => (t) => {
			m.current[e] = t;
		}
	};
}
function k({ label: e, path: t, onPath: n, error: r, inputRef: i, picking: s, onPick: c, onRemove: u, status: d, children: p }) {
	let m = (0, v.useRef)(null), g = () => {
		let e = m.current;
		e && e.ownerDocument.activeElement !== e && (e.scrollLeft = e.scrollWidth);
	};
	return (0, v.useLayoutEffect)(() => {
		m.current && (m.current.title = t), g();
	}, [t]), /* @__PURE__ */ (0, y.jsxs)("div", {
		"data-folder-row": !0,
		className: "@container flex flex-col gap-2 rounded-2lg border border-separator-border bg-background-primary-default p-3",
		children: [/* @__PURE__ */ (0, y.jsxs)("div", {
			className: "flex items-start gap-2",
			children: [
				/* @__PURE__ */ (0, y.jsx)(f, {
					className: "min-w-0 flex-1",
					"aria-label": e,
					placeholder: "媒体目录路径",
					value: t,
					onChange: n,
					ref: (e) => {
						m.current = e, i(e);
					},
					onBlur: () => requestAnimationFrame(g),
					validationBehavior: "aria",
					isInvalid: !!r,
					hint: r || void 0
				}),
				d ? /* @__PURE__ */ (0, y.jsx)("div", {
					className: "flex h-9 shrink-0 items-center",
					children: d
				}) : null,
				/* @__PURE__ */ (0, y.jsx)(o, {
					icon: b,
					"aria-label": "选择文件夹",
					onClick: c,
					...h(s)
				}),
				u ? /* @__PURE__ */ (0, y.jsx)(l, {
					variant: "danger",
					iconOnly: !0,
					leadingIcon: a,
					"aria-label": "移除这个文件夹",
					onClick: u
				}) : null
			]
		}), /* @__PURE__ */ (0, y.jsx)("div", {
			className: "flex flex-wrap items-end gap-2",
			children: p
		})]
	});
}
function A({ index: e, value: t, onChange: n, options: r = x }) {
	return /* @__PURE__ */ (0, y.jsx)(w, {
		label: "来源",
		className: "w-full @lg:w-60",
		children: /* @__PURE__ */ (0, y.jsx)(u, {
			className: "w-full",
			"aria-label": `媒体来源 ${e + 1}`,
			selectedKey: t,
			onSelectionChange: (e) => {
				e !== null && n(String(e));
			},
			children: r.map(([e, t]) => /* @__PURE__ */ (0, y.jsxs)(i, {
				id: e,
				textValue: t,
				children: [/* @__PURE__ */ (0, y.jsx)(d, { mark: S(e) }), t]
			}, e))
		})
	});
}
//#endregion
export { x as a, A as c, O as d, b as i, C as l, T as n, E as o, k as r, D as s, w as t, S as u };

//# debugId=bcfa9843-8f0e-4105-99f2-40b95275bf31