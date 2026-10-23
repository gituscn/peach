(function() {
	try {
		var e = typeof window < "u" ? window : typeof global < "u" ? global : typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : {}, t = new e.Error().stack;
		t && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[t] = "8abe0556-ed80-48ed-9ba4-6a697e5e5b94", e._sentryDebugIdIdentifier = "sentry-dbid-8abe0556-ed80-48ed-9ba4-6a697e5e5b94");
	} catch {}
})();
import { ActivePoints as e, ActivityHeat as t, AnimatedItems as n, BAR_DOMAIN as r, CHART_CARD as i, CHART_COLORS as a, CartesianLabelListContextProvider as o, CategoryTick as s, ChartBackground as c, ChartContainer as l, ChartHead as u, ChartLegend as d, ChartLegendContent as f, ChartTip as p, ChartTooltip as m, ChartTooltipContent as h, DefaultZIndexes as g, Dots as _, EvilBarChart as v, ExpandableRanking as y, LabelListFromLabelProp as b, Layer as x, LoadingIndicator as S, PolarAngleAxis as C, PolarChart as ee, PolarLabelContextProvider as w, PolarLabelFromLabelProp as te, Polygon as ne, RegisterGraphicalItemId as re, SetPolarGraphicalItem as ie, SetPolarLegendPayload as ae, SetTooltipEntrySettings as oe, Text as se, ZIndexLayer as ce, adaptEventsOfChild as le, addRadiusAxis as ue, arrayTooltipSearcher as de, barLabel as fe, categoryAxisWidth as pe, cn as me, createSelector as T, defaultPolarChartProps as he, defaultPolarRadiusAxisProps as ge, fitLabel as _e, getAxisTypeBasedOnLayout as ve, getBandSizeOfAxis as ye, getClassNameFromUnknown as be, getColorsCount as xe, getTooltipNameProp as Se, getValueByDataKey as Ce, identity as we, interpolate as E, isArrayLike as Te, isCategoricalAxis as Ee, isNullish as De, iteratee as Oe, matchAnimationItems as ke, matchByIndex as Ae, noop as je, polarToCartesian as D, removeRadiusAxis as Me, resolveDefaultProps as O, selectAngleAxis as Ne, selectChartDataAndAlwaysIgnoreIndexes as Pe, selectChartLayout as Fe, selectPolarAxisScale as Ie, selectPolarAxisTicks as k, selectPolarViewBox as Le, selectRadiusAxis as Re, selectUnfilteredPolarItems as ze, svgPropertiesAndEvents as Be, svgPropertiesNoEvents as A, svgPropertiesNoEventsFromUnknown as Ve, tone as He, useAnimationCallbacks as Ue, useAnimationStartSnapshot as We, useAppDispatch as Ge, useAppSelector as j, useIsPanorama as Ke, usePolarChartLayout as qe } from "./peach-app.expandable-ranking-CyDn34Ar.js";
import { $542a13ca2fa5b484$export$5b6b19405a83ff9d as Je, $b4f18e3395fe64d7$export$3d96ec278d3efce4 as Ye, $b4f18e3395fe64d7$export$3e41faf802a29e71 as Xe, $b4f18e3395fe64d7$export$b2539bed5023c21c as Ze, Button as M, ButtonLink as Qe, Disclosure as $e, E3 as et, EmptyState as N, FLOW_LABEL_X as tt, FLOW_VIEWBOX as nt, Gg as rt, IDLE_POLL_MS as it, Input as at, M6 as ot, MENU_ITEM as st, MENU_ITEM_INTERACTIVE as ct, MENU_POPOVER_SURFACE as lt, MenuDialog as ut, Note as P, OV as dt, Progress as ft, Rf as pt, SEGMENT as mt, SEGMENTED_TRACK as ht, SegmentedTabList as gt, Select$1 as _t, SelectItem as vt, TASTE_REFRESH_KEY as yt, TASTE_WINDOWS as bt, TaskProgress as xt, Wt as St, Xt as Ct, _8 as wt, __toESM as Tt, aB as Et, avatarInner as Dt, busyProps as F, cB as Ot, cardClass as I, clsx as L, configureTasteBrowser as kt, confirmModal as At, cx as jt, errorMessage as R, f1 as Mt, fetchTaste as Nt, fetchTasteJob as Pt, firstGrapheme as Ft, flowGraph as It, flowLabel as Lt, fmtSize as Rt, g4 as zt, historySpan as Bt, importTasteExport as Vt, keepPreviousData as Ht, mM as Ut, pv as z, queryClient as B, r2 as Wt, radarRows as Gt, rankDetail as Kt, rankShares as qt, removeTasteSource as Jt, require_jsx_runtime as Yt, require_react as Xt, siteMarkUrl as Zt, startTasteRefresh as Qt, tasteDate as $t, tasteDimensions as en, tasteHours as tn, tasteKey as V, topScores as nn, uo as rn, useBackgroundJob as an, useMutation as on, useQuery as sn } from "./peach-app.js";
import { Page as cn } from "./peach-app.page-Irl_Wogd.js";
import { STAT_STRIP as ln, StatCard as un, statCardClass as dn } from "./peach-app.stat-card-Q_AB9v0S.js";
import { LEGACY_AVATAR_IMG as fn } from "./peach-app.legacy-avatar-CtPLcaNX.js";
var pn = T([(e, t) => k(e, "angleAxis", t, !1)], (e) => {
	if (e) return e.map((e) => e.coordinate);
}), mn = T([(e, t) => k(e, "radiusAxis", t, !1)], (e) => {
	if (e) return e.map((e) => e.coordinate);
}), H = /* @__PURE__ */ Tt(Xt()), hn = [
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
		var o = D(t, n, e, r);
		i += a ? `L ${o.x},${o.y}` : `M ${o.x},${o.y}`;
	}), i += "Z", i;
}, Cn = (e) => {
	var t = e.cx, n = e.cy, r = e.innerRadius, i = e.outerRadius, a = e.polarAngles, o = e.radialLines;
	if (!a || !a.length || !o) return null;
	var s = W({}, A(e));
	return /*#__PURE__*/ H.createElement("g", { className: "recharts-polar-grid-angle" }, a.map((e) => {
		var a = D(t, n, r, e), o = D(t, n, i, e);
		return /*#__PURE__*/ H.createElement("line", U({ key: `line-${e}` }, s, {
			x1: a.x,
			y1: a.y,
			x2: o.x,
			y2: o.y
		}));
	}));
}, wn = (e) => {
	var t = e.cx, n = e.cy, r = e.radius, i = W({}, A(e));
	return /*#__PURE__*/ H.createElement("circle", U({}, i, {
		className: L("recharts-polar-grid-concentric-circle", e.className),
		cx: t,
		cy: n,
		r
	}));
}, Tn = (e) => {
	var t = e.radius, n = W({}, A(e));
	return /*#__PURE__*/ H.createElement("path", U({}, n, {
		className: L("recharts-polar-grid-concentric-polygon", e.className),
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
	zIndex: g.grid,
	stroke: "#ccc",
	strokeWidth: 1,
	fill: "none"
}, On = (e) => {
	var t = O(e, Dn), n = t.gridType, r = t.radialLines, i = t.angleAxisId, a = t.radiusAxisId, o = t.cx, s = t.cy, c = t.innerRadius, l = t.outerRadius, u = t.polarAngles, d = t.polarRadius, f = t.zIndex, p = gn(t, hn), m = j(Le), h = j((e) => pn(e, i)), g = j((e) => mn(e, a)), _ = Array.isArray(u) ? u : h, v = Array.isArray(d) ? d : g;
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
	return y.outerRadius <= 0 ? null : /*#__PURE__*/ H.createElement(ce, { zIndex: y.zIndex }, /*#__PURE__*/ H.createElement("g", { className: "recharts-polar-grid" }, /*#__PURE__*/ H.createElement(En, U({
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
function An(e, t = we) {
	if (e == null) return;
	let n = kn(e);
	if (n.length === 0) return;
	let r = Oe(t), i, a;
	for (let e = 0; e < n.length; e++) {
		let t = n[e], o = r(t, e, n);
		o == null || Number.isNaN(o) || typeof o == "symbol" || (a === void 0 || o > a) && (a = o, i = t);
	}
	return i;
}
//#endregion
//#region node_modules/es-toolkit/dist/compat/math/minBy.mjs
function jn(e, t = we) {
	if (e == null) return;
	let n = kn(e);
	if (n.length === 0) return;
	let r = Oe(t), i, a;
	for (let e = 0; e < n.length; e++) {
		let t = n[e], o = r(t, e, n);
		o == null || Number.isNaN(o) || typeof o == "symbol" || (a === void 0 || o < a) && (a = o, i = t);
	}
	return i;
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
function Hn(e) {
	var t = Ge(), n = qe(), r = (0, H.useMemo)(() => {
		var t = e.type, r = zn(e, Mn), i = ve(n, "radiusAxis", t);
		if (i != null) return K(K({}, r), {}, { type: i });
	}, [e, n]);
	return (0, H.useEffect)(() => r == null ? je : (t(ue(r)), () => {
		t(Me(r));
	}), [t, r]), null;
}
var Un = (e, t, n, r) => {
	var i = e.coordinate;
	return D(n, r, i, t);
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
	var n = e.cx, r = e.cy, i = e.angle, a = e.axisLine, o = zn(e, Nn), s = t.reduce((e, t) => [Math.min(e[0], t.coordinate), Math.max(e[1], t.coordinate)], [Infinity, -Infinity]), c = D(n, r, s[0], i), l = D(n, r, s[1], i), u = K(K(K({}, A(o)), {}, { fill: "none" }, A(a)), {}, {
		x1: c.x,
		y1: c.y,
		x2: l.x,
		y2: l.y
	});
	return /*#__PURE__*/ H.createElement("line", G({ className: "recharts-polar-radius-axis-line" }, u));
}, qn = (e, t, n) => /*#__PURE__*/ H.isValidElement(e) ? /*#__PURE__*/ H.cloneElement(e, t) : typeof e == "function" ? e(t) : /*#__PURE__*/ H.createElement(se, G({}, t, { className: "recharts-polar-radius-axis-tick-value" }), n), Jn = (e, t) => {
	var n = e.angle, r = e.tickFormatter, i = e.stroke, a = e.tick, o = zn(e, Pn), s = Wn(e.orientation), c = A(o), l = Ve(a), u = t.map((t, o) => {
		var u = Un(t, e.angle, e.cx, e.cy), d = K(K(K(K({
			textAnchor: s,
			transform: `rotate(${90 - n}, ${u.x}, ${u.y})`
		}, c), {}, {
			stroke: "none",
			fill: i
		}, l), {}, { index: o }, u), {}, { payload: t });
		return /*#__PURE__*/ H.createElement(x, G({
			className: L("recharts-polar-radius-axis-tick", be(a)),
			key: `tick-${t.coordinate}`
		}, le(e, t, o)), qn(a, d, r ? r(t.value, o) : t.value));
	});
	return /*#__PURE__*/ H.createElement(x, { className: "recharts-polar-radius-axis-ticks" }, u);
}, Yn = (e) => {
	var t = e.radiusAxisId, n = j(Le), r = j((e) => Ie(e, "radiusAxis", t)), i = j((e) => k(e, "radiusAxis", t, !1));
	if (n == null || !i || !i.length || r == null) return null;
	var a = K(K({}, e), {}, { scale: r }, n), o = a.tick, s = a.axisLine;
	return /*#__PURE__*/ H.createElement(ce, { zIndex: a.zIndex }, /*#__PURE__*/ H.createElement(x, { className: L("recharts-polar-radius-axis", Vn, a.className) }, s && Kn(a, i), o && Jn(a, i), /*#__PURE__*/ H.createElement(w, Gn(a.angle, a.cx, a.cy, i), /*#__PURE__*/ H.createElement(te, { label: a.label }), a.children)));
};
function Xn(e) {
	var t = O(e, ge);
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
	if (Te(e) && e.length !== 0) return Zn(kn(e));
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
function er(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? $n(Object(n), !0).forEach(function(t) {
			tr(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : $n(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function tr(e, t, n) {
	return (t = nr(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function nr(e) {
	var t = rr(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function rr(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var ir = (e, t) => Ie(e, "radiusAxis", t), ar = T([ir], (e) => {
	if (e != null) return { scale: e };
}), or = T([Re, ir], (e, t) => {
	if (e != null && t != null) return er(er({}, e), {}, { scale: t });
}), sr = (e, t, n, r) => k(e, "radiusAxis", t, r), cr = (e, t, n) => Ne(e, n), lr = (e, t, n) => Ie(e, "angleAxis", n), ur = T([cr, lr], (e, t) => {
	if (e != null && t != null) return er(er({}, e), {}, { scale: t });
}), dr = (e, t, n, r) => k(e, "angleAxis", n, r), fr = T([
	cr,
	lr,
	Le
], (e, t, n) => {
	if (n != null && t != null) return {
		scale: t,
		type: e.type,
		dataKey: e.dataKey,
		cx: n.cx,
		cy: n.cy
	};
}), pr = (e, t, n, r, i) => i, mr = T([
	Fe,
	or,
	sr,
	ur,
	dr
], (e, t, n, r, i) => Ee(e, "radiusAxis") ? ye(t, n, !1) : ye(r, i, !1)), hr = T([ze, pr], (e, t) => {
	if (e != null) return e.find((e) => e.type === "radar" && t === e.id)?.dataKey;
}), gr = T([
	ar,
	fr,
	Pe,
	hr,
	mr
], (e, t, n, r, i) => {
	var a = n.chartData, o = n.dataStartIndex, s = n.dataEndIndex;
	if (e != null && t != null && a != null && i != null && r != null) return Or({
		radiusAxis: e,
		angleAxis: t,
		displayedData: a.slice(o, s + 1),
		dataKey: r,
		bandSize: i
	});
}), _r = ["id"];
function q() {
	return q = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, q.apply(null, arguments);
}
function vr(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function J(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? vr(Object(n), !0).forEach(function(t) {
			yr(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : vr(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function yr(e, t, n) {
	return (t = br(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function br(e) {
	var t = xr(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function xr(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function Sr(e, t) {
	if (e == null) return {};
	var n, r, i = Cr(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function Cr(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
function wr(e, t) {
	return e && e !== "none" ? e : t;
}
var Tr = (e) => {
	var t = e.dataKey, n = e.name, r = e.stroke, i = e.fill, a = e.legendType;
	return [{
		inactive: e.hide,
		dataKey: t,
		type: a,
		color: wr(r, i),
		value: Se(n, t),
		payload: e
	}];
}, Er = /*#__PURE__*/ H.memo((e) => {
	var t = e.dataKey, n = e.stroke, r = e.strokeWidth, i = e.fill, a = e.name, o = e.hide, s = e.tooltipType, c = e.id, l = {
		dataDefinedOnItem: void 0,
		getPosition: je,
		settings: {
			stroke: n,
			strokeWidth: r,
			fill: i,
			nameKey: void 0,
			dataKey: t,
			name: Se(a, t),
			hide: o,
			type: s,
			color: wr(n, i),
			unit: "",
			graphicalItemId: c
		}
	};
	return /*#__PURE__*/ H.createElement(oe, { tooltipEntrySettings: l });
});
function Dr(e) {
	var t = e.points, n = e.props, r = n.dot, i = n.dataKey;
	n.id;
	var a = Sr(n, _r), o = A(a);
	return /*#__PURE__*/ H.createElement(_, {
		points: t,
		dot: r,
		className: "recharts-radar-dots",
		dotClassName: "recharts-radar-dot",
		dataKey: i,
		baseProps: o
	});
}
function Or(e) {
	var t = e.radiusAxis, n = e.angleAxis, r = e.displayedData, i = e.dataKey, a = e.bandSize, o = n.cx, s = n.cy, c = !1, l = [], u = n.type === "number" ? 0 : a ?? 0;
	r.forEach((e, r) => {
		var a = Ce(e, n.dataKey, r), d = Ce(e, i), f = (n.scale.map(a) ?? 0) + u, p = Array.isArray(d) ? Qn(d) : d, m = De(p) ? 0 : t.scale.map(p) ?? 0;
		Array.isArray(d) && d.length >= 2 && (c = !0), l.push(J(J({}, D(o, s, m, f)), {}, {
			name: a,
			value: d,
			cx: o,
			cy: s,
			radius: m,
			angle: f,
			payload: e
		}));
	});
	var d = [];
	return c && l.forEach((e) => {
		if (Array.isArray(e.value)) {
			var n = e.value[0], r = De(n) ? 0 : t.scale.map(n) ?? 0;
			d.push(J(J({}, e), {}, { radius: r }, D(o, s, r, e.angle)));
		} else d.push(e);
	}), {
		points: l,
		isRange: c,
		baseLinePoints: d
	};
}
function kr(e) {
	var t = e.showLabels, n = e.points, r = e.children, i = n.map((e) => {
		var t = {
			x: e.x,
			y: e.y,
			width: 0,
			lowerWidth: 0,
			upperWidth: 0,
			height: 0
		};
		return J(J({}, t), {}, {
			value: e.value ?? "",
			payload: e.payload,
			parentViewBox: void 0,
			viewBox: t,
			fill: void 0
		});
	});
	return /*#__PURE__*/ H.createElement(o, { value: t ? i : void 0 }, r);
}
function Ar(e) {
	var t = e.points, n = e.baseLinePoints, r = e.props;
	if (t == null) return null;
	var i = r.shape, a = r.isRange, o = r.connectNulls, s = /*#__PURE__*/ H.isValidElement(i) ? /*#__PURE__*/ H.cloneElement(i, J(J({}, r), {}, { points: t })) : typeof i == "function" ? i(J(J({}, r), {}, { points: t })) : /*#__PURE__*/ H.createElement(ne, q({}, Be(r), {
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
	return /*#__PURE__*/ H.createElement(x, { className: "recharts-radar-polygon" }, s, /*#__PURE__*/ H.createElement(Dr, {
		props: r,
		points: t
	}));
}
var jr = (e, t) => e == null ? [] : t === 1 ? e.flatMap((e) => e.status === "removed" ? [] : [e.next]) : e.flatMap((e) => e.status === "removed" ? [] : e.status === "matched" ? [J(J({}, e.next), {}, {
	x: E(e.prev.x, e.next.x, t),
	y: E(e.prev.y, e.next.y, t)
})] : [J(J({}, e.next), {}, {
	x: E(e.next.cx, e.next.x, t),
	y: E(e.next.cy, e.next.y, t)
})]);
function Mr(e) {
	var t = e.props, r = e.previousPointsRef, i = e.previousBaseLinePointsRef, a = t.points, o = t.baseLinePoints, s = t.isAnimationActive, c = t.animationBegin, l = t.animationDuration, u = t.animationEasing, d = t.animationMatchBy, f = t.animationInterpolateFn, p = t.onAnimationStart, m = t.onAnimationEnd, h = We(t, i), g = h.startValue, _ = ke(g ?? null, o, d), v = Ue(p, m), y = v.isAnimating, x = v.handleAnimationStart, S = v.handleAnimationEnd, C = qe();
	return C == null ? null : /*#__PURE__*/ H.createElement(kr, {
		showLabels: !y,
		points: a
	}, /*#__PURE__*/ H.createElement(n, {
		animationInput: t,
		animationIdPrefix: "recharts-radar-",
		items: a,
		previousItemsRef: r,
		isAnimationActive: s,
		animationBegin: c,
		animationDuration: l,
		animationEasing: u,
		onAnimationStart: x,
		onAnimationEnd: S,
		animationInterpolateFn: f,
		animationMatchBy: d,
		layout: C
	}, (e, n) => {
		var r = n === 1 ? o : f(_, n, C);
		return h.syncStepValue(r, n), /*#__PURE__*/ H.createElement(Ar, {
			points: e,
			baseLinePoints: r,
			props: t
		});
	}), /*#__PURE__*/ H.createElement(b, { label: t.label }), t.children);
}
function Nr(e) {
	var t = (0, H.useRef)(void 0), n = (0, H.useRef)(void 0);
	return /*#__PURE__*/ H.createElement(Mr, {
		props: e,
		previousPointsRef: t,
		previousBaseLinePointsRef: n
	});
}
var Pr = {
	activeDot: !0,
	angleAxisId: 0,
	animationBegin: 0,
	animationDuration: 1500,
	animationEasing: "ease",
	animationMatchBy: Ae,
	animationInterpolateFn: jr,
	dot: !1,
	hide: !1,
	isAnimationActive: "auto",
	label: !1,
	legendType: "rect",
	radiusAxisId: 0,
	zIndex: g.area
};
function Fr(t) {
	var n = t.hide, r = t.className, i = t.points;
	if (n) return null;
	var a = L("recharts-radar", r);
	return /*#__PURE__*/ H.createElement(ce, { zIndex: t.zIndex }, /*#__PURE__*/ H.createElement(x, { className: a }, /*#__PURE__*/ H.createElement(Nr, t)), /*#__PURE__*/ H.createElement(e, {
		points: i,
		mainColor: wr(t.stroke, t.fill),
		itemDataKey: t.dataKey,
		activeDot: t.activeDot
	}));
}
function Ir(e) {
	var t = Ke(), n = j((n) => gr(n, e.radiusAxisId, e.angleAxisId, t, e.id));
	return n?.points == null ? null : /*#__PURE__*/ H.createElement(Fr, q({}, e, {
		points: n?.points,
		baseLinePoints: n?.baseLinePoints,
		isRange: n?.isRange
	}));
}
function Lr(e) {
	var t = O(e, Pr);
	return /*#__PURE__*/ H.createElement(re, {
		id: t.id,
		type: "radar"
	}, (e) => /*#__PURE__*/ H.createElement(H.Fragment, null, /*#__PURE__*/ H.createElement(ie, {
		type: "radar",
		id: e,
		data: void 0,
		dataKey: t.dataKey,
		hide: t.hide,
		angleAxisId: t.angleAxisId,
		radiusAxisId: t.radiusAxisId
	}), /*#__PURE__*/ H.createElement(ae, { legendPayload: Tr(t) }), /*#__PURE__*/ H.createElement(Er, {
		dataKey: t.dataKey,
		stroke: t.stroke,
		strokeWidth: t.strokeWidth,
		fill: t.fill,
		name: t.name,
		hide: t.hide,
		tooltipType: t.tooltipType,
		id: e
	}), /*#__PURE__*/ H.createElement(Ir, q({}, t, { id: e }))));
}
Lr.displayName = "Radar";
//#endregion
//#region node_modules/recharts/es6/chart/RadarChart.js
function Rr(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function zr(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? Rr(Object(n), !0).forEach(function(t) {
			Br(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Rr(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function Br(e, t, n) {
	return (t = Vr(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function Vr(e) {
	var t = Hr(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function Hr(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var Ur = ["axis"], Wr = zr(zr({}, he), {}, {
	layout: "centric",
	startAngle: 90,
	endAngle: -270
}), Gr = /*#__PURE__*/ (0, H.forwardRef)((e, t) => {
	var n = O(e, Wr);
	return /*#__PURE__*/ H.createElement(ee, {
		chartName: "RadarChart",
		defaultTooltipEventType: "axis",
		validateTooltipEventTypes: Ur,
		tooltipPayloadSearcher: de,
		categoricalChartProps: n,
		ref: t
	});
}), Y = Yt(), Kr = H.memo(function({ cx: e, cy: t, dataKey: n, chartId: r, className: i, fillOpacity: a = 1, type: o = "default", maskId: s }) {
	let c = H.useId().replace(/:/g, ""), l = `url(#${r}-colors-${String(n)})`;
	if (e === void 0 || t === void 0) return null;
	switch (o) {
		case "border": return /* @__PURE__ */ (0, Y.jsx)(Jr, {
			cx: e,
			cy: t,
			dotId: c,
			fillOpacity: a,
			gradientUrl: l,
			className: i,
			maskId: s
		});
		case "colored-border": return /* @__PURE__ */ (0, Y.jsx)(Yr, {
			cx: e,
			cy: t,
			dotId: c,
			fillOpacity: a,
			gradientUrl: l,
			className: i,
			maskId: s
		});
		default: return /* @__PURE__ */ (0, Y.jsx)(qr, {
			cx: e,
			cy: t,
			dotId: c,
			fillOpacity: a,
			gradientUrl: l,
			className: i,
			maskId: s
		});
	}
}), qr = H.memo(({ cx: e, cy: t, dotId: n, fillOpacity: r, gradientUrl: i, className: a, maskId: o }) => /* @__PURE__ */ (0, Y.jsxs)("g", {
	className: a,
	mask: o ? `url(#${o})` : void 0,
	children: [/* @__PURE__ */ (0, Y.jsx)("defs", { children: /* @__PURE__ */ (0, Y.jsx)("clipPath", {
		id: `dot-clip-${n}`,
		children: /* @__PURE__ */ (0, Y.jsx)("circle", {
			cx: e,
			cy: t,
			r: 3
		})
	}) }), /* @__PURE__ */ (0, Y.jsx)("rect", {
		x: "0",
		y: t - 3,
		width: "100%",
		height: 6,
		fill: i,
		fillOpacity: r,
		clipPath: `url(#dot-clip-${n})`
	})]
}));
qr.displayName = "DefaultDot";
var Jr = H.memo(({ cx: e, cy: t, dotId: n, fillOpacity: r, gradientUrl: i, className: a, maskId: o }) => /* @__PURE__ */ (0, Y.jsxs)("g", {
	className: me(a, "text-background"),
	mask: o ? `url(#${o})` : void 0,
	children: [
		/* @__PURE__ */ (0, Y.jsx)("defs", { children: /* @__PURE__ */ (0, Y.jsx)("clipPath", {
			id: `dot-clip-${n}`,
			children: /* @__PURE__ */ (0, Y.jsx)("circle", {
				cx: e,
				cy: t,
				r: 6
			})
		}) }),
		/* @__PURE__ */ (0, Y.jsx)("circle", {
			cx: e,
			cy: t,
			r: 6,
			fill: "currentColor"
		}),
		/* @__PURE__ */ (0, Y.jsx)("rect", {
			x: "0",
			y: t - (6 - 5 / 2),
			width: "100%",
			height: 7,
			fill: i,
			fillOpacity: r,
			clipPath: `url(#dot-clip-inner-${n})`
		}),
		/* @__PURE__ */ (0, Y.jsx)("defs", { children: /* @__PURE__ */ (0, Y.jsx)("clipPath", {
			id: `dot-clip-inner-${n}`,
			children: /* @__PURE__ */ (0, Y.jsx)("circle", {
				cx: e,
				cy: t,
				r: 6 - 5 / 2
			})
		}) })
	]
}));
Jr.displayName = "PrimaryBorderDot";
var Yr = H.memo(({ cx: e, cy: t, dotId: n, fillOpacity: r, gradientUrl: i, className: a, maskId: o }) => /* @__PURE__ */ (0, Y.jsxs)("g", {
	className: me(a, "text-background"),
	mask: o ? `url(#${o})` : void 0,
	children: [
		/* @__PURE__ */ (0, Y.jsx)("defs", { children: /* @__PURE__ */ (0, Y.jsx)("clipPath", {
			id: `dot-clip-${n}`,
			children: /* @__PURE__ */ (0, Y.jsx)("circle", {
				cx: e,
				cy: t,
				r: 3.5
			})
		}) }),
		/* @__PURE__ */ (0, Y.jsx)("rect", {
			x: "0",
			y: t - 3 - 1 / 2,
			width: "100%",
			height: 7,
			fill: i,
			fillOpacity: r,
			clipPath: `url(#dot-clip-${n})`
		}),
		/* @__PURE__ */ (0, Y.jsx)("circle", {
			cx: e,
			cy: t,
			r: 3 - 1 / 2,
			fill: "currentColor"
		})
	]
}));
Yr.displayName = "ColoredBorderDot";
//#endregion
//#region src/react/evilcharts/registry/charts/recharts-radar-chart.tsx
var Xr = 1, Zr = .3, Qr = 6, $r = 1500, ei = "value", ti = (0, H.createContext)(null);
function X() {
	let e = (0, H.use)(ti);
	if (!e) throw Error("Radar chart parts (<Radar />, <PolarAngleAxis />, …) must be used within <EvilRadarChart />");
	return e;
}
function Z({ config: e, data: t, children: n, className: r, chartProps: i, backgroundVariant: a, defaultSelectedDataKey: o = null, onSelectionChange: s, isLoading: u = !1, loadingPoints: d }) {
	let f = (0, H.useId)().replace(/:/g, ""), [p, m] = (0, H.useState)(o), h = _i(u, d), g = (0, H.useCallback)((e) => {
		m(e), s?.(e);
	}, [s]), _ = (0, H.useMemo)(() => ({
		config: e,
		isLoading: u,
		selectedDataKey: p,
		selectDataKey: g
	}), [
		e,
		u,
		p,
		g
	]);
	return /* @__PURE__ */ (0, Y.jsx)(ti, {
		value: _,
		children: /* @__PURE__ */ (0, Y.jsxs)(l, {
			className: r,
			config: e,
			children: [/* @__PURE__ */ (0, Y.jsx)(S, { isLoading: u }), /* @__PURE__ */ (0, Y.jsxs)(Gr, {
				id: f,
				data: u ? h : t,
				...i,
				children: [
					a && /* @__PURE__ */ (0, Y.jsx)(c, { variant: a }),
					n,
					u && /* @__PURE__ */ (0, Y.jsx)(vi, {})
				]
			})]
		})
	});
}
function ni({ dataKey: e, variant: t = "filled", fillOpacity: n = Zr, isGlowing: r = !1, isClickable: i = !1, children: a, radarProps: o }) {
	let { config: s, isLoading: c, selectedDataKey: l, selectDataKey: u } = X(), d = (0, H.useId)().replace(/:/g, "");
	if (c) return null;
	let f = i && l !== null && l !== e, p = {
		stroke: f ? .2 : 1,
		fill: f ? .1 : 1,
		dot: f ? .2 : 1
	}, m = t === "filled", { dot: h, activeDot: g } = ui(a, d, e, p.dot);
	return /* @__PURE__ */ (0, Y.jsxs)(Y.Fragment, { children: [/* @__PURE__ */ (0, Y.jsx)(Lr, {
		dataKey: e,
		stroke: `url(#${d}-radar-stroke-${e})`,
		strokeOpacity: p.stroke,
		strokeWidth: Xr,
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
	}), /* @__PURE__ */ (0, Y.jsxs)("defs", { children: [
		/* @__PURE__ */ (0, Y.jsx)(fi, {
			id: d,
			dataKey: e,
			config: s
		}),
		/* @__PURE__ */ (0, Y.jsx)(pi, {
			id: d,
			dataKey: e,
			config: s
		}),
		m && /* @__PURE__ */ (0, Y.jsx)(mi, {
			id: d,
			dataKey: e,
			config: s
		}),
		r && /* @__PURE__ */ (0, Y.jsx)(hi, {
			id: d,
			dataKey: e
		})
	] })] });
}
var ri = () => null, ii = () => null;
function ai({ gridType: e = "polygon", stroke: t = "currentColor", strokeOpacity: n = .2, strokeDasharray: r = "3 4", ...i }) {
	return /* @__PURE__ */ (0, Y.jsx)(On, {
		gridType: e,
		stroke: t,
		strokeOpacity: n,
		strokeDasharray: r,
		...i
	});
}
function oi({ tick: e = {
	fill: "currentColor",
	fontSize: 12
}, tickLine: t = !1, ...n }) {
	let { isLoading: r } = X();
	return r ? null : /* @__PURE__ */ (0, Y.jsx)(C, {
		tick: e,
		tickLine: t,
		...n
	});
}
function si({ tick: e = {
	fill: "currentColor",
	fontSize: 10
}, tickLine: t = !1, axisLine: n = !1, ...r }) {
	let { isLoading: i } = X();
	return i ? null : /* @__PURE__ */ (0, Y.jsx)(Xn, {
		tick: e,
		tickLine: t,
		axisLine: n,
		...r
	});
}
function ci({ variant: e, roundness: t, defaultIndex: n }) {
	let { isLoading: r, selectedDataKey: i } = X();
	return r ? null : /* @__PURE__ */ (0, Y.jsx)(m, {
		defaultIndex: n,
		cursor: !1,
		content: /* @__PURE__ */ (0, Y.jsx)(h, {
			selected: i,
			roundness: t,
			variant: e
		})
	});
}
function li({ variant: e, align: t = "center", verticalAlign: n = "bottom", isClickable: r = !1 }) {
	let { isLoading: i, selectedDataKey: a, selectDataKey: o } = X();
	return i ? null : /* @__PURE__ */ (0, Y.jsx)(d, {
		verticalAlign: n,
		align: t,
		content: /* @__PURE__ */ (0, Y.jsx)(f, {
			selected: a,
			onSelectChange: o,
			isClickable: r,
			variant: e
		})
	});
}
var ui = (e, t, n, r) => {
	let i = !1, a = !1;
	return H.Children.forEach(e, (e) => {
		if ((0, H.isValidElement)(e)) {
			if (e.type === ri) {
				let { variant: a } = e.props;
				i = /* @__PURE__ */ (0, Y.jsx)(Kr, {
					type: a,
					dataKey: n,
					chartId: t,
					fillOpacity: r
				});
			}
			if (e.type === ii) {
				let { variant: i } = e.props;
				a = /* @__PURE__ */ (0, Y.jsx)(Kr, {
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
}, di = ({ dataKey: e, colorsCount: t, opacities: n }) => t === 1 ? /* @__PURE__ */ (0, Y.jsxs)(Y.Fragment, { children: [/* @__PURE__ */ (0, Y.jsx)("stop", {
	offset: "0%",
	stopColor: `var(--color-${e}-0)`,
	stopOpacity: n?.[0]
}), /* @__PURE__ */ (0, Y.jsx)("stop", {
	offset: "100%",
	stopColor: `var(--color-${e}-0)`,
	stopOpacity: n?.[n.length - 1]
})] }) : /* @__PURE__ */ (0, Y.jsx)(Y.Fragment, { children: Array.from({ length: t }, (r, i) => {
	let a = `${i / (t - 1) * 100}%`;
	return /* @__PURE__ */ (0, Y.jsx)("stop", {
		offset: a,
		stopColor: `var(--color-${e}-${i}, var(--color-${e}-0))`,
		stopOpacity: n?.[i]
	}, a);
}) }), fi = ({ id: e, dataKey: t, config: n }) => {
	let r = xe(n[t] ?? {});
	return /* @__PURE__ */ (0, Y.jsx)("linearGradient", {
		id: `${e}-colors-${t}`,
		x1: "0",
		y1: "0",
		x2: "1",
		y2: "0",
		children: /* @__PURE__ */ (0, Y.jsx)(di, {
			dataKey: t,
			colorsCount: r
		})
	});
}, pi = ({ id: e, dataKey: t, config: n }) => {
	let r = xe(n[t] ?? {});
	return /* @__PURE__ */ (0, Y.jsx)("linearGradient", {
		id: `${e}-radar-stroke-${t}`,
		x1: "0",
		y1: "0",
		x2: "1",
		y2: "1",
		children: /* @__PURE__ */ (0, Y.jsx)(di, {
			dataKey: t,
			colorsCount: r
		})
	});
}, mi = ({ id: e, dataKey: t, config: n }) => {
	let r = xe(n[t] ?? {}), i = r === 1 ? [.8, .3] : Array.from({ length: r }, (e, t) => t === 0 ? .8 : .3);
	return /* @__PURE__ */ (0, Y.jsx)("radialGradient", {
		id: `${e}-radar-fill-${t}`,
		cx: "50%",
		cy: "50%",
		r: "50%",
		children: /* @__PURE__ */ (0, Y.jsx)(di, {
			dataKey: t,
			colorsCount: r,
			opacities: i
		})
	});
}, hi = ({ id: e, dataKey: t }) => /* @__PURE__ */ (0, Y.jsxs)("filter", {
	id: `${e}-radar-glow-${t}`,
	x: "-50%",
	y: "-50%",
	width: "200%",
	height: "200%",
	children: [
		/* @__PURE__ */ (0, Y.jsx)("feGaussianBlur", {
			in: "SourceGraphic",
			stdDeviation: "4",
			result: "blur"
		}),
		/* @__PURE__ */ (0, Y.jsx)("feColorMatrix", {
			in: "blur",
			type: "matrix",
			values: "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.6 0",
			result: "glow"
		}),
		/* @__PURE__ */ (0, Y.jsxs)("feMerge", { children: [/* @__PURE__ */ (0, Y.jsx)("feMergeNode", { in: "glow" }), /* @__PURE__ */ (0, Y.jsx)("feMergeNode", { in: "SourceGraphic" })] })
	]
}), gi = (e) => [
	"A",
	"B",
	"C",
	"D",
	"E",
	"F"
].slice(0, e).map((e) => ({
	skill: e,
	[ei]: 30 + Math.random() * 70
}));
function _i(e, t = Qr) {
	let [n, r] = (0, H.useState)(0);
	return (0, H.useEffect)(() => {
		if (!e) return;
		let t = setInterval(() => {
			r((e) => e + 1);
		}, $r);
		return () => clearInterval(t);
	}, [e]), (0, H.useMemo)(() => gi(t), [t, n]);
}
var vi = () => /* @__PURE__ */ (0, Y.jsx)(Lr, {
	dataKey: ei,
	stroke: "currentColor",
	strokeOpacity: .3,
	strokeWidth: 2,
	fill: "currentColor",
	fillOpacity: .1,
	dot: !1,
	isAnimationActive: !0,
	animationDuration: $r,
	animationEasing: "ease-in-out"
});
Z.Radar = ni, Z.Dot = ri, Z.ActiveDot = ii, Z.PolarGrid = ai, Z.PolarAngleAxis = oi, Z.PolarRadiusAxis = si, Z.Tooltip = ci, Z.Legend = li;
//#endregion
//#region src/react/taste/charts.tsx
function yi(e) {
	let { x: t = 0, cx: n, textAnchor: r, payload: i, ...a } = e, o = String(i?.value ?? ""), s = typeof n == "number" ? n * 2 : 0, c = s ? r === "start" ? s - t : r === "end" ? t : 2 * Math.min(t, s - t) : 56;
	return /* @__PURE__ */ (0, Y.jsxs)("g", { children: [/* @__PURE__ */ (0, Y.jsx)("title", { children: o }), /* @__PURE__ */ (0, Y.jsx)(se, {
		...a,
		x: t,
		textAnchor: r,
		fill: "currentColor",
		fontSize: 12,
		children: _e(o, c - 4)
	})] });
}
var bi = [
	"stroke-chart-1",
	"stroke-chart-2",
	"stroke-chart-3",
	"stroke-chart-4",
	"stroke-chart-5",
	"stroke-chart-6"
], xi = [
	"fill-chart-1",
	"fill-chart-2",
	"fill-chart-3",
	"fill-chart-4",
	"fill-chart-5",
	"fill-chart-6"
], Si = { value: {
	label: "标签出现次数",
	colors: He(a[3])
} }, Ci = [
	"min-h-24",
	"min-h-24",
	"min-h-24",
	"min-h-32",
	"min-h-40",
	"min-h-48",
	"min-h-52",
	"min-h-60",
	"min-h-64"
], wi = 26, Ti = { radius: Si.value }, Ei = (e, t) => Math.sqrt(e / t);
function Di({ rows: e, label: t }) {
	let n = Gt(e);
	if (!n.length) return null;
	let r = n[0].value, i = n.map((e) => ({
		...e,
		radius: Ei(e.value, r)
	}));
	return /* @__PURE__ */ (0, Y.jsx)("div", {
		role: "img",
		"aria-label": `${t}：${i.map((e) => e.name).join("，")}`,
		children: /* @__PURE__ */ (0, Y.jsxs)(Z, {
			data: i,
			config: Ti,
			chartProps: { outerRadius: "58%" },
			className: "aspect-auto h-70 text-text-secondary",
			children: [
				/* @__PURE__ */ (0, Y.jsx)(Z.PolarGrid, {}),
				/* @__PURE__ */ (0, Y.jsx)(Z.PolarAngleAxis, {
					dataKey: "name",
					tick: /* @__PURE__ */ (0, Y.jsx)(yi, {})
				}),
				/* @__PURE__ */ (0, Y.jsx)(Z.PolarRadiusAxis, {
					domain: [0, 1],
					allowDecimals: !0,
					tick: !1
				}),
				/* @__PURE__ */ (0, Y.jsx)(Z.Radar, { dataKey: "radius" }),
				/* @__PURE__ */ (0, Y.jsx)(p, { valueKey: "value" })
			]
		})
	});
}
function Oi({ rows: e, label: t }) {
	let n = nn(e, 8);
	return n.length ? /* @__PURE__ */ (0, Y.jsx)("section", {
		"aria-label": t,
		className: `flex grow flex-col ${Ci[n.length]}`,
		children: /* @__PURE__ */ (0, Y.jsxs)(v, {
			data: n,
			config: Si,
			layout: "horizontal",
			barRadius: 4,
			chartProps: {
				maxBarSize: wi,
				margin: {
					top: 5,
					right: 56,
					bottom: 5,
					left: 5
				}
			},
			className: "aspect-auto text-text-secondary",
			children: [
				/* @__PURE__ */ (0, Y.jsx)(v.YAxis, {
					dataKey: "name",
					interval: 0,
					tick: /* @__PURE__ */ (0, Y.jsx)(s, { along: "y" }),
					width: pe(n.map((e) => e.name))
				}),
				/* @__PURE__ */ (0, Y.jsx)(v.XAxis, {
					hide: !0,
					domain: r
				}),
				/* @__PURE__ */ (0, Y.jsx)(v.Bar, {
					dataKey: "value",
					enableHoverHighlight: !0,
					barProps: {
						dataKey: "value",
						label: fe("right")
					}
				}),
				/* @__PURE__ */ (0, Y.jsx)(p, {})
			]
		})
	}) : null;
}
function ki({ flows: e }) {
	let [t, n] = (0, H.useState)(null), r = It(e);
	if (!r) return null;
	let a = t?.node ?? null, o = (e, n) => t ? a === null ? t.label === n : e.source === a || e.target === a : !0;
	return /* @__PURE__ */ (0, Y.jsxs)("section", {
		className: i,
		children: [
			/* @__PURE__ */ (0, Y.jsx)(u, {
				title: "创作者线索来源",
				figure: (t ? t.value : r.total).toLocaleString(),
				note: t ? t.label : "条线索"
			}),
			/* @__PURE__ */ (0, Y.jsx)("ol", {
				"aria-label": "来源网站与创作者线索",
				className: "flex flex-col sm:hidden",
				children: [...r.links].sort((e, t) => t.value - e.value).map((e) => /* @__PURE__ */ (0, Y.jsxs)("li", {
					className: "flex items-baseline justify-between gap-3 border-b border-separator-border py-2 text-body-2-regular text-text-primary last:border-b-0",
					children: [/* @__PURE__ */ (0, Y.jsx)("span", {
						className: "min-w-0 wrap-anywhere",
						children: e.label
					}), /* @__PURE__ */ (0, Y.jsx)("b", {
						className: "shrink-0 tabular-nums",
						children: e.value.toLocaleString()
					})]
				}, e.key))
			}),
			/* @__PURE__ */ (0, Y.jsx)("div", {
				className: "min-w-0 max-sm:hidden",
				children: /* @__PURE__ */ (0, Y.jsxs)("svg", {
					viewBox: `0 0 ${nt.width} ${r.height}`,
					fill: "none",
					role: "img",
					"aria-label": "来源网站与创作者线索",
					className: "block h-auto w-full",
					onPointerLeave: () => n(null),
					children: [/* @__PURE__ */ (0, Y.jsx)("g", { children: r.links.map((e) => /* @__PURE__ */ (0, Y.jsx)("path", {
						d: e.d,
						strokeWidth: e.width,
						tabIndex: 0,
						role: "img",
						"aria-label": `${e.label}：${e.value} 条线索`,
						fillOpacity: 0,
						strokeOpacity: o(e, e.label) ? .55 : .08,
						className: `outline-none transition-opacity ${bi[e.color]}`,
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
					}, e.key)) }), /* @__PURE__ */ (0, Y.jsx)("g", { children: r.nodes.map((e) => /* @__PURE__ */ (0, Y.jsxs)("g", {
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
						children: [/* @__PURE__ */ (0, Y.jsx)("rect", {
							x: e.x,
							y: e.y,
							width: 10,
							height: e.height,
							rx: 5,
							className: e.side === "source" ? xi[e.color] : "fill-text-secondary"
						}), /* @__PURE__ */ (0, Y.jsxs)("text", {
							x: tt[e.side],
							y: e.y + e.height / 2,
							textAnchor: e.side === "source" ? "end" : "start",
							dominantBaseline: "middle",
							className: "fill-text-secondary text-caption-1-regular",
							children: [Lt(e.name), /* @__PURE__ */ (0, Y.jsx)("tspan", {
								x: tt[e.side],
								dy: 15,
								children: e.side === "source" ? e.value.toLocaleString() : `${e.share.toFixed(1)}%`
							})]
						})]
					}, e.id)) })]
				})
			}),
			/* @__PURE__ */ (0, Y.jsxs)("footer", {
				className: "flex justify-between gap-3 text-caption-1-regular text-text-secondary max-sm:hidden",
				children: [/* @__PURE__ */ (0, Y.jsx)("span", { children: "来源网站" }), /* @__PURE__ */ (0, Y.jsx)("span", { children: "创作者 · 线索占比" })]
			})
		]
	});
}
//#endregion
//#region src/react/taste/browser-sources.tsx
var Ai = "flex min-w-0 items-center gap-3 rounded-xl bg-background-primary-default p-3";
function ji({ browsers: e, sources: t, range: n, children: r }) {
	let [i, a] = (0, H.useState)(!1), [o, s] = (0, H.useState)(""), [c, l] = (0, H.useState)(""), u = on({
		mutationFn: (e) => kt(e, n),
		onSuccess: (e) => {
			B.setQueryData(V(n), e.dashboard), a(!1), s(""), l("");
		}
	});
	return /* @__PURE__ */ (0, Y.jsxs)("section", {
		className: `${I()} flex flex-col gap-4`,
		"aria-label": "数据源",
		children: [
			/* @__PURE__ */ (0, Y.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, Y.jsx)("h3", {
					className: "text-title-2-medium text-text-primary",
					children: "数据源"
				}), /* @__PURE__ */ (0, Y.jsx)(M, {
					variant: "secondary",
					onClick: () => a(!0),
					disabled: i,
					children: "添加浏览器"
				})]
			}),
			u.error ? /* @__PURE__ */ (0, Y.jsx)(P, {
				tone: "error",
				children: R(u.error)
			}) : null,
			i ? /* @__PURE__ */ (0, Y.jsxs)("form", {
				className: "flex flex-col gap-3",
				onSubmit: (e) => {
					e.preventDefault(), u.isPending || u.mutate({
						operation: "add",
						name: o,
						path: c
					});
				},
				children: [
					/* @__PURE__ */ (0, Y.jsx)(at, {
						label: "浏览器名称",
						value: o,
						onChange: s,
						maxLength: 80,
						isRequired: !0,
						isDisabled: u.isPending
					}),
					/* @__PURE__ */ (0, Y.jsx)(at, {
						label: "资料目录或历史文件",
						value: c,
						onChange: l,
						maxLength: 1024,
						isRequired: !0,
						isDisabled: u.isPending,
						hint: "请选择运行 Peach 的电脑上的浏览器资料。"
					}),
					/* @__PURE__ */ (0, Y.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, Y.jsx)(M, {
							variant: "ghost",
							disabled: u.isPending,
							onClick: () => {
								a(!1), u.reset();
							},
							children: "取消"
						}), /* @__PURE__ */ (0, Y.jsx)(M, {
							type: "submit",
							variant: "secondary",
							disabled: !o.trim() || !c.trim(),
							...F(u.isPending),
							children: "添加"
						})]
					})
				]
			}) : null,
			/* @__PURE__ */ (0, Y.jsxs)("div", {
				className: "inline-grid w-full min-w-0 gap-2 sm:grid-cols-2",
				children: [r, e.map((e) => {
					let n = t.filter((t) => e.source_keys?.includes(t.source_key)), r = n.reduce((e, t) => e + (t.visits || 0), 0), i = n.reduce((e, t) => e + (t.bookmarks || 0), 0);
					return /* @__PURE__ */ (0, Y.jsxs)("div", {
						"data-taste-source": "browser",
						className: Ai,
						children: [
							/* @__PURE__ */ (0, Y.jsx)("span", {
								className: "inline-grid size-8 shrink-0 place-items-center rounded-lg text-text-secondary",
								children: /* @__PURE__ */ (0, Y.jsx)(et, {
									"aria-hidden": !0,
									className: "size-4"
								})
							}),
							/* @__PURE__ */ (0, Y.jsxs)("div", {
								className: "flex min-w-0 grow flex-col gap-0.5",
								children: [
									/* @__PURE__ */ (0, Y.jsx)("b", {
										className: "text-body-2-medium break-words text-text-primary",
										children: e.name
									}),
									/* @__PURE__ */ (0, Y.jsx)("span", {
										className: "break-all text-caption-1-regular text-text-secondary",
										children: e.path
									}),
									/* @__PURE__ */ (0, Y.jsx)("span", {
										className: "text-caption-1-regular text-text-secondary",
										children: e.enabled ? e.available ? `历史与书签 · ${e.profiles} 个资料` : "资料目录不可用" : "已停止读取"
									}),
									n.length ? /* @__PURE__ */ (0, Y.jsxs)("span", {
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
							/* @__PURE__ */ (0, Y.jsxs)("span", {
								className: "flex shrink-0 gap-1",
								children: [/* @__PURE__ */ (0, Y.jsx)(M, {
									variant: "secondary",
									size: "small",
									...F(u.isPending),
									iconOnly: !0,
									leadingIcon: e.enabled ? dt : rt,
									"aria-label": `${e.enabled ? "停止读取" : "启用"} ${e.name}`,
									onClick: () => {
										e.enabled ? At({
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
								}), /* @__PURE__ */ (0, Y.jsx)(M, {
									variant: "secondary",
									size: "small",
									iconOnly: !0,
									leadingIcon: ot,
									...F(u.isPending),
									"aria-label": `删除 ${e.name}`,
									onClick: () => {
										At({
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
var Mi = 10, Ni = jt(st, ct, "text-body-2-medium"), Q = `${I()} flex flex-col gap-4`, Pi = "rounded-xl bg-background-primary-default p-3", Fi = "读取运行 Peach 的这台电脑上的浏览历史与书签", Ii = "导入或读取浏览记录后，这里会列出记录来自哪些设备。", Li = "馆藏中暂时没有与你浏览过的内容相符的标签。", Ri = "读取浏览记录后，这里会按类别汇总你浏览过的内容。", zi = "这些标签出现在浏览记录中，Peach 的观看或评价记录中尚未出现这些标签", Bi = "采集浏览记录后，这里会列出浏览过的标签。", Vi = "采集浏览记录后，这里会列出浏览过的创作者。", Hi = "采集浏览记录后，这里会列出常访问的网站。", Ui = "在 Peach 里播放或评价作品后，这里会列出对应的标签。", Wi = "在 Peach 里播放或评价作品后，这里会列出对应的创作者。", Gi = "在 Peach 里播放或评价作品后，这里会列出对应的女优。", Ki = "在运行 Peach 的电脑上使用浏览器：点上面的「读取浏览器记录」。", qi = "记录在其他设备上：导出文件后，选择「导入历史文件」或「导入书签文件」。书签支持浏览器导出的 HTML 文件和 Chromium Bookmarks JSON 文件。", Ji = "需要刷新时再次读取或导入；数据源可在页面底部移除。", Yi = "删除这个来源的已导入记录，原始文件保留。若浏览器仍启用，下次读取会再次导入。", Xi = "peach-taste-guide-dismissed", Zi = (0, H.createContext)(/* @__PURE__ */ (0, Y.jsx)(Qe, {
	size: "small",
	href: "/",
	children: "浏览馆藏"
}));
function Qi() {
	return (0, H.useContext)(Zi);
}
function $({ icon: e, term: t, figure: n, detail: r, detailTitle: i, accent: a }) {
	return /* @__PURE__ */ (0, Y.jsx)("div", {
		className: dn(),
		children: /* @__PURE__ */ (0, Y.jsx)(un, {
			label: t,
			icon: e,
			accent: a,
			figure: n,
			footer: /* @__PURE__ */ (0, Y.jsx)("span", {
				className: "block min-w-0 truncate",
				title: i || r,
				children: r ?? ""
			})
		})
	});
}
function $i({ name: e, domain: t }) {
	return /* @__PURE__ */ (0, Y.jsxs)("span", {
		className: "relative inline-grid size-8 shrink-0 place-items-center overflow-hidden rounded-lg bg-background-tertiary-default text-caption-1-medium text-text-secondary",
		children: [Ft(e).toUpperCase(), /* @__PURE__ */ (0, Y.jsx)("img", {
			src: Zt({ domain: t }),
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
	return /* @__PURE__ */ (0, Y.jsx)("span", {
		className: `relative inline-grid size-8 shrink-0 place-items-center overflow-hidden rounded-full bg-background-tertiary-default text-caption-1-medium text-text-secondary ${fn}`,
		dangerouslySetInnerHTML: { __html: e }
	});
}
function ta({ rows: e, kind: t, visual: n, empty: r, onSignal: i }) {
	if (!e.length) return /* @__PURE__ */ (0, Y.jsx)(N, {
		size: "compact",
		icon: z,
		title: "记录还不够",
		actions: /* @__PURE__ */ (0, Y.jsx)(Qi, {}),
		children: r
	});
	let a = qt(e);
	return /* @__PURE__ */ (0, Y.jsx)(y, {
		previewCount: Mi,
		className: "inline-grid w-full gap-x-7 gap-y-2 sm:grid-cols-2",
		children: e.map((e, r) => {
			let o = !!t && !!e.peach_items, s = String(e.source_domain || ""), c = /* @__PURE__ */ (0, Y.jsxs)(Y.Fragment, { children: [
				/* @__PURE__ */ (0, Y.jsx)("svg", {
					viewBox: "0 0 100 1",
					preserveAspectRatio: "none",
					"aria-hidden": !0,
					className: "absolute inset-0 -z-10 size-full overflow-hidden rounded-lg opacity-15",
					children: /* @__PURE__ */ (0, Y.jsx)("rect", {
						width: a[r],
						height: 1,
						className: "fill-chart-4"
					})
				}),
				/* @__PURE__ */ (0, Y.jsx)("span", {
					className: "w-6 shrink-0 text-caption-1-regular tabular-nums text-text-secondary",
					children: r + 1
				}),
				n === "domain" ? /* @__PURE__ */ (0, Y.jsx)($i, {
					name: e.name,
					domain: e.name
				}) : null,
				n === "creator" && !e.entity_id && !e.has_avatar && s ? /* @__PURE__ */ (0, Y.jsx)($i, {
					name: e.name,
					domain: s
				}) : null,
				n !== "none" && n !== "domain" && (e.entity_id || e.has_avatar || !s) ? /* @__PURE__ */ (0, Y.jsx)(ea, { html: Dt(e.name, e.entity_id ? {
					id: e.entity_id,
					has_image: !!e.has_image,
					image_version: e.image_version,
					avatar_focus: e.avatar_focus,
					avatar_stand_in: e.avatar_stand_in
				} : null, e.has_avatar ? e.representative_asset_id ?? null : null, n === "creator" ? "creator" : t || "performer") }) : null,
				/* @__PURE__ */ (0, Y.jsxs)("span", {
					className: "flex min-w-0 grow flex-col gap-0.5",
					children: [/* @__PURE__ */ (0, Y.jsx)("b", {
						className: "min-w-0 text-body-medium break-words text-text-primary",
						children: e.name
					}), /* @__PURE__ */ (0, Y.jsx)("small", {
						className: "text-caption-1-regular text-text-secondary",
						children: Kt(e)
					})]
				}),
				o ? /* @__PURE__ */ (0, Y.jsx)(Wt, {
					"aria-hidden": !0,
					className: "size-4 shrink-0 text-text-tertiary"
				}) : null
			] }), l = "relative isolate flex min-h-11 w-full min-w-0 items-center gap-2.5 rounded-lg px-3 py-2 text-left";
			return /* @__PURE__ */ (0, Y.jsx)("li", {
				className: "min-w-0",
				children: o ? /* @__PURE__ */ (0, Y.jsx)("button", {
					type: "button",
					onClick: () => i(t, e.name),
					className: `${l} cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring`,
					children: c
				}) : /* @__PURE__ */ (0, Y.jsx)("div", {
					className: l,
					children: c
				})
			}, `${e.name}:${r}`);
		})
	});
}
function na({ label: e, panels: t, onSignal: n }) {
	return /* @__PURE__ */ (0, Y.jsxs)(Ze, {
		className: `${I({ padding: "none" })} flex flex-col`,
		children: [/* @__PURE__ */ (0, Y.jsx)("div", {
			className: "px-4 pt-3",
			children: /* @__PURE__ */ (0, Y.jsx)(gt, {
				"aria-label": e,
				className: ht,
				children: t.map((e) => /* @__PURE__ */ (0, Y.jsx)(Xe, {
					id: e.id,
					className: mt,
					children: e.name
				}, e.id))
			})
		}), t.map((e) => /* @__PURE__ */ (0, Y.jsx)(Ye, {
			id: e.id,
			className: "px-4 pt-3.5 pb-4",
			children: /* @__PURE__ */ (0, Y.jsx)(ta, {
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
	return /* @__PURE__ */ (0, Y.jsxs)("section", {
		className: Q,
		"aria-label": "口味总结",
		children: [
			/* @__PURE__ */ (0, Y.jsxs)("header", {
				className: "flex flex-col gap-2",
				children: [
					/* @__PURE__ */ (0, Y.jsx)("h3", {
						className: "text-title-2-medium text-text-primary",
						children: "口味总结"
					}),
					/* @__PURE__ */ (0, Y.jsx)("p", {
						className: "max-w-prose text-title-2-regular wrap-anywhere text-text-primary",
						children: r.headline
					}),
					/* @__PURE__ */ (0, Y.jsxs)("p", {
						className: "flex flex-wrap items-center gap-2 text-body-2-regular text-text-secondary",
						children: [/* @__PURE__ */ (0, Y.jsx)("i", {
							"aria-hidden": !0,
							className: `size-2 shrink-0 rounded-full ${i.level === "high" ? "bg-status-lime-text" : i.level === "medium" ? "bg-status-yellow-text" : "bg-text-tertiary"}`
						}), /* @__PURE__ */ (0, Y.jsx)("span", {
							className: "min-w-0 wrap-anywhere",
							children: i.label || "仍在学习"
						})]
					})
				]
			}),
			r.points?.length ? /* @__PURE__ */ (0, Y.jsx)("div", {
				className: "inline-grid w-full gap-3 sm:grid-cols-2",
				children: r.points.map((e) => /* @__PURE__ */ (0, Y.jsxs)("div", {
					className: `flex min-w-0 flex-col gap-1 ${Pi}`,
					children: [/* @__PURE__ */ (0, Y.jsx)("span", {
						className: "text-caption-1-regular text-text-secondary",
						children: e.label
					}), /* @__PURE__ */ (0, Y.jsx)("b", {
						className: "text-body-2-medium break-words text-text-primary",
						children: e.text
					})]
				}, e.label))
			}) : null,
			a.length ? /* @__PURE__ */ (0, Y.jsx)("div", {
				className: "flex flex-col gap-2",
				children: a.map((e) => /* @__PURE__ */ (0, Y.jsxs)("button", {
					type: "button",
					onClick: e.act,
					className: `flex w-full min-w-0 cursor-pointer items-center gap-3 ${Pi} text-left outline-none hover:bg-background-primary-hover focus-visible:ring-2 focus-visible:ring-border-focus-ring`,
					children: [/* @__PURE__ */ (0, Y.jsxs)("span", {
						className: "flex min-w-0 grow flex-col gap-1",
						children: [/* @__PURE__ */ (0, Y.jsx)("b", {
							className: "text-body-2-medium wrap-anywhere text-text-primary",
							children: e.title
						}), /* @__PURE__ */ (0, Y.jsx)("small", {
							className: "text-caption-1-regular wrap-anywhere text-text-secondary",
							children: e.detail
						})]
					}), /* @__PURE__ */ (0, Y.jsx)(Wt, {
						"aria-hidden": !0,
						className: "size-4 shrink-0 text-text-tertiary"
					})]
				}, e.key))
			}) : /* @__PURE__ */ (0, Y.jsx)(N, {
				size: "compact",
				icon: z,
				title: "还没有可探索的入口",
				actions: /* @__PURE__ */ (0, Y.jsx)(Qe, {
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
	return t || n ? null : /* @__PURE__ */ (0, Y.jsx)("div", {
		className: I({
			padding: "none",
			className: "p-4"
		}),
		children: /* @__PURE__ */ (0, Y.jsxs)($e, {
			summary: "浏览器历史记录导入指南",
			defaultOpen: e,
			children: [
				/* @__PURE__ */ (0, Y.jsx)("p", {
					className: "text-body-2-regular text-text-secondary",
					children: Ki
				}),
				/* @__PURE__ */ (0, Y.jsx)("p", {
					className: "text-body-2-regular text-text-secondary",
					children: qi
				}),
				/* @__PURE__ */ (0, Y.jsxs)("ul", {
					className: "flex list-disc flex-col gap-1 pl-5 text-body-2-regular text-text-secondary",
					children: [/* @__PURE__ */ (0, Y.jsxs)("li", { children: [
						"Chrome：在 ",
						/* @__PURE__ */ (0, Y.jsxs)("a", {
							href: "https://takeout.google.com/",
							target: "_blank",
							rel: "noopener noreferrer",
							className: "text-text-primary underline-offset-4 hover:underline",
							children: ["Google Takeout", /* @__PURE__ */ (0, Y.jsx)(St, {
								"aria-hidden": !0,
								className: "size-(--icon-inline) shrink-0"
							})]
						}),
						" ",
						"选择 Chrome 历史记录，下载 ZIP 后直接导入。"
					] }), /* @__PURE__ */ (0, Y.jsxs)("li", { children: [
						"其他浏览器：用 ",
						/* @__PURE__ */ (0, Y.jsxs)("a", {
							href: "https://github.com/purarue/browserexport",
							target: "_blank",
							rel: "noopener noreferrer",
							className: "text-text-primary underline-offset-4 hover:underline",
							children: ["browserexport", /* @__PURE__ */ (0, Y.jsx)(St, {
								"aria-hidden": !0,
								className: "size-(--icon-inline) shrink-0"
							})]
						}),
						" ",
						"导出历史记录，再导入导出文件。"
					] })]
				}),
				/* @__PURE__ */ (0, Y.jsx)("p", {
					className: "text-body-2-regular text-text-secondary",
					children: Ji
				}),
				/* @__PURE__ */ (0, Y.jsx)("span", {
					className: "self-start",
					children: /* @__PURE__ */ (0, Y.jsx)(M, {
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
	return /* @__PURE__ */ (0, Y.jsxs)(Y.Fragment, { children: [/* @__PURE__ */ (0, Y.jsxs)("span", {
		"data-button-group": !0,
		"data-split-button": !0,
		"data-variant": "primary",
		children: [/* @__PURE__ */ (0, Y.jsx)(M, {
			leadingIcon: et,
			title: Fi,
			onClick: t,
			...F(e),
			children: "读取浏览器记录"
		}), /* @__PURE__ */ (0, Y.jsx)(M, {
			ref: i,
			iconOnly: !0,
			leadingIcon: Mt,
			"aria-label": "更多取得浏览记录的方式",
			"aria-haspopup": "dialog",
			"aria-expanded": a,
			...F(e),
			onClick: () => {
				e || o(!0);
			}
		})]
	}), /* @__PURE__ */ (0, Y.jsx)(Je, {
		triggerRef: i,
		isOpen: a,
		onOpenChange: o,
		placement: "bottom end",
		offset: 4,
		className: lt,
		children: /* @__PURE__ */ (0, Y.jsxs)(ut, {
			"aria-label": "更多取得浏览记录的方式",
			className: "flex w-52 flex-col gap-1 outline-none",
			children: [
				/* @__PURE__ */ (0, Y.jsxs)("button", {
					type: "button",
					className: Ni,
					onClick: () => s(t),
					children: [/* @__PURE__ */ (0, Y.jsx)(et, {
						"aria-hidden": !0,
						className: "size-4 shrink-0"
					}), "读取浏览器记录"]
				}),
				/* @__PURE__ */ (0, Y.jsxs)("button", {
					type: "button",
					className: Ni,
					onClick: () => s(n),
					children: [/* @__PURE__ */ (0, Y.jsx)(pt, {
						"aria-hidden": !0,
						className: "size-4 shrink-0"
					}), "导入历史文件"]
				}),
				/* @__PURE__ */ (0, Y.jsxs)("button", {
					type: "button",
					className: Ni,
					onClick: () => s(r),
					children: [/* @__PURE__ */ (0, Y.jsx)(zt, {
						"aria-hidden": !0,
						className: "size-4 shrink-0"
					}), "导入书签文件"]
				})
			]
		})
	})] });
}
function oa({ sources: e, browsers: t, window: n, toast: r, emptyActions: i }) {
	let a = on({
		mutationFn: (e) => Jt(e, n),
		onSuccess: (e) => {
			B.setQueryData(V(n), e.dashboard), r("已移除口味数据源");
		}
	});
	return /* @__PURE__ */ (0, Y.jsxs)(ji, {
		browsers: t,
		sources: e,
		range: n,
		children: [a.error ? /* @__PURE__ */ (0, Y.jsx)("div", {
			className: "sm:col-span-2",
			children: /* @__PURE__ */ (0, Y.jsx)(P, {
				tone: "error",
				children: R(a.error)
			})
		}) : null, e.length ? /* @__PURE__ */ (0, Y.jsx)(Y.Fragment, { children: e.filter((e) => !t.some((t) => t.source_keys?.includes(e.source_key))).map((e) => /* @__PURE__ */ (0, Y.jsxs)("div", {
			"data-taste-source": "import",
			className: Ai,
			children: [
				/* @__PURE__ */ (0, Y.jsx)("span", {
					className: "inline-grid size-8 shrink-0 place-items-center rounded-lg text-text-secondary",
					children: e.browser === "browserexport" ? /* @__PURE__ */ (0, Y.jsx)(pt, {
						"aria-hidden": !0,
						className: "size-4"
					}) : /* @__PURE__ */ (0, Y.jsx)(wt, {
						"aria-hidden": !0,
						className: "size-4"
					})
				}),
				/* @__PURE__ */ (0, Y.jsxs)("span", {
					className: "flex min-w-0 grow flex-col gap-0.5",
					children: [/* @__PURE__ */ (0, Y.jsx)("b", {
						className: "min-w-0 text-body-2-medium break-words text-text-primary",
						children: e.profile
					}), /* @__PURE__ */ (0, Y.jsx)("small", {
						className: "min-w-0 text-caption-1-regular break-words text-text-secondary",
						children: `导入文件 · ${e.host} · ${Number(e.visits || e.bookmarks || 0).toLocaleString()} ${e.bookmarks ? "枚书签" : "条历史"}`
					})]
				}),
				/* @__PURE__ */ (0, Y.jsx)(M, {
					variant: "secondary",
					size: "small",
					"aria-label": `移除 ${e.profile}`,
					className: "shrink-0",
					iconOnly: !0,
					leadingIcon: ot,
					...F(a.isPending),
					onClick: () => {
						a.isPending || At({
							title: "移除口味数据源",
							body: Yi,
							confirmLabel: "移除口味数据源",
							onConfirm: () => a.mutateAsync(e.source_key)
						});
					}
				})
			]
		}, e.source_key)) }) : t.length ? null : /* @__PURE__ */ (0, Y.jsx)(N, {
			size: "compact",
			icon: wt,
			title: "还没有数据源",
			actions: i,
			children: Ii
		})]
	});
}
function sa(e) {
	let { onSignal: n, navigate: r, toast: i, onboarding: a } = e, [o, s] = (0, H.useState)("all"), [c, l] = (0, H.useState)("browser"), u = (0, H.useRef)(null), d = (0, H.useRef)(null), f = sn({
		queryKey: V(o),
		queryFn: ({ signal: e }) => Nt(o, e),
		placeholderData: Ht
	}), { job: p, running: m, outcome: h, start: g } = an({
		queryKey: yt,
		queryFn: ({ signal: e }) => Pt(e),
		start: () => Qt(o),
		idlePollMs: it,
		onFinish: (e) => {
			e.status !== "failed" && (B.invalidateQueries({ queryKey: ["taste"] }), i(e.warnings?.length ? "部分浏览记录未取得" : "已更新口味分析"));
		}
	}), _ = on({
		mutationFn: (e) => Vt(e),
		onSuccess: (e) => {
			B.setQueryData(V("all"), e.dashboard), s("all"), i("已导入口味数据");
		}
	}), v = (e) => {
		let t = e.currentTarget.files?.[0];
		e.currentTarget.value = "", t && !_.isPending && (_.reset(), _.mutate(t));
	}, y = () => {
		m || g.isPending || (g.reset(), g.mutate());
	}, b = f.data;
	if (!b) return /* @__PURE__ */ (0, Y.jsx)(cn, { children: /* @__PURE__ */ (0, Y.jsx)(P, {
		tone: "error",
		title: "口味分析读取失败",
		children: f.error ? R(f.error) : "读取口味分析失败"
	}) });
	let x = b.summary || {}, S = b.coverage || {}, C = b.rankings || {}, ee = b.storage || {}, w = en(C.browser_categories || []), te = Gt(w).length > 0, ne = b.gaps || [], re = S.tagged || 0, ie = S.identified || 0, ae = g.error ? R(g.error) : _.error ? R(_.error) : h?.status === "failed" ? h.error || "读取未取得" : "", oe = /* @__PURE__ */ (0, Y.jsxs)("div", {
		className: "flex flex-wrap justify-center gap-2",
		children: [/* @__PURE__ */ (0, Y.jsx)(M, {
			variant: "secondary",
			...F(m || g.isPending || _.isPending),
			onClick: y,
			children: "读取浏览器记录"
		}), /* @__PURE__ */ (0, Y.jsx)(M, {
			variant: "secondary",
			...F(_.isPending),
			onClick: () => u.current?.click(),
			children: "导入历史文件"
		})]
	});
	return /* @__PURE__ */ (0, Y.jsx)(cn, { children: /* @__PURE__ */ (0, Y.jsxs)(Zi, {
		value: o === "all" ? c === "peach" ? /* @__PURE__ */ (0, Y.jsx)(Qe, {
			size: "small",
			variant: "secondary",
			href: "/",
			children: "浏览馆藏"
		}) : oe : /* @__PURE__ */ (0, Y.jsx)(M, {
			size: "small",
			variant: "secondary",
			onClick: () => s("all"),
			children: "查看全部时间"
		}),
		children: [
			/* @__PURE__ */ (0, Y.jsxs)(Ze, {
				selectedKey: c,
				onSelectionChange: (e) => l(String(e)),
				className: "flex flex-col gap-5",
				children: [
					/* @__PURE__ */ (0, Y.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, Y.jsxs)(gt, {
							"aria-label": "口味分析的数据来源",
							className: ht,
							children: [/* @__PURE__ */ (0, Y.jsx)(Xe, {
								id: "browser",
								className: mt,
								children: "浏览器记录"
							}), /* @__PURE__ */ (0, Y.jsx)(Xe, {
								id: "peach",
								className: mt,
								children: "Peach 观看与评价"
							})]
						}), /* @__PURE__ */ (0, Y.jsxs)("div", {
							className: "flex flex-wrap items-center gap-2",
							children: [
								/* @__PURE__ */ (0, Y.jsx)(_t, {
									"aria-label": "分析范围",
									selectedKey: o,
									onSelectionChange: (e) => {
										e !== null && s(String(e));
									},
									children: bt.map(([e, t]) => /* @__PURE__ */ (0, Y.jsx)(vt, {
										id: e,
										children: t
									}, e))
								}),
								/* @__PURE__ */ (0, Y.jsx)(aa, {
									busy: m || g.isPending || _.isPending,
									onRefresh: y,
									onImport: () => u.current?.click(),
									onImportBookmarks: () => d.current?.click()
								}),
								/* @__PURE__ */ (0, Y.jsx)("input", {
									ref: u,
									type: "file",
									tabIndex: -1,
									"aria-hidden": !0,
									className: "hidden",
									onChange: v
								}),
								/* @__PURE__ */ (0, Y.jsx)("input", {
									ref: d,
									type: "file",
									tabIndex: -1,
									"aria-hidden": !0,
									className: "hidden",
									"data-bookmark-import": !0,
									onChange: v
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, Y.jsx)(ia, {
						onboarding: a,
						done: !!(x.history_sources || b.updated_at)
					}),
					/* @__PURE__ */ (0, Y.jsxs)("div", {
						"aria-live": "polite",
						className: "flex flex-col gap-3 empty:hidden",
						children: [
							m ? /* @__PURE__ */ (0, Y.jsx)(xt, {
								label: p?.message || "正在读取浏览记录并更新口味分析",
								value: p?.checked,
								total: p?.total
							}) : null,
							_.isPending ? /* @__PURE__ */ (0, Y.jsx)(xt, { label: "正在导入口味数据" }) : null,
							ae ? /* @__PURE__ */ (0, Y.jsx)(P, {
								tone: "error",
								children: ae
							}) : null,
							h?.warnings?.length ? /* @__PURE__ */ (0, Y.jsx)(P, {
								tone: "warning",
								children: h.warnings.join("；")
							}) : null
						]
					}),
					/* @__PURE__ */ (0, Y.jsxs)(Ye, {
						id: "browser",
						className: "flex flex-col gap-5",
						children: [
							/* @__PURE__ */ (0, Y.jsxs)("div", {
								className: ln,
								children: [
									/* @__PURE__ */ (0, Y.jsx)($, {
										accent: 0,
										icon: rn,
										term: "浏览记录",
										figure: Number(x.history_visits || 0).toLocaleString(),
										detail: Bt(x),
										detailTitle: `${$t(x.range_start)}—${$t(x.range_end)}`
									}),
									/* @__PURE__ */ (0, Y.jsx)($, {
										accent: 1,
										icon: Ut,
										term: "口味维度",
										figure: w.length.toLocaleString(),
										detail: w[0]?.name || "尚无主维度"
									}),
									/* @__PURE__ */ (0, Y.jsx)($, {
										accent: 2,
										icon: z,
										term: "浏览线索",
										figure: ne.length.toLocaleString()
									}),
									/* @__PURE__ */ (0, Y.jsx)($, {
										accent: 3,
										icon: zt,
										term: "浏览器书签",
										figure: Number(x.bookmarks || 0).toLocaleString(),
										detail: `${Number(ee.exports || 0).toLocaleString()} 份私有导出 · ${Rt(ee.bytes || 0)}`
									})
								]
							}),
							/* @__PURE__ */ (0, Y.jsxs)("section", {
								className: te ? `${Q} md:flex-row md:gap-6` : Q,
								"aria-label": "浏览器画像",
								children: [/* @__PURE__ */ (0, Y.jsxs)("div", {
									className: te ? "flex shrink-0 flex-col gap-2 pb-5 md:w-80 md:pr-6 md:pb-0" : "flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1",
									children: [
										/* @__PURE__ */ (0, Y.jsx)("span", {
											className: "text-caption-1-regular text-text-secondary",
											children: "浏览器画像"
										}),
										te ? /* @__PURE__ */ (0, Y.jsx)(Di, {
											rows: w,
											label: "主要口味维度"
										}) : null,
										/* @__PURE__ */ (0, Y.jsx)("small", {
											className: "text-caption-1-regular text-text-secondary",
											children: b.updated_at ? `更新于 ${$t(b.updated_at)}` : "尚未采集浏览记录"
										})
									]
								}), /* @__PURE__ */ (0, Y.jsx)("div", {
									className: "flex min-w-0 grow flex-col",
									children: w.length ? /* @__PURE__ */ (0, Y.jsx)(Oi, {
										rows: w,
										label: "口味维度排名"
									}) : /* @__PURE__ */ (0, Y.jsx)(N, {
										size: "compact",
										icon: z,
										title: "暂无口味维度",
										actions: /* @__PURE__ */ (0, Y.jsx)(Qi, {}),
										children: Ri
									})
								})]
							}),
							/* @__PURE__ */ (0, Y.jsx)(t, {
								activity: b.activity,
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
							/* @__PURE__ */ (0, Y.jsx)(ki, { flows: b.creator_flows }),
							/* @__PURE__ */ (0, Y.jsx)(na, {
								label: "浏览器口味维度",
								onSignal: n,
								panels: [
									{
										id: "tags",
										name: "标签",
										props: {
											rows: C.browser_tags || [],
											kind: "tag",
											visual: "none",
											empty: Bi
										}
									},
									{
										id: "creators",
										name: "创作者",
										props: {
											rows: C.browser_creators || [],
											kind: "creator",
											visual: "creator",
											empty: Vi
										}
									},
									{
										id: "performers",
										name: "女优",
										props: {
											rows: C.browser_performers || [],
											kind: "performer",
											visual: "entity",
											empty: "还没有与已建档女优关联的浏览记录。"
										}
									},
									{
										id: "domains",
										name: "常访问网站",
										props: {
											rows: C.domains || [],
											kind: "",
											visual: "domain",
											empty: Hi
										}
									},
									{
										id: "gaps",
										name: "浏览线索",
										props: {
											rows: ne,
											kind: "",
											visual: "none",
											empty: zi
										}
									}
								]
							})
						]
					}),
					/* @__PURE__ */ (0, Y.jsxs)(Ye, {
						id: "peach",
						className: "flex flex-col gap-5",
						children: [
							/* @__PURE__ */ (0, Y.jsxs)("div", {
								className: ln,
								children: [
									/* @__PURE__ */ (0, Y.jsx)($, {
										accent: 0,
										icon: Ct,
										term: "Peach 看过",
										figure: Number(x.peach_items || 0).toLocaleString(),
										detail: tn(x.peach_seconds || 0)
									}),
									/* @__PURE__ */ (0, Y.jsx)($, {
										accent: 1,
										icon: Et,
										term: "喜欢",
										figure: Number(x.liked || 0).toLocaleString()
									}),
									/* @__PURE__ */ (0, Y.jsx)($, {
										accent: 2,
										icon: Ot,
										term: "不合口味",
										figure: Number(x.disliked || 0).toLocaleString()
									}),
									/* @__PURE__ */ (0, Y.jsx)($, {
										accent: 3,
										icon: Ut,
										term: "有标签",
										figure: re.toLocaleString()
									})
								]
							}),
							/* @__PURE__ */ (0, Y.jsxs)("section", {
								className: `${Q} md:flex-row md:gap-6`,
								"aria-label": "Peach 观看",
								children: [/* @__PURE__ */ (0, Y.jsxs)("div", {
									className: "flex shrink-0 flex-col gap-0.5 pb-5 md:w-72 md:pr-6 md:pb-0",
									children: [
										/* @__PURE__ */ (0, Y.jsx)("span", {
											className: "text-caption-1-regular text-text-secondary",
											children: "Peach 观看"
										}),
										/* @__PURE__ */ (0, Y.jsx)("b", {
											className: "text-display-4-medium tabular-nums text-text-primary",
											children: Number(x.peach_items || 0).toLocaleString()
										}),
										/* @__PURE__ */ (0, Y.jsx)("span", {
											className: "text-body-2-regular text-text-secondary",
											children: "部作品有观看或评价记录"
										})
									]
								}), /* @__PURE__ */ (0, Y.jsxs)("div", {
									className: "flex min-w-0 grow flex-col",
									children: [/* @__PURE__ */ (0, Y.jsx)(ca, {
										term: "有标签",
										value: re,
										rest: S.untagged || 0
									}), /* @__PURE__ */ (0, Y.jsx)(ca, {
										term: "有身份",
										value: ie,
										rest: S.unidentified || 0
									})]
								})]
							}),
							/* @__PURE__ */ (0, Y.jsx)(na, {
								label: "Peach 口味维度",
								onSignal: n,
								panels: [
									{
										id: "tags",
										name: "标签",
										props: {
											rows: C.peach_tags || [],
											kind: "tag",
											visual: "none",
											empty: Ui
										}
									},
									{
										id: "creators",
										name: "创作者",
										props: {
											rows: C.peach_creators || [],
											kind: "creator",
											visual: "creator",
											empty: Wi
										}
									},
									{
										id: "performers",
										name: "女优",
										props: {
											rows: C.peach_performers || [],
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
			/* @__PURE__ */ (0, Y.jsx)(ra, {
				data: b,
				onSignal: n,
				navigate: r
			}),
			/* @__PURE__ */ (0, Y.jsx)(oa, {
				sources: b.sources || [],
				browsers: b.browsers || [],
				window: o,
				toast: i,
				emptyActions: oe
			})
		]
	}) });
}
function ca({ term: e, value: t, rest: n }) {
	let r = Math.max(t + n, 1);
	return /* @__PURE__ */ (0, Y.jsxs)("div", {
		className: "flex flex-col gap-1.5 border-b border-separator-border py-3 last:border-b-0",
		children: [/* @__PURE__ */ (0, Y.jsxs)("p", {
			className: "flex items-baseline justify-between gap-3 text-body-2-regular text-text-primary",
			children: [/* @__PURE__ */ (0, Y.jsx)("span", { children: e }), /* @__PURE__ */ (0, Y.jsxs)("b", {
				className: "tabular-nums",
				children: [t.toLocaleString(), /* @__PURE__ */ (0, Y.jsx)("span", {
					className: "ml-1.5 text-caption-1-regular text-text-secondary",
					children: `${n.toLocaleString()} 项待补`
				})]
			})]
		}), /* @__PURE__ */ (0, Y.jsx)(ft, {
			label: `${e}：${t.toLocaleString()} / ${r.toLocaleString()}`,
			value: t,
			max: r
		})]
	});
}
//#endregion
export { Xi as TASTE_GUIDE_KEY, sa as TastePage };

//# debugId=8abe0556-ed80-48ed-9ba4-6a697e5e5b94