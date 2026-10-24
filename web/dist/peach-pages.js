//#region \0rolldown/runtime.js
(function() {
	try {
		var e = typeof window < "u" ? window : typeof global < "u" ? global : typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : {}, t = new e.Error().stack;
		t && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[t] = "de232f22-b24d-4a9b-b806-8ce425cecdb7", e._sentryDebugIdIdentifier = "sentry-dbid-de232f22-b24d-4a9b-b806-8ce425cecdb7");
	} catch {}
})();
var e = Object.create, t = Object.defineProperty, n = Object.getOwnPropertyDescriptor, r = Object.getOwnPropertyNames, i = Object.getPrototypeOf, a = Object.prototype.hasOwnProperty, o = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), s = (e, i, o, s) => {
	if (i && typeof i == "object" || typeof i == "function") for (var c = r(i), l = 0, u = c.length, d; l < u; l++) d = c[l], !a.call(e, d) && d !== o && t(e, d, {
		get: ((e) => i[e]).bind(null, d),
		enumerable: !(s = n(i, d)) || s.enumerable
	});
	return e;
}, c = (n, r, o) => (o = n == null ? {} : e(i(n)), s(r || !n || !n.__esModule || !a.call(n, "default") ? t(o, "default", {
	value: n,
	enumerable: !0
}) : o, n)), l = !1, u = /* @__PURE__ */ new Set([
	"Error",
	"TypeError",
	"RangeError",
	"ReferenceError",
	"SyntaxError",
	"URIError",
	"EvalError",
	"AggregateError",
	"DOMException"
]), d = /^(?:peach-pages\.js|peach-app(?:\.[A-Za-z0-9_-]+)?\.js)$/, f = /(?:^|[/\\])(peach-pages\.js|peach-app(?:\.[A-Za-z0-9_-]+)?\.js)(?=[:?#)\s]|$)/m, p = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i;
function m() {
	let e = globalThis, t = {};
	for (let [n, r] of Object.entries(e._sentryDebugIds ?? {})) {
		if (typeof r != "string" || !p.test(r)) continue;
		let e = n.match(f)?.[1];
		e && (t[e] = r);
	}
	return t;
}
function h() {
	if (l || typeof window > "u") return;
	l = !0;
	let e = Date.now(), t = 0, n = /* @__PURE__ */ new Set(), r = (r, i, a = "", o) => {
		let s = i instanceof Error || i instanceof DOMException ? i.name : "";
		if (s === "AbortError") return;
		let c = u.has(s) ? s : i instanceof DOMException ? "DOMException" : "Error";
		if (Date.now() - e >= 6e4 && (e = Date.now(), t = 0, n.clear()), t >= 10) return;
		let l = (i instanceof Error ? i.message : typeof i == "string" ? i : a).slice(0, 2e3);
		if (!l) return;
		let f = i instanceof Error ? (i.stack ?? "").slice(0, 6e3) : "", p = `${r}:${l}:${f}`;
		n.has(p) || (n.add(p), t += 1, fetch("/api/diagnostics/client-error", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				kind: r,
				message: l,
				stack: f,
				error_name: c,
				page: window.location.pathname,
				bundle_debug_ids: m(),
				source_file: [o?.filename?.split("/").pop()?.split(/[?#]/)[0] ?? ""].find((e) => d.test(e)),
				line: o?.lineno,
				column: o?.colno
			}),
			credentials: "same-origin",
			keepalive: !0
		}).catch(() => {}));
	};
	window.addEventListener("error", (e) => r("error", e.error, e.message, e)), window.addEventListener("unhandledrejection", (e) => r("unhandledrejection", e.reason, "Promise 未处理的异常"));
}
//#endregion
//#region node_modules/scheduler/cjs/scheduler.production.js
var g = /* @__PURE__ */ o(((e) => {
	function t(e, t) {
		var n = e.length;
		e.push(t);
		a: for (; 0 < n;) {
			var r = n - 1 >>> 1, a = e[r];
			if (0 < i(a, t)) e[r] = t, e[n] = a, n = r;
			else break a;
		}
	}
	function n(e) {
		return e.length === 0 ? null : e[0];
	}
	function r(e) {
		if (e.length === 0) return null;
		var t = e[0], n = e.pop();
		if (n !== t) {
			e[0] = n;
			a: for (var r = 0, a = e.length, o = a >>> 1; r < o;) {
				var s = 2 * (r + 1) - 1, c = e[s], l = s + 1, u = e[l];
				if (0 > i(c, n)) l < a && 0 > i(u, c) ? (e[r] = u, e[l] = n, r = l) : (e[r] = c, e[s] = n, r = s);
				else if (l < a && 0 > i(u, n)) e[r] = u, e[l] = n, r = l;
				else break a;
			}
		}
		return t;
	}
	function i(e, t) {
		var n = e.sortIndex - t.sortIndex;
		return n === 0 ? e.id - t.id : n;
	}
	if (e.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
		var a = performance;
		e.unstable_now = function() {
			return a.now();
		};
	} else {
		var o = Date, s = o.now();
		e.unstable_now = function() {
			return o.now() - s;
		};
	}
	var c = [], l = [], u = 1, d = null, f = 3, p = !1, m = !1, h = !1, g = !1, _ = typeof setTimeout == "function" ? setTimeout : null, v = typeof clearTimeout == "function" ? clearTimeout : null, y = typeof setImmediate < "u" ? setImmediate : null;
	function b(e) {
		for (var i = n(l); i !== null;) {
			if (i.callback === null) r(l);
			else if (i.startTime <= e) r(l), i.sortIndex = i.expirationTime, t(c, i);
			else break;
			i = n(l);
		}
	}
	function x(e) {
		if (h = !1, b(e), !m) {
			if (n(c) !== null) m = !0, S || (S = !0, O());
			else {
				var t = n(l);
				t !== null && j(x, t.startTime - e);
			}
		}
	}
	var S = !1, C = -1, w = 5, T = -1;
	function E() {
		return g ? !0 : !(e.unstable_now() - T < w);
	}
	function D() {
		if (g = !1, S) {
			var t = e.unstable_now();
			T = t;
			var i = !0;
			try {
				a: {
					m = !1, h && (h = !1, v(C), C = -1), p = !0;
					var a = f;
					try {
						b: {
							for (b(t), d = n(c); d !== null && !(d.expirationTime > t && E());) {
								var o = d.callback;
								if (typeof o == "function") {
									d.callback = null, f = d.priorityLevel;
									var s = o(d.expirationTime <= t);
									if (t = e.unstable_now(), typeof s == "function") {
										d.callback = s, b(t), i = !0;
										break b;
									}
									d === n(c) && r(c), b(t);
								} else r(c);
								d = n(c);
							}
							if (d !== null) i = !0;
							else {
								var u = n(l);
								u !== null && j(x, u.startTime - t), i = !1;
							}
						}
						break a;
					} finally {
						d = null, f = a, p = !1;
					}
					i = void 0;
				}
			} finally {
				i ? O() : S = !1;
			}
		}
	}
	var O;
	if (typeof y == "function") O = function() {
		y(D);
	};
	else if (typeof MessageChannel < "u") {
		var k = new MessageChannel(), A = k.port2;
		k.port1.onmessage = D, O = function() {
			A.postMessage(null);
		};
	} else O = function() {
		_(D, 0);
	};
	function j(t, n) {
		C = _(function() {
			t(e.unstable_now());
		}, n);
	}
	e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(e) {
		e.callback = null;
	}, e.unstable_forceFrameRate = function(e) {
		0 > e || 125 < e ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : w = 0 < e ? Math.floor(1e3 / e) : 5;
	}, e.unstable_getCurrentPriorityLevel = function() {
		return f;
	}, e.unstable_next = function(e) {
		switch (f) {
			case 1:
			case 2:
			case 3:
				var t = 3;
				break;
			default: t = f;
		}
		var n = f;
		f = t;
		try {
			return e();
		} finally {
			f = n;
		}
	}, e.unstable_requestPaint = function() {
		g = !0;
	}, e.unstable_runWithPriority = function(e, t) {
		switch (e) {
			case 1:
			case 2:
			case 3:
			case 4:
			case 5: break;
			default: e = 3;
		}
		var n = f;
		f = e;
		try {
			return t();
		} finally {
			f = n;
		}
	}, e.unstable_scheduleCallback = function(r, i, a) {
		var o = e.unstable_now();
		switch (typeof a == "object" && a ? (a = a.delay, a = typeof a == "number" && 0 < a ? o + a : o) : a = o, r) {
			case 1:
				var s = -1;
				break;
			case 2:
				s = 250;
				break;
			case 5:
				s = 1073741823;
				break;
			case 4:
				s = 1e4;
				break;
			default: s = 5e3;
		}
		return s = a + s, r = {
			id: u++,
			callback: i,
			priorityLevel: r,
			startTime: a,
			expirationTime: s,
			sortIndex: -1
		}, a > o ? (r.sortIndex = a, t(l, r), n(c) === null && r === n(l) && (h ? (v(C), C = -1) : h = !0, j(x, a - o))) : (r.sortIndex = s, t(c, r), m || p || (m = !0, S || (S = !0, O()))), r;
	}, e.unstable_shouldYield = E, e.unstable_wrapCallback = function(e) {
		var t = f;
		return function() {
			var n = f;
			f = t;
			try {
				return e.apply(this, arguments);
			} finally {
				f = n;
			}
		};
	};
})), _ = /* @__PURE__ */ o(((e, t) => {
	t.exports = g();
})), v = /* @__PURE__ */ o(((e) => {
	var t = Symbol.for("react.transitional.element"), n = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), a = Symbol.for("react.profiler"), o = Symbol.for("react.consumer"), s = Symbol.for("react.context"), c = Symbol.for("react.forward_ref"), l = Symbol.for("react.suspense"), u = Symbol.for("react.memo"), d = Symbol.for("react.lazy"), f = Symbol.for("react.activity"), p = Symbol.for("react.view_transition"), m = Symbol.iterator;
	function h(e) {
		return typeof e != "object" || !e ? null : (e = m && e[m] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var g = {
		isMounted: function() {
			return !1;
		},
		enqueueForceUpdate: function() {},
		enqueueReplaceState: function() {},
		enqueueSetState: function() {}
	}, _ = Object.assign, v = {};
	function y(e, t, n) {
		this.props = e, this.context = t, this.refs = v, this.updater = n || g;
	}
	y.prototype.isReactComponent = {}, y.prototype.setState = function(e, t) {
		if (typeof e != "object" && typeof e != "function" && e != null) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
		this.updater.enqueueSetState(this, e, t, "setState");
	}, y.prototype.forceUpdate = function(e) {
		this.updater.enqueueForceUpdate(this, e, "forceUpdate");
	};
	function b() {}
	b.prototype = y.prototype;
	function x(e, t, n) {
		this.props = e, this.context = t, this.refs = v, this.updater = n || g;
	}
	var S = x.prototype = new b();
	S.constructor = x, _(S, y.prototype), S.isPureReactComponent = !0;
	var C = Array.isArray;
	function w() {}
	var T = {
		H: null,
		A: null,
		T: null,
		S: null
	}, E = Object.prototype.hasOwnProperty;
	function D(e, n, r) {
		var i = r.ref;
		return {
			$$typeof: t,
			type: e,
			key: n,
			ref: i === void 0 ? null : i,
			props: r
		};
	}
	function O(e, t) {
		return D(e.type, t, e.props);
	}
	function k(e) {
		return typeof e == "object" && !!e && e.$$typeof === t;
	}
	function A(e) {
		var t = {
			"=": "=0",
			":": "=2"
		};
		return "$" + e.replace(/[=:]/g, function(e) {
			return t[e];
		});
	}
	var j = /\/+/g;
	function M(e, t) {
		return typeof e == "object" && e && e.key != null ? A("" + e.key) : t.toString(36);
	}
	function ee(e) {
		switch (e.status) {
			case "fulfilled": return e.value;
			case "rejected": throw e.reason;
			default: switch (typeof e.status == "string" ? e.then(w, w) : (e.status = "pending", e.then(function(t) {
				e.status === "pending" && (e.status = "fulfilled", e.value = t);
			}, function(t) {
				e.status === "pending" && (e.status = "rejected", e.reason = t);
			})), e.status) {
				case "fulfilled": return e.value;
				case "rejected": throw e.reason;
			}
		}
		throw e;
	}
	function te(e, r, i, a, o) {
		var s = typeof e;
		(s === "undefined" || s === "boolean") && (e = null);
		var c = !1;
		if (e === null) c = !0;
		else switch (s) {
			case "bigint":
			case "string":
			case "number":
				c = !0;
				break;
			case "object": switch (e.$$typeof) {
				case t:
				case n:
					c = !0;
					break;
				case d: return c = e._init, te(c(e._payload), r, i, a, o);
			}
		}
		if (c) return o = o(e), c = a === "" ? "." + M(e, 0) : a, C(o) ? (i = "", c != null && (i = c.replace(j, "$&/") + "/"), te(o, r, i, "", function(e) {
			return e;
		})) : o != null && (k(o) && (o = O(o, i + (o.key == null || e && e.key === o.key ? "" : ("" + o.key).replace(j, "$&/") + "/") + c)), r.push(o)), 1;
		c = 0;
		var l = a === "" ? "." : a + ":";
		if (C(e)) for (var u = 0; u < e.length; u++) a = e[u], s = l + M(a, u), c += te(a, r, i, s, o);
		else if (u = h(e), typeof u == "function") for (e = u.call(e), u = 0; !(a = e.next()).done;) a = a.value, s = l + M(a, u++), c += te(a, r, i, s, o);
		else if (s === "object") {
			if (typeof e.then == "function") return te(ee(e), r, i, a, o);
			throw r = String(e), Error("Objects are not valid as a React child (found: " + (r === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : r) + "). If you meant to render a collection of children, use an array instead.");
		}
		return c;
	}
	function ne(e, t, n) {
		if (e == null) return e;
		var r = [], i = 0;
		return te(e, r, "", "", function(e) {
			return t.call(n, e, i++);
		}), r;
	}
	function N(e) {
		if (e._status === -1) {
			var t = e._result, n = t();
			n.then(function(t) {
				(e._status === 0 || e._status === -1) && (e._status = 1, e._result = t, n.status === void 0 && (n.status = "fulfilled", n.value = t));
			}, function(t) {
				(e._status === 0 || e._status === -1) && (e._status = 2, e._result = t, n.status === void 0 && (n.status = "rejected", n.reason = t));
			}), e._status === -1 && (e._status = 0, e._result = n);
		}
		if (e._status === 1) return e._result.default;
		throw e._result;
	}
	var re = typeof reportError == "function" ? reportError : function(e) {
		if (typeof window == "object" && typeof window.ErrorEvent == "function") {
			var t = new window.ErrorEvent("error", {
				bubbles: !0,
				cancelable: !0,
				message: typeof e == "object" && e && typeof e.message == "string" ? String(e.message) : String(e),
				error: e
			});
			if (!window.dispatchEvent(t)) return;
		} else if (typeof process == "object" && typeof process.emit == "function") {
			process.emit("uncaughtException", e);
			return;
		}
		console.error(e);
	};
	function ie(e) {
		var t = T.T, n = {};
		n.types = t === null ? null : t.types, T.T = n;
		try {
			var r = e(), i = T.S;
			i !== null && i(n, r), typeof r == "object" && r && typeof r.then == "function" && r.then(w, re);
		} catch (e) {
			re(e);
		} finally {
			t !== null && n.types !== null && (t.types = n.types), T.T = t;
		}
	}
	function ae(e) {
		var t = T.T;
		if (t !== null) {
			var n = t.types;
			n === null ? t.types = [e] : n.indexOf(e) === -1 && n.push(e);
		} else ie(ae.bind(null, e));
	}
	var oe = {
		map: ne,
		forEach: function(e, t, n) {
			ne(e, function() {
				t.apply(this, arguments);
			}, n);
		},
		count: function(e) {
			var t = 0;
			return ne(e, function() {
				t++;
			}), t;
		},
		toArray: function(e) {
			return ne(e, function(e) {
				return e;
			}) || [];
		},
		only: function(e) {
			if (!k(e)) throw Error("React.Children.only expected to receive a single React element child.");
			return e;
		}
	};
	e.Activity = f, e.Children = oe, e.Component = y, e.Fragment = r, e.Profiler = a, e.PureComponent = x, e.StrictMode = i, e.Suspense = l, e.ViewTransition = p, e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = T, e.__COMPILER_RUNTIME = {
		__proto__: null,
		c: function(e) {
			return T.H.useMemoCache(e);
		}
	}, e.addTransitionType = ae, e.cache = function(e) {
		return function() {
			return e.apply(null, arguments);
		};
	}, e.cacheSignal = function() {
		return null;
	}, e.cloneElement = function(e, t, n) {
		if (e == null) throw Error("The argument must be a React element, but you passed " + e + ".");
		var r = _({}, e.props), i = e.key;
		if (t != null) for (a in t.key !== void 0 && (i = "" + t.key), t) !E.call(t, a) || a === "key" || a === "__self" || a === "__source" || a === "ref" && t.ref === void 0 || (r[a] = t[a]);
		var a = arguments.length - 2;
		if (a === 1) r.children = n;
		else if (1 < a) {
			for (var o = Array(a), s = 0; s < a; s++) o[s] = arguments[s + 2];
			r.children = o;
		}
		return D(e.type, i, r);
	}, e.createContext = function(e) {
		return e = {
			$$typeof: s,
			_currentValue: e,
			_currentValue2: e,
			_threadCount: 0,
			Provider: null,
			Consumer: null
		}, e.Provider = e, e.Consumer = {
			$$typeof: o,
			_context: e
		}, e;
	}, e.createElement = function(e, t, n) {
		var r, i = {}, a = null;
		if (t != null) for (r in t.key !== void 0 && (a = "" + t.key), t) E.call(t, r) && r !== "key" && r !== "__self" && r !== "__source" && (i[r] = t[r]);
		var o = arguments.length - 2;
		if (o === 1) i.children = n;
		else if (1 < o) {
			for (var s = Array(o), c = 0; c < o; c++) s[c] = arguments[c + 2];
			i.children = s;
		}
		if (e && e.defaultProps) for (r in o = e.defaultProps, o) i[r] === void 0 && (i[r] = o[r]);
		return D(e, a, i);
	}, e.createRef = function() {
		return { current: null };
	}, e.forwardRef = function(e) {
		return {
			$$typeof: c,
			render: e
		};
	}, e.isValidElement = k, e.lazy = function(e) {
		return {
			$$typeof: d,
			_payload: {
				_status: -1,
				_result: e
			},
			_init: N
		};
	}, e.memo = function(e, t) {
		return {
			$$typeof: u,
			type: e,
			compare: t === void 0 ? null : t
		};
	}, e.startTransition = ie, e.unstable_useCacheRefresh = function() {
		return T.H.useCacheRefresh();
	}, e.use = function(e) {
		return T.H.use(e);
	}, e.useActionState = function(e, t, n) {
		return T.H.useActionState(e, t, n);
	}, e.useCallback = function(e, t) {
		return T.H.useCallback(e, t);
	}, e.useContext = function(e) {
		return T.H.useContext(e);
	}, e.useDebugValue = function() {}, e.useDeferredValue = function(e, t) {
		return T.H.useDeferredValue(e, t);
	}, e.useEffect = function(e, t) {
		return T.H.useEffect(e, t);
	}, e.useEffectEvent = function(e) {
		return T.H.useEffectEvent(e);
	}, e.useId = function() {
		return T.H.useId();
	}, e.useImperativeHandle = function(e, t, n) {
		return T.H.useImperativeHandle(e, t, n);
	}, e.useInsertionEffect = function(e, t) {
		return T.H.useInsertionEffect(e, t);
	}, e.useLayoutEffect = function(e, t) {
		return T.H.useLayoutEffect(e, t);
	}, e.useMemo = function(e, t) {
		return T.H.useMemo(e, t);
	}, e.useOptimistic = function(e, t) {
		return T.H.useOptimistic(e, t);
	}, e.useReducer = function(e, t, n) {
		return T.H.useReducer(e, t, n);
	}, e.useRef = function(e) {
		return T.H.useRef(e);
	}, e.useState = function(e) {
		return T.H.useState(e);
	}, e.useSyncExternalStore = function(e, t, n) {
		return T.H.useSyncExternalStore(e, t, n);
	}, e.useTransition = function() {
		return T.H.useTransition();
	}, e.version = "19.3.1";
})), y = /* @__PURE__ */ o(((e, t) => {
	t.exports = v();
})), b = /* @__PURE__ */ o(((e) => {
	var t = y();
	function n(e) {
		var t = "https://react.dev/errors/" + e;
		if (1 < arguments.length) {
			t += "?args[]=" + encodeURIComponent(arguments[1]);
			for (var n = 2; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
		}
		return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	function r() {}
	var i = {
		d: {
			f: r,
			r: function() {
				throw Error(n(522));
			},
			D: r,
			C: r,
			L: r,
			m: r,
			X: r,
			S: r,
			M: r
		},
		p: 0,
		findDOMNode: null
	}, a = Symbol.for("react.portal"), o = Symbol.for("react.recoverable"), s = Symbol.for("react.optimistic_key");
	function c(e, t, n) {
		var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
		return {
			$$typeof: a,
			key: r == null ? null : r === s ? s : "" + r,
			children: e,
			containerInfo: t,
			implementation: n
		};
	}
	var l = t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
	function u(e, t) {
		if (e === "font") return "";
		if (typeof t == "string") return t === "use-credentials" ? t : "";
	}
	e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = i, e.browser = function(e) {
		return {
			$$typeof: o,
			_reason: e
		};
	}, e.createPortal = function(e, t) {
		var r = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
		if (!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11) throw Error(n(299));
		return c(e, t, null, r);
	}, e.flushSync = function(e) {
		var t = l.T, n = i.p;
		try {
			if (l.T = null, i.p = 2, e) return e();
		} finally {
			l.T = t, i.p = n, i.d.f();
		}
	}, e.preconnect = function(e, t) {
		typeof e == "string" && (t ? (t = t.crossOrigin, t = typeof t == "string" ? t === "use-credentials" ? t : "" : void 0) : t = null, i.d.C(e, t));
	}, e.prefetchDNS = function(e) {
		typeof e == "string" && i.d.D(e);
	}, e.preinit = function(e, t) {
		if (typeof e == "string" && t && typeof t.as == "string") {
			var n = t.as, r = u(n, t.crossOrigin), a = typeof t.integrity == "string" ? t.integrity : void 0, o = typeof t.fetchPriority == "string" ? t.fetchPriority : void 0;
			n === "style" ? i.d.S(e, typeof t.precedence == "string" ? t.precedence : void 0, {
				crossOrigin: r,
				integrity: a,
				fetchPriority: o
			}) : n === "script" && i.d.X(e, {
				crossOrigin: r,
				integrity: a,
				fetchPriority: o,
				nonce: typeof t.nonce == "string" ? t.nonce : void 0
			});
		}
	}, e.preinitModule = function(e, t) {
		if (typeof e == "string") {
			if (typeof t == "object" && t) {
				if (t.as == null || t.as === "script") {
					var n = u(t.as, t.crossOrigin);
					i.d.M(e, {
						crossOrigin: n,
						integrity: typeof t.integrity == "string" ? t.integrity : void 0,
						nonce: typeof t.nonce == "string" ? t.nonce : void 0,
						fetchPriority: typeof t.fetchPriority == "string" ? t.fetchPriority : void 0
					});
				}
			} else t ?? i.d.M(e);
		}
	}, e.preload = function(e, t) {
		if (typeof e == "string" && typeof t == "object" && t && typeof t.as == "string") {
			var n = t.as, r = u(n, t.crossOrigin);
			i.d.L(e, n, {
				crossOrigin: r,
				integrity: typeof t.integrity == "string" ? t.integrity : void 0,
				nonce: typeof t.nonce == "string" ? t.nonce : void 0,
				type: typeof t.type == "string" ? t.type : void 0,
				fetchPriority: typeof t.fetchPriority == "string" ? t.fetchPriority : void 0,
				referrerPolicy: typeof t.referrerPolicy == "string" ? t.referrerPolicy : void 0,
				imageSrcSet: typeof t.imageSrcSet == "string" ? t.imageSrcSet : void 0,
				imageSizes: typeof t.imageSizes == "string" ? t.imageSizes : void 0,
				media: typeof t.media == "string" ? t.media : void 0
			});
		}
	}, e.preloadModule = function(e, t) {
		if (typeof e == "string") {
			if (t) {
				var n = u(t.as, t.crossOrigin);
				i.d.m(e, {
					as: typeof t.as == "string" && t.as !== "script" ? t.as : void 0,
					crossOrigin: n,
					integrity: typeof t.integrity == "string" ? t.integrity : void 0,
					nonce: typeof t.nonce == "string" ? t.nonce : void 0,
					fetchPriority: typeof t.fetchPriority == "string" ? t.fetchPriority : void 0
				});
			} else i.d.m(e);
		}
	}, e.requestFormReset = function(e) {
		i.d.r(e);
	}, e.unstable_batchedUpdates = function(e, t) {
		return e(t);
	}, e.useFormState = function(e, t, n) {
		return l.H.useFormState(e, t, n);
	}, e.useFormStatus = function() {
		return l.H.useHostTransitionStatus();
	}, e.version = "19.3.1";
})), x = /* @__PURE__ */ o(((e, t) => {
	function n() {
		if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE == "function") try {
			__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
		} catch (e) {
			console.error(e);
		}
	}
	n(), t.exports = b();
})), S = /* @__PURE__ */ o(((e) => {
	var t = _(), n = y(), r = x();
	function i(e) {
		var t = "https://react.dev/errors/" + e;
		if (1 < arguments.length) {
			t += "?args[]=" + encodeURIComponent(arguments[1]);
			for (var n = 2; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
		}
		return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	function a(e) {
		return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
	}
	function o(e) {
		for (var t = e, n = t; n && !n.alternate;) t = n, t.flags & 4098 && (e = t.return), n = t.return;
		for (; t.return;) t = t.return;
		return t.tag === 3 ? e : null;
	}
	function s(e) {
		if (e.tag === 13) {
			var t = e.memoizedState;
			if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
		}
		return null;
	}
	function c(e) {
		if (e.tag === 31) {
			var t = e.memoizedState;
			if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
		}
		return null;
	}
	function l(e) {
		if (o(e) !== e) throw Error(i(188));
	}
	function u(e) {
		var t = e.alternate;
		if (!t) {
			if (t = o(e), t === null) throw Error(i(188));
			return t === e ? e : null;
		}
		for (var n = e, r = t;;) {
			var a = n.return;
			if (a === null) break;
			var s = a.alternate;
			if (s === null) {
				if (r = a.return, r !== null) {
					n = r;
					continue;
				}
				break;
			}
			if (a.child === s.child) {
				for (s = a.child; s;) {
					if (s === n) return l(a), e;
					if (s === r) return l(a), t;
					s = s.sibling;
				}
				throw Error(i(188));
			}
			if (n.return !== r.return) n = a, r = s;
			else {
				for (var c = !1, u = a.child; u;) {
					if (u === n) {
						c = !0, n = a, r = s;
						break;
					}
					if (u === r) {
						c = !0, r = a, n = s;
						break;
					}
					u = u.sibling;
				}
				if (!c) {
					for (u = s.child; u;) {
						if (u === n) {
							c = !0, n = s, r = a;
							break;
						}
						if (u === r) {
							c = !0, r = s, n = a;
							break;
						}
						u = u.sibling;
					}
					if (!c) throw Error(i(189));
				}
			}
			if (n.alternate !== r) throw Error(i(190));
		}
		if (n.tag !== 3) throw Error(i(188));
		return n.stateNode.current === n ? e : t;
	}
	function d(e) {
		var t = e.tag;
		if (t === 5 || t === 26 || t === 27 || t === 6) return e;
		for (e = e.child; e !== null;) {
			if (t = d(e), t !== null) return t;
			e = e.sibling;
		}
		return null;
	}
	function f(e, t, n, r, i, a) {
		for (; e !== null;) {
			if ((e.tag === 5 || e.tag === 27 || e.tag === 6) && n(e, r, i, a) || (e.tag !== 22 || e.memoizedState === null) && (t || e.tag !== 5 && e.tag !== 27) && f(e.child, t, n, r, i, a)) return !0;
			e = e.sibling;
		}
		return !1;
	}
	function p(e) {
		for (e = e.return; e !== null;) {
			if (e.tag === 3 || e.tag === 5 || e.tag === 27) return e;
			e = e.return;
		}
		return null;
	}
	function m(e) {
		var t = !1;
		for (e = e.return; e !== null && (e.tag === 4 && (t = !0), e.tag !== 3 && e.tag !== 5 && e.tag !== 27);) e = e.return;
		return t;
	}
	function h(e) {
		var t = [null, null], n = p(e);
		return n === null || g(t, e, n.child, { foundSelf: !1 }), t;
	}
	function g(e, t, n, r) {
		for (; n !== null;) {
			if (n === t) r.foundSelf = !0;
			else if (n.tag === 5 || n.tag === 27 || n.tag === 6) {
				if (r.foundSelf) return e[1] = n, !0;
				e[0] = n;
			} else if ((n.tag !== 22 || n.memoizedState === null) && g(e, t, n.child, r)) return !0;
			n = n.sibling;
		}
		return !1;
	}
	function v(e) {
		switch (e.tag) {
			case 5:
			case 27:
			case 6: return e.stateNode;
			case 3: return e.stateNode.containerInfo;
			default: throw Error(i(559));
		}
	}
	var b = null, S = null;
	function C(e, t, n) {
		return e === n || e === t && (b = e, !0);
	}
	function w(e, t, n) {
		return e === n ? (S = e, !1) : e === t && (S !== null && (b = e), !0);
	}
	function T(e) {
		if (e === null) return null;
		do
			e = e === null ? null : e.return;
		while (e && e.tag !== 5 && e.tag !== 27 && e.tag !== 3);
		return e || null;
	}
	function E(e, t, n) {
		for (var r = 0, i = e; i; i = n(i)) r++;
		i = 0;
		for (var a = t; a; a = n(a)) i++;
		for (; 0 < r - i;) e = n(e), r--;
		for (; 0 < i - r;) t = n(t), i--;
		for (; r--;) {
			if (e === t || t !== null && e === t.alternate) return e;
			e = n(e), t = n(t);
		}
		return null;
	}
	var D = Object.assign, O = Symbol.for("react.element"), k = Symbol.for("react.transitional.element"), A = Symbol.for("react.portal"), j = Symbol.for("react.fragment"), M = Symbol.for("react.strict_mode"), ee = Symbol.for("react.profiler"), te = Symbol.for("react.consumer"), ne = Symbol.for("react.context"), N = Symbol.for("react.forward_ref"), re = Symbol.for("react.suspense"), ie = Symbol.for("react.suspense_list"), ae = Symbol.for("react.memo"), oe = Symbol.for("react.lazy"), se = Symbol.for("react.activity"), ce = Symbol.for("react.legacy_hidden"), le = Symbol.for("react.memo_cache_sentinel"), ue = Symbol.for("react.view_transition"), de = Symbol.for("react.recoverable"), fe = Symbol.iterator;
	function pe(e) {
		return typeof e != "object" || !e ? null : (e = fe && e[fe] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var me = Symbol.for("react.client.reference");
	function he(e) {
		if (e == null) return null;
		if (typeof e == "function") return e.$$typeof === me ? null : e.displayName || e.name || null;
		if (typeof e == "string") return e;
		switch (e) {
			case j: return "Fragment";
			case ee: return "Profiler";
			case M: return "StrictMode";
			case re: return "Suspense";
			case ie: return "SuspenseList";
			case se: return "Activity";
			case ue: return "ViewTransition";
		}
		if (typeof e == "object") switch (e.$$typeof) {
			case A: return "Portal";
			case ne: return e.displayName || "Context";
			case te: return (e._context.displayName || "Context") + ".Consumer";
			case N:
				var t = e.render;
				return e = e.displayName, e ||= (e = t.displayName || t.name || "", e === "" ? "ForwardRef" : "ForwardRef(" + e + ")"), e;
			case ae: return t = e.displayName || null, t === null ? he(e.type) || "Memo" : t;
			case oe:
				t = e._payload, e = e._init;
				try {
					return he(e(t));
				} catch {}
		}
		return null;
	}
	var ge = Array.isArray, P = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, _e = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, ve = {
		pending: !1,
		data: null,
		method: null,
		action: null
	}, ye = [], be = -1;
	function xe(e) {
		return { current: e };
	}
	function Se(e) {
		0 > be || (e.current = ye[be], ye[be] = null, be--);
	}
	function Ce(e, t) {
		be++, ye[be] = e.current, e.current = t;
	}
	var we = xe(null), Te = xe(null), Ee = xe(null), De = xe(null);
	function Oe(e, t) {
		switch (Ce(Ee, t), Ce(Te, e), Ce(we, null), t.nodeType) {
			case 9:
			case 11:
				e = (e = t.documentElement) && (e = e.namespaceURI) ? up(e) : 0;
				break;
			default: if (e = t.tagName, t = t.namespaceURI) t = up(t), e = dp(t, e);
			else switch (e) {
				case "svg":
					e = 1;
					break;
				case "math":
					e = 2;
					break;
				default: e = 0;
			}
		}
		Se(we), Ce(we, e);
	}
	function ke() {
		Se(we), Se(Te), Se(Ee);
	}
	function Ae(e) {
		var t = e.memoizedState;
		t !== null && (sh._currentValue = t.memoizedState, Ce(De, e)), t = we.current;
		var n = dp(t, e.type);
		t !== n && (Ce(Te, e), Ce(we, n));
	}
	function je(e) {
		Te.current === e && (Se(we), Se(Te)), De.current === e && (Se(De), sh._currentValue = ve);
	}
	var Me, Ne;
	function F(e) {
		if (Me === void 0) try {
			throw Error();
		} catch (e) {
			var t = e.stack.trim().match(/\n( *(at )?)/);
			Me = t && t[1] || "", Ne = -1 < e.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
		}
		return "\n" + Me + e + Ne;
	}
	var Pe = !1;
	function Fe(e, t) {
		if (!e || Pe) return "";
		Pe = !0;
		var n = Error.prepareStackTrace;
		Error.prepareStackTrace = void 0;
		try {
			var r = { DetermineComponentFrameRoot: function() {
				try {
					if (t) {
						var n = function() {
							throw Error();
						};
						if (Object.defineProperty(n.prototype, "props", { set: function() {
							throw Error();
						} }), typeof Reflect == "object" && Reflect.construct) {
							try {
								Reflect.construct(n, []);
							} catch (e) {
								var r = e;
							}
							Reflect.construct(e, [], n);
						} else {
							try {
								n.call();
							} catch (e) {
								r = e;
							}
							n = !1;
							try {
								var i = Object.getOwnPropertyDescriptor(e.prototype, "props");
								Object.defineProperty(e.prototype, "props", {
									configurable: !0,
									set: function() {
										throw Error();
									}
								}), n = !0, new e();
							} finally {
								n && (i === void 0 ? delete e.prototype.props : Object.defineProperty(e.prototype, "props", i));
							}
						}
					} else {
						try {
							throw Error();
						} catch (e) {
							r = e;
						}
						(n = e()) && typeof n.catch == "function" && n.catch(function() {});
					}
				} catch (e) {
					if (e && r && typeof e.stack == "string") return [e.stack, r.stack];
				}
				return [null, null];
			} };
			r.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
			var i = Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot, "name");
			i && i.configurable && Object.defineProperty(r.DetermineComponentFrameRoot, "name", { value: "DetermineComponentFrameRoot" });
			var a = r.DetermineComponentFrameRoot(), o = a[0], s = a[1];
			if (o && s) {
				var c = o.split("\n"), l = s.split("\n");
				for (i = r = 0; r < c.length && !c[r].includes("DetermineComponentFrameRoot");) r++;
				for (; i < l.length && !l[i].includes("DetermineComponentFrameRoot");) i++;
				if (r === c.length || i === l.length) for (r = c.length - 1, i = l.length - 1; 1 <= r && 0 <= i && c[r] !== l[i];) i--;
				for (; 1 <= r && 0 <= i; r--, i--) if (c[r] !== l[i]) {
					if (r !== 1 || i !== 1) do
						if (r--, i--, 0 > i || c[r] !== l[i]) {
							var u = "\n" + c[r].replace(" at new ", " at ");
							return e.displayName && u.includes("<anonymous>") && (u = u.replace("<anonymous>", e.displayName)), u;
						}
					while (1 <= r && 0 <= i);
					break;
				}
			}
		} finally {
			Pe = !1, Error.prepareStackTrace = n;
		}
		return (n = e ? e.displayName || e.name : "") ? F(n) : "";
	}
	function Ie(e, t) {
		switch (e.tag) {
			case 26:
			case 27:
			case 5: return F(e.type);
			case 16: return F("Lazy");
			case 13: return e.child !== t && t !== null ? F("Suspense Fallback") : F("Suspense");
			case 19: return F("SuspenseList");
			case 0:
			case 15: return Fe(e.type, !1);
			case 11: return Fe(e.type.render, !1);
			case 1: return Fe(e.type, !0);
			case 31: return F("Activity");
			case 30: return F("ViewTransition");
			default: return "";
		}
	}
	function Le(e) {
		try {
			var t = "", n = null;
			do
				t += Ie(e, n), n = e, e = e.return;
			while (e);
			return t;
		} catch (e) {
			return "\nError generating stack: " + e.message + "\n" + e.stack;
		}
	}
	var Re = Object.prototype.hasOwnProperty, ze = t.unstable_scheduleCallback, Be = t.unstable_cancelCallback, Ve = t.unstable_shouldYield, He = t.unstable_requestPaint, Ue = t.unstable_now, We = t.unstable_getCurrentPriorityLevel, I = t.unstable_ImmediatePriority, Ge = t.unstable_UserBlockingPriority, Ke = t.unstable_NormalPriority, qe = t.unstable_LowPriority, Je = t.unstable_IdlePriority, Ye = t.log, Xe = t.unstable_setDisableYieldValue, Ze = null, L = null;
	function Qe(e) {
		if (typeof Ye == "function" && Xe(e), L && typeof L.setStrictMode == "function") try {
			L.setStrictMode(Ze, e);
		} catch {}
	}
	var $e = Math.clz32 ? Math.clz32 : nt, et = Math.log, tt = Math.LN2;
	function nt(e) {
		return e >>>= 0, e === 0 ? 32 : 31 - (et(e) / tt | 0) | 0;
	}
	var rt = 256, it = 262144, at = 4194304;
	function ot(e) {
		var t = e & 42;
		if (t !== 0) return t;
		switch (e & -e) {
			case 1: return 1;
			case 2: return 2;
			case 4: return 4;
			case 8: return 8;
			case 16: return 16;
			case 32: return 32;
			case 64: return 64;
			case 128: return 128;
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072: return e & -e;
			case 262144:
			case 524288:
			case 1048576:
			case 2097152: return e & 3932160;
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432: return e & 62914560;
			case 67108864: return 67108864;
			case 134217728: return 134217728;
			case 268435456: return 268435456;
			case 536870912: return 536870912;
			case 1073741824: return 0;
			default: return e;
		}
	}
	function st(e, t, n) {
		var r = e.pendingLanes;
		if (r === 0) return 0;
		var i = 0, a = e.suspendedLanes, o = e.pingedLanes;
		e = e.warmLanes;
		var s = r & 134217727;
		return s === 0 ? (s = r & ~a, s === 0 ? o === 0 ? n || (n = r & ~e, n !== 0 && (i = ot(n))) : i = ot(o) : i = ot(s)) : (r = s & ~a, r === 0 ? (o &= s, o === 0 ? n || (n = s & ~e, n !== 0 && (i = ot(n))) : i = ot(o)) : i = ot(r)), i === 0 ? 0 : t !== 0 && t !== i && (t & a) === 0 && (a = i & -i, n = t & -t, a >= n || a === 32 && n & 4194048) ? t : i;
	}
	function ct(e, t) {
		return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
	}
	function lt(e, t) {
		t & 8 && (t |= t & 32);
		var n = e.entangledLanes;
		if (n !== 0) for (e = e.entanglements, n &= t; 0 < n;) {
			var r = 31 - $e(n), i = 1 << r;
			t |= e[r], n &= ~i;
		}
		return t;
	}
	function ut(e, t) {
		switch (e) {
			case 1:
			case 2:
			case 4:
			case 8:
			case 64: return t + 250;
			case 16:
			case 32:
			case 128:
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072:
			case 262144:
			case 524288:
			case 1048576:
			case 2097152: return t + 5e3;
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432: return -1;
			case 67108864:
			case 134217728:
			case 268435456:
			case 536870912:
			case 1073741824: return -1;
			default: return -1;
		}
	}
	function dt() {
		var e = at;
		return at <<= 1, !(at & 62914560) && (at = 4194304), e;
	}
	function ft(e) {
		for (var t = [], n = 0; 31 > n; n++) t.push(e);
		return t;
	}
	function pt(e, t) {
		e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
	}
	function mt(e, t, n, r, i, a) {
		var o = e.pendingLanes;
		e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= n, e.entangledLanes &= n, e.errorRecoveryDisabledLanes &= n, e.shellSuspendCounter = 0;
		var s = e.entanglements, c = e.expirationTimes, l = e.hiddenUpdates;
		for (n = o & ~n; 0 < n;) {
			var u = 31 - $e(n), d = 1 << u;
			s[u] = 0, c[u] = -1;
			var f = l[u];
			if (f !== null) for (l[u] = null, u = 0; u < f.length; u++) {
				var p = f[u];
				p !== null && (p.lane &= -536870913);
			}
			n &= ~d;
		}
		r !== 0 && ht(e, r, 0), a !== 0 && i === 0 && e.tag !== 0 && (e.suspendedLanes |= a & ~(o & ~t));
	}
	function ht(e, t, n) {
		e.pendingLanes |= t, e.suspendedLanes &= ~t;
		var r = 31 - $e(t);
		e.entangledLanes |= t, e.entanglements[r] = e.entanglements[r] | 1073741824 | n & 261930;
	}
	function gt(e, t) {
		var n = e.entangledLanes |= t;
		for (e = e.entanglements; n;) {
			var r = 31 - $e(n), i = 1 << r;
			i & t | e[r] & t && (e[r] |= t), n &= ~i;
		}
	}
	function _t(e, t) {
		var n = t & -t;
		return n = n & 42 ? 1 : vt(n), (n & (e.suspendedLanes | t)) === 0 ? n : 0;
	}
	function vt(e) {
		switch (e) {
			case 2:
				e = 1;
				break;
			case 8:
				e = 4;
				break;
			case 32:
				e = 16;
				break;
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072:
			case 262144:
			case 524288:
			case 1048576:
			case 2097152:
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432:
				e = 128;
				break;
			case 268435456:
				e = 134217728;
				break;
			default: e = 0;
		}
		return e;
	}
	function yt(e) {
		return e &= -e, 2 < e ? 8 < e ? e & 134217727 ? 32 : 268435456 : 8 : 2;
	}
	function bt() {
		var e = _e.p;
		return e === 0 ? (e = window.event, e === void 0 ? 32 : Ch(e.type)) : e;
	}
	function xt(e, t) {
		var n = _e.p;
		try {
			return _e.p = e, t();
		} finally {
			_e.p = n;
		}
	}
	var St = Math.random().toString(36).slice(2), Ct = "__reactFiber$" + St, R = "__reactProps$" + St, wt = "__reactContainer$" + St, Tt = "__reactEvents$" + St, z = "__reactListeners$" + St, Et = "__reactHandles$" + St, Dt = "__reactResources$" + St, Ot = "__reactMarker$" + St, kt = "__reactLoad$" + St;
	function At(e) {
		delete e[Ct], delete e[R], delete e[z], delete e[Et];
	}
	function jt(e) {
		var t;
		if (t = e[Ct]) return t;
		for (var n = e.parentNode; n;) {
			if (t = n[wt] || n[Ct]) {
				if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = fm(e); e !== null;) {
					if (n = e[Ct]) return n;
					e = fm(e);
				}
				return t;
			}
			e = n, n = e.parentNode;
		}
		return null;
	}
	function Mt(e) {
		if (e = e[Ct] || e[wt]) {
			var t = e.tag;
			if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e;
		}
		return null;
	}
	function Nt(e) {
		var t = e.tag;
		if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
		throw Error(i(33));
	}
	function Pt(e) {
		var t = e[Dt];
		return t ||= e[Dt] = {
			hoistableStyles: /* @__PURE__ */ new Map(),
			hoistableScripts: /* @__PURE__ */ new Map()
		}, t;
	}
	function Ft(e) {
		e[Ot] = !0;
	}
	function B(e) {
		e[kt] = void 0;
	}
	var It = /* @__PURE__ */ new Set(), Lt = {};
	function Rt(e, t) {
		zt(e, t), zt(e + "Capture", t);
	}
	function zt(e, t) {
		for (Lt[e] = t, e = 0; e < t.length; e++) It.add(t[e]);
	}
	var Bt = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), Vt = {}, Ht = {};
	function Ut(e) {
		return Re.call(Ht, e) ? !0 : Re.call(Vt, e) ? !1 : Bt.test(e) ? Ht[e] = !0 : (Vt[e] = !0, !1);
	}
	var Wt = !1;
	function Gt() {
		var e = Wt;
		return Wt = !1, e;
	}
	function Kt(e, t, n) {
		if (Ut(t)) {
			if (n === null) e.removeAttribute(t);
			else {
				switch (typeof n) {
					case "undefined":
					case "function":
					case "symbol":
						e.removeAttribute(t);
						return;
					case "boolean":
						var r = t.toLowerCase().slice(0, 5);
						if (r !== "data-" && r !== "aria-") {
							e.removeAttribute(t);
							return;
						}
				}
				e.setAttribute(t, n);
			}
		}
	}
	function qt(e, t, n) {
		if (n === null) e.removeAttribute(t);
		else {
			switch (typeof n) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean":
					e.removeAttribute(t);
					return;
			}
			e.setAttribute(t, n);
		}
	}
	function Jt(e, t, n, r) {
		if (r === null) e.removeAttribute(n);
		else {
			switch (typeof r) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean":
					e.removeAttribute(n);
					return;
			}
			e.setAttributeNS(t, n, r);
		}
	}
	function Yt(e) {
		switch (typeof e) {
			case "bigint":
			case "boolean":
			case "number":
			case "string":
			case "undefined": return e;
			case "object": return e;
			default: return "";
		}
	}
	function Xt(e) {
		var t = e.type;
		return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
	}
	function Zt(e, t, n) {
		var r = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
		if (!e.hasOwnProperty(t) && r !== void 0 && typeof r.get == "function" && typeof r.set == "function") {
			var i = r.get, a = r.set;
			return Object.defineProperty(e, t, {
				configurable: !0,
				get: function() {
					return i.call(this);
				},
				set: function(e) {
					n = "" + e, a.call(this, e);
				}
			}), Object.defineProperty(e, t, { enumerable: r.enumerable }), {
				getValue: function() {
					return n;
				},
				setValue: function(e) {
					n = "" + e;
				},
				stopTracking: function() {
					e._valueTracker = null, delete e[t];
				}
			};
		}
	}
	function Qt(e) {
		if (!e._valueTracker) {
			var t = Xt(e) ? "checked" : "value";
			e._valueTracker = Zt(e, t, "" + e[t]);
		}
	}
	function $t(e) {
		if (!e) return !1;
		var t = e._valueTracker;
		if (!t) return !0;
		var n = t.getValue(), r = "";
		return e && (r = Xt(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n && (t.setValue(e), !0);
	}
	var en = /[\n"\\]/g;
	function tn(e) {
		return e.replace(en, function(e) {
			return "\\" + e.charCodeAt(0).toString(16) + " ";
		});
	}
	function nn(e, t, n, r, i, a, o, s) {
		e.name = "", o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" ? e.type = o : e.removeAttribute("type"), t == null ? o !== "submit" && o !== "reset" || e.removeAttribute("value") : o === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + Yt(t)) : e.value !== "" + Yt(t) && (e.value = "" + Yt(t)), t == null ? n == null ? r != null && e.removeAttribute("value") : an(e, Yt(n)) : o === "number" && e.value == t ? an(e, Yt(e.value)) : an(e, Yt(t)), i == null && a != null && (e.defaultChecked = !!a), i != null && (e.checked = i && typeof i != "function" && typeof i != "symbol"), s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" ? e.name = "" + Yt(s) : e.removeAttribute("name");
	}
	function rn(e, t, n, r, i, a, o, s) {
		if (a != null && typeof a != "function" && typeof a != "symbol" && typeof a != "boolean" && (e.type = a), t != null || n != null) {
			if (!(a !== "submit" && a !== "reset" || t != null)) {
				Qt(e);
				return;
			}
			n = n == null ? "" : "" + Yt(n), t = t == null ? n : "" + Yt(t), s || t === e.value || (e.value = t), e.defaultValue = t;
		}
		r ??= i, r = typeof r != "function" && typeof r != "symbol" && !!r, e.checked = s ? e.checked : !!r, e.defaultChecked = !!r, o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" && (e.name = o), Qt(e);
	}
	function an(e, t) {
		e.defaultValue !== "" + t && (e.defaultValue = "" + t);
	}
	function on(e, t, n, r) {
		if (e = e.options, t) {
			t = {};
			for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
			for (n = 0; n < e.length; n++) i = t.hasOwnProperty("$" + e[n].value), e[n].selected !== i && (e[n].selected = i), i && r && (e[n].defaultSelected = !0);
		} else {
			for (n = "" + Yt(n), t = null, i = 0; i < e.length; i++) {
				if (e[i].value === n) {
					e[i].selected = !0, r && (e[i].defaultSelected = !0);
					return;
				}
				t !== null || e[i].disabled || (t = e[i]);
			}
			t !== null && (t.selected = !0);
		}
	}
	function V(e, t, n) {
		t != null && (t = "" + Yt(t), t !== e.value && (e.value = t), n == null) ? e.defaultValue !== t && (e.defaultValue = t) : e.defaultValue = n == null ? "" : "" + Yt(n);
	}
	function sn(e, t, n, r) {
		if (t == null) {
			if (r != null) {
				if (n != null) throw Error(i(92));
				if (ge(r)) {
					if (1 < r.length) throw Error(i(93));
					r = r[0];
				}
				n = r;
			}
			n ??= "", t = n;
		}
		n = Yt(t), e.defaultValue = n, r = e.textContent, r === n && r !== "" && r !== null && (e.value = r), Qt(e);
	}
	function cn(e, t) {
		if (t) {
			var n = e.firstChild;
			if (n && n === e.lastChild && n.nodeType === 3) {
				n.nodeValue = t;
				return;
			}
		}
		e.textContent = t;
	}
	var ln = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));
	function un(e, t, n) {
		var r = t.indexOf("--") === 0;
		n == null || typeof n == "boolean" || n === "" ? r ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : r ? e.setProperty(t, n) : typeof n != "number" || n === 0 || ln.has(t) ? t === "float" ? e.cssFloat = n : e[t] = ("" + n).trim() : e[t] = n + "px";
	}
	function dn(e, t, n) {
		if (t != null && typeof t != "object") throw Error(i(62));
		if (e = e.style, n != null) {
			for (var r in n) !n.hasOwnProperty(r) || t != null && t.hasOwnProperty(r) || (r.indexOf("--") === 0 ? e.setProperty(r, "") : r === "float" ? e.cssFloat = "" : e[r] = "", Wt = !0);
			for (var a in t) r = t[a], t.hasOwnProperty(a) && n[a] !== r && (un(e, a, r), Wt = !0);
		} else for (var o in t) t.hasOwnProperty(o) && un(e, o, t[o]);
	}
	function fn(e) {
		if (e.indexOf("-") === -1) return !1;
		switch (e) {
			case "annotation-xml":
			case "color-profile":
			case "font-face":
			case "font-face-src":
			case "font-face-uri":
			case "font-face-format":
			case "font-face-name":
			case "missing-glyph": return !1;
			default: return !0;
		}
	}
	var pn = /* @__PURE__ */ new Map([
		["acceptCharset", "accept-charset"],
		["htmlFor", "for"],
		["httpEquiv", "http-equiv"],
		["crossOrigin", "crossorigin"],
		["accentHeight", "accent-height"],
		["alignmentBaseline", "alignment-baseline"],
		["arabicForm", "arabic-form"],
		["baselineShift", "baseline-shift"],
		["capHeight", "cap-height"],
		["clipPath", "clip-path"],
		["clipRule", "clip-rule"],
		["colorInterpolation", "color-interpolation"],
		["colorInterpolationFilters", "color-interpolation-filters"],
		["colorProfile", "color-profile"],
		["colorRendering", "color-rendering"],
		["dominantBaseline", "dominant-baseline"],
		["enableBackground", "enable-background"],
		["fillOpacity", "fill-opacity"],
		["fillRule", "fill-rule"],
		["floodColor", "flood-color"],
		["floodOpacity", "flood-opacity"],
		["fontFamily", "font-family"],
		["fontSize", "font-size"],
		["fontSizeAdjust", "font-size-adjust"],
		["fontStretch", "font-stretch"],
		["fontStyle", "font-style"],
		["fontVariant", "font-variant"],
		["fontWeight", "font-weight"],
		["glyphName", "glyph-name"],
		["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
		["glyphOrientationVertical", "glyph-orientation-vertical"],
		["horizAdvX", "horiz-adv-x"],
		["horizOriginX", "horiz-origin-x"],
		["imageRendering", "image-rendering"],
		["letterSpacing", "letter-spacing"],
		["lightingColor", "lighting-color"],
		["markerEnd", "marker-end"],
		["markerMid", "marker-mid"],
		["markerStart", "marker-start"],
		["maskType", "mask-type"],
		["overlinePosition", "overline-position"],
		["overlineThickness", "overline-thickness"],
		["paintOrder", "paint-order"],
		["panose-1", "panose-1"],
		["pointerEvents", "pointer-events"],
		["renderingIntent", "rendering-intent"],
		["shapeRendering", "shape-rendering"],
		["stopColor", "stop-color"],
		["stopOpacity", "stop-opacity"],
		["strikethroughPosition", "strikethrough-position"],
		["strikethroughThickness", "strikethrough-thickness"],
		["strokeDasharray", "stroke-dasharray"],
		["strokeDashoffset", "stroke-dashoffset"],
		["strokeLinecap", "stroke-linecap"],
		["strokeLinejoin", "stroke-linejoin"],
		["strokeMiterlimit", "stroke-miterlimit"],
		["strokeOpacity", "stroke-opacity"],
		["strokeWidth", "stroke-width"],
		["textAnchor", "text-anchor"],
		["textDecoration", "text-decoration"],
		["textRendering", "text-rendering"],
		["transformOrigin", "transform-origin"],
		["underlinePosition", "underline-position"],
		["underlineThickness", "underline-thickness"],
		["unicodeBidi", "unicode-bidi"],
		["unicodeRange", "unicode-range"],
		["unitsPerEm", "units-per-em"],
		["vAlphabetic", "v-alphabetic"],
		["vHanging", "v-hanging"],
		["vIdeographic", "v-ideographic"],
		["vMathematical", "v-mathematical"],
		["vectorEffect", "vector-effect"],
		["vertAdvY", "vert-adv-y"],
		["vertOriginX", "vert-origin-x"],
		["vertOriginY", "vert-origin-y"],
		["wordSpacing", "word-spacing"],
		["writingMode", "writing-mode"],
		["xmlnsXlink", "xmlns:xlink"],
		["xHeight", "x-height"]
	]), mn = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
	function hn(e) {
		return mn.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
	}
	function gn() {}
	var _n = null;
	function vn(e) {
		return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
	}
	var yn = null, H = null;
	function bn(e) {
		var t = Mt(e);
		if (t && (e = t.stateNode)) {
			var n = e[R] || null;
			a: switch (e = t.stateNode, t.type) {
				case "input":
					if (nn(e, n.value, n.defaultValue, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name), t = n.name, n.type === "radio" && t != null) {
						for (n = e; n.parentNode;) n = n.parentNode;
						for (n = n.querySelectorAll("input[name=\"" + tn("" + t) + "\"][type=\"radio\"]"), t = 0; t < n.length; t++) {
							var r = n[t];
							if (r !== e && r.form === e.form) {
								var a = r[R] || null;
								if (!a) throw Error(i(90));
								nn(r, a.value, a.defaultValue, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name);
							}
						}
						for (t = 0; t < n.length; t++) r = n[t], r.form === e.form && $t(r);
					}
					break a;
				case "textarea":
					V(e, n.value, n.defaultValue);
					break a;
				case "select": t = n.value, t != null && on(e, !!n.multiple, t, !1);
			}
		}
	}
	var xn = !1;
	function Sn(e, t, n) {
		if (xn) return e(t, n);
		xn = !0;
		try {
			return e(t);
		} finally {
			if (xn = !1, (yn !== null || H !== null) && (Ld(), yn && (t = yn, e = H, H = yn = null, bn(t), e))) for (t = 0; t < e.length; t++) bn(e[t]);
		}
	}
	function Cn(e, t) {
		var n = e.stateNode;
		if (n === null) return null;
		var r = n[R] || null;
		if (r === null) return null;
		n = r[t];
		a: switch (t) {
			case "onClick":
			case "onClickCapture":
			case "onDoubleClick":
			case "onDoubleClickCapture":
			case "onMouseDown":
			case "onMouseDownCapture":
			case "onMouseMove":
			case "onMouseMoveCapture":
			case "onMouseUp":
			case "onMouseUpCapture":
			case "onMouseEnter":
				(r = !r.disabled) || (e = e.type, r = e !== "button" && e !== "input" && e !== "select" && e !== "textarea"), e = !r;
				break a;
			default: e = !1;
		}
		if (e) return null;
		if (n && typeof n != "function") throw Error(i(231, t, typeof n));
		return n;
	}
	var wn = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, Tn = !1;
	if (wn) try {
		var En = {};
		Object.defineProperty(En, "passive", { get: function() {
			Tn = !0;
		} }), window.addEventListener("test", En, En), window.removeEventListener("test", En, En);
	} catch {
		Tn = !1;
	}
	var Dn = null, On = null, U = null;
	function kn() {
		if (U) return U;
		var e, t = On, n = t.length, r, i = "value" in Dn ? Dn.value : Dn.textContent, a = i.length;
		for (e = 0; e < n && t[e] === i[e]; e++);
		var o = n - e;
		for (r = 1; r <= o && t[n - r] === i[a - r]; r++);
		return U = i.slice(e, 1 < r ? 1 - r : void 0);
	}
	function W(e) {
		var t = e.keyCode;
		return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
	}
	function An() {
		return !0;
	}
	function jn() {
		return !1;
	}
	function Mn(e) {
		function t(t, n, r, i, a) {
			for (var o in this._reactName = t, this._targetInst = r, this.type = n, this.nativeEvent = i, this.target = a, this.currentTarget = null, e) e.hasOwnProperty(o) && (t = e[o], this[o] = t ? t(i) : i[o]);
			return this.isDefaultPrevented = (i.defaultPrevented == null ? !1 === i.returnValue : i.defaultPrevented) ? An : jn, this.isPropagationStopped = jn, this;
		}
		return D(t.prototype, {
			preventDefault: function() {
				this.defaultPrevented = !0;
				var e = this.nativeEvent;
				e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = An);
			},
			stopPropagation: function() {
				var e = this.nativeEvent;
				e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = An);
			},
			persist: function() {},
			isPersistent: An
		}), t;
	}
	var Nn = {
		eventPhase: 0,
		bubbles: 0,
		cancelable: 0,
		timeStamp: function(e) {
			return e.timeStamp || Date.now();
		},
		defaultPrevented: 0,
		isTrusted: 0
	}, Pn = Mn(Nn), Fn = D({}, Nn, {
		view: 0,
		detail: 0
	}), In = Mn(Fn), Ln, Rn, zn, Bn = D({}, Fn, {
		screenX: 0,
		screenY: 0,
		clientX: 0,
		clientY: 0,
		pageX: 0,
		pageY: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		getModifierState: Zn,
		button: 0,
		buttons: 0,
		relatedTarget: function(e) {
			return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
		},
		movementX: function(e) {
			return "movementX" in e ? e.movementX : (e !== zn && (zn && e.type === "mousemove" ? (Ln = e.screenX - zn.screenX, Rn = e.screenY - zn.screenY) : Rn = Ln = 0, zn = e), Ln);
		},
		movementY: function(e) {
			return "movementY" in e ? e.movementY : Rn;
		}
	}), Vn = Mn(Bn), Hn = Mn(D({}, Bn, { dataTransfer: 0 })), Un = Mn(D({}, Fn, { relatedTarget: 0 })), Wn = Mn(D({}, Nn, {
		animationName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), Gn = Mn(D({}, Nn, { clipboardData: function(e) {
		return "clipboardData" in e ? e.clipboardData : window.clipboardData;
	} })), Kn = Mn(D({}, Nn, { data: 0 })), qn = {
		Esc: "Escape",
		Spacebar: " ",
		Left: "ArrowLeft",
		Up: "ArrowUp",
		Right: "ArrowRight",
		Down: "ArrowDown",
		Del: "Delete",
		Win: "OS",
		Menu: "ContextMenu",
		Apps: "ContextMenu",
		Scroll: "ScrollLock",
		MozPrintableKey: "Unidentified"
	}, Jn = {
		8: "Backspace",
		9: "Tab",
		12: "Clear",
		13: "Enter",
		16: "Shift",
		17: "Control",
		18: "Alt",
		19: "Pause",
		20: "CapsLock",
		27: "Escape",
		32: " ",
		33: "PageUp",
		34: "PageDown",
		35: "End",
		36: "Home",
		37: "ArrowLeft",
		38: "ArrowUp",
		39: "ArrowRight",
		40: "ArrowDown",
		45: "Insert",
		46: "Delete",
		112: "F1",
		113: "F2",
		114: "F3",
		115: "F4",
		116: "F5",
		117: "F6",
		118: "F7",
		119: "F8",
		120: "F9",
		121: "F10",
		122: "F11",
		123: "F12",
		144: "NumLock",
		145: "ScrollLock",
		224: "Meta"
	}, Yn = {
		Alt: "altKey",
		Control: "ctrlKey",
		Meta: "metaKey",
		Shift: "shiftKey"
	};
	function Xn(e) {
		var t = this.nativeEvent;
		return t.getModifierState ? t.getModifierState(e) : (e = Yn[e]) ? !!t[e] : !1;
	}
	function Zn() {
		return Xn;
	}
	var Qn = Mn(D({}, Fn, {
		key: function(e) {
			if (e.key) {
				var t = qn[e.key] || e.key;
				if (t !== "Unidentified") return t;
			}
			return e.type === "keypress" ? (e = W(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Jn[e.keyCode] || "Unidentified" : "";
		},
		code: 0,
		location: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		repeat: 0,
		locale: 0,
		getModifierState: Zn,
		charCode: function(e) {
			return e.type === "keypress" ? W(e) : 0;
		},
		keyCode: function(e) {
			return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		},
		which: function(e) {
			return e.type === "keypress" ? W(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		}
	})), $n = Mn(D({}, Bn, {
		pointerId: 0,
		width: 0,
		height: 0,
		pressure: 0,
		tangentialPressure: 0,
		tiltX: 0,
		tiltY: 0,
		twist: 0,
		pointerType: 0,
		isPrimary: 0
	})), er = Mn(D({}, Nn, { submitter: 0 })), tr = Mn(D({}, Fn, {
		touches: 0,
		targetTouches: 0,
		changedTouches: 0,
		altKey: 0,
		metaKey: 0,
		ctrlKey: 0,
		shiftKey: 0,
		getModifierState: Zn
	})), nr = Mn(D({}, Nn, {
		propertyName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), rr = Mn(D({}, Bn, {
		deltaX: function(e) {
			return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
		},
		deltaY: function(e) {
			return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
		},
		deltaZ: 0,
		deltaMode: 0
	})), ir = Mn(D({}, Nn, {
		newState: 0,
		oldState: 0,
		source: 0
	})), ar = [
		9,
		13,
		27,
		32
	], or = wn && "CompositionEvent" in window, sr = null;
	wn && "documentMode" in document && (sr = document.documentMode);
	var cr = wn && "TextEvent" in window && !sr, lr = wn && (!or || sr && 8 < sr && 11 >= sr), ur = " ", dr = !1;
	function fr(e, t) {
		switch (e) {
			case "keyup": return ar.indexOf(t.keyCode) !== -1;
			case "keydown": return t.keyCode !== 229;
			case "keypress":
			case "mousedown":
			case "focusout": return !0;
			default: return !1;
		}
	}
	function pr(e) {
		return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
	}
	var mr = !1;
	function hr(e, t) {
		switch (e) {
			case "compositionend": return pr(t);
			case "keypress": return t.which === 32 ? (dr = !0, ur) : null;
			case "textInput": return e = t.data, e === ur && dr ? null : e;
			default: return null;
		}
	}
	function gr(e, t) {
		if (mr) return e === "compositionend" || !or && fr(e, t) ? (e = kn(), U = On = Dn = null, mr = !1, e) : null;
		switch (e) {
			case "paste": return null;
			case "keypress":
				if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
					if (t.char && 1 < t.char.length) return t.char;
					if (t.which) return String.fromCharCode(t.which);
				}
				return null;
			case "compositionend": return lr && t.locale !== "ko" ? null : t.data;
			default: return null;
		}
	}
	var _r = {
		color: !0,
		date: !0,
		datetime: !0,
		"datetime-local": !0,
		email: !0,
		month: !0,
		number: !0,
		password: !0,
		range: !0,
		search: !0,
		tel: !0,
		text: !0,
		time: !0,
		url: !0,
		week: !0
	};
	function vr(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t === "input" ? !!_r[e.type] : t === "textarea";
	}
	function yr(e, t, n, r) {
		yn ? H ? H.push(r) : H = [r] : yn = r, t = qf(t, "onChange"), 0 < t.length && (n = new Pn("onChange", "change", null, n, r), e.push({
			event: n,
			listeners: t
		}));
	}
	var br = null, xr = null;
	function Sr(e) {
		Bf(e, 0);
	}
	function Cr(e) {
		if ($t(Nt(e))) return e;
	}
	function wr(e, t) {
		if (e === "change") return t;
	}
	var Tr = !1;
	if (wn) {
		var Er;
		if (wn) {
			var Dr = "oninput" in document;
			if (!Dr) {
				var Or = document.createElement("div");
				Or.setAttribute("oninput", "return;"), Dr = typeof Or.oninput == "function";
			}
			Er = Dr;
		} else Er = !1;
		Tr = Er && (!document.documentMode || 9 < document.documentMode);
	}
	function kr() {
		br && (br.detachEvent("onpropertychange", Ar), xr = br = null);
	}
	function Ar(e) {
		if (e.propertyName === "value" && Cr(xr)) {
			var t = [];
			yr(t, xr, e, vn(e)), Sn(Sr, t);
		}
	}
	function jr(e, t, n) {
		e === "focusin" ? (kr(), br = t, xr = n, br.attachEvent("onpropertychange", Ar)) : e === "focusout" && kr();
	}
	function Mr(e) {
		if (e === "selectionchange" || e === "keyup" || e === "keydown") return Cr(xr);
	}
	function Nr(e, t) {
		if (e === "click") return Cr(t);
	}
	function Pr(e, t) {
		if (e === "input" || e === "change") return Cr(t);
	}
	function Fr(e, t) {
		return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t;
	}
	var Ir = typeof Object.is == "function" ? Object.is : Fr;
	function Lr(e, t) {
		if (Ir(e, t)) return !0;
		if (typeof e != "object" || !e || typeof t != "object" || !t) return !1;
		var n = Object.keys(e), r = Object.keys(t);
		if (n.length !== r.length) return !1;
		for (r = 0; r < n.length; r++) {
			var i = n[r];
			if (!Re.call(t, i) || !Ir(e[i], t[i])) return !1;
		}
		return !0;
	}
	function Rr(e) {
		if (e ||= typeof document < "u" ? document : void 0, e === void 0) return null;
		try {
			return e.activeElement || e.body;
		} catch {
			return e.body;
		}
	}
	function zr(e) {
		for (; e && e.firstChild;) e = e.firstChild;
		return e;
	}
	function Br(e, t) {
		var n = zr(e);
		e = 0;
		for (var r; n;) {
			if (n.nodeType === 3) {
				if (r = e + n.textContent.length, e <= t && r >= t) return {
					node: n,
					offset: t - e
				};
				e = r;
			}
			a: {
				for (; n;) {
					if (n.nextSibling) {
						n = n.nextSibling;
						break a;
					}
					n = n.parentNode;
				}
				n = void 0;
			}
			n = zr(n);
		}
	}
	function Vr(e, t) {
		return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Vr(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
	}
	function Hr(e) {
		e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
		for (var t = Rr(e.document); t instanceof e.HTMLIFrameElement;) {
			try {
				var n = typeof t.contentWindow.location.href == "string";
			} catch {
				n = !1;
			}
			if (n) e = t.contentWindow;
			else break;
			t = Rr(e.document);
		}
		return t;
	}
	function G(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
	}
	var Ur = wn && "documentMode" in document && 11 >= document.documentMode, Wr = null, Gr = null, Kr = null, qr = !1;
	function Jr(e, t, n) {
		var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
		qr || Wr == null || Wr !== Rr(r) || (r = Wr, "selectionStart" in r && G(r) ? r = {
			start: r.selectionStart,
			end: r.selectionEnd
		} : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
			anchorNode: r.anchorNode,
			anchorOffset: r.anchorOffset,
			focusNode: r.focusNode,
			focusOffset: r.focusOffset
		}), Kr && Lr(Kr, r) || (Kr = r, r = qf(Gr, "onSelect"), 0 < r.length && (t = new Pn("onSelect", "select", null, t, n), e.push({
			event: t,
			listeners: r
		}), t.target = Wr)));
	}
	function Yr(e, t) {
		var n = {};
		return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
	}
	var Xr = {
		animationend: Yr("Animation", "AnimationEnd"),
		animationiteration: Yr("Animation", "AnimationIteration"),
		animationstart: Yr("Animation", "AnimationStart"),
		transitionrun: Yr("Transition", "TransitionRun"),
		transitionstart: Yr("Transition", "TransitionStart"),
		transitioncancel: Yr("Transition", "TransitionCancel"),
		transitionend: Yr("Transition", "TransitionEnd")
	}, Zr = {}, Qr = {};
	wn && (Qr = document.createElement("div").style, "AnimationEvent" in window || (delete Xr.animationend.animation, delete Xr.animationiteration.animation, delete Xr.animationstart.animation), "TransitionEvent" in window || delete Xr.transitionend.transition);
	function $r(e) {
		if (Zr[e]) return Zr[e];
		if (!Xr[e]) return e;
		var t = Xr[e], n;
		for (n in t) if (t.hasOwnProperty(n) && n in Qr) return Zr[e] = t[n];
		return e;
	}
	var ei = $r("animationend"), ti = $r("animationiteration"), ni = $r("animationstart"), ri = $r("transitionrun"), ii = $r("transitionstart"), ai = $r("transitioncancel"), oi = $r("transitionend"), si = /* @__PURE__ */ new Map(), ci = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
	ci.push("scrollEnd");
	function li(e, t) {
		si.set(e, t), Rt(t, [e]);
	}
	var ui = 0;
	function di(e, t) {
		if (e.name != null && e.name !== "auto") return e.name;
		if (t.autoName !== null) return t.autoName;
		e = vd.identifierPrefix;
		var n = ui++;
		return e = "_" + e + "t_" + n.toString(32) + "_", t.autoName = e;
	}
	function fi(e) {
		if (e == null || typeof e == "string") return e;
		var t = null, n = Ed;
		if (n !== null) for (var r = 0; r < n.length; r++) {
			var i = e[n[r]];
			if (i != null) {
				if (i === "none") return "none";
				t = t == null ? i : t + (" " + i);
			}
		}
		return t ?? e.default;
	}
	function pi(e, t) {
		return e = fi(e), t = fi(t), t == null ? e === "auto" ? null : e : t === "auto" ? null : t;
	}
	var mi = typeof reportError == "function" ? reportError : function(e) {
		if (typeof window == "object" && typeof window.ErrorEvent == "function") {
			var t = new window.ErrorEvent("error", {
				bubbles: !0,
				cancelable: !0,
				message: typeof e == "object" && e && typeof e.message == "string" ? String(e.message) : String(e),
				error: e
			});
			if (!window.dispatchEvent(t)) return;
		} else if (typeof process == "object" && typeof process.emit == "function") {
			process.emit("uncaughtException", e);
			return;
		}
		console.error(e);
	}, hi = [], gi = 0, _i = 0;
	function vi() {
		for (var e = gi, t = _i = gi = 0; t < e;) {
			var n = hi[t];
			hi[t++] = null;
			var r = hi[t];
			hi[t++] = null;
			var i = hi[t];
			hi[t++] = null;
			var a = hi[t];
			if (hi[t++] = null, r !== null && i !== null) {
				var o = r.pending;
				o === null ? i.next = i : (i.next = o.next, o.next = i), r.pending = i;
			}
			a !== 0 && Si(n, i, a);
		}
	}
	function yi(e, t, n, r) {
		hi[gi++] = e, hi[gi++] = t, hi[gi++] = n, hi[gi++] = r, _i |= r, e.lanes |= r, e = e.alternate, e !== null && (e.lanes |= r);
	}
	function bi(e, t, n, r) {
		return yi(e, t, n, r), Ci(e);
	}
	function xi(e, t) {
		return yi(e, null, null, t), Ci(e);
	}
	function Si(e, t, n) {
		e.lanes |= n;
		var r = e.alternate;
		r !== null && (r.lanes |= n);
		for (var i = !1, a = e.return; a !== null;) a.childLanes |= n, r = a.alternate, r !== null && (r.childLanes |= n), a.tag === 22 && (e = a.stateNode, e === null || e._visibility & 1 || (i = !0)), e = a, a = a.return;
		return e.tag === 3 ? (a = e.stateNode, i && t !== null && (i = 31 - $e(n), e = a.hiddenUpdates, r = e[i], r === null ? e[i] = [t] : r.push(t), t.lane = n | 536870912), a) : null;
	}
	function Ci(e) {
		if (50 < Dd) throw Dd = 0, Od = null, Error(i(185));
		for (var t = e.return; t !== null;) e = t, t = e.return;
		return e.tag === 3 ? e.stateNode : null;
	}
	var wi = {};
	function Ti(e, t, n, r) {
		this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
	}
	function Ei(e, t, n, r) {
		return new Ti(e, t, n, r);
	}
	function Di(e) {
		return e = e.prototype, !(!e || !e.isReactComponent);
	}
	function Oi(e, t) {
		var n = e.alternate;
		return n === null ? (n = Ei(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 1206910976, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.refCleanup = e.refCleanup, n;
	}
	function ki(e, t) {
		e.flags &= 1206910978;
		var n = e.alternate;
		return n === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type, t = n.dependencies, e.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}), e;
	}
	function Ai(e, t, n, r, a, o) {
		var s = 0;
		if (r = e, typeof r == "function") Di(r) && (s = 1);
		else if (typeof r == "string") s = qm(e, n, we.current) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
		else a: switch (r) {
			case se: return e = Ei(31, n, t, a), e.elementType = se, e.lanes = o, e;
			case j: return ji(n.children, a, o, t);
			case M:
				s = 8, a |= 24;
				break;
			case ee: return e = Ei(12, n, t, a | 2), e.elementType = ee, e.lanes = o, e;
			case re: return e = Ei(13, n, t, a), e.elementType = re, e.lanes = o, e;
			case ie: return e = Ei(19, n, t, a), e.elementType = ie, e.lanes = o, e;
			case ce:
			case ue: return e = a | 32, e = Ei(30, n, t, e), e.elementType = ue, e.lanes = o, e.stateNode = {
				autoName: null,
				paired: null,
				clones: null,
				ref: null
			}, e;
			default:
				if (typeof r == "object" && r) switch (r.$$typeof) {
					case ne:
						s = 10;
						break a;
					case te:
						s = 9;
						break a;
					case N:
						s = 11;
						break a;
					case ae:
						s = 14;
						break a;
					case oe:
						s = 16, r = null;
						break a;
				}
				s = 29, n = Error(i(130, e === null ? "null" : typeof e, "")), r = null;
		}
		return t = Ei(s, n, t, a), t.elementType = e, t.type = r, t.lanes = o, t;
	}
	function ji(e, t, n, r) {
		return e = Ei(7, e, r, t), e.lanes = n, e;
	}
	function Mi(e, t, n) {
		return e = Ei(6, e, null, t), e.lanes = n, e;
	}
	function Ni(e) {
		var t = Ei(18, null, null, 0);
		return t.stateNode = e, t;
	}
	function Pi(e, t, n) {
		return t = Ei(4, e.children === null ? [] : e.children, e.key, t), t.lanes = n, t.stateNode = {
			containerInfo: e.containerInfo,
			pendingChildren: null,
			implementation: e.implementation
		}, t;
	}
	var Fi = /* @__PURE__ */ new WeakMap();
	function Ii(e, t) {
		if (typeof e == "object" && e) {
			var n = Fi.get(e);
			return n === void 0 ? (t = {
				value: e,
				source: t,
				stack: Le(t)
			}, Fi.set(e, t), t) : n;
		}
		return {
			value: e,
			source: t,
			stack: Le(t)
		};
	}
	var Li = [], Ri = 0, zi = null, Bi = 0, Vi = [], Hi = 0, Ui = null, Wi = 1, Gi = "";
	function Ki(e, t) {
		Li[Ri++] = Bi, Li[Ri++] = zi, zi = e, Bi = t;
	}
	function qi(e, t, n) {
		Vi[Hi++] = Wi, Vi[Hi++] = Gi, Vi[Hi++] = Ui, Ui = e;
		var r = Wi;
		e = Gi;
		var i = 32 - $e(r) - 1;
		r &= ~(1 << i), n += 1;
		var a = 32 - $e(t) + i;
		if (30 < a) {
			var o = i - i % 5;
			a = (r & (1 << o) - 1).toString(32), r >>= o, i -= o, Wi = 1 << 32 - $e(t) + i | n << i | r, Gi = a + e;
		} else Wi = 1 << a | n << i | r, Gi = e;
	}
	function Ji(e) {
		e.return !== null && (Ki(e, 1), qi(e, 1, 0));
	}
	function Yi(e) {
		for (; e === zi;) zi = Li[--Ri], Li[Ri] = null, Bi = Li[--Ri], Li[Ri] = null;
		for (; e === Ui;) Ui = Vi[--Hi], Vi[Hi] = null, Gi = Vi[--Hi], Vi[Hi] = null, Wi = Vi[--Hi], Vi[Hi] = null;
	}
	function Xi(e, t) {
		Vi[Hi++] = Wi, Vi[Hi++] = Gi, Vi[Hi++] = Ui, Wi = t.id, Gi = t.overflow, Ui = e;
	}
	var Zi = null, Qi = null, K = !1, $i = null, ea = !1, ta = Error(i(519));
	function na(e) {
		throw ca(Ii(Error(i(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", "")), e)), ta;
	}
	function ra(e) {
		var t = e.stateNode, n = e.type, r = e.memoizedProps;
		switch (t[Ct] = e, t[R] = r, n) {
			case "dialog":
				$("cancel", t), $("close", t);
				break;
			case "iframe":
			case "object":
			case "embed":
				$("load", t);
				break;
			case "video":
			case "audio":
				for (n = 0; n < Rf.length; n++) $(Rf[n], t);
				break;
			case "source":
				$("error", t);
				break;
			case "img":
			case "image":
			case "link":
				$("error", t), $("load", t);
				break;
			case "details":
				$("toggle", t);
				break;
			case "input":
				$("invalid", t), rn(t, r.value, r.defaultValue, r.checked, r.defaultChecked, r.type, r.name, !0);
				break;
			case "select":
				$("invalid", t);
				break;
			case "textarea": $("invalid", t), sn(t, r.value, r.defaultValue, r.children);
		}
		n = r.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || !0 === r.suppressHydrationWarning || $f(t.textContent, n) ? (r.popover != null && ($("beforetoggle", t), $("toggle", t)), r.onScroll != null && $("scroll", t), r.onScrollEnd != null && $("scrollend", t), r.onClick != null && (t.onclick = gn), t = !0) : t = !1, t || na(e, !0);
	}
	function ia(e) {
		for (Zi = e.return; Zi;) switch (Zi.tag) {
			case 5:
			case 31:
			case 13:
				ea = !1;
				return;
			case 27:
			case 3:
				ea = !0;
				return;
			default: Zi = Zi.return;
		}
	}
	function aa(e) {
		if (e !== Zi) return !1;
		if (!K) return ia(e), K = !0, !1;
		var t = e.tag, n;
		if ((n = t !== 3 && t !== 27) && ((n = t === 5) && (n = e.type, n = n === "form" || n === "button" || pp(e.type, e.memoizedProps)), n = !n), n && Qi && na(e), ia(e), t === 13) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(317));
			Qi = dm(e);
		} else if (t === 31) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(317));
			Qi = dm(e);
		} else t === 27 ? (t = Qi, Sp(e.type) ? (e = um, um = null, Qi = e) : Qi = t) : Qi = Zi ? lm(e.stateNode.nextSibling) : null;
		return !0;
	}
	function oa() {
		Qi = Zi = null, K = !1;
	}
	function sa() {
		var e = $i;
		return e !== null && (ud === null ? ud = e : ud.push.apply(ud, e), $i = null), e;
	}
	function ca(e) {
		$i === null ? $i = [e] : $i.push(e);
	}
	var la = xe(null), ua = null, da = null;
	function fa(e, t, n) {
		Ce(la, t._currentValue), t._currentValue = n;
	}
	function pa(e) {
		e._currentValue = la.current, Se(la);
	}
	function ma(e, t, n) {
		for (; e !== null;) {
			var r = e.alternate;
			if ((e.childLanes & t) === t ? r !== null && (r.childLanes & t) !== t && (r.childLanes |= t) : (e.childLanes |= t, r !== null && (r.childLanes |= t)), e === n) break;
			e = e.return;
		}
	}
	function ha(e, t, n, r) {
		var a = e.child;
		for (a !== null && (a.return = e); a !== null;) {
			var o = a.dependencies;
			if (o !== null) {
				var s = a.child;
				o = o.firstContext;
				a: for (; o !== null;) {
					var c = o;
					o = a;
					for (var l = 0; l < t.length; l++) if (c.context === t[l]) {
						o.lanes |= n, c = o.alternate, c !== null && (c.lanes |= n), ma(o.return, n, e), r || (s = null);
						break a;
					}
					o = c.next;
				}
			} else if (a.tag === 18) {
				if (s = a.return, s === null) throw Error(i(341));
				s.lanes |= n, o = s.alternate, o !== null && (o.lanes |= n), ma(s, n, e), s = null;
			} else a.tag === 13 && a.memoizedState !== null && a.memoizedState.dehydrated === null ? (a.lanes |= n, s = a.alternate, s !== null && (s.lanes |= n), ma(a.return, n, e), s = a.child, s = s === null ? null : s.sibling) : s = a.child;
			if (s !== null) s.return = a;
			else for (s = a; s !== null;) {
				if (s === e) {
					s = null;
					break;
				}
				if (a = s.sibling, a !== null) {
					a.return = s.return, s = a;
					break;
				}
				s = s.return;
			}
			a = s;
		}
	}
	function ga(e, t, n, r) {
		e = null;
		for (var a = t, o = !1; a !== null;) {
			if (!o) {
				if (a.flags & 524288) o = !0;
				else if (a.flags & 262144) break;
			}
			if (a.tag === 10) {
				var s = a.alternate;
				if (s === null) throw Error(i(387));
				if (s = s.memoizedProps, s !== null) {
					var c = a.type;
					Ir(a.pendingProps.value, s.value) || (e === null ? e = [c] : e.push(c));
				}
			} else if (a === De.current) {
				if (s = a.alternate, s === null) throw Error(i(387));
				s.memoizedState.memoizedState !== a.memoizedState.memoizedState && (e === null ? e = [sh] : e.push(sh));
			}
			a = a.return;
		}
		return e !== null && ha(t, e, n, r), t.flags |= 262144, e !== null;
	}
	function _a(e) {
		for (e = e.firstContext; e !== null;) {
			if (!Ir(e.context._currentValue, e.memoizedValue)) return !0;
			e = e.next;
		}
		return !1;
	}
	function va(e) {
		ua = e, da = null, e = e.dependencies, e !== null && (e.firstContext = null);
	}
	function ya(e) {
		return xa(ua, e);
	}
	function ba(e, t) {
		return ua === null && va(e), xa(e, t);
	}
	function xa(e, t) {
		var n = t._currentValue;
		if (t = {
			context: t,
			memoizedValue: n,
			next: null
		}, da === null) {
			if (e === null) throw Error(i(308));
			da = t, e.dependencies = {
				lanes: 0,
				firstContext: t
			}, e.flags |= 524288;
		} else da = da.next = t;
		return n;
	}
	var Sa = typeof AbortController < "u" ? AbortController : function() {
		var e = [], t = this.signal = {
			aborted: !1,
			addEventListener: function(t, n) {
				e.push(n);
			}
		};
		this.abort = function() {
			t.aborted = !0, e.forEach(function(e) {
				return e();
			});
		};
	}, Ca = t.unstable_scheduleCallback, wa = t.unstable_NormalPriority, Ta = {
		$$typeof: ne,
		Consumer: null,
		Provider: null,
		_currentValue: null,
		_currentValue2: null,
		_threadCount: 0
	};
	function Ea() {
		return {
			controller: new Sa(),
			data: /* @__PURE__ */ new Map(),
			refCount: 0
		};
	}
	function Da(e) {
		e.refCount--, e.refCount === 0 && Ca(wa, function() {
			e.controller.abort();
		});
	}
	function Oa(e, t) {
		if (e.pendingLanes & 4194048) {
			var n = e.transitionTypes;
			for (n === null && (n = e.transitionTypes = []), e = 0; e < t.length; e++) {
				var r = t[e];
				n.indexOf(r) === -1 && n.push(r);
			}
		}
	}
	var ka = null;
	function Aa(e) {
		var t = e.transitionTypes;
		return e.transitionTypes = null, t;
	}
	var ja = null, Ma = 0, Na = 0, Pa = null;
	function Fa(e, t) {
		if (ja === null) {
			var n = ja = [];
			Ma = 0, Na = Nf(), Pa = {
				status: "pending",
				value: void 0,
				then: function(e) {
					n.push(e);
				}
			};
		}
		return Ma++, t.then(Ia, Ia), t;
	}
	function Ia() {
		if (--Ma === 0 && (ka = null, ja !== null)) {
			Pa !== null && (Pa.status = "fulfilled");
			var e = ja;
			ja = null, Na = 0, Pa = null;
			for (var t = 0; t < e.length; t++) (0, e[t])();
		}
	}
	function La(e, t) {
		var n = [], r = {
			status: "pending",
			value: null,
			reason: null,
			then: function(e) {
				n.push(e);
			}
		};
		return e.then(function() {
			r.status = "fulfilled", r.value = t;
			for (var e = 0; e < n.length; e++) (0, n[e])(t);
		}, function(e) {
			for (r.status = "rejected", r.reason = e, e = 0; e < n.length; e++) (0, n[e])(void 0);
		}), r;
	}
	var Ra = P.S;
	P.S = function(e, t) {
		if (pd = Ue(), typeof t == "object" && t && typeof t.then == "function" && Fa(e, t), ka !== null) for (var n = yf; n !== null;) Oa(n, ka), n = n.next;
		if (n = e.types, n !== null) {
			for (var r = yf; r !== null;) Oa(r, n), r = r.next;
			if (Na !== 0) {
				r = ka, r === null && (r = ka = []);
				for (var i = 0; i < n.length; i++) {
					var a = n[i];
					r.indexOf(a) === -1 && r.push(a);
				}
			}
		}
		Ra !== null && Ra(e, t);
	};
	var za = xe(null);
	function Ba() {
		var e = za.current;
		return e === null ? Zu.pooledCache : e;
	}
	function Va(e, t) {
		t === null ? Ce(za, za.current) : Ce(za, t.pool);
	}
	function Ha() {
		var e = Ba();
		return e === null ? null : {
			parent: Ta._currentValue,
			pool: e
		};
	}
	var Ua = Error(i(460)), Wa = Error(i(474)), Ga = Error(i(542)), Ka = { then: function() {} };
	function qa(e) {
		return e = e.status, e === "fulfilled" || e === "rejected";
	}
	function Ja(e, t, n) {
		switch (n = e[n], n === void 0 ? e.push(t) : n !== t && (t.then(gn, gn), t = n), t.status) {
			case "fulfilled": return t.value;
			case "rejected": throw e = t.reason, Qa(e), e === void 0 && !("reason" in t) ? Error(i(600)) : e;
			default:
				if (typeof t.status == "string") t.then(gn, gn);
				else {
					if (e = Zu, e !== null && 100 < e.shellSuspendCounter) throw Error(i(482));
					e = t, e.status = "pending", e.then(function(e) {
						if (t.status === "pending") {
							var n = t;
							n.status = "fulfilled", n.value = e;
						}
					}, function(e) {
						if (t.status === "pending") {
							var n = t;
							n.status = "rejected", n.reason = e;
						}
					});
				}
				switch (t.status) {
					case "fulfilled": return t.value;
					case "rejected": throw e = t.reason, Qa(e), e;
				}
				throw Xa = t, Ua;
		}
	}
	function Ya(e) {
		try {
			var t = e._init;
			return t(e._payload);
		} catch (e) {
			throw typeof e == "object" && e && typeof e.then == "function" ? (Xa = e, Ua) : e;
		}
	}
	var Xa = null;
	function Za() {
		if (Xa === null) throw Error(i(459));
		var e = Xa;
		return Xa = null, e;
	}
	function Qa(e) {
		if (e === Ua || e === Ga) throw Error(i(483));
	}
	var $a = null, eo = 0;
	function to(e) {
		var t = eo;
		return eo += 1, $a === null && ($a = []), Ja($a, e, t);
	}
	function no(e, t) {
		t = t.props.ref, e.ref = t === void 0 ? null : t;
	}
	function ro(e, t) {
		throw t.$$typeof === O ? Error(i(525)) : (e = Object.prototype.toString.call(t), Error(i(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e)));
	}
	function io(e) {
		function t(t, n) {
			if (e) {
				var r = t.deletions;
				r === null ? (t.deletions = [n], t.flags |= 16) : r.push(n);
			}
		}
		function n(n, r) {
			if (!e) return null;
			for (; r !== null;) t(n, r), r = r.sibling;
			return null;
		}
		function r(e) {
			for (var t = /* @__PURE__ */ new Map(); e !== null;) e.key === null ? t.set(e.index, e) : t.set(e.key, e), e = e.sibling;
			return t;
		}
		function a(e, t) {
			return e = Oi(e, t), e.index = 0, e.sibling = null, e;
		}
		function o(t, n, r) {
			return t.index = r, e ? (r = t.alternate, r === null ? (t.flags |= 134217730, n) : (r = r.index, r < n ? (t.flags |= 2, n) : r)) : (t.flags |= 1048576, n);
		}
		function s(t) {
			return e && t.alternate === null && (t.flags |= 134217730), t;
		}
		function c(e, t, n, r) {
			return t === null || t.tag !== 6 ? (t = Mi(n, e.mode, r), t.return = e, t) : (t = a(t, n), t.return = e, t);
		}
		function l(e, t, n, r) {
			var i = n.type;
			return i === j ? (e = d(e, t, n.props.children, r, n.key), no(e, n), e) : t !== null && (t.elementType === i || typeof i == "object" && i && i.$$typeof === oe && Ya(i) === t.type) ? (t = a(t, n.props), no(t, n), t.return = e, t) : (t = Ai(n.type, n.key, n.props, null, e.mode, r), no(t, n), t.return = e, t);
		}
		function u(e, t, n, r) {
			return t === null || t.tag !== 4 || t.stateNode.containerInfo !== n.containerInfo || t.stateNode.implementation !== n.implementation ? (t = Pi(n, e.mode, r), t.return = e, t) : (t = a(t, n.children || []), t.return = e, t);
		}
		function d(e, t, n, r, i) {
			return t === null || t.tag !== 7 ? (t = ji(n, e.mode, r, i), t.return = e, t) : (t = a(t, n), t.return = e, t);
		}
		function f(e, t, n) {
			if (typeof t == "string" && t !== "" || typeof t == "number" || typeof t == "bigint") return t = Mi("" + t, e.mode, n), t.return = e, t;
			if (typeof t == "object" && t) {
				switch (t.$$typeof) {
					case k: return n = Ai(t.type, t.key, t.props, null, e.mode, n), no(n, t), n.return = e, n;
					case A: return t = Pi(t, e.mode, n), t.return = e, t;
					case oe: return t = Ya(t), f(e, t, n);
				}
				if (ge(t) || pe(t)) return t = ji(t, e.mode, n, null), t.return = e, t;
				if (typeof t.then == "function") return f(e, to(t), n);
				if (t.$$typeof === ne) return f(e, ba(e, t), n);
				ro(e, t);
			}
			return null;
		}
		function p(e, t, n, r) {
			var i = t === null ? null : t.key;
			if (typeof n == "string" && n !== "" || typeof n == "number" || typeof n == "bigint") return i === null ? c(e, t, "" + n, r) : null;
			if (typeof n == "object" && n) {
				switch (n.$$typeof) {
					case k: return n.key === i ? l(e, t, n, r) : null;
					case A: return n.key === i ? u(e, t, n, r) : null;
					case oe: return n = Ya(n), p(e, t, n, r);
				}
				if (ge(n) || pe(n)) return i === null ? d(e, t, n, r, null) : null;
				if (typeof n.then == "function") return p(e, t, to(n), r);
				if (n.$$typeof === ne) return p(e, t, ba(e, n), r);
				ro(e, n);
			}
			return null;
		}
		function m(e, t, n, r, i) {
			if (typeof r == "string" && r !== "" || typeof r == "number" || typeof r == "bigint") return e = e.get(n) || null, c(t, e, "" + r, i);
			if (typeof r == "object" && r) {
				switch (r.$$typeof) {
					case k: return e = e.get(r.key === null ? n : r.key) || null, l(t, e, r, i);
					case A: return e = e.get(r.key === null ? n : r.key) || null, u(t, e, r, i);
					case oe: return r = Ya(r), m(e, t, n, r, i);
				}
				if (ge(r) || pe(r)) return e = e.get(n) || null, d(t, e, r, i, null);
				if (typeof r.then == "function") return m(e, t, n, to(r), i);
				if (r.$$typeof === ne) return m(e, t, n, ba(t, r), i);
				ro(t, r);
			}
			return null;
		}
		function h(i, a, s, c) {
			for (var l = null, u = null, d = a, h = a = 0, g = null; d !== null && h < s.length; h++) {
				d.index > h ? (g = d, d = null) : g = d.sibling;
				var _ = p(i, d, s[h], c);
				if (_ === null) {
					d === null && (d = g);
					break;
				}
				e && d && _.alternate === null && t(i, d), a = o(_, a, h), u === null ? l = _ : u.sibling = _, u = _, d = g;
			}
			if (h === s.length) return n(i, d), K && Ki(i, h), l;
			if (d === null) {
				for (; h < s.length; h++) d = f(i, s[h], c), d !== null && (a = o(d, a, h), u === null ? l = d : u.sibling = d, u = d);
				return K && Ki(i, h), l;
			}
			for (d = r(d); h < s.length; h++) g = m(d, i, h, s[h], c), g !== null && (e && (_ = g.alternate, _ !== null && d.delete(_.key === null ? h : _.key)), a = o(g, a, h), u === null ? l = g : u.sibling = g, u = g);
			return e && d.forEach(function(e) {
				return t(i, e);
			}), K && Ki(i, h), l;
		}
		function g(a, s, c, l) {
			if (c == null) throw Error(i(151));
			for (var u = null, d = null, h = s, g = s = 0, _ = null, v = c.next(); h !== null && !v.done; g++, v = c.next()) {
				h.index > g ? (_ = h, h = null) : _ = h.sibling;
				var y = p(a, h, v.value, l);
				if (y === null) {
					h === null && (h = _);
					break;
				}
				e && h && y.alternate === null && t(a, h), s = o(y, s, g), d === null ? u = y : d.sibling = y, d = y, h = _;
			}
			if (v.done) return n(a, h), K && Ki(a, g), u;
			if (h === null) {
				for (; !v.done; g++, v = c.next()) v = f(a, v.value, l), v !== null && (s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
				return K && Ki(a, g), u;
			}
			for (h = r(h); !v.done; g++, v = c.next()) v = m(h, a, g, v.value, l), v !== null && (e && (_ = v.alternate, _ !== null && h.delete(_.key === null ? g : _.key)), s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
			return e && h.forEach(function(e) {
				return t(a, e);
			}), K && Ki(a, g), u;
		}
		function _(e, r, o, c) {
			if (typeof o == "object" && o && o.type === j && o.key === null && o.props.ref === void 0 && (o = o.props.children), typeof o == "object" && o) {
				switch (o.$$typeof) {
					case k:
						a: {
							for (var l = o.key; r !== null;) {
								if (r.key === l) {
									if (l = o.type, l === j) {
										if (r.tag === 7) {
											n(e, r.sibling), c = a(r, o.props.children), no(c, o), c.return = e, e = c;
											break a;
										}
									} else if (r.elementType === l || typeof l == "object" && l && l.$$typeof === oe && Ya(l) === r.type) {
										n(e, r.sibling), c = a(r, o.props), no(c, o), c.return = e, e = c;
										break a;
									}
									n(e, r);
									break;
								}
								t(e, r), r = r.sibling;
							}
							o.type === j ? (c = ji(o.props.children, e.mode, c, o.key), no(c, o), c.return = e, e = c) : (c = Ai(o.type, o.key, o.props, null, e.mode, c), no(c, o), c.return = e, e = c);
						}
						return s(e);
					case A:
						a: {
							for (l = o.key; r !== null;) {
								if (r.key === l) {
									if (r.tag === 4 && r.stateNode.containerInfo === o.containerInfo && r.stateNode.implementation === o.implementation) {
										n(e, r.sibling), c = a(r, o.children || []), c.return = e, e = c;
										break a;
									}
									n(e, r);
									break;
								}
								t(e, r), r = r.sibling;
							}
							c = Pi(o, e.mode, c), c.return = e, e = c;
						}
						return s(e);
					case oe: return o = Ya(o), _(e, r, o, c);
				}
				if (ge(o)) return h(e, r, o, c);
				if (pe(o)) {
					if (l = pe(o), typeof l != "function") throw Error(i(150));
					return o = l.call(o), g(e, r, o, c);
				}
				if (typeof o.then == "function") return _(e, r, to(o), c);
				if (o.$$typeof === ne) return _(e, r, ba(e, o), c);
				ro(e, o);
			}
			return typeof o == "string" && o !== "" || typeof o == "number" || typeof o == "bigint" ? (o = "" + o, r !== null && r.tag === 6 ? (n(e, r.sibling), c = a(r, o), c.return = e, e = c) : (n(e, r), c = Mi(o, e.mode, c), c.return = e, e = c), s(e)) : n(e, r);
		}
		return function(e, t, n, r) {
			try {
				eo = 0;
				var i = _(e, t, n, r);
				return $a = null, i;
			} catch (t) {
				if (t === Ua || t === Ga) throw t;
				var a = Ei(29, t, null, e.mode);
				return a.lanes = r, a.return = e, a;
			}
		};
	}
	var ao = io(!0), oo = io(!1), so = !1;
	function co(e) {
		e.updateQueue = {
			baseState: e.memoizedState,
			firstBaseUpdate: null,
			lastBaseUpdate: null,
			shared: {
				pending: null,
				lanes: 0,
				hiddenCallbacks: null
			},
			callbacks: null
		};
	}
	function lo(e, t) {
		e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
			baseState: e.baseState,
			firstBaseUpdate: e.firstBaseUpdate,
			lastBaseUpdate: e.lastBaseUpdate,
			shared: e.shared,
			callbacks: null
		});
	}
	function uo(e) {
		return {
			lane: e,
			tag: 0,
			payload: null,
			callback: null,
			next: null
		};
	}
	function fo(e, t, n) {
		var r = e.updateQueue;
		if (r === null) return null;
		if (r = r.shared, Xu & 2) {
			var i = r.pending;
			return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, t = Ci(e), Si(e, null, n), t;
		}
		return yi(e, r, t, n), Ci(e);
	}
	function po(e, t, n) {
		if (t = t.updateQueue, t !== null && (t = t.shared, n & 4194048)) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, gt(e, n);
		}
	}
	function mo(e, t) {
		var n = e.updateQueue, r = e.alternate;
		if (r !== null && (r = r.updateQueue, n === r)) {
			var i = null, a = null;
			if (n = n.firstBaseUpdate, n !== null) {
				do {
					var o = {
						lane: n.lane,
						tag: n.tag,
						payload: n.payload,
						callback: null,
						next: null
					};
					a === null ? i = a = o : a = a.next = o, n = n.next;
				} while (n !== null);
				a === null ? i = a = t : a = a.next = t;
			} else i = a = t;
			n = {
				baseState: r.baseState,
				firstBaseUpdate: i,
				lastBaseUpdate: a,
				shared: r.shared,
				callbacks: r.callbacks
			}, e.updateQueue = n;
		} else e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
	}
	var ho = !1;
	function go() {
		if (ho) {
			var e = Pa;
			if (e !== null) throw e;
		}
	}
	function _o(e, t, n, r) {
		ho = !1;
		var i = e.updateQueue;
		so = !1;
		var a = i.firstBaseUpdate, o = i.lastBaseUpdate, s = i.shared.pending;
		if (s !== null) {
			i.shared.pending = null;
			var c = s, l = c.next;
			c.next = null, o === null ? a = l : o.next = l, o = c;
			var u = e.alternate;
			u !== null && (u = u.updateQueue, s = u.lastBaseUpdate, s !== o && (s === null ? u.firstBaseUpdate = l : s.next = l, u.lastBaseUpdate = c));
		}
		if (a !== null) {
			var d = i.baseState;
			o = 0, u = l = c = null, s = a;
			do {
				var f = s.lane & -536870913, p = f !== s.lane;
				if (p ? (Z & f) === f : (r & f) === f) {
					f !== 0 && f === Na && (ho = !0), u !== null && (u = u.next = {
						lane: 0,
						tag: s.tag,
						payload: s.payload,
						callback: null,
						next: null
					});
					a: {
						var m = e, h = s;
						f = t;
						var g = n;
						switch (h.tag) {
							case 1:
								if (m = h.payload, typeof m == "function") {
									d = m.call(g, d, f);
									break a;
								}
								d = m;
								break a;
							case 3: m.flags = m.flags & -65537 | 128;
							case 0:
								if (m = h.payload, f = typeof m == "function" ? m.call(g, d, f) : m, f == null) break a;
								d = D({}, d, f);
								break a;
							case 2: so = !0;
						}
					}
					f = s.callback, f !== null && (e.flags |= 64, p && (e.flags |= 8192), p = i.callbacks, p === null ? i.callbacks = [f] : p.push(f));
				} else p = {
					lane: f,
					tag: s.tag,
					payload: s.payload,
					callback: s.callback,
					next: null
				}, u === null ? (l = u = p, c = d) : u = u.next = p, o |= f;
				if (s = s.next, s === null) {
					if (s = i.shared.pending, s === null) break;
					p = s, s = p.next, p.next = null, i.lastBaseUpdate = p, i.shared.pending = null;
				}
			} while (1);
			u === null && (c = d), i.baseState = c, i.firstBaseUpdate = l, i.lastBaseUpdate = u, a === null && (i.shared.lanes = 0), id |= o, e.lanes = o, e.memoizedState = d;
		}
	}
	function vo(e, t) {
		if (typeof e != "function") throw Error(i(191, e));
		e.call(t);
	}
	function yo(e, t) {
		var n = e.callbacks;
		if (n !== null) for (e.callbacks = null, e = 0; e < n.length; e++) vo(n[e], t);
	}
	var bo = xe(null), xo = xe(0);
	function So(e, t) {
		e = nd, Ce(xo, e), Ce(bo, t), nd = e | t.baseLanes;
	}
	function Co() {
		Ce(xo, nd), Ce(bo, bo.current);
	}
	function wo() {
		nd = xo.current, Se(bo), Se(xo);
	}
	var To = xe(null), Eo = null;
	function Do(e) {
		var t = e.alternate;
		Ce(Mo, Mo.current & 1), Ce(To, e), Eo === null && (t === null || bo.current !== null || t.memoizedState !== null) && (Eo = e);
	}
	function Oo(e) {
		Ce(Mo, Mo.current), Ce(To, e), Eo === null && (Eo = e);
	}
	function ko(e) {
		e.tag === 22 ? (Ce(Mo, Mo.current), Ce(To, e), Eo === null && (Eo = e)) : Ao();
	}
	function Ao() {
		Ce(Mo, Mo.current), Ce(To, To.current);
	}
	function jo(e) {
		Se(To), Eo === e && (Eo = null), Se(Mo);
	}
	var Mo = xe(0);
	function No(e, t) {
		Ce(To, To.current), Ce(Mo, t);
	}
	function Po(e) {
		Se(Mo), Se(To), Eo === e && (Eo = null);
	}
	function Fo(e) {
		for (var t = e; t !== null;) {
			if (t.tag === 13) {
				var n = t.memoizedState;
				if (n !== null && (n = n.dehydrated, n === null || om(n) || sm(n))) return t;
			} else if (t.tag === 19 && t.memoizedProps.revealOrder !== "independent") {
				if (t.flags & 128) return t;
			} else if (t.child !== null) {
				t.child.return = t, t = t.child;
				continue;
			}
			if (t === e) break;
			for (; t.sibling === null;) {
				if (t.return === null || t.return === e) return null;
				t = t.return;
			}
			t.sibling.return = t.return, t = t.sibling;
		}
		return null;
	}
	var Io = 0, q = null, Lo = null, Ro = null, zo = !1, Bo = !1, Vo = !1, Ho = 0, Uo = 0, Wo = null, Go = 0;
	function Ko() {
		throw Error(i(321));
	}
	function qo(e, t) {
		if (t === null) return !1;
		for (var n = 0; n < t.length && n < e.length; n++) if (!Ir(e[n], t[n])) return !1;
		return !0;
	}
	function Jo(e, t, n, r, i, a) {
		return Io = a, q = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, P.H = e === null || e.memoizedState === null ? dc : fc, Vo = !1, a = n(r, i), Vo = !1, Bo && (a = Xo(t, n, r, i)), Yo(e), a;
	}
	function Yo(e) {
		P.H = uc;
		var t = Lo !== null && Lo.next !== null;
		if (Io = 0, Ro = Lo = q = null, zo = !1, Uo = 0, Wo = null, t) throw Error(i(300));
		e === null || kc || (e = e.dependencies, e !== null && _a(e) && (kc = !0));
	}
	function Xo(e, t, n, r) {
		q = e;
		var a = 0;
		do {
			if (Bo && (Wo = null), Uo = 0, Bo = !1, 25 <= a) throw Error(i(301));
			if (a += 1, Ro = Lo = null, e.updateQueue != null) {
				var o = e.updateQueue;
				o.lastEffect = null, o.events = null, o.stores = null, o.memoCache != null && (o.memoCache.index = 0);
			}
			P.H = pc, o = t(n, r);
		} while (Bo);
		return o;
	}
	function Zo() {
		var e = P.H, t = e.useState()[0];
		return t = typeof t.then == "function" ? is(t) : t, e = e.useState()[0], (Lo === null ? null : Lo.memoizedState) !== e && (q.flags |= 1024), t;
	}
	function Qo() {
		var e = Ho !== 0;
		return Ho = 0, e;
	}
	function $o(e, t, n) {
		t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~n;
	}
	function es(e) {
		if (zo) {
			for (e = e.memoizedState; e !== null;) {
				var t = e.queue;
				t !== null && (t.pending = null), e = e.next;
			}
			zo = !1;
		}
		Io = 0, Ro = Lo = q = null, Bo = !1, Uo = Ho = 0, Wo = null;
	}
	function ts() {
		var e = {
			memoizedState: null,
			baseState: null,
			baseQueue: null,
			queue: null,
			next: null
		};
		return Ro === null ? q.memoizedState = Ro = e : Ro = Ro.next = e, Ro;
	}
	function ns() {
		if (Lo === null) {
			var e = q.alternate;
			e = e === null ? null : e.memoizedState;
		} else e = Lo.next;
		var t = Ro === null ? q.memoizedState : Ro.next;
		if (t !== null) Ro = t, Lo = e;
		else {
			if (e === null) throw q.alternate === null ? Error(i(467)) : Error(i(310));
			Lo = e, e = {
				memoizedState: Lo.memoizedState,
				baseState: Lo.baseState,
				baseQueue: Lo.baseQueue,
				queue: Lo.queue,
				next: null
			}, Ro === null ? q.memoizedState = Ro = e : Ro = Ro.next = e;
		}
		return Ro;
	}
	function rs() {
		return {
			lastEffect: null,
			events: null,
			stores: null,
			memoCache: null
		};
	}
	function is(e) {
		var t = Uo;
		return Uo += 1, Wo === null && (Wo = []), e = Ja(Wo, e, t), t = q, (Ro === null ? t.memoizedState : Ro.next) === null && (t = t.alternate, P.H = t === null || t.memoizedState === null ? dc : fc), e;
	}
	function as(e) {
		if (typeof e == "object" && e) {
			if (typeof e.then == "function") return is(e);
			if (e.$$typeof === de) return;
			if (e.$$typeof === ne) return ya(e);
		}
		throw Error(i(438, String(e)));
	}
	function os(e) {
		var t = null, n = q.updateQueue;
		if (n !== null && (t = n.memoCache), t == null) {
			var r = q.alternate;
			r !== null && (r = r.updateQueue, r !== null && (r = r.memoCache, r != null && (t = {
				data: r.data.map(function(e) {
					return e.slice();
				}),
				index: 0
			})));
		}
		if (t ??= {
			data: [],
			index: 0
		}, n === null && (n = rs(), q.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0) for (n = t.data[t.index] = Array(e), r = 0; r < e; r++) n[r] = le;
		return t.index++, n;
	}
	function ss(e, t) {
		return typeof t == "function" ? t(e) : t;
	}
	function cs(e) {
		return ls(ns(), Lo, e);
	}
	function ls(e, t, n) {
		var r = e.queue;
		if (r === null) throw Error(i(311));
		r.lastRenderedReducer = n;
		var a = e.baseQueue, o = r.pending;
		if (o !== null) {
			if (a !== null) {
				var s = a.next;
				a.next = o.next, o.next = s;
			}
			t.baseQueue = a = o, r.pending = null;
		}
		if (o = e.baseState, a === null) e.memoizedState = o;
		else {
			t = a.next;
			var c = s = null, l = null, u = t, d = !1;
			do {
				var f = u.lane & -536870913;
				if (f === u.lane ? (Io & f) === f : (Z & f) === f) {
					var p = u.revertLane;
					if (p === 0) l !== null && (l = l.next = {
						lane: 0,
						revertLane: 0,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}), f === Na && (d = !0);
					else if ((Io & p) === p) {
						u = u.next, p === Na && (d = !0);
						continue;
					} else f = {
						lane: 0,
						revertLane: u.revertLane,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}, l === null ? (c = l = f, s = o) : l = l.next = f, q.lanes |= p, id |= p;
					f = u.action, Vo && n(o, f), o = u.hasEagerState ? u.eagerState : n(o, f);
				} else p = {
					lane: f,
					revertLane: u.revertLane,
					gesture: u.gesture,
					action: u.action,
					hasEagerState: u.hasEagerState,
					eagerState: u.eagerState,
					next: null
				}, l === null ? (c = l = p, s = o) : l = l.next = p, q.lanes |= f, id |= f;
				u = u.next;
			} while (u !== null && u !== t);
			if (l === null ? s = o : l.next = c, !Ir(o, e.memoizedState) && (kc = !0, d && (n = Pa, n !== null))) throw n;
			e.memoizedState = o, e.baseState = s, e.baseQueue = l, r.lastRenderedState = o;
		}
		return a === null && (r.lanes = 0), [e.memoizedState, r.dispatch];
	}
	function us(e) {
		var t = ns(), n = t.queue;
		if (n === null) throw Error(i(311));
		n.lastRenderedReducer = e;
		var r = n.dispatch, a = n.pending, o = t.memoizedState;
		if (a !== null) {
			n.pending = null;
			var s = a = a.next;
			do
				o = e(o, s.action), s = s.next;
			while (s !== a);
			Ir(o, t.memoizedState) || (kc = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
		}
		return [o, r];
	}
	function ds(e, t, n) {
		var r = q, a = ns(), o = K;
		if (o) {
			if (n === void 0) throw Error(i(407));
			n = n();
		} else n = t();
		var s = !Ir((Lo || a).memoizedState, n);
		if (s && (a.memoizedState = n, kc = !0), a = a.queue, Is(ms.bind(null, r, a, e), [e]), e = a.getSnapshot !== t || s || Ro !== null && !!(Ro.memoizedState.tag & 1), js(e ? 9 : 8, { destroy: void 0 }, ps.bind(null, r, a, n, t), null), e) {
			if (r.flags |= 2048, Zu === null) throw Error(i(349));
			o || Io & 127 || fs(r, t, n);
		}
		return n;
	}
	function fs(e, t, n) {
		e.flags |= 16384, e = {
			getSnapshot: t,
			value: n
		}, t = q.updateQueue, t === null ? (t = rs(), q.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
	}
	function ps(e, t, n, r) {
		t.value = n, t.getSnapshot = r, hs(t) && gs(e);
	}
	function ms(e, t, n) {
		return n(function() {
			hs(t) && gs(e);
		});
	}
	function hs(e) {
		var t = e.getSnapshot;
		e = e.value;
		try {
			var n = t();
			return !Ir(e, n);
		} catch {
			return !0;
		}
	}
	function gs(e) {
		var t = xi(e, 2);
		t !== null && Md(t, e, 2);
	}
	function _s(e) {
		var t = ts();
		if (typeof e == "function") {
			var n = e;
			if (e = n(), Vo) {
				Qe(!0);
				try {
					n();
				} finally {
					Qe(!1);
				}
			}
		}
		return t.memoizedState = t.baseState = e, t.queue = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: ss,
			lastRenderedState: e
		}, t;
	}
	function vs(e, t, n, r) {
		return e.baseState = n, ls(e, Lo, typeof r == "function" ? r : ss);
	}
	function ys(e, t, n, r, a) {
		if (sc(e)) throw Error(i(485));
		if (e = t.action, e !== null) {
			var o = {
				payload: a,
				action: e,
				next: null,
				isTransition: !0,
				status: "pending",
				value: null,
				reason: null,
				listeners: [],
				then: function(e) {
					o.listeners.push(e);
				}
			};
			P.T === null ? o.isTransition = !1 : n(!0), r(o), n = t.pending, n === null ? (o.next = t.pending = o, bs(t, o)) : (o.next = n.next, t.pending = n.next = o);
		}
	}
	function bs(e, t) {
		var n = t.action, r = t.payload, i = e.state;
		if (t.isTransition) {
			var a = P.T, o = {};
			o.types = a === null ? null : a.types, P.T = o;
			try {
				var s = n(i, r), c = P.S;
				c !== null && c(o, s), xs(e, t, s);
			} catch (n) {
				Cs(e, t, n);
			} finally {
				a !== null && o.types !== null && (a.types = o.types), P.T = a;
			}
		} else try {
			a = n(i, r), xs(e, t, a);
		} catch (n) {
			Cs(e, t, n);
		}
	}
	function xs(e, t, n) {
		typeof n == "object" && n && typeof n.then == "function" ? n.then(function(n) {
			Ss(e, t, n);
		}, function(n) {
			return Cs(e, t, n);
		}) : Ss(e, t, n);
	}
	function Ss(e, t, n) {
		t.status = "fulfilled", t.value = n, ws(t), e.state = n, t = e.pending, t !== null && (n = t.next, n === t ? e.pending = null : (n = n.next, t.next = n, bs(e, n)));
	}
	function Cs(e, t, n) {
		var r = e.pending;
		if (e.pending = null, r !== null) {
			r = r.next;
			do
				t.status = "rejected", t.reason = n, ws(t), t = t.next;
			while (t !== r);
		}
		e.action = null;
	}
	function ws(e) {
		e = e.listeners;
		for (var t = 0; t < e.length; t++) (0, e[t])();
	}
	function Ts(e, t) {
		return t;
	}
	function Es(e, t) {
		if (K) {
			var n = Zu.formState;
			if (n !== null) {
				a: {
					var r = q;
					if (K) {
						if (Qi) {
							b: {
								for (var i = Qi, a = ea; i.nodeType !== 8;) if (!a || (i = lm(i.nextSibling), i === null)) {
									i = null;
									break b;
								}
								a = i.data, i = a === "F!" || a === "F" ? i : null;
							}
							if (i) {
								Qi = lm(i.nextSibling), r = i.data === "F!";
								break a;
							}
						}
						na(r);
					}
					r = !1;
				}
				r && (t = n[0]);
			}
		}
		return n = ts(), n.memoizedState = n.baseState = t, r = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: Ts,
			lastRenderedState: t
		}, n.queue = r, n = ic.bind(null, q, r), r.dispatch = n, r = _s(!1), a = oc.bind(null, q, !1, r.queue), r = ts(), i = {
			state: t,
			dispatch: null,
			action: e,
			pending: null
		}, r.queue = i, n = ys.bind(null, q, i, a, n), i.dispatch = n, r.memoizedState = e, [
			t,
			n,
			!1
		];
	}
	function Ds(e) {
		return Os(ns(), Lo, e);
	}
	function Os(e, t, n) {
		if (t = ls(e, t, Ts)[0], e = cs(ss)[0], typeof t == "object" && t && typeof t.then == "function") try {
			var r = is(t);
		} catch (e) {
			throw e === Ua ? Ga : e;
		}
		else r = t;
		t = ns();
		var i = t.queue, a = i.dispatch;
		return n !== t.memoizedState && (q.flags |= 2048, js(9, { destroy: void 0 }, ks.bind(null, i, n), null)), [
			r,
			a,
			e
		];
	}
	function ks(e, t) {
		e.action = t;
	}
	function As(e) {
		var t = ns(), n = Lo;
		if (n !== null) return Os(t, n, e);
		ns(), t = t.memoizedState, n = ns();
		var r = n.queue.dispatch;
		return n.memoizedState = e, [
			t,
			r,
			!1
		];
	}
	function js(e, t, n, r) {
		return e = {
			tag: e,
			create: n,
			deps: r,
			inst: t,
			next: null
		}, t = q.updateQueue, t === null && (t = rs(), q.updateQueue = t), n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e), e;
	}
	function Ms() {
		return ns().memoizedState;
	}
	function Ns(e, t, n, r) {
		var i = ts();
		q.flags |= e, i.memoizedState = js(1 | t, { destroy: void 0 }, n, r === void 0 ? null : r);
	}
	function Ps(e, t, n, r) {
		var i = ns();
		r = r === void 0 ? null : r;
		var a = i.memoizedState.inst;
		Lo !== null && r !== null && qo(r, Lo.memoizedState.deps) ? i.memoizedState = js(t, a, n, r) : (q.flags |= e, i.memoizedState = js(1 | t, a, n, r));
	}
	function Fs(e, t) {
		Ns(8390656, 8, e, t);
	}
	function Is(e, t) {
		Ps(2048, 8, e, t);
	}
	function Ls(e) {
		q.flags |= 4;
		var t = q.updateQueue;
		if (t === null) t = rs(), q.updateQueue = t, t.events = [e];
		else {
			var n = t.events;
			n === null ? t.events = [e] : n.push(e);
		}
	}
	function Rs(e) {
		var t = ns().memoizedState;
		return Ls({
			ref: t,
			nextImpl: e
		}), function() {
			if (Xu & 2) throw Error(i(440));
			return t.impl.apply(void 0, arguments);
		};
	}
	function zs(e, t) {
		return Ps(4, 2, e, t);
	}
	function Bs(e, t) {
		return Ps(4, 4, e, t);
	}
	function Vs(e, t) {
		if (typeof t == "function") {
			e = e();
			var n = t(e);
			return function() {
				typeof n == "function" ? n() : t(null);
			};
		}
		if (t != null) return e = e(), t.current = e, function() {
			t.current = null;
		};
	}
	function Hs(e, t, n) {
		n = n == null ? null : n.concat([e]), Ps(4, 4, Vs.bind(null, t, e), n);
	}
	function Us() {}
	function Ws(e, t) {
		var n = ns();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		return t !== null && qo(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
	}
	function Gs(e, t) {
		var n = ns();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		if (t !== null && qo(t, r[1])) return r[0];
		if (r = e(), Vo) {
			Qe(!0);
			try {
				e();
			} finally {
				Qe(!1);
			}
		}
		return n.memoizedState = [r, t], r;
	}
	function Ks(e, t, n) {
		return n === void 0 || Io & 1073741824 && !(Z & 261930) ? e.memoizedState = t : (e.memoizedState = n, e = Ad(), q.lanes |= e, id |= e, n);
	}
	function qs(e, t, n, r) {
		return Ir(n, t) ? n : bo.current === null ? !(Io & 106) || Io & 1073741824 && !(Z & 261930) ? (kc = !0, e.memoizedState = n) : (e = Ad(), q.lanes |= e, id |= e, t) : (e = Ks(e, n, r), Ir(e, t) || (kc = !0), e);
	}
	function Js(e, t, n, r, i) {
		var a = _e.p;
		_e.p = a !== 0 && 8 > a ? a : 8;
		var o = P.T, s = {};
		s.types = o === null ? null : o.types, P.T = s, oc(e, !1, t, n);
		try {
			var c = i(), l = P.S;
			l !== null && l(s, c), typeof c == "object" && c && typeof c.then == "function" ? ac(e, t, La(c, r), kd(e)) : ac(e, t, r, kd(e));
		} catch (n) {
			ac(e, t, {
				then: function() {},
				status: "rejected",
				reason: n
			}, kd());
		} finally {
			_e.p = a, o !== null && s.types !== null && (o.types = s.types), P.T = o;
		}
	}
	function Ys() {}
	function Xs(e, t, n, r) {
		if (e.tag !== 5) throw Error(i(476));
		var a = Zs(e).queue;
		Js(e, a, t, ve, n === null ? Ys : function() {
			return Qs(e), n(r);
		});
	}
	function Zs(e) {
		var t = e.memoizedState;
		if (t !== null) return t;
		t = {
			memoizedState: ve,
			baseState: ve,
			baseQueue: null,
			queue: {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: ss,
				lastRenderedState: ve
			},
			next: null
		};
		var n = {};
		return t.next = {
			memoizedState: n,
			baseState: n,
			baseQueue: null,
			queue: {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: ss,
				lastRenderedState: n
			},
			next: null
		}, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
	}
	function Qs(e) {
		var t = Zs(e);
		t.next === null && (t = e.alternate.memoizedState), ac(e, t.next.queue, {}, kd());
	}
	function $s() {
		return ya(sh);
	}
	function ec() {
		return ns().memoizedState;
	}
	function tc() {
		return ns().memoizedState;
	}
	function nc(e) {
		for (var t = e.return; t !== null;) {
			switch (t.tag) {
				case 24:
				case 3:
					var n = kd();
					e = uo(n);
					var r = fo(t, e, n);
					r !== null && (Md(r, t, n), po(r, t, n)), t = { cache: Ea() }, e.payload = t;
					return;
			}
			t = t.return;
		}
	}
	function rc(e, t, n) {
		var r = kd();
		n = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, sc(e) ? cc(t, n) : (n = bi(e, t, n, r), n !== null && (Md(n, e, r), lc(n, t, r)));
	}
	function ic(e, t, n) {
		ac(e, t, n, kd());
	}
	function ac(e, t, n, r) {
		var i = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		};
		if (sc(e)) cc(t, i);
		else {
			var a = e.alternate;
			if (e.lanes === 0 && (a === null || a.lanes === 0) && (a = t.lastRenderedReducer, a !== null)) try {
				var o = t.lastRenderedState, s = a(o, n);
				if (i.hasEagerState = !0, i.eagerState = s, Ir(s, o)) return yi(e, t, i, 0), Zu === null && vi(), !1;
			} catch {}
			if (n = bi(e, t, i, r), n !== null) return Md(n, e, r), lc(n, t, r), !0;
		}
		return !1;
	}
	function oc(e, t, n, r) {
		if (r = {
			lane: 2,
			revertLane: Nf(),
			gesture: null,
			action: r,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, sc(e)) {
			if (t) throw Error(i(479));
		} else t = bi(e, n, r, 2), t !== null && Md(t, e, 2);
	}
	function sc(e) {
		var t = e.alternate;
		return e === q || t !== null && t === q;
	}
	function cc(e, t) {
		Bo = zo = !0;
		var n = e.pending;
		n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
	}
	function lc(e, t, n) {
		if (n & 4194048) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, gt(e, n);
		}
	}
	var uc = {
		readContext: ya,
		use: as,
		useCallback: Ko,
		useContext: Ko,
		useEffect: Ko,
		useImperativeHandle: Ko,
		useLayoutEffect: Ko,
		useInsertionEffect: Ko,
		useMemo: Ko,
		useReducer: Ko,
		useRef: Ko,
		useState: Ko,
		useDebugValue: Ko,
		useDeferredValue: Ko,
		useTransition: Ko,
		useSyncExternalStore: Ko,
		useId: Ko,
		useHostTransitionStatus: Ko,
		useFormState: Ko,
		useActionState: Ko,
		useOptimistic: Ko,
		useMemoCache: Ko,
		useCacheRefresh: Ko,
		useEffectEvent: Ko
	}, dc = {
		readContext: ya,
		use: as,
		useCallback: function(e, t) {
			return ts().memoizedState = [e, t === void 0 ? null : t], e;
		},
		useContext: ya,
		useEffect: Fs,
		useImperativeHandle: function(e, t, n) {
			n = n == null ? null : n.concat([e]), Ns(4194308, 4, Vs.bind(null, t, e), n);
		},
		useLayoutEffect: function(e, t) {
			return Ns(4194308, 4, e, t);
		},
		useInsertionEffect: function(e, t) {
			Ns(4, 2, e, t);
		},
		useMemo: function(e, t) {
			var n = ts();
			t = t === void 0 ? null : t;
			var r = e();
			if (Vo) {
				Qe(!0);
				try {
					e();
				} finally {
					Qe(!1);
				}
			}
			return n.memoizedState = [r, t], r;
		},
		useReducer: function(e, t, n) {
			var r = ts();
			if (n !== void 0) {
				var i = n(t);
				if (Vo) {
					Qe(!0);
					try {
						n(t);
					} finally {
						Qe(!1);
					}
				}
			} else i = t;
			return r.memoizedState = r.baseState = i, e = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: e,
				lastRenderedState: i
			}, r.queue = e, e = e.dispatch = rc.bind(null, q, e), [r.memoizedState, e];
		},
		useRef: function(e) {
			var t = ts();
			return e = { current: e }, t.memoizedState = e;
		},
		useState: function(e) {
			e = _s(e);
			var t = e.queue, n = ic.bind(null, q, t);
			return t.dispatch = n, [e.memoizedState, n];
		},
		useDebugValue: Us,
		useDeferredValue: function(e, t) {
			return Ks(ts(), e, t);
		},
		useTransition: function() {
			var e = _s(!1);
			return e = Js.bind(null, q, e.queue, !0, !1), ts().memoizedState = e, [!1, e];
		},
		useSyncExternalStore: function(e, t, n) {
			var r = q, a = ts();
			if (K) {
				if (n === void 0) throw Error(i(407));
				n = n();
			} else {
				if (n = t(), Zu === null) throw Error(i(349));
				Z & 127 || fs(r, t, n);
			}
			a.memoizedState = n;
			var o = {
				value: n,
				getSnapshot: t
			};
			return a.queue = o, Fs(ms.bind(null, r, o, e), [e]), r.flags |= 2048, js(9, { destroy: void 0 }, ps.bind(null, r, o, n, t), null), n;
		},
		useId: function() {
			var e = ts(), t = Zu.identifierPrefix;
			if (K) {
				var n = Gi, r = Wi;
				n = (r & ~(1 << 32 - $e(r) - 1)).toString(32) + n, t = "_" + t + "R_" + n, n = Ho++, 0 < n && (t += "H" + n.toString(32)), t += "_";
			} else n = Go++, t = "_" + t + "r_" + n.toString(32) + "_";
			return e.memoizedState = t;
		},
		useHostTransitionStatus: $s,
		useFormState: Es,
		useActionState: Es,
		useOptimistic: function(e) {
			var t = ts();
			t.memoizedState = t.baseState = e;
			var n = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: null,
				lastRenderedState: null
			};
			return t.queue = n, t = oc.bind(null, q, !0, n), n.dispatch = t, [e, t];
		},
		useMemoCache: os,
		useCacheRefresh: function() {
			return ts().memoizedState = nc.bind(null, q);
		},
		useEffectEvent: function(e) {
			var t = ts(), n = { impl: e };
			return t.memoizedState = n, function() {
				if (Xu & 2) throw Error(i(440));
				return n.impl.apply(void 0, arguments);
			};
		}
	}, fc = {
		readContext: ya,
		use: as,
		useCallback: Ws,
		useContext: ya,
		useEffect: Is,
		useImperativeHandle: Hs,
		useInsertionEffect: zs,
		useLayoutEffect: Bs,
		useMemo: Gs,
		useReducer: cs,
		useRef: Ms,
		useState: function() {
			return cs(ss);
		},
		useDebugValue: Us,
		useDeferredValue: function(e, t) {
			return qs(ns(), Lo.memoizedState, e, t);
		},
		useTransition: function() {
			var e = cs(ss)[0], t = ns().memoizedState;
			return [typeof e == "boolean" ? e : is(e), t];
		},
		useSyncExternalStore: ds,
		useId: ec,
		useHostTransitionStatus: $s,
		useFormState: Ds,
		useActionState: Ds,
		useOptimistic: function(e, t) {
			return vs(ns(), Lo, e, t);
		},
		useMemoCache: os,
		useCacheRefresh: tc,
		useEffectEvent: Rs
	}, pc = {
		readContext: ya,
		use: as,
		useCallback: Ws,
		useContext: ya,
		useEffect: Is,
		useImperativeHandle: Hs,
		useInsertionEffect: zs,
		useLayoutEffect: Bs,
		useMemo: Gs,
		useReducer: us,
		useRef: Ms,
		useState: function() {
			return us(ss);
		},
		useDebugValue: Us,
		useDeferredValue: function(e, t) {
			var n = ns();
			return Lo === null ? Ks(n, e, t) : qs(n, Lo.memoizedState, e, t);
		},
		useTransition: function() {
			var e = us(ss)[0], t = ns().memoizedState;
			return [typeof e == "boolean" ? e : is(e), t];
		},
		useSyncExternalStore: ds,
		useId: ec,
		useHostTransitionStatus: $s,
		useFormState: As,
		useActionState: As,
		useOptimistic: function(e, t) {
			var n = ns();
			return Lo === null ? (n.baseState = e, [e, n.queue.dispatch]) : vs(n, Lo, e, t);
		},
		useMemoCache: os,
		useCacheRefresh: tc,
		useEffectEvent: Rs
	};
	function mc(e, t, n, r) {
		t = e.memoizedState, n = n(r, t), n = n == null ? t : D({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
	}
	var hc = {
		enqueueSetState: function(e, t, n) {
			e = e._reactInternals;
			var r = kd(), i = uo(r);
			i.payload = t, n != null && (i.callback = n), t = fo(e, i, r), t !== null && (Md(t, e, r), po(t, e, r));
		},
		enqueueReplaceState: function(e, t, n) {
			e = e._reactInternals;
			var r = kd(), i = uo(r);
			i.tag = 1, i.payload = t, n != null && (i.callback = n), t = fo(e, i, r), t !== null && (Md(t, e, r), po(t, e, r));
		},
		enqueueForceUpdate: function(e, t) {
			e = e._reactInternals;
			var n = kd(), r = uo(n);
			r.tag = 2, t != null && (r.callback = t), t = fo(e, r, n), t !== null && (Md(t, e, n), po(t, e, n));
		}
	};
	function gc(e, t, n, r, i, a, o) {
		return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, a, o) : t.prototype && t.prototype.isPureReactComponent ? !Lr(n, r) || !Lr(i, a) : !0;
	}
	function _c(e, t, n, r) {
		e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && hc.enqueueReplaceState(t, t.state, null);
	}
	function vc(e, t) {
		var n = t;
		if ("ref" in t) for (var r in n = {}, t) r !== "ref" && (n[r] = t[r]);
		if (e = e.defaultProps) for (var i in n === t && (n = D({}, n)), e) n[i] === void 0 && (n[i] = e[i]);
		return n;
	}
	function yc(e) {
		mi(e);
	}
	function bc(e) {
		console.error(e);
	}
	function xc(e) {
		mi(e);
	}
	function Sc(e, t) {
		try {
			var n = e.onUncaughtError;
			n(t.value, { componentStack: t.stack });
		} catch (e) {
			setTimeout(function() {
				throw e;
			});
		}
	}
	function Cc(e, t, n) {
		try {
			var r = e.onCaughtError;
			r(n.value, {
				componentStack: n.stack,
				errorBoundary: t.tag === 1 ? t.stateNode : null
			});
		} catch (e) {
			setTimeout(function() {
				throw e;
			});
		}
	}
	function wc(e, t, n) {
		return n = uo(n), n.tag = 3, n.payload = { element: null }, n.callback = function() {
			Sc(e, t);
		}, n;
	}
	function Tc(e) {
		return e = uo(e), e.tag = 3, e;
	}
	function Ec(e, t, n, r) {
		var i = n.type.getDerivedStateFromError;
		if (typeof i == "function") {
			var a = r.value;
			e.payload = function() {
				return i(a);
			}, e.callback = function() {
				Cc(t, n, r);
			};
		}
		var o = n.stateNode;
		o !== null && typeof o.componentDidCatch == "function" && (e.callback = function() {
			Cc(t, n, r), typeof i != "function" && (gd === null ? gd = /* @__PURE__ */ new Set([this]) : gd.add(this));
			var e = r.stack;
			this.componentDidCatch(r.value, { componentStack: e === null ? "" : e });
		});
	}
	function Dc(e, t, n, r, a) {
		if (n.flags |= 32768, typeof r == "object" && r && typeof r.then == "function") {
			if (t = n.alternate, t !== null && ga(t, n, a, !0), n = To.current, n !== null) {
				switch (n.tag) {
					case 31:
					case 13:
					case 19: return Eo === null ? Wd() : n.alternate === null && rd === 0 && (rd = 3), n.flags &= -257, n.flags |= 65536, n.lanes = a, r === Ka ? n.flags |= 16384 : (t = n.updateQueue, t === null ? n.updateQueue = /* @__PURE__ */ new Set([r]) : t.add(r), pf(e, r, a)), !1;
					case 22: return n.flags |= 65536, r === Ka ? n.flags |= 16384 : (t = n.updateQueue, t === null ? (t = {
						transitions: null,
						markerInstances: null,
						retryQueue: /* @__PURE__ */ new Set([r])
					}, n.updateQueue = t) : (n = t.retryQueue, n === null ? t.retryQueue = /* @__PURE__ */ new Set([r]) : n.add(r)), pf(e, r, a)), !1;
				}
				throw Error(i(435, n.tag));
			}
			return pf(e, r, a), Wd(), !1;
		}
		if (K) return t = To.current, t === null ? (r !== ta && (t = Error(i(423), { cause: r }), ca(Ii(t, n))), e = e.current.alternate, e.flags |= 65536, a &= -a, e.lanes |= a, r = Ii(r, n), a = wc(e.stateNode, r, a), mo(e, a), rd !== 4 && (rd = 2)) : (!(t.flags & 65536) && (t.flags |= 256), t.flags |= 65536, t.lanes = a, r !== ta && (e = Error(i(422), { cause: r }), ca(Ii(e, n)))), !1;
		var o = Error(i(520), { cause: r });
		if (o = Ii(o, n), ld === null ? ld = [o] : ld.push(o), rd !== 4 && (rd = 2), t === null) return !0;
		r = Ii(r, n), n = t;
		do {
			switch (n.tag) {
				case 3: return n.flags |= 65536, e = a & -a, n.lanes |= e, e = wc(n.stateNode, r, e), mo(n, e), !1;
				case 1:
					if (t = n.type, o = n.stateNode, !(n.flags & 128) && (typeof t.getDerivedStateFromError == "function" || o !== null && typeof o.componentDidCatch == "function" && (gd === null || !gd.has(o)))) return n.flags |= 65536, a &= -a, n.lanes |= a, a = Tc(a), Ec(a, e, n, r), mo(n, a), !1;
					break;
				case 22: if (n.memoizedState !== null) return n.flags |= 65536, !1;
			}
			n = n.return;
		} while (n !== null);
		return !1;
	}
	var Oc = Error(i(461)), kc = !1;
	function Ac(e, t, n, r) {
		t.child = e === null ? oo(t, null, n, r) : ao(t, e.child, n, r);
	}
	function jc(e, t, n, r, i) {
		n = n.render;
		var a = t.ref;
		if ("ref" in r) {
			var o = {};
			for (var s in r) s !== "ref" && (o[s] = r[s]);
		} else o = r;
		return va(t), r = Jo(e, t, n, o, a, i), s = Qo(), e !== null && !kc ? ($o(e, t, i), al(e, t, i)) : (K && s && Ji(t), t.flags |= 1, Ac(e, t, r, i), t.child);
	}
	function Mc(e, t, n, r, i) {
		if (e === null) {
			var a = n.type;
			return typeof a == "function" && !Di(a) && a.defaultProps === void 0 && n.compare === null ? (t.tag = 15, t.type = a, Nc(e, t, a, r, i)) : (e = Ai(n.type, null, r, t, t.mode, i), e.ref = t.ref, e.return = t, t.child = e);
		}
		if (a = e.child, !ol(e, i)) {
			var o = a.memoizedProps;
			if (n = n.compare, n = n === null ? Lr : n, n(o, r) && e.ref === t.ref) return al(e, t, i);
		}
		return t.flags |= 1, e = Oi(a, r), e.ref = t.ref, e.return = t, t.child = e;
	}
	function Nc(e, t, n, r, i) {
		if (e !== null) {
			var a = e.memoizedProps;
			if (Lr(a, r) && e.ref === t.ref) {
				if (kc = !1, t.pendingProps = r = a, ol(e, i)) e.flags & 131072 && (kc = !0);
				else return t.lanes = e.lanes, al(e, t, i);
			}
		}
		return Vc(e, t, n, r, i);
	}
	function Pc(e, t, n, r) {
		var i = r.children, a = e === null ? null : e.memoizedState;
		if (e === null && t.stateNode === null && (t.stateNode = {
			_visibility: 1,
			_pendingMarkers: null,
			_retryCache: null,
			_transitions: null
		}), r.mode === "hidden") {
			if (t.flags & 128) {
				if (a = a === null ? n : a.baseLanes | n, e !== null) {
					for (r = t.child = e.child, i = 0; r !== null;) i = i | r.lanes | r.childLanes, r = r.sibling;
					r = i & ~a;
				} else r = 0, t.child = null;
				return Ic(e, t, a, n, r);
			}
			if (n & 536870912) t.memoizedState = {
				baseLanes: 0,
				cachePool: null
			}, e !== null && Va(t, a === null ? null : a.cachePool), a === null ? Co() : So(t, a), ko(t);
			else return r = t.lanes = 536870912, Ic(e, t, a === null ? n : a.baseLanes | n, n, r);
		} else a === null ? (e !== null && Va(t, null), Co(), Ao()) : (Va(t, a.cachePool), So(t, a), Ao(), t.memoizedState = null);
		return Ac(e, t, i, n), t.child;
	}
	function Fc(e, t) {
		return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
			_visibility: 1,
			_pendingMarkers: null,
			_retryCache: null,
			_transitions: null
		}), t.sibling;
	}
	function Ic(e, t, n, r, i) {
		var a = Ba();
		return a = a === null ? null : {
			parent: Ta._currentValue,
			pool: a
		}, t.memoizedState = {
			baseLanes: n,
			cachePool: a
		}, e !== null && Va(t, null), Co(), ko(t), e !== null && ga(e, t, r, !0), t.childLanes = i, null;
	}
	function Lc(e, t) {
		return t = Xc({
			mode: t.mode,
			children: t.children
		}, e.mode), t.ref = e.ref, e.child = t, t.return = e, t;
	}
	function Rc(e, t, n) {
		return ao(t, e.child, null, n), e = Lc(t, t.pendingProps), e.flags |= 2, jo(t), t.memoizedState = null, e;
	}
	function zc(e, t, n) {
		var r = t.pendingProps, a = !!(t.flags & 128);
		if (t.flags &= -129, e === null) {
			if (K) {
				if (r.mode === "hidden") return e = Lc(t, r), t.lanes = 536870912, e.memoizedState = {
					baseLanes: 0,
					cachePool: null
				}, Fc(null, e);
				if (Oo(t), (e = Qi) ? (e = am(e, ea), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: Ui === null ? null : {
						id: Wi,
						overflow: Gi
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = Ni(e), n.return = t, t.child = n, Zi = t, Qi = null)) : e = null, e === null) throw na(t);
				return t.lanes = 536870912, null;
			}
			return Lc(t, r);
		}
		var o = e.memoizedState;
		if (o !== null) {
			var s = o.dehydrated;
			if (Oo(t), a) {
				if (t.flags & 256) t.flags &= -257, t = Rc(e, t, n);
				else if (t.memoizedState !== null) t.child = e.child, t.flags |= 128, t = null;
				else throw Error(i(558));
			} else if (kc || ga(e, t, n, !1), a = (n & e.childLanes) !== 0, kc || a) {
				if (bo.current === null) {
					if (r = Zu, r !== null && (s = _t(r, n), s !== 0 && s !== o.retryLane)) throw o.retryLane = s, xi(e, s), Md(r, e, s), Oc;
					Wd();
				}
				t = Rc(e, t, n);
			} else e = o.treeContext, Qi = lm(s.nextSibling), Zi = t, K = !0, $i = null, ea = !1, e !== null && Xi(t, e), t = Lc(t, r), t.flags |= 134221824;
			return t;
		}
		return e = Oi(e.child, {
			mode: r.mode,
			children: r.children
		}), e.ref = t.ref, t.child = e, e.return = t, e;
	}
	function Bc(e, t) {
		var n = t.ref;
		if (n === null) e !== null && e.ref !== null && (t.flags |= 4194816);
		else {
			if (typeof n != "function" && typeof n != "object") throw Error(i(284));
			(e === null || e.ref !== n) && (t.flags |= 4194816);
		}
	}
	function Vc(e, t, n, r, i) {
		return va(t), n = Jo(e, t, n, r, void 0, i), r = Qo(), e !== null && !kc ? ($o(e, t, i), al(e, t, i)) : (K && r && Ji(t), t.flags |= 1, Ac(e, t, n, i), t.child);
	}
	function Hc(e, t, n, r, i, a) {
		return va(t), t.updateQueue = null, n = Xo(t, r, n, i), Yo(e), r = Qo(), e !== null && !kc ? ($o(e, t, a), al(e, t, a)) : (K && r && Ji(t), t.flags |= 1, Ac(e, t, n, a), t.child);
	}
	function Uc(e, t, n, r, i) {
		if (va(t), t.stateNode === null) {
			var a = wi, o = n.contextType;
			typeof o == "object" && o && (a = ya(o)), a = new n(r, a), t.memoizedState = a.state !== null && a.state !== void 0 ? a.state : null, a.updater = hc, t.stateNode = a, a._reactInternals = t, a = t.stateNode, a.props = r, a.state = t.memoizedState, a.refs = {}, co(t), o = n.contextType, a.context = typeof o == "object" && o ? ya(o) : wi, a.state = t.memoizedState, o = n.getDerivedStateFromProps, typeof o == "function" && (mc(t, n, o, r), a.state = t.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof a.getSnapshotBeforeUpdate == "function" || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (o = a.state, typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount(), o !== a.state && hc.enqueueReplaceState(a, a.state, null), _o(t, r, a, i), go(), a.state = t.memoizedState), typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !0;
		} else if (e === null) {
			a = t.stateNode;
			var s = t.memoizedProps, c = vc(n, s);
			a.props = c;
			var l = a.context, u = n.contextType;
			o = wi, typeof u == "object" && u && (o = ya(u));
			var d = n.getDerivedStateFromProps;
			u = typeof d == "function" || typeof a.getSnapshotBeforeUpdate == "function", s = t.pendingProps !== s, u || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (s || l !== o) && _c(t, a, r, o), so = !1;
			var f = t.memoizedState;
			a.state = f, _o(t, r, a, i), go(), l = t.memoizedState, s || f !== l || so ? (typeof d == "function" && (mc(t, n, d, r), l = t.memoizedState), (c = so || gc(t, n, c, r, f, l, o)) ? (u || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount()), typeof a.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = l), a.props = r, a.state = l, a.context = o, r = c) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
		} else {
			a = t.stateNode, lo(e, t), o = t.memoizedProps, u = vc(n, o), a.props = u, d = t.pendingProps, f = a.context, l = n.contextType, c = wi, typeof l == "object" && l && (c = ya(l)), s = n.getDerivedStateFromProps, (l = typeof s == "function" || typeof a.getSnapshotBeforeUpdate == "function") || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (o !== d || f !== c) && _c(t, a, r, c), so = !1, f = t.memoizedState, a.state = f, _o(t, r, a, i), go();
			var p = t.memoizedState;
			o !== d || f !== p || so || e !== null && e.dependencies !== null && _a(e.dependencies) ? (typeof s == "function" && (mc(t, n, s, r), p = t.memoizedState), (u = so || gc(t, n, u, r, f, p, c) || e !== null && e.dependencies !== null && _a(e.dependencies)) ? (l || typeof a.UNSAFE_componentWillUpdate != "function" && typeof a.componentWillUpdate != "function" || (typeof a.componentWillUpdate == "function" && a.componentWillUpdate(r, p, c), typeof a.UNSAFE_componentWillUpdate == "function" && a.UNSAFE_componentWillUpdate(r, p, c)), typeof a.componentDidUpdate == "function" && (t.flags |= 4), typeof a.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = p), a.props = r, a.state = p, a.context = c, r = u) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), r = !1);
		}
		return a = r, Bc(e, t), r = !!(t.flags & 128), a || r ? (a = t.stateNode, n = r && typeof n.getDerivedStateFromError != "function" ? null : a.render(), t.flags |= 1, e !== null && r ? (t.child = ao(t, e.child, null, i), t.child = ao(t, null, n, i)) : Ac(e, t, n, i), t.memoizedState = a.state, e = t.child) : e = al(e, t, i), e;
	}
	function Wc(e, t, n, r) {
		return oa(), t.flags |= 256, Ac(e, t, n, r), t.child;
	}
	var Gc = {
		dehydrated: null,
		treeContext: null,
		retryLane: 0,
		hydrationErrors: null
	};
	function Kc(e) {
		return {
			baseLanes: e,
			cachePool: Ha()
		};
	}
	function qc(e, t, n) {
		return e = e === null ? 0 : e.childLanes & ~n, t && (e |= sd), e;
	}
	function Jc(e, t, n) {
		var r = t.pendingProps, i = !1, a = !!(t.flags & 128), o;
		if ((o = a) || (o = e !== null && e.memoizedState === null ? !1 : !!(Mo.current & 2)), o && (i = !0, t.flags &= -129), o = !!(t.flags & 32), t.flags &= -33, e === null) {
			if (K) {
				if (i ? Do(t) : Ao(), (e = Qi) ? (e = am(e, ea), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: Ui === null ? null : {
						id: Wi,
						overflow: Gi
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = Ni(e), n.return = t, t.child = n, Zi = t, Qi = null)) : e = null, e === null) throw na(t);
				return t.lanes = sm(e) ? 32 : 536870912, null;
			}
			return a = r.children, r = r.fallback, i ? (Ao(), i = t.mode, a = Xc({
				mode: "hidden",
				children: a
			}, i), r = ji(r, i, n, null), a.return = t, r.return = t, a.sibling = r, t.child = a, r = t.child, r.memoizedState = Kc(n), r.childLanes = qc(e, o, n), t.memoizedState = Gc, Fc(null, r)) : (Do(t), Yc(t, a));
		}
		var s = e.memoizedState;
		if (s !== null) {
			var c = s.dehydrated;
			if (c !== null) return Qc(e, t, a, o, r, c, s, n);
		}
		return i ? (Ao(), i = r.fallback, a = t.mode, s = e.child, c = s.sibling, r = Oi(s, {
			mode: "hidden",
			children: r.children
		}), r.subtreeFlags = s.subtreeFlags & 1206910976, c === null ? (i = ji(i, a, n, null), i.flags |= 2) : i = Oi(c, i), i.return = t, r.return = t, r.sibling = i, t.child = r, Fc(null, r), r = t.child, i = e.child.memoizedState, i === null ? i = Kc(n) : (a = i.cachePool, a === null ? a = Ha() : (s = Ta._currentValue, a = a.parent === s ? a : {
			parent: s,
			pool: s
		}), i = {
			baseLanes: i.baseLanes | n,
			cachePool: a
		}), r.memoizedState = i, r.childLanes = qc(e, o, n), t.memoizedState = Gc, Fc(e.child, r)) : (Do(t), n = e.child, e = n.sibling, n = Oi(n, {
			mode: "visible",
			children: r.children
		}), n.return = t, n.sibling = null, e !== null && (o = t.deletions, o === null ? (t.deletions = [e], t.flags |= 16) : o.push(e)), t.child = n, t.memoizedState = null, n);
	}
	function Yc(e, t) {
		return t = Xc({
			mode: "visible",
			children: t
		}, e.mode), t.return = e, e.child = t;
	}
	function Xc(e, t) {
		return e = Ei(22, e, null, t), e.lanes = 0, e;
	}
	function Zc(e, t, n) {
		return ao(t, e.child, null, n), e = Yc(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
	}
	function Qc(e, t, n, r, a, o, s, c) {
		if (n) return t.flags & 256 ? (Do(t), t.flags &= -257, Zc(e, t, c)) : t.memoizedState === null ? (Ao(), o = a.fallback, s = t.mode, a = Xc({
			mode: "visible",
			children: a.children
		}, s), o = ji(o, s, c, null), o.flags |= 2, a.return = t, o.return = t, a.sibling = o, t.child = a, ao(t, e.child, null, c), a = t.child, a.memoizedState = Kc(c), a.childLanes = qc(e, r, c), t.memoizedState = Gc, Fc(null, a)) : (Ao(), t.child = e.child, t.flags |= 128, null);
		if (Do(t), sm(o)) {
			if (r = o.nextSibling && o.nextSibling.dataset, r) var l = r.dgst;
			return r = l, r !== "" && (a = Error(i(419)), a.stack = "", a.digest = r, ca({
				value: a,
				source: null,
				stack: null
			})), Zc(e, t, c);
		}
		if (kc || ga(e, t, c, !1), r = (c & e.childLanes) !== 0, kc || r) {
			if (bo.current !== null) return Zc(e, t, c);
			if (r = Zu, r !== null && (a = _t(r, c), a !== 0 && a !== s.retryLane)) throw s.retryLane = a, xi(e, a), Md(r, e, a), Oc;
			return om(o) || Wd(), Zc(e, t, c);
		}
		return om(o) ? (t.flags |= 192, t.child = e.child, null) : (e = s.treeContext, Qi = lm(o.nextSibling), Zi = t, K = !0, $i = null, ea = !1, e !== null && Xi(t, e), t = Yc(t, a.children), t.flags |= 134221824, t);
	}
	function $c(e, t, n) {
		e.lanes |= t;
		var r = e.alternate;
		r !== null && (r.lanes |= t), ma(e.return, t, n);
	}
	function el(e) {
		for (var t = null; e !== null;) {
			var n = e.alternate;
			n !== null && Fo(n) === null && (t = e), e = e.sibling;
		}
		return t;
	}
	function tl(e, t, n, r, i, a) {
		var o = e.memoizedState;
		o === null ? e.memoizedState = {
			isBackwards: t,
			rendering: null,
			renderingStartTime: 0,
			last: r,
			tail: n,
			tailMode: i,
			treeForkCount: a
		} : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = n, o.tailMode = i, o.treeForkCount = a);
	}
	function nl(e) {
		var t = e.child;
		for (e.child = null; t !== null;) {
			var n = t.sibling;
			t.sibling = e.child, e.child = t, t = n;
		}
	}
	function rl(e, t, n) {
		var r = t.pendingProps, i = r.revealOrder, a = r.tail;
		r = r.children;
		var o = Mo.current;
		if (t.flags & 128) return No(t, o), null;
		var s = !!(o & 2);
		if (s ? (o = o & 1 | 2, t.flags |= 128) : o &= 1, No(t, o), i === "backwards" && e !== null ? (nl(e), Ac(e, t, r, n), nl(e)) : Ac(e, t, r, n), r = K ? Bi : 0, !s && e !== null && e.flags & 128) a: for (e = t.child; e !== null;) {
			if (e.tag === 13) e.memoizedState !== null && $c(e, n, t);
			else if (e.tag === 19) $c(e, n, t);
			else if (e.child !== null) {
				e.child.return = e, e = e.child;
				continue;
			}
			if (e === t) break a;
			for (; e.sibling === null;) {
				if (e.return === null || e.return === t) break a;
				e = e.return;
			}
			e.sibling.return = e.return, e = e.sibling;
		}
		switch (i) {
			case "backwards":
				n = el(t.child), n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null, nl(t)), tl(t, !0, i, null, a, r);
				break;
			case "unstable_legacy-backwards":
				for (n = null, i = t.child, t.child = null; i !== null;) {
					if (e = i.alternate, e !== null && Fo(e) === null) {
						t.child = i;
						break;
					}
					e = i.sibling, i.sibling = n, n = i, i = e;
				}
				tl(t, !0, n, null, a, r);
				break;
			case "together":
				tl(t, !1, null, null, void 0, r);
				break;
			case "independent":
				t.memoizedState = null;
				break;
			default: n = el(t.child), n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null), tl(t, !1, i, n, a, r);
		}
		return t.child;
	}
	function il(e, t, n) {
		var r = t.pendingProps;
		return fa(t, t.type, r.value), Ac(e, t, r.children, n), t.child;
	}
	function al(e, t, n) {
		if (e !== null && (t.dependencies = e.dependencies), id |= t.lanes, (n & t.childLanes) === 0) {
			if (e !== null) {
				if (ga(e, t, n, !1), (n & t.childLanes) === 0) return null;
			} else return null;
		}
		if (e !== null && t.child !== e.child) throw Error(i(153));
		if (t.child !== null) {
			for (e = t.child, n = Oi(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null;) e = e.sibling, n = n.sibling = Oi(e, e.pendingProps), n.return = t;
			n.sibling = null;
		}
		return t.child;
	}
	function ol(e, t) {
		return (e.lanes & t) !== 0 || (e = e.dependencies, !!(e !== null && _a(e)));
	}
	function sl(e, t, n) {
		switch (t.tag) {
			case 3:
				Oe(t, t.stateNode.containerInfo), fa(t, Ta, e.memoizedState.cache), oa();
				break;
			case 27:
			case 5:
				Ae(t);
				break;
			case 4:
				Oe(t, t.stateNode.containerInfo);
				break;
			case 10:
				fa(t, t.type, t.memoizedProps.value);
				break;
			case 31:
				if (t.memoizedState !== null) return t.flags |= 128, Oo(t), null;
				break;
			case 13:
				var r = t.memoizedState;
				if (r !== null) {
					if (r.dehydrated !== null) return Do(t), t.flags |= 128, null;
					r = ga(e, t, n, !1);
					var i = t.child.childLanes;
					return r || (n & i) !== 0 ? Jc(e, t, n) : (Do(t), e = al(e, t, n), e === null ? null : e.sibling);
				}
				Do(t);
				break;
			case 19:
				if (t.flags & 128) return rl(e, t, n);
				if (i = !!(e.flags & 128), r = (n & t.childLanes) !== 0, r ||= (ga(e, t, n, !1), (n & t.childLanes) !== 0), i) {
					if (r) return rl(e, t, n);
					t.flags |= 128;
				}
				if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), No(t, Mo.current), r) break;
				return null;
			case 22: return t.lanes = 0, Pc(e, t, n, t.pendingProps);
			case 24: fa(t, Ta, e.memoizedState.cache);
		}
		return al(e, t, n);
	}
	function cl(e, t, n) {
		if (e !== null) {
			if (e.memoizedProps !== t.pendingProps) kc = !0;
			else {
				if (!ol(e, n) && !(t.flags & 128)) return kc = !1, sl(e, t, n);
				kc = !!(e.flags & 131072);
			}
		} else kc = !1, K && t.flags & 1048576 && qi(t, Bi, t.index);
		switch (t.lanes = 0, t.tag) {
			case 16:
				a: {
					var r = t.pendingProps;
					if (e = Ya(t.elementType), t.type = e, typeof e == "function") Di(e) ? (r = vc(e, r), t.tag = 1, t = Uc(null, t, e, r, n)) : (t.tag = 0, t = Vc(null, t, e, r, n));
					else {
						if (e != null) {
							var a = e.$$typeof;
							if (a === N) {
								t.tag = 11, t = jc(null, t, e, r, n);
								break a;
							}
							if (a === ae) {
								t.tag = 14, t = Mc(null, t, e, r, n);
								break a;
							}
							if (a === ne) {
								t.tag = 10, t.type = e, t = il(null, t, n);
								break a;
							}
						}
						throw t = he(e) || e, Error(i(306, t, ""));
					}
				}
				return t;
			case 0: return Vc(e, t, t.type, t.pendingProps, n);
			case 1: return r = t.type, a = vc(r, t.pendingProps), Uc(e, t, r, a, n);
			case 3:
				a: {
					if (Oe(t, t.stateNode.containerInfo), e === null) throw Error(i(387));
					r = t.pendingProps;
					var o = t.memoizedState;
					a = o.element, lo(e, t), _o(t, r, null, n);
					var s = t.memoizedState;
					if (r = s.cache, fa(t, Ta, r), r !== o.cache && ha(t, [Ta], n, !0), go(), r = s.element, o.isDehydrated) {
						if (o = {
							element: r,
							isDehydrated: !1,
							cache: s.cache
						}, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
							t = Wc(e, t, r, n);
							break a;
						}
						if (r !== a) {
							a = Ii(Error(i(424)), t), ca(a), t = Wc(e, t, r, n);
							break a;
						}
						switch (e = t.stateNode.containerInfo, e.nodeType) {
							case 9:
								e = e.body;
								break;
							default: e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
						}
						for (Qi = lm(e.firstChild), Zi = t, K = !0, $i = null, ea = !0, n = oo(t, null, r, n), t.child = n; n;) n.flags = n.flags & -3 | 134221824, n = n.sibling;
					} else {
						if (oa(), r === a) {
							t = al(e, t, n);
							break a;
						}
						Ac(e, t, r, n);
					}
					t = t.child;
				}
				return t;
			case 26: return Bc(e, t), e === null ? (n = Nm(t.type, null, t.pendingProps, null)) ? t.memoizedState = n : K || (t.stateNode = fp(t.type, t.pendingProps, Ee.current, t)) : t.memoizedState = Nm(t.type, e.memoizedProps, t.pendingProps, e.memoizedState), null;
			case 27: return Ae(t), e === null && K && (r = t.stateNode = hm(t.type, t.pendingProps, Ee.current), Zi = t, ea = !0, a = Qi, Sp(t.type) ? (um = a, Qi = lm(r.firstChild)) : Qi = a), Ac(e, t, t.pendingProps.children, n), Bc(e, t), e === null && (t.flags |= 4194304), t.child;
			case 5: return e === null && K && ((a = r = Qi) && (r = rm(r, t.type, t.pendingProps, ea), r === null ? a = !1 : (t.stateNode = r, Zi = t, Qi = lm(r.firstChild), ea = !1, a = !0)), a || na(t)), Ae(t), a = t.type, o = t.pendingProps, s = e === null ? null : e.memoizedProps, r = o.children, pp(a, o) ? r = null : s !== null && pp(a, s) && (t.flags |= 32), t.memoizedState !== null && (a = Jo(e, t, Zo, null, null, n), sh._currentValue = a), Bc(e, t), Ac(e, t, r, n), t.child;
			case 6: return e === null && K && ((e = n = Qi) && (n = im(n, t.pendingProps, ea), n === null ? e = !1 : (t.stateNode = n, Zi = t, Qi = null, e = !0)), e || na(t)), null;
			case 13: return Jc(e, t, n);
			case 4: return Oe(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = ao(t, null, r, n) : Ac(e, t, r, n), t.child;
			case 11: return jc(e, t, t.type, t.pendingProps, n);
			case 7: return r = t.pendingProps, Bc(e, t), Ac(e, t, r, n), t.child;
			case 8: return Ac(e, t, t.pendingProps.children, n), t.child;
			case 12: return Ac(e, t, t.pendingProps.children, n), t.child;
			case 10: return il(e, t, n);
			case 9: return a = t.type._context, r = t.pendingProps.children, va(t), a = ya(a), r = r(a), t.flags |= 1, Ac(e, t, r, n), t.child;
			case 14: return Mc(e, t, t.type, t.pendingProps, n);
			case 15: return Nc(e, t, t.type, t.pendingProps, n);
			case 19: return rl(e, t, n);
			case 31: return zc(e, t, n);
			case 22: return Pc(e, t, n, t.pendingProps);
			case 24: return va(t), r = ya(Ta), e === null ? (a = Ba(), a === null && (a = Zu, o = Ea(), a.pooledCache = o, o.refCount++, o !== null && (a.pooledCacheLanes |= n), a = o), t.memoizedState = {
				parent: r,
				cache: a
			}, co(t), fa(t, Ta, a)) : ((e.lanes & n) !== 0 && (lo(e, t), _o(t, null, null, n), go()), a = e.memoizedState, o = t.memoizedState, a.parent === r ? (r = o.cache, fa(t, Ta, r), r !== a.cache && ha(t, [Ta], n, !0)) : (a = {
				parent: r,
				cache: r
			}, t.memoizedState = a, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = a), fa(t, Ta, r))), Ac(e, t, t.pendingProps.children, n), t.child;
			case 30: return t.stateNode === null && (t.stateNode = {
				autoName: null,
				paired: null,
				clones: null,
				ref: null
			}), r = t.pendingProps, r.name != null && r.name !== "auto" ? t.flags |= e === null ? 18882560 : 18874368 : K && Ji(t), e !== null && e.memoizedProps.name !== r.name ? t.flags |= 4194816 : Bc(e, t), Ac(e, t, r.children, n), t.child;
			case 29: throw t.pendingProps;
		}
		throw Error(i(156, t.tag));
	}
	function ll(e) {
		e.flags |= 4;
	}
	function ul(e, t, n, r, i) {
		var a;
		if ((a = !!(e.mode & 32)) && (a = n === null ? Jm(t, r) : Jm(t, r) && (r.src !== n.src || r.srcSet !== n.srcSet)), a) {
			if (e.flags |= 16777216, (i & 335544128) === i) {
				if (e.stateNode.complete) e.flags |= 8192;
				else if (Vd()) e.flags |= 8192;
				else throw Xa = Ka, Wa;
			}
		} else e.flags &= -16777217;
	}
	function dl(e, t) {
		if (t.type !== "stylesheet" || t.state.loading & 4) e.flags &= -16777217;
		else if (e.flags |= 16777216, !Ym(t)) {
			if (Vd()) e.flags |= 8192;
			else throw Xa = Ka, Wa;
		}
	}
	function fl(e, t) {
		t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag === 22 ? 536870912 : dt(), e.lanes |= t, cd |= t);
	}
	function pl(e, t) {
		if (!K) switch (e.tailMode) {
			case "visible": break;
			case "collapsed":
				for (var n = e.tail, r = null; n !== null;) n.alternate !== null && (r = n), n = n.sibling;
				r === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null;
				break;
			default:
				for (t = e.tail, n = null; t !== null;) t.alternate !== null && (n = t), t = t.sibling;
				n === null ? e.tail = null : n.sibling = null;
		}
	}
	function ml(e) {
		var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
		if (t) for (var i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags & 1206910976, r |= i.flags & 1206910976, i.return = e, i = i.sibling;
		else for (i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags, r |= i.flags, i.return = e, i = i.sibling;
		return e.subtreeFlags |= r, e.childLanes = n, t;
	}
	function hl(e, t, n) {
		var r = t.pendingProps;
		switch (Yi(t), t.tag) {
			case 16:
			case 15:
			case 0:
			case 11:
			case 7:
			case 8:
			case 12:
			case 9:
			case 14: return ml(t), null;
			case 1: return ml(t), null;
			case 3: return n = t.stateNode, r = null, e !== null && (r = e.memoizedState.cache), t.memoizedState.cache !== r && (t.flags |= 2048), pa(Ta), ke(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (aa(t) ? ll(t) : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, sa())), ml(t), null;
			case 26:
				var a = t.type, o = t.memoizedState;
				return e === null ? (ll(t), o === null ? (ml(t), ul(t, a, null, r, n)) : (ml(t), dl(t, o))) : o ? o === e.memoizedState ? (ml(t), t.flags &= -16777217) : (ll(t), ml(t), dl(t, o)) : (e = e.memoizedProps, e !== r && ll(t), ml(t), ul(t, a, e, r, n)), null;
			case 27:
				if (je(t), n = Ee.current, a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && ll(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return ml(t), t.subtreeFlags &= -33554433, null;
					}
					e = we.current, aa(t) ? ra(t, e) : (e = hm(a, r, n), t.stateNode = e, ll(t));
				}
				return ml(t), t.subtreeFlags &= -33554433, null;
			case 5:
				if (je(t), a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && ll(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return ml(t), t.subtreeFlags &= -33554433, null;
					}
					if (o = we.current, aa(t)) ra(t, o);
					else {
						var s = lp(Ee.current);
						switch (o) {
							case 1:
								o = s.createElementNS("http://www.w3.org/2000/svg", a);
								break;
							case 2:
								o = s.createElementNS("http://www.w3.org/1998/Math/MathML", a);
								break;
							default: switch (a) {
								case "svg":
									o = s.createElementNS("http://www.w3.org/2000/svg", a);
									break;
								case "math":
									o = s.createElementNS("http://www.w3.org/1998/Math/MathML", a);
									break;
								case "script":
									o = s.createElement("div"), o.innerHTML = "<script><\/script>", o = o.removeChild(o.firstChild);
									break;
								case "select":
									o = typeof r.is == "string" ? s.createElement("select", { is: r.is }) : s.createElement("select"), r.multiple ? o.multiple = !0 : r.size && (o.size = r.size);
									break;
								default: o = typeof r.is == "string" ? s.createElement(a, { is: r.is }) : s.createElement(a);
							}
						}
						o[Ct] = t, o[R] = r;
						a: for (s = t.child; s !== null;) {
							if (s.tag === 5 || s.tag === 6) o.appendChild(s.stateNode);
							else if (s.tag !== 4 && s.tag !== 27 && s.child !== null) {
								s.child.return = s, s = s.child;
								continue;
							}
							if (s === t) break a;
							for (; s.sibling === null;) {
								if (s.return === null || s.return === t) break a;
								s = s.return;
							}
							s.sibling.return = s.return, s = s.sibling;
						}
						t.stateNode = o;
						a: switch (np(o, a, r), a) {
							case "button":
							case "input":
							case "select":
							case "textarea":
								r = !!r.autoFocus;
								break a;
							case "img":
								r = !0;
								break a;
							default: r = !1;
						}
						r && ll(t);
					}
				}
				return ml(t), t.subtreeFlags &= -33554433, ul(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, n), null;
			case 6:
				if (e && t.stateNode != null) e.memoizedProps !== r && ll(t);
				else {
					if (typeof r != "string" && t.stateNode === null) throw Error(i(166));
					if (e = Ee.current, aa(t)) {
						if (e = t.stateNode, n = t.memoizedProps, r = null, a = Zi, a !== null) switch (a.tag) {
							case 27:
							case 5: r = a.memoizedProps;
						}
						e[Ct] = t, e = !!(e.nodeValue === n || r !== null && !0 === r.suppressHydrationWarning || $f(e.nodeValue, n)), e || na(t, !0);
					} else e = lp(e).createTextNode(r), e[Ct] = t, t.stateNode = e;
				}
				return ml(t), null;
			case 31:
				if (n = t.memoizedState, e === null || e.memoizedState !== null) {
					if (r = aa(t), n !== null) {
						if (e === null) {
							if (!r) throw Error(i(318));
							if (e = t.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(557));
							e[Ct] = t;
						} else oa(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						ml(t), e = !1;
					} else n = sa(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), e = !0;
					if (!e) return t.flags & 256 ? (jo(t), t) : (jo(t), null);
					if (t.flags & 128) throw Error(i(558));
				}
				return ml(t), null;
			case 13:
				if (r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
					if (a = aa(t), r !== null && r.dehydrated !== null) {
						if (e === null) {
							if (!a) throw Error(i(318));
							if (a = t.memoizedState, a = a === null ? null : a.dehydrated, !a) throw Error(i(317));
							a[Ct] = t;
						} else oa(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						ml(t), a = !1;
					} else a = sa(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a), a = !0;
					if (!a) return t.flags & 256 ? (jo(t), t) : (jo(t), null);
				}
				return jo(t), t.flags & 128 ? (t.lanes = n, t) : (n = r !== null, e = e !== null && e.memoizedState !== null, n && (r = t.child, a = null, r.alternate !== null && r.alternate.memoizedState !== null && r.alternate.memoizedState.cachePool !== null && (a = r.alternate.memoizedState.cachePool.pool), o = null, r.memoizedState !== null && r.memoizedState.cachePool !== null && (o = r.memoizedState.cachePool.pool), o !== a && (r.flags |= 2048)), n !== e && n && (t.child.flags |= 8192), fl(t, t.updateQueue), ml(t), null);
			case 4: return ke(), e === null && Uf(t.stateNode.containerInfo), t.flags |= 67108864, ml(t), null;
			case 10: return pa(t.type), ml(t), null;
			case 19:
				if (Po(t), r = t.memoizedState, r === null) return ml(t), null;
				if (a = !!(t.flags & 128), o = r.rendering, o === null) {
					if (a) pl(r, !1);
					else {
						if (rd !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null;) {
							if (o = Fo(e), o !== null) {
								for (t.flags |= 128, pl(r, !1), e = o.updateQueue, t.updateQueue = e, fl(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null;) ki(n, e), n = n.sibling;
								return No(t, Mo.current & 1 | 2), K && Ki(t, r.treeForkCount), t.child;
							}
							e = e.sibling;
						}
						r.tail !== null && Ue() > md && (t.flags |= 128, a = !0, pl(r, !1), t.lanes = 4194304);
					}
				} else {
					if (!a) {
						if (e = Fo(o), e !== null) {
							if (t.flags |= 128, a = !0, e = e.updateQueue, t.updateQueue = e, fl(t, e), pl(r, !0), r.tail === null && r.tailMode !== "collapsed" && r.tailMode !== "visible" && !o.alternate && !K) return ml(t), null;
						} else 2 * Ue() - r.renderingStartTime > md && n !== 536870912 && (t.flags |= 128, a = !0, pl(r, !1), t.lanes = 4194304);
					}
					r.isBackwards ? (o.sibling = t.child, t.child = o) : (e = r.last, e === null ? t.child = o : e.sibling = o, r.last = o);
				}
				if (r.tail !== null) {
					e = r.tail;
					a: {
						for (n = e; n !== null;) {
							if (n.alternate !== null) {
								n = !1;
								break a;
							}
							n = n.sibling;
						}
						n = !0;
					}
					return r.rendering = e, r.tail = e.sibling, r.renderingStartTime = Ue(), e.sibling = null, o = Mo.current, o = a ? o & 1 | 2 : o & 1, r.tailMode === "visible" || r.tailMode === "collapsed" || !n || K ? No(t, o) : (n = o, Ce(To, t), Ce(Mo, n), Eo === null && (Eo = t)), K && Ki(t, r.treeForkCount), e;
				}
				return ml(t), null;
			case 22:
			case 23: return jo(t), wo(), r = t.memoizedState !== null, e === null ? r && (t.flags |= 8192) : e.memoizedState !== null !== r && (t.flags |= 8192), r ? n & 536870912 && !(t.flags & 128) && (ml(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : ml(t), n = t.updateQueue, n !== null && fl(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), r = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (r = t.memoizedState.cachePool.pool), r !== n && (t.flags |= 2048), e !== null && Se(za), null;
			case 24: return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), pa(Ta), ml(t), null;
			case 25: return null;
			case 30: return t.flags |= 33554432, ml(t), null;
		}
		throw Error(i(156, t.tag));
	}
	function gl(e, t) {
		switch (Yi(t), t.tag) {
			case 1: return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 3: return pa(Ta), ke(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
			case 26:
			case 27:
			case 5: return je(t), null;
			case 31:
				if (t.memoizedState !== null) {
					if (jo(t), t.alternate === null) throw Error(i(340));
					oa();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 13:
				if (jo(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
					if (t.alternate === null) throw Error(i(340));
					oa();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 19: return Po(t), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, e = t.memoizedState, e !== null && (e.rendering = null, e.tail = null), t.flags |= 4, t) : null;
			case 4: return ke(), null;
			case 10: return pa(t.type), null;
			case 22:
			case 23: return jo(t), wo(), e !== null && Se(za), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 24: return pa(Ta), null;
			case 25: return null;
			default: return null;
		}
	}
	function _l(e, t) {
		switch (Yi(t), t.tag) {
			case 3:
				pa(Ta), ke();
				break;
			case 26:
			case 27:
			case 5:
				je(t);
				break;
			case 4:
				ke();
				break;
			case 31:
				t.memoizedState !== null && jo(t);
				break;
			case 13:
				jo(t);
				break;
			case 19:
				Po(t);
				break;
			case 10:
				pa(t.type);
				break;
			case 22:
			case 23:
				jo(t), wo(), e !== null && Se(za);
				break;
			case 24: pa(Ta);
		}
	}
	function vl(e, t) {
		try {
			var n = t.updateQueue, r = n === null ? null : n.lastEffect;
			if (r !== null) {
				var i = r.next;
				n = i;
				do {
					if ((n.tag & e) === e) {
						r = void 0;
						var a = n.create, o = n.inst;
						r = a(), o.destroy = r;
					}
					n = n.next;
				} while (n !== i);
			}
		} catch (e) {
			ff(t, t.return, e);
		}
	}
	function yl(e, t, n) {
		try {
			var r = t.updateQueue, i = r === null ? null : r.lastEffect;
			if (i !== null) {
				var a = i.next;
				r = a;
				do {
					if ((r.tag & e) === e) {
						var o = r.inst, s = o.destroy;
						if (s !== void 0) {
							o.destroy = void 0, i = t;
							var c = n, l = s;
							try {
								l();
							} catch (e) {
								ff(i, c, e);
							}
						}
					}
					r = r.next;
				} while (r !== a);
			}
		} catch (e) {
			ff(t, t.return, e);
		}
	}
	function bl(e) {
		var t = e.updateQueue;
		if (t !== null) {
			var n = e.stateNode;
			try {
				yo(t, n);
			} catch (t) {
				ff(e, e.return, t);
			}
		}
	}
	function xl(e, t, n) {
		n.props = vc(e.type, e.memoizedProps), n.state = e.memoizedState;
		try {
			n.componentWillUnmount();
		} catch (n) {
			ff(e, t, n);
		}
	}
	function Sl(e, t) {
		try {
			var n = e.ref;
			if (n !== null) {
				switch (e.tag) {
					case 26:
					case 27:
					case 5:
						var r = e.stateNode;
						break;
					case 30:
						var i = e.stateNode, a = di(e.memoizedProps, i);
						(i.ref === null || i.ref.name !== a) && (i.ref = Pp(a)), r = i.ref;
						break;
					case 7:
						if (e.stateNode === null) {
							var o = new Fp(e);
							f(e.child, !1, Qp, o, void 0, void 0), e.stateNode = o;
						}
						r = e.stateNode;
						break;
					default: r = e.stateNode;
				}
				typeof n == "function" ? e.refCleanup = n(r) : n.current = r;
			}
		} catch (n) {
			ff(e, t, n);
		}
	}
	function Cl(e, t) {
		var n = e.ref, r = e.refCleanup;
		if (n !== null) {
			if (typeof r == "function") try {
				r();
			} catch (n) {
				ff(e, t, n);
			} finally {
				e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
			}
			else if (typeof n == "function") try {
				n(null);
			} catch (n) {
				ff(e, t, n);
			}
			else n.current = null;
		}
	}
	function wl(e, t) {
		if ((e.tag === 5 || e.tag === 27 || e.tag === 6) && e.alternate === null && t !== null) for (var n = 0; n < t.length; n++) em(e.stateNode, t[n]);
	}
	function Tl(e) {
		for (var t = e.return; t !== null && (Ol(t) && em(e.stateNode, t.stateNode), !Dl(t));) t = t.return;
	}
	function El(e) {
		for (var t = e.return; t !== null && (Ol(t) && tm(e.stateNode, t.stateNode), !Dl(t));) t = t.return;
	}
	function Dl(e) {
		return e.tag === 5 || e.tag === 3 || e.tag === 27;
	}
	function Ol(e) {
		return e && e.tag === 7 && e.stateNode !== null;
	}
	function kl(e) {
		var t = e.type, n = e.memoizedProps, r = e.stateNode;
		try {
			a: switch (t) {
				case "button":
				case "input":
				case "select":
				case "textarea":
					n.autoFocus && r.focus();
					break a;
				case "img": n.src ? r.src = n.src : n.srcSet && (r.srcset = n.srcSet);
			}
		} catch (t) {
			ff(e, e.return, t);
		}
	}
	function Al(e, t, n) {
		try {
			var r = e.stateNode;
			ip(r, e.type, n, t), r[R] = t;
		} catch (t) {
			ff(e, e.return, t);
		}
	}
	function jl(e) {
		return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Sp(e.type) || e.tag === 4;
	}
	function Ml(e) {
		a: for (;;) {
			for (; e.sibling === null;) {
				if (e.return === null || jl(e.return)) return null;
				e = e.return;
			}
			for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18;) {
				if (e.tag === 27 && Sp(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue a;
				e.child.return = e, e = e.child;
			}
			if (!(e.flags & 2)) return e.stateNode;
		}
	}
	function Nl(e, t, n, r) {
		var i = e.tag;
		if (i === 5 || i === 6) i = e.stateNode, t ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(i, t) : (t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, t.appendChild(i), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = gn)), wl(e, r), Wt = !0;
		else if (i !== 4 && (i === 27 && (wl(e, r), r = null, Sp(e.type) && (n = e.stateNode, t = null)), e = e.child, e !== null)) for (Nl(e, t, n, r), e = e.sibling; e !== null;) Nl(e, t, n, r), e = e.sibling;
	}
	function Pl(e, t, n, r) {
		var i = e.tag;
		if (i === 5 || i === 6) i = e.stateNode, t ? n.insertBefore(i, t) : n.appendChild(i), wl(e, r), Wt = !0;
		else if (i !== 4 && (i === 27 && (wl(e, r), r = null, Sp(e.type) && (n = e.stateNode)), e = e.child, e !== null)) for (Pl(e, t, n, r), e = e.sibling; e !== null;) Pl(e, t, n, r), e = e.sibling;
	}
	function Fl(e) {
		var t = e.stateNode, n = e.memoizedProps;
		try {
			for (var r = e.type, i = t.attributes; i.length;) t.removeAttributeNode(i[0]);
			np(t, r, n), t[Ct] = e, t[R] = n;
		} catch (t) {
			ff(e, e.return, t);
		}
	}
	var Il = !1, Ll = null;
	function Rl(e) {
		(e.tag === 30 || e.subtreeFlags & 33554432) && (Il = !0);
	}
	var zl = null;
	function Bl() {
		var e = zl;
		return zl = null, e;
	}
	var Vl = 0;
	function Hl(e, t, n, r, i) {
		return Vl = 0, Ul(e.child, t, n, r, i);
	}
	function Ul(e, t, n, r, i) {
		for (var a = !1; e !== null;) {
			if (e.tag === 5) {
				var o = e.stateNode;
				if (r !== null) {
					var s = Op(o);
					r.push(s), s.view && (a = !0);
				} else a || Op(o).view && (a = !0);
				Il = !0, Tp(o, Vl === 0 ? t : t + "_" + Vl, n), Vl++;
			} else (e.tag !== 22 || e.memoizedState === null) && (e.tag === 30 && i || Ul(e.child, t, n, r, i) && (a = !0));
			e = e.sibling;
		}
		return a;
	}
	function Wl(e, t) {
		for (; e !== null;) e.tag === 5 ? Ep(e.stateNode, e.memoizedProps) : (e.tag !== 22 || e.memoizedState === null) && (e.tag === 30 && t || Wl(e.child, t)), e = e.sibling;
	}
	function Gl(e) {
		if (e.subtreeFlags & 18874368) for (e = e.child; e !== null;) {
			if ((e.tag !== 22 || e.memoizedState === null) && (Gl(e), e.tag === 30 && e.flags & 18874368 && e.stateNode.paired)) {
				var t = e.memoizedProps;
				if (t.name == null || t.name === "auto") throw Error(i(544));
				var n = t.name;
				t = pi(t.default, t.share), t !== "none" && (Hl(e, n, t, null, !1) || Wl(e.child, !1));
			}
			e = e.sibling;
		}
	}
	function Kl(e, t) {
		if (e.tag === 30) {
			var n = e.stateNode, r = e.memoizedProps, i = di(r, n), a = pi(r.default, n.paired ? r.share : r.enter);
			a === "none" ? Gl(e) : Hl(e, i, a, null, !1) ? (Gl(e), n.paired || t || jd(e, r.onEnter)) : Wl(e.child, !1);
		} else if (e.subtreeFlags & 33554432) for (e = e.child; e !== null;) Kl(e, t), e = e.sibling;
		else Gl(e);
	}
	function ql(e) {
		if (Ll !== null && Ll.size !== 0) {
			var t = Ll;
			if (e.subtreeFlags & 18874368) for (e = e.child; e !== null;) {
				if (e.tag !== 22 || e.memoizedState === null) {
					if (e.tag === 30 && e.flags & 18874368) {
						var n = e.memoizedProps, r = n.name;
						if (r != null && r !== "auto") {
							var i = t.get(r);
							if (i !== void 0) {
								var a = pi(n.default, n.share);
								if (a !== "none" && (Hl(e, r, a, null, !1) ? (a = e.stateNode, i.paired = a, a.paired = i, jd(e, n.onShare)) : Wl(e.child, !1)), t.delete(r), t.size === 0) break;
							}
						}
					}
					ql(e);
				}
				e = e.sibling;
			}
		}
	}
	function Jl(e) {
		if (e.tag === 30) {
			var t = e.memoizedProps, n = di(t, e.stateNode), r = Ll === null ? void 0 : Ll.get(n), i = pi(t.default, r === void 0 ? t.exit : t.share);
			i !== "none" && (Hl(e, n, i, null, !1) ? r === void 0 ? jd(e, t.onExit) : (i = e.stateNode, r.paired = i, i.paired = r, Ll.delete(n), jd(e, t.onShare)) : Wl(e.child, !1)), Ll !== null && ql(e);
		} else if (e.subtreeFlags & 33554432) for (e = e.child; e !== null;) Jl(e), e = e.sibling;
		else Ll !== null && ql(e);
	}
	function Yl(e) {
		for (e = e.child; e !== null;) {
			if (e.tag === 30) {
				var t = e.memoizedProps, n = di(t, e.stateNode);
				t = pi(t.default, t.update), e.flags &= -5, t !== "none" && Hl(e, n, t, e.memoizedState = [], !1);
			} else e.subtreeFlags & 33554432 && Yl(e);
			e = e.sibling;
		}
	}
	function Xl(e) {
		if (e.subtreeFlags & 18874368) for (e = e.child; e !== null;) {
			if (e.tag !== 22 || e.memoizedState === null) {
				if (e.tag === 30 && e.flags & 18874368) {
					var t = e.stateNode;
					t.paired !== null && (t.paired = null, Wl(e.child, !1));
				}
				Xl(e);
			}
			e = e.sibling;
		}
	}
	function Zl(e) {
		if (e.tag === 30) e.stateNode.paired = null, Wl(e.child, !1), Xl(e);
		else if (e.subtreeFlags & 33554432) for (e = e.child; e !== null;) Zl(e), e = e.sibling;
		else Xl(e);
	}
	function Ql(e) {
		for (e = e.child; e !== null;) e.tag === 30 ? Wl(e.child, !1) : e.subtreeFlags & 33554432 && Ql(e), e = e.sibling;
	}
	function $l(e, t, n, r, i, a, o) {
		for (var s = !1; t !== null;) {
			if (t.tag === 5) {
				var c = t.stateNode;
				if (a !== null && Vl < a.length) {
					var l = a[Vl], u = Op(c);
					(l.view || u.view) && (s = !0);
					var d;
					if (d = !(e.flags & 4)) {
						if (u.clip) d = !0;
						else {
							d = l.rect;
							var f = u.rect;
							d = d.y !== f.y || d.x !== f.x || d.height !== f.height || d.width !== f.width;
						}
					}
					d && (e.flags |= 4), u.abs ? u = !l.abs : (l = l.rect, u = u.rect, u = l.height !== u.height || l.width !== u.width), u && (e.flags |= 32);
				} else e.flags |= 32;
				e.flags & 4 && Tp(c, Vl === 0 ? n : n + "_" + Vl, i), s && e.flags & 4 || (zl === null && (zl = []), zl.push(c, Vl === 0 ? r : r + "_" + Vl, t.memoizedProps)), Vl++;
			} else (t.tag !== 22 || t.memoizedState === null) && (t.tag === 30 && o ? e.flags |= t.flags & 32 : $l(e, t.child, n, r, i, a, o) && (s = !0));
			t = t.sibling;
		}
		return s;
	}
	function eu(e, t) {
		for (e = e.child; e !== null;) {
			if (e.tag === 30) {
				var n = e.memoizedProps, r = e.stateNode, i = di(n, r), a = pi(n.default, n.update);
				if (t) {
					r = r.clones;
					var o = r === null ? null : r.map(kp);
				} else o = e.memoizedState, e.memoizedState = null;
				r = e;
				var s = e.child;
				Vl = 0, i = $l(r, s, i, i, a, o, !1), e.flags & 4 && i && (t || jd(e, n.onUpdate));
			} else e.subtreeFlags & 33554432 && eu(e, t);
			e = e.sibling;
		}
	}
	var tu = !1, J = !1, nu = !1, ru = !1, iu = typeof WeakSet == "function" ? WeakSet : Set, au = null, ou = !1, su = !1, cu = !1, lu = !1;
	function uu(e, t, n) {
		if (e = e.containerInfo, sp = gh, e = Hr(e), G(e)) {
			if ("selectionStart" in e) var r = {
				start: e.selectionStart,
				end: e.selectionEnd
			};
			else a: {
				r = (r = e.ownerDocument) && r.defaultView || window;
				var i = r.getSelection && r.getSelection();
				if (i && i.rangeCount !== 0) {
					r = i.anchorNode;
					var a = i.anchorOffset, o = i.focusNode;
					i = i.focusOffset;
					try {
						r.nodeType, o.nodeType;
					} catch {
						r = null;
						break a;
					}
					var s = 0, c = -1, l = -1, u = 0, d = 0, f = e, p = null;
					b: for (;;) {
						for (var m; f !== r || a !== 0 && f.nodeType !== 3 || (c = s + a), f !== o || i !== 0 && f.nodeType !== 3 || (l = s + i), f.nodeType === 3 && (s += f.nodeValue.length), (m = f.firstChild) !== null;) p = f, f = m;
						for (;;) {
							if (f === e) break b;
							if (p === r && ++u === a && (c = s), p === o && ++d === i && (l = s), (m = f.nextSibling) !== null) break;
							f = p, p = f.parentNode;
						}
						f = m;
					}
					r = c === -1 || l === -1 ? null : {
						start: c,
						end: l
					};
				} else r = null;
			}
			r ||= {
				start: 0,
				end: 0
			};
		} else r = null;
		for (cp = {
			focusedElem: e,
			selectionRange: r
		}, gh = !1, n = (n & 335544064) === n, au = t, t = n ? 9270 : 1024; au !== null;) {
			if (e = au, n && (r = e.deletions, r !== null)) for (a = 0; a < r.length; a++) n && Jl(r[a]);
			if (e.alternate === null && e.flags & 2) n && Rl(e), du(n);
			else {
				if (e.tag === 22) {
					if (r = e.alternate, e.memoizedState !== null) {
						r !== null && r.memoizedState === null && n && Jl(r), du(n);
						continue;
					}
					if (r !== null && r.memoizedState !== null) {
						n && Rl(e), du(n);
						continue;
					}
				}
				r = e.child, (e.subtreeFlags & t) !== 0 && r !== null ? (r.return = e, au = r) : (n && Yl(e), du(n));
			}
		}
		Ll = null;
	}
	function du(e) {
		for (; au !== null;) {
			var t = au, n = e, r = t.alternate, a = t.flags;
			switch (t.tag) {
				case 0:
				case 11:
				case 15: break;
				case 1:
					if (a & 1024 && r !== null) {
						n = void 0, a = r.memoizedProps, r = r.memoizedState;
						var o = t.stateNode;
						try {
							var s = vc(t.type, a);
							n = o.getSnapshotBeforeUpdate(s, r), o.__reactInternalSnapshotBeforeUpdate = n;
						} catch (e) {
							ff(t, t.return, e);
						}
					}
					break;
				case 3:
					if (a & 1024) {
						if (r = t.stateNode.containerInfo, n = r.nodeType, n === 9) nm(r);
						else if (n === 1) switch (r.nodeName) {
							case "HEAD":
							case "HTML":
							case "BODY":
								nm(r);
								break;
							default: r.textContent = "";
						}
					}
					break;
				case 5:
				case 26:
				case 27:
				case 6:
				case 4:
				case 17: break;
				case 30:
					n && r !== null && (n = di(r.memoizedProps, r.stateNode), a = t.memoizedProps, a = pi(a.default, a.update), a !== "none" && Hl(r, n, a, r.memoizedState = [], !0));
					break;
				default: if (a & 1024) throw Error(i(163));
			}
			if (r = t.sibling, r !== null) {
				r.return = t.return, au = r;
				break;
			}
			au = t.return;
		}
	}
	function fu(e, t, n) {
		var r = n.flags;
		switch (n.tag) {
			case 0:
			case 11:
			case 15:
				ju(e, n), r & 4 && vl(5, n);
				break;
			case 1:
				if (ju(e, n), r & 4) {
					if (e = n.stateNode, t === null) try {
						e.componentDidMount();
					} catch (e) {
						ff(n, n.return, e);
					}
					else {
						var i = vc(n.type, t.memoizedProps);
						t = t.memoizedState;
						try {
							e.componentDidUpdate(i, t, e.__reactInternalSnapshotBeforeUpdate);
						} catch (e) {
							ff(n, n.return, e);
						}
					}
				}
				r & 64 && bl(n), r & 512 && Sl(n, n.return);
				break;
			case 3:
				if (ju(e, n), r & 64 && (e = n.updateQueue, e !== null)) {
					if (t = null, n.child !== null) switch (n.child.tag) {
						case 27:
						case 5:
							t = n.child.stateNode;
							break;
						case 1: t = n.child.stateNode;
					}
					try {
						yo(e, t);
					} catch (e) {
						ff(n, n.return, e);
					}
				}
				break;
			case 27: t === null && r & 4 && Fl(n);
			case 26:
			case 5:
				ju(e, n), t === null && r & 4 && kl(n), r & 512 && Sl(n, n.return);
				break;
			case 12:
				ju(e, n);
				break;
			case 31:
				ju(e, n), r & 4 && bu(e, n);
				break;
			case 13:
				ju(e, n), r & 4 && xu(e, n), r & 64 && (e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null && (n = gf.bind(null, n), cm(e, n))));
				break;
			case 22:
				if (r = n.memoizedState !== null || tu, !r) {
					var a = t !== null && t.memoizedState !== null || J;
					t = tu, i = J, tu = r, (J = a) && !i ? (r = 2, n.subtreeFlags & 8772 && (r |= 1), Nu(e, n, r)) : ju(e, n), tu = t, J = i;
				}
				break;
			case 30:
				ju(e, n), r & 512 && Sl(n, n.return);
				break;
			case 7: r & 512 && Sl(n, n.return);
			default: ju(e, n);
		}
	}
	function pu(e, t) {
		for (e = e.child; e !== null;) mu(e, t), e = e.sibling;
	}
	function mu(e, t) {
		switch (e.tag) {
			case 5:
			case 26:
				try {
					var n = e.stateNode;
					if (t) {
						var r = n.style;
						typeof r.setProperty == "function" ? r.setProperty("display", "none", "important") : r.display = "none";
					} else {
						var i = e.stateNode, a = e.memoizedProps.style, o = a != null && a.hasOwnProperty("display") ? a.display : null;
						i.style.display = o == null || typeof o == "boolean" ? "" : ("" + o).trim();
					}
				} catch (t) {
					ff(e, e.return, t);
				}
				hu(e, t);
				break;
			case 6:
				try {
					e.stateNode.nodeValue = t ? "" : e.memoizedProps, Wt = !0;
				} catch (t) {
					ff(e, e.return, t);
				}
				break;
			case 18:
				try {
					var s = e.stateNode;
					t ? wp(s, !0) : wp(e.stateNode, !1);
				} catch (t) {
					ff(e, e.return, t);
				}
				break;
			case 22:
			case 23:
				e.memoizedState === null && pu(e, t);
				break;
			default: pu(e, t);
		}
	}
	function hu(e, t) {
		if (e.subtreeFlags & 67108864) for (e = e.child; e !== null;) {
			a: {
				var n = e, r = t;
				switch (n.tag) {
					case 4:
						mu(n, r);
						break a;
					case 22:
						n.memoizedState === null && hu(n, r);
						break a;
					default: hu(n, r);
				}
			}
			e = e.sibling;
		}
	}
	function gu(e) {
		var t = e.alternate;
		t !== null && (e.alternate = null, gu(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && At(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
	}
	var Y = null, _u = !1;
	function vu(e, t, n) {
		for (n = n.child; n !== null;) yu(e, t, n), n = n.sibling;
	}
	function yu(e, t, n) {
		if (L && typeof L.onCommitFiberUnmount == "function") try {
			L.onCommitFiberUnmount(Ze, n);
		} catch {}
		switch (n.tag) {
			case 26:
				J || Cl(n, t), vu(e, t, n), n.memoizedState ? n.memoizedState.count-- : n.stateNode && !J && (n = n.stateNode, n.parentNode.removeChild(n));
				break;
			case 27:
				J || Cl(n, t), El(n);
				var r = Y, i = _u;
				Sp(n.type) && (Y = n.stateNode, _u = !1), vu(e, t, n), gm(n.stateNode, n.type, n.memoizedProps), Y = r, _u = i;
				break;
			case 5: J || Cl(n, t), El(n);
			case 6:
				if (n.tag === 6 && El(n), r = Y, i = _u, Y = null, vu(e, t, n), Y = r, _u = i, Y !== null) {
					if (_u) try {
						(Y.nodeType === 9 ? Y.body : Y.nodeName === "HTML" ? Y.ownerDocument.body : Y).removeChild(n.stateNode), Wt = !0;
					} catch (e) {
						ff(n, t, e);
					}
					else try {
						Y.removeChild(n.stateNode), Wt = !0;
					} catch (e) {
						ff(n, t, e);
					}
				}
				break;
			case 18:
				Y !== null && (_u ? (e = Y, Cp(e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, n.stateNode), Hh(e)) : Cp(Y, n.stateNode));
				break;
			case 4:
				r = Y, i = _u, Y = n.stateNode.containerInfo, _u = !0, vu(e, t, n), Y = r, _u = i;
				break;
			case 0:
			case 11:
			case 14:
			case 15:
				yl(2, n, t), J || yl(4, n, t), vu(e, t, n);
				break;
			case 1:
				J || (Cl(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function" && xl(n, t, r)), vu(e, t, n);
				break;
			case 21:
				vu(e, t, n);
				break;
			case 22:
				J = (r = J) || n.memoizedState !== null, vu(e, t, n), J = r;
				break;
			case 30:
				Cl(n, t), vu(e, t, n);
				break;
			case 7:
				J || Cl(n, t), vu(e, t, n);
				break;
			default: vu(e, t, n);
		}
	}
	function bu(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
			e = e.dehydrated;
			try {
				Hh(e);
			} catch (e) {
				ff(t, t.return, e);
			}
		}
	}
	function xu(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null)))) try {
			Hh(e);
		} catch (e) {
			ff(t, t.return, e);
		}
	}
	function Su(e) {
		switch (e.tag) {
			case 31:
			case 13:
			case 19:
				var t = e.stateNode;
				return t === null && (t = e.stateNode = new iu()), t;
			case 22: return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new iu()), t;
			default: throw Error(i(435, e.tag));
		}
	}
	function Cu(e, t) {
		var n = Su(e);
		t.forEach(function(t) {
			if (!n.has(t)) {
				n.add(t);
				var r = _f.bind(null, e, t);
				t.then(r, r);
			}
		});
	}
	function wu(e, t, n) {
		var r = t.deletions;
		if (r !== null) for (var a = 0; a < r.length; a++) {
			var o = r[a], s = e, c = t, l = c;
			a: for (; l !== null;) {
				switch (l.tag) {
					case 27:
						if (Sp(l.type)) {
							Y = l.stateNode, _u = !1;
							break a;
						}
						break;
					case 5:
						Y = l.stateNode, _u = !1;
						break a;
					case 3:
					case 4:
						Y = l.stateNode.containerInfo, _u = !0;
						break a;
				}
				l = l.return;
			}
			if (Y === null) throw Error(i(160));
			yu(s, c, o), Y = null, _u = !1, s = o.alternate, s !== null && (s.return = null), o.return = null;
		}
		if (t.subtreeFlags & 13886) for (t = t.child; t !== null;) Eu(t, e, n), t = t.sibling;
	}
	var Tu = null;
	function Eu(e, t, n) {
		var r = e.alternate, a = e.flags;
		switch (e.tag) {
			case 0:
			case 11:
			case 14:
			case 15:
				if (a & 4 && (r = e.updateQueue, r = r === null ? null : r.events, r !== null)) for (var o = 0; o < r.length; o++) {
					var s = r[o];
					s.ref.impl = s.nextImpl;
				}
				wu(t, e, n), Du(e), a & 4 && (yl(3, e, e.return), vl(3, e), yl(5, e, e.return));
				break;
			case 1:
				wu(t, e, n), Du(e), a & 512 && (J || r === null || Cl(r, r.return)), a & 64 && tu && (e = e.updateQueue, e !== null && (t = e.callbacks, t !== null && (n = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = n === null ? t : n.concat(t))));
				break;
			case 26:
				if (o = Tu, wu(t, e, n), Du(e), a & 512 && (J || r === null || Cl(r, r.return)), a & 4) {
					if (a = r === null ? null : r.memoizedState, n = e.memoizedState, r === null) {
						if (n === null) {
							if (e.stateNode === null) {
								if (tu) e.stateNode = fp(e.type, e.memoizedProps, t.containerInfo, e);
								else {
									a: {
										t = e.type, n = e.memoizedProps, a = o.ownerDocument || o;
										b: switch (t) {
											case "title":
												r = a.getElementsByTagName("title")[0], (!r || r[Ot] || r[Ct] || r.namespaceURI === "http://www.w3.org/2000/svg" || r.hasAttribute("itemprop")) && (r = a.createElement(t), a.head.insertBefore(r, a.querySelector("head > title"))), np(r, t, n), r[Ct] = e, Ft(r), t = r;
												break a;
											case "link":
												if (o = Gm("link", "href", a).get(t + (n.href || ""))) {
													for (s = 0; s < o.length; s++) if (r = o[s], r.getAttribute("href") === (n.href == null || n.href === "" ? null : n.href) && r.getAttribute("rel") === (n.rel == null ? null : n.rel) && r.getAttribute("title") === (n.title == null ? null : n.title) && r.getAttribute("crossorigin") === (n.crossOrigin == null ? null : n.crossOrigin)) {
														o.splice(s, 1);
														break b;
													}
												}
												r = a.createElement(t), np(r, t, n), a.head.appendChild(r);
												break;
											case "meta":
												if (o = Gm("meta", "content", a).get(t + (n.content || ""))) {
													for (s = 0; s < o.length; s++) if (r = o[s], r.getAttribute("content") === (n.content == null ? null : "" + n.content) && r.getAttribute("name") === (n.name == null ? null : n.name) && r.getAttribute("property") === (n.property == null ? null : n.property) && r.getAttribute("http-equiv") === (n.httpEquiv == null ? null : n.httpEquiv) && r.getAttribute("charset") === (n.charSet == null ? null : n.charSet)) {
														o.splice(s, 1);
														break b;
													}
												}
												r = a.createElement(t), np(r, t, n), a.head.appendChild(r);
												break;
											default: throw Error(i(468, t));
										}
										r[Ct] = e, Ft(r), t = r;
									}
									e.stateNode = t;
								}
							} else tu || Km(o, e.type, e.stateNode);
						} else e.stateNode = Bm(o, n, e.memoizedProps);
					} else a === n ? n === null && e.stateNode !== null && Al(e, e.memoizedProps, r.memoizedProps) : (a === null ? (t = r.stateNode, t === null || J || t.parentNode.removeChild(t)) : a.count--, n === null ? tu || Km(o, e.type, e.stateNode) : Bm(o, n, e.memoizedProps));
				}
				break;
			case 27:
				wu(t, e, n), Du(e), a & 512 && (J || r === null || Cl(r, r.return)), r !== null && a & 4 && Al(e, e.memoizedProps, r.memoizedProps);
				break;
			case 5:
				if (o = nu, nu = !1, wu(t, e, n), nu = o, Du(e), a & 512 && (J || r === null || Cl(r, r.return)), e.flags & 32) {
					t = e.stateNode;
					try {
						cn(t, ""), Wt = !0;
					} catch (t) {
						ff(e, e.return, t);
					}
				}
				a & 4 && e.stateNode != null && (t = e.memoizedProps, Al(e, t, r === null ? t : r.memoizedProps)), a & 1024 && (ru = !0);
				break;
			case 6:
				if (wu(t, e, n), Du(e), a & 4) {
					if (e.stateNode === null) throw Error(i(162));
					t = e.memoizedProps, n = e.stateNode;
					try {
						n.nodeValue = t, Wt = !0;
					} catch (t) {
						ff(e, e.return, t);
					}
				}
				break;
			case 3:
				if (Wt = !1, Wm = null, o = Tu, Tu = bm(t.containerInfo), wu(t, e, n), Tu = o, Du(e), a & 4 && r !== null && r.memoizedState.isDehydrated) try {
					Hh(t.containerInfo);
				} catch (t) {
					ff(e, e.return, t);
				}
				ru && (ru = !1, Ou(e)), Wt = !1;
				break;
			case 4:
				a = nu, nu = tu, r = Gt(), o = Tu, Tu = bm(e.stateNode.containerInfo), wu(t, e, n), Du(e), Tu = o, Wt && su && (cu = !0), Wt = r, nu = a;
				break;
			case 12:
				wu(t, e, n), Du(e);
				break;
			case 31:
				wu(t, e, n), Du(e), a & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, Cu(e, t)));
				break;
			case 13:
				wu(t, e, n), Du(e), e.child.flags & 8192 && e.memoizedState !== null != (r !== null && r.memoizedState !== null) && (fd = Ue()), a & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, Cu(e, t)));
				break;
			case 22:
				o = e.memoizedState !== null, s = r !== null && r.memoizedState !== null;
				var c = tu, l = J, u = nu;
				tu = c || o, nu = u || o, J = l || s, wu(t, e, n), J = l, nu = u, tu = c, Du(e), a & 8192 && (t = e.stateNode, t._visibility = o ? t._visibility & -2 : t._visibility | 1, !o || r === null || s || tu || J || (t = s || J, n = tu, r = J, tu = o || tu, J = t, Mu(e, 2), tu = n, J = r), !o && nu || pu(e, o)), a & 4 && (t = e.updateQueue, t !== null && (n = t.retryQueue, n !== null && (t.retryQueue = null, Cu(e, n))));
				break;
			case 19:
				wu(t, e, n), Du(e), a & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, Cu(e, t)));
				break;
			case 30:
				a & 512 && (J || r === null || Cl(r, r.return)), a = Gt(), o = su, s = (n & 335544064) === n, c = e.memoizedProps, su = s && pi(c.default, c.update) !== "none", wu(t, e, n), Du(e), s && r !== null && Wt && (e.flags |= 4), su = o, Wt = a;
				break;
			case 21: break;
			case 7: a & 512 && (J || r === null || Cl(r, r.return)), r && r.stateNode !== null && (r.stateNode._fragmentFiber = e);
			default: wu(t, e, n), Du(e);
		}
	}
	function Du(e) {
		var t = e.flags;
		if (t & 2) {
			try {
				for (var n, r = e.return; r !== null;) {
					if (jl(r)) {
						n = r;
						break;
					}
					r = r.return;
				}
				r = null;
				for (var a = e.return; a !== null;) {
					if (Ol(a)) {
						var o = a.stateNode;
						r === null ? r = [o] : r.push(o);
					}
					if (Dl(a)) break;
					a = a.return;
				}
				var s = r;
				if (n == null) throw Error(i(160));
				switch (n.tag) {
					case 27:
						var c = n.stateNode;
						Pl(e, Ml(e), c, s);
						break;
					case 5:
						var l = n.stateNode;
						n.flags & 32 && (cn(l, ""), n.flags &= -33), Pl(e, Ml(e), l, s);
						break;
					case 3:
					case 4:
						var u = n.stateNode.containerInfo;
						Nl(e, Ml(e), u, s);
						break;
					default: throw Error(i(161));
				}
			} catch (t) {
				ff(e, e.return, t);
			}
			e.flags &= -3;
		}
		t & 4096 && (e.flags &= -4097);
	}
	function Ou(e) {
		if (e.subtreeFlags & 1024) for (e = e.child; e !== null;) {
			var t = e;
			Ou(t), t.tag === 5 && t.flags & 1024 && (t = t.stateNode, gh = !0, t.reset(), gh = !1), e = e.sibling;
		}
	}
	function ku(e, t) {
		if (t.subtreeFlags & 9270) for (t = t.child; t !== null;) Au(t, e), t = t.sibling;
		else eu(t, !1);
	}
	function Au(e, t) {
		var n = e.alternate;
		if (n === null) Kl(e, !1);
		else switch (e.tag) {
			case 3:
				if (lu = ou = !1, Bl(), ku(t, e), !ou && !cu) {
					if (e = zl, e !== null) for (var r = 0; r < e.length; r += 3) {
						n = e[r];
						var i = e[r + 1];
						Ep(n, e[r + 2]), n = n.ownerDocument.documentElement, n !== null && n.animate({
							opacity: [0, 0],
							pointerEvents: ["none", "none"]
						}, {
							duration: 0,
							fill: "forwards",
							pseudoElement: "::view-transition-group(" + i + ")"
						});
					}
					e = t.containerInfo, e = e.nodeType === 9 ? e.documentElement : e.ownerDocument.documentElement, e !== null && e.style.viewTransitionName === "" && (e.style.viewTransitionName = "none", e.animate({
						opacity: [0, 0],
						pointerEvents: ["none", "none"]
					}, {
						duration: 0,
						fill: "forwards",
						pseudoElement: "::view-transition-group(root)"
					}), e.animate({
						width: [0, 0],
						height: [0, 0]
					}, {
						duration: 0,
						fill: "forwards",
						pseudoElement: "::view-transition"
					})), lu = !0;
				}
				zl = null;
				break;
			case 5:
				ku(t, e);
				break;
			case 4:
				r = ou, ou = !1, ku(t, e), ou && (cu = !0), ou = r;
				break;
			case 22:
				e.memoizedState === null && (n.memoizedState === null ? ku(t, e) : Kl(e, !1));
				break;
			case 30:
				r = ou, i = Bl(), ou = !1, ku(t, e), ou && (e.flags |= 4);
				var a = e.memoizedProps, o = e.stateNode;
				t = di(a, o), o = di(n.memoizedProps, o);
				var s = pi(a.default, a.update);
				s === "none" ? t = !1 : (a = n.memoizedState, n.memoizedState = null, n = e.child, Vl = 0, t = $l(e, n, t, o, s, a, !0), Vl !== (a === null ? 0 : a.length) && (e.flags |= 32)), e.flags & 4 && t ? (jd(e, e.memoizedProps.onUpdate), zl = i) : i !== null && (i.push.apply(i, zl), zl = i), ou = e.flags & 32 ? !0 : r;
				break;
			default: ku(t, e);
		}
	}
	function ju(e, t) {
		if (t.subtreeFlags & 8772) for (t = t.child; t !== null;) fu(e, t.alternate, t), t = t.sibling;
	}
	function Mu(e, t) {
		for (e = e.child; e !== null;) {
			var n = e, r = t;
			switch (n.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
					yl(4, n, n.return), Mu(n, r);
					break;
				case 1:
					Cl(n, n.return);
					var i = n.stateNode;
					typeof i.componentWillUnmount == "function" && xl(n, n.return, i), Mu(n, r);
					break;
				case 27: r & 2 && gm(n.stateNode, n.type, n.memoizedProps);
				case 5:
					Cl(n, n.return), n.tag !== 5 && n.tag !== 27 || El(n), Mu(n, r);
					break;
				case 6:
					El(n);
					break;
				case 26:
					Cl(n, n.return), i = n.stateNode, n.memoizedState !== null || i === null || J || i.parentNode.removeChild(i), Mu(n, r);
					break;
				case 22:
					n.memoizedState === null && Mu(n, r);
					break;
				case 30:
					Cl(n, n.return), Mu(n, r);
					break;
				case 7: Cl(n, n.return);
				default: Mu(n, r);
			}
			e = e.sibling;
		}
	}
	function Nu(e, t, n) {
		for (n = t.subtreeFlags & 8772 ? n : n & -2, t = t.child; t !== null;) {
			var r = t.alternate, i = e, a = t, o = a.flags, s = !!(n & 1);
			switch (a.tag) {
				case 0:
				case 11:
				case 15:
					Nu(i, a, n), vl(4, a);
					break;
				case 1:
					if (Nu(i, a, n), r = a, i = r.stateNode, typeof i.componentDidMount == "function") try {
						i.componentDidMount();
					} catch (e) {
						ff(r, r.return, e);
					}
					if (r = a, i = r.updateQueue, i !== null) {
						var c = r.stateNode;
						try {
							var l = i.shared.hiddenCallbacks;
							if (l !== null) for (i.shared.hiddenCallbacks = null, i = 0; i < l.length; i++) vo(l[i], c);
						} catch (e) {
							ff(r, r.return, e);
						}
					}
					s && o & 64 && bl(a), Sl(a, a.return);
					break;
				case 27: n & 2 && Fl(a);
				case 5:
					a.tag !== 5 && a.tag !== 27 || Tl(a), Nu(i, a, n), s && r === null && o & 4 && kl(a), Sl(a, a.return);
					break;
				case 6:
					Tl(a);
					break;
				case 26:
					c = a.stateNode, a.memoizedState !== null || c === null || tu || Km(bm(c.ownerDocument), a.type, c), Nu(i, a, n), s && r === null && o & 4 && kl(a), Sl(a, a.return);
					break;
				case 12:
					Nu(i, a, n);
					break;
				case 31:
					Nu(i, a, n), s && o & 4 && bu(i, a);
					break;
				case 13:
					Nu(i, a, n), s && o & 4 && xu(i, a);
					break;
				case 22:
					a.memoizedState === null && Nu(i, a, n), Sl(a, a.return);
					break;
				case 30:
					Nu(i, a, n), Sl(a, a.return);
					break;
				case 7: Sl(a, a.return);
				default: Nu(i, a, n);
			}
			t = t.sibling;
		}
	}
	function Pu(e, t) {
		var n = null;
		e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== n && (e != null && e.refCount++, n != null && Da(n));
	}
	function Fu(e, t) {
		e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && Da(e));
	}
	function Iu(e, t, n, r) {
		var i = (n & 335544064) === n;
		if (t.subtreeFlags & (i ? 10262 : 10256)) for (t = t.child; t !== null;) Lu(e, t, n, r), t = t.sibling;
		else i && Ql(t);
	}
	function Lu(e, t, n, r) {
		var i = (n & 335544064) === n;
		i && t.alternate === null && t.return !== null && t.return.alternate !== null && Zl(t);
		var a = t.flags;
		switch (t.tag) {
			case 0:
			case 11:
			case 15:
				Iu(e, t, n, r), a & 2048 && vl(9, t);
				break;
			case 1:
				Iu(e, t, n, r);
				break;
			case 3:
				Iu(e, t, n, r), i && lu && (e = e.containerInfo, e = e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, e.style.viewTransitionName === "root" && (e.style.viewTransitionName = ""), e = e.ownerDocument.documentElement, e !== null && e.style.viewTransitionName === "none" && (e.style.viewTransitionName = "")), a & 2048 && (a = null, t.alternate !== null && (a = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== a && (t.refCount++, a != null && Da(a)));
				break;
			case 12:
				if (a & 2048) {
					Iu(e, t, n, r), a = t.stateNode;
					try {
						var o = t.memoizedProps, s = o.id, c = o.onPostCommit;
						typeof c == "function" && c(s, t.alternate === null ? "mount" : "update", a.passiveEffectDuration, -0);
					} catch (e) {
						ff(t, t.return, e);
					}
				} else Iu(e, t, n, r);
				break;
			case 31:
				Iu(e, t, n, r);
				break;
			case 13:
				Iu(e, t, n, r);
				break;
			case 23: break;
			case 22:
				o = t.stateNode, s = t.alternate, t.memoizedState === null ? (i && s !== null && s.memoizedState !== null && Zl(t), o._visibility & 2 ? Iu(e, t, n, r) : (o._visibility |= 2, Ru(e, t, n, r, !!(t.subtreeFlags & 10256) || !1))) : (i && s !== null && s.memoizedState === null && Zl(s), o._visibility & 2 ? Iu(e, t, n, r) : zu(e, t)), a & 2048 && Pu(s, t);
				break;
			case 24:
				Iu(e, t, n, r), a & 2048 && Fu(t.alternate, t);
				break;
			case 30:
				i && (a = t.alternate, a !== null && (Wl(a.child, !0), Wl(t.child, !0))), Iu(e, t, n, r);
				break;
			default: Iu(e, t, n, r);
		}
	}
	function Ru(e, t, n, r, i) {
		for (i &&= !!(t.subtreeFlags & 10256) || !1, t = t.child; t !== null;) {
			var a = e, o = t, s = n, c = r, l = o.flags;
			switch (o.tag) {
				case 0:
				case 11:
				case 15:
					Ru(a, o, s, c, i), vl(8, o);
					break;
				case 23: break;
				case 22:
					var u = o.stateNode;
					o.memoizedState === null ? (u._visibility |= 2, Ru(a, o, s, c, i)) : u._visibility & 2 ? Ru(a, o, s, c, i) : zu(a, o), i && l & 2048 && Pu(o.alternate, o);
					break;
				case 24:
					Ru(a, o, s, c, i), i && l & 2048 && Fu(o.alternate, o);
					break;
				default: Ru(a, o, s, c, i);
			}
			t = t.sibling;
		}
	}
	function zu(e, t) {
		if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) {
			var n = e, r = t, i = r.flags;
			switch (r.tag) {
				case 22:
					zu(n, r), i & 2048 && Pu(r.alternate, r);
					break;
				case 24:
					zu(n, r), i & 2048 && Fu(r.alternate, r);
					break;
				default: zu(n, r);
			}
			t = t.sibling;
		}
	}
	var Bu = 8192;
	function Vu(e, t, n) {
		if (e.subtreeFlags & Bu) for (e = e.child; e !== null;) Hu(e, t, n), e = e.sibling;
	}
	function Hu(e, t, n) {
		switch (e.tag) {
			case 26:
				Vu(e, t, n), e.flags & Bu && (e.memoizedState === null ? (e = e.stateNode, (t & 335544128) === t && Zm(n, e)) : Qm(n, Tu, e.memoizedState, e.memoizedProps));
				break;
			case 5:
				Vu(e, t, n), e.flags & Bu && (e = e.stateNode, (t & 335544128) === t && Zm(n, e));
				break;
			case 3:
			case 4:
				var r = Tu;
				Tu = bm(e.stateNode.containerInfo), Vu(e, t, n), Tu = r;
				break;
			case 22:
				e.memoizedState === null && (r = e.alternate, r !== null && r.memoizedState !== null ? (r = Bu, Bu = 16777216, Vu(e, t, n), Bu = r) : Vu(e, t, n));
				break;
			case 30:
				if ((e.flags & Bu) !== 0 && (r = e.memoizedProps.name, r != null && r !== "auto")) {
					var i = e.stateNode;
					i.paired = null, Ll === null && (Ll = /* @__PURE__ */ new Map()), Ll.set(r, i);
				}
				Vu(e, t, n);
				break;
			default: Vu(e, t, n);
		}
	}
	function Uu(e) {
		var t = e.alternate;
		if (t !== null && (e = t.child, e !== null)) {
			t.child = null;
			do
				t = e.sibling, e.sibling = null, e = t;
			while (e !== null);
		}
	}
	function Wu(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				au = r, qu(r, e);
			}
			Uu(e);
		}
		if (e.subtreeFlags & 10256) for (e = e.child; e !== null;) Gu(e), e = e.sibling;
	}
	function Gu(e) {
		switch (e.tag) {
			case 0:
			case 11:
			case 15:
				Wu(e), e.flags & 2048 && yl(9, e, e.return);
				break;
			case 3:
				Wu(e);
				break;
			case 12:
				Wu(e);
				break;
			case 22:
				var t = e.stateNode;
				e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, Ku(e)) : Wu(e);
				break;
			default: Wu(e);
		}
	}
	function Ku(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				au = r, qu(r, e);
			}
			Uu(e);
		}
		for (e = e.child; e !== null;) {
			switch (t = e, t.tag) {
				case 0:
				case 11:
				case 15:
					yl(8, t, t.return), Ku(t);
					break;
				case 22:
					n = t.stateNode, n._visibility & 2 && (n._visibility &= -3, Ku(t));
					break;
				default: Ku(t);
			}
			e = e.sibling;
		}
	}
	function qu(e, t) {
		for (; au !== null;) {
			var n = au;
			switch (n.tag) {
				case 0:
				case 11:
				case 15:
					yl(8, n, t);
					break;
				case 23:
				case 22:
					if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
						var r = n.memoizedState.cachePool.pool;
						r != null && r.refCount++;
					}
					break;
				case 24: Da(n.memoizedState.cache);
			}
			if (r = n.child, r !== null) r.return = n, au = r;
			else a: for (n = e; au !== null;) {
				r = au;
				var i = r.sibling, a = r.return;
				if (gu(r), r === n) {
					au = null;
					break a;
				}
				if (i !== null) {
					i.return = a, au = i;
					break a;
				}
				au = a;
			}
		}
	}
	var Ju = {
		getCacheForType: function(e) {
			var t = ya(Ta), n = t.data.get(e);
			return n === void 0 && (n = e(), t.data.set(e, n)), n;
		},
		cacheSignal: function() {
			return ya(Ta).controller.signal;
		}
	}, Yu = typeof WeakMap == "function" ? WeakMap : Map, Xu = 0, Zu = null, X = null, Z = 0, Q = 0, Qu = null, $u = !1, ed = !1, td = !1, nd = 0, rd = 0, id = 0, ad = 0, od = 0, sd = 0, cd = 0, ld = null, ud = null, dd = !1, fd = 0, pd = 0, md = Infinity, hd = null, gd = null, _d = 0, vd = null, yd = null, bd = 0, xd = 0, Sd = null, Cd = null, wd = null, Td = null, Ed = null, Dd = 0, Od = null;
	function kd() {
		return Xu & 2 && Z !== 0 ? Z & -Z : P.T === null ? bt() : Nf();
	}
	function Ad() {
		if (sd === 0) {
			if (!(Z & 536870912) || K) {
				var e = it;
				it <<= 1, !(it & 3932160) && (it = 262144), sd = e;
			} else sd = 536870912;
		}
		return e = To.current, e !== null && (e.flags |= 32), sd;
	}
	function jd(e, t) {
		if (t != null) {
			var n = e.stateNode, r = n.ref;
			r === null && (r = n.ref = Pp(di(e.memoizedProps, n))), Td === null && (Td = []), Td.push(t.bind(null, r));
		}
	}
	function Md(e, t, n) {
		(e === Zu && (Q === 2 || Q === 9) || e.cancelPendingCommit !== null) && (zd(e, 0), Id(e, Z, sd, !1)), pt(e, n), (!(Xu & 2) || e !== Zu) && (e === Zu && (!(Xu & 2) && (ad |= n), rd === 4 && Id(e, Z, sd, !1)), Tf(e));
	}
	function Nd(e, t, n) {
		if (Xu & 6) throw Error(i(327));
		var r = !n && !(t & 127) && (t & e.expiredLanes) === 0 || ct(e, t), a = r ? qd(e, t) : Gd(e, t, !0), o = r;
		do {
			if (a === 0) {
				ed && !r && Id(e, t, 0, !1);
				break;
			}
			if (n = e.current.alternate, o && !Fd(n)) a = Gd(e, t, !1), o = !1;
			else {
				if (a === 2) {
					if (o = t, e.errorRecoveryDisabledLanes & o) var s = 0;
					else s = e.pendingLanes & -536870913, s = s === 0 ? s & 536870912 ? 536870912 : 0 : s;
					if (s !== 0) {
						t = s;
						a: {
							var c = e;
							a = ld;
							var l = c.current.memoizedState.isDehydrated;
							if (l && (zd(c, s).flags |= 256), s = Gd(c, s, !1), s !== 2 && s !== 6) {
								if (td && !l) {
									c.errorRecoveryDisabledLanes |= o, ad |= o, a = 4;
									break a;
								}
								o = ud, ud = a, o !== null && (ud === null ? ud = o : ud.push.apply(ud, o));
							}
							a = s;
						}
						if (o = !1, a !== 2) continue;
					}
				}
				if (a === 1) {
					zd(e, 0), Id(e, t, 0, !0);
					break;
				}
				a: {
					switch (r = e, o = a, o) {
						case 0:
						case 1: throw Error(i(345));
						case 4: if ((t & 4194048) !== t && (t & 62914560) !== t) break;
						case 6:
							Id(r, t, sd, !$u);
							break a;
						case 2:
							ud = null;
							break;
						case 3:
						case 5: break;
						default: throw Error(i(329));
					}
					if ((t & 62914560) === t && (a = fd + 300 - Ue(), 10 < a)) {
						if (Id(r, t, sd, !$u), st(r, 0, !0) !== 0) break a;
						bd = t, r.timeoutHandle = gp(Pd.bind(null, r, n, ud, hd, dd, t, sd, ad, cd, $u, o, "Throttled", -0, 0), a);
						break a;
					}
					Pd(r, n, ud, hd, dd, t, sd, ad, cd, $u, o, null, -0, 0);
				}
				break;
			}
		} while (1);
		Tf(e);
	}
	function Pd(e, t, n, r, i, a, o, s, c, l, u, d, f, p) {
		e.timeoutHandle = -1;
		var m = t.subtreeFlags, h = (a & 335544064) === a;
		d = null, (h || m & 8192 || (m & 16785408) == 16785408) && (d = {
			stylesheets: null,
			count: 0,
			imgCount: 0,
			imgBytes: 0,
			suspenseyImages: [],
			waitingForImages: !0,
			waitingForViewTransition: !1,
			unsuspend: gn
		}, Ll = null, Hu(t, a, d), h && (m = d, h = e.containerInfo, h = (h.nodeType === 9 ? h : h.ownerDocument).__reactViewTransition, h != null && (m.count++, m.waitingForViewTransition = !0, m = nh.bind(m), h.finished.then(m, m))), m = (a & 62914560) === a ? fd - Ue() : (a & 4194048) === a ? pd - Ue() : 0, m = eh(d, m), m !== null) ? (bd = a, e.cancelPendingCommit = m(ef.bind(null, e, t, a, n, r, i, o, s, c, l, u, d, null, f, p)), Id(e, a, o, !l)) : ef(e, t, a, n, r, i, o, s, c, l, u, d);
	}
	function Fd(e) {
		for (var t = e;;) {
			var n = t.tag;
			if ((n === 0 || n === 11 || n === 15) && t.flags & 16384 && (n = t.updateQueue, n !== null && (n = n.stores, n !== null))) for (var r = 0; r < n.length; r++) {
				var i = n[r], a = i.getSnapshot;
				i = i.value;
				try {
					if (!Ir(a(), i)) return !1;
				} catch {
					return !1;
				}
			}
			if (n = t.child, t.subtreeFlags & 16384 && n !== null) n.return = t, t = n;
			else {
				if (t === e) break;
				for (; t.sibling === null;) {
					if (t.return === null || t.return === e) return !0;
					t = t.return;
				}
				t.sibling.return = t.return, t = t.sibling;
			}
		}
		return !0;
	}
	function Id(e, t, n, r) {
		t = lt(e, t), t &= ~od, t &= ~ad, e.suspendedLanes |= t, e.pingedLanes &= ~t, r && (e.warmLanes |= t), r = e.expirationTimes;
		for (var i = t; 0 < i;) {
			var a = 31 - $e(i), o = 1 << a;
			r[a] = -1, i &= ~o;
		}
		n !== 0 && ht(e, n, t);
	}
	function Ld() {
		return Xu & 6 ? !0 : (Ef(0, !1), !1);
	}
	function Rd() {
		if (X !== null) {
			if (Q === 0) var e = X.return;
			else e = X, da = ua = null, es(e), $a = null, eo = 0, e = X;
			for (; e !== null;) _l(e.alternate, e), e = e.return;
			X = null;
		}
	}
	function zd(e, t) {
		var n = e.timeoutHandle;
		return n !== -1 && (e.timeoutHandle = -1, _p(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), bd = 0, Rd(), Zu = e, X = n = Oi(e.current, null), Z = t, Q = 0, Qu = null, $u = !1, ed = ct(e, t), td = !1, cd = sd = od = ad = id = rd = 0, ud = ld = null, dd = !1, nd = lt(e, t), vi(), n;
	}
	function Bd(e, t) {
		q = null, P.H = uc, t === Ua || t === Ga ? (t = Za(), Q = 3) : t === Wa ? (t = Za(), Q = 4) : Q = t === Oc ? 8 : typeof t == "object" && t && typeof t.then == "function" ? 6 : 1, Qu = t, X === null && (rd = 1, Sc(e, Ii(t, e.current)));
	}
	function Vd() {
		var e = To.current;
		return e === null ? !0 : (Z & 4194048) === Z ? Eo === null : (Z & 62914560) === Z || Z & 536870912 ? e === Eo : !1;
	}
	function Hd() {
		var e = P.H;
		return P.H = uc, e === null ? uc : e;
	}
	function Ud() {
		var e = P.A;
		return P.A = Ju, e;
	}
	function Wd() {
		rd = 4, $u || (Z & 4194048) !== Z && To.current !== null || (ed = !0), !(id & 134217727) && !(ad & 134217727) || Zu === null || Id(Zu, Z, sd, !1);
	}
	function Gd(e, t, n) {
		var r = Xu;
		Xu |= 2;
		var i = Hd(), a = Ud();
		(Zu !== e || Z !== t) && (hd = null, zd(e, t)), t = !1;
		var o = rd;
		a: do
			try {
				if (Q !== 0 && X !== null) {
					var s = X, c = Qu;
					switch (Q) {
						case 8:
							Rd(), o = 6;
							break a;
						case 3:
						case 2:
						case 9:
						case 6:
							To.current === null && (t = !0);
							var l = Q;
							if (Q = 0, Qu = null, Zd(e, s, c, l), n && ed) {
								o = 0;
								break a;
							}
							break;
						default: l = Q, Q = 0, Qu = null, Zd(e, s, c, l);
					}
				}
				Kd(), o = rd;
				break;
			} catch (t) {
				Bd(e, t);
			}
		while (1);
		return t && e.shellSuspendCounter++, da = ua = null, Xu = r, P.H = i, P.A = a, X === null && (Zu = null, Z = 0, vi()), o;
	}
	function Kd() {
		for (; X !== null;) Yd(X);
	}
	function qd(e, t) {
		var n = Xu;
		Xu |= 2;
		var r = Hd(), a = Ud();
		Zu !== e || Z !== t ? (hd = null, md = Ue() + 500, zd(e, t)) : ed = ct(e, t);
		a: do
			try {
				if (Q !== 0 && X !== null) {
					t = X;
					var o = Qu;
					b: switch (Q) {
						case 1:
							Q = 0, Qu = null, Zd(e, t, o, 1);
							break;
						case 2:
						case 9:
							if (qa(o)) {
								Q = 0, Qu = null, Xd(t);
								break;
							}
							t = function() {
								Q !== 2 && Q !== 9 || Zu !== e || (Q = 7), Tf(e);
							}, o.then(t, t);
							break a;
						case 3:
							Q = 7;
							break a;
						case 4:
							Q = 5;
							break a;
						case 7:
							qa(o) ? (Q = 0, Qu = null, Xd(t)) : (Q = 0, Qu = null, Zd(e, t, o, 7));
							break;
						case 5:
							var s = null;
							switch (X.tag) {
								case 26: s = X.memoizedState;
								case 5:
								case 27:
									var c = X;
									if (s ? Ym(s) : c.stateNode.complete) {
										Q = 0, Qu = null;
										var l = c.sibling;
										if (l !== null) X = l;
										else {
											var u = c.return;
											u === null ? X = null : (X = u, Qd(u));
										}
										break b;
									}
							}
							Q = 0, Qu = null, Zd(e, t, o, 5);
							break;
						case 6:
							Q = 0, Qu = null, Zd(e, t, o, 6);
							break;
						case 8:
							Rd(), rd = 6;
							break a;
						default: throw Error(i(462));
					}
				}
				Jd();
				break;
			} catch (t) {
				Bd(e, t);
			}
		while (1);
		return da = ua = null, P.H = r, P.A = a, Xu = n, X === null ? (Zu = null, Z = 0, vi(), rd) : 0;
	}
	function Jd() {
		for (; X !== null && !Ve();) Yd(X);
	}
	function Yd(e) {
		var t = cl(e.alternate, e, nd);
		e.memoizedProps = e.pendingProps, t === null ? Qd(e) : X = t;
	}
	function Xd(e) {
		var t = e, n = t.alternate;
		switch (t.tag) {
			case 15:
			case 0:
				t = Hc(n, t, t.pendingProps, t.type, void 0, Z);
				break;
			case 11:
				t = Hc(n, t, t.pendingProps, t.type.render, t.ref, Z);
				break;
			case 5:
				es(t);
				var r = t;
				r === Zi && (K ? (ia(r), r.tag === 5 && r.stateNode != null && (Qi = r.stateNode)) : (ia(r), K = !0));
			default: _l(n, t), t = X = ki(t, nd), t = cl(n, t, nd);
		}
		e.memoizedProps = e.pendingProps, t === null ? Qd(e) : X = t;
	}
	function Zd(e, t, n, r) {
		da = ua = null, es(t), $a = null, eo = 0;
		var i = t.return;
		try {
			if (Dc(e, i, t, n, Z)) {
				rd = 1, Sc(e, Ii(n, e.current)), X = null;
				return;
			}
		} catch (t) {
			if (i !== null) throw X = i, t;
			rd = 1, Sc(e, Ii(n, e.current)), X = null;
			return;
		}
		t.flags & 32768 ? (K || r === 1 ? e = !0 : ed || Z & 536870912 ? e = !1 : ($u = e = !0, (r === 2 || r === 9 || r === 3 || r === 6) && (r = To.current, r !== null && r.tag === 13 && (r.flags |= 16384))), $d(t, e)) : Qd(t);
	}
	function Qd(e) {
		var t = e;
		do {
			if (t.flags & 32768) {
				$d(t, $u);
				return;
			}
			e = t.return;
			var n = hl(t.alternate, t, nd);
			if (n !== null) {
				X = n;
				return;
			}
			if (t = t.sibling, t !== null) {
				X = t;
				return;
			}
			X = t = e;
		} while (t !== null);
		rd === 0 && (rd = 5);
	}
	function $d(e, t) {
		do {
			var n = gl(e.alternate, e);
			if (n !== null) {
				n.flags &= 32767, X = n;
				return;
			}
			if (n = e.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !t && (e = e.sibling, e !== null)) {
				X = e;
				return;
			}
			X = e = n;
		} while (e !== null);
		rd = 6, X = null;
	}
	function ef(e, t, n, r, a, o, s, c, l, u, d, f) {
		e.cancelPendingCommit = null;
		do
			lf();
		while (_d !== 0);
		if (Xu & 6) throw Error(i(327));
		if (t !== null) {
			if (t === e.current) throw Error(i(177));
			e === Zu && (X = Zu = null, Z = 0), yd = t, vd = e, bd = n, Sd = a, Cd = r, tf(e, t, n, s, c, l, f);
		}
	}
	function tf(e, t, n, r, i, a, o) {
		var s = t.lanes | t.childLanes;
		if (xd = s, s |= _i, mt(e, n, s, r, i, a), Td = null, (n & 335544064) === n ? (Ed = Aa(e), r = 10262) : (Ed = null, r = 10256), (t.subtreeFlags & r) !== 0 || (t.flags & r) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, vf(Ke, function() {
			return uf(), null;
		})) : (e.callbackNode = null, e.callbackPriority = 0), Il = !1, r = !!(t.flags & 13878), t.subtreeFlags & 13878 || r) {
			r = P.T, P.T = null, i = _e.p, _e.p = 2, a = Xu, Xu |= 4;
			try {
				uu(e, t, n);
			} finally {
				Xu = a, _e.p = i, P.T = r;
			}
		}
		_d = 1, Il ? wd = Mp(o, e.containerInfo, Ed, af, of, rf, sf, uf, nf, null, null) : (af(), of(), sf());
	}
	function nf(e) {
		if (_d !== 0) {
			var t = vd.onRecoverableError;
			t(e, { componentStack: null });
		}
	}
	function rf() {
		_d === 3 && (_d = 0, Au(yd, vd), _d = 4);
	}
	function af() {
		if (_d === 1) {
			_d = 0;
			var e = vd, t = yd, n = bd, r = !!(t.flags & 13878);
			if (t.subtreeFlags & 13878 || r) {
				r = P.T, P.T = null;
				var i = _e.p;
				_e.p = 2;
				var a = Xu;
				Xu |= 4;
				try {
					su = cu = !1, Eu(t, e, n), n = cp;
					var o = Hr(e.containerInfo), s = n.focusedElem, c = n.selectionRange;
					if (o !== s && s && s.ownerDocument && Vr(s.ownerDocument.documentElement, s)) {
						if (c !== null && G(s)) {
							var l = c.start, u = c.end;
							if (u === void 0 && (u = l), "selectionStart" in s) s.selectionStart = l, s.selectionEnd = Math.min(u, s.value.length);
							else {
								var d = s.ownerDocument || document, f = d && d.defaultView || window;
								if (f.getSelection) {
									var p = f.getSelection(), m = s.textContent.length, h = Math.min(c.start, m), g = c.end === void 0 ? h : Math.min(c.end, m);
									!p.extend && h > g && (o = g, g = h, h = o);
									var _ = Br(s, h), v = Br(s, g);
									if (_ && v && (p.rangeCount !== 1 || p.anchorNode !== _.node || p.anchorOffset !== _.offset || p.focusNode !== v.node || p.focusOffset !== v.offset)) {
										var y = d.createRange();
										y.setStart(_.node, _.offset), p.removeAllRanges(), h > g ? (p.addRange(y), p.extend(v.node, v.offset)) : (y.setEnd(v.node, v.offset), p.addRange(y));
									}
								}
							}
						}
						for (d = [], p = s; p = p.parentNode;) p.nodeType === 1 && d.push({
							element: p,
							left: p.scrollLeft,
							top: p.scrollTop
						});
						for (typeof s.focus == "function" && s.focus(), s = 0; s < d.length; s++) {
							var b = d[s];
							b.element.scrollLeft = b.left, b.element.scrollTop = b.top;
						}
					}
					gh = !!sp, cp = sp = null;
				} finally {
					Xu = a, _e.p = i, P.T = r;
				}
			}
			e.current = t, _d = 2;
		}
	}
	function of() {
		if (_d === 2) {
			_d = 0;
			var e = vd, t = yd, n = !!(t.flags & 8772);
			if (t.subtreeFlags & 8772 || n) {
				n = P.T, P.T = null;
				var r = _e.p;
				_e.p = 2;
				var i = Xu;
				Xu |= 4;
				try {
					fu(e, t.alternate, t);
				} finally {
					Xu = i, _e.p = r, P.T = n;
				}
			}
			_d = 3;
		}
	}
	function sf() {
		if (_d === 4 || _d === 3) {
			_d = 0;
			var e = wd;
			wd = null, He();
			var t = vd, n = yd, r = bd, i = Cd, a = (r & 335544064) === r ? 10262 : 10256;
			if ((n.subtreeFlags & a) !== 0 || (n.flags & a) !== 0 ? _d = 5 : (_d = 0, yd = vd = null, cf(t, t.pendingLanes)), a = t.pendingLanes, a === 0 && (gd = null), yt(r), n = n.stateNode, L && typeof L.onCommitFiberRoot == "function") try {
				L.onCommitFiberRoot(Ze, n, void 0, (n.current.flags & 128) == 128);
			} catch {}
			if (i !== null) {
				n = P.T, a = _e.p, _e.p = 2, P.T = null;
				try {
					for (var o = t.onRecoverableError, s = 0; s < i.length; s++) {
						var c = i[s];
						o(c.value, { componentStack: c.stack });
					}
				} finally {
					P.T = n, _e.p = a;
				}
			}
			if (i = Td, o = Ed, Ed = null, i !== null && (Td = null, o === null && (o = []), e !== null)) for (c = 0; c < i.length; c++) n = (0, i[c])(o), n !== void 0 && e.finished.finally(n);
			bd & 3 && lf(), Tf(t), a = t.pendingLanes, r & 261930 && a & 42 ? t === Od ? Dd++ : (Dd = 0, Od = t) : (Dd = 0, Od = null), Ef(0, !1);
		}
	}
	function cf(e, t) {
		(e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, Da(t)));
	}
	function lf() {
		return wd !== null && (wd.skipTransition(), wd = null), af(), of(), sf(), uf();
	}
	function uf() {
		if (_d !== 5) return !1;
		var e = vd, t = xd;
		xd = 0;
		var n = yt(bd), r = P.T, a = _e.p;
		try {
			_e.p = 32 > n ? 32 : n, P.T = null, n = Sd, Sd = null;
			var o = vd, s = bd;
			if (_d = 0, yd = vd = null, bd = 0, Xu & 6) throw Error(i(331));
			var c = Xu;
			if (Xu |= 4, Gu(o.current), Lu(o, o.current, s, n), Xu = c, Ef(0, !1), L && typeof L.onPostCommitFiberRoot == "function") try {
				L.onPostCommitFiberRoot(Ze, o);
			} catch {}
			return !0;
		} finally {
			_e.p = a, P.T = r, cf(e, t);
		}
	}
	function df(e, t, n) {
		t = Ii(n, t), t = wc(e.stateNode, t, 2), e = fo(e, t, 2), e !== null && (pt(e, 2), Tf(e));
	}
	function ff(e, t, n) {
		if (e.tag === 3) df(e, e, n);
		else for (; t !== null;) {
			if (t.tag === 3) {
				df(t, e, n);
				break;
			}
			if (t.tag === 1) {
				var r = t.stateNode;
				if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (gd === null || !gd.has(r))) {
					e = Ii(n, e), n = Tc(2), r = fo(t, n, 2), r !== null && (Ec(n, r, t, e), pt(r, 2), Tf(r));
					break;
				}
			}
			t = t.return;
		}
	}
	function pf(e, t, n) {
		var r = e.pingCache;
		if (r === null) {
			r = e.pingCache = new Yu();
			var i = /* @__PURE__ */ new Set();
			r.set(t, i);
		} else i = r.get(t), i === void 0 && (i = /* @__PURE__ */ new Set(), r.set(t, i));
		i.has(n) || (td = !0, i.add(n), e = mf.bind(null, e, t, n), t.then(e, e));
	}
	function mf(e, t, n) {
		var r = e.pingCache;
		r !== null && r.delete(t), e.pingedLanes |= e.suspendedLanes & n, e.warmLanes &= ~n, Zu === e && (Z & n) === n && (rd === 4 || rd === 3 && (Z & 62914560) === Z && 300 > Ue() - fd ? Xu & 2 ? od |= n : zd(e, 0) : od |= n, cd === Z && (cd = 0)), Tf(e);
	}
	function hf(e, t) {
		t === 0 && (t = dt()), e = xi(e, t), e !== null && (pt(e, t), Tf(e));
	}
	function gf(e) {
		var t = e.memoizedState, n = 0;
		t !== null && (n = t.retryLane), hf(e, n);
	}
	function _f(e, t) {
		var n = 0;
		switch (e.tag) {
			case 31:
			case 13:
				var r = e.stateNode, a = e.memoizedState;
				a !== null && (n = a.retryLane);
				break;
			case 19:
				r = e.stateNode;
				break;
			case 22:
				r = e.stateNode._retryCache;
				break;
			default: throw Error(i(314));
		}
		r !== null && r.delete(t), hf(e, n);
	}
	function vf(e, t) {
		return ze(e, t);
	}
	var yf = null, bf = null, xf = !1, Sf = !1, Cf = !1, wf = 0;
	function Tf(e) {
		e !== bf && e.next === null && (bf === null ? yf = bf = e : bf = bf.next = e), Sf = !0, xf || (xf = !0, Mf());
	}
	function Ef(e, t) {
		if (!Cf && Sf) {
			Cf = !0;
			do
				for (var n = !1, r = yf; r !== null;) {
					if (!t) {
						if (e !== 0) {
							var i = r.pendingLanes;
							if (i === 0) var a = 0;
							else {
								var o = r.suspendedLanes, s = r.pingedLanes;
								a = (1 << 31 - $e(42 | e) + 1) - 1, a &= i & ~(o & ~s), a = a & 201326741 ? a & 201326741 | 1 : a ? a | 2 : 0;
							}
							a !== 0 && (n = !0, jf(r, a));
						} else a = Z, a = st(r, r === Zu ? a : 0, r.cancelPendingCommit !== null || r.timeoutHandle !== -1), !(a & 3) || ct(r, a) || (n = !0, jf(r, a));
					}
					r = r.next;
				}
			while (n);
			Cf = !1;
		}
	}
	function Df() {
		Of();
	}
	function Of() {
		Sf = xf = !1;
		var e = 0;
		wf !== 0 && hp() && (e = wf);
		for (var t = Ue(), n = null, r = yf; r !== null;) {
			var i = r.next, a = kf(r, t);
			a === 0 ? (r.next = null, n === null ? yf = i : n.next = i, i === null && (bf = n)) : (n = r, (e !== 0 || a & 3) && (Sf = !0)), r = i;
		}
		_d !== 0 && _d !== 5 || Ef(e, !1), wf !== 0 && (wf = 0);
	}
	function kf(e, t) {
		for (var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, a = e.pendingLanes & -62914561; 0 < a;) {
			var o = 31 - $e(a), s = 1 << o, c = i[o];
			c === -1 ? ((s & n) === 0 || (s & r) !== 0) && (i[o] = ut(s, t)) : c <= t && (e.expiredLanes |= s), a &= ~s;
		}
		if (t = Zu, n = Z, n = st(e, e === t ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r = e.callbackNode, n === 0 || e === t && (Q === 2 || Q === 9) || e.cancelPendingCommit !== null) return r !== null && r !== null && Be(r), e.callbackNode = null, e.callbackPriority = 0;
		if (!(n & 3) || ct(e, n)) {
			if (t = n & -n, t === e.callbackPriority) return t;
			switch (r !== null && Be(r), yt(n)) {
				case 2:
				case 8:
					n = Ge;
					break;
				case 32:
					n = Ke;
					break;
				case 268435456:
					n = Je;
					break;
				default: n = Ke;
			}
			return r = Af.bind(null, e), n = ze(n, r), e.callbackPriority = t, e.callbackNode = n, t;
		}
		return r !== null && r !== null && Be(r), e.callbackPriority = 2, e.callbackNode = null, 2;
	}
	function Af(e, t) {
		if (_d !== 0 && _d !== 5) return e.callbackNode = null, e.callbackPriority = 0, null;
		var n = e.callbackNode;
		if (lf() && e.callbackNode !== n) return null;
		var r = Z;
		return r = st(e, e === Zu ? r : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r === 0 ? null : (Nd(e, r, t), kf(e, Ue()), e.callbackNode != null && e.callbackNode === n ? Af.bind(null, e) : null);
	}
	function jf(e, t) {
		if (lf()) return null;
		Nd(e, t, !0);
	}
	function Mf() {
		bp(function() {
			Xu & 6 ? ze(I, Df) : Of();
		});
	}
	function Nf() {
		if (wf === 0) {
			var e = Na;
			e === 0 && (e = rt, rt <<= 1, !(rt & 261888) && (rt = 256)), wf = e;
		}
		return wf;
	}
	function Pf(e) {
		return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : hn(e);
	}
	function Ff(e, t, n, r, i) {
		if (t === "submit" && n && n.stateNode === i) {
			var a = Pf((i[R] || null).action), o = r.submitter;
			o && (t = (t = o[R] || null) ? Pf(t.formAction) : o.getAttribute("formAction"), t !== null && (a = t, o = null));
			var s = new Pn("action", "action", null, r, i);
			e.push({
				event: s,
				listeners: [{
					instance: null,
					listener: function() {
						if (r.defaultPrevented) {
							if (wf !== 0) {
								var e = new FormData(i, o);
								Xs(n, {
									pending: !0,
									data: e,
									method: i.method,
									action: a
								}, null, e);
							}
						} else typeof a == "function" && (s.preventDefault(), e = new FormData(i, o), Xs(n, {
							pending: !0,
							data: e,
							method: i.method,
							action: a
						}, a, e));
					},
					currentTarget: i
				}]
			});
		}
	}
	for (var If = 0; If < ci.length; If++) {
		var Lf = ci[If];
		li(Lf.toLowerCase(), "on" + (Lf[0].toUpperCase() + Lf.slice(1)));
	}
	li(ei, "onAnimationEnd"), li(ti, "onAnimationIteration"), li(ni, "onAnimationStart"), li("dblclick", "onDoubleClick"), li("focusin", "onFocus"), li("focusout", "onBlur"), li(ri, "onTransitionRun"), li(ii, "onTransitionStart"), li(ai, "onTransitionCancel"), li(oi, "onTransitionEnd"), zt("onMouseEnter", ["mouseout", "mouseover"]), zt("onMouseLeave", ["mouseout", "mouseover"]), zt("onPointerEnter", ["pointerout", "pointerover"]), zt("onPointerLeave", ["pointerout", "pointerover"]), Rt("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), Rt("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), Rt("onBeforeInput", [
		"compositionend",
		"keypress",
		"textInput",
		"paste"
	]), Rt("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), Rt("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), Rt("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
	var Rf = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), zf = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Rf));
	function Bf(e, t) {
		t = !!(t & 4);
		for (var n = 0; n < e.length; n++) {
			var r = e[n], i = r.event;
			r = r.listeners;
			a: {
				var a = void 0;
				if (t) for (var o = r.length - 1; 0 <= o; o--) {
					var s = r[o], c = s.instance, l = s.currentTarget;
					if (s = s.listener, c !== a && i.isPropagationStopped()) break a;
					a = s, i.currentTarget = l;
					try {
						a(i);
					} catch (e) {
						mi(e);
					}
					i.currentTarget = null, a = c;
				}
				else for (o = 0; o < r.length; o++) {
					if (s = r[o], c = s.instance, l = s.currentTarget, s = s.listener, c !== a && i.isPropagationStopped()) break a;
					a = s, i.currentTarget = l;
					try {
						a(i);
					} catch (e) {
						mi(e);
					}
					i.currentTarget = null, a = c;
				}
			}
		}
	}
	function $(e, t) {
		var n = t[Tt];
		n === void 0 && (n = t[Tt] = /* @__PURE__ */ new Set());
		var r = e + "__bubble";
		n.has(r) || (Wf(t, e, 2, !1), n.add(r));
	}
	function Vf(e, t, n) {
		var r = 0;
		t && (r |= 4), Wf(n, e, r, t);
	}
	var Hf = "_reactListening" + Math.random().toString(36).slice(2);
	function Uf(e) {
		if (!e[Hf]) {
			e[Hf] = !0, It.forEach(function(t) {
				t !== "selectionchange" && (zf.has(t) || Vf(t, !1, e), Vf(t, !0, e));
			});
			var t = e.nodeType === 9 ? e : e.ownerDocument;
			t === null || t[Hf] || (t[Hf] = !0, Vf("selectionchange", !1, t));
		}
	}
	function Wf(e, t, n, r) {
		switch (Ch(t)) {
			case 2:
				var i = _h;
				break;
			case 8:
				i = vh;
				break;
			default: i = yh;
		}
		n = i.bind(null, t, n, e), i = void 0, !Tn || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0), r ? i === void 0 ? e.addEventListener(t, n, !0) : e.addEventListener(t, n, {
			capture: !0,
			passive: i
		}) : i === void 0 ? e.addEventListener(t, n, !1) : e.addEventListener(t, n, { passive: i });
	}
	function Gf(e, t, n, r, i) {
		var a = r;
		if (!(t & 1) && !(t & 2) && r !== null) a: for (;;) {
			if (r === null) return;
			var s = r.tag;
			if (s === 3 || s === 4) {
				var c = r.stateNode.containerInfo;
				if (c === i) break;
				if (s === 4) for (s = r.return; s !== null;) {
					var l = s.tag;
					if ((l === 3 || l === 4) && s.stateNode.containerInfo === i) return;
					s = s.return;
				}
				for (; c !== null;) {
					if (s = jt(c), s === null) return;
					if (l = s.tag, l === 5 || l === 6 || l === 26 || l === 27) {
						r = a = s;
						continue a;
					}
					c = c.parentNode;
				}
			}
			r = r.return;
		}
		Sn(function() {
			var r = a, i = vn(n), s = [];
			a: {
				var c = si.get(e);
				if (c !== void 0) {
					var l = Pn, u = e;
					switch (e) {
						case "keypress": if (W(n) === 0) break a;
						case "keydown":
						case "keyup":
							l = Qn;
							break;
						case "focusin":
							u = "focus", l = Un;
							break;
						case "focusout":
							u = "blur", l = Un;
							break;
						case "beforeblur":
						case "afterblur":
							l = Un;
							break;
						case "click": if (n.button === 2) break a;
						case "auxclick":
						case "dblclick":
						case "mousedown":
						case "mousemove":
						case "mouseup":
						case "mouseout":
						case "mouseover":
						case "contextmenu":
							l = Vn;
							break;
						case "drag":
						case "dragend":
						case "dragenter":
						case "dragexit":
						case "dragleave":
						case "dragover":
						case "dragstart":
						case "drop":
							l = Hn;
							break;
						case "touchcancel":
						case "touchend":
						case "touchmove":
						case "touchstart":
							l = tr;
							break;
						case ei:
						case ti:
						case ni:
							l = Wn;
							break;
						case oi:
							l = nr;
							break;
						case "scroll":
						case "scrollend":
							l = In;
							break;
						case "wheel":
							l = rr;
							break;
						case "copy":
						case "cut":
						case "paste":
							l = Gn;
							break;
						case "gotpointercapture":
						case "lostpointercapture":
						case "pointercancel":
						case "pointerdown":
						case "pointermove":
						case "pointerout":
						case "pointerover":
						case "pointerup":
							l = $n;
							break;
						case "submit":
							l = er;
							break;
						case "toggle":
						case "beforetoggle": l = ir;
					}
					var d = !!(t & 4), f = !d && (e === "scroll" || e === "scrollend"), p = d ? c === null ? null : c + "Capture" : c;
					d = [];
					for (var m = r, h; m !== null;) {
						var g = m;
						if (h = g.stateNode, g = g.tag, g !== 5 && g !== 26 && g !== 27 || h === null || p === null || (g = Cn(m, p), g != null && d.push(Kf(m, g, h))), f) break;
						m = m.return;
					}
					0 < d.length && (c = new l(c, u, null, n, i), s.push({
						event: c,
						listeners: d
					}));
				}
			}
			if (!(t & 7)) {
				a: {
					if (l = e === "mouseover" || e === "pointerover", c = e === "mouseout" || e === "pointerout", l && n !== _n && (u = n.relatedTarget || n.fromElement) && (jt(u) || u[wt])) break a;
					(c || l) && (u = i.window === i ? i : (l = i.ownerDocument) ? l.defaultView || l.parentWindow : window, c ? (l = n.relatedTarget || n.toElement, c = r, l = l ? jt(l) : null, l !== null && (f = o(l), d = l.tag, l !== f || d !== 5 && d !== 27 && d !== 6) && (l = null)) : (c = null, l = r), c !== l && (d = Vn, g = "onMouseLeave", p = "onMouseEnter", m = "mouse", (e === "pointerout" || e === "pointerover") && (d = $n, g = "onPointerLeave", p = "onPointerEnter", m = "pointer"), f = c == null ? u : Nt(c), h = l == null ? u : Nt(l), u = new d(g, m + "leave", c, n, i), u.target = f, u.relatedTarget = h, g = null, jt(i) === r && (d = new d(p, m + "enter", l, n, i), d.target = h, d.relatedTarget = f, g = d), f = g, d = c && l ? E(c, l, Jf) : null, c !== null && Yf(s, u, c, d, !1), l !== null && f !== null && Yf(s, f, l, d, !0)));
				}
				a: {
					if (c = r ? Nt(r) : window, l = c.nodeName && c.nodeName.toLowerCase(), l === "select" || l === "input" && c.type === "file") var _ = wr;
					else if (vr(c)) {
						if (Tr) _ = Pr;
						else {
							_ = Mr;
							var v = jr;
						}
					} else l = c.nodeName, !l || l.toLowerCase() !== "input" || c.type !== "checkbox" && c.type !== "radio" ? r && fn(r.elementType) && (_ = wr) : _ = Nr;
					if (_ &&= _(e, r)) {
						yr(s, _, n, i);
						break a;
					}
					v && v(e, c, r);
				}
				switch (v = r ? Nt(r) : window, e) {
					case "focusin":
						(vr(v) || v.contentEditable === "true") && (Wr = v, Gr = r, Kr = null);
						break;
					case "focusout":
						Kr = Gr = Wr = null;
						break;
					case "mousedown":
						qr = !0;
						break;
					case "contextmenu":
					case "mouseup":
					case "dragend":
						qr = !1, Jr(s, n, i);
						break;
					case "selectionchange": if (Ur) break;
					case "keydown":
					case "keyup": Jr(s, n, i);
				}
				var y;
				if (or) b: {
					switch (e) {
						case "compositionstart":
							var b = "onCompositionStart";
							break b;
						case "compositionend":
							b = "onCompositionEnd";
							break b;
						case "compositionupdate":
							b = "onCompositionUpdate";
							break b;
					}
					b = void 0;
				}
				else mr ? fr(e, n) && (b = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (b = "onCompositionStart");
				b && (lr && n.locale !== "ko" && (mr || b !== "onCompositionStart" ? b === "onCompositionEnd" && mr && (y = kn()) : (Dn = i, On = "value" in Dn ? Dn.value : Dn.textContent, mr = !0)), v = qf(r, b), 0 < v.length && (b = new Kn(b, e, null, n, i), s.push({
					event: b,
					listeners: v
				}), y ? b.data = y : (y = pr(n), y !== null && (b.data = y)))), (y = cr ? hr(e, n) : gr(e, n)) && (b = qf(r, "onBeforeInput"), 0 < b.length && (v = new Kn("onBeforeInput", "beforeinput", null, n, i), s.push({
					event: v,
					listeners: b
				}), v.data = y)), Ff(s, e, r, n, i);
			}
			Bf(s, t);
		});
	}
	function Kf(e, t, n) {
		return {
			instance: e,
			listener: t,
			currentTarget: n
		};
	}
	function qf(e, t) {
		for (var n = t + "Capture", r = []; e !== null;) {
			var i = e, a = i.stateNode;
			if (i = i.tag, i !== 5 && i !== 26 && i !== 27 || a === null || (i = Cn(e, n), i != null && r.unshift(Kf(e, i, a)), i = Cn(e, t), i != null && r.push(Kf(e, i, a))), e.tag === 3) return r;
			e = e.return;
		}
		return [];
	}
	function Jf(e) {
		if (e === null) return null;
		do
			e = e.return;
		while (e && e.tag !== 5 && e.tag !== 27);
		return e || null;
	}
	function Yf(e, t, n, r, i) {
		for (var a = t._reactName, o = []; n !== null && n !== r;) {
			var s = n, c = s.alternate, l = s.stateNode;
			if (s = s.tag, c !== null && c === r) break;
			s !== 5 && s !== 26 && s !== 27 || l === null || (c = l, i ? (l = Cn(n, a), l != null && o.unshift(Kf(n, l, c))) : i || (l = Cn(n, a), l != null && o.push(Kf(n, l, c)))), n = n.return;
		}
		o.length !== 0 && e.push({
			event: t,
			listeners: o
		});
	}
	var Xf = /\r\n?/g, Zf = /\u0000|\uFFFD/g;
	function Qf(e) {
		return (typeof e == "string" ? e : "" + e).replace(Xf, "\n").replace(Zf, "");
	}
	function $f(e, t) {
		return t = Qf(t), Qf(e) === t;
	}
	function ep(e, t, n, r, a, o) {
		switch (n) {
			case "children":
				if (typeof r == "string") t === "body" || t === "textarea" && r === "" || cn(e, r);
				else if (typeof r == "number" || typeof r == "bigint") t !== "body" && cn(e, "" + r);
				else return;
				break;
			case "className":
				qt(e, "class", r);
				break;
			case "tabIndex":
				qt(e, "tabindex", r);
				break;
			case "dir":
			case "role":
			case "viewBox":
			case "width":
			case "height":
				qt(e, n, r);
				break;
			case "style":
				dn(e, r, o);
				return;
			case "data": if (t !== "object") {
				qt(e, "data", r);
				break;
			}
			case "src":
			case "href":
				if (r === "" && (t !== "a" || n !== "href") || r == null || typeof r == "function" || typeof r == "symbol" || typeof r == "boolean") {
					e.removeAttribute(n);
					break;
				}
				r = hn(r), e.setAttribute(n, r);
				break;
			case "action":
			case "formAction":
				if (typeof r == "function") {
					e.setAttribute(n, "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");
					break;
				}
				if (typeof o == "function" && (n === "formAction" ? (t !== "input" && ep(e, t, "name", a.name, a, null), ep(e, t, "formEncType", a.formEncType, a, null), ep(e, t, "formMethod", a.formMethod, a, null), ep(e, t, "formTarget", a.formTarget, a, null)) : (ep(e, t, "encType", a.encType, a, null), ep(e, t, "method", a.method, a, null), ep(e, t, "target", a.target, a, null))), r == null || typeof r == "symbol" || typeof r == "boolean") {
					e.removeAttribute(n);
					break;
				}
				r = hn(r), e.setAttribute(n, r);
				break;
			case "onClick":
				r != null && (e.onclick = gn);
				return;
			case "onScroll":
				r != null && $("scroll", e);
				return;
			case "onScrollEnd":
				r != null && $("scrollend", e);
				return;
			case "dangerouslySetInnerHTML":
				if (r != null) {
					if (typeof r != "object" || !("__html" in r)) throw Error(i(61));
					if (n = r.__html, n != null) {
						if (a.children != null) throw Error(i(60));
						o?.__html !== n && (e.innerHTML = n);
					}
				}
				break;
			case "multiple":
				e.multiple = r && typeof r != "function" && typeof r != "symbol";
				break;
			case "muted":
				e.muted = r && typeof r != "function" && typeof r != "symbol";
				break;
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "defaultValue":
			case "defaultChecked":
			case "innerHTML":
			case "ref": break;
			case "autoFocus": break;
			case "xlinkHref":
				if (r == null || typeof r == "function" || typeof r == "boolean" || typeof r == "symbol") {
					e.removeAttribute("xlink:href");
					break;
				}
				n = hn(r), e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", n);
				break;
			case "contentEditable":
			case "spellCheck":
			case "draggable":
			case "value":
			case "autoReverse":
			case "externalResourcesRequired":
			case "focusable":
			case "preserveAlpha":
				r != null && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, r) : e.removeAttribute(n);
				break;
			case "inert":
			case "allowFullScreen":
			case "async":
			case "autoPlay":
			case "controls":
			case "credentialless":
			case "default":
			case "defer":
			case "disabled":
			case "disablePictureInPicture":
			case "disableRemotePlayback":
			case "formNoValidate":
			case "hidden":
			case "loop":
			case "noModule":
			case "noValidate":
			case "open":
			case "playsInline":
			case "readOnly":
			case "required":
			case "reversed":
			case "scoped":
			case "seamless":
			case "itemScope":
				r && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, "") : e.removeAttribute(n);
				break;
			case "capture":
			case "download":
				!0 === r ? e.setAttribute(n, "") : !1 !== r && r != null && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, r) : e.removeAttribute(n);
				break;
			case "cols":
			case "rows":
			case "size":
			case "span":
				r != null && typeof r != "function" && typeof r != "symbol" && !isNaN(r) && 1 <= r ? e.setAttribute(n, r) : e.removeAttribute(n);
				break;
			case "rowSpan":
			case "start":
				r == null || typeof r == "function" || typeof r == "symbol" || isNaN(r) ? e.removeAttribute(n) : e.setAttribute(n, r);
				break;
			case "popover":
				$("beforetoggle", e), $("toggle", e), Kt(e, "popover", r);
				break;
			case "xlinkActuate":
				Jt(e, "http://www.w3.org/1999/xlink", "xlink:actuate", r);
				break;
			case "xlinkArcrole":
				Jt(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", r);
				break;
			case "xlinkRole":
				Jt(e, "http://www.w3.org/1999/xlink", "xlink:role", r);
				break;
			case "xlinkShow":
				Jt(e, "http://www.w3.org/1999/xlink", "xlink:show", r);
				break;
			case "xlinkTitle":
				Jt(e, "http://www.w3.org/1999/xlink", "xlink:title", r);
				break;
			case "xlinkType":
				Jt(e, "http://www.w3.org/1999/xlink", "xlink:type", r);
				break;
			case "xmlBase":
				Jt(e, "http://www.w3.org/XML/1998/namespace", "xml:base", r);
				break;
			case "xmlLang":
				Jt(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", r);
				break;
			case "xmlSpace":
				Jt(e, "http://www.w3.org/XML/1998/namespace", "xml:space", r);
				break;
			case "is":
				Kt(e, "is", r);
				break;
			case "innerText":
			case "textContent": return;
			default: if (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") n = pn.get(n) || n, Kt(e, n, r);
			else return;
		}
		Wt = !0;
	}
	function tp(e, t, n, r, a, o) {
		switch (n) {
			case "style":
				dn(e, r, o);
				return;
			case "dangerouslySetInnerHTML":
				if (r != null) {
					if (typeof r != "object" || !("__html" in r)) throw Error(i(61));
					if (n = r.__html, n != null) {
						if (a.children != null) throw Error(i(60));
						o?.__html !== n && (e.innerHTML = n);
					}
				}
				break;
			case "children":
				if (typeof r == "string") cn(e, r);
				else if (typeof r == "number" || typeof r == "bigint") cn(e, "" + r);
				else return;
				break;
			case "onScroll":
				r != null && $("scroll", e);
				return;
			case "onScrollEnd":
				r != null && $("scrollend", e);
				return;
			case "onClick":
				r != null && (e.onclick = gn);
				return;
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "innerHTML":
			case "ref": return;
			case "innerText":
			case "textContent": return;
			default:
				if (!Lt.hasOwnProperty(n)) a: {
					if (n[0] === "o" && n[1] === "n" && (a = n.endsWith("Capture"), o = n.slice(2, a ? n.length - 7 : void 0), t = e[R] || null, t = t == null ? null : t[n], typeof t == "function" && e.removeEventListener(o, t, a), typeof r == "function")) {
						typeof t != "function" && t !== null && (n in e ? e[n] = null : e.hasAttribute(n) && e.removeAttribute(n)), e.addEventListener(o, r, a);
						break a;
					}
					Wt = !0, n in e ? e[n] = r : !0 === r ? e.setAttribute(n, "") : Kt(e, n, r);
				}
				return;
		}
		Wt = !0;
	}
	function np(e, t, n) {
		switch (t) {
			case "div":
			case "span":
			case "svg":
			case "path":
			case "a":
			case "g":
			case "p":
			case "li": break;
			case "img":
				$("error", e), $("load", e);
				var r = !1, a = !1, o;
				for (o in n) if (n.hasOwnProperty(o)) {
					var s = n[o];
					if (s != null) switch (o) {
						case "src":
							r = !0;
							break;
						case "srcSet":
							a = !0;
							break;
						case "children":
						case "dangerouslySetInnerHTML": throw Error(i(137, t));
						default: ep(e, t, o, s, n, null);
					}
				}
				a && ep(e, t, "srcSet", n.srcSet, n, null), r && ep(e, t, "src", n.src, n, null);
				return;
			case "input":
				$("invalid", e);
				var c = o = s = a = null, l = null, u = null;
				for (r in n) if (n.hasOwnProperty(r)) {
					var d = n[r];
					if (d != null) switch (r) {
						case "name":
							a = d;
							break;
						case "type":
							s = d;
							break;
						case "checked":
							l = d;
							break;
						case "defaultChecked":
							u = d;
							break;
						case "value":
							o = d;
							break;
						case "defaultValue":
							c = d;
							break;
						case "children":
						case "dangerouslySetInnerHTML":
							if (d != null) throw Error(i(137, t));
							break;
						default: ep(e, t, r, d, n, null);
					}
				}
				rn(e, o, c, l, u, s, a, !1);
				return;
			case "select":
				for (a in $("invalid", e), r = s = o = null, n) if (n.hasOwnProperty(a) && (c = n[a], c != null)) switch (a) {
					case "value":
						o = c;
						break;
					case "defaultValue":
						s = c;
						break;
					case "multiple": r = c;
					default: ep(e, t, a, c, n, null);
				}
				t = o, n = s, e.multiple = !!r, t == null ? n != null && on(e, !!r, n, !0) : on(e, !!r, t, !1);
				return;
			case "textarea":
				for (s in $("invalid", e), o = a = r = null, n) if (n.hasOwnProperty(s) && (c = n[s], c != null)) switch (s) {
					case "value":
						r = c;
						break;
					case "defaultValue":
						a = c;
						break;
					case "children":
						o = c;
						break;
					case "dangerouslySetInnerHTML":
						if (c != null) throw Error(i(91));
						break;
					default: ep(e, t, s, c, n, null);
				}
				sn(e, r, a, o);
				return;
			case "option":
				for (l in n) if (n.hasOwnProperty(l) && (r = n[l], r != null)) switch (l) {
					case "selected":
						e.selected = r && typeof r != "function" && typeof r != "symbol";
						break;
					default: ep(e, t, l, r, n, null);
				}
				return;
			case "dialog":
				$("beforetoggle", e), $("toggle", e), $("cancel", e), $("close", e);
				break;
			case "iframe":
			case "object":
				$("load", e);
				break;
			case "video":
			case "audio":
				for (r = 0; r < Rf.length; r++) $(Rf[r], e);
				break;
			case "image":
				$("error", e), $("load", e);
				break;
			case "details":
				$("toggle", e);
				break;
			case "embed":
			case "source":
			case "link": $("error", e), $("load", e);
			case "area":
			case "base":
			case "br":
			case "col":
			case "hr":
			case "keygen":
			case "meta":
			case "param":
			case "track":
			case "wbr":
			case "menuitem":
				for (u in n) if (n.hasOwnProperty(u) && (r = n[u], r != null)) switch (u) {
					case "children":
					case "dangerouslySetInnerHTML": throw Error(i(137, t));
					default: ep(e, t, u, r, n, null);
				}
				return;
			default: if (fn(t)) {
				for (d in n) n.hasOwnProperty(d) && (r = n[d], r !== void 0 && tp(e, t, d, r, n, void 0));
				return;
			}
		}
		for (c in n) n.hasOwnProperty(c) && (r = n[c], r != null && ep(e, t, c, r, n, null));
	}
	var rp = {};
	function ip(e, t, n, r) {
		switch (t) {
			case "div":
			case "span":
			case "svg":
			case "path":
			case "a":
			case "g":
			case "p":
			case "li": break;
			case "input":
				var a = null, o = null, s = null, c = null, l = null, u = null, d = null;
				for (m in n) {
					var f = n[m];
					if (n.hasOwnProperty(m) && f != null) switch (m) {
						case "checked": break;
						case "value": break;
						case "defaultValue": l = f;
						default: r.hasOwnProperty(m) || ep(e, t, m, null, r, f);
					}
				}
				for (var p in r) {
					var m = r[p];
					if (f = n[p], r.hasOwnProperty(p) && (m != null || f != null)) switch (p) {
						case "type":
							m !== f && (Wt = !0), o = m;
							break;
						case "name":
							m !== f && (Wt = !0), a = m;
							break;
						case "checked":
							m !== f && (Wt = !0), u = m;
							break;
						case "defaultChecked":
							m !== f && (Wt = !0), d = m;
							break;
						case "value":
							m !== f && (Wt = !0), s = m;
							break;
						case "defaultValue":
							m !== f && (Wt = !0), c = m;
							break;
						case "children":
						case "dangerouslySetInnerHTML":
							if (m != null) throw Error(i(137, t));
							break;
						default: m !== f && ep(e, t, p, m, r, f);
					}
				}
				nn(e, s, c, l, u, d, o, a);
				return;
			case "select":
				for (o in m = s = c = p = null, n) if (l = n[o], n.hasOwnProperty(o) && l != null) switch (o) {
					case "value": break;
					case "multiple": m = l;
					default: r.hasOwnProperty(o) || ep(e, t, o, null, r, l);
				}
				for (a in r) if (o = r[a], l = n[a], r.hasOwnProperty(a) && (o != null || l != null)) switch (a) {
					case "value":
						o !== l && (Wt = !0), p = o;
						break;
					case "defaultValue":
						o !== l && (Wt = !0), c = o;
						break;
					case "multiple": o !== l && (Wt = !0), s = o;
					default: o !== l && ep(e, t, a, o, r, l);
				}
				t = c, n = s, r = m, p == null ? !!r != !!n && (t == null ? on(e, !!n, n ? [] : "", !1) : on(e, !!n, t, !0)) : on(e, !!n, p, !1);
				return;
			case "textarea":
				for (c in m = p = null, n) if (a = n[c], n.hasOwnProperty(c) && a != null && !r.hasOwnProperty(c)) switch (c) {
					case "value": break;
					case "children": break;
					default: ep(e, t, c, null, r, a);
				}
				for (s in r) if (a = r[s], o = n[s], r.hasOwnProperty(s) && (a != null || o != null)) switch (s) {
					case "value":
						a !== o && (Wt = !0), p = a;
						break;
					case "defaultValue":
						a !== o && (Wt = !0), m = a;
						break;
					case "children": break;
					case "dangerouslySetInnerHTML":
						if (a != null) throw Error(i(91));
						break;
					default: a !== o && ep(e, t, s, a, r, o);
				}
				V(e, p, m);
				return;
			case "option":
				for (var h in n) if (p = n[h], n.hasOwnProperty(h) && p != null && !r.hasOwnProperty(h)) switch (h) {
					case "selected":
						e.selected = !1;
						break;
					default: ep(e, t, h, null, r, p);
				}
				for (l in r) if (p = r[l], m = n[l], r.hasOwnProperty(l) && p !== m && (p != null || m != null)) switch (l) {
					case "selected":
						p !== m && (Wt = !0), e.selected = p && typeof p != "function" && typeof p != "symbol";
						break;
					default: ep(e, t, l, p, r, m);
				}
				return;
			case "img":
			case "link":
			case "area":
			case "base":
			case "br":
			case "col":
			case "embed":
			case "hr":
			case "keygen":
			case "meta":
			case "param":
			case "source":
			case "track":
			case "wbr":
			case "menuitem":
				for (var g in n) p = n[g], n.hasOwnProperty(g) && p != null && !r.hasOwnProperty(g) && ep(e, t, g, null, r, p);
				for (u in r) if (p = r[u], m = n[u], r.hasOwnProperty(u) && p !== m && (p != null || m != null)) switch (u) {
					case "children":
					case "dangerouslySetInnerHTML":
						if (p != null) throw Error(i(137, t));
						break;
					default: ep(e, t, u, p, r, m);
				}
				return;
			default: if (fn(t)) {
				for (var _ in n) p = n[_], n.hasOwnProperty(_) && p !== void 0 && !r.hasOwnProperty(_) && tp(e, t, _, void 0, r, p);
				for (d in r) p = r[d], m = n[d], !r.hasOwnProperty(d) || p === m || p === void 0 && m === void 0 || tp(e, t, d, p, r, m);
				return;
			}
		}
		for (var v in n) p = n[v], n.hasOwnProperty(v) && p != null && !r.hasOwnProperty(v) && ep(e, t, v, null, r, p);
		for (f in r) p = r[f], m = n[f], !r.hasOwnProperty(f) || p === m || p == null && m == null || ep(e, t, f, p, r, m);
	}
	function ap(e) {
		switch (e) {
			case "css":
			case "script":
			case "font":
			case "img":
			case "image":
			case "input":
			case "link": return !0;
			default: return !1;
		}
	}
	function op() {
		if (typeof performance.getEntriesByType == "function") {
			for (var e = 0, t = 0, n = performance.getEntriesByType("resource"), r = 0; r < n.length; r++) {
				var i = n[r], a = i.transferSize, o = i.initiatorType, s = i.duration;
				if (a && s && ap(o)) {
					for (o = 0, s = i.responseEnd, r += 1; r < n.length; r++) {
						var c = n[r], l = c.startTime;
						if (l > s) break;
						var u = c.transferSize, d = c.initiatorType;
						u && ap(d) && (c = c.responseEnd, o += u * (c < s ? 1 : (s - l) / (c - l)));
					}
					if (--r, t += 8 * (a + o) / (i.duration / 1e3), e++, 10 < e) break;
				}
			}
			if (0 < e) return t / e / 1e6;
		}
		return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
	}
	var sp = null, cp = null;
	function lp(e) {
		return e.nodeType === 9 ? e : e.ownerDocument;
	}
	function up(e) {
		switch (e) {
			case "http://www.w3.org/2000/svg": return 1;
			case "http://www.w3.org/1998/Math/MathML": return 2;
			default: return 0;
		}
	}
	function dp(e, t) {
		if (e === 0) switch (t) {
			case "svg": return 1;
			case "math": return 2;
			default: return 0;
		}
		return e === 1 && t === "foreignObject" ? 0 : e;
	}
	function fp(e, t, n, r) {
		return n = lp(n).createElement(e), n[Ct] = r, n[R] = t, np(n, e, t), Ft(n), n;
	}
	function pp(e, t) {
		return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
	}
	var mp = null;
	function hp() {
		var e = window.event;
		return e && e.type === "popstate" ? e !== mp && (mp = e, !0) : (mp = null, !1);
	}
	var gp = typeof setTimeout == "function" ? setTimeout : void 0, _p = typeof clearTimeout == "function" ? clearTimeout : void 0, vp = typeof Promise == "function" ? Promise : void 0, yp = typeof requestAnimationFrame == "function" ? requestAnimationFrame : gp, bp = typeof queueMicrotask == "function" ? queueMicrotask : vp === void 0 ? gp : function(e) {
		return vp.resolve(null).then(e).catch(xp);
	};
	function xp(e) {
		setTimeout(function() {
			throw e;
		});
	}
	function Sp(e) {
		return e === "head";
	}
	function Cp(e, t) {
		var n = t, r = 0;
		do {
			var i = n.nextSibling;
			if (e.removeChild(n), i && i.nodeType === 8) {
				if (n = i.data, n === "/$" || n === "/&") {
					if (r === 0) {
						e.removeChild(i), Hh(t);
						return;
					}
					r--;
				} else if (n === "$" || n === "$?" || n === "$~" || n === "$!" || n === "&") r++;
				else if (n === "html") _m(e.ownerDocument.documentElement);
				else if (n === "head") {
					n = e.ownerDocument.head, _m(n);
					for (var a = n.firstChild; a;) {
						var o = a.nextSibling, s = a.nodeName;
						a[Ot] || s === "SCRIPT" || s === "STYLE" || s === "LINK" && a.rel.toLowerCase() === "stylesheet" || n.removeChild(a), a = o;
					}
				} else n === "body" && _m(e.ownerDocument.body);
			}
			n = i;
		} while (n);
		Hh(t);
	}
	function wp(e, t) {
		var n = e;
		e = 0;
		do {
			var r = n.nextSibling;
			if (n.nodeType === 1 ? t ? (n._stashedDisplay = n.style.display, n.style.display = "none") : (n.style.display = n._stashedDisplay || "", n.getAttribute("style") === "" && n.removeAttribute("style")) : n.nodeType === 3 && (t ? (n._stashedText = n.nodeValue, n.nodeValue = "") : n.nodeValue = n._stashedText || ""), r && r.nodeType === 8) {
				if (n = r.data, n === "/$") {
					if (e === 0) break;
					e--;
				} else n !== "$" && n !== "$?" && n !== "$~" && n !== "$!" || e++;
			}
			n = r;
		} while (n);
	}
	function Tp(e, t, n) {
		if (t = CSS.escape(t) === t ? t : "r-" + btoa(t).replace(/=/g, ""), e.style.viewTransitionName = t, n != null && (e.style.viewTransitionClass = n), n = getComputedStyle(e), n.display === "inline") {
			if (t = e.getClientRects(), t.length === 1) var r = 1;
			else for (var i = r = 0; i < t.length; i++) {
				var a = t[i];
				0 < a.width && 0 < a.height && r++;
			}
			r === 1 && (e = e.style, e.display = t.length === 1 ? "inline-block" : "block", e.marginTop = "-" + n.paddingTop, e.marginBottom = "-" + n.paddingBottom);
		}
	}
	function Ep(e, t) {
		e = e.style, t = t.style;
		var n = t == null ? null : t.hasOwnProperty("viewTransitionName") ? t.viewTransitionName : t.hasOwnProperty("view-transition-name") ? t["view-transition-name"] : null;
		e.viewTransitionName = n == null || typeof n == "boolean" ? "" : ("" + n).trim(), n = t == null ? null : t.hasOwnProperty("viewTransitionClass") ? t.viewTransitionClass : t.hasOwnProperty("view-transition-class") ? t["view-transition-class"] : null, e.viewTransitionClass = n == null || typeof n == "boolean" ? "" : ("" + n).trim(), e.display === "inline-block" && (t == null ? e.display = e.margin = "" : (n = t.display, e.display = n == null || typeof n == "boolean" ? "" : n, n = t.margin, n == null ? (n = t.hasOwnProperty("marginTop") ? t.marginTop : t["margin-top"], e.marginTop = n == null || typeof n == "boolean" ? "" : n, t = t.hasOwnProperty("marginBottom") ? t.marginBottom : t["margin-bottom"], e.marginBottom = t == null || typeof t == "boolean" ? "" : t) : e.margin = n));
	}
	function Dp(e, t, n) {
		return n = n.ownerDocument.defaultView, {
			rect: e,
			abs: t.position === "absolute" || t.position === "fixed",
			clip: t.clipPath !== "none" || t.overflow !== "visible" || t.filter !== "none" || t.mask !== "none" || t.mask !== "none" || t.borderRadius !== "0px",
			view: 0 <= e.bottom && 0 <= e.right && e.top <= n.innerHeight && e.left <= n.innerWidth
		};
	}
	function Op(e) {
		return Dp(e.getBoundingClientRect(), getComputedStyle(e), e);
	}
	function kp(e) {
		var t = e.getBoundingClientRect();
		t = new DOMRect(t.x + 2e4, t.y + 2e4, t.width, t.height);
		var n = getComputedStyle(e);
		return Dp(t, n, e);
	}
	function Ap(e) {
		return e.documentElement.clientHeight;
	}
	function jp(e) {
		this.addEventListener("load", e), this.addEventListener("error", e);
	}
	function Mp(e, t, n, r, i, a, o, s, c) {
		var l = t.nodeType === 9 ? t : t.ownerDocument;
		try {
			var u = l.startViewTransition({
				update: function() {
					var t = l.defaultView, n = t.navigation && t.navigation.transition, o = l.fonts.status;
					r();
					var s = [];
					if (o === "loaded" && (Ap(l), l.fonts.status === "loading" && s.push(l.fonts.ready)), o = s.length, e !== null) for (var c = e.suspenseyImages, u = 0, d = 0; d < c.length; d++) {
						var f = c[d];
						if (!f.complete) {
							var p = f.getBoundingClientRect();
							if (0 < p.bottom && 0 < p.right && p.top < t.innerHeight && p.left < t.innerWidth) {
								if (u += Xm(f), u > $m) {
									s.length = o;
									break;
								}
								f = new Promise(jp.bind(f)), s.push(f);
							}
						}
					}
					if (0 < s.length) return t = Promise.race([Promise.all(s), new Promise(function(e) {
						return setTimeout(e, 500);
					})]).then(i, i), (n ? Promise.allSettled([n.finished, t]) : t).then(a, a);
					if (i(), n) return n.finished.then(a, a);
					a();
				},
				types: n
			});
			l.__reactViewTransition = u;
			var d = [];
			return u.ready.then(function() {
				for (var e = l.documentElement.getAnimations({ subtree: !0 }), t = 0; t < e.length; t++) {
					var n = e[t], r = n.effect, i = r.pseudoElement;
					if (i != null && i.startsWith("::view-transition")) {
						d.push(n), n = r.getKeyframes();
						for (var a = i = void 0, s = !0, c = 0; c < n.length; c++) {
							var u = n[c], f = u.width;
							if (i === void 0) i = f;
							else if (i !== f) {
								s = !1;
								break;
							}
							if (f = u.height, a === void 0) a = f;
							else if (a !== f) {
								s = !1;
								break;
							}
							delete u.width, delete u.height, u.transform === "none" && delete u.transform;
						}
						s && i !== void 0 && a !== void 0 && (r.setKeyframes(n), s = getComputedStyle(r.target, r.pseudoElement), s.width !== i || s.height !== a) && (s = n[0], s.width = i, s.height = a, s = n[n.length - 1], s.width = i, s.height = a, r.setKeyframes(n));
					}
				}
				o();
			}, function(e) {
				l.__reactViewTransition === u && (l.__reactViewTransition = null);
				try {
					if (typeof e == "object" && e) switch (e.name) {
						case "InvalidStateError": (e.message === "View transition was skipped because document visibility state is hidden." || e.message === "Skipping view transition because document visibility state has become hidden." || e.message === "Skipping view transition because viewport size changed." || e.message === "Transition was aborted because of invalid state") && (e = null);
					}
					e !== null && c(e);
				} finally {
					r(), i(), o();
				}
			}), u.finished.finally(function() {
				for (var e = 0; e < d.length; e++) d[e].cancel();
				l.__reactViewTransition === u && (l.__reactViewTransition = null), s();
			}), u;
		} catch {
			return r(), i(), o(), null;
		}
	}
	function Np(e, t) {
		this._scope = document.documentElement, this._selector = "::view-transition-" + e + "(" + t + ")";
	}
	Np.prototype.animate = function(e, t) {
		return t = typeof t == "number" ? { duration: t } : D({}, t), t.pseudoElement = this._selector, this._scope.animate(e, t);
	}, Np.prototype.getAnimations = function() {
		for (var e = this._scope, t = this._selector, n = e.getAnimations({ subtree: !0 }), r = [], i = 0; i < n.length; i++) {
			var a = n[i].effect;
			a !== null && a.target === e && a.pseudoElement === t && r.push(n[i]);
		}
		return r;
	}, Np.prototype.getComputedStyle = function() {
		return getComputedStyle(this._scope, this._selector);
	};
	function Pp(e) {
		return {
			name: e,
			group: new Np("group", e),
			imagePair: new Np("image-pair", e),
			old: new Np("old", e),
			new: new Np("new", e)
		};
	}
	function Fp(e) {
		this._fragmentFiber = e, this._observers = this._eventListeners = null;
	}
	Fp.prototype.addEventListener = function(e, t, n) {
		var r = null, i = null;
		if (!(n != null && typeof n != "boolean" && (r = n.signal || null, r !== null && r.aborted))) {
			this._eventListeners === null && (this._eventListeners = []);
			var a = this._eventListeners;
			if (Bp(a, e, t, n) === -1) {
				var o = this, s = t;
				n != null && typeof n != "boolean" && !0 === n.once && (s = function(r) {
					o.removeEventListener(e, t, n), typeof t == "function" ? t.call(this, r) : t.handleEvent(r);
				}), r !== null && (i = o.removeEventListener.bind(o, e, t, n), r.addEventListener("abort", i, { once: !0 }), i = r.removeEventListener.bind(r, "abort", i)), r = Rp(n), a.push({
					type: e,
					listener: t,
					optionsOrUseCapture: n,
					attachedListener: s,
					cleanup: i
				}), f(this._fragmentFiber.child, !1, Ip, e, s, r);
			}
			this._eventListeners = a;
		}
	};
	function Ip(e, t, n, r) {
		return v(e).addEventListener(t, n, r), !1;
	}
	Fp.prototype.removeEventListener = function(e, t, n) {
		var r = this._eventListeners;
		if (r !== null && (t = Bp(r, e, t, n), t !== -1)) {
			var i = r[t];
			n = i.attachedListener;
			var a = i.cleanup;
			i = Rp(i.optionsOrUseCapture), f(this._fragmentFiber.child, !1, Lp, e, n, i), r.splice(t, 1), a !== null && a();
		}
	};
	function Lp(e, t, n, r) {
		return v(e).removeEventListener(t, n, r), !1;
	}
	function Rp(e) {
		return e != null && typeof e != "boolean" && (!0 === e.once || e.signal instanceof AbortSignal) ? {
			capture: e.capture,
			passive: e.passive
		} : e;
	}
	function zp(e) {
		return e == null ? "c=0" : typeof e == "boolean" ? "c=" + (e ? "1" : "0") : "c=" + (e.capture ? "1" : "0");
	}
	function Bp(e, t, n, r) {
		if (e.length === 0) return -1;
		r = zp(r);
		for (var i = 0; i < e.length; i++) {
			var a = e[i];
			if (a.type === t && a.listener === n && zp(a.optionsOrUseCapture) === r) return i;
		}
		return -1;
	}
	Fp.prototype.dispatchEvent = function(e) {
		var t = p(this._fragmentFiber);
		if (t === null) return !0;
		t = v(t);
		var n = this._eventListeners;
		if (n !== null && 0 < n.length || !e.bubbles) {
			var r = t.nodeType === 9 ? t.createComment("") : document.createTextNode("");
			if (n) for (var i = 0; i < n.length; i++) {
				var a = n[i];
				r.addEventListener(a.type, a.attachedListener, Rp(a.optionsOrUseCapture));
			}
			if (t.appendChild(r), e = r.dispatchEvent(e), n) for (i = 0; i < n.length; i++) a = n[i], r.removeEventListener(a.type, a.attachedListener, Rp(a.optionsOrUseCapture));
			return t.removeChild(r), e;
		}
		return t.dispatchEvent(e);
	}, Fp.prototype.focus = function(e) {
		f(this._fragmentFiber.child, !0, Vp, e, void 0, void 0);
	};
	function Vp(e, t) {
		return e.tag !== 6 && (e = v(e), pm(e, t));
	}
	Fp.prototype.focusLast = function(e) {
		var t = [];
		f(this._fragmentFiber.child, !0, Hp, t, void 0, void 0);
		for (var n = t.length - 1; 0 <= n && !Vp(t[n], e); n--);
	};
	function Hp(e, t) {
		return t.push(e), !1;
	}
	Fp.prototype.blur = function() {
		var e = p(this._fragmentFiber);
		e !== null && (e = v(e), e = lp(e).activeElement, e !== null && f(this._fragmentFiber.child, !1, Up, e, void 0, void 0));
	};
	function Up(e, t) {
		return e.tag !== 6 && (e = v(e), e === t || e.contains(t) ? (t.blur(), !0) : !1);
	}
	Fp.prototype.observeUsing = function(e) {
		this._observers === null && (this._observers = /* @__PURE__ */ new Set()), this._observers.add(e), f(this._fragmentFiber.child, !1, Wp, e, void 0, void 0);
	};
	function Wp(e, t) {
		return e.tag === 6 || (e = v(e), t.observe(e)), !1;
	}
	Fp.prototype.unobserveUsing = function(e) {
		var t = this._observers;
		if (t !== null && t.has(e)) {
			t.delete(e), f(this._fragmentFiber.child, !1, Gp, e, void 0, void 0);
			for (var n = t = 0; n < Kp.length; n++) {
				var r = Kp[n];
				r.fragmentInstance === this && r.observer === e ? e.unobserve(r.instance) : Kp[t++] = r;
			}
			Kp.length = t;
		}
	};
	function Gp(e, t) {
		return e.tag === 6 || (e = v(e), t.unobserve(e)), !1;
	}
	var Kp = [], qp = !1;
	function Jp(e, t, n) {
		Kp.push({
			fragmentInstance: e,
			observer: t,
			instance: n
		}), qp || (qp = !0, mm(function() {
			qp = !1;
			var e = Kp;
			Kp = [];
			for (var t = 0; t < e.length; t++) {
				var n = e[t];
				n.observer.unobserve(n.instance);
			}
		}));
	}
	Fp.prototype.getClientRects = function() {
		var e = [];
		return f(this._fragmentFiber.child, !1, Yp, e, void 0, void 0), e;
	};
	function Yp(e, t) {
		if (e.tag === 6) {
			e = e.stateNode;
			var n = e.ownerDocument.createRange();
			n.selectNodeContents(e), t.push.apply(t, n.getClientRects());
		} else e = v(e), t.push.apply(t, e.getClientRects());
		return !1;
	}
	Fp.prototype.getRootNode = function(e) {
		var t = p(this._fragmentFiber);
		return t === null ? this : v(t).getRootNode(e);
	}, Fp.prototype.compareDocumentPosition = function(e) {
		var t = p(this._fragmentFiber);
		if (t === null) return Node.DOCUMENT_POSITION_DISCONNECTED;
		var n = [];
		f(this._fragmentFiber.child, !1, Hp, n, void 0, void 0);
		var r = v(t);
		if (n.length === 0) {
			if (n = r, m(this._fragmentFiber)) {
				a: {
					for (t = this._fragmentFiber.return; t !== null;) {
						if (t.tag === 4) {
							t = t.stateNode.containerInfo;
							break a;
						}
						if (t.tag === 3 || t.tag === 5 || t.tag === 27) break;
						t = t.return;
					}
					t = null;
				}
				t != null && (n = t);
			}
			t = this._fragmentFiber;
			var i = r = n.compareDocumentPosition(e);
			return n === e ? i = Node.DOCUMENT_POSITION_CONTAINS : r & Node.DOCUMENT_POSITION_CONTAINED_BY && (n = h(t)[1], n === null ? i = Node.DOCUMENT_POSITION_PRECEDING : (e = v(n).compareDocumentPosition(e), i = e === 0 || e & Node.DOCUMENT_POSITION_FOLLOWING ? Node.DOCUMENT_POSITION_FOLLOWING : Node.DOCUMENT_POSITION_PRECEDING)), i |= Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
		}
		t = v(n[0]), i = v(n[n.length - 1]);
		var a = m(this._fragmentFiber) ? t.parentElement : r;
		if (a == null) return Node.DOCUMENT_POSITION_DISCONNECTED;
		r = a.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_CONTAINED_BY, a = a.compareDocumentPosition(i) & Node.DOCUMENT_POSITION_CONTAINED_BY;
		var o = t.compareDocumentPosition(e), s = i.compareDocumentPosition(e), c = o & Node.DOCUMENT_POSITION_CONTAINED_BY || s & Node.DOCUMENT_POSITION_CONTAINED_BY;
		return s = r && a && o & Node.DOCUMENT_POSITION_FOLLOWING && s & Node.DOCUMENT_POSITION_PRECEDING, t = r && t === e || a && i === e || c || s ? Node.DOCUMENT_POSITION_CONTAINED_BY : !r && t === e || !a && i === e ? Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC : o, t & Node.DOCUMENT_POSITION_DISCONNECTED || t & Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC || Xp(t, this._fragmentFiber, n[0], n[n.length - 1], e) ? t : Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
	};
	function Xp(e, t, n, r, i) {
		var a = jt(i);
		if (e & Node.DOCUMENT_POSITION_CONTAINED_BY) {
			if (n = !!a) a: {
				for (; a !== null;) {
					if (a.tag === 7 && (a === t || a.alternate === t)) {
						n = !0;
						break a;
					}
					a = a.return;
				}
				n = !1;
			}
			return n;
		}
		if (e & Node.DOCUMENT_POSITION_CONTAINS) {
			if (a === null) return a = i.ownerDocument, i === a || i === a.documentElement || i === a.body;
			a: {
				for (a = t, t = p(t); a !== null;) {
					if (!(a.tag !== 5 && a.tag !== 3 && a.tag !== 27 || a !== t && a.alternate !== t)) {
						a = !0;
						break a;
					}
					a = a.return;
				}
				a = !1;
			}
			return a;
		}
		return e & Node.DOCUMENT_POSITION_PRECEDING ? ((t = !!a) && !(t = a === n) && (t = E(n, a, T), t === null ? t = !1 : (f(t, !0, C, a, n), a = b, b = null, t = a !== null)), t) : e & Node.DOCUMENT_POSITION_FOLLOWING ? ((t = !!a) && !(t = a === r) && (t = E(r, a, T), t === null ? t = !1 : (f(t, !0, w, a, r), a = b, S = b = null, t = a !== null)), t) : !1;
	}
	function Zp(e, t) {
		var n = e.ownerDocument.createRange();
		n.selectNodeContents(e), e = n.getBoundingClientRect(), window.scrollTo(window.scrollX + e.left, t ? window.scrollY + e.top : window.scrollY + e.bottom - window.innerHeight);
	}
	Fp.prototype.scrollIntoView = function(e) {
		if (typeof e == "object") throw Error(i(566));
		var t = [];
		f(this._fragmentFiber.child, !1, Hp, t, void 0, void 0);
		var n = !1 !== e;
		if (t.length === 0) {
			var r = h(this._fragmentFiber);
			if (r = n ? r[1] || r[0] || p(this._fragmentFiber) : r[0] || r[1], r === null) return;
			if (r.tag === 6) {
				e = v(r), Zp(e, n);
				return;
			}
			if (r = v(r), r.nodeType !== 9) {
				if (r.nodeType === 11) {
					n = "host" in r ? r.host : null, n !== null && n.scrollIntoView(e);
					return;
				}
				r.scrollIntoView(e);
			}
		}
		for (r = n ? t.length - 1 : 0; r !== (n ? -1 : t.length);) {
			var a = t[r];
			a.tag === 6 ? (a = v(a), Zp(a, n)) : v(a).scrollIntoView(e), r += n ? -1 : 1;
		}
	};
	function Qp(e, t) {
		return e = v(e), $p(e, t), !1;
	}
	function $p(e, t) {
		e.reactFragments ??= /* @__PURE__ */ new Set(), e.reactFragments.add(t);
	}
	function em(e, t) {
		var n = t._eventListeners;
		if (n !== null) for (var r = 0; r < n.length; r++) {
			var i = n[r];
			e.addEventListener(i.type, i.attachedListener, Rp(i.optionsOrUseCapture));
		}
		e.nodeType !== 3 && (n = t._observers, n !== null && n.forEach(function(n) {
			for (var r = 0, i = 0; i < Kp.length; i++) {
				var a = Kp[i];
				(a.fragmentInstance !== t || a.observer !== n || a.instance !== e) && (Kp[r++] = a);
			}
			Kp.length = r, n.observe(e);
		}), $p(e, t));
	}
	function tm(e, t) {
		var n = t._eventListeners;
		if (n !== null) for (var r = 0; r < n.length; r++) {
			var i = n[r];
			e.removeEventListener(i.type, i.attachedListener, Rp(i.optionsOrUseCapture));
		}
		e.nodeType !== 3 && (n = t._observers, n !== null && n.forEach(function(n) {
			typeof n.rootMargin == "string" ? Jp(t, n, e) : n.unobserve(e);
		}), e.reactFragments != null && e.reactFragments.delete(t));
	}
	function nm(e) {
		var t = e.firstChild;
		for (t && t.nodeType === 10 && (t = t.nextSibling); t;) {
			var n = t;
			switch (t = t.nextSibling, n.nodeName) {
				case "HTML":
				case "HEAD":
				case "BODY":
					nm(n), At(n);
					continue;
				case "SCRIPT":
				case "STYLE": continue;
				case "LINK": if (n.rel.toLowerCase() === "stylesheet") continue;
			}
			e.removeChild(n);
		}
	}
	function rm(e, t, n, r) {
		for (; e.nodeType === 1;) {
			var i = n;
			if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
				if (!r && (e.nodeName !== "INPUT" || e.type !== "hidden")) break;
			} else if (!r) {
				if (t === "input" && e.type === "hidden") {
					var a = i.name == null ? null : "" + i.name;
					if (i.type === "hidden" && e.getAttribute("name") === a) return e;
				} else return e;
			} else if (!e[Ot]) switch (t) {
				case "meta":
					if (!e.hasAttribute("itemprop")) break;
					return e;
				case "link":
					if (a = e.getAttribute("rel"), a === "stylesheet" && e.hasAttribute("data-precedence") || a !== i.rel || e.getAttribute("href") !== (i.href == null || i.href === "" ? null : i.href) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin) || e.getAttribute("title") !== (i.title == null ? null : i.title)) break;
					return e;
				case "style":
					if (e.hasAttribute("data-precedence")) break;
					return e;
				case "script":
					if (a = e.getAttribute("src"), (a !== (i.src == null ? null : i.src) || e.getAttribute("type") !== (i.type == null ? null : i.type) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin)) && a && e.hasAttribute("async") && !e.hasAttribute("itemprop")) break;
					return e;
				default: return e;
			}
			if (e = lm(e.nextSibling), e === null) break;
		}
		return null;
	}
	function im(e, t, n) {
		if (t === "") return null;
		for (; e.nodeType !== 3;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = lm(e.nextSibling), e === null)) return null;
		return e;
	}
	function am(e, t) {
		for (; e.nodeType !== 8;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = lm(e.nextSibling), e === null)) return null;
		return e;
	}
	function om(e) {
		return e.data === "$?" || e.data === "$~";
	}
	function sm(e) {
		return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
	}
	function cm(e, t) {
		var n = e.ownerDocument;
		if (e.data === "$~") e._reactRetry = t;
		else if (e.data !== "$?" || n.readyState !== "loading") t();
		else {
			var r = function() {
				t(), n.removeEventListener("DOMContentLoaded", r);
			};
			n.addEventListener("DOMContentLoaded", r), e._reactRetry = r;
		}
	}
	function lm(e) {
		for (; e != null; e = e.nextSibling) {
			var t = e.nodeType;
			if (t === 1 || t === 3) break;
			if (t === 8) {
				if (t = e.data, t === "$" || t === "$!" || t === "$?" || t === "$~" || t === "&" || t === "F!" || t === "F") break;
				if (t === "/$" || t === "/&") return null;
			}
		}
		return e;
	}
	var um = null;
	function dm(e) {
		e = e.nextSibling;
		for (var t = 0; e;) {
			if (e.nodeType === 8) {
				var n = e.data;
				if (n === "/$" || n === "/&") {
					if (t === 0) return lm(e.nextSibling);
					t--;
				} else n !== "$" && n !== "$!" && n !== "$?" && n !== "$~" && n !== "&" || t++;
			}
			e = e.nextSibling;
		}
		return null;
	}
	function fm(e) {
		e = e.previousSibling;
		for (var t = 0; e;) {
			if (e.nodeType === 8) {
				var n = e.data;
				if (n === "$" || n === "$!" || n === "$?" || n === "$~" || n === "&") {
					if (t === 0) return e;
					t--;
				} else n !== "/$" && n !== "/&" || t++;
			}
			e = e.previousSibling;
		}
		return null;
	}
	function pm(e, t) {
		function n() {
			r = !0;
		}
		if (e.ownerDocument.activeElement === e) return !0;
		var r = !1;
		try {
			e.ownerDocument.addEventListener("focus", n, !0), (e.focus || HTMLElement.prototype.focus).call(e, t);
		} finally {
			e.ownerDocument.removeEventListener("focus", n, !0);
		}
		return r;
	}
	function mm(e) {
		yp(function() {
			yp(function(t) {
				return e(t);
			});
		});
	}
	function hm(e, t, n) {
		switch (t = lp(n), e) {
			case "html":
				if (e = t.documentElement, !e) throw Error(i(452));
				return e;
			case "head":
				if (e = t.head, !e) throw Error(i(453));
				return e;
			case "body":
				if (e = t.body, !e) throw Error(i(454));
				return e;
			default: throw Error(i(451));
		}
	}
	function gm(e, t, n) {
		for (var r in n) {
			var i = n[r];
			n.hasOwnProperty(r) && i != null && ep(e, t, r, null, rp, i);
		}
		n.dangerouslySetInnerHTML != null && (e.textContent = ""), e.onclick === gn && (e.onclick = null), At(e);
	}
	function _m(e) {
		for (var t = e.attributes; t.length;) e.removeAttributeNode(t[0]);
		At(e);
	}
	var vm = /* @__PURE__ */ new Map(), ym = /* @__PURE__ */ new Set();
	function bm(e) {
		if (typeof e.getRootNode == "function") {
			var t = e.getRootNode();
			if (t.nodeType === 9 || t.nodeType === 11) return t;
		}
		return e.nodeType === 9 ? e : e.ownerDocument;
	}
	var xm = _e.d;
	_e.d = {
		f: Sm,
		r: Cm,
		D: Em,
		C: Dm,
		L: Om,
		m: km,
		X: jm,
		S: Am,
		M: Mm
	};
	function Sm() {
		var e = xm.f(), t = Ld();
		return e || t;
	}
	function Cm(e) {
		var t = Mt(e);
		t !== null && t.tag === 5 && t.type === "form" ? Qs(t) : xm.r(e);
	}
	var wm = typeof document > "u" ? null : document;
	function Tm(e, t, n) {
		var r = wm;
		if (r && typeof t == "string" && t) {
			var i = tn(t);
			i = "link[rel=\"" + e + "\"][href=\"" + i + "\"]", typeof n == "string" && (i += "[crossorigin=\"" + n + "\"]"), ym.has(i) || (ym.add(i), e = {
				rel: e,
				crossOrigin: n,
				href: t
			}, r.querySelector(i) === null && (t = r.createElement("link"), np(t, "link", e), Ft(t), r.head.appendChild(t)));
		}
	}
	function Em(e) {
		xm.D(e), Tm("dns-prefetch", e, null);
	}
	function Dm(e, t) {
		xm.C(e, t), Tm("preconnect", e, t);
	}
	function Om(e, t, n) {
		xm.L(e, t, n);
		var r = wm;
		if (r && e && t) {
			var i = "link[rel=\"preload\"][as=\"" + tn(t) + "\"]";
			t === "image" && n && n.imageSrcSet ? (i += "[imagesrcset=\"" + tn(n.imageSrcSet) + "\"]", typeof n.imageSizes == "string" && (i += "[imagesizes=\"" + tn(n.imageSizes) + "\"]")) : i += "[href=\"" + tn(e) + "\"]";
			var a = i;
			switch (t) {
				case "style":
					a = Pm(e);
					break;
				case "script": a = Rm(e);
			}
			if (!(vm.has(a) || (e = D({
				rel: "preload",
				href: t === "image" && n && n.imageSrcSet ? void 0 : e,
				as: t
			}, n), vm.set(a, e), r.querySelector(i) !== null || t === "style" && r.querySelector(Fm(a)) || t === "script" && r.querySelector(zm(a))))) {
				var o = r.createElement("link");
				np(o, "link", e), t === "style" && (o[kt] = !0, o.onload = o.onerror = function() {
					B(o);
				}), Ft(o), r.head.appendChild(o);
			}
		}
	}
	function km(e, t) {
		xm.m(e, t);
		var n = wm;
		if (n && e) {
			var r = t && typeof t.as == "string" ? t.as : "script", i = "link[rel=\"modulepreload\"][as=\"" + tn(r) + "\"][href=\"" + tn(e) + "\"]", a = i;
			switch (r) {
				case "audioworklet":
				case "paintworklet":
				case "serviceworker":
				case "sharedworker":
				case "worker":
				case "script": a = Rm(e);
			}
			if (!vm.has(a) && (e = D({
				rel: "modulepreload",
				href: e
			}, t), vm.set(a, e), n.querySelector(i) === null)) {
				switch (r) {
					case "audioworklet":
					case "paintworklet":
					case "serviceworker":
					case "sharedworker":
					case "worker":
					case "script": if (n.querySelector(zm(a))) return;
				}
				r = n.createElement("link"), np(r, "link", e), Ft(r), n.head.appendChild(r);
			}
		}
	}
	function Am(e, t, n) {
		xm.S(e, t, n);
		var r = wm;
		if (r && e) {
			var i = Pt(r).hoistableStyles, a = Pm(e);
			t ||= "default";
			var o = i.get(a);
			if (!o) {
				var s = {
					loading: 0,
					preload: null
				};
				if (o = r.querySelector(Fm(a))) s.loading = 5;
				else {
					e = D({
						rel: "stylesheet",
						href: e,
						"data-precedence": t
					}, n), (n = vm.get(a)) && Hm(e, n);
					var c = o = r.createElement("link");
					Ft(c), np(c, "link", e), c._p = new Promise(function(e, t) {
						c.onload = e, c.onerror = t;
					}), c.addEventListener("load", function() {
						s.loading |= 1;
					}), c.addEventListener("error", function() {
						s.loading |= 2;
					}), s.loading |= 4, Vm(o, t, r);
				}
				o = {
					type: "stylesheet",
					instance: o,
					count: 1,
					state: s
				}, i.set(a, o);
			}
		}
	}
	function jm(e, t) {
		xm.X(e, t);
		var n = wm;
		if (n && e) {
			var r = Pt(n).hoistableScripts, i = Rm(e), a = r.get(i);
			a || (a = n.querySelector(zm(i)), a || (e = D({
				src: e,
				async: !0
			}, t), (t = vm.get(i)) && Um(e, t), a = n.createElement("script"), Ft(a), np(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function Mm(e, t) {
		xm.M(e, t);
		var n = wm;
		if (n && e) {
			var r = Pt(n).hoistableScripts, i = Rm(e), a = r.get(i);
			a || (a = n.querySelector(zm(i)), a || (e = D({
				src: e,
				async: !0,
				type: "module"
			}, t), (t = vm.get(i)) && Um(e, t), a = n.createElement("script"), Ft(a), np(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function Nm(e, t, n, r) {
		var a = (a = Ee.current) ? bm(a) : null;
		if (!a) throw Error(i(446));
		switch (e) {
			case "meta":
			case "title": return null;
			case "style": return typeof n.precedence == "string" && typeof n.href == "string" ? (n = Pm(n.href), t = Pt(a).hoistableStyles, r = t.get(n), r || (r = {
				type: "style",
				instance: null,
				count: 0,
				state: null
			}, t.set(n, r)), r) : {
				type: "void",
				instance: null,
				count: 0,
				state: null
			};
			case "link":
				if (n.rel === "stylesheet" && typeof n.href == "string" && typeof n.precedence == "string") {
					e = Pm(n.href);
					var o = Pt(a).hoistableStyles, s = o.get(e);
					if (s || (a = a.ownerDocument || a, s = {
						type: "stylesheet",
						instance: null,
						count: 0,
						state: {
							loading: 0,
							preload: null
						}
					}, o.set(e, s), (o = a.querySelector(Fm(e))) ? o._p || (s.instance = o, s.state.loading = 5) : (o = vm.get(e), o || (o = {
						rel: "preload",
						as: "style",
						href: n.href,
						crossOrigin: n.crossOrigin,
						integrity: n.integrity,
						media: n.media,
						hrefLang: n.hrefLang,
						referrerPolicy: n.referrerPolicy
					}, vm.set(e, o)), Lm(a, e, o, s.state))), t && r === null) throw Error(i(528, ""));
					return s;
				}
				if (t && r !== null) throw Error(i(529, ""));
				return null;
			case "script": return t = n.async, n = n.src, typeof n == "string" && t && typeof t != "function" && typeof t != "symbol" ? (n = Rm(n), t = Pt(a).hoistableScripts, r = t.get(n), r || (r = {
				type: "script",
				instance: null,
				count: 0,
				state: null
			}, t.set(n, r)), r) : {
				type: "void",
				instance: null,
				count: 0,
				state: null
			};
			default: throw Error(i(444, e));
		}
	}
	function Pm(e) {
		return "href=\"" + tn(e) + "\"";
	}
	function Fm(e) {
		return "link[rel=\"stylesheet\"][" + e + "]";
	}
	function Im(e) {
		return D({}, e, {
			"data-precedence": e.precedence,
			precedence: null
		});
	}
	function Lm(e, t, n, r) {
		if (t = e.querySelector("link[rel=\"preload\"][as=\"style\"][" + t + "]")) {
			if (!0 !== t[kt]) {
				r.loading = 1;
				return;
			}
		} else t = e.createElement("link"), t[kt] = !0, t.onload = t.onerror = B.bind(null, t), np(t, "link", n), Ft(t), e.head.appendChild(t);
		r.preload = t, t.addEventListener("load", function() {
			return r.loading |= 1;
		}), t.addEventListener("error", function() {
			return r.loading |= 2;
		});
	}
	function Rm(e) {
		return "[src=\"" + tn(e) + "\"]";
	}
	function zm(e) {
		return "script[async]" + e;
	}
	function Bm(e, t, n) {
		if (t.count++, t.instance === null) switch (t.type) {
			case "style":
				var r = e.querySelector("style[data-href~=\"" + tn(n.href) + "\"]");
				if (r) return t.instance = r, Ft(r), r;
				var a = D({}, n, {
					"data-href": n.href,
					"data-precedence": n.precedence,
					href: null,
					precedence: null
				});
				return r = (e.ownerDocument || e).createElement("style"), Ft(r), np(r, "style", a), Vm(r, n.precedence, e), t.instance = r;
			case "stylesheet":
				a = Pm(n.href);
				var o = e.querySelector(Fm(a));
				if (o) return t.state.loading |= 4, t.instance = o, Ft(o), o;
				r = Im(n), (a = vm.get(a)) && Hm(r, a), o = (e.ownerDocument || e).createElement("link"), Ft(o);
				var s = o;
				return s._p = new Promise(function(e, t) {
					s.onload = e, s.onerror = t;
				}), np(o, "link", r), t.state.loading |= 4, Vm(o, n.precedence, e), t.instance = o;
			case "script": return o = Rm(n.src), (a = e.querySelector(zm(o))) ? (t.instance = a, Ft(a), a) : (r = n, (a = vm.get(o)) && (r = D({}, n), Um(r, a)), e = e.ownerDocument || e, a = e.createElement("script"), Ft(a), np(a, "link", r), e.head.appendChild(a), t.instance = a);
			case "void": return null;
			default: throw Error(i(443, t.type));
		}
		else t.type === "stylesheet" && !(t.state.loading & 4) && (r = t.instance, t.state.loading |= 4, Vm(r, n.precedence, e));
		return t.instance;
	}
	function Vm(e, t, n) {
		for (var r = n.querySelectorAll("link[rel=\"stylesheet\"][data-precedence],style[data-precedence]"), i = r.length ? r[r.length - 1] : null, a = i, o = 0; o < r.length; o++) {
			var s = r[o];
			if (s.dataset.precedence === t) a = s;
			else if (a !== i) break;
		}
		a ? a.parentNode.insertBefore(e, a.nextSibling) : (t = n.nodeType === 9 ? n.head : n, t.insertBefore(e, t.firstChild));
	}
	function Hm(e, t) {
		e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.title ??= t.title;
	}
	function Um(e, t) {
		e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.integrity ??= t.integrity;
	}
	var Wm = null;
	function Gm(e, t, n) {
		if (Wm === null) {
			var r = /* @__PURE__ */ new Map(), i = Wm = /* @__PURE__ */ new Map();
			i.set(n, r);
		} else i = Wm, r = i.get(n), r || (r = /* @__PURE__ */ new Map(), i.set(n, r));
		if (r.has(e)) return r;
		for (r.set(e, null), n = n.getElementsByTagName(e), i = 0; i < n.length; i++) {
			var a = n[i];
			if (!(a[Ot] || a[Ct] || e === "link" && a.getAttribute("rel") === "stylesheet") && a.namespaceURI !== "http://www.w3.org/2000/svg") {
				var o = a.getAttribute(t) || "";
				o = e + o;
				var s = r.get(o);
				s ? s.push(a) : r.set(o, [a]);
			}
		}
		return r;
	}
	function Km(e, t, n) {
		e = e.ownerDocument || e, e.head.insertBefore(n, t === "title" ? e.querySelector("head > title") : null);
	}
	function qm(e, t, n) {
		if (n === 1 || t.itemProp != null) return !1;
		switch (e) {
			case "meta":
			case "title": return !0;
			case "style":
				if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "") break;
				return !0;
			case "link":
				if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError) break;
				switch (t.rel) {
					case "stylesheet": return e = t.disabled, typeof t.precedence == "string" && e == null;
					default: return !0;
				}
			case "script": if (t.async && typeof t.async != "function" && typeof t.async != "symbol" && !t.onLoad && !t.onError && t.src && typeof t.src == "string") return !0;
		}
		return !1;
	}
	function Jm(e, t) {
		return e === "img" && t.src != null && t.src !== "" && t.onLoad == null && t.loading !== "lazy";
	}
	function Ym(e) {
		return !(e.type === "stylesheet" && !(e.state.loading & 3));
	}
	function Xm(e) {
		return (e.width || 100) * (e.height || 100) * (typeof devicePixelRatio == "number" ? devicePixelRatio : 1) * .25;
	}
	function Zm(e, t) {
		typeof t.decode == "function" && (e.imgCount++, t.complete || (e.imgBytes += Xm(t), e.suspenseyImages.push(t)), e = rh.bind(e), t.decode().then(e, e));
	}
	function Qm(e, t, n, r) {
		if (n.type === "stylesheet" && (typeof r.media != "string" || !1 !== matchMedia(r.media).matches) && !(n.state.loading & 4)) {
			if (n.instance === null) {
				var i = Pm(r.href), a = t.querySelector(Fm(i));
				if (a) {
					t = a._p, typeof t == "object" && t && typeof t.then == "function" && (e.count++, e = nh.bind(e), t.then(e, e)), n.state.loading |= 4, n.instance = a, Ft(a);
					return;
				}
				a = t.ownerDocument || t, r = Im(r), (i = vm.get(i)) && Hm(r, i), a = a.createElement("link"), Ft(a);
				var o = a;
				o._p = new Promise(function(e, t) {
					o.onload = e, o.onerror = t;
				}), np(a, "link", r), n.instance = a;
			}
			e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(n, t), (t = n.state.preload) && !(n.state.loading & 3) && (e.count++, n = nh.bind(e), t.addEventListener("load", n), t.addEventListener("error", n));
		}
	}
	var $m = 0;
	function eh(e, t) {
		return e.stylesheets && e.count === 0 && ah(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(n) {
			var r = setTimeout(function() {
				if (e.stylesheets && ah(e, e.stylesheets), e.unsuspend) {
					var t = e.unsuspend;
					e.unsuspend = null, t();
				}
			}, 6e4 + t);
			0 < e.imgBytes && $m === 0 && ($m = 62500 * op());
			var i = setTimeout(function() {
				if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && ah(e, e.stylesheets), e.unsuspend)) {
					var t = e.unsuspend;
					e.unsuspend = null, t();
				}
			}, (e.imgBytes > $m ? 50 : 800) + t);
			return e.unsuspend = n, function() {
				e.unsuspend = null, clearTimeout(r), clearTimeout(i);
			};
		} : null;
	}
	function th(e) {
		if (e.count === 0 && (e.imgCount === 0 || !e.waitingForImages)) {
			if (e.stylesheets) ah(e, e.stylesheets);
			else if (e.unsuspend) {
				var t = e.unsuspend;
				e.unsuspend = null, t();
			}
		}
	}
	function nh() {
		this.count--, th(this);
	}
	function rh() {
		this.imgCount--, th(this);
	}
	var ih = null;
	function ah(e, t) {
		e.stylesheets = null, e.unsuspend !== null && (e.count++, ih = /* @__PURE__ */ new Map(), t.forEach(oh, e), ih = null, nh.call(e));
	}
	function oh(e, t) {
		if (!(t.state.loading & 4)) {
			var n = ih.get(e);
			if (n) var r = n.get(null);
			else {
				n = /* @__PURE__ */ new Map(), ih.set(e, n);
				for (var i = e.querySelectorAll("link[data-precedence],style[data-precedence]"), a = 0; a < i.length; a++) {
					var o = i[a];
					(o.nodeName === "LINK" || o.getAttribute("media") !== "not all") && (n.set(o.dataset.precedence, o), r = o);
				}
				r && n.set(null, r);
			}
			i = t.instance, o = i.getAttribute("data-precedence"), a = n.get(o) || r, a === r && n.set(null, i), n.set(o, i), this.count++, r = nh.bind(this), i.addEventListener("load", r), i.addEventListener("error", r), a ? a.parentNode.insertBefore(i, a.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(i, e.firstChild)), t.state.loading |= 4;
		}
	}
	var sh = {
		$$typeof: ne,
		Provider: null,
		Consumer: null,
		_currentValue: ve,
		_currentValue2: ve,
		_threadCount: 0
	};
	function ch(e, t, n, r, i, a, o, s, c) {
		this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = ft(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = ft(0), this.hiddenUpdates = ft(null), this.identifierPrefix = r, this.onUncaughtError = i, this.onCaughtError = a, this.onRecoverableError = o, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = c, this.transitionTypes = null, this.incompleteTransitions = /* @__PURE__ */ new Map();
	}
	function lh(e, t, n, r, i, a, o, s, c, l, u, d) {
		return e = new ch(e, t, n, o, c, l, u, d, s), t = 1, !0 === a && (t |= 24), a = Ei(3, null, null, t), e.current = a, a.stateNode = e, t = Ea(), t.refCount++, e.pooledCache = t, t.refCount++, a.memoizedState = {
			element: r,
			isDehydrated: n,
			cache: t
		}, co(a), e;
	}
	function uh(e) {
		return e ? (e = wi, e) : wi;
	}
	function dh(e, t, n, r, i, a) {
		i = uh(i), r.context === null ? r.context = i : r.pendingContext = i, r = uo(t), r.payload = { element: n }, a = a === void 0 ? null : a, a !== null && (r.callback = a), n = fo(e, r, t), n !== null && (Md(n, e, t), po(n, e, t));
	}
	function fh(e, t) {
		if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
			var n = e.retryLane;
			e.retryLane = n !== 0 && n < t ? n : t;
		}
	}
	function ph(e, t) {
		fh(e, t), (e = e.alternate) && fh(e, t);
	}
	function mh(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = xi(e, 67108864);
			t !== null && Md(t, e, 67108864), ph(e, 67108864);
		}
	}
	function hh(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = kd();
			t = vt(t);
			var n = xi(e, t);
			n !== null && Md(n, e, t), ph(e, t);
		}
	}
	var gh = !0;
	function _h(e, t, n, r) {
		var i = P.T;
		P.T = null;
		var a = _e.p;
		try {
			_e.p = 2, yh(e, t, n, r);
		} finally {
			_e.p = a, P.T = i;
		}
	}
	function vh(e, t, n, r) {
		var i = P.T;
		P.T = null;
		var a = _e.p;
		try {
			_e.p = 8, yh(e, t, n, r);
		} finally {
			_e.p = a, P.T = i;
		}
	}
	function yh(e, t, n, r) {
		if (gh) {
			var i = bh(r);
			if (i === null) Gf(e, t, r, xh, n), Mh(e, r);
			else if (Ph(i, e, t, n, r)) r.stopPropagation();
			else if (Mh(e, r), t & 4 && -1 < jh.indexOf(e)) {
				for (; i !== null;) {
					var a = Mt(i);
					if (a !== null) switch (a.tag) {
						case 3:
							if (a = a.stateNode, a.current.memoizedState.isDehydrated) {
								var o = ot(a.pendingLanes);
								if (o !== 0) {
									var s = a;
									for (s.pendingLanes |= 2, s.entangledLanes |= 2; o;) {
										var c = 1 << 31 - $e(o);
										s.entanglements[1] |= c, o &= ~c;
									}
									Tf(a), !(Xu & 6) && (md = Ue() + 500, Ef(0, !1));
								}
							}
							break;
						case 31:
						case 13: s = xi(a, 2), s !== null && Md(s, a, 2), Ld(), ph(a, 2);
					}
					if (a = bh(r), a === null && Gf(e, t, r, xh, n), a === i) break;
					i = a;
				}
				i !== null && r.stopPropagation();
			} else Gf(e, t, r, null, n);
		}
	}
	function bh(e) {
		return e = vn(e), Sh(e);
	}
	var xh = null;
	function Sh(e) {
		if (xh = null, e = jt(e), e !== null) {
			var t = o(e);
			if (t === null) e = null;
			else {
				var n = t.tag;
				if (n === 13) {
					if (e = s(t), e !== null) return e;
					e = null;
				} else if (n === 31) {
					if (e = c(t), e !== null) return e;
					e = null;
				} else if (n === 3) {
					if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
					e = null;
				} else t !== e && (e = null);
			}
		}
		return xh = e, null;
	}
	function Ch(e) {
		switch (e) {
			case "beforetoggle":
			case "cancel":
			case "click":
			case "close":
			case "contextmenu":
			case "copy":
			case "cut":
			case "auxclick":
			case "dblclick":
			case "dragend":
			case "dragstart":
			case "drop":
			case "focusin":
			case "focusout":
			case "input":
			case "invalid":
			case "keydown":
			case "keypress":
			case "keyup":
			case "mousedown":
			case "mouseup":
			case "paste":
			case "pause":
			case "play":
			case "pointercancel":
			case "pointerdown":
			case "pointerup":
			case "ratechange":
			case "reset":
			case "seeked":
			case "submit":
			case "toggle":
			case "touchcancel":
			case "touchend":
			case "touchstart":
			case "volumechange":
			case "change":
			case "selectionchange":
			case "textInput":
			case "compositionstart":
			case "compositionend":
			case "compositionupdate":
			case "beforeblur":
			case "afterblur":
			case "beforeinput":
			case "blur":
			case "fullscreenchange":
			case "fullscreenerror":
			case "focus":
			case "hashchange":
			case "popstate":
			case "select":
			case "selectstart": return 2;
			case "drag":
			case "dragenter":
			case "dragexit":
			case "dragleave":
			case "dragover":
			case "mousemove":
			case "mouseout":
			case "mouseover":
			case "pointermove":
			case "pointerout":
			case "pointerover":
			case "resize":
			case "scroll":
			case "touchmove":
			case "wheel":
			case "mouseenter":
			case "mouseleave":
			case "pointerenter":
			case "pointerleave": return 8;
			case "message": switch (We()) {
				case I: return 2;
				case Ge: return 8;
				case Ke:
				case qe: return 32;
				case Je: return 268435456;
				default: return 32;
			}
			default: return 32;
		}
	}
	var wh = !1, Th = null, Eh = null, Dh = null, Oh = /* @__PURE__ */ new Map(), kh = /* @__PURE__ */ new Map(), Ah = [], jh = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");
	function Mh(e, t) {
		switch (e) {
			case "focusin":
			case "focusout":
				Th = null;
				break;
			case "dragenter":
			case "dragleave":
				Eh = null;
				break;
			case "mouseover":
			case "mouseout":
				Dh = null;
				break;
			case "pointerover":
			case "pointerout":
				Oh.delete(t.pointerId);
				break;
			case "gotpointercapture":
			case "lostpointercapture": kh.delete(t.pointerId);
		}
	}
	function Nh(e, t, n, r, i, a) {
		return e === null || e.nativeEvent !== a ? (e = {
			blockedOn: t,
			domEventName: n,
			eventSystemFlags: r,
			nativeEvent: a,
			targetContainers: [i]
		}, t !== null && (t = Mt(t), t !== null && mh(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e);
	}
	function Ph(e, t, n, r, i) {
		switch (t) {
			case "focusin": return Th = Nh(Th, e, t, n, r, i), !0;
			case "dragenter": return Eh = Nh(Eh, e, t, n, r, i), !0;
			case "mouseover": return Dh = Nh(Dh, e, t, n, r, i), !0;
			case "pointerover":
				var a = i.pointerId;
				return Oh.set(a, Nh(Oh.get(a) || null, e, t, n, r, i)), !0;
			case "gotpointercapture": return a = i.pointerId, kh.set(a, Nh(kh.get(a) || null, e, t, n, r, i)), !0;
		}
		return !1;
	}
	function Fh(e) {
		var t = jt(e.target);
		if (t !== null) {
			var n = o(t);
			if (n !== null) {
				if (t = n.tag, t === 13) {
					if (t = s(n), t !== null) {
						e.blockedOn = t, xt(e.priority, function() {
							hh(n);
						});
						return;
					}
				} else if (t === 31) {
					if (t = c(n), t !== null) {
						e.blockedOn = t, xt(e.priority, function() {
							hh(n);
						});
						return;
					}
				} else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
					e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
					return;
				}
			}
		}
		e.blockedOn = null;
	}
	function Ih(e) {
		if (e.blockedOn !== null) return !1;
		for (var t = e.targetContainers; 0 < t.length;) {
			var n = bh(e.nativeEvent);
			if (n === null) {
				n = e.nativeEvent;
				var r = new n.constructor(n.type, n);
				_n = r, n.target.dispatchEvent(r), _n = null;
			} else return t = Mt(n), t !== null && mh(t), e.blockedOn = n, !1;
			t.shift();
		}
		return !0;
	}
	function Lh(e, t, n) {
		Ih(e) && n.delete(t);
	}
	function Rh() {
		wh = !1, Th !== null && Ih(Th) && (Th = null), Eh !== null && Ih(Eh) && (Eh = null), Dh !== null && Ih(Dh) && (Dh = null), Oh.forEach(Lh), kh.forEach(Lh);
	}
	function zh(e, n) {
		e.blockedOn === n && (e.blockedOn = null, wh || (wh = !0, t.unstable_scheduleCallback(t.unstable_NormalPriority, Rh)));
	}
	var Bh = null;
	function Vh(e) {
		Bh !== e && (Bh = e, t.unstable_scheduleCallback(t.unstable_NormalPriority, function() {
			Bh === e && (Bh = null);
			for (var t = 0; t < e.length; t += 3) {
				var n = e[t], r = e[t + 1], i = e[t + 2];
				if (typeof r != "function") {
					if (Sh(r || n) === null) continue;
					break;
				}
				var a = Mt(n);
				a !== null && (e.splice(t, 3), t -= 3, Xs(a, {
					pending: !0,
					data: i,
					method: n.method,
					action: r
				}, r, i));
			}
		}));
	}
	function Hh(e) {
		function t(t) {
			return zh(t, e);
		}
		Th !== null && zh(Th, e), Eh !== null && zh(Eh, e), Dh !== null && zh(Dh, e), Oh.forEach(t), kh.forEach(t);
		for (var n = 0; n < Ah.length; n++) {
			var r = Ah[n];
			r.blockedOn === e && (r.blockedOn = null);
		}
		for (; 0 < Ah.length && (n = Ah[0], n.blockedOn === null);) Fh(n), n.blockedOn === null && Ah.shift();
		if (n = (e.ownerDocument || e).$$reactFormReplay, n != null) for (r = 0; r < n.length; r += 3) {
			var i = n[r], a = n[r + 1], o = i[R] || null;
			if (typeof a == "function") o || Vh(n);
			else if (o) {
				var s = null;
				if (a && a.hasAttribute("formAction")) {
					if (i = a, o = a[R] || null) s = o.formAction;
					else if (Sh(i) !== null) continue;
				} else s = o.action;
				typeof s == "function" ? n[r + 1] = s : (n.splice(r, 3), r -= 3), Vh(n);
			}
		}
	}
	function Uh() {
		function e(e) {
			e.canIntercept && e.info === "react-transition" && e.intercept({
				handler: function() {
					return new Promise(function(e) {
						return i = e;
					});
				},
				focusReset: "manual",
				scroll: "manual"
			});
		}
		function t() {
			i !== null && (i(), i = null), r || setTimeout(n, 20);
		}
		function n() {
			if (!r && !navigation.transition) {
				var e = navigation.currentEntry;
				e && e.url != null && navigation.navigate(e.url, {
					state: e.getState(),
					info: "react-transition",
					history: "replace"
				});
			}
		}
		if (typeof navigation == "object") {
			var r = !1, i = null;
			return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(n, 100), function() {
				r = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), i !== null && (i(), i = null);
			};
		}
	}
	function Wh(e) {
		this._internalRoot = e;
	}
	Gh.prototype.render = Wh.prototype.render = function(e) {
		var t = this._internalRoot;
		if (t === null) throw Error(i(409));
		var n = t.current;
		dh(n, kd(), e, t, null, null);
	}, Gh.prototype.unmount = Wh.prototype.unmount = function() {
		var e = this._internalRoot;
		if (e !== null) {
			this._internalRoot = null;
			var t = e.containerInfo;
			dh(e.current, 2, null, e, null, null), Ld(), t[wt] = null;
		}
	};
	function Gh(e) {
		this._internalRoot = e;
	}
	Gh.prototype.unstable_scheduleHydration = function(e) {
		if (e) {
			var t = bt();
			e = {
				blockedOn: null,
				target: e,
				priority: t
			};
			for (var n = 0; n < Ah.length && t !== 0 && t < Ah[n].priority; n++);
			Ah.splice(n, 0, e), n === 0 && Fh(e);
		}
	};
	var Kh = n.version;
	if (Kh !== "19.3.1") throw Error(i(527, Kh, "19.3.1"));
	_e.findDOMNode = function(e) {
		var t = e._reactInternals;
		if (t === void 0) throw typeof e.render == "function" ? Error(i(188)) : (e = Object.keys(e).join(","), Error(i(268, e)));
		return e = u(t), e = e === null ? null : d(e), e = e === null ? null : e.stateNode, e;
	};
	var qh = {
		bundleType: 0,
		version: "19.3.1",
		rendererPackageName: "react-dom",
		currentDispatcherRef: P,
		reconcilerVersion: "19.3.1"
	};
	if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
		var Jh = __REACT_DEVTOOLS_GLOBAL_HOOK__;
		if (!Jh.isDisabled && Jh.supportsFiber) try {
			Ze = Jh.inject(qh), L = Jh;
		} catch {}
	}
	e.createRoot = function(e, t) {
		if (!a(e)) throw Error(i(299));
		var n = !1, r = "", o = yc, s = bc, c = xc;
		return t != null && (!0 === t.unstable_strictMode && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onUncaughtError !== void 0 && (o = t.onUncaughtError), t.onCaughtError !== void 0 && (s = t.onCaughtError), t.onRecoverableError !== void 0 && (c = t.onRecoverableError)), t = lh(e, 1, !1, null, null, n, r, null, o, s, c, Uh), e[wt] = t.current, Uf(e), new Wh(t);
	};
})), C = /* @__PURE__ */ o(((e, t) => {
	function n() {
		if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE == "function") try {
			__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
		} catch (e) {
			console.error(e);
		}
	}
	n(), t.exports = S();
})), w = /* @__PURE__ */ c(y(), 1), T = C(), E = (e, t) => {
	let n = Array(e.length + t.length);
	for (let t = 0; t < e.length; t++) n[t] = e[t];
	for (let r = 0; r < t.length; r++) n[e.length + r] = t[r];
	return n;
}, D = (e, t) => ({
	classGroupId: e,
	validator: t
}), O = (e = /* @__PURE__ */ new Map(), t = null, n) => ({
	nextPart: e,
	validators: t,
	classGroupId: n
}), k = "-", A = [], j = "arbitrary..", M = (e) => {
	let t = ne(e), { conflictingClassGroups: n, conflictingClassGroupModifiers: r } = e;
	return {
		getClassGroupId: (e) => {
			if (e.startsWith("[") && e.endsWith("]")) return te(e);
			let n = e.split(k);
			return ee(n, +(n[0] === "" && n.length > 1), t);
		},
		getConflictingClassGroupIds: (e, t) => {
			if (t) {
				let t = r[e], i = n[e];
				return t ? i ? E(i, t) : t : i || A;
			}
			return n[e] || A;
		}
	};
}, ee = (e, t, n) => {
	if (e.length - t === 0) return n.classGroupId;
	let r = e[t], i = n.nextPart.get(r);
	if (i) {
		let n = ee(e, t + 1, i);
		if (n) return n;
	}
	let a = n.validators;
	if (a === null) return;
	let o = t === 0 ? e.join(k) : e.slice(t).join(k), s = a.length;
	for (let e = 0; e < s; e++) {
		let t = a[e];
		if (t.validator(o)) return t.classGroupId;
	}
}, te = (e) => e.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
	let t = e.slice(1, -1), n = t.indexOf(":"), r = t.slice(0, n);
	return r ? j + r : void 0;
})(), ne = (e) => {
	let { theme: t, classGroups: n } = e;
	return N(n, t);
}, N = (e, t) => {
	let n = O();
	for (let r in e) {
		let i = e[r];
		re(i, n, r, t);
	}
	return n;
}, re = (e, t, n, r) => {
	let i = e.length;
	for (let a = 0; a < i; a++) {
		let i = e[a];
		ie(i, t, n, r);
	}
}, ie = (e, t, n, r) => {
	typeof e == "string" ? ae(e, t, n) : typeof e == "function" ? oe(e, t, n, r) : se(e, t, n, r);
}, ae = (e, t, n) => {
	let r = e === "" ? t : ce(t, e);
	r.classGroupId = n;
}, oe = (e, t, n, r) => {
	le(e) ? re(e(r), t, n, r) : (t.validators === null && (t.validators = []), t.validators.push(D(n, e)));
}, se = (e, t, n, r) => {
	let i = Object.entries(e), a = i.length;
	for (let e = 0; e < a; e++) {
		let [a, o] = i[e];
		re(o, ce(t, a), n, r);
	}
}, ce = (e, t) => {
	let n = e, r = t.split(k), i = r.length;
	for (let e = 0; e < i; e++) {
		let t = r[e], i = n.nextPart.get(t);
		i || (i = O(), n.nextPart.set(t, i)), n = i;
	}
	return n;
}, le = (e) => "isThemeGetter" in e && e.isThemeGetter === !0, ue = (e) => {
	if (e < 1) return {
		get: () => void 0,
		set: () => {}
	};
	let t = 0, n = Object.create(null), r = Object.create(null), i = (i, a) => {
		n[i] = a, t++, t > e && (t = 0, r = n, n = Object.create(null));
	};
	return {
		get(e) {
			let t = n[e];
			if (t !== void 0) return t;
			if ((t = r[e]) !== void 0) return i(e, t), t;
		},
		set(e, t) {
			e in n ? n[e] = t : i(e, t);
		}
	};
}, de = "!", fe = ":", pe = [], me = (e, t, n, r, i) => ({
	modifiers: e,
	hasImportantModifier: t,
	baseClassName: n,
	maybePostfixModifierPosition: r,
	isExternal: i
}), he = (e) => {
	let { prefix: t, experimentalParseClassName: n } = e, r = (e) => {
		let t = [], n = 0, r = 0, i = 0, a, o = e.length;
		for (let s = 0; s < o; s++) {
			let o = e[s];
			if (n === 0 && r === 0) {
				if (o === fe) {
					t.push(e.slice(i, s)), i = s + 1;
					continue;
				}
				if (o === "/") {
					a = s;
					continue;
				}
			}
			o === "[" ? n++ : o === "]" ? n-- : o === "(" ? r++ : o === ")" && r--;
		}
		let s = t.length === 0 ? e : e.slice(i), c = s, l = !1;
		s.endsWith(de) ? (c = s.slice(0, -1), l = !0) : s.startsWith(de) && (c = s.slice(1), l = !0);
		let u = a && a > i ? a - i : void 0;
		return me(t, l, c, u);
	};
	if (t) {
		let e = t + fe, n = r;
		r = (t) => t.startsWith(e) ? n(t.slice(e.length)) : me(pe, !1, t, void 0, !0);
	}
	if (n) {
		let e = r;
		r = (t) => n({
			className: t,
			parseClassName: e
		});
	}
	return r;
}, ge = (e) => {
	let t = /* @__PURE__ */ new Map();
	return e.orderSensitiveModifiers.forEach((e, n) => {
		t.set(e, 1e6 + n);
	}), (e) => {
		let n = [], r = [];
		for (let i = 0; i < e.length; i++) {
			let a = e[i], o = a[0] === "[", s = t.has(a);
			o || s ? (r.length > 0 && (r.sort(), n.push(...r), r = []), n.push(a)) : r.push(a);
		}
		return r.length > 0 && (r.sort(), n.push(...r)), n;
	};
}, P = (e) => ({
	cache: ue(e.cacheSize),
	parseClassName: he(e),
	sortModifiers: ge(e),
	postfixLookupClassGroupIds: _e(e),
	...M(e)
}), _e = (e) => {
	let t = Object.create(null), n = e.postfixLookupClassGroups;
	if (n) for (let e = 0; e < n.length; e++) t[n[e]] = !0;
	return t;
}, ve = /\s+/, ye = (e, t) => {
	let { parseClassName: n, getClassGroupId: r, getConflictingClassGroupIds: i, sortModifiers: a, postfixLookupClassGroupIds: o } = t, s = [], c = e.trim().split(ve), l = "";
	for (let e = c.length - 1; e >= 0; --e) {
		let t = c[e], { isExternal: u, modifiers: d, hasImportantModifier: f, baseClassName: p, maybePostfixModifierPosition: m } = n(t);
		if (u) {
			l = t + (l.length > 0 ? " " + l : l);
			continue;
		}
		let h = !!m, g;
		if (h) {
			g = r(p.substring(0, m));
			let e = g && o[g] ? r(p) : void 0;
			e && e !== g && (g = e, h = !1);
		} else g = r(p);
		if (!g) {
			if (!h || (g = r(p), !g)) {
				l = t + (l.length > 0 ? " " + l : l);
				continue;
			}
			h = !1;
		}
		let _ = d.length === 0 ? "" : d.length === 1 ? d[0] : a(d).join(":"), v = f ? _ + de : _, y = v + g;
		if (s.indexOf(y) > -1) continue;
		s.push(y);
		let b = i(g, h);
		for (let e = 0; e < b.length; ++e) {
			let t = b[e];
			s.push(v + t);
		}
		l = t + (l.length > 0 ? " " + l : l);
	}
	return l;
}, be = (...e) => {
	let t = 0, n, r, i = "";
	for (; t < e.length;) (n = e[t++]) && (r = xe(n)) && (i && (i += " "), i += r);
	return i;
}, xe = (e) => {
	if (typeof e == "string") return e;
	let t, n = "";
	for (let r = 0; r < e.length; r++) e[r] && (t = xe(e[r])) && (n && (n += " "), n += t);
	return n;
}, Se = (e, ...t) => {
	let n, r, i, a, o = (o) => (n = P(t.reduce((e, t) => t(e), e())), r = n.cache.get, i = n.cache.set, a = s, s(o)), s = (e) => {
		let t = r(e);
		if (t) return t;
		let a = ye(e, n);
		return i(e, a), a;
	};
	return a = o, (...e) => a(be(...e));
}, Ce = [], we = (e) => {
	let t = (t) => t[e] || Ce;
	return t.isThemeGetter = !0, t.themeKey = e, t;
}, Te = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, Ee = /^\((?:(\w[\w-]*):)?(.+)\)$/i, De = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/, Oe = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, ke = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, Ae = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix|color|light-dark)\(.+\)$/, je = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, Me = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, Ne = (e) => De.test(e), F = (e) => !!e && !Number.isNaN(Number(e)), Pe = (e) => !!e && Number.isInteger(Number(e)), Fe = (e) => e.endsWith("%") && F(e.slice(0, -1)), Ie = (e) => Oe.test(e), Le = () => !0, Re = (e) => ke.test(e) && !Ae.test(e), ze = () => !1, Be = (e) => je.test(e), Ve = (e) => Me.test(e), He = (e) => !I(e) && !L(e), Ue = (e) => e.startsWith("@container") && (e[10] === "/" && e[11] !== void 0 || e[11] === "s" && e[16] !== void 0 && e.startsWith("-size/", 10) || e[11] === "n" && e[18] !== void 0 && e.startsWith("-normal/", 10)), We = (e) => at(e, lt, ze), I = (e) => Te.test(e), Ge = (e) => at(e, ut, Re), Ke = (e) => at(e, dt, F), qe = (e) => at(e, pt, Le), Je = (e) => at(e, ft, ze), Ye = (e) => at(e, st, ze), Xe = (e) => at(e, ct, Ve), Ze = (e) => at(e, mt, Be), L = (e) => Ee.test(e), Qe = (e) => ot(e, ut), $e = (e) => ot(e, ft), et = (e) => ot(e, st), tt = (e) => ot(e, lt), nt = (e) => ot(e, ct), rt = (e) => ot(e, mt, !0), it = (e) => ot(e, pt, !0), at = (e, t, n) => {
	let r = Te.exec(e);
	return r ? r[1] ? t(r[1]) : n(r[2]) : !1;
}, ot = (e, t, n = !1) => {
	let r = Ee.exec(e);
	return r ? r[1] ? t(r[1]) : n : !1;
}, st = (e) => e === "position" || e === "percentage", ct = (e) => e === "image" || e === "url", lt = (e) => e === "length" || e === "size" || e === "bg-size", ut = (e) => e === "length", dt = (e) => e === "number", ft = (e) => e === "family-name", pt = (e) => e === "number" || e === "weight", mt = (e) => e === "shadow", ht = () => {
	let e = we("color"), t = we("font"), n = we("text"), r = we("font-weight"), i = we("tracking"), a = we("leading"), o = we("breakpoint"), s = we("container"), c = we("spacing"), l = we("radius"), u = we("shadow"), d = we("inset-shadow"), f = we("text-shadow"), p = we("drop-shadow"), m = we("blur"), h = we("perspective"), g = we("aspect"), _ = we("ease"), v = we("animate"), y = () => [
		"auto",
		"avoid",
		"all",
		"avoid-page",
		"page",
		"left",
		"right",
		"column"
	], b = () => [
		"center",
		"top",
		"bottom",
		"left",
		"right",
		"top-left",
		"left-top",
		"top-right",
		"right-top",
		"bottom-right",
		"right-bottom",
		"bottom-left",
		"left-bottom"
	], x = () => [
		...b(),
		L,
		I
	], S = () => [
		"auto",
		"hidden",
		"clip",
		"visible",
		"scroll"
	], C = () => [
		"auto",
		"contain",
		"none"
	], w = () => [
		L,
		I,
		c
	], T = () => [
		Ne,
		"full",
		"auto",
		...w()
	], E = () => [
		Pe,
		"none",
		"subgrid",
		L,
		I
	], D = () => [
		"auto",
		{ span: [
			"full",
			Pe,
			L,
			I
		] },
		Pe,
		L,
		I
	], O = () => [
		Pe,
		"auto",
		L,
		I
	], k = () => [
		"auto",
		"min",
		"max",
		"fr",
		L,
		I
	], A = () => [
		"start",
		"end",
		"center",
		"between",
		"around",
		"evenly",
		"stretch",
		"baseline",
		"center-safe",
		"end-safe"
	], j = () => [
		"start",
		"end",
		"center",
		"stretch",
		"center-safe",
		"end-safe"
	], M = () => ["auto", ...w()], ee = () => [
		Ne,
		"auto",
		"full",
		"dvw",
		"dvh",
		"lvw",
		"lvh",
		"svw",
		"svh",
		"min",
		"max",
		"fit",
		...w()
	], te = () => [
		s,
		Ne,
		"screen",
		"full",
		"dvw",
		"lvw",
		"svw",
		"min",
		"max",
		"fit",
		...w()
	], ne = () => [
		Ne,
		"screen",
		"full",
		"lh",
		"dvh",
		"lvh",
		"svh",
		"min",
		"max",
		"fit",
		...w()
	], N = () => [
		e,
		L,
		I
	], re = () => [
		...b(),
		et,
		Ye,
		{ position: [L, I] }
	], ie = () => ["no-repeat", { repeat: [
		"",
		"x",
		"y",
		"space",
		"round"
	] }], ae = () => [
		"auto",
		"cover",
		"contain",
		tt,
		We,
		{ size: [L, I] }
	], oe = () => [
		Fe,
		Qe,
		Ge
	], se = () => [
		"",
		"none",
		"full",
		l,
		L,
		I
	], ce = () => [
		"",
		F,
		Qe,
		Ge
	], le = () => [
		"solid",
		"dashed",
		"dotted",
		"double"
	], ue = () => [
		"normal",
		"multiply",
		"screen",
		"overlay",
		"darken",
		"lighten",
		"color-dodge",
		"color-burn",
		"hard-light",
		"soft-light",
		"difference",
		"exclusion",
		"hue",
		"saturation",
		"color",
		"luminosity"
	], de = () => [
		F,
		Fe,
		et,
		Ye
	], fe = () => [
		"",
		"none",
		m,
		L,
		I
	], pe = () => [
		"none",
		F,
		L,
		I
	], me = () => [
		"none",
		F,
		L,
		I
	], he = () => [
		F,
		L,
		I
	], ge = () => [
		Ne,
		"full",
		...w()
	];
	return {
		cacheSize: 500,
		theme: {
			animate: [
				"spin",
				"ping",
				"pulse",
				"bounce"
			],
			aspect: ["video"],
			blur: [Ie],
			breakpoint: [Ie],
			color: [Le],
			container: [Ie],
			"drop-shadow": [Ie],
			ease: [
				"in",
				"out",
				"in-out"
			],
			font: [He],
			"font-weight": [
				"thin",
				"extralight",
				"light",
				"normal",
				"medium",
				"semibold",
				"bold",
				"extrabold",
				"black"
			],
			"inset-shadow": [Ie],
			leading: [
				"none",
				"tight",
				"snug",
				"normal",
				"relaxed",
				"loose"
			],
			perspective: [
				"dramatic",
				"near",
				"normal",
				"midrange",
				"distant",
				"none"
			],
			radius: [Ie],
			shadow: [Ie],
			spacing: ["px", F],
			text: [Ie],
			"text-shadow": [Ie],
			tracking: [
				"tighter",
				"tight",
				"normal",
				"wide",
				"wider",
				"widest"
			]
		},
		classGroups: {
			aspect: [{ aspect: [
				"auto",
				"square",
				Ne,
				I,
				L,
				g
			] }],
			container: ["container"],
			"container-type": [{ "@container": [
				"",
				"normal",
				"size",
				L,
				I
			] }],
			"container-named": [Ue],
			columns: [{ columns: [
				F,
				"auto",
				I,
				L,
				s
			] }],
			"break-after": [{ "break-after": y() }],
			"break-before": [{ "break-before": y() }],
			"break-inside": [{ "break-inside": [
				"auto",
				"avoid",
				"avoid-page",
				"avoid-column"
			] }],
			"box-decoration": [{ "box-decoration": ["slice", "clone"] }],
			box: [{ box: ["border", "content"] }],
			display: [
				"block",
				"inline-block",
				"inline",
				"flex",
				"inline-flex",
				"table",
				"inline-table",
				"table-caption",
				"table-cell",
				"table-column",
				"table-column-group",
				"table-footer-group",
				"table-header-group",
				"table-row-group",
				"table-row",
				"flow-root",
				"grid",
				"inline-grid",
				"contents",
				"list-item",
				"hidden"
			],
			sr: ["sr-only", "not-sr-only"],
			float: [{ float: [
				"right",
				"left",
				"none",
				"start",
				"end"
			] }],
			clear: [{ clear: [
				"left",
				"right",
				"both",
				"none",
				"start",
				"end"
			] }],
			isolation: ["isolate", "isolation-auto"],
			"object-fit": [{ object: [
				"contain",
				"cover",
				"fill",
				"none",
				"scale-down"
			] }],
			"object-position": [{ object: x() }],
			overflow: [{ overflow: S() }],
			"overflow-x": [{ "overflow-x": S() }],
			"overflow-y": [{ "overflow-y": S() }],
			overscroll: [{ overscroll: C() }],
			"overscroll-x": [{ "overscroll-x": C() }],
			"overscroll-y": [{ "overscroll-y": C() }],
			position: [
				"static",
				"fixed",
				"absolute",
				"relative",
				"sticky"
			],
			inset: [{ inset: T() }],
			"inset-x": [{ "inset-x": T() }],
			"inset-y": [{ "inset-y": T() }],
			start: [{
				"inset-s": T(),
				start: T()
			}],
			end: [{
				"inset-e": T(),
				end: T()
			}],
			"inset-bs": [{ "inset-bs": T() }],
			"inset-be": [{ "inset-be": T() }],
			top: [{ top: T() }],
			right: [{ right: T() }],
			bottom: [{ bottom: T() }],
			left: [{ left: T() }],
			visibility: [
				"visible",
				"invisible",
				"collapse"
			],
			z: [{ z: [
				Pe,
				"auto",
				L,
				I
			] }],
			basis: [{ basis: [
				Ne,
				"full",
				"auto",
				s,
				...w()
			] }],
			"flex-direction": [{ flex: [
				"row",
				"row-reverse",
				"col",
				"col-reverse"
			] }],
			"flex-wrap": [{ flex: [
				"nowrap",
				"wrap",
				"wrap-reverse"
			] }],
			flex: [{ flex: [
				F,
				Ne,
				"auto",
				"initial",
				"none",
				I
			] }],
			grow: [{ grow: [
				"",
				F,
				L,
				I
			] }],
			shrink: [{ shrink: [
				"",
				F,
				L,
				I
			] }],
			order: [{ order: [
				Pe,
				"first",
				"last",
				"none",
				L,
				I
			] }],
			"grid-cols": [{ "grid-cols": E() }],
			"col-start-end": [{ col: D() }],
			"col-start": [{ "col-start": O() }],
			"col-end": [{ "col-end": O() }],
			"grid-rows": [{ "grid-rows": E() }],
			"row-start-end": [{ row: D() }],
			"row-start": [{ "row-start": O() }],
			"row-end": [{ "row-end": O() }],
			"grid-flow": [{ "grid-flow": [
				"row",
				"col",
				"dense",
				"row-dense",
				"col-dense"
			] }],
			"auto-cols": [{ "auto-cols": k() }],
			"auto-rows": [{ "auto-rows": k() }],
			gap: [{ gap: w() }],
			"gap-x": [{ "gap-x": w() }],
			"gap-y": [{ "gap-y": w() }],
			"justify-content": [{ justify: [...A(), "normal"] }],
			"justify-items": [{ "justify-items": [...j(), "normal"] }],
			"justify-self": [{ "justify-self": ["auto", ...j()] }],
			"align-content": [{ content: ["normal", ...A()] }],
			"align-items": [{ items: [...j(), { baseline: ["", "last"] }] }],
			"align-self": [{ self: [
				"auto",
				...j(),
				{ baseline: ["", "last"] }
			] }],
			"place-content": [{ "place-content": A() }],
			"place-items": [{ "place-items": [...j(), "baseline"] }],
			"place-self": [{ "place-self": ["auto", ...j()] }],
			p: [{ p: w() }],
			px: [{ px: w() }],
			py: [{ py: w() }],
			ps: [{ ps: w() }],
			pe: [{ pe: w() }],
			pbs: [{ pbs: w() }],
			pbe: [{ pbe: w() }],
			pt: [{ pt: w() }],
			pr: [{ pr: w() }],
			pb: [{ pb: w() }],
			pl: [{ pl: w() }],
			m: [{ m: M() }],
			mx: [{ mx: M() }],
			my: [{ my: M() }],
			ms: [{ ms: M() }],
			me: [{ me: M() }],
			mbs: [{ mbs: M() }],
			mbe: [{ mbe: M() }],
			mt: [{ mt: M() }],
			mr: [{ mr: M() }],
			mb: [{ mb: M() }],
			ml: [{ ml: M() }],
			"space-x": [{ "space-x": w() }],
			"space-x-reverse": ["space-x-reverse"],
			"space-y": [{ "space-y": w() }],
			"space-y-reverse": ["space-y-reverse"],
			size: [{ size: ee() }],
			"inline-size": [{ inline: ["auto", ...te()] }],
			"min-inline-size": [{ "min-inline": ["auto", ...te()] }],
			"max-inline-size": [{ "max-inline": ["none", ...te()] }],
			"block-size": [{ block: ["auto", ...ne()] }],
			"min-block-size": [{ "min-block": ["auto", ...ne()] }],
			"max-block-size": [{ "max-block": ["none", ...ne()] }],
			w: [{ w: [
				s,
				"screen",
				...ee()
			] }],
			"min-w": [{ "min-w": [
				s,
				"screen",
				"none",
				...ee()
			] }],
			"max-w": [{ "max-w": [
				s,
				"screen",
				"none",
				"prose",
				{ screen: [o] },
				...ee()
			] }],
			h: [{ h: [
				"screen",
				"lh",
				...ee()
			] }],
			"min-h": [{ "min-h": [
				"screen",
				"lh",
				"none",
				...ee()
			] }],
			"max-h": [{ "max-h": [
				"screen",
				"lh",
				"none",
				...ee()
			] }],
			"font-size": [{ text: [
				"base",
				n,
				Qe,
				Ge
			] }],
			"font-smoothing": ["antialiased", "subpixel-antialiased"],
			"font-style": ["italic", "not-italic"],
			"font-weight": [{ font: [
				r,
				it,
				qe
			] }],
			"font-stretch": [{ "font-stretch": [
				"ultra-condensed",
				"extra-condensed",
				"condensed",
				"semi-condensed",
				"normal",
				"semi-expanded",
				"expanded",
				"extra-expanded",
				"ultra-expanded",
				Fe,
				I
			] }],
			"font-family": [{ font: [
				$e,
				Je,
				t
			] }],
			"font-features": [{ "font-features": [I] }],
			"fvn-normal": ["normal-nums"],
			"fvn-ordinal": ["ordinal"],
			"fvn-slashed-zero": ["slashed-zero"],
			"fvn-figure": ["lining-nums", "oldstyle-nums"],
			"fvn-spacing": ["proportional-nums", "tabular-nums"],
			"fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
			tracking: [{ tracking: [
				i,
				L,
				I
			] }],
			"line-clamp": [{ "line-clamp": [
				F,
				"none",
				L,
				Ke
			] }],
			leading: [{ leading: [
				"none",
				a,
				...w()
			] }],
			"list-image": [{ "list-image": [
				"none",
				L,
				I
			] }],
			"list-style-position": [{ list: ["inside", "outside"] }],
			"list-style-type": [{ list: [
				"disc",
				"decimal",
				"none",
				L,
				I
			] }],
			"text-alignment": [{ text: [
				"left",
				"center",
				"right",
				"justify",
				"start",
				"end"
			] }],
			"placeholder-color": [{ placeholder: N() }],
			"text-color": [{ text: N() }],
			"text-decoration": [
				"underline",
				"overline",
				"line-through",
				"no-underline"
			],
			"text-decoration-style": [{ decoration: [...le(), "wavy"] }],
			"text-decoration-thickness": [{ decoration: [
				F,
				"from-font",
				"auto",
				L,
				Ge
			] }],
			"text-decoration-color": [{ decoration: N() }],
			"underline-offset": [{ "underline-offset": [
				F,
				"auto",
				L,
				I
			] }],
			"text-transform": [
				"uppercase",
				"lowercase",
				"capitalize",
				"normal-case"
			],
			"text-overflow": [
				"truncate",
				"text-ellipsis",
				"text-clip"
			],
			"text-wrap": [{ text: [
				"wrap",
				"nowrap",
				"balance",
				"pretty"
			] }],
			indent: [{ indent: w() }],
			"tab-size": [{ tab: [
				Pe,
				L,
				I
			] }],
			"vertical-align": [{ align: [
				"baseline",
				"top",
				"middle",
				"bottom",
				"text-top",
				"text-bottom",
				"sub",
				"super",
				L,
				I
			] }],
			whitespace: [{ whitespace: [
				"normal",
				"nowrap",
				"pre",
				"pre-line",
				"pre-wrap",
				"break-spaces"
			] }],
			break: [{ break: [
				"normal",
				"words",
				"all",
				"keep"
			] }],
			wrap: [{ wrap: [
				"break-word",
				"anywhere",
				"normal"
			] }],
			hyphens: [{ hyphens: [
				"none",
				"manual",
				"auto"
			] }],
			content: [{ content: [
				"none",
				L,
				I
			] }],
			"bg-attachment": [{ bg: [
				"fixed",
				"local",
				"scroll"
			] }],
			"bg-clip": [{ "bg-clip": [
				"border",
				"padding",
				"content",
				"text"
			] }],
			"bg-origin": [{ "bg-origin": [
				"border",
				"padding",
				"content"
			] }],
			"bg-position": [{ bg: re() }],
			"bg-repeat": [{ bg: ie() }],
			"bg-size": [{ bg: ae() }],
			"bg-image": [{ bg: [
				"none",
				{
					linear: [
						{ to: [
							"t",
							"tr",
							"r",
							"br",
							"b",
							"bl",
							"l",
							"tl"
						] },
						Pe,
						L,
						I
					],
					radial: [
						"",
						L,
						I
					],
					conic: [
						"",
						Pe,
						L,
						I
					]
				},
				nt,
				Xe
			] }],
			"bg-color": [{ bg: N() }],
			"gradient-from-pos": [{ from: oe() }],
			"gradient-via-pos": [{ via: oe() }],
			"gradient-to-pos": [{ to: oe() }],
			"gradient-from": [{ from: N() }],
			"gradient-via": [{ via: N() }],
			"gradient-to": [{ to: N() }],
			rounded: [{ rounded: se() }],
			"rounded-s": [{ "rounded-s": se() }],
			"rounded-e": [{ "rounded-e": se() }],
			"rounded-t": [{ "rounded-t": se() }],
			"rounded-r": [{ "rounded-r": se() }],
			"rounded-b": [{ "rounded-b": se() }],
			"rounded-l": [{ "rounded-l": se() }],
			"rounded-ss": [{ "rounded-ss": se() }],
			"rounded-se": [{ "rounded-se": se() }],
			"rounded-ee": [{ "rounded-ee": se() }],
			"rounded-es": [{ "rounded-es": se() }],
			"rounded-tl": [{ "rounded-tl": se() }],
			"rounded-tr": [{ "rounded-tr": se() }],
			"rounded-br": [{ "rounded-br": se() }],
			"rounded-bl": [{ "rounded-bl": se() }],
			"border-w": [{ border: ce() }],
			"border-w-x": [{ "border-x": ce() }],
			"border-w-y": [{ "border-y": ce() }],
			"border-w-s": [{ "border-s": ce() }],
			"border-w-e": [{ "border-e": ce() }],
			"border-w-bs": [{ "border-bs": ce() }],
			"border-w-be": [{ "border-be": ce() }],
			"border-w-t": [{ "border-t": ce() }],
			"border-w-r": [{ "border-r": ce() }],
			"border-w-b": [{ "border-b": ce() }],
			"border-w-l": [{ "border-l": ce() }],
			"divide-x": [{ "divide-x": ce() }],
			"divide-x-reverse": ["divide-x-reverse"],
			"divide-y": [{ "divide-y": ce() }],
			"divide-y-reverse": ["divide-y-reverse"],
			"border-style": [{ border: [
				...le(),
				"hidden",
				"none"
			] }],
			"divide-style": [{ divide: [
				...le(),
				"hidden",
				"none"
			] }],
			"border-color": [{ border: N() }],
			"border-color-x": [{ "border-x": N() }],
			"border-color-y": [{ "border-y": N() }],
			"border-color-s": [{ "border-s": N() }],
			"border-color-e": [{ "border-e": N() }],
			"border-color-bs": [{ "border-bs": N() }],
			"border-color-be": [{ "border-be": N() }],
			"border-color-t": [{ "border-t": N() }],
			"border-color-r": [{ "border-r": N() }],
			"border-color-b": [{ "border-b": N() }],
			"border-color-l": [{ "border-l": N() }],
			"divide-color": [{ divide: N() }],
			"outline-style": [{ outline: [
				...le(),
				"none",
				"hidden"
			] }],
			"outline-offset": [{ "outline-offset": [
				F,
				L,
				I
			] }],
			"outline-w": [{ outline: [
				"",
				F,
				Qe,
				Ge
			] }],
			"outline-color": [{ outline: N() }],
			shadow: [{ shadow: [
				"",
				"inner",
				"none",
				u,
				rt,
				Ze
			] }],
			"shadow-color": [{ shadow: N() }],
			"inset-shadow": [{ "inset-shadow": [
				"none",
				d,
				rt,
				Ze
			] }],
			"inset-shadow-color": [{ "inset-shadow": N() }],
			"ring-w": [{ ring: ce() }],
			"ring-w-inset": ["ring-inset"],
			"ring-color": [{ ring: N() }],
			"ring-offset-w": [{ "ring-offset": [F, Ge] }],
			"ring-offset-color": [{ "ring-offset": N() }],
			"inset-ring-w": [{ "inset-ring": ce() }],
			"inset-ring-color": [{ "inset-ring": N() }],
			"text-shadow": [{ "text-shadow": [
				"none",
				f,
				rt,
				Ze
			] }],
			"text-shadow-color": [{ "text-shadow": N() }],
			opacity: [{ opacity: [
				F,
				L,
				I
			] }],
			"mix-blend": [{ "mix-blend": [
				...ue(),
				"plus-darker",
				"plus-lighter"
			] }],
			"bg-blend": [{ "bg-blend": ue() }],
			"mask-clip": [{ "mask-clip": [
				"border",
				"padding",
				"content",
				"fill",
				"stroke",
				"view"
			] }, "mask-no-clip"],
			"mask-composite": [{ mask: [
				"add",
				"subtract",
				"intersect",
				"exclude"
			] }],
			"mask-image-linear-pos": [{ "mask-linear": [F] }],
			"mask-image-linear-from-pos": [{ "mask-linear-from": de() }],
			"mask-image-linear-to-pos": [{ "mask-linear-to": de() }],
			"mask-image-linear-from-color": [{ "mask-linear-from": N() }],
			"mask-image-linear-to-color": [{ "mask-linear-to": N() }],
			"mask-image-t-from-pos": [{ "mask-t-from": de() }],
			"mask-image-t-to-pos": [{ "mask-t-to": de() }],
			"mask-image-t-from-color": [{ "mask-t-from": N() }],
			"mask-image-t-to-color": [{ "mask-t-to": N() }],
			"mask-image-r-from-pos": [{ "mask-r-from": de() }],
			"mask-image-r-to-pos": [{ "mask-r-to": de() }],
			"mask-image-r-from-color": [{ "mask-r-from": N() }],
			"mask-image-r-to-color": [{ "mask-r-to": N() }],
			"mask-image-b-from-pos": [{ "mask-b-from": de() }],
			"mask-image-b-to-pos": [{ "mask-b-to": de() }],
			"mask-image-b-from-color": [{ "mask-b-from": N() }],
			"mask-image-b-to-color": [{ "mask-b-to": N() }],
			"mask-image-l-from-pos": [{ "mask-l-from": de() }],
			"mask-image-l-to-pos": [{ "mask-l-to": de() }],
			"mask-image-l-from-color": [{ "mask-l-from": N() }],
			"mask-image-l-to-color": [{ "mask-l-to": N() }],
			"mask-image-x-from-pos": [{ "mask-x-from": de() }],
			"mask-image-x-to-pos": [{ "mask-x-to": de() }],
			"mask-image-x-from-color": [{ "mask-x-from": N() }],
			"mask-image-x-to-color": [{ "mask-x-to": N() }],
			"mask-image-y-from-pos": [{ "mask-y-from": de() }],
			"mask-image-y-to-pos": [{ "mask-y-to": de() }],
			"mask-image-y-from-color": [{ "mask-y-from": N() }],
			"mask-image-y-to-color": [{ "mask-y-to": N() }],
			"mask-image-radial": [{ "mask-radial": [L, I] }],
			"mask-image-radial-from-pos": [{ "mask-radial-from": de() }],
			"mask-image-radial-to-pos": [{ "mask-radial-to": de() }],
			"mask-image-radial-from-color": [{ "mask-radial-from": N() }],
			"mask-image-radial-to-color": [{ "mask-radial-to": N() }],
			"mask-image-radial-shape": [{ "mask-radial": ["circle", "ellipse"] }],
			"mask-image-radial-size": [{ "mask-radial": [{
				closest: ["side", "corner"],
				farthest: ["side", "corner"]
			}] }],
			"mask-image-radial-pos": [{ "mask-radial-at": b() }],
			"mask-image-conic-pos": [{ "mask-conic": [F] }],
			"mask-image-conic-from-pos": [{ "mask-conic-from": de() }],
			"mask-image-conic-to-pos": [{ "mask-conic-to": de() }],
			"mask-image-conic-from-color": [{ "mask-conic-from": N() }],
			"mask-image-conic-to-color": [{ "mask-conic-to": N() }],
			"mask-mode": [{ mask: [
				"alpha",
				"luminance",
				"match"
			] }],
			"mask-origin": [{ "mask-origin": [
				"border",
				"padding",
				"content",
				"fill",
				"stroke",
				"view"
			] }],
			"mask-position": [{ mask: re() }],
			"mask-repeat": [{ mask: ie() }],
			"mask-size": [{ mask: ae() }],
			"mask-type": [{ "mask-type": ["alpha", "luminance"] }],
			"mask-image": [{ mask: [
				"none",
				L,
				I
			] }],
			filter: [{ filter: [
				"",
				"none",
				L,
				I
			] }],
			blur: [{ blur: fe() }],
			brightness: [{ brightness: [
				F,
				L,
				I
			] }],
			contrast: [{ contrast: [
				F,
				L,
				I
			] }],
			"drop-shadow": [{ "drop-shadow": [
				"",
				"none",
				p,
				rt,
				Ze
			] }],
			"drop-shadow-color": [{ "drop-shadow": N() }],
			grayscale: [{ grayscale: [
				"",
				F,
				L,
				I
			] }],
			"hue-rotate": [{ "hue-rotate": [
				F,
				L,
				I
			] }],
			invert: [{ invert: [
				"",
				F,
				L,
				I
			] }],
			saturate: [{ saturate: [
				F,
				L,
				I
			] }],
			sepia: [{ sepia: [
				"",
				F,
				L,
				I
			] }],
			"backdrop-filter": [{ "backdrop-filter": [
				"",
				"none",
				L,
				I
			] }],
			"backdrop-blur": [{ "backdrop-blur": fe() }],
			"backdrop-brightness": [{ "backdrop-brightness": [
				F,
				L,
				I
			] }],
			"backdrop-contrast": [{ "backdrop-contrast": [
				F,
				L,
				I
			] }],
			"backdrop-grayscale": [{ "backdrop-grayscale": [
				"",
				F,
				L,
				I
			] }],
			"backdrop-hue-rotate": [{ "backdrop-hue-rotate": [
				F,
				L,
				I
			] }],
			"backdrop-invert": [{ "backdrop-invert": [
				"",
				F,
				L,
				I
			] }],
			"backdrop-opacity": [{ "backdrop-opacity": [
				F,
				L,
				I
			] }],
			"backdrop-saturate": [{ "backdrop-saturate": [
				F,
				L,
				I
			] }],
			"backdrop-sepia": [{ "backdrop-sepia": [
				"",
				F,
				L,
				I
			] }],
			"border-collapse": [{ border: ["collapse", "separate"] }],
			"border-spacing": [{ "border-spacing": w() }],
			"border-spacing-x": [{ "border-spacing-x": w() }],
			"border-spacing-y": [{ "border-spacing-y": w() }],
			"table-layout": [{ table: ["auto", "fixed"] }],
			caption: [{ caption: ["top", "bottom"] }],
			transition: [{ transition: [
				"",
				"all",
				"colors",
				"opacity",
				"shadow",
				"transform",
				"none",
				L,
				I
			] }],
			"transition-behavior": [{ transition: ["normal", "discrete"] }],
			duration: [{ duration: [
				F,
				"initial",
				L,
				I
			] }],
			ease: [{ ease: [
				"linear",
				"initial",
				_,
				L,
				I
			] }],
			delay: [{ delay: [
				F,
				L,
				I
			] }],
			animate: [{ animate: [
				"none",
				v,
				L,
				I
			] }],
			backface: [{ backface: ["hidden", "visible"] }],
			perspective: [{ perspective: [
				h,
				L,
				I
			] }],
			"perspective-origin": [{ "perspective-origin": x() }],
			rotate: [{ rotate: pe() }],
			"rotate-x": [{ "rotate-x": pe() }],
			"rotate-y": [{ "rotate-y": pe() }],
			"rotate-z": [{ "rotate-z": pe() }],
			scale: [{ scale: me() }],
			"scale-x": [{ "scale-x": me() }],
			"scale-y": [{ "scale-y": me() }],
			"scale-z": [{ "scale-z": me() }],
			"scale-3d": ["scale-3d"],
			skew: [{ skew: he() }],
			"skew-x": [{ "skew-x": he() }],
			"skew-y": [{ "skew-y": he() }],
			transform: [{ transform: [
				L,
				I,
				"",
				"none",
				"gpu",
				"cpu"
			] }],
			"transform-origin": [{ origin: x() }],
			"transform-style": [{ transform: ["3d", "flat"] }],
			translate: [{ translate: ge() }],
			"translate-x": [{ "translate-x": ge() }],
			"translate-y": [{ "translate-y": ge() }],
			"translate-z": [{ "translate-z": ge() }],
			"translate-none": ["translate-none"],
			zoom: [{ zoom: [
				Pe,
				L,
				I
			] }],
			accent: [{ accent: N() }],
			appearance: [{ appearance: ["none", "auto"] }],
			"caret-color": [{ caret: N() }],
			"color-scheme": [{ scheme: [
				"normal",
				"dark",
				"light",
				"light-dark",
				"only-dark",
				"only-light"
			] }],
			cursor: [{ cursor: [
				"auto",
				"default",
				"pointer",
				"wait",
				"text",
				"move",
				"help",
				"not-allowed",
				"none",
				"context-menu",
				"progress",
				"cell",
				"crosshair",
				"vertical-text",
				"alias",
				"copy",
				"no-drop",
				"grab",
				"grabbing",
				"all-scroll",
				"col-resize",
				"row-resize",
				"n-resize",
				"e-resize",
				"s-resize",
				"w-resize",
				"ne-resize",
				"nw-resize",
				"se-resize",
				"sw-resize",
				"ew-resize",
				"ns-resize",
				"nesw-resize",
				"nwse-resize",
				"zoom-in",
				"zoom-out",
				L,
				I
			] }],
			"field-sizing": [{ "field-sizing": ["fixed", "content"] }],
			"pointer-events": [{ "pointer-events": ["auto", "none"] }],
			resize: [{ resize: [
				"none",
				"",
				"y",
				"x"
			] }],
			"scroll-behavior": [{ scroll: ["auto", "smooth"] }],
			"scrollbar-thumb-color": [{ "scrollbar-thumb": N() }],
			"scrollbar-track-color": [{ "scrollbar-track": N() }],
			"scrollbar-gutter": [{ "scrollbar-gutter": [
				"auto",
				"stable",
				"both"
			] }],
			"scrollbar-w": [{ scrollbar: [
				"auto",
				"thin",
				"none"
			] }],
			"scroll-m": [{ "scroll-m": w() }],
			"scroll-mx": [{ "scroll-mx": w() }],
			"scroll-my": [{ "scroll-my": w() }],
			"scroll-ms": [{ "scroll-ms": w() }],
			"scroll-me": [{ "scroll-me": w() }],
			"scroll-mbs": [{ "scroll-mbs": w() }],
			"scroll-mbe": [{ "scroll-mbe": w() }],
			"scroll-mt": [{ "scroll-mt": w() }],
			"scroll-mr": [{ "scroll-mr": w() }],
			"scroll-mb": [{ "scroll-mb": w() }],
			"scroll-ml": [{ "scroll-ml": w() }],
			"scroll-p": [{ "scroll-p": w() }],
			"scroll-px": [{ "scroll-px": w() }],
			"scroll-py": [{ "scroll-py": w() }],
			"scroll-ps": [{ "scroll-ps": w() }],
			"scroll-pe": [{ "scroll-pe": w() }],
			"scroll-pbs": [{ "scroll-pbs": w() }],
			"scroll-pbe": [{ "scroll-pbe": w() }],
			"scroll-pt": [{ "scroll-pt": w() }],
			"scroll-pr": [{ "scroll-pr": w() }],
			"scroll-pb": [{ "scroll-pb": w() }],
			"scroll-pl": [{ "scroll-pl": w() }],
			"snap-align": [{ snap: [
				"start",
				"end",
				"center",
				"align-none"
			] }],
			"snap-stop": [{ snap: ["normal", "always"] }],
			"snap-type": [{ snap: [
				"none",
				"x",
				"y",
				"both"
			] }],
			"snap-strictness": [{ snap: ["mandatory", "proximity"] }],
			touch: [{ touch: [
				"auto",
				"none",
				"manipulation"
			] }],
			"touch-x": [{ "touch-pan": [
				"x",
				"left",
				"right"
			] }],
			"touch-y": [{ "touch-pan": [
				"y",
				"up",
				"down"
			] }],
			"touch-pz": ["touch-pinch-zoom"],
			select: [{ select: [
				"none",
				"text",
				"all",
				"auto"
			] }],
			"will-change": [{ "will-change": [
				"auto",
				"scroll",
				"contents",
				"transform",
				L,
				I
			] }],
			fill: [{ fill: ["none", ...N()] }],
			"stroke-w": [{ stroke: [
				F,
				Qe,
				Ge,
				Ke
			] }],
			stroke: [{ stroke: ["none", ...N()] }],
			"forced-color-adjust": [{ "forced-color-adjust": ["auto", "none"] }]
		},
		conflictingClassGroups: {
			"container-named": ["container-type"],
			overflow: ["overflow-x", "overflow-y"],
			overscroll: ["overscroll-x", "overscroll-y"],
			inset: [
				"inset-x",
				"inset-y",
				"inset-bs",
				"inset-be",
				"start",
				"end",
				"top",
				"right",
				"bottom",
				"left"
			],
			"inset-x": [
				"start",
				"end",
				"right",
				"left"
			],
			"inset-y": [
				"inset-bs",
				"inset-be",
				"top",
				"bottom"
			],
			flex: [
				"basis",
				"grow",
				"shrink"
			],
			gap: ["gap-x", "gap-y"],
			p: [
				"px",
				"py",
				"ps",
				"pe",
				"pbs",
				"pbe",
				"pt",
				"pr",
				"pb",
				"pl"
			],
			px: [
				"ps",
				"pe",
				"pr",
				"pl"
			],
			py: [
				"pbs",
				"pbe",
				"pt",
				"pb"
			],
			m: [
				"mx",
				"my",
				"ms",
				"me",
				"mbs",
				"mbe",
				"mt",
				"mr",
				"mb",
				"ml"
			],
			mx: [
				"ms",
				"me",
				"mr",
				"ml"
			],
			my: [
				"mbs",
				"mbe",
				"mt",
				"mb"
			],
			size: ["w", "h"],
			"font-size": ["leading"],
			"fvn-normal": [
				"fvn-ordinal",
				"fvn-slashed-zero",
				"fvn-figure",
				"fvn-spacing",
				"fvn-fraction"
			],
			"fvn-ordinal": ["fvn-normal"],
			"fvn-slashed-zero": ["fvn-normal"],
			"fvn-figure": ["fvn-normal"],
			"fvn-spacing": ["fvn-normal"],
			"fvn-fraction": ["fvn-normal"],
			"line-clamp": ["display", "overflow"],
			rounded: [
				"rounded-s",
				"rounded-e",
				"rounded-t",
				"rounded-r",
				"rounded-b",
				"rounded-l",
				"rounded-ss",
				"rounded-se",
				"rounded-ee",
				"rounded-es",
				"rounded-tl",
				"rounded-tr",
				"rounded-br",
				"rounded-bl"
			],
			"rounded-s": ["rounded-ss", "rounded-es"],
			"rounded-e": ["rounded-se", "rounded-ee"],
			"rounded-t": ["rounded-tl", "rounded-tr"],
			"rounded-r": ["rounded-tr", "rounded-br"],
			"rounded-b": ["rounded-br", "rounded-bl"],
			"rounded-l": ["rounded-tl", "rounded-bl"],
			"border-spacing": ["border-spacing-x", "border-spacing-y"],
			"border-w": [
				"border-w-x",
				"border-w-y",
				"border-w-s",
				"border-w-e",
				"border-w-bs",
				"border-w-be",
				"border-w-t",
				"border-w-r",
				"border-w-b",
				"border-w-l"
			],
			"border-w-x": [
				"border-w-s",
				"border-w-e",
				"border-w-r",
				"border-w-l"
			],
			"border-w-y": [
				"border-w-bs",
				"border-w-be",
				"border-w-t",
				"border-w-b"
			],
			"border-color": [
				"border-color-x",
				"border-color-y",
				"border-color-s",
				"border-color-e",
				"border-color-bs",
				"border-color-be",
				"border-color-t",
				"border-color-r",
				"border-color-b",
				"border-color-l"
			],
			"border-color-x": [
				"border-color-s",
				"border-color-e",
				"border-color-r",
				"border-color-l"
			],
			"border-color-y": [
				"border-color-bs",
				"border-color-be",
				"border-color-t",
				"border-color-b"
			],
			translate: [
				"translate-x",
				"translate-y",
				"translate-none"
			],
			"translate-none": [
				"translate",
				"translate-x",
				"translate-y",
				"translate-z"
			],
			"scroll-m": [
				"scroll-mx",
				"scroll-my",
				"scroll-ms",
				"scroll-me",
				"scroll-mbs",
				"scroll-mbe",
				"scroll-mt",
				"scroll-mr",
				"scroll-mb",
				"scroll-ml"
			],
			"scroll-mx": [
				"scroll-ms",
				"scroll-me",
				"scroll-mr",
				"scroll-ml"
			],
			"scroll-my": [
				"scroll-mbs",
				"scroll-mbe",
				"scroll-mt",
				"scroll-mb"
			],
			"scroll-p": [
				"scroll-px",
				"scroll-py",
				"scroll-ps",
				"scroll-pe",
				"scroll-pbs",
				"scroll-pbe",
				"scroll-pt",
				"scroll-pr",
				"scroll-pb",
				"scroll-pl"
			],
			"scroll-px": [
				"scroll-ps",
				"scroll-pe",
				"scroll-pr",
				"scroll-pl"
			],
			"scroll-py": [
				"scroll-pbs",
				"scroll-pbe",
				"scroll-pt",
				"scroll-pb"
			],
			touch: [
				"touch-x",
				"touch-y",
				"touch-pz"
			],
			"touch-x": ["touch"],
			"touch-y": ["touch"],
			"touch-pz": ["touch"]
		},
		conflictingClassGroupModifiers: { "font-size": ["leading"] },
		postfixLookupClassGroups: ["container-type"],
		orderSensitiveModifiers: [
			"*",
			"**",
			"after",
			"backdrop",
			"before",
			"details-content",
			"file",
			"first-letter",
			"first-line",
			"marker",
			"placeholder",
			"selection"
		]
	};
}, gt = (e, { cacheSize: t, prefix: n, experimentalParseClassName: r, extend: i = {}, override: a = {} }) => (_t(e, "cacheSize", t), _t(e, "prefix", n), _t(e, "experimentalParseClassName", r), vt(e.theme, a.theme), vt(e.classGroups, a.classGroups), vt(e.conflictingClassGroups, a.conflictingClassGroups), vt(e.conflictingClassGroupModifiers, a.conflictingClassGroupModifiers), _t(e, "postfixLookupClassGroups", a.postfixLookupClassGroups), _t(e, "orderSensitiveModifiers", a.orderSensitiveModifiers), yt(e.theme, i.theme), yt(e.classGroups, i.classGroups), yt(e.conflictingClassGroups, i.conflictingClassGroups), yt(e.conflictingClassGroupModifiers, i.conflictingClassGroupModifiers), bt(e, i, "postfixLookupClassGroups"), bt(e, i, "orderSensitiveModifiers"), e), _t = (e, t, n) => {
	n !== void 0 && (e[t] = n);
}, vt = (e, t) => {
	if (t) for (let n in t) _t(e, n, t[n]);
}, yt = (e, t) => {
	if (t) for (let n in t) bt(e, t, n);
}, bt = (e, t, n) => {
	let r = t[n];
	r !== void 0 && (e[n] = e[n] ? e[n].concat(r) : r);
}, xt = (e, ...t) => typeof e == "function" ? Se(ht, e, ...t) : Se(() => gt(ht(), e), ...t), St = [
	"large-title",
	"display-1",
	"display-2",
	"display-3",
	"display-4",
	"title-1",
	"title-2",
	"title-3",
	"headline",
	"body",
	"body-2",
	"caption-1",
	"caption-2"
], Ct = [
	"regular",
	"medium",
	"semibold",
	"bold"
], R = xt({ extend: { classGroups: { "font-size": [{ text: St.flatMap((e) => Ct.map((t) => `${e}-${t}`)) }] } } });
function wt(e) {
	return e;
}
//#endregion
//#region node_modules/react/cjs/react-jsx-runtime.production.js
var Tt = /* @__PURE__ */ o(((e) => {
	var t = Symbol.for("react.transitional.element"), n = Symbol.for("react.fragment");
	function r(e, n, r) {
		var i = null;
		if (r !== void 0 && (i = "" + r), n.key !== void 0 && (i = "" + n.key), "key" in n) for (var a in r = {}, n) a !== "key" && (r[a] = n[a]);
		else r = n;
		return n = r.ref, {
			$$typeof: t,
			type: e,
			key: i,
			ref: n === void 0 ? null : n,
			props: r
		};
	}
	e.Fragment = n, e.jsx = r, e.jsxs = r;
})), z = (/* @__PURE__ */ o(((e, t) => {
	t.exports = Tt();
})))(), Et = wt({
	base: [
		"inline-flex items-center justify-center gap-0.5 whitespace-nowrap overflow-hidden",
		"font-sans select-none cursor-pointer",
		"button-press-motion",
		"outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-border-focus-ring",
		"disabled:cursor-not-allowed aria-disabled:cursor-not-allowed"
	].join(" "),
	size: {
		medium: "h-9 rounded-2lg p-2 text-body-medium",
		small: "h-8 rounded-lg px-2 py-1.5 text-body-medium",
		xs: "h-6 rounded-sm px-2 text-caption-1-semibold"
	},
	iconOnlySize: {
		medium: "",
		small: "size-8 p-0",
		xs: "size-6 p-0"
	},
	icon: {
		medium: "size-5 shrink-0",
		small: "size-[18px] shrink-0",
		xs: "size-3.5 shrink-0"
	},
	label: {
		medium: "inline-flex items-center justify-center px-1 shrink-0",
		small: "inline-flex items-center justify-center px-0.5 shrink-0",
		xs: "inline-flex items-center justify-center px-0.5 shrink-0"
	},
	variant: {
		primary: [
			"bg-button-primary text-text-white shadow-xs",
			"disabled:text-button-primary-disabled-foreground disabled:shadow-none",
			"aria-disabled:text-button-primary-disabled-foreground aria-disabled:shadow-none"
		].join(" "),
		danger: [
			"bg-button-danger text-text-white shadow-xs",
			"disabled:text-foreground-disabled-danger disabled:shadow-none",
			"aria-disabled:text-foreground-disabled-danger aria-disabled:shadow-none"
		].join(" "),
		secondary: [
			"bg-background-primary-default text-text-primary",
			"border border-border-button-default shadow-xs",
			"hover:bg-background-primary-hover  hover:border-border-button-hover",
			"active:bg-background-primary-active active:border-border-button-active",
			"disabled:bg-background-primary-disabled disabled:border-border-button-default disabled:text-text-tertiary disabled:shadow-none",
			"aria-disabled:bg-background-primary-disabled aria-disabled:border-border-button-default aria-disabled:text-text-tertiary aria-disabled:shadow-none"
		].join(" "),
		ghost: [
			"bg-button-ghost-background text-button-ghost-foreground",
			"hover:bg-button-ghost-hover active:bg-button-ghost-active",
			"disabled:bg-button-ghost-disabled disabled:text-button-ghost-disabled-foreground disabled:shadow-none",
			"aria-disabled:bg-button-ghost-disabled aria-disabled:text-button-ghost-disabled-foreground aria-disabled:shadow-none"
		].join(" ")
	}
});
function Dt({ variant: e = "primary", size: t = "medium", iconOnly: n = !1, leadingIcon: r, trailingIcon: i, children: a, className: o, type: s = "button", ref: c, ...l }) {
	return /* @__PURE__ */ (0, z.jsxs)("button", {
		ref: c,
		type: s,
		className: R(Et.base, Et.size[t], Et.variant[e], n && Et.iconOnlySize[t], o),
		...l,
		children: [
			r ? /* @__PURE__ */ (0, z.jsx)(r, {
				className: Et.icon[t],
				"aria-hidden": !0
			}) : null,
			!n && a != null && /* @__PURE__ */ (0, z.jsx)("span", {
				className: Et.label[t],
				children: a
			}),
			!n && i ? /* @__PURE__ */ (0, z.jsx)(i, {
				className: Et.icon[t],
				"aria-hidden": !0
			}) : null
		]
	});
}
function Ot({ variant: e = "primary", size: t = "medium", iconOnly: n = !1, leadingIcon: r, trailingIcon: i, children: a, className: o, ref: s, ...c }) {
	return /* @__PURE__ */ (0, z.jsxs)("a", {
		ref: s,
		className: R(Et.base, Et.size[t], Et.variant[e], n && Et.iconOnlySize[t], o),
		...c,
		children: [
			r ? /* @__PURE__ */ (0, z.jsx)(r, {
				className: Et.icon[t],
				"aria-hidden": !0
			}) : null,
			!n && a != null && /* @__PURE__ */ (0, z.jsx)("span", {
				className: Et.label[t],
				children: a
			}),
			!n && i ? /* @__PURE__ */ (0, z.jsx)(i, {
				className: Et.icon[t],
				"aria-hidden": !0
			}) : null
		]
	});
}
//#endregion
//#region src/react/pages/auth-card.tsx
function kt({ title: e, lede: t, busy: n = !1, children: r }) {
	return /* @__PURE__ */ (0, z.jsx)("main", {
		className: "flex justify-center px-6 py-12 max-sm:px-4 max-sm:py-6",
		children: /* @__PURE__ */ (0, z.jsxs)("section", {
			"aria-labelledby": "auth-card-title",
			"aria-busy": n || void 0,
			className: "flex w-full max-w-140 flex-col gap-6 rounded-3xl border border-separator-border bg-background-secondary-default p-8 max-sm:p-5",
			children: [/* @__PURE__ */ (0, z.jsxs)("header", {
				className: "flex flex-col gap-1",
				children: [
					/* @__PURE__ */ (0, z.jsx)("img", {
						src: "/peach-logo-128.png",
						srcSet: "/peach-logo-64.png 64w, /peach-logo-128.png 128w",
						sizes: "40px",
						alt: "",
						width: 40,
						height: 40,
						decoding: "async",
						className: "mb-4 size-10"
					}),
					/* @__PURE__ */ (0, z.jsx)("h1", {
						id: "auth-card-title",
						className: "text-title-2-medium text-text-primary",
						children: e
					}),
					t ? /* @__PURE__ */ (0, z.jsx)("p", {
						className: "whitespace-pre-line text-body-2-regular text-text-secondary wrap-anywhere",
						children: t
					}) : null
				]
			}), r]
		})
	});
}
function At({ first: e = !1, labelledBy: t, children: n }) {
	return /* @__PURE__ */ (0, z.jsx)("section", {
		"aria-labelledby": t,
		className: e ? "flex flex-col gap-4" : "flex flex-col gap-4 border-t border-separator-border pt-6",
		children: n
	});
}
function jt({ id: e, children: t }) {
	return /* @__PURE__ */ (0, z.jsx)("h2", {
		id: e,
		className: "text-body-semibold text-text-primary",
		children: t
	});
}
//#endregion
//#region src/react/pages/error/error-page.tsx
var Mt = {
	403: "这里不能打开",
	404: "四〇四",
	409: "现在不能这样做"
};
function Nt(e) {
	return Mt[e ?? ""] ?? "出了点问题";
}
function Pt({ data: e }) {
	let t = Nt(e.status);
	return (0, w.useEffect)(() => {
		document.title = `Peach · ${t}`;
	}, [t]), /* @__PURE__ */ (0, z.jsx)(kt, {
		title: t,
		lede: e.status === "404" ? void 0 : e.detail,
		children: /* @__PURE__ */ (0, z.jsx)(Ot, {
			href: "/",
			className: "self-start",
			children: "返回首页"
		})
	});
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/chain.mjs
function Ft(...e) {
	return (...t) => {
		for (let n of e) typeof n == "function" && n(...t);
	};
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/useLayoutEffect.mjs
var B = typeof document < "u" ? w.useLayoutEffect : () => {}, It = {
	prefix: String(Math.round(Math.random() * 1e10)),
	current: 0
}, Lt = /*#__PURE__*/ w.createContext(It), Rt = /*#__PURE__*/ w.createContext(!1);
typeof window < "u" && window.document && window.document.createElement;
var zt = /* @__PURE__ */ new WeakMap();
function Bt(e = !1) {
	let t = (0, w.useContext)(Lt), n = (0, w.useRef)(null);
	if (n.current === null && !e) {
		let e = w.default.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED?.ReactCurrentOwner?.current;
		if (e) {
			let n = zt.get(e);
			n == null ? zt.set(e, {
				id: t.current,
				state: e.memoizedState
			}) : e.memoizedState !== n.state && (t.current = n.id, zt.delete(e));
		}
		n.current = ++t.current;
	}
	return n.current;
}
function Vt(e) {
	let t = (0, w.useContext)(Lt), n = Bt(!!e), r = `react-aria${t.prefix}`;
	return e || `${r}-${n}`;
}
function Ht(e) {
	let t = w.useId(), [n] = (0, w.useState)(qt()), r = n ? "react-aria" : `react-aria${It.prefix}`;
	return e || `${r}-${t}`;
}
var Ut = typeof w.useId == "function" ? Ht : Vt;
function Wt() {
	return !1;
}
function Gt() {
	return !0;
}
function Kt(e) {
	return () => {};
}
function qt() {
	return typeof w.useSyncExternalStore == "function" ? w.useSyncExternalStore(Kt, Wt, Gt) : (0, w.useContext)(Rt);
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/useValueEffect.mjs
function Jt(e) {
	let [t, n] = (0, w.useState)(e), r = (0, w.useRef)(t), i = (0, w.useRef)(null), a = (0, w.useRef)(() => {
		if (!i.current) return;
		let e = i.current.next();
		e.done ? i.current = null : r.current === e.value ? a.current() : n(e.value);
	});
	return B(() => {
		r.current = t, i.current && a.current();
	}), [t, (0, w.useCallback)((e) => {
		i.current = e(r.current), a.current();
	}, [a])];
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/useId.mjs
var Yt = !!(typeof window < "u" && window.document && window.document.createElement), Xt = /* @__PURE__ */ new Map(), Zt;
typeof FinalizationRegistry < "u" && (Zt = new FinalizationRegistry((e) => {
	Xt.delete(e);
}));
var Qt = /* @__PURE__ */ new WeakMap();
function $t(e) {
	let [t, n] = (0, w.useState)(e), r = (0, w.useRef)(null), i = Ut(t), a = (0, w.useRef)(null), o = Qt.get(a);
	if (Zt && o !== i && (o != null && Zt.unregister(a), Zt.register(a, i, a), Qt.set(a, i)), Yt) {
		let e = Xt.get(i);
		e && !e.includes(r) ? e.push(r) : Xt.set(i, [r]);
	}
	return B(() => {
		let e = i;
		return () => {
			Zt && (Zt.unregister(a), Qt.delete(a)), Xt.delete(e);
		};
	}, [i]), (0, w.useEffect)(() => {
		let e = r.current;
		return e && n(e), () => {
			e && (r.current = null);
		};
	}), i;
}
function en(e, t) {
	if (e === t) return e;
	let n = Xt.get(e);
	if (n) return n.forEach((e) => e.current = t), t;
	let r = Xt.get(t);
	return r ? (r.forEach((t) => t.current = e), e) : t;
}
function tn(e = []) {
	let t = $t(), [n, r] = Jt(t), i = (0, w.useCallback)(() => {
		r(function* () {
			yield t, yield document.getElementById(t) ? t : void 0;
		});
	}, [t, r]);
	return B(i, [
		t,
		i,
		...e
	]), n;
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/mergeRefs.mjs
function nn(...e) {
	return e.length === 1 && e[0] ? e[0] : (t) => {
		let n = !1, r = e.map((e) => {
			let r = rn(e, t);
			return n ||= typeof r == "function", r;
		});
		if (n) return () => {
			r.forEach((t, n) => {
				typeof t == "function" ? t() : rn(e[n], null);
			});
		};
	};
}
function rn(e, t) {
	if (typeof e == "function") return e(t);
	e != null && (e.current = t);
}
//#endregion
//#region node_modules/clsx/dist/clsx.mjs
function an(e) {
	var t, n, r = "";
	if (typeof e == "string" || typeof e == "number") r += e;
	else if (typeof e == "object") {
		if (Array.isArray(e)) {
			var i = e.length;
			for (t = 0; t < i; t++) e[t] && (n = an(e[t])) && (r && (r += " "), r += n);
		} else for (n in e) e[n] && (r && (r += " "), r += n);
	}
	return r;
}
function on() {
	for (var e, t, n = 0, r = "", i = arguments.length; n < i; n++) (e = arguments[n]) && (t = an(e)) && (r && (r += " "), r += t);
	return r;
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/mergeProps.mjs
function V(...e) {
	let t = { ...e[0] };
	for (let n = 1; n < e.length; n++) {
		let r = e[n];
		for (let e in r) {
			let n = t[e], i = r[e];
			typeof n == "function" && typeof i == "function" && e[0] === "o" && e[1] === "n" && e.charCodeAt(2) >= 65 && e.charCodeAt(2) <= 90 ? t[e] = Ft(n, i) : (e === "className" || e === "UNSAFE_className") && typeof n == "string" && typeof i == "string" ? t[e] = on(n, i) : e === "id" && n && i ? t.id = en(n, i) : e === "ref" && n && i ? t.ref = nn(n, i) : t[e] = i === void 0 ? n : i;
		}
	}
	return t;
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/useObjectRef.mjs
function sn(e) {
	let t = (0, w.useRef)(null), n = (0, w.useRef)(void 0), r = (0, w.useCallback)((t) => {
		if (typeof e == "function") {
			let n = e, r = n(t);
			return () => {
				typeof r == "function" ? r() : n(null);
			};
		}
		if (e) return e.current = t, () => {
			e.current = null;
		};
	}, [e]);
	return (0, w.useMemo)(() => ({
		get current() {
			return t.current;
		},
		set current(e) {
			t.current = e, n.current &&= (n.current(), void 0), e != null && (n.current = r(e));
		}
	}), [r]);
}
//#endregion
//#region node_modules/react-aria-components/dist/private/utils.mjs
var cn = Symbol("default");
function ln({ values: e, children: t }) {
	for (let [n, r] of e) t = /*#__PURE__*/ w.createElement(n.Provider, { value: r }, t);
	return t;
}
function un(e) {
	let { className: t, style: n, children: r, defaultClassName: i, defaultChildren: a, defaultStyle: o, values: s, render: c } = e;
	return (0, w.useMemo)(() => {
		let e, l, u;
		return e = typeof t == "function" ? t({
			...s,
			defaultClassName: i
		}) : t, l = typeof n == "function" ? n({
			...s,
			defaultStyle: o || {}
		}) : n, u = typeof r == "function" ? r({
			...s,
			defaultChildren: a
		}) : r ?? a, {
			className: e ?? i,
			style: l || o ? {
				...o,
				...l
			} : void 0,
			children: u ?? a,
			"data-rac": "",
			render: c ? (e) => c(e, s) : void 0
		};
	}, [
		t,
		n,
		r,
		i,
		a,
		o,
		s,
		c
	]);
}
function dn(e, t) {
	let n = (0, w.useContext)(e);
	if (t === null) return null;
	if (n && typeof n == "object" && "slots" in n && n.slots) {
		let e = t || cn;
		if (!n.slots[e]) {
			let e = new Intl.ListFormat().format(Object.keys(n.slots).map((e) => `"${e}"`)), r = t ? `Invalid slot "${t}".` : "A slot prop is required.";
			throw Error(`${r} Valid slot names are ${e}.`);
		}
		return n.slots[e];
	}
	return n;
}
function fn(e, t, n) {
	let { ref: r, ...i } = dn(n, e.slot) || {}, a = sn((0, w.useMemo)(() => nn(t, r), [t, r])), o = V(i, e);
	return "style" in i && i.style && "style" in e && e.style && (o.style = typeof i.style == "function" || typeof e.style == "function" ? (t) => {
		let n = typeof i.style == "function" ? i.style(t) : i.style, r = {
			...t.defaultStyle,
			...n
		}, a = typeof e.style == "function" ? e.style({
			...t,
			defaultStyle: r
		}) : e.style;
		return {
			...r,
			...a
		};
	} : {
		...i.style,
		...e.style
	}), [o, a];
}
function pn(e = !0) {
	let [t, n] = (0, w.useState)(e), r = (0, w.useRef)(!1), i = (0, w.useCallback)((e) => {
		r.current = !0, n(!!e);
	}, []);
	return B(() => {
		r.current || n(!1);
	}, []), [i, t];
}
function mn(e) {
	let t = /^(data-.*)$/, n = {};
	for (let r in e) t.test(r) || (n[r] = e[r]);
	return n;
}
function hn(e, t, n) {
	let { render: r, ...i } = t, a = (0, w.useRef)(null), o = (0, w.useMemo)(() => nn(n, a), [n, a]);
	B(() => {}, [e, r]);
	let s = {
		...i,
		ref: o
	};
	return r ? r(s, void 0) : /*#__PURE__*/ w.createElement(e, s);
}
var gn = {}, _n = new Proxy({}, { get(e, t) {
	if (typeof t != "string") return;
	let n = gn[t];
	return n || (n = /*#__PURE__*/ (0, w.forwardRef)(hn.bind(null, t)), gn[t] = n), n;
} }), vn = "react-aria-clear-focus", yn = "react-aria-focus", H = (e) => Sn(e) ? e.document : Cn(e) ? e : e?.ownerDocument ?? (typeof document < "u" ? document : void 0), bn = (e) => H(e)?.defaultView ?? (typeof window < "u" ? window : void 0);
function xn(e) {
	return typeof e == "object" && !!e && "nodeType" in e && typeof e.nodeType == "number";
}
function Sn(e) {
	return typeof e == "object" && !!e && "window" in e && e.window === e;
}
function Cn(e) {
	return xn(e) && e.nodeType === 9;
}
function wn(e) {
	return xn(e) && e.nodeType === 11 && "host" in e;
}
function Tn(e, t, n, r) {
	if (n == null || e == null) return () => {};
	let i = Array.isArray(e) ? e : [e];
	for (let e of i) e.addEventListener(t, n, r);
	return () => {
		for (let e of i) e.removeEventListener(t, n, r);
	};
}
function En(e, t, n, r) {
	if (e == null) return () => {};
	let i = [], a = Array.isArray(e) ? e : [e];
	for (let e of a) {
		let a = e.style.getPropertyValue(t), o = e.style.getPropertyPriority(t);
		e.style.setProperty(t, n, r), i.unshift(() => {
			a ? e.style.setProperty(t, a, o) : e.style.removeProperty(t);
		});
	}
	return () => {
		for (let e of i) e();
	};
}
//#endregion
//#region node_modules/react-stately/dist/private/flags/flags.mjs
var Dn = !1;
function On() {
	return Dn;
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/shadowdom/DOMFunctions.mjs
function U(e, t) {
	if (!On()) return t && e ? e.contains(t) : !1;
	if (!e || !t) return !1;
	let n = t;
	for (; n != null;) {
		if (n === e) return !0;
		n = typeof n.assignedElements != "function" && n.assignedSlot?.parentNode ? n.assignedSlot.parentNode : wn(n) ? n.host : n.parentNode;
	}
	return !1;
}
var kn = (e = document) => {
	if (!On()) return e.activeElement;
	let t = e.activeElement;
	for (; t && "shadowRoot" in t && t.shadowRoot?.activeElement;) t = t.shadowRoot.activeElement;
	return t;
};
function W(e) {
	if (On() && e.target instanceof Element && e.target.shadowRoot) {
		if ("composedPath" in e) return e.composedPath()[0] ?? null;
		if ("composedPath" in e.nativeEvent) return e.nativeEvent.composedPath()[0] ?? null;
	}
	return e.target;
}
function An(e, t) {
	if (t === null) return [];
	t ??= bn(e);
	let n = [t];
	if (!On() || !e || e === t) return n;
	let r = "getRootNode" in t ? t.getRootNode() : null, i = e.getRootNode() ?? null;
	for (; wn(i) && i !== r;) n.push(i), i = i.host.getRootNode();
	return n;
}
function jn(e) {
	if (!e) return !1;
	let t = e.getRootNode(), n = bn(e);
	if (!(t instanceof n.Document || t instanceof n.ShadowRoot)) return !1;
	let r = t.activeElement;
	return r != null && e.contains(r);
}
//#endregion
//#region node_modules/react-aria/dist/private/focus/virtualFocus.mjs
function Mn(e) {
	let t = Fn(H(e));
	t !== e && (t && Nn(t, e), e && Pn(e, t));
}
function Nn(e, t) {
	e.dispatchEvent(new FocusEvent("blur", { relatedTarget: t })), e.dispatchEvent(new FocusEvent("focusout", {
		bubbles: !0,
		relatedTarget: t
	}));
}
function Pn(e, t) {
	e.dispatchEvent(new FocusEvent("focus", { relatedTarget: t })), e.dispatchEvent(new FocusEvent("focusin", {
		bubbles: !0,
		relatedTarget: t
	}));
}
function Fn(e) {
	let t = kn(e), n = t?.getAttribute("aria-activedescendant");
	return n && e.getElementById(n) || t;
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/focusWithoutScrolling.mjs
function In(e) {
	e.focus({ preventScroll: !0 });
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/isElementVisible.mjs
var Ln = typeof Element < "u" && "checkVisibility" in Element.prototype;
function Rn(e) {
	let t = bn(e);
	if (!(e instanceof t.HTMLElement) && !(e instanceof t.SVGElement)) return !1;
	let { display: n, visibility: r } = e.style, i = n !== "none" && r !== "hidden" && r !== "collapse";
	if (i) {
		let { getComputedStyle: t } = bn(e), { display: n, visibility: r } = t(e);
		i = n !== "none" && r !== "hidden" && r !== "collapse";
	}
	return i;
}
function zn(e, t) {
	return !e.hasAttribute("hidden") && !e.hasAttribute("data-react-aria-prevent-focus") && (e.nodeName === "DETAILS" && t && t.nodeName !== "SUMMARY" ? e.hasAttribute("open") : !0);
}
function Bn(e, t) {
	return Ln ? e.checkVisibility({ visibilityProperty: !0 }) && !e.closest("[data-react-aria-prevent-focus]") : e.nodeName !== "#comment" && Rn(e) && zn(e, t) && (!e.parentElement || Bn(e.parentElement, e));
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/isFocusable.mjs
var Vn = [
	"input:not([disabled]):not([type=hidden])",
	"select:not([disabled])",
	"textarea:not([disabled])",
	"button:not([disabled])",
	"a[href]",
	"area[href]",
	"summary",
	"iframe",
	"object",
	"embed",
	"audio[controls]",
	"video[controls]",
	"[contenteditable]:not([contenteditable^=\"false\"])",
	"permission"
], Hn = Vn.join(":not([hidden]),") + ",[tabindex]:not([disabled]):not([hidden])";
Vn.push("[tabindex]:not([tabindex=\"-1\"]):not([disabled])");
var Un = Vn.join(":not([hidden]):not([tabindex=\"-1\"]),");
function Wn(e, t) {
	return e.matches(Hn) && !Kn(e) && (t?.skipVisibilityCheck || Bn(e));
}
function Gn(e) {
	return e.matches(Un) && Bn(e) && !Kn(e);
}
function Kn(e) {
	let t = e;
	for (; t != null;) {
		if (t instanceof bn(t).HTMLElement && t.inert) return !0;
		t = t.parentElement;
	}
	return !1;
}
//#endregion
//#region node_modules/react-aria/dist/private/interactions/utils.mjs
function qn(e) {
	let t = e;
	return t.nativeEvent = e, t.isDefaultPrevented = () => t.defaultPrevented, t.isPropagationStopped = () => t.cancelBubble, t.persist = () => {}, t;
}
function Jn(e, t) {
	Object.defineProperty(e, "target", { value: t }), Object.defineProperty(e, "currentTarget", { value: t });
}
function Yn(e) {
	let t = (0, w.useRef)({
		isFocused: !1,
		observer: null
	});
	return B(() => {
		let e = t.current;
		return () => {
			e.observer &&= (e.observer.disconnect(), null);
		};
	}, []), (0, w.useCallback)((n) => {
		let r = W(n);
		if (r instanceof HTMLButtonElement || r instanceof HTMLInputElement || r instanceof HTMLTextAreaElement || r instanceof HTMLSelectElement) {
			t.current.isFocused = !0;
			let n = r;
			n.addEventListener("focusout", (r) => {
				if (t.current.isFocused = !1, n.disabled) {
					let t = qn(r);
					e?.(t);
				}
				t.current.observer && (t.current.observer.disconnect(), t.current.observer = null);
			}, { once: !0 }), t.current.observer = new MutationObserver(() => {
				if (t.current.isFocused && n.disabled) {
					t.current.observer?.disconnect();
					let e = n === kn() ? null : kn();
					n.dispatchEvent(new FocusEvent("blur", { relatedTarget: e })), n.dispatchEvent(new FocusEvent("focusout", {
						bubbles: !0,
						relatedTarget: e
					}));
				}
			}), t.current.observer.observe(n, {
				attributes: !0,
				attributeFilter: ["disabled"]
			});
		}
	}, [e]);
}
var Xn = !1;
function Zn(e) {
	for (; e && !Wn(e, { skipVisibilityCheck: !0 });) e = e.parentElement;
	let t = kn(bn(e).document);
	if (!t || t === e) return;
	let n = e?.getRootNode(), r = n != null && wn(n) ? n : bn(e), i = (t) => t === e || xn(t) && U(e, t), a = (e) => e === t || t != null && xn(e) && U(t, e);
	Xn = !0;
	let o = !1, s = (e) => {
		(a(W(e)) || o) && e.stopImmediatePropagation();
	}, c = (n) => {
		(a(W(n)) || o) && (n.stopImmediatePropagation(), !e && !o && (o = !0, In(t), d()));
	}, l = (e) => {
		(i(W(e)) || o) && e.stopImmediatePropagation();
	}, u = (e) => {
		(i(W(e)) || o) && (e.stopImmediatePropagation(), o || (o = !0, In(t), d()));
	};
	r.addEventListener("blur", s, !0), r.addEventListener("focusout", c, !0), r.addEventListener("focusin", u, !0), r.addEventListener("focus", l, !0);
	let d = () => {
		cancelAnimationFrame(f), r.removeEventListener("blur", s, !0), r.removeEventListener("focusout", c, !0), r.removeEventListener("focusin", u, !0), r.removeEventListener("focus", l, !0), Xn = !1, o = !1;
	}, f = requestAnimationFrame(d);
	return d;
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/platform.mjs
function Qn(e) {
	if (typeof window > "u" || window.navigator == null) return !1;
	let t = window.navigator.userAgentData?.brands;
	return Array.isArray(t) && t.some((t) => e.test(t.brand)) || e.test(window.navigator.userAgent);
}
function $n(e) {
	return typeof window < "u" && window.navigator != null && e.test(window.navigator.userAgentData?.platform || window.navigator.platform);
}
function er(e) {
	let t = null;
	return () => (t ??= e(), t);
}
var tr = er(function() {
	return $n(/^Mac/i);
}), nr = er(function() {
	return $n(/^iPhone/i);
}), rr = er(function() {
	return $n(/^iPad/i) || tr() && navigator.maxTouchPoints > 1;
}), ir = er(function() {
	return nr() || rr();
}), ar = er(function() {
	return tr() || ir();
}), or = er(function() {
	return Qn(/AppleWebKit/i) && (ir() || !sr());
}), sr = er(function() {
	return Qn(/Chrome|CriOS|CrMo/i);
}), cr = er(function() {
	return Qn(/Android/i);
});
//#endregion
//#region node_modules/react-aria/dist/private/utils/isVirtualEvent.mjs
function lr(e) {
	return e.pointerType === "" && e.isTrusted ? !0 : cr() && e.pointerType ? e.type === "click" && e.buttons === 1 : e.detail === 0 && !e.pointerType;
}
function ur(e) {
	return !cr() && e.width === 0 && e.height === 0 || cr() && e.width === 1 && e.height === 1 && e.pressure === 0 && e.detail === 0 && e.pointerType === "mouse";
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/openLink.mjs
var dr = /*#__PURE__*/ (0, w.createContext)({
	isNative: !0,
	open: hr,
	useHref: (e) => e
});
function fr() {
	return (0, w.useContext)(dr);
}
function pr(e, t, n = !0) {
	let { metaKey: r, ctrlKey: i, altKey: a, shiftKey: o } = t, s = or() && tr() && !rr() ? new KeyboardEvent("keydown", {
		keyIdentifier: "Enter",
		metaKey: r,
		ctrlKey: i,
		altKey: a,
		shiftKey: o
	}) : new MouseEvent("click", {
		metaKey: r,
		ctrlKey: i,
		altKey: a,
		shiftKey: o,
		detail: 1,
		bubbles: !0,
		cancelable: !0
	});
	pr.isOpening = n, In(e), e.dispatchEvent(s), pr.isOpening = !1;
}
pr.isOpening = !1;
function mr(e, t) {
	if (e instanceof HTMLAnchorElement) t(e);
	else if (e.hasAttribute("data-href")) {
		let n = document.createElement("a");
		n.href = e.getAttribute("data-href"), e.hasAttribute("data-target") && (n.target = e.getAttribute("data-target")), e.hasAttribute("data-rel") && (n.rel = e.getAttribute("data-rel")), e.hasAttribute("data-download") && (n.download = e.getAttribute("data-download")), e.hasAttribute("data-ping") && (n.ping = e.getAttribute("data-ping")), e.hasAttribute("data-referrer-policy") && (n.referrerPolicy = e.getAttribute("data-referrer-policy")), e.appendChild(n), t(n), e.removeChild(n);
	}
}
function hr(e, t) {
	mr(e, (e) => pr(e, t));
}
function gr(e) {
	let t = fr().useHref(e?.href ?? ""), n = {};
	if (e) for (let r of [
		"href",
		"target",
		"rel",
		"download",
		"ping",
		"referrerPolicy"
	]) r in e && e[r] !== void 0 && (n[r] = r === "href" ? t : e[r]);
	return n;
}
//#endregion
//#region node_modules/react-aria/dist/private/interactions/useFocusVisible.mjs
var _r = null, vr = /* @__PURE__ */ new Set(), yr = /* @__PURE__ */ new Map(), br = !1, xr = !1, Sr = {
	Tab: !0,
	Escape: !0
};
function Cr(e, t) {
	for (let n of vr) n(e, t);
}
function wr(e) {
	return !(e.metaKey || !tr() && e.altKey || e.ctrlKey || e.key === "Control" || e.key === "Shift" || e.key === "Meta");
}
function Tr(e) {
	br = !0, !pr.isOpening && wr(e) && (_r = "keyboard", Cr("keyboard", e));
}
function Er(e) {
	_r = "pointer", "pointerType" in e && e.pointerType, (e.type === "mousedown" || e.type === "pointerdown") && (br = !0, Cr("pointer", e));
}
function Dr(e) {
	!pr.isOpening && lr(e) && (br = !0, _r = "virtual");
}
function Or(e) {
	if (Xn) return;
	let t = W(e), n = bn(t), r = H(t);
	t === n ? xr = !0 : t !== r && e.isTrusted && (!br && !xr && (_r = "virtual", Cr("virtual", e)), br = !1, xr = !1);
}
function kr() {
	Xn || (br = !1, xr = !0);
}
function Ar(e) {
	let t = kn(H(W(e)));
	queueMicrotask(() => {
		kn(H(W(e))) !== t && Ir("keyboard");
	});
}
function jr(e) {
	if (typeof window > "u" || typeof document > "u") return;
	let t = bn(e), n = H(e);
	if (yr.get(t)) return;
	let r = t.HTMLElement.prototype.focus;
	Reflect.defineProperty(t.HTMLElement.prototype, "focus", {
		configurable: !0,
		writable: !0,
		value: function() {
			br = !0, r.apply(this, arguments);
		}
	}), n.addEventListener("keydown", Tr, !0), n.addEventListener("keyup", Tr, !0), n.addEventListener("click", Dr, !0), n.addEventListener("invalid", Ar, !0), t.addEventListener("focus", Or, !0), t.addEventListener("blur", kr, !1), typeof PointerEvent < "u" && (n.addEventListener("pointerdown", Er, !0), n.addEventListener("pointermove", Er, !0), n.addEventListener("pointerup", Er, !0)), t.addEventListener("beforeunload", () => {
		Mr(e);
	}, { once: !0 }), yr.set(t, { focus: r });
}
var Mr = (e, t) => {
	let n = bn(e), r = H(e);
	t && r.removeEventListener("DOMContentLoaded", t), yr.has(n) && (Reflect.defineProperty(n.HTMLElement.prototype, "focus", {
		configurable: !0,
		writable: !0,
		value: yr.get(n).focus
	}), r.removeEventListener("keydown", Tr, !0), r.removeEventListener("keyup", Tr, !0), r.removeEventListener("click", Dr, !0), r.removeEventListener("invalid", Ar, !0), n.removeEventListener("focus", Or, !0), n.removeEventListener("blur", kr, !1), typeof PointerEvent < "u" && (r.removeEventListener("pointerdown", Er, !0), r.removeEventListener("pointermove", Er, !0), r.removeEventListener("pointerup", Er, !0)), yr.delete(n));
};
function Nr(e) {
	let t = H(e), n;
	return t.readyState === "loading" ? (n = () => {
		jr(e);
	}, t.addEventListener("DOMContentLoaded", n)) : jr(e), () => Mr(e, n);
}
typeof document < "u" && Nr();
function Pr() {
	return _r !== "pointer";
}
function Fr() {
	return _r;
}
function Ir(e) {
	_r = e, Cr(e, null);
}
var Lr = /* @__PURE__ */ new Set([
	"checkbox",
	"radio",
	"range",
	"color",
	"file",
	"image",
	"button",
	"submit",
	"reset"
]);
function Rr(e, t, n) {
	let r = n ? W(n) : void 0, i = H(r), a = bn(r), o = a === void 0 ? HTMLInputElement : a.HTMLInputElement, s = a === void 0 ? HTMLTextAreaElement : a.HTMLTextAreaElement, c = a === void 0 ? HTMLElement : a.HTMLElement, l = a === void 0 ? KeyboardEvent : a.KeyboardEvent, u = kn(i);
	return e = e || u instanceof o && !Lr.has(u.type) || u instanceof s || u instanceof c && u.isContentEditable, !(e && t === "keyboard" && n instanceof l && !Sr[n.key]);
}
function zr(e, t, n) {
	jr(), (0, w.useEffect)(() => {
		if (n?.enabled === !1) return;
		let t = (t, r) => {
			Rr(!!n?.isTextInput, t, r) && e(Pr());
		};
		return vr.add(t), () => {
			vr.delete(t);
		};
	}, t);
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/getMetaValue.mjs
function Br(e, t) {
	let n = bn(t), r = H(t);
	if (r == null || n == null) return;
	let i, a = `meta[name="${CSS.escape(e)}"], meta[property="${CSS.escape(e)}"]`, o = r.querySelector(a);
	return o && o instanceof n.HTMLMetaElement && (e === "csp-nonce" && o.nonce && (i ??= o.nonce || void 0), o.content && (i ??= o.content || void 0)), e === "csp-nonce" && (i ??= n.__webpack_nonce__ || globalThis.__webpack_nonce__ || void 0), i;
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/keyboard.mjs
var Vr = 100, Hr = 600, G = {
	isOpen: !1,
	screenWidth: 0,
	screenHeight: 0,
	screenAngle: 0,
	screenTimeout: 0,
	startTimeStamp: 0,
	endTimeStamp: 0,
	resizeTimeStamp: 0,
	resizeTimeout: 0
}, Ur = /* @__PURE__ */ new Set([
	"checkbox",
	"radio",
	"range",
	"color",
	"file",
	"image",
	"button",
	"submit",
	"reset"
]);
function Wr() {
	let e = Number(window.visualViewport?.width ?? window.innerWidth), t = Number(window.visualViewport?.height ?? window.innerHeight), n = Number(window.visualViewport?.scale ?? 1);
	return {
		width: e * n,
		height: t * n,
		angle: window.screen.orientation?.angle ?? 0
	};
}
function Gr(e) {
	G.resizeTimeStamp <= e.timeStamp + 50 && (G.resizeTimeStamp = e.timeStamp + 150, window.clearTimeout(G.resizeTimeout), G.resizeTimeout = window.setTimeout(Kr, 150));
}
function Kr() {
	let e = Br("viewport");
	if (cr() && e?.includes("overlays-content")) return;
	let t = performance.now(), n = Wr(), r = t - G.startTimeStamp, i = G.screenHeight - n.height, a = G.screenAngle - n.angle;
	Math.abs(a) % 180 && G.screenWidth - n.height < Vr && (G.screenWidth = n.width, G.screenHeight = n.height, G.screenAngle = n.angle, i = 0), r > Hr && (window.clearTimeout(G.screenTimeout), G.screenTimeout = window.setTimeout(() => {
		let e = Zr(document.hasFocus() ? kn() : null), t = Wr();
		Math.abs(G.screenAngle - t.angle) % 180 || G.isOpen && e || (G.screenWidth = t.width, G.screenHeight = t.height, G.screenAngle = t.angle, G.isOpen = !1);
	}, Hr)), r <= Hr && i >= Vr && (G.endTimeStamp = t), G.isOpen = i >= Vr;
}
function qr() {
	let e = Wr(), t = G.screenAngle - e.angle;
	if (Math.abs(t) % 180 && !G.isOpen) {
		let e = G.screenWidth;
		G.screenWidth = G.screenHeight, G.screenHeight = e;
	}
	G.isOpen || (G.screenAngle = e.angle);
}
function Jr(e) {
	let t = Zr(W(e)), n = performance.now(), r = Wr(), i = G.screenHeight - r.height;
	i < Vr && t && (G.screenWidth = r.width, G.screenHeight = r.height, G.screenAngle = r.angle, G.startTimeStamp = n), t && window.clearTimeout(G.screenTimeout), i >= Vr && t && (G.endTimeStamp = n);
}
function Yr() {
	let e = Wr();
	Tn(window.visualViewport, "resize", or() ? Kr : Gr), Tn(window.screen.orientation, "change", qr), Tn(window, "focus", Jr, {
		capture: !0,
		passive: !0
	}), G.screenWidth = e.width, G.screenHeight = e.height, G.screenAngle = e.angle;
}
typeof document < "u" && (document.readyState === "loading" ? Tn(document, "DOMContentLoaded", Yr) : Yr());
function Xr() {
	let e = Br("viewport");
	return cr() && e?.includes("overlays-content") ? !1 : G.isOpen ? !0 : G.startTimeStamp ? G.endTimeStamp >= G.startTimeStamp ? !0 : performance.now() - G.startTimeStamp <= Hr ? G.endTimeStamp > 0 || window.navigator.maxTouchPoints > 0 : !1 : window.navigator.maxTouchPoints > 0;
}
function Zr(e) {
	if (!(e instanceof Element) || !Wn(e)) return !1;
	let t = e instanceof HTMLTextAreaElement, n = e instanceof HTMLElement && e.isContentEditable, r = e instanceof HTMLInputElement && !Ur.has(e.type);
	return t || n || r;
}
function Qr(e) {
	return tr() ? e.metaKey : e.ctrlKey;
}
function $r() {
	return G.isOpen;
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/useEffectEvent.mjs
var ei = w.useInsertionEffect ?? B;
function ti(e) {
	let t = (0, w.useRef)(null);
	return ei(() => {
		t.current = e;
	}, [e]), (0, w.useCallback)((...e) => {
		let n = t.current;
		return n?.(...e);
	}, []);
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/useEvent.mjs
function ni(e, t, n, r) {
	let i = ti(n), a = n == null;
	(0, w.useEffect)(() => {
		if (!(a || e.current == null)) return Tn(e.current, t, i, r);
	}, [
		e,
		t,
		r,
		a
	]);
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/useLabels.mjs
function ri(e, t) {
	let { id: n, "aria-label": r, "aria-labelledby": i } = e;
	return n = $t(n), i && r ? i = [.../* @__PURE__ */ new Set([n, ...i.trim().split(/\s+/)])].join(" ") : i &&= i.trim().split(/\s+/).join(" "), !r && !i && t && (r = t), {
		id: n,
		"aria-label": r,
		"aria-labelledby": i
	};
}
//#endregion
//#region node_modules/react-aria/dist/private/i18n/utils.mjs
var ii = /* @__PURE__ */ new Set([
	"Arab",
	"Syrc",
	"Samr",
	"Mand",
	"Thaa",
	"Mend",
	"Nkoo",
	"Adlm",
	"Rohg",
	"Hebr"
]), ai = /* @__PURE__ */ new Set([
	"ae",
	"ar",
	"arc",
	"bcc",
	"bqi",
	"ckb",
	"dv",
	"fa",
	"glk",
	"he",
	"ku",
	"mzn",
	"nqo",
	"pnb",
	"ps",
	"sd",
	"ug",
	"ur",
	"yi"
]);
function oi(e) {
	if (Intl.Locale) {
		let t = new Intl.Locale(e).maximize(), n = typeof t.getTextInfo == "function" ? t.getTextInfo() : t.textInfo;
		if (n) return n.direction === "rtl";
		if (t.script) return ii.has(t.script);
	}
	let t = e.split("-")[0];
	return ai.has(t);
}
//#endregion
//#region node_modules/react-aria/dist/private/i18n/useDefaultLocale.mjs
var si = Symbol.for("react-aria.i18n.locale");
function ci() {
	let e = typeof window < "u" && window[si] || typeof navigator < "u" && (navigator.language || navigator.userLanguage) || "en-US";
	try {
		Intl.DateTimeFormat.supportedLocalesOf([e]);
	} catch {
		e = "en-US";
	}
	return {
		locale: e,
		direction: oi(e) ? "rtl" : "ltr"
	};
}
var li = ci(), ui = /* @__PURE__ */ new Set();
function di() {
	li = ci();
	for (let e of ui) e(li);
}
function fi() {
	let e = qt(), [t, n] = (0, w.useState)(li);
	return (0, w.useEffect)(() => (ui.size === 0 && window.addEventListener("languagechange", di), ui.add(n), () => {
		ui.delete(n), ui.size === 0 && window.removeEventListener("languagechange", di);
	}), []), e ? {
		locale: typeof window < "u" && window[si] || "en-US",
		direction: "ltr"
	} : t;
}
//#endregion
//#region node_modules/react-aria/dist/private/i18n/I18nProvider.mjs
var pi = /*#__PURE__*/ w.createContext(null);
function mi() {
	let e = fi();
	return (0, w.useContext)(pi) || e;
}
//#endregion
//#region node_modules/@internationalized/string/dist/private/LocalizedStringDictionary.mjs
var hi = Symbol.for("react-aria.i18n.locale"), gi = Symbol.for("react-aria.i18n.strings"), _i = void 0, vi = class e {
	constructor(e, t = "en-US") {
		this.strings = Object.fromEntries(Object.entries(e).filter(([, e]) => e)), this.defaultLocale = t;
	}
	getStringForLocale(e, t) {
		let n = this.getStringsForLocale(t)[e];
		if (!n) throw Error(`Could not find intl message ${e} in ${t} locale`);
		return n;
	}
	getStringsForLocale(e) {
		let t = this.strings[e];
		return t || (t = yi(e, this.strings, this.defaultLocale), this.strings[e] = t), t;
	}
	static getGlobalDictionaryForPackage(t) {
		if (typeof window > "u") return null;
		let n = window[hi];
		if (_i === void 0) {
			let t = window[gi];
			if (!t) return null;
			_i = {};
			for (let r in t) _i[r] = new e({ [n]: t[r] }, n);
		}
		let r = _i?.[t];
		if (!r) throw Error(`Strings for package "${t}" were not included by LocalizedStringProvider. Please add it to the list passed to createLocalizedStringDictionary.`);
		return r;
	}
};
function yi(e, t, n = "en-US") {
	if (t[e]) return t[e];
	let r = bi(e), i = xi(e);
	if (i && t[`${r}-${i}`]) return t[`${r}-${i}`];
	if (t[r]) return t[r];
	for (let e in t) if (e.startsWith(r + "-")) return t[e];
	return t[n];
}
function bi(e) {
	return Intl.Locale ? new Intl.Locale(e).language : e.split("-")[0];
}
function xi(e) {
	if (Intl.Locale) return new Intl.Locale(e).script;
}
//#endregion
//#region node_modules/@internationalized/string/dist/private/LocalizedStringFormatter.mjs
var Si = /* @__PURE__ */ new Map(), Ci = /* @__PURE__ */ new Map(), wi = class {
	constructor(e, t) {
		this.locale = e, this.strings = t;
	}
	format(e, t) {
		let n = this.strings.getStringForLocale(e, this.locale);
		return typeof n == "function" ? n(t, this) : n;
	}
	plural(e, t, n = "cardinal") {
		let r = t["=" + e];
		if (r) return typeof r == "function" ? r() : r;
		let i = this.locale + ":" + n, a = Si.get(i);
		return a || (a = new Intl.PluralRules(this.locale, { type: n }), Si.set(i, a)), r = t[a.select(e)] || t.other, typeof r == "function" ? r() : r;
	}
	number(e) {
		let t = Ci.get(this.locale);
		return t || (t = new Intl.NumberFormat(this.locale), Ci.set(this.locale, t)), t.format(e);
	}
	select(e, t) {
		let n = e[t] || e.other;
		return typeof n == "function" ? n() : n;
	}
}, Ti = /* @__PURE__ */ new WeakMap();
function Ei(e) {
	let t = Ti.get(e);
	return t || (t = new vi(e), Ti.set(e, t)), t;
}
function Di(e, t) {
	return t && vi.getGlobalDictionaryForPackage(t) || Ei(e);
}
function Oi(e, t) {
	let { locale: n } = mi(), r = Di(e, t);
	return (0, w.useMemo)(() => new wi(n, r), [n, r]);
}
//#endregion
//#region node_modules/react-stately/dist/private/utils/useControlledState.mjs
var ki = w.useInsertionEffect ?? w.useLayoutEffect;
function Ai(e, t, n) {
	let [r, i] = (0, w.useState)(e || t), a = (0, w.useRef)(r), o = (0, w.useRef)(e !== void 0), s = e !== void 0;
	(0, w.useEffect)(() => {
		o.current, o.current = s;
	}, [s]);
	let c = s ? e : r;
	ki(() => {
		a.current = c;
	});
	let [, l] = (0, w.useReducer)(() => ({}), {});
	return [c, (0, w.useCallback)((e, ...t) => {
		let r = typeof e == "function" ? e(a.current) : e;
		Object.is(a.current, r) || (a.current = r, i(r), l(), n?.(r, ...t));
	}, [n])];
}
//#endregion
//#region node_modules/react-aria-components/dist/private/Autocomplete.mjs
var ji = /*#__PURE__*/ (0, w.createContext)(null), Mi = /*#__PURE__*/ (0, w.createContext)(null), Ni = class {
	constructor(e) {
		this.value = null, this.level = 0, this.hasChildNodes = !1, this.rendered = null, this.textValue = "", this["aria-label"] = void 0, this.index = 0, this.parentKey = null, this.prevKey = null, this.nextKey = null, this.firstChildKey = null, this.lastChildKey = null, this.props = {}, this.colSpan = null, this.colIndex = null, this.type = this.constructor.type, this.key = e;
	}
	get childNodes() {
		throw Error("childNodes is not supported");
	}
	clone() {
		let e = new this.constructor(this.key);
		return e.value = this.value, e.level = this.level, e.hasChildNodes = this.hasChildNodes, e.rendered = this.rendered, e.textValue = this.textValue, e["aria-label"] = this["aria-label"], e.index = this.index, e.parentKey = this.parentKey, e.prevKey = this.prevKey, e.nextKey = this.nextKey, e.firstChildKey = this.firstChildKey, e.lastChildKey = this.lastChildKey, e.props = this.props, e.render = this.render, e.colSpan = this.colSpan, e.colIndex = this.colIndex, e;
	}
	filter(e, t, n) {
		let r = this.clone();
		return t.addDescendants(r, e), r;
	}
}, Pi = class extends Ni {
	filter(e, t, n) {
		let [r, i] = Ri(e, t, this.firstChildKey, n), a = this.clone();
		return a.firstChildKey = r, a.lastChildKey = i, a;
	}
};
(class extends Ni {
	static {
		this.type = "header";
	}
});
var Fi = class extends Ni {
	static {
		this.type = "loader";
	}
}, Ii = class extends Pi {
	static {
		this.type = "item";
	}
	filter(e, t, n) {
		if (n(this.textValue, this)) {
			let n = this.clone();
			return t.addDescendants(n, e), n;
		}
		return null;
	}
};
(class extends Pi {
	static {
		this.type = "section";
	}
	filter(e, t, n) {
		let r = super.filter(e, t, n);
		if (r && r.lastChildKey !== null) {
			let t = e.getItem(r.lastChildKey);
			if (t && t.type !== "header") return r;
		}
		return null;
	}
});
var Li = class {
	get size() {
		return this.itemCount;
	}
	getKeys() {
		return this.keyMap.keys();
	}
	*[Symbol.iterator]() {
		let e = this.firstKey == null ? void 0 : this.keyMap.get(this.firstKey);
		for (; e;) yield e, e = e.nextKey == null ? void 0 : this.keyMap.get(e.nextKey);
	}
	getChildren(e) {
		let t = this.keyMap;
		return { *[Symbol.iterator]() {
			let n = t.get(e), r = n?.firstChildKey == null ? null : t.get(n.firstChildKey);
			for (; r;) yield r, r = r.nextKey == null ? void 0 : t.get(r.nextKey);
		} };
	}
	getKeyBefore(e) {
		let t = this.keyMap.get(e);
		if (!t) return null;
		if (t.prevKey != null) {
			for (t = this.keyMap.get(t.prevKey); t && t.type !== "item" && t.lastChildKey != null;) t = this.keyMap.get(t.lastChildKey);
			return t?.key ?? null;
		}
		return t.parentKey;
	}
	getKeyAfter(e) {
		let t = this.keyMap.get(e);
		if (!t) return null;
		if (t.type !== "item" && t.firstChildKey != null) return t.firstChildKey;
		for (; t;) {
			if (t.nextKey != null) return t.nextKey;
			if (t.parentKey != null) t = this.keyMap.get(t.parentKey);
			else return null;
		}
		return null;
	}
	getFirstKey() {
		return this.firstKey;
	}
	getLastKey() {
		let e = this.lastKey == null ? null : this.keyMap.get(this.lastKey);
		for (; e?.lastChildKey != null;) e = this.keyMap.get(e.lastChildKey);
		return e?.key ?? null;
	}
	getItem(e) {
		return this.keyMap.get(e) ?? null;
	}
	at() {
		throw Error("Not implemented");
	}
	clone() {
		let e = this.constructor, t = new e();
		return t.keyMap = new Map(this.keyMap), t.firstKey = this.firstKey, t.lastKey = this.lastKey, t.itemCount = this.itemCount, t;
	}
	addNode(e) {
		if (this.frozen) throw Error("Cannot add a node to a frozen collection");
		e.type === "item" && this.keyMap.get(e.key) == null && this.itemCount++, this.keyMap.set(e.key, e);
	}
	addDescendants(e, t) {
		this.addNode(e);
		let n = t.getChildren(e.key);
		for (let e of n) this.addDescendants(e, t);
	}
	removeNode(e) {
		if (this.frozen) throw Error("Cannot remove a node to a frozen collection");
		let t = this.keyMap.get(e);
		t != null && t.type === "item" && this.itemCount--, this.keyMap.delete(e);
	}
	commit(e, t, n = !1) {
		if (this.frozen) throw Error("Cannot commit a frozen collection");
		this.firstKey = e, this.lastKey = t, this.frozen = !n;
	}
	filter(e) {
		let t = new this.constructor(), [n, r] = Ri(this, t, this.firstKey, e);
		return t?.commit(n, r), t;
	}
	constructor() {
		this.keyMap = /* @__PURE__ */ new Map(), this.firstKey = null, this.lastKey = null, this.frozen = !1, this.itemCount = 0;
	}
};
function Ri(e, t, n, r) {
	if (n == null) return [null, null];
	let i = null, a = null, o = e.getItem(n);
	for (; o != null;) {
		let n = o.filter(e, t, r);
		n != null && (n.nextKey = null, a && (n.prevKey = a.key, a.nextKey = n.key), i ??= n, t.addNode(n), a = n), o = o.nextKey == null ? null : e.getItem(o.nextKey);
	}
	if (a && a.type === "separator") {
		let e = a.prevKey;
		t.removeNode(a.key), e == null ? a = null : (a = t.getItem(e), a.nextKey = null);
	}
	return [i?.key ?? null, a?.key ?? null];
}
//#endregion
//#region node_modules/react-aria/dist/private/collections/Document.mjs
var zi = class {
	constructor(e) {
		this._firstChild = null, this._lastChild = null, this._previousSibling = null, this._nextSibling = null, this._parentNode = null, this._minInvalidChildIndex = null, this.ownerDocument = e;
	}
	*[Symbol.iterator]() {
		let e = this.firstChild;
		for (; e;) yield e, e = e.nextSibling;
	}
	get firstChild() {
		return this._firstChild;
	}
	set firstChild(e) {
		this._firstChild = e, this.ownerDocument.markDirty(this);
	}
	get lastChild() {
		return this._lastChild;
	}
	set lastChild(e) {
		this._lastChild = e, this.ownerDocument.markDirty(this);
	}
	get previousSibling() {
		return this._previousSibling;
	}
	set previousSibling(e) {
		this._previousSibling = e, this.ownerDocument.markDirty(this);
	}
	get nextSibling() {
		return this._nextSibling;
	}
	set nextSibling(e) {
		this._nextSibling = e, this.ownerDocument.markDirty(this);
	}
	get parentNode() {
		return this._parentNode;
	}
	set parentNode(e) {
		this._parentNode = e, this.ownerDocument.markDirty(this);
	}
	get isConnected() {
		return this.parentNode?.isConnected || !1;
	}
	invalidateChildIndices(e) {
		(this._minInvalidChildIndex == null || !this._minInvalidChildIndex.isConnected || e.index < this._minInvalidChildIndex.index) && (this._minInvalidChildIndex = e, this.ownerDocument.markDirty(this));
	}
	updateChildIndices() {
		let e = this._minInvalidChildIndex;
		for (; e;) e.index = e.previousSibling ? e.previousSibling.index + 1 : 0, e = e.nextSibling;
		this._minInvalidChildIndex = null;
	}
	appendChild(e) {
		e.parentNode && e.parentNode.removeChild(e), this.firstChild ??= e, this.lastChild ? (this.lastChild.nextSibling = e, e.index = this.lastChild.index + 1, e.previousSibling = this.lastChild) : (e.previousSibling = null, e.index = 0), e.parentNode = this, e.nextSibling = null, this.lastChild = e, this.ownerDocument.markDirty(this), this.isConnected && this.ownerDocument.queueUpdate();
	}
	insertBefore(e, t) {
		if (t == null) return this.appendChild(e);
		e.parentNode && e.parentNode.removeChild(e), e.nextSibling = t, e.previousSibling = t.previousSibling, e.index = t.index - 1, this.firstChild === t ? this.firstChild = e : t.previousSibling && (t.previousSibling.nextSibling = e), t.previousSibling = e, e.parentNode = t.parentNode, this.invalidateChildIndices(e), this.isConnected && this.ownerDocument.queueUpdate();
	}
	removeChild(e) {
		e.parentNode === this && (this._minInvalidChildIndex === e && (this._minInvalidChildIndex = null), e.nextSibling && (this.invalidateChildIndices(e.nextSibling), e.nextSibling.previousSibling = e.previousSibling), e.previousSibling && (e.previousSibling.nextSibling = e.nextSibling), this.firstChild === e && (this.firstChild = e.nextSibling), this.lastChild === e && (this.lastChild = e.previousSibling), e.parentNode = null, e.nextSibling = null, e.previousSibling = null, e.index = 0, this.ownerDocument.markDirty(e), this.isConnected && this.ownerDocument.queueUpdate());
	}
	addEventListener() {}
	removeEventListener() {}
	get previousVisibleSibling() {
		let e = this.previousSibling;
		for (; e && e.isHidden;) e = e.previousSibling;
		return e;
	}
	get nextVisibleSibling() {
		let e = this.nextSibling;
		for (; e && e.isHidden;) e = e.nextSibling;
		return e;
	}
	get firstVisibleChild() {
		let e = this.firstChild;
		for (; e && e.isHidden;) e = e.nextSibling;
		return e;
	}
	get lastVisibleChild() {
		let e = this.lastChild;
		for (; e && e.isHidden;) e = e.previousSibling;
		return e;
	}
}, Bi = class e extends zi {
	constructor(e, t) {
		super(t), this.nodeType = 8, this.isMutated = !0, this._index = 0, this.isHidden = !1, this.node = null;
	}
	get index() {
		return this._index;
	}
	set index(e) {
		this._index = e, this.ownerDocument.markDirty(this);
	}
	get level() {
		return this.parentNode instanceof e ? this.parentNode.level + +(this.parentNode.node?.type === "item") : 0;
	}
	getMutableNode() {
		return this.node == null ? null : (this.isMutated ||= (this.node = this.node.clone(), !0), this.ownerDocument.markDirty(this), this.node);
	}
	updateNode() {
		let t = this.nextVisibleSibling, n = this.getMutableNode();
		if (n != null && (n.index = this.index, n.level = this.level, n.parentKey = this.parentNode instanceof e ? this.parentNode.node?.key ?? null : null, n.prevKey = this.previousVisibleSibling?.node?.key ?? null, n.nextKey = t?.node?.key ?? null, n.hasChildNodes = !!this.firstChild, n.firstChildKey = this.firstVisibleChild?.node?.key ?? null, n.lastChildKey = this.lastVisibleChild?.node?.key ?? null, (n.colSpan != null || n.colIndex != null) && t)) {
			let e = (n.colIndex ?? n.index) + (n.colSpan ?? 1);
			if (t.node != null && e !== t.node.colIndex) {
				let n = t.getMutableNode();
				n.colIndex = e;
			}
		}
	}
	setProps(e, t, n, r, i) {
		let a, { value: o, textValue: s, id: c, ...l } = e;
		if (this.node == null ? (a = new n(c ?? `react-aria-${++this.ownerDocument.nodeId}`), this.node = a) : a = this.getMutableNode(), l.ref = t, a.props = l, a.rendered = r, a.render = i, a.value = o, e["aria-label"] && (a["aria-label"] = e["aria-label"]), a.textValue = s || (typeof l.children == "string" ? l.children : "") || e["aria-label"] || "", c != null && c !== a.key) throw Error("Cannot change the id of an item");
		l.colSpan != null && (a.colSpan = l.colSpan), this.isConnected && this.ownerDocument.queueUpdate();
	}
	get style() {
		let e = this;
		return {
			get display() {
				return e.isHidden ? "none" : "";
			},
			set display(t) {
				let n = t === "none";
				if (e.isHidden !== n) {
					(e.parentNode?.firstVisibleChild === e || e.parentNode?.lastVisibleChild === e) && e.ownerDocument.markDirty(e.parentNode);
					let t = e.previousVisibleSibling, r = e.nextVisibleSibling;
					t && e.ownerDocument.markDirty(t), r && e.ownerDocument.markDirty(r), e.isHidden = n, e.ownerDocument.markDirty(e);
				}
			}
		};
	}
	hasAttribute() {}
	setAttribute() {}
	setAttributeNS() {}
	removeAttribute() {}
}, Vi = class extends zi {
	constructor(e) {
		super(null), this.nodeType = 11, this.ownerDocument = this, this.dirtyNodes = /* @__PURE__ */ new Set(), this.isSSR = !1, this.nodeId = 0, this.nodesByProps = /* @__PURE__ */ new WeakMap(), this.keyOwners = /* @__PURE__ */ new Map(), this.nextCollection = null, this.subscriptions = /* @__PURE__ */ new Set(), this.queuedRender = !1, this.inSubscription = !1, this.collection = e, this.nextCollection = e;
	}
	get isConnected() {
		return !0;
	}
	createElement(e) {
		return new Bi(e, this);
	}
	getMutableCollection() {
		return this.nextCollection ||= this.collection.clone(), this.nextCollection;
	}
	markDirty(e) {
		this.dirtyNodes.add(e);
	}
	addNode(e) {
		if (e.isHidden || e.node == null) return;
		let t = this.getMutableCollection();
		if (!t.getItem(e.node.key)) for (let t of e) this.addNode(t);
		t.addNode(e.node);
	}
	removeNode(e) {
		for (let t of e) this.removeNode(t);
		e.node && this.getMutableCollection().removeNode(e.node.key);
	}
	getCollection() {
		return this.inSubscription || (this.queuedRender = !1, this.updateCollection()), this.collection;
	}
	updateCollection() {
		for (let e of this.dirtyNodes) e instanceof Bi && (!e.isConnected || e.isHidden) ? this.removeNode(e) : e.updateChildIndices();
		for (let e of this.dirtyNodes) e instanceof Bi ? (e.isConnected && !e.isHidden && (e.updateNode(), this.addNode(e)), e.node && this.dirtyNodes.delete(e), e.isMutated = !1) : this.dirtyNodes.delete(e);
		this.nextCollection && (this.nextCollection.commit(this.firstVisibleChild?.node?.key ?? null, this.lastVisibleChild?.node?.key ?? null, this.isSSR), this.isSSR || (this.collection = this.nextCollection, this.nextCollection = null));
	}
	queueUpdate() {
		if (!(this.dirtyNodes.size === 0 || this.queuedRender)) {
			this.queuedRender = !0, this.inSubscription = !0, this.isSSR || (this.collection = this.collection.clone());
			for (let e of this.subscriptions) e();
			this.inSubscription = !1;
		}
	}
	subscribe(e) {
		return this.subscriptions.add(e), this.queuedRender && e(), () => this.subscriptions.delete(e);
	}
	resetAfterSSR() {
		this.isSSR && (this.isSSR = !1, this.firstChild = null, this.lastChild = null, this.nodeId = 0, this.keyOwners.clear());
	}
};
//#endregion
//#region node_modules/react-aria/dist/private/collections/useCachedChildren.mjs
function Hi(e) {
	let { children: t, items: n, idScope: r, addIdAndValue: i, dependencies: a = [] } = e, o = (0, w.useMemo)(() => void 0, [t]), s = (0, w.useMemo)(() => /* @__PURE__ */ new WeakMap(), [...a, o]);
	return (0, w.useMemo)(() => {
		if (n && typeof t == "function") {
			let e = [];
			for (let a of n) {
				let n = Ui(a) ? a : null, o = n ? s.get(n) : null;
				if (!o) {
					o = t(a);
					let c = o.props.id ?? a?.key ?? a?.id;
					r != null && o.props.id == null && c != null && (c = r + ":" + c);
					let l = c ?? e.length;
					o = (0, w.cloneElement)(o, i ? {
						key: l,
						id: c,
						value: a
					} : { key: l }), n && s.set(n, o);
				}
				e.push(o);
			}
			return e;
		}
		if (typeof t != "function") return t;
	}, [
		t,
		n,
		s,
		r,
		i
	]);
}
function Ui(e) {
	switch (typeof e) {
		case "object": return e != null;
		case "function":
		case "symbol": return !0;
		default: return !1;
	}
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/runAfterTransition.mjs
var Wi = /* @__PURE__ */ new Map(), Gi = /* @__PURE__ */ new Set();
function Ki(e) {
	return "propertyName" in e;
}
function qi(e) {
	let t = W(e);
	if (!Ki(e) || !t) return;
	let n = Wi.get(t);
	n || (n = /* @__PURE__ */ new Set(), Wi.set(t, n), t.addEventListener("transitioncancel", Ji, { once: !0 })), n.add(e.propertyName);
}
function Ji(e) {
	let t = W(e);
	if (!Ki(e) || !t) return;
	let n = Wi.get(t);
	if (n && (n.delete(e.propertyName), n.size === 0 && (t.removeEventListener("transitioncancel", Ji), Wi.delete(t)), Wi.size === 0)) for (let e of Gi) e(!0), Gi.delete(e);
}
function Yi() {
	Tn(document, "transitionrun", qi), Tn(document, "transitionend", Ji);
}
function Xi() {
	for (let [e] of Wi) "isConnected" in e && !e.isConnected && Wi.delete(e);
}
typeof document < "u" && (document.readyState === "loading" ? Tn(document, "DOMContentLoaded", Yi) : Yi());
function Zi(e) {
	let t = window.requestAnimationFrame(() => {
		if (Xi(), Wi.size === 0) return e(!1);
		Gi.add(e);
	});
	return () => {
		window.cancelAnimationFrame(t), Gi.delete(e);
	};
}
//#endregion
//#region node_modules/react-aria/dist/private/interactions/focusSafely.mjs
function Qi(e) {
	if (!e.isConnected) return;
	let t = H(e);
	if (Fr() === "virtual") {
		let n = kn(t);
		Zi(() => {
			let r = kn(t);
			(r === n || r === t.body) && e.isConnected && In(e);
		});
	} else In(e);
}
//#endregion
//#region node_modules/react-aria/dist/private/interactions/useFocus.mjs
function K(e) {
	let { isDisabled: t, onFocus: n, onBlur: r, onFocusChange: i } = e, a = (0, w.useCallback)((e) => {
		if (W(e) === e.currentTarget) return r && r(e), i && i(!1), !0;
	}, [r, i]), o = Yn(a), s = (0, w.useCallback)((e) => {
		let t = W(e), r = H(t), a = r ? kn(r) : kn();
		t === e.currentTarget && t === a && (n && n(e), i && i(!0), o(e));
	}, [
		i,
		n,
		o
	]);
	return { focusProps: {
		onFocus: !t && (n || i || r) ? s : void 0,
		onBlur: !t && (r || i) ? a : void 0
	} };
}
//#endregion
//#region node_modules/react-aria/dist/private/interactions/createEventHandler.mjs
function $i(e) {
	if (e) return (t) => {
		let n = !0;
		e({
			...t,
			preventDefault() {
				t.preventDefault();
			},
			isDefaultPrevented() {
				return t.isDefaultPrevented();
			},
			stopPropagation() {
				n = !0;
			},
			continuePropagation() {
				n = !1, typeof t.continuePropagation == "function" && t.continuePropagation();
			},
			isPropagationStopped() {
				return n;
			}
		}), n && !(typeof t.isPropagationStopped == "function" && t.isPropagationStopped()) && t.stopPropagation();
	};
}
//#endregion
//#region node_modules/react-aria/dist/private/interactions/createKeyboardShortcutHandler.mjs
var ea = /* @__PURE__ */ new Set([
	"shift",
	"alt",
	"control",
	"meta",
	"mod"
]), ta = [
	"Alt",
	"Control",
	"Meta",
	"Shift"
];
function na(e) {
	let t = /* @__PURE__ */ new Set();
	return e.alt && t.add("Alt"), e.shift && t.add("Shift"), e.ctrl && t.add("Control"), e.meta && t.add("Meta"), e.mod && t.add(tr() ? "Meta" : "Control"), t;
}
function ra(e) {
	let t = /* @__PURE__ */ new Set();
	return e.altKey && t.add("Alt"), e.ctrlKey && t.add("Control"), e.metaKey && t.add("Meta"), e.shiftKey && t.add("Shift"), t;
}
function ia(e) {
	return ta.filter((t) => e.has(t));
}
function aa(e) {
	let t = e.split("+").reduce((e, t) => {
		let n = t.toLowerCase();
		return ea.has(n) ? n === "shift" ? e.shift = !0 : n === "alt" ? e.alt = !0 : n === "control" ? e.ctrl = !0 : n === "meta" ? e.meta = !0 : n === "mod" && (e.mod = !0) : e.key = t, e;
	}, {
		shift: !1,
		alt: !1,
		ctrl: !1,
		meta: !1,
		mod: !1,
		key: ""
	});
	if (t.key === "") throw Error(`Invalid keyboard shortcut: "${e}". Must include exactly one non-modifier key (e.g. "a", "Enter", "ArrowDown"). Combine any of Shift, Alt, Ctrl, Meta, and Mod.`);
	return t;
}
function oa(e) {
	return e.toLowerCase();
}
var sa = {
	space: " ",
	esc: "escape",
	del: "delete",
	ins: "insert",
	left: "arrowleft",
	right: "arrowright",
	up: "arrowup",
	down: "arrowdown",
	pageup: "pageup",
	pagedown: "pagedown"
};
function ca(e) {
	let t = oa(e);
	return sa[t] ?? t;
}
function la(e) {
	let t = ia(na(e)), n = ca(e.key);
	return t.length > 0 ? `${t.join("+")}+${n}` : n;
}
function ua(e) {
	let t = ia(ra(e)), n = oa(e.key);
	return (t.length > 0 ? `${t.join("+")}+` : "") + n;
}
function da(e) {
	let t = /* @__PURE__ */ new Map();
	for (let [n, r] of Object.entries(e)) {
		let e = aa(n);
		t.set(la(e), r);
	}
	return (e) => {
		let n = ua(e), r = t.get(n), i = r?.(e);
		i === void 0 && r !== void 0 ? i = {
			shouldContinuePropagation: !1,
			shouldPreventDefault: !0
		} : typeof i == "boolean" && (i = {
			shouldContinuePropagation: !i,
			shouldPreventDefault: i
		}), i?.shouldPreventDefault && e.preventDefault(), (!r || i?.shouldContinuePropagation) && e.continuePropagation();
	};
}
//#endregion
//#region node_modules/react-aria/dist/private/interactions/useKeyboard.mjs
function fa(e) {
	let { shortcuts: t, allowRepeats: n = !1, allowComposing: r = !1 } = e, i, a;
	if (t) {
		let o = da(t), s = $i((e) => {
			U(e.currentTarget, W(e)) ? e.nativeEvent?.repeat && !n || e.nativeEvent?.isComposing && !r ? e.continuePropagation() : o(e) : e.continuePropagation();
		}), c = $i((e) => {
			U(e.currentTarget, W(e)) && (e.nativeEvent?.repeat && !n || e.nativeEvent?.isComposing), e.continuePropagation();
		});
		i = e.onKeyDown ? Ft(e.onKeyDown, s) : s, a = e.onKeyUp ? Ft(e.onKeyUp, c) : c;
	} else i = $i(e.onKeyDown), a = $i(e.onKeyUp);
	return { keyboardProps: e.isDisabled ? {} : {
		onKeyDown: i,
		onKeyUp: a
	} };
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/useSyncRef.mjs
function pa(e, t) {
	B(() => {
		if (e && e.ref && t) return e.ref.current = t.current, () => {
			e.ref && (e.ref.current = null);
		};
	});
}
//#endregion
//#region node_modules/react-aria/dist/private/interactions/useFocusable.mjs
var ma = /*#__PURE__*/ w.createContext(null);
function ha(e) {
	let t = (0, w.useContext)(ma) || {};
	pa(t, e);
	let { ref: n, ...r } = t;
	return r;
}
function ga(e, t) {
	let { focusProps: n } = K(e), { keyboardProps: r } = fa(e), i = V(n, r), a = ha(t), o = e.isDisabled ? {} : a, s = (0, w.useRef)(e.autoFocus);
	(0, w.useEffect)(() => {
		s.current && t.current && Qi(t.current), s.current = !1;
	}, [t]);
	let c = e.excludeFromTabOrder ? -1 : 0;
	return e.isDisabled && (c = void 0), { focusableProps: V({
		...i,
		tabIndex: c
	}, o) };
}
//#endregion
//#region node_modules/react-aria/dist/private/collections/Hidden.mjs
typeof HTMLTemplateElement < "u" && (Object.defineProperty(HTMLTemplateElement.prototype, "firstChild", {
	configurable: !0,
	enumerable: !0,
	get: function() {
		return this.content.firstChild;
	}
}), Object.defineProperty(HTMLTemplateElement.prototype, "appendChild", {
	configurable: !0,
	enumerable: !0,
	value: function(e) {
		return this.content.appendChild(e);
	}
}), Object.defineProperty(HTMLTemplateElement.prototype, "removeChild", {
	configurable: !0,
	enumerable: !0,
	value: function(e) {
		return this.content.removeChild(e);
	}
}), Object.defineProperty(HTMLTemplateElement.prototype, "insertBefore", {
	configurable: !0,
	enumerable: !0,
	value: function(e, t) {
		return this.content.insertBefore(e, t);
	}
}));
var _a = /*#__PURE__*/ (0, w.createContext)(!1);
function va(e) {
	if ((0, w.useContext)(_a)) return /*#__PURE__*/ w.createElement(w.Fragment, null, e.children);
	let t = /*#__PURE__*/ w.createElement(_a.Provider, { value: !0 }, e.children);
	return /*#__PURE__*/ w.createElement("template", null, t);
}
function ya(e) {
	let t = (t, n) => (0, w.useContext)(_a) ? null : e(t, n);
	return t.displayName = e.displayName || e.name, (0, w.forwardRef)(t);
}
function ba() {
	return (0, w.useContext)(_a);
}
//#endregion
//#region node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.production.js
var xa = /* @__PURE__ */ o(((e) => {
	var t = y();
	function n(e, t) {
		return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t;
	}
	var r = typeof Object.is == "function" ? Object.is : n, i = t.useState, a = t.useEffect, o = t.useLayoutEffect, s = t.useDebugValue;
	function c(e, t) {
		var n = t(), r = i({ inst: {
			value: n,
			getSnapshot: t
		} }), c = r[0].inst, u = r[1];
		return o(function() {
			c.value = n, c.getSnapshot = t, l(c) && u({ inst: c });
		}, [
			e,
			n,
			t
		]), a(function() {
			return l(c) && u({ inst: c }), e(function() {
				l(c) && u({ inst: c });
			});
		}, [e]), s(n), n;
	}
	function l(e) {
		var t = e.getSnapshot;
		e = e.value;
		try {
			var n = t();
			return !r(e, n);
		} catch {
			return !0;
		}
	}
	function u(e, t) {
		return t();
	}
	var d = typeof window > "u" || window.document === void 0 || window.document.createElement === void 0 ? u : c;
	e.useSyncExternalStore = t.useSyncExternalStore === void 0 ? d : t.useSyncExternalStore;
})), Sa = /* @__PURE__ */ o(((e, t) => {
	t.exports = xa();
})), Ca = /* @__PURE__ */ c(x(), 1), wa = Sa(), Ta = /*#__PURE__*/ (0, w.createContext)(!1), Ea = /*#__PURE__*/ (0, w.createContext)(null);
function Da(e) {
	if ((0, w.useContext)(Ea)) return e.content;
	let { collection: t, document: n } = ja(e.createCollection);
	return /*#__PURE__*/ w.createElement(w.Fragment, null, /*#__PURE__*/ w.createElement(va, null, /*#__PURE__*/ w.createElement(Ea.Provider, { value: n }, e.content)), /*#__PURE__*/ w.createElement(Oa, {
		render: e.children,
		collection: t
	}));
}
function Oa({ collection: e, render: t }) {
	return t(e);
}
function ka(e, t, n) {
	let r = qt(), i = (0, w.useRef)(r);
	i.current = r;
	let a = (0, w.useCallback)(() => i.current ? n() : t(), [t, n]);
	return (0, wa.useSyncExternalStore)(e, a);
}
var Aa = typeof w.useSyncExternalStore == "function" ? w.useSyncExternalStore : ka;
function ja(e) {
	let [t] = (0, w.useState)(() => new Vi(e?.() || new Li()));
	return {
		collection: Aa((0, w.useCallback)((e) => t.subscribe(e), [t]), (0, w.useCallback)(() => {
			let e = t.getCollection();
			return t.isSSR && t.resetAfterSSR(), e;
		}, [t]), (0, w.useCallback)(() => (t.isSSR = !0, t.getCollection()), [t])),
		document: t
	};
}
var Ma = /*#__PURE__*/ (0, w.createContext)(null);
function Na(e) {
	return class extends Ni {
		static {
			this.type = e;
		}
	};
}
function Pa(e, t, n, r, i, a) {
	typeof e == "string" && (e = Na(e));
	let o = (0, w.useCallback)((i) => {
		i?.setProps(t, n, e, r, a);
	}, [
		t,
		n,
		r,
		a,
		e
	]), s = (0, w.useContext)(Ma);
	if (s) {
		let o = s.ownerDocument.nodesByProps.get(t);
		return o || (o = s.ownerDocument.createElement(e.type), o.setProps(t, n, e, r, a), s.appendChild(o), s.ownerDocument.updateCollection(), s.ownerDocument.nodesByProps.set(t, o)), i ? /*#__PURE__*/ w.createElement(Ma.Provider, { value: o }, i) : null;
	}
	return /*#__PURE__*/ w.createElement(e.type, { ref: o }, i);
}
function Fa(e, t) {
	let n = ({ node: e }) => t(e.props, e.props.ref, e), r = (0, w.forwardRef)((r, i) => {
		let a = (0, w.useContext)(ma);
		if (!(0, w.useContext)(Ta)) {
			if (t.length >= 3) throw Error(t.name + " cannot be rendered outside a collection.");
			return t(r, i);
		}
		return Pa(e, r, i, "children" in r ? r.children : null, null, (e) => /*#__PURE__*/ w.createElement(ma.Provider, { value: a }, /*#__PURE__*/ w.createElement(n, { node: e })));
	});
	return r.displayName = t.name, r;
}
function Ia(e) {
	return Hi({
		...e,
		addIdAndValue: !0
	});
}
var La = /*#__PURE__*/ (0, w.createContext)(null);
function Ra(e) {
	let t = (0, w.useContext)(La), n = (t?.dependencies || []).concat(e.dependencies), r = e.idScope ?? t?.idScope, i = Ia({
		...e,
		idScope: r,
		dependencies: n
	});
	return (0, w.useContext)(Ea) && (i = /*#__PURE__*/ w.createElement(za, null, i)), t = (0, w.useMemo)(() => ({
		dependencies: n,
		idScope: r
	}), [r, ...n]), /*#__PURE__*/ w.createElement(La.Provider, { value: t }, i);
}
function za({ children: e }) {
	let t = (0, w.useContext)(Ea), n = (0, w.useMemo)(() => /*#__PURE__*/ w.createElement(Ea.Provider, { value: null }, /*#__PURE__*/ w.createElement(Ta.Provider, { value: !0 }, e)), [e]);
	return qt() ? /*#__PURE__*/ w.createElement(Ma.Provider, { value: t }, n) : /*#__PURE__*/ (0, Ca.createPortal)(n, t);
}
//#endregion
//#region node_modules/react-aria-components/dist/private/Collection.mjs
var Ba = /*#__PURE__*/ (0, w.createContext)(null), Va = {
	CollectionRoot({ collection: e, renderDropIndicator: t }) {
		return Ha(e, null, t);
	},
	CollectionBranch({ collection: e, parent: t, renderDropIndicator: n }) {
		return Ha(e, t, n);
	}
};
function Ha(e, t, n) {
	return Hi({
		items: t ? e.getChildren(t.key) : e,
		dependencies: [n],
		children(t) {
			if (t.type === "content") return /*#__PURE__*/ w.createElement(w.Fragment, null);
			let r = t.render(t);
			return !n || t.type !== "item" ? r : /*#__PURE__*/ w.createElement(w.Fragment, null, n({
				type: "item",
				key: t.key,
				dropPosition: "before"
			}), r, Ua(e, t, n));
		}
	});
}
function Ua(e, t, n) {
	let r = t.key, i = e.getKeyAfter(r), a = i == null ? null : e.getItem(i);
	for (; a != null && a.type !== "item";) i = e.getKeyAfter(a.key), a = i == null ? null : e.getItem(i);
	let o = t.nextKey == null ? null : e.getItem(t.nextKey);
	for (; o != null && o.type !== "item";) o = o.nextKey == null ? null : e.getItem(o.nextKey);
	let s = [];
	if (o == null) {
		let r = t;
		for (; r?.type === "item" && (!a || r.parentKey !== a.parentKey && a.level < r.level);) {
			let t = n({
				type: "item",
				key: r.key,
				dropPosition: "after"
			});
			/*#__PURE__*/ (0, w.isValidElement)(t) && s.push(/*#__PURE__*/ (0, w.cloneElement)(t, { key: `${r.key}-after` })), r = r.parentKey == null ? null : e.getItem(r.parentKey);
		}
	}
	return s;
}
var Wa = /*#__PURE__*/ (0, w.createContext)(Va), Ga = /* @__PURE__ */ new Set(["id"]), Ka = /* @__PURE__ */ new Set([
	"aria-label",
	"aria-labelledby",
	"aria-describedby",
	"aria-details"
]), qa = /* @__PURE__ */ new Set([
	"href",
	"hrefLang",
	"target",
	"rel",
	"download",
	"ping",
	"referrerPolicy"
]), Ja = /* @__PURE__ */ new Set([
	"dir",
	"lang",
	"hidden",
	"inert",
	"translate",
	"suppressHydrationWarning"
]), Ya = /* @__PURE__ */ new Set(/* @__PURE__ */ "onClick.onAuxClick.onContextMenu.onDoubleClick.onMouseDown.onMouseEnter.onMouseLeave.onMouseMove.onMouseOut.onMouseOver.onMouseUp.onTouchCancel.onTouchEnd.onTouchMove.onTouchStart.onPointerDown.onPointerMove.onPointerUp.onPointerCancel.onPointerEnter.onPointerLeave.onPointerOver.onPointerOut.onGotPointerCapture.onLostPointerCapture.onScroll.onWheel.onAnimationStart.onAnimationEnd.onAnimationIteration.onTransitionCancel.onTransitionEnd.onTransitionRun.onTransitionStart".split(".")), Xa = /^(data-.*)$/;
function Za(e, t = {}) {
	let { labelable: n, isLink: r, global: i, events: a = i, propNames: o } = t, s = {};
	for (let t in e) Object.prototype.hasOwnProperty.call(e, t) && (Ga.has(t) || n && Ka.has(t) || r && qa.has(t) || i && Ja.has(t) || a && (Ya.has(t) || t.endsWith("Capture") && Ya.has(t.slice(0, -7))) || o?.has(t) || Xa.test(t)) && (s[t] = e[t]);
	return s;
}
//#endregion
//#region node_modules/react-aria/dist/private/interactions/textSelection.mjs
var Qa = "default", $a = "", eo = /* @__PURE__ */ new WeakMap();
function to(e) {
	if (ir() && or()) {
		if (Qa === "default") {
			let t = H(e);
			$a = t.documentElement.style.webkitUserSelect, t.documentElement.style.webkitUserSelect = "none";
		}
		Qa = "disabled";
	} else if (e instanceof HTMLElement || e instanceof SVGElement) {
		let t = "userSelect" in e.style ? "userSelect" : "webkitUserSelect";
		eo.set(e, e.style[t]), e.style[t] = "none";
	}
}
function no(e) {
	if (ir() && or()) {
		if (Qa !== "disabled") return;
		Qa = "restoring", setTimeout(() => {
			Zi(() => {
				if (Qa === "restoring") {
					let t = H(e);
					t.documentElement.style.webkitUserSelect === "none" && (t.documentElement.style.webkitUserSelect = $a || ""), $a = "", Qa = "default";
				}
			});
		}, 300);
	} else if ((e instanceof HTMLElement || e instanceof SVGElement) && e && eo.has(e)) {
		let t = eo.get(e), n = "userSelect" in e.style ? "userSelect" : "webkitUserSelect";
		e.style[n] === "none" && (e.style[n] = t), e.getAttribute("style") === "" && e.removeAttribute("style"), eo.delete(e);
	}
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/getNonce.mjs
var ro = /* @__PURE__ */ new WeakMap();
function io(e) {
	let t = H(e), n = ro.get(t);
	return n ??= Br("csp-nonce", t), n !== void 0 && ro.set(t, n), n;
}
//#endregion
//#region node_modules/react-aria/dist/private/interactions/context.mjs
var ao = w.createContext({ register: () => {} });
ao.displayName = "PressResponderContext";
//#endregion
//#region node_modules/react-aria/dist/private/utils/useGlobalListeners.mjs
function oo() {
	let e = (0, w.useRef)(/* @__PURE__ */ new Map()), t = (0, w.useCallback)((t, n, r, i) => {
		let a = i?.once ? (...t) => {
			e.current.delete(r), r(...t);
		} : r;
		e.current.set(r, {
			type: n,
			eventTarget: t,
			fn: a,
			options: i
		}), t.addEventListener(n, a, i);
	}, []), n = (0, w.useCallback)((t, n, r, i) => {
		let a = e.current.get(r)?.fn || r;
		t.removeEventListener(n, a, i), e.current.delete(r);
	}, []), r = (0, w.useCallback)(() => {
		e.current.forEach((e, t) => {
			n(e.eventTarget, e.type, t, e.options);
		});
	}, [n]);
	return (0, w.useEffect)(() => r, [r]), {
		addGlobalListener: t,
		removeGlobalListener: n,
		removeAllGlobalListeners: r
	};
}
//#endregion
//#region node_modules/react-aria/dist/private/interactions/usePress.mjs
function so(e) {
	let t = (0, w.useContext)(ao);
	if (t) {
		let { register: n, ref: r, ...i } = t;
		e = V(i, e), n();
	}
	return pa(t, e.ref), e;
}
var co = class {
	#e;
	constructor(e, t, n, r) {
		this.#e = !0;
		let i = (r?.target ?? n.currentTarget)?.getBoundingClientRect(), a, o = 0, s, c = null;
		n.clientX != null && n.clientY != null && (s = n.clientX, c = n.clientY), i && (s != null && c != null ? (a = s - i.left, o = c - i.top) : (a = i.width / 2, o = i.height / 2)), this.type = e, this.pointerType = t, this.target = n.currentTarget, this.shiftKey = n.shiftKey, this.metaKey = n.metaKey, this.ctrlKey = n.ctrlKey, this.altKey = n.altKey, this.x = a, this.y = o, this.key = n.key;
	}
	continuePropagation() {
		this.#e = !1;
	}
	get shouldStopPropagation() {
		return this.#e;
	}
}, lo = Symbol("linkClicked"), uo = "react-aria-pressable-style", fo = "data-react-aria-pressable";
function po(e) {
	let { onPress: t, onPressChange: n, onPressStart: r, onPressEnd: i, onPressUp: a, onClick: o, isDisabled: s, isPressed: c, preventFocusOnPress: l, shouldCancelOnPointerExit: u, allowTextSelectionOnPress: d, ref: f, ...p } = so(e), [m, h] = (0, w.useState)(!1), g = (0, w.useRef)({
		isPressed: !1,
		ignoreEmulatedMouseEvents: !1,
		didFirePressStart: !1,
		isTriggeringEvent: !1,
		activePointerId: null,
		target: null,
		isOverTarget: !1,
		pointerType: null,
		disposables: []
	}), { addGlobalListener: _, removeAllGlobalListeners: v } = oo(), y = (0, w.useCallback)((e, t) => {
		let i = g.current;
		if (s || i.didFirePressStart) return !1;
		let a = !0;
		if (i.isTriggeringEvent = !0, r) {
			let n = new co("pressstart", t, e);
			r(n), a = n.shouldStopPropagation;
		}
		return n && n(!0), i.isTriggeringEvent = !1, i.didFirePressStart = !0, h(!0), a;
	}, [
		s,
		r,
		n
	]), b = (0, w.useCallback)((e, r, a = !0) => {
		let o = g.current;
		if (!o.didFirePressStart) return !1;
		o.didFirePressStart = !1, o.isTriggeringEvent = !0;
		let c = !0;
		if (i) {
			let t = new co("pressend", r, e);
			i(t), c = t.shouldStopPropagation;
		}
		if (n && n(!1), h(!1), t && a && !s) {
			let n = new co("press", r, e);
			t(n), c &&= n.shouldStopPropagation;
		}
		return o.isTriggeringEvent = !1, c;
	}, [
		s,
		i,
		n,
		t
	]), x = ti(b), S = ti((0, w.useCallback)((e, t) => {
		let n = g.current;
		if (s) return !1;
		if (a) {
			n.isTriggeringEvent = !0;
			let r = new co("pressup", t, e);
			return a(r), n.isTriggeringEvent = !1, r.shouldStopPropagation;
		}
		return !0;
	}, [s, a])), C = (0, w.useCallback)((e) => {
		let t = g.current;
		if (t.isPressed && t.target) {
			t.didFirePressStart && t.pointerType != null && b(go(t.target, e), t.pointerType, !1), t.isPressed = !1, t.isOverTarget = !1, t.activePointerId = null, t.pointerType = null, v(), d || no(t.target);
			for (let e of t.disposables) e();
			t.disposables = [];
		}
	}, [
		d,
		v,
		b
	]), T = ti(C);
	(0, w.useEffect)(() => {
		s && g.current.isPressed && T({
			currentTarget: g.current.target,
			shiftKey: !1,
			ctrlKey: !1,
			metaKey: !1,
			altKey: !1
		});
	}, [s]);
	let E = (0, w.useCallback)((e) => {
		u && C(e);
	}, [u, C]), D = (0, w.useCallback)((e) => {
		s || o?.(e);
	}, [s, o]), O = (0, w.useCallback)((e, t) => {
		if (!s && o) {
			let n = new MouseEvent("click", e);
			Jn(n, t), o(qn(n));
		}
	}, [s, o]), k = (0, w.useMemo)(() => {
		let e = g.current, t = {
			onKeyDown(t) {
				if (ho(t.nativeEvent, t.currentTarget) && U(t.currentTarget, W(t))) {
					vo(W(t), t.key) && t.preventDefault();
					let r = !0;
					!e.isPressed && !t.repeat && (e.target = t.currentTarget, e.isPressed = !0, e.pointerType = "keyboard", r = y(t, "keyboard"));
					let i = t.currentTarget;
					_(H(t.currentTarget), "keyup", Ft((t) => {
						ho(t, i) && !t.repeat && U(i, W(t)) && e.target && S(go(e.target, t), "keyboard");
					}, n), !0), r && t.stopPropagation(), t.metaKey && tr() && e.metaKeyEvents?.set(t.key, t.nativeEvent);
				} else t.key === "Meta" && (e.metaKeyEvents = /* @__PURE__ */ new Map());
			},
			onClick(t) {
				if ((!t || U(t.currentTarget, W(t))) && t && t.button === 0 && !e.isTriggeringEvent && !pr.isOpening) {
					let n = !0;
					if (s && t.preventDefault(), !e.ignoreEmulatedMouseEvents && !e.isPressed && (e.pointerType === "virtual" || lr(t.nativeEvent))) {
						let e = y(t, "virtual"), r = S(t, "virtual"), i = x(t, "virtual");
						D(t), n = e && r && i;
					} else if (e.isPressed && e.pointerType !== "keyboard") {
						let r = e.pointerType || t.nativeEvent.pointerType || "virtual", i = S(go(t.currentTarget, t), r), a = x(go(t.currentTarget, t), r, !0);
						n = i && a, e.isOverTarget = !1, D(t), T(t);
					}
					e.ignoreEmulatedMouseEvents = !1, n && t.stopPropagation();
				}
			}
		}, n = (t) => {
			if (e.isPressed && e.target && ho(t, e.target)) {
				vo(W(t), t.key) && t.preventDefault();
				let n = W(t), r = U(e.target, n);
				x(go(e.target, t), "keyboard", r), r && O(t, e.target), v(), t.key !== "Enter" && mo(e.target) && U(e.target, n) && !t[lo] && (t[lo] = !0, pr(e.target, t, !1)), e.isPressed = !1, e.metaKeyEvents?.delete(t.key);
			} else if (t.key === "Meta" && e.metaKeyEvents?.size) {
				let t = e.metaKeyEvents;
				e.metaKeyEvents = void 0;
				for (let n of t.values()) e.target?.dispatchEvent(new KeyboardEvent("keyup", n));
			}
		};
		if (typeof PointerEvent < "u") {
			t.onPointerDown = (t) => {
				if (t.button !== 0 || !U(t.currentTarget, W(t))) return;
				if (ur(t.nativeEvent)) {
					e.pointerType = "virtual";
					return;
				}
				e.pointerType = t.pointerType;
				let i = !0;
				if (!e.isPressed) {
					e.isPressed = !0, e.isOverTarget = !0, e.activePointerId = t.pointerId, e.target = t.currentTarget, d || to(e.target), i = y(t, e.pointerType);
					let a = W(t);
					"releasePointerCapture" in a && ("hasPointerCapture" in a ? a.hasPointerCapture(t.pointerId) && a.releasePointerCapture(t.pointerId) : a.releasePointerCapture(t.pointerId)), _(H(t.currentTarget), "pointerup", n, !1), _(H(t.currentTarget), "pointercancel", r, !1);
				}
				i && t.stopPropagation();
			}, t.onMouseDown = (t) => {
				if (U(t.currentTarget, W(t)) && t.button === 0) {
					if (l) {
						let n = Zn(t.target);
						n && e.disposables.push(n);
					}
					t.stopPropagation();
				}
			}, t.onPointerUp = (t) => {
				U(t.currentTarget, W(t)) && e.pointerType !== "virtual" && t.button === 0 && !e.isPressed && S(t, e.pointerType || t.pointerType);
			}, t.onPointerEnter = (t) => {
				t.pointerId === e.activePointerId && e.target && !e.isOverTarget && e.pointerType != null && (e.isOverTarget = !0, y(go(e.target, t), e.pointerType));
			}, t.onPointerLeave = (t) => {
				t.pointerId === e.activePointerId && e.target && e.isOverTarget && e.pointerType != null && (e.isOverTarget = !1, x(go(e.target, t), e.pointerType, !1), E(t));
			};
			let n = (t) => {
				if (t.pointerId === e.activePointerId && e.isPressed && t.button === 0 && e.target) {
					if (U(e.target, W(t)) && e.pointerType != null) {
						let n = !1, r = setTimeout(() => {
							e.isPressed && e.target instanceof HTMLElement && (n ? T(t) : (In(e.target), e.target.click()));
						}, 80);
						_(t.currentTarget, "click", () => n = !0, !0), e.disposables.push(() => clearTimeout(r));
					} else T(t);
					e.isOverTarget = !1;
				}
			}, r = (e) => {
				T(e);
			};
			t.onDragStart = (e) => {
				U(e.currentTarget, W(e)) && T(e);
			};
		}
		return t;
	}, [
		_,
		s,
		l,
		v,
		d,
		E,
		y,
		D,
		O
	]);
	return (0, w.useEffect)(() => {
		if (!f) return;
		let e = H(f.current);
		if (!e || !e.head || e.getElementById(uo)) return;
		let t = e.createElement("style");
		t.id = uo;
		let n = io(e);
		n && (t.nonce = n), t.textContent = `
@layer {
  [${fo}] {
    touch-action: pan-x pan-y pinch-zoom;
  }
}
    `.trim(), e.head.prepend(t);
	}, [f]), (0, w.useEffect)(() => {
		let e = g.current;
		return () => {
			d || no(e.target ?? void 0);
			for (let t of e.disposables) t();
			e.disposables = [];
		};
	}, [d]), {
		isPressed: c || m,
		pressProps: V(p, k, { [fo]: !0 })
	};
}
function mo(e) {
	return e.tagName === "A" && e.hasAttribute("href");
}
function ho(e, t) {
	let { key: n, code: r } = e, i = t, a = i.getAttribute("role");
	return (n === "Enter" || n === " " || n === "Spacebar" || r === "Space") && !(i instanceof bn(i).HTMLInputElement && !bo(i, n) || i instanceof bn(i).HTMLTextAreaElement || i.isContentEditable) && !((a === "link" || !a && mo(i)) && n !== "Enter");
}
function go(e, t) {
	let n = t.clientX, r = t.clientY;
	return {
		currentTarget: e,
		shiftKey: t.shiftKey,
		ctrlKey: t.ctrlKey,
		metaKey: t.metaKey,
		altKey: t.altKey,
		clientX: n,
		clientY: r,
		key: t.key
	};
}
function _o(e) {
	return e instanceof HTMLInputElement ? !1 : e instanceof HTMLButtonElement ? e.type !== "submit" && e.type !== "reset" : !mo(e);
}
function vo(e, t) {
	return tr() && t === "Enter" ? !1 : e instanceof HTMLInputElement ? t === "Enter" && (e.type === "checkbox" || e.type === "radio") ? !1 : !bo(e, t) : _o(e);
}
var yo = /* @__PURE__ */ new Set([
	"checkbox",
	"radio",
	"range",
	"color",
	"file",
	"image",
	"button",
	"submit",
	"reset"
]);
function bo(e, t) {
	return e.type === "checkbox" || e.type === "radio" ? t === " " : yo.has(e.type);
}
//#endregion
//#region node_modules/react-aria/dist/private/interactions/useFocusWithin.mjs
function xo(e) {
	let { isDisabled: t, onBlurWithin: n, onFocusWithin: r, onFocusWithinChange: i } = e, a = (0, w.useRef)({ isFocusWithin: !1 }), { addGlobalListener: o, removeAllGlobalListeners: s } = oo(), c = (0, w.useCallback)((e) => {
		U(e.currentTarget, W(e)) && a.current.isFocusWithin && !U(e.currentTarget, e.relatedTarget) && (a.current.isFocusWithin = !1, s(), n && n(e), i && i(!1));
	}, [
		n,
		i,
		a,
		s
	]), l = Yn(c), u = (0, w.useCallback)((e) => {
		if (!U(e.currentTarget, W(e))) return;
		let t = W(e), n = H(t), s = kn(n);
		if (!a.current.isFocusWithin && s === t) {
			r && r(e), i && i(!0), a.current.isFocusWithin = !0, l(e);
			let t = e.currentTarget;
			o(n, "focus", (e) => {
				let r = W(e);
				if (a.current.isFocusWithin && !U(t, r)) {
					let e = new n.defaultView.FocusEvent("blur", { relatedTarget: r });
					Jn(e, t);
					let i = qn(e);
					c(i);
				}
			}, { capture: !0 });
		}
	}, [
		r,
		i,
		l,
		o,
		c
	]);
	return t ? { focusWithinProps: {
		onFocus: void 0,
		onBlur: void 0
	} } : { focusWithinProps: {
		onFocus: u,
		onBlur: c
	} };
}
//#endregion
//#region node_modules/react-aria/dist/private/focus/useFocusRing.mjs
function So(e = {}) {
	let { autoFocus: t = !1, isTextInput: n, within: r } = e, i = (0, w.useRef)({
		isFocused: !1,
		isFocusVisible: t || Pr()
	}), [a, o] = (0, w.useState)(!1), [s, c] = (0, w.useState)(() => i.current.isFocused && i.current.isFocusVisible), l = (0, w.useCallback)(() => c(i.current.isFocused && i.current.isFocusVisible), []), u = (0, w.useCallback)((e) => {
		i.current.isFocused = e, i.current.isFocusVisible = Pr(), o(e), l();
	}, [l]);
	zr((e) => {
		i.current.isFocusVisible = e, l();
	}, [n, a], {
		enabled: a,
		isTextInput: n
	});
	let { focusProps: d } = K({
		isDisabled: r,
		onFocusChange: u
	}), { focusWithinProps: f } = xo({
		isDisabled: !r,
		onFocusWithinChange: u
	});
	return {
		isFocused: a,
		isFocusVisible: s,
		focusProps: r ? f : d
	};
}
//#endregion
//#region node_modules/react-aria/dist/private/interactions/useHover.mjs
var Co = !1, wo = 0;
function To() {
	Co = !0, setTimeout(() => {
		Co = !1;
	}, 500);
}
function Eo(e) {
	e.pointerType === "touch" && To();
}
function Do() {
	let e = H(null);
	if (e !== void 0) return wo === 0 && typeof PointerEvent < "u" && e.addEventListener("pointerup", Eo), wo++, () => {
		wo--, !(wo > 0) && typeof PointerEvent < "u" && e.removeEventListener("pointerup", Eo);
	};
}
function Oo(e) {
	let { onHoverStart: t, onHoverChange: n, onHoverEnd: r, isDisabled: i } = e, [a, o] = (0, w.useState)(!1), s = (0, w.useRef)({
		isHovered: !1,
		ignoreEmulatedMouseEvents: !1,
		pointerType: "",
		target: null
	}).current;
	(0, w.useEffect)(Do, []);
	let { addGlobalListener: c, removeAllGlobalListeners: l } = oo(), { hoverProps: u, triggerHoverEnd: d } = (0, w.useMemo)(() => {
		let e = (e, r) => {
			if (s.pointerType = r, i || r === "touch" || s.isHovered || !U(e.currentTarget, W(e))) return;
			s.isHovered = !0;
			let l = e.currentTarget;
			s.target = l, c(H(W(e)), "pointerover", (e) => {
				s.isHovered && s.target && !U(s.target, W(e)) && a(e, e.pointerType);
			}, { capture: !0 }), t && t({
				type: "hoverstart",
				target: l,
				pointerType: r
			}), n && n(!0), o(!0);
		}, a = (e, t) => {
			let i = s.target;
			s.pointerType = "", s.target = null, t !== "touch" && s.isHovered && i && (s.isHovered = !1, l(), r && r({
				type: "hoverend",
				target: i,
				pointerType: t
			}), n && n(!1), o(!1));
		}, u = {};
		return typeof PointerEvent < "u" && (u.onPointerEnter = (t) => {
			Co && t.pointerType === "mouse" || e(t, t.pointerType);
		}, u.onPointerLeave = (e) => {
			!i && U(e.currentTarget, W(e)) && a(e, e.pointerType);
		}), {
			hoverProps: u,
			triggerHoverEnd: a
		};
	}, [
		t,
		n,
		r,
		i,
		s,
		c,
		l
	]);
	return (0, w.useEffect)(() => {
		i && d({ currentTarget: s.target }, s.pointerType);
	}, [i]), {
		hoverProps: u,
		isHovered: a
	};
}
//#endregion
//#region node_modules/react-aria-components/dist/private/Label.mjs
var ko = /*#__PURE__*/ (0, w.createContext)({}), Ao = /*#__PURE__*/ ya(function(e, t) {
	[e, t] = fn(e, t, ko);
	let { elementType: n = "label", ...r } = e, i = _n[n];
	return /*#__PURE__*/ w.createElement(i, {
		className: "react-aria-Label",
		...r,
		ref: t
	});
});
//#endregion
//#region node_modules/react-aria/dist/private/label/useLabel.mjs
function jo(e) {
	let { id: t, label: n, "aria-labelledby": r, "aria-label": i, labelElementType: a = "label" } = e;
	t = $t(t);
	let o = $t(), s = {};
	n && (r = r ? `${o} ${r}` : o, s = {
		id: o,
		htmlFor: a === "label" ? t : void 0
	});
	let c = ri({
		id: t,
		"aria-label": i,
		"aria-labelledby": r
	});
	return {
		labelProps: s,
		fieldProps: c
	};
}
//#endregion
//#region node_modules/react-stately/dist/private/utils/number.mjs
function Mo(e, t = -Infinity, n = Infinity) {
	return Math.min(Math.max(e, t), n);
}
//#endregion
//#region node_modules/react-aria-components/dist/private/ProgressBar.mjs
var No = /*#__PURE__*/ (0, w.createContext)(null), Po = 7e3, Fo = null;
function Io(e, t = "assertive", n = Po) {
	Fo ? Fo.announce(e, t, n) : (Fo = new q(), (typeof IS_REACT_ACT_ENVIRONMENT == "boolean" ? IS_REACT_ACT_ENVIRONMENT : typeof jest < "u") ? Fo.announce(e, t, n) : setTimeout(() => {
		Fo?.isAttached() && Fo?.announce(e, t, n);
	}, 100));
}
var q = class {
	constructor() {
		this.node = null, this.assertiveLog = null, this.politeLog = null, typeof document < "u" && (this.node = document.createElement("div"), this.node.dataset.liveAnnouncer = "true", Object.assign(this.node.style, {
			border: 0,
			clip: "rect(0 0 0 0)",
			clipPath: "inset(50%)",
			height: "1px",
			margin: "-1px",
			overflow: "hidden",
			padding: 0,
			position: "absolute",
			width: "1px",
			whiteSpace: "nowrap"
		}), this.assertiveLog = this.createLog("assertive"), this.node.appendChild(this.assertiveLog), this.politeLog = this.createLog("polite"), this.node.appendChild(this.politeLog), document.body.prepend(this.node));
	}
	isAttached() {
		return this.node?.isConnected;
	}
	createLog(e) {
		let t = document.createElement("div");
		return t.setAttribute("role", "log"), t.setAttribute("aria-live", e), t.setAttribute("aria-relevant", "additions"), t;
	}
	destroy() {
		this.node &&= (document.body.removeChild(this.node), null);
	}
	announce(e, t = "assertive", n = Po) {
		if (!this.node) return;
		let r = document.createElement("div");
		typeof e == "object" ? (r.setAttribute("role", "img"), r.setAttribute("aria-labelledby", e["aria-labelledby"])) : r.textContent = e, t === "assertive" ? this.assertiveLog?.appendChild(r) : this.politeLog?.appendChild(r), e !== "" && setTimeout(() => {
			r.remove();
		}, n);
	}
	clear(e) {
		this.node && ((!e || e === "assertive") && this.assertiveLog && (this.assertiveLog.innerHTML = ""), (!e || e === "polite") && this.politeLog && (this.politeLog.innerHTML = ""));
	}
};
//#endregion
//#region node_modules/react-aria/dist/private/button/useButton.mjs
function Lo(e, t) {
	let { elementType: n = "button", isDisabled: r, onPress: i, onPressStart: a, onPressEnd: o, onPressUp: s, onPressChange: c, preventFocusOnPress: l, allowFocusWhenDisabled: u, onClick: d, href: f, target: p, rel: m, type: h = "button" } = e, g;
	g = n === "button" ? {
		type: h,
		disabled: r,
		form: e.form,
		formAction: e.formAction,
		formEncType: e.formEncType,
		formMethod: e.formMethod,
		formNoValidate: e.formNoValidate,
		formTarget: e.formTarget,
		name: e.name,
		value: e.value
	} : {
		role: "button",
		href: n === "a" && !r ? f : void 0,
		target: n === "a" ? p : void 0,
		type: n === "input" ? h : void 0,
		disabled: n === "input" ? r : void 0,
		"aria-disabled": !r || n === "input" ? void 0 : r,
		rel: n === "a" ? m : void 0
	};
	let { pressProps: _, isPressed: v } = po({
		onPressStart: a,
		onPressEnd: o,
		onPressChange: c,
		onPress: i,
		onPressUp: s,
		onClick: d,
		isDisabled: r,
		preventFocusOnPress: l,
		ref: t
	}), { focusableProps: y } = ga(e, t);
	u && (y.tabIndex = r ? -1 : y.tabIndex);
	let b = V(y, _, Za(e, { labelable: !0 }));
	return {
		isPressed: v,
		buttonProps: V(g, b, {
			"aria-haspopup": e["aria-haspopup"],
			"aria-expanded": e["aria-expanded"],
			"aria-controls": e["aria-controls"],
			"aria-pressed": e["aria-pressed"],
			"aria-current": e["aria-current"],
			"aria-disabled": e["aria-disabled"]
		})
	};
}
//#endregion
//#region node_modules/react-aria-components/dist/private/Button.mjs
var Ro = /*#__PURE__*/ (0, w.createContext)({}), zo = /*#__PURE__*/ ya(function(e, t) {
	[e, t] = fn(e, t, Ro);
	let n = e, { isPending: r } = n, { buttonProps: i, isPressed: a } = Lo(e, t);
	i = Vo(i, r);
	let { focusProps: o, isFocused: s, isFocusVisible: c } = So(e), { hoverProps: l, isHovered: u } = Oo({
		...e,
		isDisabled: e.isDisabled || r
	}), d = {
		isHovered: u,
		isPressed: (n.isPressed || a) && !r,
		isFocused: s,
		isFocusVisible: c,
		isDisabled: e.isDisabled || !1,
		isPending: r ?? !1
	}, f = un({
		...e,
		values: d,
		defaultClassName: "react-aria-Button"
	}), p = $t(i.id), m = $t(), h = i["aria-labelledby"];
	r && (h ? h = `${h} ${m}` : i["aria-label"] && (h = `${p} ${m}`));
	let g = (0, w.useRef)(r);
	(0, w.useEffect)(() => {
		let e = { "aria-labelledby": h || p };
		(!g.current && s && r || g.current && s && !r) && Io(e, "assertive"), g.current = r;
	}, [
		r,
		s,
		h,
		p
	]);
	let _ = Za(e, { global: !0 });
	return delete _.onClick, /*#__PURE__*/ w.createElement(_n.button, {
		...V(_, f, i, o, l),
		type: i.type === "submit" && r ? "button" : i.type,
		id: p,
		ref: t,
		"aria-labelledby": h,
		slot: e.slot || void 0,
		"aria-disabled": r ? "true" : i["aria-disabled"],
		"data-disabled": e.isDisabled || void 0,
		"data-pressed": d.isPressed || void 0,
		"data-hovered": u || void 0,
		"data-focused": s || void 0,
		"data-pending": r || void 0,
		"data-focus-visible": c || void 0
	}, /*#__PURE__*/ w.createElement(No.Provider, { value: { id: m } }, f.children));
}), Bo = /Focus|Blur|Hover|Pointer(Enter|Leave|Over|Out)|Mouse(Enter|Leave|Over|Out)/;
function Vo(e, t) {
	if (t) {
		for (let t in e) t.startsWith("on") && !Bo.test(t) && (e[t] = void 0);
		e.href = void 0, e.target = void 0;
	}
	return e;
}
//#endregion
//#region node_modules/react-aria-components/dist/private/Text.mjs
var Ho = /*#__PURE__*/ (0, w.createContext)({}), Uo = /*#__PURE__*/ ya(function(e, t) {
	[e, t] = fn(e, t, Ho);
	let { elementType: n = "span", ...r } = e, i = _n[n];
	return /*#__PURE__*/ w.createElement(i, {
		className: "react-aria-Text",
		...r,
		ref: t
	});
});
//#endregion
//#region node_modules/react-aria/dist/private/utils/isScrollable.mjs
function Wo(e, t) {
	if (!e) return !1;
	let n = window.getComputedStyle(e), r = document.scrollingElement || document.documentElement, i = /(auto|scroll)/.test(n.overflow + n.overflowX + n.overflowY);
	return e === r && n.overflow !== "hidden" && (i = !0), i && t && (i = e.scrollHeight !== e.clientHeight || e.scrollWidth !== e.clientWidth), i;
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/getScrollParent.mjs
function Go(e, t) {
	let n = e;
	for (Wo(n, t) && (n = n.parentElement); n && !Wo(n, t);) n = n.parentElement;
	return n || document.scrollingElement || document.documentElement;
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/getScrollParents.mjs
function Ko(e, t) {
	let n = [], r = document.scrollingElement || document.documentElement;
	for (; e && (Wo(e, t) && n.push(e), e !== r);) e = e.parentElement;
	return n;
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/scrollIntoView.mjs
function qo(e, t, n = {}) {
	e !== t && Jo(e, t, t.getBoundingClientRect(), n);
}
function Jo(e, t, n, r = {}) {
	let { block: i = "nearest", inline: a = "nearest" } = r, o = e.scrollTop, s = e.scrollLeft, c = e.getBoundingClientRect(), l = window.getComputedStyle(t), u = window.getComputedStyle(e), d = document.scrollingElement || document.documentElement, f = e === d, p = e === d ? 0 : c.top, m = e === d ? e.clientHeight : c.bottom, h = e === d ? 0 : c.left, g = e === d ? e.clientWidth : c.right, _ = parseFloat(l.scrollMarginTop) || 0, v = parseFloat(l.scrollMarginBottom) || 0, y = parseFloat(l.scrollMarginLeft) || 0, b = parseFloat(l.scrollMarginRight) || 0, x = parseFloat(u.scrollPaddingTop) || 0, S = parseFloat(u.scrollPaddingBottom) || 0, C = parseFloat(u.scrollPaddingLeft) || 0, w = parseFloat(u.scrollPaddingRight) || 0, T = parseFloat(u.borderTopWidth) || 0, E = parseFloat(u.borderBottomWidth) || 0, D = parseFloat(u.borderLeftWidth) || 0, O = parseFloat(u.borderRightWidth) || 0, k = n.top - _, A = n.bottom + v, j = n.left - y, M = n.right + b, ee = e === d ? 0 : D + O, te = e === d ? 0 : T + E, ne = e === d ? 0 : e.offsetWidth - e.clientWidth - ee, N = e === d ? 0 : e.offsetHeight - e.clientHeight - te, re = p + (f ? 0 : T) + x, ie = m - (f ? 0 : E) - S - N, ae = h + (f ? 0 : D) + C, oe = g - (f ? 0 : O) - w;
	ir() && or() || u.direction === "ltr" ? oe -= ne : u.direction === "rtl" && (ae += ne);
	let se = k < re || A > ie, ce = j < ae || M > oe;
	if (se && i === "start") o += k - re;
	else if (se && i === "center") o += (k + A) / 2 - (re + ie) / 2;
	else if (se && i === "end") o += A - ie;
	else if (se && i === "nearest") {
		let e = k - re, t = A - ie;
		o += Math.abs(e) <= Math.abs(t) ? e : t;
	}
	if (ce && a === "start") s += j - ae;
	else if (ce && a === "center") s += (j + M) / 2 - (ae + oe) / 2;
	else if (ce && a === "end") s += M - oe;
	else if (ce && a === "nearest") {
		let e = j - ae, t = M - oe;
		s += Math.abs(e) <= Math.abs(t) ? e : t;
	}
	e.scrollTo({
		left: s,
		top: o
	});
}
function Yo(e, t = {}) {
	let { containingElement: n } = t;
	if (e && e.isConnected) {
		let t = document.scrollingElement || document.documentElement;
		if (window.getComputedStyle(t).overflow !== "hidden") {
			let { left: t, top: r } = e.getBoundingClientRect();
			e?.scrollIntoView?.({ block: "nearest" });
			let { left: i, top: a } = e.getBoundingClientRect();
			(Math.abs(t - i) > 1 || Math.abs(r - a) > 1) && (n?.scrollIntoView?.({
				block: "center",
				inline: "center"
			}), e.scrollIntoView?.({ block: "nearest" }));
		} else {
			let { left: t, top: r } = e.getBoundingClientRect(), i = Ko(e, !0);
			for (let t of i) qo(t, e);
			let { left: a, top: o } = e.getBoundingClientRect();
			if (Math.abs(t - a) > 1 || Math.abs(r - o) > 1) {
				i = n ? Ko(n, !0) : [];
				for (let e of i) qo(e, n, {
					block: "center",
					inline: "center"
				});
				for (let t of Ko(e, !0)) qo(t, e);
			}
		}
	}
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/useDescription.mjs
var Xo = 0, Zo = /* @__PURE__ */ new Map();
function Qo(e) {
	let [t, n] = (0, w.useState)();
	return B(() => {
		if (!e) return;
		let t = Zo.get(e);
		if (t) n(t.element.id);
		else {
			let r = `react-aria-description-${Xo++}`;
			n(r);
			let i = document.createElement("div");
			i.id = r, i.style.display = "none", i.textContent = e, document.body.appendChild(i), t = {
				refCount: 0,
				element: i
			}, Zo.set(e, t);
		}
		return t.refCount++, () => {
			t && --t.refCount === 0 && (t.element.remove(), Zo.delete(e));
		};
	}, [e]), { "aria-describedby": e ? t : void 0 };
}
//#endregion
//#region node_modules/react-aria/dist/private/visually-hidden/VisuallyHidden.mjs
var $o = {
	border: 0,
	clip: "rect(0 0 0 0)",
	clipPath: "inset(50%)",
	height: "1px",
	margin: "-1px",
	overflow: "hidden",
	padding: 0,
	position: "absolute",
	width: "1px",
	whiteSpace: "nowrap"
};
function es(e = {}) {
	let { style: t, isFocusable: n } = e, [r, i] = (0, w.useState)(!1), { focusWithinProps: a } = xo({
		isDisabled: !n,
		onFocusWithinChange: (e) => i(e)
	}), o = (0, w.useMemo)(() => r ? t : t ? {
		...$o,
		...t
	} : $o, [r]);
	return { visuallyHiddenProps: {
		...a,
		style: o
	} };
}
function ts(e) {
	let { children: t, elementType: n = "div", isFocusable: r, style: i, ...a } = e, { visuallyHiddenProps: o } = es(e);
	return /*#__PURE__*/ w.createElement(n, V(a, o), t);
}
//#endregion
//#region node_modules/react-aria-components/dist/private/FieldError.mjs
var ns = /*#__PURE__*/ (0, w.createContext)(null), rs = {
	badInput: !1,
	customError: !1,
	patternMismatch: !1,
	rangeOverflow: !1,
	rangeUnderflow: !1,
	stepMismatch: !1,
	tooLong: !1,
	tooShort: !1,
	typeMismatch: !1,
	valueMissing: !1,
	valid: !0
}, is = {
	...rs,
	customError: !0,
	valid: !1
}, as = {
	isInvalid: !1,
	validationDetails: rs,
	validationErrors: []
}, os = (0, w.createContext)({}), ss = "__reactAriaFormValidationState";
function cs(e) {
	if (e.__reactAriaFormValidationState) {
		let { realtimeValidation: t, displayValidation: n, updateValidation: r, resetValidation: i, commitValidation: a } = e[ss];
		return {
			realtimeValidation: t,
			displayValidation: n,
			updateValidation: r,
			resetValidation: i,
			commitValidation: a
		};
	}
	return ls(e);
}
function ls(e) {
	let { isInvalid: t, validationState: n, name: r, value: i, builtinValidation: a, validate: o, validationBehavior: s = "aria" } = e;
	n && (t ||= n === "invalid");
	let c = t === void 0 ? null : {
		isInvalid: t,
		validationErrors: [],
		validationDetails: is
	}, l = (0, w.useMemo)(() => !o || i == null ? null : fs(ds(o, i)), [o, i]);
	a?.validationDetails.valid && (a = void 0);
	let u = (0, w.useContext)(os), d = (0, w.useMemo)(() => r ? Array.isArray(r) ? r.flatMap((e) => us(u[e])) : us(u[r]) : [], [u, r]), [f, p] = (0, w.useState)(u), [m, h] = (0, w.useState)(!1);
	u !== f && (p(u), h(!1));
	let g = (0, w.useMemo)(() => fs(m ? [] : d), [m, d]), _ = (0, w.useRef)(as), [v, y] = (0, w.useState)(as), b = (0, w.useRef)(as), x = () => {
		if (!S) return;
		C(!1);
		let e = l || a || _.current;
		ps(e, b.current) || (b.current = e, y(e));
	}, [S, C] = (0, w.useState)(!1);
	return (0, w.useEffect)(x), {
		realtimeValidation: c || g || l || a || as,
		displayValidation: s === "native" ? c || g || v : c || g || l || a || v,
		updateValidation(e) {
			s === "aria" && !ps(v, e) ? y(e) : _.current = e;
		},
		resetValidation() {
			let e = as;
			ps(e, b.current) || (b.current = e, y(e)), s === "native" && C(!1), h(!0);
		},
		commitValidation() {
			s === "native" && C(!0), h(!0);
		}
	};
}
function us(e) {
	return e ? Array.isArray(e) ? e : [e] : [];
}
function ds(e, t) {
	if (typeof e == "function") {
		let n = e(t);
		if (n && typeof n != "boolean") return us(n);
	}
	return [];
}
function fs(e) {
	return e.length ? {
		isInvalid: !0,
		validationErrors: e,
		validationDetails: is
	} : null;
}
function ps(e, t) {
	return e === t || !!e && !!t && e.isInvalid === t.isInvalid && e.validationErrors.length === t.validationErrors.length && e.validationErrors.every((e, n) => e === t.validationErrors[n]) && Object.entries(e.validationDetails).every(([e, n]) => t.validationDetails[e] === n);
}
//#endregion
//#region node_modules/react-aria-components/dist/private/Form.mjs
var ms = /*#__PURE__*/ (0, w.createContext)(null), hs = /* @__PURE__ */ new WeakMap();
//#endregion
//#region node_modules/react-aria/dist/private/label/useField.mjs
function gs(e) {
	let { description: t, errorMessage: n, isInvalid: r, validationState: i } = e, { labelProps: a, fieldProps: o } = jo(e), s = tn([
		!!t,
		!!n,
		r,
		i
	]), c = tn([
		!!t,
		!!n,
		r,
		i
	]);
	return o = V(o, { "aria-describedby": [
		s,
		c,
		e["aria-describedby"]
	].filter(Boolean).join(" ") || void 0 }), {
		labelProps: a,
		fieldProps: o,
		descriptionProps: { id: s },
		errorMessageProps: { id: c }
	};
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/useFormReset.mjs
function _s(e, t, n) {
	let r = ti((e) => {
		n && !e.defaultPrevented && n(t);
	});
	(0, w.useEffect)(() => {
		let t = e?.current?.form;
		return t?.addEventListener("reset", r), () => {
			t?.removeEventListener("reset", r);
		};
	}, [e]);
}
//#endregion
//#region node_modules/react-aria/dist/private/form/useFormValidation.mjs
function vs(e, t, n) {
	let { validationBehavior: r, focus: i } = e;
	B(() => {
		if (r === "native" && n?.current && "setCustomValidity" in n.current && !n.current.disabled) {
			let e = t.realtimeValidation.isInvalid ? t.realtimeValidation.validationErrors.join(" ") || "Invalid value." : "";
			n.current.setCustomValidity(e), n.current.hasAttribute("title") || (n.current.title = ""), t.realtimeValidation.isInvalid || t.updateValidation(bs(n.current));
		}
	});
	let a = (0, w.useRef)(!1), o = ti(() => {
		a.current || t.resetValidation();
	}), s = ti((e) => {
		t.displayValidation.isInvalid || t.commitValidation();
		let r = n?.current?.form;
		!e.defaultPrevented && n && r && xs(r) === n.current && (i ? i() : n.current?.focus(), Ir("keyboard")), e.preventDefault();
	}), c = ti(() => {
		t.commitValidation();
	});
	(0, w.useEffect)(() => {
		let e = n?.current;
		if (!e) return;
		let t = e.form, r = t?.reset;
		return t && (t.reset = () => {
			a.current = !window.event || window.event.type === "message" && W(window.event) instanceof MessagePort, r?.call(t), a.current = !1;
		}), e.addEventListener("invalid", s), e.addEventListener("change", c), t?.addEventListener("reset", o), () => {
			e.removeEventListener("invalid", s), e.removeEventListener("change", c), t?.removeEventListener("reset", o), t && (t.reset = r);
		};
	}, [n, r]);
}
function ys(e) {
	let t = e.validity;
	return {
		badInput: t.badInput,
		customError: t.customError,
		patternMismatch: t.patternMismatch,
		rangeOverflow: t.rangeOverflow,
		rangeUnderflow: t.rangeUnderflow,
		stepMismatch: t.stepMismatch,
		tooLong: t.tooLong,
		tooShort: t.tooShort,
		typeMismatch: t.typeMismatch,
		valueMissing: t.valueMissing,
		valid: t.valid
	};
}
function bs(e) {
	return {
		isInvalid: !e.validity.valid,
		validationDetails: ys(e),
		validationErrors: e.validationMessage ? [e.validationMessage] : []
	};
}
function xs(e) {
	for (let t = 0; t < e.elements.length; t++) {
		let n = e.elements[t];
		if (n.validity?.valid === !1) return n;
	}
	return null;
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/useSlot.mjs
function Ss(e = !0) {
	let [t, n] = (0, w.useState)(e), r = (0, w.useRef)(!1), i = (0, w.useCallback)((e) => {
		r.current = !0, n(!!e);
	}, []);
	return B(() => {
		r.current || n(!1);
	}, []), [i, t];
}
function Cs(e = !0) {
	let t = $t(), [n, r] = Ss(e);
	return {
		id: r ? t : void 0,
		ref: n
	};
}
//#endregion
//#region node_modules/react-aria/dist/private/toggle/useToggle.mjs
function ws(e, t, n) {
	let { isDisabled: r = !1, isReadOnly: i = !1, value: a, name: o, form: s, children: c, isRequired: l, validationBehavior: u = "aria", "aria-label": d, "aria-labelledby": f, "aria-describedby": p, onPressStart: m, onPressEnd: h, onPressChange: g, onPress: _, onPressUp: v, onClick: y } = e, b = cs({
		...e,
		value: t.isSelected
	}), { isInvalid: x, validationErrors: S, validationDetails: C } = b.displayValidation;
	vs(e, b, n);
	let T = (e) => {
		e.stopPropagation(), t.setSelected(W(e).checked);
	}, { pressProps: E, isPressed: D } = po({
		onPressStart: m,
		onPressEnd: h,
		onPressChange: g,
		onPress: _,
		onPressUp: v,
		onClick: y,
		isDisabled: r
	}), [O, k] = (0, w.useState)(!1), { pressProps: A } = po({
		onPressStart(e) {
			e.pointerType === "keyboard" || e.pointerType === "virtual" ? e.continuePropagation() : (m?.(e), g?.(!0), k(!0));
		},
		onPressEnd(e) {
			e.pointerType === "keyboard" || e.pointerType === "virtual" ? e.continuePropagation() : (h?.(e), g?.(!1), k(!1));
		},
		onPressUp(e) {
			e.pointerType === "keyboard" || e.pointerType === "virtual" ? e.continuePropagation() : v?.(e);
		},
		onClick: y,
		onPress(r) {
			if (r.pointerType === "keyboard" || r.pointerType === "virtual") {
				r.continuePropagation();
				return;
			}
			_?.(r), t.toggle(), n.current?.focus();
			let { [ss]: i } = e, { commitValidation: a } = i || b;
			a();
		},
		isDisabled: r || i
	}), { focusableProps: j } = ga(e, n), M = V(E, j), ee = Za(e, { labelable: !0 });
	_s(n, t.defaultSelected, t.setSelected);
	let te = Cs(), ne = Cs();
	return {
		labelProps: V(A, { onClick: (e) => e.preventDefault() }),
		inputProps: V(ee, {
			checked: t.isSelected,
			"aria-required": l && u === "aria" || void 0,
			required: l && u === "native",
			"aria-invalid": x || e.validationState === "invalid" || void 0,
			"aria-errormessage": e["aria-errormessage"],
			"aria-controls": e["aria-controls"],
			"aria-readonly": i || void 0,
			"aria-describedby": [
				te.id,
				ne.id,
				p
			].filter(Boolean).join(" ") || void 0,
			onChange: T,
			disabled: r,
			...a == null ? {} : { value: a },
			name: o,
			form: s,
			type: "checkbox",
			...M
		}),
		descriptionProps: te,
		errorMessageProps: ne,
		isSelected: t.isSelected,
		isPressed: D || O,
		isDisabled: r,
		isReadOnly: i,
		isInvalid: x || e.validationState === "invalid",
		validationErrors: S,
		validationDetails: C
	};
}
//#endregion
//#region node_modules/react-aria/dist/private/checkbox/useCheckbox.mjs
function Ts(e, t, n) {
	let { labelProps: r, inputProps: i, descriptionProps: a, errorMessageProps: o, isSelected: s, isPressed: c, isDisabled: l, isReadOnly: u, isInvalid: d, validationErrors: f, validationDetails: p } = ws(e, t, n), { isIndeterminate: m } = e;
	return (0, w.useEffect)(() => {
		n.current && (n.current.indeterminate = !!m);
	}), {
		labelProps: V(r, (0, w.useMemo)(() => ({ onMouseDown: (e) => e.preventDefault() }), [])),
		inputProps: i,
		descriptionProps: a,
		errorMessageProps: o,
		isSelected: s,
		isPressed: c,
		isDisabled: l,
		isReadOnly: u,
		isInvalid: d,
		validationErrors: f,
		validationDetails: p
	};
}
//#endregion
//#region node_modules/react-stately/dist/private/toggle/useToggleState.mjs
function Es(e = {}) {
	let { isReadOnly: t } = e, [n, r] = Ai(e.isSelected, e.defaultSelected || !1, e.onChange), [i] = (0, w.useState)(n);
	function a(e) {
		t || r(e);
	}
	function o() {
		t || r(!n);
	}
	return {
		isSelected: n,
		defaultSelected: e.defaultSelected ?? i,
		setSelected: a,
		toggle: o
	};
}
//#endregion
//#region node_modules/react-aria/dist/private/checkbox/useCheckboxGroupItem.mjs
function Ds(e, t, n) {
	let r = Es({
		isReadOnly: e.isReadOnly || t.isReadOnly,
		isSelected: t.isSelected(e.value),
		defaultSelected: t.defaultValue.includes(e.value),
		onChange(n) {
			n ? t.addValue(e.value) : t.removeValue(e.value), e.onChange && e.onChange(n);
		}
	}), { name: i, form: a, descriptionId: o, errorMessageId: s, validationBehavior: c } = hs.get(t);
	c = e.validationBehavior ?? c;
	let { realtimeValidation: l } = cs({
		...e,
		value: r.isSelected,
		name: void 0,
		validationBehavior: "aria"
	}), u = (0, w.useRef)(as), d = () => {
		t.setInvalid(e.value, l.isInvalid ? l : u.current);
	};
	(0, w.useEffect)(d);
	let f = t.realtimeValidation.isInvalid ? t.realtimeValidation : l, p = c === "native" ? t.displayValidation : f, m = Ts({
		...e,
		isReadOnly: e.isReadOnly || t.isReadOnly,
		isDisabled: e.isDisabled || t.isDisabled,
		name: e.name || i,
		form: e.form || a,
		isRequired: e.isRequired ?? t.isRequired,
		validationBehavior: c,
		[ss]: {
			realtimeValidation: f,
			displayValidation: p,
			resetValidation: t.resetValidation,
			commitValidation: t.commitValidation,
			updateValidation(e) {
				u.current = e, d();
			}
		}
	}, r, n);
	return {
		...m,
		inputProps: {
			...m.inputProps,
			"aria-describedby": [
				m.inputProps["aria-describedby"],
				t.isInvalid ? s : null,
				o
			].filter(Boolean).join(" ") || void 0
		}
	};
}
//#endregion
//#region node_modules/react-aria-components/dist/private/Checkbox.mjs
var Os = /*#__PURE__*/ (0, w.createContext)(null), ks = /*#__PURE__*/ (0, w.createContext)(null), As = /*#__PURE__*/ (0, w.createContext)(null);
function js(e, t) {
	let { validationBehavior: n } = dn(ms) || {}, r = e.validationBehavior ?? n ?? "native", i = (0, w.useContext)(ks), a = sn((0, w.useMemo)(() => nn(t, e.inputRef === void 0 ? null : e.inputRef), [t, e.inputRef])), o = {
		...mn(e),
		children: typeof e.children == "function" || e.children,
		value: e.value,
		validationBehavior: r
	};
	return [i ? Ds(o, i, a) : Ts(o, Es(e), a), a];
}
var Ms = /*#__PURE__*/ (0, w.forwardRef)(function(e, t) {
	let { inputRef: n = null, ...r } = e;
	[e, t] = fn(r, t, Os);
	let [i, a] = js(e, n);
	return /*#__PURE__*/ w.createElement(As.Provider, { value: {
		...i,
		inputRef: a,
		defaultClassName: "react-aria-Checkbox",
		isIndeterminate: e.isIndeterminate,
		isRequired: e.isRequired
	} }, /*#__PURE__*/ w.createElement(Ns, {
		...e,
		ref: t
	}));
}), Ns = /*#__PURE__*/ (0, w.forwardRef)(function(e, t) {
	let { labelProps: n, inputProps: r, isSelected: i, isDisabled: a, isReadOnly: o, isPressed: s, isInvalid: c, inputRef: l, defaultClassName: u, isIndeterminate: d, isRequired: f } = (0, w.useContext)(As), { isFocused: p, isFocusVisible: m, focusProps: h } = So(), g = a || o, { hoverProps: _, isHovered: v } = Oo({
		...e,
		isDisabled: g
	}), y = un({
		...e,
		defaultClassName: u,
		values: {
			isSelected: i,
			isIndeterminate: d || !1,
			isPressed: s,
			isHovered: v,
			isFocused: p,
			isFocusVisible: m,
			isDisabled: a,
			isReadOnly: o,
			isInvalid: c,
			isRequired: f || !1
		}
	}), b = Za(e, { global: !0 });
	return delete b.id, delete b.onClick, /*#__PURE__*/ w.createElement(_n.label, {
		...V(b, n, _, y),
		ref: t,
		slot: e.slot || void 0,
		"data-selected": i || void 0,
		"data-indeterminate": d || void 0,
		"data-pressed": s || void 0,
		"data-hovered": v || void 0,
		"data-focused": p || void 0,
		"data-focus-visible": m || void 0,
		"data-disabled": a || void 0,
		"data-readonly": o || void 0,
		"data-invalid": c || void 0,
		"data-required": f || void 0
	}, /*#__PURE__*/ w.createElement(ts, { elementType: "span" }, /*#__PURE__*/ w.createElement("input", {
		...V(r, h),
		ref: l
	})), y.children);
}), Ps = /*#__PURE__*/ (0, w.createContext)({}), Fs = /*#__PURE__*/ (0, w.forwardRef)(function(e, t) {
	[e, t] = fn(e, t, Ps);
	let { isDisabled: n, isInvalid: r, isReadOnly: i, onHoverStart: a, onHoverChange: o, onHoverEnd: s, ...c } = e;
	n ??= !!e["aria-disabled"] && e["aria-disabled"] !== "false", r ??= !!e["aria-invalid"] && e["aria-invalid"] !== "false";
	let { hoverProps: l, isHovered: u } = Oo({
		onHoverStart: a,
		onHoverChange: o,
		onHoverEnd: s,
		isDisabled: n
	}), { isFocused: d, isFocusVisible: f, focusProps: p } = So({ within: !0 }), m = un({
		...e,
		values: {
			isHovered: u,
			isFocusWithin: d,
			isFocusVisible: f,
			isDisabled: n,
			isInvalid: r
		},
		defaultClassName: "react-aria-Group"
	});
	return /*#__PURE__*/ w.createElement(_n.div, {
		...V(c, p, l),
		...m,
		ref: t,
		role: e.role ?? "group",
		slot: e.slot ?? void 0,
		"data-focus-within": d || void 0,
		"data-hovered": u || void 0,
		"data-focus-visible": f || void 0,
		"data-disabled": n || void 0,
		"data-invalid": r || void 0,
		"data-readonly": i || void 0
	}, m.children);
}), Is = /*#__PURE__*/ (0, w.createContext)({}), Ls = (e) => {
	let { onHoverStart: t, onHoverChange: n, onHoverEnd: r, ...i } = e;
	return i;
}, Rs = /*#__PURE__*/ ya(function(e, t) {
	[e, t] = fn(e, t, Is);
	let { hoverProps: n, isHovered: r } = Oo({
		...e,
		isDisabled: e.disabled
	}), { isFocused: i, isFocusVisible: a, focusProps: o } = So({
		isTextInput: !0,
		autoFocus: e.autoFocus
	}), s = !!e["aria-invalid"] && e["aria-invalid"] !== "false", c = un({
		...e,
		values: {
			isHovered: r,
			isFocused: i,
			isFocusVisible: a,
			isDisabled: e.disabled || !1,
			isInvalid: s
		},
		defaultClassName: "react-aria-Input"
	});
	return /*#__PURE__*/ w.createElement(_n.input, {
		...V(Ls(e), o, n),
		...c,
		ref: t,
		"data-focused": i || void 0,
		"data-disabled": e.disabled || void 0,
		"data-hovered": r || void 0,
		"data-focus-visible": a || void 0,
		"data-invalid": s || void 0
	});
});
//#endregion
//#region node_modules/react-aria/dist/private/textfield/useTextField.mjs
function zs(e, t) {
	let { inputElementType: n = "input", isDisabled: r = !1, isRequired: i = !1, isReadOnly: a = !1, type: o = "text", validationBehavior: s = "aria" } = e, [c, l] = Ai(e.value, e.defaultValue || "", e.onChange), { focusableProps: u } = ga(e, t), d = cs({
		...e,
		value: c
	}), { isInvalid: f, validationErrors: p, validationDetails: m } = d.displayValidation, { labelProps: h, fieldProps: g, descriptionProps: _, errorMessageProps: v } = gs({
		...e,
		isInvalid: f,
		errorMessage: e.errorMessage || p
	}), y = Za(e, { labelable: !0 }), b = {
		type: o,
		pattern: e.pattern
	}, [x] = (0, w.useState)(c);
	return _s(t, e.defaultValue ?? x, l), vs(e, d, t), {
		labelProps: h,
		inputProps: V(y, n === "input" ? b : void 0, {
			disabled: r,
			readOnly: a,
			required: i && s === "native",
			"aria-required": i && s === "aria" || void 0,
			"aria-invalid": f || void 0,
			"aria-errormessage": e["aria-errormessage"],
			"aria-activedescendant": e["aria-activedescendant"],
			"aria-autocomplete": e["aria-autocomplete"],
			"aria-haspopup": e["aria-haspopup"],
			"aria-controls": e["aria-controls"],
			value: c,
			onChange: (e) => l(W(e).value),
			autoComplete: e.autoComplete,
			autoCapitalize: e.autoCapitalize,
			maxLength: e.maxLength,
			minLength: e.minLength,
			name: e.name,
			form: e.form,
			placeholder: e.placeholder,
			inputMode: e.inputMode,
			autoCorrect: e.autoCorrect,
			spellCheck: e.spellCheck,
			enterKeyHint: e.enterKeyHint,
			onCopy: e.onCopy,
			onCut: e.onCut,
			onPaste: e.onPaste,
			onCompositionEnd: e.onCompositionEnd,
			onCompositionStart: e.onCompositionStart,
			onCompositionUpdate: e.onCompositionUpdate,
			onSelect: e.onSelect,
			onBeforeInput: e.onBeforeInput,
			onInput: e.onInput,
			...u,
			...g
		}),
		descriptionProps: _,
		errorMessageProps: v,
		isInvalid: f,
		validationErrors: p,
		validationDetails: m
	};
}
//#endregion
//#region node_modules/react-aria-components/dist/private/intl/ar-AE.mjs
var Bs = {};
Bs = {
	colorSwatchPicker: "تغييرات الألوان",
	dropzoneLabel: "DropZone",
	selectPlaceholder: "حدد عنصرًا",
	tableResizer: "أداة تغيير الحجم"
};
//#endregion
//#region node_modules/react-aria-components/dist/private/intl/bg-BG.mjs
var Vs = {};
Vs = {
	colorSwatchPicker: "Цветови мостри",
	dropzoneLabel: "DropZone",
	selectPlaceholder: "Изберете предмет",
	tableResizer: "Преоразмерител"
};
//#endregion
//#region node_modules/react-aria-components/dist/private/intl/cs-CZ.mjs
var Hs = {};
Hs = {
	colorSwatchPicker: "Vzorky barev",
	dropzoneLabel: "Místo pro přetažení",
	selectPlaceholder: "Vyberte položku",
	tableResizer: "Změna velikosti"
};
//#endregion
//#region node_modules/react-aria-components/dist/private/intl/da-DK.mjs
var Us = {};
Us = {
	colorSwatchPicker: "Farveprøver",
	dropzoneLabel: "DropZone",
	selectPlaceholder: "Vælg et element",
	tableResizer: "Størrelsesændring"
};
//#endregion
//#region node_modules/react-aria-components/dist/private/intl/de-DE.mjs
var Ws = {};
Ws = {
	colorSwatchPicker: "Farbfelder",
	dropzoneLabel: "Ablegebereich",
	selectPlaceholder: "Element wählen",
	tableResizer: "Größenanpassung"
};
//#endregion
//#region node_modules/react-aria-components/dist/private/intl/el-GR.mjs
var Gs = {};
Gs = {
	colorSwatchPicker: "Χρωματικά δείγματα",
	dropzoneLabel: "DropZone",
	selectPlaceholder: "Επιλέξτε ένα αντικείμενο",
	tableResizer: "Αλλαγή μεγέθους"
};
//#endregion
//#region node_modules/react-aria-components/dist/private/intl/en-US.mjs
var Ks = {};
Ks = {
	selectPlaceholder: "Select an item",
	tableResizer: "Resizer",
	dropzoneLabel: "DropZone",
	colorSwatchPicker: "Color swatches"
};
//#endregion
//#region node_modules/react-aria-components/dist/private/intl/es-ES.mjs
var qs = {};
qs = {
	colorSwatchPicker: "Muestras de colores",
	dropzoneLabel: "DropZone",
	selectPlaceholder: "Seleccionar un artículo",
	tableResizer: "Cambiador de tamaño"
};
//#endregion
//#region node_modules/react-aria-components/dist/private/intl/et-EE.mjs
var Js = {};
Js = {
	colorSwatchPicker: "Värvinäidised",
	dropzoneLabel: "DropZone",
	selectPlaceholder: "Valige üksus",
	tableResizer: "Suuruse muutja"
};
//#endregion
//#region node_modules/react-aria-components/dist/private/intl/fi-FI.mjs
var Ys = {};
Ys = {
	colorSwatchPicker: "Värimallit",
	dropzoneLabel: "DropZone",
	selectPlaceholder: "Valitse kohde",
	tableResizer: "Koon muuttaja"
};
//#endregion
//#region node_modules/react-aria-components/dist/private/intl/fr-FR.mjs
var Xs = {};
Xs = {
	colorSwatchPicker: "Échantillons de couleurs",
	dropzoneLabel: "DropZone",
	selectPlaceholder: "Sélectionner un élément",
	tableResizer: "Redimensionneur"
};
//#endregion
//#region node_modules/react-aria-components/dist/private/intl/he-IL.mjs
var Zs = {};
Zs = {
	colorSwatchPicker: "דוגמיות צבע",
	dropzoneLabel: "DropZone",
	selectPlaceholder: "בחר פריט",
	tableResizer: "שינוי גודל"
};
//#endregion
//#region node_modules/react-aria-components/dist/private/intl/hr-HR.mjs
var Qs = {};
Qs = {
	colorSwatchPicker: "Uzorci boja",
	dropzoneLabel: "Zona spuštanja",
	selectPlaceholder: "Odaberite stavku",
	tableResizer: "Promjena veličine"
};
//#endregion
//#region node_modules/react-aria-components/dist/private/intl/hu-HU.mjs
var $s = {};
$s = {
	colorSwatchPicker: "Színtárak",
	dropzoneLabel: "DropZone",
	selectPlaceholder: "Válasszon ki egy elemet",
	tableResizer: "Átméretező"
};
//#endregion
//#region node_modules/react-aria-components/dist/private/intl/it-IT.mjs
var ec = {};
ec = {
	colorSwatchPicker: "Campioni di colore",
	dropzoneLabel: "Zona di rilascio",
	selectPlaceholder: "Seleziona un elemento",
	tableResizer: "Ridimensionamento"
};
//#endregion
//#region node_modules/react-aria-components/dist/private/intl/ja-JP.mjs
var tc = {};
tc = {
	colorSwatchPicker: "カラースウォッチ",
	dropzoneLabel: "ドロップゾーン",
	selectPlaceholder: "項目を選択",
	tableResizer: "サイズ変更ツール"
};
//#endregion
//#region node_modules/react-aria-components/dist/private/intl/ko-KR.mjs
var nc = {};
nc = {
	colorSwatchPicker: "색상 견본",
	dropzoneLabel: "드롭 영역",
	selectPlaceholder: "항목 선택",
	tableResizer: "크기 조정기"
};
//#endregion
//#region node_modules/react-aria-components/dist/private/intl/lt-LT.mjs
var rc = {};
rc = {
	colorSwatchPicker: "Spalvų pavyzdžiai",
	dropzoneLabel: "„DropZone“",
	selectPlaceholder: "Pasirinkite elementą",
	tableResizer: "Dydžio keitiklis"
};
//#endregion
//#region node_modules/react-aria-components/dist/private/intl/lv-LV.mjs
var ic = {};
ic = {
	colorSwatchPicker: "Krāsu paraugi",
	dropzoneLabel: "DropZone",
	selectPlaceholder: "Izvēlēties vienumu",
	tableResizer: "Izmēra mainītājs"
};
//#endregion
//#region node_modules/react-aria-components/dist/private/intl/nb-NO.mjs
var ac = {};
ac = {
	colorSwatchPicker: "Fargekart",
	dropzoneLabel: "Droppsone",
	selectPlaceholder: "Velg et element",
	tableResizer: "Størrelsesendrer"
};
//#endregion
//#region node_modules/react-aria-components/dist/private/intl/nl-NL.mjs
var oc = {};
oc = {
	colorSwatchPicker: "kleurstalen",
	dropzoneLabel: "DropZone",
	selectPlaceholder: "Selecteer een item",
	tableResizer: "Resizer"
};
//#endregion
//#region node_modules/react-aria-components/dist/private/intl/pl-PL.mjs
var sc = {};
sc = {
	colorSwatchPicker: "Próbki kolorów",
	dropzoneLabel: "Strefa upuszczania",
	selectPlaceholder: "Wybierz element",
	tableResizer: "Zmiana rozmiaru"
};
//#endregion
//#region node_modules/react-aria-components/dist/private/intl/pt-BR.mjs
var cc = {};
cc = {
	colorSwatchPicker: "Amostras de cores",
	dropzoneLabel: "DropZone",
	selectPlaceholder: "Selecione um item",
	tableResizer: "Redimensionador"
};
//#endregion
//#region node_modules/react-aria-components/dist/private/intl/pt-PT.mjs
var lc = {};
lc = {
	colorSwatchPicker: "Amostras de cores",
	dropzoneLabel: "DropZone",
	selectPlaceholder: "Selecione um item",
	tableResizer: "Redimensionador"
};
//#endregion
//#region node_modules/react-aria-components/dist/private/intl/ro-RO.mjs
var uc = {};
uc = {
	colorSwatchPicker: "Specimene de culoare",
	dropzoneLabel: "Zonă de plasare",
	selectPlaceholder: "Selectați un element",
	tableResizer: "Instrument de redimensionare"
};
//#endregion
//#region node_modules/react-aria-components/dist/private/intl/ru-RU.mjs
var dc = {};
dc = {
	colorSwatchPicker: "Цветовые образцы",
	dropzoneLabel: "DropZone",
	selectPlaceholder: "Выберите элемент",
	tableResizer: "Средство изменения размера"
};
//#endregion
//#region node_modules/react-aria-components/dist/private/intl/sk-SK.mjs
var fc = {};
fc = {
	colorSwatchPicker: "Vzorkovníky farieb",
	dropzoneLabel: "DropZone",
	selectPlaceholder: "Vyberte položku",
	tableResizer: "Nástroj na zmenu veľkosti"
};
//#endregion
//#region node_modules/react-aria-components/dist/private/intl/sl-SI.mjs
var pc = {};
pc = {
	colorSwatchPicker: "Barvne palete",
	dropzoneLabel: "DropZone",
	selectPlaceholder: "Izberite element",
	tableResizer: "Spreminjanje velikosti"
};
//#endregion
//#region node_modules/react-aria-components/dist/private/intl/sr-SP.mjs
var mc = {};
mc = {
	colorSwatchPicker: "Uzorci boje",
	dropzoneLabel: "DropZone",
	selectPlaceholder: "Izaberite stavku",
	tableResizer: "Promena veličine"
};
//#endregion
//#region node_modules/react-aria-components/dist/private/intl/sv-SE.mjs
var hc = {};
hc = {
	colorSwatchPicker: "Färgrutor",
	dropzoneLabel: "DropZone",
	selectPlaceholder: "Välj en artikel",
	tableResizer: "Storleksändrare"
};
//#endregion
//#region node_modules/react-aria-components/dist/private/intl/tr-TR.mjs
var gc = {};
gc = {
	colorSwatchPicker: "Renk örnekleri",
	dropzoneLabel: "Bırakma Bölgesi",
	selectPlaceholder: "Bir öğe seçin",
	tableResizer: "Yeniden boyutlandırıcı"
};
//#endregion
//#region node_modules/react-aria-components/dist/private/intl/uk-UA.mjs
var _c = {};
_c = {
	colorSwatchPicker: "Зразки кольорів",
	dropzoneLabel: "DropZone",
	selectPlaceholder: "Виберіть елемент",
	tableResizer: "Засіб змінення розміру"
};
//#endregion
//#region node_modules/react-aria-components/dist/private/intl/zh-CN.mjs
var vc = {};
vc = {
	colorSwatchPicker: "颜色色板",
	dropzoneLabel: "放置区域",
	selectPlaceholder: "选择一个项目",
	tableResizer: "尺寸调整器"
};
//#endregion
//#region node_modules/react-aria-components/dist/private/intl/zh-TW.mjs
var yc = {};
yc = {
	colorSwatchPicker: "色票",
	dropzoneLabel: "放置區",
	selectPlaceholder: "選取項目",
	tableResizer: "大小調整器"
};
//#endregion
//#region node_modules/react-aria-components/dist/private/intlStrings.mjs
var bc = {};
bc = {
	"ar-AE": Bs,
	"bg-BG": Vs,
	"cs-CZ": Hs,
	"da-DK": Us,
	"de-DE": Ws,
	"el-GR": Gs,
	"en-US": Ks,
	"es-ES": qs,
	"et-EE": Js,
	"fi-FI": Ys,
	"fr-FR": Xs,
	"he-IL": Zs,
	"hr-HR": Qs,
	"hu-HU": $s,
	"it-IT": ec,
	"ja-JP": tc,
	"ko-KR": nc,
	"lt-LT": rc,
	"lv-LV": ic,
	"nb-NO": ac,
	"nl-NL": oc,
	"pl-PL": sc,
	"pt-BR": cc,
	"pt-PT": lc,
	"ro-RO": uc,
	"ru-RU": dc,
	"sk-SK": fc,
	"sl-SI": pc,
	"sr-SP": mc,
	"sv-SE": hc,
	"tr-TR": gc,
	"uk-UA": _c,
	"zh-CN": vc,
	"zh-TW": yc
};
//#endregion
//#region node_modules/react-aria-components/dist/private/DragAndDrop.mjs
var xc = /*#__PURE__*/ (0, w.createContext)({}), Sc = /*#__PURE__*/ (0, w.createContext)(null), Cc = /*#__PURE__*/ (0, w.forwardRef)(function(e, t) {
	let { render: n } = (0, w.useContext)(Sc);
	return /*#__PURE__*/ w.createElement(w.Fragment, null, n(e, t));
});
function wc(e, t) {
	let n = e?.renderDropIndicator, r = e?.isVirtualDragging?.(), i = (0, w.useCallback)((e) => {
		if (r || t?.isDropTarget(e)) return n ? n(e) : /*#__PURE__*/ w.createElement(Cc, { target: e });
	}, [
		t?.target,
		r,
		n
	]);
	return e?.useDropIndicator ? i : void 0;
}
function Tc(e, t, n) {
	let r = e.focusedKey, i = null;
	if (t?.isVirtualDragging?.() && n?.target?.type === "item" && (i = n.target.key, n.target.dropPosition === "after")) {
		let e = n.collection.getKeyAfter(i), t = null;
		if (e != null) {
			let r = n.collection.getItem(i)?.level ?? 0;
			for (; e != null;) {
				let i = n.collection.getItem(e);
				if (!i) break;
				if (i.type !== "item") e = n.collection.getKeyAfter(e);
				else {
					if ((i.level ?? 0) <= r) break;
					t = e, e = n.collection.getKeyAfter(e);
				}
			}
		}
		i = e ?? t ?? i;
	}
	return (0, w.useMemo)(() => new Set([r, i].filter((e) => e != null)), [r, i]);
}
//#endregion
//#region node_modules/react-aria-components/dist/private/Header.mjs
var Ec = /*#__PURE__*/ (0, w.createContext)({}), Dc = /*#__PURE__*/ (0, w.createContext)(null);
function Oc(e) {
	let t = (0, w.useRef)({});
	return /*#__PURE__*/ w.createElement(Dc.Provider, { value: t }, e.children);
}
//#endregion
//#region node_modules/react-aria-components/dist/private/SelectionIndicator.mjs
var kc = /*#__PURE__*/ (0, w.createContext)({ isSelected: !1 }), Ac = /*#__PURE__*/ (0, w.createContext)({});
(class extends Ni {
	static {
		this.type = "separator";
	}
	filter(e, t) {
		let n = t.getItem(this.prevKey);
		if (n && n.type !== "separator") {
			let n = this.clone();
			return t.addDescendants(n, e), n;
		}
		return null;
	}
});
//#endregion
//#region node_modules/react-aria/dist/private/listbox/utils.mjs
var jc = /* @__PURE__ */ new WeakMap();
function Mc(e) {
	return typeof e == "string" ? e.replace(/\s*/g, "") : "" + e;
}
function Nc(e, t) {
	let n = jc.get(e);
	if (!n) throw Error("Unknown list");
	return `${n.id}-option-${Mc(t)}`;
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/shadowdom/ShadowTreeWalker.mjs
var Pc = class {
	constructor(e, t, n, r) {
		this._walkerStack = [], this._currentSetFor = /* @__PURE__ */ new Set(), this._acceptNode = (e) => {
			if (e.nodeType === Node.ELEMENT_NODE) {
				let t = e.shadowRoot;
				if (t) {
					let e = this._doc.createTreeWalker(t, this.whatToShow, { acceptNode: this._acceptNode });
					return this._walkerStack.unshift(e), NodeFilter.FILTER_ACCEPT;
				}
				if (typeof this.filter == "function") return this.filter(e);
				if (this.filter?.acceptNode) return this.filter.acceptNode(e);
				if (this.filter === null) return NodeFilter.FILTER_ACCEPT;
			}
			return NodeFilter.FILTER_SKIP;
		}, this._doc = e, this.root = t, this.filter = r ?? null, this.whatToShow = n ?? NodeFilter.SHOW_ALL, this._currentNode = t, this._walkerStack.unshift(e.createTreeWalker(t, n, this._acceptNode));
		let i = t.shadowRoot;
		if (i) {
			let e = this._doc.createTreeWalker(i, this.whatToShow, { acceptNode: this._acceptNode });
			this._walkerStack.unshift(e);
		}
	}
	get currentNode() {
		return this._currentNode;
	}
	set currentNode(e) {
		if (!U(this.root, e)) throw Error("Cannot set currentNode to a node that is not contained by the root node.");
		let t = [], n = e, r = e;
		for (this._currentNode = e; n && n !== this.root;) if (n.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
			let e = n, i = this._doc.createTreeWalker(e, this.whatToShow, { acceptNode: this._acceptNode });
			t.push(i), i.currentNode = r, this._currentSetFor.add(i), n = r = e.host;
		} else n = n.parentNode;
		let i = this._doc.createTreeWalker(this.root, this.whatToShow, { acceptNode: this._acceptNode });
		t.push(i), i.currentNode = r, this._currentSetFor.add(i), this._walkerStack = t;
	}
	get doc() {
		return this._doc;
	}
	firstChild() {
		let e = this.currentNode, t = this.nextNode();
		return U(e, t) ? (t && (this.currentNode = t), t) : (this.currentNode = e, null);
	}
	lastChild() {
		let e = this._walkerStack[0].lastChild();
		return e && (this.currentNode = e), e;
	}
	nextNode() {
		let e = this._walkerStack[0].nextNode();
		if (e) {
			if (e.shadowRoot) {
				let t;
				if (typeof this.filter == "function" ? t = this.filter(e) : this.filter?.acceptNode && (t = this.filter.acceptNode(e)), t === NodeFilter.FILTER_ACCEPT) return this.currentNode = e, e;
				let n = this.nextNode();
				return n && (this.currentNode = n), n;
			}
			return e && (this.currentNode = e), e;
		}
		if (this._walkerStack.length > 1) {
			this._walkerStack.shift();
			let e = this.nextNode();
			return e && (this.currentNode = e), e;
		}
		return null;
	}
	previousNode() {
		let e = this._walkerStack[0];
		if (e.currentNode === e.root) {
			if (this._currentSetFor.has(e)) {
				if (this._currentSetFor.delete(e), this._walkerStack.length > 1) {
					this._walkerStack.shift();
					let e = this.previousNode();
					return e && (this.currentNode = e), e;
				}
				return null;
			}
			return null;
		}
		let t = e.previousNode();
		if (t) {
			if (t.shadowRoot) {
				let e;
				if (typeof this.filter == "function" ? e = this.filter(t) : this.filter?.acceptNode && (e = this.filter.acceptNode(t)), e === NodeFilter.FILTER_ACCEPT) return t && (this.currentNode = t), t;
				let n = this.lastChild();
				return n && (this.currentNode = n), n;
			}
			return t && (this.currentNode = t), t;
		}
		if (this._walkerStack.length > 1) {
			this._walkerStack.shift();
			let e = this.previousNode();
			return e && (this.currentNode = e), e;
		}
		return null;
	}
	nextSibling() {
		return null;
	}
	previousSibling() {
		return null;
	}
	parentNode() {
		return null;
	}
};
function Fc(e, t, n, r) {
	return On() ? new Pc(e, t, n, r) : e.createTreeWalker(t, n, r);
}
//#endregion
//#region node_modules/react-aria/dist/private/focus/FocusScope.mjs
var Ic = /*#__PURE__*/ w.createContext(null), Lc = "react-aria-focus-scope-restore", Rc = null;
function zc(e) {
	let { children: t, contain: n, restoreFocus: r, autoFocus: i } = e, a = (0, w.useRef)(null), o = (0, w.useRef)(null), s = (0, w.useRef)([]), { parentNode: c } = (0, w.useContext)(Ic) || {}, l = (0, w.useMemo)(() => new sl({ scopeRef: s }), [s]);
	B(() => {
		let e = c || cl.root;
		if (cl.getTreeNode(e.scopeRef) && Rc && !Xc(Rc, e.scopeRef)) {
			let t = cl.getTreeNode(Rc);
			t && (e = t);
		}
		e.addChild(l), cl.addNode(l);
	}, [l, c]), B(() => {
		let e = cl.getTreeNode(s);
		e && (e.contain = !!n);
	}, [n]), B(() => {
		let e = a.current?.nextSibling, t = [], n = (e) => e.stopPropagation();
		for (; e && e !== o.current;) t.push(e), e.addEventListener(Lc, n), e = e.nextSibling;
		return s.current = t, () => {
			for (let e of t) e.removeEventListener(Lc, n);
		};
	}, [t]), tl(s, r, n), Gc(s, n), rl(s, r, n), el(s, i), (0, w.useEffect)(() => {
		let e = kn(H(s.current ? s.current[0] : void 0)), t = null;
		if (qc(e, s.current)) {
			for (let n of cl.traverse()) n.scopeRef && qc(e, n.scopeRef.current) && (t = n);
			t === cl.getTreeNode(s) && (Rc = t.scopeRef);
		}
	}, [s]), B(() => () => {
		let e = cl.getTreeNode(s)?.parent?.scopeRef ?? null;
		(s === Rc || Xc(s, Rc)) && (!e || cl.getTreeNode(e)) && (Rc = e), cl.removeTreeNode(s);
	}, [s]);
	let u = (0, w.useMemo)(() => Bc(s), []), d = (0, w.useMemo)(() => ({
		focusManager: u,
		parentNode: l
	}), [l, u]);
	return /*#__PURE__*/ w.createElement(Ic.Provider, { value: d }, /*#__PURE__*/ w.createElement("span", {
		"data-focus-scope-start": !0,
		hidden: !0,
		ref: a
	}), t, /*#__PURE__*/ w.createElement("span", {
		"data-focus-scope-end": !0,
		hidden: !0,
		ref: o
	}));
}
function Bc(e) {
	return {
		focusNext(t = {}) {
			let n = e.current, { from: r, tabbable: i, wrap: a, accept: o } = t, s = r || kn(H(n[0] ?? void 0)), c = n[0].previousElementSibling, l = al(Vc(n), {
				tabbable: i,
				accept: o
			}, n);
			l.currentNode = qc(s, n) ? s : c;
			let u = l.nextNode();
			return !u && a && (l.currentNode = c, u = l.nextNode()), u && Zc(u, !0), u;
		},
		focusPrevious(t = {}) {
			let n = e.current, { from: r, tabbable: i, wrap: a, accept: o } = t, s = r || kn(H(n[0] ?? void 0)), c = n[n.length - 1].nextElementSibling, l = al(Vc(n), {
				tabbable: i,
				accept: o
			}, n);
			l.currentNode = qc(s, n) ? s : c;
			let u = l.previousNode();
			return !u && a && (l.currentNode = c, u = l.previousNode()), u && Zc(u, !0), u;
		},
		focusFirst(t = {}) {
			let n = e.current, { tabbable: r, accept: i } = t, a = al(Vc(n), {
				tabbable: r,
				accept: i
			}, n);
			a.currentNode = n[0].previousElementSibling;
			let o = a.nextNode();
			return o && Zc(o, !0), o;
		},
		focusLast(t = {}) {
			let n = e.current, { tabbable: r, accept: i } = t, a = al(Vc(n), {
				tabbable: r,
				accept: i
			}, n);
			a.currentNode = n[n.length - 1].nextElementSibling;
			let o = a.previousNode();
			return o && Zc(o, !0), o;
		}
	};
}
function Vc(e) {
	return e[0].parentElement;
}
function Hc(e) {
	let t = cl.getTreeNode(Rc);
	for (; t && t.scopeRef !== e;) {
		if (t.contain) return !1;
		t = t.parent;
	}
	return !0;
}
function Uc(e) {
	if (!e.form) return Array.from(H(e).querySelectorAll(`input[type="radio"][name="${CSS.escape(e.name)}"]`)).filter((e) => !e.form);
	let t = e.form.elements.namedItem(e.name), n = bn(e);
	return t instanceof n.RadioNodeList ? Array.from(t).filter((e) => e instanceof n.HTMLInputElement) : t instanceof n.HTMLInputElement ? [t] : [];
}
function Wc(e) {
	if (e.checked) return !0;
	let t = Uc(e);
	return t.length > 0 && !t.some((e) => e.checked);
}
function Gc(e, t) {
	let n = (0, w.useRef)(void 0), r = (0, w.useRef)(void 0);
	B(() => {
		let i = e.current;
		if (!t) {
			r.current &&= (cancelAnimationFrame(r.current), void 0);
			return;
		}
		let a = H(i ? i[0] : void 0), o = (t) => {
			if (t.key !== "Tab" || t.altKey || t.ctrlKey || t.metaKey || !Hc(e) || t.isComposing) return;
			let n = kn(a), r = e.current;
			if (!r || !qc(n, r)) return;
			let i = al(Vc(r), { tabbable: !0 }, r);
			if (!n) return;
			i.currentNode = n;
			let o = t.shiftKey ? i.previousNode() : i.nextNode();
			o ||= (i.currentNode = t.shiftKey ? r[r.length - 1].nextElementSibling : r[0].previousElementSibling, t.shiftKey ? i.previousNode() : i.nextNode()), t.preventDefault(), o && (Zc(o, !0), o instanceof bn(o).HTMLInputElement && o.select());
		}, s = (t) => {
			(!Rc || Xc(Rc, e)) && qc(W(t), e.current) ? (Rc = e, n.current = W(t)) : Hc(e) && !Jc(W(t), e) ? n.current ? Zc(n.current) : Rc && Rc.current && $c(Rc.current) : Hc(e) && (n.current = W(t));
		}, c = (t) => {
			r.current && cancelAnimationFrame(r.current), r.current = requestAnimationFrame(() => {
				let r = Fr(), i = (r === "virtual" || r === null) && cr() && sr(), o = kn(a);
				if (!i && o && Hc(e) && !Jc(o, e)) {
					Rc = e;
					let r = W(t);
					r && r.isConnected ? (n.current = r, Zc(n.current)) : Rc.current && $c(Rc.current);
				}
			});
		};
		return a.addEventListener("keydown", o, !1), a.addEventListener("focusin", s, !1), i?.forEach((e) => e.addEventListener("focusin", s, !1)), i?.forEach((e) => e.addEventListener("focusout", c, !1)), () => {
			a.removeEventListener("keydown", o, !1), a.removeEventListener("focusin", s, !1), i?.forEach((e) => e.removeEventListener("focusin", s, !1)), i?.forEach((e) => e.removeEventListener("focusout", c, !1));
		};
	}, [e, t]), B(() => () => {
		r.current && cancelAnimationFrame(r.current);
	}, [r]);
}
function Kc(e) {
	return Jc(e);
}
function qc(e, t) {
	return !e || !t ? !1 : t.some((t) => U(t, e));
}
function Jc(e, t = null) {
	if (e instanceof Element && e.closest("[data-react-aria-top-layer]")) return !0;
	for (let { scopeRef: n } of cl.traverse(cl.getTreeNode(t))) if (n && qc(e, n.current)) return !0;
	return !1;
}
function Yc(e) {
	return Jc(e, Rc);
}
function Xc(e, t) {
	let n = cl.getTreeNode(t)?.parent;
	for (; n;) {
		if (n.scopeRef === e) return !0;
		n = n.parent;
	}
	return !1;
}
function Zc(e, t = !1) {
	if (e != null && !t) try {
		Qi(e);
	} catch {}
	else if (e != null) try {
		e.focus();
	} catch {}
}
function Qc(e, t = !0) {
	let n = e[0].previousElementSibling, r = Vc(e), i = al(r, { tabbable: t }, e);
	i.currentNode = n;
	let a = i.nextNode();
	return t && !a && (r = Vc(e), i = al(r, { tabbable: !1 }, e), i.currentNode = n, a = i.nextNode()), a;
}
function $c(e, t = !0) {
	Zc(Qc(e, t));
}
function el(e, t) {
	let n = w.useRef(t);
	(0, w.useEffect)(() => {
		n.current && (Rc = e, !qc(kn(H(e.current ? e.current[0] : void 0)), Rc.current) && e.current && $c(e.current)), n.current = !1;
	}, [e]);
}
function tl(e, t, n) {
	B(() => {
		if (t || n) return;
		let r = e.current, i = H(r ? r[0] : void 0), a = (t) => {
			let n = W(t);
			qc(n, e.current) ? Rc = e : Kc(n) || (Rc = null);
		};
		return i.addEventListener("focusin", a, !1), r?.forEach((e) => e.addEventListener("focusin", a, !1)), () => {
			i.removeEventListener("focusin", a, !1), r?.forEach((e) => e.removeEventListener("focusin", a, !1));
		};
	}, [
		e,
		t,
		n
	]);
}
function nl(e) {
	let t = cl.getTreeNode(Rc);
	for (; t && t.scopeRef !== e;) {
		if (t.nodeToRestore) return !1;
		t = t.parent;
	}
	return t?.scopeRef === e;
}
function rl(e, t, n) {
	let r = (0, w.useRef)(typeof document < "u" ? kn(H(e.current ? e.current[0] : void 0)) : null);
	B(() => {
		let r = e.current, i = H(r ? r[0] : void 0);
		if (!t || n) return;
		let a = () => {
			(!Rc || Xc(Rc, e)) && qc(kn(i), e.current) && (Rc = e);
		};
		return i.addEventListener("focusin", a, !1), r?.forEach((e) => e.addEventListener("focusin", a, !1)), () => {
			i.removeEventListener("focusin", a, !1), r?.forEach((e) => e.removeEventListener("focusin", a, !1));
		};
	}, [e, n]), B(() => {
		let r = H(e.current ? e.current[0] : void 0);
		if (!t) return;
		let i = (t) => {
			if (t.key !== "Tab" || t.altKey || t.ctrlKey || t.metaKey || !Hc(e) || t.isComposing) return;
			let n = r.activeElement;
			if (!Jc(n, e) || !nl(e)) return;
			let i = cl.getTreeNode(e);
			if (!i) return;
			let a = i.nodeToRestore, o = al(r.body, { tabbable: !0 });
			o.currentNode = n;
			let s = t.shiftKey ? o.previousNode() : o.nextNode();
			if ((!a || !a.isConnected || a === r.body) && (a = void 0, i.nodeToRestore = void 0), (!s || !Jc(s, e)) && a) {
				o.currentNode = a;
				do
					s = t.shiftKey ? o.previousNode() : o.nextNode();
				while (Jc(s, e));
				t.preventDefault(), t.stopPropagation(), s ? Zc(s, !0) : Kc(a) ? Zc(a, !0) : n.blur();
			}
		};
		return n || r.addEventListener("keydown", i, !0), () => {
			n || r.removeEventListener("keydown", i, !0);
		};
	}, [
		e,
		t,
		n
	]), B(() => {
		let n = H(e.current ? e.current[0] : void 0);
		if (!t) return;
		let i = cl.getTreeNode(e);
		if (i) return i.nodeToRestore = r.current ?? void 0, () => {
			let r = cl.getTreeNode(e);
			if (!r) return;
			let i = r.nodeToRestore, a = kn(n);
			if (t && i && (a && Jc(a, e) || a === n.body && nl(e))) {
				let t = cl.clone();
				requestAnimationFrame(() => {
					if (n.activeElement === n.body) {
						let n = t.getTreeNode(e);
						for (; n;) {
							if (n.nodeToRestore && n.nodeToRestore.isConnected) {
								il(n.nodeToRestore);
								return;
							}
							n = n.parent;
						}
						for (n = t.getTreeNode(e); n;) {
							if (n.scopeRef && n.scopeRef.current && cl.getTreeNode(n.scopeRef)) {
								let e = Qc(n.scopeRef.current, !0);
								if (e) {
									il(e);
									return;
								}
							}
							n = n.parent;
						}
					}
				});
			}
		};
	}, [e, t]);
}
function il(e) {
	e.dispatchEvent(new CustomEvent(Lc, {
		bubbles: !0,
		cancelable: !0
	})) && Zc(e);
}
function al(e, t, n) {
	let r = t?.tabbable ? Gn : Wn, i = H(e?.nodeType === Node.ELEMENT_NODE ? e : null), a = Fc(i, e || i, NodeFilter.SHOW_ELEMENT, { acceptNode(e) {
		return U(t?.from, e) || t?.tabbable && e.tagName === "INPUT" && e.getAttribute("type") === "radio" && (!Wc(e) || a.currentNode.tagName === "INPUT" && a.currentNode.type === "radio" && a.currentNode.name === e.name) ? NodeFilter.FILTER_REJECT : r(e) && (!n || qc(e, n)) && (!t?.accept || t.accept(e)) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
	} });
	return t?.from && (a.currentNode = t.from), a;
}
var ol = class e {
	constructor() {
		this.fastMap = /* @__PURE__ */ new Map(), this.root = new sl({ scopeRef: null }), this.fastMap.set(null, this.root);
	}
	get size() {
		return this.fastMap.size;
	}
	getTreeNode(e) {
		return this.fastMap.get(e);
	}
	addTreeNode(e, t, n) {
		let r = this.fastMap.get(t ?? null);
		if (!r) return;
		let i = new sl({ scopeRef: e });
		r.addChild(i), i.parent = r, this.fastMap.set(e, i), n && (i.nodeToRestore = n);
	}
	addNode(e) {
		this.fastMap.set(e.scopeRef, e);
	}
	removeTreeNode(e) {
		if (e === null) return;
		let t = this.fastMap.get(e);
		if (!t) return;
		let n = t.parent;
		for (let e of this.traverse()) e !== t && t.nodeToRestore && e.nodeToRestore && t.scopeRef && t.scopeRef.current && qc(e.nodeToRestore, t.scopeRef.current) && (e.nodeToRestore = t.nodeToRestore);
		let r = t.children;
		n && (n.removeChild(t), r.size > 0 && r.forEach((e) => n && n.addChild(e))), this.fastMap.delete(t.scopeRef);
	}
	*traverse(e = this.root) {
		if (e.scopeRef != null && (yield e), e.children.size > 0) for (let t of e.children) yield* this.traverse(t);
	}
	clone() {
		let t = new e();
		for (let e of this.traverse()) t.addTreeNode(e.scopeRef, e.parent?.scopeRef ?? null, e.nodeToRestore);
		return t;
	}
}, sl = class {
	constructor(e) {
		this.children = /* @__PURE__ */ new Set(), this.contain = !1, this.scopeRef = e.scopeRef;
	}
	addChild(e) {
		this.children.add(e), e.parent = this;
	}
	removeChild(e) {
		this.children.delete(e), e.parent = void 0;
	}
}, cl = new ol();
//#endregion
//#region node_modules/react-aria/dist/private/selection/utils.mjs
function ll(e) {
	return ar() ? e.altKey : e.ctrlKey;
}
function ul(e, t) {
	let n = `[data-key="${CSS.escape(String(t))}"]`, r = e.current?.dataset.collection;
	return r && (n = `[data-collection="${CSS.escape(r)}"]${n}`), e.current?.querySelector(n);
}
var dl = /* @__PURE__ */ new WeakMap();
function fl(e) {
	let t = $t();
	return dl.set(e, t), t;
}
function pl(e) {
	return dl.get(e);
}
//#endregion
//#region node_modules/react-aria/dist/private/selection/useTypeSelect.mjs
var ml = 1e3;
function hl(e) {
	let { keyboardDelegate: t, selectionManager: n, onTypeSelect: r } = e, i = (0, w.useRef)({
		search: "",
		timeout: void 0
	});
	return (0, w.useEffect)(() => {
		let e = i.current.timeout;
		return () => {
			clearTimeout(e);
		};
	}, [i]), { typeSelectProps: {
		onKeyDownCapture: t.getKeyForSearch ? (e) => {
			if (i.current.search.length > 0 && e.key === " ") {
				if (e.preventDefault(), (!("continuePropagation" in e) || "continuePropagation" in e && !e.isPropagationStopped()) && e.stopPropagation(), i.current.search += " ", t.getKeyForSearch != null) {
					let e = t.getKeyForSearch(i.current.search, n.focusedKey);
					e ??= t.getKeyForSearch(i.current.search), e != null && (n.setFocusedKey(e), r && r(e));
				}
				clearTimeout(i.current.timeout), i.current.timeout = setTimeout(() => {
					i.current.search = "";
				}, ml);
			}
		} : void 0,
		onKeyDown: t.getKeyForSearch ? (e) => {
			let a = gl(e.key);
			if (!(!a || e.ctrlKey || e.metaKey || e.altKey || !U(e.currentTarget, W(e)) || i.current.search.length === 0 && a === " ")) {
				if (i.current.search += a, t.getKeyForSearch != null) {
					let a = t.getKeyForSearch(i.current.search, n.focusedKey);
					if (a ??= t.getKeyForSearch(i.current.search), a != null) n.setFocusedKey(a), r && r(a), e.preventDefault(), "continuePropagation" in e || e.stopPropagation();
					else {
						i.current.search = "", clearTimeout(i.current.timeout), i.current.timeout = void 0;
						return;
					}
				}
				clearTimeout(i.current.timeout), i.current.timeout = setTimeout(() => {
					i.current.search = "";
				}, ml);
			}
		} : void 0
	} };
}
function gl(e) {
	return e.length === 1 || !/^[A-Z]/i.test(e) ? e : "";
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/useUpdateLayoutEffect.mjs
function _l(e, t) {
	let n = (0, w.useRef)(!0), r = (0, w.useRef)(null);
	B(() => (n.current = !0, () => {
		n.current = !1;
	}), []), B(() => {
		n.current ? n.current = !1 : (!r.current || t.some((e, t) => !Object.is(e, r[t]))) && e(), r.current = t;
	}, t);
}
//#endregion
//#region node_modules/react-aria/dist/private/selection/useSelectableCollection.mjs
function vl(e) {
	let { selectionManager: t, keyboardDelegate: n, ref: r, autoFocus: i = !1, shouldFocusWrap: a = !1, disallowEmptySelection: o = !1, disallowSelectAll: s = !1, escapeKeyBehavior: c = "clearSelection", selectOnFocus: l = t.selectionBehavior === "replace", disallowTypeAhead: u = !1, shouldUseVirtualFocus: d, allowsTabNavigation: f = !1, scrollRef: p = r, linkBehavior: m = "action", UNSTABLE_focusOnEntry: h } = e, { direction: g } = mi(), _ = fr(), v = (e, n, i) => {
		if (n != null) {
			if (t.isLink(n) && m === "selection" && l && !ll(e)) {
				(0, Ca.flushSync)(() => {
					t.setFocusedKey(n, i);
				});
				let a = ul(r, n), o = t.getItemProps(n);
				if (a) {
					_.open(a, e, o.href, o.routerOptions);
					return;
				}
				return !1;
			}
			if (t.setFocusedKey(n, i), t.isLink(n) && m === "override") return !1;
			if (e.shiftKey && t.selectionMode === "multiple") {
				t.extendSelection(n);
				return;
			}
			if (l && !ll(e)) {
				t.replaceSelection(n);
				return;
			}
		}
		return !1;
	}, y = (e) => {
		if (n.getKeyBelow) {
			let r = t.focusedKey == null ? n.getFirstKey?.() : n.getKeyBelow?.(t.focusedKey);
			if (r == null && a && (r = n.getFirstKey?.(t.focusedKey)), r != null) {
				v(e, r);
				return;
			}
		}
		return !1;
	}, b = (e) => {
		if (n.getKeyAbove) {
			let r = t.focusedKey == null ? n.getLastKey?.() : n.getKeyAbove?.(t.focusedKey);
			if (r == null && a && (r = n.getLastKey?.(t.focusedKey)), r != null) {
				v(e, r);
				return;
			}
		}
		return !1;
	}, x = (e) => {
		if (n.getFirstKey) {
			if (t.focusedKey === null && e.shiftKey) return !1;
			let r = n.getFirstKey(t.focusedKey, Qr(e));
			if (t.setFocusedKey(r), r != null) {
				if (Qr(e) && e.shiftKey && t.selectionMode === "multiple") {
					t.extendSelection(r);
					return;
				}
				if (l) {
					t.replaceSelection(r);
					return;
				}
			}
		}
		return !1;
	}, S = (e) => {
		if (n.getKeyLeftOf) {
			let r = t.focusedKey == null ? n.getFirstKey?.() : n.getKeyLeftOf?.(t.focusedKey);
			if (r == null && a && (r = g === "rtl" ? n.getFirstKey?.(t.focusedKey) : n.getLastKey?.(t.focusedKey)), r != null) {
				v(e, r, g === "rtl" ? "first" : "last");
				return;
			}
		}
		return !1;
	}, C = (e) => {
		if (n.getKeyRightOf) {
			let r = t.focusedKey == null ? n.getFirstKey?.() : n.getKeyRightOf?.(t.focusedKey);
			if (r == null && a && (r = g === "rtl" ? n.getLastKey?.(t.focusedKey) : n.getFirstKey?.(t.focusedKey)), r != null) {
				v(e, r, g === "rtl" ? "last" : "first");
				return;
			}
		}
		return !1;
	}, T = (e) => {
		if (n.getLastKey) {
			if (t.focusedKey === null && e.shiftKey) return !1;
			let r = n.getLastKey(t.focusedKey, Qr(e));
			if (t.setFocusedKey(r), r != null) {
				if (Qr(e) && e.shiftKey && t.selectionMode === "multiple") {
					t.extendSelection(r);
					return;
				}
				if (l) {
					t.replaceSelection(r);
					return;
				}
			}
		}
		return !1;
	}, E = (e) => {
		if (n.getKeyPageBelow && t.focusedKey != null) {
			let r = n.getKeyPageBelow(t.focusedKey);
			if (r != null) return v(e, r);
		}
		return !1;
	}, D = (e) => {
		if (n.getKeyPageAbove && t.focusedKey != null) {
			let r = n.getKeyPageAbove(t.focusedKey);
			if (r != null) return v(e, r);
		}
		return !1;
	}, O = () => {
		if (t.selectionMode === "multiple" && s !== !0) t.selectAll();
		else return !1;
	}, k = () => {
		if (c === "clearSelection" && !o && t.selectedKeys.size !== 0) t.clearSelection();
		else return !1;
	}, A = () => {
		if (!f && r.current) {
			let e = al(r.current, { tabbable: !0 }), t, n;
			do
				n = e.lastChild(), n && (t = n);
			while (n);
			let i = kn();
			t && (!jn(t) || i && !Gn(i)) && In(t);
		}
		return {
			shouldContinuePropagation: !0,
			shouldPreventDefault: !1
		};
	}, j = () => (!f && r.current && r.current.focus(), {
		shouldContinuePropagation: !0,
		shouldPreventDefault: !1
	}), M = (e, t) => ({
		[tr() ? e + "+Shift+Alt" : e + "+Shift+Control"]: t,
		[e + "+Shift"]: t,
		[tr() ? e + "+Alt" : e + "+Control"]: t,
		[e]: t
	}), { keyboardProps: ee } = fa({
		shortcuts: {
			...M("ArrowDown", y),
			...M("ArrowUp", b),
			...M("ArrowLeft", S),
			...M("ArrowRight", C),
			...M("PageDown", E),
			...M("PageUp", D)
		},
		allowRepeats: !0
	}), { keyboardProps: te } = fa({ shortcuts: {
		...M("Home", x),
		...M("End", T),
		"Mod+A": O,
		Escape: k,
		Tab: A,
		"Tab+Shift": j
	} }), ne = (0, w.useRef)({
		top: 0,
		left: 0
	});
	ni(p, "scroll", () => {
		ne.current = {
			top: p.current?.scrollTop ?? 0,
			left: p.current?.scrollLeft ?? 0
		};
	});
	let N = (e) => {
		if (t.isFocused) {
			U(e.currentTarget, W(e)) || t.setFocused(!1);
			return;
		}
		if (!U(e.currentTarget, W(e))) return;
		let i = Fr();
		t.setFocused(!0);
		let a = (e) => {
			e != null && (t.setFocusedKey(e), l && !t.isSelected(e) && t.replaceSelection(e));
		};
		if (h && (i === "keyboard" || i === "virtual")) a(h === "first" ? n.getFirstKey?.() : n.getLastKey?.());
		else if (t.focusedKey == null) {
			let r = e.relatedTarget;
			r && e.currentTarget.compareDocumentPosition(r) & Node.DOCUMENT_POSITION_FOLLOWING ? a(t.lastSelectedKey ?? n.getLastKey?.()) : a(t.firstSelectedKey ?? n.getFirstKey?.());
		} else p.current && (p.current.scrollTop = ne.current.top, p.current.scrollLeft = ne.current.left);
		if (t.focusedKey != null && p.current) {
			let e = ul(r, t.focusedKey);
			e instanceof HTMLElement && (!jn(e) && !d && In(e), (i === "keyboard" || h && i === "virtual") && Yo(e, { containingElement: r.current }));
		}
	}, re = (e) => {
		U(e.currentTarget, e.relatedTarget) || t.setFocused(!1);
	}, ie = (0, w.useRef)(!1);
	ni(r, yn, d ? (e) => {
		let { detail: n } = e;
		e.stopPropagation(), t.setFocused(!0), n?.focusStrategy === "first" && (ie.current = !0);
	} : void 0);
	let ae = n.getFirstKey?.() ?? null;
	_l(() => {
		if (ie.current) {
			if (ae == null) {
				let e = kn();
				Mn(r.current), Pn(e, null), t.collection.size > 0 && (ie.current = !1);
			} else t.setFocusedKey(ae), ie.current = !1;
		}
	}, [ae, t.collection.size]), _l(() => {
		t.collection.size > 0 && (ie.current = !1);
	}, [t.focusedKey]), ni(r, vn, d ? (e) => {
		e.stopPropagation(), t.setFocused(!1), e.detail?.clearFocusKey && t.setFocusedKey(null);
	} : void 0);
	let oe = (0, w.useRef)(i), se = (0, w.useRef)(!1);
	(0, w.useEffect)(() => {
		if (oe.current) {
			let e = null;
			i === "first" && (e = n.getFirstKey?.() ?? null), i === "last" && (e = n.getLastKey?.() ?? null);
			let a = t.selectedKeys;
			if (a.size) {
				for (let n of a) if (t.canSelectItem(n)) {
					e = n;
					break;
				}
			}
			t.setFocused(!0), t.setFocusedKey(e), e != null && l && !a.size && t.canSelectItem(e) && t.replaceSelection(e), e == null && !d && r.current && Qi(r.current), t.collection.size > 0 && (oe.current = !1, se.current = !0);
		}
	});
	let ce = (0, w.useRef)(t.focusedKey), le = (0, w.useRef)(null);
	(0, w.useEffect)(() => {
		if (t.isFocused && t.focusedKey != null && (t.focusedKey !== ce.current || se.current) && p.current && r.current) {
			let e = Fr(), n = ul(r, t.focusedKey);
			if (!(n instanceof HTMLElement)) return;
			(e === "keyboard" || se.current) && (le.current && cancelAnimationFrame(le.current), le.current = requestAnimationFrame(() => {
				p.current && (qo(p.current, n), e !== "virtual" && Yo(n, { containingElement: r.current }));
			}));
		}
		!d && t.isFocused && t.focusedKey == null && ce.current != null && r.current && Qi(r.current), ce.current = t.focusedKey, se.current = !1;
	}), (0, w.useEffect)(() => () => {
		le.current && cancelAnimationFrame(le.current);
	}, []), ni(r, "react-aria-focus-scope-restore", (e) => {
		e.preventDefault(), t.setFocused(!0);
	});
	let ue = {
		...V(te, ee),
		onFocus: N,
		onBlur: re,
		onMouseDown(e) {
			p.current === W(e) && e.preventDefault();
		}
	}, { typeSelectProps: de } = hl({
		keyboardDelegate: n,
		selectionManager: t
	});
	u || (ue = V(de, ue));
	let fe;
	d || (fe = t.focusedKey == null ? 0 : -1);
	let pe = fl(t.collection);
	return { collectionProps: V(ue, {
		tabIndex: fe,
		"data-collection": pe
	}) };
}
//#endregion
//#region node_modules/react-aria/dist/private/selection/DOMLayoutDelegate.mjs
var yl = class {
	constructor(e) {
		this.ref = e;
	}
	getItemRect(e) {
		let t = this.ref.current;
		if (!t) return null;
		let n = e == null ? null : ul(this.ref, e);
		if (!n) return null;
		let r = t.getBoundingClientRect(), i = n.getBoundingClientRect();
		return {
			x: i.left - r.left - t.clientLeft + t.scrollLeft,
			y: i.top - r.top - t.clientTop + t.scrollTop,
			width: i.width,
			height: i.height
		};
	}
	getContentSize() {
		let e = this.ref.current;
		return {
			width: e?.scrollWidth ?? 0,
			height: e?.scrollHeight ?? 0
		};
	}
	getVisibleRect() {
		let e = this.ref.current;
		return {
			x: e?.scrollLeft ?? 0,
			y: e?.scrollTop ?? 0,
			width: e?.clientWidth ?? 0,
			height: e?.clientHeight ?? 0
		};
	}
}, bl = class {
	constructor(...e) {
		if (e.length === 1) {
			let t = e[0];
			this.collection = t.collection, this.ref = t.ref, this.collator = t.collator, this.disabledKeys = t.disabledKeys || /* @__PURE__ */ new Set(), this.disabledBehavior = t.disabledBehavior || "all", this.orientation = t.orientation || "vertical", this.direction = t.direction, this.layout = t.layout || "stack", this.layoutDelegate = t.layoutDelegate || new yl(t.ref);
		} else this.collection = e[0], this.disabledKeys = e[1], this.ref = e[2], this.collator = e[3], this.layout = "stack", this.orientation = "vertical", this.disabledBehavior = "all", this.layoutDelegate = new yl(this.ref);
		this.layout === "stack" && this.orientation === "vertical" && (this.getKeyLeftOf = void 0, this.getKeyRightOf = void 0);
	}
	isDisabled(e) {
		return this.disabledBehavior === "all" && (e.props?.isDisabled || this.disabledKeys.has(e.key)) && e.props?.disabledBehavior !== "selection";
	}
	findNextNonDisabled(e, t, n = !1) {
		let r = e;
		for (; r != null;) {
			let e = this.collection.getItem(r);
			if (e?.type === "item" && (n || !this.isDisabled(e))) return r;
			r = t(r);
		}
		return null;
	}
	getNextKey(e, t) {
		let n = e;
		return n = this.collection.getKeyAfter(n), this.findNextNonDisabled(n, (e) => this.collection.getKeyAfter(e), t?.includeDisabled);
	}
	getPreviousKey(e, t) {
		let n = e;
		return n = this.collection.getKeyBefore(n), this.findNextNonDisabled(n, (e) => this.collection.getKeyBefore(e), t?.includeDisabled);
	}
	findKey(e, t, n) {
		let r = e, i = this.layoutDelegate.getItemRect(r);
		if (!i || r == null) return null;
		let a = i;
		do {
			if (r = t(r), r == null) break;
			i = this.layoutDelegate.getItemRect(r);
		} while (i && n(a, i) && r != null);
		return r;
	}
	isSameRow(e, t) {
		return e.y === t.y || e.x !== t.x;
	}
	isSameColumn(e, t) {
		return e.x === t.x || e.y !== t.y;
	}
	isReversed(e) {
		let t = this.getNextKey(e), n = ul(this.ref, e);
		if (t != null) {
			let e = ul(this.ref, t);
			return !n || !e ? !1 : n.getBoundingClientRect().top > e.getBoundingClientRect().top;
		}
		let r = this.getPreviousKey(e);
		if (r != null) {
			let e = ul(this.ref, r);
			return !n || !e ? !1 : e.getBoundingClientRect().top > n.getBoundingClientRect().top;
		}
		return !1;
	}
	getKeyBelow(e, t) {
		return this.layout === "grid" && this.orientation === "vertical" ? this.findKey(e, (e) => this.getNextKey(e, t), this.isSameRow) : this.orientation === "vertical" && this.isReversed(e) ? this.getPreviousKey(e, t) : this.getNextKey(e, t);
	}
	getKeyAbove(e, t) {
		return this.layout === "grid" && this.orientation === "vertical" ? this.findKey(e, (e) => this.getPreviousKey(e, t), this.isSameRow) : this.orientation === "vertical" && this.isReversed(e) ? this.getNextKey(e, t) : this.getPreviousKey(e, t);
	}
	getNextColumn(e, t, n) {
		return t ? this.getPreviousKey(e, n) : this.getNextKey(e, n);
	}
	getKeyRightOf(e, t) {
		let n = this.direction === "ltr" ? "getKeyRightOf" : "getKeyLeftOf";
		return this.layoutDelegate[n] ? (e = this.layoutDelegate[n](e), this.findNextNonDisabled(e, (e) => this.layoutDelegate[n](e), t?.includeDisabled)) : this.layout === "grid" ? this.orientation === "vertical" ? this.getNextColumn(e, this.direction === "rtl", t) : this.findKey(e, (e) => this.getNextColumn(e, this.direction === "rtl", t), this.isSameColumn) : this.orientation === "horizontal" ? this.getNextColumn(e, this.direction === "rtl", t) : null;
	}
	getKeyLeftOf(e, t) {
		let n = this.direction === "ltr" ? "getKeyLeftOf" : "getKeyRightOf";
		return this.layoutDelegate[n] ? (e = this.layoutDelegate[n](e), this.findNextNonDisabled(e, (e) => this.layoutDelegate[n](e), t?.includeDisabled)) : this.layout === "grid" ? this.orientation === "vertical" ? this.getNextColumn(e, this.direction === "ltr", t) : this.findKey(e, (e) => this.getNextColumn(e, this.direction === "ltr", t), this.isSameColumn) : this.orientation === "horizontal" ? this.getNextColumn(e, this.direction === "ltr", t) : null;
	}
	getFirstKey() {
		let e = this.collection.getFirstKey();
		return this.findNextNonDisabled(e, (e) => this.collection.getKeyAfter(e));
	}
	getLastKey() {
		let e = this.collection.getLastKey();
		return this.findNextNonDisabled(e, (e) => this.collection.getKeyBefore(e));
	}
	getKeyPageAbove(e) {
		let t = this.ref.current, n = this.layoutDelegate.getItemRect(e);
		if (!n) return null;
		let r = this.isReversed(e);
		if (t && !Wo(t)) return this.getFirstKey();
		let i = e;
		if (this.orientation === "horizontal") {
			let e = Math.max(0, n.x + n.width - this.layoutDelegate.getVisibleRect().width);
			for (; n && n.x > e && i != null;) i = this.getKeyAbove(i), n = i == null ? null : this.layoutDelegate.getItemRect(i);
		} else {
			let e = this.layoutDelegate.getVisibleRect(), t = r ? n.y - e.height : Math.max(0, n.y + n.height - e.height);
			for (; n && n.y > t && i != null;) i = this.getKeyAbove(i), n = i == null ? null : this.layoutDelegate.getItemRect(i);
		}
		return i ?? (r ? this.getLastKey() : this.getFirstKey());
	}
	getKeyPageBelow(e) {
		let t = this.ref.current, n = this.layoutDelegate.getItemRect(e);
		if (!n) return null;
		let r = this.isReversed(e);
		if (t && !Wo(t)) return this.getLastKey();
		let i = e;
		if (this.orientation === "horizontal") {
			let e = Math.min(this.layoutDelegate.getContentSize().width, n.x - n.width + this.layoutDelegate.getVisibleRect().width);
			for (; n && n.x < e && i != null;) i = this.getKeyBelow(i), n = i == null ? null : this.layoutDelegate.getItemRect(i);
		} else {
			let e = Math.min(this.layoutDelegate.getContentSize().height, n.y - n.height + this.layoutDelegate.getVisibleRect().height);
			for (; n && n.y < e && i != null;) i = this.getKeyBelow(i), n = i == null ? null : this.layoutDelegate.getItemRect(i);
		}
		return i ?? (r ? this.getFirstKey() : this.getLastKey());
	}
	getKeyForSearch(e, t) {
		if (!this.collator) return null;
		let n = this.collection, r = t || this.getFirstKey();
		for (; r != null;) {
			let t = n.getItem(r);
			if (!t) return null;
			let i = t.textValue.slice(0, e.length);
			if (t.textValue && this.collator.compare(i, e) === 0) return r;
			r = this.getNextKey(r);
		}
		return null;
	}
}, xl = /* @__PURE__ */ new Map();
function Sl(e) {
	let { locale: t } = mi(), n = t + (e ? Object.entries(e).sort((e, t) => e[0] < t[0] ? -1 : 1).join() : "");
	if (xl.has(n)) return xl.get(n);
	let r = new Intl.Collator(t, e);
	return xl.set(n, r), r;
}
//#endregion
//#region node_modules/react-aria/dist/private/selection/useSelectableList.mjs
function Cl(e) {
	let { selectionManager: t, collection: n, disabledKeys: r, ref: i, keyboardDelegate: a, layoutDelegate: o, orientation: s } = e, c = Sl({
		usage: "search",
		sensitivity: "base"
	}), l = t.disabledBehavior, u = (0, w.useMemo)(() => a || new bl({
		collection: n,
		disabledKeys: r,
		disabledBehavior: l,
		ref: i,
		collator: c,
		layoutDelegate: o,
		orientation: s
	}), [
		a,
		o,
		n,
		r,
		i,
		c,
		l,
		s
	]), { collectionProps: d } = vl({
		...e,
		ref: i,
		selectionManager: t,
		keyboardDelegate: u
	});
	return { listProps: d };
}
//#endregion
//#region node_modules/react-aria/dist/private/listbox/useListBox.mjs
function wl(e, t, n) {
	let r = Za(e, { labelable: !0 }), i = e.selectionBehavior || "toggle", a = e.orientation || "vertical", o = e.linkBehavior || (i === "replace" ? "action" : "override");
	i === "toggle" && o === "action" && (o = "override");
	let { listProps: s } = Cl({
		...e,
		ref: n,
		selectionManager: t.selectionManager,
		collection: t.collection,
		disabledKeys: t.disabledKeys,
		linkBehavior: o
	}), { focusWithinProps: c } = xo({
		onFocusWithin: e.onFocus,
		onBlurWithin: e.onBlur,
		onFocusWithinChange: e.onFocusChange
	}), l = $t(e.id);
	jc.set(t, {
		id: l,
		shouldUseVirtualFocus: e.shouldUseVirtualFocus,
		shouldSelectOnPressUp: e.shouldSelectOnPressUp,
		shouldFocusOnHover: e.shouldFocusOnHover,
		isVirtualized: e.isVirtualized,
		onAction: e.onAction,
		linkBehavior: o,
		UNSTABLE_itemBehavior: e.UNSTABLE_itemBehavior
	});
	let { labelProps: u, fieldProps: d } = jo({
		...e,
		id: l,
		labelElementType: "span"
	});
	return {
		labelProps: u,
		listBoxProps: V(r, c, t.selectionManager.selectionMode === "multiple" ? { "aria-multiselectable": "true" } : {}, {
			role: "listbox",
			"aria-orientation": a,
			...V(d, s)
		})
	};
}
//#endregion
//#region node_modules/react-aria/dist/private/interactions/useLongPress.mjs
var Tl = 500;
function El(e) {
	let { isDisabled: t, pointerType: n, onLongPressStart: r, onLongPressEnd: i, onLongPress: a, threshold: o = Tl, accessibilityDescription: s } = e, c = (0, w.useRef)(void 0), { addGlobalListener: l, removeAllGlobalListeners: u } = oo(), d = (e) => n ? e.pointerType === n : e.pointerType === "mouse" || e.pointerType === "touch", { pressProps: f } = po({
		isDisabled: t,
		onPressStart(e) {
			if (e.continuePropagation(), d(e)) {
				r && r({
					...e,
					type: "longpressstart"
				}), c.current = setTimeout(() => {
					e.target.dispatchEvent(new PointerEvent("pointercancel", { bubbles: !0 })), l(e.target, "click", (e) => e.preventDefault(), { once: !0 }), H(e.target).activeElement !== e.target && In(e.target), a && a({
						...e,
						type: "longpress"
					}), c.current = void 0;
				}, o), e.pointerType === "touch" && l(e.target, "contextmenu", (e) => e.preventDefault(), { once: !0 });
				let t = bn(e.target);
				l(t, "pointerup", () => {
					setTimeout(() => {
						u();
					}, 100);
				}, { once: !0 });
			}
		},
		onPressEnd(e) {
			c.current && clearTimeout(c.current), i && d(e) && i({
				...e,
				type: "longpressend"
			});
		}
	});
	return { longPressProps: V(f, Qo(a && !t ? s : void 0)) };
}
//#endregion
//#region node_modules/react-aria/dist/private/selection/useSelectableItem.mjs
function Dl(e) {
	let { id: t, selectionManager: n, key: r, ref: i, shouldSelectOnPressUp: a, shouldUseVirtualFocus: o, focus: s, isDisabled: c, onAction: l, allowsDifferentPressOrigin: u, linkBehavior: d = "action" } = e, f = fr();
	t = $t(t);
	let p = (e) => {
		if (e.pointerType === "keyboard" && ll(e)) n.toggleSelection(r);
		else {
			if (n.selectionMode === "none") return;
			if (n.isLink(r)) {
				if (d === "selection" && i.current) {
					let t = n.getItemProps(r);
					f.open(i.current, e, t.href, t.routerOptions), n.setSelectedKeys(n.selectedKeys);
					return;
				}
				if (d === "override" || d === "none") return;
			}
			n.selectionMode === "single" ? n.isSelected(r) && !n.disallowEmptySelection ? n.toggleSelection(r) : n.replaceSelection(r) : e && e.shiftKey ? n.extendSelection(r) : n.selectionBehavior === "toggle" || e && (Qr(e) || e.pointerType === "touch" || e.pointerType === "virtual") ? n.toggleSelection(r) : n.replaceSelection(r);
		}
	};
	(0, w.useEffect)(() => {
		r === n.focusedKey && n.isFocused && (o ? Mn(i.current) : s ? s() : kn() !== i.current && i.current && Qi(i.current));
	}, [
		i,
		r,
		n.focusedKey,
		n.childFocusStrategy,
		n.isFocused,
		o
	]), c ||= n.isDisabled(r);
	let m = {};
	!o && !c ? m = {
		tabIndex: r === n.focusedKey ? 0 : -1,
		onFocus(e) {
			W(e) === i.current && n.setFocusedKey(r);
		}
	} : c && (m.onMouseDown = (e) => {
		e.preventDefault();
	}), (0, w.useEffect)(() => {
		c && n.focusedKey === r && n.setFocusedKey(null);
	}, [
		n,
		c,
		r
	]);
	let h = n.isLink(r) && d === "override", g = l && e.UNSTABLE_itemBehavior === "action", _ = n.isLink(r) && d !== "selection" && d !== "none", v = !c && n.canSelectItem(r) && !h && !g, y = (l || _) && !c, b = y && (n.selectionBehavior === "replace" ? !v : !v || n.isEmpty), x = y && v && n.selectionBehavior === "replace", S = b || x, C = (0, w.useRef)(null), T = S && v, E = (0, w.useRef)(!1), D = (0, w.useRef)(!1), O = n.getItemProps(r), k = (e) => {
		l && (l(), i.current?.dispatchEvent(new CustomEvent("react-aria-item-action", { bubbles: !0 }))), _ && i.current && f.open(i.current, e, O.href, O.routerOptions);
	}, A = { ref: i };
	a ? (A.onPressStart = (e) => {
		C.current = e.pointerType, E.current = T, e.pointerType === "keyboard" && (!S || kl(e.key)) && p(e);
	}, u ? (A.onPressUp = b ? void 0 : (e) => {
		e.pointerType === "mouse" && v && p(e);
	}, A.onPress = b ? k : (e) => {
		e.pointerType !== "keyboard" && e.pointerType !== "mouse" && v && p(e);
	}) : A.onPress = (e) => {
		if (b || x && e.pointerType !== "mouse") {
			if (e.pointerType === "keyboard" && !Ol(e.key)) return;
			k(e);
		} else e.pointerType !== "keyboard" && v && p(e);
	}) : (A.onPressStart = (e) => {
		C.current = e.pointerType, E.current = T, D.current = b, v && (e.pointerType === "mouse" && !b || e.pointerType === "keyboard" && (!y || kl(e.key))) && p(e);
	}, A.onPress = (e) => {
		(e.pointerType === "touch" || e.pointerType === "pen" || e.pointerType === "virtual" || e.pointerType === "keyboard" && S && Ol(e.key) || e.pointerType === "mouse" && D.current) && (S ? k(e) : v && p(e));
	});
	let j = pl(n.collection);
	if (m["data-collection"] = j, m["data-key"] = r, A.preventFocusOnPress = o, o && (A = V(A, {
		onPressStart(e) {
			e.pointerType !== "touch" && (n.setFocused(!0), n.setFocusedKey(r));
		},
		onPress(e) {
			e.pointerType === "touch" && (n.setFocused(!0), n.setFocusedKey(r));
		}
	})), O) for (let e of [
		"onPressStart",
		"onPressEnd",
		"onPressChange",
		"onPress",
		"onPressUp",
		"onClick"
	]) O[e] && (A[e] = Ft(A[e], O[e]));
	let { pressProps: M, isPressed: ee } = po(A), te = x ? (e) => {
		C.current === "mouse" && (e.stopPropagation(), e.preventDefault(), k(e));
	} : void 0, { longPressProps: ne } = El({
		isDisabled: !T,
		onLongPress(e) {
			e.pointerType === "touch" && (p(e), n.setSelectionBehavior("toggle"));
		}
	}), N = (e) => {
		C.current === "touch" && E.current && e.preventDefault();
	}, re = d !== "none" && n.isLink(r) ? (e) => {
		pr.isOpening || e.preventDefault();
	} : void 0, ie = V(m, v || b || o && !c ? M : {}, T ? ne : {}, {
		onDoubleClick: te,
		onDragStartCapture: N,
		onClick: re,
		id: t
	}, o ? { onMouseDown: (e) => e.preventDefault() } : void 0), ae = (e) => {
		let t = e;
		for (; t && t !== i.current;) {
			let e = t.getAttribute("data-collection");
			if (e != null) return e !== j;
			t = t.parentElement;
		}
		return Gn(e);
	}, oe = ie.onPointerDown;
	ie.onPointerDown = (e) => {
		let t = W(e);
		t && t !== i.current && ae(t) ? e.stopPropagation() : oe?.(e);
	};
	let se = ie.onMouseDown;
	return ie.onMouseDown = (e) => {
		let t = W(e);
		t && t !== i.current && ae(t) ? e.stopPropagation() : se?.(e);
	}, {
		itemProps: ie,
		isPressed: ee,
		isSelected: n.isSelected(r),
		isFocused: n.isFocused && n.focusedKey === r,
		isDisabled: c,
		allowsSelection: v,
		hasAction: S
	};
}
function Ol(e) {
	return e === "Enter";
}
function kl(e) {
	return e === " ";
}
//#endregion
//#region node_modules/react-stately/dist/private/collections/getChildNodes.mjs
function Al(e, t) {
	return typeof t.getChildren == "function" ? t.getChildren(e.key) : e.childNodes;
}
function jl(e) {
	return Ml(e, 0);
}
function Ml(e, t) {
	if (t < 0) return;
	let n = 0;
	for (let r of e) {
		if (n === t) return r;
		n++;
	}
}
function Nl(e, t, n) {
	if (t.parentKey === n.parentKey) return t.index - n.index;
	let r = [...Pl(e, t), t], i = [...Pl(e, n), n], a = r.slice(0, i.length).findIndex((e, t) => e !== i[t]);
	return a === -1 ? r.findIndex((e) => e === n) >= 0 ? 1 : (i.findIndex((e) => e === t), -1) : (t = r[a], n = i[a], t.index - n.index);
}
function Pl(e, t) {
	let n = [], r = t;
	for (; r?.parentKey != null;) r = e.getItem(r.parentKey), r && n.unshift(r);
	return n;
}
//#endregion
//#region node_modules/react-stately/dist/private/collections/getItemCount.mjs
var Fl = /* @__PURE__ */ new WeakMap();
function Il(e) {
	let t = Fl.get(e);
	if (t != null) return t;
	let n = 0, r = (t) => {
		for (let i of t) i.type === "section" ? r(Al(i, e)) : i.type === "item" && n++;
	};
	return r(e), Fl.set(e, n), n;
}
//#endregion
//#region node_modules/react-aria/dist/private/listbox/useOption.mjs
function Ll(e, t, n) {
	let { key: r } = e, i = jc.get(t), a = e.isDisabled ?? t.selectionManager.isDisabled(r), o = e.isSelected ?? t.selectionManager.isSelected(r), s = e.shouldSelectOnPressUp ?? i?.shouldSelectOnPressUp, c = e.shouldFocusOnHover ?? i?.shouldFocusOnHover, l = e.shouldUseVirtualFocus ?? i?.shouldUseVirtualFocus, u = e.isVirtualized ?? i?.isVirtualized, d = tn(), f = tn(), p = {
		role: "option",
		"aria-disabled": a || void 0,
		"aria-selected": t.selectionManager.selectionMode === "none" ? void 0 : o,
		"aria-label": e["aria-label"],
		"aria-labelledby": d,
		"aria-describedby": f
	}, m = t.collection.getItem(r);
	if (u) {
		let e = Number(m?.index);
		p["aria-posinset"] = Number.isNaN(e) ? void 0 : e + 1, p["aria-setsize"] = Il(t.collection);
	}
	let h = i?.onAction ? () => i?.onAction?.(r) : void 0, g = Nc(t, r), { itemProps: _, isPressed: v, isFocused: y, hasAction: b, allowsSelection: x } = Dl({
		selectionManager: t.selectionManager,
		key: r,
		ref: n,
		shouldSelectOnPressUp: s,
		allowsDifferentPressOrigin: s && c,
		isVirtualized: u,
		shouldUseVirtualFocus: l,
		isDisabled: a,
		onAction: h || m?.props?.onAction ? Ft(m?.props?.onAction, h) : void 0,
		linkBehavior: i?.linkBehavior,
		UNSTABLE_itemBehavior: i?.UNSTABLE_itemBehavior,
		id: g
	}), { hoverProps: S } = Oo({
		isDisabled: a || !c,
		onHoverStart() {
			Pr() || (t.selectionManager.setFocused(!0), t.selectionManager.setFocusedKey(r));
		}
	}), C = Za(m?.props);
	delete C.id;
	let w = gr(m?.props);
	return {
		optionProps: {
			...p,
			...V(C, _, S, w),
			id: g
		},
		labelProps: { id: d },
		descriptionProps: { id: f },
		isFocused: y,
		isFocusVisible: y && t.selectionManager.isFocused && Pr(),
		isSelected: o,
		isDisabled: a,
		isPressed: v,
		allowsSelection: x,
		hasAction: b
	};
}
//#endregion
//#region node_modules/react-aria/dist/private/listbox/useListBoxSection.mjs
function Rl(e) {
	let { heading: t, "aria-label": n } = e, r = $t();
	return {
		itemProps: { role: "presentation" },
		headingProps: t ? {
			id: r,
			role: "presentation",
			onMouseDown: (e) => {
				e.preventDefault();
			}
		} : {},
		groupProps: {
			role: "group",
			"aria-label": n,
			"aria-labelledby": t ? r : void 0
		}
	};
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/inertValue.mjs
function zl(e) {
	let t = w.version.split(".");
	return parseInt(t[0], 10) >= 19 ? e : e ? "true" : void 0;
}
//#endregion
//#region node_modules/react-stately/dist/private/list/ListCollection.mjs
var Bl = class {
	constructor(e) {
		this.keyMap = /* @__PURE__ */ new Map(), this.firstKey = null, this.lastKey = null, this.iterable = e;
		let t = (e) => {
			if (this.keyMap.set(e.key, e), e.childNodes && e.type === "section") for (let n of e.childNodes) t(n);
		};
		for (let n of e) t(n);
		let n = null, r = 0, i = 0;
		for (let [e, t] of this.keyMap) n ? (n.nextKey = e, t.prevKey = n.key) : (this.firstKey = e, t.prevKey = void 0), t.type === "item" && (t.index = r++), (t.type === "section" || t.type === "item") && i++, n = t, n.nextKey = void 0;
		this._size = i, this.lastKey = n?.key ?? null;
	}
	*[Symbol.iterator]() {
		yield* this.iterable;
	}
	get size() {
		return this._size;
	}
	getKeys() {
		return this.keyMap.keys();
	}
	getKeyBefore(e) {
		let t = this.keyMap.get(e);
		return t ? t.prevKey ?? null : null;
	}
	getKeyAfter(e) {
		let t = this.keyMap.get(e);
		return t ? t.nextKey ?? null : null;
	}
	getFirstKey() {
		return this.firstKey;
	}
	getLastKey() {
		return this.lastKey;
	}
	getItem(e) {
		return this.keyMap.get(e) ?? null;
	}
	at(e) {
		let t = [...this.getKeys()];
		return this.getItem(t[e]);
	}
	getChildren(e) {
		return this.keyMap.get(e)?.childNodes || [];
	}
}, Vl = class e extends Set {
	constructor(t, n, r) {
		super(t), t instanceof e ? (this.anchorKey = n ?? t.anchorKey, this.currentKey = r ?? t.currentKey) : (this.anchorKey = n ?? null, this.currentKey = r ?? null);
	}
};
//#endregion
//#region node_modules/react-stately/dist/private/selection/useMultipleSelectionState.mjs
function Hl(e, t) {
	if (e.size !== t.size) return !1;
	for (let n of e) if (!t.has(n)) return !1;
	return !0;
}
function Ul(e) {
	let { selectionMode: t = "none", disallowEmptySelection: n = !1, allowDuplicateSelectionEvents: r, selectionBehavior: i = "toggle", disabledBehavior: a = "all" } = e, o = (0, w.useRef)(!1), [, s] = (0, w.useState)(!1), c = (0, w.useRef)(null), l = (0, w.useRef)(null), [, u] = (0, w.useState)(null), [d, f] = Ai((0, w.useMemo)(() => Wl(e.selectedKeys), [e.selectedKeys]), (0, w.useMemo)(() => Wl(e.defaultSelectedKeys, new Vl()), [e.defaultSelectedKeys]), e.onSelectionChange), p = (0, w.useMemo)(() => e.disabledKeys ? new Set(e.disabledKeys) : /* @__PURE__ */ new Set(), [e.disabledKeys]), [m, h] = (0, w.useState)(i);
	i === "replace" && m === "toggle" && typeof d == "object" && d.size === 0 && h("replace");
	let g = (0, w.useRef)(i);
	return (0, w.useEffect)(() => {
		i !== g.current && (h(i), g.current = i);
	}, [i]), {
		selectionMode: t,
		disallowEmptySelection: n,
		selectionBehavior: m,
		setSelectionBehavior: h,
		get isFocused() {
			return o.current;
		},
		setFocused(e) {
			o.current = e, s(e);
		},
		get focusedKey() {
			return c.current;
		},
		get childFocusStrategy() {
			return l.current;
		},
		setFocusedKey(e, t = "first") {
			c.current = e, l.current = t, u(e);
		},
		selectedKeys: d,
		setSelectedKeys(e) {
			(r || !Hl(e, d)) && f(e);
		},
		disabledKeys: p,
		disabledBehavior: a
	};
}
function Wl(e, t) {
	return e ? e === "all" ? "all" : new Vl(e) : t;
}
//#endregion
//#region node_modules/react-stately/dist/private/selection/SelectionManager.mjs
var Gl = class e {
	constructor(e, t, n) {
		this.collection = e, this.state = t, this.allowsCellSelection = n?.allowsCellSelection ?? !1, this._isSelectAll = null, this.layoutDelegate = n?.layoutDelegate || null, this.fullCollection = n?.fullCollection || null;
	}
	get selectionMode() {
		return this.state.selectionMode;
	}
	get disallowEmptySelection() {
		return this.state.disallowEmptySelection;
	}
	get selectionBehavior() {
		return this.state.selectionBehavior;
	}
	setSelectionBehavior(e) {
		this.state.setSelectionBehavior(e);
	}
	get isFocused() {
		return this.state.isFocused;
	}
	setFocused(e) {
		this.state.setFocused(e);
	}
	get focusedKey() {
		return this.state.focusedKey;
	}
	get childFocusStrategy() {
		return this.state.childFocusStrategy;
	}
	setFocusedKey(e, t) {
		(e == null || this.collection.getItem(e)) && this.state.setFocusedKey(e, t);
	}
	get selectedKeys() {
		return this.state.selectedKeys === "all" ? new Set(this.getSelectAllKeys()) : this.state.selectedKeys;
	}
	get rawSelection() {
		return this.state.selectedKeys;
	}
	isSelected(e) {
		if (this.state.selectionMode === "none") return !1;
		let t = this.getKey(e);
		return t == null ? !1 : this.state.selectedKeys === "all" ? this.canSelectItem(t) : this.state.selectedKeys.has(t);
	}
	get isEmpty() {
		return this.state.selectedKeys !== "all" && this.state.selectedKeys.size === 0;
	}
	get isSelectAll() {
		if (this.isEmpty) return !1;
		if (this.state.selectedKeys === "all") return !0;
		if (this._isSelectAll != null) return this._isSelectAll;
		let e = this.getSelectAllKeys(), t = this.state.selectedKeys;
		return this._isSelectAll = e.every((e) => t.has(e)), this._isSelectAll;
	}
	get firstSelectedKey() {
		let e = null;
		for (let t of this.state.selectedKeys) {
			let n = this.collection.getItem(t);
			(!e || n && Nl(this.collection, n, e) < 0) && (e = n);
		}
		return e?.key ?? null;
	}
	get lastSelectedKey() {
		let e = null;
		for (let t of this.state.selectedKeys) {
			let n = this.collection.getItem(t);
			(!e || n && Nl(this.collection, n, e) > 0) && (e = n);
		}
		return e?.key ?? null;
	}
	get disabledKeys() {
		return this.state.disabledKeys;
	}
	get disabledBehavior() {
		return this.state.disabledBehavior;
	}
	extendSelection(e) {
		if (this.selectionMode === "none") return;
		if (this.selectionMode === "single") {
			this.replaceSelection(e);
			return;
		}
		let t = this.getKey(e);
		if (t == null) return;
		let n;
		if (this.state.selectedKeys === "all") n = new Vl([t], t, t);
		else {
			let e = this.state.selectedKeys, r = e.anchorKey ?? t;
			n = new Vl(e, r, t);
			for (let i of this.getKeyRange(r, e.currentKey ?? t)) n.delete(i);
			for (let e of this.getKeyRange(t, r)) this.canSelectItem(e) && n.add(e);
		}
		this.state.setSelectedKeys(n);
	}
	getKeyRange(e, t) {
		let n = this.collection.getItem(e), r = this.collection.getItem(t);
		return n && r ? Nl(this.collection, n, r) <= 0 ? this.getKeyRangeInternal(e, t) : this.getKeyRangeInternal(t, e) : [];
	}
	getKeyRangeInternal(e, t) {
		if (this.layoutDelegate?.getKeyRange) return this.layoutDelegate.getKeyRange(e, t);
		let n = [], r = e;
		for (; r != null;) {
			let e = this.collection.getItem(r);
			if (e && (e.type === "item" || e.type === "cell" && this.allowsCellSelection) && n.push(r), r === t) return n;
			r = this.collection.getKeyAfter(r);
		}
		return [];
	}
	getKey(e) {
		let t = this.collection.getItem(e);
		if (!t || t.type === "cell" && this.allowsCellSelection) return e;
		for (; t && t.type !== "item" && t.parentKey != null;) t = this.collection.getItem(t.parentKey);
		return !t || t.type !== "item" ? null : t.key;
	}
	toggleSelection(e) {
		if (this.selectionMode === "none") return;
		if (this.selectionMode === "single" && !this.isSelected(e)) {
			this.replaceSelection(e);
			return;
		}
		let t = this.getKey(e);
		if (t == null) return;
		let n = new Vl(this.state.selectedKeys === "all" ? this.getSelectAllKeys() : this.state.selectedKeys);
		n.has(t) ? n.delete(t) : this.canSelectItem(t) && (n.add(t), n.anchorKey = t, n.currentKey = t), !(this.disallowEmptySelection && n.size === 0) && this.state.setSelectedKeys(n);
	}
	replaceSelection(e) {
		if (this.selectionMode === "none") return;
		let t = this.getKey(e);
		if (t == null) return;
		let n = this.canSelectItem(t) ? new Vl([t], t, t) : new Vl();
		this.state.setSelectedKeys(n);
	}
	setSelectedKeys(e) {
		if (this.selectionMode === "none") return;
		let t = new Vl();
		for (let n of e) {
			let e = this.getKey(n);
			if (e != null && (t.add(e), this.selectionMode === "single")) break;
		}
		this.state.setSelectedKeys(t);
	}
	getSelectAllKeys() {
		let e = this.fullCollection ?? this.collection, t = [], n = (r) => {
			for (; r != null;) {
				if (this.canSelectItemIn(r, e)) {
					let i = e.getItem(r);
					i?.type === "item" && t.push(r), i?.hasChildNodes && (this.allowsCellSelection || i.type !== "item") && n(jl(Al(i, e))?.key ?? null);
				}
				r = e.getKeyAfter(r);
			}
		};
		return n(e.getFirstKey()), t;
	}
	selectAll() {
		!this.isSelectAll && this.selectionMode === "multiple" && this.state.setSelectedKeys("all");
	}
	clearSelection() {
		!this.disallowEmptySelection && (this.state.selectedKeys === "all" || this.state.selectedKeys.size > 0) && this.state.setSelectedKeys(new Vl());
	}
	toggleSelectAll() {
		this.isSelectAll ? this.clearSelection() : this.selectAll();
	}
	select(e, t) {
		this.selectionMode !== "none" && (this.selectionMode === "single" ? this.isSelected(e) && !this.disallowEmptySelection ? this.toggleSelection(e) : this.replaceSelection(e) : this.selectionBehavior === "toggle" || t && (t.pointerType === "touch" || t.pointerType === "virtual") ? this.toggleSelection(e) : this.replaceSelection(e));
	}
	isSelectionEqual(e) {
		if (e === this.state.selectedKeys) return !0;
		let t = this.selectedKeys;
		if (e.size !== t.size) return !1;
		for (let n of e) if (!t.has(n)) return !1;
		for (let n of t) if (!e.has(n)) return !1;
		return !0;
	}
	canSelectItem(e) {
		return this.canSelectItemIn(e, this.collection);
	}
	canSelectItemIn(e, t) {
		if (this.state.selectionMode === "none" || this.state.disabledKeys.has(e)) return !1;
		let n = t.getItem(e);
		return !(!n || n?.props?.isDisabled || n.type === "cell" && !this.allowsCellSelection);
	}
	isDisabled(e) {
		let t = this.collection.getItem(e);
		return this.state.disabledBehavior === "all" && (this.state.disabledKeys.has(e) || !!t?.props?.isDisabled) && t?.props?.disabledBehavior !== "selection";
	}
	isLink(e) {
		return !!this.collection.getItem(e)?.props?.href;
	}
	getItemProps(e) {
		return this.collection.getItem(e)?.props;
	}
	withCollection(t) {
		return new e(t, this.state, {
			allowsCellSelection: this.allowsCellSelection,
			layoutDelegate: this.layoutDelegate || void 0,
			fullCollection: this.fullCollection ?? this.collection
		});
	}
}, Kl = class {
	build(e, t) {
		return this.context = t, ql(() => this.iterateCollection(e));
	}
	*iterateCollection(e) {
		let { children: t, items: n } = e;
		if (w.isValidElement(t) && t.type === w.Fragment) yield* this.iterateCollection({
			children: t.props.children,
			items: n
		});
		else if (typeof t == "function") {
			if (!n) throw Error("props.children was a function but props.items is missing");
			let e = 0;
			for (let r of n) yield* this.getFullNode({
				value: r,
				index: e
			}, { renderer: t }), e++;
		} else {
			let e = [];
			w.Children.forEach(t, (t) => {
				t && e.push(t);
			});
			let n = 0;
			for (let t of e) {
				let e = this.getFullNode({
					element: t,
					index: n
				}, {});
				for (let t of e) n++, yield t;
			}
		}
	}
	getKey(e, t, n, r) {
		if (e.key != null) return e.key;
		if (t.type === "cell" && t.key != null) return `${r}${t.key}`;
		let i = t.value;
		if (i != null) {
			let e = i.key ?? i.id;
			if (e == null) throw Error("No key found for item");
			return e;
		}
		return r ? `${r}.${t.index}` : `$.${t.index}`;
	}
	getChildState(e, t) {
		return { renderer: t.renderer || e.renderer };
	}
	*getFullNode(e, t, n, r) {
		if (w.isValidElement(e.element) && e.element.type === w.Fragment) {
			let i = [];
			w.Children.forEach(e.element.props.children, (e) => {
				i.push(e);
			});
			let a = e.index ?? 0;
			for (let e of i) yield* this.getFullNode({
				element: e,
				index: a++
			}, t, n, r);
			return;
		}
		let i = e.element;
		if (!i && e.value && t && t.renderer) {
			let n = this.cache.get(e.value);
			if (n && (!n.shouldInvalidate || !n.shouldInvalidate(this.context))) {
				n.index = e.index, n.parentKey = r ? r.key : null, yield n;
				return;
			}
			i = t.renderer(e.value);
		}
		if (w.isValidElement(i)) {
			let a = i.type;
			if (typeof a != "function" && typeof a.getCollectionNode != "function") {
				let e = i.type;
				throw Error(`Unknown element <${e}> in collection.`);
			}
			let o = a.getCollectionNode(i.props, this.context), s = e.index ?? 0, c = o.next();
			for (; !c.done && c.value;) {
				let a = c.value;
				e.index = s;
				let l = a.key ?? null;
				l ??= a.element ? null : this.getKey(i, e, t, n);
				let u = [...this.getFullNode({
					...a,
					key: l,
					index: s,
					wrapper: Jl(e.wrapper, a.wrapper)
				}, this.getChildState(t, a), n ? `${n}${i.key}` : i.key, r)];
				for (let t of u) {
					if (t.value = a.value ?? e.value ?? null, t.value && this.cache.set(t.value, t), e.type && t.type !== e.type) throw Error(`Unsupported type <${Yl(t.type)}> in <${Yl(r?.type ?? "unknown parent type")}>. Only <${Yl(e.type)}> is supported.`);
					s++, yield t;
				}
				c = o.next(u);
			}
			return;
		}
		if (e.key == null || e.type == null) return;
		let a = this, o = {
			type: e.type,
			props: e.props,
			key: e.key,
			parentKey: r ? r.key : null,
			value: e.value ?? null,
			level: (r?.level ?? 0) + +(r?.type === "item"),
			index: e.index,
			rendered: e.rendered,
			textValue: e.textValue ?? "",
			"aria-label": e["aria-label"],
			wrapper: e.wrapper,
			shouldInvalidate: e.shouldInvalidate,
			hasChildNodes: e.hasChildNodes || !1,
			childNodes: ql(function* () {
				if (!e.hasChildNodes || !e.childNodes) return;
				let n = 0;
				for (let r of e.childNodes()) {
					r.key != null && (r.key = `${o.key}${r.key}`);
					let e = a.getFullNode({
						...r,
						index: n
					}, a.getChildState(t, r), o.key, o);
					for (let t of e) n++, yield t;
				}
			})
		};
		yield o;
	}
	constructor() {
		this.cache = /* @__PURE__ */ new WeakMap();
	}
};
function ql(e) {
	let t = [], n = null;
	return { *[Symbol.iterator]() {
		for (let e of t) yield e;
		n ||= e();
		for (let e of n) t.push(e), yield e;
	} };
}
function Jl(e, t) {
	if (e && t) return (n) => e(t(n));
	if (e) return e;
	if (t) return t;
}
function Yl(e) {
	return e[0].toUpperCase() + e.slice(1);
}
//#endregion
//#region node_modules/react-stately/dist/private/collections/useCollection.mjs
function Xl(e, t, n) {
	let r = (0, w.useMemo)(() => new Kl(), []), { children: i, items: a, collection: o } = e;
	return (0, w.useMemo)(() => o || t(r.build({
		children: i,
		items: a
	}, n)), [
		r,
		i,
		a,
		o,
		n,
		t
	]);
}
//#endregion
//#region node_modules/react-stately/dist/private/list/useListState.mjs
function Zl(e) {
	let { filter: t, layoutDelegate: n } = e, r = Ul(e), i = (0, w.useMemo)(() => e.disabledKeys ? new Set(e.disabledKeys) : /* @__PURE__ */ new Set(), [e.disabledKeys]), a = Xl(e, (0, w.useCallback)((e) => t ? new Bl(t(e)) : new Bl(e), [t]), (0, w.useMemo)(() => ({ suppressTextValueWarning: e.suppressTextValueWarning }), [e.suppressTextValueWarning])), o = (0, w.useMemo)(() => new Gl(a, r, { layoutDelegate: n }), [
		a,
		r,
		n
	]);
	return $l(a, o), {
		collection: a,
		disabledKeys: i,
		selectionManager: o
	};
}
function Ql(e, t) {
	let n = (0, w.useMemo)(() => t ? e.collection.filter(t) : e.collection, [e.collection, t]), r = e.selectionManager.withCollection(n);
	return $l(n, r), {
		collection: n,
		selectionManager: r,
		disabledKeys: e.disabledKeys
	};
}
function $l(e, t) {
	let n = (0, w.useRef)(null);
	(0, w.useEffect)(() => {
		if (t.focusedKey != null && !e.getItem(t.focusedKey) && n.current) {
			let r = n.current.getKeyAfter(t.focusedKey), i = null;
			for (; r != null;) {
				let a = e.getItem(r);
				if (a && a.type === "item" && !t.isDisabled(r)) {
					i = r;
					break;
				}
				r = n.current.getKeyAfter(r);
			}
			if (i == null) for (r = n.current.getKeyBefore(t.focusedKey); r != null;) {
				let a = e.getItem(r);
				if (a && a.type === "item" && !t.isDisabled(r)) {
					i = r;
					break;
				}
				r = n.current.getKeyBefore(r);
			}
			t.setFocusedKey(i);
		}
		n.current = e;
	}, [e, t]);
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/useLoadMoreSentinel.mjs
function eu(e, t) {
	let { collection: n, onLoadMore: r, scrollOffset: i = 1, direction: a = "end" } = e, o = (0, w.useRef)(null), s = ti((e) => {
		for (let t of e) t.isIntersecting && r && r();
	});
	B(() => {
		if (t.current) {
			let e = 100 * i, n = a === "start" ? `${e}% 0px 0px 0px` : `0px ${e}% ${e}% ${e}%`;
			o.current = new IntersectionObserver(s, {
				root: Go(t?.current),
				rootMargin: n
			}), o.current.observe(t.current);
		}
		return () => {
			o.current && o.current.disconnect();
		};
	}, [
		n,
		t,
		i,
		a
	]);
}
//#endregion
//#region node_modules/react-aria-components/dist/private/ListBox.mjs
var tu = /*#__PURE__*/ (0, w.createContext)(null), J = /*#__PURE__*/ (0, w.createContext)(null), nu = /*#__PURE__*/ (0, w.forwardRef)(function(e, t) {
	[e, t] = fn(e, t, tu);
	let n = (0, w.useContext)(J);
	return n ? /*#__PURE__*/ w.createElement(iu, {
		state: n,
		props: e,
		listBoxRef: t
	}) : /*#__PURE__*/ w.createElement(Da, { content: /*#__PURE__*/ w.createElement(Ra, e) }, (n) => /*#__PURE__*/ w.createElement(ru, {
		props: e,
		listBoxRef: t,
		collection: n
	}));
});
function ru({ props: e, listBoxRef: t, collection: n }) {
	e = {
		...e,
		collection: n,
		children: null,
		items: null
	};
	let { layoutDelegate: r } = (0, w.useContext)(Wa), i = Zl({
		...e,
		layoutDelegate: r
	});
	return /*#__PURE__*/ w.createElement(iu, {
		state: i,
		props: e,
		listBoxRef: t
	});
}
function iu({ state: e, props: t, listBoxRef: n }) {
	[t, n] = fn(t, n, ji);
	let { dragAndDropHooks: r, layout: i = "stack", orientation: a = "vertical", filter: o } = t, s = Ql(e, o), { collection: c, selectionManager: l } = s, u = !!r?.useDraggableCollectionState, d = !!r?.useDroppableCollectionState, { direction: f } = mi(), { disabledBehavior: p, disabledKeys: m } = l, h = Sl({
		usage: "search",
		sensitivity: "base"
	}), { isVirtualized: g, layoutDelegate: _, dropTargetDelegate: v, CollectionRoot: y } = (0, w.useContext)(Wa), b = (0, w.useMemo)(() => t.keyboardDelegate || new bl({
		collection: c,
		collator: h,
		ref: n,
		disabledKeys: m,
		disabledBehavior: p,
		layout: i,
		orientation: a,
		direction: f,
		layoutDelegate: _
	}), [
		c,
		h,
		n,
		p,
		m,
		a,
		f,
		t.keyboardDelegate,
		i,
		_
	]), { listBoxProps: x } = wl({
		...t,
		shouldSelectOnPressUp: u || t.shouldSelectOnPressUp,
		keyboardDelegate: b,
		isVirtualized: g
	}, s, n);
	(0, w.useRef)(u), (0, w.useRef)(d), (0, w.useEffect)(() => {}, [u, d]);
	let S, C, T, E = !1, D = null, O = (0, w.useRef)(null);
	if (u && r) {
		S = r.useDraggableCollectionState({
			collection: c,
			selectionManager: l,
			preview: r.renderDragPreview ? O : void 0
		}), r.useDraggableCollection({}, S, n);
		let e = r.DragPreview;
		D = r.renderDragPreview ? /*#__PURE__*/ w.createElement(e, { ref: O }, r.renderDragPreview) : null;
	}
	if (d && r) {
		C = r.useDroppableCollectionState({
			collection: c,
			selectionManager: l
		});
		let e = r.dropTargetDelegate || v || new r.ListDropTargetDelegate(c, n, {
			orientation: a,
			layout: i,
			direction: f
		});
		T = r.useDroppableCollection({
			keyboardDelegate: b,
			dropTargetDelegate: e
		}, C, n), E = C.isDropTarget({ type: "root" });
	}
	let { focusProps: k, isFocused: A, isFocusVisible: j } = So(), M = s.collection.size === 0, ee = {
		isDropTarget: E,
		isEmpty: M,
		isFocused: A,
		isFocusVisible: j,
		layout: t.layout || "stack",
		orientation: a,
		state: s
	}, te = un({
		...t,
		children: void 0,
		defaultClassName: "react-aria-ListBox",
		values: ee
	}), ne = null;
	M && t.renderEmptyState && (ne = /*#__PURE__*/ w.createElement("div", {
		role: "option",
		style: { display: "contents" }
	}, t.renderEmptyState(ee)));
	let N = Za(t, { global: !0 });
	return /*#__PURE__*/ w.createElement(zc, null, /*#__PURE__*/ w.createElement(_n.div, {
		...V(N, te, x, k, T?.collectionProps),
		ref: n,
		slot: t.slot || void 0,
		onScroll: t.onScroll,
		"data-drop-target": E || void 0,
		"data-empty": M || void 0,
		"data-focused": A || void 0,
		"data-focus-visible": j || void 0,
		"data-layout": t.layout || "stack",
		"data-orientation": a
	}, /*#__PURE__*/ w.createElement(ln, { values: [
		[tu, t],
		[J, s],
		[xc, {
			dragAndDropHooks: r,
			dragState: S,
			dropState: C
		}],
		[Ac, { elementType: "div" }],
		[Sc, { render: su }],
		[Ba, {
			name: "ListBoxSection",
			render: au
		}]
	] }, /*#__PURE__*/ w.createElement(Oc, null, /*#__PURE__*/ w.createElement(y, {
		collection: c,
		scrollRef: n,
		persistedKeys: Tc(l, r, C),
		renderDropIndicator: wc(r, C)
	}))), ne, D));
}
function au(e, t, n, r = "react-aria-ListBoxSection") {
	let i = (0, w.useContext)(J), { dragAndDropHooks: a, dropState: o } = (0, w.useContext)(xc), { CollectionBranch: s } = (0, w.useContext)(Wa), [c, l] = pn(), { headingProps: u, groupProps: d } = Rl({
		heading: l,
		"aria-label": e["aria-label"] ?? void 0
	}), f = un({
		...e,
		id: void 0,
		children: void 0,
		defaultClassName: r,
		values: void 0
	}), p = Za(e, { global: !0 });
	return delete p.id, /*#__PURE__*/ w.createElement(_n.section, {
		...V(p, f, d),
		ref: t
	}, /*#__PURE__*/ w.createElement(Ec.Provider, { value: {
		...u,
		ref: c
	} }, /*#__PURE__*/ w.createElement(s, {
		collection: i.collection,
		parent: n,
		renderDropIndicator: wc(a, o)
	})));
}
var ou = /*#__PURE__*/ Fa(Ii, function(e, t, n) {
	let r = sn(t), i = (0, w.useContext)(J), { dragAndDropHooks: a, dragState: o, dropState: s } = (0, w.useContext)(xc), c = o && !(o.isDisabled || o.selectionManager.isDisabled(n.key)), { optionProps: l, labelProps: u, descriptionProps: d, ...f } = Ll({
		key: n.key,
		"aria-label": e?.["aria-label"]
	}, i, r), { hoverProps: p, isHovered: m } = Oo({
		isDisabled: !f.allowsSelection && !f.hasAction && !c,
		onHoverStart: n.props.onHoverStart,
		onHoverChange: n.props.onHoverChange,
		onHoverEnd: n.props.onHoverEnd
	}), { keyboardProps: h } = fa(e), { focusProps: g } = K(e), _ = null;
	o && a && (_ = a.useDraggableItem({
		key: n.key,
		hasAction: f.hasAction
	}, o));
	let v = null;
	s && a && (v = a.useDroppableItem({ target: {
		type: "item",
		key: n.key,
		dropPosition: "on"
	} }, s, r));
	let y = o && o.isDragging(n.key), b = un({
		...e,
		id: void 0,
		children: e.children,
		defaultClassName: "react-aria-ListBoxItem",
		values: {
			...f,
			isHovered: m,
			selectionMode: i.selectionManager.selectionMode,
			selectionBehavior: i.selectionManager.selectionBehavior,
			allowsDragging: !!o,
			isDragging: y,
			isDropTarget: v?.isDropTarget
		}
	});
	(0, w.useEffect)(() => {
		n.textValue;
	}, [n.textValue]);
	let x = e.href ? _n.a : _n.div, S = Za(e, { global: !0 });
	return delete S.id, delete S.onClick, e.href && l.tabIndex == null && (l.tabIndex = -1), /*#__PURE__*/ w.createElement(x, {
		...V(S, b, l, p, h, g, _?.dragProps, v?.dropProps),
		ref: r,
		"data-allows-dragging": !!o || void 0,
		"data-selected": f.isSelected || void 0,
		"data-disabled": f.isDisabled || void 0,
		"data-hovered": m || void 0,
		"data-focused": f.isFocused || void 0,
		"data-focus-visible": f.isFocusVisible || void 0,
		"data-pressed": f.isPressed || void 0,
		"data-dragging": y || void 0,
		"data-drop-target": v?.isDropTarget || void 0,
		"data-selection-mode": i.selectionManager.selectionMode === "none" ? void 0 : i.selectionManager.selectionMode
	}, /*#__PURE__*/ w.createElement(ln, { values: [[Ho, { slots: {
		[cn]: u,
		label: u,
		description: d
	} }], [kc, { isSelected: f.isSelected }]] }, b.children));
});
function su(e, t) {
	t = sn(t);
	let { dragAndDropHooks: n, dropState: r } = (0, w.useContext)(xc), { dropIndicatorProps: i, isHidden: a, isDropTarget: o } = n.useDropIndicator(e, r, t);
	return a ? null : /*#__PURE__*/ w.createElement(lu, {
		...e,
		dropIndicatorProps: i,
		isDropTarget: o,
		ref: t
	});
}
function cu(e, t) {
	let { dropIndicatorProps: n, isDropTarget: r, ...i } = e, a = un({
		...i,
		defaultClassName: "react-aria-DropIndicator",
		values: { isDropTarget: r }
	});
	return /*#__PURE__*/ w.createElement(w.Fragment, null, /*#__PURE__*/ w.createElement(_n.div, {
		...n,
		...a,
		role: "option",
		ref: t,
		"data-drop-target": r || void 0
	}));
}
var lu = /*#__PURE__*/ (0, w.forwardRef)(cu);
Fa(Fi, function(e, t, n) {
	let r = (0, w.useContext)(J), { isLoading: i, onLoadMore: a, scrollOffset: o, ...s } = e, c = (0, w.useRef)(null);
	eu((0, w.useMemo)(() => ({
		onLoadMore: a,
		collection: r?.collection,
		sentinelRef: c,
		scrollOffset: o
	}), [
		a,
		o,
		r?.collection
	]), c);
	let l = un({
		...s,
		id: void 0,
		children: n.rendered,
		defaultClassName: "react-aria-ListBoxLoadingIndicator",
		values: void 0
	});
	return /*#__PURE__*/ w.createElement(w.Fragment, null, /*#__PURE__*/ w.createElement("div", {
		style: {
			position: "relative",
			width: 0,
			height: 0
		},
		inert: zl(!0)
	}, /*#__PURE__*/ w.createElement("div", {
		"data-testid": "loadMoreSentinel",
		ref: c,
		style: {
			position: "absolute",
			height: 1,
			width: 1
		}
	})), i && l.children && /*#__PURE__*/ w.createElement(w.Fragment, null, /*#__PURE__*/ w.createElement(_n.div, {
		...V(Za(e, { global: !0 }), { tabIndex: -1 }),
		...l,
		role: "option",
		ref: t
	}, l.children)));
});
//#endregion
//#region node_modules/react-aria-components/dist/private/OverlayArrow.mjs
var uu = /*#__PURE__*/ (0, w.createContext)({ placement: "bottom" }), du = typeof HTMLElement < "u" && "inert" in HTMLElement.prototype;
function fu(e) {
	return e.dataset.liveAnnouncer === "true" || e.dataset.reactAriaTopLayer !== void 0;
}
var pu = /* @__PURE__ */ new WeakMap(), mu = [];
function hu(e, t) {
	let n = bn(e?.[0]), r = t instanceof n.Element ? { root: t } : t, i = r?.root ?? document.body, a = r?.shouldUseInert && du, o = new Set(e), s = /* @__PURE__ */ new Set(), c = (e) => a && e instanceof n.HTMLElement ? e.inert : e.getAttribute("aria-hidden") === "true", l = (e, t) => {
		a && e instanceof n.HTMLElement ? e.inert = t : t ? e.setAttribute("aria-hidden", "true") : (e.removeAttribute("aria-hidden"), e instanceof n.HTMLElement && (e.inert = !1));
	}, u = /* @__PURE__ */ new Set();
	if (On()) {
		let t = i.getRootNode();
		for (let n of e) {
			let e = n.getRootNode();
			for (; wn(e) && e !== t;) u.add(e), e = e.host.getRootNode();
		}
	}
	let d = (e) => {
		for (let t of e.querySelectorAll("[data-live-announcer], [data-react-aria-top-layer]")) o.add(t);
		let t = (e) => {
			if (s.has(e) || o.has(e) || e.parentElement && s.has(e.parentElement) && e.parentElement.getAttribute("role") !== "row") return NodeFilter.FILTER_REJECT;
			for (let t of o) if (U(e, t)) return NodeFilter.FILTER_SKIP;
			return NodeFilter.FILTER_ACCEPT;
		}, n = Fc(H(e), e, NodeFilter.SHOW_ELEMENT, { acceptNode: t }), r = t(e);
		if (r === NodeFilter.FILTER_ACCEPT && f(e), r !== NodeFilter.FILTER_REJECT) {
			let e = n.nextNode();
			for (; e != null;) f(e), e = n.nextNode();
		}
	}, f = (e) => {
		let t = pu.get(e) ?? 0;
		c(e) && t === 0 || (t === 0 && l(e, !0), s.add(e), pu.set(e, t + 1));
	};
	mu.length && mu[mu.length - 1].disconnect(), d(i);
	let p = new MutationObserver((e) => {
		for (let t of e) if (t.type === "childList") {
			if (t.target.isConnected && ![...o, ...s].some((e) => U(e, t.target))) for (let e of t.addedNodes) (e instanceof HTMLElement || e instanceof SVGElement) && fu(e) ? o.add(e) : e instanceof Element && d(e);
			if (On()) {
				for (let e of u) if (!e.isConnected) {
					p.disconnect();
					break;
				}
			}
		}
	});
	p.observe(i, {
		childList: !0,
		subtree: !0
	});
	let m = /* @__PURE__ */ new Set();
	if (On()) for (let e of u) {
		let t = new MutationObserver((e) => {
			for (let t of e) if (t.type === "childList") {
				if (t.target.isConnected && ![...o, ...s].some((e) => U(e, t.target))) for (let e of t.addedNodes) (e instanceof HTMLElement || e instanceof SVGElement) && fu(e) ? o.add(e) : e instanceof Element && d(e);
				if (On()) {
					for (let e of u) if (!e.isConnected) {
						p.disconnect();
						break;
					}
				}
			}
		});
		t.observe(e, {
			childList: !0,
			subtree: !0
		}), m.add(t);
	}
	let h = {
		visibleNodes: o,
		hiddenNodes: s,
		observe() {
			p.observe(i, {
				childList: !0,
				subtree: !0
			});
		},
		disconnect() {
			p.disconnect();
		}
	};
	return mu.push(h), () => {
		if (p.disconnect(), On()) for (let e of m) e.disconnect();
		for (let e of s) {
			let t = pu.get(e);
			t != null && (t === 1 ? (l(e, !1), pu.delete(e)) : pu.set(e, t - 1));
		}
		h === mu[mu.length - 1] ? (mu.pop(), mu.length && mu[mu.length - 1].observe()) : mu.splice(mu.indexOf(h), 1);
	};
}
function gu(e) {
	let t = mu[mu.length - 1];
	if (t && !t.visibleNodes.has(e)) return t.visibleNodes.add(e), () => {
		t.visibleNodes.delete(e);
	};
}
//#endregion
//#region node_modules/react-aria/dist/private/overlays/calculatePosition.mjs
var Y = {
	top: "top",
	bottom: "top",
	left: "left",
	right: "left"
}, _u = {
	top: "bottom",
	bottom: "top",
	left: "right",
	right: "left"
}, vu = {
	top: "left",
	left: "top"
}, yu = {
	top: "height",
	left: "width"
}, bu = {
	width: "totalWidth",
	height: "totalHeight"
}, xu = {}, Su = () => typeof document < "u" ? window.visualViewport : null;
function Cu(e, t) {
	let n = 0, r = 0, i = 0, a = 0, o = 0, s = 0, c = {}, l = (t?.scale ?? 1) > 1;
	if (e.tagName === "BODY" || e.tagName === "HTML") {
		let l = document.documentElement;
		i = l.clientWidth, a = l.clientHeight, n = t?.width ?? i, r = t?.height ?? a, c.top = l.scrollTop || e.scrollTop, c.left = l.scrollLeft || e.scrollLeft, t && (o = Math.max(0, t.pageTop - (c.top ?? 0)), s = Math.max(0, t.pageLeft - (c.left ?? 0)));
	} else ({width: n, height: r, top: o, left: s} = Pu(e, !1)), c.top = e.scrollTop, c.left = e.scrollLeft, i = n, a = r;
	return or() && (e.tagName === "BODY" || e.tagName === "HTML") && l && (c.top = 0, c.left = 0, o = t?.pageTop ?? 0, s = t?.pageLeft ?? 0), {
		width: n,
		height: r,
		totalWidth: i,
		totalHeight: a,
		scroll: c,
		top: o,
		left: s
	};
}
function wu(e) {
	return {
		top: e.scrollTop,
		left: e.scrollLeft,
		width: e.scrollWidth,
		height: e.scrollHeight
	};
}
function Tu(e, t, n, r, i, a, o) {
	let s = i.scroll[e] ?? 0, c = r[yu[e]], l = o[e] + r.scroll[Y[e]] + a, u = o[e] + r.scroll[Y[e]] + c - a, d = t - s + r.scroll[Y[e]] + o[e] - r[Y[e]], f = t - s + n + r.scroll[Y[e]] + o[e] - r[Y[e]];
	return d < l ? l - d : f > u ? Math.max(u - f, l - d) : 0;
}
function Eu(e) {
	let t = window.getComputedStyle(e);
	return {
		top: parseInt(t.marginTop, 10) || 0,
		bottom: parseInt(t.marginBottom, 10) || 0,
		left: parseInt(t.marginLeft, 10) || 0,
		right: parseInt(t.marginRight, 10) || 0
	};
}
function Du(e) {
	if (xu[e]) return xu[e];
	let [t, n] = e.split(" "), r = Y[t] || "right", i = vu[r];
	Y[n] || (n = "center");
	let a = yu[r], o = yu[i];
	return xu[e] = {
		placement: t,
		crossPlacement: n,
		axis: r,
		crossAxis: i,
		size: a,
		crossSize: o
	}, xu[e];
}
function Ou(e, t, n, r, i, a, o, s, c, l, u) {
	let { placement: d, crossPlacement: f, axis: p, crossAxis: m, size: h, crossSize: g } = r, _ = {};
	_[m] = e[m] ?? 0, f === "center" ? _[m] += ((e[g] ?? 0) - (n[g] ?? 0)) / 2 : f !== m && (_[m] += (e[g] ?? 0) - (n[g] ?? 0)), _[m] += a;
	let v = e[m] - n[g] + c + l, y = e[m] + e[g] - c - l;
	if (_[m] = Mo(_[m], v, y), d === p) {
		let t = s ? u[h] : u[bu[h]];
		_[_u[p]] = Math.floor(t - e[p] + i);
	} else _[p] = Math.floor(e[p] + e[h] + i);
	return _;
}
function ku(e, t, n, r, i, a, o, s, c, l, u) {
	let d = (e.top == null ? c[bu.height] - (e.bottom ?? 0) - o : e.top) - (c.scroll.top ?? 0), f = l ? n.top : 0, p = {
		top: Math.max(t.top + f, (u?.offsetTop ?? t.top) + f),
		bottom: Math.min(t.top + t.height + f, (u?.offsetTop ?? 0) + (u?.height ?? 0))
	};
	return s === "top" ? Math.max(0, d + o - p.top - ((i.top ?? 0) + (i.bottom ?? 0) + a)) : Math.max(0, p.bottom - d - ((i.top ?? 0) + (i.bottom ?? 0) + a));
}
function Au(e, t, n, r, i, a, o, s) {
	let { placement: c, axis: l, size: u } = a;
	return c === l ? Math.max(0, n[l] - (o.scroll[l] ?? 0) - (e[l] + (s ? t[l] : 0)) - (r[l] ?? 0) - r[_u[l]] - i) : Math.max(0, e[u] + e[l] + (s ? t[l] : 0) - n[l] - n[u] + (o.scroll[l] ?? 0) - (r[l] ?? 0) - r[_u[l]] - i);
}
function ju(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m, h, g, _) {
	let v = Du(e), { size: y, crossAxis: b, crossSize: x, placement: S, crossPlacement: C } = v, w = Ou(t, s, n, v, u, d, l, f, m, h, c), T = u, E = Au(s, l, t, i, a + u, v, c, g);
	if (o && n[y] > E) {
		let e = Du(`${_u[S]} ${C}`), r = Ou(t, s, n, e, u, d, l, f, m, h, c);
		Au(s, l, t, i, a + u, e, c, g) > E && (v = e, w = r, T = u);
	}
	let D = "bottom";
	v.axis === "top" ? v.placement === "top" ? D = "top" : v.placement === "bottom" && (D = "bottom") : v.crossAxis === "top" && (v.crossPlacement === "top" ? D = "bottom" : v.crossPlacement === "bottom" && (D = "top"));
	let O = Tu(b, w[b], n[x], s, c, a, l);
	w[b] += O;
	let k = ku(w, s, l, f, i, a, n.height, D, c, g, _);
	p && p < k && (k = p), n.height = Math.min(n.height, k), w = Ou(t, s, n, v, T, d, l, f, m, h, c), O = Tu(b, w[b], n[x], s, c, a, l), w[b] += O;
	let A = {}, j = t[b] - w[b] - i[Y[b]], M = j + .5 * t[x], ee = m / 2 + h, te = Y[b] === "left" ? (i.left ?? 0) + (i.right ?? 0) : (i.top ?? 0) + (i.bottom ?? 0), ne = n[x] - te - m / 2 - h;
	A[b] = Mo(Mo(M, t[b] + m / 2 - (w[b] + i[Y[b]]), t[b] + t[x] - m / 2 - (w[b] + i[Y[b]])), ee, ne), {placement: S, crossPlacement: C} = v, m ? j = A[b] : C === "right" ? j += t[x] : C === "center" && (j += t[x] / 2);
	let N = S === "left" || S === "top" ? n[y] : 0, re = {
		x: S === "top" || S === "bottom" ? j : N,
		y: S === "left" || S === "right" ? j : N
	};
	return {
		position: w,
		maxHeight: k,
		arrowOffsetLeft: A.left,
		arrowOffsetTop: A.top,
		placement: S,
		triggerAnchorPoint: re
	};
}
function Mu(e) {
	let { placement: t, targetNode: n, overlayNode: r, scrollNode: i, padding: a, shouldFlip: o, boundaryElement: s, offset: c, crossOffset: l, maxHeight: u, arrowSize: d = 0, arrowBoundaryOffset: f = 0, targetRect: p } = e, m = Su(), h = r instanceof HTMLElement ? Iu(r) : document.documentElement, g = h === document.documentElement, _ = window.getComputedStyle(h).position, v = !!_ && _ !== "static", y = g ? Pu(n, !1, p) : Fu(n, h, !1, p);
	if (!g) {
		let { marginTop: e, marginLeft: t } = window.getComputedStyle(n);
		y.top += parseInt(e, 10) || 0, y.left += parseInt(t, 10) || 0;
	}
	let b = Pu(r, !0), x = Eu(r);
	b.width += (x.left ?? 0) + (x.right ?? 0), b.height += (x.top ?? 0) + (x.bottom ?? 0);
	let S = wu(i), C = Cu(s, m), w = Cu(h, m), T;
	if ((s.tagName === "BODY" || s.tagName === "HTML") && !g) {
		let e = Nu(h, !1);
		T = {
			top: -(e.top - C.top),
			left: -(e.left - C.left),
			width: 0,
			height: 0
		};
	} else T = (s.tagName === "BODY" || s.tagName === "HTML") && g ? {
		top: 0,
		left: 0,
		width: 0,
		height: 0
	} : Fu(s, h, !1);
	let E = U(s, h);
	return ju(t, y, b, S, x, a, o, C, w, T, c, l, v, u, d, f, E, m);
}
function Nu(e, t) {
	let { top: n, left: r, width: i, height: a } = e.getBoundingClientRect();
	return t && e instanceof e.ownerDocument.defaultView.HTMLElement && (i = e.offsetWidth, a = e.offsetHeight), {
		top: n,
		left: r,
		width: i,
		height: a
	};
}
function Pu(e, t, n) {
	let { top: r, left: i, width: a, height: o } = n || Nu(e, t), { scrollTop: s, scrollLeft: c, clientTop: l, clientLeft: u } = document.documentElement;
	return {
		top: r + s - l,
		left: i + c - u,
		width: a,
		height: o
	};
}
function Fu(e, t, n, r) {
	let i = window.getComputedStyle(e), a;
	if (i.position === "fixed") a = r || Nu(e, n);
	else {
		a = Pu(e, n, r);
		let i = Pu(t, n), o = window.getComputedStyle(t);
		i.top += (parseInt(o.borderTopWidth, 10) || 0) - t.scrollTop, i.left += (parseInt(o.borderLeftWidth, 10) || 0) - t.scrollLeft, a.top -= i.top, a.left -= i.left;
	}
	return a.top -= parseInt(i.marginTop, 10) || 0, a.left -= parseInt(i.marginLeft, 10) || 0, a;
}
function Iu(e) {
	let t = e.offsetParent;
	if (t && t === document.body && window.getComputedStyle(t).position === "static" && !Lu(t) && (t = document.documentElement), t == null) for (t = e.parentElement; t && !Lu(t);) t = t.parentElement;
	return t || document.documentElement;
}
function Lu(e) {
	let t = window.getComputedStyle(e);
	return t.transform !== "none" || /transform|perspective/.test(t.willChange) || t.filter !== "none" || t.contain === "paint" || "backdropFilter" in t && t.backdropFilter !== "none" || "WebkitBackdropFilter" in t && t.WebkitBackdropFilter !== "none";
}
//#endregion
//#region node_modules/react-aria/dist/private/overlays/useCloseOnScroll.mjs
var Ru = /* @__PURE__ */ new WeakMap();
function zu(e) {
	let { triggerRef: t, isOpen: n, onClose: r } = e;
	(0, w.useEffect)(() => !n || r === null ? void 0 : Tn(An(t.current), "scroll", (e) => {
		let n = W(e);
		if (!t.current || n instanceof Node && !U(n, t.current) || n instanceof HTMLInputElement || n instanceof HTMLTextAreaElement) return;
		let i = r || Ru.get(t.current);
		i && i();
	}, !0), [
		n,
		r,
		t
	]);
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/useResizeObserver.mjs
function Bu() {
	return window.ResizeObserver !== void 0;
}
function Vu(e) {
	let { ref: t, box: n, onResize: r } = e, i = ti(r);
	(0, w.useEffect)(() => {
		let e = t?.current;
		if (e) {
			if (Bu()) {
				let t = new window.ResizeObserver((e) => {
					e.length && i();
				});
				return t.observe(e, { box: n }), () => {
					e && t.unobserve(e);
				};
			}
			return window.addEventListener("resize", i, !1), () => {
				window.removeEventListener("resize", i, !1);
			};
		}
	}, [t, n]);
}
//#endregion
//#region node_modules/react-aria/dist/private/overlays/useOverlayPosition.mjs
var Hu = typeof document < "u" ? window.visualViewport : null;
function Uu(e) {
	let { direction: t } = mi(), { arrowSize: n, targetRef: r, overlayRef: i, arrowRef: a, scrollRef: o = i, placement: s = "bottom", containerPadding: c = 12, shouldFlip: l = !0, boundaryElement: u = typeof document < "u" ? document.body : null, offset: d = 0, crossOffset: f = 0, shouldUpdatePosition: p = !0, isOpen: m = !0, onClose: h, maxHeight: g, arrowBoundaryOffset: _ = 0, getTargetRect: v } = e, [y, b] = (0, w.useState)(null), x = [
		p,
		s,
		i.current,
		r.current,
		a?.current,
		o.current,
		c,
		l,
		u,
		d,
		f,
		m,
		t,
		g,
		_,
		n
	], S = (0, w.useRef)(Hu?.scale);
	(0, w.useEffect)(() => {
		m && (S.current = Hu?.scale);
	}, [m]);
	let C = (0, w.useCallback)(() => {
		if (p === !1 || !m || !i.current || !r.current || !u || Hu?.scale !== S.current) return;
		let e = null;
		if (o.current && jn(o.current)) {
			let t = kn()?.getBoundingClientRect(), n = o.current.getBoundingClientRect();
			e = {
				type: "top",
				offset: (t?.top ?? 0) - n.top
			}, e.offset > n.height / 2 && (e.type = "bottom", e.offset = (t?.bottom ?? 0) - n.bottom);
		}
		let h = i.current;
		!g && i.current && (h.style.top = "0px", h.style.bottom = "", h.style.maxHeight = (window.visualViewport?.height ?? window.innerHeight) + "px");
		let y = Mu({
			placement: Gu(s, t),
			overlayNode: i.current,
			targetNode: r.current,
			scrollNode: o.current || i.current,
			padding: c,
			shouldFlip: l,
			boundaryElement: u,
			offset: d,
			crossOffset: f,
			maxHeight: g,
			arrowSize: n ?? (a?.current ? Nu(a.current, !0).width : 0),
			arrowBoundaryOffset: _,
			targetRect: v?.(r.current)
		});
		if (!y.position) return;
		h.style.top = "", h.style.bottom = "", h.style.left = "", h.style.right = "", Object.keys(y.position).forEach((e) => h.style[e] = y.position[e] + "px"), h.style.maxHeight = y.maxHeight == null ? "" : y.maxHeight + "px";
		let x = kn();
		if (e && x && o.current) {
			let t = x.getBoundingClientRect(), n = o.current.getBoundingClientRect(), r = t[e.type] - n[e.type];
			o.current.scrollTop += r - e.offset;
		}
		b(y);
	}, x);
	B(C, x), Wu(C), Vu({
		ref: i,
		onResize: C
	}), Vu({
		ref: r,
		onResize: C
	});
	let T = (0, w.useRef)(!1);
	B(() => {
		let e, t = () => {
			T.current = !0, clearTimeout(e), e = setTimeout(() => {
				T.current = !1;
			}, 500), C();
		}, n = () => {
			T.current && t();
		};
		Hu?.addEventListener("resize", t), Hu?.addEventListener("scroll", n);
		let r = Tn(An(window), "scroll", n);
		return () => {
			Hu?.removeEventListener("resize", t), Hu?.removeEventListener("scroll", n), r();
		};
	}, [C]);
	let E = (0, w.useCallback)(() => {
		T.current || h?.();
	}, [h, T]);
	return zu({
		triggerRef: r,
		isOpen: m,
		onClose: h && E
	}), {
		overlayProps: { style: {
			position: y ? "absolute" : "fixed",
			top: y ? void 0 : 0,
			left: y ? void 0 : 0,
			zIndex: 1e5,
			...y?.position,
			maxHeight: y?.maxHeight ?? "100vh"
		} },
		placement: y?.placement ?? null,
		triggerAnchorPoint: y?.triggerAnchorPoint ?? null,
		arrowProps: {
			"aria-hidden": "true",
			role: "presentation",
			style: {
				left: y?.arrowOffsetLeft,
				top: y?.arrowOffsetTop
			}
		},
		updatePosition: C
	};
}
function Wu(e) {
	B(() => (window.addEventListener("resize", e, !1), () => {
		window.removeEventListener("resize", e, !1);
	}), [e]);
}
function Gu(e, t) {
	return t === "rtl" ? e.replace("start", "right").replace("end", "left") : e.replace("start", "left").replace("end", "right");
}
//#endregion
//#region node_modules/react-aria/dist/private/interactions/useInteractOutside.mjs
function Ku(e) {
	let { ref: t, onInteractOutside: n, isDisabled: r, onInteractOutsideStart: i } = e, a = (0, w.useRef)({
		isPointerDown: !1,
		ignoreEmulatedMouseEvents: !1
	}), o = ti((e) => {
		n && qu(e, t) && (i && i(e), a.current.isPointerDown = !0);
	}), s = ti((e) => {
		n && n(e);
	});
	(0, w.useEffect)(() => {
		let e = a.current;
		if (r) return;
		let n = t.current, i = H(n);
		if (typeof PointerEvent < "u") {
			let n = (n) => {
				e.isPointerDown && qu(n, t) && s(n), e.isPointerDown = !1;
			};
			return i.addEventListener("pointerdown", o, !0), i.addEventListener("click", n, !0), () => {
				i.removeEventListener("pointerdown", o, !0), i.removeEventListener("click", n, !0);
			};
		}
	}, [t, r]);
}
function qu(e, t) {
	if (e.button > 0) return !1;
	let n = W(e);
	if (n) {
		let e = n.ownerDocument;
		if (!e || !U(e.documentElement, n) || n.closest("[data-react-aria-top-layer]")) return !1;
	}
	return t.current ? !e.composedPath().includes(t.current) : !1;
}
//#endregion
//#region node_modules/react-aria/dist/private/overlays/useOverlay.mjs
var Ju = [];
function Yu(e, t) {
	let { onClose: n, shouldCloseOnBlur: r, isOpen: i, isDismissable: a = !1, isKeyboardDismissDisabled: o = !1, shouldCloseOnInteractOutside: s } = e, c = (0, w.useRef)(void 0);
	(0, w.useEffect)(() => {
		if (i && !Ju.includes(t)) return Ju.push(t), () => {
			let e = Ju.indexOf(t);
			e >= 0 && Ju.splice(e, 1);
		};
	}, [i, t]);
	let l = () => {
		Ju[Ju.length - 1] === t && n && n();
	}, u = (e) => {
		let n = Ju[Ju.length - 1];
		c.current = n, (!s || s(W(e))) && n === t && e.stopPropagation();
	}, d = (e) => {
		(!s || s(W(e))) && (Ju[Ju.length - 1] === t && e.stopPropagation(), c.current === t && l()), c.current = void 0;
	}, { keyboardProps: f } = fa({ shortcuts: { Escape: () => {
		if (!o) l();
		else return !1;
	} } });
	Ku({
		ref: t,
		onInteractOutside: a && i ? d : void 0,
		onInteractOutsideStart: u
	});
	let { focusWithinProps: p } = xo({
		isDisabled: !r,
		onBlurWithin: (e) => {
			e.relatedTarget && !Yc(e.relatedTarget) && (!s || s(e.relatedTarget)) && n?.();
		}
	});
	return {
		overlayProps: {
			...f,
			...p
		},
		underlayProps: {}
	};
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/runAfterKeyboard.mjs
var Xu = 200, Zu = 50, X = 600, Z = /* @__PURE__ */ new WeakMap(), Q = /* @__PURE__ */ new Set(), Qu = /* @__PURE__ */ new Set();
function $u(e, t) {
	let n = $r();
	if (e !== n || t.aborted) for (let e of Qu) e(n), Qu.delete(e);
	if (!e && n && or() && !t.aborted) window.clearInterval(Z.get(window)), Z.set(window, ed(Xu));
	else {
		if (e !== n || t.aborted) for (let e of Q) e(n), Q.delete(e);
		(Qu.size + Q.size <= 0 || t.aborted) && (window.clearInterval(Z.get(window)), Z.delete(window));
	}
}
function ed(e = X) {
	return window.setInterval($u, Zu, $r(), AbortSignal.timeout(e));
}
function td(e) {
	if (!Xr()) return e(!1), () => {};
	let t = window.requestAnimationFrame(() => {
		t = window.requestAnimationFrame(() => {
			let t = Zr(document.hasFocus() ? kn() : null);
			if ($r() === t || $r() && !t) return e(t);
			Qu.add(e), Z.has(window) || Z.set(window, ed());
		});
	});
	return () => {
		window.cancelAnimationFrame(t), Qu.delete(e);
	};
}
function nd(e) {
	if (!Xr()) return e(!1), () => {};
	let t = window.requestAnimationFrame(() => {
		t = window.requestAnimationFrame(() => {
			let t = Zr(document.hasFocus() ? kn() : null);
			if ($r() === t) return e(t);
			Q.add(e), Z.has(window) || Z.set(window, ed());
		});
	});
	return () => {
		window.cancelAnimationFrame(t), Q.delete(e);
	};
}
//#endregion
//#region node_modules/react-aria/dist/private/overlays/usePreventScroll.mjs
var rd = typeof document < "u" && window.visualViewport, id = 0, ad;
function od(e = {}) {
	let { isDisabled: t, UNSTABLE_overrideFocus: n } = e;
	B(() => {
		if (!t) return id++, id === 1 && (ad = ir() && or() ? cd() : sd(n)), () => {
			id--, id === 0 && ad();
		};
	}, [t, n]);
}
function sd(e) {
	let t = window.innerWidth - document.documentElement.clientWidth;
	return Ft(t > 0 && ("scrollbarGutter" in document.documentElement.style ? En(document.documentElement, "scrollbar-gutter", "stable") : En(document.documentElement, "padding-right", `${t}px`)), En(document.documentElement, "overflow", "hidden"), e && ud(), e && Xr() && ld());
}
function cd() {
	let e = En(document.documentElement, "overflow", "hidden"), t, n = !1, r = (e) => {
		let r = W(e);
		t = Wo(r, !0) ? r : Go(r, !0), n = !1;
		let i = r.ownerDocument.defaultView.getSelection();
		i && !i.isCollapsed && i.containsNode(r, !0) && (n = !0), e.composedPath().some((e) => e instanceof HTMLInputElement && e.type === "range") && (n = !0), "selectionStart" in r && "selectionEnd" in r && r.selectionStart < r.selectionEnd && r.ownerDocument.activeElement === r && (n = !0);
	}, i = document.createElement("style"), a = io();
	a && (i.nonce = a), i.textContent = "@layer {\n  * {\n    overscroll-behavior: contain;\n  }\n}", document.head.prepend(i);
	let o = (e) => {
		e.touches.length === 2 || n || (!t || t === document.documentElement || t === document.body || t.scrollHeight === t.clientHeight && t.scrollWidth === t.clientWidth) && e.preventDefault();
	}, s = ud(), c = Ft(Tn(document, "touchstart", r, {
		passive: !1,
		capture: !0
	}), Tn(document, "touchmove", o, {
		passive: !1,
		capture: !0
	}), ld());
	return () => {
		e(), c(), i.remove(), s();
	};
}
function ld() {
	return Tn(document, "blur", (e) => {
		let t = W(e), n = e.relatedTarget;
		n && Zr(n) ? n.focus() : n || (t.parentElement?.closest("[tabindex]"))?.focus({ preventScroll: !0 });
	}, !0);
}
function ud() {
	let e = HTMLElement.prototype.focus;
	return Reflect.defineProperty(HTMLElement.prototype, "focus", {
		configurable: !0,
		writable: !0,
		value: function(t) {
			if (e.call(this, {
				...t,
				preventScroll: !0
			}), !t || !t.preventScroll) {
				let e = () => {
					kn() === this && dd(this);
				};
				td((t) => t ? e() : nd(() => e()));
			}
		}
	}), () => {
		Reflect.defineProperty(HTMLElement.prototype, "focus", {
			configurable: !0,
			writable: !0,
			value: e
		});
	};
}
function dd(e) {
	let t = document.scrollingElement || document.documentElement, n = e;
	for (; n && n !== t && n.isConnected;) {
		let e = Go(n);
		if (e !== document.documentElement && e !== document.body && e !== n) {
			let t = e.getBoundingClientRect(), r = n.getBoundingClientRect();
			if (r.top < t.top || r.bottom > t.top + n.clientHeight) {
				let n = t.bottom;
				rd && (n = Math.min(n, rd.offsetTop + rd.height));
				let i = r.top - t.top - ((n - t.top) / 2 - r.height / 2);
				e.scrollTo({
					top: Math.max(0, Math.min(e.scrollHeight - e.clientHeight, e.scrollTop + i)),
					behavior: "smooth"
				});
			}
		}
		n = e.parentElement;
	}
}
//#endregion
//#region node_modules/react-aria/dist/private/overlays/usePopover.mjs
function fd(e, t) {
	let { triggerRef: n, popoverRef: r, groupRef: i, isNonModal: a, isKeyboardDismissDisabled: o, shouldCloseOnInteractOutside: s, ...c } = e, l = c.trigger === "SubmenuTrigger", { overlayProps: u, underlayProps: d } = Yu({
		isOpen: t.isOpen,
		onClose: t.close,
		shouldCloseOnBlur: !0,
		isDismissable: !a || l,
		isKeyboardDismissDisabled: o,
		shouldCloseOnInteractOutside: s
	}, i ?? r), { overlayProps: f, arrowProps: p, placement: m, triggerAnchorPoint: h } = Uu({
		...c,
		targetRef: n,
		overlayRef: r,
		isOpen: t.isOpen,
		onClose: a && !l ? t.close : null,
		getTargetRect: c.getTargetRect ?? (t.point ? () => new DOMRect(t.point.x, t.point.y, 0, 0) : void 0)
	});
	od({ isDisabled: a || !t.isOpen }), (0, w.useEffect)(() => {
		if (t.isOpen && r.current) return a ? gu(i?.current ?? r.current) : hu([i?.current ?? r.current], { shouldUseInert: !0 });
	}, [
		a,
		t.isOpen,
		r,
		i
	]);
	let { focusWithinProps: g } = xo(e);
	return {
		popoverProps: V(u, f, g),
		arrowProps: p,
		underlayProps: d,
		placement: m,
		triggerAnchorPoint: h
	};
}
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/ar-AE.mjs
var pd = {};
pd = { dismiss: "تجاهل" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/bg-BG.mjs
var md = {};
md = { dismiss: "Отхвърляне" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/cs-CZ.mjs
var hd = {};
hd = { dismiss: "Odstranit" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/da-DK.mjs
var gd = {};
gd = { dismiss: "Luk" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/de-DE.mjs
var _d = {};
_d = { dismiss: "Schließen" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/el-GR.mjs
var vd = {};
vd = { dismiss: "Απόρριψη" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/en-US.mjs
var yd = {};
yd = { dismiss: "Dismiss" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/es-ES.mjs
var bd = {};
bd = { dismiss: "Descartar" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/et-EE.mjs
var xd = {};
xd = { dismiss: "Lõpeta" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/fi-FI.mjs
var Sd = {};
Sd = { dismiss: "Hylkää" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/fr-FR.mjs
var Cd = {};
Cd = { dismiss: "Rejeter" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/he-IL.mjs
var wd = {};
wd = { dismiss: "התעלם" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/hr-HR.mjs
var Td = {};
Td = { dismiss: "Odbaci" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/hu-HU.mjs
var Ed = {};
Ed = { dismiss: "Elutasítás" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/it-IT.mjs
var Dd = {};
Dd = { dismiss: "Ignora" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/ja-JP.mjs
var Od = {};
Od = { dismiss: "閉じる" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/ko-KR.mjs
var kd = {};
kd = { dismiss: "무시" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/lt-LT.mjs
var Ad = {};
Ad = { dismiss: "Atmesti" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/lv-LV.mjs
var jd = {};
jd = { dismiss: "Nerādīt" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/nb-NO.mjs
var Md = {};
Md = { dismiss: "Lukk" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/nl-NL.mjs
var Nd = {};
Nd = { dismiss: "Negeren" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/pl-PL.mjs
var Pd = {};
Pd = { dismiss: "Zignoruj" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/pt-BR.mjs
var Fd = {};
Fd = { dismiss: "Descartar" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/pt-PT.mjs
var Id = {};
Id = { dismiss: "Dispensar" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/ro-RO.mjs
var Ld = {};
Ld = { dismiss: "Revocare" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/ru-RU.mjs
var Rd = {};
Rd = { dismiss: "Пропустить" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/sk-SK.mjs
var zd = {};
zd = { dismiss: "Zrušiť" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/sl-SI.mjs
var Bd = {};
Bd = { dismiss: "Opusti" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/sr-SP.mjs
var Vd = {};
Vd = { dismiss: "Odbaci" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/sv-SE.mjs
var Hd = {};
Hd = { dismiss: "Avvisa" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/tr-TR.mjs
var Ud = {};
Ud = { dismiss: "Kapat" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/uk-UA.mjs
var Wd = {};
Wd = { dismiss: "Скасувати" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/zh-CN.mjs
var Gd = {};
Gd = { dismiss: "取消" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/zh-TW.mjs
var Kd = {};
Kd = { dismiss: "關閉" };
//#endregion
//#region node_modules/react-aria/dist/private/overlays/intlStrings.mjs
var qd = {};
qd = {
	"ar-AE": pd,
	"bg-BG": md,
	"cs-CZ": hd,
	"da-DK": gd,
	"de-DE": _d,
	"el-GR": vd,
	"en-US": yd,
	"es-ES": bd,
	"et-EE": xd,
	"fi-FI": Sd,
	"fr-FR": Cd,
	"he-IL": wd,
	"hr-HR": Td,
	"hu-HU": Ed,
	"it-IT": Dd,
	"ja-JP": Od,
	"ko-KR": kd,
	"lt-LT": Ad,
	"lv-LV": jd,
	"nb-NO": Md,
	"nl-NL": Nd,
	"pl-PL": Pd,
	"pt-BR": Fd,
	"pt-PT": Id,
	"ro-RO": Ld,
	"ru-RU": Rd,
	"sk-SK": zd,
	"sl-SI": Bd,
	"sr-SP": Vd,
	"sv-SE": Hd,
	"tr-TR": Ud,
	"uk-UA": Wd,
	"zh-CN": Gd,
	"zh-TW": Kd
};
//#endregion
//#region node_modules/react-aria/dist/private/overlays/DismissButton.mjs
function Jd(e) {
	return e && e.__esModule ? e.default : e;
}
function Yd(e) {
	let { onDismiss: t, ...n } = e, r = ri(n, Oi(Jd(qd), "@react-aria/overlays").format("dismiss")), i = () => {
		t && t();
	};
	return /*#__PURE__*/ w.createElement(ts, null, /*#__PURE__*/ w.createElement("button", {
		...r,
		tabIndex: -1,
		onClick: i,
		style: {
			width: 1,
			height: 1
		}
	}));
}
//#endregion
//#region node_modules/react-aria/dist/private/interactions/PressResponder.mjs
function Xd({ children: e }) {
	let t = (0, w.useMemo)(() => ({ register: () => {} }), []);
	return /*#__PURE__*/ w.createElement(ao.Provider, { value: t }, e);
}
//#endregion
//#region node_modules/react-aria/dist/private/overlays/PortalProvider.mjs
var Zd = /*#__PURE__*/ (0, w.createContext)({});
function Qd() {
	return (0, w.useContext)(Zd) ?? {};
}
//#endregion
//#region node_modules/react-aria/dist/private/overlays/Overlay.mjs
var $d = /*#__PURE__*/ w.createContext(null);
function ef(e) {
	let t = qt(), { portalContainer: n = t ? null : document.body, isExiting: r } = e, [i, a] = (0, w.useState)(!1), o = (0, w.useMemo)(() => ({
		contain: i,
		setContain: a
	}), [i, a]), { getContainer: s } = Qd();
	if (!e.portalContainer && s && (n = s()), !n) return null;
	let c = e.children;
	return e.disableFocusManagement || (c = /*#__PURE__*/ w.createElement(zc, {
		restoreFocus: !0,
		contain: (e.shouldContainFocus || i) && !r
	}, c)), c = /*#__PURE__*/ w.createElement($d.Provider, { value: o }, /*#__PURE__*/ w.createElement(Xd, null, /*#__PURE__*/ w.createElement(ma.Provider, { value: null }, c))), /*#__PURE__*/ Ca.createPortal(c, n);
}
//#endregion
//#region node_modules/react-stately/dist/private/overlays/useOverlayTriggerState.mjs
function tf(e) {
	let [t, n] = Ai(e.isOpen, e.defaultOpen || !1, e.onOpenChange), [r, i] = (0, w.useState)(null);
	return {
		isOpen: t,
		setOpen: n,
		open: (0, w.useCallback)(() => {
			n(!0);
		}, [n]),
		close: (0, w.useCallback)(() => {
			n(!1);
		}, [n]),
		toggle: (0, w.useCallback)(() => {
			n(!t);
		}, [n, t]),
		point: r,
		setPoint: i
	};
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/animation.mjs
function nf(e, t = !0, n) {
	let [r, i] = (0, w.useState)(!0), a = r && t;
	return B(() => {
		if (!t && e.current) return Ft(En(e.current, "opacity", "0"), En(e.current, "clip", "rect(0 0 0 0)"), En(e.current, "clip-path", "inset(50%)"), En(e.current, "mask-image", "linear-gradient(#0000, #0000)"));
	}, [e, t]), B(() => {
		if (a && e.current && "getAnimations" in e.current) for (let t of e.current.getAnimations()) t instanceof CSSTransition && t.cancel();
	}, [e, a]), af(e, a, n, (0, w.useCallback)(() => i(!1), [])), a;
}
function rf(e, t, n) {
	let [r, i] = (0, w.useState)(t ? "open" : "closed");
	switch (r) {
		case "open":
			t || i("exiting");
			break;
		case "closed":
		case "exiting": t && i("open");
	}
	let a = r === "exiting";
	return af(e, a, n, (0, w.useCallback)(() => {
		i((e) => e === "exiting" ? "closed" : e);
	}, [])), a;
}
function af(e, t, n, r) {
	let i = (0, w.useRef)(null), a = ti(n);
	B(() => {
		if (t && e.current && i.current !== t) {
			if (i.current = t, !("getAnimations" in e.current)) {
				r();
				return;
			}
			let n = a?.(e.current), o = e.current.getAnimations().filter((e) => (typeof DocumentTimeline > "u" || e.timeline instanceof DocumentTimeline) && e.playState === "running");
			if (o.length === 0 && !n) {
				r();
				return;
			}
			Promise.all([n, ...o.map((e) => e.finished)]).then(() => {
				(0, Ca.flushSync)(() => {
					r();
				});
			}).catch(() => {});
		}
		i.current = t;
	}, [
		e,
		t,
		r
	]);
}
//#endregion
//#region node_modules/react-aria-components/dist/private/Popover.mjs
var of = /*#__PURE__*/ (0, w.createContext)(null), sf = /*#__PURE__*/ (0, w.createContext)(null), cf = /*#__PURE__*/ (0, w.forwardRef)(function(e, t) {
	[e, t] = fn(e, t, of);
	let n = (0, w.useContext)(Jf), r = tf(e), i = e.isOpen != null || e.defaultOpen != null || !n ? r : n, a = rf(t, i.isOpen), o = e.isExiting || !e.shouldSkipAnimation && a || !1, s = ba(), { direction: c } = mi();
	if (s) {
		let t = e.children;
		return typeof t == "function" && (t = t({
			trigger: e.trigger || null,
			placement: "bottom",
			isEntering: !1,
			isExiting: !1,
			defaultChildren: null
		})), /*#__PURE__*/ w.createElement(w.Fragment, null, t);
	}
	return i && !i.isOpen && !o ? null : /*#__PURE__*/ w.createElement(lf, {
		...e,
		triggerRef: e.triggerRef,
		state: i,
		popoverRef: t,
		isExiting: o,
		dir: c
	});
});
function lf({ state: e, isExiting: t, UNSTABLE_portalContainer: n, clearContexts: r, ...i }) {
	let a = (0, w.useRef)(null), o = (0, w.useRef)(null), s = (0, w.useContext)(sf), c = s && i.trigger === "SubmenuTrigger", [l, u] = (0, w.useState)(!1), { popoverProps: d, underlayProps: f, arrowProps: p, placement: m, triggerAnchorPoint: h } = fd({
		...i,
		offset: i.offset ?? 8,
		arrowRef: a,
		groupRef: c ? s : o
	}, e), g = i.popoverRef, _ = nf(g, !!m && l), v = i.isEntering || !i.shouldSkipAnimation && _ || !1, y = un({
		...i,
		defaultClassName: "react-aria-Popover",
		values: {
			trigger: i.trigger || null,
			placement: m,
			isEntering: v,
			isExiting: t
		}
	}), b = !i.isNonModal || i.trigger === "SubmenuTrigger" || i.trigger === "PreviewTrigger", [x, S] = (0, w.useState)(i.trigger === "PreviewTrigger");
	B(() => {
		g.current && S(b && !g.current.querySelector("[role=dialog]"));
	}, [g, b]), (0, w.useEffect)(() => {
		x && i.trigger !== "PreviewTrigger" && (i.trigger !== "SubmenuTrigger" || Fr() !== "pointer") && g.current && !jn(g.current) && Qi(g.current);
	}, [
		x,
		g,
		i.trigger
	]);
	let C = (0, w.useMemo)(() => {
		let e = y.children;
		for (let t of [of, ...r ?? []]) e = /*#__PURE__*/ w.createElement(t.Provider, { value: null }, e);
		return e;
	}, [y.children, r]), [T, E] = (0, w.useState)(null), D = (0, w.useCallback)(() => {
		i.triggerRef.current && E(i.triggerRef.current.getBoundingClientRect().width + "px");
	}, [i.triggerRef]);
	B(D, [D]), Vu({
		ref: y.style?.["--trigger-width"] ? void 0 : i.triggerRef,
		onResize: D
	});
	let O = {
		...d.style,
		"--trigger-anchor-point": h ? `${h.x}px ${h.y}px` : void 0,
		...y.style,
		"--trigger-width": y.style?.["--trigger-width"] || T
	};
	B(() => td(() => u(!0)), []);
	let k = /*#__PURE__*/ w.createElement(_n.div, {
		...V(Za(i, { global: !0 }), d),
		...y,
		id: x ? i.id : void 0,
		role: x ? "dialog" : void 0,
		tabIndex: x ? -1 : void 0,
		"aria-label": i["aria-label"],
		"aria-labelledby": i["aria-labelledby"],
		ref: g,
		slot: i.slot || void 0,
		style: O,
		dir: i.dir,
		"data-trigger": i.trigger,
		"data-placement": m,
		"data-entering": v || void 0,
		"data-exiting": t || void 0
	}, !i.isNonModal && /*#__PURE__*/ w.createElement(Yd, { onDismiss: e.close }), /*#__PURE__*/ w.createElement(uu.Provider, { value: {
		...p,
		placement: m,
		ref: a
	} }, C), /*#__PURE__*/ w.createElement(Yd, { onDismiss: e.close }));
	return c ? /*#__PURE__*/ w.createElement(ef, {
		...i,
		shouldContainFocus: x && i.trigger !== "PreviewTrigger",
		isExiting: t,
		portalContainer: n ?? s?.current ?? void 0
	}, k) : /*#__PURE__*/ w.createElement(ef, {
		...i,
		shouldContainFocus: x && i.trigger !== "PreviewTrigger",
		isExiting: t,
		portalContainer: n
	}, !i.isNonModal && e.isOpen && /*#__PURE__*/ w.createElement("div", {
		"data-testid": "underlay",
		...f,
		style: {
			position: "fixed",
			inset: 0
		}
	}), /*#__PURE__*/ w.createElement("div", {
		ref: o,
		style: { display: "contents" }
	}, /*#__PURE__*/ w.createElement(sf.Provider, { value: o }, k)));
}
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/ar-AE.mjs
var uf = {};
uf = { longPressMessage: "اضغط مطولاً أو اضغط على Alt + السهم لأسفل لفتح القائمة" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/bg-BG.mjs
var df = {};
df = { longPressMessage: "Натиснете продължително или натиснете Alt+ стрелка надолу, за да отворите менюто" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/cs-CZ.mjs
var ff = {};
ff = { longPressMessage: "Dlouhým stiskem nebo stisknutím kláves Alt + šipka dolů otevřete nabídku" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/da-DK.mjs
var pf = {};
pf = { longPressMessage: "Langt tryk eller tryk på Alt + pil ned for at åbne menuen" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/de-DE.mjs
var mf = {};
mf = { longPressMessage: "Drücken Sie lange oder drücken Sie Alt + Nach-unten, um das Menü zu öffnen" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/el-GR.mjs
var hf = {};
hf = { longPressMessage: "Πιέστε παρατεταμένα ή πατήστε Alt + κάτω βέλος για να ανοίξετε το μενού" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/en-US.mjs
var gf = {};
gf = { longPressMessage: "Long press or press Alt + ArrowDown to open menu" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/es-ES.mjs
var _f = {};
_f = { longPressMessage: "Mantenga pulsado o pulse Alt + flecha abajo para abrir el menú" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/et-EE.mjs
var vf = {};
vf = { longPressMessage: "Menüü avamiseks vajutage pikalt või vajutage klahve Alt + allanool" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/fi-FI.mjs
var yf = {};
yf = { longPressMessage: "Avaa valikko painamalla pohjassa tai näppäinyhdistelmällä Alt + Alanuoli" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/fr-FR.mjs
var bf = {};
bf = { longPressMessage: "Appuyez de manière prolongée ou appuyez sur Alt\xA0+\xA0Flèche vers le bas pour ouvrir le menu." };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/he-IL.mjs
var xf = {};
xf = { longPressMessage: "לחץ לחיצה ארוכה או הקש Alt + ArrowDown כדי לפתוח את התפריט" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/hr-HR.mjs
var Sf = {};
Sf = { longPressMessage: "Dugo pritisnite ili pritisnite Alt + strelicu prema dolje za otvaranje izbornika" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/hu-HU.mjs
var Cf = {};
Cf = { longPressMessage: "Nyomja meg hosszan, vagy nyomja meg az Alt + lefele nyíl gombot a menü megnyitásához" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/it-IT.mjs
var wf = {};
wf = { longPressMessage: "Premi a lungo o premi Alt + Freccia giù per aprire il menu" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/ja-JP.mjs
var Tf = {};
Tf = { longPressMessage: "長押しまたは Alt+下矢印キーでメニューを開く" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/ko-KR.mjs
var Ef = {};
Ef = { longPressMessage: "길게 누르거나 Alt + 아래쪽 화살표를 눌러 메뉴 열기" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/lt-LT.mjs
var Df = {};
Df = { longPressMessage: "Norėdami atidaryti meniu, nuspaudę palaikykite arba paspauskite „Alt + ArrowDown“." };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/lv-LV.mjs
var Of = {};
Of = { longPressMessage: "Lai atvērtu izvēlni, turiet nospiestu vai nospiediet taustiņu kombināciju Alt + lejupvērstā bultiņa" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/nb-NO.mjs
var kf = {};
kf = { longPressMessage: "Langt trykk eller trykk Alt + PilNed for å åpne menyen" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/nl-NL.mjs
var Af = {};
Af = { longPressMessage: "Druk lang op Alt + pijl-omlaag of druk op Alt om het menu te openen" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/pl-PL.mjs
var jf = {};
jf = { longPressMessage: "Naciśnij i przytrzymaj lub naciśnij klawisze Alt + Strzałka w dół, aby otworzyć menu" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/pt-BR.mjs
var Mf = {};
Mf = { longPressMessage: "Pressione e segure ou pressione Alt + Seta para baixo para abrir o menu" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/pt-PT.mjs
var Nf = {};
Nf = { longPressMessage: "Prima continuamente ou prima Alt + Seta Para Baixo para abrir o menu" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/ro-RO.mjs
var Pf = {};
Pf = { longPressMessage: "Apăsați lung sau apăsați pe Alt + săgeată în jos pentru a deschide meniul" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/ru-RU.mjs
var Ff = {};
Ff = { longPressMessage: "Нажмите и удерживайте или нажмите Alt + Стрелка вниз, чтобы открыть меню" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/sk-SK.mjs
var If = {};
If = { longPressMessage: "Ponuku otvoríte dlhým stlačením alebo stlačením klávesu Alt + klávesu so šípkou nadol" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/sl-SI.mjs
var Lf = {};
Lf = { longPressMessage: "Za odprtje menija pritisnite in držite gumb ali pritisnite Alt+puščica navzdol" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/sr-SP.mjs
var Rf = {};
Rf = { longPressMessage: "Dugo pritisnite ili pritisnite Alt + strelicu prema dole da otvorite meni" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/sv-SE.mjs
var zf = {};
zf = { longPressMessage: "Håll nedtryckt eller tryck på Alt + pil nedåt för att öppna menyn" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/tr-TR.mjs
var Bf = {};
Bf = { longPressMessage: "Menüyü açmak için uzun basın veya Alt + Aşağı Ok tuşuna basın" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/uk-UA.mjs
var $ = {};
$ = { longPressMessage: "Довго або звичайно натисніть комбінацію клавіш Alt і стрілка вниз, щоб відкрити меню" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/zh-CN.mjs
var Vf = {};
Vf = { longPressMessage: "长按或按 Alt + 向下方向键以打开菜单" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/zh-TW.mjs
var Hf = {};
Hf = { longPressMessage: "長按或按 Alt+向下鍵以開啟功能表" };
//#endregion
//#region node_modules/react-aria/dist/private/menu/intlStrings.mjs
var Uf = {};
Uf = {
	"ar-AE": uf,
	"bg-BG": df,
	"cs-CZ": ff,
	"da-DK": pf,
	"de-DE": mf,
	"el-GR": hf,
	"en-US": gf,
	"es-ES": _f,
	"et-EE": vf,
	"fi-FI": yf,
	"fr-FR": bf,
	"he-IL": xf,
	"hr-HR": Sf,
	"hu-HU": Cf,
	"it-IT": wf,
	"ja-JP": Tf,
	"ko-KR": Ef,
	"lt-LT": Df,
	"lv-LV": Of,
	"nb-NO": kf,
	"nl-NL": Af,
	"pl-PL": jf,
	"pt-BR": Mf,
	"pt-PT": Nf,
	"ro-RO": Pf,
	"ru-RU": Ff,
	"sk-SK": If,
	"sl-SI": Lf,
	"sr-SP": Rf,
	"sv-SE": zf,
	"tr-TR": Bf,
	"uk-UA": $,
	"zh-CN": Vf,
	"zh-TW": Hf
};
//#endregion
//#region node_modules/react-aria/dist/private/interactions/useContextMenu.mjs
function Wf(e) {
	let { onContextMenu: t } = e, n = (0, w.useRef)(!1), { longPressProps: r } = El({
		onLongPressStart() {
			n.current = !1;
		},
		onLongPress(e) {
			n.current ? n.current = !1 : t?.({
				target: e.target,
				x: e.x,
				y: e.y
			});
		}
	});
	return t ? { contextMenuProps: V(ir() ? r : {}, {
		onContextMenu(e) {
			e.stopPropagation(), e.preventDefault(), n.current = !0;
			let r = e.currentTarget.getBoundingClientRect();
			t({
				target: e.currentTarget,
				x: e.clientX - r.x,
				y: e.clientY - r.y
			});
		},
		onKeyDown(e) {
			if (tr() && e.ctrlKey && e.key === "Enter") {
				n.current = !1;
				let r = e.currentTarget;
				e.stopPropagation(), setTimeout(() => {
					if (n.current) n.current = !1;
					else {
						let e = r.getBoundingClientRect();
						t({
							target: r,
							x: e.width / 2,
							y: e.height / 2
						});
					}
				}, 10);
			}
		}
	}) } : { contextMenuProps: {} };
}
//#endregion
//#region node_modules/react-aria/dist/private/overlays/useOverlayTrigger.mjs
function Gf(e, t, n) {
	let { type: r } = e, { isOpen: i } = t;
	(0, w.useEffect)(() => {
		n && n.current && Ru.set(n.current, t.close);
	});
	let a;
	r === "menu" ? a = !0 : r === "listbox" && (a = "listbox");
	let o = $t();
	return {
		triggerProps: {
			"aria-haspopup": a,
			"aria-expanded": i,
			"aria-controls": i ? o : void 0,
			onPress: t.toggle
		},
		overlayProps: { id: o }
	};
}
//#endregion
//#region node_modules/react-aria/dist/private/menu/useMenuTrigger.mjs
function Kf(e) {
	return e && e.__esModule ? e.default : e;
}
function qf(e, t, n) {
	let { type: r = "menu", isDisabled: i, trigger: a = "press" } = e, o = $t(), { triggerProps: s, overlayProps: c } = Gf({ type: r }, t, n), l = (e, n, r = "first") => {
		if (!e || n.isDefaultPrevented()) return !1;
		t.toggle(r);
	}, { keyboardProps: u } = fa({
		isDisabled: i,
		shortcuts: {
			Enter: (e) => l(a !== "longPress", e, "first"),
			" ": (e) => l(a !== "longPress", e, "first"),
			ArrowDown: (e) => l(a !== "longPress", e, "first"),
			ArrowUp: (e) => l(a !== "longPress", e, "last"),
			"Alt+Enter": (e) => l(a === "longPress", e, "first"),
			"Alt+ ": (e) => l(a === "longPress", e, "first"),
			"Alt+ArrowDown": (e) => l(!0, e, "first"),
			"Alt+ArrowUp": (e) => l(!0, e, "last")
		}
	}), d = Oi(Kf(Uf), "@react-aria/menu"), { longPressProps: f } = El({
		isDisabled: i || a !== "longPress",
		accessibilityDescription: d.format("longPressMessage"),
		onLongPressStart() {
			t.close();
		},
		onLongPress() {
			t.open("first");
		}
	}), p = {
		preventFocusOnPress: !0,
		onPressStart(e) {
			e.pointerType !== "touch" && e.pointerType !== "keyboard" && !i && (In(e.target), t.open(e.pointerType === "virtual" ? "first" : null));
		},
		onPress(e) {
			e.pointerType === "touch" && !i && (In(e.target), t.toggle());
		}
	};
	delete s.onPress;
	let { contextMenuProps: m } = Wf({ onContextMenu(e) {
		let n = e.target.getBoundingClientRect();
		t.setPoint({
			x: n.x + e.x,
			y: n.y + e.y
		}), t.open();
	} });
	(0, w.useEffect)(() => {
		if (t.isOpen && a === "contextMenu") {
			let e = (e) => {
				(e.button === 2 || e.button === 0 && e.ctrlKey === !0) && W(e) === document.body && t.close();
			};
			return document.addEventListener("mousedown", e), () => document.removeEventListener("mousedown", e);
		}
	}, [t, a]);
	let h;
	if (a === "press") h = {
		...p,
		...u
	};
	else if (a === "longPress") h = {
		...f,
		...u
	};
	else if (a === "contextMenu") {
		h = m;
		let { "aria-haspopup": e, "aria-expanded": t, "aria-controls": n, ...r } = s;
		s = r;
	}
	return {
		menuTriggerProps: {
			...s,
			...h,
			id: o
		},
		menuProps: {
			...c,
			"aria-labelledby": o,
			autoFocus: t.focusStrategy || !0,
			onClose: t.close
		}
	};
}
//#endregion
//#region node_modules/react-aria-components/dist/private/Dialog.mjs
var Jf = /*#__PURE__*/ (0, w.createContext)(null);
//#endregion
//#region node_modules/react-aria/dist/private/i18n/useListFormatter.mjs
function Yf(e = {}) {
	let { locale: t } = mi();
	return (0, w.useMemo)(() => new Intl.ListFormat(t, e), [t, e]);
}
//#endregion
//#region node_modules/react-aria/dist/private/radio/utils.mjs
var Xf = /* @__PURE__ */ new WeakMap();
//#endregion
//#region node_modules/react-aria/dist/private/radio/useRadio.mjs
function Zf(e, t, n) {
	let { value: r, children: i, "aria-label": a, "aria-labelledby": o, onPressStart: s, onPressEnd: c, onPressChange: l, onPress: u, onPressUp: d, onClick: f } = e, p = e.isDisabled || t.isDisabled, m = t.selectedValue === r, h = (e) => {
		e.stopPropagation(), t.setSelectedValue(r);
	}, { pressProps: g, isPressed: _ } = po({
		onPressStart: s,
		onPressEnd: c,
		onPressChange: l,
		onPress: u,
		onPressUp: d,
		onClick: f,
		isDisabled: p
	}), { pressProps: v, isPressed: y } = po({
		onPressStart: s,
		onPressEnd: c,
		onPressChange: l,
		onPressUp: d,
		onClick: f,
		isDisabled: p,
		onPress(e) {
			u?.(e), t.setSelectedValue(r), n.current?.focus();
		}
	}), { focusableProps: b } = ga(V(e, { onFocus: () => t.setLastFocusedValue(r) }), n), x = V(g, b), S = Za(e, { labelable: !0 }), C = -1;
	t.selectedValue == null ? (t.lastFocusedValue === r || t.lastFocusedValue == null) && (C = 0) : t.selectedValue === r && (C = 0), p && (C = void 0);
	let { name: T, form: E, descriptionId: D, errorMessageId: O, validationBehavior: k } = Xf.get(t);
	_s(n, t.defaultSelectedValue, t.setSelectedValue), vs({ validationBehavior: k }, t, n);
	let A = Cs();
	return {
		labelProps: V(v, (0, w.useMemo)(() => ({
			onClick: (e) => e.preventDefault(),
			onMouseDown: (e) => e.preventDefault()
		}), [])),
		inputProps: V(S, {
			...x,
			type: "radio",
			name: T,
			form: E,
			tabIndex: C,
			disabled: p,
			required: t.isRequired && k === "native",
			checked: m,
			value: r,
			onChange: h,
			"aria-describedby": [
				e["aria-describedby"],
				A.id,
				t.isInvalid ? O : null,
				D
			].filter(Boolean).join(" ") || void 0
		}),
		descriptionProps: A,
		isDisabled: p,
		isSelected: m,
		isPressed: _ || y
	};
}
//#endregion
//#region node_modules/react-aria/dist/private/radio/useRadioGroup.mjs
function Qf(e, t) {
	let { name: n, form: r, isReadOnly: i, isRequired: a, isDisabled: o, orientation: s = "vertical", validationBehavior: c = "aria" } = e, { direction: l } = mi(), { isInvalid: u, validationErrors: d, validationDetails: f } = t.displayValidation, { labelProps: p, fieldProps: m, descriptionProps: h, errorMessageProps: g } = gs({
		...e,
		labelElementType: "span",
		isInvalid: t.isInvalid,
		errorMessage: e.errorMessage || d
	}), _ = Za(e, { labelable: !0 }), { focusWithinProps: v } = xo({
		onBlurWithin(n) {
			e.onBlur?.(n), t.selectedValue || t.setLastFocusedValue(null);
		},
		onFocusWithin: e.onFocus,
		onFocusWithinChange: e.onFocusChange
	});
	function y(e, n) {
		let r = al(n.currentTarget, {
			from: W(n),
			accept: (e) => e instanceof bn(e).HTMLInputElement && e.type === "radio"
		}), i;
		return e === "next" ? (i = r.nextNode(), i ||= (r.currentNode = n.currentTarget, r.firstChild())) : (i = r.previousNode(), i ||= (r.currentNode = n.currentTarget, r.lastChild())), i ? (i.focus(), t.setSelectedValue(i.value), !0) : !1;
	}
	let { keyboardProps: b } = fa({
		shortcuts: {
			ArrowRight: (e) => y(l === "rtl" && s !== "vertical" ? "prev" : "next", e),
			ArrowLeft: (e) => y(l === "rtl" && s !== "vertical" ? "next" : "prev", e),
			ArrowDown: (e) => y("next", e),
			ArrowUp: (e) => y("prev", e)
		},
		allowRepeats: !0
	}), x = $t(n);
	return Xf.set(t, {
		name: x,
		form: r,
		descriptionId: h.id,
		errorMessageId: g.id,
		validationBehavior: c
	}), {
		radioGroupProps: V(_, {
			role: "radiogroup",
			...b,
			"aria-invalid": t.isInvalid || void 0,
			"aria-errormessage": e["aria-errormessage"],
			"aria-readonly": i || void 0,
			"aria-required": a || void 0,
			"aria-disabled": o || void 0,
			"aria-orientation": s,
			...m,
			...v
		}),
		labelProps: p,
		descriptionProps: h,
		errorMessageProps: g,
		isInvalid: u,
		validationErrors: d,
		validationDetails: f
	};
}
//#endregion
//#region node_modules/react-stately/dist/private/radio/useRadioGroupState.mjs
var $f = Math.round(Math.random() * 1e10), ep = 0;
function tp(e) {
	let t = (0, w.useMemo)(() => e.name || `radio-group-${$f}-${++ep}`, [e.name]), [n, r] = Ai(e.value, e.defaultValue ?? null, e.onChange), [i] = (0, w.useState)(n), [a, o] = (0, w.useState)(null), s = cs({
		...e,
		value: n
	}), c = (t) => {
		!e.isReadOnly && !e.isDisabled && (r(t), s.commitValidation());
	}, l = s.displayValidation.isInvalid;
	return {
		...s,
		name: t,
		selectedValue: n,
		defaultSelectedValue: e.value === void 0 ? e.defaultValue ?? null : i,
		setSelectedValue: c,
		lastFocusedValue: a,
		setLastFocusedValue: o,
		isDisabled: e.isDisabled || !1,
		isReadOnly: e.isReadOnly || !1,
		isRequired: e.isRequired || !1,
		validationState: e.validationState || (l ? "invalid" : null),
		isInvalid: l
	};
}
//#endregion
//#region node_modules/react-aria-components/dist/private/RadioGroup.mjs
var np = /*#__PURE__*/ (0, w.createContext)(null), rp = /*#__PURE__*/ (0, w.createContext)(null), ip = /*#__PURE__*/ (0, w.createContext)(null), ap = /*#__PURE__*/ (0, w.forwardRef)(function(e, t) {
	[e, t] = fn(e, t, np);
	let { validationBehavior: n } = dn(ms) || {}, r = e.validationBehavior ?? n ?? "native", i = tp({
		...e,
		validationBehavior: r
	}), [a, o] = pn(!e["aria-label"] && !e["aria-labelledby"]), { radioGroupProps: s, labelProps: c, descriptionProps: l, errorMessageProps: u, ...d } = Qf({
		...e,
		label: o,
		validationBehavior: r
	}, i), f = un({
		...e,
		values: {
			orientation: e.orientation || "vertical",
			isDisabled: i.isDisabled,
			isReadOnly: i.isReadOnly,
			isRequired: i.isRequired,
			isInvalid: i.isInvalid,
			state: i
		},
		defaultClassName: "react-aria-RadioGroup"
	}), p = Za(e, { global: !0 });
	return /*#__PURE__*/ w.createElement(_n.div, {
		...V(p, f, s),
		ref: t,
		slot: e.slot || void 0,
		"data-orientation": e.orientation || "vertical",
		"data-invalid": i.isInvalid || void 0,
		"data-disabled": i.isDisabled || void 0,
		"data-readonly": i.isReadOnly || void 0,
		"data-required": i.isRequired || void 0
	}, /*#__PURE__*/ w.createElement(ln, { values: [
		[ip, i],
		[ko, {
			...c,
			ref: a,
			elementType: "span"
		}],
		[Ho, { slots: {
			description: l,
			errorMessage: u
		} }],
		[ns, d]
	] }, /*#__PURE__*/ w.createElement(Oc, null, f.children)));
}), op = /*#__PURE__*/ (0, w.forwardRef)(function(e, t) {
	let { inputRef: n = null, ...r } = e;
	[e, t] = fn(r, t, rp);
	let i = w.useContext(ip), a = sn((0, w.useMemo)(() => nn(n, e.inputRef === void 0 ? null : e.inputRef), [n, e.inputRef])), o = Zf({
		...mn(e),
		children: typeof e.children == "function" || e.children
	}, i, a);
	return /*#__PURE__*/ w.createElement(sp.Provider, { value: {
		...o,
		inputRef: a,
		defaultClassName: "react-aria-Radio"
	} }, /*#__PURE__*/ w.createElement(cp, {
		...e,
		ref: t
	}));
}), sp = /*#__PURE__*/ (0, w.createContext)(null), cp = /*#__PURE__*/ (0, w.forwardRef)(function(e, t) {
	let { labelProps: n, inputProps: r, isSelected: i, isDisabled: a, isPressed: o, defaultClassName: s, inputRef: c } = (0, w.useContext)(sp), l = w.useContext(ip), { isFocused: u, isFocusVisible: d, focusProps: f } = So(), p = a || l.isReadOnly, { hoverProps: m, isHovered: h } = Oo({
		...e,
		isDisabled: p
	}), g = un({
		...e,
		defaultClassName: s,
		values: {
			isSelected: i,
			isPressed: o,
			isHovered: h,
			isFocused: u,
			isFocusVisible: d,
			isDisabled: a,
			isReadOnly: l.isReadOnly,
			isInvalid: l.isInvalid,
			isRequired: l.isRequired
		}
	}), _ = Za(e, { global: !0 });
	return delete _.id, delete _.onClick, /*#__PURE__*/ w.createElement(_n.label, {
		...V(_, n, m, g),
		ref: t,
		"data-selected": i || void 0,
		"data-pressed": o || void 0,
		"data-hovered": h || void 0,
		"data-focused": u || void 0,
		"data-focus-visible": d || void 0,
		"data-disabled": a || void 0,
		"data-readonly": l.isReadOnly || void 0,
		"data-invalid": l.isInvalid || void 0,
		"data-required": l.isRequired || void 0
	}, /*#__PURE__*/ w.createElement(ts, { elementType: "span" }, /*#__PURE__*/ w.createElement("input", {
		...V(r, f),
		ref: c
	})), g.children);
}), lp = /* @__PURE__ */ new WeakMap();
function up(e, t, n) {
	let { keyboardDelegate: r, isDisabled: i, isRequired: a, name: o, form: s, validationBehavior: c = "aria" } = e, l = Sl({
		usage: "search",
		sensitivity: "base"
	}), u = (0, w.useMemo)(() => r || new bl(t.collection, t.disabledKeys, n, l), [
		r,
		t.collection,
		t.disabledKeys,
		l,
		n
	]), { menuTriggerProps: d, menuProps: f } = qf({
		isDisabled: i,
		type: "listbox"
	}, t, n), { keyboardProps: p } = fa({
		shortcuts: {
			ArrowLeft: () => {
				if (t.selectionManager.selectionMode === "multiple") return !1;
				let e = t.selectedKey == null ? u.getFirstKey?.() : u.getKeyAbove?.(t.selectedKey);
				e != null && t.setSelectedKey(e);
			},
			ArrowRight: () => {
				if (t.selectionManager.selectionMode === "multiple") return !1;
				let e = t.selectedKey == null ? u.getFirstKey?.() : u.getKeyBelow?.(t.selectedKey);
				e != null && t.setSelectedKey(e);
			}
		},
		allowRepeats: !0,
		onKeyDown: e.onKeyDown,
		onKeyUp: e.onKeyUp
	}), { typeSelectProps: m } = hl({
		keyboardDelegate: u,
		selectionManager: t.selectionManager,
		onTypeSelect(e) {
			t.setSelectedKey(e);
		}
	}), { isInvalid: h, validationErrors: g, validationDetails: _ } = t.displayValidation, { labelProps: v, fieldProps: y, descriptionProps: b, errorMessageProps: x } = gs({
		...e,
		labelElementType: "span",
		isInvalid: h,
		errorMessage: e.errorMessage || g
	});
	t.selectionManager.selectionMode === "multiple" && (m = {});
	let S = Za(e, { labelable: !0 }), C = V(m, d, y), T = $t();
	return lp.set(t, {
		isDisabled: i,
		isRequired: a,
		name: o,
		form: s,
		validationBehavior: c
	}), {
		labelProps: {
			...v,
			onClick: () => {
				e.isDisabled || (n.current?.focus(), Ir("keyboard"));
			}
		},
		triggerProps: V(S, {
			...C,
			isDisabled: i,
			onKeyDown: Ft(C.onKeyDown, p.onKeyDown),
			onKeyUp: p.onKeyUp,
			"aria-labelledby": [
				T,
				C["aria-labelledby"],
				C["aria-label"] && !C["aria-labelledby"] ? C.id : null
			].filter(Boolean).join(" "),
			onFocus(n) {
				t.isFocused || (e.onFocus && e.onFocus(n), e.onFocusChange && e.onFocusChange(!0), t.setFocused(!0));
			},
			onBlur(n) {
				t.isOpen || (e.onBlur && e.onBlur(n), e.onFocusChange && e.onFocusChange(!1), t.setFocused(!1));
			}
		}),
		valueProps: { id: T },
		menuProps: {
			...f,
			onAction: void 0,
			autoFocus: t.focusStrategy || !0,
			shouldSelectOnPressUp: !0,
			shouldFocusOnHover: !0,
			disallowEmptySelection: !0,
			linkBehavior: "selection",
			onBlur: (n) => {
				U(n.currentTarget, n.relatedTarget) || (e.onBlur && e.onBlur(n), e.onFocusChange && e.onFocusChange(!1), t.setFocused(!1));
			},
			"aria-labelledby": [y["aria-labelledby"], C["aria-label"] && !y["aria-labelledby"] ? C.id : null].filter(Boolean).join(" ")
		},
		descriptionProps: b,
		errorMessageProps: x,
		isInvalid: h,
		validationErrors: g,
		validationDetails: _,
		hiddenSelectProps: {
			isDisabled: i,
			name: o,
			label: e.label,
			state: t,
			triggerRef: n,
			form: s
		}
	};
}
//#endregion
//#region node_modules/react-aria/dist/private/select/HiddenSelect.mjs
function dp(e, t, n) {
	let r = lp.get(t) || {}, { autoComplete: i, name: a = r.name, form: o = r.form, isDisabled: s = r.isDisabled } = e, { validationBehavior: c, isRequired: l } = r, { visuallyHiddenProps: u } = es({ style: {
		position: "fixed",
		top: 0,
		left: 0
	} });
	_s(e.selectRef, t.defaultValue, t.setValue), vs({
		validationBehavior: c,
		focus: () => n.current?.focus()
	}, t, e.selectRef);
	let d = t.setValue, f = (0, w.useCallback)((e) => {
		let t = W(e);
		t.multiple ? d(Array.from(t.selectedOptions, (e) => e.value)) : d(e.currentTarget.value);
	}, [d]);
	return {
		containerProps: {
			...u,
			"aria-hidden": !0,
			"data-react-aria-prevent-focus": !0,
			"data-a11y-ignore": "aria-hidden-focus"
		},
		inputProps: { style: { display: "none" } },
		selectProps: {
			tabIndex: -1,
			autoComplete: i,
			disabled: s,
			multiple: t.selectionManager.selectionMode === "multiple",
			required: c === "native" && l,
			name: a,
			form: o,
			value: t.value ?? "",
			onChange: f,
			onInput: f
		}
	};
}
function fp(e) {
	let { state: t, triggerRef: n, label: r, name: i, form: a, isDisabled: o } = e, s = (0, w.useRef)(null), c = (0, w.useRef)(null), { containerProps: l, selectProps: u } = dp({
		...e,
		selectRef: t.collection.size <= 300 ? s : c
	}, t, n), d = Array.isArray(t.value) ? t.value : [t.value];
	if (t.collection.size <= 300) return /*#__PURE__*/ w.createElement("div", {
		...l,
		"data-testid": "hidden-select-container"
	}, /*#__PURE__*/ w.createElement("label", null, r, /*#__PURE__*/ w.createElement("select", {
		...u,
		ref: s
	}, /*#__PURE__*/ w.createElement("option", {
		value: "",
		label: "\xA0"
	}, "\xA0"), [...t.collection.getKeys()].map((e) => {
		let n = t.collection.getItem(e);
		if (n && n.type === "item") return /*#__PURE__*/ w.createElement("option", {
			key: n.key,
			value: n.key
		}, n.textValue);
	}), t.collection.size === 0 && i && d.map((e, t) => /*#__PURE__*/ w.createElement("option", {
		key: t,
		value: e ?? ""
	})))));
	if (i) {
		let { validationBehavior: e } = lp.get(t) || {};
		d.length === 0 && (d = [null]);
		let n = d.map((t, n) => {
			let r = {
				type: "hidden",
				autoComplete: u.autoComplete,
				name: i,
				form: a,
				disabled: o,
				value: t ?? ""
			};
			return e === "native" ? /*#__PURE__*/ w.createElement("input", {
				key: n,
				...r,
				ref: n === 0 ? c : null,
				style: { display: "none" },
				type: "text",
				required: n === 0 && u.required,
				onChange: () => {}
			}) : /*#__PURE__*/ w.createElement("input", {
				key: n,
				...r,
				ref: n === 0 ? c : null
			});
		});
		return /*#__PURE__*/ w.createElement(w.Fragment, null, n);
	}
	return null;
}
//#endregion
//#region node_modules/react-stately/dist/private/select/useSelectState.mjs
function pp(e) {
	let { selectionMode: t = "single", shouldCloseOnSelect: n = t === "single" } = e, r = tf(e), [i, a] = (0, w.useState)(null), o = (0, w.useMemo)(() => e.defaultValue === void 0 ? t === "single" ? e.defaultSelectedKey ?? null : [] : e.defaultValue, [
		e.defaultValue,
		e.defaultSelectedKey,
		t
	]), [s, c] = Ai((0, w.useMemo)(() => e.value === void 0 ? t === "single" ? e.selectedKey : void 0 : e.value, [
		e.value,
		e.selectedKey,
		t
	]), o, e.onChange), l = t === "single" && Array.isArray(s) ? s[0] : s, u = (n) => {
		if (t === "single") {
			let t = Array.isArray(n) ? n[0] ?? null : n;
			c(t), t !== l && e.onSelectionChange?.(t);
		} else {
			let e = [];
			Array.isArray(n) ? e = n : n != null && (e = [n]), c(e);
		}
	}, d = Zl({
		...e,
		selectionMode: t,
		disallowEmptySelection: t === "single",
		allowDuplicateSelectionEvents: !0,
		selectedKeys: (0, w.useMemo)(() => mp(l), [l]),
		onSelectionChange: (e) => {
			if (e !== "all") {
				if (t === "single") {
					let t = e.values().next().value ?? null;
					u(t);
				} else u([...e]);
				n && r.close(), m.commitValidation();
			}
		}
	}), f = d.selectionManager.firstSelectedKey, p = (0, w.useMemo)(() => [...d.selectionManager.selectedKeys].map((e) => d.collection.getItem(e)).filter((e) => e != null), [d.selectionManager.selectedKeys, d.collection]), m = cs({
		...e,
		value: Array.isArray(l) && l.length === 0 ? null : l
	}), [h, g] = (0, w.useState)(!1), [_] = (0, w.useState)(l);
	return {
		...m,
		...d,
		...r,
		value: l,
		defaultValue: o ?? _,
		setValue: u,
		selectedKey: f,
		setSelectedKey: u,
		selectedItem: p[0] ?? null,
		selectedItems: p,
		defaultSelectedKey: e.defaultSelectedKey ?? (e.selectionMode === "single" ? _ : null),
		focusStrategy: i,
		open(t = null) {
			(d.collection.size !== 0 || e.allowsEmptyCollection) && (a(t), r.open());
		},
		toggle(t = null) {
			(d.collection.size !== 0 || e.allowsEmptyCollection) && (a(t), r.toggle());
		},
		isFocused: h,
		setFocused: g
	};
}
function mp(e) {
	if (e !== void 0) return e === null ? [] : Array.isArray(e) ? e : [e];
}
//#endregion
//#region node_modules/react-aria-components/dist/private/Select.mjs
function hp(e) {
	return e && e.__esModule ? e.default : e;
}
var gp = /*#__PURE__*/ (0, w.createContext)(null), _p = /*#__PURE__*/ (0, w.createContext)(null), vp = /*#__PURE__*/ ya(function(e, t) {
	[e, t] = fn(e, t, gp);
	let { children: n, isDisabled: r = !1, isInvalid: i = !1, isRequired: a = !1 } = e, o = (0, w.useMemo)(() => typeof n == "function" ? n({
		isOpen: !1,
		isDisabled: r,
		isInvalid: i,
		isRequired: a,
		isFocused: !1,
		isFocusVisible: !1,
		defaultChildren: null
	}) : n, [
		n,
		r,
		i,
		a
	]);
	return /*#__PURE__*/ w.createElement(Da, { content: o }, (n) => /*#__PURE__*/ w.createElement(bp, {
		props: e,
		collection: n,
		selectRef: t
	}));
}), yp = [
	ko,
	Ro,
	Ho
];
function bp({ props: e, selectRef: t, collection: n }) {
	let { validationBehavior: r } = dn(ms) || {}, i = e.validationBehavior ?? r ?? "native", a = pp({
		...e,
		collection: n,
		children: void 0,
		validationBehavior: i
	}), { isFocusVisible: o, focusProps: s } = So({ within: !0 }), c = (0, w.useRef)(null), [l, u] = pn(!e["aria-label"] && !e["aria-labelledby"]), { labelProps: d, triggerProps: f, valueProps: p, menuProps: m, descriptionProps: h, errorMessageProps: g, hiddenSelectProps: _, ...v } = up({
		...mn(e),
		label: u,
		validationBehavior: i
	}, a, c), y = (0, w.useMemo)(() => ({
		isOpen: a.isOpen,
		isFocused: a.isFocused,
		isFocusVisible: o,
		isDisabled: e.isDisabled || !1,
		isInvalid: v.isInvalid || !1,
		isRequired: e.isRequired || !1
	}), [
		a.isOpen,
		a.isFocused,
		o,
		e.isDisabled,
		v.isInvalid,
		e.isRequired
	]), b = un({
		...e,
		values: y,
		defaultClassName: "react-aria-Select"
	}), x = Za(e, { global: !0 });
	delete x.id;
	let S = (0, w.useRef)(null);
	return /*#__PURE__*/ w.createElement(ln, { values: [
		[gp, e],
		[_p, a],
		[xp, p],
		[ko, {
			...d,
			ref: l,
			elementType: "span"
		}],
		[Ro, {
			...f,
			ref: c,
			isPressed: a.isOpen,
			autoFocus: e.autoFocus
		}],
		[Jf, a],
		[of, {
			trigger: "Select",
			triggerRef: c,
			scrollRef: S,
			placement: "bottom start",
			"aria-labelledby": m["aria-labelledby"],
			clearContexts: yp
		}],
		[tu, {
			...m,
			ref: S
		}],
		[J, a],
		[Ho, { slots: {
			description: h,
			errorMessage: g
		} }],
		[ns, v]
	] }, /*#__PURE__*/ w.createElement(_n.div, {
		...V(x, b, s),
		ref: t,
		slot: e.slot || void 0,
		"data-focused": a.isFocused || void 0,
		"data-focus-visible": o || void 0,
		"data-open": a.isOpen || void 0,
		"data-disabled": e.isDisabled || void 0,
		"data-invalid": v.isInvalid || void 0,
		"data-required": e.isRequired || void 0
	}, b.children, /*#__PURE__*/ w.createElement(fp, {
		..._,
		autoComplete: e.autoComplete
	})));
}
var xp = /*#__PURE__*/ (0, w.createContext)(null), Sp = /*#__PURE__*/ ya(function(e, t) {
	[e, t] = fn(e, t, xp);
	let n = (0, w.useContext)(_p), { placeholder: r } = dn(gp), i = n.selectedItems.map((e) => {
		let t = e.props?.children;
		return typeof t == "function" && (t = t({
			isHovered: !1,
			isPressed: !1,
			isSelected: !1,
			isFocused: !1,
			isFocusVisible: !1,
			isDisabled: !1,
			selectionMode: "single",
			selectionBehavior: "toggle"
		})), t;
	}), a = Yf(), o = (0, w.useMemo)(() => n.selectedItems.map((e) => e?.textValue), [n.selectedItems]), s = n.selectionManager.selectionMode, c = (0, w.useMemo)(() => s === "single" ? o[0] ?? "" : a.format(o), [
		s,
		a,
		o
	]), l = (0, w.useMemo)(() => {
		if (s === "single") return i[0];
		let e = a.formatToParts(o);
		if (e.length === 0) return null;
		let t = 0;
		return e.map((e) => e.type === "element" ? /*#__PURE__*/ w.createElement(w.Fragment, { key: t }, i[t++]) : e.value);
	}, [
		s,
		a,
		o,
		i
	]), u = Oi(hp(bc), "react-aria-components"), d = un({
		...e,
		defaultChildren: l ?? r ?? u.format("selectPlaceholder"),
		defaultClassName: "react-aria-SelectValue",
		values: {
			selectedItem: n.selectedItems[0]?.value ?? null,
			selectedItems: (0, w.useMemo)(() => n.selectedItems.map((e) => e.value ?? null), [n.selectedItems]),
			selectedText: c,
			isPlaceholder: n.selectedItems.length === 0,
			state: n
		}
	}), f = Za(e, { global: !0 });
	return /*#__PURE__*/ w.createElement(_n.span, {
		ref: t,
		...f,
		...d,
		"data-placeholder": n.selectedItems.length === 0 || void 0
	}, /*#__PURE__*/ w.createElement(Ho.Provider, { value: void 0 }, d.children));
});
//#endregion
//#region node_modules/react-aria/dist/private/switch/useSwitch.mjs
function Cp(e, t, n) {
	let { labelProps: r, inputProps: i, isSelected: a, ...o } = ws(e, t, n);
	return {
		labelProps: r,
		inputProps: {
			...i,
			role: "switch",
			checked: a
		},
		isSelected: a,
		...o
	};
}
//#endregion
//#region node_modules/react-aria-components/dist/private/Switch.mjs
var wp = /*#__PURE__*/ (0, w.createContext)(null), Tp = /*#__PURE__*/ (0, w.createContext)(null), Ep = /*#__PURE__*/ (0, w.forwardRef)(function(e, t) {
	let { inputRef: n = null, ...r } = e;
	[e, t] = fn(r, t, wp);
	let i = sn((0, w.useMemo)(() => nn(n, e.inputRef === void 0 ? null : e.inputRef), [n, e.inputRef])), a = Es(e), o = Cp({
		...mn(e),
		children: typeof e.children == "function" || e.children
	}, a, i);
	return /*#__PURE__*/ w.createElement(ln, { values: [[Tp, a], [Dp, {
		...o,
		inputRef: i,
		defaultClassName: "react-aria-Switch"
	}]] }, /*#__PURE__*/ w.createElement(Op, {
		...e,
		ref: t
	}));
}), Dp = /*#__PURE__*/ (0, w.createContext)(null), Op = /*#__PURE__*/ (0, w.forwardRef)(function(e, t) {
	let { labelProps: n, inputProps: r, isSelected: i, isDisabled: a, isReadOnly: o, isPressed: s, isInvalid: c, inputRef: l, defaultClassName: u, isRequired: d } = (0, w.useContext)(Dp), { isFocused: f, isFocusVisible: p, focusProps: m } = So(), h = a || o, g = (0, w.useContext)(Tp), { hoverProps: _, isHovered: v } = Oo({
		...e,
		isDisabled: h
	}), y = un({
		...e,
		defaultClassName: u,
		values: {
			isSelected: i,
			isPressed: s,
			isHovered: v,
			isFocused: f,
			isFocusVisible: p,
			isDisabled: a,
			isReadOnly: o,
			isInvalid: c,
			isRequired: d || !1,
			state: g
		}
	}), b = Za(e, { global: !0 });
	return delete b.id, delete b.onClick, /*#__PURE__*/ w.createElement(_n.label, {
		...V(b, n, _, y),
		ref: t,
		slot: e.slot || void 0,
		"data-selected": i || void 0,
		"data-pressed": s || void 0,
		"data-hovered": v || void 0,
		"data-focused": f || void 0,
		"data-focus-visible": p || void 0,
		"data-disabled": a || void 0,
		"data-readonly": o || void 0,
		"data-invalid": c || void 0,
		"data-required": d || void 0
	}, /*#__PURE__*/ w.createElement(ts, { elementType: "span" }, /*#__PURE__*/ w.createElement("input", {
		...V(r, m),
		ref: l
	})), y.children);
}), kp = /*#__PURE__*/ (0, w.createContext)({}), Ap = /*#__PURE__*/ (0, w.createContext)(null), jp = /*#__PURE__*/ ya(function(e, t) {
	[e, t] = fn(e, t, Ap);
	let { validationBehavior: n } = dn(ms) || {}, r = e.validationBehavior ?? n ?? "native", i = (0, w.useRef)(null);
	[e, i] = fn(e, i, Mi);
	let [a, o] = pn(!e["aria-label"] && !e["aria-labelledby"]), [s, c] = (0, w.useState)("input"), { labelProps: l, inputProps: u, descriptionProps: d, errorMessageProps: f, ...p } = zs({
		...mn(e),
		inputElementType: s,
		label: o,
		validationBehavior: r
	}, i), m = (0, w.useCallback)((e) => {
		i.current = e, e && c(e instanceof HTMLTextAreaElement ? "textarea" : "input");
	}, [i]), h = un({
		...e,
		values: {
			isDisabled: e.isDisabled || !1,
			isInvalid: p.isInvalid,
			isReadOnly: e.isReadOnly || !1,
			isRequired: e.isRequired || !1
		},
		defaultClassName: "react-aria-TextField"
	}), g = Za(e, { global: !0 });
	return delete g.id, /*#__PURE__*/ w.createElement(_n.div, {
		...g,
		...h,
		ref: t,
		slot: e.slot || void 0,
		"data-disabled": e.isDisabled || void 0,
		"data-invalid": p.isInvalid || void 0,
		"data-readonly": e.isReadOnly || void 0,
		"data-required": e.isRequired || void 0
	}, /*#__PURE__*/ w.createElement(ln, { values: [
		[ko, {
			...l,
			ref: a
		}],
		[Is, {
			...u,
			ref: m
		}],
		[kp, {
			...u,
			ref: m
		}],
		[Ps, {
			role: "presentation",
			isInvalid: p.isInvalid,
			isDisabled: e.isDisabled || !1
		}],
		[Ho, { slots: {
			description: d,
			errorMessage: f
		} }],
		[ns, p]
	] }, h.children));
}), Mp = {
	md: {
		box: "size-4",
		glyph: "size-4",
		label: "text-body-medium",
		gap: "gap-2"
	},
	sm: {
		box: "size-3.5",
		glyph: "size-3.5",
		label: "text-body-2-medium",
		gap: "gap-1.5"
	}
};
function Np({ state: e, size: t = "md" }) {
	let { isSelected: n, isIndeterminate: r, isFocusVisible: i, isDisabled: a, isHovered: o } = e, s = Mp[t], c = n || r, l = o && !a;
	return /* @__PURE__ */ (0, z.jsx)("span", {
		"aria-hidden": !0,
		className: R("flex shrink-0 items-center justify-center rounded-sm", "transition-[background-color,border-color,box-shadow] duration-150 ease", s.box, c ? R("bg-linear-to-b shadow-checkbox-selected", l ? "from-accent-400 to-accent-500" : "from-accent-500 to-accent-600") : R("border bg-background-primary-default shadow-xs", l ? "border-border-checkbox-hover" : "border-border-checkbox-default"), a && "opacity-50", i && "ring-2 ring-border-focus-ring ring-offset-2"),
		children: /* @__PURE__ */ (0, z.jsx)("svg", {
			viewBox: "0 0 16 16",
			fill: "none",
			className: s.glyph,
			children: r ? /* @__PURE__ */ (0, z.jsx)("path", {
				d: "M4.5 8H8H11.5",
				stroke: "white",
				strokeWidth: "2",
				strokeLinecap: "round"
			}) : n ? /* @__PURE__ */ (0, z.jsx)("path", {
				d: "M4 7.7002L6.64645 10.3466C6.84171 10.5419 7.15829 10.5419 7.35355 10.3466L12 5.7002",
				stroke: "white",
				strokeWidth: "2",
				strokeLinecap: "round",
				strokeLinejoin: "round",
				pathLength: 1,
				className: "animate-check-draw"
			}) : null
		})
	});
}
//#endregion
//#region src/react/boardui/components/base/checkbox/checkbox.tsx
function Pp({ className: e, children: t, size: n = "md", ref: r, ...i }) {
	let a = Mp[n];
	return /* @__PURE__ */ (0, z.jsx)(Ms, {
		ref: r,
		...i,
		className: (t) => R("group inline-flex items-center select-none", a.gap, t.isDisabled ? "cursor-not-allowed" : "cursor-pointer", typeof e == "function" ? e(t) : e),
		children: (e) => /* @__PURE__ */ (0, z.jsxs)(z.Fragment, { children: [/* @__PURE__ */ (0, z.jsx)(Np, {
			state: e,
			size: n
		}), t != null && /* @__PURE__ */ (0, z.jsx)("span", {
			className: R(a.label, "text-text-primary"),
			children: t
		})] })
	});
}
//#endregion
//#region node_modules/@remixicon/react/index.mjs
var Fp = ({ color: e = "currentColor", size: t = 24, className: n, ...r }) => w.createElement("svg", {
	viewBox: "0 0 24 24",
	xmlns: "http://www.w3.org/2000/svg",
	width: t,
	height: t,
	fill: e,
	...r,
	className: "remixicon " + (n || "")
}, w.createElement("path", { d: "M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z" })), Ip = ({ color: e = "currentColor", size: t = 24, className: n, ...r }) => w.createElement("svg", {
	viewBox: "0 0 24 24",
	xmlns: "http://www.w3.org/2000/svg",
	width: t,
	height: t,
	fill: e,
	...r,
	className: "remixicon " + (n || "")
}, w.createElement("path", { d: "M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z" })), Lp = ({ color: e = "currentColor", size: t = 24, className: n, ...r }) => w.createElement("svg", {
	viewBox: "0 0 24 24",
	xmlns: "http://www.w3.org/2000/svg",
	width: t,
	height: t,
	fill: e,
	...r,
	className: "remixicon " + (n || "")
}, w.createElement("path", { d: "M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z" })), Rp = ({ color: e = "currentColor", size: t = 24, className: n, ...r }) => w.createElement("svg", {
	viewBox: "0 0 24 24",
	xmlns: "http://www.w3.org/2000/svg",
	width: t,
	height: t,
	fill: e,
	...r,
	className: "remixicon " + (n || "")
}, w.createElement("path", { d: "M10 6V8H5V19H16V14H18V20C18 20.5523 17.5523 21 17 21H4C3.44772 21 3 20.5523 3 20V7C3 6.44772 3.44772 6 4 6H10ZM21 3V11H19L18.9999 6.413L11.2071 14.2071L9.79289 12.7929L17.5849 5H13V3H21Z" })), zp = ({ color: e = "currentColor", size: t = 24, className: n, ...r }) => w.createElement("svg", {
	viewBox: "0 0 24 24",
	xmlns: "http://www.w3.org/2000/svg",
	width: t,
	height: t,
	fill: e,
	...r,
	className: "remixicon " + (n || "")
}, w.createElement("path", { d: "M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11 11V17H13V11H11ZM11 7V9H13V7H11Z" }));
//#endregion
//#region src/react/boardui/components/base/input/label.tsx
function Bp({ isRequired: e = !1, isInvalid: t, tooltip: n, className: r, children: i, ...a }) {
	return /* @__PURE__ */ (0, z.jsxs)(Ao, {
		"data-label": "true",
		...a,
		className: R("flex cursor-default items-center gap-0.5", "text-body-medium text-text-primary", r),
		children: [
			i,
			e && /* @__PURE__ */ (0, z.jsx)("span", {
				"aria-hidden": "true",
				className: "text-body-medium text-text-error-primary",
				children: "*"
			}),
			n && /* @__PURE__ */ (0, z.jsx)(zp, {
				className: "size-4 shrink-0 text-foreground-icon-quaternary",
				"aria-hidden": !0
			})
		]
	});
}
//#endregion
//#region src/react/boardui/components/base/input/hint-text.tsx
function Vp({ isInvalid: e = !1, className: t, ...n }) {
	return /* @__PURE__ */ (0, z.jsx)(Uo, {
		slot: e ? "errorMessage" : "description",
		...n,
		className: R("pt-px text-caption-1-medium text-text-secondary", e && "text-text-error-primary", t)
	});
}
//#endregion
//#region src/react/boardui/components/base/input/input.tsx
var Hp = (0, w.createContext)({});
function Up({ size: e = "medium", fieldClassName: t, inputClassName: n, className: r, children: i, ...a }) {
	return /* @__PURE__ */ (0, z.jsx)(Hp.Provider, {
		value: {
			size: e,
			fieldClassName: t,
			inputClassName: n
		},
		children: /* @__PURE__ */ (0, z.jsx)(jp, {
			...a,
			"data-input-size": e,
			className: R("group flex h-max w-full flex-col items-start gap-1", r),
			children: i
		})
	});
}
Up.displayName = "TextField";
var Wp = wt({
	field: [
		"relative flex w-full items-center",
		"rounded-2lg",
		"bg-background-tertiary-default text-foreground-icon-tertiary",
		"ring-2 ring-inset ring-transparent",
		"transition-[background-color,box-shadow,color] duration-[var(--input-transition-ms)] ease"
	].join(" "),
	fieldSize: {
		medium: "p-2",
		small: "h-8 px-1.5 py-2"
	},
	fieldWithAddonSize: {
		medium: "h-9 pl-1 pr-2 py-2",
		small: "h-8 pl-1 pr-1.5 py-2"
	},
	content: "flex w-full items-center gap-2 min-w-0",
	leftSection: "flex flex-1 items-center gap-0.5 min-w-0",
	input: [
		"min-w-0 flex-1 bg-transparent border-0 outline-none p-0 m-0",
		"font-sans text-body-regular text-text-primary pl-1",
		"placeholder:text-text-tertiary",
		"focus:placeholder:text-text-primary",
		"disabled:text-input-disabled-text disabled:placeholder:text-input-disabled-text",
		"disabled:cursor-not-allowed",
		"aria-invalid:placeholder:text-text-error-placeholder"
	].join(" "),
	icon: "size-5 shrink-0"
});
function Gp({ size: e, leadingIcon: t, trailingIcon: n, leadingAddon: r, fieldClassName: i, className: a, ref: o, groupRef: s, ...c }) {
	let l = (0, w.useContext)(Hp), u = e ?? l.size ?? "medium", d = r != null;
	return /* @__PURE__ */ (0, z.jsx)(Fs, {
		ref: s,
		className: ({ isFocusWithin: e, isHovered: t, isDisabled: n, isInvalid: r }) => R(Wp.field, d ? Wp.fieldWithAddonSize[u] : Wp.fieldSize[u], t && !e && !n && !r && "ring-border-button-hover", e && !n && !r && "ring-border-button-active", n && "bg-input-disabled-background text-input-disabled-foreground", r && "bg-background-tertiary-error text-foreground-icon-error", l.fieldClassName, i),
		children: /* @__PURE__ */ (0, z.jsxs)("div", {
			className: Wp.content,
			children: [/* @__PURE__ */ (0, z.jsxs)("div", {
				className: Wp.leftSection,
				children: [d ? r : t ? /* @__PURE__ */ (0, z.jsx)(t, {
					className: Wp.icon,
					"aria-hidden": !0
				}) : null, /* @__PURE__ */ (0, z.jsx)(Rs, {
					ref: o,
					...c,
					className: R(Wp.input, l.inputClassName, a)
				})]
			}), n ? /* @__PURE__ */ (0, z.jsx)(n, {
				className: Wp.icon,
				"aria-hidden": !0
			}) : null]
		})
	});
}
Gp.displayName = "InputBase";
function Kp({ label: e, hint: t, tooltip: n, placeholder: r, leadingIcon: i, trailingIcon: a, leadingAddon: o, fieldClassName: s, ref: c, groupRef: l, className: u, ...d }) {
	return /* @__PURE__ */ (0, z.jsx)(Up, {
		...d,
		className: u,
		"aria-label": d["aria-label"] ?? (!e && typeof r == "string" ? r : void 0),
		children: ({ isRequired: u, isInvalid: d }) => /* @__PURE__ */ (0, z.jsxs)(z.Fragment, { children: [
			e && /* @__PURE__ */ (0, z.jsx)(Bp, {
				isRequired: u,
				isInvalid: d,
				tooltip: n,
				children: e
			}),
			/* @__PURE__ */ (0, z.jsx)(Gp, {
				ref: c,
				groupRef: l,
				placeholder: r,
				leadingIcon: i,
				trailingIcon: a,
				leadingAddon: o,
				fieldClassName: s
			}),
			t && /* @__PURE__ */ (0, z.jsx)(Vp, {
				isInvalid: d,
				children: t
			})
		] })
	});
}
Kp.displayName = "Input";
function qp({ data: e }) {
	let [t, n] = (0, w.useState)(e.error || (e.invalid === "true" ? "访问密码不正确" : ""));
	return /* @__PURE__ */ (0, z.jsx)(kt, {
		title: "Peach",
		children: /* @__PURE__ */ (0, z.jsxs)("form", {
			method: "post",
			action: "/login",
			"aria-labelledby": "auth-card-title",
			className: "flex flex-col gap-6",
			children: [
				/* @__PURE__ */ (0, z.jsx)(Kp, {
					id: "login-token",
					label: "访问密码",
					name: "token",
					type: "password",
					maxLength: 256,
					autoComplete: "current-password",
					autoFocus: !0,
					isRequired: !0,
					isInvalid: t ? !0 : void 0,
					onChange: () => n(""),
					hint: t ? /* @__PURE__ */ (0, z.jsx)("span", {
						role: "alert",
						children: t
					}) : void 0
				}),
				/* @__PURE__ */ (0, z.jsx)("input", {
					type: "hidden",
					name: "next",
					value: e.next || "/"
				}),
				/* @__PURE__ */ (0, z.jsx)(Pp, {
					name: "days",
					value: "30",
					defaultSelected: !0,
					children: "保持登录"
				}),
				/* @__PURE__ */ (0, z.jsx)(Dt, {
					type: "submit",
					className: "w-full",
					children: "登录"
				})
			]
		})
	});
}
//#endregion
//#region src/react/components/note.tsx
function Jp({ tone: e, title: t, action: n, extra: r, children: i, actionLayout: a = "inline", className: o }) {
	let s = /* @__PURE__ */ (0, z.jsxs)(z.Fragment, { children: [/* @__PURE__ */ (0, z.jsxs)("div", {
		"data-note-layout": "",
		className: R("flex gap-3", a === "inline" ? "flex-wrap items-center justify-between" : "flex-col items-start"),
		children: [/* @__PURE__ */ (0, z.jsxs)("div", {
			className: R("flex min-w-0 flex-auto flex-col justify-center gap-0.5", a === "below" && "w-full"),
			children: [t ? /* @__PURE__ */ (0, z.jsx)("p", {
				className: "text-body-medium wrap-anywhere",
				children: t
			}) : null, /* @__PURE__ */ (0, z.jsx)("p", {
				className: "whitespace-pre-line text-body-2-regular wrap-anywhere",
				children: i
			})]
		}), n ? /* @__PURE__ */ (0, z.jsx)("div", {
			"data-note-action": "",
			className: "max-w-full shrink-0",
			children: n
		}) : null]
	}), r] });
	switch (e) {
		case "info": return /* @__PURE__ */ (0, z.jsx)("div", {
			role: "status",
			className: R("@container flex flex-col gap-2 rounded-2lg bg-notification-information-background px-3 py-2 text-notification-information-foreground", o),
			children: s
		});
		case "success": return /* @__PURE__ */ (0, z.jsx)("div", {
			role: "status",
			className: R("@container flex flex-col gap-2 rounded-2lg bg-notification-success-background px-3 py-2 text-notification-success-foreground", o),
			children: s
		});
		case "warning": return /* @__PURE__ */ (0, z.jsx)("div", {
			role: "note",
			className: R("@container flex flex-col gap-2 rounded-2lg bg-status-yellow-background px-3 py-2 text-status-yellow-text", o),
			children: s
		});
		case "error": return /* @__PURE__ */ (0, z.jsx)("div", {
			role: "alert",
			className: R("@container flex flex-col gap-2 rounded-2lg bg-background-tertiary-error px-3 py-2 text-text-error-primary", o),
			children: s
		});
		default: return /* @__PURE__ */ (0, z.jsx)("div", {
			role: "note",
			className: R("@container flex flex-col gap-2 rounded-2lg bg-background-tertiary-default px-3 py-2 text-text-secondary", o),
			children: s
		});
	}
}
//#endregion
//#region src/configuration-endpoints.ts
var Yp = "/api/pick-folder", Xp = "/api/setup/questions", Zp = "/api/setup", Qp = class extends Error {
	status;
	errors;
	constructor(e, t, n) {
		super(t), this.status = e, this.errors = n;
	}
};
async function $p(e, t, n) {
	let r;
	try {
		r = await fetch(e, {
			credentials: "same-origin",
			...t,
			headers: {
				Accept: "application/json",
				...t.body ? { "Content-Type": "application/json" } : {}
			}
		});
	} catch (e) {
		throw t.signal?.aborted ? e : new Qp(0, "连接不到 Peach，请确认它仍在运行后重试");
	}
	let i = await r.json().catch(() => null);
	if (!r.ok) throw new Qp(r.status, i?.error || n, i?.errors);
	return i;
}
var em = (e) => $p(Xp, { signal: e }, "没能读取设置题目"), tm = (e) => $p(Zp, {
	method: "POST",
	body: JSON.stringify(e)
}, "没能完成设置"), nm = (e) => $p(`${Zp}/restore`, {
	method: "POST",
	body: JSON.stringify({ data_root: e })
}, "没能使用此数据目录"), rm = async (e) => (await $p(Yp, {
	method: "POST",
	body: JSON.stringify({ initial: e })
}, "没能打开文件夹对话框")).path, im = (e) => e instanceof Error && e.message || "请求失败，请重试", am = 8e3, om = /* @__PURE__ */ new WeakMap();
function sm(e, t, n) {
	cm(t, n, () => e.open, (t) => {
		e.open = t;
	});
}
function cm(e, t, n, r) {
	e.classList.add("ui-fcollapse");
	let i = (om.get(e) || 0) + 1;
	om.set(e, i);
	let a = () => om.get(e) === i;
	if (t) {
		e.inert = !1;
		let t = n() ? e.getBoundingClientRect().height : 0;
		r(!0), um(e, t, a);
	} else e.inert = !0, e.classList.remove("ui-fcollapse-settled"), e.style.height = e.getBoundingClientRect().height + "px", e.getBoundingClientRect(), e.style.height = "0px", lm(e, () => {
		a() && (r(!1), e.style.height = "");
	});
}
function lm(e, t) {
	let n = !1, r, i = (a) => {
		a && a.propertyName !== "height" || n || (n = !0, e.removeEventListener("transitionend", i), clearTimeout(r), t());
	};
	e.addEventListener("transitionend", i), r = setTimeout(i, 260);
}
function um(e, t, n = () => !0) {
	e.classList.remove("ui-fcollapse-settled"), e.style.height = t + "px", e.getBoundingClientRect(), e.style.height = e.scrollHeight + "px", lm(e, () => {
		n() && (e.style.height = "auto", e.classList.add("ui-fcollapse-settled"));
	});
}
//#endregion
//#region ../resources/media-sources.json
var dm = [
	{
		id: "local",
		name: "本地磁盘",
		label: "本地磁盘",
		default_cost: "free",
		cloud: !1,
		icon: "hard-drive"
	},
	{
		id: "115",
		name: "115",
		label: "CloudDrive · 115",
		default_cost: "free",
		cloud: !0,
		icon: "database"
	},
	{
		id: "pikpak",
		name: "PikPak",
		label: "CloudDrive · PikPak",
		default_cost: "metered",
		cloud: !0,
		icon: "database"
	},
	{
		id: "guangya",
		name: "光鸭云盘",
		label: "光鸭云盘",
		default_cost: "free",
		cloud: !0,
		icon: "database"
	},
	{
		id: "onedrive",
		name: "OneDrive",
		label: "OneDrive",
		default_cost: "metered",
		cloud: !0,
		icon: "database"
	},
	{
		id: "mounted",
		name: "其他已挂载网盘",
		label: "其他已挂载网盘",
		default_cost: "metered",
		cloud: !0,
		icon: "database"
	}
], fm = dm, pm = dm.map((e) => [e.id, e.label]);
dm.map((e) => e.id);
var mm = dm.filter((e) => e.cloud).map((e) => e.id), hm = Object.fromEntries(dm.map((e) => [e.id, e.name])), gm = {
	local: "hard-drive",
	guangya: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAEWUlEQVR42sWXT2hcVRTGf/fNYCZdNNPGTaHaSUXFVQZSLLowoe3GdpEERHFhYqTQRBATcWlpSly56YQu4ipNZivYxCK46Z9EsBGkHdwItdhXrLixzaASo2bucXHve/feNzOagqQXHnPf/XPOd77z3XPfKLwmkxTZit4lkiEiykQK8wA5+5v0c5i5nNj3ZJ03nwPyKpmvEekFpGNZvV6PE58qdT7BEIoLRKqYOo0g6PtOogQEDkDWeS4DVgQ0MVpNqbGNpRSATDCEcLHJYcAAzWz4QHIqZCcdswwloWr7iBpWJzeWlIxTAq4CJSK7MNmQOhXrSGXeWzj205AGAiiLQAAt0JA6HZ09eRRDCKV0UmGoUsq8SzJoKRS7DgFJxpQxmjhRXsRg5pU4AAKIKvL7xmQeGPVWerJIHBACSX9TQw5EAlB75lLnnm1t18NgHqHsAPjGvCj8KHN27rEuONgPnV3w96/wVx3urZrotefMj0n5DABalfME59CjUXwGPGDlEegbgZ5+mtpmHW5fgusz8NtdF30AwKZCa9AKJeNIYERZ4anM0esuwWvzJurttK8+hLUZY1B5gaUpMIHlW+8Wh0YL7O2BU5dhb4lttxc/sEBmnE3lmba6yrf0re1RE7vj7RbOf1iBWhXqdw1D+3rh8DtQLIUgNuvwzXmaUm3T25yCJA3Kgjg+DS+fcXMPYvjkLYhXw1Ql/YHT0H861MXcs7C5bo+2BCzkpg8x3ZpDZTa8cQE6i274XB/8/K0TVt8oPDcI67FxFq9AYQ/sP2zm8wXIdcDWn7D7AOwuGdZsRWzNQFJMegfh1EU3tjoLy+85oR4agVfnzdydFZg/ZuY6izD1PRSKzXbjFageS2tF1FZEIvD0QDj29aKt41bJHV0Z7YiZ31iH7z5rbfdmFRruTsj/q5K7D4TvP9Ys9fZofXkeuntgz5Nw6X1jNDn363FzjbgyAzeqnhCzKXhmAKauuk2LY7C2YAWJExyJ6CyQ5LL5aMvtvVE1YlWZtBIexTAF9zOonyg7tCn1Ht2JohsCPS+Fe3+quas3eRpi6G9o82hpAWCj7t5fGIVdxRCE9mt5ereb0+C3ezWnCS1eXweAmkW4tuj6nUU4fiZTQPCMmijY1wvPj4a14vaKi1pjhScOsG6VAoArlZCFo5NwIgvCA/JUP5z8NLTxxVnn2Hx8uPUND1TbOnB0El45R1N6Ls8aagEeL5kUZY/qgximD3riU5n7Jbz62xeikQXj4GHa/RhmjxgQqkV5F3sSRKfA2hei6pvw+dntO791DSpH4Jc7nuCyAhT3NWTT0Z6BtBiV4MR0ezZuXTPCvb7Q8jpJo/aveNyF9N8AkrarCPvL7lr+o270kK0dD9mUTHAz/C7cwSbUIoRlHlWLWIwoUEGoPwL3McJSpCrUiRjbcfeKKfUxcQSg5lhCMQzEO5D3OophNcdS8O8YQMYpoRkix+j/LkxFDWGZAhVVcSn/Bw2n+w/oK+fWAAAAAElFTkSuQmCC",
	115: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAHB0lEQVR4nO2bbUwURxjH/zN38qIcb4JWoIoHFYumWhDbRquNiSlYC4ZGjVYrotHWD1VTLdY00X7zbA22Na21KWqsUMHYSiygJjaRQDW+VK2YioBarVZBQA9QDm6nedajCuxxHrfH7dX+kiXcvszM8+zO7DPP/JfBzcQmfx4O1jpJEmKUgBTHwUYIIAyAwbYRZtoYUCdBVDLwi5yxCgjfo1Uly2vd2T7mjkJj3vgsUVitcwWkqQxstAv1CAFxnoEfZjpdbvXPq05p1gFxqSZDexuWCIhMCMTDHTBcYGA5+n7YdrEwy6xOkS4yJi07uMliWSGEeB9ACPqGBsbYFwE+PpvP7l/Z6BEHCCFYzDRTBgATBMLhCRhofMiqLsrawRgTvSuiFxinbxjK2pErgAnQAAwoE3rMrTmw5s9eXOscxpSNE5iQ9glgEDQEA24LxtNrij8sc+Y67szJscmmTAjpiNaMJ+Q2CemI3Ea1n4CZM/N1p5pqPoXASngDDNmJAcbVBQWzrI5PfRLjzTX7AKTCuyhMNBjTHTmBOypFvvPeZzyRamt775+A2GRTpgTxHbwYDraoqiQrx2kHGFM2TqBBBYAPvBsLGJ9i7+3AenjPn9DiaN/rV6QeSUpxgl4pwotNMeWqbXw/PceYuAiEBvk7dZ2/Xz8MCQvE2JERGB4ZgteXOt8jyRY5cBPi1a4Ro77rybbwVtUIzzDAF7mmOYiPGexSOZt2Hu31tRS12mzbbvctMCYtO1iO7VVmUXqSy8bX323Bjp9OutoUk81GZQc0WSwr1J7YBAb4IiNtnMvlbCs4jpYHba4VIhAu26jkgLhUk8E2pVWVRenj5S7QWyxtVhQcOoecH0+o0h6ykWztNga0t2GJ2vP5oAA/ZKQldtv/1Q+/Yv8vFWg0P3BYhrm5Fa2WdjWbFWKzdVMnB8iZHJVZ/NZ4BPTvfPfzis64NJipgc1W2QG8I4endhor2OCHd1ITOu27/6AN2btK4XEE4mWbYXMAJTD74u5/f+A07jS2QAt02MzlH5Cmqn/3u/d9vV6HyeOM8nFP02Ezo7y9hPu31MwQr86YjHdnv9zjOTXX7+D4uWsoKv0D5WeuwgMIDv/Belq0gFDP+JBAf8zv0veVMEYNlLc508bir1t3sffw78g/eA5/16mS7X4SGNnOacVG7b4/wN+5CWTk4CAsnzcRh79djPlvOnaeWkhCjOK0XKVmoXWNzdhTchalpy7Ld9YZ+vv5YP2yqfK8YfDAALgbASmOxSRvoGmv67GqHcJCBuDFkRHybC5pdBQSno8EY457XPW1O5i9ajca7t13V9Oo359kxuQNlwFEo494JsyAGVNGYeGMcbJzeuLcxZt4e02e63MA+1yh1+C/cXFfQIPc1vxjmJSxFZt3lcJqleye+0LcEKyYP9GdzTH0uQM6oPj+y9xyzM3Kw83ae3bPmzc9ARGDAt3qAI9ysuI6Zn2wG7X1TYrHfX30WDb7FbfVz23iBI9yo/YeFq/bK88VlJicZHRX1WZNOIA4X3ULuw6cVjwWER6I6Ai3rLybOclSoBFy9p2wO/ePHTpQ9foYUMdJkwONUNvQjIuXlSVBOp36w5UEUclJkAQNcdPOXIDTs6oyjMRYshpLQ1gl5big5nq96nVxxio4SdEeps21QVx0uGJesPKK6mo5QbZz0uGRFA0agMLk4ZGh3faX/XaF9HKqQjZXlSyvlUcW0uFBA9BUWKmvUxZZbTps5vIPnS4XHoZecwsU0mgHyypRUU0JK3XpsJnTH1mByXABHoKySFvWzpAXQrtOiT/aXKx+hQwXOlSn/NE+ZldE4E6GDQlGwaZ5eG4YyYcfcbu+CRkf5+Nuk+PFE2d53Fbe8Q/JT0mBiT6CJjlLZ76Eoq8zMTyq88B36WodFqzdgxu37c8SXaDBZqtMpxEnJsW0XgixDm6CNAKUGaLU+OzkMQgN6t/peLtVwjf5x7Alr1xeE3QHjLFPqouz1ivqAwJ8fDabLa3LXF0hHjEsDBMSoqHjHH4+egwM7g9jVCgS46O69XOC0l6Hyiuxs/CU3VBYFRhqycbOu7pgTNmwEAI5aiyMvjbeiEkJRhifDUXkoCB5qbyt3YrmFguu3mxE5dVaHCq7hPIzV2CV+iAWY8isKV6zvUcHiIcSmVKt6IDV1BNXFWd1k8jwbicyJkh4TMIi/EewiaTmKinKudIFpKYi4bEsMfN+LLKI2o6SnNu7inR1HOw9eDlkQ08Kct7TxbLCkiEb3gpDdk8qUcJhmoVU1yQ8hvdRaGs7XHJAQcEsK6muvepJILn8EyjFCafyTDbx9Nca1g9bqM87euwfhzlbw1P9yQxBFZDwmAILaATbR1NJzhpP/P/ZHFzkqf1wsitP7aezSjyVH0/DDlr/fP4fOwTeE5lpP+gAAAAASUVORK5CYII=",
	pikpak: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACY0lEQVR4nNWXy2tTQRSHv7m5RUWttqlNW1OairhKNbrU+lhE/AOkdCOIIO7arty0QhSxCIIQ7VJwIfgfCIJdFB+rgC32AVIflD5CbFUsoohJRiZzb5Ne05p4kxv94HCTc+bO+c0MM3eOoICD/TJswAAQBdoBH5UhA8wDo1mIv7ojpuyAsH9EBuQgkmuASXVJI4lN3BXDawIifXIQwQ28RDA0ERfDwpr2cQ9G7iSdhcOGteZeJ1eYKreB5DS1I2oiCJba2hDQVA9tjdDaCHMfICuhMwDJz5D8BMtftK9E2s2NttrJMOxvzSdT1rIb6goW69KIXsjr5/K+nxlIWWKWrOebJIxNFhXgK7r20QjcPL+59PllGH8LarDvU3oWFHU+CDZpK+TKA3j88vd+zGKd93av/y8lrKxao7Ls6bROrrj6EE6E9WzZppZKrJ0y0Hu8RAGhZuhohqk5nShp2Y/0+nZqxPaoFQsr2my2mNDSkBe01w/7AvAu9QcB/nrYs0vboU4qSsNOwCHAoMYY/5WAsckNt1NJ8WKY5TS+fF8/E7f/Lu5aQDrjLu5agOlzF3ct4NYFd3HXAk51uYv/k9vQLPeFr9/h4gh0dcCBNu17vaiP7nt9sGNblQVs3wo9x+DZNCRm9aUyFICebh0rF9PpWP22+QvqC3f2qLZyKda34XTMLsGLGSrO8xndtxMR6ZfqQ+tz7uczRyDor0zyxY/6LlDkoMqYVsUSKvSqho8SVB/JglqCUWqF4ImharVcueQ96j4bN3KFoiDmeXpJTOXO7QJVoyEZ8mgm0rm6sLA4talFef4LaurBZfZxNPMAAAAASUVORK5CYII=",
	onedrive: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAL30lEQVR42u2aa4xd11XHf2ufez2v6/GMY2dix4nHbRw7tI5TmyZgFToKtCKokitoigT9kAopFEFFGqkSAUrDowiJD614SEj5EEG/VUXllQgQLbQVCNqIokoVQmmVKKiNgELcUGfuPXuvtfiw9z73zPUjduxAC3dJW/uc0Zk7Z/3Xf/3XWvsOzG1uc5vb3OY2t7nNbW5z+/9o8r/xR898Kp1txb7fAriABcTFRAKhafwfhkv6x39/YvSv/2cAuO9J3z92e1cc2E+qcDQFRwNYY1gAGkcChMYhgDQOyLPi/tTyYPArnz2x8MVvSwDuf9L3fyPZB2LgvSpOCpCCowLWOCaONo402WkJEIJDAxKcEEDEIfEUxgc+f3r0Z982ANz3CX+oEf/lFnZHcRIQmwyCBScVELxxJDgyyE5Lk0GQUAABwPKLTvyJke7+iU+dka9+ywJw/5O+P415DOfsRCCKE4EY8m6hx4QGpLEc7WaaCtJAECeII5JZIBgAnnheUvPg586s/Om3HAD3P+n7mwl/m+C21iAaRIGJOFGK00BqsgZ4yfnQGDQZhBp5AgxwRAzBwcm7OO42aV5s3vt3b1l97FrfeXAtv7z5I184mybtXTHGtYWF8Eb5z8mpZrSwlAzcQB1UwUSw4JjJFATL6AfAEYJkB90F3AkGLpLLhIBgeOYA4izYUvqtu//iha9/7q3rn/gfZcDr3/P0Vrvd/kxs49tTG9E2kdrI6fvuYOPIPsYKrcHYYKIwcUgCLZDEu+hbcJpmmvcEp6l6UGkvjpDpL57dF3EcA3FwWraHP/rUD+z+g1edAXc99PxmGp9/PLZxS9XwskyV4/dscui12Xl1SJojnAzUIDrZaYGEYOY0jeA4UiIuQTCdpkEXHvfMBBwozgP5R7bLPf4u8IoBCFfy0KmHn3tA4/YzqrplxWlVRdVYWVvk+OmDRKVbybPjavk6ASlBVMETeBIsgUTBk+MRPDqSBItAufeJl+ctP9M6HgWiY9GxCI7uO/Hx/3jiVQPg1MPPfTi1+rgmRZNiKWFJu3X6rcew0GTBU4gJ2lSA0KwBqmAKnkCTgIJEsOhQQCDle0ngE6AtDreOTwogKe/WgrfgEayFZpf+4Os+9uKbrnsKnHr4Xx5NMT2kMdGtpGjK+8Hb97N6w4hxglaL4zZlQSwMUPLPTMg3ASxkGps6TdEECY4nx7w0QFKoXkpiTQME3Ot9ThPS5HeAk9dNBE89/NwDqdXHNSZScT61CY2R1CaaAdz7rruxpmGSyEszEBOF1qdlMBUg3PILh07ocimQxgjBaapDQQl4LgBiU/HbJcRRwIZCGoVcEsWRVmlaVxo5+/T37nnimgG466HnNy1ufyHFtKYxRzw7n0gxK//xrds5dPsG0XLkdzhveSUvouiQ3EvAHHHPJTA4BMtgBCO4IyEr/hQgx3Y3pBuHxJUGD56X5J6A4ITGGTS5irjxtVab33j2+PJHXrEGxPH5R+MkrqU2kmIktTFHvji/sm+FA0c3mCiMe863Wmjfy301SOqIgpgjmlHxZFhrOd/HuW7aWLGxYxPDJoZHJx1aIt6yTFoa4A5mZTkognnuFays0HBwZSl9+NhXXvzy4S+fv++qGfD69zy9Fdv0V1pErsv7mgYx8YYfOs3u/atoiXasANT8L12gaol86eRwz2Wt7GK9Oi+KeE4HdyesNsjRZXShQcVzIyV5UVkQcq/QlOg3hQ1NGaoEJufHwwefObb0+1csgu1LkwdUFU2l3M0AcPCuwyztXWWSprU+zjifDDSBVmcB8RI29253c0yNxi3X+CJ0zXpgeHyFtgkZM8lR93p+UD4GL52kg5nkaJaOEoQQfGG01P7ekX/e9meOLX30ygCI8WwucZYZkCoASjMUDty5Sau9Gm895S+1XxXMHbMaecsCWJx3s5IOmc+mhRFiNHsDiydHpOK8Ghi5glhxFMkfa5BHZ8tOm+QHpbTM7oIHWNqVHtv8p/G/PXvH4p9fFoDNd3x+K43jmqlianRpkBIalcNvvhMLTaZ26fVrxCsYSXPkO+etPFgTWJ1gjpti5ohqBsCMZhcsn9iND0J21ovzLtNr8XyIUhAwkTw8dYhkyriDhPxnRVgYDNJvAscuK4Jtm7ZSG0mT3ir3owPr7DlyICt8EbtYrqvjnfNaXqgIXq7Tlmt8SSdvDW8TNlG8VaxVll63Qlgdds5Xn1JpsWt36SYkLcJXRdEENcE07911WUG4/dCXxj99WQakNm5qUlwN1ZoCiptx8Lu/IzczpbGpL5WqIpd7M3bkuVh+c1PLlI+V9oZnlcTVWLh5yOJrl0hd1NnJAhNUsg6YFRaY9JTcqwDkHsKliORUG4Zi7wd++5IMGO4dnUiTSJxE0qQltRE3Y+P0bTRroxzxWaX3aTpY763FnGB1IMjC4Mnw0k57zJHXmAiNsX5mT3aUndGv9xXoVKNvsiPyeYF6ibpNo1+vHW7d+OLkxCUBWLp5Yzu1mfamuQNbXF/mhpO35T6/p/qxl/dqWfTEneBO8BxlT1URM1peBgSfGD5J3Qct3znClwc7I06vaFBZJ5l5VgGYgtAtFdTzdQUg9XYxfuySACwc2L96wxuOTu/Xljl473eSpEHNy0Q3zXfX3OR4ysIm6rj6VCBUy6BTqJ4SFhVXxZOirSLBGN2x0jmts9TvpUMqDKiptiPy/Yj3Iz+z3LnlkhrgItujY69h9fhrsrKWipqid9N4fUEtNA21wdGS70WVxLw4bx31iRmM2gWaKnvfsh8fNt1nzgKhfiEIoevfSt57J/54KGcl3SCV9+lvyPFLAiDOE2Z2twbp+nb3DIJJPuaqL9edURj5tKbU90x9R1JWTFfFa+ub8rWWfrnZHVg6OppqyGWiX++dUglKqXMvDZI7Ich0rwDQ2ylHzJdshIRPJvVfysdPUp6u0S/1uNdDS2ly8EL/Uu5ELQtipX6sjZV1OWSq7Nu6EdNpb2/9qPvMz8t1NaueBceLw15HbIHQj/7Ohv/SAHzpfcO/ue1D2980kVH2DlQyG6yjXBYOoUMFJ+e+mGUNKEXbk2OqeOdlLn+WjMVDCyzcskKK03ZBZ5y/GBCznjhCCNM2WQoILl1V7FIBwE0+fdlWOLl90k3OulNg7P1V6VXckiL9eu/JwUtnp9MSWFPAUzlLNGPvvQfQeBHq9523HiPs4sOM1zMWkY4BlQVysTSw8JXLAjAc2iOTl+Ssi2SnKnouID4VE+eCwUaKc7W5ccszgJdGyC0/t+e79iGLA1KaOthh5jPOXyL6s9alpshF6d/tA/7yZQ9Ebv3g+T9xs7d1LdTMVukv3i/UiueWLQteYYAnRaOXBkhpRg03veNwd1DSHZjYzuvovRnjCgC46Kxf1V+69/5Meqe8+WXPBIcj+/H2BXvGYXkHfJUMdebwPM/XMLrV4/J8b2ln5N1g/U03llF5GuHZ6z4DZsXvasx3JjA4H7ziM8HDv/hfPxwn6eNS4KuFIXQlM0deyFG30giZaQEgA2Epa4InY/XkGit3rO8QvB1TZe++32m+Qv9n7dO8W7au6puhm3/h3CO2rb/WTwWRWv58WgatnNJqzf06AOWx19XYtW+B9e85uDPnZ6jfP2Pog3Ed7BsM2OTdcu6qvxq7+WfP/byO4696EZjy/WRHsGCemxGtYpjTAM2nPWbOrj1D9p65CRtMO74+3S/GgrpfF+cbtnhQ/vEVfzd468+d+772m/Fjbra3+6V61GW5AfKy14R2Myw5u9Z2sX7PBtY0OxqdPgizAFQmmF8H5wNb/NTFnb+qL0cPf+jfD0xekF/3l9I73XyRrgvMYEzPAUrumzNcHbL3jTfhPeeNndHvpmW/cL9G+yPgAd53Ie2v6dvhw4+eO9Weiw+mcXq7tWmjdoOUbtDdkUZYvnUPK0fWulbBekPNLAAXsMCu2fGP8H7561f9HyQ2H/n6PZOxnrSJv01dgyBhsDxYWdwYHQnLC0ojLyAyrpOjWk6cVHXSp31TaRhJhvvVAVAdfZZF/vDlIj63uc1tbnOb29zmNre5zW1ucwP+G1ME77lSc/kUAAAAAElFTkSuQmCC"
}, _m = {
	...Object.fromEntries(fm.map((e) => [e.id, gm[e.id] || e.icon])),
	online: "rss",
	smb: "network"
};
//#endregion
//#region src/react/boardui/components/application/settings/settings-rows.tsx
function vm({ label: e, description: t, children: n }) {
	return /* @__PURE__ */ (0, z.jsxs)("div", {
		className: R("flex min-h-[52px] w-full items-center justify-between gap-4 py-2.5 pr-2.5", "border-b border-separator-border last:border-b-0"),
		children: [/* @__PURE__ */ (0, z.jsxs)("div", {
			className: "flex min-w-0 flex-col",
			children: [/* @__PURE__ */ (0, z.jsx)("p", {
				className: "text-body-regular text-text-primary",
				children: e
			}), t && /* @__PURE__ */ (0, z.jsx)("p", {
				className: "text-body-2-regular text-text-secondary",
				children: t
			})]
		}), n]
	});
}
//#endregion
//#region src/react/boardui/components/base/buttons/link-button.tsx
var ym = wt({
	base: [
		"inline-flex items-center justify-center gap-1 whitespace-nowrap",
		"font-sans select-none cursor-pointer rounded-sm",
		"underline-offset-3 hover:underline",
		"transition-colors duration-150 ease",
		"outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-border-focus-ring",
		"disabled:cursor-not-allowed disabled:no-underline aria-disabled:cursor-not-allowed aria-disabled:no-underline"
	].join(" "),
	size: {
		medium: "text-body-medium",
		small: "text-body-medium",
		xs: "text-caption-1-semibold"
	},
	icon: {
		medium: "size-5 shrink-0",
		small: "size-[18px] shrink-0",
		xs: "size-3.5 shrink-0"
	},
	variant: {
		primary: ["text-accent-600 active:text-accent-800", "disabled:text-text-tertiary aria-disabled:text-text-tertiary"].join(" "),
		secondary: ["text-text-secondary active:text-text-primary", "disabled:text-text-tertiary aria-disabled:text-text-tertiary"].join(" ")
	}
});
function bm({ variant: e = "primary", size: t = "medium", leadingIcon: n, trailingIcon: r, children: i, className: a, disabled: o = !1, ...s }) {
	let c = R(ym.base, ym.size[t], ym.variant[e], a), l = /* @__PURE__ */ (0, z.jsxs)(z.Fragment, { children: [
		n ? /* @__PURE__ */ (0, z.jsx)(n, {
			className: ym.icon[t],
			"aria-hidden": !0
		}) : null,
		i != null && /* @__PURE__ */ (0, z.jsx)("span", { children: i }),
		r ? /* @__PURE__ */ (0, z.jsx)(r, {
			className: ym.icon[t],
			"aria-hidden": !0
		}) : null
	] });
	if (s.href !== void 0) {
		let { ref: e, href: t, ...n } = s;
		return /* @__PURE__ */ (0, z.jsx)("a", {
			ref: e,
			href: o ? void 0 : t,
			"aria-disabled": o || void 0,
			className: c,
			...n,
			children: l
		});
	}
	let { ref: u, type: d = "button", ...f } = s;
	return /* @__PURE__ */ (0, z.jsx)("button", {
		ref: u,
		type: d,
		disabled: o,
		className: c,
		...f,
		children: l
	});
}
//#endregion
//#region src/react/settings/section.tsx
function xm({ children: e }) {
	return /* @__PURE__ */ (0, z.jsx)("div", {
		className: "ui-settings-rows flex flex-col empty:hidden",
		children: e
	});
}
function Sm({ divided: e = !1, children: t }) {
	return e ? /* @__PURE__ */ (0, z.jsx)("div", {
		className: "flex flex-col gap-4 border-t border-separator-border py-4 pr-3 empty:hidden",
		children: t
	}) : /* @__PURE__ */ (0, z.jsx)("div", {
		className: "flex flex-col gap-4 py-4 pr-3 empty:hidden",
		children: t
	});
}
function Cm({ role: e, children: t }) {
	return /* @__PURE__ */ (0, z.jsx)("p", {
		role: e,
		className: "text-body-2-regular text-text-secondary",
		children: t
	});
}
function wm({ children: e }) {
	return /* @__PURE__ */ (0, z.jsx)("p", {
		role: "alert",
		className: "text-body-2-regular text-text-error-primary",
		children: e
	});
}
function Tm({ href: e, children: t, leadingIcon: n }) {
	return /* @__PURE__ */ (0, z.jsx)(bm, {
		href: e,
		target: "_blank",
		rel: "noopener noreferrer",
		size: "small",
		leadingIcon: n,
		trailingIcon: Rp,
		className: "min-w-0 max-w-full",
		children: /* @__PURE__ */ (0, z.jsx)("span", {
			className: "min-w-0 whitespace-normal break-all",
			children: t
		})
	});
}
function Em({ children: e }) {
	return /* @__PURE__ */ (0, z.jsx)("dl", {
		className: "ui-settings-facts flex flex-col empty:hidden",
		children: e
	});
}
function Dm({ term: e, children: t }) {
	return /* @__PURE__ */ (0, z.jsxs)("div", {
		className: "flex min-h-11 items-center justify-between gap-4 border-b border-separator-border py-2.5 pr-3 last:border-b-0",
		children: [/* @__PURE__ */ (0, z.jsx)("dt", {
			className: "flex max-w-1/2 min-w-0 shrink-0 items-center gap-2 text-body-regular text-text-secondary",
			children: e
		}), /* @__PURE__ */ (0, z.jsx)("dd", {
			className: "flex min-w-0 flex-wrap items-center justify-end gap-2 text-left text-body-regular break-all text-text-primary",
			children: t
		})]
	});
}
function Om({ summary: e, defaultOpen: t = !1, isOpen: n, children: r, trailing: i = !1, onOpenChange: a, contentClassName: o }) {
	let s = (0, w.useId)(), c = (0, w.useRef)(null), l = (0, w.useRef)(null), u = (0, w.useRef)(!1), [d, f] = (0, w.useState)(n ?? t);
	return (0, w.useLayoutEffect)(() => {
		n !== void 0 && n !== d && c.current && l.current && (sm(c.current, l.current, n), f(n));
	}, [n, d]), /* @__PURE__ */ (0, z.jsxs)("details", {
		ref: (e) => {
			c.current = e, e && (n ?? t) && !u.current && (u.current = !0, e.open = !0);
		},
		children: [/* @__PURE__ */ (0, z.jsxs)("summary", {
			"aria-expanded": d,
			"aria-controls": s,
			onClick: (e) => {
				e.preventDefault(), c.current && l.current && (sm(c.current, l.current, !d), f(!d), a?.(!d));
			},
			className: `${i ? "w-full" : "w-fit"} flex cursor-pointer list-none items-center gap-1 rounded-sm text-body-2-medium text-text-secondary outline-none select-none hover:text-text-primary focus-visible:ring-2 focus-visible:ring-border-focus-ring`,
			children: [
				i ? null : /* @__PURE__ */ (0, z.jsx)(Ip, {
					"aria-hidden": !0,
					className: d ? "size-(--icon-inline) shrink-0 rotate-90 transition-transform" : "size-(--icon-inline) shrink-0 transition-transform"
				}),
				e,
				i ? /* @__PURE__ */ (0, z.jsx)(Ip, {
					"aria-hidden": !0,
					className: d ? "ml-auto size-(--icon-inline) shrink-0 -rotate-90 transition-transform" : "ml-auto size-(--icon-inline) shrink-0 rotate-90 transition-transform"
				}) : null
			]
		}), /* @__PURE__ */ (0, z.jsx)("div", {
			ref: l,
			id: s,
			inert: !d,
			children: /* @__PURE__ */ (0, z.jsx)("div", {
				className: R("flex flex-col gap-2 pt-3", o),
				children: r
			})
		})]
	});
}
function km({ name: e }) {
	return /* @__PURE__ */ (0, z.jsx)("svg", {
		"aria-hidden": !0,
		"data-source-mark": e,
		viewBox: "0 0 24 24",
		fill: "none",
		className: "size-(--icon-inline) shrink-0 stroke-current stroke-2",
		children: /* @__PURE__ */ (0, z.jsx)("use", { href: `#i-${e}` })
	});
}
function Am({ mark: e }) {
	return e.startsWith("data:image/png;base64,") ? /* @__PURE__ */ (0, z.jsx)("img", {
		src: e,
		alt: "",
		width: 16,
		height: 16,
		className: "size-(--icon-inline) shrink-0"
	}) : /* @__PURE__ */ (0, z.jsx)(km, { name: e });
}
//#endregion
//#region src/react/pages/setup/setup-done.tsx
function jm({ done: e }) {
	let t = (0, w.useRef)(null);
	return (0, w.useEffect)(() => {
		document.title = "Peach · 设置完成", t.current?.focus();
	}, []), (0, w.useEffect)(() => {
		let t = e.redirect;
		if (!t) return;
		let n = setTimeout(() => location.assign(t), am);
		return () => clearTimeout(n);
	}, [e.redirect]), /* @__PURE__ */ (0, z.jsxs)(kt, {
		title: "设置完成",
		lede: "正在启动馆藏。",
		children: [
			/* @__PURE__ */ (0, z.jsx)("p", {
				className: "text-body-regular text-text-primary",
				children: e.restored ? "已连接已有数据目录。" : e.scan_requested ? "首次扫描已排队，在后台整理媒体库，期间可以照常使用 Peach。" : "稍后在配置页开始扫描媒体库。"
			}),
			/* @__PURE__ */ (0, z.jsx)(Ot, {
				ref: t,
				href: e.url,
				className: "self-start",
				children: e.history_guide ? "导入浏览器历史记录" : "进入 Peach"
			}),
			/* @__PURE__ */ (0, z.jsx)(Om, {
				summary: "运行信息",
				children: /* @__PURE__ */ (0, z.jsx)(Em, { children: e.facts.map((e) => /* @__PURE__ */ (0, z.jsxs)(Dm, {
					term: e.term,
					children: [e.value, e.download_url ? /* @__PURE__ */ (0, z.jsx)(Tm, {
						href: e.download_url,
						children: e.download_label ?? e.download_url
					}) : null]
				}, e.term)) })
			})
		]
	});
}
//#endregion
//#region src/react/boardui/components/base/buttons/icon-button.tsx
var Mm = wt({
	base: [
		"relative inline-flex shrink-0 items-center justify-center overflow-visible rounded-2lg",
		"bg-background-primary-default text-foreground-icon-primary",
		"border border-border-button-default shadow-xs",
		"select-none cursor-pointer",
		"transition-[background-color,border-color,box-shadow,color] duration-150 ease",
		"outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-border-focus-ring",
		"hover:bg-background-primary-hover hover:border-border-button-hover",
		"active:bg-background-primary-active active:border-border-button-active",
		"disabled:cursor-not-allowed disabled:bg-background-primary-disabled disabled:border-border-button-default disabled:text-icon-button-disabled-foreground disabled:opacity-60 disabled:shadow-none"
	].join(" "),
	size: {
		medium: "size-9",
		small: "size-8"
	},
	icon: {
		medium: "size-5 shrink-0",
		small: "size-4 shrink-0"
	}
});
function Nm({ icon: e, size: t = "medium", className: n, type: r = "button", ref: i, ...a }) {
	return /* @__PURE__ */ (0, z.jsx)("button", {
		ref: i,
		type: r,
		className: R(Mm.base, Mm.size[t], n),
		...a,
		children: /* @__PURE__ */ (0, z.jsx)(e, {
			className: Mm.icon[t],
			"aria-hidden": !0
		})
	});
}
//#endregion
//#region src/react/boardui/components/base/switch/switch.tsx
var Pm = wt({
	sm: {
		track: "h-4 w-7",
		trackRadius: {
			pill: "rounded-full",
			rectangle: "rounded-[3px]"
		},
		onShadow: "shadow-[inset_0_1px_0_0_rgb(255_255_255/0.25),inset_0_0_0_0.5px_var(--color-accent-500)]",
		thumb: "size-3",
		thumbRadius: {
			pill: "rounded-full",
			rectangle: "rounded-[1px]"
		},
		offset: "left-0.5 top-0.5",
		travel: "translate-x-3",
		chip: "size-[5px] border-[0.25px] shadow-[0_2px_2px_0_rgb(0_0_0/0.03)]",
		chipRadius: {
			pill: "rounded-full",
			rectangle: "rounded-[0.5px]"
		}
	},
	md: {
		track: "h-6 w-[42px]",
		trackRadius: {
			pill: "rounded-full",
			rectangle: "rounded-[4.5px]"
		},
		onShadow: "shadow-[inset_0_1.5px_0_0_rgb(255_255_255/0.25),inset_0_0_0_0.75px_var(--color-accent-500)]",
		thumb: "size-[18px]",
		thumbRadius: {
			pill: "rounded-full",
			rectangle: "rounded-[1.5px]"
		},
		offset: "left-[3px] top-[3px]",
		travel: "translate-x-[18px]",
		chip: "size-[7.5px] border-[0.375px] shadow-[0_3px_3px_0_rgb(0_0_0/0.03)]",
		chipRadius: {
			pill: "rounded-full",
			rectangle: "rounded-[0.75px]"
		}
	},
	lg: {
		track: "h-8 w-14",
		trackRadius: {
			pill: "rounded-full",
			rectangle: "rounded-md"
		},
		onShadow: "shadow-checkbox-selected",
		thumb: "size-6",
		thumbRadius: {
			pill: "rounded-full",
			rectangle: "rounded-xs"
		},
		offset: "left-1 top-1",
		travel: "translate-x-6",
		chip: "size-[10px] border-[0.5px] shadow-[0_4px_4px_0_rgb(0_0_0/0.03)]",
		chipRadius: {
			pill: "rounded-full",
			rectangle: "rounded-[1px]"
		}
	}
});
function Fm({ state: e, size: t = "md", shape: n = "pill" }) {
	let r = Pm[t];
	return /* @__PURE__ */ (0, z.jsx)("span", {
		"aria-hidden": !0,
		className: R("relative shrink-0 transition-colors duration-200 ease", r.track, r.trackRadius[n], e.isSelected ? R("bg-linear-to-b from-accent-500 to-accent-600", r.onShadow) : "bg-background-tertiary-default", e.isDisabled && "opacity-50", e.isFocusVisible && "ring-2 ring-border-focus-ring ring-offset-2"),
		children: /* @__PURE__ */ (0, z.jsx)("span", {
			className: R("absolute flex items-center justify-center", "bg-linear-to-b from-control-indicator-background from-[43.837%] to-control-indicator-background-subtle", "shadow-[0_3px_3px_0_rgb(0_0_0/0.03),0_0.75px_0_0_rgb(0_0_0/0.05)]", "transition-transform duration-200 ease", r.thumb, r.thumbRadius[n], r.offset, e.isSelected && r.travel),
			children: /* @__PURE__ */ (0, z.jsx)("span", { className: R("border-solid bg-linear-to-t from-[43.837%]", r.chip, r.chipRadius[n], e.isSelected ? "border-accent-600 from-switch-on-chip-start to-switch-on-chip-end" : "border-border-button-default/50 from-switch-off-chip-start to-switch-off-chip-end") })
		})
	});
}
function Im({ className: e, children: t, size: n = "md", shape: r = "pill", ref: i, ...a }) {
	return /* @__PURE__ */ (0, z.jsx)(Ep, {
		ref: i,
		...a,
		className: (t) => R("group inline-flex items-center gap-2 select-none", t.isDisabled ? "cursor-not-allowed" : "cursor-pointer", typeof e == "function" ? e(t) : e),
		children: (e) => /* @__PURE__ */ (0, z.jsxs)(z.Fragment, { children: [/* @__PURE__ */ (0, z.jsx)(Fm, {
			state: e,
			size: n,
			shape: r
		}), t != null && t !== !1 && /* @__PURE__ */ (0, z.jsx)("span", {
			className: "text-body-medium text-text-primary",
			children: t
		})] })
	});
}
//#endregion
//#region src/react/boardui/components/base/dropdown/menu-styles.ts
var Lm = [
	"max-w-[calc(100vw-32px)] overflow-y-auto",
	"rounded-2xl border border-border-button-default bg-background-primary-default p-2.5 shadow-dropdown",
	"transition duration-150 ease-out",
	"data-[entering]:opacity-0 data-[entering]:scale-95 data-[entering]:blur-[2px]",
	"data-[exiting]:opacity-0 data-[exiting]:scale-95 data-[exiting]:blur-[2px]",
	"data-[placement=bottom]:origin-top-left data-[placement=top]:origin-bottom-left",
	"data-[placement=left]:origin-right data-[placement=right]:origin-left"
].join(" "), Rm = "w-[266px]", zm = "flex w-full flex-col gap-1 outline-none", Bm = ["flex w-full cursor-pointer items-center gap-2 rounded-2lg p-2 text-left", "text-text-primary outline-none transition-colors"].join(" ");
//#endregion
//#region src/react/boardui/components/foundations/icons/chevrons.tsx
function Vm(e) {
	return /* @__PURE__ */ (0, z.jsx)("svg", {
		viewBox: "0 0 16 16",
		fill: "none",
		"aria-hidden": !0,
		...e,
		children: /* @__PURE__ */ (0, z.jsx)("path", {
			d: "M4 7L7.29289 10.2929C7.68342 10.6834 8.31658 10.6834 8.70711 10.2929L12 7",
			stroke: "currentColor",
			strokeWidth: "2",
			strokeLinecap: "round"
		})
	});
}
//#endregion
//#region src/react/boardui/utils/use-dismiss-on-outside-press.ts
function Hm(e, t, n) {
	(0, w.useEffect)(() => {
		if (!e) return;
		let r = (e) => {
			let r = e.target;
			n.some((e) => e.current?.contains(r)) || t();
		};
		return document.addEventListener("pointerdown", r, !0), () => document.removeEventListener("pointerdown", r, !0);
	}, [
		e,
		t,
		n
	]);
}
function Um(e, t) {
	let n = (0, w.useRef)(!1);
	return (0, w.useEffect)(() => {
		if (!e) return;
		let r = (e) => {
			t.current?.contains(e.target) && (n.current = !0, setTimeout(() => {
				n.current = !1;
			}, 400));
		};
		return document.addEventListener("pointerdown", r, !0), () => document.removeEventListener("pointerdown", r, !0);
	}, [e, t]), (e) => e && n.current ? (n.current = !1, !1) : !0;
}
//#endregion
//#region src/react/boardui/components/base/select/select.tsx
var Wm = (0, w.createContext)("md");
function Gm({ className: e, triggerClassName: t, popoverClassName: n, size: r = "md", children: i, items: a, renderValue: o, ref: s, ...c }) {
	let l = (0, w.useRef)(null), u = (0, w.useRef)(null), [d, f] = (0, w.useState)(!1);
	Hm(d, () => f(!1), [l, u]);
	let p = Um(d, l);
	return /* @__PURE__ */ (0, z.jsx)(vp, {
		ref: s,
		...c,
		isOpen: d,
		onOpenChange: (e) => p(e) && f(e),
		className: R("group flex flex-col", e),
		children: ({ isOpen: e }) => /* @__PURE__ */ (0, z.jsxs)(z.Fragment, { children: [/* @__PURE__ */ (0, z.jsxs)(zo, {
			ref: l,
			className: R("flex w-full cursor-pointer items-center justify-between rounded-2lg", "border border-border-button-default bg-background-primary-default shadow-xs", "text-text-primary", "transition-[background-color,border-color,box-shadow,padding,font-size] duration-200 ease", "hover:bg-background-primary-hover hover:border-border-button-hover", "outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-border-focus-ring", "disabled:cursor-not-allowed disabled:bg-background-primary-disabled disabled:text-text-tertiary disabled:shadow-none", r === "sm" ? "gap-1 px-[7px] py-1 text-body-2-medium" : "gap-1.5 px-2.5 py-2 text-body-medium", t),
			children: [/* @__PURE__ */ (0, z.jsx)(Sp, {
				className: R("flex min-w-0 items-center truncate", r === "sm" ? "gap-1" : "gap-[5px]"),
				children: o
			}), /* @__PURE__ */ (0, z.jsx)(Vm, { className: R("shrink-0 text-text-secondary transition-transform duration-200 ease", r === "sm" ? "size-3.5" : "size-4", e && "rotate-180") })]
		}), /* @__PURE__ */ (0, z.jsx)(cf, {
			ref: u,
			isNonModal: !0,
			offset: 4,
			className: R(Rm, Lm, "p-2", n),
			children: /* @__PURE__ */ (0, z.jsx)(nu, {
				items: a,
				className: R(zm, "max-h-[240px] overflow-auto"),
				children: /* @__PURE__ */ (0, z.jsx)(Wm.Provider, {
					value: r,
					children: i
				})
			})
		})] })
	});
}
function Km({ className: e, children: t, ...n }) {
	let r = (0, w.useContext)(Wm);
	return /* @__PURE__ */ (0, z.jsx)(ou, {
		...n,
		className: (t) => R(Bm, r === "sm" ? "px-2 py-1.5 text-body-2-medium" : "text-body-medium", (t.isFocused || t.isSelected) && "bg-dropdown-item-hover-background", t.isDisabled && "cursor-not-allowed text-text-disabled", typeof e == "function" ? e(t) : e),
		children: t
	});
}
//#endregion
//#region src/core/random-id.ts
function qm() {
	if (typeof crypto.randomUUID == "function") return crypto.randomUUID();
	let e = crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(16));
	e[6] = e[6] & 15 | 64, e[8] = e[8] & 63 | 128;
	let t = Array.from(e, (e) => e.toString(16).padStart(2, "0")).join("");
	return `${t.slice(0, 8)}-${t.slice(8, 12)}-${t.slice(12, 16)}-${t.slice(16, 20)}-${t.slice(20)}`;
}
//#endregion
//#region node_modules/motion-utils/dist/es/clamp.mjs
var Jm = (e, t, n) => n > t ? t : n < e ? e : n, Ym = {};
//#endregion
//#region node_modules/motion-utils/dist/es/memo.mjs
/*#__NO_SIDE_EFFECTS__*/
function Xm(e) {
	let t;
	return () => (t === void 0 && (t = e()), t);
}
//#endregion
//#region node_modules/motion-utils/dist/es/noop.mjs
var Zm = /* @__NO_SIDE_EFFECTS__ */ (e) => e, Qm = /* @__NO_SIDE_EFFECTS__ */ (e) => e * 1e3, $m = /* @__NO_SIDE_EFFECTS__ */ (e) => e / 1e3, eh = /* @__NO_SIDE_EFFECTS__ */ (e) => Array.isArray(e) && typeof e[0] == "number", th = {
	delta: 0,
	timestamp: 0,
	isProcessing: !1
}, nh;
function rh() {
	nh = void 0;
}
var ih = {
	now: () => (nh === void 0 && ih.set(th.isProcessing || Ym.useManualTiming ? th.timestamp : performance.now()), nh),
	set: (e) => {
		nh = e, queueMicrotask(rh);
	}
}, ah = (e, t, n = 10) => {
	let r = "", i = Math.max(Math.round(t / n), 2);
	for (let t = 0; t < i; t++) r += Math.round(e(t / (i - 1)) * 1e4) / 1e4 + ", ";
	return `linear(${r.substring(0, r.length - 2)})`;
}, oh = 2e4;
function sh(e, t = 50, n = oh, r) {
	let i = 0, a = e.next(i);
	for (r?.push(a.value); !a.done && i < n;) i += t, a = e.next(i), r?.push(a.value);
	return i >= n ? Infinity : i;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/generators/utils/create-generator-easing.mjs
function ch(e, t = 100, n) {
	let { keyframes: r, velocity: i } = e, a = r && r[r.length - 1] - r[0], o = n({
		...e,
		velocity: i && a ? i * t / a : i,
		keyframes: [0, t]
	}), s = Math.min(sh(o), oh);
	return {
		type: "keyframes",
		ease: (e) => o.next(s * e).value / t,
		duration: /* @__PURE__ */ $m(s)
	};
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/generators/spring.mjs
var lh = {
	stiffness: 100,
	damping: 10,
	mass: 1,
	duration: 800,
	bounce: .3,
	visualDuration: .3,
	restSpeed: {
		granular: .01,
		default: 2
	},
	restDelta: {
		granular: .005,
		default: .5
	},
	minDuration: .01,
	maxDuration: 10,
	minDamping: .05
}, uh = (e) => e < 0 ? 1 / Math.max(1 + e, lh.minDamping) : Math.max(1 - e, lh.minDamping);
function dh(e, t) {
	if (!(e > 1)) return 1;
	let n = Math.sqrt(e * e - 1), r = e - n, i = e + n, a = 2 * n * Math.exp(-t) * (1 + t);
	return mh((e) => i * Math.exp(-r * e) - r * Math.exp(-i * e) - a, (e) => Math.exp(-i * e) - Math.exp(-r * e), t) / t;
}
function fh(e, t) {
	return e * Math.sqrt(1 - t * t);
}
var ph = 12;
function mh(e, t, n) {
	let r = n;
	for (let n = 1; n < ph; n++) r -= e(r) / t(r);
	return r;
}
var hh = .001;
function gh({ duration: e = lh.duration, bounce: t = lh.bounce }) {
	let n, r;
	lh.maxDuration;
	let i = uh(t);
	e = Jm(lh.minDuration, lh.maxDuration, /* @__PURE__ */ $m(e)), i < 1 ? (n = (t) => {
		let n = t * i, r = n * e, a = fh(t, i), o = Math.exp(-r);
		return hh - n / a * o;
	}, r = (t) => {
		let r = t * i * e, a = i * i * t * t * e, o = Math.exp(-r), s = fh(t * t, i);
		return (-n(t) + hh > 0 ? -1 : 1) * -a * o / s;
	}) : (n = (t) => -.001 + Math.exp(-t * e) * (t * e + 1), r = (t) => Math.exp(-t * e) * (-t * (e * e)));
	let a = 5 / e, o = mh(n, r, a), s = o * dh(i, o * e), c = s * s;
	return {
		stiffness: c,
		damping: i * 2 * Math.sqrt(c),
		duration: /* @__PURE__ */ Qm(e)
	};
}
var _h = (e, t) => (t ? e >= 0 : e > 0) && e < Infinity;
function vh(e, t) {
	if (_h(e, t)) return e;
}
function yh(e) {
	let t = vh(e.stiffness), n = vh(e.damping, !0), r = vh(e.mass), i = {
		...e,
		stiffness: t ?? lh.stiffness,
		damping: n ?? lh.damping,
		mass: r ?? lh.mass,
		isResolvedFromDuration: !1,
		isTimeDefined: (t ?? n ?? r) === void 0 && (e.duration !== void 0 || e.bounce !== void 0)
	};
	if (i.isTimeDefined) {
		if (e.visualDuration) {
			let t = uh(e.bounce || 0), n = 2 * Math.PI / (e.visualDuration * 1.2) * dh(t, 2 * Math.PI / 1.2);
			i.stiffness = n * n, i.damping = 2 * t * Math.sqrt(i.stiffness);
		} else Object.assign(i, gh(i)), i.isResolvedFromDuration = !0;
		(!_h(i.stiffness) || !_h(i.damping, !0)) && (i.stiffness = lh.stiffness, i.damping = lh.damping);
	}
	return i;
}
function bh(e = lh.visualDuration, t = lh.bounce) {
	let n = typeof e == "object" ? e : {
		visualDuration: e,
		keyframes: [0, 1],
		bounce: t
	}, r = n.keyframes[0], i = n.keyframes[n.keyframes.length - 1], a = {
		done: !1,
		value: r
	}, { stiffness: o, damping: s, mass: c, duration: l, isResolvedFromDuration: u, isTimeDefined: d } = yh({ ...n }), f = (e) => d ? 0 : -/* @__PURE__ */ $m(e), p = s / (2 * Math.sqrt(o * c)), m = /* @__PURE__ */ $m(Math.sqrt(o / c)), h = p * m, g = {
		target: i,
		delta: i - r,
		velocity: f(n.velocity || 0) || 0,
		restSpeed: 0,
		restDelta: 0
	}, _ = () => {
		let e = Math.abs(g.delta) < 5;
		g.restSpeed = n.restSpeed || (e ? lh.restSpeed.granular : lh.restSpeed.default), g.restDelta = n.restDelta || (e ? lh.restDelta.granular : lh.restDelta.default);
	};
	_();
	let v, y, b;
	if (p < 1) {
		let e = fh(m, p), t = {
			A: 0,
			sinC: 0,
			cosC: 0,
			t: -1,
			env: 0,
			sin: 0,
			cos: 0
		};
		b = () => {
			t.A = (g.velocity + h * g.delta) / e, t.sinC = h * t.A + g.delta * e, t.cosC = h * g.delta - t.A * e;
		};
		let n = (n) => {
			n !== t.t && (t.t = n, t.env = Math.exp(-h * n), t.sin = Math.sin(e * n), t.cos = Math.cos(e * n));
		};
		v = (e) => (n(e), g.target - t.env * (t.A * t.sin + g.delta * t.cos)), y = (e) => (n(e), t.env * (t.sinC * t.sin + t.cosC * t.cos));
	} else if (p === 1) {
		v = (e) => g.target - Math.exp(-m * e) * (g.delta + (g.velocity + m * g.delta) * e);
		let e = { C: 0 };
		b = () => {
			e.C = g.velocity + m * g.delta;
		}, y = (t) => Math.exp(-m * t) * (m * e.C * t - g.velocity);
	} else {
		let e = m * Math.sqrt(p * p - 1), t = h - e, n = h + e, r = d ? Infinity : 300 / e, i = (e, t) => Math.exp(t > r ? -e * r - h * (t - r) : -e * t), a = {
			S: 0,
			F: 0
		};
		b = () => {
			let t = (g.velocity + h * g.delta) / e;
			a.S = (g.delta + t) / 2, a.F = (g.delta - t) / 2;
		}, v = (e) => g.target - a.S * i(t, e) - a.F * i(n, e), y = (e) => t * a.S * i(t, e) + n * a.F * i(n, e);
	}
	b();
	let x = u && l || null, S = {
		calculatedDuration: x,
		retarget: (e, t) => {
			g.target = e[e.length - 1], g.delta = g.target - e[0], g.velocity = f(t), n.restSpeed && n.restDelta || _(), S.calculatedDuration = x, a.done = !1, b();
		},
		velocity: (e) => /* @__PURE__ */ Qm(y(e)),
		next: (e) => {
			let t = v(e);
			if (u) a.done = e >= l;
			else {
				let n = /* @__PURE__ */ Qm(y(e));
				a.done = Math.abs(n) <= g.restSpeed && Math.abs(g.target - t) <= g.restDelta;
			}
			return a.value = a.done ? g.target : t, a;
		},
		toString: () => {
			let e = Math.min(sh(S), oh), t = ah((t) => S.next(e * t).value, e, 30);
			return e + "ms " + t;
		},
		toTransition: () => {}
	};
	return S;
}
bh.applyToOptions = (e) => {
	let t = ch(e, 100, bh);
	return e.ease = t.ease, e.duration = /* @__PURE__ */ Qm(t.duration), e.type = "keyframes", e;
};
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/get-final.mjs
var xh = (e) => e !== null;
function Sh(e, { repeat: t, repeatType: n = "loop" }, r, i = 1) {
	let a = e.filter(xh), o = i < 0 || t && n !== "loop" && t % 2 == 1 ? 0 : a.length - 1;
	return !o || r === void 0 ? a[o] : r;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/utils/notify-inspector.mjs
function Ch(e, t) {
	return {
		kind: e,
		animation: t,
		timestamp: ih.now(),
		frameTimestamp: th.timestamp,
		frameIsProcessing: th.isProcessing
	};
}
function wh(e, t, n) {
	let r = globalThis.__MOTION_INSPECT__;
	if (r) try {
		r({
			...Ch("animation-start", e),
			options: n ? {
				...t,
				...n
			} : t
		});
	} catch {}
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/utils/WithPromise.mjs
var Th = class {
	constructor() {
		this.isResolved = !1;
	}
	get finished() {
		return this._finished ||= this.isResolved ? Promise.resolve() : new Promise((e) => {
			this._resolve = e;
		}), this._finished;
	}
	updateFinished() {
		this._finished = this._resolve = void 0, this.isResolved = !1;
	}
	notifyFinished() {
		this.isResolved = !0, this._resolve?.();
	}
	then(e, t) {
		return this.finished.then(e, t);
	}
};
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/utils/fill-wildcards.mjs
function Eh(e) {
	for (let t = 1; t < e.length; t++) e[t] ?? (e[t] = e[t - 1]);
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/dom/is-css-var.mjs
var Dh = (e) => e.startsWith("--");
//#endregion
//#region node_modules/motion-dom/dist/es/render/dom/style-set.mjs
function Oh(e, t, n) {
	Dh(t) ? e.style.setProperty(t, n) : e.style[t] = n;
}
//#endregion
//#region node_modules/motion-dom/dist/es/utils/supports/flags.mjs
var kh = {};
//#endregion
//#region node_modules/motion-dom/dist/es/utils/supports/memo.mjs
function Ah(e, t) {
	let n = /* @__PURE__ */ Xm(e);
	return () => kh[t] ?? n();
}
//#endregion
//#region node_modules/motion-dom/dist/es/utils/supports/scroll-timeline.mjs
var jh = /* @__PURE__ */ Ah(() => window.ScrollTimeline !== void 0, "scrollTimeline"), Mh = /*@__PURE__*/ Ah(() => {
	try {
		document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
	} catch {
		return !1;
	}
	return !0;
}, "linearEasing"), Nh = ([e, t, n, r]) => `cubic-bezier(${e}, ${t}, ${n}, ${r})`, Ph = {
	linear: "linear",
	ease: "ease",
	easeIn: "ease-in",
	easeOut: "ease-out",
	easeInOut: "ease-in-out",
	circIn: /*@__PURE__*/ Nh([
		0,
		.65,
		.55,
		1
	]),
	circOut: /*@__PURE__*/ Nh([
		.55,
		0,
		1,
		.45
	]),
	backIn: /*@__PURE__*/ Nh([
		.31,
		.01,
		.66,
		-.59
	]),
	backOut: /*@__PURE__*/ Nh([
		.33,
		1.53,
		.69,
		.99
	])
};
//#endregion
//#region node_modules/motion-dom/dist/es/animation/waapi/easing/map-easing.mjs
function Fh(e, t) {
	if (e) return typeof e == "function" ? Mh() ? ah(e, t) : "ease-out" : /* @__PURE__ */ eh(e) ? Nh(e) : Array.isArray(e) ? e.map((e) => Fh(e, t) || Ph.easeOut) : Ph[e];
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/waapi/start-waapi-animation.mjs
function Ih(e, t, n, { delay: r = 0, duration: i = 300, repeat: a = 0, repeatType: o = "loop", ease: s = "easeOut", times: c } = {}, l = void 0) {
	let u = { [t]: n };
	c && (u.offset = c);
	let d = Fh(s, i);
	Array.isArray(d) && (u.easing = d);
	let f = {
		delay: r,
		duration: i,
		easing: Array.isArray(d) ? "linear" : d,
		fill: "both",
		iterations: a + 1,
		direction: o === "reverse" ? "alternate" : "normal"
	};
	return l && (f.pseudoElement = l), e.animate(u, f);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/generators/utils/is-generator.mjs
function Lh(e) {
	return typeof e == "function" && "applyToOptions" in e;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/waapi/utils/apply-generator.mjs
function Rh({ type: e, ...t }) {
	return Lh(e) && Mh() ? e.applyToOptions(t) : (t.duration ??= 300, t.ease ??= "easeOut", t);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/NativeAnimation.mjs
var zh = class extends Th {
	constructor(e) {
		if (super(), this.finishedTime = null, this.isStopped = !1, this.manualStartTime = null, !e) return;
		let { element: t, name: n, keyframes: r, pseudoElement: i, allowFlatten: a = !1, finalKeyframe: o, onComplete: s } = e;
		this.isPseudoElement = !!i, this.allowFlatten = a, this.options = e, e.type;
		let c = Rh(e);
		this.animation = Ih(t, n, r, c, i), c.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
			if (this.finishedTime = this.time, !i) {
				let e = Sh(r, this.options, o, this.speed);
				this.updateMotionValue && this.updateMotionValue(e), Oh(t, n, e), this.animation.cancel();
			}
			s?.(), this.notifyFinished();
		}, wh(this, e, c);
	}
	play() {
		this.isStopped || (this.manualStartTime = null, this.animation.play(), this.state === "finished" && this.updateFinished());
	}
	pause() {
		this.animation.pause();
	}
	complete() {
		this.animation.finish?.();
	}
	cancel() {
		try {
			this.animation.cancel();
		} catch {}
	}
	stop() {
		if (this.isStopped) return;
		this.isStopped = !0;
		let { state: e } = this;
		e !== "idle" && e !== "finished" && (this.updateMotionValue ? this.updateMotionValue() : this.commitStyles(), this.isPseudoElement || this.cancel());
	}
	commitStyles() {
		let e = this.options?.element;
		!this.isPseudoElement && e?.isConnected && this.animation.commitStyles?.();
	}
	get duration() {
		let e = this.animation.effect?.getComputedTiming?.().duration || 0;
		return /* @__PURE__ */ $m(Number(e));
	}
	get iterationDuration() {
		let { delay: e = 0 } = this.options || {};
		return this.duration + /* @__PURE__ */ $m(e);
	}
	get time() {
		return /* @__PURE__ */ $m(Number(this.animation.currentTime) || 0);
	}
	set time(e) {
		let t = this.finishedTime !== null;
		this.manualStartTime = null, this.finishedTime = null, this.animation.currentTime = /* @__PURE__ */ Qm(e), t && this.animation.pause();
	}
	get speed() {
		return this.animation.playbackRate;
	}
	set speed(e) {
		e < 0 && (this.finishedTime = null), this.animation.playbackRate = e;
	}
	get state() {
		return this.finishedTime === null ? this.animation.playState : "finished";
	}
	get startTime() {
		return this.manualStartTime ?? Number(this.animation.startTime);
	}
	set startTime(e) {
		this.manualStartTime = this.animation.startTime = e;
	}
	attachTimeline({ timeline: e, onAttach: t, observe: n }) {
		return this.allowFlatten && this.animation.effect?.updateTiming({ easing: "linear" }), this.animation.onfinish = null, e && jh() ? (this.animation.timeline = e, t?.(this.animation), Zm) : n(this);
	}
}, Bh = class {
	constructor(e) {
		this.stop = () => this.runAll("stop"), this.animations = e.filter(Boolean);
	}
	get finished() {
		return Promise.all(this.animations.map((e) => e.finished));
	}
	getAll(e) {
		return this.animations[0][e];
	}
	setAll(e, t) {
		for (let n = 0; n < this.animations.length; n++) this.animations[n][e] = t;
	}
	attachTimeline(e) {
		let t = this.animations.map((t) => t.attachTimeline(e));
		return () => {
			t.forEach((e, t) => {
				e && e(), this.animations[t].stop();
			});
		};
	}
	get time() {
		return this.getAll("time");
	}
	set time(e) {
		this.setAll("time", e);
	}
	get speed() {
		return this.getAll("speed");
	}
	set speed(e) {
		this.setAll("speed", e);
	}
	get state() {
		return this.getAll("state");
	}
	get startTime() {
		return this.getAll("startTime");
	}
	get duration() {
		return Vh(this.animations, "duration");
	}
	get iterationDuration() {
		return Vh(this.animations, "iterationDuration");
	}
	runAll(e) {
		this.animations.forEach((t) => t[e]());
	}
	play() {
		this.runAll("play");
	}
	pause() {
		this.runAll("pause");
	}
	cancel() {
		this.runAll("cancel");
	}
	complete() {
		this.runAll("complete");
	}
};
function Vh(e, t) {
	let n = 0;
	for (let r = 0; r < e.length; r++) {
		let i = e[r][t];
		i !== null && i > n && (n = i);
	}
	return n;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/GroupAnimationWithThen.mjs
var Hh = class extends Bh {
	then(e, t) {
		return this.finished.finally(e).then(() => {});
	}
}, Uh = /* @__PURE__ */ new WeakMap(), Wh = (e, t = "") => `${e}:${t}`;
function Gh(e) {
	let t = Uh.get(e);
	return t || (t = /* @__PURE__ */ new Map(), Uh.set(e, t)), t;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/utils/resolve-transition.mjs
function Kh(e, t) {
	if (e?.inherit && t) {
		let { inherit: n, ...r } = e;
		return {
			...t,
			...r
		};
	}
	return e;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/utils/get-value-transition.mjs
function qh(e, t) {
	let n = e?.[t] ?? e?.default ?? e;
	return n === e ? n : Kh(n, e);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/waapi/utils/px-values.mjs
var Jh = /* @__PURE__ */ new Set(/* @__PURE__ */ "borderWidth.borderTopWidth.borderRightWidth.borderBottomWidth.borderLeftWidth.borderRadius.borderTopLeftRadius.borderTopRightRadius.borderBottomRightRadius.borderBottomLeftRadius.width.maxWidth.height.maxHeight.top.right.bottom.left.inset.insetBlock.insetBlockStart.insetBlockEnd.insetInline.insetInlineStart.insetInlineEnd.padding.paddingTop.paddingRight.paddingBottom.paddingLeft.paddingBlock.paddingBlockStart.paddingBlockEnd.paddingInline.paddingInlineStart.paddingInlineEnd.margin.marginTop.marginRight.marginBottom.marginLeft.marginBlock.marginBlockStart.marginBlockEnd.marginInline.marginInlineStart.marginInlineEnd.fontSize.backgroundPositionX.backgroundPositionY".split("."));
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/utils/apply-px-defaults.mjs
function Yh(e, t) {
	for (let n = 0; n < e.length; n++) typeof e[n] == "number" && Jh.has(t) && (e[n] = e[n] + "px");
}
//#endregion
//#region node_modules/motion-dom/dist/es/utils/resolve-elements.mjs
function Xh(e, t, n) {
	if (e == null) return [];
	if (e instanceof EventTarget) return [e];
	if (typeof e == "string") {
		let r = document;
		t && (r = t.current);
		let i = n?.[e] ?? r.querySelectorAll(e);
		return i ? Array.from(i) : [];
	}
	return Array.from(e).filter((e) => e != null);
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/dom/style-computed.mjs
function Zh(e, t) {
	let n = window.getComputedStyle(e);
	return Dh(t) ? n.getPropertyValue(t) : n[t];
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/animators/waapi/animate-elements.mjs
function Qh(e, t, n, r) {
	if (e == null) return [];
	let i = Xh(e, r), a = i.length, o = [];
	for (let e = 0; e < a; e++) {
		let r = i[e], s = { ...n };
		typeof s.delay == "function" && (s.delay = s.delay(e, a));
		for (let e in t) {
			let n = t[e];
			Array.isArray(n) || (n = [n]);
			let i = { ...qh(s, e) };
			i.duration &&= /* @__PURE__ */ Qm(i.duration), i.delay &&= /* @__PURE__ */ Qm(i.delay);
			let a = Gh(r), c = Wh(e, i.pseudoElement || ""), l = a.get(c);
			l && l.stop(), o.push({
				map: a,
				key: c,
				unresolvedKeyframes: n,
				options: {
					...i,
					element: r,
					name: e,
					allowFlatten: !s.type && !s.ease
				}
			});
		}
	}
	for (let e = 0; e < o.length; e++) {
		let { unresolvedKeyframes: t, options: n } = o[e], { element: r, name: i, pseudoElement: a } = n;
		!a && t[0] === null && (t[0] = Zh(r, i)), Eh(t), Yh(t, i), !a && t.length < 2 && t.unshift(Zh(r, i)), n.keyframes = t;
	}
	let s = [];
	for (let e = 0; e < o.length; e++) {
		let { map: t, key: n, options: r } = o[e], i = new zh(r);
		t.set(n, i), i.finished.finally(() => t.delete(n)), s.push(i);
	}
	return s;
}
var $h = /*@__PURE__*/ ((e) => {
	function t(t, n, r) {
		return new Hh(Qh(t, n, r, e));
	}
	return t;
})(), eg = {
	selection: {
		type: bh,
		duration: .16,
		bounce: 0
	},
	hover: {
		type: bh,
		duration: .08,
		bounce: 0
	}
};
function tg(e) {
	let [t, n] = (0, w.useState)(null);
	return (0, w.useLayoutEffect)(() => {
		if (!t) return;
		let n = document.createElement("span");
		n.setAttribute("aria-hidden", "true"), n.dataset.movingSurface = e, n.hidden = !0, t.prepend(n), t.dataset.surfaceHost = e;
		let r = matchMedia("(prefers-reduced-motion: reduce)"), i = matchMedia("(hover: hover) and (pointer: fine)"), a = !1, o = null, s = null, c = "", l, u = e === "selection" ? "[role=\"tab\"],label[data-rac]" : "[role=\"option\"],button", d = () => [...t.querySelectorAll(u)].filter((e) => e.getBoundingClientRect().width > 0), f = () => {
			l?.cancel(), n.hidden = !0, s = null, c = "", delete t.dataset.surfaceReady;
		}, p = (u = !1) => {
			let p = d(), m = p.find((e) => e.hasAttribute("data-selected") || e.getAttribute("aria-selected") === "true"), h = e === "selection" ? m : o;
			if (!h || !t.contains(h) || !p.includes(h) || e === "hover" && (!i.matches || !a || p.length > 8 || h.matches(":disabled,[aria-disabled=\"true\"],[data-disabled]"))) {
				f();
				return;
			}
			let g = h.getBoundingClientRect(), _ = t.getBoundingClientRect(), v = _.width / t.offsetWidth || 1, y = _.height / t.offsetHeight || 1, b = (g.left - _.left) / v + t.scrollLeft - t.clientLeft, x = (g.top - _.top) / y + t.scrollTop - t.clientTop, S = g.width / v, C = g.height / y, w = `${b},${x},${S},${C}`;
			if (a && i.matches && !r.matches && s === h && c === w) return;
			let T = n.hidden ? null : n.getBoundingClientRect();
			l?.cancel(), n.hidden = !1, n.style.width = `${S}px`, n.style.height = `${C}px`;
			let E = `translate(${b}px, ${x}px) scale(1, 1)`;
			if (u && a && !r.matches && T && s !== h) {
				let r = `translate(${(T.left - _.left) / v + t.scrollLeft - t.clientLeft}px, ${(T.top - _.top) / y + t.scrollTop - t.clientTop}px) scale(${T.width / v / S}, ${T.height / y / C})`;
				l = $h(n, { transform: [r, E] }, eg[e]);
			} else n.style.transform = E;
			s = h, c = w, t.dataset.surfaceReady = "";
		}, m = (t) => {
			if (a = t.pointerType === "mouse" && i.matches, e === "hover") {
				let e = t.target instanceof Element ? t.target.closest(u) : null;
				if (e === o && a) return;
				o = e, p(!0);
			}
		}, h = () => {
			a = !1, e === "hover" ? f() : p();
		}, g = () => {
			o = null, e === "hover" && f();
		}, _ = () => p(), v = new MutationObserver(() => p(!0)), y = new ResizeObserver(_), b = () => {
			y.disconnect(), y.observe(t), d().forEach((e) => y.observe(e));
		}, x = new MutationObserver(() => {
			b(), p();
		});
		return v.observe(t, {
			subtree: !0,
			attributes: !0,
			attributeFilter: [
				"data-selected",
				"aria-selected",
				"data-disabled",
				"aria-disabled"
			]
		}), x.observe(t, {
			childList: !0,
			subtree: !0
		}), b(), p(), t.addEventListener("pointerdown", m, !0), t.addEventListener("pointermove", m), t.addEventListener("pointerleave", g), t.addEventListener("keydown", h, !0), t.addEventListener("scroll", _, !0), r.addEventListener("change", _), i.addEventListener("change", _), () => {
			l?.cancel(), v.disconnect(), x.disconnect(), y.disconnect(), t.removeEventListener("pointerdown", m, !0), t.removeEventListener("pointermove", m), t.removeEventListener("pointerleave", g), t.removeEventListener("keydown", h, !0), t.removeEventListener("scroll", _, !0), r.removeEventListener("change", _), i.removeEventListener("change", _), n.remove(), delete t.dataset.surfaceHost, delete t.dataset.surfaceReady;
		};
	}, [t, e]), n;
}
Object.fromEntries(Object.entries({
	fresh: "/unseen",
	later: "/watch-later",
	flagged: "/flagged",
	ads: "/junk-files"
}).map(([e, t]) => [t, e])), typeof Intl < "u" && typeof Intl.Segmenter == "function" && new Intl.Segmenter(void 0, { granularity: "grapheme" }), { ...hm };
//#endregion
//#region src/ui-kit/scroll.ts
var ng = /* @__PURE__ */ new Map(), rg, ig = 240, ag = 50, og = 70, sg = .55, cg = .35, lg = 480;
function ug(e, t) {
	return !e || !(t > 0) ? 0 : Math.sign(e) * (1 - 1 / (Math.abs(e) * sg / t + 1)) * t;
}
function dg(e) {
	let t = null, n = 0, r = () => typeof e.animate != "function" || matchMedia("(prefers-reduced-motion:reduce)").matches, i = () => {
		t = null, n || e.classList.remove("edgepull");
	}, a = (n, r) => {
		t?.cancel(), e.classList.add("edgepull"), t = e.animate(n, { duration: r }), t.onfinish = i;
	};
	return {
		drag(i) {
			r() || (t?.cancel(), t = null, n = -ug(i, e.clientWidth), e.classList.toggle("edgepull", !!n), n ? e.style.setProperty("--edge-pull", `${n}px`) : e.style.removeProperty("--edge-pull"));
		},
		release() {
			if (!n) return;
			let t = n, r = mg();
			n = 0, e.style.removeProperty("--edge-pull"), a([{
				"--edge-pull": `${t}px`,
				easing: r.easing
			}, { "--edge-pull": "0px" }], r.duration);
		},
		kick(t) {
			if (r() || n) return;
			let i = -ug(t * cg, Math.min(e.clientWidth, lg));
			if (!i) return;
			let o = mg();
			a([
				{
					"--edge-pull": "0px",
					easing: "cubic-bezier(.2,.8,.4,1)"
				},
				{
					"--edge-pull": `${i}px`,
					offset: .3,
					easing: o.easing
				},
				{ "--edge-pull": "0px" }
			], o.duration * 1.6);
		}
	};
}
function fg(e, { drag: t = !1, fade: n = !0, wheel: r = !0, elastic: i = !0, dragIgnore: a = "" } = {}) {
	if (!e) return;
	let o = ng.get(e);
	if (o) return o.options.drag ||= t, o.options.fade ||= n, o.update(), o;
	let s = {
		drag: t,
		fade: n,
		wheel: r,
		elastic: i,
		dragIgnore: a
	}, c = new AbortController(), l = dg(e), u = null, d = 0, f = 0, p = 0, m = !1, h = 0, g = 0, _ = 0, v = 0, y = (t, n) => {
		e.dataset[t] !== n && (e.dataset[t] = n);
	}, b = "", x = () => (b ||= getComputedStyle(e).overflowX, [
		"auto",
		"scroll",
		"hidden"
	].includes(b)), S = () => {
		if (s.fade) {
			let t = x();
			y("overflowLeft", String(t && e.scrollLeft > 1)), y("overflowRight", String(t && e.scrollLeft + e.clientWidth < e.scrollWidth - 1));
		}
	}, C = 0, w = () => {
		C ||= requestAnimationFrame(() => {
			C = 0, S();
		});
	}, T = (e, t, n, r = {}) => e.addEventListener(t, n, {
		...r,
		signal: c.signal
	});
	T(e, "scroll", w, { passive: !0 });
	let E = (e) => {
		s.elastic && !m && (m = !0, l.kick(e));
	}, D = () => {
		cancelAnimationFrame(h), h = 0, v = 0;
	}, O = (t) => {
		let n = Math.min(Math.max(t - g, 0), 64);
		if (g = t, _ += (p - _) * (1 - Math.exp(-n / og)), Math.abs(p - _) < .5 && (_ = p), e.scrollLeft = _, _ !== p) h = requestAnimationFrame(O);
		else if (h = 0, v) {
			let e = v;
			v = 0, E(e);
		}
	};
	T(e, "wheel", (t) => {
		if (!s.wheel) return;
		let n = e.scrollWidth - e.clientWidth;
		if (t.defaultPrevented || !t.cancelable || Math.abs(t.deltaY) <= Math.abs(t.deltaX) || n <= 0 || !x()) return;
		t.preventDefault();
		let r = performance.now(), i = Math.abs(t.deltaY);
		r > f && (m = !1), f = r + ig;
		let a = h ? p : e.scrollLeft, o = a + t.deltaY;
		p = Math.min(n, Math.max(0, o));
		let c = o === p ? 0 : t.deltaY;
		i < ag || p === a ? (p !== a && (D(), e.scrollLeft = p), c && !h ? E(c) : c && (v = c)) : (c && (v = c), h ||= (_ = e.scrollLeft, g = performance.now(), requestAnimationFrame(O)));
	}, { passive: !1 }), T(e, "mousedown", (t) => {
		d = 0, !(!s.drag || t.button !== 0 || e.scrollWidth - e.clientWidth <= 1) && (s.dragIgnore && (t.shiftKey || t.ctrlKey || t.metaKey || t.altKey || t.target.closest?.(s.dragIgnore)) || (t.stopPropagation(), D(), u = {
			x: t.pageX,
			left: e.scrollLeft
		}, d = 0, e.style.cursor = "grabbing"));
	}), T(window, "mousemove", (t) => {
		if (!u) return;
		let n = t.pageX - u.x, r = u.left - n, i = e.scrollWidth - e.clientWidth;
		d = Math.max(d, Math.abs(n)), e.scrollLeft = r, s.elastic && l.drag(r < 0 ? r : r > i ? r - i : 0), t.preventDefault();
	});
	let k = () => {
		u && s.elastic && l.release(), u = null, e.style.cursor = "";
	};
	T(window, "mouseup", k), T(window, "blur", k), T(e, "keydown", () => {
		d = 0;
	}), T(e, "click", (e) => {
		d > 6 && (e.stopPropagation(), e.preventDefault(), d = 0);
	}, { capture: !0 });
	let A = new ResizeObserver(() => {
		b = "", S();
	}), j = () => {
		A.observe(e);
		for (let t of e.children) A.observe(t);
	}, M = new MutationObserver(() => {
		A.disconnect(), j(), w();
	});
	M.observe(e, {
		childList: !0,
		characterData: !0,
		subtree: !0
	}), j();
	let ee = {
		options: s,
		update() {
			b = "", S();
		},
		destroy() {
			c.abort(), D(), cancelAnimationFrame(C), C = 0, A.disconnect(), M.disconnect(), ng.delete(e), e.style.cursor = "", ng.size || (rg?.disconnect(), rg = null);
		}
	};
	return ng.set(e, ee), rg || (rg = new MutationObserver(() => {
		for (let [e, t] of ng) e.isConnected || t.destroy();
	}), rg.observe(document.body, {
		childList: !0,
		subtree: !0
	})), ee;
}
var pg = null;
function mg() {
	if (!pg) {
		let e = getComputedStyle(document.documentElement);
		pg = {
			easing: e.getPropertyValue("--spring-pane").trim() || "ease",
			duration: parseFloat(e.getPropertyValue("--spring-pane-ms")) || 300
		};
	}
	return pg;
}
[
	"[data-stage-side-content]",
	"[data-stage-scroll]",
	".tagpickbody",
	"[data-mix-list]",
	".playlistpicklist",
	"[data-player-stats]",
	".vjs-peach-settings-menu",
	".ui-geist-scroller-container",
	".metricstrip",
	".ui-tastesummaries",
	".ui-skeletondashstrip",
	".followpagination",
	".reviewtabs",
	".ftablewrap",
	".ui-board-local-nav",
	"[data-manage-menu]",
	".follow-workspace-switch",
	".fmanagenav",
	"[role=\"listbox\"]"
].join(",");
//#endregion
//#region src/react/components/use-horizontal-scroller.ts
function hg(e, t = !0) {
	let [n, r] = (0, w.useState)(null), i = (0, w.useCallback)((t) => {
		r(t), typeof e == "function" ? e(t) : e && (e.current = t);
	}, [e]);
	return (0, w.useLayoutEffect)(() => {
		if (!n || !t) return;
		n.dataset.horizontalScroll = "";
		let e = fg(n);
		return () => {
			e.destroy(), delete n.dataset.horizontalScroll, delete n.dataset.overflowLeft, delete n.dataset.overflowRight;
		};
	}, [n, t]), i;
}
//#endregion
//#region src/react/components/segmented.tsx
function gg(e) {
	let t = hg(tg("selection"));
	return /* @__PURE__ */ (0, z.jsx)(ap, {
		...e,
		ref: t
	});
}
var _g = "inline-flex w-max max-w-full items-center gap-0.5 overflow-x-auto overscroll-x-contain rounded-2lg bg-background-tertiary-default p-1", vg = "flex min-h-7 flex-none cursor-pointer items-center gap-1.5 rounded-md px-2.5 py-1 max-sm:px-2 text-body-medium whitespace-nowrap text-text-secondary outline-none transition-colors hover:text-text-primary focus-visible:ring-2 focus-visible:ring-border-focus-ring data-focus-visible:ring-2 data-focus-visible:ring-border-focus-ring data-selected:bg-background-primary-default data-selected:text-text-primary data-selected:shadow-card dark:data-selected:bg-background-primary-hover";
//#endregion
//#region src/react/settings/busy-props.ts
function yg(e) {
	return e ? {
		"aria-busy": !0,
		"aria-disabled": !0
	} : {};
}
//#endregion
//#region src/react/settings/folder-rows.tsx
function bg({ className: e }) {
	return /* @__PURE__ */ (0, z.jsx)("svg", {
		"aria-hidden": !0,
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: 2,
		strokeLinecap: "round",
		strokeLinejoin: "round",
		className: e,
		children: /* @__PURE__ */ (0, z.jsx)("use", { href: "#i-folder-search" })
	});
}
var xg = pm, Sg = (e) => _m[e] || "database", Cg = (e) => mm.includes(e);
function wg({ label: e, className: t, children: n }) {
	return /* @__PURE__ */ (0, z.jsxs)("div", {
		className: R("flex min-w-0 flex-col gap-1", t),
		children: [/* @__PURE__ */ (0, z.jsx)(Bp, {
			elementType: "span",
			"aria-hidden": !0,
			children: e
		}), n]
	});
}
function Tg({ children: e }) {
	return /* @__PURE__ */ (0, z.jsx)("div", {
		className: "flex w-full flex-wrap items-start gap-2",
		children: e
	});
}
function Eg({ index: e, cost: t, error: n, onChange: r }) {
	return /* @__PURE__ */ (0, z.jsxs)("div", {
		"data-media-read-policy": e,
		className: "flex w-full flex-col gap-1 @lg:w-32",
		children: [
			/* @__PURE__ */ (0, z.jsx)(Bp, {
				elementType: "span",
				"aria-hidden": !0,
				children: "读取策略"
			}),
			/* @__PURE__ */ (0, z.jsxs)(Gm, {
				"aria-label": `媒体读取策略 ${e + 1}`,
				placeholder: "选择读取策略",
				isRequired: !0,
				validationBehavior: "aria",
				isInvalid: !!n,
				selectedKey: t || null,
				onSelectionChange: (e) => {
					(e === "free" || e === "metered") && r(e);
				},
				children: [/* @__PURE__ */ (0, z.jsx)(Km, {
					id: "free",
					children: "正常读取"
				}), /* @__PURE__ */ (0, z.jsx)(Km, {
					id: "metered",
					children: "代理保护"
				})]
			}),
			n ? /* @__PURE__ */ (0, z.jsx)(wm, { children: n }) : null
		]
	});
}
function Dg() {
	return /* @__PURE__ */ (0, z.jsx)(Cm, { children: "读取策略选「代理保护」时，会限制自动读取视频。" });
}
function Og({ initial: e, blank: t, pickFolder: n, describe: r, focusAfterPick: i = !1 }) {
	let [a, o] = (0, w.useState)(e), [s, c] = (0, w.useState)([]), [l, u] = (0, w.useState)(null), [d, f] = (0, w.useState)(null), p = (0, w.useRef)(!1), m = (0, w.useRef)([]);
	(0, w.useLayoutEffect)(() => {
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
function kg({ label: e, path: t, onPath: n, error: r, inputRef: i, picking: a, onPick: o, onRemove: s, status: c, children: l }) {
	let u = (0, w.useRef)(null), d = () => {
		let e = u.current;
		e && e.ownerDocument.activeElement !== e && (e.scrollLeft = e.scrollWidth);
	};
	return (0, w.useLayoutEffect)(() => {
		u.current && (u.current.title = t), d();
	}, [t]), /* @__PURE__ */ (0, z.jsxs)("div", {
		"data-folder-row": !0,
		className: "@container flex flex-col gap-2 rounded-2lg border border-separator-border bg-background-primary-default p-3",
		children: [/* @__PURE__ */ (0, z.jsxs)("div", {
			className: "flex items-start gap-2",
			children: [
				/* @__PURE__ */ (0, z.jsx)(Kp, {
					className: "min-w-0 flex-1",
					"aria-label": e,
					placeholder: "媒体目录路径",
					value: t,
					onChange: n,
					ref: (e) => {
						u.current = e, i(e);
					},
					onBlur: () => requestAnimationFrame(d),
					validationBehavior: "aria",
					isInvalid: !!r,
					hint: r || void 0
				}),
				c ? /* @__PURE__ */ (0, z.jsx)("div", {
					className: "flex h-9 shrink-0 items-center",
					children: c
				}) : null,
				/* @__PURE__ */ (0, z.jsx)(Nm, {
					icon: bg,
					"aria-label": "选择文件夹",
					onClick: o,
					...yg(a)
				}),
				s ? /* @__PURE__ */ (0, z.jsx)(Dt, {
					variant: "danger",
					iconOnly: !0,
					leadingIcon: Lp,
					"aria-label": "移除这个文件夹",
					onClick: s
				}) : null
			]
		}), /* @__PURE__ */ (0, z.jsx)("div", {
			className: "flex flex-wrap items-end gap-2",
			children: l
		})]
	});
}
function Ag({ index: e, value: t, onChange: n, options: r = xg }) {
	return /* @__PURE__ */ (0, z.jsx)(wg, {
		label: "来源",
		className: "w-full @lg:w-60",
		children: /* @__PURE__ */ (0, z.jsx)(Gm, {
			className: "w-full",
			"aria-label": `媒体来源 ${e + 1}`,
			selectedKey: t,
			onSelectionChange: (e) => {
				e !== null && n(String(e));
			},
			children: r.map(([e, t]) => /* @__PURE__ */ (0, z.jsxs)(Km, {
				id: e,
				textValue: t,
				children: [/* @__PURE__ */ (0, z.jsx)(Am, { mark: Sg(e) }), t]
			}, e))
		})
	});
}
//#endregion
//#region src/react/settings/library-icon-picker.tsx
function jg(e) {
	let t = e === "local" ? "" : _m[e];
	return t ? [t, "自动识别"] : ["hard-drive", "默认"];
}
//#endregion
//#region src/react/settings/password-pair.tsx
function Mg({ label: e, password: t, confirmation: n, onPassword: r, onConfirmation: i, disabled: a = !1, passwordError: o, passwordHint: s, confirmationError: c, confirmationInvalid: l = !1 }) {
	return /* @__PURE__ */ (0, z.jsxs)(z.Fragment, { children: [/* @__PURE__ */ (0, z.jsx)(Kp, {
		id: "access-password",
		type: "password",
		label: e,
		autoComplete: "new-password",
		maxLength: 256,
		value: t,
		onChange: r,
		isDisabled: a,
		isRequired: !a,
		validationBehavior: "aria",
		isInvalid: !a && !!o,
		hint: a ? s : o || s
	}), /* @__PURE__ */ (0, z.jsx)(Kp, {
		id: "access-confirm",
		type: "password",
		label: "确认访问密码",
		autoComplete: "new-password",
		maxLength: 256,
		value: n,
		onChange: i,
		isDisabled: a,
		isRequired: !a,
		validationBehavior: "aria",
		isInvalid: !a && (!!c || l),
		hint: a ? void 0 : c
	})] });
}
//#endregion
//#region src/react/boardui/components/base/badges/chip.tsx
var Ng = wt({
	base: "inline-flex items-center justify-center rounded-md px-1.5 whitespace-nowrap transition-[padding,font-size] duration-200 ease",
	variant: {
		bold: "py-0.5 text-body-medium",
		subtle: "py-1 text-body-medium",
		caption: "py-1 text-caption-1-medium"
	},
	color: {
		lime: "bg-status-lime-background text-status-lime-text",
		rose: "bg-status-rose-background text-status-rose-text",
		yellow: "bg-status-yellow-background text-status-yellow-text",
		cyan: "bg-status-cyan-background text-status-cyan-text",
		blue: "bg-status-blue-background text-status-blue-text",
		purple: "bg-status-purple-background text-status-purple-text",
		neutral: "bg-background-tertiary-default text-text-secondary",
		gray: "bg-background-secondary-default text-text-primary",
		soft: "bg-background-secondary-default text-text-secondary"
	}
});
function Pg({ variant: e = "bold", color: t = "neutral", className: n, ref: r, ...i }) {
	return /* @__PURE__ */ (0, z.jsx)("span", {
		ref: r,
		className: R(Ng.base, Ng.variant[e], Ng.color[t], n),
		...i
	});
}
//#endregion
//#region src/react/components/status-label.tsx
var Fg = {
	success: "lime",
	progress: "blue",
	warning: "yellow",
	error: "rose",
	neutral: "neutral"
};
function Ig({ tone: e = "neutral", ...t }) {
	return /* @__PURE__ */ (0, z.jsx)(Pg, {
		"data-status-tone": e,
		variant: "caption",
		color: Fg[e],
		...t
	});
}
//#endregion
//#region src/react/settings/remote-reporting-settings.tsx
function Lg({ value: e, onChange: t, busy: n = !1 }) {
	return /* @__PURE__ */ (0, z.jsxs)(z.Fragment, { children: [/* @__PURE__ */ (0, z.jsx)(xm, { children: /* @__PURE__ */ (0, z.jsx)(vm, {
		label: "发送版本统计与错误诊断（推荐）",
		description: "上传版本、系统信息、故障类型、代码位置与发生次数。",
		children: /* @__PURE__ */ (0, z.jsx)(Im, {
			"aria-label": "发送版本统计与错误诊断（推荐）",
			isSelected: e.usage && e.errors,
			onChange: (n) => t({
				...e,
				usage: n,
				errors: n
			}),
			...yg(n)
		})
	}) }), e.available ? null : /* @__PURE__ */ (0, z.jsx)(Sm, {
		divided: !0,
		children: /* @__PURE__ */ (0, z.jsx)("span", {
			className: "self-start",
			children: /* @__PURE__ */ (0, z.jsx)(Ig, { children: "上传服务未配置" })
		})
	})] });
}
//#endregion
//#region src/react/pages/setup/setup-form.tsx
var Rg = [
	"host",
	"port",
	"mdns_name"
];
function zg(e, t) {
	return Array.isArray(e) ? e.length === t ? {
		rows: e,
		table: ""
	} : {
		rows: [],
		table: e.filter(Boolean).join(" ")
	} : {
		rows: [],
		table: e ?? ""
	};
}
function Bg(e) {
	return e.length ? e.length === 1 ? `完成设置后扫描并补全资料：${e[0]}` : `完成设置后扫描这 ${e.length} 个文件夹并补全资料` : "完成设置后扫描并补全资料";
}
var Vg = (e) => Array.isArray(e) ? e.filter(Boolean).join(" ") : e ?? "";
function Hg({ setup: e, onDone: t }) {
	let n = e.questions.find((e) => e.input === "folders"), r = e.questions.find((e) => e.input === "folder"), i = e.questions.filter((e) => e.input !== "folders"), a = i.filter((e) => e.input !== "folder"), o = e.media_sources.map(({ value: e, label: t }) => [e, t]), s = (t = "") => ({
		path: t,
		location: e.media_source_default,
		root: "",
		library_id: qm(),
		library: "",
		cost: e.media_source_default === "local" ? "free" : ""
	}), c = Og({
		initial: () => [s(n?.default ?? "")],
		blank: () => s(),
		pickFolder: rm,
		describe: im,
		focusAfterPick: !0
	}), [l, u] = (0, w.useState)(() => Object.fromEntries(i.map((e) => [e.key, e.default]))), [d, f] = (0, w.useState)(!1), [p, m] = (0, w.useState)(""), [h, g] = (0, w.useState)(e.access_enabled), [_, v] = (0, w.useState)(""), [y, b] = (0, w.useState)(""), [x, S] = (0, w.useState)(e.scan_now), [C, T] = (0, w.useState)(e.history_guide), [E, D] = (0, w.useState)(e.remote_reporting), [O, k] = (0, w.useState)({}), [A, j] = (0, w.useState)(""), [M, ee] = (0, w.useState)(""), [te, ne] = (0, w.useState)(!1), [N, re] = (0, w.useState)(!1), [ie, ae] = (0, w.useState)(0), oe = (0, w.useRef)(null), se = (0, w.useRef)(null), [ce, le] = (0, w.useState)(0);
	(0, w.useEffect)(() => {
		ce && oe.current?.querySelector("input[aria-invalid=\"true\"]")?.focus();
	}, [ce]);
	let ue = (e) => e ? /* @__PURE__ */ (0, z.jsx)("span", {
		role: "alert",
		children: e
	}, ce) : void 0, de = (e) => !e.visible_when || Object.entries(e.visible_when).every(([e, t]) => l[e] === t), fe = (e, t) => u((n) => ({
		...n,
		[e]: t
	})), pe = async (e) => {
		if (e.preventDefault(), te) return;
		let n = c.rows.findIndex((e) => !e.cost);
		if (n >= 0) {
			re(!0), requestAnimationFrame(() => oe.current?.querySelector(`[data-media-read-policy="${n}"] button`)?.focus());
			return;
		}
		ne(!0), ee("");
		let r = {
			media_dir: c.rows,
			access_enabled: h,
			scan_now: x,
			history_guide: C,
			...E ? { remote_reporting: {
				usage: E.usage,
				errors: E.errors
			} } : {}
		};
		for (let e of i) de(e) && (r[e.key] = l[e.key] ?? "");
		h && Object.assign(r, {
			access_password: _,
			access_confirm: y
		});
		try {
			t(await tm(r));
		} catch (e) {
			if (e instanceof Qp && e.status === 400 && e.errors) {
				let t = e.errors, { rows: n, table: r } = zg(t.media_dir, c.rows.length);
				c.setErrors(n), j(r), k(t), Rg.some((e) => t[e]) && ae((e) => e + 1), t.access_password && g(!0), le((e) => e + 1);
			} else ee(im(e));
		} finally {
			ne(!1);
		}
	}, me = (e) => {
		let t = Vg(O[e.key]), n = e.help.join("");
		if (e.input === "choice") {
			let r = `setup-${e.key}-label`;
			return /* @__PURE__ */ (0, z.jsxs)("div", {
				className: "flex flex-col gap-1.5",
				children: [
					/* @__PURE__ */ (0, z.jsx)(Bp, {
						id: r,
						elementType: "span",
						children: e.label
					}),
					/* @__PURE__ */ (0, z.jsx)(gg, {
						"aria-labelledby": r,
						orientation: "horizontal",
						className: _g,
						value: l[e.key] ?? e.default,
						onChange: (t) => fe(e.key, t),
						children: (e.options ?? []).map((e) => /* @__PURE__ */ (0, z.jsx)(op, {
							value: e.value,
							className: vg,
							children: e.label
						}, e.value))
					}),
					n ? /* @__PURE__ */ (0, z.jsx)(Cm, { children: n }) : null,
					t ? /* @__PURE__ */ (0, z.jsx)(wm, { children: t }, ce) : null
				]
			}, e.key);
		}
		return /* @__PURE__ */ (0, z.jsx)(Kp, {
			id: `f-${e.key}`,
			label: e.label,
			isRequired: e.required,
			inputMode: e.input === "number" ? "numeric" : void 0,
			autoComplete: "off",
			spellCheck: "false",
			value: l[e.key] ?? "",
			onChange: (t) => fe(e.key, t),
			leadingAddon: e.prefix ? /* @__PURE__ */ (0, z.jsx)("span", {
				className: "shrink-0 pl-1 text-body-regular text-text-secondary",
				children: e.prefix
			}) : void 0,
			trailingIcon: e.suffix ? () => /* @__PURE__ */ (0, z.jsx)("span", {
				className: "shrink-0 pr-1 text-body-regular text-text-secondary",
				children: e.suffix
			}) : void 0,
			validationBehavior: "aria",
			isInvalid: !!t,
			hint: ue(t) ?? (n || void 0)
		}, e.key);
	}, he = async () => {
		if (r && !d) {
			f(!0), m("");
			try {
				let e = await rm(l[r.key] ?? "");
				e && fe(r.key, e);
			} catch (e) {
				m(im(e));
			} finally {
				f(!1);
			}
		}
	}, ge = r ? Vg(O[r.key]) || p : "", P = c.rows.map((e) => e.path.trim()).filter(Boolean), _e = c.rows.some((e) => Cg(e.location));
	return /* @__PURE__ */ (0, z.jsxs)("form", {
		ref: oe,
		noValidate: !0,
		onSubmit: (e) => void pe(e),
		"aria-labelledby": "auth-card-title",
		className: "flex flex-col gap-6",
		children: [
			n ? /* @__PURE__ */ (0, z.jsxs)(At, {
				first: !0,
				labelledBy: "setup-media-title",
				children: [
					/* @__PURE__ */ (0, z.jsxs)(jt, {
						id: "setup-media-title",
						children: [n.label, /* @__PURE__ */ (0, z.jsx)("span", {
							"aria-hidden": !0,
							className: "ml-0.5 text-text-error-primary",
							children: "*"
						})]
					}),
					A ? /* @__PURE__ */ (0, z.jsx)(wm, { children: A }, ce) : null,
					/* @__PURE__ */ (0, z.jsx)("div", {
						role: "group",
						"aria-labelledby": "setup-media-title",
						className: "flex flex-col gap-3",
						children: c.rows.map((e, t) => /* @__PURE__ */ (0, z.jsxs)(kg, {
							label: `${n.label} ${t + 1}`,
							path: e.path,
							onPath: (e) => c.edit(t, { path: e }),
							error: ue(c.errors[t]),
							inputRef: c.inputRef(t),
							picking: c.picking === t,
							onPick: () => void c.pick(t),
							onRemove: c.rows.length > 1 ? () => {
								c.remove(t), se.current?.focus();
							} : void 0,
							children: [/* @__PURE__ */ (0, z.jsxs)(Tg, { children: [/* @__PURE__ */ (0, z.jsx)(Ag, {
								index: t,
								value: e.location,
								options: o,
								onChange: (e) => c.edit(t, {
									location: e,
									cost: e === "local" ? "free" : ""
								})
							}), /* @__PURE__ */ (0, z.jsx)(Eg, {
								index: t,
								cost: e.cost ?? "",
								error: N && !e.cost ? "请选择媒体读取策略" : void 0,
								onChange: (e) => c.edit(t, { cost: e })
							})] }), /* @__PURE__ */ (0, z.jsxs)(Tg, { children: [/* @__PURE__ */ (0, z.jsx)(wg, {
								label: "所属媒体库",
								className: "w-full @lg:w-60",
								children: /* @__PURE__ */ (0, z.jsxs)(Gm, {
									className: "w-full",
									"aria-label": `目录所属媒体库 ${t + 1}`,
									selectedKey: e.library_id,
									renderValue: /* @__PURE__ */ (0, z.jsxs)("span", {
										className: "flex min-w-0 items-center gap-2",
										children: [/* @__PURE__ */ (0, z.jsx)(Am, { mark: jg(e.location)[0] }), /* @__PURE__ */ (0, z.jsx)("span", {
											className: "truncate",
											children: e.library || "未命名媒体库"
										})]
									}),
									onSelectionChange: (e) => {
										let n = c.rows.find((t) => t.library_id === e);
										c.edit(t, {
											library_id: n?.library_id || qm(),
											library: n?.library || ""
										});
									},
									children: [[...new Map(c.rows.map((e) => [e.library_id, e])).values()].map((e) => /* @__PURE__ */ (0, z.jsx)(Km, {
										id: e.library_id,
										children: e.library || "未命名媒体库"
									}, e.library_id)), /* @__PURE__ */ (0, z.jsx)(Km, {
										id: "new",
										children: "新建媒体库"
									})]
								})
							}), /* @__PURE__ */ (0, z.jsx)(wg, {
								label: "媒体库名称",
								className: "w-full min-w-32 @lg:w-auto @lg:flex-1",
								children: /* @__PURE__ */ (0, z.jsx)(Kp, {
									className: "w-full",
									"aria-label": `媒体库名称 ${t + 1}`,
									placeholder: "媒体库名称",
									maxLength: 80,
									value: e.library || "",
									onChange: (t) => c.rows.forEach((n, r) => {
										n.library_id === e.library_id && c.edit(r, { library: t });
									})
								})
							})] })]
						}, t))
					}),
					/* @__PURE__ */ (0, z.jsx)(Dt, {
						ref: se,
						variant: "secondary",
						leadingIcon: Fp,
						className: "self-start",
						onClick: c.add,
						children: "添加文件夹"
					}),
					_e ? /* @__PURE__ */ (0, z.jsxs)(z.Fragment, { children: [
						/* @__PURE__ */ (0, z.jsx)(Dg, {}),
						/* @__PURE__ */ (0, z.jsxs)(Cm, { children: [e.cloud.help, /* @__PURE__ */ (0, z.jsx)(Tm, {
							href: e.cloud.link.url,
							children: e.cloud.link.label
						})] }),
						e.cloud.dependencies.map((e) => /* @__PURE__ */ (0, z.jsxs)(Cm, { children: [e.message, /* @__PURE__ */ (0, z.jsx)(Tm, {
							href: e.download_url,
							children: e.download_label
						})] }, e.name))
					] }) : null,
					n.help.map((e) => /* @__PURE__ */ (0, z.jsx)(Cm, { children: e }, e))
				]
			}) : null,
			r ? /* @__PURE__ */ (0, z.jsxs)(At, {
				labelledBy: "setup-data-title",
				children: [
					/* @__PURE__ */ (0, z.jsxs)(jt, {
						id: "setup-data-title",
						children: [r.label, /* @__PURE__ */ (0, z.jsx)("span", {
							"aria-hidden": !0,
							className: "ml-0.5 text-text-error-primary",
							children: "*"
						})]
					}),
					/* @__PURE__ */ (0, z.jsxs)("div", {
						className: "flex items-start gap-2",
						children: [/* @__PURE__ */ (0, z.jsx)(Kp, {
							className: "min-w-0 flex-1",
							id: `f-${r.key}`,
							"aria-label": r.label,
							isRequired: !0,
							autoComplete: "off",
							spellCheck: "false",
							value: l[r.key] ?? "",
							onChange: (e) => fe(r.key, e),
							validationBehavior: "aria",
							isInvalid: !!ge,
							hint: ue(ge)
						}), /* @__PURE__ */ (0, z.jsx)(Nm, {
							icon: bg,
							"aria-label": "选择数据目录",
							onClick: () => void he(),
							...yg(d)
						})]
					}),
					r.help.map((e) => /* @__PURE__ */ (0, z.jsx)(Cm, { children: e }, e))
				]
			}) : null,
			/* @__PURE__ */ (0, z.jsxs)(At, {
				labelledBy: "setup-access-title",
				children: [
					/* @__PURE__ */ (0, z.jsxs)("div", {
						className: "flex items-start justify-between gap-4",
						children: [/* @__PURE__ */ (0, z.jsxs)("div", {
							className: "flex min-w-0 flex-col gap-0.5",
							children: [/* @__PURE__ */ (0, z.jsx)(jt, {
								id: "setup-access-title",
								children: "访问密码"
							}), /* @__PURE__ */ (0, z.jsx)("p", {
								id: "setup-access-description",
								className: "text-body-2-regular text-text-secondary",
								children: "开启后，访问 Peach 需要先登录。"
							})]
						}), /* @__PURE__ */ (0, z.jsx)(Im, {
							"aria-labelledby": "setup-access-title",
							"aria-describedby": "setup-access-description",
							isSelected: h,
							onChange: g
						})]
					}),
					/* @__PURE__ */ (0, z.jsx)(Cm, { children: "未设置密码时，能连接到 Peach 的设备可直接进入。" }),
					h ? /* @__PURE__ */ (0, z.jsx)(Mg, {
						label: "访问密码",
						password: _,
						confirmation: y,
						onPassword: v,
						onConfirmation: b,
						passwordError: ue(Vg(O.access_password)),
						passwordHint: "请输入 8–256 个字符。",
						confirmationInvalid: !!O.access_password
					}) : null
				]
			}),
			/* @__PURE__ */ (0, z.jsx)(At, { children: /* @__PURE__ */ (0, z.jsx)(Om, {
				summary: "高级设置",
				defaultOpen: ie > 0,
				children: /* @__PURE__ */ (0, z.jsx)("div", {
					className: "flex flex-col gap-4",
					children: a.filter(de).map(me)
				})
			}, ie) }),
			/* @__PURE__ */ (0, z.jsxs)(At, {
				labelledBy: "setup-options-title",
				children: [
					/* @__PURE__ */ (0, z.jsx)(jt, {
						id: "setup-options-title",
						children: "完成设置后"
					}),
					/* @__PURE__ */ (0, z.jsxs)("div", {
						className: "flex flex-col gap-1.5",
						children: [/* @__PURE__ */ (0, z.jsx)(Pp, {
							isSelected: x,
							onChange: S,
							children: Bg(P)
						}), /* @__PURE__ */ (0, z.jsx)(Cm, { children: "读取已有 NFO 和封面，采集缺失资料。符合自动规则的资料会在处理完成后保存到数据库，其余资料留待确认。" })]
					}),
					/* @__PURE__ */ (0, z.jsxs)("section", {
						"aria-labelledby": "setup-history-title",
						className: "flex flex-col gap-1.5 border-t border-separator-border pt-4",
						children: [
							/* @__PURE__ */ (0, z.jsxs)("h3", {
								id: "setup-history-title",
								className: "flex items-center gap-2 text-body-medium text-text-primary",
								children: ["浏览器历史记录", /* @__PURE__ */ (0, z.jsx)("span", {
									className: "text-body-2-regular text-text-tertiary",
									children: "可选"
								})]
							}),
							/* @__PURE__ */ (0, z.jsx)(Pp, {
								isSelected: C,
								onChange: T,
								children: "接下来导入浏览器历史记录"
							}),
							/* @__PURE__ */ (0, z.jsx)(Cm, { children: "用于生成口味分析。完成设置后选择读取这台电脑，或导入其他设备的记录；也可稍后从「口味」进入。" })
						]
					})
				]
			}),
			M ? /* @__PURE__ */ (0, z.jsx)(wm, { children: M }) : null,
			E ? /* @__PURE__ */ (0, z.jsxs)(At, { children: [
				/* @__PURE__ */ (0, z.jsx)(jt, { children: "版本统计与错误诊断" }),
				/* @__PURE__ */ (0, z.jsx)(Lg, {
					value: E,
					onChange: D
				}),
				/* @__PURE__ */ (0, z.jsx)(Cm, { children: "馆藏与口味明细上传默认关闭，可在「应用与维护」查看并选择。" })
			] }) : null,
			/* @__PURE__ */ (0, z.jsx)(Dt, {
				type: "submit",
				className: "self-start",
				...yg(te),
				children: "完成设置"
			})
		]
	});
}
//#endregion
//#region src/react/pages/setup/setup-restore.tsx
function Ug({ onDone: e }) {
	let [t, n] = (0, w.useState)(""), [r, i] = (0, w.useState)(""), [a, o] = (0, w.useState)(!1);
	return /* @__PURE__ */ (0, z.jsxs)("form", {
		className: "flex flex-col gap-4",
		onSubmit: async (n) => {
			if (n.preventDefault(), !a) {
				o(!0), i("");
				try {
					e(await nm(t));
				} catch (e) {
					let t = e instanceof Qp ? e.errors?.data_root : void 0;
					i(typeof t == "string" ? t : im(e));
				} finally {
					o(!1);
				}
			}
		},
		noValidate: !0,
		children: [/* @__PURE__ */ (0, z.jsx)(Kp, {
			label: "已有数据目录",
			value: t,
			onChange: n,
			isRequired: !0,
			autoComplete: "off",
			spellCheck: "false",
			validationBehavior: "aria",
			isInvalid: !!r,
			hint: r ? /* @__PURE__ */ (0, z.jsx)("span", {
				role: "alert",
				children: r
			}) : "选择包含 config.toml 和 database 文件夹的数据目录。"
		}), /* @__PURE__ */ (0, z.jsx)(Dt, {
			type: "submit",
			className: "self-start",
			...yg(a),
			children: a ? "正在连接数据目录…" : "使用此目录"
		})]
	});
}
//#endregion
//#region src/react/pages/setup/setup-page.tsx
function Wg() {
	let [e, t] = (0, w.useState)({ kind: "loading" }), [n, r] = (0, w.useState)(0), [i, a] = (0, w.useState)(!1);
	return (0, w.useEffect)(() => {
		let e = new AbortController();
		return em(e.signal).then((e) => t({
			kind: "form",
			setup: e
		}), (n) => {
			e.signal.aborted || t(n instanceof Qp && n.status === 403 ? { kind: "denied" } : {
				kind: "failed",
				message: im(n)
			});
		}), () => e.abort();
	}, [n]), e.kind === "done" ? /* @__PURE__ */ (0, z.jsx)(jm, { done: e.done }) : /* @__PURE__ */ (0, z.jsxs)(kt, {
		title: "欢迎使用 Peach",
		lede: "添加媒体库，开始整理馆藏。",
		busy: e.kind === "loading",
		children: [
			e.kind === "denied" ? /* @__PURE__ */ (0, z.jsx)(Jp, {
				tone: "error",
				children: "请在运行 Peach 的这台电脑上打开设置。"
			}) : null,
			e.kind === "failed" ? /* @__PURE__ */ (0, z.jsx)(Jp, {
				tone: "error",
				action: /* @__PURE__ */ (0, z.jsx)(Dt, {
					variant: "secondary",
					onClick: () => {
						t({ kind: "loading" }), r((e) => e + 1);
					},
					children: "立即重试"
				}),
				children: e.message
			}) : null,
			e.kind === "form" ? /* @__PURE__ */ (0, z.jsxs)(z.Fragment, { children: [/* @__PURE__ */ (0, z.jsx)(Dt, {
				variant: "secondary",
				className: "self-start",
				onClick: () => a((e) => !e),
				children: i ? "返回首次设置" : "使用已有数据目录"
			}), i ? /* @__PURE__ */ (0, z.jsx)(Ug, { onDone: (e) => t({
				kind: "done",
				done: e
			}) }) : /* @__PURE__ */ (0, z.jsx)(Hg, {
				setup: e.setup,
				onDone: (e) => t({
					kind: "done",
					done: e
				})
			})] }) : null
		]
	});
}
//#endregion
//#region src/react/pages/index.tsx
var Gg = {
	setup: Wg,
	login: qp,
	error: Pt
};
h();
var Kg = document.getElementById("peach-page"), qg = Kg ? Gg[Kg.dataset.page ?? ""] : void 0;
Kg && qg && (0, T.createRoot)(Kg).render(/* @__PURE__ */ (0, z.jsx)(qg, { data: { ...Kg.dataset } }));
//#endregion

//# debugId=de232f22-b24d-4a9b-b806-8ce425cecdb7