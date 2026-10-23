(function() {
	try {
		var e = typeof window < "u" ? window : typeof global < "u" ? global : typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : {}, t = new e.Error().stack;
		t && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[t] = "e9dff2b2-ed62-44e7-bc4b-3bb6f0b39255", e._sentryDebugIdIdentifier = "sentry-dbid-e9dff2b2-ed62-44e7-bc4b-3bb6f0b39255");
	} catch {}
})();
import { A as e, At as t, Bt as n, C as r, Ct as i, D as a, Dt as o, Et as s, Ft as c, G as l, Gt as u, H as d, Ht as f, I as p, J as m, Jt as h, K as g, Kt as _, L as v, Lt as y, M as b, Mt as x, N as S, Nt as C, O as w, Ot as T, Pt as E, R as ee, Rt as D, S as te, St as O, T as ne, Ut as re, Vt as ie, W as ae, Wt as oe, X as se, Xt as ce, Y as le, Z as ue, _t as de, an as fe, at as pe, b as me, bt as he, c as ge, cn as _e, ct as ve, en as ye, gt as be, h as xe, ht as k, i as A, in as Se, it as Ce, j as we, jt as Te, k as Ee, kt as De, ln as Oe, lt as ke, m as Ae, mt as je, n as Me, nn as j, nt as Ne, o as Pe, on as M, pt as Fe, q as Ie, qt as Le, rn as Re, rt as ze, s as Be, t as Ve, tn as He, tt as Ue, u as We, v as Ge, vt as Ke, w as qe, x as Je, xt as Ye, y as Xe, yt as Ze, z as Qe } from "./peach-app.expandable-ranking-BW8Gp_lx.js";
import { $o as $e, A as N, Ao as et, B as tt, D as nt, F as rt, Gl as it, H as at, I as ot, Ja as st, Kl as ct, Kt as lt, L as ut, M as dt, N as ft, O as pt, Oo as mt, P as ht, Qo as P, R as gt, Tc as _t, U as vt, Uo as yt, V as bt, Va as xt, W as St, Yo as Ct, Zl as F, Zo as I, au as wt, cu as Tt, es as Et, fa as L, ha as Dt, j as R, ja as Ot, jo as kt, k as At, oo as z, pa as jt, ps as B, pu as Mt, rc as Nt, so as Pt, uu as Ft, xo as It, z as Lt, za as V } from "./peach-app.js";
import { t as Rt } from "./peach-app.page-BYr6f5ud.js";
import { a as zt, r as Bt, s as Vt } from "./peach-app.stat-card-8t4QGU2C.js";
import { t as Ht } from "./peach-app.connection-status-Pa6aDai7.js";
//#region node_modules/recharts/es6/util/RadialBarUtils.js
var H = /* @__PURE__ */ Mt(Ft()), Ut = ["option"];
function Wt(e, t) {
	if (e == null) return {};
	var n, r, i = Gt(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function Gt(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
var Kt = c;
function qt(e) {
	return typeof e == "string" ? parseInt(e, 10) : e;
}
function Jt(e) {
	var t = e.option, n = Wt(e, Ut);
	return /*#__PURE__*/ H.createElement(le, {
		option: t,
		DefaultShape: Kt,
		shapeProps: n
	});
}
//#endregion
//#region node_modules/recharts/es6/state/selectors/radialBarSelectors.js
function Yt(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function U(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? Yt(Object(n), !0).forEach(function(t) {
			Xt(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Yt(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function Xt(e, t, n) {
	return (t = Zt(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function Zt(e) {
	var t = Qt(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function Qt(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var W = h([(e, t) => i(e, t), (e, t) => Ue(e, "radiusAxis", t)], (e, t) => {
	if (e != null && t != null) return U(U({}, e), {}, { scale: t });
}), $t = (e, t) => ze(e, "radiusAxis", t, !1), G = h([(e, t, n) => Ye(e, n), (e, t, n) => Ue(e, "angleAxis", n)], (e, t) => {
	if (e != null && t != null) return U(U({}, e), {}, { scale: t });
}), en = (e, t, n) => Ne(e, "angleAxis", n, !1), tn = h([pe, (e, t, n, r) => r], (e, t) => {
	if (e.some((e) => e.type === "radialBar" && t.dataKey === e.dataKey && t.stackId === e.stackId)) return t;
}), nn = h([
	y,
	W,
	$t,
	G,
	en
], (e, t, r, i, a) => _(e, "radiusAxis") ? n(t, r, !1) : n(i, a, !1)), rn = h([
	G,
	W,
	y
], (e, t, n) => {
	var r = n === "radial" ? e : t;
	if (r != null && r.scale != null) return ie({ numericAxis: r });
}), an = (e, t, n, r, i) => i, on = (e, t, n, r, i) => n, sn = (e, t, n, r, i) => t, cn = (e, t, n, r, i) => r.maxBarSize, ln = (e) => e.type === "radialBar", un = h([
	y,
	pe,
	on,
	sn
], (e, t, n, r) => t.filter((t) => e === "centric" ? t.angleAxisId === n : t.radiusAxisId === r).filter((e) => e.hide === !1).filter(ln)), dn = h([
	un,
	t,
	() => void 0
], S), fn = h([
	y,
	Te,
	G,
	en,
	W,
	$t,
	cn
], (e, t, r, i, a, o, s) => {
	var c = Re(s) ? t : s;
	return e === "centric" ? n(r, i, !0) ?? c ?? 0 : n(a, o, !0) ?? c ?? 0;
}), pn = h([
	dn,
	Te,
	T,
	o,
	fn,
	nn,
	cn
], b), mn = h([pn, tn], e), hn = h([Ce], (e) => e.filter(ln).filter(Ze)), gn = h([
	hn,
	C,
	Ke
], he), _n = h([
	gn,
	hn,
	x,
	De
], de), vn = h([(e, t, n) => y(e) === "centric" ? _n(e, "radiusAxis", t) : _n(e, "angleAxis", n), tn], we), yn = h([
	G,
	en,
	W,
	$t,
	E,
	tn,
	nn,
	y,
	rn,
	O,
	an,
	mn,
	vn
], (e, t, n, r, i, a, o, s, c, l, u, d, f) => {
	var p = i.chartData, m = i.dataStartIndex, h = i.dataEndIndex;
	if (a == null || n == null || e == null || p == null || o == null || d == null || s !== "centric" && s !== "radial" || r == null || l == null) return [];
	var g = a.dataKey, _ = a.minPointSize, v = l.cx, y = l.cy, b = l.startAngle, x = l.endAngle;
	return Bn({
		angleAxis: e,
		angleAxisTicks: t,
		bandSize: o,
		baseValue: c,
		cells: u,
		cx: v,
		cy: y,
		dataKey: g,
		dataStartIndex: m,
		displayedData: p.slice(m, h + 1),
		endAngle: x,
		layout: s,
		minPointSize: _,
		pos: d,
		radiusAxis: n,
		radiusAxisTicks: r,
		stackedData: f,
		stackedDomain: f ? (s === "centric" ? n : e).scale.domain() : null,
		startAngle: b
	});
}), bn = h([C, (e, t) => t], (e, t) => {
	var n = e.chartData, r = e.dataStartIndex, i = e.dataEndIndex;
	if (n == null) return [];
	var a = n.slice(r, i + 1);
	return a.length === 0 ? [] : a.map((e) => ({
		type: t,
		value: e.name,
		color: e.fill,
		payload: e
	}));
}), xn = [
	"shape",
	"activeShape",
	"cornerRadius",
	"id"
], Sn = [
	"onMouseEnter",
	"onClick",
	"onMouseLeave"
], Cn = ["value", "background"];
function K() {
	return K = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, K.apply(null, arguments);
}
function wn(e, t) {
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
		t % 2 ? wn(Object(n), !0).forEach(function(t) {
			Tn(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : wn(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function Tn(e, t, n) {
	return (t = En(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function En(e) {
	var t = Dn(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function Dn(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function On(e, t) {
	if (e == null) return {};
	var n, r, i = kn(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function kn(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
var An = [];
function jn(e) {
	var t = e.showLabels, n = e.sectors, r = e.children, i = n.map((e) => ({
		value: e.value,
		payload: e.payload,
		parentViewBox: void 0,
		clockWise: !1,
		viewBox: {
			cx: e.cx,
			cy: e.cy,
			innerRadius: e.innerRadius,
			outerRadius: e.outerRadius,
			startAngle: e.startAngle,
			endAngle: e.endAngle,
			clockWise: !1
		},
		fill: e.fill
	}));
	return /*#__PURE__*/ H.createElement(ke, { value: t ? i : void 0 }, r);
}
function Mn(e) {
	var t = e.sectors, n = e.allOtherRadialBarProps, r = e.showLabels, i = e.animationElapsedTime, a = e.isAnimating, o = e.isEntrance, c = n.shape, l = n.activeShape, u = n.cornerRadius, d = n.id, f = On(n, xn), p = _e(f), h = ce(be), _ = n.onMouseEnter, v = n.onClick, y = n.onMouseLeave, b = On(n, Sn), x = Ie(_, n.dataKey, d), S = m(y), C = g(v, n.dataKey, d);
	return t == null ? null : /*#__PURE__*/ H.createElement(jn, {
		showLabels: r,
		sectors: t
	}, t.map((e, t) => {
		var n = !!(l && h === String(t)), r = x(e, t), d = S(e, t), m = C(e, t), g = q(q(q(q({}, p), {}, { cornerRadius: qt(u) }, e), He(b, e, t)), {}, {
			onMouseEnter: r,
			onMouseLeave: d,
			onClick: m,
			className: `recharts-radial-bar-sector ${e.className}`,
			forceCornerRadius: f.forceCornerRadius,
			cornerIsExternal: f.cornerIsExternal,
			animationElapsedTime: i,
			isAnimating: a,
			isEntrance: o,
			isActive: n,
			option: n && l != null ? l : c,
			index: t
		});
		return n ? /*#__PURE__*/ H.createElement(k, {
			zIndex: s.activeBar,
			key: `sector-${e.cx}-${e.cy}-${e.innerRadius}-${e.outerRadius}-${e.startAngle}-${e.endAngle}-${t}`
		}, /*#__PURE__*/ H.createElement(Jt, g)) : /*#__PURE__*/ H.createElement(Jt, K({ key: `sector-${e.cx}-${e.cy}-${e.innerRadius}-${e.outerRadius}-${e.startAngle}-${e.endAngle}-${t}` }, g));
	}), /*#__PURE__*/ H.createElement(ve, { label: n.label }), n.children);
}
var Nn = (e, t) => e == null ? [] : t === 1 ? e.flatMap((e) => e.status === "removed" ? [] : [e.next]) : e.flatMap((e) => e.status === "removed" ? [] : e.status === "matched" ? [q(q({}, e.next), {}, {
	startAngle: j(e.prev.startAngle, e.next.startAngle, t),
	endAngle: j(e.prev.endAngle, e.next.endAngle, t)
})] : [q(q({}, e.next), {}, { endAngle: j(e.next.startAngle, e.next.endAngle, t) })]);
function Pn(e) {
	var t = e.props, n = e.previousSectorsRef, r = t.sectors, i = t.isAnimationActive, a = t.animationBegin, o = t.animationDuration, s = t.animationEasing, c = t.onAnimationStart, l = t.onAnimationEnd, u = Qe(c, l), d = u.isAnimating, f = u.handleAnimationStart, p = u.handleAnimationEnd, m = D();
	return m == null ? null : /*#__PURE__*/ H.createElement(ee, {
		animationInput: t,
		animationIdPrefix: "recharts-radialbar-",
		items: r,
		previousItemsRef: n,
		isAnimationActive: i,
		animationBegin: a,
		animationDuration: o,
		animationEasing: s,
		onAnimationStart: f,
		onAnimationEnd: p,
		animationInterpolateFn: t.animationInterpolateFn,
		animationMatchBy: t.animationMatchBy,
		layout: m
	}, (e, n, r) => /*#__PURE__*/ H.createElement(Mn, {
		sectors: e,
		allOtherRadialBarProps: t,
		showLabels: !d,
		animationElapsedTime: n,
		isAnimating: d || n < 1,
		isEntrance: r
	}));
}
function Fn(e) {
	var t = (0, H.useRef)(null);
	return /*#__PURE__*/ H.createElement(Pn, {
		props: e,
		previousSectorsRef: t
	});
}
function In(e) {
	var t = ce((t) => bn(t, e.legendType));
	return /*#__PURE__*/ H.createElement(ae, { legendPayload: t ?? [] });
}
var Ln = /*#__PURE__*/ H.memo((e) => {
	var t = e.dataKey, n = e.sectors, r = e.stroke, i = e.strokeWidth, a = e.name, o = e.hide, s = e.fill, c = e.tooltipType, u = e.formatter, d = e.id, f = {
		dataDefinedOnItem: n,
		getPosition: fe,
		settings: {
			graphicalItemId: d,
			stroke: r,
			strokeWidth: i,
			fill: s,
			nameKey: void 0,
			dataKey: t,
			name: oe(a, t),
			hide: o,
			type: c,
			color: s,
			unit: "",
			formatter: u
		}
	};
	return /*#__PURE__*/ H.createElement(l, { tooltipEntrySettings: f });
}), Rn = class extends H.PureComponent {
	renderBackground(e) {
		if (e == null) return null;
		var t = this.props.cornerRadius, n = Oe(this.props.background);
		return /*#__PURE__*/ H.createElement(k, { zIndex: Ee(this.props.background, s.barBackground) }, e.map((e, r) => {
			e.value;
			var i = e.background, a = On(e, Cn);
			if (!i) return null;
			var o = q(q(q(q(q({ cornerRadius: qt(t) }, a), {}, { fill: "#eee" }, i), n), He(this.props, e, r)), {}, {
				index: r,
				className: Nt("recharts-radial-bar-background-sector", String(n?.className)),
				option: i,
				isActive: !1
			});
			return /*#__PURE__*/ H.createElement(Jt, K({ key: `background-${a.cx}-${a.cy}-${a.innerRadius}-${a.outerRadius}-${a.startAngle}-${a.endAngle}-${r}` }, o));
		}));
	}
	render() {
		var e = this.props, t = e.hide, n = e.sectors, r = e.className, i = e.background;
		if (t) return null;
		var a = Nt("recharts-area", r);
		return /*#__PURE__*/ H.createElement(k, { zIndex: this.props.zIndex }, /*#__PURE__*/ H.createElement(M, { className: a }, i && /*#__PURE__*/ H.createElement(M, { className: "recharts-radial-bar-background" }, this.renderBackground(n)), /*#__PURE__*/ H.createElement(M, { className: "recharts-radial-bar-sectors" }, /*#__PURE__*/ H.createElement(Fn, this.props))));
	}
};
function zn(e) {
	var t = H.useMemo(() => se(e.children, Fe), [e.children]), n = H.useMemo(() => ({
		data: void 0,
		hide: !1,
		id: e.id,
		dataKey: e.dataKey,
		minPointSize: e.minPointSize,
		stackId: re(e.stackId),
		maxBarSize: e.maxBarSize,
		barSize: e.barSize,
		type: "radialBar",
		angleAxisId: e.angleAxisId,
		radiusAxisId: e.radiusAxisId
	}), [
		e.id,
		e.dataKey,
		e.minPointSize,
		e.stackId,
		e.maxBarSize,
		e.barSize,
		e.angleAxisId,
		e.radiusAxisId
	]), r = ce((r) => yn(r, e.radiusAxisId, e.angleAxisId, n, t)) ?? An;
	return /*#__PURE__*/ H.createElement(H.Fragment, null, /*#__PURE__*/ H.createElement(Ln, {
		dataKey: e.dataKey,
		sectors: r,
		stroke: e.stroke,
		strokeWidth: e.strokeWidth,
		name: e.name,
		hide: e.hide,
		fill: e.fill,
		tooltipType: e.tooltipType,
		formatter: e.formatter,
		id: e.id
	}), /*#__PURE__*/ H.createElement(Rn, K({}, e, { sectors: r })));
}
var J = {
	angleAxisId: 0,
	animationBegin: 0,
	animationDuration: 1500,
	animationEasing: "ease",
	animationMatchBy: d,
	animationInterpolateFn: Nn,
	background: !1,
	cornerIsExternal: !1,
	cornerRadius: 0,
	forceCornerRadius: !1,
	hide: !1,
	isAnimationActive: "auto",
	label: !1,
	legendType: "rect",
	minPointSize: 0,
	radiusAxisId: 0,
	shape: Kt,
	zIndex: s.bar
};
function Bn(e) {
	var t = e.displayedData, n = e.stackedData, r = e.dataStartIndex, i = e.stackedDomain, a = e.dataKey, o = e.baseValue, s = e.layout, c = e.radiusAxis, l = e.radiusAxisTicks, d = e.bandSize, p = e.pos, m = e.angleAxis, h = e.minPointSize, g = e.cx, _ = e.cy, v = e.angleAxisTicks, y = e.cells, b = e.startAngle, x = e.endAngle;
	return v == null || l == null ? An : (t ?? []).map((e, t) => {
		var S, C, w, T, E, ee;
		if (n ? S = Le(n[r + t], i) : (S = u(e, a), Array.isArray(S) || (S = [o, S])), s === "radial") {
			if (T = m.scale.map(S[0]) ?? b, E = m.scale.map(S[1]) ?? x, C = f({
				axis: c,
				ticks: l,
				bandSize: d,
				offset: p.offset,
				entry: e,
				index: t
			}), C != null && E != null && T != null) {
				w = C + p.size;
				var D = E - T;
				if (Math.abs(h) > 0 && Math.abs(D) < Math.abs(h)) {
					var te = Se(D || h) * (Math.abs(h) - Math.abs(D));
					E += te;
				}
				ee = { background: {
					cx: g,
					cy: _,
					innerRadius: C,
					outerRadius: w,
					startAngle: b,
					endAngle: x
				} };
			}
		} else if (C = c.scale.map(S[0]), w = c.scale.map(S[1]), T = f({
			axis: m,
			ticks: v,
			bandSize: d,
			offset: p.offset,
			entry: e,
			index: t
		}), C != null && w != null && T != null) {
			E = T + p.size;
			var O = w - C;
			if (Math.abs(h) > 0 && Math.abs(O) < Math.abs(h)) {
				var ne = Se(O || h) * (Math.abs(h) - Math.abs(O));
				w += ne;
			}
		}
		return q(q(q({}, e), ee), {}, {
			payload: e,
			value: n ? S : S[1],
			cx: g,
			cy: _,
			innerRadius: C,
			outerRadius: w,
			startAngle: T,
			endAngle: E
		}, y && y[t] && y[t].props);
	});
}
function Vn(e) {
	var t = ye(e, J);
	return /*#__PURE__*/ H.createElement(v, {
		id: t.id,
		type: "radialBar"
	}, (e) => /*#__PURE__*/ H.createElement(H.Fragment, null, /*#__PURE__*/ H.createElement(p, {
		type: "radialBar",
		id: e,
		data: void 0,
		dataKey: t.dataKey,
		hide: t.hide ?? J.hide,
		angleAxisId: t.angleAxisId ?? J.angleAxisId,
		radiusAxisId: t.radiusAxisId ?? J.radiusAxisId,
		stackId: re(t.stackId),
		barSize: t.barSize,
		minPointSize: t.minPointSize,
		maxBarSize: t.maxBarSize
	}), /*#__PURE__*/ H.createElement(In, t), /*#__PURE__*/ H.createElement(zn, K({}, t, { id: e }))));
}
Vn.displayName = "RadialBar";
//#endregion
//#region node_modules/recharts/es6/chart/RadialBarChart.js
function Hn(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function Un(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? Hn(Object(n), !0).forEach(function(t) {
			Wn(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Hn(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function Wn(e, t, n) {
	return (t = Gn(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function Gn(e) {
	var t = Kn(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function Kn(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var qn = ["axis", "item"], Jn = Un(Un({}, w), {}, {
	layout: "radial",
	startAngle: 0,
	endAngle: 360
}), Yn = /*#__PURE__*/ (0, H.forwardRef)((e, t) => {
	var n = ye(e, Jn);
	return /*#__PURE__*/ H.createElement(a, {
		chartName: "RadialBarChart",
		defaultTooltipEventType: "axis",
		validateTooltipEventTypes: qn,
		tooltipPayloadSearcher: je,
		categoricalChartProps: n,
		ref: t
	});
}), Y = Tt(), Xn = "30%", Zn = "100%", Qn = 5, $n = 14, er = 5, tr = 1500, nr = (0, H.createContext)(null);
function rr() {
	let e = (0, H.use)(nr);
	if (!e) throw Error("Radial chart parts (<RadialBar />, <Tooltip />, …) must be used within <EvilRadialChart />");
	return e;
}
function X({ config: e, data: t, nameKey: n, children: i, className: a, chartProps: o, variant: s = "full", max: c, innerRadius: l = Xn, outerRadius: u = Zn, defaultSelectedDataKey: d = null, onSelectionChange: f, isLoading: p = !1, backgroundVariant: m }) {
	let h = (0, H.useId)().replace(/:/g, ""), [g, _] = (0, H.useState)(d), v = ur(p), y = sr(s), b = (0, H.useCallback)((e, t) => {
		_(e), f?.(e === null ? null : {
			dataKey: e,
			value: t ?? 0
		});
	}, [f]), x = (0, H.useMemo)(() => t.map((e) => ({
		...e,
		fill: `url(#${h}-radial-colors-${e[n]})`
	})), [
		t,
		n,
		h
	]), S = (0, H.useMemo)(() => ({
		config: e,
		nameKey: n,
		chartId: h,
		isLoading: p,
		selectedBar: g,
		selectBar: b
	}), [
		e,
		n,
		h,
		p,
		g,
		b
	]);
	return /* @__PURE__ */ (0, Y.jsx)(nr, {
		value: S,
		children: /* @__PURE__ */ (0, Y.jsxs)(r, {
			className: a,
			config: e,
			children: [/* @__PURE__ */ (0, Y.jsx)(qe, { isLoading: p }), /* @__PURE__ */ (0, Y.jsxs)(Yn, {
				id: h,
				data: p ? v : x,
				innerRadius: l,
				outerRadius: u,
				startAngle: y.startAngle,
				endAngle: y.endAngle,
				cx: y.cx,
				cy: y.cy,
				...o,
				children: [
					c != null && c > 0 && /* @__PURE__ */ (0, Y.jsx)(ue, {
						type: "number",
						domain: [0, c],
						tick: !1,
						axisLine: !1
					}),
					m && /* @__PURE__ */ (0, Y.jsx)(Ge, { variant: m }),
					i,
					p && /* @__PURE__ */ (0, Y.jsx)(dr, {}),
					/* @__PURE__ */ (0, Y.jsx)("defs", { children: /* @__PURE__ */ (0, Y.jsx)(cr, {
						config: e,
						chartId: h
					}) })
				]
			})]
		})
	});
}
function ir({ dataKey: e, cornerRadius: t = Qn, barSize: n = $n, showBackground: r = !0, isClickable: i = !1, radialBarProps: a }) {
	let { nameKey: o, isLoading: s, selectedBar: l, selectBar: u } = rr();
	return s ? null : /* @__PURE__ */ (0, Y.jsx)(Vn, {
		dataKey: e,
		cornerRadius: t,
		barSize: n,
		background: r,
		className: "drop-shadow-sm",
		style: i ? { cursor: "pointer" } : void 0,
		onClick: (t, n) => {
			if (!i) return;
			let r = t, a = r?.[o] ?? String(n), s = Number(r?.[e] ?? 0);
			u(l === a ? null : a, s);
		},
		shape: (e) => {
			let t = e[o], n = l === null || l === t;
			return /* @__PURE__ */ (0, Y.jsx)(c, {
				...e,
				opacity: i && !n ? .15 : 1,
				className: "transition-opacity duration-200"
			});
		},
		...a
	});
}
function ar({ variant: e, roundness: t, defaultIndex: n }) {
	let { nameKey: r, isLoading: i } = rr();
	return i ? null : /* @__PURE__ */ (0, Y.jsx)(Je, {
		defaultIndex: n,
		cursor: !1,
		content: /* @__PURE__ */ (0, Y.jsx)(te, {
			nameKey: r,
			hideLabel: !0,
			roundness: t,
			variant: e
		})
	});
}
function or({ variant: e, align: t = "center", verticalAlign: n = "bottom", isClickable: r = !1 }) {
	let { nameKey: i, isLoading: a, selectedBar: o, selectBar: s } = rr();
	return a ? null : /* @__PURE__ */ (0, Y.jsx)(Xe, {
		verticalAlign: n,
		align: t,
		content: /* @__PURE__ */ (0, Y.jsx)(me, {
			selected: o,
			onSelectChange: s,
			isClickable: r,
			nameKey: i,
			variant: e
		})
	});
}
function sr(e) {
	switch (e) {
		case "semi": return {
			startAngle: 180,
			endAngle: 0,
			cx: "50%",
			cy: "70%"
		};
		default: return {
			startAngle: 90,
			endAngle: -270,
			cx: "50%",
			cy: "50%"
		};
	}
}
var cr = ({ config: e, chartId: t }) => /* @__PURE__ */ (0, Y.jsx)(Y.Fragment, { children: Object.entries(e).map(([e, n]) => {
	let r = ne(n);
	return /* @__PURE__ */ (0, Y.jsx)("linearGradient", {
		id: `${t}-radial-colors-${e}`,
		x1: "0",
		y1: "0",
		x2: "1",
		y2: "1",
		children: r === 1 ? /* @__PURE__ */ (0, Y.jsxs)(Y.Fragment, { children: [/* @__PURE__ */ (0, Y.jsx)("stop", {
			offset: "0%",
			stopColor: `var(--color-${e}-0)`
		}), /* @__PURE__ */ (0, Y.jsx)("stop", {
			offset: "100%",
			stopColor: `var(--color-${e}-0)`
		})] }) : Array.from({ length: r }, (t, n) => {
			let i = `${n / (r - 1) * 100}%`;
			return /* @__PURE__ */ (0, Y.jsx)("stop", {
				offset: i,
				stopColor: `var(--color-${e}-${n}, var(--color-${e}-0))`
			}, i);
		})
	}, `${t}-radial-colors-${e}`);
}) });
function lr() {
	return Array.from({ length: er }, (e, t) => ({
		name: `loading${t}`,
		value: 40 + Math.random() * 60
	}));
}
function ur(e) {
	let [t, n] = (0, H.useState)(0);
	return (0, H.useEffect)(() => {
		if (!e) return;
		let t = setInterval(() => {
			n((e) => e + 1);
		}, tr);
		return () => clearInterval(t);
	}, [e]), (0, H.useMemo)(() => lr(), [t]);
}
var dr = () => /* @__PURE__ */ (0, Y.jsx)(Vn, {
	dataKey: "value",
	cornerRadius: Qn,
	barSize: $n,
	background: !0,
	isAnimationActive: !0,
	animationDuration: tr,
	animationEasing: "ease-in-out",
	shape: (e) => /* @__PURE__ */ (0, Y.jsx)(c, {
		...e,
		fill: "currentColor",
		fillOpacity: .25
	})
});
X.RadialBar = ir, X.Tooltip = ar, X.Legend = or;
//#endregion
//#region src/react/stats/radial-card.tsx
var fr = [
	"bg-chart-1",
	"bg-chart-2",
	"bg-chart-3",
	"bg-chart-4",
	"bg-chart-5",
	"bg-chart-6"
], pr = [
	"aria-pressed:bg-chart-1/10 aria-pressed:ring-chart-1",
	"aria-pressed:bg-chart-2/10 aria-pressed:ring-chart-2",
	"aria-pressed:bg-chart-3/10 aria-pressed:ring-chart-3",
	"aria-pressed:bg-chart-4/10 aria-pressed:ring-chart-4",
	"aria-pressed:bg-chart-5/10 aria-pressed:ring-chart-5",
	"aria-pressed:bg-chart-6/10 aria-pressed:ring-chart-6"
];
function mr({ title: e, rows: t, empty: n, unit: r = "个视频" }) {
	let [i, a] = (0, H.useState)(-1), [o, s] = (0, H.useState)(-1), l = tt(t);
	if (!l.length) return /* @__PURE__ */ (0, Y.jsx)(We, {
		title: e,
		children: n
	});
	let u = o >= 0 ? o : i, d = l.reduce((e, t) => e + t.value, 0), f = l[u], p = (e) => a((t) => t === e ? -1 : e), m = Lt(l.map((e) => e.value)), h = l.map((e, t) => ({
		slice: xe(t),
		value: e.value,
		arc: ut(e.value, m)
	}));
	return /* @__PURE__ */ (0, Y.jsxs)("section", {
		className: Be,
		children: [
			/* @__PURE__ */ (0, Y.jsxs)("header", {
				className: "flex flex-wrap items-end justify-between gap-x-4 gap-y-1",
				children: [/* @__PURE__ */ (0, Y.jsxs)("span", {
					className: "flex min-w-0 flex-col gap-1",
					children: [/* @__PURE__ */ (0, Y.jsxs)("h3", {
						className: "flex items-center gap-1.5 text-title-2-medium wrap-anywhere text-text-primary",
						children: [f?.mark ? /* @__PURE__ */ (0, Y.jsx)(Ot, { mark: f.mark }) : null, f ? f.name : e]
					}), /* @__PURE__ */ (0, Y.jsx)("b", {
						className: "text-display-4-medium tabular-nums text-text-primary",
						children: (f ? f.value : d).toLocaleString()
					})]
				}), /* @__PURE__ */ (0, Y.jsx)("small", {
					className: "text-caption-1-regular text-text-secondary",
					children: r
				})]
			}),
			/* @__PURE__ */ (0, Y.jsx)("div", {
				role: "img",
				"aria-label": e,
				onPointerLeave: () => s(-1),
				children: /* @__PURE__ */ (0, Y.jsxs)(X, {
					data: h,
					nameKey: "slice",
					config: Ae(l.map((e) => e.name)),
					max: m,
					innerRadius: "22%",
					className: "aspect-auto h-75 max-sm:h-65",
					children: [/* @__PURE__ */ (0, Y.jsx)(X.RadialBar, {
						dataKey: "arc",
						barSize: gt(l.length),
						radialBarProps: {
							shape: (e) => /* @__PURE__ */ (0, Y.jsx)(c, {
								...e,
								opacity: u >= 0 && u !== e.index ? .3 : 1,
								className: "cursor-pointer transition-opacity duration-200"
							}),
							onClick: (e, t) => p(t),
							onMouseEnter: (e, t) => s(t)
						}
					}), /* @__PURE__ */ (0, Y.jsx)(Pe, {
						nameKey: "slice",
						valueKey: "value",
						hideLabel: !0
					})]
				})
			}),
			/* @__PURE__ */ (0, Y.jsx)("div", {
				className: "inline-grid w-full grid-cols-3 gap-2 max-sm:grid-cols-2",
				children: l.map((e, t) => /* @__PURE__ */ (0, Y.jsxs)("button", {
					type: "button",
					"aria-pressed": i === t,
					onClick: () => p(t),
					onPointerEnter: () => s(t),
					onPointerLeave: () => s(-1),
					onFocus: () => s(t),
					onBlur: () => s(-1),
					className: `flex min-w-0 cursor-pointer flex-col items-start gap-1 rounded-xl bg-background-tertiary-default p-2.5 text-left outline-none aria-pressed:ring-1 aria-pressed:ring-inset focus-visible:ring-2 focus-visible:ring-border-focus-ring ${pr[t % 6]}`,
					children: [
						/* @__PURE__ */ (0, Y.jsxs)("span", {
							className: "flex min-w-0 max-w-full items-start gap-1.5 text-caption-1-regular text-text-secondary",
							children: [/* @__PURE__ */ (0, Y.jsx)("i", {
								"aria-hidden": !0,
								className: `mt-0.5 size-3 shrink-0 rounded-sm ${fr[t % 6]}`
							}), /* @__PURE__ */ (0, Y.jsxs)("span", {
								className: "inline-flex min-w-0 items-start gap-1.5 wrap-anywhere",
								children: [e.mark ? /* @__PURE__ */ (0, Y.jsx)(Ot, { mark: e.mark }) : null, e.name]
							})]
						}),
						/* @__PURE__ */ (0, Y.jsx)("b", {
							className: "text-title-2-medium tabular-nums text-text-primary",
							children: e.value.toLocaleString()
						}),
						e.bytes == null ? null : /* @__PURE__ */ (0, Y.jsx)("small", {
							className: "text-caption-1-regular text-text-secondary",
							children: F(e.bytes)
						})
					]
				}, xe(t)))
			})
		]
	});
}
//#endregion
//#region src/react/stats/stats-page.tsx
var hr = st("媒体库与入库"), gr = 10, _r = ge[5], vr = ge[4], yr = `${xt()} flex flex-col gap-4`, br = "添加媒体目录或关注来源后，这里会显示馆藏统计。", xr = "补全资料或添加标签后，这里会显示馆藏中的内容标签。", Sr = "开始播放后，这里会显示最近的真实观看证据。", Cr = "补充作品资料或手动添加标签后，这里会显示各个标签来源对应的视频数量。", wr = "添加媒体目录后，这里会显示存储空间。", Tr = "把媒体目录归进媒体库后，这里会按库显示视频数。", Er = "探测时长后，这里会显示时长分布。", Dr = "探测画质后，这里会显示画质分布。", Or = "开始播放后，这里会显示播放落在一周的哪些时段。", kr = "开始播放后，这里会显示每个作品播了几次。", Ar = (e, t) => Math.min(Math.max(e, 0), t);
function Z({ term: e, value: t }) {
	return /* @__PURE__ */ (0, Y.jsxs)("div", {
		className: "flex min-h-16 min-w-0 flex-col gap-1.5 rounded-2lg bg-background-primary-default p-3",
		children: [/* @__PURE__ */ (0, Y.jsx)("span", {
			className: "text-caption-1-regular text-text-secondary",
			children: e
		}), /* @__PURE__ */ (0, Y.jsx)("b", {
			className: "text-title-3-medium tabular-nums text-text-primary",
			children: N(t)
		})]
	});
}
function Q({ term: e, value: t, total: n }) {
	let r = Math.max(n, 1);
	return /* @__PURE__ */ (0, Y.jsxs)("div", {
		className: "flex flex-col gap-1.5 border-b border-separator-border py-3 last:border-b-0",
		children: [/* @__PURE__ */ (0, Y.jsxs)("p", {
			className: "flex items-baseline justify-between gap-3 text-body-2-regular text-text-primary",
			children: [/* @__PURE__ */ (0, Y.jsx)("span", { children: e }), /* @__PURE__ */ (0, Y.jsxs)("b", {
				className: "tabular-nums",
				children: [N(t), R(t) ? /* @__PURE__ */ (0, Y.jsx)("span", {
					className: "ml-1.5 text-caption-1-regular text-text-secondary",
					children: ht(t, n)
				}) : null]
			})]
		}), /* @__PURE__ */ (0, Y.jsx)(V, {
			label: `${e}：${N(t)} / ${n.toLocaleString()}`,
			value: R(t) ? Ar(t, r) : 0,
			max: r
		})]
	});
}
function jr({ term: e, figure: t, unit: n }) {
	return /* @__PURE__ */ (0, Y.jsxs)("div", {
		className: "flex shrink-0 flex-col gap-0.5 pb-5 md:w-64 md:pr-6 md:pb-0",
		children: [
			/* @__PURE__ */ (0, Y.jsx)("span", {
				className: "text-caption-1-regular text-text-secondary",
				children: e
			}),
			/* @__PURE__ */ (0, Y.jsx)("b", {
				className: "text-display-4-medium tabular-nums text-text-primary",
				children: t
			}),
			/* @__PURE__ */ (0, Y.jsx)("span", {
				className: "text-body-2-regular text-text-secondary",
				children: n
			})
		]
	});
}
function Mr({ headline: e, children: t }) {
	return /* @__PURE__ */ (0, Y.jsxs)("div", {
		className: `${yr} md:flex-row md:gap-6`,
		children: [e, /* @__PURE__ */ (0, Y.jsx)("div", {
			className: "min-w-0 grow",
			children: t
		})]
	});
}
function Nr({ data: e }) {
	return e.by_loc.reduce((e, t) => e + t.videos, 0) ? /* @__PURE__ */ (0, Y.jsxs)("div", {
		className: "flex flex-col gap-5",
		children: [/* @__PURE__ */ (0, Y.jsxs)("div", {
			className: "inline-grid w-full gap-5 md:grid-cols-2",
			children: [/* @__PURE__ */ (0, Y.jsx)(mr, {
				title: "网盘与本地",
				empty: br,
				rows: e.by_loc.map((e) => ({
					name: ct[e.k] ?? e.k,
					value: e.videos,
					bytes: e.bytes,
					mark: _t[e.k] || "database"
				}))
			}), /* @__PURE__ */ (0, Y.jsx)(mr, {
				title: "媒体库",
				empty: Tr,
				rows: e.by_library.map((e) => ({
					name: e.name,
					value: e.videos,
					bytes: e.bytes,
					mark: _t[e.icon] || e.icon || "database"
				}))
			})]
		}), /* @__PURE__ */ (0, Y.jsxs)("div", {
			className: "inline-grid w-full gap-5 md:grid-cols-2 xl:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, Y.jsx)(A, {
					title: "时长",
					unit: "个视频",
					series: "视频",
					color: _r,
					rows: dt(e.by_length),
					empty: Er
				}),
				/* @__PURE__ */ (0, Y.jsx)(A, {
					title: "画质",
					unit: "个视频",
					series: "视频",
					color: _r,
					rows: pt(e.by_quality),
					empty: Dr
				}),
				/* @__PURE__ */ (0, Y.jsx)(A, {
					title: "文件类型",
					unit: "个条目",
					series: "条目",
					color: _r,
					layout: "horizontal",
					rows: ft(e.by_medium),
					empty: br
				})
			]
		})]
	}) : /* @__PURE__ */ (0, Y.jsx)(z, {
		icon: It,
		title: "还没有视频",
		actions: /* @__PURE__ */ (0, Y.jsxs)(Y.Fragment, { children: [/* @__PURE__ */ (0, Y.jsx)(B, {
			variant: "secondary",
			href: "/subscriptions?tab=add",
			size: "small",
			children: "添加关注"
		}), /* @__PURE__ */ (0, Y.jsx)(B, {
			variant: "primary",
			href: hr,
			size: "small",
			children: "添加媒体"
		})] }),
		children: br
	});
}
function Pr({ data: e }) {
	return /* @__PURE__ */ (0, Y.jsxs)(Y.Fragment, { children: [/* @__PURE__ */ (0, Y.jsx)(Me, {
		activity: e.play_activity,
		title: "播放时间",
		dailyTitle: "每日播放",
		words: {
			unit: "个作品",
			series: "作品",
			cellUnit: "个作品"
		},
		tone: 5,
		empty: Or
	}), /* @__PURE__ */ (0, Y.jsx)(A, {
		title: "播放次数",
		unit: "个作品",
		series: "作品",
		color: vr,
		rows: at(e.replays),
		empty: kr
	})] });
}
function Fr({ attribution: e }) {
	let t = e.videos;
	return /* @__PURE__ */ (0, Y.jsxs)("div", {
		className: "flex flex-col",
		children: [
			/* @__PURE__ */ (0, Y.jsx)(Q, {
				term: "有创作者",
				value: e.creator,
				total: t
			}),
			/* @__PURE__ */ (0, Y.jsx)(Q, {
				term: "有番号",
				value: e.code,
				total: t
			}),
			/* @__PURE__ */ (0, Y.jsx)(Q, {
				term: "有厂牌",
				value: e.studio,
				total: t
			}),
			/* @__PURE__ */ (0, Y.jsx)(Q, {
				term: "已抽帧",
				value: e.thumb,
				total: t
			}),
			/* @__PURE__ */ (0, Y.jsx)(Q, {
				term: "已探测时长",
				value: e.duration,
				total: t
			})
		]
	});
}
function Ir({ volume: e }) {
	let t = e.total, n = e.used ?? 0;
	return /* @__PURE__ */ (0, Y.jsxs)("article", {
		className: "flex min-w-0 flex-col gap-1.5 border-b border-separator-border py-3 last:border-b-0",
		children: [
			/* @__PURE__ */ (0, Y.jsxs)("header", {
				className: "flex items-baseline justify-between gap-3 text-body-2-regular text-text-primary",
				children: [/* @__PURE__ */ (0, Y.jsx)("h3", {
					className: "min-w-0 break-words",
					children: e.label
				}), t == null ? e.online ? /* @__PURE__ */ (0, Y.jsx)(lt, { children: "容量未取得" }) : /* @__PURE__ */ (0, Y.jsx)(Ht, { online: !1 }) : /* @__PURE__ */ (0, Y.jsxs)("b", {
					className: "whitespace-nowrap tabular-nums",
					children: [F(n), /* @__PURE__ */ (0, Y.jsx)("span", {
						className: "ml-1.5 text-caption-1-regular text-text-secondary",
						children: ht(n, t)
					})]
				})]
			}),
			t == null ? null : /* @__PURE__ */ (0, Y.jsx)(V, {
				label: `${e.label}空间使用率`,
				value: Ar(n, Math.max(t, 1)),
				max: Math.max(t, 1)
			}),
			/* @__PURE__ */ (0, Y.jsxs)("p", {
				className: "flex justify-between gap-3 text-caption-1-regular text-text-secondary",
				children: [/* @__PURE__ */ (0, Y.jsx)("span", {
					className: "min-w-0 break-words",
					children: e.root ?? "未映射"
				}), t == null ? null : /* @__PURE__ */ (0, Y.jsx)("span", {
					className: "whitespace-nowrap tabular-nums",
					children: `可用 ${F(e.free ?? 0)} · 共 ${F(t)}`
				})]
			})
		]
	});
}
function Lr({ volumes: e }) {
	return e.length ? /* @__PURE__ */ (0, Y.jsx)("div", {
		className: "flex flex-col",
		children: e.map((e) => /* @__PURE__ */ (0, Y.jsx)(Ir, { volume: e }, `${e.kind}:${e.label}`))
	}) : /* @__PURE__ */ (0, Y.jsx)(z, {
		icon: mt,
		title: "还没有存储来源",
		actions: /* @__PURE__ */ (0, Y.jsx)(B, {
			variant: "primary",
			href: hr,
			size: "small",
			children: "添加媒体"
		}),
		children: wr
	});
}
function Rr({ tags: e, tagLabel: t, onTag: n, hasMedia: r }) {
	return e.length ? /* @__PURE__ */ (0, Y.jsx)(Ve, {
		previewCount: gr,
		className: "inline-grid w-full gap-x-6 gap-y-1 sm:grid-cols-2",
		children: e.map((e, r) => /* @__PURE__ */ (0, Y.jsx)("li", {
			className: "min-w-0",
			children: /* @__PURE__ */ (0, Y.jsxs)("button", {
				type: "button",
				onClick: () => n(e.k),
				className: "flex min-h-11 w-full min-w-0 cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-left outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring",
				children: [
					/* @__PURE__ */ (0, Y.jsx)("span", {
						className: "w-6 shrink-0 text-caption-1-regular tabular-nums text-text-secondary",
						children: r + 1
					}),
					/* @__PURE__ */ (0, Y.jsx)("span", {
						className: "min-w-0 grow text-body-2-regular break-words text-text-primary",
						children: t(e.k)
					}),
					/* @__PURE__ */ (0, Y.jsx)("b", {
						className: "text-body-2-medium tabular-nums text-text-secondary",
						children: e.n.toLocaleString()
					})
				]
			})
		}, `${e.k}:${r}`))
	}) : /* @__PURE__ */ (0, Y.jsx)(z, {
		icon: yt,
		title: "还没有内容标签",
		actions: /* @__PURE__ */ (0, Y.jsx)(B, {
			variant: "secondary",
			href: r ? "/data-cleanup" : "/settings/library",
			size: "small",
			children: r ? "补全资料" : "添加媒体"
		}),
		children: xr
	});
}
function zr({ rows: e, hasMedia: t }) {
	return e.length ? /* @__PURE__ */ (0, Y.jsx)("div", {
		className: "flex flex-col gap-5",
		children: e.map((e) => {
			let t = St(e);
			return /* @__PURE__ */ (0, Y.jsxs)("article", {
				className: "flex flex-wrap items-center gap-x-6 gap-y-2",
				children: [/* @__PURE__ */ (0, Y.jsxs)("div", {
					className: "min-w-0 grow basis-64",
					children: [/* @__PURE__ */ (0, Y.jsx)("h3", {
						className: "min-w-0 text-body-2-medium text-text-primary",
						children: /* @__PURE__ */ (0, Y.jsx)("a", {
							href: ot(e),
							"data-middle-truncate": !0,
							className: "block max-w-full overflow-hidden whitespace-nowrap hover:underline",
							children: e.name
						})
					}), /* @__PURE__ */ (0, Y.jsxs)("p", {
						className: "flex flex-wrap gap-3 text-caption-1-regular text-text-secondary",
						children: [e.creator ? /* @__PURE__ */ (0, Y.jsx)("span", {
							className: "min-w-0 wrap-anywhere",
							children: e.creator
						}) : null, /* @__PURE__ */ (0, Y.jsx)("span", { children: vt(e) })]
					})]
				}), /* @__PURE__ */ (0, Y.jsxs)("div", {
					className: "min-w-0 basis-40",
					children: [/* @__PURE__ */ (0, Y.jsx)(V, {
						label: `真实观看 ${t.toFixed(0)}%`,
						value: t
					}), /* @__PURE__ */ (0, Y.jsx)("small", {
						className: "mt-1.5 block text-caption-1-regular text-text-secondary",
						children: `真实 ${t.toFixed(0)}% · 到达 ${bt(e).toFixed(0)}%`
					})]
				})]
			}, `${e.kind}:${e.id}`);
		})
	}) : /* @__PURE__ */ (0, Y.jsx)(z, {
		icon: Ct,
		title: "还没有观看记录",
		actions: /* @__PURE__ */ (0, Y.jsx)(B, {
			variant: "secondary",
			href: t ? "/" : "/settings/library",
			size: "small",
			children: t ? "浏览馆藏" : "添加媒体"
		}),
		children: Sr
	});
}
function Br({ sources: e, videos: t }) {
	return e.length ? /* @__PURE__ */ (0, Y.jsx)("div", {
		className: "inline-grid w-full gap-x-8 gap-y-6 sm:grid-cols-2",
		children: e.map((e) => /* @__PURE__ */ (0, Y.jsxs)("article", {
			className: "flex min-w-0 flex-col gap-1.5",
			children: [
				/* @__PURE__ */ (0, Y.jsxs)("header", {
					className: "flex items-baseline justify-between gap-3",
					children: [/* @__PURE__ */ (0, Y.jsx)("h3", {
						className: "min-w-0 text-body-2-medium break-words text-text-primary",
						children: e.k
					}), /* @__PURE__ */ (0, Y.jsxs)("b", {
						className: "text-body-2-medium whitespace-nowrap text-text-primary",
						children: [e.assets.toLocaleString(), /* @__PURE__ */ (0, Y.jsx)("small", {
							className: "ml-1 text-caption-1-regular font-normal text-text-secondary",
							children: "个视频"
						})]
					})]
				}),
				/* @__PURE__ */ (0, Y.jsx)(V, {
					label: `${e.k} 覆盖视频`,
					value: Ar(e.assets, Math.max(t, 1)),
					max: Math.max(t, 1)
				}),
				/* @__PURE__ */ (0, Y.jsxs)("small", {
					className: "text-caption-1-regular text-text-secondary",
					children: [e.n.toLocaleString(), " 条标签"]
				})
			]
		}, e.k))
	}) : /* @__PURE__ */ (0, Y.jsx)(z, {
		icon: yt,
		title: "还没有标签来源",
		actions: /* @__PURE__ */ (0, Y.jsx)(B, {
			variant: "secondary",
			href: t ? "/data-cleanup" : "/settings/library",
			size: "small",
			children: t ? "补全资料" : "添加媒体"
		}),
		children: Cr
	});
}
function $({ id: e, label: t, figure: n, detail: r, icon: i, accent: a }) {
	return /* @__PURE__ */ (0, Y.jsx)(P, {
		id: e,
		className: Vt({
			interactive: !0,
			selectable: !0
		}),
		children: /* @__PURE__ */ (0, Y.jsx)(zt, {
			label: t,
			icon: i,
			accent: a,
			figure: n,
			footer: r
		})
	});
}
function Vr(e) {
	let t = wt({
		queryKey: nt,
		queryFn: ({ signal: e }) => At(e)
	}), n = t.data;
	if (!n) return /* @__PURE__ */ (0, Y.jsx)(Rt, { children: /* @__PURE__ */ (0, Y.jsx)(Pt, {
		tone: "error",
		title: "馆藏统计读取失败",
		children: t.error ? it(t.error) : "未取得统计数据，请刷新页面重试。"
	}) });
	let r = n.consumption, i = n.storage_summary, a = n.by_loc.reduce((e, t) => e + t.videos, 0), o = n.by_loc.reduce((e, t) => e + t.bytes, 0), s = R(n.tag_cov) ? ht(n.tag_cov, n.attribution.videos) : "未取得", c = `${N(n.tag_cov)} / ${n.attribution.videos.toLocaleString()}`;
	return /* @__PURE__ */ (0, Y.jsxs)(Rt, { children: [
		/* @__PURE__ */ (0, Y.jsx)("p", {
			className: "text-caption-1-regular text-text-secondary",
			children: `数据库中的当前统计 · ${a.toLocaleString()} 个视频 · ${F(o)}`
		}),
		/* @__PURE__ */ (0, Y.jsxs)($e, {
			defaultSelectedKey: "inventory",
			className: "flex flex-col gap-4",
			children: [
				/* @__PURE__ */ (0, Y.jsxs)(Et, {
					"aria-label": "统计视图",
					className: Bt,
					children: [
						/* @__PURE__ */ (0, Y.jsx)($, {
							id: "inventory",
							label: "馆藏视频",
							icon: kt,
							accent: 0,
							figure: a.toLocaleString(),
							detail: F(o)
						}),
						/* @__PURE__ */ (0, Y.jsx)($, {
							id: "viewing",
							label: "看过",
							icon: et,
							accent: 1,
							figure: N(r.played),
							detail: rt(r.play_seconds)
						}),
						/* @__PURE__ */ (0, Y.jsx)($, {
							id: "coverage",
							label: "内容标签",
							icon: yt,
							accent: 2,
							figure: s,
							detail: c
						}),
						/* @__PURE__ */ (0, Y.jsx)($, {
							id: "storage",
							label: "使用空间",
							icon: mt,
							accent: 3,
							figure: `${i.online.toLocaleString()} 个卷`,
							detail: i.measured ? `已用 ${F(i.used)}` : "容量未取得"
						})
					]
				}),
				/* @__PURE__ */ (0, Y.jsx)(I, {
					id: "inventory",
					children: /* @__PURE__ */ (0, Y.jsx)(Nr, {
						data: n,
						...e
					})
				}),
				/* @__PURE__ */ (0, Y.jsxs)(I, {
					id: "viewing",
					className: "flex flex-col gap-5",
					children: [/* @__PURE__ */ (0, Y.jsx)(Mr, {
						headline: /* @__PURE__ */ (0, Y.jsx)(jr, {
							term: "观看",
							figure: N(r.played),
							unit: "个作品有播放记录"
						}),
						children: /* @__PURE__ */ (0, Y.jsxs)("div", {
							className: "inline-grid w-full gap-3 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, Y.jsx)(Z, {
									term: "馆藏观看",
									value: r.library_played
								}),
								/* @__PURE__ */ (0, Y.jsx)(Z, {
									term: "在线直接观看",
									value: r.online_played
								}),
								/* @__PURE__ */ (0, Y.jsx)(Z, {
									term: "高潮计数",
									value: r.o_total
								}),
								/* @__PURE__ */ (0, Y.jsx)(Z, {
									term: "快进扫过",
									value: r.skimmed
								}),
								/* @__PURE__ */ (0, Y.jsx)(Z, {
									term: "喜欢",
									value: r.liked
								}),
								/* @__PURE__ */ (0, Y.jsx)(Z, {
									term: "明确不喜欢",
									value: r.dislike
								}),
								/* @__PURE__ */ (0, Y.jsx)(Z, {
									term: "看过了",
									value: r.seen
								}),
								/* @__PURE__ */ (0, Y.jsx)(Z, {
									term: "回收站",
									value: r.trash
								})
							]
						})
					}), /* @__PURE__ */ (0, Y.jsx)(Pr, { data: n })]
				}),
				/* @__PURE__ */ (0, Y.jsx)(I, {
					id: "coverage",
					children: /* @__PURE__ */ (0, Y.jsx)(Mr, {
						headline: /* @__PURE__ */ (0, Y.jsx)(jr, {
							term: "内容标签覆盖",
							figure: s,
							unit: c
						}),
						children: /* @__PURE__ */ (0, Y.jsx)(Fr, { attribution: n.attribution })
					})
				}),
				/* @__PURE__ */ (0, Y.jsx)(I, {
					id: "storage",
					children: /* @__PURE__ */ (0, Y.jsx)(Mr, {
						headline: /* @__PURE__ */ (0, Y.jsx)(jr, {
							term: "使用空间",
							figure: i.measured.toLocaleString(),
							unit: "个卷已取得容量"
						}),
						children: /* @__PURE__ */ (0, Y.jsx)(Lr, {
							volumes: n.storage_volumes,
							...e
						})
					})
				})
			]
		}),
		/* @__PURE__ */ (0, Y.jsxs)($e, {
			defaultSelectedKey: "tags",
			className: `${xt({ padding: "none" })} flex flex-col`,
			children: [
				/* @__PURE__ */ (0, Y.jsx)("div", {
					className: "px-4 pt-3",
					children: /* @__PURE__ */ (0, Y.jsxs)(Dt, {
						"aria-label": "统计维度",
						className: jt,
						children: [
							/* @__PURE__ */ (0, Y.jsx)(P, {
								id: "tags",
								className: L,
								children: "内容标签"
							}),
							/* @__PURE__ */ (0, Y.jsx)(P, {
								id: "recent",
								className: L,
								children: "最近看过"
							}),
							/* @__PURE__ */ (0, Y.jsx)(P, {
								id: "sources",
								className: L,
								children: "标签来源"
							})
						]
					})
				}),
				/* @__PURE__ */ (0, Y.jsx)(I, {
					id: "tags",
					className: "px-4 pt-3.5 pb-4",
					children: /* @__PURE__ */ (0, Y.jsx)(Rr, {
						tags: n.top_tags,
						hasMedia: a > 0,
						...e
					})
				}),
				/* @__PURE__ */ (0, Y.jsx)(I, {
					id: "recent",
					className: "px-4 pt-3.5 pb-4",
					children: /* @__PURE__ */ (0, Y.jsx)(zr, {
						rows: n.recent,
						hasMedia: a > 0
					})
				}),
				/* @__PURE__ */ (0, Y.jsx)(I, {
					id: "sources",
					className: "px-4 pt-3.5 pb-4",
					children: /* @__PURE__ */ (0, Y.jsx)(Br, {
						sources: n.tag_source,
						videos: n.attribution.videos
					})
				})
			]
		})
	] });
}
//#endregion
export { Vr as StatsPage };

//# debugId=e9dff2b2-ed62-44e7-bc4b-3bb6f0b39255