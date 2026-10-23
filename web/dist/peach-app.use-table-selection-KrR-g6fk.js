(function() {
	try {
		var e = typeof window < "u" ? window : typeof global < "u" ? global : typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : {}, t = new e.Error().stack;
		t && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[t] = "2e2dcca0-a664-496a-a593-937ecc2fd209", e._sentryDebugIdIdentifier = "sentry-dbid-2e2dcca0-a664-496a-a593-937ecc2fd209");
	} catch {}
})();
import { $i as e, Hi as t, Qi as n, Ui as r, Xi as i, ea as a, pu as o, uu as s } from "./peach-app.js";
//#region node_modules/@tanstack/table-core/dist/features/row-sorting/createSortedRowModel.js
function c() {
	return (t) => {
		let n = t;
		return a({
			feature: "rowSortingFeature",
			table: n,
			fnName: "table.getSortedRowModel",
			memoDeps: () => [n.atoms.sorting?.get(), n.getPreSortedRowModel()],
			fn: () => l(n),
			onAfterUpdate: e(() => i(n))
		});
	};
}
function l(e) {
	let i = e.getPreSortedRowModel(), a = e.atoms.sorting?.get();
	if (!i.rows.length || !a?.length) return i;
	let o = [], s = a.filter((n) => {
		let r = e.getColumn(n.id);
		return r ? t(r) : !1;
	});
	if (!s.length) return i;
	let c = [];
	for (let t = 0; t < s.length; t++) {
		let n = s[t], i = e.getColumn(n.id);
		i && c.push({
			id: n.id,
			desc: n.desc,
			sortUndefined: i.columnDef.sortUndefined,
			invertSorting: i.columnDef.invertSorting,
			sortFn: r(i)
		});
	}
	let l = (e, t) => {
		for (let n = 0; n < c.length; n++) {
			let r = c[n], i = r.sortUndefined, a = r.desc, o = 0;
			if (i) {
				let n = e.getValue(r.id), a = t.getValue(r.id), s = n === void 0, c = a === void 0;
				if (s && c) continue;
				if (s || c) {
					if (i === "first") return s ? -1 : 1;
					if (i === "last") return s ? 1 : -1;
					o = s ? i : -i;
				}
			}
			if (o === 0 && (o = r.sortFn(e, t, r.id)), o !== 0) return a && (o *= -1), r.invertSorting && (o *= -1), o;
		}
		return e.index - t.index;
	}, u = (e) => {
		let t = e.slice();
		t.sort(l);
		let r = !1;
		for (let i = 0; i < t.length; i++) {
			let a = t[i];
			a !== e[i] && (r = !0);
			let s = o.length;
			if (o.push(a), a.subRows.length) {
				let e = u(a.subRows);
				if (e.changed) {
					let c = Object.create(Object.getPrototypeOf(a));
					n(c, a), c.subRows = e.rows, t[i] = c, o[s] = c, r = !0;
				}
			}
		}
		return {
			rows: t,
			changed: r
		};
	};
	return {
		rows: u(i.rows).rows,
		flatRows: o,
		rowsById: i.rowsById
	};
}
//#endregion
//#region src/react/components/use-table-selection.ts
var u = /* @__PURE__ */ o(s(), 1), d = /* @__PURE__ */ new Map();
function f(e) {
	let t = (0, u.useId)(), n = (0, u.useRef)(e);
	return n.current = e, (0, u.useEffect)(() => (d.set(t, () => n.current()), () => {
		d.delete(t);
	}), [t]), (0, u.useCallback)(() => {
		for (let [e, n] of d) e !== t && n();
	}, [t]);
}
//#endregion
export { c as n, f as t };

//# debugId=2e2dcca0-a664-496a-a593-937ecc2fd209