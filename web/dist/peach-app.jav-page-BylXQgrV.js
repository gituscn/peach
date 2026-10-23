(function() {
	try {
		var e = typeof window < "u" ? window : typeof global < "u" ? global : typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : {}, t = new e.Error().stack;
		t && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[t] = "20badbcf-9132-4b41-940d-efbdbbc086ee", e._sentryDebugIdIdentifier = "sentry-dbid-20badbcf-9132-4b41-940d-efbdbbc086ee");
	} catch {}
})();
import { $fe21c36db05242bb$export$d7b12c4107be0d61 as e, ArtSlot as t, Button as n, ButtonLink as r, Chip as i, CloudDownloadDialog as a, DISCOVERY_SORTS as o, DOWNLOADS_KEY as s, DOWNLOADS_URL as c, E3 as l, EmptyFocusButton as u, EmptyState as d, FilterGlassRows as f, FilterIconButton as p, FilterPill as m, GlassPill as h, Help as g, Input as _, JAV_LAYOUTS as v, JAV_RECOMMENDATION_GRID as ee, JavHeader as y, LibraryShortcuts as te, M6 as b, Note as x, PHASES as S, Pagination as C, SEGMENT as w, SEGMENTED_TRACK as T, SegmentedRadioGroup as E, Segments as ne, SortKeys as re, SourceAvatar as ie, TaskProgress as ae, WANTS_KEY as oe, WantMagnets as D, Wt as se, __toESM as ce, addWant as le, apiGet as O, appSettingsStore as ue, avatarInner as k, busyProps as A, cachedMagnetStates as j, cardClass as M, cardRatio as de, coverUrl as fe, discoveryArtwork as pe, discoveryKey as me, discoveryScore as he, entityPath as ge, errorMessage as N, fetchDiscoveries as _e, fetchWants as ve, gridLayout as ye, invalidateWants as P, javContentSkeleton as be, javLayout as xe, javTagSkeleton as Se, pageWindow as F, peachHistory$1 as I, qE as L, recommendationScore as Ce, relayoutCovers as we, removeWants as R, require_jsx_runtime as z, require_react as B, resetWants as V, searchNote as H, shellNavigate as U, spriteGlyph as W, storeJavLayout as Te, useAction as G, useQuery as K, wantName as q, wireHorizontalScroller as Ee } from "./peach-app.js";
import { ErrorLine as J } from "./peach-app.source-view-Bk_L5GHG.js";
import "./peach-app.source-list-B2yIEqVl.js";
//#region src/react/jav/discovery-faces.tsx
var Y = /* @__PURE__ */ ce(B(), 1), X = z();
function De({ item: e }) {
	let t = e.performer_refs?.length ? e.performer_refs : [...new Set(e.performers.split(/[,，、;/]/).filter(Boolean))].map((e) => ({ name: e })), n = t.slice(0, 5).map((t, n) => {
		let r = { "--media-avatar-index": n }, i = t.source_avatar && t.source_actor_id && !t.has_image ? { children: /* @__PURE__ */ (0, X.jsx)(ie, {
			code: e.code,
			person: t
		}) } : { dangerouslySetInnerHTML: { __html: k(t.name, t, null) } };
		return t.id ? /* @__PURE__ */ (0, X.jsx)("a", {
			"data-media-avatar": "",
			style: r,
			href: ge("performer", t.name, t.id),
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
function Ae({ want: e, readOnly: t, busy: i, onReset: a, onRemove: o, onCloudDownload: s, downloads: c, provider: l, toast: u }) {
	let [d, f] = (0, Y.useState)(""), p = e.link || d || (e.code ? `https://javdb.com/search?q=${encodeURIComponent(e.code)}&f=all` : "");
	return /* @__PURE__ */ (0, X.jsxs)("li", {
		"data-want-id": e.id,
		className: M({
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
							children: q(e)
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
						children: H(e)
					}) : null,
					e.scrape_error ? /* @__PURE__ */ (0, X.jsx)(J, {
						text: e.scrape_error,
						prefix: "资料未取得：",
						tone: "muted"
					}) : null,
					/* @__PURE__ */ (0, X.jsxs)("div", {
						className: "mt-1 flex flex-wrap items-center gap-2",
						children: [
							p ? /* @__PURE__ */ (0, X.jsx)(r, {
								"data-button-link": "",
								variant: "secondary",
								size: "small",
								trailingIcon: se,
								href: p,
								target: "_blank",
								rel: "noopener noreferrer",
								children: "来源页"
							}) : null,
							/* @__PURE__ */ (0, X.jsx)(n, {
								variant: "secondary",
								size: "small",
								leadingIcon: b,
								disabled: t,
								...A(i === `remove:${e.id}`),
								onClick: o,
								children: "移除"
							}),
							e.phase === "given_up" ? /* @__PURE__ */ (0, X.jsx)(n, {
								variant: "secondary",
								size: "small",
								disabled: t,
								...A(i === `reset:${e.id}`),
								onClick: a,
								children: "重新查找"
							}) : null,
							e.phase === "searching" || e.phase === "given_up" ? /* @__PURE__ */ (0, X.jsx)(n, {
								variant: "secondary",
								size: "small",
								onClick: s,
								children: "查找资源"
							}) : null
						]
					})
				]
			})]
		}), e.code && (e.phase === "searching" || e.phase === "given_up") ? /* @__PURE__ */ (0, X.jsx)(D, {
			want: e,
			readOnly: t,
			downloads: c,
			provider: l,
			toast: u,
			onSource: f
		}) : null]
	});
}
function je({ phase: t, label: r, rows: i, row: a }) {
	let [o, s] = (0, Y.useState)(1), [c, l] = (0, Y.useState)("all"), u = j(i), f = (e) => e.has_magnets ?? u.get(e.code || "") ?? !1, p = i.filter(f), m = t !== "searching" || c === "all" ? i : i.filter((e) => f(e) === (c === "available")), h = F(m.length, 20, o);
	return /* @__PURE__ */ (0, X.jsxs)("section", {
		"aria-label": r,
		"data-want-phase": t,
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, X.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, X.jsxs)("h3", {
					className: "flex items-baseline gap-2 text-title-2-medium text-text-primary",
					children: [r, /* @__PURE__ */ (0, X.jsx)("span", {
						className: "text-body-2-regular tabular-nums text-text-secondary",
						children: i.length.toLocaleString()
					})]
				}), t === "searching" ? /* @__PURE__ */ (0, X.jsx)(E, {
					name: "want-magnet-filter",
					"aria-label": "待找磁链筛选",
					orientation: "horizontal",
					value: c,
					className: T,
					onChange: (e) => {
						l(e), s(1);
					},
					children: Oe.map(([t, n]) => /* @__PURE__ */ (0, X.jsxs)(e, {
						value: t,
						"aria-label": n,
						className: w,
						children: [n, /* @__PURE__ */ (0, X.jsx)("span", {
							className: "text-caption-1-regular tabular-nums text-text-tertiary",
							children: (t === "all" ? i.length : t === "available" ? p.length : i.length - p.length).toLocaleString()
						})]
					}, t))
				}) : null]
			}),
			m.length ? null : /* @__PURE__ */ (0, X.jsx)(d, {
				size: "compact",
				icon: L,
				title: "暂无符合条件的作品",
				actions: /* @__PURE__ */ (0, X.jsx)(n, {
					size: "small",
					onClick: () => {
						l("all"), s(1);
					},
					children: "查看全部"
				}),
				children: null
			}),
			/* @__PURE__ */ (0, X.jsx)("ul", {
				className: "flex flex-col gap-4",
				children: m.slice(h.start, h.end).map(a)
			}),
			h.pages > 1 ? /* @__PURE__ */ (0, X.jsxs)("div", {
				"data-want-pager": "",
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, X.jsx)("span", {
					className: "text-body-2-regular tabular-nums text-text-secondary",
					children: `${(h.start + 1).toLocaleString()}–${h.end.toLocaleString()} / ${h.total.toLocaleString()} 条`
				}), /* @__PURE__ */ (0, X.jsx)(C, {
					label: `${r}分页`,
					page: h.page,
					pages: h.pages,
					onPage: s
				})]
			}) : null
		]
	});
}
function Me({ readOnly: e, toast: t, query: r = "", clearQuery: i }) {
	let [o, l] = (0, Y.useState)(""), [f, p] = (0, Y.useState)(null), m = G(), h = K({
		queryKey: oe,
		queryFn: ({ signal: e }) => ve(e),
		staleTime: 3e4,
		refetchInterval: (e) => e.state.data?.scraping ? 3e3 : !1
	}), v = () => {
		let n = o.trim();
		n && !e && m.run("add", (e) => le({ code: n }, e), (e) => {
			t(e.created ? `已加入想要：${q(e.want)}` : `${q(e.want)} 已经在想要里`), l(""), P();
		});
	}, ee = (e) => {
		e.key === "Enter" && !e.nativeEvent.isComposing && (e.preventDefault(), v());
	}, y = (e) => {
		m.run(`remove:${e.id}`, (t) => R([e.id], t), () => {
			t(`已移除：${q(e)}`), P();
		});
	}, te = (e) => {
		m.run(`reset:${e.id}`, (t) => V([e.id], t), () => {
			t(`${q(e)} 回到待找`), P();
		});
	}, b = h.data, C = (b?.items || []).filter((e) => !r || [
		e.code,
		e.title,
		e.performers
	].join(" ").toLocaleLowerCase().includes(r.toLocaleLowerCase())), w = K({
		queryKey: s,
		queryFn: ({ signal: e }) => O(`${c}?limit=100`, e),
		enabled: C.some((e) => e.code && (e.phase === "searching" || e.phase === "given_up"))
	}), T = w.data?.providers.filter((e) => e.configured) || [], E = T[0]?.key || "";
	return /* @__PURE__ */ (0, X.jsxs)("div", {
		"aria-busy": h.isPending,
		className: "flex flex-col gap-8",
		children: [
			/* @__PURE__ */ (0, X.jsxs)("div", {
				className: M({
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
							children: /* @__PURE__ */ (0, X.jsx)(_, {
								"aria-label": "番号",
								placeholder: "输入番号，例如 SSIS-950",
								value: o,
								isDisabled: e,
								onChange: l,
								onKeyDown: ee
							})
						}), /* @__PURE__ */ (0, X.jsx)(n, {
							variant: "primary",
							disabled: e || !o.trim(),
							...A(m.busy === "add"),
							onClick: v,
							children: "添加"
						})]
					}),
					m.error ? /* @__PURE__ */ (0, X.jsx)(x, {
						tone: "error",
						title: "这一次没有完成",
						children: m.error
					}) : null
				]
			}),
			h.error ? /* @__PURE__ */ (0, X.jsx)(x, {
				tone: "error",
				title: "想要清单读取失败",
				children: N(h.error)
			}) : null,
			h.isPending ? /* @__PURE__ */ (0, X.jsx)("div", {
				role: "status",
				"aria-label": "正在读取想要",
				dangerouslySetInnerHTML: { __html: be("wants") }
			}) : null,
			b?.scraping ? /* @__PURE__ */ (0, X.jsx)(g, {
				role: "status",
				children: "正在给刚加入的番号取资料与封面。"
			}) : null,
			w.error ? /* @__PURE__ */ (0, X.jsx)(x, {
				tone: "error",
				title: "下载配置未取得",
				children: N(w.error)
			}) : null,
			w.data && !T.length ? /* @__PURE__ */ (0, X.jsxs)(x, {
				tone: "neutral",
				children: ["尚未配置下载渠道。", /* @__PURE__ */ (0, X.jsx)("a", {
					href: "/settings/library?section=%E4%B8%8B%E8%BD%BD%E6%B8%A0%E9%81%93",
					children: "下载渠道设置"
				})]
			}) : null,
			w.data && !w.data.available ? /* @__PURE__ */ (0, X.jsx)(x, {
				tone: "neutral",
				children: "云下载只在允许修改数据库的设备上可用。"
			}) : null,
			b && !C.length ? /* @__PURE__ */ (0, X.jsx)(d, {
				size: "compact",
				icon: L,
				title: r ? "没有符合条件的作品" : "还没有想要的作品",
				actions: r && i ? /* @__PURE__ */ (0, X.jsx)(n, {
					size: "small",
					onClick: i,
					children: "清除搜索"
				}) : !r && !e ? /* @__PURE__ */ (0, X.jsx)(u, {
					target: "input[aria-label=\"番号\"]",
					children: "添加作品"
				}) : void 0,
				children: r ? "试试其他番号、女优或标题。" : "输入番号，添加想看的作品。"
			}) : null,
			S.map(([n, r]) => {
				let i = C.filter((e) => e.phase === n);
				return i.length ? /* @__PURE__ */ (0, X.jsx)(je, {
					phase: n,
					label: r,
					rows: i,
					row: (n) => /* @__PURE__ */ (0, X.jsx)(Ae, {
						want: n,
						readOnly: e,
						busy: m.busy,
						downloads: w.data,
						provider: E,
						toast: t,
						onReset: () => te(n),
						onRemove: () => y(n),
						onCloudDownload: () => p({
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
			/* @__PURE__ */ (0, X.jsx)(a, {
				prefill: f,
				close: () => p(null),
				receipt: t,
				provider: E
			})
		]
	});
}
//#endregion
//#region src/react/jav/jav-page.tsx
var Ne = W("search"), Pe = W("x"), Fe = W("refresh-cw");
function $(e) {
	let t = new URLSearchParams(location.search);
	for (let [n, r] of Object.entries(e)) r ? t.set(n, r) : t.delete(n);
	U(location.pathname + (t.size ? `?${t}` : ""), {
		replace: !0,
		state: I.navigation.location.state
	});
}
function Ie({ tab: e, readOnly: t, navigate: n, receipt: r }) {
	let [i, o] = (0, Y.useState)(null), [s, c] = (0, Y.useState)(() => new URLSearchParams(location.search).get("q") || ""), l = (e) => {
		c(e), $({ q: e });
	};
	return /* @__PURE__ */ (0, X.jsxs)("div", {
		className: "flex w-full flex-col gap-6",
		children: [
			/* @__PURE__ */ (0, X.jsx)(y, {
				tab: e,
				navigate: n,
				find: () => o({})
			}),
			/* @__PURE__ */ (0, X.jsx)("form", {
				"aria-label": e === "discover" ? "筛选推荐" : "筛选想要",
				onSubmit: (e) => {
					e.preventDefault();
				},
				children: /* @__PURE__ */ (0, X.jsx)(_, {
					type: "search",
					"aria-label": e === "discover" ? "筛选推荐" : "筛选想要",
					placeholder: "筛选番号、女优或标题",
					leadingIcon: Ne,
					value: s,
					onChange: l,
					enterKeyHint: "search"
				})
			}),
			e === "discover" ? /* @__PURE__ */ (0, X.jsx)(Le, {
				readOnly: t,
				receipt: r,
				resource: o,
				query: s.trim(),
				navigate: n,
				clearText: () => l("")
			}) : /* @__PURE__ */ (0, X.jsx)(Me, {
				readOnly: t,
				toast: r,
				query: s.trim(),
				clearQuery: () => l("")
			}),
			/* @__PURE__ */ (0, X.jsx)(a, {
				prefill: i,
				close: () => o(null),
				receipt: r
			})
		]
	});
}
function Le({ readOnly: e, receipt: a, resource: s, query: c, navigate: u, clearText: g }) {
	let _ = new URLSearchParams(location.search), [y, b] = (0, Y.useState)(() => _.get("scope") === "library" ? "library" : "external"), [S, C] = (0, Y.useState)(() => _.get("tag") || ""), [w, T] = (0, Y.useState)(() => o.some(([e]) => e === _.get("sort")) ? _.get("sort") : "taste"), [E, ie] = (0, Y.useState)(() => _.get("dir") === "asc"), oe = (e) => {
		b(e), $({ scope: e === "external" ? "" : e });
	}, D = (e) => {
		C(e), $({ tag: e });
	}, ce = (e) => {
		T(e), $({ sort: e === "taste" ? "" : e });
	}, O = (e) => {
		ie(e), $({ dir: e ? "asc" : "" });
	}, k = (0, Y.useRef)(null);
	(0, Y.useEffect)(() => {
		let e = [...k.current?.querySelectorAll("[data-catalog-scroll],[data-catalog-tags],[data-filter-row=\"bottom\"]") || []].map((e) => Ee(e, { drag: !0 }));
		return () => e.forEach((e) => e.destroy());
	}, []);
	let j = ue();
	(0, Y.useSyncExternalStore)(j.subscribe, j.version, j.version);
	let M = xe(), ve = de(ye({
		active: !0,
		home: !1,
		portrait: !1
	})), F = (0, Y.useRef)({}), I = (0, Y.useRef)(!1), L = (0, Y.useRef)(!1), R = E ? "asc" : "desc", z = K({
		queryKey: me(y, w, R),
		retry: !1,
		refetchOnWindowFocus: !1,
		queryFn: ({ signal: e }) => {
			let t = I.current, n = L.current;
			return I.current = !1, L.current = !1, _e(y, e, {
				sort: w,
				direction: R,
				jobId: t ? void 0 : F.current[y],
				refreshMetadata: t,
				cancelMetadata: n
			});
		},
		refetchInterval: (e) => e.state.data?.metadata_job?.status === "running" && Math.max(1e3, e.state.data.poll_after_ms || 3e3)
	}), B = z.data?.metadata_job;
	(0, Y.useEffect)(() => {
		B?.job_id && (F.current[y] = B.job_id);
	}, [y, B?.job_id]);
	let V = G(), H = G(), U = (e) => {
		H.run(e, async () => (L.current = e === "stop", I.current = e !== "stop", z.refetch({
			cancelRefetch: !0,
			throwOnError: !0
		})), () => {});
	}, W = z.data?.items || [], q = [...new Set(W.flatMap((e) => e.tags || []))], J = W.filter((e) => (!S || e.tags?.includes(S)) && (!c || [
		e.code,
		e.title,
		e.performers,
		e.studio,
		...e.tags || [],
		...(e.performer_refs || []).map((e) => e.name)
	].join(" ").toLocaleLowerCase().includes(c.toLocaleLowerCase()))), Z = z.isPending;
	return /* @__PURE__ */ (0, X.jsxs)("section", {
		ref: k,
		"aria-label": "为你推荐",
		"aria-busy": Z,
		className: "flex min-w-0 flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, X.jsx)(f, {
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
						children: [[["external", "库外发现"], ["library", "馆藏探索"]].map(([e, t]) => /* @__PURE__ */ (0, X.jsx)(m, {
							"data-entity-tag": e,
							"data-entity-press": "",
							pressed: y === e,
							onPress: () => {
								oe(e), D("");
							},
							children: t
						}, e)), /* @__PURE__ */ (0, X.jsx)("span", {
							"data-entity-sep": "",
							"aria-hidden": "true"
						})]
					}), /* @__PURE__ */ (0, X.jsx)("div", {
						"data-catalog-tags": "",
						dangerouslySetInnerHTML: Z ? { __html: Se() } : void 0,
						children: Z ? null : q.map((e) => /* @__PURE__ */ (0, X.jsxs)(m, {
							"data-catalog-tag": e,
							"data-entity-press": "",
							pressed: S === e,
							onPress: () => D(S === e ? "" : e),
							children: [e, /* @__PURE__ */ (0, X.jsx)("span", {
								"data-count-badge": "",
								children: W.filter((t) => t.tags?.includes(e)).length
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
					/* @__PURE__ */ (0, X.jsx)(te, { currentHref: () => location.pathname + location.search }),
					c || S ? /* @__PURE__ */ (0, X.jsx)(h, {
						onPress: () => {
							D(""), g();
						},
						children: "清除筛选"
					}) : null,
					/* @__PURE__ */ (0, X.jsxs)("span", {
						"data-entity-sorts": "",
						children: [
							y === "external" ? /* @__PURE__ */ (0, X.jsx)(p, {
								"data-entity-batch": "",
								"data-jav-metadata-update": "",
								label: B?.status === "running" ? "停止读取" : "更新资料",
								disabled: Z,
								"data-skeleton-action": Z ? "" : void 0,
								busy: !!H.busy,
								icon: B?.status === "running" ? Pe : Fe,
								onPress: () => U(B?.status === "running" ? "stop" : "update")
							}) : null,
							/* @__PURE__ */ (0, X.jsx)(ne, {
								label: "JAV 卡片版式",
								value: M,
								options: v,
								onChange: Te
							}),
							/* @__PURE__ */ (0, X.jsx)(re, {
								sorts: o.map(([e, t, n]) => ({
									key: e,
									label: t,
									ariaLabel: n,
									pressed: e === w,
									dir: R
								})),
								onSort: (e) => {
									e === w ? O(!E) : (ce(e), O(e === "code"));
								}
							})
						]
					})
				] })
			}),
			Z ? /* @__PURE__ */ (0, X.jsx)("div", {
				role: "status",
				"aria-label": "正在读取推荐",
				dangerouslySetInnerHTML: { __html: be("discover", M) }
			}) : null,
			z.error ? /* @__PURE__ */ (0, X.jsx)(x, {
				tone: "error",
				title: "推荐未取得",
				children: N(z.error)
			}) : null,
			y === "external" && B?.status === "running" ? /* @__PURE__ */ (0, X.jsx)("div", {
				"data-jav-metadata": "",
				className: "min-w-0",
				children: /* @__PURE__ */ (0, X.jsx)(ae, {
					embedded: !0,
					label: `正在读取作品资料 · ${B.completed} / ${B.total} 部`,
					value: B.completed,
					total: B.total
				})
			}) : null,
			B && B.status !== "running" && (B.status !== "complete" || B.failed > 0) ? /* @__PURE__ */ (0, X.jsx)(x, {
				tone: "neutral",
				action: /* @__PURE__ */ (0, X.jsx)(n, {
					variant: "secondary",
					...A(H.busy === "retry"),
					"aria-label": "立即重试读取作品资料",
					onClick: () => U("retry"),
					children: "立即重试"
				}),
				children: B.message || `作品资料 ${B.completed} / ${B.total} 部`
			}) : null,
			H.error ? /* @__PURE__ */ (0, X.jsx)(x, {
				tone: "error",
				children: H.error
			}) : null,
			!Z && !z.error && !J.length ? /* @__PURE__ */ (0, X.jsx)(d, {
				icon: l,
				title: c || S ? "没有符合条件的推荐" : "暂无匹配口味的作品",
				actions: /* @__PURE__ */ (0, X.jsxs)(X.Fragment, { children: [/* @__PURE__ */ (0, X.jsx)(r, {
					size: "small",
					href: "/taste",
					variant: "secondary",
					children: "查看口味"
				}), c || S ? /* @__PURE__ */ (0, X.jsx)(n, {
					variant: "primary",
					size: "small",
					onClick: () => {
						g(), C(""), $({
							q: "",
							tag: ""
						});
					},
					children: "清除筛选"
				}) : y === "library" ? /* @__PURE__ */ (0, X.jsx)(r, {
					variant: "primary",
					size: "small",
					href: "/",
					children: "浏览馆藏"
				}) : /* @__PURE__ */ (0, X.jsx)(n, {
					variant: "primary",
					size: "small",
					onClick: () => s({}),
					children: "查找作品"
				})] }),
				children: c || S ? "清除筛选后查看其他作品。" : y === "library" ? "观看或标记作品后，可以探索少看的馆藏。" : "可以查找番号，或更新关注来源。"
			}) : null,
			V.error ? /* @__PURE__ */ (0, X.jsx)(x, {
				tone: "error",
				children: V.error
			}) : null,
			/* @__PURE__ */ (0, X.jsx)("div", {
				"data-media-grid": "",
				className: ee,
				style: { "--card-ratio": ve },
				children: J.map((o) => {
					let c = o.performer_refs?.length ? o.performer_refs.map((e) => e.name).join("、") : o.performers, l = pe(o, M, j.value.javImage), d = Ce(o.taste_score ?? o.score), f = [
						d.label,
						`口味 ${he(o.taste_score ?? o.score)}`,
						z.data?.ranking_method === "mmr" && o.ranking_score != null ? `排序 ${he(o.ranking_score)}` : "",
						o.source_score == null ? "" : `来源评分 ${o.source_score.toFixed(1)} / 5`,
						...o.reasons || []
					].filter(Boolean).join(" · ");
					return /* @__PURE__ */ (0, X.jsxs)("article", {
						"data-media-card": "",
						"data-jav-card": "",
						onClick: (e) => {
							e.target.closest("a,button,input") || u(o.asset_id ? `/assets/${o.asset_id}` : `/works/${encodeURIComponent(o.code)}`);
						},
						children: [
							/* @__PURE__ */ (0, X.jsx)("a", {
								href: o.asset_id ? `/assets/${o.asset_id}` : `/works/${encodeURIComponent(o.code)}`,
								"aria-label": `查看 ${o.code} 详情`,
								onClick: (e) => {
									!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0 && (e.preventDefault(), u(e.currentTarget.getAttribute("href")));
								},
								"data-media-pic": "",
								"data-jav-cover-box": "",
								className: "relative inline-grid place-items-center overflow-hidden rounded-2lg bg-background-tertiary-default",
								children: l ? /* @__PURE__ */ (0, X.jsx)(t, {
									artwork: {
										kind: "cover",
										html: l
									},
									identity: pe(o, "small", j.value.javImage),
									relayout: (e) => we(e, M)
								}) : /* @__PURE__ */ (0, X.jsx)("span", {
									"data-media-nopic": "",
									children: "无封面"
								})
							}),
							/* @__PURE__ */ (0, X.jsxs)("div", {
								"data-media-meta": "",
								children: [/* @__PURE__ */ (0, X.jsx)(De, { item: o }), /* @__PURE__ */ (0, X.jsxs)("div", {
									"data-media-text": "",
									children: [
										/* @__PURE__ */ (0, X.jsxs)("h3", {
											"data-jav-title": "",
											"data-media-title": "",
											title: `${o.code} · ${o.title || "标题未取得"}`,
											children: [
												/* @__PURE__ */ (0, X.jsx)("b", { children: o.code }),
												" ",
												o.title || "标题未取得"
											]
										}),
										/* @__PURE__ */ (0, X.jsxs)("div", {
											"data-media-byline": "",
											children: [
												o.performer_refs?.[0]?.id ? /* @__PURE__ */ (0, X.jsxs)("a", {
													"data-media-who": "",
													href: ge("performer", o.performer_refs[0].name),
													title: c,
													children: [/* @__PURE__ */ (0, X.jsx)("svg", {
														viewBox: "0 0 24 24",
														"aria-hidden": "true",
														children: /* @__PURE__ */ (0, X.jsx)("use", { href: "#i-user-round" })
													}), /* @__PURE__ */ (0, X.jsx)("span", { children: o.performer_refs[0].name })]
												}) : /* @__PURE__ */ (0, X.jsxs)("span", {
													"data-media-who": "",
													title: c,
													children: [/* @__PURE__ */ (0, X.jsx)("svg", {
														viewBox: "0 0 24 24",
														"aria-hidden": "true",
														children: /* @__PURE__ */ (0, X.jsx)("use", { href: "#i-user-round" })
													}), /* @__PURE__ */ (0, X.jsx)("span", { children: o.performer_refs?.[0]?.name || c })]
												}),
												(o.performer_refs?.length || 0) > 1 ? /* @__PURE__ */ (0, X.jsxs)("span", {
													"data-media-who-more": "",
													children: [
														"等 ",
														o.performer_refs.length,
														" 人"
													]
												}) : null,
												o.release_date ? /* @__PURE__ */ (0, X.jsxs)("time", {
													"data-media-release": "",
													dateTime: o.release_date,
													children: [/* @__PURE__ */ (0, X.jsx)("svg", {
														viewBox: "0 0 24 24",
														"aria-hidden": "true",
														children: /* @__PURE__ */ (0, X.jsx)("use", { href: "#i-calendar" })
													}), o.release_date]
												}) : null
											]
										}),
										/* @__PURE__ */ (0, X.jsxs)("div", {
											"data-jav-tags": "",
											"data-media-tags": "",
											children: [/* @__PURE__ */ (0, X.jsx)("button", {
												"data-jav-taste-score": "",
												type: "button",
												title: f,
												"aria-label": `推荐分 ${d.score}，${d.label}`,
												className: "rounded-md outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring",
												children: /* @__PURE__ */ (0, X.jsx)(i, {
													color: d.color,
													children: d.label
												})
											}), (o.tags || []).slice(0, 4).map((e) => /* @__PURE__ */ (0, X.jsx)("button", {
												type: "button",
												"data-media-tag": "",
												"aria-pressed": S === e,
												onClick: () => D(S === e ? "" : e),
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
									o.link ? /* @__PURE__ */ (0, X.jsx)(r, {
										"data-button-link": "",
										variant: "secondary",
										trailingIcon: se,
										href: o.link,
										target: "_blank",
										rel: "noopener noreferrer",
										children: "作品来源"
									}) : null,
									/* @__PURE__ */ (0, X.jsx)(n, {
										variant: "ghost",
										disabled: e || o.wanted || !!o.asset_id,
										...A(V.busy === String(o.id)),
										onClick: () => {
											V.run(String(o.id), (e) => le({ code: o.code }, e), () => {
												a("已加入想要"), P(), z.refetch();
											});
										},
										children: o.asset_id ? "已入库" : o.wanted ? "已加入想要" : "想要"
									}),
									/* @__PURE__ */ (0, X.jsx)(n, {
										variant: "secondary",
										onClick: () => s({
											...o,
											cover: o.has_cover ? fe(o, !0) : o.cover_url,
											origin: `${o.asset_id ? "asset" : "feed"}:${o.id}`
										}),
										children: "查找资源"
									})
								]
							})
						]
					}, o.id);
				})
			})
		]
	});
}
//#endregion
export { Ie as JavPage };

//# debugId=20badbcf-9132-4b41-940d-efbdbbc086ee