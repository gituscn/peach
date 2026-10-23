(function() {
	try {
		var e = typeof window < "u" ? window : typeof global < "u" ? global : typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : {}, t = new e.Error().stack;
		t && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[t] = "e6f0d41e-6c62-4dc8-b6b4-5a52c3b9ac7c", e._sentryDebugIdIdentifier = "sentry-dbid-e6f0d41e-6c62-4dc8-b6b4-5a52c3b9ac7c");
	} catch {}
})();
import { $ as e, $t as t, B as n, Bt as r, C as i, Ct as a, D as o, E as s, Et as c, F as l, G as u, Gt as d, I as f, It as p, Jt as m, Kt as h, L as g, Lt as _, Nt as v, O as y, P as b, Q as x, Qt as S, R as ee, Rt as C, S as w, St as T, T as E, Tt as te, U as ne, V as re, W as ie, Wt as ae, Xt as D, Yt as oe, Z as se, Zt as ce, _ as le, a as ue, an as de, at as fe, b as pe, c as me, cn as O, ct as he, d as ge, dt as _e, en as k, et as ve, f as ye, ft as be, g as xe, ht as Se, l as Ce, ln as we, mt as Te, n as Ee, nn as A, nt as j, o as De, on as M, ot as Oe, p as ke, r as Ae, rn as je, s as Me, sn as Ne, st as Pe, t as Fe, tn as Ie, tt as Le, ut as Re, v as ze, w as Be, wt as Ve, x as He, xt as Ue, y as We, z as Ge, zt as Ke } from "./peach-app.expandable-ranking-BW8Gp_lx.js";
import { $a as qe, $l as Je, $o as Ye, Ao as Xe, C as Ze, Co as Qe, Do as $e, Ec as et, Gl as N, Il as P, Ko as tt, Mo as nt, No as rt, Qa as it, Qo as at, Ra as ot, Ro as st, S as ct, Sc as lt, To as ut, Ua as dt, Uo as ft, Us as pt, Va as F, Wo as I, Yl as mt, Yo as ht, Zl as gt, Zo as _t, _ as vt, _a as yt, _o as bt, a as xt, au as St, b as Ct, bo as wt, c as Tt, cu as Et, d as Dt, eo as Ot, f as kt, fa as At, fs as L, g as jt, ga as Mt, h as Nt, ha as Pt, i as Ft, iu as It, jo as Lt, l as Rt, lo as zt, ls as Bt, m as Vt, mn as Ht, o as Ut, oo as R, ou as Wt, p as Gt, pa as Kt, ps as qt, pu as Jt, r as Yt, rc as z, ro as B, s as Xt, so as V, u as Zt, uu as Qt, v as $t, w as en, x as tn, xa as nn, y as rn, yo as an, za as on, zo as sn } from "./peach-app.js";
import { t as cn } from "./peach-app.page-BYr6f5ud.js";
import { a as ln, r as un, s as dn } from "./peach-app.stat-card-8t4QGU2C.js";
import { t as fn } from "./peach-app.legacy-avatar-CV1xk6vD.js";
var pn = m([(e, t) => j(e, "angleAxis", t, !1)], (e) => {
	if (e) return e.map((e) => e.coordinate);
}), mn = m([(e, t) => j(e, "radiusAxis", t, !1)], (e) => {
	if (e) return e.map((e) => e.coordinate);
}), H = /* @__PURE__ */ Jt(Qt()), hn = [
	"gridType",
	"radialLines",
	"angleAxisId",
	"radiusAxisId",
	"cx",
	"cy",
	"innerRadius",
	"outerRadius",
	"polarAngles",
	"polarRadius",
	"zIndex"
];
function gn(e, t) {
	if (e == null) return {};
	var n, r, i = _n(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function _n(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
function U() {
	return U = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, U.apply(null, arguments);
}
function vn(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function W(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? vn(Object(n), !0).forEach(function(t) {
			yn(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : vn(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function yn(e, t, n) {
	return (t = bn(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function bn(e) {
	var t = xn(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function xn(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var Sn = (e, t, n, r) => {
	var i = "";
	return r.forEach((r, a) => {
		var o = p(t, n, e, r);
		i += a ? `L ${o.x},${o.y}` : `M ${o.x},${o.y}`;
	}), i += "Z", i;
}, Cn = (e) => {
	var t = e.cx, n = e.cy, r = e.innerRadius, i = e.outerRadius, a = e.polarAngles, o = e.radialLines;
	if (!a || !a.length || !o) return null;
	var s = W({}, O(e));
	return /*#__PURE__*/ H.createElement("g", { className: "recharts-polar-grid-angle" }, a.map((e) => {
		var a = p(t, n, r, e), o = p(t, n, i, e);
		return /*#__PURE__*/ H.createElement("line", U({ key: `line-${e}` }, s, {
			x1: a.x,
			y1: a.y,
			x2: o.x,
			y2: o.y
		}));
	}));
}, wn = (e) => {
	var t = e.cx, n = e.cy, r = e.radius, i = W({}, O(e));
	return /*#__PURE__*/ H.createElement("circle", U({}, i, {
		className: z("recharts-polar-grid-concentric-circle", e.className),
		cx: t,
		cy: n,
		r
	}));
}, Tn = (e) => {
	var t = e.radius, n = W({}, O(e));
	return /*#__PURE__*/ H.createElement("path", U({}, n, {
		className: z("recharts-polar-grid-concentric-polygon", e.className),
		d: Sn(t, e.cx, e.cy, e.polarAngles)
	}));
}, En = (e) => {
	var t = e.polarRadius, n = e.gridType;
	if (!t || !t.length) return null;
	var r = Math.max(...t), i = e.fill && e.fill !== "none";
	return /*#__PURE__*/ H.createElement("g", { className: "recharts-polar-grid-concentric" }, i && n === "circle" && /*#__PURE__*/ H.createElement(wn, U({}, e, { radius: r })), i && n !== "circle" && /*#__PURE__*/ H.createElement(Tn, U({}, e, { radius: r })), t.map((t, r) => {
		var i = r;
		return n === "circle" ? /*#__PURE__*/ H.createElement(wn, U({ key: i }, e, {
			fill: "none",
			radius: t
		})) : /*#__PURE__*/ H.createElement(Tn, U({ key: i }, e, {
			fill: "none",
			radius: t
		}));
	}));
}, Dn = {
	angleAxisId: 0,
	radiusAxisId: 0,
	gridType: "polygon",
	radialLines: !0,
	zIndex: c.grid,
	stroke: "#ccc",
	strokeWidth: 1,
	fill: "none"
}, On = (e) => {
	var t = k(e, Dn), n = t.gridType, r = t.radialLines, i = t.angleAxisId, a = t.radiusAxisId, o = t.cx, s = t.cy, c = t.innerRadius, l = t.outerRadius, u = t.polarAngles, d = t.polarRadius, f = t.zIndex, p = gn(t, hn), m = D(T), h = D((e) => pn(e, i)), g = D((e) => mn(e, a)), _ = Array.isArray(u) ? u : h, v = Array.isArray(d) ? d : g;
	if (_ == null || v == null) return null;
	var y = W({
		cx: m?.cx ?? o ?? 0,
		cy: m?.cy ?? s ?? 0,
		innerRadius: m?.innerRadius ?? c ?? 0,
		outerRadius: m?.outerRadius ?? l ?? 0,
		polarAngles: _,
		polarRadius: v,
		zIndex: f
	}, p);
	return y.outerRadius <= 0 ? null : /*#__PURE__*/ H.createElement(Se, { zIndex: y.zIndex }, /*#__PURE__*/ H.createElement("g", { className: "recharts-polar-grid" }, /*#__PURE__*/ H.createElement(En, U({
		gridType: n,
		radialLines: r
	}, y, {
		polarAngles: _,
		polarRadius: v
	})), /*#__PURE__*/ H.createElement(Cn, U({
		gridType: n,
		radialLines: r
	}, y, {
		polarAngles: _,
		polarRadius: v
	}))));
};
On.displayName = "PolarGrid";
//#endregion
//#region node_modules/es-toolkit/dist/compat/_internal/toArray.mjs
function kn(e) {
	return Array.isArray(e) ? e : Array.from(e);
}
//#endregion
//#region node_modules/es-toolkit/dist/compat/math/maxBy.mjs
function An(e, n = t) {
	if (e == null) return;
	let r = kn(e);
	if (r.length === 0) return;
	let i = ce(n), a, o;
	for (let e = 0; e < r.length; e++) {
		let t = r[e], n = i(t, e, r);
		n == null || Number.isNaN(n) || typeof n == "symbol" || (o === void 0 || n > o) && (o = n, a = t);
	}
	return a;
}
//#endregion
//#region node_modules/es-toolkit/dist/compat/math/minBy.mjs
function jn(e, n = t) {
	if (e == null) return;
	let r = kn(e);
	if (r.length === 0) return;
	let i = ce(n), a, o;
	for (let e = 0; e < r.length; e++) {
		let t = r[e], n = i(t, e, r);
		n == null || Number.isNaN(n) || typeof n == "symbol" || (o === void 0 || n < o) && (o = n, a = t);
	}
	return a;
}
//#endregion
//#region node_modules/recharts/es6/polar/PolarRadiusAxis.js
var Mn = ["type"], Nn = [
	"cx",
	"cy",
	"angle",
	"axisLine"
], Pn = [
	"angle",
	"tickFormatter",
	"stroke",
	"tick"
];
function G() {
	return G = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, G.apply(null, arguments);
}
function Fn(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function K(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? Fn(Object(n), !0).forEach(function(t) {
			In(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Fn(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function In(e, t, n) {
	return (t = Ln(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function Ln(e) {
	var t = Rn(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function Rn(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function zn(e, t) {
	if (e == null) return {};
	var n, r, i = Bn(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function Bn(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
var Vn = "radiusAxis";
function Hn(t) {
	var n = oe(), r = C(), i = (0, H.useMemo)(() => {
		var e = t.type, n = zn(t, Mn), i = Ve(r, "radiusAxis", e);
		if (i != null) return K(K({}, n), {}, { type: i });
	}, [t, r]);
	return (0, H.useEffect)(() => i == null ? de : (n(e(i)), () => {
		n(ve(i));
	}), [n, i]), null;
}
var Un = (e, t, n, r) => {
	var i = e.coordinate;
	return p(n, r, i, t);
}, Wn = (e) => {
	var t;
	switch (e) {
		case "left":
			t = "end";
			break;
		case "right":
			t = "start";
			break;
		default: t = "middle";
	}
	return t;
}, Gn = (e, t, n, r) => {
	var i = An(r, (e) => e.coordinate || 0);
	return {
		cx: t,
		cy: n,
		startAngle: e,
		endAngle: e,
		innerRadius: jn(r, (e) => e.coordinate || 0)?.coordinate || 0,
		outerRadius: i?.coordinate || 0,
		clockWise: !1
	};
}, Kn = (e, t) => {
	var n = e.cx, r = e.cy, i = e.angle, a = e.axisLine, o = zn(e, Nn), s = t.reduce((e, t) => [Math.min(e[0], t.coordinate), Math.max(e[1], t.coordinate)], [Infinity, -Infinity]), c = p(n, r, s[0], i), l = p(n, r, s[1], i), u = K(K(K({}, O(o)), {}, { fill: "none" }, O(a)), {}, {
		x1: c.x,
		y1: c.y,
		x2: l.x,
		y2: l.y
	});
	return /*#__PURE__*/ H.createElement("line", G({ className: "recharts-polar-radius-axis-line" }, u));
}, qn = (e, t, n) => /*#__PURE__*/ H.isValidElement(e) ? /*#__PURE__*/ H.cloneElement(e, t) : typeof e == "function" ? e(t) : /*#__PURE__*/ H.createElement(be, G({}, t, { className: "recharts-polar-radius-axis-tick-value" }), n), Jn = (e, t) => {
	var n = e.angle, r = e.tickFormatter, i = e.stroke, a = e.tick, o = zn(e, Pn), s = Wn(e.orientation), c = O(o), l = we(a), u = t.map((t, o) => {
		var u = Un(t, e.angle, e.cx, e.cy), d = K(K(K(K({
			textAnchor: s,
			transform: `rotate(${90 - n}, ${u.x}, ${u.y})`
		}, c), {}, {
			stroke: "none",
			fill: i
		}, l), {}, { index: o }, u), {}, { payload: t });
		return /*#__PURE__*/ H.createElement(M, G({
			className: z("recharts-polar-radius-axis-tick", x(a)),
			key: `tick-${t.coordinate}`
		}, Ie(e, t, o)), qn(a, d, r ? r(t.value, o) : t.value));
	});
	return /*#__PURE__*/ H.createElement(M, { className: "recharts-polar-radius-axis-ticks" }, u);
}, Yn = (e) => {
	var t = e.radiusAxisId, n = D(T), r = D((e) => Le(e, "radiusAxis", t)), i = D((e) => j(e, "radiusAxis", t, !1));
	if (n == null || !i || !i.length || r == null) return null;
	var a = K(K({}, e), {}, { scale: r }, n), o = a.tick, s = a.axisLine;
	return /*#__PURE__*/ H.createElement(Se, { zIndex: a.zIndex }, /*#__PURE__*/ H.createElement(M, { className: z("recharts-polar-radius-axis", Vn, a.className) }, s && Kn(a, i), o && Jn(a, i), /*#__PURE__*/ H.createElement(Re, Gn(a.angle, a.cx, a.cy, i), /*#__PURE__*/ H.createElement(_e, { label: a.label }), a.children)));
};
function Xn(e) {
	var t = k(e, te);
	return /*#__PURE__*/ H.createElement(H.Fragment, null, /*#__PURE__*/ H.createElement(Hn, {
		domain: t.domain,
		id: t.radiusAxisId,
		scale: t.scale,
		type: t.type,
		dataKey: t.dataKey,
		unit: void 0,
		name: t.name,
		allowDuplicatedCategory: t.allowDuplicatedCategory,
		allowDataOverflow: t.allowDataOverflow,
		reversed: t.reversed,
		includeHidden: t.includeHidden,
		allowDecimals: t.allowDecimals,
		niceTicks: t.niceTicks ?? "auto",
		ticks: t.ticks,
		tickCount: t.tickCount,
		tick: t.tick
	}), /*#__PURE__*/ H.createElement(Yn, t));
}
Xn.displayName = "PolarRadiusAxis";
//#endregion
//#region node_modules/es-toolkit/dist/array/last.mjs
function Zn(e) {
	return e[e.length - 1];
}
//#endregion
//#region node_modules/es-toolkit/dist/compat/array/last.mjs
function Qn(e) {
	if (S(e) && e.length !== 0) return Zn(kn(e));
}
//#endregion
//#region node_modules/recharts/es6/state/selectors/radarSelectors.js
function $n(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function q(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? $n(Object(n), !0).forEach(function(t) {
			er(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : $n(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function er(e, t, n) {
	return (t = tr(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function tr(e) {
	var t = nr(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function nr(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var rr = (e, t) => Le(e, "radiusAxis", t), ir = m([rr], (e) => {
	if (e != null) return { scale: e };
}), ar = m([a, rr], (e, t) => {
	if (e != null && t != null) return q(q({}, e), {}, { scale: t });
}), or = (e, t, n, r) => j(e, "radiusAxis", t, r), sr = (e, t, n) => Ue(e, n), cr = (e, t, n) => Le(e, "angleAxis", n), lr = m([sr, cr], (e, t) => {
	if (e != null && t != null) return q(q({}, e), {}, { scale: t });
}), ur = (e, t, n, r) => j(e, "angleAxis", n, r), dr = m([
	sr,
	cr,
	T
], (e, t, n) => {
	if (n != null && t != null) return {
		scale: t,
		type: e.type,
		dataKey: e.dataKey,
		cx: n.cx,
		cy: n.cy
	};
}), fr = (e, t, n, r, i) => i, pr = m([
	_,
	ar,
	or,
	lr,
	ur
], (e, t, n, i, a) => h(e, "radiusAxis") ? r(t, n, !1) : r(i, a, !1)), mr = m([fe, fr], (e, t) => {
	if (e != null) return e.find((e) => e.type === "radar" && t === e.id)?.dataKey;
}), hr = m([
	ir,
	dr,
	v,
	mr,
	pr
], (e, t, n, r, i) => {
	var a = n.chartData, o = n.dataStartIndex, s = n.dataEndIndex;
	if (e != null && t != null && a != null && i != null && r != null) return Dr({
		radiusAxis: e,
		angleAxis: t,
		displayedData: a.slice(o, s + 1),
		dataKey: r,
		bandSize: i
	});
}), gr = ["id"];
function J() {
	return J = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, J.apply(null, arguments);
}
function _r(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function Y(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? _r(Object(n), !0).forEach(function(t) {
			vr(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : _r(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function vr(e, t, n) {
	return (t = yr(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function yr(e) {
	var t = br(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function br(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function xr(e, t) {
	if (e == null) return {};
	var n, r, i = Sr(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function Sr(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
function Cr(e, t) {
	return e && e !== "none" ? e : t;
}
var wr = (e) => {
	var t = e.dataKey, n = e.name, r = e.stroke, i = e.fill, a = e.legendType;
	return [{
		inactive: e.hide,
		dataKey: t,
		type: a,
		color: Cr(r, i),
		value: ae(n, t),
		payload: e
	}];
}, Tr = /*#__PURE__*/ H.memo((e) => {
	var t = e.dataKey, n = e.stroke, r = e.strokeWidth, i = e.fill, a = e.name, o = e.hide, s = e.tooltipType, c = e.id, l = {
		dataDefinedOnItem: void 0,
		getPosition: de,
		settings: {
			stroke: n,
			strokeWidth: r,
			fill: i,
			nameKey: void 0,
			dataKey: t,
			name: ae(a, t),
			hide: o,
			type: s,
			color: Cr(n, i),
			unit: "",
			graphicalItemId: c
		}
	};
	return /*#__PURE__*/ H.createElement(u, { tooltipEntrySettings: l });
});
function Er(e) {
	var t = e.points, n = e.props, r = n.dot, i = n.dataKey;
	n.id;
	var a = xr(n, gr), o = O(a);
	return /*#__PURE__*/ H.createElement(l, {
		points: t,
		dot: r,
		className: "recharts-radar-dots",
		dotClassName: "recharts-radar-dot",
		dataKey: i,
		baseProps: o
	});
}
function Dr(e) {
	var t = e.radiusAxis, n = e.angleAxis, r = e.displayedData, i = e.dataKey, a = e.bandSize, o = n.cx, s = n.cy, c = !1, l = [], u = n.type === "number" ? 0 : a ?? 0;
	r.forEach((e, r) => {
		var a = d(e, n.dataKey, r), f = d(e, i), m = (n.scale.map(a) ?? 0) + u, h = Array.isArray(f) ? Qn(f) : f, g = je(h) ? 0 : t.scale.map(h) ?? 0;
		Array.isArray(f) && f.length >= 2 && (c = !0), l.push(Y(Y({}, p(o, s, g, m)), {}, {
			name: a,
			value: f,
			cx: o,
			cy: s,
			radius: g,
			angle: m,
			payload: e
		}));
	});
	var f = [];
	return c && l.forEach((e) => {
		if (Array.isArray(e.value)) {
			var n = e.value[0], r = je(n) ? 0 : t.scale.map(n) ?? 0;
			f.push(Y(Y({}, e), {}, { radius: r }, p(o, s, r, e.angle)));
		} else f.push(e);
	}), {
		points: l,
		isRange: c,
		baseLinePoints: f
	};
}
function Or(e) {
	var t = e.showLabels, n = e.points, r = e.children, i = n.map((e) => {
		var t = {
			x: e.x,
			y: e.y,
			width: 0,
			lowerWidth: 0,
			upperWidth: 0,
			height: 0
		};
		return Y(Y({}, t), {}, {
			value: e.value ?? "",
			payload: e.payload,
			parentViewBox: void 0,
			viewBox: t,
			fill: void 0
		});
	});
	return /*#__PURE__*/ H.createElement(Pe, { value: t ? i : void 0 }, r);
}
function kr(e) {
	var t = e.points, n = e.baseLinePoints, r = e.props;
	if (t == null) return null;
	var i = r.shape, a = r.isRange, o = r.connectNulls, s = /*#__PURE__*/ H.isValidElement(i) ? /*#__PURE__*/ H.cloneElement(i, Y(Y({}, r), {}, { points: t })) : typeof i == "function" ? i(Y(Y({}, r), {}, { points: t })) : /*#__PURE__*/ H.createElement(Oe, J({}, Ne(r), {
		onMouseEnter: (e) => {
			var t = r.onMouseEnter;
			t && t(r, e);
		},
		onMouseLeave: (e) => {
			var t = r.onMouseLeave;
			t && t(r, e);
		},
		points: t,
		baseLinePoints: a ? n : void 0,
		connectNulls: o
	}));
	return /*#__PURE__*/ H.createElement(M, { className: "recharts-radar-polygon" }, s, /*#__PURE__*/ H.createElement(Er, {
		props: r,
		points: t
	}));
}
var Ar = (e, t) => e == null ? [] : t === 1 ? e.flatMap((e) => e.status === "removed" ? [] : [e.next]) : e.flatMap((e) => e.status === "removed" ? [] : e.status === "matched" ? [Y(Y({}, e.next), {}, {
	x: A(e.prev.x, e.next.x, t),
	y: A(e.prev.y, e.next.y, t)
})] : [Y(Y({}, e.next), {}, {
	x: A(e.next.cx, e.next.x, t),
	y: A(e.next.cy, e.next.y, t)
})]);
function jr(e) {
	var t = e.props, r = e.previousPointsRef, i = e.previousBaseLinePointsRef, a = t.points, o = t.baseLinePoints, s = t.isAnimationActive, c = t.animationBegin, l = t.animationDuration, u = t.animationEasing, d = t.animationMatchBy, f = t.animationInterpolateFn, p = t.onAnimationStart, m = t.onAnimationEnd, h = n(t, i), g = h.startValue, _ = re(g ?? null, o, d), v = Ge(p, m), y = v.isAnimating, b = v.handleAnimationStart, x = v.handleAnimationEnd, S = C();
	return S == null ? null : /*#__PURE__*/ H.createElement(Or, {
		showLabels: !y,
		points: a
	}, /*#__PURE__*/ H.createElement(ee, {
		animationInput: t,
		animationIdPrefix: "recharts-radar-",
		items: a,
		previousItemsRef: r,
		isAnimationActive: s,
		animationBegin: c,
		animationDuration: l,
		animationEasing: u,
		onAnimationStart: b,
		onAnimationEnd: x,
		animationInterpolateFn: f,
		animationMatchBy: d,
		layout: S
	}, (e, n) => {
		var r = n === 1 ? o : f(_, n, S);
		return h.syncStepValue(r, n), /*#__PURE__*/ H.createElement(kr, {
			points: e,
			baseLinePoints: r,
			props: t
		});
	}), /*#__PURE__*/ H.createElement(he, { label: t.label }), t.children);
}
function Mr(e) {
	var t = (0, H.useRef)(void 0), n = (0, H.useRef)(void 0);
	return /*#__PURE__*/ H.createElement(jr, {
		props: e,
		previousPointsRef: t,
		previousBaseLinePointsRef: n
	});
}
var Nr = {
	activeDot: !0,
	angleAxisId: 0,
	animationBegin: 0,
	animationDuration: 1500,
	animationEasing: "ease",
	animationMatchBy: ne,
	animationInterpolateFn: Ar,
	dot: !1,
	hide: !1,
	isAnimationActive: "auto",
	label: !1,
	legendType: "rect",
	radiusAxisId: 0,
	zIndex: c.area
};
function Pr(e) {
	var t = e.hide, n = e.className, r = e.points;
	if (t) return null;
	var i = z("recharts-radar", n);
	return /*#__PURE__*/ H.createElement(Se, { zIndex: e.zIndex }, /*#__PURE__*/ H.createElement(M, { className: i }, /*#__PURE__*/ H.createElement(Mr, e)), /*#__PURE__*/ H.createElement(b, {
		points: r,
		mainColor: Cr(e.stroke, e.fill),
		itemDataKey: e.dataKey,
		activeDot: e.activeDot
	}));
}
function Fr(e) {
	var t = Ke(), n = D((n) => hr(n, e.radiusAxisId, e.angleAxisId, t, e.id));
	return n?.points == null ? null : /*#__PURE__*/ H.createElement(Pr, J({}, e, {
		points: n?.points,
		baseLinePoints: n?.baseLinePoints,
		isRange: n?.isRange
	}));
}
function Ir(e) {
	var t = k(e, Nr);
	return /*#__PURE__*/ H.createElement(g, {
		id: t.id,
		type: "radar"
	}, (e) => /*#__PURE__*/ H.createElement(H.Fragment, null, /*#__PURE__*/ H.createElement(f, {
		type: "radar",
		id: e,
		data: void 0,
		dataKey: t.dataKey,
		hide: t.hide,
		angleAxisId: t.angleAxisId,
		radiusAxisId: t.radiusAxisId
	}), /*#__PURE__*/ H.createElement(ie, { legendPayload: wr(t) }), /*#__PURE__*/ H.createElement(Tr, {
		dataKey: t.dataKey,
		stroke: t.stroke,
		strokeWidth: t.strokeWidth,
		fill: t.fill,
		name: t.name,
		hide: t.hide,
		tooltipType: t.tooltipType,
		id: e
	}), /*#__PURE__*/ H.createElement(Fr, J({}, t, { id: e }))));
}
Ir.displayName = "Radar";
//#endregion
//#region node_modules/recharts/es6/chart/RadarChart.js
function Lr(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function Rr(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? Lr(Object(n), !0).forEach(function(t) {
			zr(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Lr(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function zr(e, t, n) {
	return (t = Br(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function Br(e) {
	var t = Vr(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function Vr(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var Hr = ["axis"], Ur = Rr(Rr({}, y), {}, {
	layout: "centric",
	startAngle: 90,
	endAngle: -270
}), Wr = /*#__PURE__*/ (0, H.forwardRef)((e, t) => {
	var n = k(e, Ur);
	return /*#__PURE__*/ H.createElement(o, {
		chartName: "RadarChart",
		defaultTooltipEventType: "axis",
		validateTooltipEventTypes: Hr,
		tooltipPayloadSearcher: Te,
		categoricalChartProps: n,
		ref: t
	});
}), X = Et(), Gr = H.memo(function({ cx: e, cy: t, dataKey: n, chartId: r, className: i, fillOpacity: a = 1, type: o = "default", maskId: s }) {
	let c = H.useId().replace(/:/g, ""), l = `url(#${r}-colors-${String(n)})`;
	if (e === void 0 || t === void 0) return null;
	switch (o) {
		case "border": return /* @__PURE__ */ (0, X.jsx)(qr, {
			cx: e,
			cy: t,
			dotId: c,
			fillOpacity: a,
			gradientUrl: l,
			className: i,
			maskId: s
		});
		case "colored-border": return /* @__PURE__ */ (0, X.jsx)(Jr, {
			cx: e,
			cy: t,
			dotId: c,
			fillOpacity: a,
			gradientUrl: l,
			className: i,
			maskId: s
		});
		default: return /* @__PURE__ */ (0, X.jsx)(Kr, {
			cx: e,
			cy: t,
			dotId: c,
			fillOpacity: a,
			gradientUrl: l,
			className: i,
			maskId: s
		});
	}
}), Kr = H.memo(({ cx: e, cy: t, dotId: n, fillOpacity: r, gradientUrl: i, className: a, maskId: o }) => /* @__PURE__ */ (0, X.jsxs)("g", {
	className: a,
	mask: o ? `url(#${o})` : void 0,
	children: [/* @__PURE__ */ (0, X.jsx)("defs", { children: /* @__PURE__ */ (0, X.jsx)("clipPath", {
		id: `dot-clip-${n}`,
		children: /* @__PURE__ */ (0, X.jsx)("circle", {
			cx: e,
			cy: t,
			r: 3
		})
	}) }), /* @__PURE__ */ (0, X.jsx)("rect", {
		x: "0",
		y: t - 3,
		width: "100%",
		height: 6,
		fill: i,
		fillOpacity: r,
		clipPath: `url(#dot-clip-${n})`
	})]
}));
Kr.displayName = "DefaultDot";
var qr = H.memo(({ cx: e, cy: t, dotId: n, fillOpacity: r, gradientUrl: i, className: a, maskId: o }) => /* @__PURE__ */ (0, X.jsxs)("g", {
	className: s(a, "text-background"),
	mask: o ? `url(#${o})` : void 0,
	children: [
		/* @__PURE__ */ (0, X.jsx)("defs", { children: /* @__PURE__ */ (0, X.jsx)("clipPath", {
			id: `dot-clip-${n}`,
			children: /* @__PURE__ */ (0, X.jsx)("circle", {
				cx: e,
				cy: t,
				r: 6
			})
		}) }),
		/* @__PURE__ */ (0, X.jsx)("circle", {
			cx: e,
			cy: t,
			r: 6,
			fill: "currentColor"
		}),
		/* @__PURE__ */ (0, X.jsx)("rect", {
			x: "0",
			y: t - (6 - 5 / 2),
			width: "100%",
			height: 7,
			fill: i,
			fillOpacity: r,
			clipPath: `url(#dot-clip-inner-${n})`
		}),
		/* @__PURE__ */ (0, X.jsx)("defs", { children: /* @__PURE__ */ (0, X.jsx)("clipPath", {
			id: `dot-clip-inner-${n}`,
			children: /* @__PURE__ */ (0, X.jsx)("circle", {
				cx: e,
				cy: t,
				r: 6 - 5 / 2
			})
		}) })
	]
}));
qr.displayName = "PrimaryBorderDot";
var Jr = H.memo(({ cx: e, cy: t, dotId: n, fillOpacity: r, gradientUrl: i, className: a, maskId: o }) => /* @__PURE__ */ (0, X.jsxs)("g", {
	className: s(a, "text-background"),
	mask: o ? `url(#${o})` : void 0,
	children: [
		/* @__PURE__ */ (0, X.jsx)("defs", { children: /* @__PURE__ */ (0, X.jsx)("clipPath", {
			id: `dot-clip-${n}`,
			children: /* @__PURE__ */ (0, X.jsx)("circle", {
				cx: e,
				cy: t,
				r: 3.5
			})
		}) }),
		/* @__PURE__ */ (0, X.jsx)("rect", {
			x: "0",
			y: t - 3 - 1 / 2,
			width: "100%",
			height: 7,
			fill: i,
			fillOpacity: r,
			clipPath: `url(#dot-clip-${n})`
		}),
		/* @__PURE__ */ (0, X.jsx)("circle", {
			cx: e,
			cy: t,
			r: 3 - 1 / 2,
			fill: "currentColor"
		})
	]
}));
Jr.displayName = "ColoredBorderDot";
//#endregion
//#region src/react/evilcharts/registry/charts/recharts-radar-chart.tsx
var Yr = 1, Xr = .3, Zr = 6, Qr = 1500, $r = "value", ei = (0, H.createContext)(null);
function Z() {
	let e = (0, H.use)(ei);
	if (!e) throw Error("Radar chart parts (<Radar />, <PolarAngleAxis />, …) must be used within <EvilRadarChart />");
	return e;
}
function Q({ config: e, data: t, children: n, className: r, chartProps: a, backgroundVariant: o, defaultSelectedDataKey: s = null, onSelectionChange: c, isLoading: l = !1, loadingPoints: u }) {
	let d = (0, H.useId)().replace(/:/g, ""), [f, p] = (0, H.useState)(s), m = gi(l, u), h = (0, H.useCallback)((e) => {
		p(e), c?.(e);
	}, [c]), g = (0, H.useMemo)(() => ({
		config: e,
		isLoading: l,
		selectedDataKey: f,
		selectDataKey: h
	}), [
		e,
		l,
		f,
		h
	]);
	return /* @__PURE__ */ (0, X.jsx)(ei, {
		value: g,
		children: /* @__PURE__ */ (0, X.jsxs)(i, {
			className: r,
			config: e,
			children: [/* @__PURE__ */ (0, X.jsx)(Be, { isLoading: l }), /* @__PURE__ */ (0, X.jsxs)(Wr, {
				id: d,
				data: l ? m : t,
				...a,
				children: [
					o && /* @__PURE__ */ (0, X.jsx)(ze, { variant: o }),
					n,
					l && /* @__PURE__ */ (0, X.jsx)(_i, {})
				]
			})]
		})
	});
}
function ti({ dataKey: e, variant: t = "filled", fillOpacity: n = Xr, isGlowing: r = !1, isClickable: i = !1, children: a, radarProps: o }) {
	let { config: s, isLoading: c, selectedDataKey: l, selectDataKey: u } = Z(), d = (0, H.useId)().replace(/:/g, "");
	if (c) return null;
	let f = i && l !== null && l !== e, p = {
		stroke: f ? .2 : 1,
		fill: f ? .1 : 1,
		dot: f ? .2 : 1
	}, m = t === "filled", { dot: h, activeDot: g } = li(a, d, e, p.dot);
	return /* @__PURE__ */ (0, X.jsxs)(X.Fragment, { children: [/* @__PURE__ */ (0, X.jsx)(Ir, {
		dataKey: e,
		stroke: `url(#${d}-radar-stroke-${e})`,
		strokeOpacity: p.stroke,
		strokeWidth: Yr,
		fill: m ? `url(#${d}-radar-fill-${e})` : "none",
		fillOpacity: m ? n * p.fill : 0,
		dot: h,
		activeDot: g,
		filter: r ? `url(#${d}-radar-glow-${e})` : void 0,
		className: "transition-opacity duration-200",
		style: i ? { cursor: "pointer" } : void 0,
		onClick: () => {
			i && u(l === e ? null : e);
		},
		...o
	}), /* @__PURE__ */ (0, X.jsxs)("defs", { children: [
		/* @__PURE__ */ (0, X.jsx)(di, {
			id: d,
			dataKey: e,
			config: s
		}),
		/* @__PURE__ */ (0, X.jsx)(fi, {
			id: d,
			dataKey: e,
			config: s
		}),
		m && /* @__PURE__ */ (0, X.jsx)(pi, {
			id: d,
			dataKey: e,
			config: s
		}),
		r && /* @__PURE__ */ (0, X.jsx)(mi, {
			id: d,
			dataKey: e
		})
	] })] });
}
var ni = () => null, ri = () => null;
function ii({ gridType: e = "polygon", stroke: t = "currentColor", strokeOpacity: n = .2, strokeDasharray: r = "3 4", ...i }) {
	return /* @__PURE__ */ (0, X.jsx)(On, {
		gridType: e,
		stroke: t,
		strokeOpacity: n,
		strokeDasharray: r,
		...i
	});
}
function ai({ tick: e = {
	fill: "currentColor",
	fontSize: 12
}, tickLine: t = !1, ...n }) {
	let { isLoading: r } = Z();
	return r ? null : /* @__PURE__ */ (0, X.jsx)(se, {
		tick: e,
		tickLine: t,
		...n
	});
}
function oi({ tick: e = {
	fill: "currentColor",
	fontSize: 10
}, tickLine: t = !1, axisLine: n = !1, ...r }) {
	let { isLoading: i } = Z();
	return i ? null : /* @__PURE__ */ (0, X.jsx)(Xn, {
		tick: e,
		tickLine: t,
		axisLine: n,
		...r
	});
}
function si({ variant: e, roundness: t, defaultIndex: n }) {
	let { isLoading: r, selectedDataKey: i } = Z();
	return r ? null : /* @__PURE__ */ (0, X.jsx)(He, {
		defaultIndex: n,
		cursor: !1,
		content: /* @__PURE__ */ (0, X.jsx)(w, {
			selected: i,
			roundness: t,
			variant: e
		})
	});
}
function ci({ variant: e, align: t = "center", verticalAlign: n = "bottom", isClickable: r = !1 }) {
	let { isLoading: i, selectedDataKey: a, selectDataKey: o } = Z();
	return i ? null : /* @__PURE__ */ (0, X.jsx)(We, {
		verticalAlign: n,
		align: t,
		content: /* @__PURE__ */ (0, X.jsx)(pe, {
			selected: a,
			onSelectChange: o,
			isClickable: r,
			variant: e
		})
	});
}
var li = (e, t, n, r) => {
	let i = !1, a = !1;
	return H.Children.forEach(e, (e) => {
		if ((0, H.isValidElement)(e)) {
			if (e.type === ni) {
				let { variant: a } = e.props;
				i = /* @__PURE__ */ (0, X.jsx)(Gr, {
					type: a,
					dataKey: n,
					chartId: t,
					fillOpacity: r
				});
			}
			if (e.type === ri) {
				let { variant: i } = e.props;
				a = /* @__PURE__ */ (0, X.jsx)(Gr, {
					type: i,
					dataKey: n,
					chartId: t,
					fillOpacity: r
				});
			}
		}
	}), {
		dot: i,
		activeDot: a
	};
}, ui = ({ dataKey: e, colorsCount: t, opacities: n }) => t === 1 ? /* @__PURE__ */ (0, X.jsxs)(X.Fragment, { children: [/* @__PURE__ */ (0, X.jsx)("stop", {
	offset: "0%",
	stopColor: `var(--color-${e}-0)`,
	stopOpacity: n?.[0]
}), /* @__PURE__ */ (0, X.jsx)("stop", {
	offset: "100%",
	stopColor: `var(--color-${e}-0)`,
	stopOpacity: n?.[n.length - 1]
})] }) : /* @__PURE__ */ (0, X.jsx)(X.Fragment, { children: Array.from({ length: t }, (r, i) => {
	let a = `${i / (t - 1) * 100}%`;
	return /* @__PURE__ */ (0, X.jsx)("stop", {
		offset: a,
		stopColor: `var(--color-${e}-${i}, var(--color-${e}-0))`,
		stopOpacity: n?.[i]
	}, a);
}) }), di = ({ id: e, dataKey: t, config: n }) => {
	let r = E(n[t] ?? {});
	return /* @__PURE__ */ (0, X.jsx)("linearGradient", {
		id: `${e}-colors-${t}`,
		x1: "0",
		y1: "0",
		x2: "1",
		y2: "0",
		children: /* @__PURE__ */ (0, X.jsx)(ui, {
			dataKey: t,
			colorsCount: r
		})
	});
}, fi = ({ id: e, dataKey: t, config: n }) => {
	let r = E(n[t] ?? {});
	return /* @__PURE__ */ (0, X.jsx)("linearGradient", {
		id: `${e}-radar-stroke-${t}`,
		x1: "0",
		y1: "0",
		x2: "1",
		y2: "1",
		children: /* @__PURE__ */ (0, X.jsx)(ui, {
			dataKey: t,
			colorsCount: r
		})
	});
}, pi = ({ id: e, dataKey: t, config: n }) => {
	let r = E(n[t] ?? {}), i = r === 1 ? [.8, .3] : Array.from({ length: r }, (e, t) => t === 0 ? .8 : .3);
	return /* @__PURE__ */ (0, X.jsx)("radialGradient", {
		id: `${e}-radar-fill-${t}`,
		cx: "50%",
		cy: "50%",
		r: "50%",
		children: /* @__PURE__ */ (0, X.jsx)(ui, {
			dataKey: t,
			colorsCount: r,
			opacities: i
		})
	});
}, mi = ({ id: e, dataKey: t }) => /* @__PURE__ */ (0, X.jsxs)("filter", {
	id: `${e}-radar-glow-${t}`,
	x: "-50%",
	y: "-50%",
	width: "200%",
	height: "200%",
	children: [
		/* @__PURE__ */ (0, X.jsx)("feGaussianBlur", {
			in: "SourceGraphic",
			stdDeviation: "4",
			result: "blur"
		}),
		/* @__PURE__ */ (0, X.jsx)("feColorMatrix", {
			in: "blur",
			type: "matrix",
			values: "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.6 0",
			result: "glow"
		}),
		/* @__PURE__ */ (0, X.jsxs)("feMerge", { children: [/* @__PURE__ */ (0, X.jsx)("feMergeNode", { in: "glow" }), /* @__PURE__ */ (0, X.jsx)("feMergeNode", { in: "SourceGraphic" })] })
	]
}), hi = (e) => [
	"A",
	"B",
	"C",
	"D",
	"E",
	"F"
].slice(0, e).map((e) => ({
	skill: e,
	[$r]: 30 + Math.random() * 70
}));
function gi(e, t = Zr) {
	let [n, r] = (0, H.useState)(0);
	return (0, H.useEffect)(() => {
		if (!e) return;
		let t = setInterval(() => {
			r((e) => e + 1);
		}, Qr);
		return () => clearInterval(t);
	}, [e]), (0, H.useMemo)(() => hi(t), [t, n]);
}
var _i = () => /* @__PURE__ */ (0, X.jsx)(Ir, {
	dataKey: $r,
	stroke: "currentColor",
	strokeOpacity: .3,
	strokeWidth: 2,
	fill: "currentColor",
	fillOpacity: .1,
	dot: !1,
	isAnimationActive: !0,
	animationDuration: Qr,
	animationEasing: "ease-in-out"
});
Q.Radar = ti, Q.Dot = ni, Q.ActiveDot = ri, Q.PolarGrid = ii, Q.PolarAngleAxis = ai, Q.PolarRadiusAxis = oi, Q.Tooltip = si, Q.Legend = ci;
//#endregion
//#region src/react/taste/charts.tsx
function vi(e) {
	let { x: t = 0, cx: n, textAnchor: r, payload: i, ...a } = e, o = String(i?.value ?? ""), s = typeof n == "number" ? n * 2 : 0, c = s ? r === "start" ? s - t : r === "end" ? t : 2 * Math.min(t, s - t) : 56;
	return /* @__PURE__ */ (0, X.jsxs)("g", { children: [/* @__PURE__ */ (0, X.jsx)("title", { children: o }), /* @__PURE__ */ (0, X.jsx)(be, {
		...a,
		x: t,
		textAnchor: r,
		fill: "currentColor",
		fontSize: 12,
		children: ke(o, c - 4)
	})] });
}
var yi = [
	"stroke-chart-1",
	"stroke-chart-2",
	"stroke-chart-3",
	"stroke-chart-4",
	"stroke-chart-5",
	"stroke-chart-6"
], bi = [
	"fill-chart-1",
	"fill-chart-2",
	"fill-chart-3",
	"fill-chart-4",
	"fill-chart-5",
	"fill-chart-6"
], xi = { value: {
	label: "标签出现次数",
	colors: xe(me[3])
} }, Si = [
	"min-h-24",
	"min-h-24",
	"min-h-24",
	"min-h-32",
	"min-h-40",
	"min-h-48",
	"min-h-52",
	"min-h-60",
	"min-h-64"
], Ci = 26, wi = { radius: xi.value }, Ti = (e, t) => Math.sqrt(e / t);
function Ei({ rows: e, label: t }) {
	let n = Nt(e);
	if (!n.length) return null;
	let r = n[0].value, i = n.map((e) => ({
		...e,
		radius: Ti(e.value, r)
	}));
	return /* @__PURE__ */ (0, X.jsx)("div", {
		role: "img",
		"aria-label": `${t}：${i.map((e) => e.name).join("，")}`,
		children: /* @__PURE__ */ (0, X.jsxs)(Q, {
			data: i,
			config: wi,
			chartProps: { outerRadius: "58%" },
			className: "aspect-auto h-70 text-text-secondary",
			children: [
				/* @__PURE__ */ (0, X.jsx)(Q.PolarGrid, {}),
				/* @__PURE__ */ (0, X.jsx)(Q.PolarAngleAxis, {
					dataKey: "name",
					tick: /* @__PURE__ */ (0, X.jsx)(vi, {})
				}),
				/* @__PURE__ */ (0, X.jsx)(Q.PolarRadiusAxis, {
					domain: [0, 1],
					allowDecimals: !0,
					tick: !1
				}),
				/* @__PURE__ */ (0, X.jsx)(Q.Radar, { dataKey: "radius" }),
				/* @__PURE__ */ (0, X.jsx)(De, { valueKey: "value" })
			]
		})
	});
}
function Di({ rows: e, label: t }) {
	let n = en(e, 8);
	return n.length ? /* @__PURE__ */ (0, X.jsx)("section", {
		"aria-label": t,
		className: `flex grow flex-col ${Si[n.length]}`,
		children: /* @__PURE__ */ (0, X.jsxs)(le, {
			data: n,
			config: xi,
			layout: "horizontal",
			barRadius: 4,
			chartProps: {
				maxBarSize: Ci,
				margin: {
					top: 5,
					right: 56,
					bottom: 5,
					left: 5
				}
			},
			className: "aspect-auto text-text-secondary",
			children: [
				/* @__PURE__ */ (0, X.jsx)(le.YAxis, {
					dataKey: "name",
					interval: 0,
					tick: /* @__PURE__ */ (0, X.jsx)(Ce, { along: "y" }),
					width: ye(n.map((e) => e.name))
				}),
				/* @__PURE__ */ (0, X.jsx)(le.XAxis, {
					hide: !0,
					domain: Ae
				}),
				/* @__PURE__ */ (0, X.jsx)(le.Bar, {
					dataKey: "value",
					enableHoverHighlight: !0,
					barProps: {
						dataKey: "value",
						label: ue("right")
					}
				}),
				/* @__PURE__ */ (0, X.jsx)(De, {})
			]
		})
	}) : null;
}
function Oi({ flows: e }) {
	let [t, n] = (0, H.useState)(null), r = Dt(e);
	if (!r) return null;
	let i = t?.node ?? null, a = (e, n) => t ? i === null ? t.label === n : e.source === i || e.target === i : !0;
	return /* @__PURE__ */ (0, X.jsxs)("section", {
		className: Me,
		children: [
			/* @__PURE__ */ (0, X.jsx)(ge, {
				title: "创作者线索来源",
				figure: (t ? t.value : r.total).toLocaleString(),
				note: t ? t.label : "条线索"
			}),
			/* @__PURE__ */ (0, X.jsx)("ol", {
				"aria-label": "来源网站与创作者线索",
				className: "flex flex-col sm:hidden",
				children: [...r.links].sort((e, t) => t.value - e.value).map((e) => /* @__PURE__ */ (0, X.jsxs)("li", {
					className: "flex items-baseline justify-between gap-3 border-b border-separator-border py-2 text-body-2-regular text-text-primary last:border-b-0",
					children: [/* @__PURE__ */ (0, X.jsx)("span", {
						className: "min-w-0 wrap-anywhere",
						children: e.label
					}), /* @__PURE__ */ (0, X.jsx)("b", {
						className: "shrink-0 tabular-nums",
						children: e.value.toLocaleString()
					})]
				}, e.key))
			}),
			/* @__PURE__ */ (0, X.jsx)("div", {
				className: "min-w-0 max-sm:hidden",
				children: /* @__PURE__ */ (0, X.jsxs)("svg", {
					viewBox: `0 0 ${Ft.width} ${r.height}`,
					fill: "none",
					role: "img",
					"aria-label": "来源网站与创作者线索",
					className: "block h-auto w-full",
					onPointerLeave: () => n(null),
					children: [/* @__PURE__ */ (0, X.jsx)("g", { children: r.links.map((e) => /* @__PURE__ */ (0, X.jsx)("path", {
						d: e.d,
						strokeWidth: e.width,
						tabIndex: 0,
						role: "img",
						"aria-label": `${e.label}：${e.value} 条线索`,
						fillOpacity: 0,
						strokeOpacity: a(e, e.label) ? .55 : .08,
						className: `outline-none transition-opacity ${yi[e.color]}`,
						onPointerEnter: () => n({
							value: e.value,
							label: e.label,
							node: null
						}),
						onFocus: () => n({
							value: e.value,
							label: e.label,
							node: null
						}),
						onBlur: () => n(null)
					}, e.key)) }), /* @__PURE__ */ (0, X.jsx)("g", { children: r.nodes.map((e) => /* @__PURE__ */ (0, X.jsxs)("g", {
						tabIndex: 0,
						role: "img",
						"aria-label": `${e.name}：${e.value} 条线索`,
						className: "outline-none focus-visible:opacity-100",
						onPointerEnter: () => n({
							value: e.value,
							label: e.name,
							node: e.index
						}),
						onFocus: () => n({
							value: e.value,
							label: e.name,
							node: e.index
						}),
						onBlur: () => n(null),
						children: [/* @__PURE__ */ (0, X.jsx)("rect", {
							x: e.x,
							y: e.y,
							width: 10,
							height: e.height,
							rx: 5,
							className: e.side === "source" ? bi[e.color] : "fill-text-secondary"
						}), /* @__PURE__ */ (0, X.jsxs)("text", {
							x: Yt[e.side],
							y: e.y + e.height / 2,
							textAnchor: e.side === "source" ? "end" : "start",
							dominantBaseline: "middle",
							className: "fill-text-secondary text-caption-1-regular",
							children: [kt(e.name), /* @__PURE__ */ (0, X.jsx)("tspan", {
								x: Yt[e.side],
								dy: 15,
								children: e.side === "source" ? e.value.toLocaleString() : `${e.share.toFixed(1)}%`
							})]
						})]
					}, e.id)) })]
				})
			}),
			/* @__PURE__ */ (0, X.jsxs)("footer", {
				className: "flex justify-between gap-3 text-caption-1-regular text-text-secondary max-sm:hidden",
				children: [/* @__PURE__ */ (0, X.jsx)("span", { children: "来源网站" }), /* @__PURE__ */ (0, X.jsx)("span", { children: "创作者 · 线索占比" })]
			})
		]
	});
}
//#endregion
//#region src/react/taste/browser-sources.tsx
var ki = "flex min-w-0 items-center gap-3 rounded-xl bg-background-primary-default p-3";
function Ai({ browsers: e, sources: t, range: n, children: r }) {
	let [i, a] = (0, H.useState)(!1), [o, s] = (0, H.useState)(""), [c, l] = (0, H.useState)(""), u = It({
		mutationFn: (e) => Tt(e, n),
		onSuccess: (e) => {
			P.setQueryData(Ze(n), e.dashboard), a(!1), s(""), l("");
		}
	});
	return /* @__PURE__ */ (0, X.jsxs)("section", {
		className: `${F()} flex flex-col gap-4`,
		"aria-label": "数据源",
		children: [
			/* @__PURE__ */ (0, X.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, X.jsx)("h3", {
					className: "text-title-2-medium text-text-primary",
					children: "数据源"
				}), /* @__PURE__ */ (0, X.jsx)(L, {
					variant: "secondary",
					onClick: () => a(!0),
					disabled: i,
					children: "添加浏览器"
				})]
			}),
			u.error ? /* @__PURE__ */ (0, X.jsx)(V, {
				tone: "error",
				children: N(u.error)
			}) : null,
			i ? /* @__PURE__ */ (0, X.jsxs)("form", {
				className: "flex flex-col gap-3",
				onSubmit: (e) => {
					e.preventDefault(), u.isPending || u.mutate({
						operation: "add",
						name: o,
						path: c
					});
				},
				children: [
					/* @__PURE__ */ (0, X.jsx)(zt, {
						label: "浏览器名称",
						value: o,
						onChange: s,
						maxLength: 80,
						isRequired: !0,
						isDisabled: u.isPending
					}),
					/* @__PURE__ */ (0, X.jsx)(zt, {
						label: "资料目录或历史文件",
						value: c,
						onChange: l,
						maxLength: 1024,
						isRequired: !0,
						isDisabled: u.isPending,
						hint: "请选择运行 Peach 的电脑上的浏览器资料。"
					}),
					/* @__PURE__ */ (0, X.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, X.jsx)(L, {
							variant: "ghost",
							disabled: u.isPending,
							onClick: () => {
								a(!1), u.reset();
							},
							children: "取消"
						}), /* @__PURE__ */ (0, X.jsx)(L, {
							type: "submit",
							variant: "secondary",
							disabled: !o.trim() || !c.trim(),
							...B(u.isPending),
							children: "添加"
						})]
					})
				]
			}) : null,
			/* @__PURE__ */ (0, X.jsxs)("div", {
				className: "inline-grid w-full min-w-0 gap-2 sm:grid-cols-2",
				children: [r, e.map((e) => {
					let n = t.filter((t) => e.source_keys?.includes(t.source_key)), r = n.reduce((e, t) => e + (t.visits || 0), 0), i = n.reduce((e, t) => e + (t.bookmarks || 0), 0);
					return /* @__PURE__ */ (0, X.jsxs)("div", {
						"data-taste-source": "browser",
						className: ki,
						children: [
							/* @__PURE__ */ (0, X.jsx)("span", {
								className: "inline-grid size-8 shrink-0 place-items-center rounded-lg text-text-secondary",
								children: /* @__PURE__ */ (0, X.jsx)(bt, {
									"aria-hidden": !0,
									className: "size-4"
								})
							}),
							/* @__PURE__ */ (0, X.jsxs)("div", {
								className: "flex min-w-0 grow flex-col gap-0.5",
								children: [
									/* @__PURE__ */ (0, X.jsx)("b", {
										className: "text-body-2-medium break-words text-text-primary",
										children: e.name
									}),
									/* @__PURE__ */ (0, X.jsx)("span", {
										className: "break-all text-caption-1-regular text-text-secondary",
										children: e.path
									}),
									/* @__PURE__ */ (0, X.jsx)("span", {
										className: "text-caption-1-regular text-text-secondary",
										children: e.enabled ? e.available ? `历史与书签 · ${e.profiles} 个资料` : "资料目录不可用" : "已停止读取"
									}),
									n.length ? /* @__PURE__ */ (0, X.jsxs)("span", {
										className: "text-caption-1-regular text-text-secondary",
										children: [
											r.toLocaleString(),
											" 条历史 · ",
											i.toLocaleString(),
											" 枚书签"
										]
									}) : null
								]
							}),
							/* @__PURE__ */ (0, X.jsxs)("span", {
								className: "flex shrink-0 gap-1",
								children: [/* @__PURE__ */ (0, X.jsx)(L, {
									variant: "secondary",
									size: "small",
									...B(u.isPending),
									iconOnly: !0,
									leadingIcon: e.enabled ? Qe : an,
									"aria-label": `${e.enabled ? "停止读取" : "启用"} ${e.name}`,
									onClick: () => {
										e.enabled ? lt({
											title: `停止读取 ${e.name}`,
											body: "已导入的历史与书签仍用于口味分析。",
											confirmLabel: "停止读取",
											onConfirm: () => u.mutateAsync({
												operation: "disable",
												id: e.id
											})
										}) : u.mutate({
											operation: "enable",
											id: e.id
										});
									}
								}), /* @__PURE__ */ (0, X.jsx)(L, {
									variant: "secondary",
									size: "small",
									iconOnly: !0,
									leadingIcon: wt,
									...B(u.isPending),
									"aria-label": `删除 ${e.name}`,
									onClick: () => {
										lt({
											title: `删除 ${e.name}`,
											body: "移除该浏览器的读取配置和已导入历史、书签，浏览器原文件保留。可以通过添加浏览器重新接入。",
											confirmLabel: "删除浏览器来源",
											danger: !0,
											onConfirm: () => u.mutateAsync({
												operation: "delete_browser",
												id: e.id
											})
										});
									}
								})]
							})
						]
					}, e.id);
				})]
			})
		]
	});
}
//#endregion
//#region src/react/taste/taste-page.tsx
var ji = 10, Mi = pt(it, qe, "text-body-2-medium"), Ni = `${F()} flex flex-col gap-4`, Pi = "rounded-xl bg-background-primary-default p-3", Fi = "读取运行 Peach 的这台电脑上的浏览历史与书签", Ii = "导入或读取浏览记录后，这里会列出记录来自哪些设备。", Li = "馆藏中暂时没有与你浏览过的内容相符的标签。", Ri = "读取浏览记录后，这里会按类别汇总你浏览过的内容。", zi = "这些标签出现在浏览记录中，Peach 的观看或评价记录中尚未出现这些标签", Bi = "采集浏览记录后，这里会列出浏览过的标签。", Vi = "采集浏览记录后，这里会列出浏览过的创作者。", Hi = "采集浏览记录后，这里会列出常访问的网站。", Ui = "在 Peach 里播放或评价作品后，这里会列出对应的标签。", Wi = "在 Peach 里播放或评价作品后，这里会列出对应的创作者。", Gi = "在 Peach 里播放或评价作品后，这里会列出对应的女优。", Ki = "在运行 Peach 的电脑上使用浏览器：点上面的「读取浏览器记录」。", qi = "记录在其他设备上：导出文件后，选择「导入历史文件」或「导入书签文件」。书签支持浏览器导出的 HTML 文件和 Chromium Bookmarks JSON 文件。", Ji = "需要刷新时再次读取或导入；数据源可在页面底部移除。", Yi = "删除这个来源的已导入记录，原始文件保留。若浏览器仍启用，下次读取会再次导入。", Xi = "peach-taste-guide-dismissed", Zi = (0, H.createContext)(/* @__PURE__ */ (0, X.jsx)(qt, {
	size: "small",
	href: "/",
	children: "浏览馆藏"
}));
function Qi() {
	return (0, H.useContext)(Zi);
}
function $({ icon: e, term: t, figure: n, detail: r, detailTitle: i, accent: a }) {
	return /* @__PURE__ */ (0, X.jsx)("div", {
		className: dn(),
		children: /* @__PURE__ */ (0, X.jsx)(ln, {
			label: t,
			icon: e,
			accent: a,
			figure: n,
			footer: /* @__PURE__ */ (0, X.jsx)("span", {
				className: "block min-w-0 truncate",
				title: i || r,
				children: r ?? ""
			})
		})
	});
}
function $i({ name: e, domain: t }) {
	return /* @__PURE__ */ (0, X.jsxs)("span", {
		className: "relative inline-grid size-8 shrink-0 place-items-center overflow-hidden rounded-lg bg-background-tertiary-default text-caption-1-medium text-text-secondary",
		children: [mt(e).toUpperCase(), /* @__PURE__ */ (0, X.jsx)("img", {
			src: Je({ domain: t }),
			alt: "",
			loading: "lazy",
			width: 20,
			height: 20,
			onError: (e) => e.currentTarget.remove(),
			className: "absolute size-5 object-contain"
		})]
	});
}
function ea({ html: e }) {
	return /* @__PURE__ */ (0, X.jsx)("span", {
		className: `relative inline-grid size-8 shrink-0 place-items-center overflow-hidden rounded-full bg-background-tertiary-default text-caption-1-medium text-text-secondary ${fn}`,
		dangerouslySetInnerHTML: { __html: e }
	});
}
function ta({ rows: e, kind: t, visual: n, empty: r, onSignal: i }) {
	if (!e.length) return /* @__PURE__ */ (0, X.jsx)(R, {
		size: "compact",
		icon: I,
		title: "记录还不够",
		actions: /* @__PURE__ */ (0, X.jsx)(Qi, {}),
		children: r
	});
	let a = vt(e);
	return /* @__PURE__ */ (0, X.jsx)(Fe, {
		previewCount: ji,
		className: "inline-grid w-full gap-x-7 gap-y-2 sm:grid-cols-2",
		children: e.map((e, r) => {
			let o = !!t && !!e.peach_items, s = String(e.source_domain || ""), c = /* @__PURE__ */ (0, X.jsxs)(X.Fragment, { children: [
				/* @__PURE__ */ (0, X.jsx)("svg", {
					viewBox: "0 0 100 1",
					preserveAspectRatio: "none",
					"aria-hidden": !0,
					className: "absolute inset-0 -z-10 size-full overflow-hidden rounded-lg opacity-15",
					children: /* @__PURE__ */ (0, X.jsx)("rect", {
						width: a[r],
						height: 1,
						className: "fill-chart-4"
					})
				}),
				/* @__PURE__ */ (0, X.jsx)("span", {
					className: "w-6 shrink-0 text-caption-1-regular tabular-nums text-text-secondary",
					children: r + 1
				}),
				n === "domain" ? /* @__PURE__ */ (0, X.jsx)($i, {
					name: e.name,
					domain: e.name
				}) : null,
				n === "creator" && !e.entity_id && !e.has_avatar && s ? /* @__PURE__ */ (0, X.jsx)($i, {
					name: e.name,
					domain: s
				}) : null,
				n !== "none" && n !== "domain" && (e.entity_id || e.has_avatar || !s) ? /* @__PURE__ */ (0, X.jsx)(ea, { html: et(e.name, e.entity_id ? {
					id: e.entity_id,
					has_image: !!e.has_image,
					image_version: e.image_version,
					avatar_focus: e.avatar_focus,
					avatar_stand_in: e.avatar_stand_in
				} : null, e.has_avatar ? e.representative_asset_id ?? null : null, n === "creator" ? "creator" : t || "performer") }) : null,
				/* @__PURE__ */ (0, X.jsxs)("span", {
					className: "flex min-w-0 grow flex-col gap-0.5",
					children: [/* @__PURE__ */ (0, X.jsx)("b", {
						className: "min-w-0 text-body-medium break-words text-text-primary",
						children: e.name
					}), /* @__PURE__ */ (0, X.jsx)("small", {
						className: "text-caption-1-regular text-text-secondary",
						children: jt(e)
					})]
				}),
				o ? /* @__PURE__ */ (0, X.jsx)(tt, {
					"aria-hidden": !0,
					className: "size-4 shrink-0 text-text-tertiary"
				}) : null
			] }), l = "relative isolate flex min-h-11 w-full min-w-0 items-center gap-2.5 rounded-lg px-3 py-2 text-left";
			return /* @__PURE__ */ (0, X.jsx)("li", {
				className: "min-w-0",
				children: o ? /* @__PURE__ */ (0, X.jsx)("button", {
					type: "button",
					onClick: () => i(t, e.name),
					className: `${l} cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring`,
					children: c
				}) : /* @__PURE__ */ (0, X.jsx)("div", {
					className: l,
					children: c
				})
			}, `${e.name}:${r}`);
		})
	});
}
function na({ label: e, panels: t, onSignal: n }) {
	return /* @__PURE__ */ (0, X.jsxs)(Ye, {
		className: `${F({ padding: "none" })} flex flex-col`,
		children: [/* @__PURE__ */ (0, X.jsx)("div", {
			className: "px-4 pt-3",
			children: /* @__PURE__ */ (0, X.jsx)(Pt, {
				"aria-label": e,
				className: Kt,
				children: t.map((e) => /* @__PURE__ */ (0, X.jsx)(at, {
					id: e.id,
					className: At,
					children: e.name
				}, e.id))
			})
		}), t.map((e) => /* @__PURE__ */ (0, X.jsx)(_t, {
			id: e.id,
			className: "px-4 pt-3.5 pb-4",
			children: /* @__PURE__ */ (0, X.jsx)(ta, {
				...e.props,
				onSignal: n
			})
		}, e.id))]
	});
}
function ra({ data: e, onSignal: t, navigate: n }) {
	let r = e.analysis;
	if (!r?.headline) return null;
	let i = r.confidence || {}, a = [...(r.explore || []).map((e) => ({
		key: `tag:${e.tag}`,
		title: e.title,
		detail: e.detail,
		act: () => t("tag", e.tag)
	})), ...(r.next_steps || []).map((e) => ({
		key: `route:${e.route}`,
		title: e.title,
		detail: e.detail,
		act: () => n(e.route)
	}))];
	return /* @__PURE__ */ (0, X.jsxs)("section", {
		className: Ni,
		"aria-label": "口味总结",
		children: [
			/* @__PURE__ */ (0, X.jsxs)("header", {
				className: "flex flex-col gap-2",
				children: [
					/* @__PURE__ */ (0, X.jsx)("h3", {
						className: "text-title-2-medium text-text-primary",
						children: "口味总结"
					}),
					/* @__PURE__ */ (0, X.jsx)("p", {
						className: "max-w-prose text-title-2-regular wrap-anywhere text-text-primary",
						children: r.headline
					}),
					/* @__PURE__ */ (0, X.jsxs)("p", {
						className: "flex flex-wrap items-center gap-2 text-body-2-regular text-text-secondary",
						children: [/* @__PURE__ */ (0, X.jsx)("i", {
							"aria-hidden": !0,
							className: `size-2 shrink-0 rounded-full ${i.level === "high" ? "bg-status-lime-text" : i.level === "medium" ? "bg-status-yellow-text" : "bg-text-tertiary"}`
						}), /* @__PURE__ */ (0, X.jsx)("span", {
							className: "min-w-0 wrap-anywhere",
							children: i.label || "仍在学习"
						})]
					})
				]
			}),
			r.points?.length ? /* @__PURE__ */ (0, X.jsx)("div", {
				className: "inline-grid w-full gap-3 sm:grid-cols-2",
				children: r.points.map((e) => /* @__PURE__ */ (0, X.jsxs)("div", {
					className: `flex min-w-0 flex-col gap-1 ${Pi}`,
					children: [/* @__PURE__ */ (0, X.jsx)("span", {
						className: "text-caption-1-regular text-text-secondary",
						children: e.label
					}), /* @__PURE__ */ (0, X.jsx)("b", {
						className: "text-body-2-medium break-words text-text-primary",
						children: e.text
					})]
				}, e.label))
			}) : null,
			a.length ? /* @__PURE__ */ (0, X.jsx)("div", {
				className: "flex flex-col gap-2",
				children: a.map((e) => /* @__PURE__ */ (0, X.jsxs)("button", {
					type: "button",
					onClick: e.act,
					className: `flex w-full min-w-0 cursor-pointer items-center gap-3 ${Pi} text-left outline-none hover:bg-background-primary-hover focus-visible:ring-2 focus-visible:ring-border-focus-ring`,
					children: [/* @__PURE__ */ (0, X.jsxs)("span", {
						className: "flex min-w-0 grow flex-col gap-1",
						children: [/* @__PURE__ */ (0, X.jsx)("b", {
							className: "text-body-2-medium wrap-anywhere text-text-primary",
							children: e.title
						}), /* @__PURE__ */ (0, X.jsx)("small", {
							className: "text-caption-1-regular wrap-anywhere text-text-secondary",
							children: e.detail
						})]
					}), /* @__PURE__ */ (0, X.jsx)(tt, {
						"aria-hidden": !0,
						className: "size-4 shrink-0 text-text-tertiary"
					})]
				}, e.key))
			}) : /* @__PURE__ */ (0, X.jsx)(R, {
				size: "compact",
				icon: I,
				title: "还没有可探索的入口",
				actions: /* @__PURE__ */ (0, X.jsx)(qt, {
					size: "small",
					href: "/",
					children: "浏览馆藏"
				}),
				children: Li
			})
		]
	});
}
function ia({ onboarding: e, done: t }) {
	let [n, r] = (0, H.useState)(() => {
		try {
			return localStorage.getItem(Xi) === "1";
		} catch {
			return !1;
		}
	});
	return t || n ? null : /* @__PURE__ */ (0, X.jsx)("div", {
		className: F({
			padding: "none",
			className: "p-4"
		}),
		children: /* @__PURE__ */ (0, X.jsxs)(nn, {
			summary: "浏览器历史记录导入指南",
			defaultOpen: e,
			children: [
				/* @__PURE__ */ (0, X.jsx)("p", {
					className: "text-body-2-regular text-text-secondary",
					children: Ki
				}),
				/* @__PURE__ */ (0, X.jsx)("p", {
					className: "text-body-2-regular text-text-secondary",
					children: qi
				}),
				/* @__PURE__ */ (0, X.jsxs)("ul", {
					className: "flex list-disc flex-col gap-1 pl-5 text-body-2-regular text-text-secondary",
					children: [/* @__PURE__ */ (0, X.jsxs)("li", { children: [
						"Chrome：在 ",
						/* @__PURE__ */ (0, X.jsxs)("a", {
							href: "https://takeout.google.com/",
							target: "_blank",
							rel: "noopener noreferrer",
							className: "text-text-primary underline-offset-4 hover:underline",
							children: ["Google Takeout", /* @__PURE__ */ (0, X.jsx)($e, {
								"aria-hidden": !0,
								className: "size-(--icon-inline) shrink-0"
							})]
						}),
						" ",
						"选择 Chrome 历史记录，下载 ZIP 后直接导入。"
					] }), /* @__PURE__ */ (0, X.jsxs)("li", { children: [
						"其他浏览器：用 ",
						/* @__PURE__ */ (0, X.jsxs)("a", {
							href: "https://github.com/purarue/browserexport",
							target: "_blank",
							rel: "noopener noreferrer",
							className: "text-text-primary underline-offset-4 hover:underline",
							children: ["browserexport", /* @__PURE__ */ (0, X.jsx)($e, {
								"aria-hidden": !0,
								className: "size-(--icon-inline) shrink-0"
							})]
						}),
						" ",
						"导出历史记录，再导入导出文件。"
					] })]
				}),
				/* @__PURE__ */ (0, X.jsx)("p", {
					className: "text-body-2-regular text-text-secondary",
					children: Ji
				}),
				/* @__PURE__ */ (0, X.jsx)("span", {
					className: "self-start",
					children: /* @__PURE__ */ (0, X.jsx)(L, {
						variant: "secondary",
						size: "small",
						onClick: () => {
							try {
								localStorage.setItem(Xi, "1");
							} catch {}
							r(!0);
						},
						children: "跳过"
					})
				})
			]
		})
	});
}
function aa({ busy: e, onRefresh: t, onImport: n, onImportBookmarks: r }) {
	let i = (0, H.useRef)(null), [a, o] = (0, H.useState)(!1), s = (e) => {
		o(!1), e();
	};
	return /* @__PURE__ */ (0, X.jsxs)(X.Fragment, { children: [/* @__PURE__ */ (0, X.jsxs)("span", {
		"data-button-group": !0,
		"data-split-button": !0,
		"data-variant": "primary",
		children: [/* @__PURE__ */ (0, X.jsx)(L, {
			leadingIcon: bt,
			title: Fi,
			onClick: t,
			...B(e),
			children: "读取浏览器记录"
		}), /* @__PURE__ */ (0, X.jsx)(L, {
			ref: i,
			iconOnly: !0,
			leadingIcon: st,
			"aria-label": "更多取得浏览记录的方式",
			"aria-haspopup": "dialog",
			"aria-expanded": a,
			...B(e),
			onClick: () => {
				e || o(!0);
			}
		})]
	}), /* @__PURE__ */ (0, X.jsx)(Bt, {
		triggerRef: i,
		isOpen: a,
		onOpenChange: o,
		placement: "bottom end",
		offset: 4,
		className: Ot,
		children: /* @__PURE__ */ (0, X.jsxs)(dt, {
			"aria-label": "更多取得浏览记录的方式",
			className: "flex w-52 flex-col gap-1 outline-none",
			children: [
				/* @__PURE__ */ (0, X.jsxs)("button", {
					type: "button",
					className: Mi,
					onClick: () => s(t),
					children: [/* @__PURE__ */ (0, X.jsx)(bt, {
						"aria-hidden": !0,
						className: "size-4 shrink-0"
					}), "读取浏览器记录"]
				}),
				/* @__PURE__ */ (0, X.jsxs)("button", {
					type: "button",
					className: Mi,
					onClick: () => s(n),
					children: [/* @__PURE__ */ (0, X.jsx)(ut, {
						"aria-hidden": !0,
						className: "size-4 shrink-0"
					}), "导入历史文件"]
				}),
				/* @__PURE__ */ (0, X.jsxs)("button", {
					type: "button",
					className: Mi,
					onClick: () => s(r),
					children: [/* @__PURE__ */ (0, X.jsx)(sn, {
						"aria-hidden": !0,
						className: "size-4 shrink-0"
					}), "导入书签文件"]
				})
			]
		})
	})] });
}
function oa({ sources: e, browsers: t, window: n, toast: r, emptyActions: i }) {
	let a = It({
		mutationFn: (e) => $t(e, n),
		onSuccess: (e) => {
			P.setQueryData(Ze(n), e.dashboard), r("已移除口味数据源");
		}
	});
	return /* @__PURE__ */ (0, X.jsxs)(Ai, {
		browsers: t,
		sources: e,
		range: n,
		children: [a.error ? /* @__PURE__ */ (0, X.jsx)("div", {
			className: "sm:col-span-2",
			children: /* @__PURE__ */ (0, X.jsx)(V, {
				tone: "error",
				children: N(a.error)
			})
		}) : null, e.length ? /* @__PURE__ */ (0, X.jsx)(X.Fragment, { children: e.filter((e) => !t.some((t) => t.source_keys?.includes(e.source_key))).map((e) => /* @__PURE__ */ (0, X.jsxs)("div", {
			"data-taste-source": "import",
			className: ki,
			children: [
				/* @__PURE__ */ (0, X.jsx)("span", {
					className: "inline-grid size-8 shrink-0 place-items-center rounded-lg text-text-secondary",
					children: e.browser === "browserexport" ? /* @__PURE__ */ (0, X.jsx)(ut, {
						"aria-hidden": !0,
						className: "size-4"
					}) : /* @__PURE__ */ (0, X.jsx)(Lt, {
						"aria-hidden": !0,
						className: "size-4"
					})
				}),
				/* @__PURE__ */ (0, X.jsxs)("span", {
					className: "flex min-w-0 grow flex-col gap-0.5",
					children: [/* @__PURE__ */ (0, X.jsx)("b", {
						className: "min-w-0 text-body-2-medium break-words text-text-primary",
						children: e.profile
					}), /* @__PURE__ */ (0, X.jsx)("small", {
						className: "min-w-0 text-caption-1-regular break-words text-text-secondary",
						children: `导入文件 · ${e.host} · ${Number(e.visits || e.bookmarks || 0).toLocaleString()} ${e.bookmarks ? "枚书签" : "条历史"}`
					})]
				}),
				/* @__PURE__ */ (0, X.jsx)(L, {
					variant: "secondary",
					size: "small",
					"aria-label": `移除 ${e.profile}`,
					className: "shrink-0",
					iconOnly: !0,
					leadingIcon: wt,
					...B(a.isPending),
					onClick: () => {
						a.isPending || lt({
							title: "移除口味数据源",
							body: Yi,
							confirmLabel: "移除口味数据源",
							onConfirm: () => a.mutateAsync(e.source_key)
						});
					}
				})
			]
		}, e.source_key)) }) : t.length ? null : /* @__PURE__ */ (0, X.jsx)(R, {
			size: "compact",
			icon: Lt,
			title: "还没有数据源",
			actions: i,
			children: Ii
		})]
	});
}
function sa(e) {
	let { onSignal: t, navigate: n, toast: r, onboarding: i } = e, [a, o] = (0, H.useState)("all"), [s, c] = (0, H.useState)("browser"), l = (0, H.useRef)(null), u = (0, H.useRef)(null), d = St({
		queryKey: Ze(a),
		queryFn: ({ signal: e }) => Rt(a, e),
		placeholderData: Wt
	}), { job: f, running: p, outcome: m, start: h } = Ht({
		queryKey: Ut,
		queryFn: ({ signal: e }) => Zt(e),
		start: () => rn(a),
		idlePollMs: xt,
		onFinish: (e) => {
			e.status !== "failed" && (P.invalidateQueries({ queryKey: ["taste"] }), r(e.warnings?.length ? "部分浏览记录未取得" : "已更新口味分析"));
		}
	}), g = It({
		mutationFn: (e) => Vt(e),
		onSuccess: (e) => {
			P.setQueryData(Ze("all"), e.dashboard), o("all"), r("已导入口味数据");
		}
	}), _ = (e) => {
		let t = e.currentTarget.files?.[0];
		e.currentTarget.value = "", t && !g.isPending && (g.reset(), g.mutate(t));
	}, v = () => {
		p || h.isPending || (h.reset(), h.mutate());
	}, y = d.data;
	if (!y) return /* @__PURE__ */ (0, X.jsx)(cn, { children: /* @__PURE__ */ (0, X.jsx)(V, {
		tone: "error",
		title: "口味分析读取失败",
		children: d.error ? N(d.error) : "读取口味分析失败"
	}) });
	let b = y.summary || {}, x = y.coverage || {}, S = y.rankings || {}, ee = y.storage || {}, C = tn(S.browser_categories || []), w = Nt(C).length > 0, T = y.gaps || [], E = x.tagged || 0, te = x.identified || 0, ne = h.error ? N(h.error) : g.error ? N(g.error) : m?.status === "failed" ? m.error || "读取未取得" : "", re = /* @__PURE__ */ (0, X.jsxs)("div", {
		className: "flex flex-wrap justify-center gap-2",
		children: [/* @__PURE__ */ (0, X.jsx)(L, {
			variant: "secondary",
			...B(p || h.isPending || g.isPending),
			onClick: v,
			children: "读取浏览器记录"
		}), /* @__PURE__ */ (0, X.jsx)(L, {
			variant: "secondary",
			...B(g.isPending),
			onClick: () => l.current?.click(),
			children: "导入历史文件"
		})]
	});
	return /* @__PURE__ */ (0, X.jsx)(cn, { children: /* @__PURE__ */ (0, X.jsxs)(Zi, {
		value: a === "all" ? s === "peach" ? /* @__PURE__ */ (0, X.jsx)(qt, {
			size: "small",
			variant: "secondary",
			href: "/",
			children: "浏览馆藏"
		}) : re : /* @__PURE__ */ (0, X.jsx)(L, {
			size: "small",
			variant: "secondary",
			onClick: () => o("all"),
			children: "查看全部时间"
		}),
		children: [
			/* @__PURE__ */ (0, X.jsxs)(Ye, {
				selectedKey: s,
				onSelectionChange: (e) => c(String(e)),
				className: "flex flex-col gap-5",
				children: [
					/* @__PURE__ */ (0, X.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, X.jsxs)(Pt, {
							"aria-label": "口味分析的数据来源",
							className: Kt,
							children: [/* @__PURE__ */ (0, X.jsx)(at, {
								id: "browser",
								className: At,
								children: "浏览器记录"
							}), /* @__PURE__ */ (0, X.jsx)(at, {
								id: "peach",
								className: At,
								children: "Peach 观看与评价"
							})]
						}), /* @__PURE__ */ (0, X.jsxs)("div", {
							className: "flex flex-wrap items-center gap-2",
							children: [
								/* @__PURE__ */ (0, X.jsx)(Mt, {
									"aria-label": "分析范围",
									selectedKey: a,
									onSelectionChange: (e) => {
										e !== null && o(String(e));
									},
									children: Xt.map(([e, t]) => /* @__PURE__ */ (0, X.jsx)(yt, {
										id: e,
										children: t
									}, e))
								}),
								/* @__PURE__ */ (0, X.jsx)(aa, {
									busy: p || h.isPending || g.isPending,
									onRefresh: v,
									onImport: () => l.current?.click(),
									onImportBookmarks: () => u.current?.click()
								}),
								/* @__PURE__ */ (0, X.jsx)("input", {
									ref: l,
									type: "file",
									tabIndex: -1,
									"aria-hidden": !0,
									className: "hidden",
									onChange: _
								}),
								/* @__PURE__ */ (0, X.jsx)("input", {
									ref: u,
									type: "file",
									tabIndex: -1,
									"aria-hidden": !0,
									className: "hidden",
									"data-bookmark-import": !0,
									onChange: _
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, X.jsx)(ia, {
						onboarding: i,
						done: !!(b.history_sources || y.updated_at)
					}),
					/* @__PURE__ */ (0, X.jsxs)("div", {
						"aria-live": "polite",
						className: "flex flex-col gap-3 empty:hidden",
						children: [
							p ? /* @__PURE__ */ (0, X.jsx)(ot, {
								label: f?.message || "正在读取浏览记录并更新口味分析",
								value: f?.checked,
								total: f?.total
							}) : null,
							g.isPending ? /* @__PURE__ */ (0, X.jsx)(ot, { label: "正在导入口味数据" }) : null,
							ne ? /* @__PURE__ */ (0, X.jsx)(V, {
								tone: "error",
								children: ne
							}) : null,
							m?.warnings?.length ? /* @__PURE__ */ (0, X.jsx)(V, {
								tone: "warning",
								children: m.warnings.join("；")
							}) : null
						]
					}),
					/* @__PURE__ */ (0, X.jsxs)(_t, {
						id: "browser",
						className: "flex flex-col gap-5",
						children: [
							/* @__PURE__ */ (0, X.jsxs)("div", {
								className: un,
								children: [
									/* @__PURE__ */ (0, X.jsx)($, {
										accent: 0,
										icon: ht,
										term: "浏览记录",
										figure: Number(b.history_visits || 0).toLocaleString(),
										detail: Gt(b),
										detailTitle: `${Ct(b.range_start)}—${Ct(b.range_end)}`
									}),
									/* @__PURE__ */ (0, X.jsx)($, {
										accent: 1,
										icon: ft,
										term: "口味维度",
										figure: C.length.toLocaleString(),
										detail: C[0]?.name || "尚无主维度"
									}),
									/* @__PURE__ */ (0, X.jsx)($, {
										accent: 2,
										icon: I,
										term: "浏览线索",
										figure: T.length.toLocaleString()
									}),
									/* @__PURE__ */ (0, X.jsx)($, {
										accent: 3,
										icon: sn,
										term: "浏览器书签",
										figure: Number(b.bookmarks || 0).toLocaleString(),
										detail: `${Number(ee.exports || 0).toLocaleString()} 份私有导出 · ${gt(ee.bytes || 0)}`
									})
								]
							}),
							/* @__PURE__ */ (0, X.jsxs)("section", {
								className: w ? `${Ni} md:flex-row md:gap-6` : Ni,
								"aria-label": "浏览器画像",
								children: [/* @__PURE__ */ (0, X.jsxs)("div", {
									className: w ? "flex shrink-0 flex-col gap-2 pb-5 md:w-80 md:pr-6 md:pb-0" : "flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1",
									children: [
										/* @__PURE__ */ (0, X.jsx)("span", {
											className: "text-caption-1-regular text-text-secondary",
											children: "浏览器画像"
										}),
										w ? /* @__PURE__ */ (0, X.jsx)(Ei, {
											rows: C,
											label: "主要口味维度"
										}) : null,
										/* @__PURE__ */ (0, X.jsx)("small", {
											className: "text-caption-1-regular text-text-secondary",
											children: y.updated_at ? `更新于 ${Ct(y.updated_at)}` : "尚未采集浏览记录"
										})
									]
								}), /* @__PURE__ */ (0, X.jsx)("div", {
									className: "flex min-w-0 grow flex-col",
									children: C.length ? /* @__PURE__ */ (0, X.jsx)(Di, {
										rows: C,
										label: "口味维度排名"
									}) : /* @__PURE__ */ (0, X.jsx)(R, {
										size: "compact",
										icon: I,
										title: "暂无口味维度",
										actions: /* @__PURE__ */ (0, X.jsx)(Qi, {}),
										children: Ri
									})
								})]
							}),
							/* @__PURE__ */ (0, X.jsx)(Ee, {
								activity: y.activity,
								title: "浏览活跃时间",
								dailyTitle: "每日活跃",
								words: {
									unit: "口味网站访问",
									series: "访问",
									cellUnit: "次访问"
								},
								tone: 4,
								empty: "还没有可用于分析的口味网站访问记录。"
							}),
							/* @__PURE__ */ (0, X.jsx)(Oi, { flows: y.creator_flows }),
							/* @__PURE__ */ (0, X.jsx)(na, {
								label: "浏览器口味维度",
								onSignal: t,
								panels: [
									{
										id: "tags",
										name: "标签",
										props: {
											rows: S.browser_tags || [],
											kind: "tag",
											visual: "none",
											empty: Bi
										}
									},
									{
										id: "creators",
										name: "创作者",
										props: {
											rows: S.browser_creators || [],
											kind: "creator",
											visual: "creator",
											empty: Vi
										}
									},
									{
										id: "performers",
										name: "女优",
										props: {
											rows: S.browser_performers || [],
											kind: "performer",
											visual: "entity",
											empty: "还没有与已建档女优关联的浏览记录。"
										}
									},
									{
										id: "domains",
										name: "常访问网站",
										props: {
											rows: S.domains || [],
											kind: "",
											visual: "domain",
											empty: Hi
										}
									},
									{
										id: "gaps",
										name: "浏览线索",
										props: {
											rows: T,
											kind: "",
											visual: "none",
											empty: zi
										}
									}
								]
							})
						]
					}),
					/* @__PURE__ */ (0, X.jsxs)(_t, {
						id: "peach",
						className: "flex flex-col gap-5",
						children: [
							/* @__PURE__ */ (0, X.jsxs)("div", {
								className: un,
								children: [
									/* @__PURE__ */ (0, X.jsx)($, {
										accent: 0,
										icon: Xe,
										term: "Peach 看过",
										figure: Number(b.peach_items || 0).toLocaleString(),
										detail: ct(b.peach_seconds || 0)
									}),
									/* @__PURE__ */ (0, X.jsx)($, {
										accent: 1,
										icon: nt,
										term: "喜欢",
										figure: Number(b.liked || 0).toLocaleString()
									}),
									/* @__PURE__ */ (0, X.jsx)($, {
										accent: 2,
										icon: rt,
										term: "不合口味",
										figure: Number(b.disliked || 0).toLocaleString()
									}),
									/* @__PURE__ */ (0, X.jsx)($, {
										accent: 3,
										icon: ft,
										term: "有标签",
										figure: E.toLocaleString()
									})
								]
							}),
							/* @__PURE__ */ (0, X.jsxs)("section", {
								className: `${Ni} md:flex-row md:gap-6`,
								"aria-label": "Peach 观看",
								children: [/* @__PURE__ */ (0, X.jsxs)("div", {
									className: "flex shrink-0 flex-col gap-0.5 pb-5 md:w-72 md:pr-6 md:pb-0",
									children: [
										/* @__PURE__ */ (0, X.jsx)("span", {
											className: "text-caption-1-regular text-text-secondary",
											children: "Peach 观看"
										}),
										/* @__PURE__ */ (0, X.jsx)("b", {
											className: "text-display-4-medium tabular-nums text-text-primary",
											children: Number(b.peach_items || 0).toLocaleString()
										}),
										/* @__PURE__ */ (0, X.jsx)("span", {
											className: "text-body-2-regular text-text-secondary",
											children: "部作品有观看或评价记录"
										})
									]
								}), /* @__PURE__ */ (0, X.jsxs)("div", {
									className: "flex min-w-0 grow flex-col",
									children: [/* @__PURE__ */ (0, X.jsx)(ca, {
										term: "有标签",
										value: E,
										rest: x.untagged || 0
									}), /* @__PURE__ */ (0, X.jsx)(ca, {
										term: "有身份",
										value: te,
										rest: x.unidentified || 0
									})]
								})]
							}),
							/* @__PURE__ */ (0, X.jsx)(na, {
								label: "Peach 口味维度",
								onSignal: t,
								panels: [
									{
										id: "tags",
										name: "标签",
										props: {
											rows: S.peach_tags || [],
											kind: "tag",
											visual: "none",
											empty: Ui
										}
									},
									{
										id: "creators",
										name: "创作者",
										props: {
											rows: S.peach_creators || [],
											kind: "creator",
											visual: "creator",
											empty: Wi
										}
									},
									{
										id: "performers",
										name: "女优",
										props: {
											rows: S.peach_performers || [],
											kind: "performer",
											visual: "entity",
											empty: Gi
										}
									}
								]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, X.jsx)(ra, {
				data: y,
				onSignal: t,
				navigate: n
			}),
			/* @__PURE__ */ (0, X.jsx)(oa, {
				sources: y.sources || [],
				browsers: y.browsers || [],
				window: a,
				toast: r,
				emptyActions: re
			})
		]
	}) });
}
function ca({ term: e, value: t, rest: n }) {
	let r = Math.max(t + n, 1);
	return /* @__PURE__ */ (0, X.jsxs)("div", {
		className: "flex flex-col gap-1.5 border-b border-separator-border py-3 last:border-b-0",
		children: [/* @__PURE__ */ (0, X.jsxs)("p", {
			className: "flex items-baseline justify-between gap-3 text-body-2-regular text-text-primary",
			children: [/* @__PURE__ */ (0, X.jsx)("span", { children: e }), /* @__PURE__ */ (0, X.jsxs)("b", {
				className: "tabular-nums",
				children: [t.toLocaleString(), /* @__PURE__ */ (0, X.jsx)("span", {
					className: "ml-1.5 text-caption-1-regular text-text-secondary",
					children: `${n.toLocaleString()} 项待补`
				})]
			})]
		}), /* @__PURE__ */ (0, X.jsx)(on, {
			label: `${e}：${t.toLocaleString()} / ${r.toLocaleString()}`,
			value: t,
			max: r
		})]
	});
}
//#endregion
export { Xi as TASTE_GUIDE_KEY, sa as TastePage };

//# debugId=e6f0d41e-6c62-4dc8-b6b4-5a52c3b9ac7c