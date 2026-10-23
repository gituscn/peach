(function() {
	try {
		var e = typeof window < "u" ? window : typeof global < "u" ? global : typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : {}, t = new e.Error().stack;
		t && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[t] = "7758d390-dffc-4ab0-9994-26e45a337074", e._sentryDebugIdIdentifier = "sentry-dbid-7758d390-dffc-4ab0-9994-26e45a337074");
	} catch {}
})();
import { Button as e, ButtonLink as t, Chip as n, DIAGNOSTICS_KEY as r, Disclosure as i, EmptyState as a, Fact as o, FactList as s, LOC as c, LinkButton as l, Note as u, Section as d, SettingsCard as f, SettingsSectionLabel as p, Stack as m, __toESM as h, busyProps as g, configurationSection as _, cx as v, diagnosticsSkeleton as y, errorMessage as b, fetchDiagnostics as x, fmtDur as S, fmtSize as C, require_jsx_runtime as w, require_react as T, settingsPath as E, tl as D, useAction as O, useQuery as k } from "./peach-app.js";
import { ErrorExcerpt as A } from "./peach-app.error-excerpt-GIDhsLJp.js";
import { DataTable as j } from "./peach-app.data-table-CI9MJhw_.js";
import { SiteMark as M } from "./peach-app.site-mark-Cjd7g2Ii.js";
//#region src/react/diagnostics/health-list.tsx
var N = /* @__PURE__ */ h(T(), 1), P = w(), F = (e) => e.title || e.name || e.code || `作品 #${e.id}`, I = (e) => [[
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
	c[e.location] || e.location,
	e.path,
	e.duration ?? "",
	e.size ?? ""
])].map((e) => e.map((e) => String(e ?? "").replace(/[\t\r\n]+/g, " ")).join("	")).join("\n");
function L({ group: t, openItem: n, receipt: r }) {
	let o = O(), [s, d] = (0, N.useState)([]), f = (e) => void o.run("copy", () => navigator.clipboard.writeText(I(e)), () => r("已复制清单")), p = [
		{
			id: "title",
			label: "作品",
			value: F,
			render: (e) => /* @__PURE__ */ (0, P.jsxs)("span", {
				className: "flex min-w-0 flex-col gap-1",
				children: [/* @__PURE__ */ (0, P.jsx)(l, {
					variant: "primary",
					className: "justify-start whitespace-normal text-left",
					onClick: () => n(e.id),
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
			value: (e) => c[e.location] || e.location,
			render: (e) => c[e.location] || e.location || "未取得"
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
			render: (e) => e.duration && e.duration > 0 ? S(e.duration) : "未取得"
		},
		{
			id: "size",
			label: "大小",
			width: 112,
			value: (e) => e.size ?? 0,
			render: (e) => e.size === null ? "未取得" : C(e.size)
		}
	];
	return /* @__PURE__ */ (0, P.jsx)(i, {
		summary: `${t.label} · ${t.count === null ? "未取得" : `${t.count.toLocaleString()} 项`}`,
		children: t.count === null ? /* @__PURE__ */ (0, P.jsx)(u, {
			tone: "neutral",
			children: "清单未取得，请重新检查。"
		}) : t.items.length ? /* @__PURE__ */ (0, P.jsxs)(m, { children: [
			/* @__PURE__ */ (0, P.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-2",
				children: [t.truncated ? /* @__PURE__ */ (0, P.jsxs)("span", {
					className: "text-body-2-regular text-text-secondary",
					children: [
						"已载入 ",
						t.items.length.toLocaleString(),
						" / ",
						t.count.toLocaleString(),
						" 项"
					]
				}) : null, /* @__PURE__ */ (0, P.jsx)(e, {
					size: "small",
					variant: "secondary",
					...g(o.busy === "copy"),
					onClick: () => f(t.items),
					children: "复制当前清单"
				})]
			}),
			o.error ? /* @__PURE__ */ (0, P.jsx)(u, {
				tone: "error",
				children: o.error
			}) : null,
			/* @__PURE__ */ (0, P.jsx)(j, {
				label: t.label,
				title: "作品清单",
				unit: "部作品",
				panel: !1,
				items: t.items,
				columns: p,
				rowId: (e) => String(e.id),
				rowLabel: F,
				selected: s,
				onSelected: d,
				actions: (t) => /* @__PURE__ */ (0, P.jsx)(e, {
					size: "small",
					variant: "secondary",
					...g(o.busy === "copy"),
					onClick: () => f(t),
					children: "复制所选"
				})
			})
		] }) : /* @__PURE__ */ (0, P.jsx)(a, {
			icon: D,
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
	return /* @__PURE__ */ (0, P.jsx)(n, {
		variant: "caption",
		"data-diagnostic-status": e,
		color: e === "failed" ? "rose" : e === "ok" ? "lime" : e === "warning" || e === "stale" ? "yellow" : "neutral",
		children: R[e] ?? "未取得"
	});
}
function U() {
	let t = O();
	return /* @__PURE__ */ (0, P.jsxs)("div", {
		className: "flex flex-col items-end gap-2",
		children: [/* @__PURE__ */ (0, P.jsx)(e, {
			variant: "secondary",
			onClick: () => void t.run("download", async () => {
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
			...g(t.busy === "download"),
			children: "下载诊断报告"
		}), t.error ? /* @__PURE__ */ (0, P.jsx)(u, {
			tone: "error",
			children: t.error
		}) : null]
	});
}
function W({ name: e, check: n, compact: r = !1 }) {
	let i = n.target === "/settings/library" && (e === "security" || e === "port") ? E("网络与访问") : n.target, a = r ? "h4" : "h3";
	return /* @__PURE__ */ (0, P.jsxs)("div", {
		"data-diagnostic-check": e,
		className: v("flex flex-col gap-4 border-b border-separator-border pr-3 last:border-b-0 sm:flex-row sm:items-center sm:justify-between", r ? "py-3" : "py-5"),
		children: [/* @__PURE__ */ (0, P.jsxs)("div", {
			className: v("flex min-w-0 flex-1 flex-col", r ? "gap-1" : "gap-2"),
			children: [
				/* @__PURE__ */ (0, P.jsxs)("div", {
					className: "flex flex-wrap items-center gap-3",
					children: [/* @__PURE__ */ (0, P.jsx)(a, {
						className: v("text-text-primary", r ? "text-body-2-medium" : "text-body-medium"),
						children: n.label
					}), /* @__PURE__ */ (0, P.jsx)(H, { status: n.status })]
				}),
				/* @__PURE__ */ (0, P.jsx)("p", {
					"data-check-reason": !0,
					className: v("text-body-2-regular break-words", r ? "text-text-secondary" : "text-text-primary"),
					children: n.reason
				}),
				n.action ? /* @__PURE__ */ (0, P.jsxs)("p", {
					className: "text-body-2-regular text-text-secondary",
					children: ["处理建议：", n.action]
				}) : null
			]
		}), i ? /* @__PURE__ */ (0, P.jsx)("div", {
			className: "shrink-0 self-end sm:self-auto",
			children: /* @__PURE__ */ (0, P.jsx)(t, {
				size: "small",
				variant: "secondary",
				href: i,
				children: i.startsWith("/settings/") ? `打开${_(i)}` : z[i] ?? "打开相关页面"
			})
		}) : null]
	});
}
function G(n) {
	let a = k({
		queryKey: r,
		queryFn: ({ signal: e }) => x(e),
		staleTime: 1e4
	}), c = O(), [l, h] = (0, N.useState)(""), _ = () => void c.run("refresh", async () => {
		let e = await a.refetch();
		if (e.error) throw e.error;
		return e.data;
	}, () => h(""), (e) => h(b(e))), v = a.data;
	if (!v && a.isPending) return /* @__PURE__ */ (0, P.jsx)("div", {
		role: "status",
		"aria-label": "正在读取系统诊断",
		dangerouslySetInnerHTML: { __html: y() }
	});
	if (!v) return /* @__PURE__ */ (0, P.jsxs)("div", {
		className: "ui-configpage",
		children: [/* @__PURE__ */ (0, P.jsx)(U, {}), /* @__PURE__ */ (0, P.jsx)(u, {
			tone: "error",
			title: "诊断读取失败",
			action: /* @__PURE__ */ (0, P.jsx)(e, {
				variant: "secondary",
				onClick: _,
				...g(c.busy === "refresh"),
				children: "重新检查"
			}),
			children: a.error ? b(a.error) : "诊断报告未取得。"
		})]
	});
	let S = Object.entries(v.checks).filter(([, e]) => [
		"warning",
		"failed",
		"unknown"
	].includes(e.status)), C = Object.entries(v.checks).filter(([, e]) => ![
		"warning",
		"failed",
		"unknown"
	].includes(e.status));
	return /* @__PURE__ */ (0, P.jsxs)("div", {
		className: "flex min-w-0 flex-col gap-6",
		children: [
			/* @__PURE__ */ (0, P.jsxs)("div", {
				className: "flex flex-wrap justify-end gap-2",
				children: [/* @__PURE__ */ (0, P.jsx)(U, {}), /* @__PURE__ */ (0, P.jsx)(e, {
					variant: "secondary",
					onClick: _,
					...g(c.busy === "refresh"),
					children: "重新检查"
				})]
			}),
			l ? /* @__PURE__ */ (0, P.jsx)(u, {
				tone: "error",
				children: l
			}) : null,
			S.length ? /* @__PURE__ */ (0, P.jsx)(d, {
				title: `需要关注 · ${S.length} 项`,
				children: S.map(([e, t]) => /* @__PURE__ */ (0, P.jsx)(W, {
					name: e,
					check: t
				}, e))
			}) : null,
			/* @__PURE__ */ (0, P.jsx)(d, {
				title: "库健康",
				children: /* @__PURE__ */ (0, P.jsxs)(m, { children: [v.library.issue_at ? /* @__PURE__ */ (0, P.jsxs)("p", {
					className: "text-body-2-regular text-text-secondary",
					children: ["处理记录 · ", V(v.library.issue_at)]
				}) : null, Object.entries(v.library.groups).map(([e, t]) => /* @__PURE__ */ (0, P.jsx)(L, {
					group: t,
					...n
				}, e))] })
			}),
			C.length ? /* @__PURE__ */ (0, P.jsx)("section", {
				"aria-label": "系统检查",
				children: /* @__PURE__ */ (0, P.jsx)(i, {
					summary: `其他检查 · ${C.length} 项`,
					contentClassName: "gap-5",
					children: B.map(([e, t]) => {
						let n = C.filter(([e]) => t.some((t) => t === e));
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
							}), /* @__PURE__ */ (0, P.jsx)(f, { children: n.map(([e, t]) => /* @__PURE__ */ (0, P.jsx)(W, {
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
					/* @__PURE__ */ (0, P.jsx)(p, { children: "来源会话" }),
					v.sources.map((e) => /* @__PURE__ */ (0, P.jsx)("article", {
						"data-diagnostic-source": e.source,
						children: /* @__PURE__ */ (0, P.jsx)(f, { children: /* @__PURE__ */ (0, P.jsxs)(m, { children: [
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
							/* @__PURE__ */ (0, P.jsxs)(s, { children: [
								/* @__PURE__ */ (0, P.jsx)(o, {
									term: "上次解析成功",
									children: e.last_success_at ? V(e.last_success_at) : "尚无成功记录"
								}),
								e.last_check_at ? /* @__PURE__ */ (0, P.jsxs)(o, {
									term: "上次检查",
									children: [V(e.last_check_at), e.elapsed_s !== void 0 && e.elapsed_s !== null ? ` · ${e.elapsed_s.toFixed(2)} 秒` : ""]
								}) : null,
								/* @__PURE__ */ (0, P.jsx)(o, {
									term: "暂停访问至",
									children: e.cooldown_until ? V(e.cooldown_until) : "未暂停"
								})
							] })
						] }) })
					}, e.source)),
					/* @__PURE__ */ (0, P.jsx)("div", { children: /* @__PURE__ */ (0, P.jsx)(t, {
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

//# debugId=7758d390-dffc-4ab0-9994-26e45a337074