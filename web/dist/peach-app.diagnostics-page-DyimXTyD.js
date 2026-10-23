(function() {
	try {
		var e = typeof window < "u" ? window : typeof global < "u" ? global : typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : {}, t = new e.Error().stack;
		t && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[t] = "155d273a-7626-4b0f-9396-3ab50cbeb9c8", e._sentryDebugIdIdentifier = "sentry-dbid-155d273a-7626-4b0f-9396-3ab50cbeb9c8");
	} catch {}
})();
import { Aa as e, Fa as t, Gl as n, Ha as r, Ja as i, Jo as a, Kl as o, Ma as s, Na as c, Ta as l, Us as u, Wa as d, Xl as f, Zl as p, au as m, cu as h, dn as g, fn as _, fs as v, hn as y, mt as b, oo as x, ps as S, pu as C, qa as w, ro as T, so as E, uu as D, wa as O, xa as k } from "./peach-app.js";
import { n as A } from "./peach-app.error-excerpt-5tEehQuQ.js";
import { t as j } from "./peach-app.data-table-BCsefVBk.js";
import { n as M } from "./peach-app.site-mark-C-FsZf9f.js";
//#region src/react/diagnostics/health-list.tsx
var N = /* @__PURE__ */ C(D(), 1), P = h(), F = (e) => e.title || e.name || e.code || `作品 #${e.id}`, I = (e) => [[
	"作品",
	"番号",
	"文件名",
	"媒体库",
	"路径",
	"时长（秒）",
	"大小（字节）"
], ...e.map((e) => [
	F(e),
	e.code ?? "",
	e.name,
	o[e.location] || e.location,
	e.path,
	e.duration ?? "",
	e.size ?? ""
])].map((e) => e.map((e) => String(e ?? "").replace(/[\t\r\n]+/g, " ")).join("	")).join("\n");
function L({ group: e, openItem: t, receipt: n }) {
	let i = r(), [c, l] = (0, N.useState)([]), u = (e) => void i.run("copy", () => navigator.clipboard.writeText(I(e)), () => n("已复制清单")), m = [
		{
			id: "title",
			label: "作品",
			value: F,
			render: (e) => /* @__PURE__ */ (0, P.jsxs)("span", {
				className: "flex min-w-0 flex-col gap-1",
				children: [/* @__PURE__ */ (0, P.jsx)(d, {
					variant: "primary",
					className: "justify-start whitespace-normal text-left",
					onClick: () => t(e.id),
					children: F(e)
				}), e.name && e.name !== F(e) ? /* @__PURE__ */ (0, P.jsx)("span", {
					"data-middle-truncate": !0,
					title: e.name,
					className: "block min-w-0 text-caption-1-regular text-text-secondary",
					children: e.name
				}) : null]
			})
		},
		{
			id: "code",
			label: "番号",
			width: 144,
			value: (e) => e.code || "",
			render: (e) => /* @__PURE__ */ (0, P.jsx)("span", {
				className: "whitespace-nowrap",
				children: e.code || "未识别"
			})
		},
		{
			id: "location",
			label: "媒体库",
			width: 128,
			value: (e) => o[e.location] || e.location,
			render: (e) => o[e.location] || e.location || "未取得"
		},
		{
			id: "path",
			label: "文件路径",
			width: 320,
			min: 180,
			value: (e) => e.path,
			render: (e) => /* @__PURE__ */ (0, P.jsx)("span", {
				"data-middle-truncate": !0,
				title: e.path,
				className: "block min-w-0 w-full text-body-2-regular text-text-secondary",
				children: e.path || "未取得"
			})
		},
		{
			id: "duration",
			label: "时长",
			width: 112,
			value: (e) => e.duration ?? 0,
			render: (e) => e.duration && e.duration > 0 ? f(e.duration) : "未取得"
		},
		{
			id: "size",
			label: "大小",
			width: 112,
			value: (e) => e.size ?? 0,
			render: (e) => e.size === null ? "未取得" : p(e.size)
		}
	];
	return /* @__PURE__ */ (0, P.jsx)(k, {
		summary: `${e.label} · ${e.count === null ? "未取得" : `${e.count.toLocaleString()} 项`}`,
		children: e.count === null ? /* @__PURE__ */ (0, P.jsx)(E, {
			tone: "neutral",
			children: "清单未取得，请重新检查。"
		}) : e.items.length ? /* @__PURE__ */ (0, P.jsxs)(s, { children: [
			/* @__PURE__ */ (0, P.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-2",
				children: [e.truncated ? /* @__PURE__ */ (0, P.jsxs)("span", {
					className: "text-body-2-regular text-text-secondary",
					children: [
						"已载入 ",
						e.items.length.toLocaleString(),
						" / ",
						e.count.toLocaleString(),
						" 项"
					]
				}) : null, /* @__PURE__ */ (0, P.jsx)(v, {
					size: "small",
					variant: "secondary",
					...T(i.busy === "copy"),
					onClick: () => u(e.items),
					children: "复制当前清单"
				})]
			}),
			i.error ? /* @__PURE__ */ (0, P.jsx)(E, {
				tone: "error",
				children: i.error
			}) : null,
			/* @__PURE__ */ (0, P.jsx)(j, {
				label: e.label,
				title: "作品清单",
				unit: "部作品",
				panel: !1,
				items: e.items,
				columns: m,
				rowId: (e) => String(e.id),
				rowLabel: F,
				selected: c,
				onSelected: l,
				actions: (e) => /* @__PURE__ */ (0, P.jsx)(v, {
					size: "small",
					variant: "secondary",
					...T(i.busy === "copy"),
					onClick: () => u(e),
					children: "复制所选"
				})
			})
		] }) : /* @__PURE__ */ (0, P.jsx)(x, {
			icon: a,
			title: "清单为空",
			size: "compact",
			children: "没有需要处理的作品。"
		})
	});
}
//#endregion
//#region src/react/diagnostics/diagnostics-page.tsx
var R = {
	ok: "正常",
	warning: "需检查",
	failed: "需处理",
	unknown: "未取得",
	disabled: "未配置",
	stale: "待复查",
	unchecked: "尚无记录"
}, z = { "/tasks": "查看任务" }, B = [
	["媒体库与挂载", ["media_mounts", "data_root"]],
	["数据库与迁移", ["database", "schema"]],
	["工具", ["ffmpeg"]],
	["配置与访问", [
		"configured",
		"security",
		"port",
		"version"
	]],
	["后台任务", ["tasks"]]
], V = (e) => new Date(e).toLocaleString();
function H({ status: e }) {
	return /* @__PURE__ */ (0, P.jsx)(y, {
		variant: "caption",
		"data-diagnostic-status": e,
		color: e === "failed" ? "rose" : e === "ok" ? "lime" : e === "warning" || e === "stale" ? "yellow" : "neutral",
		children: R[e] ?? "未取得"
	});
}
function U() {
	let e = r();
	return /* @__PURE__ */ (0, P.jsxs)("div", {
		className: "flex flex-col items-end gap-2",
		children: [/* @__PURE__ */ (0, P.jsx)(v, {
			variant: "secondary",
			onClick: () => void e.run("download", async () => {
				let e = await fetch("/api/diagnostics/bundle", { credentials: "same-origin" });
				if (!e.ok) throw Error(`诊断报告下载失败（HTTP ${e.status}）`);
				let t = URL.createObjectURL(await e.blob()), n = document.createElement("a");
				n.href = t, n.download = "peach-support.zip", document.body.append(n);
				try {
					n.click();
				} finally {
					n.remove(), setTimeout(() => URL.revokeObjectURL(t), 1e3);
				}
			}, () => {}),
			...T(e.busy === "download"),
			children: "下载诊断报告"
		}), e.error ? /* @__PURE__ */ (0, P.jsx)(E, {
			tone: "error",
			children: e.error
		}) : null]
	});
}
function W({ name: e, check: t, compact: n = !1 }) {
	let r = t.target === "/settings/library" && (e === "security" || e === "port") ? i("网络与访问") : t.target, a = n ? "h4" : "h3";
	return /* @__PURE__ */ (0, P.jsxs)("div", {
		"data-diagnostic-check": e,
		className: u("flex flex-col gap-4 border-b border-separator-border pr-3 last:border-b-0 sm:flex-row sm:items-center sm:justify-between", n ? "py-3" : "py-5"),
		children: [/* @__PURE__ */ (0, P.jsxs)("div", {
			className: u("flex min-w-0 flex-1 flex-col", n ? "gap-1" : "gap-2"),
			children: [
				/* @__PURE__ */ (0, P.jsxs)("div", {
					className: "flex flex-wrap items-center gap-3",
					children: [/* @__PURE__ */ (0, P.jsx)(a, {
						className: u("text-text-primary", n ? "text-body-2-medium" : "text-body-medium"),
						children: t.label
					}), /* @__PURE__ */ (0, P.jsx)(H, { status: t.status })]
				}),
				/* @__PURE__ */ (0, P.jsx)("p", {
					"data-check-reason": !0,
					className: u("text-body-2-regular break-words", n ? "text-text-secondary" : "text-text-primary"),
					children: t.reason
				}),
				t.action ? /* @__PURE__ */ (0, P.jsxs)("p", {
					className: "text-body-2-regular text-text-secondary",
					children: ["处理建议：", t.action]
				}) : null
			]
		}), r ? /* @__PURE__ */ (0, P.jsx)("div", {
			className: "shrink-0 self-end sm:self-auto",
			children: /* @__PURE__ */ (0, P.jsx)(S, {
				size: "small",
				variant: "secondary",
				href: r,
				children: r.startsWith("/settings/") ? `打开${w(r)}` : z[r] ?? "打开相关页面"
			})
		}) : null]
	});
}
function G(i) {
	let a = m({
		queryKey: g,
		queryFn: ({ signal: e }) => _(e),
		staleTime: 1e4
	}), o = r(), [u, d] = (0, N.useState)(""), f = () => void o.run("refresh", async () => {
		let e = await a.refetch();
		if (e.error) throw e.error;
		return e.data;
	}, () => d(""), (e) => d(n(e))), p = a.data;
	if (!p && a.isPending) return /* @__PURE__ */ (0, P.jsx)("div", {
		role: "status",
		"aria-label": "正在读取系统诊断",
		dangerouslySetInnerHTML: { __html: b() }
	});
	if (!p) return /* @__PURE__ */ (0, P.jsxs)("div", {
		className: "ui-configpage",
		children: [/* @__PURE__ */ (0, P.jsx)(U, {}), /* @__PURE__ */ (0, P.jsx)(E, {
			tone: "error",
			title: "诊断读取失败",
			action: /* @__PURE__ */ (0, P.jsx)(v, {
				variant: "secondary",
				onClick: f,
				...T(o.busy === "refresh"),
				children: "重新检查"
			}),
			children: a.error ? n(a.error) : "诊断报告未取得。"
		})]
	});
	let h = Object.entries(p.checks).filter(([, e]) => [
		"warning",
		"failed",
		"unknown"
	].includes(e.status)), y = Object.entries(p.checks).filter(([, e]) => ![
		"warning",
		"failed",
		"unknown"
	].includes(e.status));
	return /* @__PURE__ */ (0, P.jsxs)("div", {
		className: "flex min-w-0 flex-col gap-6",
		children: [
			/* @__PURE__ */ (0, P.jsxs)("div", {
				className: "flex flex-wrap justify-end gap-2",
				children: [/* @__PURE__ */ (0, P.jsx)(U, {}), /* @__PURE__ */ (0, P.jsx)(v, {
					variant: "secondary",
					onClick: f,
					...T(o.busy === "refresh"),
					children: "重新检查"
				})]
			}),
			u ? /* @__PURE__ */ (0, P.jsx)(E, {
				tone: "error",
				children: u
			}) : null,
			h.length ? /* @__PURE__ */ (0, P.jsx)(e, {
				title: `需要关注 · ${h.length} 项`,
				children: h.map(([e, t]) => /* @__PURE__ */ (0, P.jsx)(W, {
					name: e,
					check: t
				}, e))
			}) : null,
			/* @__PURE__ */ (0, P.jsx)(e, {
				title: "库健康",
				children: /* @__PURE__ */ (0, P.jsxs)(s, { children: [p.library.issue_at ? /* @__PURE__ */ (0, P.jsxs)("p", {
					className: "text-body-2-regular text-text-secondary",
					children: ["处理记录 · ", V(p.library.issue_at)]
				}) : null, Object.entries(p.library.groups).map(([e, t]) => /* @__PURE__ */ (0, P.jsx)(L, {
					group: t,
					...i
				}, e))] })
			}),
			y.length ? /* @__PURE__ */ (0, P.jsx)("section", {
				"aria-label": "系统检查",
				children: /* @__PURE__ */ (0, P.jsx)(k, {
					summary: `其他检查 · ${y.length} 项`,
					contentClassName: "gap-5",
					children: B.map(([e, t]) => {
						let n = y.filter(([e]) => t.some((t) => t === e));
						return n.length ? /* @__PURE__ */ (0, P.jsxs)("section", {
							"aria-label": e,
							"data-diagnostic-group": "",
							className: "flex min-w-0 flex-col gap-2",
							children: [/* @__PURE__ */ (0, P.jsxs)("h3", {
								className: "flex items-center gap-2 px-3 text-body-medium text-text-primary",
								children: [e, /* @__PURE__ */ (0, P.jsxs)("span", {
									className: "text-caption-1-regular text-text-secondary",
									children: [n.length, " 项"]
								})]
							}), /* @__PURE__ */ (0, P.jsx)(c, { children: n.map(([e, t]) => /* @__PURE__ */ (0, P.jsx)(W, {
								name: e,
								check: t,
								compact: !0
							}, e)) })]
						}, e) : null;
					})
				})
			}) : null,
			/* @__PURE__ */ (0, P.jsxs)("section", {
				"aria-label": "来源会话",
				className: "flex min-w-0 flex-col gap-3",
				children: [
					/* @__PURE__ */ (0, P.jsx)(t, { children: "来源会话" }),
					p.sources.map((e) => /* @__PURE__ */ (0, P.jsx)("article", {
						"data-diagnostic-source": e.source,
						children: /* @__PURE__ */ (0, P.jsx)(c, { children: /* @__PURE__ */ (0, P.jsxs)(s, { children: [
							/* @__PURE__ */ (0, P.jsxs)("div", {
								className: "flex flex-wrap items-center justify-between gap-2",
								children: [/* @__PURE__ */ (0, P.jsxs)("h3", {
									className: "flex min-w-0 items-center gap-2 text-body-medium text-text-primary",
									children: [/* @__PURE__ */ (0, P.jsx)(M, { source: e.source }), e.label]
								}), /* @__PURE__ */ (0, P.jsx)(H, { status: e.status })]
							}),
							/* @__PURE__ */ (0, P.jsx)(A, {
								text: e.reason,
								className: "text-body-regular text-text-primary"
							}),
							/* @__PURE__ */ (0, P.jsxs)(l, { children: [
								/* @__PURE__ */ (0, P.jsx)(O, {
									term: "上次解析成功",
									children: e.last_success_at ? V(e.last_success_at) : "尚无成功记录"
								}),
								e.last_check_at ? /* @__PURE__ */ (0, P.jsxs)(O, {
									term: "上次检查",
									children: [V(e.last_check_at), e.elapsed_s !== void 0 && e.elapsed_s !== null ? ` · ${e.elapsed_s.toFixed(2)} 秒` : ""]
								}) : null,
								/* @__PURE__ */ (0, P.jsx)(O, {
									term: "暂停访问至",
									children: e.cooldown_until ? V(e.cooldown_until) : "未暂停"
								})
							] })
						] }) })
					}, e.source)),
					/* @__PURE__ */ (0, P.jsx)("div", { children: /* @__PURE__ */ (0, P.jsx)(S, {
						size: "small",
						variant: "secondary",
						href: "/sources",
						children: "打开来源和凭证"
					}) })
				]
			})
		]
	});
}
//#endregion
export { G as DiagnosticsPage };

//# debugId=155d273a-7626-4b0f-9396-3ab50cbeb9c8