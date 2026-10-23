(function() {
	try {
		var e = typeof window < "u" ? window : typeof global < "u" ? global : typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : {}, t = new e.Error().stack;
		t && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[t] = "810dbbe5-3cfe-44de-b6e1-f15115c45e2f", e._sentryDebugIdIdentifier = "sentry-dbid-810dbbe5-3cfe-44de-b6e1-f15115c45e2f");
	} catch {}
})();
import { $n as e, An as t, Ar as n, Bn as r, Cn as i, Cr as a, Dn as o, Do as s, Dr as c, En as l, Er as u, Fl as d, Fn as f, Gl as p, Gn as m, Ha as h, Hn as g, Il as _, In as v, Jl as y, Jn as b, Jt as ee, Kl as x, Kn as S, Kt as C, Li as w, Ln as T, Mn as E, Mr as te, Nn as D, Oc as O, On as k, Or as A, Pl as ne, Pn as j, Qn as re, Ra as M, Rn as ie, Sc as N, Sn as ae, Sr as P, Tc as oe, Ti as F, Tn as I, Tr as L, Un as se, Vn as R, Wl as z, Wn as B, Wt as ce, Xn as le, Xt as ue, Yl as de, Yn as fe, Yt as pe, Zl as me, Zn as he, Zt as V, _a as ge, _i as _e, _n as H, au as U, bn as ve, bs as ye, ci as be, cu as xe, di as Se, er as Ce, fi as we, fs as W, gi as Te, gn as Ee, hi as De, hn as Oe, io as G, iu as ke, ja as Ae, jn as je, jr as Me, kn as Ne, kr as Pe, li as Fe, lo as Ie, mi as Le, mn as K, nr as Re, nu as ze, pi as Be, pu as Ve, ql as He, qn as Ue, qt as We, ro as q, so as J, tr as Ge, uu as Ke, vi as qe, vn as Je, wn as Ye, wr as Xe, xn as Ze, yi as Qe, yn as $e, za as et, zn as tt } from "./peach-app.js";
import { t as nt } from "./peach-app.page-BYr6f5ud.js";
import { n as rt } from "./peach-app.error-excerpt-5tEehQuQ.js";
import { n as Y, o as X, t as it } from "./peach-app.stat-card-8t4QGU2C.js";
import { t as at } from "./peach-app.data-table-BCsefVBk.js";
import { n as ot } from "./peach-app.site-mark-C-FsZf9f.js";
import { t as st } from "./peach-app.legacy-avatar-CV1xk6vD.js";
import { i as ct } from "./peach-app.folder-rows-C8zyfdZi.js";
import { t as lt } from "./peach-app.connection-status-Pa6aDai7.js";
//#region src/react/media-repair/media-repair-card.tsx
var Z = /* @__PURE__ */ Ve(Ke(), 1), Q = xe(), ut = (e) => oe[e] || e, dt = (e) => _.setQueryData(we, e);
function ft({ toast: e = () => {} }) {
	let t = K({
		queryKey: we,
		queryFn: ({ signal: e }) => De(e),
		start: (e) => z(Be, {
			library: e,
			restart: !0
		}),
		onFinish: (t) => {
			t.status === "complete" && !t.failed && !t.missing_tool && e(t.repaired ? `已修复 ${t.repaired.toLocaleString()} 部视频` : "已检查媒体库，没有需要修复的视频");
		}
	}), n = U({
		queryKey: Le,
		queryFn: ({ signal: e }) => Te(e)
	}), [r, i] = (0, Z.useState)(""), a = h(), o = t.job ?? Se, s = n.data ?? [], c = o.status === "running", l = s.find((e) => e.id === (c ? o.library : r)) ?? s.find((e) => e.id === o.library) ?? s[0], u = () => {
		l && N({
			title: `修复媒体库「${l.name}」`,
			body: "缺时间戳表的片子另存一份修好的头，原文件不动；缺索引的片子重建后替换原文件，坏原件改名成同目录的隐藏文件（.文件名.peach-original）留着。" + (l.metered ? "这个库在计费来源上，每修一部都要把片子完整拉一遍。" : ""),
			confirmLabel: "修复媒体库",
			onConfirm: async () => {
				await t.start.mutateAsync(l.id);
			}
		});
	}, d = () => void a.run("stop", (e) => z(Be, { stop: !0 }, "POST", e), dt), f = t.outcome, p = qe(c ? o : f ?? Se), m = a.error || f?.error || (t.query.error ? "读不到媒体修复的状态" : "");
	return /* @__PURE__ */ (0, Q.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [/* @__PURE__ */ (0, Q.jsx)(We, {
			layout: "split",
			label: "媒体修复",
			footer: /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [/* @__PURE__ */ (0, Q.jsx)(w, {
				"aria-label": "媒体库",
				prefix: "媒体库",
				className: "w-48",
				selectedKey: l?.id ?? null,
				isDisabled: c || !s.length,
				onSelectionChange: (e) => {
					e !== null && i(String(e));
				},
				children: s.map((e) => /* @__PURE__ */ (0, Q.jsxs)(ge, {
					id: e.id,
					textValue: e.name,
					children: [/* @__PURE__ */ (0, Q.jsx)(Ae, { mark: ut(e.icon) }), e.name]
				}, e.id))
			}), c ? /* @__PURE__ */ (0, Q.jsx)(W, {
				onClick: d,
				...q(a.busy === "stop"),
				children: "停止"
			}) : /* @__PURE__ */ (0, Q.jsx)(W, {
				onClick: u,
				disabled: !l,
				children: "开始修复"
			})] }),
			children: /* @__PURE__ */ (0, Q.jsxs)("div", {
				className: "flex flex-col gap-2",
				children: [
					/* @__PURE__ */ (0, Q.jsx)(ee, { children: "媒体修复" }),
					/* @__PURE__ */ (0, Q.jsx)("p", {
						className: "text-body-2-regular text-text-secondary",
						children: V
					}),
					c && o.total ? /* @__PURE__ */ (0, Q.jsx)(et, {
						label: "修复进度",
						value: o.checked,
						max: o.total
					}) : null,
					p ? /* @__PURE__ */ (0, Q.jsx)("p", {
						role: "status",
						className: "text-caption-1-regular text-text-secondary",
						children: p
					}) : null
				]
			})
		}), /* @__PURE__ */ (0, Q.jsxs)("div", {
			"aria-live": "polite",
			className: "flex flex-col gap-4 empty:hidden",
			children: [f?.status === "complete" && f.missing_tool ? /* @__PURE__ */ (0, Q.jsx)(J, {
				tone: "warning",
				title: "缺少 untrunc",
				action: /* @__PURE__ */ (0, Q.jsx)(W, {
					variant: "ghost",
					size: "small",
					onClick: t.dismiss,
					children: "关闭提示"
				}),
				children: _e(f)
			}) : null, m ? /* @__PURE__ */ (0, Q.jsx)(J, {
				tone: "error",
				children: m
			}) : null]
		})]
	});
}
//#endregion
//#region src/react/data-cleanup/link-check-icon.tsx
function pt({ className: e }) {
	return /* @__PURE__ */ (0, Q.jsxs)("svg", {
		"aria-hidden": !0,
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: 2,
		strokeLinecap: "round",
		strokeLinejoin: "round",
		className: e,
		"data-link-check-icon": "",
		children: [
			/* @__PURE__ */ (0, Q.jsx)("path", { d: "m18.84 12.25 1.72-1.71h-.02a5.004 5.004 0 0 0-.12-7.07 5.006 5.006 0 0 0-6.95 0l-1.72 1.71" }),
			/* @__PURE__ */ (0, Q.jsx)("path", { d: "m5.17 11.75-1.71 1.71a5.004 5.004 0 0 0 .12 7.07 5.006 5.006 0 0 0 6.95 0l1.71-1.71" }),
			/* @__PURE__ */ (0, Q.jsxs)("g", {
				"data-link-check-rays": "",
				children: [
					/* @__PURE__ */ (0, Q.jsx)("path", { d: "M8 2v3" }),
					/* @__PURE__ */ (0, Q.jsx)("path", { d: "M2 8h3" }),
					/* @__PURE__ */ (0, Q.jsx)("path", { d: "M16 19v3" }),
					/* @__PURE__ */ (0, Q.jsx)("path", { d: "M19 16h3" })
				]
			})
		]
	});
}
//#endregion
//#region src/react/data-cleanup/link-manager.tsx
var mt = G("rotate-cw"), ht = "站点返回 404 或 410，确认这个地址不存在。", gt = "站点拒绝程序访问或一次临时故障都会落在这里。链接保留，可勾选后单独重试。", _t = "删除前会逐条重验一次；此操作不可撤销。", vt = "暂时无法读取进度，正在重新连接…", yt = (e) => Number(e || 0).toLocaleString();
function bt({ label: e, value: t, note: n }) {
	return /* @__PURE__ */ (0, Q.jsxs)("div", {
		className: "flex min-w-0 flex-col gap-0.5",
		children: [
			/* @__PURE__ */ (0, Q.jsx)("span", {
				className: "text-caption-1-regular leading-5 text-text-secondary",
				children: e
			}),
			/* @__PURE__ */ (0, Q.jsx)("b", {
				className: "text-title-2-semibold font-bold leading-5 tabular-nums text-text-primary",
				children: t
			}),
			n ? /* @__PURE__ */ (0, Q.jsx)("small", {
				className: "text-caption-1-regular leading-5 text-text-secondary",
				children: n
			}) : null
		]
	});
}
function xt({ title: e, items: t, hint: n, picked: r, onPick: i, children: a, footer: o, confirmed: c = !1 }) {
	return t.length ? /* @__PURE__ */ (0, Q.jsx)("div", {
		className: ue,
		"data-link-results": c ? "gone" : "unclear",
		children: /* @__PURE__ */ (0, Q.jsx)(at, {
			label: e,
			items: t,
			columns: [
				{
					id: "entity",
					label: "Peach 资料",
					width: 180,
					min: 128,
					value: (e) => e.entity,
					render: (e) => /* @__PURE__ */ (0, Q.jsxs)("a", {
						className: "flex min-w-24 items-center gap-2 text-text-secondary hover:text-text-primary hover:underline",
						href: e.entity_id && e.entity_kind ? He(e.entity_kind, e.entity, e.entity_id) : void 0,
						"data-link-identity": "",
						children: [/* @__PURE__ */ (0, Q.jsx)("span", {
							"data-link-avatar": "",
							className: `relative flex size-6 shrink-0 items-center justify-center overflow-hidden rounded-full bg-background-quaternary-default text-caption-1-medium text-text-primary ${st}`,
							"aria-hidden": !0,
							dangerouslySetInnerHTML: { __html: `<span>${y(de(e.entity))}</span>` + O({
								kind: e.entity_kind,
								id: e.entity_id,
								hasImage: e.face?.has_image,
								version: e.face?.image_version,
								focus: e.face?.avatar_focus,
								thumb: !0,
								mark: e.entity_kind === "studio" || e.entity_kind === "agency" ? e.id : null
							}) }
						}), /* @__PURE__ */ (0, Q.jsx)("span", {
							className: "min-w-0 wrap-anywhere",
							children: e.entity
						})]
					})
				},
				{
					id: "kind",
					label: "类型",
					width: 128,
					value: (e) => Xe[e.link_kind] || e.link_kind,
					render: (e) => Xe[e.link_kind] || e.link_kind
				},
				{
					id: "label",
					label: "链接名称",
					min: 128,
					value: (e) => e.label || "",
					render: (e) => /* @__PURE__ */ (0, Q.jsx)("span", {
						className: "flex min-w-24 items-center gap-2",
						"data-link-name": "",
						children: /* @__PURE__ */ (0, Q.jsx)("span", {
							className: "min-w-0 wrap-anywhere",
							children: e.label || new URL(e.url).hostname
						})
					})
				},
				{
					id: "note",
					label: "结果",
					width: 320,
					min: 192,
					value: (e) => e.note,
					render: (e) => /* @__PURE__ */ (0, Q.jsx)("div", {
						className: "min-w-0 w-full",
						"data-link-result": c ? "gone" : "unclear",
						children: /^(?:HTTP\s+)?[1-5]\d{2}$/.test(e.note.trim()) ? /* @__PURE__ */ (0, Q.jsx)(C, {
							tone: c || /^(?:HTTP\s+)?5\d{2}$/.test(e.note.trim()) ? "error" : "warning",
							"data-link-code": "",
							children: e.note.trim()
						}) : /* @__PURE__ */ (0, Q.jsxs)("div", {
							className: "flex flex-col items-start gap-1",
							children: [/* @__PURE__ */ (0, Q.jsx)(C, {
								tone: c ? "error" : "warning",
								children: c ? "地址已失效" : "未取得结论"
							}), /* @__PURE__ */ (0, Q.jsx)(rt, {
								text: e.note,
								className: "tabular-nums text-text-secondary"
							})]
						})
					})
				},
				{
					id: "url",
					label: "地址",
					width: 360,
					min: 180,
					value: (e) => e.url,
					render: (e) => /* @__PURE__ */ (0, Q.jsxs)("a", {
						href: e.url,
						target: "_blank",
						rel: "noopener noreferrer",
						title: e.url,
						"data-link-address": "",
						className: "flex min-w-0 items-center gap-1 text-text-secondary hover:text-text-primary",
						children: [
							/* @__PURE__ */ (0, Q.jsx)(ot, { linkId: e.id }),
							/* @__PURE__ */ (0, Q.jsx)("span", {
								"data-middle-truncate": !0,
								className: "min-w-0 truncate",
								children: e.url
							}),
							/* @__PURE__ */ (0, Q.jsx)(s, {
								"aria-hidden": !0,
								className: "size-(--icon-inline) shrink-0"
							})
						]
					})
				}
			],
			rowId: (e) => String(e.id),
			description: n,
			unit: "条链接",
			panel: !1,
			footerActions: o,
			rowLabel: (e) => `${e.entity} 的${e.label || e.url}`,
			selected: r.map(String),
			onSelected: (e) => i(e.map(Number)),
			actions: () => a
		})
	}) : null;
}
function St() {
	let e = U({
		queryKey: P,
		queryFn: ({ signal: e }) => Pe(e)
	}), [t, r] = (0, Z.useState)([]), [i, o] = (0, Z.useState)([]), l = K({
		queryKey: L,
		queryFn: ({ signal: e }) => A(e),
		start: te,
		onFinish: () => {
			_.invalidateQueries({
				queryKey: P,
				exact: !0
			}), _.invalidateQueries({
				queryKey: a,
				exact: !0
			});
		}
	}), d = K({
		queryKey: a,
		queryFn: ({ signal: e }) => c(e),
		start: Me,
		onStarted: () => {
			l.dismiss(), r([]), o([]);
		}
	}), f = d.job, m = f?.check_id ?? "";
	(0, Z.useEffect)(() => {
		r([]), o([]);
	}, [m]);
	let h = d.running || d.start.isPending, g = l.running || l.start.isPending, v = f?.status === "complete", y = f?.gone ?? [], b = f?.unclear ?? [], x = v ? b : [], S = y.filter((e) => i.includes(e.id)).map((e) => e.id), C = x.filter((e) => t.includes(e.id)).map((e) => e.id), w = e.data, T = (w?.top_hosts ?? []).slice(0, 3), E = (e) => {
		h || e && !e.length || d.start.mutate(e ? {
			retry: e,
			checkId: m
		} : {});
	}, D = (e) => {
		!g && y.length && N({
			title: "删除失效链接",
			body: `将删除 ${e?.length ?? y.length} 条失效链接。删除前会再次检查，删除后无法恢复。`,
			confirmLabel: "删除失效链接",
			danger: !0,
			onConfirm: () => l.start.mutateAsync({
				checkId: m,
				ids: e
			})
		});
	}, O = l.outcome, k = d.start.error ?? l.start.error, ne = null, j = null;
	if (O?.status === "failed") j = /* @__PURE__ */ (0, Q.jsx)(J, {
		tone: "error",
		title: "链接清理未完成",
		children: O.error || "请查看任务记录，核对已处理的链接。"
	});
	else if (O && !y.length && !b.length) j = /* @__PURE__ */ (0, Q.jsx)(J, {
		tone: "success",
		title: "完成",
		children: n(O)
	});
	else if (k) j = /* @__PURE__ */ (0, Q.jsx)(J, {
		tone: "error",
		title: "检查失败",
		children: p(k)
	});
	else if (d.query.isError && f) j = /* @__PURE__ */ (0, Q.jsx)(J, {
		tone: "neutral",
		title: "任务状态",
		children: vt
	});
	else if (f?.status === "failed") j = /* @__PURE__ */ (0, Q.jsx)(J, {
		tone: "error",
		title: "检查失败",
		children: f.error || "检查失败"
	});
	else if (f && f.status !== "idle") {
		ne = /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [f.status === "running" ? /* @__PURE__ */ (0, Q.jsx)(M, {
			embedded: !0,
			label: u(f),
			value: Math.min(f.checked || 0, f.total || 0),
			total: f.total
		}) : null, g ? /* @__PURE__ */ (0, Q.jsx)(M, {
			embedded: !0,
			label: l.job?.message || "正在重验并删除失效链接",
			value: Math.min(l.job?.checked || 0, l.job?.total || 0),
			total: l.job?.total
		}) : null] });
		let e = `立即重试所选（${C.length}）`;
		j = v || y.length || b.length ? /* @__PURE__ */ (0, Q.jsxs)("div", {
			className: pe,
			children: [
				O?.status === "complete" ? /* @__PURE__ */ (0, Q.jsx)(J, {
					tone: "success",
					title: "完成",
					children: n(O)
				}) : null,
				/* @__PURE__ */ (0, Q.jsx)(xt, {
					title: "地址已失效",
					items: y,
					hint: ht,
					picked: i,
					onPick: o,
					confirmed: !0,
					footer: v && y.length ? /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [/* @__PURE__ */ (0, Q.jsx)("p", {
						className: "mr-auto min-w-0 text-caption-1-regular text-text-secondary",
						children: _t
					}), /* @__PURE__ */ (0, Q.jsx)(W, {
						variant: "danger",
						...q(g),
						onClick: () => D(),
						children: `删除 ${y.length} 条失效链接`
					})] }) : null,
					children: /* @__PURE__ */ (0, Q.jsx)(W, {
						variant: "danger",
						size: "small",
						disabled: !v || !S.length,
						...q(g),
						onClick: () => D(S),
						children: `删除所选（${S.length}）`
					})
				}),
				/* @__PURE__ */ (0, Q.jsx)(xt, {
					title: "本次未访问成功",
					items: b,
					hint: gt,
					picked: t,
					onPick: r,
					footer: x.length ? /* @__PURE__ */ (0, Q.jsx)(W, {
						variant: "primary",
						leadingIcon: mt,
						...q(h),
						onClick: () => E(x.map((e) => e.id)),
						children: `立即重试全部（${x.length}）`
					}) : null,
					children: x.length ? /* @__PURE__ */ (0, Q.jsx)(Q.Fragment, { children: /* @__PURE__ */ (0, Q.jsx)(W, {
						variant: "secondary",
						leadingIcon: mt,
						disabled: !C.length,
						...q(h),
						onClick: () => E(C),
						children: e
					}) }) : null
				}),
				v && !y.length && !b.length ? /* @__PURE__ */ (0, Q.jsx)("p", {
					className: `${ue} text-body-regular text-notification-success-foreground`,
					children: "全部链接均可访问。"
				}) : null
			]
		}) : null;
	}
	return /* @__PURE__ */ (0, Q.jsxs)("section", {
		id: "link-manager",
		"aria-labelledby": "link-manager-title",
		className: "flex scroll-mt-20 flex-col gap-4",
		children: [/* @__PURE__ */ (0, Q.jsxs)(We, {
			layout: "stack",
			labelledBy: "link-manager-title",
			footer: /* @__PURE__ */ (0, Q.jsx)(W, {
				"data-link-check": "",
				leadingIcon: pt,
				...q(h),
				onClick: () => E(),
				children: h ? "检查中" : v ? "重新检查" : "检查死链"
			}),
			children: [
				/* @__PURE__ */ (0, Q.jsx)(ee, {
					id: "link-manager-title",
					gap: "small",
					children: "链接管理"
				}),
				e.isError ? /* @__PURE__ */ (0, Q.jsx)(J, {
					tone: "error",
					title: "链接统计读取失败",
					children: p(e.error)
				}) : w ? /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [/* @__PURE__ */ (0, Q.jsxs)("div", {
					className: "link-stat-grid mt-4 gap-x-8 gap-y-3",
					children: [/* @__PURE__ */ (0, Q.jsx)(bt, {
						label: "链接总数",
						value: yt(w.total),
						note: `分布在 ${yt(w.entities)} 个女优、厂牌与系列`
					}), Object.entries(w.by_kind ?? {}).map(([e, t]) => /* @__PURE__ */ (0, Q.jsx)(bt, {
						label: Xe[e] || e,
						value: yt(t)
					}, e))]
				}), T.length ? /* @__PURE__ */ (0, Q.jsxs)("div", {
					className: "mt-4 flex min-w-0 flex-col gap-0.5",
					children: [/* @__PURE__ */ (0, Q.jsx)("span", {
						className: "text-caption-1-regular text-text-secondary",
						children: "主要站点"
					}), /* @__PURE__ */ (0, Q.jsx)("div", {
						className: "flex min-w-0 flex-wrap gap-x-5 gap-y-2",
						children: T.map(([e, t]) => /* @__PURE__ */ (0, Q.jsxs)("span", {
							"data-top-host": "",
							className: "inline-flex min-w-0 max-w-full items-center gap-1.5",
							children: [/* @__PURE__ */ (0, Q.jsxs)("a", {
								href: `https://${e}`,
								target: "_blank",
								rel: "noopener noreferrer",
								className: "inline-flex min-w-0 items-center gap-1.5 text-body-2-medium text-text-primary",
								children: [
									/* @__PURE__ */ (0, Q.jsx)(ot, { linkId: w.top_host_link_ids?.[e] }),
									/* @__PURE__ */ (0, Q.jsx)("span", {
										className: "min-w-0 wrap-anywhere",
										children: e
									}),
									/* @__PURE__ */ (0, Q.jsx)(s, {
										"aria-hidden": !0,
										className: "size-(--icon-inline) shrink-0"
									})
								]
							}), /* @__PURE__ */ (0, Q.jsx)(Oe, {
								variant: "caption",
								color: "neutral",
								children: /* @__PURE__ */ (0, Q.jsx)("span", {
									className: "tabular-nums",
									children: yt(t)
								})
							})]
						}, e))
					})]
				}) : null] }) : null,
				/* @__PURE__ */ (0, Q.jsx)("div", {
					"aria-live": "polite",
					className: "mt-4 flex flex-col gap-3 empty:hidden",
					children: ne
				})
			]
		}), /* @__PURE__ */ (0, Q.jsx)("div", {
			"aria-live": "polite",
			className: "empty:hidden",
			children: j
		})]
	});
}
//#endregion
//#region src/react/data-cleanup/organize-card.tsx
var Ct = (e, t) => `将整理「${e}」${t ? `的「${t}」及其子目录` : "上的文件名与目录"}，清理特殊符号与乱码，并按已填模板改名或移动。目标已存在的行会整行跳过。这一批可以从「回滚上一批」整批退回。`, wt = "将把上一批整理动过的文件退回整理前的名字与位置，数据库路径跟着退回。退回后这一批不再出现在这里。", Tt = 8;
function Et({ plan: e }) {
	return /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [/* @__PURE__ */ (0, Q.jsx)("ol", {
		className: "mt-2 flex min-w-0 flex-col gap-1",
		children: e.rows.slice(0, Tt).map((e) => /* @__PURE__ */ (0, Q.jsxs)("li", {
			className: "flex min-w-0 items-center gap-2 text-caption-1-regular text-text-secondary",
			children: [
				/* @__PURE__ */ (0, Q.jsx)("span", {
					"data-middle-truncate": !0,
					title: e.current_path,
					className: "min-w-0 truncate",
					children: Ue(e.current_path)
				}),
				/* @__PURE__ */ (0, Q.jsx)("span", {
					"aria-hidden": !0,
					children: "→"
				}),
				/* @__PURE__ */ (0, Q.jsx)("span", {
					"data-middle-truncate": !0,
					title: e.target_path,
					className: "min-w-0 truncate text-text-primary",
					children: Ue(e.target_path)
				})
			]
		}, e.current_path))
	}), e.truncated || e.rows.length > Tt ? /* @__PURE__ */ (0, Q.jsx)("p", {
		className: "text-caption-1-regular text-text-secondary",
		children: "只列出前 8 行，完整计划在计划 CSV 里。"
	}) : null] });
}
function Dt({ toast: t, failure: n }) {
	let r = U({
		queryKey: S,
		queryFn: ({ signal: e }) => b(e)
	}), i = r.data, a = i?.locations ?? [], [o, s] = (0, Z.useState)(""), c = a.some((e) => e.location === o) ? o : a[0]?.location ?? "", l = i?.templates?.[c], [u, d] = (0, Z.useState)(null), f = u?.location === c ? u : {
		location: c,
		file: l?.file ?? "",
		dir: l?.dir ?? ""
	}, h = (e) => {
		d({
			...f,
			...e
		}), P.reset();
	}, [g, v] = (0, Z.useState)({
		location: "",
		path: ""
	}), y = g.location === c ? g.path : "", C = (0, Z.useRef)({
		location: c,
		path: y
	});
	C.current = {
		location: c,
		path: y
	};
	let [T, E] = (0, Z.useState)(null), te = (0, Z.useRef)(null), D = (0, Z.useRef)(null), O = (0, Z.useRef)(null), k = U({
		queryKey: [
			"organize-example",
			f.file,
			f.dir
		],
		queryFn: ({ signal: e }) => fe(f.file, f.dir, e),
		enabled: !!i
	}), [A, ne] = (0, Z.useState)("file"), j = (0, Z.useRef)(!1), ie = (0, Z.useRef)(null);
	(0, Z.useLayoutEffect)(() => {
		let e = ie.current;
		if (!e) return;
		ie.current = null;
		let t = (e.field === "file" ? te : D).current;
		t?.focus(), t?.setSelectionRange(e.caret, e.caret);
	});
	let ae = () => ({
		location: c,
		path: y.trim(),
		file_template: f.file.trim(),
		dir_template: f.dir.trim()
	}), P = ke({
		mutationFn: e,
		onError: (e) => {
			let t = /整理路径/.test(p(e)) ? "path" : m.test(p(e)) ? "dir" : "file";
			E(t), (t === "path" ? O : t === "dir" ? D : te).current?.focus();
		}
	}), F = ke({
		mutationFn: ({ initial: e }) => he(e),
		onSuccess: (e, t) => {
			e.path && t.location === C.current.location && t.path === C.current.path && (v({
				location: t.location,
				path: e.path
			}), E(null), P.reset(), O.current?.focus());
		}
	}), I = K({
		queryKey: S,
		queryFn: ({ signal: e }) => b(e),
		start: Ge,
		jobOf: (e) => e,
		withJob: Re,
		onStarted: () => P.reset(),
		onFinish: (e) => {
			if (_.invalidateQueries({
				queryKey: S,
				exact: !0
			}), e.status !== "complete") return;
			let { text: r, failed: i } = le(e);
			i ? n("整理文件", /* @__PURE__ */ Error(`${i} 行未能处理`)) : t(r.replace(/。$/, ""));
		}
	}), L = I.running || I.start.isPending, se = JSON.stringify(P.variables) === JSON.stringify(ae()), R = se ? P.data : void 0, z = Number(R?.counts?.change || 0), B = x[c] || c, ce = (e) => {
		h(e), E(null), P.reset();
	}, ue = (e) => {
		let t = (A === "file" ? te : D).current, n = f[A], r = j.current ? t?.selectionStart ?? n.length : n.length, i = j.current ? t?.selectionEnd ?? r : r, a = `{${e}}`;
		ie.current = {
			field: A,
			caret: r + a.length
		}, ce({ [A]: n.slice(0, r) + a + n.slice(i) });
	}, de = () => {
		P.isPending || L || !c || (I.dismiss(), I.start.reset(), E(null), P.mutate(ae()));
	}, pe = () => {
		let e = P.variables;
		e && R && z && N({
			title: "整理文件",
			body: Ct(B, e.path),
			confirmLabel: "整理文件",
			onConfirm: async () => {
				await I.start.mutateAsync({
					kind: "apply",
					request: e
				}), Ce({
					...i?.templates ?? {},
					[e.location]: {
						file: e.file_template,
						dir: e.dir_template
					}
				});
			}
		});
	}, me = () => void N({
		title: "回滚上一批整理",
		body: wt,
		confirmLabel: "回滚整理",
		onConfirm: () => I.start.mutateAsync({ kind: "rollback" })
	}), V = null, _e = !!z && !L && !I.outcome, H = I.job, ve = I.outcome;
	if (H?.status === "running") {
		let e = H.message || H.stage || "正在整理文件";
		V = /* @__PURE__ */ (0, Q.jsx)(M, {
			embedded: !0,
			label: e,
			value: Math.min(H.checked || 0, H.total || 0),
			total: H.total
		});
	} else if (ve?.status === "failed") V = /* @__PURE__ */ (0, Q.jsx)(J, {
		tone: "error",
		title: "文件整理未完成",
		children: ve.error || "请查看任务记录，核对已处理的文件。"
	});
	else if (ve) {
		let { text: e, failed: t } = le(ve);
		V = /* @__PURE__ */ (0, Q.jsx)(J, {
			tone: t ? "warning" : "success",
			title: t ? "部分完成" : "整理结果",
			children: e
		});
	} else I.start.isError ? V = /* @__PURE__ */ (0, Q.jsx)(J, {
		tone: "error",
		title: "整理失败",
		children: p(I.start.error)
	}) : P.isPending ? V = /* @__PURE__ */ (0, Q.jsx)(M, {
		embedded: !0,
		label: "正在核对整理计划"
	}) : P.isError && se ? V = /* @__PURE__ */ (0, Q.jsx)(J, {
		tone: "error",
		title: "整理预览失败",
		children: p(P.error)
	}) : R && (V = /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [/* @__PURE__ */ (0, Q.jsx)(J, {
		tone: "neutral",
		title: "预览结果",
		children: re(R)
	}), z ? /* @__PURE__ */ (0, Q.jsx)(Et, { plan: R }) : null] }));
	return /* @__PURE__ */ (0, Q.jsxs)(We, {
		layout: "stack",
		id: "organize",
		labelledBy: "cleanup-organize-title",
		attributes: { "data-cleanup-organize": "" },
		footer: /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [
			i?.last_batch ? /* @__PURE__ */ (0, Q.jsx)(W, {
				variant: "secondary",
				...q(L),
				onClick: me,
				children: "回滚上一批"
			}) : null,
			/* @__PURE__ */ (0, Q.jsx)(W, {
				variant: _e ? "secondary" : "primary",
				disabled: !a.length || L,
				...q(P.isPending),
				onClick: de,
				children: "预览"
			}),
			_e ? /* @__PURE__ */ (0, Q.jsx)(W, {
				variant: "primary",
				onClick: pe,
				children: "执行整理"
			}) : null
		] }),
		children: [
			/* @__PURE__ */ (0, Q.jsx)(ee, {
				id: "cleanup-organize-title",
				gap: "medium",
				children: "整理"
			}),
			/* @__PURE__ */ (0, Q.jsx)("p", {
				className: "text-body-regular text-text-secondary",
				children: "清理文件名中的特殊符号与乱码，也可按模板改名并归入目录。先预览，确认后执行；执行过的一批可以整批退回。"
			}),
			r.isError ? /* @__PURE__ */ (0, Q.jsx)("div", {
				className: "mt-3",
				children: /* @__PURE__ */ (0, Q.jsx)(J, {
					tone: "error",
					title: "整理配置读取失败",
					children: p(r.error)
				})
			}) : null,
			/* @__PURE__ */ (0, Q.jsxs)("div", {
				className: "mt-3 flex flex-col gap-3",
				children: [
					/* @__PURE__ */ (0, Q.jsxs)("div", {
						"data-organize-scope": !0,
						className: "flex min-w-0 flex-wrap items-start gap-2",
						children: [a.length ? /* @__PURE__ */ (0, Q.jsx)(w, {
							"aria-label": "整理哪个来源",
							prefix: "来源",
							className: "w-fit min-w-25",
							selectedKey: c || null,
							onSelectionChange: (e) => {
								e !== null && (s(String(e)), v({
									location: String(e),
									path: ""
								}), E(null), P.reset(), F.reset(), j.current = !1);
							},
							children: a.map((e) => /* @__PURE__ */ (0, Q.jsxs)(ge, {
								id: e.location,
								textValue: x[e.location] || e.location,
								children: [/* @__PURE__ */ (0, Q.jsx)(Ae, { mark: oe[e.location] || "database" }), x[e.location] || e.location]
							}, e.location))
						}) : null, /* @__PURE__ */ (0, Q.jsxs)("div", {
							className: "flex min-w-0 basis-64 flex-1 items-start gap-2",
							children: [/* @__PURE__ */ (0, Q.jsx)(Ie, {
								"aria-label": "整理路径",
								className: "min-w-0 flex-1",
								placeholder: "留空整理整个来源",
								name: "organize-path",
								autoComplete: "off",
								spellCheck: "false",
								value: y,
								ref: O,
								isInvalid: T === "path",
								onChange: (e) => {
									v({
										location: c,
										path: e
									}), E(null), P.reset(), F.reset();
								}
							}), /* @__PURE__ */ (0, Q.jsx)(ye, {
								icon: ct,
								"aria-label": "选择整理路径",
								...q(F.isPending),
								onClick: () => F.mutate({
									initial: y || a.find((e) => e.location === c)?.roots[0] || "",
									location: c,
									path: y
								})
							})]
						})]
					}),
					/* @__PURE__ */ (0, Q.jsx)("p", {
						className: "text-caption-1-regular text-text-secondary",
						children: "指定路径时包含子目录，目录模板以该路径为起点。模板均留空时只清理文件名。"
					}),
					F.isError ? /* @__PURE__ */ (0, Q.jsxs)(J, {
						tone: "error",
						title: "目录选择失败",
						children: [p(F.error), "；也可直接输入路径。"]
					}) : null,
					/* @__PURE__ */ (0, Q.jsx)(Ie, {
						label: "文件名模板",
						placeholder: "{code}[ {title}]",
						value: f.file,
						ref: te,
						spellCheck: "false",
						isInvalid: T === "file",
						onFocus: () => {
							ne("file"), j.current = !0;
						},
						onChange: (e) => ce({ file: e })
					}),
					/* @__PURE__ */ (0, Q.jsx)(Ie, {
						label: "目录模板",
						placeholder: "留空表示原地改名",
						value: f.dir,
						ref: D,
						spellCheck: "false",
						isInvalid: T === "dir",
						onFocus: () => {
							ne("dir"), j.current = !0;
						},
						onChange: (e) => ce({ dir: e })
					}),
					i?.presets?.length ? /* @__PURE__ */ (0, Q.jsxs)("div", {
						className: "flex flex-col gap-2",
						role: "group",
						"aria-label": "套用模板",
						children: [/* @__PURE__ */ (0, Q.jsx)("p", {
							className: "text-caption-1-medium text-text-secondary",
							children: "套用模板"
						}), /* @__PURE__ */ (0, Q.jsx)("div", {
							className: "flex flex-wrap gap-2",
							children: i.presets.map((e) => /* @__PURE__ */ (0, Q.jsx)(W, {
								variant: "secondary",
								size: "small",
								title: e.example || e.label,
								className: "max-w-full [&>span]:min-w-0 [&>span]:shrink",
								onClick: () => {
									ce({
										file: e.file,
										dir: e.dir
									}), j.current = !1;
								},
								children: /* @__PURE__ */ (0, Q.jsx)("span", {
									className: "truncate",
									children: e.label
								})
							}, e.label))
						})]
					}) : null,
					/* @__PURE__ */ (0, Q.jsxs)("p", {
						"aria-live": "polite",
						"aria-busy": k.isFetching,
						"data-organize-example": "",
						className: "text-caption-1-regular text-text-secondary",
						children: ["路径示例：", /* @__PURE__ */ (0, Q.jsx)("code", {
							className: "wrap-anywhere",
							children: k.data?.example || k.data?.error || (k.isError ? p(k.error) : "正在预览…")
						})]
					}),
					i?.placeholders?.length ? /* @__PURE__ */ (0, Q.jsxs)("div", {
						className: "flex flex-col gap-2",
						role: "group",
						"aria-label": "插入参数",
						children: [/* @__PURE__ */ (0, Q.jsxs)("p", {
							className: "text-caption-1-regular text-text-secondary",
							"aria-live": "polite",
							children: [
								/* @__PURE__ */ (0, Q.jsx)("strong", {
									className: "text-caption-1-semibold text-text-primary",
									children: "插入参数"
								}),
								"（到",
								A === "file" ? "文件名模板" : "目录模板",
								"）"
							]
						}), /* @__PURE__ */ (0, Q.jsx)("div", {
							className: "flex flex-wrap gap-1",
							children: i.placeholders.map((e) => /* @__PURE__ */ (0, Q.jsx)(W, {
								variant: "ghost",
								size: "small",
								"aria-label": `${e.label} {${e.key}}`,
								onClick: () => ue(e.key),
								children: /* @__PURE__ */ (0, Q.jsxs)("span", {
									className: "inline-flex flex-wrap items-center gap-x-1.5",
									children: [/* @__PURE__ */ (0, Q.jsx)("code", { children: `{${e.key}}` }), /* @__PURE__ */ (0, Q.jsx)("span", {
										className: "text-text-secondary",
										children: e.label
									})]
								})
							}, e.key))
						})]
					}) : null,
					/* @__PURE__ */ (0, Q.jsx)("p", {
						className: "text-caption-1-regular leading-4.5 text-text-secondary",
						children: "点击参数插入光标处，选中文字可替换。方括号里的内容在字段为空时整段省略。"
					})
				]
			}),
			/* @__PURE__ */ (0, Q.jsx)("div", {
				"aria-live": "polite",
				className: "mt-3 flex flex-col gap-2 empty:hidden",
				children: V
			})
		]
	});
}
//#endregion
//#region src/react/data-cleanup/orphan-records-card.tsx
var Ot = G("play"), kt = () => _.invalidateQueries({
	queryKey: tt,
	exact: !0
});
function At({ item: e, toast: t }) {
	let [n, i] = (0, Z.useState)(e.candidates[0]?.id ?? null), a = ke({
		mutationFn: () => r(e.id, Number(n)),
		onSuccess: () => {
			let r = e.candidates.find((e) => e.id === n);
			t(`已将「${e.name}」的个人记录转移到「${r?.name ?? "所选文件"}」`), kt();
		},
		onError: (e) => t(p(e))
	}), o = ke({
		mutationFn: () => se(e.id),
		onSuccess: (n) => {
			t(n.blocked.length ? `「${e.name}」的文件已恢复，记录未删除；下次扫描后恢复为在库状态` : `已删除「${e.name}」的作品记录及个人记录`), kt();
		}
	}), s = () => {
		N({
			title: "删除记录",
			body: `将删除「${e.name}」的作品记录${B(e.records) ? `及其个人记录（${B(e.records)}）` : ""}。此操作不可撤销。`,
			confirmLabel: "删除记录",
			danger: !0,
			onConfirm: () => o.mutateAsync()
		});
	}, c = a.isPending || o.isPending;
	return /* @__PURE__ */ (0, Q.jsxs)("span", {
		className: "flex min-w-0 flex-wrap items-center gap-2",
		children: [
			/* @__PURE__ */ (0, Q.jsx)(W, {
				variant: "danger",
				size: "small",
				...q(c),
				onClick: s,
				children: "删除记录"
			}),
			e.candidates.length ? /* @__PURE__ */ (0, Q.jsx)(w, {
				"aria-label": `选择接收 ${e.name} 个人记录的文件`,
				prefix: "接收",
				className: "w-52",
				selectedKey: n,
				onSelectionChange: (e) => {
					e !== null && i(Number(e));
				},
				children: e.candidates.map((e) => /* @__PURE__ */ (0, Q.jsx)(ge, {
					id: e.id,
					textValue: R(e),
					children: R(e)
				}, e.id))
			}) : null,
			e.candidates.length ? /* @__PURE__ */ (0, Q.jsx)(W, {
				variant: "primary",
				size: "small",
				disabled: n === null,
				...q(c),
				onClick: () => a.mutate(),
				children: "转移记录"
			}) : null
		]
	});
}
function jt({ item: e }) {
	return /* @__PURE__ */ (0, Q.jsxs)("span", {
		className: "flex min-w-0 items-center gap-3",
		children: [/* @__PURE__ */ (0, Q.jsxs)("span", {
			className: "relative inline-grid aspect-16/10 w-24 flex-none place-items-center max-cleanup-tight:hidden overflow-hidden rounded-lg border border-separator-border bg-background-tertiary-default text-text-tertiary",
			children: [/* @__PURE__ */ (0, Q.jsx)(Ot, {
				"aria-hidden": !0,
				className: "size-5"
			}), e.has_thumb ? /* @__PURE__ */ (0, Q.jsx)("img", {
				src: `/thumb?id=${e.id}&c=4`,
				alt: "",
				loading: "lazy",
				onError: (e) => e.currentTarget.remove(),
				className: "absolute inset-0 size-full object-contain"
			}) : null]
		}), /* @__PURE__ */ (0, Q.jsxs)("span", {
			className: "flex min-w-0 flex-1 flex-col gap-0.5",
			children: [/* @__PURE__ */ (0, Q.jsx)("span", {
				title: e.name,
				className: "truncate text-body-regular text-text-primary",
				children: e.name
			}), /* @__PURE__ */ (0, Q.jsx)("small", {
				className: "truncate text-caption-1-regular text-text-secondary",
				children: [e.code, x[e.location] || e.location].filter(Boolean).join(" · ")
			})]
		})]
	});
}
function Mt({ toast: e }) {
	let [t, n] = (0, Z.useState)([]), r = U({
		queryKey: tt,
		queryFn: ({ signal: e }) => g(e)
	}), i = r.data?.items ?? [], a = ke({
		mutationFn: (e) => se(e),
		onSuccess: (t) => {
			e(`已删除 ${t.purged} 条作品记录及其个人记录${t.blocked.length ? `；${t.blocked.length} 条文件已恢复，记录未删除` : ""}`), n([]), kt();
		}
	}), o = (e) => void N({
		title: "删除所选记录",
		body: `将删除以下 ${e.length} 条作品记录及其全部个人记录。此操作不可撤销。`,
		items: e.map((e) => e.name),
		confirmLabel: "删除所选记录",
		danger: !0,
		onConfirm: () => a.mutateAsync(e.map((e) => e.id))
	}), s = [
		{
			id: "item",
			label: "作品",
			width: 480,
			min: 320,
			value: (e) => e.name,
			render: (e) => /* @__PURE__ */ (0, Q.jsx)(jt, { item: e })
		},
		{
			id: "records",
			label: "个人记录",
			width: 176,
			min: 144,
			value: (e) => B(e.records),
			render: (e) => /* @__PURE__ */ (0, Q.jsx)("span", {
				className: "block min-w-0 whitespace-normal wrap-anywhere",
				children: B(e.records) || "无"
			})
		},
		{
			id: "target",
			label: "操作",
			width: i.some((e) => e.candidates.length) ? 360 : 128,
			min: 128,
			value: (e) => e.candidates.length,
			render: (t) => /* @__PURE__ */ (0, Q.jsx)(At, {
				item: t,
				toast: e
			})
		}
	];
	return !r.isError && !i.length ? null : /* @__PURE__ */ (0, Q.jsx)("section", {
		id: "orphan-records",
		"aria-labelledby": "orphan-records-title",
		className: "flex scroll-mt-20 flex-col gap-4",
		children: r.isError ? /* @__PURE__ */ (0, Q.jsxs)(We, {
			layout: "stack",
			labelledBy: "orphan-records-title",
			children: [/* @__PURE__ */ (0, Q.jsx)(ee, {
				id: "orphan-records-title",
				children: "文件已丢失的记录"
			}), /* @__PURE__ */ (0, Q.jsx)(J, {
				tone: "error",
				title: "读取文件已丢失的记录失败",
				children: p(r.error)
			})]
		}) : /* @__PURE__ */ (0, Q.jsx)(at, {
			label: "文件已消失的作品",
			items: i,
			columns: s,
			title: "文件已丢失的记录",
			titleId: "orphan-records-title",
			unit: "条作品",
			description: "这些作品的源文件已删除，喜欢、稍后看、播放列表与观看历史仍保留。选择替代文件后，这些记录会转移到该文件，旧作品记录随之删除。",
			rowId: (e) => String(e.id),
			rowLabel: (e) => e.name,
			selected: t,
			onSelected: n,
			actions: (e) => /* @__PURE__ */ (0, Q.jsx)(W, {
				variant: "danger",
				size: "small",
				disabled: !e.length,
				...q(a.isPending),
				onClick: () => o(e),
				children: `删除所选记录（${e.length}）`
			})
		})
	});
}
//#endregion
//#region src/react/data-cleanup/resource-sync-card.tsx
var Nt = G("git-compare"), Pt = G("rotate-cw"), Ft = "暂时无法读取进度，正在重新连接…", It = "清理失效条目", Lt = "inline-grid w-full grid-flow-col auto-cols-fr gap-4 max-plain-stat-pair:grid-flow-row max-plain-stat-pair:grid-cols-2 max-plain-stat-single:grid-cols-1", $ = (e) => Number(e || 0).toLocaleString();
function Rt({ scan: e, partial: t = !1 }) {
	let n = e.cache ?? {
		files: 0,
		bytes: 0
	};
	return /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [/* @__PURE__ */ (0, Q.jsx)("div", {
		className: Lt,
		children: (e.sources ?? []).map((e) => /* @__PURE__ */ (0, Q.jsxs)("article", {
			className: X(),
			children: [/* @__PURE__ */ (0, Q.jsx)(Y, {
				label: ze[e.location] || "媒体来源",
				mark: /* @__PURE__ */ (0, Q.jsx)(Ae, { mark: oe[e.location] ?? "database" }),
				aside: /* @__PURE__ */ (0, Q.jsx)(lt, {
					online: e.online,
					children: e.online ? "可访问" : "离线"
				}),
				figure: e.online ? `${$(e.missing)} 项` : "—",
				meta: e.online ? v(e) : `${v(e)} · 本次已跳过`,
				wrapMeta: !0
			}), e.online && e.unreadable > 0 ? /* @__PURE__ */ (0, Q.jsx)("span", {
				className: "self-start",
				children: /* @__PURE__ */ (0, Q.jsxs)(C, {
					tone: "warning",
					children: [$(e.unreadable), " 个目录未读取"]
				})
			}) : null]
		}, e.location))
	}), !t && /* @__PURE__ */ (0, Q.jsxs)("div", {
		className: Lt,
		children: [
			/* @__PURE__ */ (0, Q.jsx)("article", {
				className: X(),
				children: /* @__PURE__ */ (0, Q.jsx)(Y, {
					label: "待永久删除",
					figure: `${$(j(e))} 项`,
					meta: "文件已不在盘上，含回收站"
				})
			}),
			/* @__PURE__ */ (0, Q.jsx)("article", {
				className: X(),
				children: /* @__PURE__ */ (0, Q.jsx)(Y, {
					label: "将标为已消失",
					figure: `${$(e.vanish)} 项`,
					meta: "带个人记录，记录留着"
				})
			}),
			/* @__PURE__ */ (0, Q.jsx)("article", {
				className: X(),
				children: /* @__PURE__ */ (0, Q.jsx)(Y, {
					label: "空文件夹",
					figure: `${$(e.empty)} 个`,
					meta: "保留来源根目录"
				})
			}),
			/* @__PURE__ */ (0, Q.jsx)("article", {
				className: X(),
				children: /* @__PURE__ */ (0, Q.jsx)(Y, {
					label: "可清理的缓存",
					figure: `${$(n.files)} 个`,
					meta: n.files ? me(n.bytes) : ""
				})
			})
		]
	})] });
}
function zt({ toast: e }) {
	let n = K({
		queryKey: Ye,
		queryFn: ({ signal: e }) => t(e),
		start: T,
		onFinish: (t) => {
			if (_.invalidateQueries({
				queryKey: Je,
				exact: !0
			}), _.invalidateQueries({
				queryKey: I,
				exact: !0
			}), t.status !== "complete") return;
			let { done: n, left: r } = o(t);
			r ? e(`已完成 ${$(n)} 项，${$(r)} 项没有处理`, { warning: !0 }) : e("已清理失效条目");
		}
	}), r = K({
		queryKey: I,
		queryFn: ({ signal: e }) => je(e),
		start: ie,
		onStarted: () => n.dismiss()
	}), i = r.job, a = r.running || r.start.isPending, s = n.running || n.start.isPending, c = i?.status === "complete" || i?.status === "failed", u = a ? "扫描中" : c ? "重新扫描" : "检查文件", d = (e) => void N({
		title: It,
		body: l(e),
		confirmLabel: It,
		danger: !0,
		onConfirm: () => n.start.mutateAsync(e.scan_id || "")
	}), m = n.outcome, h = (e) => {
		let t = o(e).left > 0;
		return /* @__PURE__ */ (0, Q.jsx)(J, {
			tone: t ? "warning" : "success",
			title: t ? "部分完成" : "清理结果",
			children: Ne(e, me)
		});
	}, g = null, v = null;
	if (m?.status === "failed") v = /* @__PURE__ */ (0, Q.jsx)(J, {
		tone: "error",
		title: "资源清理未完成",
		children: m.error || "请查看任务记录，核对已处理的文件。"
	});
	else if (m) v = h(m);
	else if (n.running) g = /* @__PURE__ */ (0, Q.jsx)(M, {
		embedded: !0,
		label: n.job?.message || "正在复核并清理失效条目"
	});
	else if (r.start.isError) v = /* @__PURE__ */ (0, Q.jsx)(J, {
		tone: "error",
		title: "扫描失败",
		children: p(r.start.error)
	});
	else if (r.query.isError && i) v = /* @__PURE__ */ (0, Q.jsx)(J, {
		tone: "neutral",
		title: "任务状态",
		children: Ft
	});
	else if (i?.status === "running") {
		let e = f(i);
		g = /* @__PURE__ */ (0, Q.jsx)(M, {
			embedded: !0,
			label: e,
			value: i.completed_sources,
			total: i.total_sources
		}), i.sources?.length && (v = /* @__PURE__ */ (0, Q.jsx)(Rt, {
			scan: i,
			partial: !0
		}));
	} else if (i?.status === "failed") v = /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [i.sources?.length ? /* @__PURE__ */ (0, Q.jsx)(Rt, {
		scan: i,
		partial: !0
	}) : null, /* @__PURE__ */ (0, Q.jsx)(J, {
		tone: "error",
		title: "扫描失败",
		children: i.error || "后台扫描失败"
	})] });
	else if (i?.status === "complete" && i.applied) v = n.job?.status === "complete" ? h(n.job) : /* @__PURE__ */ (0, Q.jsx)(J, {
		tone: "neutral",
		title: "清理结果",
		children: "这次检查的结果已经清理，重新扫描可再核对。"
	});
	else if (i?.status === "complete") {
		let e = E(i);
		v = /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [/* @__PURE__ */ (0, Q.jsx)(Rt, { scan: i }), e ? /* @__PURE__ */ (0, Q.jsx)(J, {
			tone: "neutral",
			title: "清理内容",
			action: /* @__PURE__ */ (0, Q.jsx)(W, {
				variant: "danger",
				...q(s),
				onClick: () => d(i),
				children: s ? "正在复核并清理…" : It
			}),
			children: k(i)
		}) : /* @__PURE__ */ (0, Q.jsx)("p", {
			className: "mr-auto text-body-regular text-notification-success-foreground",
			children: "已检查可访问的来源，没有待清理的记录、空文件夹或缓存。"
		})] });
	}
	return n.start.isError && !m && (v = /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [v, /* @__PURE__ */ (0, Q.jsx)(J, {
		tone: "error",
		title: "清理失败",
		children: p(n.start.error)
	})] })), /* @__PURE__ */ (0, Q.jsxs)("section", {
		id: "resource-sync",
		"aria-labelledby": "resource-sync-title",
		className: "flex scroll-mt-20 flex-col gap-4",
		children: [/* @__PURE__ */ (0, Q.jsxs)(We, {
			layout: "split",
			labelledBy: "resource-sync-title",
			footer: /* @__PURE__ */ (0, Q.jsx)(W, {
				"data-resource-scan": !0,
				leadingIcon: c && !a ? Pt : Nt,
				...q(a),
				onClick: () => {
					a || r.start.mutate();
				},
				children: u
			}),
			children: [
				/* @__PURE__ */ (0, Q.jsx)(ee, {
					id: "resource-sync-title",
					gap: "small",
					children: "资源同步"
				}),
				/* @__PURE__ */ (0, Q.jsx)("p", {
					className: "max-w-190 text-body-2-regular leading-5 text-text-secondary",
					children: "按馆藏记录逐条查找本地磁盘与网盘上的文件，列出文件已不存在的记录、空文件夹，以及不再被引用的缓存。"
				}),
				/* @__PURE__ */ (0, Q.jsx)("div", {
					"aria-live": "polite",
					className: "mt-4 empty:hidden",
					children: g
				})
			]
		}), /* @__PURE__ */ (0, Q.jsx)("div", {
			"aria-live": "polite",
			className: "flex flex-col gap-4 empty:hidden",
			children: v
		})]
	});
}
//#endregion
//#region src/react/data-cleanup/data-cleanup-page.tsx
function Bt(e, t) {
	return e.data === void 0 ? { figure: e.isError ? "读取失败" : "—" } : t(e.data);
}
function Vt({ section: e, label: t, icon: n, value: r, open: i }) {
	return /* @__PURE__ */ (0, Q.jsx)("button", {
		type: "button",
		className: X({ interactive: !0 }),
		"data-cleanup-go": e,
		onClick: () => i(e),
		children: /* @__PURE__ */ (0, Q.jsx)(Y, {
			label: t,
			icon: n,
			figure: r.figure,
			meta: r.meta
		})
	});
}
var Ht = G("square-check-big"), Ut = G("sparkles"), Wt = G("file-stack"), Gt = G("file-archive"), Kt = G("trash"), qt = [
	H,
	be,
	Qe
], Jt = () => {
	for (let e of qt) _.invalidateQueries({
		queryKey: e,
		exact: !0
	});
};
function Yt({ toast: e, failure: t, open: n }) {
	let r = U({
		queryKey: H,
		queryFn: ({ signal: e }) => ve(e)
	}), a = U({
		queryKey: be,
		queryFn: ({ signal: e }) => Fe(e)
	}), o = U({
		queryKey: Qe,
		queryFn: ({ signal: e }) => F(e)
	}), s = U({
		queryKey: Ee,
		queryFn: ({ signal: e }) => $e(e)
	}), c = U({
		queryKey: Je,
		queryFn: ({ signal: e }) => Ze(e)
	}), l = U({
		queryKey: ne,
		queryFn: ({ signal: e }) => d(e)
	}), u = (t) => e(t);
	return /* @__PURE__ */ (0, Q.jsxs)(nt, { children: [
		/* @__PURE__ */ (0, Q.jsxs)("div", {
			className: it,
			children: [
				/* @__PURE__ */ (0, Q.jsx)(Vt, {
					section: "review",
					label: "人工复核",
					icon: Ht,
					open: n,
					value: Bt(r, i)
				}),
				/* @__PURE__ */ (0, Q.jsx)(Vt, {
					section: "quality",
					label: "高清版",
					icon: Ut,
					open: n,
					value: Bt(a, (e) => ({ figure: `${Number(e.total || 0).toLocaleString()} 个待升级` }))
				}),
				/* @__PURE__ */ (0, Q.jsx)(Vt, {
					section: "duplicates",
					label: "重复文件",
					icon: Wt,
					open: n,
					value: Bt(o, (e) => Number(e.total || 0) ? {
						figure: `${Number(e.total).toLocaleString()} 组 · ${Number(e.files || 0).toLocaleString()} 个文件`,
						meta: `可回收 ${me(e.reclaimable || 0)}`
					} : { figure: "没有重复内容" })
				}),
				/* @__PURE__ */ (0, Q.jsx)(Vt, {
					section: "ads",
					label: "垃圾文件",
					icon: Gt,
					open: n,
					value: Bt(s, (e) => ({
						figure: `${Number(e.pending_total || 0).toLocaleString()} 个待判断`,
						meta: ae(e)
					}))
				}),
				/* @__PURE__ */ (0, Q.jsx)(Vt, {
					section: "trash",
					label: "回收站",
					icon: Kt,
					open: n,
					value: Bt(c, (e) => ({
						figure: `${Number(e.total || 0).toLocaleString()} 项在回收站`,
						meta: e.total ? `占用 ${me(e.bytes || 0)}` : ""
					}))
				})
			]
		}),
		/* @__PURE__ */ (0, Q.jsxs)("div", {
			className: "flex flex-col gap-4 max-cleanup-tight:gap-3",
			children: [
				/* @__PURE__ */ (0, Q.jsx)("div", {
					id: "libraryProcessing",
					className: "scroll-mt-20",
					children: /* @__PURE__ */ (0, Q.jsx)(ce, {
						toast: u,
						monitor: !0,
						onComplete: Jt
					})
				}),
				/* @__PURE__ */ (0, Q.jsx)("div", {
					id: "mediaRepair",
					children: /* @__PURE__ */ (0, Q.jsx)(ft, { toast: u })
				}),
				/* @__PURE__ */ (0, Q.jsx)(Dt, {
					toast: u,
					failure: t
				})
			]
		}),
		/* @__PURE__ */ (0, Q.jsx)(St, {}),
		/* @__PURE__ */ (0, Q.jsx)(Mt, { toast: u }),
		D(l.data) ? /* @__PURE__ */ (0, Q.jsx)(zt, { toast: e }) : null
	] });
}
//#endregion
export { Yt as DataCleanupPage };

//# debugId=810dbbe5-3cfe-44de-b6e1-f15115c45e2f