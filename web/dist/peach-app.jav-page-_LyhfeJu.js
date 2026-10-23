(function() {
	try {
		var e = typeof window < "u" ? window : typeof global < "u" ? global : typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : {}, t = new e.Error().stack;
		t && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[t] = "bf2b789d-c4be-451a-b7be-708b13e02049", e._sentryDebugIdIdentifier = "sentry-dbid-bf2b789d-c4be-451a-b7be-708b13e02049");
	} catch {}
})();
import { $ as e, $t as t, Cc as n, Dc as r, Do as i, Ec as a, G as o, Gl as s, Go as c, Ha as l, Ii as u, J as d, Js as f, K as p, Ka as m, Oa as h, Qs as ee, Qt as g, Ra as te, Ul as ne, Va as _, Xs as v, Y as y, Ys as b, Zs as x, _o as S, _s as C, an as w, ao as T, au as E, bo as re, cn as D, cu as ie, en as ae, et as oe, fa as se, fs as O, gs as ce, hl as k, hn as le, hs as ue, in as de, io as A, it as fe, la as pe, ln as j, lo as M, ma as N, n as me, nn as P, no as he, nt as ge, on as F, oo as I, pa as L, peachHistory as R, pn as z, ps as B, pu as V, q as H, ql as _e, qs as ve, rn as ye, ro as U, rt as be, sa as xe, sn as W, so as G, ss as K, tn as q, tt as Se, ua as Ce, uu as we, vs as Te, xc as Ee } from "./peach-app.js";
import { n as J } from "./peach-app.source-view-DaRl5mr9.js";
import "./peach-app.source-list-E8TH3X9X.js";
//#region src/react/jav/discovery-faces.tsx
var Y = /* @__PURE__ */ V(we(), 1), X = ie();
function De({ item: e }) {
	let t = e.performer_refs?.length ? e.performer_refs : [...new Set(e.performers.split(/[,，、;/]/).filter(Boolean))].map((e) => ({ name: e })), n = t.slice(0, 5).map((t, n) => {
		let r = { "--media-avatar-index": n }, i = t.source_avatar && t.source_actor_id && !t.has_image ? { children: /* @__PURE__ */ (0, X.jsx)(z, {
			code: e.code,
			person: t
		}) } : { dangerouslySetInnerHTML: { __html: a(t.name, t, null) } };
		return t.id ? /* @__PURE__ */ (0, X.jsx)("a", {
			"data-media-avatar": "",
			style: r,
			href: _e("performer", t.name, t.id),
			"aria-label": `打开女优页：${t.name}`,
			...i
		}, t.name) : /* @__PURE__ */ (0, X.jsx)("span", {
			"data-media-avatar": "",
			style: r,
			title: t.name,
			...i
		}, t.name);
	});
	return t.length > 1 ? /* @__PURE__ */ (0, X.jsx)("div", {
		"data-media-avatars": "",
		style: { "--media-avatar-count": Math.min(5, t.length) },
		children: n
	}) : n[0] || null;
}
//#endregion
//#region src/react/wants/want-list.tsx
var Z = {
	code: "手动添加",
	feed: "订阅新作",
	follow: "关注"
}, Oe = [
	["all", "全部"],
	["available", "有磁链"],
	["missing", "没磁链"]
], Q = (e) => [
	e.release_date,
	e.studio,
	e.performers,
	Z[e.origin]
].filter(Boolean).join(" · ");
function ke({ want: e }) {
	return /* @__PURE__ */ (0, X.jsxs)("span", {
		className: "relative inline-grid w-card-cover shrink-0 aspect-card-cover place-items-center overflow-hidden rounded-2lg bg-background-tertiary-default max-sm:w-24",
		children: [/* @__PURE__ */ (0, X.jsx)("span", {
			className: "text-caption-1-regular text-text-secondary",
			children: "无封面"
		}), e.cover ? /* @__PURE__ */ (0, X.jsx)("img", {
			src: e.cover,
			alt: "",
			loading: "lazy",
			referrerPolicy: e.remote_cover ? "no-referrer" : void 0,
			onError: (e) => e.currentTarget.remove(),
			className: "absolute inset-0 size-full object-cover"
		}) : null]
	});
}
function Ae({ want: e, readOnly: t, busy: n, onReset: r, onRemove: a, onCloudDownload: s, downloads: c, provider: l, toast: u }) {
	let [d, f] = (0, Y.useState)(""), p = e.link || d || (e.code ? `https://javdb.com/search?q=${encodeURIComponent(e.code)}&f=all` : "");
	return /* @__PURE__ */ (0, X.jsxs)("li", {
		"data-want-id": e.id,
		className: _({
			bordered: "soft",
			className: "flex flex-col gap-4 max-sm:p-4"
		}),
		children: [/* @__PURE__ */ (0, X.jsxs)("div", {
			className: "flex min-w-0 items-start gap-4 max-sm:gap-3",
			children: [/* @__PURE__ */ (0, X.jsx)(ke, { want: e }), /* @__PURE__ */ (0, X.jsxs)("div", {
				className: "flex min-w-0 flex-1 flex-col gap-1",
				children: [
					/* @__PURE__ */ (0, X.jsxs)("p", {
						className: "flex min-w-0 flex-wrap items-baseline gap-x-2",
						children: [/* @__PURE__ */ (0, X.jsx)("b", {
							className: "min-w-0 text-headline-medium wrap-anywhere text-text-primary",
							children: j(e)
						}), e.code && e.title ? /* @__PURE__ */ (0, X.jsx)("span", {
							className: "min-w-0 truncate text-body-2-regular text-text-secondary",
							children: e.title
						}) : null]
					}),
					Q(e) ? /* @__PURE__ */ (0, X.jsx)("p", {
						className: "text-body-2-regular text-text-secondary",
						children: Q(e)
					}) : null,
					!e.code || e.phase === "unreleased" || e.phase === "acquired" ? /* @__PURE__ */ (0, X.jsx)("p", {
						"data-want-note": "",
						className: "text-caption-1-regular text-text-secondary",
						children: D(e)
					}) : null,
					e.scrape_error ? /* @__PURE__ */ (0, X.jsx)(J, {
						text: e.scrape_error,
						prefix: "资料未取得：",
						tone: "muted"
					}) : null,
					/* @__PURE__ */ (0, X.jsxs)("div", {
						className: "mt-1 flex flex-wrap items-center gap-2",
						children: [
							p ? /* @__PURE__ */ (0, X.jsx)(B, {
								"data-button-link": "",
								variant: "secondary",
								size: "small",
								trailingIcon: i,
								href: p,
								target: "_blank",
								rel: "noopener noreferrer",
								children: "来源页"
							}) : null,
							/* @__PURE__ */ (0, X.jsx)(O, {
								variant: "secondary",
								size: "small",
								leadingIcon: re,
								disabled: t,
								...U(n === `remove:${e.id}`),
								onClick: a,
								children: "移除"
							}),
							e.phase === "given_up" ? /* @__PURE__ */ (0, X.jsx)(O, {
								variant: "secondary",
								size: "small",
								disabled: t,
								...U(n === `reset:${e.id}`),
								onClick: r,
								children: "重新查找"
							}) : null,
							e.phase === "searching" || e.phase === "given_up" ? /* @__PURE__ */ (0, X.jsx)(O, {
								variant: "secondary",
								size: "small",
								onClick: s,
								children: "查找资源"
							}) : null
						]
					})
				]
			})]
		}), e.code && (e.phase === "searching" || e.phase === "given_up") ? /* @__PURE__ */ (0, X.jsx)(o, {
			want: e,
			readOnly: t,
			downloads: c,
			provider: l,
			toast: u,
			onSource: f
		}) : null]
	});
}
function je({ phase: e, label: t, rows: n, row: r }) {
	let [i, a] = (0, Y.useState)(1), [o, s] = (0, Y.useState)("all"), l = p(n), d = (e) => e.has_magnets ?? l.get(e.code || "") ?? !1, f = n.filter(d), m = e !== "searching" || o === "all" ? n : n.filter((e) => d(e) === (o === "available")), h = k(m.length, 20, i);
	return /* @__PURE__ */ (0, X.jsxs)("section", {
		"aria-label": t,
		"data-want-phase": e,
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, X.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, X.jsxs)("h3", {
					className: "flex items-baseline gap-2 text-title-2-medium text-text-primary",
					children: [t, /* @__PURE__ */ (0, X.jsx)("span", {
						className: "text-body-2-regular tabular-nums text-text-secondary",
						children: n.length.toLocaleString()
					})]
				}), e === "searching" ? /* @__PURE__ */ (0, X.jsx)(N, {
					name: "want-magnet-filter",
					"aria-label": "待找磁链筛选",
					orientation: "horizontal",
					value: o,
					className: L,
					onChange: (e) => {
						s(e), a(1);
					},
					children: Oe.map(([e, t]) => /* @__PURE__ */ (0, X.jsxs)(K, {
						value: e,
						"aria-label": t,
						className: se,
						children: [t, /* @__PURE__ */ (0, X.jsx)("span", {
							className: "text-caption-1-regular tabular-nums text-text-tertiary",
							children: (e === "all" ? n.length : e === "available" ? f.length : n.length - f.length).toLocaleString()
						})]
					}, e))
				}) : null]
			}),
			m.length ? null : /* @__PURE__ */ (0, X.jsx)(I, {
				size: "compact",
				icon: c,
				title: "暂无符合条件的作品",
				actions: /* @__PURE__ */ (0, X.jsx)(O, {
					size: "small",
					onClick: () => {
						s("all"), a(1);
					},
					children: "查看全部"
				}),
				children: null
			}),
			/* @__PURE__ */ (0, X.jsx)("ul", {
				className: "flex flex-col gap-4",
				children: m.slice(h.start, h.end).map(r)
			}),
			h.pages > 1 ? /* @__PURE__ */ (0, X.jsxs)("div", {
				"data-want-pager": "",
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, X.jsx)("span", {
					className: "text-body-2-regular tabular-nums text-text-secondary",
					children: `${(h.start + 1).toLocaleString()}–${h.end.toLocaleString()} / ${h.total.toLocaleString()} 条`
				}), /* @__PURE__ */ (0, X.jsx)(u, {
					label: `${t}分页`,
					page: h.page,
					pages: h.pages,
					onPage: a
				})]
			}) : null
		]
	});
}
function Me({ readOnly: e, toast: t, query: n = "", clearQuery: r }) {
	let [i, a] = (0, Y.useState)(""), [o, u] = (0, Y.useState)(null), f = l(), p = E({
		queryKey: P,
		queryFn: ({ signal: e }) => de(e),
		staleTime: 3e4,
		refetchInterval: (e) => e.state.data?.scraping ? 3e3 : !1
	}), m = () => {
		let n = i.trim();
		n && !e && f.run("add", (e) => ye({ code: n }, e), (e) => {
			t(e.created ? `已加入想要：${j(e.want)}` : `${j(e.want)} 已经在想要里`), a(""), w();
		});
	}, ee = (e) => {
		e.key === "Enter" && !e.nativeEvent.isComposing && (e.preventDefault(), m());
	}, g = (e) => {
		f.run(`remove:${e.id}`, (t) => F([e.id], t), () => {
			t(`已移除：${j(e)}`), w();
		});
	}, te = (e) => {
		f.run(`reset:${e.id}`, (t) => W([e.id], t), () => {
			t(`${j(e)} 回到待找`), w();
		});
	}, v = p.data, b = (v?.items || []).filter((e) => !n || [
		e.code,
		e.title,
		e.performers
	].join(" ").toLocaleLowerCase().includes(n.toLocaleLowerCase())), x = E({
		queryKey: d,
		queryFn: ({ signal: e }) => ne(`${y}?limit=100`, e),
		enabled: b.some((e) => e.code && (e.phase === "searching" || e.phase === "given_up"))
	}), S = x.data?.providers.filter((e) => e.configured) || [], C = S[0]?.key || "";
	return /* @__PURE__ */ (0, X.jsxs)("div", {
		"aria-busy": p.isPending,
		className: "flex flex-col gap-8",
		children: [
			/* @__PURE__ */ (0, X.jsxs)("div", {
				className: _({
					padding: "none",
					className: "flex flex-col gap-4 px-6 py-5 max-sm:px-4"
				}),
				children: [
					/* @__PURE__ */ (0, X.jsx)("h3", {
						className: "text-title-2-medium text-text-primary",
						children: "按番号添加"
					}),
					/* @__PURE__ */ (0, X.jsxs)("div", {
						className: "flex flex-wrap items-end gap-2",
						children: [/* @__PURE__ */ (0, X.jsx)("div", {
							className: "min-w-64 grow max-sm:min-w-0",
							children: /* @__PURE__ */ (0, X.jsx)(M, {
								"aria-label": "番号",
								placeholder: "输入番号，例如 SSIS-950",
								value: i,
								isDisabled: e,
								onChange: a,
								onKeyDown: ee
							})
						}), /* @__PURE__ */ (0, X.jsx)(O, {
							variant: "primary",
							disabled: e || !i.trim(),
							...U(f.busy === "add"),
							onClick: m,
							children: "添加"
						})]
					}),
					f.error ? /* @__PURE__ */ (0, X.jsx)(G, {
						tone: "error",
						title: "这一次没有完成",
						children: f.error
					}) : null
				]
			}),
			p.error ? /* @__PURE__ */ (0, X.jsx)(G, {
				tone: "error",
				title: "想要清单读取失败",
				children: s(p.error)
			}) : null,
			p.isPending ? /* @__PURE__ */ (0, X.jsx)("div", {
				role: "status",
				"aria-label": "正在读取想要",
				dangerouslySetInnerHTML: { __html: oe("wants") }
			}) : null,
			v?.scraping ? /* @__PURE__ */ (0, X.jsx)(h, {
				role: "status",
				children: "正在给刚加入的番号取资料与封面。"
			}) : null,
			x.error ? /* @__PURE__ */ (0, X.jsx)(G, {
				tone: "error",
				title: "下载配置未取得",
				children: s(x.error)
			}) : null,
			x.data && !S.length ? /* @__PURE__ */ (0, X.jsxs)(G, {
				tone: "neutral",
				children: ["尚未配置下载渠道。", /* @__PURE__ */ (0, X.jsx)("a", {
					href: "/settings/library?section=%E4%B8%8B%E8%BD%BD%E6%B8%A0%E9%81%93",
					children: "下载渠道设置"
				})]
			}) : null,
			x.data && !x.data.available ? /* @__PURE__ */ (0, X.jsx)(G, {
				tone: "neutral",
				children: "云下载只在允许修改数据库的设备上可用。"
			}) : null,
			v && !b.length ? /* @__PURE__ */ (0, X.jsx)(I, {
				size: "compact",
				icon: c,
				title: n ? "没有符合条件的作品" : "还没有想要的作品",
				actions: n && r ? /* @__PURE__ */ (0, X.jsx)(O, {
					size: "small",
					onClick: r,
					children: "清除搜索"
				}) : !n && !e ? /* @__PURE__ */ (0, X.jsx)(T, {
					target: "input[aria-label=\"番号\"]",
					children: "添加作品"
				}) : void 0,
				children: n ? "试试其他番号、女优或标题。" : "输入番号，添加想看的作品。"
			}) : null,
			q.map(([n, r]) => {
				let i = b.filter((e) => e.phase === n);
				return i.length ? /* @__PURE__ */ (0, X.jsx)(je, {
					phase: n,
					label: r,
					rows: i,
					row: (n) => /* @__PURE__ */ (0, X.jsx)(Ae, {
						want: n,
						readOnly: e,
						busy: f.busy,
						downloads: x.data,
						provider: C,
						toast: t,
						onReset: () => te(n),
						onRemove: () => g(n),
						onCloudDownload: () => u({
							code: n.code || "",
							title: n.title || "",
							origin: `wishlist:${n.id}`,
							cover: n.cover || "",
							performers: n.performers || "",
							release_date: n.release_date || "",
							studio: n.studio || ""
						})
					}, n.id)
				}, n) : null;
			}),
			/* @__PURE__ */ (0, X.jsx)(H, {
				prefill: o,
				close: () => u(null),
				receipt: t,
				provider: C
			})
		]
	});
}
//#endregion
//#region src/react/jav/jav-page.tsx
var Ne = A("search"), Pe = A("x"), Fe = A("refresh-cw");
function $(e) {
	let t = new URLSearchParams(location.search);
	for (let [n, r] of Object.entries(e)) r ? t.set(n, r) : t.delete(n);
	m(location.pathname + (t.size ? `?${t}` : ""), {
		replace: !0,
		state: R.navigation.location.state
	});
}
function Ie({ tab: e, readOnly: t, navigate: n, receipt: r }) {
	let [i, a] = (0, Y.useState)(null), [o, s] = (0, Y.useState)(() => new URLSearchParams(location.search).get("q") || ""), c = (e) => {
		s(e), $({ q: e });
	};
	return /* @__PURE__ */ (0, X.jsxs)("div", {
		className: "flex w-full flex-col gap-6",
		children: [
			/* @__PURE__ */ (0, X.jsx)(me, {
				tab: e,
				navigate: n,
				find: () => a({})
			}),
			/* @__PURE__ */ (0, X.jsx)("form", {
				"aria-label": e === "discover" ? "筛选推荐" : "筛选想要",
				onSubmit: (e) => {
					e.preventDefault();
				},
				children: /* @__PURE__ */ (0, X.jsx)(M, {
					type: "search",
					"aria-label": e === "discover" ? "筛选推荐" : "筛选想要",
					placeholder: "筛选番号、女优或标题",
					leadingIcon: Ne,
					value: o,
					onChange: c,
					enterKeyHint: "search"
				})
			}),
			e === "discover" ? /* @__PURE__ */ (0, X.jsx)(Le, {
				readOnly: t,
				receipt: r,
				resource: a,
				query: o.trim(),
				navigate: n,
				clearText: () => c("")
			}) : /* @__PURE__ */ (0, X.jsx)(Me, {
				readOnly: t,
				toast: r,
				query: o.trim(),
				clearQuery: () => c("")
			}),
			/* @__PURE__ */ (0, X.jsx)(H, {
				prefill: i,
				close: () => a(null),
				receipt: r
			})
		]
	});
}
function Le({ readOnly: a, receipt: o, resource: c, query: u, navigate: d, clearText: p }) {
	let m = new URLSearchParams(location.search), [h, ne] = (0, Y.useState)(() => m.get("scope") === "library" ? "library" : "external"), [_, y] = (0, Y.useState)(() => m.get("tag") || ""), [T, re] = (0, Y.useState)(() => ge.some(([e]) => e === m.get("sort")) ? m.get("sort") : "taste"), [D, ie] = (0, Y.useState)(() => m.get("dir") === "asc"), se = (e) => {
		ne(e), $({ scope: e === "external" ? "" : e });
	}, k = (e) => {
		y(e), $({ tag: e });
	}, de = (e) => {
		re(e), $({ sort: e === "taste" ? "" : e });
	}, A = (e) => {
		ie(e), $({ dir: e ? "asc" : "" });
	}, j = (0, Y.useRef)(null);
	(0, Y.useEffect)(() => {
		let e = [...j.current?.querySelectorAll("[data-catalog-scroll],[data-catalog-tags],[data-filter-row=\"bottom\"]") || []].map((e) => n(e, { drag: !0 }));
		return () => e.forEach((e) => e.destroy());
	}, []);
	let M = ee();
	(0, Y.useSyncExternalStore)(M.subscribe, M.version, M.version);
	let N = v(), me = f(b({
		active: !0,
		home: !1,
		portrait: !1
	})), P = (0, Y.useRef)({}), F = (0, Y.useRef)(!1), L = (0, Y.useRef)(!1), R = D ? "asc" : "desc", z = E({
		queryKey: t(h, T, R),
		retry: !1,
		refetchOnWindowFocus: !1,
		queryFn: ({ signal: e }) => {
			let t = F.current, n = L.current;
			return F.current = !1, L.current = !1, ae(h, e, {
				sort: T,
				direction: R,
				jobId: t ? void 0 : P.current[h],
				refreshMetadata: t,
				cancelMetadata: n
			});
		},
		refetchInterval: (e) => e.state.data?.metadata_job?.status === "running" && Math.max(1e3, e.state.data.poll_after_ms || 3e3)
	}), V = z.data?.metadata_job;
	(0, Y.useEffect)(() => {
		V?.job_id && (P.current[h] = V.job_id);
	}, [h, V?.job_id]);
	let H = l(), W = l(), K = (e) => {
		W.run(e, async () => (L.current = e === "stop", F.current = e !== "stop", z.refetch({
			cancelRefetch: !0,
			throwOnError: !0
		})), () => {});
	}, q = z.data?.items || [], we = [...new Set(q.flatMap((e) => e.tags || []))], J = q.filter((e) => (!_ || e.tags?.includes(_)) && (!u || [
		e.code,
		e.title,
		e.performers,
		e.studio,
		...e.tags || [],
		...(e.performer_refs || []).map((e) => e.name)
	].join(" ").toLocaleLowerCase().includes(u.toLocaleLowerCase()))), Z = z.isPending;
	return /* @__PURE__ */ (0, X.jsxs)("section", {
		ref: j,
		"aria-label": "为你推荐",
		"aria-busy": Z,
		className: "flex min-w-0 flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, X.jsx)(ue, {
				label: "发现筛选与排序",
				topLabel: "发现范围与标签",
				attrs: {
					"data-filter-frame": "",
					"data-jav-filter": "",
					"data-catalog-frame": ""
				},
				busy: Z,
				topClassName: "gap-1.5 overflow-visible",
				bottomClassName: "min-h-12",
				top: /* @__PURE__ */ (0, X.jsxs)("div", {
					"data-catalog-scroll": "",
					children: [/* @__PURE__ */ (0, X.jsxs)("div", {
						"data-catalog-views": "",
						children: [[["external", "库外发现"], ["library", "馆藏探索"]].map(([e, t]) => /* @__PURE__ */ (0, X.jsx)(C, {
							"data-entity-tag": e,
							"data-entity-press": "",
							pressed: h === e,
							onPress: () => {
								se(e), k("");
							},
							children: t
						}, e)), /* @__PURE__ */ (0, X.jsx)("span", {
							"data-entity-sep": "",
							"aria-hidden": "true"
						})]
					}), /* @__PURE__ */ (0, X.jsx)("div", {
						"data-catalog-tags": "",
						dangerouslySetInnerHTML: Z ? { __html: Se() } : void 0,
						children: Z ? null : we.map((e) => /* @__PURE__ */ (0, X.jsxs)(C, {
							"data-catalog-tag": e,
							"data-entity-press": "",
							pressed: _ === e,
							onPress: () => k(_ === e ? "" : e),
							children: [e, /* @__PURE__ */ (0, X.jsx)("span", {
								"data-count-badge": "",
								children: q.filter((t) => t.tags?.includes(e)).length
							})]
						}, e))
					})]
				}),
				bottom: /* @__PURE__ */ (0, X.jsxs)(X.Fragment, { children: [
					/* @__PURE__ */ (0, X.jsx)("span", {
						"data-catalog-readout": "",
						children: Z ? /* @__PURE__ */ (0, X.jsx)("span", {
							"data-skeleton": "count",
							"aria-hidden": !0,
							className: "relative inline-block h-3.5 w-37.5 rounded-md align-middle skeleton-sheen"
						}) : `${J.length} 部`
					}),
					/* @__PURE__ */ (0, X.jsx)(he, { currentHref: () => location.pathname + location.search }),
					u || _ ? /* @__PURE__ */ (0, X.jsx)(Te, {
						onPress: () => {
							k(""), p();
						},
						children: "清除筛选"
					}) : null,
					/* @__PURE__ */ (0, X.jsxs)("span", {
						"data-entity-sorts": "",
						children: [
							h === "external" ? /* @__PURE__ */ (0, X.jsx)(ce, {
								"data-entity-batch": "",
								"data-jav-metadata-update": "",
								label: V?.status === "running" ? "停止读取" : "更新资料",
								disabled: Z,
								"data-skeleton-action": Z ? "" : void 0,
								busy: !!W.busy,
								icon: V?.status === "running" ? Pe : Fe,
								onPress: () => K(V?.status === "running" ? "stop" : "update")
							}) : null,
							/* @__PURE__ */ (0, X.jsx)(pe, {
								label: "JAV 卡片版式",
								value: N,
								options: ve,
								onChange: x
							}),
							/* @__PURE__ */ (0, X.jsx)(Ce, {
								sorts: ge.map(([e, t, n]) => ({
									key: e,
									label: t,
									ariaLabel: n,
									pressed: e === T,
									dir: R
								})),
								onSort: (e) => {
									e === T ? A(!D) : (de(e), A(e === "code"));
								}
							})
						]
					})
				] })
			}),
			Z ? /* @__PURE__ */ (0, X.jsx)("div", {
				role: "status",
				"aria-label": "正在读取推荐",
				dangerouslySetInnerHTML: { __html: oe("discover", N) }
			}) : null,
			z.error ? /* @__PURE__ */ (0, X.jsx)(G, {
				tone: "error",
				title: "推荐未取得",
				children: s(z.error)
			}) : null,
			h === "external" && V?.status === "running" ? /* @__PURE__ */ (0, X.jsx)("div", {
				"data-jav-metadata": "",
				className: "min-w-0",
				children: /* @__PURE__ */ (0, X.jsx)(te, {
					embedded: !0,
					label: `正在读取作品资料 · ${V.completed} / ${V.total} 部`,
					value: V.completed,
					total: V.total
				})
			}) : null,
			V && V.status !== "running" && (V.status !== "complete" || V.failed > 0) ? /* @__PURE__ */ (0, X.jsx)(G, {
				tone: "neutral",
				action: /* @__PURE__ */ (0, X.jsx)(O, {
					variant: "secondary",
					...U(W.busy === "retry"),
					"aria-label": "立即重试读取作品资料",
					onClick: () => K("retry"),
					children: "立即重试"
				}),
				children: V.message || `作品资料 ${V.completed} / ${V.total} 部`
			}) : null,
			W.error ? /* @__PURE__ */ (0, X.jsx)(G, {
				tone: "error",
				children: W.error
			}) : null,
			!Z && !z.error && !J.length ? /* @__PURE__ */ (0, X.jsx)(I, {
				icon: S,
				title: u || _ ? "没有符合条件的推荐" : "暂无匹配口味的作品",
				actions: /* @__PURE__ */ (0, X.jsxs)(X.Fragment, { children: [/* @__PURE__ */ (0, X.jsx)(B, {
					size: "small",
					href: "/taste",
					variant: "secondary",
					children: "查看口味"
				}), u || _ ? /* @__PURE__ */ (0, X.jsx)(O, {
					variant: "primary",
					size: "small",
					onClick: () => {
						p(), y(""), $({
							q: "",
							tag: ""
						});
					},
					children: "清除筛选"
				}) : h === "library" ? /* @__PURE__ */ (0, X.jsx)(B, {
					variant: "primary",
					size: "small",
					href: "/",
					children: "浏览馆藏"
				}) : /* @__PURE__ */ (0, X.jsx)(O, {
					variant: "primary",
					size: "small",
					onClick: () => c({}),
					children: "查找作品"
				})] }),
				children: u || _ ? "清除筛选后查看其他作品。" : h === "library" ? "观看或标记作品后，可以探索少看的馆藏。" : "可以查找番号，或更新关注来源。"
			}) : null,
			H.error ? /* @__PURE__ */ (0, X.jsx)(G, {
				tone: "error",
				children: H.error
			}) : null,
			/* @__PURE__ */ (0, X.jsx)("div", {
				"data-media-grid": "",
				className: e,
				style: { "--card-ratio": me },
				children: J.map((e) => {
					let t = e.performer_refs?.length ? e.performer_refs.map((e) => e.name).join("、") : e.performers, n = g(e, N, M.value.javImage), s = fe(e.taste_score ?? e.score), l = [
						s.label,
						`口味 ${be(e.taste_score ?? e.score)}`,
						z.data?.ranking_method === "mmr" && e.ranking_score != null ? `排序 ${be(e.ranking_score)}` : "",
						e.source_score == null ? "" : `来源评分 ${e.source_score.toFixed(1)} / 5`,
						...e.reasons || []
					].filter(Boolean).join(" · ");
					return /* @__PURE__ */ (0, X.jsxs)("article", {
						"data-media-card": "",
						"data-jav-card": "",
						onClick: (t) => {
							t.target.closest("a,button,input") || d(e.asset_id ? `/assets/${e.asset_id}` : `/works/${encodeURIComponent(e.code)}`);
						},
						children: [
							/* @__PURE__ */ (0, X.jsx)("a", {
								href: e.asset_id ? `/assets/${e.asset_id}` : `/works/${encodeURIComponent(e.code)}`,
								"aria-label": `查看 ${e.code} 详情`,
								onClick: (e) => {
									!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0 && (e.preventDefault(), d(e.currentTarget.getAttribute("href")));
								},
								"data-media-pic": "",
								"data-jav-cover-box": "",
								className: "relative inline-grid place-items-center overflow-hidden rounded-2lg bg-background-tertiary-default",
								children: n ? /* @__PURE__ */ (0, X.jsx)(xe, {
									artwork: {
										kind: "cover",
										html: n
									},
									identity: g(e, "small", M.value.javImage),
									relayout: (e) => Ee(e, N)
								}) : /* @__PURE__ */ (0, X.jsx)("span", {
									"data-media-nopic": "",
									children: "无封面"
								})
							}),
							/* @__PURE__ */ (0, X.jsxs)("div", {
								"data-media-meta": "",
								children: [/* @__PURE__ */ (0, X.jsx)(De, { item: e }), /* @__PURE__ */ (0, X.jsxs)("div", {
									"data-media-text": "",
									children: [
										/* @__PURE__ */ (0, X.jsxs)("h3", {
											"data-jav-title": "",
											"data-media-title": "",
											title: `${e.code} · ${e.title || "标题未取得"}`,
											children: [
												/* @__PURE__ */ (0, X.jsx)("b", { children: e.code }),
												" ",
												e.title || "标题未取得"
											]
										}),
										/* @__PURE__ */ (0, X.jsxs)("div", {
											"data-media-byline": "",
											children: [
												e.performer_refs?.[0]?.id ? /* @__PURE__ */ (0, X.jsxs)("a", {
													"data-media-who": "",
													href: _e("performer", e.performer_refs[0].name),
													title: t,
													children: [/* @__PURE__ */ (0, X.jsx)("svg", {
														viewBox: "0 0 24 24",
														"aria-hidden": "true",
														children: /* @__PURE__ */ (0, X.jsx)("use", { href: "#i-user-round" })
													}), /* @__PURE__ */ (0, X.jsx)("span", { children: e.performer_refs[0].name })]
												}) : /* @__PURE__ */ (0, X.jsxs)("span", {
													"data-media-who": "",
													title: t,
													children: [/* @__PURE__ */ (0, X.jsx)("svg", {
														viewBox: "0 0 24 24",
														"aria-hidden": "true",
														children: /* @__PURE__ */ (0, X.jsx)("use", { href: "#i-user-round" })
													}), /* @__PURE__ */ (0, X.jsx)("span", { children: e.performer_refs?.[0]?.name || t })]
												}),
												(e.performer_refs?.length || 0) > 1 ? /* @__PURE__ */ (0, X.jsxs)("span", {
													"data-media-who-more": "",
													children: [
														"等 ",
														e.performer_refs.length,
														" 人"
													]
												}) : null,
												e.release_date ? /* @__PURE__ */ (0, X.jsxs)("time", {
													"data-media-release": "",
													dateTime: e.release_date,
													children: [/* @__PURE__ */ (0, X.jsx)("svg", {
														viewBox: "0 0 24 24",
														"aria-hidden": "true",
														children: /* @__PURE__ */ (0, X.jsx)("use", { href: "#i-calendar" })
													}), e.release_date]
												}) : null
											]
										}),
										/* @__PURE__ */ (0, X.jsxs)("div", {
											"data-jav-tags": "",
											"data-media-tags": "",
											children: [/* @__PURE__ */ (0, X.jsx)("button", {
												"data-jav-taste-score": "",
												type: "button",
												title: l,
												"aria-label": `推荐分 ${s.score}，${s.label}`,
												className: "rounded-md outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring",
												children: /* @__PURE__ */ (0, X.jsx)(le, {
													color: s.color,
													children: s.label
												})
											}), (e.tags || []).slice(0, 4).map((e) => /* @__PURE__ */ (0, X.jsx)("button", {
												type: "button",
												"data-media-tag": "",
												"aria-pressed": _ === e,
												onClick: () => k(_ === e ? "" : e),
												children: e
											}, e))]
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, X.jsxs)("div", {
								"data-jav-actions": "",
								className: "flex flex-wrap gap-2",
								children: [
									e.link ? /* @__PURE__ */ (0, X.jsx)(B, {
										"data-button-link": "",
										variant: "secondary",
										trailingIcon: i,
										href: e.link,
										target: "_blank",
										rel: "noopener noreferrer",
										children: "作品来源"
									}) : null,
									/* @__PURE__ */ (0, X.jsx)(O, {
										variant: "ghost",
										disabled: a || e.wanted || !!e.asset_id,
										...U(H.busy === String(e.id)),
										onClick: () => {
											H.run(String(e.id), (t) => ye({ code: e.code }, t), () => {
												o("已加入想要"), w(), z.refetch();
											});
										},
										children: e.asset_id ? "已入库" : e.wanted ? "已加入想要" : "想要"
									}),
									/* @__PURE__ */ (0, X.jsx)(O, {
										variant: "secondary",
										onClick: () => c({
											...e,
											cover: e.has_cover ? r(e, !0) : e.cover_url,
											origin: `${e.asset_id ? "asset" : "feed"}:${e.id}`
										}),
										children: "查找资源"
									})
								]
							})
						]
					}, e.id);
				})
			})
		]
	});
}
//#endregion
export { Ie as JavPage };

//# debugId=bf2b789d-c4be-451a-b7be-708b13e02049