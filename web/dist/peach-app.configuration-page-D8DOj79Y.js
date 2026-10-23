(function() {
	try {
		var e = typeof window < "u" ? window : typeof global < "u" ? global : typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : {}, t = new e.Error().stack;
		t && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[t] = "f6e2087e-7d61-4ffe-b8ff-08e1af977d0d", e._sentryDebugIdIdentifier = "sentry-dbid-f6e2087e-7d61-4ffe-b8ff-08e1af977d0d");
	} catch {}
})();
import { $s as e, Aa as t, Ac as n, Ba as r, Ca as i, Da as a, Ea as o, Fo as s, Ga as c, Gl as l, Gs as u, Gt as d, Ha as f, Hl as p, Hs as m, Il as h, Ja as g, Ka as _, Ks as v, Kt as y, Li as b, Ma as x, Na as S, Nc as C, Oa as w, Pa as T, Ps as E, Q as D, Qs as O, Sa as k, Sc as A, Sl as ee, Ta as j, Tc as M, Ul as N, Us as P, Va as F, Wa as I, Wl as L, Ws as te, Xa as ne, Xo as re, Yc as ie, Z as R, Zl as ae, _a as z, _r as oe, _t as se, aa as ce, ar as le, at as ue, au as B, ba as de, bo as fe, br as pe, cr as me, cs as he, ct as ge, cu as _e, do as ve, dr as ye, ds as be, dt as xe, el as Se, eo as Ce, eu as we, fa as Te, fo as Ee, fr as De, fs as V, ft as Oe, ga as H, gr as ke, gt as Ae, hn as je, hr as Me, ir as Ne, iu as Pe, ja as U, ka as W, lo as G, lr as Fe, ls as Ie, lt as Le, ma as Re, mo as ze, mr as Be, nc as Ve, oa as He, oo as Ue, or as We, os as Ge, ot as Ke, pa as qe, peachHistory as Je, po as Ye, pr as Xe, ps as Ze, pt as Qe, pu as $e, ro as K, rr as et, ru as tt, so as q, sr as nt, ss as rt, st as it, t as at, tc as ot, ur as st, us as ct, ut as lt, uu as ut, va as dt, vr as ft, wa as J, xa as Y, xr as pt, ya as X, yr as mt, za as ht } from "./peach-app.js";
import { t as gt } from "./peach-app.code-block-De9b0xOF.js";
import { a as _t, c as vt, d as yt, l as bt, n as xt, o as St, r as Ct, s as wt, t as Tt, u as Et } from "./peach-app.folder-rows-C8zyfdZi.js";
import { t as Dt } from "./peach-app.connection-status-Pa6aDai7.js";
import { r as Ot } from "./peach-app.source-view-DaRl5mr9.js";
//#region src/react/settings/configuration-panel.ts
var Z = /* @__PURE__ */ $e(ut(), 1), kt = "flex flex-col gap-6";
function Q(e) {
	return e ? {
		className: e.active ? `${kt} ui-board-group-active` : kt,
		"data-board-group": String(e.index),
		id: e.id,
		role: "tabpanel",
		"aria-labelledby": e.labelledBy
	} : { className: kt };
}
//#endregion
//#region src/react/settings/userscript-probe.ts
function At() {
	let e = (0, Z.useRef)(null), [t, n] = (0, Z.useState)(0), [r, i] = (0, Z.useState)("checking");
	return (0, Z.useEffect)(() => {
		let t = u(), n = !1, r = () => e.current?.contentWindow?.postMessage({
			type: "peach-userscript:probe",
			nonce: t
		}, window.location.origin), a = (r) => {
			!n && r.source === e.current?.contentWindow && r.origin === window.location.origin && r.data?.type === "peach-userscript:ready" && r.data.nonce === t && r.data.protocol === 1 && typeof r.data.version == "string" && /^\d{1,5}\.\d{1,5}\.\d{1,5}$/.test(r.data.version) && typeof r.data.paired == "boolean" && (n = !0, clearInterval(o), clearTimeout(s), i({
				version: r.data.version,
				paired: r.data.paired
			}));
		};
		window.addEventListener("message", a);
		let o = setInterval(r, 250), s = setTimeout(() => {
			n = !0, clearInterval(o), i("missing");
		}, 3e3);
		return r(), () => {
			clearInterval(o), clearTimeout(s), window.removeEventListener("message", a);
		};
	}, [t]), {
		frame: e,
		attempt: t,
		status: r,
		retry: () => {
			r !== "checking" && (i("checking"), n((e) => e + 1));
		}
	};
}
//#endregion
//#region src/react/settings/userscript-status.tsx
var $ = _e();
function jt(e, t) {
	let n = e.split(".").map(Number), r = t.split(".").map(Number);
	for (let e = 0; e < 3; e++) if (n[e] !== r[e]) return n[e] > r[e];
	return !0;
}
function Mt({ enabled: e, release: t }) {
	let { frame: n, attempt: r, status: a, retry: o } = At(), s = typeof a == "object", c = s && !jt(a.version, t.minimum_version), l = a === "checking" ? "progress" : a === "missing" ? "neutral" : c || !a.paired ? "warning" : "success", u = a === "checking" ? "检测中" : a === "missing" ? "未检测到" : c ? "需更新" : a.paired ? "已连接" : "待配对";
	return /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [/* @__PURE__ */ (0, $.jsx)("iframe", {
		ref: n,
		title: "Peach 用户脚本检测",
		hidden: !0,
		src: "/integrations/peach-userscript-bridge"
	}, r), /* @__PURE__ */ (0, $.jsxs)("div", {
		"aria-live": "polite",
		"data-userscript-status": "",
		className: F({
			variant: "raised",
			bordered: "line",
			className: "flex flex-col gap-3"
		}),
		children: [
			/* @__PURE__ */ (0, $.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, $.jsx)("span", {
					className: "text-body-medium text-text-primary",
					children: "Peach 用户脚本"
				}), /* @__PURE__ */ (0, $.jsx)(Dt, {
					tone: l,
					children: u
				})]
			}),
			s ? /* @__PURE__ */ (0, $.jsxs)("p", {
				className: "text-body-regular text-text-secondary",
				children: ["用户脚本 v", a.version]
			}) : null,
			/* @__PURE__ */ (0, $.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, $.jsx)("span", {
					className: "text-body-regular text-text-secondary",
					children: "浏览器添加"
				}), /* @__PURE__ */ (0, $.jsx)(y, {
					tone: e ? "success" : "neutral",
					children: e ? "已启用" : "未启用"
				})]
			}),
			/* @__PURE__ */ (0, $.jsx)("p", {
				className: "text-caption-1-regular text-text-secondary",
				children: a === "checking" ? "正在检测当前浏览器的用户脚本。" : a === "missing" ? "安装或启用脚本后重新检测；旧版脚本需要更新后才能检测。" : c ? `请更新至 v${t.minimum_version} 或更高版本。` : a.paired ? e ? "可在支持的站点直接加入 Peach 馆藏。" : "启用浏览器添加后，可在支持的站点直接加入 Peach 馆藏。" : "生成令牌后复制配对信息，在用户脚本设置中粘贴并保存。"
			}),
			/* @__PURE__ */ (0, $.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [a === "missing" || c ? /* @__PURE__ */ (0, $.jsx)(i, {
					href: t.install_url,
					children: c ? "更新用户脚本" : "安装 Peach 用户脚本"
				}) : null, /* @__PURE__ */ (0, $.jsx)(V, {
					variant: "secondary",
					type: "button",
					...K(a === "checking"),
					onClick: o,
					children: "重新检测"
				})]
			})
		]
	})] });
}
//#endregion
//#region src/react/settings/jav-browser-settings.tsx
var Nt = "/api/configuration/jav-browser";
function Pt({ receipt: e, refreshKey: t }) {
	let n = B({
		queryKey: ["jav-browser-settings", t],
		queryFn: ({ signal: e }) => N(Nt, e),
		refetchOnMount: "always",
		refetchOnWindowFocus: "always"
	});
	return n.error && !n.data ? /* @__PURE__ */ (0, $.jsx)(k, { children: l(n.error) }) : n.isFetching && !n.data ? /* @__PURE__ */ (0, $.jsx)(r, { label: "正在读取浏览器添加设置" }) : n.data ? /* @__PURE__ */ (0, $.jsx)(Ft, {
		initial: n.data,
		receipt: e
	}) : null;
}
function Ft({ initial: e, receipt: n }) {
	let [r, i] = (0, Z.useState)(e), [s, c] = (0, Z.useState)(e.provider), [l, u] = (0, Z.useState)(""), d = f();
	(0, Z.useEffect)(() => {
		i(e), c((t) => e.providers.some((e) => e.key === t) ? t : e.provider), e.enabled || u("");
	}, [e]);
	let p = (e) => {
		d.run(e, (t) => L(Nt, {
			action: e,
			provider: s
		}, "POST", t), (t) => {
			let { token: r = "", ...a } = t;
			i(a), c(a.provider), u(r), n(e === "disable" ? "已关闭浏览器添加" : "已生成专用令牌");
		});
	}, m = r.providers.some((e) => e.key === s && e.configured && e.target);
	return /* @__PURE__ */ (0, $.jsxs)(t, {
		title: "浏览器添加 JAV",
		children: [/* @__PURE__ */ (0, $.jsxs)(x, { children: [
			/* @__PURE__ */ (0, $.jsx)(Mt, {
				enabled: r.enabled,
				release: r.userscript
			}),
			/* @__PURE__ */ (0, $.jsxs)("div", {
				className: "flex flex-col gap-1",
				children: [/* @__PURE__ */ (0, $.jsx)(o, { children: "浏览器添加的下载渠道" }), /* @__PURE__ */ (0, $.jsx)(H, {
					"aria-label": "浏览器添加的下载渠道",
					selectedKey: s || null,
					placeholder: "暂无可用渠道",
					onSelectionChange: (e) => {
						e !== null && c(String(e));
					},
					isDisabled: !r.providers.length || !!d.busy,
					children: r.providers.map((e) => /* @__PURE__ */ (0, $.jsx)(z, {
						id: e.key,
						textValue: e.label,
						children: /* @__PURE__ */ (0, $.jsx)(X, {
							source: e.key,
							label: e.label
						})
					}, e.key))
				})]
			}),
			m ? null : /* @__PURE__ */ (0, $.jsx)(w, { children: "请在媒体库中添加支持云下载的网盘，并配置账号与目标目录。" }),
			r.problems?.map((e) => /* @__PURE__ */ (0, $.jsx)(w, { children: e }, e)),
			r.enabled && r.active_provider && !r.providers.some((e) => e.key === r.active_provider) ? /* @__PURE__ */ (0, $.jsx)(w, { children: "已启用的下载渠道不可用，请选择渠道并更新令牌。" }) : null,
			/* @__PURE__ */ (0, $.jsx)(G, {
				label: "Peach 地址",
				value: window.location.origin,
				isReadOnly: !0,
				autoComplete: "off"
			}),
			l ? /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [
				/* @__PURE__ */ (0, $.jsx)(G, {
					label: "浏览器添加专用令牌",
					type: "password",
					value: l,
					isReadOnly: !0,
					autoComplete: "new-password"
				}),
				/* @__PURE__ */ (0, $.jsx)("div", { children: /* @__PURE__ */ (0, $.jsx)(V, {
					variant: "secondary",
					type: "button",
					onClick: () => {
						d.run("copy", async () => navigator.clipboard.writeText(JSON.stringify({
							peach_pairing: 1,
							base: window.location.origin,
							token: l
						})), () => n("已复制配对信息"));
					},
					...K(d.busy === "copy"),
					children: "复制配对信息"
				}) }),
				/* @__PURE__ */ (0, $.jsx)(w, { children: "在用户脚本设置的「Peach 地址」中粘贴配对信息，即可填好地址与令牌。" })
			] }) : null,
			d.error ? /* @__PURE__ */ (0, $.jsx)(k, { children: d.error }) : null
		] }), /* @__PURE__ */ (0, $.jsxs)(a, { children: [r.enabled ? /* @__PURE__ */ (0, $.jsx)(V, {
			variant: "secondary",
			type: "button",
			disabled: !!d.busy,
			onClick: () => p("disable"),
			children: "关闭浏览器添加"
		}) : null, /* @__PURE__ */ (0, $.jsx)(V, {
			type: "button",
			disabled: !r.available || !m || !!d.busy,
			onClick: () => p(r.enabled ? "rotate" : "enable"),
			...K(d.busy === "enable" || d.busy === "rotate"),
			children: r.enabled ? "更新渠道与令牌" : "启用并生成令牌"
		})] })]
	});
}
//#endregion
//#region src/react/settings/download-settings.tsx
var It = "/api/configuration/downloads", Lt = "/api/configuration/downloads/check", Rt = "/api/configuration/downloads/folder", zt = "/api/configuration/downloads/pikpak/login", Bt = "/api/configuration/downloads/pikpak/logout", Vt = "/api/configuration/downloads/pikpak/browser-login", Ht = 2e3, Ut = de("pikpak");
function Wt({ initial: e, receipt: t, panel: n }) {
	return /* @__PURE__ */ (0, $.jsx)("div", {
		...Q(n),
		children: /* @__PURE__ */ (0, $.jsx)(Gt, {
			initial: e,
			receipt: t
		})
	});
}
function Gt({ initial: e, receipt: t }) {
	let [n, r] = (0, Z.useState)(e), [i, a] = (0, Z.useState)("");
	(0, Z.useEffect)(() => {
		r((t) => ({
			...t,
			media_sources: e.media_sources,
			pikpak_roots: e.pikpak_roots
		}));
	}, [e.media_sources, e.pikpak_roots]);
	let o = n.media_sources ?? [], s = o.includes("pikpak"), c = o.some((e) => we.includes(e)), l = s && (n.pikpak.logged_in || !!i.trim());
	return /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [
		c ? /* @__PURE__ */ (0, $.jsx)(Kt, {
			state: n,
			settle: r,
			receipt: t,
			pikpakAccount: l
		}) : null,
		s ? /* @__PURE__ */ (0, $.jsx)(Yt, {
			state: n,
			settle: r,
			receipt: t,
			username: i,
			setUsername: a
		}) : null,
		/* @__PURE__ */ (0, $.jsx)(Pt, {
			receipt: t,
			refreshKey: JSON.stringify([
				n.media_sources,
				n.config,
				n.token_set,
				n.pikpak.logged_in
			])
		})
	] });
}
function Kt({ state: e, settle: n, receipt: i, pikpakAccount: s }) {
	let [c, u] = (0, Z.useState)(e.config), [d, p] = (0, Z.useState)(""), [m, h] = (0, Z.useState)(String(e.config.wait_hours)), [g, _] = (0, Z.useState)(null), [v, y] = (0, Z.useState)(""), [b, S] = (0, Z.useState)(qt), [C, T] = (0, Z.useState)(""), [E, D] = (0, Z.useState)(!1), O = f(), A = e.media_sources ?? [], ee = A.includes("115"), j = A.includes("pikpak"), M = (e) => c.targets[e] ?? "", P = (e, t) => u({
		...c,
		targets: {
			...c.targets,
			[e]: t
		}
	}), F = ee && !(!b.target || b.target.exists || M("115") !== b.target.path), I = (e, t, n = "") => {
		let r = t.target ? e.suggested_target : null, i = !!(r && n && r.path === n), a = t.root ? e.suggested_pikpak_root : "";
		u((n) => ({
			...n,
			clouddrive_address: t.address && e.address ? e.address : n.clouddrive_address,
			targets: r && !i ? {
				...n.targets,
				115: r.path
			} : n.targets,
			pikpak_root: a || n.pikpak_root
		})), _(e), y(t.address ? e.address : ""), S({
			target: r,
			root: a,
			saved: i
		}), D(!1), T("");
	};
	return (0, Z.useEffect)(() => {
		if (!e.available || !e.config.clouddrive_address || !e.token_set) return;
		let t = {
			address: !1,
			target: !e.config.targets[115],
			root: !e.config.pikpak_root
		};
		O.run("auto", (e) => N(Lt, e), (e) => I(e, t), (e) => T(l(e)));
	}, []), /* @__PURE__ */ (0, $.jsxs)(t, {
		title: "云下载",
		onSubmit: (e) => {
			if (e.preventDefault(), F) {
				D(!0);
				return;
			}
			let t = !M("115").trim(), r = {
				...c,
				wait_hours: m,
				token: d,
				pikpak_account: s
			};
			O.run("save", (e) => L(It, r, "POST", e), (e) => {
				let { report: r, ...a } = e;
				n(a), u(a.config), h(String(a.config.wait_hours)), p(""), r ? I(r, {
					address: !a.config.clouddrive_address,
					target: t,
					root: !a.config.pikpak_root
				}, a.config.targets[115] ?? "") : (_(null), y(""), S(qt), D(!1), T("")), i("已保存配置");
			}, (e) => T(l(e)));
		},
		children: [
			/* @__PURE__ */ (0, $.jsxs)(x, { children: [
				/* @__PURE__ */ (0, $.jsx)(G, {
					label: "CloudDrive2 地址",
					placeholder: "留空自动查找",
					autoComplete: "off",
					maxLength: 200,
					value: c.clouddrive_address,
					isDisabled: !e.available,
					onChange: (e) => u({
						...c,
						clouddrive_address: e
					})
				}),
				/* @__PURE__ */ (0, $.jsx)(G, {
					label: "CloudDrive2 API 令牌",
					type: "password",
					autoComplete: "off",
					maxLength: 400,
					placeholder: e.token_set ? "已保存，留空不改" : "在 CloudDrive2「设置 → API 令牌」中生成",
					hint: "需要离线任务权限。",
					value: d,
					isDisabled: !e.available,
					onChange: p
				}),
				ee ? /* @__PURE__ */ (0, $.jsx)(G, {
					label: /* @__PURE__ */ (0, $.jsx)(X, {
						source: "115",
						label: "115 目标目录"
					}),
					placeholder: "留空时根据媒体库目录自动填写",
					autoComplete: "off",
					maxLength: 300,
					validationBehavior: "aria",
					isInvalid: F,
					hint: F ? E ? "先新建这个目录，或填写已有目录。" : "这个目录不存在。" : "应位于自动入库的云端路径前缀内。",
					value: M("115"),
					isDisabled: !e.available,
					onChange: (e) => P("115", e)
				}) : null,
				j ? /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [/* @__PURE__ */ (0, $.jsx)(G, {
					label: /* @__PURE__ */ (0, $.jsx)(X, {
						source: "pikpak",
						label: "PikPak 目标目录"
					}),
					placeholder: "以 / 开头的网盘路径",
					autoComplete: "off",
					maxLength: 300,
					hint: "目录要已经存在。",
					value: M("pikpak"),
					isDisabled: !e.available,
					onChange: (e) => P("pikpak", e)
				}), /* @__PURE__ */ (0, $.jsxs)("div", {
					className: "flex flex-col gap-1",
					children: [/* @__PURE__ */ (0, $.jsx)(o, { children: /* @__PURE__ */ (0, $.jsx)(X, {
						source: "pikpak",
						label: "PikPak 根目录对应的媒体目录"
					}) }), e.pikpak_roots.length ? /* @__PURE__ */ (0, $.jsx)(H, {
						"aria-label": "PikPak 根目录对应的媒体目录",
						selectedKey: c.pikpak_root || null,
						isDisabled: !e.available,
						placeholder: "检查时根据媒体库目录选择",
						onSelectionChange: (e) => u({
							...c,
							pikpak_root: e === null ? "" : String(e)
						}),
						children: e.pikpak_roots.map((e) => /* @__PURE__ */ (0, $.jsx)(z, {
							id: e,
							children: e
						}, e))
					}) : /* @__PURE__ */ (0, $.jsx)(w, { children: "先在「媒体库与入库」添加 PikPak 挂载文件夹。" })]
				})] }) : null,
				/* @__PURE__ */ (0, $.jsx)(G, {
					label: "等待上限（小时）",
					type: "number",
					inputMode: "numeric",
					autoComplete: "off",
					hint: `超时标为停滞；可填 1–${e.max_wait_hours} 小时。`,
					value: m,
					isDisabled: !e.available,
					onChange: h
				})
			] }),
			O.busy === "auto" ? /* @__PURE__ */ (0, $.jsx)(x, {
				divided: !0,
				children: /* @__PURE__ */ (0, $.jsx)(r, { label: "正在检查 CloudDrive2" })
			}) : null,
			g ? /* @__PURE__ */ (0, $.jsx)(Jt, {
				report: g,
				detected: v,
				suggested: b,
				create: e.available ? (e) => {
					let t = {
						clouddrive_address: c.clouddrive_address,
						token: d,
						path: e,
						pikpak_root: c.pikpak_root,
						pikpak_account: s
					};
					O.run("folder", (e) => L(Rt, t, "POST", e), (t) => {
						_(t), S((t) => ({
							...t,
							target: {
								path: e,
								exists: !0
							}
						})), D(!1), T(""), i("已新建目录");
					}, (e) => T(l(e)));
				} : void 0,
				creating: O.busy === "folder"
			}) : null,
			C || O.error ? /* @__PURE__ */ (0, $.jsx)(x, {
				divided: !0,
				children: /* @__PURE__ */ (0, $.jsx)(k, { children: C || O.error })
			}) : null,
			/* @__PURE__ */ (0, $.jsxs)(a, {
				status: e.available ? void 0 : "云下载只在允许修改数据库的设备上可用。",
				children: [/* @__PURE__ */ (0, $.jsx)(V, {
					variant: "secondary",
					onClick: () => {
						let e = {
							address: !c.clouddrive_address.trim(),
							target: !M("115").trim(),
							root: !c.pikpak_root
						}, t = {
							clouddrive_address: c.clouddrive_address,
							token: d,
							target: M("115"),
							pikpak_root: c.pikpak_root,
							pikpak_account: s
						};
						O.run("check", (e) => L(Lt, t, "POST", e), (t) => I(t, e), (e) => T(l(e)));
					},
					disabled: !e.available,
					...K(O.busy === "check"),
					children: "检查连接"
				}), /* @__PURE__ */ (0, $.jsx)(V, {
					type: "submit",
					disabled: !e.available,
					...K(O.busy === "save"),
					children: "保存配置"
				})]
			})
		]
	});
}
var qt = {
	target: null,
	root: "",
	saved: !1
};
function Jt({ report: e, detected: t, suggested: n, create: r, creating: i }) {
	let a = n.target, o = !!(t || a || n.root || e.permissions.length || e.folder || e.quota);
	return !o && !e.problems.length ? null : /* @__PURE__ */ (0, $.jsxs)(x, {
		divided: !0,
		children: [o ? /* @__PURE__ */ (0, $.jsxs)(j, { children: [
			t ? /* @__PURE__ */ (0, $.jsx)(J, {
				term: "CloudDrive2 地址",
				children: `探测到 ${t}，保存配置后生效`
			}) : null,
			a?.exists ? /* @__PURE__ */ (0, $.jsx)(J, {
				term: /* @__PURE__ */ (0, $.jsx)(X, {
					source: "115",
					label: "115 目标目录"
				}),
				children: n.saved ? `已根据媒体库目录填入 ${a.path}` : `根据媒体库目录填入 ${a.path}，保存配置后生效`
			}) : null,
			a && !a.exists ? /* @__PURE__ */ (0, $.jsxs)(J, {
				term: /* @__PURE__ */ (0, $.jsx)(X, {
					source: "115",
					label: "115 目标目录"
				}),
				children: [`${a.path} 不存在`, r ? /* @__PURE__ */ (0, $.jsx)(V, {
					variant: "secondary",
					size: "small",
					onClick: () => r(a.path),
					...K(i),
					children: "新建这个目录"
				}) : null]
			}) : null,
			n.root ? /* @__PURE__ */ (0, $.jsx)(J, {
				term: /* @__PURE__ */ (0, $.jsx)(X, {
					source: "pikpak",
					label: "PikPak 根目录"
				}),
				children: `根据媒体库目录填入 ${n.root}，保存配置后生效`
			}) : null,
			e.permissions.length ? /* @__PURE__ */ (0, $.jsx)(J, {
				term: "离线权限",
				children: e.missing.length ? e.missing.map((e) => /* @__PURE__ */ (0, $.jsx)(je, {
					variant: "caption",
					color: "yellow",
					children: `缺 ${e}`
				}, e)) : /* @__PURE__ */ (0, $.jsx)(je, {
					variant: "caption",
					color: "lime",
					children: "齐全"
				})
			}) : null,
			e.folder ? /* @__PURE__ */ (0, $.jsx)(J, {
				term: "目标目录",
				children: e.folder.can_offline ? `${e.folder.path} 可以离线下载` : `${e.folder.path} 不支持离线下载`
			}) : null,
			e.quota ? /* @__PURE__ */ (0, $.jsx)(J, {
				term: /* @__PURE__ */ (0, $.jsx)(X, {
					source: "115",
					label: "115 离线配额"
				}),
				children: `本月还剩 ${e.quota.left} 条，共 ${e.quota.total} 条`
			}) : null
		] }) : null, e.problems.map((e) => /* @__PURE__ */ (0, $.jsx)(k, { children: e }, e))]
	});
}
function Yt({ state: e, settle: n, receipt: o, username: s, setUsername: c }) {
	let [u, d] = (0, Z.useState)(""), [p, m] = (0, Z.useState)(!1), [h, g] = (0, Z.useState)(""), [_, v] = (0, Z.useState)(""), [b, S] = (0, Z.useState)(""), C = f(), T = e.pikpak, E = e.pikpak_browser, D = E.state === "waiting";
	(0, Z.useEffect)(() => {
		if (!D) return;
		let e = new AbortController(), t, r = async () => {
			try {
				let t = await N(Vt, e.signal);
				if (e.signal.aborted || (n(t), t.pikpak_browser.state === "done" ? o("已登录 PikPak") : t.pikpak_browser.state !== "waiting" && S(t.pikpak_browser.message), t.pikpak_browser.state !== "waiting")) return;
			} catch (t) {
				if (e.signal.aborted) return;
				v(l(t));
			}
			t = setTimeout(r, Ht);
		};
		return t = setTimeout(r, Ht), () => {
			e.abort(), clearTimeout(t);
		};
	}, [D]);
	let O = () => {
		S(""), C.run("browser", (e) => L(Vt, {}, "POST", e), (e) => {
			n(e), v("");
		}, (e) => v(l(e)));
	}, A = () => {
		C.run("cancel", (e) => L(`${Vt}/cancel`, {}, "POST", e), (e) => {
			n(e), v(""), S(e.pikpak_browser.message);
		}, (e) => v(l(e)));
	}, ee = (e) => {
		if (e.preventDefault(), T.logged_in) return;
		let t = {
			username: s,
			password: u,
			remember: p
		};
		C.run("login", (e) => L(zt, t, "POST", e), (e) => {
			n(e.settings), v(""), e.ok ? (g(""), d(""), o("已登录 PikPak")) : g(e.captcha_url ?? "");
		}, (e) => v(l(e)));
	}, M = () => {
		C.run("logout", (e) => L(Bt, {}, "POST", e), (e) => {
			n(e), v(""), o("已登出 PikPak");
		}, (e) => v(l(e)));
	}, P = /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [
		/* @__PURE__ */ (0, $.jsx)(G, {
			label: "账号",
			placeholder: "邮箱或手机号",
			autoComplete: "username",
			maxLength: 200,
			value: s,
			isDisabled: !e.available,
			onChange: c
		}),
		/* @__PURE__ */ (0, $.jsx)(G, {
			label: "密码",
			type: "password",
			autoComplete: "current-password",
			maxLength: 200,
			value: u,
			isDisabled: !e.available,
			onChange: d
		}),
		/* @__PURE__ */ (0, $.jsx)(ne, {
			isSelected: p,
			isDisabled: !e.available,
			onChange: m,
			children: "保存密码，登录过期时自动重新登录"
		}),
		h ? /* @__PURE__ */ (0, $.jsx)(q, {
			tone: "warning",
			title: "需要人机验证",
			extra: /* @__PURE__ */ (0, $.jsx)("div", {
				className: "pt-2",
				children: /* @__PURE__ */ (0, $.jsx)(i, {
					href: h,
					children: "打开 PikPak 验证页"
				})
			}),
			children: "在浏览器里完成验证后，回到这里再点一次「登录」。"
		}) : null
	] }), F = /* @__PURE__ */ (0, $.jsx)(V, {
		type: "submit",
		variant: "primary",
		disabled: !e.available || D,
		...K(C.busy === "login"),
		children: "登录"
	}), I = E.state === "timeout" || E.state === "failed";
	return /* @__PURE__ */ (0, $.jsxs)(t, {
		title: "PikPak 账号",
		icon: /* @__PURE__ */ (0, $.jsx)(Ut, {}),
		onSubmit: ee,
		aside: /* @__PURE__ */ (0, $.jsx)(y, {
			tone: T.logged_in ? "success" : D ? "progress" : I ? "error" : "neutral",
			children: T.logged_in ? "已登录" : D ? "等待登录" : I ? "登录未完成" : "待登录"
		}),
		children: [
			T.logged_in ? /* @__PURE__ */ (0, $.jsxs)(j, { children: [/* @__PURE__ */ (0, $.jsx)(J, {
				term: "账号",
				children: T.username || "已登录"
			}), T.method === "browser" ? /* @__PURE__ */ (0, $.jsx)(J, {
				term: "登录方式",
				children: "浏览器登录，由 Peach 续期"
			}) : /* @__PURE__ */ (0, $.jsx)(J, {
				term: "密码",
				children: T.remember ? "已保存，登录过期时自动重新登录" : "未保存，登录过期后需要回到这里重新登录"
			})] }) : /* @__PURE__ */ (0, $.jsxs)(x, { children: [b ? I ? /* @__PURE__ */ (0, $.jsx)(k, { children: b }) : /* @__PURE__ */ (0, $.jsx)(w, {
				role: "status",
				children: b
			}) : null, P] }),
			_ || C.error ? /* @__PURE__ */ (0, $.jsx)(x, {
				divided: !0,
				children: /* @__PURE__ */ (0, $.jsx)(k, { children: _ || C.error })
			}) : null,
			/* @__PURE__ */ (0, $.jsx)(a, {
				status: !T.logged_in && D ? /* @__PURE__ */ (0, $.jsx)(r, { label: E.message || "等你在浏览器窗口里登录 PikPak" }) : null,
				children: T.logged_in ? /* @__PURE__ */ (0, $.jsx)(V, {
					variant: "secondary",
					onClick: M,
					disabled: !e.available,
					...K(C.busy === "logout"),
					children: "登出"
				}) : /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [E.available ? D ? /* @__PURE__ */ (0, $.jsx)(V, {
					variant: "secondary",
					type: "button",
					onClick: A,
					...K(C.busy === "cancel"),
					children: "取消"
				}) : /* @__PURE__ */ (0, $.jsx)(V, {
					variant: "secondary",
					type: "button",
					onClick: O,
					disabled: !e.available,
					...K(C.busy === "browser"),
					children: "用浏览器登录"
				}) : null, F] })
			})
		]
	});
}
//#endregion
//#region src/react/settings/library-sharing-settings.tsx
function Xt({ initial: e, receipt: t }) {
	let [n, r] = (0, Z.useState)(e), [i, o] = (0, Z.useState)(null), [s, c] = (0, Z.useState)(!1), [l, u] = (0, Z.useState)(!1), d = (0, Z.useMemo)(() => i ? JSON.stringify(i.data, null, 2) : "", [i]), p = f(), m = (e) => void p.run("save", (t) => L("/api/configuration/library-sharing", {
		enabled: e,
		schema: n.schema,
		consent: l,
		preview_token: i?.token
	}, "POST", t), (e) => {
		r(e), o(null), u(!1), c(!1), t("已保存馆藏与口味上传选项");
	}), h = () => {
		let e = URL.createObjectURL(new Blob([d], { type: "application/json" })), t = document.createElement("a");
		t.href = e, t.download = "peach-library-taste-preview.json", document.body.append(t);
		try {
			t.click();
		} finally {
			t.remove(), setTimeout(() => URL.revokeObjectURL(e), 1e3);
		}
	};
	return /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [
		/* @__PURE__ */ (0, $.jsx)(W, { children: /* @__PURE__ */ (0, $.jsx)(T, {
			label: "上传馆藏与口味明细",
			description: n.notice,
			children: /* @__PURE__ */ (0, $.jsx)(R, {
				"aria-label": "上传馆藏与口味明细",
				isSelected: n.enabled,
				onChange: (e) => e ? c(!0) : m(!1),
				...K(p.busy === "save")
			})
		}) }),
		n.available ? null : /* @__PURE__ */ (0, $.jsx)(x, {
			divided: !0,
			children: /* @__PURE__ */ (0, $.jsx)("span", {
				className: "self-start",
				children: /* @__PURE__ */ (0, $.jsx)(y, { children: "上传服务未配置" })
			})
		}),
		n.enabled && n.last_attempt?.status === "failed" ? /* @__PURE__ */ (0, $.jsxs)(x, {
			divided: !0,
			children: [/* @__PURE__ */ (0, $.jsx)("span", {
				className: "self-start",
				children: /* @__PURE__ */ (0, $.jsx)(y, {
					tone: n.last_attempt.attempted ? "error" : "warning",
					children: n.last_attempt.attempted ? "上传失败" : "待重新准备"
				})
			}), /* @__PURE__ */ (0, $.jsx)(k, { children: n.last_attempt.attempted ? "馆藏与口味上传失败，本周不再发送。" : "馆藏与口味上传未完成，将自动重新准备。" })]
		}) : null,
		n.enabled && n.last_attempt?.status === "waiting-data" ? /* @__PURE__ */ (0, $.jsxs)(x, {
			divided: !0,
			children: [/* @__PURE__ */ (0, $.jsx)("span", {
				className: "self-start",
				children: /* @__PURE__ */ (0, $.jsx)(y, { children: "等待数据" })
			}), /* @__PURE__ */ (0, $.jsx)(w, { children: "等待可分析的馆藏或偏好数据。" })]
		}) : null,
		n.enabled && n.last_attempt?.status === "unknown" ? /* @__PURE__ */ (0, $.jsxs)(x, {
			divided: !0,
			children: [/* @__PURE__ */ (0, $.jsx)("span", {
				className: "self-start",
				children: /* @__PURE__ */ (0, $.jsx)(y, {
					tone: "warning",
					children: "结果未取得"
				})
			}), /* @__PURE__ */ (0, $.jsx)(w, { children: "未取得上传结果，本周不再发送。" })]
		}) : null,
		i ? /* @__PURE__ */ (0, $.jsxs)(x, {
			divided: !0,
			children: [
				/* @__PURE__ */ (0, $.jsxs)(w, { children: [
					"当前预览包含 ",
					i.data.library.length,
					" 部有编号作品、",
					i.data.coverage.uncoded_items,
					" 条无编号馆藏的汇总，约 ",
					(i.bytes / 1024).toFixed(1),
					" KiB。不含账号、设备、文件路径和浏览器历史记录等个人数据。"
				] }),
				/* @__PURE__ */ (0, $.jsx)(Y, {
					summary: "上传数据预览",
					defaultOpen: !0,
					children: /* @__PURE__ */ (0, $.jsx)(gt, {
						code: d,
						language: "json",
						label: "馆藏与口味上传预览",
						maxCharacters: 24e3
					})
				}),
				d.length > 24e3 ? /* @__PURE__ */ (0, $.jsx)(w, { children: "显示前 24,000 个字符，下载可查看完整内容。" }) : null,
				/* @__PURE__ */ (0, $.jsx)(V, {
					variant: "secondary",
					onClick: h,
					children: "下载完整预览"
				}),
				n.enabled ? null : /* @__PURE__ */ (0, $.jsx)(ne, {
					isSelected: l,
					onChange: u,
					children: "我已查看上传预览，同意上传馆藏与口味明细"
				})
			]
		}) : null,
		p.error ? /* @__PURE__ */ (0, $.jsx)(x, {
			divided: !0,
			children: /* @__PURE__ */ (0, $.jsx)(k, { children: p.error })
		}) : null,
		/* @__PURE__ */ (0, $.jsxs)(a, { children: [
			s && !n.enabled ? /* @__PURE__ */ (0, $.jsx)(V, {
				variant: "secondary",
				onClick: () => {
					c(!1), o(null), u(!1);
				},
				children: "取消"
			}) : null,
			/* @__PURE__ */ (0, $.jsx)(V, {
				variant: "secondary",
				onClick: () => {
					c(!0), p.run("preview", (e) => N("/api/configuration/library-sharing/preview", e), (e) => {
						o(e), u(!1);
					});
				},
				...K(p.busy === "preview"),
				children: "预览上传内容"
			}),
			!n.enabled && i ? /* @__PURE__ */ (0, $.jsx)(V, {
				variant: "primary",
				disabled: !l,
				onClick: () => m(!0),
				...K(p.busy === "save"),
				children: "同意并开启上传"
			}) : null
		] })
	] });
}
//#endregion
//#region src/react/settings/remote-reporting-settings.tsx
function Zt({ value: e, onChange: t, busy: n = !1 }) {
	return /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [/* @__PURE__ */ (0, $.jsx)(W, { children: /* @__PURE__ */ (0, $.jsx)(T, {
		label: "发送版本统计与错误诊断（推荐）",
		description: "上传版本、系统信息、故障类型、代码位置与发生次数。",
		children: /* @__PURE__ */ (0, $.jsx)(R, {
			"aria-label": "发送版本统计与错误诊断（推荐）",
			isSelected: e.usage && e.errors,
			onChange: (n) => t({
				...e,
				usage: n,
				errors: n
			}),
			...K(n)
		})
	}) }), e.available ? null : /* @__PURE__ */ (0, $.jsx)(x, {
		divided: !0,
		children: /* @__PURE__ */ (0, $.jsx)("span", {
			className: "self-start",
			children: /* @__PURE__ */ (0, $.jsx)(y, { children: "上传服务未配置" })
		})
	})] });
}
function Qt({ initial: e, receipt: t }) {
	let [n, r] = (0, Z.useState)(e), i = f();
	return /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [/* @__PURE__ */ (0, $.jsx)(Zt, {
		value: n,
		busy: i.busy === "save",
		onChange: (e) => {
			i.run("save", (t) => L("/api/configuration/remote-reporting", {
				usage: e.usage,
				errors: e.errors
			}, "POST", t), (e) => {
				r(e), t("已保存诊断选项");
			});
		}
	}), i.error ? /* @__PURE__ */ (0, $.jsx)(x, {
		divided: !0,
		children: /* @__PURE__ */ (0, $.jsx)(k, { children: i.error })
	}) : null] });
}
//#endregion
//#region src/react/settings/storage-settings.tsx
var $t = "/api/configuration/storage", en = 1500, tn = 864e5, nn = (e) => e instanceof p && e.body?.errors?.target || l(e);
function rn(e) {
	if (e.free_bytes === null || e.total_bytes === null) return "未取得";
	let t = `${ae(e.free_bytes)} 可用，共 ${ae(e.total_bytes)}`;
	return e.system_drive ? `${t}（系统盘）` : t;
}
function an({ initial: e, receipt: n }) {
	let [r, i] = (0, Z.useState)(e), [o, s] = (0, Z.useState)(""), c = f(), l = r.job.state !== "idle", u = (0, Z.useRef)(l);
	(0, Z.useEffect)(() => {
		if (!l) return;
		let e = new AbortController(), t = setTimeout(() => {
			N($t, e.signal).then(i, () => {
				e.signal.aborted || i((e) => ({ ...e }));
			});
		}, en);
		return () => {
			e.abort(), clearTimeout(t);
		};
	}, [r]), (0, Z.useEffect)(() => {
		l ? u.current = !0 : u.current && (u.current = !1, r.job.error || n(r.job.message || "已统计占用空间"));
	}, [l]);
	let p = () => void c.run("measure", (e) => L(`${$t}/measure`, {}, "POST", e), i), m = (e) => void A({
		title: `清理${e.label}`,
		body: `将删除 ${ae(e.reclaimable)} 的${e.label}，${e.description}。`,
		confirmLabel: `清理${e.label}`,
		danger: e.key === "backups",
		onConfirm: async () => i(await L(`${$t}/clean`, { category: e.key }))
	}), h = () => void c.run("relocate", async (e) => {
		let t = (await L(pt, { initial: r.data_root }, "POST", e)).path;
		if (!t) return;
		let n = r.usage ? ae(r.usage.total_bytes) : "";
		await A({
			title: "迁移数据目录",
			body: `将 ${n} 数据从 ${r.data_root} 移到 ${t}。迁移期间 Peach 会退出，完成后自动重新打开；原位置的数据在新位置核对无误后删除。`,
			confirmLabel: "迁移数据目录",
			onConfirm: async () => {
				try {
					s((await L(`${$t}/relocate`, { target: t })).message);
				} catch (e) {
					throw Error(nn(e));
				}
			}
		});
	}, () => void 0), g = r.usage, _ = r.relocation.last, v = _ && (_.state === "error" || (_.notes?.length ?? 0) > 0 || Date.now() - _.finished_at * 1e3 < tn), y = o || (r.job.state === "measuring" ? "正在统计占用空间…" : r.job.state === "cleaning" ? "正在清理…" : g ? `共 ${ae(g.total_bytes)}，${g.total_files.toLocaleString()} 个文件` : ""), b = l || !!o;
	return /* @__PURE__ */ (0, $.jsxs)(t, {
		id: "storageSettings",
		title: "存储空间",
		children: [
			/* @__PURE__ */ (0, $.jsxs)(j, { children: [/* @__PURE__ */ (0, $.jsx)(J, {
				term: "数据目录",
				children: /* @__PURE__ */ (0, $.jsx)(d, {
					path: r.data_root,
					className: "text-body-regular text-text-primary",
					onRevealed: n
				})
			}), /* @__PURE__ */ (0, $.jsx)(J, {
				term: "所在磁盘",
				children: rn(r)
			})] }),
			g ? /* @__PURE__ */ (0, $.jsx)(W, { children: g.categories.map((e) => /* @__PURE__ */ (0, $.jsx)(T, {
				label: e.label,
				description: e.cleanable && e.description ? e.description : void 0,
				children: /* @__PURE__ */ (0, $.jsxs)("div", {
					className: "flex shrink-0 items-center gap-3",
					children: [/* @__PURE__ */ (0, $.jsx)("span", {
						className: "text-body-regular text-text-secondary tabular-nums",
						children: ae(e.bytes)
					}), e.cleanable && e.reclaimable > 0 ? (() => {
						let t = r.job.state === "cleaning" && r.job.category === e.key;
						return /* @__PURE__ */ (0, $.jsxs)(V, {
							variant: "secondary",
							disabled: b && !t,
							...K(t),
							onClick: () => m(e),
							children: ["清理 ", ae(e.reclaimable)]
						});
					})() : null]
				})
			}, e.key)) }) : /* @__PURE__ */ (0, $.jsx)(x, {
				divided: !0,
				children: /* @__PURE__ */ (0, $.jsx)(w, { children: "统计后显示各类数据的占用，并可清理缓存与旧备份。" })
			}),
			!r.relocation.available || r.job.error || c.error || v ? /* @__PURE__ */ (0, $.jsxs)(x, {
				divided: !0,
				children: [
					r.relocation.available ? null : /* @__PURE__ */ (0, $.jsx)(w, { children: r.relocation.message }),
					r.job.error ? /* @__PURE__ */ (0, $.jsx)(k, { children: r.job.message }) : null,
					c.error ? /* @__PURE__ */ (0, $.jsx)(k, { children: c.error }) : null,
					v && _ ? _.state === "error" ? /* @__PURE__ */ (0, $.jsx)(k, { children: _.message }) : /* @__PURE__ */ (0, $.jsx)(w, { children: [_.message, ..._.notes ?? []].join("；") }) : null
				]
			}) : null,
			/* @__PURE__ */ (0, $.jsxs)(a, {
				status: y ? /* @__PURE__ */ (0, $.jsx)("p", {
					role: o ? "status" : void 0,
					children: y
				}) : null,
				children: [/* @__PURE__ */ (0, $.jsx)(V, {
					variant: "secondary",
					disabled: b || !r.relocation.available || !g,
					onClick: h,
					...K(c.busy === "relocate"),
					children: "更改位置"
				}), /* @__PURE__ */ (0, $.jsx)(V, {
					disabled: !!o || r.job.state === "cleaning",
					onClick: p,
					...K(c.busy === "measure" || r.job.state === "measuring"),
					children: g ? "重新统计" : "统计占用"
				})]
			})
		]
	});
}
//#endregion
//#region src/react/settings/maintenance-settings.tsx
var on = [
	["6", "每 6 小时"],
	["24", "每天"],
	["168", "每周"]
];
function sn({ data: e, receipt: n, reopenTutorial: r, panel: i }) {
	return /* @__PURE__ */ (0, $.jsxs)("div", {
		...Q(i),
		children: [
			e.storage ? /* @__PURE__ */ (0, $.jsx)(an, {
				initial: e.storage,
				receipt: n
			}) : null,
			e.remote_reporting || e.library_sharing ? /* @__PURE__ */ (0, $.jsxs)(t, {
				id: "librarySharing",
				title: "数据上传",
				children: [e.remote_reporting ? /* @__PURE__ */ (0, $.jsx)(Qt, {
					initial: e.remote_reporting,
					receipt: n
				}) : null, e.library_sharing ? /* @__PURE__ */ (0, $.jsx)("div", {
					className: "border-t border-separator-border",
					children: /* @__PURE__ */ (0, $.jsx)(Xt, {
						initial: e.library_sharing,
						receipt: n
					})
				}) : null]
			}) : null,
			/* @__PURE__ */ (0, $.jsx)(un, { facts: e.facts }),
			/* @__PURE__ */ (0, $.jsx)(cn, {
				receipt: n,
				reopenTutorial: r
			}),
			e.uninstall ? /* @__PURE__ */ (0, $.jsx)(dn, {
				uninstall: e.uninstall,
				receipt: n
			}) : null
		]
	});
}
function cn({ receipt: e, reopenTutorial: t }) {
	let n = f();
	return /* @__PURE__ */ (0, $.jsx)("section", {
		"aria-label": "安装教程",
		className: "w-full",
		children: /* @__PURE__ */ (0, $.jsxs)(S, { children: [/* @__PURE__ */ (0, $.jsx)(W, { children: /* @__PURE__ */ (0, $.jsx)(T, {
			label: "安装教程",
			children: /* @__PURE__ */ (0, $.jsx)(V, {
				variant: "secondary",
				onClick: () => void n.run("reopen", () => t(), () => e("已重新打开安装教程")),
				...K(n.busy === "reopen"),
				children: "重新打开教程"
			})
		}) }), n.error ? /* @__PURE__ */ (0, $.jsx)(x, { children: /* @__PURE__ */ (0, $.jsx)(k, { children: n.error }) }) : null] })
	});
}
function ln({ initial: e, receipt: n }) {
	let [r, i] = (0, Z.useState)(e.mode), [o, s] = (0, Z.useState)(e.interval_hours), c = f(e.error), l = (t) => {
		t.preventDefault(), e.available && c.run("save", (e) => L("/api/configuration/automatic-updates", {
			mode: r,
			interval_hours: o
		}, "POST", e), () => n("已保存配置"));
	}, u = e.available ? e.download_available ? "下载完成后在这里确认重启安装。" : void 0 : "自动更新需要由托盘管理的服务。";
	return /* @__PURE__ */ (0, $.jsxs)(t, {
		id: "automaticUpdates",
		title: "自动更新",
		onSubmit: l,
		children: [
			/* @__PURE__ */ (0, $.jsxs)(W, { children: [
				/* @__PURE__ */ (0, $.jsx)(T, {
					label: "自动检查新版本",
					children: /* @__PURE__ */ (0, $.jsx)(R, {
						"aria-label": "自动检查新版本",
						isSelected: r !== "off",
						isDisabled: !e.available,
						onChange: (e) => i(e ? "check" : "off")
					})
				}),
				/* @__PURE__ */ (0, $.jsx)(T, {
					label: "自动下载更新",
					children: /* @__PURE__ */ (0, $.jsx)(R, {
						"aria-label": "自动下载更新",
						isSelected: r === "download",
						isDisabled: !e.available || !e.download_available || r === "off",
						onChange: (e) => i(e ? "download" : "check")
					})
				}),
				/* @__PURE__ */ (0, $.jsx)(T, {
					label: "检查频率",
					description: u,
					children: /* @__PURE__ */ (0, $.jsx)(H, {
						"aria-label": "检查频率",
						selectedKey: String(o),
						isDisabled: !e.available,
						onSelectionChange: (e) => {
							e !== null && s(Number(e));
						},
						children: on.map(([e, t]) => /* @__PURE__ */ (0, $.jsx)(z, {
							id: e,
							children: t
						}, e))
					})
				})
			] }),
			c.error ? /* @__PURE__ */ (0, $.jsx)(x, {
				divided: !0,
				children: /* @__PURE__ */ (0, $.jsx)(k, { children: c.error })
			}) : null,
			/* @__PURE__ */ (0, $.jsx)(a, { children: /* @__PURE__ */ (0, $.jsx)(V, {
				type: "submit",
				disabled: !e.available,
				...K(c.busy === "save"),
				children: "保存配置"
			}) })
		]
	});
}
function un({ facts: e }) {
	return /* @__PURE__ */ (0, $.jsx)(t, {
		title: "运行信息",
		children: /* @__PURE__ */ (0, $.jsx)(j, { children: e.map((e) => /* @__PURE__ */ (0, $.jsxs)(J, {
			term: e.term,
			children: [e.value, e.download_url ? /* @__PURE__ */ (0, $.jsx)(i, {
				href: e.download_url,
				children: e.download_label
			}) : null]
		}, e.term)) })
	});
}
function dn({ uninstall: e, receipt: n }) {
	let [r, i] = (0, Z.useState)(!1), [o, s] = (0, Z.useState)(""), c = () => void A({
		title: "卸载 Peach",
		danger: !0,
		body: r ? "将退出 Peach，移除程序、开机自启、桌面图标、设置、本地数据库、观看记录、凭据和缓存。原始媒体文件保留。" : "将退出 Peach 并移除程序、开机自启和桌面图标。设置、本地数据库、观看记录与缓存保留。",
		confirmLabel: "卸载 Peach",
		onConfirm: async () => {
			let e = await L("/api/configuration/uninstall", {
				delete_data: r,
				confirmation: "卸载 Peach"
			});
			s(e.message);
		}
	}), l = o || e.message, u = [.../* @__PURE__ */ new Set([e.data_root, ...e.directories])];
	return /* @__PURE__ */ (0, $.jsxs)(t, {
		id: "uninstallPeach",
		title: "卸载 Peach",
		children: [
			e.available ? /* @__PURE__ */ (0, $.jsx)(x, { children: /* @__PURE__ */ (0, $.jsx)(w, { children: "卸载移除 Peach 程序本身，原始媒体文件保留。" }) }) : null,
			/* @__PURE__ */ (0, $.jsx)(W, { children: /* @__PURE__ */ (0, $.jsx)(T, {
				label: "完全卸载",
				description: "同时删除设置、本地数据库、观看记录、凭据和缓存",
				children: /* @__PURE__ */ (0, $.jsx)(R, {
					"aria-label": "完全卸载",
					isSelected: r,
					isDisabled: !e.full_available || !!o,
					onChange: i
				})
			}) }),
			/* @__PURE__ */ (0, $.jsx)(x, {
				divided: !0,
				children: /* @__PURE__ */ (0, $.jsx)(Y, {
					summary: "数据目录",
					children: u.map((e) => /* @__PURE__ */ (0, $.jsx)(d, {
						path: e,
						className: "text-body-2-regular text-text-secondary",
						onRevealed: n
					}, e))
				})
			}),
			/* @__PURE__ */ (0, $.jsx)(a, {
				status: l ? /* @__PURE__ */ (0, $.jsx)("p", {
					role: o ? "status" : void 0,
					children: l
				}) : null,
				children: /* @__PURE__ */ (0, $.jsx)(V, {
					variant: "danger",
					disabled: !e.available || !!o,
					onClick: c,
					children: "卸载 Peach"
				})
			})
		]
	});
}
//#endregion
//#region src/react/settings/release-updates.tsx
var fn = /* @__PURE__ */ new Set([
	"downloading",
	"verifying",
	"extracting",
	"preparing",
	"restarting",
	"installing"
]), pn = [
	65,
	75,
	90
], mn = 120;
function hn({ initial: e, initialJob: n }) {
	let [r, o] = (0, Z.useState)(e), [s, c] = (0, Z.useState)(n || {
		state: "idle",
		progress: 0
	}), [u, d] = (0, Z.useState)(""), p = f(), m = (0, Z.useRef)(!1), h = (0, Z.useRef)(!0), g = fn.has(s.state);
	(0, Z.useEffect)(() => (h.current = !0, () => {
		h.current = !1;
	}), []);
	let _ = async () => {
		let e = await L("/api/configuration/update-restart", {});
		h.current && c(e);
	}, v = () => void A({
		title: "更新已准备好",
		body: `Peach ${s.version || ""} 将在重启后安装。`,
		confirmLabel: "立即重启",
		cancelLabel: "稍后",
		onConfirm: _
	});
	(0, Z.useEffect)(() => {
		s.state !== "ready" || m.current || (m.current = !0, v());
	}, [s.state]), (0, Z.useEffect)(() => {
		let e = new AbortController(), t = fn.has(s.state) ? 1e3 : 3e4, n, r = 0, i = async () => {
			try {
				let t = await N("/api/configuration/update-status", e.signal);
				if (e.signal.aborted) return;
				c(t), r = 0, t.state === "complete" && o((e) => ({
					...e,
					current_version: t.version || e.current_version,
					state: "current",
					message: "已是最新测试版。"
				}));
				let n = await N("/api/configuration/automatic-updates", e.signal);
				!e.signal.aborted && n.result && o(n.result);
			} catch {
				r += 1, r >= mn && !e.signal.aborted && d("尚未连接到 Peach，请检查托盘后刷新页面。");
			}
			!e.signal.aborted && r < mn && (n = setTimeout(i, t));
		};
		return n = setTimeout(i, t), () => {
			e.abort(), clearTimeout(n);
		};
	}, [s.state]);
	let b = () => {
		g || (m.current = !1, d(""), p.run("download", (e) => L("/api/configuration/update", {}, "POST", e), c));
	}, S = () => void p.run("check", (e) => N("/api/configuration/updates", e), o, (t) => {
		o({
			...e,
			state: "error"
		}), p.setError(l(t));
	}), C = p.error || u, T = s.state === "downloading" && s.total ? `${((s.downloaded || 0) / 1048576).toFixed(1)} / ${(s.total / 1048576).toFixed(1)} MB` : `${s.progress}%`;
	return /* @__PURE__ */ (0, $.jsxs)(t, {
		title: "检查更新",
		aside: /* @__PURE__ */ (0, $.jsx)(y, {
			tone: C || r.state === "error" || s.state === "error" ? "error" : g ? "progress" : r.state === "available" ? "warning" : r.state === "unchecked" ? "neutral" : "success",
			children: C || r.state === "error" || s.state === "error" ? "检查未完成" : g ? "准备更新中" : s.state === "ready" ? "可安装" : r.state === "available" ? "有可用更新" : r.state === "unchecked" ? "尚未检查" : "检查完成"
		}),
		children: [
			/* @__PURE__ */ (0, $.jsxs)(j, { children: [
				/* @__PURE__ */ (0, $.jsx)(J, {
					term: "当前版本",
					children: r.current_version
				}),
				/* @__PURE__ */ (0, $.jsx)(J, {
					term: "安装方式",
					children: r.installation
				}),
				/* @__PURE__ */ (0, $.jsx)(J, {
					term: "更新通道",
					children: r.channel
				}),
				/* @__PURE__ */ (0, $.jsx)(J, {
					term: "最新版本",
					children: r.latest_version || "未取得"
				}),
				r.package_kind ? /* @__PURE__ */ (0, $.jsxs)(J, {
					term: "下载内容",
					children: [r.package_kind === "update" ? "应用更新包" : "应用与工具", r.asset_size ? ` · ${(r.asset_size / 1048576).toFixed(1)} MB` : ""]
				}) : null
			] }),
			r.package_kind === "update" ? /* @__PURE__ */ (0, $.jsx)(w, { children: "应用更新包复用已安装工具；工具缺失、损坏或版本变化时会另行下载所需工具包。" }) : r.package_kind === "full" ? /* @__PURE__ */ (0, $.jsx)(w, { children: "本次更新包含媒体工具。" }) : null,
			r.state === "unchecked" && !r.checked_at && !C && s.state === "idle" ? null : /* @__PURE__ */ (0, $.jsxs)(x, {
				divided: !0,
				children: [
					r.checked_at ? /* @__PURE__ */ (0, $.jsxs)(w, { children: ["检查于 ", (/* @__PURE__ */ new Date(r.checked_at * 1e3)).toLocaleString()] }) : null,
					r.state === "available" && !C ? /* @__PURE__ */ (0, $.jsx)(q, {
						tone: "info",
						title: "有可用更新",
						children: r.message
					}) : C || r.state === "error" ? /* @__PURE__ */ (0, $.jsx)(k, { children: C || r.message }) : r.state === "unchecked" ? null : /* @__PURE__ */ (0, $.jsx)(w, {
						role: "status",
						children: r.message
					}),
					s.state === "error" ? /* @__PURE__ */ (0, $.jsx)(k, { children: s.message }) : null,
					s.state !== "idle" && s.state !== "error" ? /* @__PURE__ */ (0, $.jsxs)("div", {
						"aria-live": "polite",
						className: "flex flex-col gap-2",
						children: [
							/* @__PURE__ */ (0, $.jsx)(ht, {
								label: "更新准备进度",
								value: s.progress,
								stops: pn
							}),
							/* @__PURE__ */ (0, $.jsxs)(w, { children: ["下载 → 校验 → 解压 → 准备安装 · ", s.message] }),
							/* @__PURE__ */ (0, $.jsx)(w, { children: T })
						]
					}) : null
				]
			}),
			/* @__PURE__ */ (0, $.jsxs)(a, {
				status: /* @__PURE__ */ (0, $.jsx)(i, {
					href: r.release_url,
					children: "查看发布页"
				}),
				children: [
					/* @__PURE__ */ (0, $.jsx)(V, {
						variant: s.state === "ready" || r.state === "available" && r.installation === "独立测试包" ? "secondary" : "primary",
						disabled: g,
						onClick: S,
						...K(p.busy === "check"),
						children: "检查更新"
					}),
					r.state === "available" && r.installation === "独立测试包" && s.state !== "ready" ? /* @__PURE__ */ (0, $.jsx)(V, {
						variant: "primary",
						onClick: b,
						...K(g || p.busy === "download"),
						children: "下载并安装"
					}) : null,
					s.state === "ready" ? /* @__PURE__ */ (0, $.jsx)(V, {
						variant: "primary",
						onClick: v,
						children: "重启安装"
					}) : null
				]
			})
		]
	});
}
//#endregion
//#region src/react/settings/general-settings.tsx
function gn({ data: e, receipt: t, panel: n }) {
	return /* @__PURE__ */ (0, $.jsxs)("div", {
		...Q(n),
		children: [
			e.updates ? /* @__PURE__ */ (0, $.jsx)(hn, {
				initial: e.updates,
				initialJob: e.update_job
			}) : null,
			e.automatic_updates ? /* @__PURE__ */ (0, $.jsx)(ln, {
				initial: e.automatic_updates,
				receipt: t
			}) : null,
			e.startup ? /* @__PURE__ */ (0, $.jsx)(_n, {
				startup: e.startup,
				receipt: t
			}) : null
		]
	});
}
function _n({ startup: e, receipt: n }) {
	let [r, i] = (0, Z.useState)(e.enabled), [o, s] = (0, Z.useState)(e.silent), [c, l] = (0, Z.useState)(e.desktop), u = f(), d = e.available && !e.desktop_message;
	return /* @__PURE__ */ (0, $.jsxs)(t, {
		title: "开机自启",
		onSubmit: (t) => {
			t.preventDefault(), e.available && u.run("save", (e) => L("/api/configuration/startup", {
				enabled: r,
				silent: o,
				desktop: c
			}, "POST", e), () => n("已保存配置"));
		},
		children: [
			/* @__PURE__ */ (0, $.jsxs)(W, { children: [
				/* @__PURE__ */ (0, $.jsx)(T, {
					label: "开机后启动 Peach",
					children: /* @__PURE__ */ (0, $.jsx)(R, {
						"aria-label": "开机后启动 Peach",
						isSelected: r,
						isDisabled: !e.available,
						onChange: i
					})
				}),
				/* @__PURE__ */ (0, $.jsx)(T, {
					label: "只启动托盘，不打开网页",
					children: /* @__PURE__ */ (0, $.jsx)(R, {
						"aria-label": "只启动托盘，不打开网页",
						isSelected: o,
						isDisabled: !e.available || !r,
						onChange: s
					})
				}),
				/* @__PURE__ */ (0, $.jsx)(T, {
					label: "在桌面创建快捷方式",
					description: e.desktop_message || void 0,
					children: /* @__PURE__ */ (0, $.jsx)(R, {
						"aria-label": "在桌面创建快捷方式",
						isSelected: c,
						isDisabled: !d,
						onChange: l
					})
				})
			] }),
			e.message || u.error ? /* @__PURE__ */ (0, $.jsxs)(x, {
				divided: !0,
				children: [e.message ? /* @__PURE__ */ (0, $.jsx)(w, { children: e.message }) : null, u.error ? /* @__PURE__ */ (0, $.jsx)(k, { children: u.error }) : null]
			}) : null,
			/* @__PURE__ */ (0, $.jsx)(a, { children: /* @__PURE__ */ (0, $.jsx)(V, {
				type: "submit",
				disabled: !e.available,
				...K(u.busy === "save"),
				children: "保存配置"
			}) })
		]
	});
}
//#endregion
//#region src/react/restart-redirect.ts
var vn = 8e3, yn = [
	{
		name: "机械硬盘，或内存 8 GB 以内",
		cache: "10–20 GiB",
		read: "256 / 128 KB",
		task: "1 个"
	},
	{
		name: "SATA SSD，内存 8–16 GB",
		cache: "20–50 GiB",
		read: "256 / 128 KB",
		task: "1–2 个"
	},
	{
		name: "NVMe SSD，内存 16 GB 以上",
		cache: "50–100 GiB",
		read: "256 / 128 KB",
		task: "2 个起步"
	}
], bn = [
	["cache", "缓存上限"],
	["read", "读取长度（默认 / 最小）"],
	["task", "同时处理视频"]
];
function xn() {
	return /* @__PURE__ */ (0, $.jsx)("div", {
		className: "@container flex flex-col gap-3",
		children: /* @__PURE__ */ (0, $.jsxs)(Y, {
			summary: "CloudDrive 设置帮助",
			children: [
				/* @__PURE__ */ (0, $.jsxs)(w, { children: ["先将 CloudDrive2 或 OpenList 中的网盘挂载为本机文件夹，再在这里选择。", /* @__PURE__ */ (0, $.jsx)(i, {
					href: "https://www.clouddrive2.com/help.html",
					children: "挂载帮助"
				})] }),
				/* @__PURE__ */ (0, $.jsx)(w, { children: "缓存按所在硬盘和可用内存选起步值，再根据播放表现调整。" }),
				/* @__PURE__ */ (0, $.jsx)(w, { children: "文件操作需要挂载工具和网盘账号授予写入权限。光鸭云盘的上传、建文件夹、改名和移动需要 CloudDrive2 v1.1.0 或更高版本，删除和复制暂不支持。" }),
				/* @__PURE__ */ (0, $.jsx)("ul", {
					"aria-label": "按缓存所在硬盘分档",
					className: "flex flex-col gap-2",
					children: yn.map((e) => /* @__PURE__ */ (0, $.jsxs)("li", {
						className: "flex flex-col gap-2 rounded-2lg border border-separator-border bg-background-primary-default p-3",
						children: [/* @__PURE__ */ (0, $.jsx)("p", {
							className: "text-body-medium text-text-primary",
							children: e.name
						}), /* @__PURE__ */ (0, $.jsx)("dl", {
							className: "inline-grid grid-cols-1 gap-2 @md:grid-cols-3",
							children: bn.map(([t, n]) => /* @__PURE__ */ (0, $.jsxs)("div", {
								className: "flex flex-col",
								children: [/* @__PURE__ */ (0, $.jsx)("dt", {
									className: "text-caption-1-regular text-text-secondary",
									children: n
								}), /* @__PURE__ */ (0, $.jsx)("dd", {
									className: "text-body-regular text-text-primary",
									children: e[t]
								})]
							}, t))
						})]
					}, e.name))
				}),
				/* @__PURE__ */ (0, $.jsxs)("ul", {
					className: "flex list-disc flex-col gap-1 pl-5 text-body-2-regular text-text-secondary",
					children: [
						/* @__PURE__ */ (0, $.jsx)("li", { children: "缓存上限和清理方式填在 CloudDrive「设置」里，清理方式选 LRU。上限不要填 0，系统盘至少留 40 GiB；填完重开设置页确认存住了。" }),
						/* @__PURE__ */ (0, $.jsx)("li", { children: "读取长度和下载线程填在每个网盘各自的下载设置里，线程都从 2 开始。" }),
						/* @__PURE__ */ (0, $.jsx)("li", { children: "Buffer Cache 占内存，磁盘缓存和文件夹缓存占硬盘，改一个管不住另外两个。" })
					]
				}),
				/* @__PURE__ */ (0, $.jsx)(w, { children: /* @__PURE__ */ (0, $.jsx)(i, {
					href: "https://github.com/peach-mitao/peach/blob/master/docs/CLOUDDRIVE.md",
					children: "完整配置与调优说明"
				}) })
			]
		})
	});
}
//#endregion
//#region src/react/settings/cloud-proxy-settings.tsx
var Sn = "/api/configuration/cloud-proxies", Cn = [
	["direct", "直连"],
	["system", "跟随系统"],
	["http", "HTTP 代理"],
	["socks5", "SOCKS5 代理"]
];
function wn({ receipt: e }) {
	let [n, r] = (0, Z.useState)(null), [i, s] = (0, Z.useState)(!0), c = (0, Z.useRef)(/* @__PURE__ */ new Set()), l = (0, Z.useRef)(/* @__PURE__ */ new Set()), [u, d] = (0, Z.useState)(!1), p = (0, Z.useRef)(() => void 0), m = f(), h = () => {
		l.current.size || m.run("refresh", (e) => N(Sn, e), (e) => {
			c.current.clear(), r(e), s(!1);
		}, (e) => {
			s(!1), m.setError(e instanceof Error ? e.message : "无法读取网盘代理");
		});
	};
	p.current = h, (0, Z.useEffect)(() => {
		p.current();
		let e = () => {
			c.current.size || p.current();
		};
		return window.addEventListener("focus", e), () => window.removeEventListener("focus", e);
	}, []);
	let g = (0, Z.useRef)(null);
	return (0, Z.useLayoutEffect)(() => {
		!i && g.current && it("cloud-proxy", g.current.offsetHeight);
	}, [i, n]), /* @__PURE__ */ (0, $.jsxs)(t, {
		title: "CloudDrive 代理",
		children: [/* @__PURE__ */ (0, $.jsxs)(x, { children: [/* @__PURE__ */ (0, $.jsx)(w, { children: ue }), /* @__PURE__ */ (0, $.jsxs)("div", {
			ref: g,
			className: "flex min-w-0 flex-col gap-4",
			children: [
				i ? /* @__PURE__ */ (0, $.jsx)("div", {
					"data-skeleton": !0,
					"aria-busy": "true",
					"aria-label": "正在读取网盘代理",
					children: /* @__PURE__ */ (0, $.jsx)("div", {
						className: "h-(--remembered-h) w-full rounded-2lg bg-background-tertiary-default",
						style: { "--remembered-h": `${ge("cloud-proxy", 96)}px` }
					})
				}) : null,
				m.error ? /* @__PURE__ */ (0, $.jsxs)(q, {
					tone: "error",
					title: "没有读取配置",
					children: [
						m.error,
						" ",
						/* @__PURE__ */ (0, $.jsx)(I, {
							href: "/settings/downloads",
							size: "small",
							children: "下载设置"
						})
					]
				}) : null,
				n?.configured === !1 ? /* @__PURE__ */ (0, $.jsxs)(w, { children: ["填写 CloudDrive2 地址和 API 令牌后，在这里设置各网盘账号的代理。 ", /* @__PURE__ */ (0, $.jsx)(I, {
					href: "/settings/downloads",
					size: "small",
					children: "下载设置"
				})] }) : n?.accounts.length === 0 && !n.unlinked?.length ? /* @__PURE__ */ (0, $.jsx)(w, { children: "还没有使用 CloudDrive 的媒体库。" }) : null,
				n?.unlinked?.map((e) => /* @__PURE__ */ (0, $.jsxs)("div", {
					className: "flex min-w-0 flex-col gap-1",
					children: [/* @__PURE__ */ (0, $.jsx)(o, { children: /* @__PURE__ */ (0, $.jsxs)("span", {
						className: "inline-flex items-center gap-2",
						children: [/* @__PURE__ */ (0, $.jsx)(U, { mark: Et(e.location) }), e.name]
					}) }), /* @__PURE__ */ (0, $.jsx)(w, { children: "尚未匹配 CloudDrive 账号" })]
				}, e.root)),
				n?.accounts.map((t) => /* @__PURE__ */ (0, $.jsx)(Tn, {
					initial: t,
					receipt: e,
					onDirty: () => c.current.add(t.id),
					onSaving: (e) => {
						e ? l.current.add(t.id) : l.current.delete(t.id), d(!!l.current.size);
					},
					onSaved: (e) => {
						c.current.delete(e.id), r((t) => t && {
							...t,
							accounts: t.accounts.map((t) => t.id === e.id ? e : t)
						});
					}
				}, t.id + t.revision))
			]
		})] }), /* @__PURE__ */ (0, $.jsx)(a, { children: /* @__PURE__ */ (0, $.jsx)(V, {
			variant: "secondary",
			disabled: u,
			onClick: h,
			...K(m.busy === "refresh"),
			children: "重新读取"
		}) })]
	});
}
function Tn({ initial: e, receipt: t, onDirty: n, onSaved: r, onSaving: i }) {
	let [a, s] = (0, Z.useState)(e), [c, l] = (0, Z.useState)([]), u = a.libraries?.map((e) => e.name).join("、") || a.name, d = f(), p = (e, t) => {
		s((n) => ({
			...n,
			[e]: t
		})), l((t) => t.includes(e) ? t : [...t, e]), n();
	};
	return /* @__PURE__ */ (0, $.jsxs)("form", {
		"aria-label": `${u} 代理`,
		onSubmit: (e) => {
			e.preventDefault(), i(!0), d.run("save", (e) => L(Sn, {
				id: a.id,
				revision: a.revision,
				...c.includes("api") ? { api: a.api } : {},
				...c.includes("data") ? { data: a.data } : {}
			}, "POST", e), (e) => {
				s(e), l([]), r(e), t("已保存 CloudDrive 代理");
			}).finally(() => i(!1));
		},
		className: "flex min-w-0 flex-col gap-4 border-t border-separator-border pt-4",
		children: [
			/* @__PURE__ */ (0, $.jsx)(o, { children: /* @__PURE__ */ (0, $.jsxs)("span", {
				className: "inline-flex items-center gap-2",
				children: [/* @__PURE__ */ (0, $.jsx)(U, { mark: Et(a.libraries?.[0]?.location || (a.cloud === "115open" ? "115" : a.cloud.toLowerCase())) }), u]
			}) }),
			/* @__PURE__ */ (0, $.jsxs)(w, { children: [
				a.name,
				" · ",
				a.path
			] }),
			/* @__PURE__ */ (0, $.jsx)(En, {
				label: "数据代理",
				value: a.data,
				disabled: !a.writable || !!d.busy,
				onChange: (e) => p("data", e)
			}),
			/* @__PURE__ */ (0, $.jsx)(En, {
				label: "API 代理",
				value: a.api,
				disabled: !a.writable || !!d.busy,
				onChange: (e) => p("api", e)
			}),
			a.writable ? null : /* @__PURE__ */ (0, $.jsx)(w, { children: "API 令牌需要“修改云盘”权限才能保存。" }),
			d.error ? /* @__PURE__ */ (0, $.jsx)(q, {
				tone: "error",
				title: "没有保存",
				children: d.error
			}) : null,
			/* @__PURE__ */ (0, $.jsx)("div", {
				className: "flex justify-end",
				children: /* @__PURE__ */ (0, $.jsx)(V, {
					type: "submit",
					disabled: !a.writable || !c.length,
					...K(d.busy === "save"),
					children: "保存配置"
				})
			})
		]
	});
}
function En({ label: e, value: t, disabled: n, onChange: r }) {
	let i = t.mode === "http" || t.mode === "socks5";
	return /* @__PURE__ */ (0, $.jsxs)("div", {
		className: "flex min-w-0 flex-col gap-3",
		children: [
			/* @__PURE__ */ (0, $.jsx)(o, { children: e }),
			/* @__PURE__ */ (0, $.jsxs)(H, {
				"aria-label": e,
				selectedKey: t.mode,
				isDisabled: n,
				onSelectionChange: (e) => {
					e && r({
						...t,
						mode: String(e)
					});
				},
				children: [t.mode === "unknown" ? /* @__PURE__ */ (0, $.jsx)(z, {
					id: "unknown",
					children: "无法识别的代理类型"
				}) : null, Cn.map(([e, t]) => /* @__PURE__ */ (0, $.jsx)(z, {
					id: e,
					children: t
				}, e))]
			}),
			i ? /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [/* @__PURE__ */ (0, $.jsxs)("div", {
				className: "flex flex-wrap gap-3",
				children: [/* @__PURE__ */ (0, $.jsx)(G, {
					className: "min-w-40 flex-1",
					label: `${e}地址`,
					value: t.host,
					autoComplete: "off",
					isDisabled: n,
					onChange: (e) => r({
						...t,
						host: e
					})
				}), /* @__PURE__ */ (0, $.jsx)(G, {
					className: "w-full sm:w-28",
					label: `${e}端口`,
					value: t.port ? String(t.port) : "",
					inputMode: "numeric",
					isDisabled: n,
					onChange: (e) => r({
						...t,
						port: Number(e)
					})
				})]
			}), /* @__PURE__ */ (0, $.jsxs)(Y, {
				summary: "代理认证",
				children: [
					/* @__PURE__ */ (0, $.jsx)(G, {
						label: `${e}用户名`,
						value: t.username,
						autoComplete: "off",
						isDisabled: n,
						onChange: (e) => r({
							...t,
							username: e
						})
					}),
					/* @__PURE__ */ (0, $.jsx)(G, {
						label: `${e}密码`,
						type: "password",
						value: t.password || "",
						autoComplete: "new-password",
						isDisabled: n,
						placeholder: t.password_set ? "已保存，留空不改" : "可选",
						onChange: (e) => r({
							...t,
							password: e
						})
					}),
					t.password_set ? /* @__PURE__ */ (0, $.jsx)(ne, {
						isSelected: !!t.clear_password,
						isDisabled: n,
						onChange: (e) => r({
							...t,
							clear_password: e
						}),
						children: "清除已保存的密码"
					}) : null
				]
			})] }) : null
		]
	});
}
//#endregion
//#region src/react/settings/library-icon-picker.tsx
var Dn = [
	["", "自动识别"],
	["hard-drive", "磁盘"],
	["database", "资料库"],
	["heart", "心动"],
	["heart-hand", "亲密"],
	["flame", "热情"],
	["cherry", "樱桃"],
	["lollipop", "甜心"],
	["candy", "糖果"],
	["banana", "香蕉"],
	["droplets", "湿润"],
	["venus", "女性"],
	["mars", "男性"],
	["venus-and-mars", "情侣"],
	["gem", "精选"],
	["crown", "女王"],
	["ribbon", "丝带"],
	["shirt", "制服"],
	["graduation-cap", "学生"],
	["stethoscope", "护士"],
	["glasses", "眼镜"],
	["footprints", "足迹"],
	["hand", "手部"],
	["flower", "花朵"],
	["venetian-mask", "角色扮演"],
	["rabbit", "兔女郎"],
	["paw-print", "兽耳"],
	["dumbbell", "健身"],
	["bed-double", "卧室"],
	["bath", "浴室"],
	["key-round", "私密"],
	["wine", "微醺"],
	["cigarette", "烟"],
	["moon", "夜色"],
	["sparkles", "幻想"],
	["camera", "写真"],
	["video", "影片"],
	["film", "电影"],
	["image", "图集"],
	["gamepad-2", "游戏"],
	["star", "收藏"],
	["tags", "主题"]
];
function On(e) {
	let t = e === "local" ? "" : M[e];
	return t ? [t, "自动识别"] : ["hard-drive", "默认"];
}
var kn = "auto";
function An({ value: e, label: t, kind: n = "local", onChange: r }) {
	let i = (0, Z.useRef)(null), [a, o] = (0, Z.useState)(!1), [s, c] = (0, Z.useState)(e), [l, u] = On(n);
	return /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [/* @__PURE__ */ (0, $.jsx)(V, {
		ref: i,
		variant: "secondary",
		className: "self-start",
		"aria-label": t,
		"aria-haspopup": "dialog",
		"aria-expanded": a,
		onClick: () => {
			c(e), o(!0);
		},
		children: /* @__PURE__ */ (0, $.jsxs)("span", {
			"data-icon-choice": !0,
			className: "flex items-center gap-2",
			children: [/* @__PURE__ */ (0, $.jsx)(U, { mark: e || l }), ((e) => e && Dn.find(([t]) => t === e)?.[1] || u)(e)]
		})
	}), /* @__PURE__ */ (0, $.jsx)(Ie, {
		triggerRef: i,
		isOpen: a,
		onOpenChange: o,
		placement: "bottom start",
		offset: 4,
		className: Ce,
		children: /* @__PURE__ */ (0, $.jsxs)(he, {
			"aria-label": `${t}可选图标`,
			className: "flex w-72 flex-col gap-3 outline-none",
			children: [
				/* @__PURE__ */ (0, $.jsx)(be, {
					slot: "title",
					className: "px-1 text-body-medium text-text-primary",
					children: "选择媒体库图标"
				}),
				/* @__PURE__ */ (0, $.jsx)(Ge, {
					"aria-label": "可选图标",
					value: s || kn,
					onChange: (e) => c(e === kn ? "" : e),
					className: "inline-grid grid-cols-7 gap-1",
					children: Dn.map(([e, t]) => /* @__PURE__ */ (0, $.jsx)(rt, {
						value: e || kn,
						"aria-label": e ? t : u,
						className: "flex h-10 cursor-pointer items-center justify-center rounded-lg text-foreground-icon-secondary outline-none hover:bg-dropdown-item-hover-background focus-visible:ring-2 focus-visible:ring-border-focus-ring data-selected:bg-dropdown-item-hover-background data-selected:text-text-primary",
						children: /* @__PURE__ */ (0, $.jsx)(U, { mark: e || l })
					}, e || kn))
				}),
				/* @__PURE__ */ (0, $.jsxs)("div", {
					className: "flex justify-end gap-2 border-t border-separator-border pt-2.5",
					children: [/* @__PURE__ */ (0, $.jsx)(V, {
						variant: "secondary",
						onClick: () => o(!1),
						children: "取消"
					}), /* @__PURE__ */ (0, $.jsx)(V, {
						disabled: s === e,
						onClick: () => {
							r(s), o(!1);
						},
						children: "应用"
					})]
				})
			]
		})
	})] });
}
//#endregion
//#region src/react/settings/library-policy-settings.tsx
var jn = [
	["probe", "读取视频信息"],
	["metadata", "联网补资料"],
	["cover", "联网补封面"],
	["people", "联网补人物图片"],
	["preview", "生成九宫格预览"]
], Mn = [
	"probe",
	"metadata",
	"cover",
	"people",
	"preview"
], Nn = [
	[
		"auto",
		"自动补全",
		"缺什么联网补什么"
	],
	[
		"local",
		"仅使用本地资料",
		"不联网，只用本地 NFO 和图片"
	],
	[
		"custom",
		"自定义",
		"逐项选择要做的步骤"
	]
];
function Pn() {
	return /* @__PURE__ */ (0, $.jsxs)("div", {
		"data-policy-legend": "",
		className: "flex flex-col gap-1",
		children: [/* @__PURE__ */ (0, $.jsx)(w, { children: Qe }), /* @__PURE__ */ (0, $.jsxs)(Y, {
			summary: "三种处理方式对比",
			children: [/* @__PURE__ */ (0, $.jsxs)("table", {
				"data-policy-matrix": "",
				className: "text-body-2-regular",
				children: [/* @__PURE__ */ (0, $.jsx)("thead", { children: /* @__PURE__ */ (0, $.jsxs)("tr", { children: [/* @__PURE__ */ (0, $.jsx)("th", {
					scope: "col",
					children: /* @__PURE__ */ (0, $.jsx)(Ve, { children: "步骤" })
				}), lt.map((e) => /* @__PURE__ */ (0, $.jsx)("th", {
					scope: "col",
					children: e
				}, e))] }) }), /* @__PURE__ */ (0, $.jsx)("tbody", { children: Oe.map(([e, ...t]) => /* @__PURE__ */ (0, $.jsxs)("tr", { children: [/* @__PURE__ */ (0, $.jsx)("th", {
					scope: "row",
					children: e
				}), t.map((e, t) => /* @__PURE__ */ (0, $.jsx)("td", {
					"data-policy-cell": e === "✓" ? "on" : e === "—" ? "off" : "choice",
					children: e === "✓" ? /* @__PURE__ */ (0, $.jsx)("span", {
						"aria-label": "做",
						children: "✓"
					}) : e === "—" ? /* @__PURE__ */ (0, $.jsx)("span", {
						"aria-label": "不做",
						children: "—"
					}) : e
				}, lt[t]))] }, e)) })]
			}), /* @__PURE__ */ (0, $.jsx)(w, { children: xe })]
		})]
	});
}
function Fn({ name: e, value: t, onChange: n }) {
	return /* @__PURE__ */ (0, $.jsx)(b, {
		className: "w-full",
		"aria-label": `${e} 处理方式`,
		selectedKey: t,
		prefix: "处理方式",
		renderValue: /* @__PURE__ */ (0, $.jsx)("span", {
			className: "truncate",
			children: Nn.find(([e]) => e === t)?.[1]
		}),
		onSelectionChange: (e) => n(String(e)),
		children: Nn.map(([e, t, n]) => /* @__PURE__ */ (0, $.jsx)(z, {
			id: e,
			textValue: t,
			children: /* @__PURE__ */ (0, $.jsxs)("span", {
				className: "flex min-w-0 flex-col",
				children: [/* @__PURE__ */ (0, $.jsx)("span", { children: t }), /* @__PURE__ */ (0, $.jsx)("span", {
					className: "text-body-2-regular text-text-secondary whitespace-normal",
					children: n
				})]
			})
		}, e))
	});
}
function In({ name: e, value: t, onChange: n }) {
	return /* @__PURE__ */ (0, $.jsx)(Y, {
		defaultOpen: !0,
		summary: `${e} 的处理步骤（${t.length}/${jn.length}）`,
		children: /* @__PURE__ */ (0, $.jsx)("div", {
			className: "flex flex-wrap gap-x-6 gap-y-2",
			role: "group",
			"aria-label": `${e} 处理步骤`,
			children: jn.map(([e, r]) => /* @__PURE__ */ (0, $.jsx)(ne, {
				isSelected: t.includes(e),
				onChange: (r) => n(r ? [...t, e] : t.filter((t) => t !== e)),
				children: r
			}, e))
		})
	});
}
function Ln({ id: e, name: t, value: n, onChange: r }) {
	let i = (0, Z.useRef)(null), [a, o] = (0, Z.useState)(!1), s = v.find(([e]) => e === n)?.[1] || "无颜色", c = (t) => {
		r(t), ce(e, t), o(!1);
	};
	return /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [/* @__PURE__ */ (0, $.jsxs)("button", {
		ref: i,
		type: "button",
		"data-glow-chip": "",
		"data-library-color-trigger": "",
		"aria-haspopup": "dialog",
		"aria-expanded": a,
		"aria-label": `${t || "未命名媒体库"} 来源色：${s}`,
		title: s,
		onClick: () => o(!0),
		children: [
			/* @__PURE__ */ (0, $.jsx)("span", {
				"aria-hidden": !0,
				className: "text-text-tertiary",
				children: "来源色"
			}),
			n ? /* @__PURE__ */ (0, $.jsx)("span", {
				"data-glow-ball": "",
				"aria-hidden": "true",
				"data-accent-ball": n
			}) : /* @__PURE__ */ (0, $.jsx)("span", {
				"data-glow-ball": "",
				"data-library-none": "",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, $.jsx)("span", { children: s })
		]
	}), /* @__PURE__ */ (0, $.jsx)(ot, {
		getContainer: () => D(i.current),
		children: /* @__PURE__ */ (0, $.jsx)(Ie, {
			triggerRef: i,
			isOpen: a,
			onOpenChange: o,
			placement: "bottom start",
			offset: 8,
			containerPadding: 12,
			className: Ce,
			children: /* @__PURE__ */ (0, $.jsxs)(he, {
				"aria-label": `${t || "未命名媒体库"} 来源色`,
				className: "outline-none",
				children: [/* @__PURE__ */ (0, $.jsx)("p", {
					className: "px-1 pb-2 text-body-medium text-text-primary",
					children: "选择来源色"
				}), /* @__PURE__ */ (0, $.jsxs)("div", {
					"data-accent-grid": "",
					"data-library-colors": "",
					role: "group",
					children: [/* @__PURE__ */ (0, $.jsx)("button", {
						type: "button",
						"data-glow-chip": "",
						"aria-pressed": !n,
						title: "无颜色",
						"aria-label": "无颜色",
						onClick: () => c(""),
						children: /* @__PURE__ */ (0, $.jsx)("span", {
							"data-glow-ball": "",
							"data-library-none": "",
							"aria-hidden": "true"
						})
					}), v.map(([e, t]) => /* @__PURE__ */ (0, $.jsx)("button", {
						type: "button",
						"data-glow-chip": "",
						"aria-pressed": e === n,
						title: t,
						"aria-label": t,
						onClick: () => c(e),
						children: /* @__PURE__ */ (0, $.jsx)("span", {
							"data-glow-ball": "",
							"aria-hidden": "true",
							"data-accent-ball": e
						})
					}, e))]
				})]
			})
		})
	})] });
}
//#endregion
//#region src/react/settings/push-discovery-settings.tsx
var Rn = "/api/configuration/push-discovery", zn = "/api/configuration/push-discovery/secret";
function Bn({ initial: e, receipt: n }) {
	let [r, i] = (0, Z.useState)(e), [s, c] = (0, Z.useState)(e.prefixes), [u, d] = (0, Z.useState)(""), p = f(), m = r.media_roots, [h, g] = (0, Z.useState)(e), _ = (e, t) => {
		i(e), g(e), c(e.prefixes), d(""), n(t);
	}, v = (e, t) => c((n) => n.map((n, r) => r === e ? {
		...n,
		...t
	} : n)), S = (e) => {
		e.preventDefault();
		let t = {
			enabled: r.enabled,
			watch_local: r.watch_local,
			cloud: r.cloud,
			prefixes: s
		};
		p.run("save", (e) => L(Rn, t, "POST", e), (e) => _(e, "已保存配置"), (e) => d(l(e)));
	}, C = () => {
		p.run("secret", (e) => L(zn, {}, "POST", e), (e) => _(e, "已更换共享密钥"), (e) => d(l(e)));
	}, E = `已入库 ${h.queue.ingested} 个文件` + (h.queue.failed ? `，${h.queue.failed} 个入库失败` : "") + (h.queue.pending ? `，队列里还有 ${h.queue.pending} 条` : ""), D = h.local_running ? `正在监视 ${h.local_roots.join("、")}` : h.local_message || "没有运行";
	return /* @__PURE__ */ (0, $.jsxs)(t, {
		id: "pushDiscovery",
		title: "自动发现新文件",
		onSubmit: S,
		children: [
			/* @__PURE__ */ (0, $.jsx)(x, { children: /* @__PURE__ */ (0, $.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [/* @__PURE__ */ (0, $.jsx)("span", {
					className: "text-body-regular text-text-secondary",
					children: "本机监视"
				}), /* @__PURE__ */ (0, $.jsx)(y, {
					tone: !h.enabled || !h.watch_local ? "neutral" : h.local_running ? "progress" : "warning",
					children: !h.enabled || !h.watch_local ? "未启用" : h.local_running ? "运行中" : "未运行"
				})]
			}) }),
			/* @__PURE__ */ (0, $.jsxs)(W, { children: [
				/* @__PURE__ */ (0, $.jsx)(T, {
					label: "发现新文件后自动入库",
					description: h.enabled ? E : void 0,
					children: /* @__PURE__ */ (0, $.jsx)(R, {
						"aria-label": "发现新文件后自动入库",
						isSelected: r.enabled,
						isDisabled: !r.available,
						onChange: (e) => i({
							...r,
							enabled: e
						})
					})
				}),
				/* @__PURE__ */ (0, $.jsx)(T, {
					label: "监视本机文件夹",
					description: h.enabled && h.watch_local ? D : void 0,
					children: /* @__PURE__ */ (0, $.jsx)(R, {
						"aria-label": "监视本机文件夹",
						isSelected: r.watch_local,
						isDisabled: !r.available || !r.enabled,
						onChange: (e) => i({
							...r,
							watch_local: e
						})
					})
				}),
				/* @__PURE__ */ (0, $.jsx)(T, {
					label: "接收 CloudDrive2 通知",
					children: /* @__PURE__ */ (0, $.jsx)(R, {
						"aria-label": "接收 CloudDrive2 通知",
						isSelected: r.cloud,
						isDisabled: !r.available || !r.enabled,
						onChange: (e) => i({
							...r,
							cloud: e
						})
					})
				}),
				h.enabled && h.cloud ? /* @__PURE__ */ (0, $.jsx)(T, {
					label: "Webhook 配置",
					description: h.config_toml ? "贴进 CloudDrive2「设置 → Webhooks」，需要会员；更换密钥后要重贴。" : h.origin ? "还没有共享密钥，保存配置后生成。" : "要先有 CloudDrive2 能访问的局域网地址才能生成。"
				}) : null
			] }),
			h.enabled && h.queue.last_error ? /* @__PURE__ */ (0, $.jsx)(x, {
				divided: !0,
				children: /* @__PURE__ */ (0, $.jsx)(q, {
					tone: "error",
					title: "最近一次入库失败",
					children: h.queue.last_error
				})
			}) : null,
			h.enabled && h.cloud && h.config_toml ? /* @__PURE__ */ (0, $.jsx)(x, {
				divided: !0,
				children: /* @__PURE__ */ (0, $.jsx)("div", {
					className: "flex flex-col gap-3",
					children: /* @__PURE__ */ (0, $.jsxs)(Y, {
						summary: "查看配置",
						children: [/* @__PURE__ */ (0, $.jsx)(gt, {
							code: h.config_toml,
							language: "toml",
							label: "CloudDrive2 配置",
							bounded: !1,
							copyLabel: "复制配置",
							onCopy: () => n("已复制 CloudDrive2 配置")
						}), /* @__PURE__ */ (0, $.jsx)(w, { children: "Windows 桌面版粘贴后显示「无效」时，把这段存成 .toml 文件，放进 %LOCALAPPDATA%\\CloudDrive.WinUI\\webhooks\\ 目录。" })]
					})
				})
			}) : null,
			r.enabled && r.cloud ? /* @__PURE__ */ (0, $.jsx)(x, {
				divided: !0,
				children: /* @__PURE__ */ (0, $.jsxs)("div", {
					className: "flex flex-col gap-3",
					children: [
						/* @__PURE__ */ (0, $.jsx)(o, { children: "云端路径前缀" }),
						/* @__PURE__ */ (0, $.jsx)("div", {
							role: "group",
							"aria-label": "云端路径前缀",
							className: "flex flex-col gap-3",
							children: s.map((e, t) => /* @__PURE__ */ (0, $.jsxs)("div", {
								className: "flex items-start gap-2",
								children: [
									/* @__PURE__ */ (0, $.jsx)(G, {
										className: "min-w-0 flex-1",
										"aria-label": `云端路径前缀 ${t + 1}`,
										placeholder: "/115",
										autoComplete: "off",
										maxLength: 200,
										value: e.prefix,
										onChange: (e) => v(t, { prefix: e })
									}),
									/* @__PURE__ */ (0, $.jsx)(b, {
										"aria-label": `前缀 ${t + 1} 对应的媒体根`,
										prefix: "对应目录",
										selectedKey: e.root,
										onSelectionChange: (e) => {
											e !== null && v(t, { root: String(e) });
										},
										children: m.map((e) => /* @__PURE__ */ (0, $.jsx)(z, {
											id: e,
											children: e
										}, e))
									}),
									/* @__PURE__ */ (0, $.jsx)(V, {
										variant: "danger",
										iconOnly: !0,
										leadingIcon: fe,
										"aria-label": "移除这一条",
										onClick: () => c((e) => e.filter((e, n) => n !== t))
									})
								]
							}, t))
						}),
						/* @__PURE__ */ (0, $.jsx)("div", { children: /* @__PURE__ */ (0, $.jsx)(V, {
							variant: "secondary",
							onClick: () => c((e) => [...e, {
								prefix: "",
								root: m[0] ?? ""
							}]),
							children: "添加前缀"
						}) })
					]
				})
			}) : null,
			u || p.error ? /* @__PURE__ */ (0, $.jsx)(x, {
				divided: !0,
				children: /* @__PURE__ */ (0, $.jsx)(k, { children: u || p.error })
			}) : null,
			/* @__PURE__ */ (0, $.jsxs)(a, { children: [h.enabled && h.cloud && h.config_toml ? /* @__PURE__ */ (0, $.jsx)(V, {
				variant: "secondary",
				onClick: C,
				disabled: !r.available,
				...K(p.busy === "secret"),
				children: "更换密钥"
			}) : null, /* @__PURE__ */ (0, $.jsx)(V, {
				type: "submit",
				disabled: !r.available,
				...K(p.busy === "save"),
				children: "保存配置"
			})] })
		]
	});
}
//#endregion
//#region src/react/settings/media-settings.tsx
var Vn = (e) => _t.find(([t]) => t === e)?.[1] ?? e, Hn = (e) => e.library_icon || On(e.location)[0], Un = async (e) => (await L(pt, { initial: e })).path, Wn = (e) => ({
	library_id: e.library_id,
	library: e.library,
	library_icon: e.library_icon,
	library_color: e.library_color,
	library_policy: e.library_policy,
	library_stages: e.library_stages
}), Gn = (e) => e.library_stages ? Mn.filter((t) => e.library_stages.split(",").includes(t)) : [], Kn = (e = "") => ({
	path: e,
	location: "local",
	root: "",
	library_id: u(),
	library: "",
	library_icon: "",
	library_color: "",
	library_policy: "auto",
	library_stages: "",
	cost: "free"
});
function qn(e) {
	let t = e.media_sources?.filter((e) => _t.some(([t]) => t === e.location));
	return t?.length ? t.map((e) => ({
		path: e.path,
		location: e.location,
		root: e.root,
		library: e.library || "",
		library_icon: e.library_icon || "",
		library_color: e.library_color || "",
		library_policy: e.library_policy || "auto",
		library_stages: e.library_stages || "",
		root_id: e.root_id,
		library_id: e.library_id || u(),
		cost: e.cost ?? tt(e.location)
	})) : (e.media_dirs.length ? e.media_dirs : [""]).map((e) => Kn(e));
}
var Jn = (e) => !(e instanceof p) || e.status !== 400 ? null : e.body?.errors ?? null;
function Yn({ data: e, receipt: t, panel: n }) {
	let r = !!e.media_sources?.some((e) => bt(e.location));
	(0, Z.useEffect)(() => {
		if (!e.editable) return;
		let t = /* @__PURE__ */ new Map();
		for (let n of qn(e)) t.set(n.library_id, (t.get(n.library_id) ?? 0) + 1);
		Ke({
			folders: [...t.values()],
			cloud: r,
			discovery: !!e.push_discovery
		});
	}, [e, r]);
	let i = (0, Z.useRef)(null);
	return (0, Z.useLayoutEffect)(() => {
		i.current && it("push-discovery", i.current.offsetHeight);
	}), /* @__PURE__ */ (0, $.jsxs)("div", {
		...Q(n),
		children: [
			e.editable ? /* @__PURE__ */ (0, $.jsx)(Xn, {
				data: e,
				receipt: t
			}) : /* @__PURE__ */ (0, $.jsx)(q, {
				tone: "neutral",
				title: "只读",
				children: e.notice
			}),
			e.editable ? null : /* @__PURE__ */ (0, $.jsx)(Qn, { data: e }),
			r ? /* @__PURE__ */ (0, $.jsx)(wn, { receipt: t }) : null,
			e.push_discovery ? /* @__PURE__ */ (0, $.jsx)("div", {
				ref: i,
				children: /* @__PURE__ */ (0, $.jsx)(Bn, {
					initial: e.push_discovery,
					receipt: t
				})
			}) : null
		]
	});
}
function Xn({ data: e, receipt: n }) {
	let { rows: r, edit: o, add: s, remove: c, errors: d, setErrors: p, picking: m, pick: h, inputRef: g } = yt({
		initial: () => qn(e),
		blank: () => Kn(),
		pickFolder: Un,
		describe: l
	}), [_, v] = (0, Z.useState)(!1), [y, b] = (0, Z.useState)(!1), [S, C] = (0, Z.useState)(""), [T, E] = (0, Z.useState)(null), D = (0, Z.useRef)(e.revision), O = f();
	He();
	let k = (e, t) => {
		r.forEach((n, i) => {
			n.library_id === r[e].library_id && o(i, t);
		});
	}, A = [...r.reduce((e, t) => e.has(t.library_id) ? e : e.set(t.library_id, t), /* @__PURE__ */ new Map()).values()], [ee, j] = (0, Z.useState)(null);
	(0, Z.useEffect)(() => {
		if (!ee) return;
		let e = document.querySelector(`[data-library-key="${CSS.escape(ee)}"] [data-library-head] input`);
		e?.scrollIntoView({ block: "center" }), e?.focus(), j(null);
	}, [ee]);
	let M = (e, t) => {
		let n = r.find((e) => e.library_id === t);
		if (n) {
			o(e, Wn(n));
			return;
		}
		let i = u();
		o(e, {
			library_id: i,
			library: "",
			library_icon: "",
			library_color: "",
			library_policy: "auto",
			library_stages: ""
		}), j(i);
	};
	(0, Z.useEffect)(() => {
		if (!T) return;
		let e = setTimeout(() => location.assign(T.url), vn);
		return () => clearTimeout(e);
	}, [T]);
	let N = (t) => {
		t.preventDefault();
		let i = r.findIndex((e) => !e.cost);
		if (i >= 0) {
			b(!0);
			let e = t.currentTarget;
			requestAnimationFrame(() => e.querySelector(`[data-media-read-policy="${i}"] button`)?.focus());
		} else C(""), O.run("save", (t) => L(pe, {
			revision: D.current,
			media_dirs: r.map((e) => e.path),
			...e.media_sources ? { media_sources: r } : {},
			port: String(e.port),
			scan_now: _
		}, "POST", t), (e) => {
			D.current = e.revision, p([]), n("已保存配置"), E(e);
		}, (e) => {
			let t = Jn(e);
			p(t?.media_dirs ?? []), (!t || t.port) && C(t?.port || l(e));
		});
	};
	if (T) return /* @__PURE__ */ (0, $.jsx)(t, {
		title: "媒体库与目录",
		children: /* @__PURE__ */ (0, $.jsx)(x, { children: /* @__PURE__ */ (0, $.jsxs)(q, {
			tone: "success",
			title: "配置已保存",
			children: [
				"Peach 正在重新启动。稍后自动跳转，或点击",
				/* @__PURE__ */ (0, $.jsx)(I, {
					href: T.url,
					size: "small",
					children: "进入馆藏"
				}),
				"。"
			]
		}) })
	});
	let P = (t) => e.media_sources?.find((e) => e.root_id === t.root_id && e.path === t.path), te = r.some((e) => bt(e.location)), re = te ? (e.mount_dependencies ?? []).filter((e) => !e.available) : [];
	return /* @__PURE__ */ (0, $.jsxs)(t, {
		title: "媒体库与目录",
		onSubmit: N,
		children: [/* @__PURE__ */ (0, $.jsxs)(x, { children: [
			/* @__PURE__ */ (0, $.jsx)(Pn, {}),
			/* @__PURE__ */ (0, $.jsx)("div", {
				role: "group",
				"aria-label": "媒体库与目录",
				className: "flex flex-col gap-4",
				children: A.map((e) => {
					let t = r.findIndex((t) => t.library_id === e.library_id), n = r.map((e, t) => ({
						row: e,
						index: t
					})).filter(({ row: t }) => t.library_id === e.library_id), i = e.library_policy, a = e.library || "未命名媒体库";
					return /* @__PURE__ */ (0, $.jsxs)("div", {
						"data-library-block": "",
						"data-library-key": e.library_id,
						className: F({
							variant: "raised",
							padding: "none",
							className: "flex flex-col p-2"
						}),
						"data-library": e.library_color ? e.library_id : void 0,
						children: [
							/* @__PURE__ */ (0, $.jsxs)("div", {
								"data-library-head": "",
								children: [
									/* @__PURE__ */ (0, $.jsx)(An, {
										label: `${a} 图标`,
										value: e.library_icon,
										kind: e.location,
										onChange: (e) => k(t, { library_icon: e })
									}),
									/* @__PURE__ */ (0, $.jsx)(G, {
										className: "w-full",
										"aria-label": `${a} 名称`,
										maxLength: 80,
										placeholder: "媒体库名称",
										value: e.library,
										onChange: (e) => k(t, { library: e })
									}),
									/* @__PURE__ */ (0, $.jsx)(Ln, {
										id: e.library_id,
										name: e.library,
										value: e.library_color,
										onChange: (e) => k(t, { library_color: e })
									}),
									/* @__PURE__ */ (0, $.jsx)(Fn, {
										name: a,
										value: i,
										onChange: (n) => k(t, {
											library_policy: n,
											library_stages: n === "custom" ? e.library_stages || Mn.join(",") : ""
										})
									})
								]
							}),
							i === "custom" ? /* @__PURE__ */ (0, $.jsx)(In, {
								name: a,
								value: Gn(e),
								onChange: (e) => k(t, { library_stages: Mn.filter((t) => e.includes(t)).join(",") })
							}) : null,
							/* @__PURE__ */ (0, $.jsxs)("div", {
								"data-library-folders": "",
								role: "group",
								"aria-label": `${a} 的文件夹`,
								children: [n.map(({ row: t, index: i }) => /* @__PURE__ */ (0, $.jsx)(Ct, {
									label: `媒体目录 ${i + 1}`,
									path: t.path,
									onPath: (e) => o(i, { path: e }),
									error: d[i],
									inputRef: g(i),
									picking: m === i,
									onPick: () => void h(i),
									onRemove: r.length > 1 ? () => c(i) : void 0,
									status: P(t) ? /* @__PURE__ */ (0, $.jsx)(Zn, { online: P(t)?.online }) : null,
									children: /* @__PURE__ */ (0, $.jsxs)(xt, { children: [
										/* @__PURE__ */ (0, $.jsx)(vt, {
											index: i,
											value: t.location,
											onChange: (e) => o(i, {
												location: e,
												cost: e === "local" ? "free" : ""
											})
										}),
										/* @__PURE__ */ (0, $.jsx)(St, {
											index: i,
											cost: t.cost,
											onChange: (e) => o(i, { cost: e }),
											error: y && !t.cost ? "请选择媒体读取策略" : void 0
										}),
										t.root_id && !P(t) ? /* @__PURE__ */ (0, $.jsx)(Tt, {
											label: "变更方式",
											className: "w-full @lg:w-auto @lg:flex-1",
											children: /* @__PURE__ */ (0, $.jsxs)(H, {
												className: "w-full",
												"aria-label": `目录变更方式 ${i + 1}`,
												placeholder: "选择目录变更方式",
												selectedKey: t.change_mode || null,
												onSelectionChange: (e) => {
													e === "add" ? o(i, {
														root_id: void 0,
														root: "",
														change_mode: ""
													}) : o(i, { change_mode: "relocate" });
												},
												children: [/* @__PURE__ */ (0, $.jsx)(z, {
													id: "relocate",
													children: "重定位此目录，保留文件记录"
												}), /* @__PURE__ */ (0, $.jsx)(z, {
													id: "add",
													children: "添加另一目录"
												})]
											})
										}) : null,
										A.length > 1 ? /* @__PURE__ */ (0, $.jsx)(Tt, {
											label: "移到媒体库",
											className: "w-full @lg:w-48",
											children: /* @__PURE__ */ (0, $.jsxs)(H, {
												className: "w-full",
												"aria-label": `目录所属媒体库 ${i + 1}`,
												selectedKey: t.library_id,
												renderValue: /* @__PURE__ */ (0, $.jsxs)("span", {
													className: "flex min-w-0 items-center gap-2",
													children: [/* @__PURE__ */ (0, $.jsx)(U, { mark: Hn(e) }), /* @__PURE__ */ (0, $.jsx)("span", {
														className: "truncate",
														children: a
													})]
												}),
												onSelectionChange: (e) => {
													e && M(i, String(e));
												},
												children: [A.map((e) => /* @__PURE__ */ (0, $.jsx)(z, {
													id: e.library_id,
													textValue: e.library || "未命名媒体库",
													children: /* @__PURE__ */ (0, $.jsxs)("span", {
														className: "flex min-w-0 items-center gap-2",
														children: [/* @__PURE__ */ (0, $.jsx)(U, { mark: Hn(e) }), /* @__PURE__ */ (0, $.jsx)("span", {
															className: "truncate",
															children: e.library || "未命名媒体库"
														})]
													})
												}, e.library_id)), n.length > 1 ? /* @__PURE__ */ (0, $.jsx)(z, {
													id: "new",
													textValue: "新建媒体库",
													children: /* @__PURE__ */ (0, $.jsxs)("span", {
														className: "flex min-w-0 items-center gap-2",
														children: [/* @__PURE__ */ (0, $.jsx)(U, { mark: "plus" }), /* @__PURE__ */ (0, $.jsx)("span", { children: "新建媒体库" })]
													})
												}) : null]
											})
										}) : null
									] })
								}, i)), /* @__PURE__ */ (0, $.jsx)("div", {
									className: "flex",
									children: /* @__PURE__ */ (0, $.jsx)(V, {
										variant: "secondary",
										"aria-label": `给 ${a} 添加文件夹`,
										onClick: () => {
											s(), o(r.length, {
												...Wn(e),
												location: e.location,
												cost: e.cost
											});
										},
										children: "添加文件夹"
									})
								})]
							})
						]
					}, e.library_id);
				})
			}),
			/* @__PURE__ */ (0, $.jsx)(V, {
				variant: "secondary",
				className: "self-start",
				onClick: s,
				children: "添加媒体库"
			}),
			/* @__PURE__ */ (0, $.jsx)(w, { children: Le }),
			te ? /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [/* @__PURE__ */ (0, $.jsx)(wt, {}), /* @__PURE__ */ (0, $.jsx)(xn, {})] }) : null,
			re.map((e) => /* @__PURE__ */ (0, $.jsxs)(w, { children: [
				"未检测到 ",
				e.name,
				"。",
				/* @__PURE__ */ (0, $.jsxs)(i, {
					href: e.download_url,
					children: ["下载 ", e.name]
				})
			] }, e.name)),
			/* @__PURE__ */ (0, $.jsx)(ne, {
				isSelected: _,
				onChange: v,
				children: "保存后扫描并补全资料"
			}),
			S ? /* @__PURE__ */ (0, $.jsx)(q, {
				tone: "error",
				title: "没有保存",
				children: S
			}) : null
		] }), /* @__PURE__ */ (0, $.jsx)(a, {
			status: "保存后 Peach 会重新启动。",
			children: /* @__PURE__ */ (0, $.jsx)(V, {
				type: "submit",
				...K(O.busy === "save"),
				children: "保存配置"
			})
		})]
	});
}
function Zn({ online: e }) {
	return /* @__PURE__ */ (0, $.jsx)(Dt, { online: e });
}
function Qn({ data: e }) {
	let n = e.media_sources, r = f();
	return n ? /* @__PURE__ */ (0, $.jsxs)(t, {
		title: "挂载状态",
		children: [
			/* @__PURE__ */ (0, $.jsx)(j, { children: n.map((e, t) => /* @__PURE__ */ (0, $.jsxs)(J, {
				term: /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [/* @__PURE__ */ (0, $.jsx)(U, { mark: Et(e.location) }), Vn(e.location)] }),
				children: [e.path || "未配置挂载点", /* @__PURE__ */ (0, $.jsx)(Zn, { online: e.online })]
			}, t)) }),
			r.error ? /* @__PURE__ */ (0, $.jsx)(x, {
				divided: !0,
				children: /* @__PURE__ */ (0, $.jsx)(k, { children: r.error })
			}) : null,
			/* @__PURE__ */ (0, $.jsx)(a, { children: /* @__PURE__ */ (0, $.jsx)(V, {
				variant: "secondary",
				onClick: () => void r.run("refresh", (e) => se(e), (e) => h.setQueryData(Ae, e)),
				...K(r.busy === "refresh"),
				children: "刷新挂载状态"
			}) })
		]
	}) : null;
}
//#endregion
//#region src/react/settings/service-preferences.tsx
var $n = [
	["off", "关闭"],
	["precise", "每 10 秒一张"],
	["coarse", "每 30 秒一张"]
];
function er({ epoch: e = 0, disabled: t = !1 }) {
	let n = B({
		queryKey: Fe,
		queryFn: ({ signal: e }) => Be(e),
		refetchOnMount: "always"
	}), r = mt(), i = r.reset;
	(0, Z.useEffect)(() => {
		i();
	}, [e, i]);
	let a = n.data, o = r.error || n.error;
	return /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [
		/* @__PURE__ */ (0, $.jsx)(W, { children: /* @__PURE__ */ (0, $.jsx)(T, {
			label: "时间轴预览",
			description: "按所选间隔抽帧，仅处理本机磁盘上的视频。",
			children: /* @__PURE__ */ (0, $.jsx)("div", {
				id: "videoThumbnailSetting",
				children: /* @__PURE__ */ (0, $.jsx)(H, {
					"aria-label": "缩略图采集间隔",
					selectedKey: a?.mode || "off",
					isDisabled: t || !a || n.isFetching || r.isPending,
					onSelectionChange: (e) => {
						e !== null && r.mutate(String(e));
					},
					children: $n.map(([e, t]) => /* @__PURE__ */ (0, $.jsx)(z, {
						id: e,
						children: t
					}, e))
				})
			})
		}) }),
		r.isPending || a?.status === "running" ? /* @__PURE__ */ (0, $.jsx)(x, {
			divided: !0,
			children: /* @__PURE__ */ (0, $.jsx)(w, {
				role: "status",
				children: r.isPending ? "正在保存…" : "正在采集，进度在活动页查看。"
			})
		}) : null,
		o ? /* @__PURE__ */ (0, $.jsx)(x, {
			divided: !0,
			children: /* @__PURE__ */ (0, $.jsx)(k, { children: l(o) })
		}) : null
	] });
}
function tr({ receipt: e }) {
	let n = O();
	(0, Z.useSyncExternalStore)(n.subscribe, n.version);
	let r = B({
		queryKey: nt,
		queryFn: ({ signal: e }) => Xe(e),
		refetchOnMount: "always"
	}), i = ft(), a = r.data?.followInitialDays ?? n.value.followInitialDays, o = i.error || r.error;
	return /* @__PURE__ */ (0, $.jsxs)(t, {
		title: "关注采集",
		children: [/* @__PURE__ */ (0, $.jsxs)(W, { children: [
			/* @__PURE__ */ (0, $.jsx)(nr, {}),
			/* @__PURE__ */ (0, $.jsx)(rr, {}),
			/* @__PURE__ */ (0, $.jsx)(T, {
				label: "首次采集范围",
				children: /* @__PURE__ */ (0, $.jsx)("div", {
					id: "followInitialDaysSetting",
					children: /* @__PURE__ */ (0, $.jsx)(H, {
						"aria-label": "首次采集范围",
						selectedKey: String(a),
						isDisabled: r.isFetching || i.isPending,
						onSelectionChange: (t) => {
							t !== null && i.mutate({ followInitialDays: Number(t) }, { onSuccess: (t) => {
								typeof t.followInitialDays == "number" && (n.value.followInitialDays = t.followInitialDays), n.save(), e("已保存首次采集范围");
							} });
						},
						children: at.map(([e, t]) => /* @__PURE__ */ (0, $.jsx)(z, {
							id: e,
							children: t
						}, e))
					})
				})
			}),
			/* @__PURE__ */ (0, $.jsx)(T, {
				label: "头像刷新",
				children: "每 3 个月"
			}),
			/* @__PURE__ */ (0, $.jsx)(T, {
				label: "favicon 刷新",
				children: "每年"
			})
		] }), o ? /* @__PURE__ */ (0, $.jsx)(x, {
			divided: !0,
			children: /* @__PURE__ */ (0, $.jsx)(k, { children: l(o) })
		}) : null]
	});
}
function nr() {
	let t = B({
		queryKey: Ne,
		queryFn: ({ signal: e }) => ye(e),
		refetchOnMount: "always",
		refetchInterval: (e) => Me(e.state.data)
	}), n = oe(), r = t.data, i = (0, Z.useRef)(e(Number(localStorage.getItem("peach.number.followScheduleSetting")), 15, 10080, 60)), [a, o] = (0, Z.useState)("60"), [s, c] = (0, Z.useState)(!1);
	(0, Z.useEffect)(() => {
		r?.enabled && (i.current = r.interval_minutes, o(String(r.interval_minutes)));
	}, [r]);
	let u = !r?.available || t.isFetching || n.isPending, d = () => {
		let e = Number(a);
		!Number.isInteger(e) || e < 15 || e > 10080 ? c(!0) : (c(!1), r?.enabled && !u && e !== r.interval_minutes && (i.current = e, localStorage.setItem("peach.number.followScheduleSetting", String(e)), n.mutate(e)));
	}, f = n.error || t.error;
	return /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [
		/* @__PURE__ */ (0, $.jsx)(T, {
			label: "自动检查更新",
			children: /* @__PURE__ */ (0, $.jsxs)("div", {
				id: "followScheduleSetting",
				className: "flex min-w-0 flex-wrap items-center justify-end gap-2",
				children: [/* @__PURE__ */ (0, $.jsx)(R, {
					"aria-label": "自动检查更新",
					isSelected: r?.enabled === !0,
					isDisabled: u,
					onChange: (e) => {
						localStorage.setItem("peach.number.followScheduleSetting", String(i.current)), n.mutate(e ? i.current : 0);
					}
				}), r?.enabled ? /* @__PURE__ */ (0, $.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, $.jsx)(G, {
						type: "number",
						inputMode: "numeric",
						name: "follow-interval",
						autoComplete: "off",
						"aria-label": "自动检查间隔",
						className: "w-24",
						value: a,
						onChange: (e) => {
							o(e), c(!1);
						},
						onBlur: d,
						onKeyDown: (e) => {
							e.key === "Enter" && (e.preventDefault(), d());
						},
						isDisabled: u,
						isInvalid: s
					}), /* @__PURE__ */ (0, $.jsx)("span", {
						className: "text-body-2-regular text-text-secondary",
						children: "分钟"
					})]
				}) : null]
			})
		}),
		s ? /* @__PURE__ */ (0, $.jsx)(x, { children: /* @__PURE__ */ (0, $.jsx)(k, { children: "请输入 15–10080 的整数（分钟）。" }) }) : null,
		n.isPending || r?.running ? /* @__PURE__ */ (0, $.jsx)(x, { children: /* @__PURE__ */ (0, $.jsx)(w, {
			role: "status",
			children: n.isPending ? "正在保存…" : "正在检查来源更新…"
		}) }) : null,
		/* @__PURE__ */ (0, $.jsx)(ir, {
			kind: "follow",
			status: r,
			title: "上次自动检查失败"
		}),
		f ? /* @__PURE__ */ (0, $.jsx)(x, { children: /* @__PURE__ */ (0, $.jsx)(k, { children: l(f) }) }) : null
	] });
}
function rr() {
	let e = B({
		queryKey: et,
		queryFn: ({ signal: e }) => st(e),
		refetchOnMount: "always",
		refetchInterval: (e) => Me(e.state.data)
	}).data;
	if (!e) return null;
	let t = e.interval_minutes, n = t % 60 ? `每 ${t} 分钟` : `每 ${t / 60} 小时`;
	return /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [
		/* @__PURE__ */ (0, $.jsx)(T, {
			label: "订阅源拉取",
			children: /* @__PURE__ */ (0, $.jsx)("span", {
				id: "feedScheduleSetting",
				children: e.available ? e.enabled ? n : "已关闭" : "只在写入端可用"
			})
		}),
		e.running ? /* @__PURE__ */ (0, $.jsx)(x, { children: /* @__PURE__ */ (0, $.jsx)(w, {
			role: "status",
			children: "正在拉取订阅源…"
		}) }) : null,
		/* @__PURE__ */ (0, $.jsx)(ir, {
			kind: "feed",
			status: e,
			title: "上次自动拉取失败"
		})
	] });
}
function ir({ kind: e, status: t, title: n }) {
	let r = ke(e);
	if (!t?.enabled || t.running || !t.last_error) return null;
	let i = t.consecutive_failures ?? 0, a = E(t.next_run_at), o = [i > 1 ? `已连续失败 ${i} 次` : "", a ? `下一轮 ${a}` : ""].filter(Boolean).join("，"), s = [
		t.last_error,
		o,
		r.error ? `没有重试：${l(r.error)}` : ""
	].filter(Boolean).join("\n");
	return /* @__PURE__ */ (0, $.jsx)(x, { children: /* @__PURE__ */ (0, $.jsx)(q, {
		tone: "error",
		title: n,
		action: /* @__PURE__ */ (0, $.jsx)(V, {
			variant: "secondary",
			size: "small",
			disabled: !t.available,
			...K(r.isPending),
			onClick: () => r.mutate(),
			children: "立即重试"
		}),
		children: s
	}) });
}
//#endregion
//#region src/react/settings/media-processing-settings.tsx
function ar({ receipt: e }) {
	let n = B({
		queryKey: le,
		queryFn: ({ signal: e }) => De(e)
	}), r = f(), i = r.error || (n.error ? l(n.error) : ""), a = !n.data || n.isFetching || !!r.busy;
	return /* @__PURE__ */ (0, $.jsxs)(t, {
		title: "视频预览",
		children: [
			/* @__PURE__ */ (0, $.jsx)(W, { children: /* @__PURE__ */ (0, $.jsx)(T, {
				label: "生成视频预览",
				description: "为本地视频生成九宫格与时间轴预览；关闭后仍按入库规则探测时长与分辨率。",
				children: /* @__PURE__ */ (0, $.jsx)(R, {
					"aria-label": "生成视频预览",
					isSelected: !!n.data && !n.data.metadata_only,
					isDisabled: a,
					onChange: (t) => void r.run("save", (e) => L(We, { metadata_only: !t }, "POST", e), (t) => {
						h.setQueryData(le, t), h.invalidateQueries({ queryKey: Fe }), h.invalidateQueries({ queryKey: c }), e(t.metadata_only ? "已关闭视频预览生成" : "已开启视频预览生成");
					})
				})
			}) }),
			/* @__PURE__ */ (0, $.jsx)(er, { disabled: !n.data || n.data.metadata_only || !!r.busy }),
			/* @__PURE__ */ (0, $.jsx)(W, { children: /* @__PURE__ */ (0, $.jsx)(T, {
				label: "抽帧解码方式",
				description: "用于生成封面、九宫格和时间轴。",
				children: /* @__PURE__ */ (0, $.jsx)("div", {
					id: "previewAccelerationSetting",
					children: /* @__PURE__ */ (0, $.jsxs)(H, {
						"aria-label": "抽帧解码方式",
						selectedKey: n.data?.preview_acceleration || "auto",
						isDisabled: a,
						onSelectionChange: (t) => {
							t !== null && r.run("preview_acceleration", (e) => L(We, { preview_acceleration: String(t) }, "POST", e), (t) => {
								h.setQueryData(le, t), e("已保存抽帧解码方式");
							});
						},
						children: [/* @__PURE__ */ (0, $.jsx)(z, {
							id: "auto",
							children: "自动（硬件优先）"
						}), /* @__PURE__ */ (0, $.jsx)(z, {
							id: "software",
							children: "软件解码"
						})]
					})
				})
			}) }),
			r.busy ? /* @__PURE__ */ (0, $.jsx)(x, {
				divided: !0,
				children: /* @__PURE__ */ (0, $.jsx)(w, {
					role: "status",
					children: "正在保存…"
				})
			}) : null,
			i ? /* @__PURE__ */ (0, $.jsx)(x, {
				divided: !0,
				children: /* @__PURE__ */ (0, $.jsx)(k, { children: i })
			}) : null
		]
	});
}
function or({ receipt: e }) {
	let n = B({
		queryKey: le,
		queryFn: ({ signal: e }) => De(e)
	}), r = f(), i = r.error || (n.error ? l(n.error) : "");
	return /* @__PURE__ */ (0, $.jsxs)(t, {
		title: "视频播放",
		children: [
			/* @__PURE__ */ (0, $.jsx)(W, { children: /* @__PURE__ */ (0, $.jsx)(T, {
				label: "转码方式",
				description: "用于播放时的视频转码。",
				children: /* @__PURE__ */ (0, $.jsx)("div", {
					id: "playbackAccelerationSetting",
					children: /* @__PURE__ */ (0, $.jsxs)(H, {
						"aria-label": "转码方式",
						selectedKey: n.data?.playback_acceleration || "auto",
						isDisabled: !n.data || n.isFetching || !!r.busy,
						onSelectionChange: (t) => {
							t !== null && r.run("playback_acceleration", (e) => L(We, { playback_acceleration: String(t) }, "POST", e), (t) => {
								h.setQueryData(le, t), e("已保存转码方式");
							});
						},
						children: [/* @__PURE__ */ (0, $.jsx)(z, {
							id: "auto",
							children: "自动（硬件优先）"
						}), /* @__PURE__ */ (0, $.jsx)(z, {
							id: "software",
							children: "软件编解码"
						})]
					})
				})
			}) }),
			r.busy ? /* @__PURE__ */ (0, $.jsx)(x, {
				divided: !0,
				children: /* @__PURE__ */ (0, $.jsx)(w, {
					role: "status",
					children: "正在保存…"
				})
			}) : null,
			i ? /* @__PURE__ */ (0, $.jsx)(x, {
				divided: !0,
				children: /* @__PURE__ */ (0, $.jsx)(k, { children: i })
			}) : null
		]
	});
}
//#endregion
//#region src/react/boardui/components/base/textarea/textarea.tsx
var sr = te({
	field: [
		"relative flex w-full flex-col",
		"rounded-2lg",
		"bg-background-tertiary-default text-foreground-icon-tertiary",
		"ring-2 ring-inset ring-transparent",
		"transition-[background-color,box-shadow,color] duration-[var(--input-transition-ms)] ease"
	].join(" "),
	fieldSize: {
		medium: "p-2",
		small: "px-1.5 py-2"
	},
	textarea: [
		"block w-full min-w-0 bg-transparent border-0 outline-none m-0 p-0 px-1",
		"font-sans text-body-regular text-text-primary",
		"placeholder:text-text-tertiary",
		"focus:placeholder:text-text-primary",
		"disabled:text-input-disabled-text disabled:placeholder:text-input-disabled-text",
		"disabled:cursor-not-allowed",
		"aria-invalid:placeholder:text-text-error-placeholder"
	].join(" "),
	resize: {
		none: "resize-none",
		vertical: "resize-y"
	},
	footer: "flex w-full items-start justify-between gap-3",
	count: "ms-auto shrink-0 pt-px text-caption-1-medium text-text-tertiary tabular-nums"
}), cr = 20;
function lr({ size: e, rows: t = 3, autoResize: n = !1, maxRows: r, resize: i = "vertical", fieldClassName: a, className: o, ref: s, groupRef: c, onInput: l, ...u }) {
	let d = (0, Z.useContext)(Ee), f = e ?? d.size ?? "medium", p = (0, Z.useRef)(null), m = (e) => {
		p.current = e, typeof s == "function" ? s(e) : s && (s.current = e);
	}, h = () => {
		let e = p.current;
		if (!e) return;
		if (!n) {
			e.style.height = "", e.style.maxHeight = "", e.style.overflowY = "";
			return;
		}
		let i = parseFloat(window.getComputedStyle(e).lineHeight) || cr, a = r ? r * i : Infinity;
		e.style.height = "0px";
		let o = Math.max(e.scrollHeight, t * i);
		e.style.height = `${Math.min(o, a)}px`, e.style.maxHeight = r ? `${a}px` : "", e.style.overflowY = o > a ? "auto" : "hidden";
	};
	return (0, Z.useLayoutEffect)(h), /* @__PURE__ */ (0, $.jsx)(ct, {
		ref: c,
		className: ({ isFocusWithin: e, isHovered: t, isDisabled: n, isInvalid: r }) => P(sr.field, sr.fieldSize[f], t && !e && !n && !r && "ring-border-button-hover", e && !n && !r && "ring-border-button-active", n && "bg-input-disabled-background text-input-disabled-foreground", r && "bg-background-tertiary-error text-foreground-icon-error", d.fieldClassName, a),
		children: /* @__PURE__ */ (0, $.jsx)(re, {
			ref: m,
			rows: t,
			...u,
			onInput: (e) => {
				h(), l?.(e);
			},
			className: P(sr.textarea, sr.resize[n ? "none" : i], d.inputClassName, o)
		})
	});
}
lr.displayName = "TextareaBase";
function ur({ label: e, hint: t, tooltip: n, placeholder: r, rows: i, autoResize: a, maxRows: o, resize: s, maxLength: c, showCount: l = !1, fieldClassName: u, ref: d, groupRef: f, className: p, value: m, defaultValue: h, onChange: g, ..._ }) {
	let [v, y] = (0, Z.useState)(() => (h ?? "").length), b = m === void 0 ? v : m.length;
	return /* @__PURE__ */ (0, $.jsx)(ve, {
		..._,
		value: m,
		defaultValue: h,
		onChange: (e) => {
			l && m === void 0 && y(e.length), g?.(e);
		},
		className: p,
		"aria-label": _["aria-label"] ?? (!e && typeof r == "string" ? r : void 0),
		children: ({ isRequired: p, isInvalid: m }) => /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [
			e && /* @__PURE__ */ (0, $.jsx)(ze, {
				isRequired: p,
				isInvalid: m,
				tooltip: n,
				children: e
			}),
			/* @__PURE__ */ (0, $.jsx)(lr, {
				ref: d,
				groupRef: f,
				placeholder: r,
				rows: i,
				autoResize: a,
				maxRows: o,
				resize: s,
				maxLength: c,
				fieldClassName: u
			}),
			(t || l) && /* @__PURE__ */ (0, $.jsxs)("div", {
				className: sr.footer,
				children: [t && /* @__PURE__ */ (0, $.jsx)(Ye, {
					isInvalid: m,
					children: t
				}), l && /* @__PURE__ */ (0, $.jsx)("span", {
					className: P(sr.count, m && "text-text-error-primary"),
					children: c ? `${b}/${c}` : b
				})]
			})
		] })
	});
}
ur.displayName = "Textarea";
//#endregion
//#region src/react/settings/code-pattern-settings.tsx
var dr = "^\\+{3}\\s*(?<code>FC2-PPV-\\d+)\n\\[(?<code>[A-Z]+-\\d+)\\]";
function fr({ receipt: e }) {
	let n = B({
		queryKey: nt,
		queryFn: ({ signal: e }) => Xe(e)
	}), [r, i] = (0, Z.useState)(null), o = f(), s = r ?? (n.data?.codePatterns ?? []).join("\n"), c = o.error || (n.error ? l(n.error) : "");
	return /* @__PURE__ */ (0, $.jsxs)(t, {
		title: "番号识别规则",
		onSubmit: (t) => {
			t.preventDefault();
			let n = s.split("\n").map((e) => e.trim()).filter(Boolean);
			o.run("save", (e) => L(me, { codePatterns: n }, "POST", e), (t) => {
				h.setQueryData(nt, t), i(null), e("已保存配置");
			});
		},
		children: [/* @__PURE__ */ (0, $.jsxs)(x, { children: [/* @__PURE__ */ (0, $.jsx)(w, { children: "内置规则认不出番号时，按这里的规则从文件名里取。每行一条正则表达式，番号写在 (?<code>…) 里，没有命名组就取第一个括号。规则在下一次处理时对还没有番号的视频生效。" }), /* @__PURE__ */ (0, $.jsx)(ur, {
			id: "codePatternSetting",
			"aria-label": "番号识别规则",
			rows: 3,
			autoResize: !0,
			maxRows: 12,
			spellCheck: "false",
			autoComplete: "off",
			placeholder: dr,
			value: s,
			isDisabled: !n.data,
			isInvalid: !!c,
			hint: c || void 0,
			onChange: i
		})] }), /* @__PURE__ */ (0, $.jsx)(a, { children: /* @__PURE__ */ (0, $.jsx)(V, {
			type: "submit",
			...K(o.busy === "save"),
			children: "保存配置"
		}) })]
	});
}
//#endregion
//#region src/react/settings/password-pair.tsx
function pr({ label: e, password: t, confirmation: n, onPassword: r, onConfirmation: i, disabled: a = !1, passwordError: o, passwordHint: s, confirmationError: c, confirmationInvalid: l = !1 }) {
	return /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [/* @__PURE__ */ (0, $.jsx)(G, {
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
	}), /* @__PURE__ */ (0, $.jsx)(G, {
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
//#region src/react/settings/access-settings.tsx
var mr = {
	legacy: "当前使用系统生成的访问口令。改设自己的密码，或关闭登录要求。",
	locked: "访问设置无法读取，请在本机检查配置文件。",
	password: "已设置密码。新设备需要登录，登录时勾选「保持登录」可保持 30 天。"
};
function hr({ initial: e, receipt: n }) {
	let [r, i] = (0, Z.useState)(e), [o, s] = (0, Z.useState)(""), [c, u] = (0, Z.useState)(""), [d, m] = (0, Z.useState)(""), [h, g] = (0, Z.useState)(!1), [_, v] = (0, Z.useState)({}), y = (0, Z.useRef)(null), b = f(), S = (e) => {
		e.preventDefault();
		let t = {};
		r.mode === "password" && !o && (t.current_password = "请输入当前访问密码"), h || ((c.length < 8 || c.length > 256) && (t.password = "访问密码需为 8–256 个字符"), c !== d && (t.confirmation = "两次输入的密码不一致")), v(t), Object.keys(t).length ? requestAnimationFrame(() => y.current?.querySelector("input[aria-invalid=\"true\"]")?.focus()) : b.run("save", (e) => L("/api/configuration/access", {
			revision: r.revision,
			action: h ? "disable" : "set",
			confirm_disable: h,
			current_password: o,
			password: h ? "" : c,
			confirmation: h ? "" : d
		}, "POST", e), (e) => {
			i(e), s(""), u(""), m(""), g(!1), v({}), n(e.mode === "open" ? "已关闭访问密码" : "已保存配置");
		}, (e) => {
			let t = e instanceof p ? e.body : null, n = t?.errors || t?.detail?.errors;
			n ? v(n) : b.setError(l(e));
		});
	}, C = mr[r.mode], T = r.mode !== "locked";
	return /* @__PURE__ */ (0, $.jsxs)(t, {
		title: "访问密码",
		onSubmit: S,
		children: [/* @__PURE__ */ (0, $.jsx)("div", {
			ref: y,
			children: /* @__PURE__ */ (0, $.jsxs)(x, { children: [
				C ? /* @__PURE__ */ (0, $.jsx)(w, { children: C }) : null,
				r.mode === "open" ? /* @__PURE__ */ (0, $.jsx)(q, {
					tone: "warning",
					title: "未设置访问密码",
					children: "能连接到 Peach 的设备打开地址就能看馆藏，不需要登录。"
				}) : null,
				r.mode === "password" || r.mode === "legacy" ? /* @__PURE__ */ (0, $.jsx)(ne, {
					isSelected: h,
					onChange: g,
					children: "关闭访问密码"
				}) : null,
				r.mode === "password" ? /* @__PURE__ */ (0, $.jsx)(G, {
					id: "access-current",
					type: "password",
					label: "当前访问密码",
					autoComplete: "current-password",
					maxLength: 256,
					value: o,
					onChange: s,
					isRequired: !0,
					validationBehavior: "aria",
					isInvalid: !!_.current_password,
					hint: _.current_password
				}) : null,
				T ? /* @__PURE__ */ (0, $.jsx)(pr, {
					label: r.mode === "password" ? "新访问密码" : "设置访问密码",
					password: c,
					confirmation: d,
					onPassword: u,
					onConfirmation: m,
					disabled: h,
					passwordError: _.password,
					confirmationError: _.confirmation,
					passwordHint: h ? "关闭访问密码时无需填写。" : "至少 8 个字符。保存后其他设备需要重新登录。"
				}) : null,
				h ? /* @__PURE__ */ (0, $.jsx)(q, {
					tone: "warning",
					title: "访问范围",
					children: "保存后，能连接到 Peach 的设备将直接访问馆藏。"
				}) : null,
				b.error ? /* @__PURE__ */ (0, $.jsx)(k, { children: b.error }) : null
			] })
		}), T ? /* @__PURE__ */ (0, $.jsx)(a, { children: /* @__PURE__ */ (0, $.jsx)(V, {
			type: "submit",
			...K(b.busy === "save"),
			children: "保存配置"
		}) }) : null]
	});
}
//#endregion
//#region src/react/settings/port-settings.tsx
function gr({ data: e, receipt: n }) {
	let [r, i] = (0, Z.useState)(String(e.port)), [o, s] = (0, Z.useState)(""), [c, u] = (0, Z.useState)(null), d = f();
	return (0, Z.useEffect)(() => {
		if (!c) return;
		let e = setTimeout(() => location.assign(c.url), vn);
		return () => clearTimeout(e);
	}, [c]), c ? /* @__PURE__ */ (0, $.jsx)(t, {
		title: "本机访问端口",
		children: /* @__PURE__ */ (0, $.jsx)(x, { children: /* @__PURE__ */ (0, $.jsxs)(q, {
			tone: "success",
			title: "配置已保存",
			children: ["Peach 正在重新启动。", /* @__PURE__ */ (0, $.jsx)(I, {
				href: c.url,
				size: "small",
				children: "进入馆藏"
			})]
		}) })
	}) : /* @__PURE__ */ (0, $.jsxs)(t, {
		title: "本机访问端口",
		onSubmit: (t) => {
			t.preventDefault(), s(""), d.run("save", (t) => L(pe, {
				revision: e.revision,
				media_dirs: e.media_dirs,
				...e.media_sources ? { media_sources: e.media_sources } : {},
				port: r,
				scan_now: !1
			}, "POST", t), (e) => {
				u(e), n("已保存配置");
			}, (e) => {
				let t = e instanceof p && e.status === 400 ? e.body?.errors : null;
				t?.port ? s(t.port) : d.setError(l(e));
			});
		},
		children: [/* @__PURE__ */ (0, $.jsxs)(x, { children: [/* @__PURE__ */ (0, $.jsx)(G, {
			id: "configPort",
			label: "端口",
			inputMode: "numeric",
			value: r,
			onChange: i,
			validationBehavior: "aria",
			isInvalid: !!o,
			hint: o || void 0
		}), d.error ? /* @__PURE__ */ (0, $.jsx)(q, {
			tone: "error",
			title: "没有保存",
			children: d.error
		}) : null] }), /* @__PURE__ */ (0, $.jsx)(a, {
			status: "保存后 Peach 会重启，并跳转到新地址。",
			children: /* @__PURE__ */ (0, $.jsx)(V, {
				type: "submit",
				...K(d.busy === "save"),
				children: "保存配置"
			})
		})]
	});
}
//#endregion
//#region src/react/settings/tunnel-settings.tsx
var _r = 2e3, vr = [["quick", "临时链接"], ["named", "命名隧道"]], yr = {
	quick: "临时预览用，地址随机，重启后会变。启动前要先设置访问密码。",
	named: "使用你在 Cloudflare 绑定的固定域名。启动前要先设置访问密码。"
};
function br({ revision: e, initial: n, receipt: r }) {
	let [o, s] = (0, Z.useState)(n), [c, u] = (0, Z.useState)(e), [d, m] = (0, Z.useState)(n.mode), [g, _] = (0, Z.useState)(n.hostname), [v, b] = (0, Z.useState)(""), [S, C] = (0, Z.useState)({}), T = f(), E = o.state === "starting" || o.state === "running", D = o.named_available && d === "named";
	(0, Z.useEffect)(() => {
		if (o.state !== "starting") return;
		let e = new AbortController(), t = window.setInterval(() => {
			se(e.signal).then((t) => {
				!e.signal.aborted && t.tunnel && (h.setQueryData(Ae, t), s(t.tunnel), u(t.revision));
			}).catch(() => void 0);
		}, _r);
		return () => {
			e.abort(), window.clearInterval(t);
		};
	}, [o.state]);
	let O = (e, t, n) => {
		C({}), T.run(e, (e) => L("/api/configuration/tunnel", {
			revision: c,
			enabled: t,
			mode: d,
			hostname: g,
			token: v
		}, "POST", e), (e) => {
			s(e), u(e.revision), m(e.mode), _(e.hostname), b(""), n(e);
		}, (e) => {
			let t = e instanceof p ? e.body : null, n = t?.errors || t?.detail?.errors;
			n ? C(n) : T.setError(l(e));
		});
	};
	return /* @__PURE__ */ (0, $.jsxs)(t, {
		id: "tunnel",
		title: "Cloudflare 公网入口",
		onSubmit: (e) => {
			e.preventDefault(), O("save", E, () => r("已保存配置"));
		},
		aside: /* @__PURE__ */ (0, $.jsx)(y, {
			tone: o.error ? "error" : E ? "progress" : "neutral",
			children: o.error ? "连接失败" : o.state === "running" ? "运行中" : o.state === "starting" ? "连接中" : "已停止"
		}),
		children: [/* @__PURE__ */ (0, $.jsxs)(x, { children: [
			o.named_available ? /* @__PURE__ */ (0, $.jsx)(Re, {
				"aria-label": "公网入口的形态（二选一）",
				value: d,
				isDisabled: E,
				onChange: (e) => m(e),
				className: qe,
				children: vr.map(([e, t]) => /* @__PURE__ */ (0, $.jsx)(rt, {
					value: e,
					className: Te,
					children: t
				}, e))
			}) : null,
			/* @__PURE__ */ (0, $.jsx)(w, { children: yr[D ? "named" : "quick"] }),
			D ? /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [/* @__PURE__ */ (0, $.jsx)(G, {
				id: "tunnel-hostname",
				label: "公开主机名",
				autoComplete: "off",
				maxLength: 253,
				value: g,
				onChange: _,
				isDisabled: E,
				validationBehavior: "aria",
				isInvalid: !!S.hostname,
				hint: S.hostname || "Cloudflare Zero Trust 里指向这台电脑的主机名。"
			}), /* @__PURE__ */ (0, $.jsx)(G, {
				id: "tunnel-token",
				type: "password",
				label: "隧道令牌",
				autoComplete: "off",
				maxLength: 2048,
				value: v,
				onChange: b,
				isDisabled: E,
				validationBehavior: "aria",
				hint: o.token_set ? "已保存，留空不改。" : "在 Cloudflare Zero Trust 的隧道详情页复制。"
			})] }) : null,
			o.available ? null : /* @__PURE__ */ (0, $.jsx)(q, {
				tone: "warning",
				title: "找不到 cloudflared",
				children: "安装官方 cloudflared，或用设置文件的 tunnel.binary 与 PEACH_CLOUDFLARED 指定路径。"
			}),
			o.state === "running" && o.url ? /* @__PURE__ */ (0, $.jsx)(q, {
				tone: "info",
				title: "公网地址",
				children: /* @__PURE__ */ (0, $.jsx)(i, {
					href: o.url,
					children: o.url
				})
			}) : null,
			o.state === "starting" ? /* @__PURE__ */ (0, $.jsx)(q, {
				tone: "info",
				title: "正在连接",
				children: "正在等待 cloudflared 连上 Cloudflare 边缘。"
			}) : null,
			o.error ? /* @__PURE__ */ (0, $.jsx)(k, { children: o.error }) : null,
			T.error ? /* @__PURE__ */ (0, $.jsx)(k, { children: T.error }) : null
		] }), /* @__PURE__ */ (0, $.jsxs)(a, {
			status: o.enabled ? "Peach 重启后自动恢复。" : void 0,
			children: [/* @__PURE__ */ (0, $.jsx)(V, {
				variant: o.named_available ? "secondary" : "primary",
				onClick: () => O("toggle", !E, (e) => r(e.enabled ? "公网入口已启动" : "公网入口已停止")),
				...K(T.busy === "toggle"),
				children: E ? "停止公网入口" : "启动公网入口"
			}), o.named_available ? /* @__PURE__ */ (0, $.jsx)(V, {
				type: "submit",
				...K(T.busy === "save"),
				children: "保存配置"
			}) : null]
		})]
	});
}
//#endregion
//#region src/react/settings/network-settings.tsx
var xr = [
	["environment", "系统代理"],
	["direct", "直连"],
	["proxy", "自定义"]
];
function Sr({ data: e, receipt: t, panel: n }) {
	return /* @__PURE__ */ (0, $.jsxs)("div", {
		...Q(n),
		children: [
			e.editable && e.port_editable !== !1 ? /* @__PURE__ */ (0, $.jsx)(gr, {
				data: e,
				receipt: t
			}) : null,
			e.peach_proxy ? /* @__PURE__ */ (0, $.jsx)(Cr, {
				initial: e.peach_proxy,
				receipt: t
			}) : null,
			e.access ? /* @__PURE__ */ (0, $.jsx)(hr, {
				initial: e.access,
				receipt: t
			}) : null,
			e.tunnel ? /* @__PURE__ */ (0, $.jsx)(br, {
				revision: e.revision,
				initial: e.tunnel,
				receipt: t
			}) : null
		]
	});
}
function Cr({ initial: e, receipt: n }) {
	let [r, i] = (0, Z.useState)(e), [o, s] = (0, Z.useState)(e.mode), [c, l] = (0, Z.useState)(""), u = f();
	return /* @__PURE__ */ (0, $.jsxs)(t, {
		id: "peachProxy",
		title: "Peach 代理",
		onSubmit: (e) => {
			e.preventDefault(), u.run("save", (e) => L("/api/configuration/peach-proxy", {
				mode: o,
				proxy: c
			}, "POST", e), (e) => {
				i(e), l(""), n("已保存配置");
			});
		},
		children: [
			/* @__PURE__ */ (0, $.jsx)(W, { children: /* @__PURE__ */ (0, $.jsx)(T, {
				label: "连接方式",
				children: /* @__PURE__ */ (0, $.jsx)(H, {
					"aria-label": "连接方式",
					selectedKey: o,
					onSelectionChange: (e) => {
						e !== null && s(String(e));
					},
					children: xr.map(([e, t]) => /* @__PURE__ */ (0, $.jsx)(z, {
						id: e,
						children: t
					}, e))
				})
			}) }),
			o === "proxy" || r.needs_selection || u.error ? /* @__PURE__ */ (0, $.jsxs)(x, {
				divided: !0,
				children: [
					o === "proxy" ? /* @__PURE__ */ (0, $.jsx)(G, {
						id: "peachProxyAddress",
						type: "password",
						label: "代理地址",
						autoComplete: "off",
						value: c,
						onChange: l,
						placeholder: r.proxy_saved ? "已保存，留空保留" : "http://127.0.0.1:7890"
					}) : null,
					r.needs_selection ? /* @__PURE__ */ (0, $.jsx)(q, {
						tone: "warning",
						title: "需要选择连接方式",
						children: "已有来源的代理地址不同，请选择公共连接方式。"
					}) : null,
					u.error ? /* @__PURE__ */ (0, $.jsx)(k, { children: u.error }) : null
				]
			}) : null,
			/* @__PURE__ */ (0, $.jsx)(a, { children: /* @__PURE__ */ (0, $.jsx)(V, {
				type: "submit",
				...K(u.busy === "save"),
				children: "保存配置"
			}) })
		]
	});
}
//#endregion
//#region src/react/follow-manage/credentials.tsx
var wr = "将清除这个来源在本机和共享副本中的登录凭据。", Tr = "其他系统用户可以读取此凭据文件。请在运行 Peach 的 Mac 或 Linux 电脑上，将文件权限设为仅当前用户可读写（0600）。";
function Er(e, t) {
	return (e.shared_fields || []).includes(t) ? "来自共享，留空表示不改" : e.fields.includes(t) ? "已保存，留空表示不改" : "未填写";
}
function Dr({ row: e }) {
	if (ie(e)) return /* @__PURE__ */ (0, $.jsx)(je, {
		variant: "caption",
		color: "lime",
		children: "已配置"
	});
	let t = e.requirement === "required" ? "yellow" : e.requirement === "blocked" ? "rose" : "neutral";
	return /* @__PURE__ */ (0, $.jsx)(je, {
		variant: "caption",
		color: t,
		children: n[e.requirement] || ""
	});
}
function Or({ row: e, readOnly: t, toast: n }) {
	let [r, a] = (0, Z.useState)({}), [o, s] = (0, Z.useState)(""), c = ie(e), u = Pe({
		mutationFn: (t) => ee(e.provider, t),
		onSuccess: (e, t) => {
			e.note ? s(e.note) : (s(""), a({}), h.invalidateQueries({
				queryKey: C,
				exact: !0
			}), n(Object.keys(t).length ? "已保存来源凭据" : "已清除来源凭据"));
		},
		onError: (e) => s(l(e))
	}), f = () => {
		let e = Object.fromEntries(Object.entries(r).map(([e, t]) => [e, t.trim()]).filter(([, e]) => e));
		Object.keys(e).length ? u.mutate(e) : s("没有填写内容");
	};
	return /* @__PURE__ */ (0, $.jsxs)("div", {
		className: "flex flex-col gap-3",
		children: [
			/* @__PURE__ */ (0, $.jsxs)(w, { children: [e.why, e.where ? /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [" ", /* @__PURE__ */ (0, $.jsx)(i, {
				href: e.where,
				children: "获取凭据"
			})] }) : null] }),
			e.howto ? /* @__PURE__ */ (0, $.jsx)(w, { children: e.howto }) : null,
			/* @__PURE__ */ (0, $.jsx)("div", {
				className: "flex w-full flex-col gap-3",
				children: (e.needs || []).map((n) => /* @__PURE__ */ (0, $.jsx)(G, {
					type: "password",
					label: n,
					placeholder: Er(e, n),
					autoComplete: "off",
					spellCheck: "false",
					isDisabled: t,
					value: r[n] || "",
					onChange: (e) => a({
						...r,
						[n]: e
					}),
					className: "w-full min-w-0"
				}, n))
			}),
			/* @__PURE__ */ (0, $.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [c ? /* @__PURE__ */ (0, $.jsx)(V, {
					variant: "danger",
					disabled: t,
					...K(u.isPending),
					onClick: () => void A({
						title: "清除来源凭据",
						body: wr,
						confirmLabel: "清除来源凭据",
						danger: !0,
						onConfirm: () => u.mutateAsync({})
					}),
					children: "清除"
				}) : null, /* @__PURE__ */ (0, $.jsx)(V, {
					variant: "primary",
					disabled: t,
					...K(u.isPending),
					onClick: f,
					children: "保存配置"
				})]
			}),
			o ? /* @__PURE__ */ (0, $.jsx)(k, { children: o }) : null,
			(e.shared_fields || []).length ? /* @__PURE__ */ (0, $.jsx)(w, { children: `${e.shared_fields.join("、")} 使用共享副本中的登录信息，本机没有单独保存。清除时，本机和共享副本中的登录信息都会删除。` }) : null,
			e.path ? /* @__PURE__ */ (0, $.jsx)(Y, {
				summary: "凭据文件",
				children: /* @__PURE__ */ (0, $.jsx)(d, {
					path: e.path,
					className: "font-mono text-caption-1-regular text-text-tertiary",
					onRevealed: n
				})
			}) : null
		]
	});
}
function kr({ row: e, readOnly: t, toast: n }) {
	let r = /* @__PURE__ */ (0, $.jsxs)("span", {
		className: "flex min-w-0 flex-wrap items-center gap-2",
		children: [
			/* @__PURE__ */ (0, $.jsx)("span", {
				className: "inline-flex size-3.5 shrink-0 items-center justify-center",
				children: /* @__PURE__ */ (0, $.jsx)(Ot, { provider: e.provider })
			}),
			/* @__PURE__ */ (0, $.jsx)("b", {
				className: "min-w-0 text-body-medium wrap-anywhere text-text-primary",
				children: e.provider_label
			}),
			/* @__PURE__ */ (0, $.jsx)(Dr, { row: e }),
			e.missing.map((e) => /* @__PURE__ */ (0, $.jsx)(je, {
				variant: "caption",
				color: "rose",
				children: `缺 ${e}`
			}, e))
		]
	});
	return e.requirement === "none" || e.requirement === "blocked" ? /* @__PURE__ */ (0, $.jsxs)("div", {
		className: "flex flex-wrap items-center gap-3 border-b border-separator-border px-6 py-5 last:border-b-0 max-sm:px-4",
		children: [r, e.requirement === "blocked" ? /* @__PURE__ */ (0, $.jsx)(w, { children: e.why }) : null]
	}) : /* @__PURE__ */ (0, $.jsxs)("div", {
		className: "flex flex-col gap-2 border-b border-separator-border px-6 py-5 last:border-b-0 max-sm:px-4",
		children: [
			r,
			/* @__PURE__ */ (0, $.jsx)(Y, {
				summary: ie(e) ? "修改凭据" : "填写凭据",
				defaultOpen: e.requirement === "required" && !ie(e),
				children: /* @__PURE__ */ (0, $.jsx)(Or, {
					row: e,
					readOnly: t,
					toast: n
				})
			}),
			e.world_readable ? /* @__PURE__ */ (0, $.jsx)(q, {
				tone: "error",
				title: "凭据文件权限过宽",
				children: Tr
			}) : null
		]
	});
}
function Ar({ data: e, readOnly: n, toast: r, embedded: i = !1 }) {
	let a = e.providers || [], o = a.filter((e) => e.requirement === "required" && !ie(e));
	if (!a.length) return /* @__PURE__ */ (0, $.jsx)(Ue, {
		size: "compact",
		icon: s,
		title: "没有可配置的来源",
		children: "已接入的站点及其凭据状态会显示在这里。"
	});
	let c = o.length ? /* @__PURE__ */ (0, $.jsx)("span", {
		className: "text-body-2-regular text-text-error-primary",
		children: `${o.length} 个待配置`
	}) : null, l = /* @__PURE__ */ (0, $.jsx)($.Fragment, { children: [
		{
			title: "可配置凭据",
			rows: a.filter((e) => e.requirement !== "none" && e.requirement !== "blocked")
		},
		{
			title: "不需要凭据",
			rows: a.filter((e) => e.requirement === "none")
		},
		{
			title: "暂不支持",
			rows: a.filter((e) => e.requirement === "blocked")
		}
	].filter((e) => e.rows.length).map((e) => /* @__PURE__ */ (0, $.jsxs)("section", {
		"aria-label": e.title,
		className: "flex flex-col gap-2",
		children: [/* @__PURE__ */ (0, $.jsx)("h4", {
			className: "text-body-medium text-text-secondary",
			children: e.title
		}), /* @__PURE__ */ (0, $.jsx)("div", {
			className: F({
				variant: "outlined",
				padding: "none",
				className: "flex flex-col overflow-hidden"
			}),
			children: e.rows.map((e) => /* @__PURE__ */ (0, $.jsx)(kr, {
				row: e,
				readOnly: n,
				toast: r
			}, e.provider))
		})]
	}, e.title)) });
	return i ? /* @__PURE__ */ (0, $.jsx)(t, {
		title: "来源凭据",
		aside: c || void 0,
		children: /* @__PURE__ */ (0, $.jsx)(x, { children: l })
	}) : /* @__PURE__ */ (0, $.jsxs)("div", {
		className: F({
			padding: "none",
			className: "flex flex-col gap-4 px-6 py-5 max-sm:px-4"
		}),
		children: [/* @__PURE__ */ (0, $.jsxs)("div", {
			className: "flex flex-wrap items-center gap-2",
			children: [/* @__PURE__ */ (0, $.jsx)("h3", {
				className: "mr-auto text-title-2-medium text-text-primary",
				children: "来源凭据"
			}), c]
		}), l]
	});
}
//#endregion
//#region src/configuration-copy.ts
var jr = "JavDB 或 MISSAV 打不开时，填一个能打开的镜像域名。", Mr = "只填域名，留空用默认地址";
//#endregion
//#region src/react/settings/entry-links-settings.tsx
function Nr({ initial: e, receipt: n }) {
	let [r, i] = (0, Z.useState)(e.sites), o = f(), s = (e, t) => i((n) => n.map((n) => n.key === e ? {
		...n,
		host: t
	} : n));
	return /* @__PURE__ */ (0, $.jsxs)(t, {
		title: "作品资料站点",
		onSubmit: (e) => {
			e.preventDefault();
			let t = { sites: Object.fromEntries(r.map((e) => [e.key, { host: e.host }])) };
			o.run("save", (e) => L("/api/configuration/entry-links", t, "POST", e), (e) => {
				i(e.sites), n("已保存配置");
			});
		},
		children: [/* @__PURE__ */ (0, $.jsxs)(x, { children: [
			/* @__PURE__ */ (0, $.jsx)(w, { children: jr }),
			r.map((e) => /* @__PURE__ */ (0, $.jsx)(G, {
				id: `entry-link-${e.key}`,
				label: /* @__PURE__ */ (0, $.jsx)(dt, {
					site: e.key,
					label: `${e.label} 地址`
				}),
				autoComplete: "off",
				maxLength: 100,
				value: e.host,
				placeholder: e.default_host,
				onChange: (t) => s(e.key, t),
				validationBehavior: "aria",
				hint: Mr
			}, e.key)),
			o.error ? /* @__PURE__ */ (0, $.jsx)(k, { children: o.error }) : null
		] }), /* @__PURE__ */ (0, $.jsx)(a, { children: /* @__PURE__ */ (0, $.jsx)(V, {
			type: "submit",
			...K(o.busy === "save"),
			children: "保存配置"
		}) })]
	});
}
//#endregion
//#region src/react/settings/indexer-settings.tsx
var Pr = "/api/configuration/indexers";
function Fr({ receipt: e }) {
	let t = B({
		queryKey: ["indexers"],
		queryFn: ({ signal: e }) => N(Pr, e),
		refetchOnMount: "always"
	});
	return t.error ? /* @__PURE__ */ (0, $.jsx)(k, { children: l(t.error) }) : t.isFetching ? /* @__PURE__ */ (0, $.jsx)(r, { label: "正在读取资源搜索设置" }) : t.data ? /* @__PURE__ */ (0, $.jsx)(Rr, {
		initial: t.data,
		receipt: e
	}) : null;
}
function Ir(e) {
	try {
		return new globalThis.URL(e).host;
	} catch {
		return e;
	}
}
function Lr({ row: e, index: t }) {
	let n = [
		e.url ? Ir(e.url) : "未填地址",
		e.enabled ? "已启用" : "已停用",
		e.api_key_set && !e.clear_api_key ? "已保存 API key" : e.api_key ? "API key 待保存" : "没有 API key"
	];
	return /* @__PURE__ */ (0, $.jsxs)("span", {
		className: "flex min-w-0 items-baseline gap-3",
		children: [/* @__PURE__ */ (0, $.jsx)("span", {
			className: "shrink-0 text-text-primary",
			children: e.name || `索引器 ${t + 1}`
		}), /* @__PURE__ */ (0, $.jsx)("span", {
			className: "truncate text-body-2-regular text-text-secondary",
			children: n.join(" · ")
		})]
	});
}
function Rr({ initial: e, receipt: n }) {
	let [r, o] = (0, Z.useState)(e.indexers), s = f(), c = (e, t) => o((n) => n.map((n) => n.key === e ? {
		...n,
		...t
	} : n));
	return /* @__PURE__ */ (0, $.jsxs)(t, {
		title: "资源搜索",
		onSubmit: (e) => {
			e.preventDefault(), s.run("save", (e) => L(Pr, { indexers: r }, "POST", e), (e) => {
				o(e.indexers), n("已保存索引器");
			});
		},
		children: [/* @__PURE__ */ (0, $.jsxs)(x, { children: [
			/* @__PURE__ */ (0, $.jsx)(Y, {
				summary: "索引器连接帮助",
				children: /* @__PURE__ */ (0, $.jsxs)(w, { children: [
					"填写 Prowlarr 或 Jackett 提供的 Torznab 地址和 API key。",
					" ",
					/* @__PURE__ */ (0, $.jsx)(i, {
						href: "https://github.com/peach-mitao/peach/blob/master/docs/RESOURCE_SEARCH.md",
						children: "详细配置说明"
					})
				] })
			}),
			r.map((e, t) => /* @__PURE__ */ (0, $.jsx)("div", {
				className: "min-w-0 border-t border-separator-border pt-2",
				children: /* @__PURE__ */ (0, $.jsx)(Y, {
					defaultOpen: !e.url,
					summary: /* @__PURE__ */ (0, $.jsx)(Lr, {
						row: e,
						index: t
					}),
					children: /* @__PURE__ */ (0, $.jsxs)("div", {
						className: "flex min-w-0 flex-col gap-4",
						children: [
							/* @__PURE__ */ (0, $.jsx)(G, {
								label: "名称",
								"aria-label": `索引器 ${t + 1} 名称`,
								value: e.name,
								maxLength: 80,
								isDisabled: !!s.busy,
								onChange: (t) => c(e.key, { name: t })
							}),
							/* @__PURE__ */ (0, $.jsx)(G, {
								label: "Torznab 地址",
								"aria-label": `索引器 ${t + 1} Torznab 地址`,
								value: e.url,
								type: "url",
								autoComplete: "off",
								placeholder: "索引器提供的 API 地址",
								isDisabled: !!s.busy,
								onChange: (t) => c(e.key, { url: t })
							}),
							/* @__PURE__ */ (0, $.jsx)(G, {
								label: "API key",
								"aria-label": `索引器 ${t + 1} API key`,
								type: "password",
								autoComplete: "new-password",
								value: e.api_key || "",
								placeholder: e.api_key_set ? "已保存，留空不改" : void 0,
								isDisabled: !!s.busy,
								onChange: (t) => c(e.key, { api_key: t })
							}),
							/* @__PURE__ */ (0, $.jsxs)("div", {
								className: "flex flex-wrap items-center gap-x-6 gap-y-2",
								children: [
									/* @__PURE__ */ (0, $.jsx)(ne, {
										isSelected: e.enabled,
										isDisabled: !!s.busy,
										onChange: (t) => c(e.key, { enabled: t }),
										children: "启用"
									}),
									e.api_key_set ? /* @__PURE__ */ (0, $.jsx)(ne, {
										isSelected: !!e.clear_api_key,
										isDisabled: !!s.busy,
										onChange: (t) => c(e.key, { clear_api_key: t }),
										children: "清除已保存的 API key"
									}) : null,
									/* @__PURE__ */ (0, $.jsx)(V, {
										variant: "danger",
										type: "button",
										size: "small",
										disabled: !!s.busy,
										"aria-label": `移除索引器 ${t + 1}`,
										onClick: () => o(r.filter((t) => t.key !== e.key)),
										children: "移除"
									})
								]
							})
						]
					})
				})
			}, e.key)),
			s.error ? /* @__PURE__ */ (0, $.jsx)(k, { children: s.error }) : null
		] }), /* @__PURE__ */ (0, $.jsxs)(a, { children: [/* @__PURE__ */ (0, $.jsx)(V, {
			variant: "secondary",
			type: "button",
			disabled: !!s.busy || r.length >= e.max_indexers,
			onClick: () => o([...r, {
				key: u(),
				name: "",
				url: "",
				enabled: !0,
				api_key_set: !1
			}]),
			children: "添加索引器"
		}), /* @__PURE__ */ (0, $.jsx)(V, {
			type: "submit",
			...K(s.busy === "save"),
			children: "保存配置"
		})] })]
	});
}
//#endregion
//#region src/react/settings/source-settings.tsx
function zr({ data: e, receipt: t, panel: n }) {
	let i = B({
		queryKey: C,
		queryFn: ({ signal: e }) => Se(e),
		enabled: n?.active !== !1,
		refetchOnMount: "always"
	});
	return /* @__PURE__ */ (0, $.jsxs)("div", {
		...Q(n),
		children: [
			/* @__PURE__ */ (0, $.jsx)("div", { children: /* @__PURE__ */ (0, $.jsx)(Ze, {
				href: "/sources",
				variant: "secondary",
				children: "采集来源与登录状态"
			}) }),
			i.data ? /* @__PURE__ */ (0, $.jsx)(Ar, {
				data: i.data,
				readOnly: !!e.ledger_read_only,
				toast: t,
				embedded: !0
			}) : i.error ? /* @__PURE__ */ (0, $.jsx)(q, {
				tone: "error",
				title: "来源凭据未取得",
				children: l(i.error)
			}) : n?.active === !1 ? null : /* @__PURE__ */ (0, $.jsx)(r, { label: "正在读取来源凭据" }),
			/* @__PURE__ */ (0, $.jsx)(tr, { receipt: t }),
			/* @__PURE__ */ (0, $.jsx)(Fr, { receipt: t }),
			e.entry_links ? /* @__PURE__ */ (0, $.jsx)(Nr, {
				initial: e.entry_links,
				receipt: t
			}) : null
		]
	});
}
//#endregion
//#region src/react/settings/configuration-page.tsx
function Br({ receipt: e, reopenTutorial: t, section: n = "", diagnostics: r }) {
	let i = B({
		queryKey: Ae,
		queryFn: ({ signal: e }) => se(e)
	}), a = i.data;
	return a ? /* @__PURE__ */ (0, $.jsx)(Hr, {
		data: a,
		receipt: e,
		reopenTutorial: t,
		section: n,
		diagnostics: r
	}) : /* @__PURE__ */ (0, $.jsx)("div", {
		className: "ui-configpage",
		children: /* @__PURE__ */ (0, $.jsx)(q, {
			tone: "error",
			title: "配置读取失败",
			children: i.error ? l(i.error) : "未取得配置，请刷新页面重试。"
		})
	});
}
var Vr = 0;
function Hr({ data: e, receipt: t, reopenTutorial: n, section: r, diagnostics: i }) {
	let [a] = (0, Z.useState)(() => `board-tabs-${++Vr}`), [o, s] = (0, Z.useState)(r), c = (0, Z.useRef)(null), l = (0, Z.useRef)(o);
	(0, Z.useEffect)(() => {
		s(r);
	}, [r]), (0, Z.useLayoutEffect)(() => {
		if (l.current === o) return;
		l.current = o;
		let e = c.current?.querySelector("[role=\"tablist\"]"), t = c.current?.querySelector(".ui-board-group-active");
		if (!e || !t) return;
		let n = parseFloat(getComputedStyle(e).top);
		if (!Number.isFinite(n) || e.getBoundingClientRect().top > n + 1) return;
		let r = matchMedia("(max-width:900px)").matches ? e.getBoundingClientRect().bottom + 8 : n;
		window.scrollTo(0, Math.max(0, window.scrollY + t.getBoundingClientRect().top - r));
	}, [o]);
	let u = (e) => {
		s(e), _(g(e), {
			replace: !0,
			state: Je.navigation.location.state
		});
	}, [d, f] = (0, Z.useState)(() => matchMedia("(max-width:900px)").matches);
	(0, Z.useEffect)(() => {
		let e = matchMedia("(max-width:900px)"), t = () => f(e.matches);
		return e.addEventListener("change", t), () => e.removeEventListener("change", t);
	}, []);
	let p = (0, Z.useRef)([]), h = {
		data: e,
		receipt: t
	}, v = !!(e.peach_proxy || e.access || e.tunnel || e.editable && e.port_editable !== !1), y = e.downloads, b = [
		{
			title: "媒体库与入库",
			body: (e) => /* @__PURE__ */ (0, $.jsxs)("div", {
				...Q(e),
				children: [
					/* @__PURE__ */ (0, $.jsx)(Yn, { ...h }),
					/* @__PURE__ */ (0, $.jsx)(fr, { receipt: t }),
					/* @__PURE__ */ (0, $.jsx)(ar, { receipt: t })
				]
			})
		},
		{
			title: "来源与订阅",
			body: (e) => /* @__PURE__ */ (0, $.jsx)(zr, {
				...h,
				panel: e
			})
		},
		...y ? [{
			title: "下载渠道",
			body: (e) => /* @__PURE__ */ (0, $.jsx)(Wt, {
				initial: y,
				receipt: t,
				panel: e
			})
		}] : [],
		...v ? [{
			title: "网络与访问",
			body: (e) => /* @__PURE__ */ (0, $.jsx)(Sr, {
				...h,
				panel: e
			})
		}] : [],
		{
			title: "应用与维护",
			body: (e) => /* @__PURE__ */ (0, $.jsxs)("div", {
				...Q(e),
				children: [
					/* @__PURE__ */ (0, $.jsx)(gn, { ...h }),
					/* @__PURE__ */ (0, $.jsx)(or, { receipt: t }),
					/* @__PURE__ */ (0, $.jsx)(sn, {
						...h,
						reopenTutorial: n
					})
				]
			})
		},
		{
			title: "系统诊断",
			body: (e) => /* @__PURE__ */ (0, $.jsx)("div", {
				...Q(e),
				children: e.active ? i : null
			})
		}
	], x = Math.max(0, b.findIndex((e) => e.title === o)), S = (e, t) => {
		let n = b.length - 1, r;
		if (e.key === "ArrowRight" || e.key === "ArrowDown") r = t === n ? 0 : t + 1;
		else if (e.key === "ArrowLeft" || e.key === "ArrowUp") r = t === 0 ? n : t - 1;
		else if (e.key === "Home") r = 0;
		else if (e.key === "End") r = n;
		else return;
		e.preventDefault(), u(b[r].title), p.current[r]?.focus();
	};
	return /* @__PURE__ */ (0, $.jsxs)("div", {
		ref: c,
		className: "ui-configpage",
		children: [/* @__PURE__ */ (0, $.jsx)(m, {
			className: "ui-board-local-nav",
			role: "tablist",
			"aria-label": "配置分区",
			"data-section-nav": "",
			"data-section-items": "",
			"data-pill-nav": "",
			"aria-orientation": d ? "horizontal" : "vertical",
			children: b.map(({ title: e }, t) => /* @__PURE__ */ (0, $.jsx)("button", {
				ref: (e) => {
					p.current[t] = e;
				},
				type: "button",
				role: "tab",
				id: `${a}-tab-${t}`,
				"aria-controls": `${a}-panel-${t}-0`,
				"aria-selected": t === x,
				"data-pill-selected": t === x ? "" : void 0,
				"data-pill-variant": "gray",
				tabIndex: t === x ? 0 : -1,
				onClick: () => u(e),
				onKeyDown: (e) => S(e, t),
				children: e
			}, e))
		}), b.map(({ title: e, body: t }, n) => /* @__PURE__ */ (0, $.jsxs)(Z.Fragment, { children: [/* @__PURE__ */ (0, $.jsx)("h2", {
			className: "ui-configgroup",
			children: e
		}), t({
			index: n,
			id: `${a}-panel-${n}-0`,
			labelledBy: `${a}-tab-${n}`,
			active: n === x
		})] }, e))]
	});
}
//#endregion
export { Br as ConfigurationPage };

//# debugId=f6e2087e-7d61-4ffe-b8ff-08e1af977d0d