(function() {
	try {
		var e = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, t = new e.Error().stack;
		t && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[t] = "0f87cc14-5ced-46c2-88a8-4b571bbb3b85", e._sentryDebugIdIdentifier = "sentry-dbid-0f87cc14-5ced-46c2-88a8-4b571bbb3b85");
	} catch {}
})();
import { $b4f18e3395fe64d7$export$3d96ec278d3efce4 as e, $b4f18e3395fe64d7$export$3e41faf802a29e71 as t, $b4f18e3395fe64d7$export$b2539bed5023c21c as n, $ea3928288112382f$export$439d29a4e110a164 as r, $fe21c36db05242bb$export$a98f0dcb43a68a25 as i, $fe21c36db05242bb$export$d7b12c4107be0d61 as a, Button as o, ButtonLink as s, Checkbox as c, CheckboxGlyph as l, Chip as u, DEFAULT_CATEGORY as d, ENTITY_REVIEW_KINDS as f, Ea as ee, EmptyState as p, ExternalLink as m, FilterGlassRows as te, Gg as h, InputBase as g, Note as _, REVIEW_CATEGORIES as v, REVIEW_DECISION_LABELS as ne, REVIEW_KEY as re, REVIEW_LABELS as y, REVIEW_QUEUES as b, REVIEW_QUEUE_LABELS as x, Select as S, SelectItem as C, SelectionActions as w, SelectionDock as T, TextField as E, Wt as D, __toESM as O, avatarInner as k, busyProps as A, canApprove as ie, cardClass as j, commonReviewSources as M, currentReviewRow as N, decisionPayload as P, decisionReceipt as ae, defaultChoice as oe, errorMessage as F, fetchReview as se, filterReviewRows as ce, groupReviewRows as le, isReviewCategory as ue, l7 as I, m7 as de, mirrorText as fe, paginationRange as pe, pendingGenres as L, recordGenre as me, reloadReview as R, require_jsx_runtime as z, require_react as he, reviewGroupingOptions as ge, reviewQueueData as _e, reviewQueueOf as ve, reviewWindow as ye, rowEvidence as be, rowFieldName as xe, rowSubject as Se, rowTags as Ce, rowTitle as B, selectReviewRange as we, settleReviewRows as Te, spinnerHtml as V, submitDecision as Ee, useMutation as De, useOverlayScrollbar as H, useQuery as Oe, useViewGlide as ke } from "./peach-app.js";
import { Page as Ae } from "./peach-app.page-QAncjzM1.js";
import { LEGACY_AVATAR_IMG as U } from "./peach-app.legacy-avatar-NSITxLRS.js";
import { PillAriaTabList as je } from "./peach-app.pill-aria-tab-list-BMY1ZEv1.js";
// src/react/review/bulk-toolbar.tsx
var W = /* @__PURE__ */ O(he(), 1), G = z();
function Me(e) {
	let { groupOptions: t, groupBy: n, onGroupBy: r, groups: i, filter: a, onFilter: s, pageKeys: c, selected: l, onSelected: u, selectedRows: d, metadata: f, approvable: ee, busy: p, feedback: m, onUnifySource: h, onRun: g, queueView: _ = "pending", queueCounts: v, onQueueChange: ne, locked: re } = e, y = c.filter((e) => l.has(e)), w = y.length > 0 && y.length === c.length, E = M(d), D = f && d.some((e) => (e.candidates?.length || 0) > 1), O = E.length ? "统一选择来源" : "所选项目无共同来源", k = (0, W.useRef)(null), A = (0, W.useRef)(null), ie = (0, W.useRef)(null), [j, N] = (0, W.useState)(!1), P = ke(k, A, "[data-entity-state][aria-pressed=\"true\"]", _);
	return (0, W.useLayoutEffect)(() => {
		let e = A.current, t = ie.current, n = e?.parentElement, r = e?.closest("[data-review-filter]");
		if (!e || !t || !n || !r) return;
		let i = () => N(t.offsetHeight > 0 && Math.abs(n.getBoundingClientRect().top - t.getBoundingClientRect().top) < 1), a = new ResizeObserver(i);
		for (let n of [
			r,
			e,
			t
		]) a.observe(n);
		return i(), () => a.disconnect();
	}, []), /* @__PURE__ */ (0, G.jsxs)(G.Fragment, { children: [/* @__PURE__ */ (0, G.jsx)(te, {
		label: "复核筛选",
		topLabel: "处理状态",
		attrs: { "data-review-filter": "" },
		className: "mb-0 flex-row flex-wrap",
		topClassName: "max-w-full flex-none",
		bottomClassName: c.length ? "min-h-12 max-w-full flex-none flex-wrap" : "hidden",
		bottomRef: ie,
		panes: /* @__PURE__ */ (0, G.jsx)("span", {
			ref: k,
			"data-view-glide": "",
			"aria-hidden": "true"
		}),
		top: /* @__PURE__ */ (0, G.jsxs)("div", {
			ref: A,
			role: "group",
			"aria-label": "复核状态",
			"data-entity-states": "",
			onPointerLeave: P.leave,
			children: [b.map((e) => /* @__PURE__ */ (0, G.jsxs)("button", {
				type: "button",
				"data-entity-state": e,
				"data-entity-press": "",
				disabled: p,
				"aria-pressed": _ === e,
				onPointerEnter: P.hover,
				onClick: () => {
					e !== _ && ne(e);
				},
				children: [
					/* @__PURE__ */ (0, G.jsx)("span", {
						"data-copy-key": `review.queue.${e}`,
						children: x[e]
					}),
					" ",
					/* @__PURE__ */ (0, G.jsx)("span", {
						className: "ms-1.5 tabular-nums text-caption-1-medium text-text-secondary",
						children: v ? v[e].toLocaleString() : "…"
					})
				]
			}, e)), /* @__PURE__ */ (0, G.jsx)("span", {
				"data-entity-sep": "",
				"aria-hidden": "true",
				className: j ? void 0 : "invisible"
			})]
		}),
		bottom: c.length ? /* @__PURE__ */ (0, G.jsxs)(G.Fragment, { children: [
			/* @__PURE__ */ (0, G.jsx)(S, {
				"aria-label": "筛选分组方式",
				size: "sm",
				selectedKey: n,
				onSelectionChange: (e) => {
					e !== null && r(String(e));
				},
				children: t.map(([e, t]) => /* @__PURE__ */ (0, G.jsx)(C, {
					id: e,
					children: t
				}, e))
			}),
			i.length > 1 ? /* @__PURE__ */ (0, G.jsxs)(S, {
				"aria-label": n === "field" ? "筛选字段分类" : "筛选当前分类",
				size: "sm",
				prefix: "分类",
				selectedKey: a || "*",
				onSelectionChange: (e) => {
					e !== null && s(String(e) === "*" ? "" : String(e));
				},
				children: [/* @__PURE__ */ (0, G.jsx)(C, {
					id: "*",
					children: "全部"
				}), i.map((e) => /* @__PURE__ */ (0, G.jsx)(C, {
					id: e.key,
					children: `${e.title} · ${e.rows.length}`
				}, e.key))]
			}) : null,
			re ? null : /* @__PURE__ */ (0, G.jsx)(o, {
				variant: "secondary",
				size: "small",
				leadingIcon: I,
				"aria-pressed": w,
				disabled: p,
				onClick: () => {
					let e = new Set(l);
					for (let t of c) w ? e.delete(t) : e.add(t);
					u(e);
				},
				children: w ? "清空当前选择" : a ? "全选当前分类" : "全选本页"
			})
		] }) : null
	}), /* @__PURE__ */ (0, G.jsxs)(T, {
		label: "复核所选项目",
		visible: !re && l.size > 0,
		count: `已选 ${l.size} 项`,
		children: [
			D && _ !== "ignored" ? /* @__PURE__ */ (0, G.jsxs)(S, {
				"aria-label": "统一选择来源",
				size: "sm",
				selectedKey: "",
				isDisabled: p || !E.length,
				onSelectionChange: (e) => {
					e !== null && e !== "" && h(String(e));
				},
				children: [/* @__PURE__ */ (0, G.jsx)(C, {
					id: "",
					children: O
				}), E.map((e) => /* @__PURE__ */ (0, G.jsx)(C, {
					id: e,
					children: e
				}, e))]
			}) : null,
			_ === "ignored" ? null : /* @__PURE__ */ (0, G.jsx)(o, {
				variant: "ghost",
				size: "small",
				disabled: p || !l.size,
				onClick: () => g("rejected"),
				children: "忽略所选"
			}),
			_ === "pending" ? /* @__PURE__ */ (0, G.jsx)(o, {
				variant: "secondary",
				size: "small",
				disabled: p || !l.size,
				onClick: () => g("skipped"),
				children: "稍后处理所选"
			}) : /* @__PURE__ */ (0, G.jsx)(o, {
				variant: _ === "ignored" ? "primary" : "secondary",
				size: "small",
				disabled: p || !l.size,
				onClick: () => g("restore"),
				children: "恢复所选"
			}),
			_ === "ignored" ? null : /* @__PURE__ */ (0, G.jsx)(o, {
				variant: "primary",
				size: "small",
				disabled: p || !l.size || !ee,
				onClick: () => g("approved"),
				children: "通过所选"
			}),
			/* @__PURE__ */ (0, G.jsx)(o, {
				variant: "ghost",
				size: "small",
				disabled: p,
				onClick: () => u(/* @__PURE__ */ new Set()),
				children: "取消选择"
			}),
			m ? /* @__PURE__ */ (0, G.jsx)("p", {
				role: "status",
				className: "w-full text-body-2-regular text-text-secondary",
				children: m
			}) : null
		]
	})] });
}
// src/react/review/candidate-form.tsx
var Ne = {
	title: "标题",
	original_title: "原标题",
	runtime: "来源时长",
	director: "导演",
	label: "Label",
	poster_url: "海报",
	cover_url: "封面",
	screenshot_urls: "截图",
	trailer_url: "预告片"
}, K = "reviewgenretags";
function Pe({ tags: e }) {
	return e.length ? /* @__PURE__ */ (0, G.jsx)("datalist", {
		id: K,
		children: e.map((e) => /* @__PURE__ */ (0, G.jsx)("option", { value: e }, e))
	}) : null;
}
function Fe({ candidate: e, selectable: t = !1 }) {
	let n = Object.entries(e.catalog_evidence || {}).filter(([, e]) => e && e.display_value), r = e.content_id || e.provider_id;
	return /* @__PURE__ */ (0, G.jsxs)("span", {
		className: "flex min-w-0 flex-1 flex-col",
		children: [/* @__PURE__ */ (0, G.jsxs)("span", {
			className: "relative flex min-w-0 flex-col gap-0.5 px-4 py-3 group-hover:bg-background-primary-hover group-data-selected:bg-background-primary-hover",
			children: [
				/* @__PURE__ */ (0, G.jsxs)("b", {
					className: "text-body-2-medium text-text-secondary",
					children: [
						e.source,
						e.official ? " · 官方优先" : "",
						r ? ` · ID ${r}` : ""
					]
				}),
				/* @__PURE__ */ (0, G.jsx)("span", {
					className: "text-body-medium break-words text-text-primary",
					children: e.display_value || ""
				}),
				(e.warnings || []).map((e) => /* @__PURE__ */ (0, G.jsx)("i", {
					className: "text-body-2-regular text-status-yellow-text",
					children: e
				}, e)),
				t ? /* @__PURE__ */ (0, G.jsx)("span", {
					"aria-hidden": "true",
					"data-candidate-choice": !0,
					className: "absolute top-4 right-4 inline-grid size-4 place-items-center rounded-full border border-border-checkbox-default bg-background-primary-default group-hover:border-border-checkbox-hover group-data-selected:border-border-focus-ring group-data-selected:bg-accent-600",
					children: /* @__PURE__ */ (0, G.jsx)("span", { className: "size-1.5 rounded-full bg-text-white opacity-0 group-data-selected:opacity-100" })
				}) : null
			]
		}), n.length ? /* @__PURE__ */ (0, G.jsx)("dl", {
			className: "flex flex-col gap-1 border-t border-separator-border bg-background-primary-default px-4 py-2.5",
			children: n.map(([e, t]) => /* @__PURE__ */ (0, G.jsxs)("div", {
				className: "flex min-w-0 flex-wrap gap-x-2",
				children: [
					/* @__PURE__ */ (0, G.jsx)("dt", {
						className: "text-body-2-regular text-text-secondary",
						children: Ne[e] || e
					}),
					/* @__PURE__ */ (0, G.jsx)("dd", {
						className: "min-w-0 text-body-2-regular break-words text-text-primary",
						children: t.display_value
					}),
					(t.warnings || []).map((e) => /* @__PURE__ */ (0, G.jsx)("small", {
						className: "w-full text-caption-1-regular text-status-yellow-text",
						children: e
					}, e))
				]
			}, e))
		}) : null]
	});
}
function q({ row: e, fieldName: t, value: n, onChange: r, locked: o }) {
	let s = e.candidates || [];
	return s.length ? s.length === 1 ? /* @__PURE__ */ (0, G.jsx)("div", {
		className: "flex overflow-hidden rounded-surface border border-separator-border bg-background-secondary-default",
		children: /* @__PURE__ */ (0, G.jsx)(Fe, { candidate: s[0] })
	}) : /* @__PURE__ */ (0, G.jsx)(i, {
		"aria-label": `${t || "资料"}的来源`,
		value: n,
		isDisabled: o,
		onChange: r,
		className: "flex flex-col gap-2",
		children: s.map((e) => /* @__PURE__ */ (0, G.jsx)(a, {
			value: e.candidate_key,
			className: "relative group flex cursor-pointer items-center gap-2 overflow-hidden rounded-surface border border-separator-border bg-background-secondary-default outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring data-selected:border-border-button-active data-disabled:cursor-not-allowed",
			children: /* @__PURE__ */ (0, G.jsx)(Fe, {
				candidate: e,
				selectable: !0
			})
		}, e.candidate_key))
	}) : null;
}
function Ie({ genre: e, tags: t, locked: n, toast: r }) {
	let [i, a] = (0, W.useState)(""), [s, c] = (0, W.useState)(""), l = De({
		mutationFn: (t) => me(e, t),
		onSuccess: async (t, n) => {
			t.ok ? (r(n ? `已把「${e}」收录为标签「${n}」` : `已把「${e}」判为非内容标签`), await R()) : c(t.error || "服务端拒绝了这次收录");
		},
		onError: (e) => c(F(e))
	}), u = () => {
		let e = i.trim();
		e ? (c(""), l.mutate(e)) : c("先给它一个中文标签");
	};
	return /* @__PURE__ */ (0, G.jsxs)("div", {
		className: "flex flex-wrap items-center gap-2",
		children: [
			/* @__PURE__ */ (0, G.jsx)("b", {
				lang: "ja",
				className: "text-body-medium text-text-primary",
				children: e
			}),
			/* @__PURE__ */ (0, G.jsx)(E, {
				"aria-label": `「${e}」收录成的中文标签`,
				value: i,
				onChange: a,
				maxLength: 40,
				isDisabled: n || l.isPending,
				className: "min-w-40 flex-1",
				children: /* @__PURE__ */ (0, G.jsx)(g, {
					size: "small",
					list: t.length ? K : void 0,
					autoComplete: "off",
					placeholder: "中文标签",
					onKeyDown: (e) => {
						e.key !== "Enter" || e.nativeEvent.isComposing || (e.preventDefault(), u());
					}
				})
			}),
			/* @__PURE__ */ (0, G.jsx)(o, {
				variant: "secondary",
				size: "small",
				disabled: n || l.isPending,
				onClick: u,
				children: "收录"
			}),
			/* @__PURE__ */ (0, G.jsx)(o, {
				variant: "secondary",
				size: "small",
				disabled: n || l.isPending,
				onClick: () => {
					c(""), l.mutate("");
				},
				children: "不是内容"
			}),
			s ? /* @__PURE__ */ (0, G.jsx)("p", {
				role: "status",
				className: "w-full text-body-2-regular text-text-error-primary",
				children: s
			}) : null
		]
	});
}
function Le({ row: e, tags: t, locked: n, toast: r }) {
	let i = L(e);
	return i.length ? /* @__PURE__ */ (0, G.jsxs)("div", {
		role: "group",
		"aria-label": "未收录 genre",
		className: "flex flex-col gap-2 rounded-surface border border-separator-border bg-background-primary-default px-4 py-3",
		children: [/* @__PURE__ */ (0, G.jsx)("h5", {
			className: "text-body-2-medium text-text-secondary",
			children: `未收录 genre · ${i.length}`
		}), /* @__PURE__ */ (0, G.jsx)("div", {
			role: "list",
			className: "flex flex-col",
			children: i.map((e, i) => /* @__PURE__ */ (0, G.jsx)("div", {
				role: "listitem",
				className: `py-3 first:pt-0 last:pb-0 ${i ? "border-t border-separator-border" : ""}`,
				children: /* @__PURE__ */ (0, G.jsx)(Ie, {
					genre: e,
					tags: t,
					locked: n,
					toast: r
				})
			}, e))
		})]
	}) : null;
}
// src/react/review/review-evidence.tsx
var J = (e = "") => /^https?:\/\//i.test(e) ? e : "", Re = (e = "") => J(e) || (e.startsWith("/") && !e.startsWith("//") ? e : "");
function ze({ url: e }) {
	let t = Re(e || "");
	return /* @__PURE__ */ (0, G.jsx)(Be, { source: t }, t);
}
function Be({ source: e }) {
	let [t, n] = (0, W.useState)("idle");
	return (0, W.useEffect)(() => {
		if (t !== "loading") return;
		let e = setTimeout(() => n("failed"), 3e4);
		return () => clearTimeout(e);
	}, [t]), /* @__PURE__ */ (0, G.jsxs)("div", {
		className: "relative flex h-review-image items-center justify-center overflow-hidden rounded-surface bg-background-secondary-default",
		children: [t === "loading" ? /* @__PURE__ */ (0, G.jsxs)("span", {
			role: "status",
			className: "absolute flex items-center gap-2 text-body-2-regular text-text-secondary",
			children: [/* @__PURE__ */ (0, G.jsx)("span", { dangerouslySetInnerHTML: { __html: V("正在加载图片") } }), "正在加载图片"]
		}) : null, e && (t === "loading" || t === "ready") ? /* @__PURE__ */ (0, G.jsx)("img", {
			src: e,
			alt: "来源提供的备选图片",
			referrerPolicy: "no-referrer",
			decoding: "async",
			className: `size-full object-contain ${t === "loading" ? "invisible" : ""}`,
			onLoad: () => n("ready"),
			onError: () => n("failed")
		}) : e ? /* @__PURE__ */ (0, G.jsxs)("div", {
			className: "flex flex-col items-center gap-2",
			children: [t === "failed" ? /* @__PURE__ */ (0, G.jsx)("span", {
				className: "text-body-2-regular text-text-secondary",
				children: "未取得来源图片"
			}) : null, /* @__PURE__ */ (0, G.jsx)(o, {
				variant: "secondary",
				size: "small",
				"aria-label": t === "failed" ? "立即重试加载来源图片" : void 0,
				onClick: () => n("loading"),
				children: t === "failed" ? "立即重试" : "查看来源图片"
			})]
		}) : /* @__PURE__ */ (0, G.jsx)("span", {
			className: "text-body-2-regular text-text-secondary",
			children: "未取得来源图片"
		})]
	});
}
function Y({ asset: e, openItem: t }) {
	let n = e.name || "";
	return /* @__PURE__ */ (0, G.jsxs)("div", {
		className: "flex min-w-0 items-center gap-2.5 rounded-surface bg-background-secondary-default p-2",
		children: [/* @__PURE__ */ (0, G.jsxs)("button", {
			type: "button",
			onClick: () => t(e.id),
			className: "flex aspect-card-cover w-review-cover-narrow shrink-0 review-tight:w-review-cover cursor-pointer items-center justify-center overflow-hidden rounded-2lg bg-background-tertiary-default outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring",
			children: [e.preview_url ? /* @__PURE__ */ (0, G.jsx)("img", {
				src: e.preview_url,
				alt: "",
				loading: "lazy",
				className: "size-full object-cover"
			}) : /* @__PURE__ */ (0, G.jsx)("span", {
				className: "text-caption-1-regular text-text-secondary",
				children: "无封面"
			}), /* @__PURE__ */ (0, G.jsx)(r, { children: `打开原视频 ${n}` })]
		}), /* @__PURE__ */ (0, G.jsxs)("div", {
			className: "flex min-w-0 flex-col items-start gap-1",
			children: [/* @__PURE__ */ (0, G.jsx)("b", {
				title: n,
				className: "w-full truncate text-body-medium text-text-primary",
				children: e.code || n || "原视频"
			}), /* @__PURE__ */ (0, G.jsx)(o, {
				variant: "secondary",
				size: "small",
				leadingIcon: h,
				onClick: () => t(e.id),
				children: "打开原视频"
			})]
		})]
	});
}
function X({ kind: e, name: t, works: n, avatar: r, openEntity: i }) {
	return /* @__PURE__ */ (0, G.jsxs)("div", {
		className: "flex min-w-0 items-center gap-3",
		children: [/* @__PURE__ */ (0, G.jsx)("button", {
			type: "button",
			"aria-label": `打开创作者页：${t}`,
			onClick: () => i(e, t),
			className: `relative inline-grid size-11 shrink-0 cursor-pointer place-items-center overflow-hidden rounded-full bg-background-secondary-default text-caption-1-medium text-text-secondary outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring ${U}`,
			dangerouslySetInnerHTML: { __html: r }
		}), /* @__PURE__ */ (0, G.jsxs)("div", {
			className: "flex min-w-0 flex-col items-start",
			children: [/* @__PURE__ */ (0, G.jsx)("button", {
				type: "button",
				onClick: () => i(e, t),
				className: "max-w-full cursor-pointer truncate text-body-medium text-text-primary underline-offset-2 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-border-focus-ring",
				children: t
			}), n ? /* @__PURE__ */ (0, G.jsx)("small", {
				className: "tabular-nums text-body-2-regular text-text-secondary",
				children: `${n.toLocaleString()} 部作品`
			}) : null]
		})]
	});
}
function Ve({ row: e, openItem: t, openEntity: n, onReveal: r, revealing: i, note: a }) {
	let c = J(e.profile_url || ""), l = (e.preview_assets || []).slice(0, 6), u = Math.max(0, Number(e.video_count || e.videos || 0));
	return /* @__PURE__ */ (0, G.jsxs)("section", {
		className: "flex flex-col gap-3",
		children: [
			/* @__PURE__ */ (0, G.jsx)("h5", {
				className: "text-body-medium text-text-primary",
				children: `待确认人物：${e.babepedia_name || "未标注"}`
			}),
			/* @__PURE__ */ (0, G.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [c ? /* @__PURE__ */ (0, G.jsx)(s, {
					variant: "secondary",
					size: "small",
					trailingIcon: D,
					href: c,
					target: "_blank",
					rel: "noopener noreferrer",
					children: "来源资料"
				}) : null, /* @__PURE__ */ (0, G.jsx)(o, {
					variant: "secondary",
					size: "small",
					onClick: () => n("creator", e.creator || ""),
					children: `查看全部 ${u.toLocaleString()} 部作品`
				})]
			}),
			/* @__PURE__ */ (0, G.jsx)(ze, { url: e.preview_url }),
			/* @__PURE__ */ (0, G.jsx)("p", {
				className: "text-body-2-regular text-text-secondary",
				children: "通过后记录身份判断。"
			}),
			l.length ? /* @__PURE__ */ (0, G.jsxs)(G.Fragment, { children: [/* @__PURE__ */ (0, G.jsx)("h5", {
				className: "text-body-medium text-text-primary",
				children: "本地作品样本"
			}), /* @__PURE__ */ (0, G.jsx)("ul", {
				className: "flex flex-col gap-1",
				children: l.map((e) => /* @__PURE__ */ (0, G.jsxs)("li", {
					className: "flex min-w-0 items-center gap-2",
					children: [/* @__PURE__ */ (0, G.jsx)(o, {
						variant: "ghost",
						size: "small",
						className: "min-w-0",
						onClick: () => t(e.id),
						children: /* @__PURE__ */ (0, G.jsx)("span", {
							title: e.name,
							className: "block max-w-full truncate",
							children: e.name
						})
					}), /* @__PURE__ */ (0, G.jsx)(o, {
						variant: "ghost",
						size: "small",
						"aria-label": `打开 ${e.name} 的文件位置`,
						...A(i === e.id),
						onClick: () => r(e.id),
						children: "文件位置"
					})]
				}, e.id))
			})] }) : /* @__PURE__ */ (0, G.jsx)("p", {
				className: "text-body-2-regular text-text-secondary",
				children: "暂无本地作品样本，打开全部作品核对。"
			}),
			a ? /* @__PURE__ */ (0, G.jsx)("p", {
				role: "status",
				className: "text-body-2-regular text-text-error-primary",
				children: a
			}) : null
		]
	});
}
function He({ assets: e, picked: t, onPicked: n, locked: i }) {
	let [a, o] = (0, W.useState)(null), s = new Set(t), c = (t, r) => {
		if (i) return;
		let c = new Set(s);
		if (r && a !== null) {
			let [n, r] = [Math.min(a, t), Math.max(a, t)];
			for (let t = n; t <= r; t++) c.add(e[t].id);
		} else {
			let n = e[t].id;
			c.has(n) ? c.delete(n) : c.add(n);
		}
		o(t), n(e.filter((e) => c.has(e.id)).map((e) => e.id));
	};
	return /* @__PURE__ */ (0, G.jsxs)("div", {
		className: "flex flex-col gap-2",
		children: [/* @__PURE__ */ (0, G.jsx)(w, {
			prefix: /* @__PURE__ */ (0, G.jsx)("span", {
				className: "tabular-nums text-body-2-regular text-text-secondary",
				children: `已选 ${s.size} / ${e.length}`
			}),
			actions: [{
				label: "全选",
				disabled: i,
				onPress: () => n(e.map((e) => e.id))
			}, {
				label: "清空",
				disabled: i,
				onPress: () => n([])
			}]
		}), /* @__PURE__ */ (0, G.jsx)("div", {
			className: "review-asset-grid gap-1.5",
			children: e.map((e, t) => {
				let n = s.has(e.id);
				return /* @__PURE__ */ (0, G.jsxs)("button", {
					type: "button",
					"aria-pressed": n,
					title: e.name,
					onClick: (e) => c(t, e.shiftKey),
					className: `relative aspect-card-cover cursor-pointer overflow-hidden rounded-surface bg-background-tertiary-default outline-none transition-opacity focus-visible:ring-2 focus-visible:ring-border-focus-ring ${n ? "opacity-100 ring-2 ring-border-button-active ring-inset" : "opacity-50"}`,
					children: [
						/* @__PURE__ */ (0, G.jsx)("img", {
							src: `/poster?id=${e.id}&c=4`,
							alt: "",
							loading: "lazy",
							className: "size-full object-cover"
						}),
						/* @__PURE__ */ (0, G.jsx)("span", {
							className: "absolute top-1 right-1",
							children: /* @__PURE__ */ (0, G.jsx)(l, {
								size: "sm",
								state: {
									isSelected: n,
									isIndeterminate: !1,
									isFocusVisible: !1,
									isDisabled: i,
									isHovered: !1
								}
							})
						}),
						/* @__PURE__ */ (0, G.jsx)(r, { children: `${n ? "已选" : "未选"} ${e.name || e.id}` })
					]
				}, e.id);
			})
		})]
	});
}
// src/react/review/review-card.tsx
var Ue = j({
	variant: "outlined",
	padding: "none",
	className: "flex flex-col gap-4 px-5 pt-4"
}), Z = "flex min-h-6 min-w-0 items-center", We = 2, Q = (e) => e === "western_identity" ? "h-review-card-tall" : "h-review-card";
function Ge(e) {
	let { category: t, row: n, choice: r, onChoice: i, selected: a, onSelect: s, locked: l, busy: d, problem: m, genreTags: te, onDecide: h, handlers: g, queueView: _ = "pending" } = e, v = (0, W.useRef)(!1), re = H(), y = H(), b = t === "metadata_fields", x = f[t] || "", S = String(n.creator || "").trim(), C = !!x && !!S, w = B(t, n), T = xe(t, n), E = Se(t, n), D = be(n), O = Ce(n), j = ie(t, n), M = n.comparison_assets || [], N = n.preview_assets || [], P = ne[n.decision || ""], ae = M.length > 1 ? /* @__PURE__ */ (0, G.jsxs)("div", {
		className: "flex flex-col gap-3",
		children: [M.slice(0, We).map((e) => /* @__PURE__ */ (0, G.jsx)(Y, {
			asset: e,
			openItem: g.openItem
		}, e.id)), M.length > We ? /* @__PURE__ */ (0, G.jsx)("p", {
			className: "text-body-2-regular text-text-secondary",
			children: `另有 ${(M.length - We).toLocaleString()} 部对照作品`
		}) : null]
	}) : C ? /* @__PURE__ */ (0, G.jsx)(X, {
		kind: x,
		name: S,
		works: Number(n.video_count || n.videos || 0),
		openEntity: g.openEntity,
		avatar: k(S, n.entity_id ? {
			id: n.entity_id,
			has_image: !!n.has_image,
			image_version: n.image_version,
			avatar_focus: n.avatar_focus
		} : null, null, x)
	}) : n.asset_id ? /* @__PURE__ */ (0, G.jsx)(Y, {
		openItem: g.openItem,
		asset: {
			id: n.asset_id,
			name: n.asset_name,
			preview_url: n.asset_preview_url
		}
	}) : null, oe = b ? /* @__PURE__ */ (0, G.jsx)(q, {
		row: n,
		fieldName: T,
		value: r.candidateKey,
		onChange: (e) => i({
			...r,
			candidateKey: e
		}),
		locked: l
	}) : t === "creator_tags" ? N.length ? /* @__PURE__ */ (0, G.jsx)(He, {
		assets: N,
		picked: r.assets,
		locked: l,
		onPicked: (e) => i({
			...r,
			assets: e
		})
	}) : /* @__PURE__ */ (0, G.jsx)(p, {
		size: "compact",
		icon: ee,
		title: "这批作品尚未抽帧",
		children: `${n.video_count || ""} 条作品还没有可用预览；批准后仍会按所选资料写入标签。`
	}) : t === "fc2_similarity" ? null : t === "western_identity" ? /* @__PURE__ */ (0, G.jsx)(Ve, {
		row: n,
		openItem: g.openItem,
		openEntity: g.openEntity,
		onReveal: g.onReveal,
		revealing: g.revealing,
		note: g.revealNote
	}) : /* @__PURE__ */ (0, G.jsx)(ze, { url: n.preview_url }), F = C ? ae : T ? /* @__PURE__ */ (0, G.jsxs)("h4", {
		className: `${Z} flex-wrap gap-2`,
		children: [/* @__PURE__ */ (0, G.jsx)("span", {
			title: T,
			className: "flex max-w-full min-w-0 overflow-hidden rounded-md",
			children: /* @__PURE__ */ (0, G.jsx)(u, {
				variant: "caption",
				color: "blue",
				children: T
			})
		}), /* @__PURE__ */ (0, G.jsx)("span", {
			title: E,
			className: "min-w-0 truncate text-body-medium text-text-primary",
			children: E
		})]
	}) : /* @__PURE__ */ (0, G.jsx)("h4", {
		className: Z,
		children: /* @__PURE__ */ (0, G.jsx)("span", {
			title: w,
			className: "min-w-0 truncate text-body-medium text-text-primary",
			children: w
		})
	});
	return /* @__PURE__ */ (0, G.jsxs)("section", {
		"aria-label": w,
		"data-review-key": n.item_key,
		className: `${Ue} ${Q(t)} overflow-hidden`,
		children: [
			/* @__PURE__ */ (0, G.jsxs)("header", {
				className: "flex min-w-0 shrink-0 items-start gap-2",
				children: [
					l ? null : /* @__PURE__ */ (0, G.jsx)("span", {
						className: `${Z} shrink-0`,
						onPointerDownCapture: (e) => {
							v.current = e.shiftKey;
						},
						onKeyDownCapture: (e) => {
							v.current = e.shiftKey;
						},
						children: /* @__PURE__ */ (0, G.jsx)(c, {
							isSelected: a,
							"aria-label": `选择 ${w}`,
							onChange: (e) => s(v.current, e)
						})
					}),
					/* @__PURE__ */ (0, G.jsx)("div", {
						className: "min-w-0 flex-1",
						children: F
					}),
					P ? /* @__PURE__ */ (0, G.jsx)(u, {
						variant: "caption",
						color: "neutral",
						children: P
					}) : null
				]
			}),
			/* @__PURE__ */ (0, G.jsx)("div", {
				className: "relative flex min-w-0 min-h-0 flex-1 flex-col",
				children: /* @__PURE__ */ (0, G.jsxs)("div", {
					ref: re,
					className: "flex min-w-0 min-h-0 flex-1 flex-col gap-3 overflow-y-auto",
					children: [
						n.source_name ? /* @__PURE__ */ (0, G.jsx)("p", {
							className: "text-body-2-regular text-text-secondary",
							children: `来源写法：${n.source_name}`
						}) : null,
						!C && (n.board || n.assets) ? /* @__PURE__ */ (0, G.jsx)("p", {
							className: "text-body-2-regular text-text-secondary",
							children: `对照文件：${Number(n.video_count || n.assets || 0).toLocaleString()}`
						}) : null,
						!C && ae ? ae : null,
						O.length || t === "creator_tags" ? /* @__PURE__ */ (0, G.jsx)("div", {
							className: "flex flex-wrap gap-1",
							children: O.length ? O.map((e) => /* @__PURE__ */ (0, G.jsx)(u, {
								variant: "caption",
								color: "soft",
								children: e
							}, e)) : /* @__PURE__ */ (0, G.jsx)("small", {
								className: "text-body-2-regular text-text-secondary",
								children: "暂无待确认标签"
							})
						}) : null,
						oe,
						/* @__PURE__ */ (0, G.jsx)(Le, {
							row: n,
							tags: te,
							locked: l,
							toast: g.toast
						}),
						!b && D ? /* @__PURE__ */ (0, G.jsx)("p", {
							className: "text-body-2-regular text-text-secondary wrap-anywhere",
							children: D
						}) : null
					]
				})
			}),
			b && D ? /* @__PURE__ */ (0, G.jsx)("div", {
				className: "relative -mx-5 -mb-4 shrink-0",
				children: /* @__PURE__ */ (0, G.jsx)("p", {
					ref: y,
					role: "region",
					"aria-label": "当前信息",
					className: "max-h-22 overflow-y-auto border-t border-separator-border px-5 py-2.5 text-body-2-regular text-text-secondary wrap-anywhere",
					children: D
				})
			}) : null,
			/* @__PURE__ */ (0, G.jsxs)("footer", {
				className: "-mx-5 flex min-h-14 shrink-0 flex-wrap items-center justify-end gap-2 rounded-b-surface border-t border-separator-border bg-background-secondary-default py-3 pr-3 pl-5",
				children: [
					_ === "ignored" ? null : /* @__PURE__ */ (0, G.jsx)(o, {
						variant: "ghost",
						size: "small",
						disabled: l,
						...A(d),
						onClick: () => h("rejected"),
						children: "忽略"
					}),
					_ === "pending" ? /* @__PURE__ */ (0, G.jsx)(o, {
						variant: "secondary",
						size: "small",
						disabled: l,
						...A(d),
						onClick: () => h("skipped"),
						children: "稍后处理"
					}) : /* @__PURE__ */ (0, G.jsx)(o, {
						variant: _ === "ignored" ? "primary" : "secondary",
						size: "small",
						disabled: l,
						...A(d),
						onClick: () => h("restore"),
						children: "恢复待处理"
					}),
					_ === "ignored" ? null : /* @__PURE__ */ (0, G.jsx)(o, {
						variant: "primary",
						size: "small",
						disabled: l || !j,
						...A(d),
						title: j ? void 0 : "没有可采用的资料，可先保留或忽略",
						onClick: () => h("approved"),
						children: j ? "通过" : "不可通过"
					}),
					m ? /* @__PURE__ */ (0, G.jsx)("p", {
						role: "status",
						className: "w-full text-body-2-regular text-text-error-primary",
						children: m
					}) : null
				]
			})
		]
	});
}
// src/react/review/review-page.tsx
var Ke = "flex cursor-pointer items-center justify-between gap-2";
function qe({ page: e, pages: t, onPage: n }) {
	return t <= 1 ? null : /* @__PURE__ */ (0, G.jsxs)("nav", {
		"aria-label": "复核分页",
		"data-pagination-layout": "",
		className: "inline-grid w-full min-w-0 items-center gap-2",
		children: [
			/* @__PURE__ */ (0, G.jsx)(o, {
				variant: "secondary",
				size: "small",
				disabled: e <= 1,
				onClick: () => n(e - 1),
				children: "上一页"
			}),
			/* @__PURE__ */ (0, G.jsx)("ul", {
				className: "flex min-w-0 flex-wrap items-center justify-center gap-1",
				children: pe(e, t).map((t, r) => /* @__PURE__ */ (0, G.jsx)("li", { children: t === "…" ? /* @__PURE__ */ (0, G.jsx)("span", {
					"aria-hidden": !0,
					className: "px-1 text-body-2-regular text-text-tertiary",
					children: "…"
				}) : /* @__PURE__ */ (0, G.jsx)(o, {
					variant: t === e ? "secondary" : "ghost",
					size: "small",
					"aria-label": `第 ${t} 页`,
					"aria-current": t === e ? "page" : void 0,
					onClick: () => n(Number(t)),
					children: t
				}) }, t === "…" ? `dots-${r}` : t))
			}),
			/* @__PURE__ */ (0, G.jsx)(o, {
				variant: "secondary",
				size: "small",
				disabled: e >= t,
				onClick: () => n(e + 1),
				children: "下一页"
			})
		]
	});
}
function $(r) {
	let [i, a] = (0, W.useState)(() => matchMedia("(max-width:900px)").matches);
	(0, W.useEffect)(() => {
		let e = matchMedia("(max-width:900px)"), t = () => a(e.matches);
		return e.addEventListener("change", t), () => e.removeEventListener("change", t);
	}, []);
	let { route: s, openItem: c, openEntity: l, revealSource: u, toast: f, readOnly: ee, readOnlyMessage: te, writerUrl: h } = r, [g, ne] = (0, W.useState)(ue(r.category) ? r.category : d), [S, C] = (0, W.useState)(() => ve(r.queue)), [w, T] = (0, W.useState)("candidates"), [E, D] = (0, W.useState)(""), [O, k] = (0, W.useState)(1), [A, j] = (0, W.useState)(/* @__PURE__ */ new Set()), [M, I] = (0, W.useState)(/* @__PURE__ */ new Map()), [pe, L] = (0, W.useState)(/* @__PURE__ */ new Map()), [me, R] = (0, W.useState)(""), z = (0, W.useRef)(null), [he, be] = (0, W.useState)(0), [xe, Se] = (0, W.useState)(""), Ce = (0, W.useRef)(!0);
	(0, W.useEffect)(() => () => {
		Ce.current = !1;
	}, []);
	let B = Oe({
		queryKey: re,
		queryFn: ({ signal: e }) => se(e)
	}), V = B.data || {
		sections: {},
		counts: {},
		queues: {
			later: {
				sections: {},
				counts: {}
			},
			ignored: {
				sections: {},
				counts: {}
			}
		}
	}, H = _e(V, S), ke = B.data ? Object.fromEntries(b.map((e) => [e, v.reduce((t, n) => t + Number(_e(V, e).counts[n] || 0), 0)])) : void 0, U = H.sections[g] || [], Ne = g === "metadata_fields", K = ee;
	(0, W.useEffect)(() => {
		let e = new Set(U.map((e) => e.item_key));
		j((t) => {
			let n = [...t].filter((t) => e.has(t));
			return n.length === t.size ? t : new Set(n);
		}), I((t) => {
			let n = [...t].filter(([t]) => e.has(t));
			return n.length === t.size ? t : new Map(n);
		}), L((t) => {
			let n = [...t].filter(([t]) => e.has(t));
			return n.length === t.size ? t : new Map(n);
		});
	}, [U]);
	let Fe = ge(U, Ne), q = Fe.some(([e]) => e === w) ? w : "candidates", Ie = le(U, q), Le = Ie.some((e) => e.key === E) ? E : "", J = ye(ce(U, q, Le), O), Re = J.rows.map((e) => e.item_key), ze = new Set(Re), Be = Ie.map((e) => ({
		...e,
		rows: e.rows.filter((e) => ze.has(e.item_key))
	})).filter((e) => e.rows.length), Y = (e) => M.get(e.item_key) || oe(e), X = U.filter((e) => A.has(e.item_key)), Ve = (e) => {
		let t = new Set(e);
		j((e) => new Set([...e].filter((e) => !t.has(e)))), I((e) => new Map([...e].filter(([e]) => !t.has(e)))), L((e) => new Map([...e].filter(([e]) => !t.has(e))));
	}, He = (e, t) => L((n) => new Map(n).set(e, t)), Ue = () => {
		T("candidates"), D(""), k(1), j(/* @__PURE__ */ new Set()), I(/* @__PURE__ */ new Map()), L(/* @__PURE__ */ new Map()), R(""), z.current = null;
	}, Z = (e) => {
		ne(e), Ue(), s({
			category: e === "metadata_fields" ? "" : e,
			queue: S === "pending" ? "" : S
		});
	}, We = (e) => {
		C(e), Ue(), s({
			category: g === "metadata_fields" ? "" : g,
			queue: e === "pending" ? "" : e
		});
	}, Q = De({
		mutationFn: ({ row: e, status: t, category: n }) => Ee(P(n, N(n, e), t, Y(e))),
		onSuccess: (e, { row: t, status: n, category: r }) => {
			e.ok ? (Te(r, [t.item_key], n), Ve([t.item_key]), f(ae(n))) : He(t.item_key, e.error || "服务端拒绝了这次判定");
		},
		onError: (e, { row: t }) => He(t.item_key, F(e))
	}), $ = De({
		mutationFn: async ({ status: e, category: t, rows: n }) => {
			let r = [], i = [];
			for (let [a, o] of n.entries()) {
				if (!Ce.current) break;
				R(`正在处理 ${a} / ${n.length}`);
				try {
					let n = await Ee(P(t, N(t, o), e, Y(o)));
					if (!n.ok) throw Error(n.error || "服务端未采用该项");
					r.push(o.item_key);
				} catch (e) {
					i.push([o.item_key, F(e)]);
				}
			}
			return {
				status: e,
				category: t,
				done: r,
				failures: i
			};
		},
		onSuccess: ({ status: e, category: t, done: n, failures: r }) => {
			Te(t, n, e), Ve(n), r.forEach(([e, t]) => He(e, t)), R("");
			let i = {
				approved: "通过",
				rejected: "忽略",
				skipped: "移至稍后处理",
				restore: "恢复待处理"
			}[e];
			f(`已${i} ${n.length} 项` + (r.length ? `，${r.length} 项未完成` : ""));
		},
		onError: (e) => {
			R(F(e));
		}
	}), Je = (e) => {
		!$.isPending && X.length && (e === "approved" && Ne && X.some((e) => !Y(e).candidateKey) ? R("请先为所选资料选择要采用的来源。") : (R(""), $.mutate({
			status: e,
			category: g,
			rows: X
		})));
	}, Ye = (e) => {
		I((t) => {
			let n = new Map(t);
			for (let t of X) {
				let r = t.candidates?.find((t) => t.source === e);
				r && n.set(t.item_key, {
					...Y(t),
					candidateKey: r.candidate_key
				});
			}
			return n;
		}), R(`已选择 ${e}，点击通过所选采用。`);
	}, Xe = async (e) => {
		if (he) return;
		be(e), Se("");
		let t = await u(e);
		Ce.current && (be(0), Se(t));
	}, Ze = fe(V.mirror, te), Qe = V.genre_tags || [], $e = {
		openItem: c,
		openEntity: l,
		onReveal: Xe,
		revealing: he,
		revealNote: xe,
		toast: f
	};
	return /* @__PURE__ */ (0, G.jsx)(Ae, { children: /* @__PURE__ */ (0, G.jsxs)("div", {
		className: "flex flex-col gap-5 pb-10",
		children: [
			K ? /* @__PURE__ */ (0, G.jsx)(_, {
				tone: "warning",
				title: "本机只能浏览",
				extra: h ? /* @__PURE__ */ (0, G.jsx)("p", {
					className: "text-body-2-regular",
					children: /* @__PURE__ */ (0, G.jsx)(m, {
						href: h,
						children: "前往写入端复核"
					})
				}) : void 0,
				children: Ze
			}) : null,
			/* @__PURE__ */ (0, G.jsx)(Pe, { tags: Qe }),
			/* @__PURE__ */ (0, G.jsxs)(n, {
				orientation: i ? "horizontal" : "vertical",
				selectedKey: g,
				onSelectionChange: (e) => {
					let t = String(e);
					ue(t) && Z(t);
				},
				className: "flex flex-col gap-5 review-split:flex-row review-split:items-start review-split:gap-6",
				children: [/* @__PURE__ */ (0, G.jsxs)("div", {
					"data-section-nav": !0,
					className: "w-full min-w-0 review-split:sticky review-split:top-topbar review-split:w-review-tabs review-split:shrink-0",
					children: [/* @__PURE__ */ (0, G.jsx)("h2", {
						id: "reviewcategories",
						children: "复核分类"
					}), /* @__PURE__ */ (0, G.jsx)(je, {
						scrollable: i,
						"aria-labelledby": "reviewcategories",
						"data-section-items": !0,
						className: "flex review-split:flex-col review-split:items-stretch",
						children: v.map((e) => {
							let n = Number(H.counts[e] || 0);
							return /* @__PURE__ */ (0, G.jsxs)(t, {
								id: e,
								className: Ke,
								isDisabled: Q.isPending || $.isPending,
								"data-pill-selected": g === e ? "" : void 0,
								"data-pill-variant": "gray",
								children: [y[e], n ? /* @__PURE__ */ (0, G.jsx)("span", {
									className: "tabular-nums text-caption-1-medium text-text-secondary",
									children: n.toLocaleString()
								}) : null]
							}, e);
						})
					})]
				}), /* @__PURE__ */ (0, G.jsxs)(e, {
					id: g,
					className: "flex min-w-0 flex-1 flex-col gap-5",
					children: [
						/* @__PURE__ */ (0, G.jsx)(Me, {
							queueView: S,
							queueCounts: ke,
							onQueueChange: We,
							locked: K,
							groupOptions: Fe,
							groupBy: q,
							onGroupBy: (e) => {
								T(e), D(""), k(1);
							},
							groups: Ie,
							filter: Le,
							onFilter: (e) => {
								D(e), k(1);
							},
							pageKeys: Re,
							selected: A,
							onSelected: j,
							selectedRows: X,
							metadata: Ne,
							approvable: X.every((e) => ie(g, e)),
							busy: $.isPending || Q.isPending,
							feedback: me,
							onUnifySource: Ye,
							onRun: Je
						}),
						J.rows.length ? Be.map((e) => /* @__PURE__ */ (0, G.jsxs)("section", {
							className: "flex flex-col gap-3",
							children: [Be.length > 1 || q !== "candidates" ? /* @__PURE__ */ (0, G.jsxs)("div", {
								className: "flex flex-wrap items-center gap-2",
								children: [/* @__PURE__ */ (0, G.jsx)("h3", {
									className: "text-body-medium text-text-primary",
									children: `${e.title} · ${e.rows.length}`
								}), K ? null : /* @__PURE__ */ (0, G.jsx)(o, {
									variant: "ghost",
									size: "small",
									onClick: () => {
										let t = e.rows.map((e) => e.item_key), n = t.every((e) => A.has(e)), r = new Set(A);
										for (let e of t) n ? r.delete(e) : r.add(e);
										j(r);
									},
									children: e.rows.every((e) => A.has(e.item_key)) ? "清空本组" : "全选本组"
								})]
							}) : null, /* @__PURE__ */ (0, G.jsx)("div", {
								className: "review-grid gap-5",
								children: e.rows.map((e) => /* @__PURE__ */ (0, G.jsx)(Ge, {
									category: g,
									row: e,
									queueView: S,
									choice: Y(e),
									onChoice: (t) => I((n) => new Map(n).set(e.item_key, t)),
									selected: A.has(e.item_key),
									onSelect: (t, n) => j((r) => {
										let i = new Set(r);
										return z.current = we(i, Re, z.current, e.item_key, t, n), i;
									}),
									locked: K,
									busy: $.isPending || Q.isPending && Q.variables?.row.item_key === e.item_key,
									problem: pe.get(e.item_key) || "",
									genreTags: Qe,
									onDecide: (t) => {
										Q.isPending || $.isPending || (L((t) => new Map([...t].filter(([t]) => t !== e.item_key))), Q.mutate({
											row: e,
											status: t,
											category: g
										}));
									},
									handlers: $e
								}, e.item_key))
							})]
						}, e.key)) : B.isError && !B.data ? /* @__PURE__ */ (0, G.jsx)(_, {
							tone: "error",
							title: "复核队列读取失败",
							action: /* @__PURE__ */ (0, G.jsx)(o, {
								variant: "secondary",
								size: "small",
								disabled: B.isFetching,
								onClick: () => void B.refetch(),
								children: "立即重试"
							}),
							children: F(B.error)
						}) : /* @__PURE__ */ (0, G.jsx)(p, {
							icon: de,
							title: `此分类没有${x[S]}项目`,
							actions: v.some((e) => e !== g && Number(H.counts[e] || 0) > 0) ? /* @__PURE__ */ (0, G.jsx)(o, {
								size: "small",
								onClick: () => {
									let e = v.find((e) => e !== g && Number(H.counts[e] || 0) > 0);
									e && Z(e);
								},
								children: "查看其他分类"
							}) : void 0,
							children: S === "pending" ? "可切换分类查看其他待确认资料。" : `${x[S]}的资料会保留在这里，可恢复到待处理。`
						}),
						/* @__PURE__ */ (0, G.jsx)(qe, {
							page: J.page,
							pages: J.pages,
							onPage: k
						})
					]
				})]
			})
		]
	}) });
}
export { $ as ReviewPage };

//# debugId=0f87cc14-5ced-46c2-88a8-4b571bbb3b85