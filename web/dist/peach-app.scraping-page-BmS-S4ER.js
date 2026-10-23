(function() {
	try {
		var e = typeof window < "u" ? window : typeof global < "u" ? global : typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : {}, t = new e.Error().stack;
		t && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[t] = "347ce486-baf6-4625-a635-d065a089de65", e._sentryDebugIdIdentifier = "sentry-dbid-347ce486-baf6-4625-a635-d065a089de65");
	} catch {}
})();
import { Aa as e, At as t, Ba as n, Bo as r, Ca as i, Ct as a, Da as o, Dt as s, Ea as c, Et as l, Gl as u, Ha as d, Il as f, Jl as p, Kt as m, Ma as h, Mt as g, Nt as _, Oa as v, Ot as y, Pa as ee, Sa as b, Sc as x, St as S, Ta as C, Tt as w, Wa as te, Wl as T, Xa as E, _a as ne, au as D, bt as O, cu as k, fa as re, fs as A, ga as ie, ht as j, iu as M, jt as N, ka as ae, kt as P, lo as F, ma as oe, mn as I, pa as se, pu as L, ro as R, so as z, ss as ce, uu as B, vt as V, wa as H, wc as U, wt as W, xa as G, yt as le } from "./peach-app.js";
import { t as ue } from "./peach-app.code-block-De9b0xOF.js";
import { t as K } from "./peach-app.page-BYr6f5ud.js";
import { n as q } from "./peach-app.site-mark-C-FsZf9f.js";
import { t as de } from "./peach-app.connection-status-Pa6aDai7.js";
//#region src/react/scraping/custom-sources.tsx
var J = /* @__PURE__ */ L(B(), 1), Y = k(), fe = [
	["code", "番号"],
	["title", "标题"],
	["studio", "厂牌"],
	["series", "系列"],
	["release_date", "发行日期"],
	["performers", "演员（文本数组）"],
	["tags", "标签（文本数组）"]
], pe = [
	["censored", "有码"],
	["amateur", "素人"],
	["uncensored", "无码"],
	["fc2", "FC2"],
	["kmib", "韩国 MIB"],
	["other", "其他"],
	["unsure", "待核番号"],
	["unknown", "未知"]
], me = () => ({
	name: "",
	endpoint: "",
	enabled: !1,
	fields: {
		code: "id",
		title: "title"
	},
	content_types: ["censored"]
});
function he({ receipt: t }) {
	let [n, r] = (0, J.useState)(null), i = D({
		queryKey: N,
		queryFn: ({ signal: e }) => _(e)
	}), a = d(), s = (e) => f.setQueryData(N, e), c = !!(i.isPending || i.error || i.data?.items.length || a.error), l = /* @__PURE__ */ (0, Y.jsx)(A, {
		variant: "secondary",
		onClick: () => r(me()),
		children: "添加来源"
	});
	return /* @__PURE__ */ (0, Y.jsxs)(e, {
		title: "自定义元数据来源",
		children: [
			c ? /* @__PURE__ */ (0, Y.jsxs)(h, { children: [
				i.isPending ? /* @__PURE__ */ (0, Y.jsx)("div", {
					"aria-busy": "true",
					"data-skeleton": "",
					"aria-label": "读取自定义来源"
				}) : null,
				i.error ? /* @__PURE__ */ (0, Y.jsx)(b, { children: u(i.error) }) : null,
				i.data?.items.map((e) => /* @__PURE__ */ (0, Y.jsxs)("div", {
					className: "flex flex-wrap items-center gap-3",
					children: [
						/* @__PURE__ */ (0, Y.jsx)("span", {
							className: "min-w-0 flex-1",
							children: e.name
						}),
						/* @__PURE__ */ (0, Y.jsx)(m, {
							tone: e.enabled ? "success" : "neutral",
							children: e.enabled ? "已启用" : "已停用"
						}),
						/* @__PURE__ */ (0, Y.jsx)(A, {
							variant: "secondary",
							onClick: () => r(e),
							children: "编辑"
						}),
						/* @__PURE__ */ (0, Y.jsx)(A, {
							variant: "secondary",
							...R(a.busy === e.id),
							onClick: () => void a.run(e.id, (t) => T(g, {
								...e,
								enabled: !e.enabled
							}, "POST", t), (n) => {
								s(n), t(e.enabled ? "已停用来源" : "已启用来源");
							}),
							children: e.enabled ? "停用" : "启用"
						}),
						/* @__PURE__ */ (0, Y.jsx)(A, {
							variant: "danger",
							onClick: () => x({
								title: "删除自定义来源",
								body: `删除「${p(e.name)}」后，采集将不再查询这个来源。`,
								confirmLabel: "删除来源",
								danger: !0,
								onConfirm: async () => {
									s(await T(g, {
										action: "delete",
										id: e.id
									})), r(null), t("已删除来源");
								}
							}),
							children: "删除"
						})
					]
				}, e.id)),
				a.error ? /* @__PURE__ */ (0, Y.jsx)(b, { children: a.error }) : null
			] }) : null,
			n ? null : c ? /* @__PURE__ */ (0, Y.jsx)(o, { children: l }) : /* @__PURE__ */ (0, Y.jsx)(h, { children: /* @__PURE__ */ (0, Y.jsx)("div", {
				className: "flex justify-end",
				children: l
			}) }),
			n ? /* @__PURE__ */ (0, Y.jsx)(ge, {
				initial: n,
				cancel: () => r(null),
				saved: (e) => {
					s(e), r(null), t("已保存来源");
				}
			}, n.id || "new") : null
		]
	});
}
function ge({ initial: e, cancel: t, saved: n }) {
	let [r, i] = (0, J.useState)(e), [a, s] = (0, J.useState)(""), [l, f] = (0, J.useState)(""), p = (0, J.useRef)(0), m = d(), _ = (e) => {
		p.current++, i((t) => ({
			...t,
			...e
		})), f("");
	};
	return /* @__PURE__ */ (0, Y.jsxs)("form", {
		"aria-label": "元数据来源配置",
		"aria-busy": m.busy === "preview",
		onSubmit: (e) => {
			e.preventDefault(), m.run("save", (e) => T(g, r, "POST", e), n);
		},
		children: [/* @__PURE__ */ (0, Y.jsxs)(h, { children: [
			/* @__PURE__ */ (0, Y.jsx)(F, {
				label: "来源名称",
				value: r.name,
				maxLength: 80,
				onChange: (e) => _({ name: e })
			}),
			/* @__PURE__ */ (0, Y.jsx)(F, {
				label: "JSON 接口地址",
				value: r.endpoint,
				maxLength: 2048,
				placeholder: "https://example.com/api/movies/{code}",
				onChange: (e) => _({ endpoint: e })
			}),
			/* @__PURE__ */ (0, Y.jsxs)("div", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ (0, Y.jsx)(c, { children: "来源连接方式" }), /* @__PURE__ */ (0, Y.jsx)(j, {
					id: "custom-source-network",
					label: "来源连接方式",
					epoch: 0,
					value: r.network || "direct",
					options: [["direct", "直连"], ["peach_proxy", "Peach 代理"]],
					onPick: (e) => _({ network: e })
				})]
			}),
			/* @__PURE__ */ (0, Y.jsxs)("div", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ (0, Y.jsx)(c, { children: "接口番号格式" }), /* @__PURE__ */ (0, Y.jsx)(j, {
					id: "custom-source-code-format",
					label: "接口番号格式",
					epoch: 0,
					value: r.code_format || "original",
					options: [
						["original", "原样"],
						["lowercase", "小写"],
						["compact", "去掉连字符"],
						["underscore", "连字符转下划线"]
					],
					onPick: (e) => _({ code_format: e })
				})]
			}),
			/* @__PURE__ */ (0, Y.jsx)(v, { children: "填写公开 JSON 接口和响应字段路径，例如 data.title。番号字段用于核对作品身份。" }),
			fe.map(([e, t]) => /* @__PURE__ */ (0, Y.jsx)(F, {
				label: `${t}字段路径`,
				value: r.fields[e] || "",
				onChange: (t) => {
					let n = { ...r.fields };
					t ? n[e] = t : delete n[e], _({ fields: n });
				}
			}, e)),
			/* @__PURE__ */ (0, Y.jsx)("div", {
				className: "flex flex-wrap gap-3",
				role: "group",
				"aria-label": "适用内容类型",
				children: pe.map(([e, t]) => /* @__PURE__ */ (0, Y.jsx)(E, {
					isSelected: r.content_types.includes(e),
					onChange: (t) => _({ content_types: t ? [...r.content_types, e] : r.content_types.filter((t) => t !== e) }),
					children: t
				}, e))
			}),
			/* @__PURE__ */ (0, Y.jsx)(E, {
				isSelected: r.enabled,
				onChange: (e) => _({ enabled: e }),
				children: "启用来源"
			}),
			/* @__PURE__ */ (0, Y.jsx)(F, {
				label: "试查番号（回车查询）",
				value: a,
				onChange: (e) => {
					p.current++, s(e), f("");
				},
				onKeyDown: (e) => {
					if (e.key !== "Enter" || e.nativeEvent.isComposing) return;
					e.preventDefault();
					let t = p.current;
					m.run("preview", (e) => T(g, {
						...r,
						code: a,
						action: "preview"
					}, "POST", e), (e) => {
						t === p.current && f(JSON.stringify(e.record, null, 2));
					}, (e) => {
						t === p.current && m.setError(u(e));
					});
				}
			}),
			m.busy === "preview" ? /* @__PURE__ */ (0, Y.jsxs)(v, {
				role: "status",
				children: [/* @__PURE__ */ (0, Y.jsx)("span", { dangerouslySetInnerHTML: { __html: U("正在试查来源") } }), "正在试查来源"]
			}) : null,
			l ? /* @__PURE__ */ (0, Y.jsx)(ue, {
				code: l,
				language: "json",
				label: "元数据接口返回"
			}) : null,
			m.error ? /* @__PURE__ */ (0, Y.jsx)(b, { children: m.error }) : null
		] }), /* @__PURE__ */ (0, Y.jsxs)(o, { children: [/* @__PURE__ */ (0, Y.jsx)(A, {
			variant: "secondary",
			type: "button",
			onClick: t,
			children: "取消"
		}), /* @__PURE__ */ (0, Y.jsx)(A, {
			type: "submit",
			...R(m.busy === "save"),
			children: "保存来源"
		})] })]
	});
}
//#endregion
//#region src/react/scraping/scraping-page.tsx
var X = [["peach", "Peach 代理"], ["direct", "直接连接"]];
function Z(e) {
	return X.some(([t]) => t === e) || !e ? [...X] : [...X, [e, e]];
}
function Q(e) {
	try {
		return new URL(e).host || e;
	} catch {
		return e;
	}
}
var $ = [["paste", "粘贴 Cookie"], ["file", "导入文件"]];
function _e() {
	return /* @__PURE__ */ (0, Y.jsx)(q, { source: "github" });
}
function ve({ source: t, toast: n }) {
	let [d, p] = (0, J.useState)(t.network), [g, _] = (0, J.useState)(""), [v, y] = (0, J.useState)(""), [x, S] = (0, J.useState)($[0][0]), [C, E] = (0, J.useState)(""), [D, O] = (0, J.useState)(""), k = (0, J.useRef)(null);
	function j() {
		_(""), y(""), E(""), O(""), k.current && (k.current.value = "");
	}
	let N = M({
		mutationFn: (e) => T(l, {
			source: t.source,
			network: d,
			cookie: g,
			cookies_text: v,
			revoke: e
		}),
		onSuccess: (e, t) => {
			f.setQueryData(w, (t) => t && {
				...t,
				sources: t.sources.map((t) => t.source === e.saved.source ? e.saved : t)
			}), j(), n(t ? "Cookie 已撤销" : "来源设置已保存");
		}
	}), P = M({ mutationFn: () => T(a, { source: t.source }) }), I = N.isPending || P.isPending, L = (e) => {
		e.preventDefault(), !I && (P.reset(), N.mutate(!1));
	}, B = () => {
		I || (P.reset(), N.mutate(!0));
	}, V = () => {
		I || (N.reset(), P.mutate());
	};
	async function H(e) {
		let t = e.currentTarget, n = t.files?.[0];
		if (y(""), O(""), !n) E("");
		else if (n.size > 262144) t.value = "", E(""), O("Cookie 文本超过 256 KiB");
		else try {
			let e = await n.text();
			y(e), E(n.name);
		} catch {
			O("Cookie 文件未读取，请重新选择");
		}
	}
	let U = D || (N.error ? u(N.error) : "") || (P.error ? u(P.error) : ""), W = P.data?.results ?? [], G = d === "peach" || t.accepts_cookie || t.browser || !!U || W.length > 0;
	return /* @__PURE__ */ (0, Y.jsxs)(e, {
		title: t.label,
		onSubmit: L,
		aside: /* @__PURE__ */ (0, Y.jsxs)("span", {
			className: "flex min-w-0 items-center gap-1",
			children: [/* @__PURE__ */ (0, Y.jsx)(q, { source: t.source }), t.login ? /* @__PURE__ */ (0, Y.jsx)(i, {
				href: t.login,
				children: Q(t.login)
			}) : null]
		}),
		children: [
			/* @__PURE__ */ (0, Y.jsx)(ae, { children: /* @__PURE__ */ (0, Y.jsx)(ee, {
				label: "连接方式",
				children: /* @__PURE__ */ (0, Y.jsx)(ie, {
					"aria-label": "连接方式",
					className: "w-44 min-w-0",
					selectedKey: d,
					onSelectionChange: (e) => {
						e !== null && p(String(e));
					},
					children: Z(d).map(([e, t]) => /* @__PURE__ */ (0, Y.jsx)(ne, {
						id: e,
						children: t
					}, e))
				})
			}) }),
			t.cooldown_until && t.cooldown_until > Date.now() / 1e3 ? /* @__PURE__ */ (0, Y.jsx)(z, {
				tone: "warning",
				children: /* @__PURE__ */ (0, Y.jsxs)("span", {
					className: "inline-flex flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ (0, Y.jsx)(m, {
						tone: "warning",
						children: "冷却中"
					}), /* @__PURE__ */ (0, Y.jsxs)("span", { children: [
						"可在 ",
						(/* @__PURE__ */ new Date(t.cooldown_until * 1e3)).toLocaleString("zh-CN"),
						" 后重试。"
					] })]
				})
			}) : null,
			G ? /* @__PURE__ */ (0, Y.jsxs)(h, {
				divided: !0,
				children: [
					d === "peach" ? /* @__PURE__ */ (0, Y.jsx)("span", {
						className: "self-start",
						children: /* @__PURE__ */ (0, Y.jsx)(te, {
							href: "/settings/library#peachProxy",
							size: "small",
							trailingIcon: r,
							children: "配置 Peach 代理"
						})
					}) : null,
					t.browser ? /* @__PURE__ */ (0, Y.jsx)("p", {
						className: "text-body-2-regular text-text-secondary",
						children: "人机验证由本机浏览器自动完成；需要点击时窗口会弹出。这台机器上不需要 Cookie。"
					}) : null,
					t.accepts_cookie && !t.browser ? /* @__PURE__ */ (0, Y.jsxs)(Y.Fragment, { children: [
						/* @__PURE__ */ (0, Y.jsxs)("div", {
							className: "flex flex-col gap-2",
							children: [/* @__PURE__ */ (0, Y.jsx)("span", {
								className: "self-start",
								children: /* @__PURE__ */ (0, Y.jsx)(m, {
									tone: t.cookie_saved ? "success" : "neutral",
									children: t.cookie_saved ? "Cookie 已保存" : "Cookie 未配置"
								})
							}), /* @__PURE__ */ (0, Y.jsx)("p", {
								className: "text-body-2-regular text-text-secondary",
								children: t.cookie_saved ? "登录有效性待验证。" : "需要登录时，任选一种方式提供 Cookie。"
							})]
						}),
						/* @__PURE__ */ (0, Y.jsx)(oe, {
							"aria-label": "提供 Cookie 的方式（二选一）",
							value: x,
							onChange: (e) => {
								S(e), j();
							},
							className: se,
							children: $.map(([e, t]) => /* @__PURE__ */ (0, Y.jsx)(ce, {
								value: e,
								className: re,
								children: t
							}, e))
						}),
						x === "paste" ? /* @__PURE__ */ (0, Y.jsx)(F, {
							type: "password",
							label: "Cookie",
							autoComplete: "off",
							value: g,
							onChange: _
						}) : /* @__PURE__ */ (0, Y.jsxs)("div", {
							className: "flex flex-col gap-2",
							children: [
								/* @__PURE__ */ (0, Y.jsx)(c, { children: "Netscape Cookie 文件（.txt）" }),
								/* @__PURE__ */ (0, Y.jsxs)("div", {
									className: "flex flex-wrap items-center gap-3",
									children: [/* @__PURE__ */ (0, Y.jsx)(A, {
										variant: "secondary",
										onClick: () => k.current?.click(),
										children: "选择文件"
									}), /* @__PURE__ */ (0, Y.jsx)("span", {
										className: "min-w-0 text-body-2-regular break-all text-text-secondary",
										children: C || "未选择文件"
									})]
								}),
								/* @__PURE__ */ (0, Y.jsx)("input", {
									ref: k,
									type: "file",
									accept: ".txt",
									tabIndex: -1,
									"aria-hidden": !0,
									className: "hidden",
									onChange: (e) => {
										H(e);
									}
								})
							]
						})
					] }) : null,
					U ? /* @__PURE__ */ (0, Y.jsx)(b, { children: U }) : null,
					W.map((e) => /* @__PURE__ */ (0, Y.jsx)(z, {
						tone: e.ok ? "success" : "error",
						children: /* @__PURE__ */ (0, Y.jsxs)("span", {
							className: "flex flex-col items-start gap-1",
							children: [/* @__PURE__ */ (0, Y.jsx)(de, {
								tone: e.ok ? "success" : "error",
								children: e.ok ? "可访问" : "连接失败"
							}), /* @__PURE__ */ (0, Y.jsx)("span", { children: s(e, t.label) })]
						})
					}, e.label))
				]
			}) : null,
			/* @__PURE__ */ (0, Y.jsxs)(o, { children: [
				t.accepts_cookie && t.cookie_saved ? /* @__PURE__ */ (0, Y.jsx)(A, {
					variant: "secondary",
					onClick: B,
					...R(I),
					children: "撤销 Cookie"
				}) : null,
				/* @__PURE__ */ (0, Y.jsx)(A, {
					variant: "secondary",
					onClick: V,
					...R(I),
					children: "检查连接"
				}),
				/* @__PURE__ */ (0, Y.jsx)(A, {
					type: "submit",
					...R(I),
					children: "保存"
				})
			] })
		]
	});
}
function ye({ toast: t }) {
	let [r, i] = (0, J.useState)(""), { running: a, outcome: o, start: s } = I({
		queryKey: S,
		queryFn: ({ signal: e }) => P(e),
		start: () => T(W, { code: r }),
		onFinish: (e) => {
			e.status === "complete" && t(e.result || "封面采集完成");
		}
	}), c = (e) => {
		e.preventDefault(), !(a || s.isPending || !r.trim()) && s.mutate();
	}, l = s.error ? u(s.error) : o?.status === "failed" ? o.error || "采集未取得" : "";
	return /* @__PURE__ */ (0, Y.jsx)(e, {
		title: "高清封面",
		onSubmit: c,
		children: /* @__PURE__ */ (0, Y.jsxs)(h, { children: [
			/* @__PURE__ */ (0, Y.jsxs)("div", {
				className: "flex flex-wrap items-end gap-2",
				children: [/* @__PURE__ */ (0, Y.jsx)("div", {
					className: "min-w-0 flex-1",
					children: /* @__PURE__ */ (0, Y.jsx)(F, {
						"aria-label": "馆藏番号",
						isRequired: !0,
						isDisabled: a,
						value: r,
						onChange: i,
						placeholder: "输入馆藏番号，如 ABW-232"
					})
				}), /* @__PURE__ */ (0, Y.jsx)(A, {
					type: "submit",
					disabled: !r.trim(),
					...R(a || s.isPending),
					children: "抓取封面"
				})]
			}),
			a ? /* @__PURE__ */ (0, Y.jsx)(n, { label: "正在抓取封面" }) : null,
			l ? /* @__PURE__ */ (0, Y.jsx)(z, {
				tone: "error",
				children: l
			}) : null,
			o?.status === "complete" ? /* @__PURE__ */ (0, Y.jsx)(z, {
				tone: "success",
				children: o.result || "封面采集完成"
			}) : null
		] })
	});
}
function be({ toast: t }) {
	let { query: r, running: a, outcome: s, start: c } = I({
		queryKey: le,
		queryFn: ({ signal: e }) => y(e),
		start: () => T(O, {}),
		jobOf: (e) => e.job,
		withJob: (e, t) => e && {
			...e,
			job: t
		},
		onFinish: (e) => {
			e.status === "complete" && t(e.result || "amane 桥已重建");
		}
	}), l = M({ mutationFn: () => T(V, {}) }), d = r.data;
	if (!d) return r.error ? /* @__PURE__ */ (0, Y.jsx)(e, {
		id: "amane",
		title: "amane",
		children: /* @__PURE__ */ (0, Y.jsx)(h, { children: /* @__PURE__ */ (0, Y.jsx)(z, {
			tone: "error",
			children: u(r.error)
		}) })
	}) : null;
	let f = a || c.isPending || l.isPending, p = c.error ? u(c.error) : l.error ? u(l.error) : s?.status === "failed" ? s.error || "重建未完成" : "";
	return /* @__PURE__ */ (0, Y.jsxs)(e, {
		id: "amane",
		title: "amane",
		aside: /* @__PURE__ */ (0, Y.jsx)(i, {
			href: d.repository,
			leadingIcon: _e,
			children: d.repository
		}),
		children: [
			/* @__PURE__ */ (0, Y.jsxs)(C, { children: [
				/* @__PURE__ */ (0, Y.jsx)(H, {
					term: "已安装版本",
					children: d.installed_version || "未安装"
				}),
				/* @__PURE__ */ (0, Y.jsx)(H, {
					term: "上游最新版本",
					children: l.data?.latest ?? "尚未检查"
				}),
				/* @__PURE__ */ (0, Y.jsx)(H, {
					term: "运行环境",
					children: d.installed ? "已安装" : "未安装"
				}),
				/* @__PURE__ */ (0, Y.jsxs)(H, {
					term: "内置站点",
					children: [d.sites.length.toLocaleString(), " 个"]
				})
			] }),
			/* @__PURE__ */ (0, Y.jsxs)(h, {
				divided: !0,
				children: [
					d.sites.length ? /* @__PURE__ */ (0, Y.jsx)(G, {
						summary: "查看内置站点",
						children: /* @__PURE__ */ (0, Y.jsx)("p", {
							className: "text-body-2-regular text-text-secondary",
							children: d.sites.map((e) => e.label).join("、")
						})
					}) : null,
					d.problem ? /* @__PURE__ */ (0, Y.jsx)(z, {
						tone: "error",
						children: d.problem
					}) : /* @__PURE__ */ (0, Y.jsxs)(v, { children: [
						"已安装版本：",
						d.installed_version || "未安装",
						"。amane（",
						d.license,
						"）提供这些内置站点的解析能力。 重新安装会使用 Peach 内置的 ",
						d.version,
						" 版本，不随上游自动升级。"
					] }),
					a ? /* @__PURE__ */ (0, Y.jsx)(n, { label: "正在重建运行环境" }) : null,
					p ? /* @__PURE__ */ (0, Y.jsx)(z, {
						tone: "error",
						children: p
					}) : null,
					s?.status === "complete" ? /* @__PURE__ */ (0, Y.jsx)(z, {
						tone: "success",
						children: s.result || "amane 桥已重建"
					}) : null
				]
			}),
			/* @__PURE__ */ (0, Y.jsxs)(o, { children: [/* @__PURE__ */ (0, Y.jsx)(A, {
				variant: "secondary",
				onClick: () => {
					f || l.mutate();
				},
				...R(l.isPending),
				children: "检查上游版本"
			}), /* @__PURE__ */ (0, Y.jsx)(A, {
				disabled: !!d.problem,
				onClick: () => {
					f || c.mutate();
				},
				...R(a || c.isPending),
				children: d.installed ? "重新安装" : "安装"
			})] })
		]
	});
}
function xe({ toast: e }) {
	let n = D({
		queryKey: w,
		queryFn: ({ signal: e }) => t(e)
	}), r = n.data;
	return r ? /* @__PURE__ */ (0, Y.jsxs)(K, { children: [
		/* @__PURE__ */ (0, Y.jsx)("p", {
			className: "text-body-2-regular text-text-secondary",
			children: "高清图片可能要经代理才能下载，先检查连接。"
		}),
		/* @__PURE__ */ (0, Y.jsx)(ye, { toast: e }),
		/* @__PURE__ */ (0, Y.jsx)(he, { receipt: e }),
		(r.sources || []).map((t) => /* @__PURE__ */ (0, Y.jsx)(ve, {
			source: t,
			toast: e
		}, t.source)),
		/* @__PURE__ */ (0, Y.jsx)(be, { toast: e })
	] }) : /* @__PURE__ */ (0, Y.jsx)(K, { children: /* @__PURE__ */ (0, Y.jsx)(z, {
		tone: "error",
		title: "采集来源读取失败",
		children: n.error ? u(n.error) : "读取采集来源失败"
	}) });
}
//#endregion
export { xe as ScrapingPage, Q as linkHost, Z as networkOptions };

//# debugId=347ce486-baf6-4625-a635-d065a089de65