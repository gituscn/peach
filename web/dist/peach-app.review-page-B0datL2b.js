(function() {
	try {
		var e = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, t = new e.Error().stack;
		t && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[t] = "fad36fa2-5f4f-4817-a33b-a6a4487390ae", e._sentryDebugIdIdentifier = "sentry-dbid-fad36fa2-5f4f-4817-a33b-a6a4487390ae");
	} catch {}
})();
import { $b4f18e3395fe64d7$export$3d96ec278d3efce4 as e, $b4f18e3395fe64d7$export$3e41faf802a29e71 as t, $b4f18e3395fe64d7$export$b2539bed5023c21c as n, $ea3928288112382f$export$439d29a4e110a164 as r, $fe21c36db05242bb$export$a98f0dcb43a68a25 as i, $fe21c36db05242bb$export$d7b12c4107be0d61 as a, Button as o, ButtonLink as s, Checkbox as c, CheckboxGlyph as l, Chip as u, CollapseChevron as d, CollapseRegion as f, DEFAULT_CATEGORY as ee, ENTITY_REVIEW_KINDS as p, Ea as m, EmptyState as te, ExternalLink as h, FIELDSET_FOOT as g, FilterGlassRows as _, Gg as v, InputBase as y, LinkButton as b, Note as x, REVIEW_CATEGORIES as S, REVIEW_DECISION_LABELS as C, REVIEW_KEY as w, REVIEW_LABELS as T, REVIEW_QUEUES as E, REVIEW_QUEUE_LABELS as D, Select as O, SelectItem as k, SelectionActions as A, SelectionDock as j, TextField as M, Wt as N, __toESM as P, avatarInner as F, busyProps as I, canApprove as ne, cardClass as L, commonReviewSources as R, currentReviewRow as re, cx as z, decisionPayload as ie, decisionReceipt as ae, defaultChoice as oe, errorMessage as B, fetchReview as se, filterReviewRows as ce, groupReviewRows as le, isReviewCategory as ue, l7 as de, m7 as fe, mirrorText as pe, paginationRange as me, pendingGenres as he, recordGenre as ge, reloadReview as _e, require_jsx_runtime as ve, require_react as V, reviewGroupingOptions as ye, reviewQueueData as be, reviewQueueOf as xe, reviewWindow as Se, rowEvidence as Ce, rowFieldName as we, rowSubject as Te, rowTags as H, rowTitle as U, selectReviewRange as Ee, settleReviewRows as De, spinnerHtml as W, submitDecision as Oe, useMutation as ke, useOverlayScrollbar as Ae, useQuery as je, useViewGlide as G } from "./peach-app.js";
import { Page as Me } from "./peach-app.page-QAncjzM1.js";
import { LEGACY_AVATAR_IMG as Ne } from "./peach-app.legacy-avatar-NSITxLRS.js";
import { PillAriaTabList as Pe } from "./peach-app.pill-aria-tab-list-BMY1ZEv1.js";
// src/react/review/bulk-toolbar.tsx
var K = /* @__PURE__ */ P(V(), 1), q = ve();
function Fe(e) {
	let { groupOptions: t, groupBy: n, onGroupBy: r, groups: i, filter: a, onFilter: s, pageKeys: c, selected: l, onSelected: u, selectedRows: d, metadata: f, approvable: ee, busy: p, feedback: m, onUnifySource: te, onRun: h, queueView: g = "pending", queueCounts: v, onQueueChange: y, locked: b } = e, x = c.filter((e) => l.has(e)), S = x.length > 0 && x.length === c.length, C = R(d), w = f && d.some((e) => (e.candidates?.length || 0) > 1), T = C.length ? "统一选择来源" : "所选项目无共同来源", A = (0, K.useRef)(null), M = (0, K.useRef)(null), N = (0, K.useRef)(null), [P, F] = (0, K.useState)(!1), I = G(A, M, "[data-entity-state][aria-pressed=\"true\"]", g);
	return (0, K.useLayoutEffect)(() => {
		let e = M.current, t = N.current, n = e?.parentElement, r = e?.closest("[data-review-filter]");
		if (!e || !t || !n || !r) return;
		let i = () => F(t.offsetHeight > 0 && Math.abs(n.getBoundingClientRect().top - t.getBoundingClientRect().top) < 1), a = new ResizeObserver(i);
		for (let n of [
			r,
			e,
			t
		]) a.observe(n);
		return i(), () => a.disconnect();
	}, []), /* @__PURE__ */ (0, q.jsxs)(q.Fragment, { children: [/* @__PURE__ */ (0, q.jsx)(_, {
		label: "复核筛选",
		topLabel: "处理状态",
		attrs: { "data-review-filter": "" },
		className: "mb-0 flex-row flex-wrap",
		topClassName: "max-w-full flex-none",
		bottomClassName: c.length ? "min-h-12 max-w-full flex-none flex-wrap" : "hidden",
		bottomRef: N,
		panes: /* @__PURE__ */ (0, q.jsx)("span", {
			ref: A,
			"data-view-glide": "",
			"aria-hidden": "true"
		}),
		top: /* @__PURE__ */ (0, q.jsxs)("div", {
			ref: M,
			role: "group",
			"aria-label": "复核状态",
			"data-entity-states": "",
			onPointerLeave: I.leave,
			children: [E.map((e) => /* @__PURE__ */ (0, q.jsxs)("button", {
				type: "button",
				"data-entity-state": e,
				"data-entity-press": "",
				disabled: p,
				"aria-pressed": g === e,
				onPointerEnter: I.hover,
				onClick: () => {
					e !== g && y(e);
				},
				children: [
					/* @__PURE__ */ (0, q.jsx)("span", {
						"data-copy-key": `review.queue.${e}`,
						children: D[e]
					}),
					" ",
					/* @__PURE__ */ (0, q.jsx)("span", {
						className: "ms-1.5 tabular-nums text-caption-1-medium text-text-secondary",
						children: v ? v[e].toLocaleString() : "…"
					})
				]
			}, e)), /* @__PURE__ */ (0, q.jsx)("span", {
				"data-entity-sep": "",
				"aria-hidden": "true",
				className: P ? void 0 : "invisible"
			})]
		}),
		bottom: c.length ? /* @__PURE__ */ (0, q.jsxs)(q.Fragment, { children: [
			/* @__PURE__ */ (0, q.jsx)(O, {
				"aria-label": "筛选分组方式",
				size: "sm",
				selectedKey: n,
				onSelectionChange: (e) => {
					e !== null && r(String(e));
				},
				children: t.map(([e, t]) => /* @__PURE__ */ (0, q.jsx)(k, {
					id: e,
					children: t
				}, e))
			}),
			i.length > 1 ? /* @__PURE__ */ (0, q.jsxs)(O, {
				"aria-label": n === "field" ? "筛选字段分类" : "筛选当前分类",
				size: "sm",
				prefix: "分类",
				selectedKey: a || "*",
				onSelectionChange: (e) => {
					e !== null && s(String(e) === "*" ? "" : String(e));
				},
				children: [/* @__PURE__ */ (0, q.jsx)(k, {
					id: "*",
					children: "全部"
				}), i.map((e) => /* @__PURE__ */ (0, q.jsx)(k, {
					id: e.key,
					children: `${e.title} · ${e.rows.length}`
				}, e.key))]
			}) : null,
			b ? null : /* @__PURE__ */ (0, q.jsx)(o, {
				variant: "secondary",
				size: "small",
				leadingIcon: de,
				"aria-pressed": S,
				disabled: p,
				onClick: () => {
					let e = new Set(l);
					for (let t of c) S ? e.delete(t) : e.add(t);
					u(e);
				},
				children: S ? "清空当前选择" : a ? "全选当前分类" : "全选本页"
			})
		] }) : null
	}), /* @__PURE__ */ (0, q.jsxs)(j, {
		label: "复核所选项目",
		visible: !b && l.size > 0,
		count: `已选 ${l.size} 项`,
		children: [
			w && g !== "ignored" ? /* @__PURE__ */ (0, q.jsxs)(O, {
				"aria-label": "统一选择来源",
				size: "sm",
				selectedKey: "",
				isDisabled: p || !C.length,
				onSelectionChange: (e) => {
					e !== null && e !== "" && te(String(e));
				},
				children: [/* @__PURE__ */ (0, q.jsx)(k, {
					id: "",
					children: T
				}), C.map((e) => /* @__PURE__ */ (0, q.jsx)(k, {
					id: e,
					children: e
				}, e))]
			}) : null,
			g === "ignored" ? null : /* @__PURE__ */ (0, q.jsx)(o, {
				variant: "ghost",
				size: "small",
				disabled: p || !l.size,
				onClick: () => h("rejected"),
				children: "忽略所选"
			}),
			g === "pending" ? /* @__PURE__ */ (0, q.jsx)(o, {
				variant: "secondary",
				size: "small",
				disabled: p || !l.size,
				onClick: () => h("skipped"),
				children: "稍后处理所选"
			}) : /* @__PURE__ */ (0, q.jsx)(o, {
				variant: g === "ignored" ? "primary" : "secondary",
				size: "small",
				disabled: p || !l.size,
				onClick: () => h("restore"),
				children: "恢复所选"
			}),
			g === "ignored" ? null : /* @__PURE__ */ (0, q.jsx)(o, {
				variant: "primary",
				size: "small",
				disabled: p || !l.size || !ee,
				onClick: () => h("approved"),
				children: "通过所选"
			}),
			/* @__PURE__ */ (0, q.jsx)(o, {
				variant: "ghost",
				size: "small",
				disabled: p,
				onClick: () => u(/* @__PURE__ */ new Set()),
				children: "取消选择"
			}),
			m ? /* @__PURE__ */ (0, q.jsx)("p", {
				role: "status",
				className: "w-full text-body-2-regular text-text-secondary",
				children: m
			}) : null
		]
	})] });
}
// src/react/boardui/components/base/radio/radio.tsx
var Ie = {
	sm: {
		dot: "size-3.5",
		inner: "size-[5px]",
		selected: "bg-gradient-to-b from-accent-500 to-accent-600 shadow-[inset_0px_0px_0px_0.875px_var(--color-accent-500),inset_0px_1.75px_0px_0px_rgba(255,255,255,0.25)]",
		border: "border-[0.875px]",
		gap: "gap-2",
		label: "text-body-2-medium"
	},
	md: {
		dot: "size-4",
		inner: "size-1.5",
		selected: "bg-gradient-to-b from-accent-500 to-accent-600 shadow-[inset_0px_0px_0px_1px_var(--color-accent-500),inset_0px_2px_0px_0px_rgba(255,255,255,0.25)]",
		border: "border",
		gap: "gap-2",
		label: "text-body-medium"
	}
};
function J({ selected: e = !1, size: t = "sm", focusVisible: n = !1, className: r }) {
	let i = Ie[t];
	return /* @__PURE__ */ (0, q.jsxs)("span", {
		"aria-hidden": !0,
		className: z("relative flex shrink-0 items-center justify-center rounded-full", i.dot, n && "ring-2 ring-border-focus-ring ring-offset-2", r),
		children: [
			/* @__PURE__ */ (0, q.jsx)("span", { className: z("absolute inset-0 rounded-full border-border-checkbox-default bg-background-primary-default shadow-xs", "transition-opacity duration-200 ease", i.border, e && "opacity-0") }),
			/* @__PURE__ */ (0, q.jsx)("span", { className: z("absolute inset-0 rounded-full", "transition-opacity duration-200 ease", i.selected, !e && "opacity-0") }),
			/* @__PURE__ */ (0, q.jsx)("span", { className: z("absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-control-indicator-background", "transition-[scale,opacity] duration-200 ease", i.inner, e ? "scale-100 opacity-100" : "scale-0 opacity-0") })
		]
	});
}
function Le({ className: e, children: t, ref: n, ...r }) {
	return /* @__PURE__ */ (0, q.jsx)(i, {
		ref: n,
		...r,
		className: (t) => z("flex flex-col gap-2", typeof e == "function" ? e(t) : e),
		children: t
	});
}
// src/react/boardui/components/base/radio/radio-card.tsx
function Re({ className: e, title: t, description: n, ref: r, ...i }) {
	return /* @__PURE__ */ (0, q.jsx)(a, {
		ref: r,
		...i,
		className: (t) => z("group flex w-full items-center justify-between gap-3 rounded-2lg border border-border-button-default py-3 pe-5 ps-4 select-none", "transition-colors duration-150 ease", t.isHovered && !t.isDisabled ? "bg-background-primary-hover" : "bg-background-primary-default", t.isDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer", typeof e == "function" ? e(t) : e),
		children: (e) => /* @__PURE__ */ (0, q.jsxs)(q.Fragment, { children: [/* @__PURE__ */ (0, q.jsxs)("span", {
			className: "flex min-w-0 flex-col gap-0.5",
			children: [/* @__PURE__ */ (0, q.jsx)("span", {
				className: "truncate text-body-medium text-text-primary",
				children: t
			}), n != null && /* @__PURE__ */ (0, q.jsx)("span", {
				className: "truncate text-body-regular text-text-secondary",
				children: n
			})]
		}), /* @__PURE__ */ (0, q.jsx)("span", {
			className: "flex shrink-0 items-center py-1",
			children: /* @__PURE__ */ (0, q.jsx)(J, {
				size: "md",
				selected: e.isSelected,
				focusVisible: e.isFocusVisible
			})
		})] })
	});
}
// src/react/review/candidate-form.tsx
var ze = {
	title: "标题",
	original_title: "原标题",
	runtime: "来源时长",
	director: "导演",
	label: "Label",
	poster_url: "海报",
	cover_url: "封面",
	screenshot_urls: "截图",
	trailer_url: "预告片"
}, Y = "reviewgenretags";
function Be({ tags: e }) {
	return e.length ? /* @__PURE__ */ (0, q.jsx)("datalist", {
		id: Y,
		children: e.map((e) => /* @__PURE__ */ (0, q.jsx)("option", { value: e }, e))
	}) : null;
}
function X({ candidate: e }) {
	let [t, n] = (0, K.useState)(!1), r = (0, K.useId)(), i = Object.entries(e.catalog_evidence || {}).filter(([, e]) => e && e.display_value);
	return i.length ? /* @__PURE__ */ (0, q.jsxs)("div", {
		className: "min-w-0",
		children: [/* @__PURE__ */ (0, q.jsxs)(b, {
			variant: "secondary",
			size: "small",
			leadingIcon: d,
			"aria-expanded": t,
			"aria-controls": r,
			"aria-label": `${t ? "收起" : "展开"} ${e.source || "该来源"} 的来源依据`,
			onClick: () => n(!t),
			children: [/* @__PURE__ */ (0, q.jsx)("span", {
				"data-copy-key": "review.card.source_evidence",
				children: "来源依据"
			}), ` · ${i.length}`]
		}), /* @__PURE__ */ (0, q.jsx)(f, {
			id: r,
			open: t,
			children: /* @__PURE__ */ (0, q.jsx)("dl", {
				className: "flex min-w-0 flex-col gap-2 px-3 pt-2 pb-1",
				children: i.map(([e, t]) => /* @__PURE__ */ (0, q.jsxs)("div", {
					className: "flex min-w-0 flex-wrap gap-x-2",
					children: [
						/* @__PURE__ */ (0, q.jsx)("dt", {
							className: "text-caption-1-regular text-text-tertiary",
							children: ze[e] || e
						}),
						/* @__PURE__ */ (0, q.jsx)("dd", {
							className: "min-w-0 text-body-2-regular break-words text-text-primary",
							children: t.display_value
						}),
						(t.warnings || []).map((e) => /* @__PURE__ */ (0, q.jsx)("small", {
							className: "w-full text-caption-1-regular text-status-yellow-text",
							children: e
						}, e))
					]
				}, e))
			})
		})]
	}) : null;
}
function Z(e) {
	let t = e.content_id || e.provider_id;
	return `${e.source || "未标注来源"}${e.official ? " · 官方优先" : ""}${t ? ` · ID ${t}` : ""}`;
}
function Ve({ candidate: e }) {
	return /* @__PURE__ */ (0, q.jsxs)("span", {
		className: "flex min-w-0 flex-col gap-2 whitespace-normal wrap-anywhere",
		children: [/* @__PURE__ */ (0, q.jsx)("span", {
			className: "text-body-regular text-text-primary",
			children: e.display_value || ""
		}), (e.warnings || []).map((e) => /* @__PURE__ */ (0, q.jsx)("span", {
			className: "text-body-2-regular text-status-yellow-text",
			children: e
		}, e))]
	});
}
function He({ row: e, fieldName: t, value: n, onChange: r, locked: i }) {
	let a = e.candidates || [];
	return a.length ? a.length === 1 ? /* @__PURE__ */ (0, q.jsxs)("div", {
		className: "flex min-w-0 flex-col gap-2",
		children: [/* @__PURE__ */ (0, q.jsxs)("div", {
			className: "flex min-w-0 flex-col gap-2 rounded-2lg bg-background-primary-default px-4 py-3",
			children: [/* @__PURE__ */ (0, q.jsx)("p", {
				className: "text-body-medium text-text-primary",
				children: Z(a[0])
			}), /* @__PURE__ */ (0, q.jsx)(Ve, { candidate: a[0] })]
		}), /* @__PURE__ */ (0, q.jsx)(X, { candidate: a[0] })]
	}) : /* @__PURE__ */ (0, q.jsx)(Le, {
		"aria-label": `${t || "资料"}的来源`,
		value: n,
		isDisabled: i,
		onChange: r,
		children: /* @__PURE__ */ (0, q.jsx)("div", {
			className: "flex min-w-0 flex-col gap-3",
			children: a.map((e) => /* @__PURE__ */ (0, q.jsxs)("div", {
				className: "flex min-w-0 flex-col gap-1",
				children: [/* @__PURE__ */ (0, q.jsx)(Re, {
					value: e.candidate_key,
					className: "relative items-start",
					title: /* @__PURE__ */ (0, q.jsx)("span", {
						title: Z(e),
						children: Z(e)
					}),
					description: /* @__PURE__ */ (0, q.jsx)(Ve, { candidate: e })
				}), /* @__PURE__ */ (0, q.jsx)(X, { candidate: e })]
			}, e.candidate_key))
		})
	}) : null;
}
function Ue({ genre: e, tags: t, locked: n, toast: r }) {
	let [i, a] = (0, K.useState)(""), [s, c] = (0, K.useState)(""), l = ke({
		mutationFn: (t) => ge(e, t),
		onSuccess: async (t, n) => {
			t.ok ? (r(n ? `已把「${e}」收录为标签「${n}」` : `已把「${e}」判为非内容标签`), await _e()) : c(t.error || "服务端拒绝了这次收录");
		},
		onError: (e) => c(B(e))
	}), u = () => {
		let e = i.trim();
		e ? (c(""), l.mutate(e)) : c("先给它一个中文标签");
	};
	return /* @__PURE__ */ (0, q.jsxs)("div", {
		className: "flex flex-wrap items-center gap-2",
		children: [
			/* @__PURE__ */ (0, q.jsx)("b", {
				lang: "ja",
				className: "text-body-medium text-text-primary",
				children: e
			}),
			/* @__PURE__ */ (0, q.jsx)(M, {
				"aria-label": `「${e}」收录成的中文标签`,
				value: i,
				onChange: a,
				maxLength: 40,
				isDisabled: n || l.isPending,
				className: "min-w-40 flex-1",
				children: /* @__PURE__ */ (0, q.jsx)(y, {
					size: "small",
					list: t.length ? Y : void 0,
					autoComplete: "off",
					placeholder: "中文标签",
					onKeyDown: (e) => {
						e.key !== "Enter" || e.nativeEvent.isComposing || (e.preventDefault(), u());
					}
				})
			}),
			/* @__PURE__ */ (0, q.jsx)(o, {
				variant: "secondary",
				size: "small",
				disabled: n || l.isPending,
				onClick: u,
				children: "收录"
			}),
			/* @__PURE__ */ (0, q.jsx)(o, {
				variant: "secondary",
				size: "small",
				disabled: n || l.isPending,
				onClick: () => {
					c(""), l.mutate("");
				},
				children: "不是内容"
			}),
			s ? /* @__PURE__ */ (0, q.jsx)("p", {
				role: "status",
				className: "w-full text-body-2-regular text-text-error-primary",
				children: s
			}) : null
		]
	});
}
function We({ row: e, tags: t, locked: n, toast: r }) {
	let i = he(e);
	return i.length ? /* @__PURE__ */ (0, q.jsxs)("div", {
		role: "group",
		"aria-label": "未收录 genre",
		className: "flex flex-col gap-2 border-t border-separator-border pt-4",
		children: [/* @__PURE__ */ (0, q.jsx)("h5", {
			className: "text-body-2-medium text-text-secondary",
			children: `未收录 genre · ${i.length}`
		}), /* @__PURE__ */ (0, q.jsx)("div", {
			role: "list",
			className: "flex flex-col",
			children: i.map((e, i) => /* @__PURE__ */ (0, q.jsx)("div", {
				role: "listitem",
				className: `py-3 first:pt-0 last:pb-0 ${i ? "border-t border-separator-border" : ""}`,
				children: /* @__PURE__ */ (0, q.jsx)(Ue, {
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
var Q = (e = "") => /^https?:\/\//i.test(e) ? e : "", $ = (e = "") => Q(e) || (e.startsWith("/") && !e.startsWith("//") ? e : "");
function Ge({ url: e }) {
	let t = $(e || "");
	return /* @__PURE__ */ (0, q.jsx)(Ke, { source: t }, t);
}
function Ke({ source: e }) {
	let [t, n] = (0, K.useState)("idle");
	return (0, K.useEffect)(() => {
		if (t !== "loading") return;
		let e = setTimeout(() => n("failed"), 3e4);
		return () => clearTimeout(e);
	}, [t]), /* @__PURE__ */ (0, q.jsxs)("div", {
		className: "relative flex h-review-image items-center justify-center overflow-hidden rounded-surface bg-background-secondary-default",
		children: [t === "loading" ? /* @__PURE__ */ (0, q.jsxs)("span", {
			role: "status",
			className: "absolute flex items-center gap-2 text-body-2-regular text-text-secondary",
			children: [/* @__PURE__ */ (0, q.jsx)("span", { dangerouslySetInnerHTML: { __html: W("正在加载图片") } }), "正在加载图片"]
		}) : null, e && (t === "loading" || t === "ready") ? /* @__PURE__ */ (0, q.jsx)("img", {
			src: e,
			alt: "来源提供的备选图片",
			referrerPolicy: "no-referrer",
			decoding: "async",
			className: `size-full object-contain ${t === "loading" ? "invisible" : ""}`,
			onLoad: () => n("ready"),
			onError: () => n("failed")
		}) : e ? /* @__PURE__ */ (0, q.jsxs)("div", {
			className: "flex flex-col items-center gap-2",
			children: [t === "failed" ? /* @__PURE__ */ (0, q.jsx)("span", {
				className: "text-body-2-regular text-text-secondary",
				children: "未取得来源图片"
			}) : null, /* @__PURE__ */ (0, q.jsx)(o, {
				variant: "secondary",
				size: "small",
				"aria-label": t === "failed" ? "立即重试加载来源图片" : void 0,
				onClick: () => n("loading"),
				children: t === "failed" ? "立即重试" : "查看来源图片"
			})]
		}) : /* @__PURE__ */ (0, q.jsx)("span", {
			className: "text-body-2-regular text-text-secondary",
			children: "未取得来源图片"
		})]
	});
}
function qe({ asset: e, openItem: t }) {
	let n = e.name || "";
	return /* @__PURE__ */ (0, q.jsxs)("div", {
		className: "flex min-w-0 items-center gap-3",
		children: [/* @__PURE__ */ (0, q.jsxs)("button", {
			type: "button",
			onClick: () => t(e.id),
			className: "flex aspect-card-cover w-20 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-2lg bg-background-tertiary-default outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring",
			children: [e.preview_url ? /* @__PURE__ */ (0, q.jsx)("img", {
				src: e.preview_url,
				alt: "",
				loading: "lazy",
				className: "size-full object-cover"
			}) : /* @__PURE__ */ (0, q.jsx)("span", {
				className: "text-caption-1-regular text-text-secondary",
				children: "无封面"
			}), /* @__PURE__ */ (0, q.jsx)(r, { children: `打开原视频 ${n}` })]
		}), /* @__PURE__ */ (0, q.jsxs)("div", {
			className: "flex min-w-0 flex-col items-start gap-1",
			children: [/* @__PURE__ */ (0, q.jsx)("b", {
				title: n,
				className: "w-full truncate text-body-medium text-text-primary",
				children: e.code || n || "原视频"
			}), /* @__PURE__ */ (0, q.jsx)(o, {
				variant: "secondary",
				size: "small",
				leadingIcon: v,
				onClick: () => t(e.id),
				children: "打开原视频"
			})]
		})]
	});
}
function Je({ kind: e, name: t, works: n, avatar: r, openEntity: i }) {
	return /* @__PURE__ */ (0, q.jsxs)("div", {
		className: "flex min-w-0 items-center gap-3",
		children: [/* @__PURE__ */ (0, q.jsx)("button", {
			type: "button",
			"aria-label": `打开创作者页：${t}`,
			onClick: () => i(e, t),
			className: `relative inline-grid size-11 shrink-0 cursor-pointer place-items-center overflow-hidden rounded-full bg-background-secondary-default text-caption-1-medium text-text-secondary outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring ${Ne}`,
			dangerouslySetInnerHTML: { __html: r }
		}), /* @__PURE__ */ (0, q.jsxs)("div", {
			className: "flex min-w-0 flex-col items-start",
			children: [/* @__PURE__ */ (0, q.jsx)("button", {
				type: "button",
				onClick: () => i(e, t),
				className: "max-w-full cursor-pointer truncate text-body-medium text-text-primary underline-offset-2 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-border-focus-ring",
				children: t
			}), n ? /* @__PURE__ */ (0, q.jsx)("small", {
				className: "tabular-nums text-body-2-regular text-text-secondary",
				children: `${n.toLocaleString()} 部作品`
			}) : null]
		})]
	});
}
function Ye({ row: e, openItem: t, openEntity: n, onReveal: r, revealing: i, note: a }) {
	let c = Q(e.profile_url || ""), l = (e.preview_assets || []).slice(0, 6), u = Math.max(0, Number(e.video_count || e.videos || 0));
	return /* @__PURE__ */ (0, q.jsxs)("section", {
		className: "flex flex-col gap-3",
		children: [
			/* @__PURE__ */ (0, q.jsx)("h5", {
				className: "text-body-medium text-text-primary",
				children: `待确认人物：${e.babepedia_name || "未标注"}`
			}),
			/* @__PURE__ */ (0, q.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [c ? /* @__PURE__ */ (0, q.jsx)(s, {
					variant: "secondary",
					size: "small",
					trailingIcon: N,
					href: c,
					target: "_blank",
					rel: "noopener noreferrer",
					children: "来源资料"
				}) : null, /* @__PURE__ */ (0, q.jsx)(o, {
					variant: "secondary",
					size: "small",
					onClick: () => n("creator", e.creator || ""),
					children: `查看全部 ${u.toLocaleString()} 部作品`
				})]
			}),
			/* @__PURE__ */ (0, q.jsx)(Ge, { url: e.preview_url }),
			/* @__PURE__ */ (0, q.jsx)("p", {
				className: "text-body-2-regular text-text-secondary",
				children: "通过后记录身份判断。"
			}),
			l.length ? /* @__PURE__ */ (0, q.jsxs)(q.Fragment, { children: [/* @__PURE__ */ (0, q.jsx)("h5", {
				className: "text-body-medium text-text-primary",
				children: "本地作品样本"
			}), /* @__PURE__ */ (0, q.jsx)("ul", {
				className: "flex flex-col gap-1",
				children: l.map((e) => /* @__PURE__ */ (0, q.jsxs)("li", {
					className: "flex min-w-0 items-center gap-2",
					children: [/* @__PURE__ */ (0, q.jsx)(o, {
						variant: "ghost",
						size: "small",
						className: "min-w-0",
						onClick: () => t(e.id),
						children: /* @__PURE__ */ (0, q.jsx)("span", {
							title: e.name,
							className: "block max-w-full truncate",
							children: e.name
						})
					}), /* @__PURE__ */ (0, q.jsx)(o, {
						variant: "ghost",
						size: "small",
						"aria-label": `打开 ${e.name} 的文件位置`,
						...I(i === e.id),
						onClick: () => r(e.id),
						children: "文件位置"
					})]
				}, e.id))
			})] }) : /* @__PURE__ */ (0, q.jsx)("p", {
				className: "text-body-2-regular text-text-secondary",
				children: "暂无本地作品样本，打开全部作品核对。"
			}),
			a ? /* @__PURE__ */ (0, q.jsx)("p", {
				role: "status",
				className: "text-body-2-regular text-text-error-primary",
				children: a
			}) : null
		]
	});
}
function Xe({ assets: e, picked: t, onPicked: n, locked: i }) {
	let [a, o] = (0, K.useState)(null), s = new Set(t), c = (t, r) => {
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
	return /* @__PURE__ */ (0, q.jsxs)("div", {
		className: "flex flex-col gap-2",
		children: [/* @__PURE__ */ (0, q.jsx)(A, {
			prefix: /* @__PURE__ */ (0, q.jsx)("span", {
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
		}), /* @__PURE__ */ (0, q.jsx)("div", {
			className: "review-asset-grid gap-1.5",
			children: e.map((e, t) => {
				let n = s.has(e.id);
				return /* @__PURE__ */ (0, q.jsxs)("button", {
					type: "button",
					"aria-pressed": n,
					title: e.name,
					onClick: (e) => c(t, e.shiftKey),
					className: `relative aspect-card-cover cursor-pointer overflow-hidden rounded-surface bg-background-tertiary-default outline-none transition-opacity focus-visible:ring-2 focus-visible:ring-border-focus-ring ${n ? "opacity-100 ring-2 ring-border-button-active ring-inset" : "opacity-50"}`,
					children: [
						/* @__PURE__ */ (0, q.jsx)("img", {
							src: `/poster?id=${e.id}&c=4`,
							alt: "",
							loading: "lazy",
							className: "size-full object-cover"
						}),
						/* @__PURE__ */ (0, q.jsx)("span", {
							className: "absolute top-1 right-1",
							children: /* @__PURE__ */ (0, q.jsx)(l, {
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
						/* @__PURE__ */ (0, q.jsx)(r, { children: `${n ? "已选" : "未选"} ${e.name || e.id}` })
					]
				}, e.id);
			})
		})]
	});
}
// src/react/review/review-card.tsx
var Ze = L({
	variant: "filled",
	padding: "none",
	bordered: "soft",
	className: "flex flex-col overflow-hidden"
}), Qe = "flex min-h-6 min-w-0 items-center", $e = 2, et = (e) => e === "western_identity" ? "h-review-card-tall" : "h-review-card";
function tt(e) {
	let { category: t, row: n, choice: r, onChoice: i, selected: a, onSelect: s, locked: l, busy: d, problem: f, genreTags: ee, onDecide: h, handlers: _, queueView: v = "pending" } = e, y = (0, K.useRef)(!1), x = Ae(), S = t === "metadata_fields", w = p[t] || "", T = String(n.creator || "").trim(), E = !!w && !!T, D = U(t, n), O = we(t, n), k = Te(t, n), A = Ce(n), j = H(n), M = ne(t, n), N = n.comparison_assets || [], P = n.preview_assets || [], L = C[n.decision || ""], R = N.length > 1 ? /* @__PURE__ */ (0, q.jsxs)("div", {
		className: "flex flex-col gap-3",
		children: [N.slice(0, $e).map((e) => /* @__PURE__ */ (0, q.jsx)(qe, {
			asset: e,
			openItem: _.openItem
		}, e.id)), N.length > $e ? /* @__PURE__ */ (0, q.jsx)("p", {
			className: "text-body-2-regular text-text-secondary",
			children: `另有 ${(N.length - $e).toLocaleString()} 部对照作品`
		}) : null]
	}) : E ? /* @__PURE__ */ (0, q.jsx)(Je, {
		kind: w,
		name: T,
		works: Number(n.video_count || n.videos || 0),
		openEntity: _.openEntity,
		avatar: F(T, n.entity_id ? {
			id: n.entity_id,
			has_image: !!n.has_image,
			image_version: n.image_version,
			avatar_focus: n.avatar_focus
		} : null, null, w)
	}) : n.asset_id ? /* @__PURE__ */ (0, q.jsx)(qe, {
		openItem: _.openItem,
		asset: {
			id: n.asset_id,
			name: n.asset_name,
			code: n.code,
			preview_url: n.asset_preview_url
		}
	}) : null, re = S ? /* @__PURE__ */ (0, q.jsx)(He, {
		row: n,
		fieldName: O,
		value: r.candidateKey,
		onChange: (e) => i({
			...r,
			candidateKey: e
		}),
		locked: l
	}) : t === "creator_tags" ? P.length ? /* @__PURE__ */ (0, q.jsx)(Xe, {
		assets: P,
		picked: r.assets,
		locked: l,
		onPicked: (e) => i({
			...r,
			assets: e
		})
	}) : /* @__PURE__ */ (0, q.jsx)(te, {
		size: "compact",
		icon: m,
		title: "这批作品尚未抽帧",
		children: `${n.video_count || ""} 条作品还没有可用预览；批准后仍会按所选资料写入标签。`
	}) : t === "fc2_similarity" ? null : t === "western_identity" ? /* @__PURE__ */ (0, q.jsx)(Ye, {
		row: n,
		openItem: _.openItem,
		openEntity: _.openEntity,
		onReveal: _.onReveal,
		revealing: _.revealing,
		note: _.revealNote
	}) : /* @__PURE__ */ (0, q.jsx)(Ge, { url: n.preview_url }), ie = E ? R : O ? /* @__PURE__ */ (0, q.jsxs)("h4", {
		className: z(Qe, "flex-wrap gap-2"),
		children: [/* @__PURE__ */ (0, q.jsx)("span", {
			title: O,
			className: "flex max-w-full min-w-0 overflow-hidden rounded-md",
			children: /* @__PURE__ */ (0, q.jsx)(u, {
				variant: "caption",
				color: "neutral",
				children: O
			})
		}), /* @__PURE__ */ (0, q.jsx)("span", {
			title: k,
			className: "min-w-0 truncate text-body-medium text-text-primary",
			children: k
		})]
	}) : /* @__PURE__ */ (0, q.jsx)("h4", {
		className: Qe,
		children: /* @__PURE__ */ (0, q.jsx)("span", {
			title: D,
			className: "min-w-0 truncate text-body-medium text-text-primary",
			children: D
		})
	});
	return /* @__PURE__ */ (0, q.jsxs)("section", {
		"aria-label": D,
		"data-review-key": n.item_key,
		className: z(Ze, et(t)),
		children: [
			/* @__PURE__ */ (0, q.jsxs)("header", {
				className: "flex min-w-0 shrink-0 items-center gap-2 border-b border-separator-border px-5 py-4",
				children: [
					l ? null : /* @__PURE__ */ (0, q.jsx)("span", {
						className: z(Qe, "shrink-0"),
						onPointerDownCapture: (e) => {
							y.current = e.shiftKey;
						},
						onKeyDownCapture: (e) => {
							y.current = e.shiftKey;
						},
						children: /* @__PURE__ */ (0, q.jsx)(c, {
							isSelected: a,
							"aria-label": `选择 ${D}`,
							onChange: (e) => s(y.current, e)
						})
					}),
					/* @__PURE__ */ (0, q.jsx)("div", {
						className: "min-w-0 flex-1",
						children: ie
					}),
					L ? /* @__PURE__ */ (0, q.jsx)(u, {
						variant: "caption",
						color: "neutral",
						children: L
					}) : null
				]
			}),
			/* @__PURE__ */ (0, q.jsx)("div", {
				className: "relative flex min-w-0 min-h-0 flex-1 flex-col",
				children: /* @__PURE__ */ (0, q.jsxs)("div", {
					ref: x,
					className: "flex min-w-0 min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-5 py-4",
					children: [
						n.source_name ? /* @__PURE__ */ (0, q.jsx)("p", {
							className: "text-body-2-regular text-text-secondary",
							children: `来源写法：${n.source_name}`
						}) : null,
						!E && (n.board || n.assets) ? /* @__PURE__ */ (0, q.jsx)("p", {
							className: "text-body-2-regular text-text-secondary",
							children: `对照文件：${Number(n.video_count || n.assets || 0).toLocaleString()}`
						}) : null,
						!E && R ? R : null,
						S && (A || n.current_value !== void 0) ? /* @__PURE__ */ (0, q.jsxs)("div", {
							role: "region",
							"aria-label": "当前信息",
							className: "flex min-w-0 flex-col gap-1 border-b border-separator-border pb-4",
							children: [
								/* @__PURE__ */ (0, q.jsxs)("div", {
									className: "flex flex-wrap items-center gap-2",
									children: [/* @__PURE__ */ (0, q.jsx)("h5", {
										"data-copy-key": "review.card.current_value",
										className: "text-caption-1-medium text-text-secondary",
										children: "当前值"
									}), n.current_owner?.startsWith("user:") || n.current_owner?.startsWith("review:") ? /* @__PURE__ */ (0, q.jsx)(u, {
										variant: "caption",
										color: "neutral",
										children: "人工确认"
									}) : null]
								}),
								/* @__PURE__ */ (0, q.jsx)("p", {
									className: "text-body-2-regular text-text-primary wrap-anywhere",
									children: n.current_value === void 0 ? A : n.current_value || "尚无资料"
								}),
								n.videos === void 0 ? null : /* @__PURE__ */ (0, q.jsx)("p", {
									className: "text-caption-1-regular text-text-secondary",
									children: `${Number(n.videos).toLocaleString()} 个${n.asset_path ? "匹配文件" : "同番号文件"}`
								})
							]
						}) : null,
						j.length || t === "creator_tags" ? /* @__PURE__ */ (0, q.jsx)("div", {
							className: "flex flex-wrap gap-1",
							children: j.length ? j.map((e) => /* @__PURE__ */ (0, q.jsx)(u, {
								variant: "caption",
								color: "soft",
								children: e
							}, e)) : /* @__PURE__ */ (0, q.jsx)("small", {
								className: "text-body-2-regular text-text-secondary",
								children: "暂无待确认标签"
							})
						}) : null,
						S ? /* @__PURE__ */ (0, q.jsxs)("h5", {
							className: "text-caption-1-medium text-text-secondary",
							children: [/* @__PURE__ */ (0, q.jsx)("span", {
								"data-copy-key": "review.card.candidate_sources",
								children: "候选来源"
							}), ` · ${n.candidates?.length || 0}`]
						}) : null,
						re,
						/* @__PURE__ */ (0, q.jsx)(We, {
							row: n,
							tags: ee,
							locked: l,
							toast: _.toast
						}),
						!S && A ? /* @__PURE__ */ (0, q.jsx)("p", {
							className: "text-body-2-regular text-text-secondary wrap-anywhere",
							children: A
						}) : null
					]
				})
			}),
			/* @__PURE__ */ (0, q.jsxs)("footer", {
				className: z(g.stack, "shrink-0"),
				children: [
					v === "ignored" ? null : /* @__PURE__ */ (0, q.jsx)(b, {
						variant: "secondary",
						size: "small",
						className: "me-auto",
						disabled: l,
						...I(d),
						onClick: () => h("rejected"),
						children: "忽略"
					}),
					v === "pending" ? /* @__PURE__ */ (0, q.jsx)(o, {
						variant: "secondary",
						size: "small",
						disabled: l,
						...I(d),
						onClick: () => h("skipped"),
						children: "稍后处理"
					}) : /* @__PURE__ */ (0, q.jsx)(o, {
						variant: v === "ignored" ? "primary" : "secondary",
						size: "small",
						disabled: l,
						...I(d),
						onClick: () => h("restore"),
						children: "恢复待处理"
					}),
					v === "ignored" ? null : /* @__PURE__ */ (0, q.jsx)(o, {
						variant: "primary",
						size: "small",
						disabled: l || !M,
						...I(d),
						title: M ? void 0 : "没有可采用的资料，可先保留或忽略",
						onClick: () => h("approved"),
						children: M ? "通过" : "不可通过"
					}),
					f ? /* @__PURE__ */ (0, q.jsx)("p", {
						role: "status",
						className: "w-full text-body-2-regular text-text-error-primary",
						children: f
					}) : null
				]
			})
		]
	});
}
// src/react/review/review-page.tsx
var nt = "flex cursor-pointer items-center justify-between gap-2";
function rt({ page: e, pages: t, onPage: n }) {
	return t <= 1 ? null : /* @__PURE__ */ (0, q.jsxs)("nav", {
		"aria-label": "复核分页",
		"data-pagination-layout": "",
		className: "inline-grid w-full min-w-0 items-center gap-2",
		children: [
			/* @__PURE__ */ (0, q.jsx)(o, {
				variant: "secondary",
				size: "small",
				disabled: e <= 1,
				onClick: () => n(e - 1),
				children: "上一页"
			}),
			/* @__PURE__ */ (0, q.jsx)("ul", {
				className: "flex min-w-0 flex-wrap items-center justify-center gap-1",
				children: me(e, t).map((t, r) => /* @__PURE__ */ (0, q.jsx)("li", { children: t === "…" ? /* @__PURE__ */ (0, q.jsx)("span", {
					"aria-hidden": !0,
					className: "px-1 text-body-2-regular text-text-tertiary",
					children: "…"
				}) : /* @__PURE__ */ (0, q.jsx)(o, {
					variant: t === e ? "secondary" : "ghost",
					size: "small",
					"aria-label": `第 ${t} 页`,
					"aria-current": t === e ? "page" : void 0,
					onClick: () => n(Number(t)),
					children: t
				}) }, t === "…" ? `dots-${r}` : t))
			}),
			/* @__PURE__ */ (0, q.jsx)(o, {
				variant: "secondary",
				size: "small",
				disabled: e >= t,
				onClick: () => n(e + 1),
				children: "下一页"
			})
		]
	});
}
function it(r) {
	let [i, a] = (0, K.useState)(() => matchMedia("(max-width:900px)").matches);
	(0, K.useEffect)(() => {
		let e = matchMedia("(max-width:900px)"), t = () => a(e.matches);
		return e.addEventListener("change", t), () => e.removeEventListener("change", t);
	}, []);
	let { route: s, openItem: c, openEntity: l, revealSource: u, toast: d, readOnly: f, readOnlyMessage: p, writerUrl: m } = r, [g, _] = (0, K.useState)(ue(r.category) ? r.category : ee), [v, y] = (0, K.useState)(() => xe(r.queue)), [b, C] = (0, K.useState)("candidates"), [O, k] = (0, K.useState)(""), [A, j] = (0, K.useState)(1), [M, N] = (0, K.useState)(/* @__PURE__ */ new Set()), [P, F] = (0, K.useState)(/* @__PURE__ */ new Map()), [I, L] = (0, K.useState)(/* @__PURE__ */ new Map()), [R, z] = (0, K.useState)(""), de = (0, K.useRef)(null), [me, he] = (0, K.useState)(0), [ge, _e] = (0, K.useState)(""), ve = (0, K.useRef)(!0);
	(0, K.useEffect)(() => () => {
		ve.current = !1;
	}, []);
	let V = je({
		queryKey: w,
		queryFn: ({ signal: e }) => se(e)
	}), Ce = V.data || {
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
	}, we = be(Ce, v), Te = V.data ? Object.fromEntries(E.map((e) => [e, S.reduce((t, n) => t + Number(be(Ce, e).counts[n] || 0), 0)])) : void 0, H = we.sections[g] || [], U = g === "metadata_fields", W = f;
	(0, K.useEffect)(() => {
		let e = new Set(H.map((e) => e.item_key));
		N((t) => {
			let n = [...t].filter((t) => e.has(t));
			return n.length === t.size ? t : new Set(n);
		}), F((t) => {
			let n = [...t].filter(([t]) => e.has(t));
			return n.length === t.size ? t : new Map(n);
		}), L((t) => {
			let n = [...t].filter(([t]) => e.has(t));
			return n.length === t.size ? t : new Map(n);
		});
	}, [H]);
	let Ae = (0, K.useMemo)(() => ye(H, U), [H, U]), G = Ae.some(([e]) => e === b) ? b : "candidates", Ne = (0, K.useMemo)(() => le(H, G), [H, G]), Ie = Ne.some((e) => e.key === O) ? O : "", J = (0, K.useMemo)(() => Se(ce(H, G, Ie), A), [
		H,
		G,
		Ie,
		A
	]), Le = J.rows.map((e) => e.item_key), Re = new Set(Le), ze = Ne.map((e) => ({
		...e,
		rows: e.rows.filter((e) => Re.has(e.item_key))
	})).filter((e) => e.rows.length), Y = (e) => P.get(e.item_key) || oe(e), X = (0, K.useMemo)(() => H.filter((e) => M.has(e.item_key)), [H, M]), Z = (e) => {
		let t = new Set(e);
		N((e) => new Set([...e].filter((e) => !t.has(e)))), F((e) => new Map([...e].filter(([e]) => !t.has(e)))), L((e) => new Map([...e].filter(([e]) => !t.has(e))));
	}, Ve = (e, t) => L((n) => new Map(n).set(e, t)), He = () => {
		C("candidates"), k(""), j(1), N(/* @__PURE__ */ new Set()), F(/* @__PURE__ */ new Map()), L(/* @__PURE__ */ new Map()), z(""), de.current = null;
	}, Ue = (e) => {
		_(e), He(), s({
			category: e === "metadata_fields" ? "" : e,
			queue: v === "pending" ? "" : v
		});
	}, We = (e) => {
		y(e), He(), s({
			category: g === "metadata_fields" ? "" : g,
			queue: e === "pending" ? "" : e
		});
	}, Q = ke({
		mutationFn: ({ row: e, status: t, category: n }) => Oe(ie(n, re(n, e), t, Y(e))),
		onSuccess: (e, { row: t, status: n, category: r }) => {
			e.ok ? (De(r, [t.item_key], n), Z([t.item_key]), d(ae(n))) : Ve(t.item_key, e.error || "服务端拒绝了这次判定");
		},
		onError: (e, { row: t }) => Ve(t.item_key, B(e))
	}), $ = ke({
		mutationFn: async ({ status: e, category: t, rows: n }) => {
			let r = [], i = [];
			for (let [a, o] of n.entries()) {
				if (!ve.current) break;
				z(`正在处理 ${a} / ${n.length}`);
				try {
					let n = await Oe(ie(t, re(t, o), e, Y(o)));
					if (!n.ok) throw Error(n.error || "服务端未采用该项");
					r.push(o.item_key);
				} catch (e) {
					i.push([o.item_key, B(e)]);
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
			De(t, n, e), Z(n), r.forEach(([e, t]) => Ve(e, t)), z("");
			let i = {
				approved: "通过",
				rejected: "忽略",
				skipped: "移至稍后处理",
				restore: "恢复待处理"
			}[e];
			d(`已${i} ${n.length} 项` + (r.length ? `，${r.length} 项未完成` : ""));
		},
		onError: (e) => {
			z(B(e));
		}
	}), Ge = (e) => {
		!$.isPending && X.length && (e === "approved" && U && X.some((e) => !Y(e).candidateKey) ? z("请先为所选资料选择要采用的来源。") : (z(""), $.mutate({
			status: e,
			category: g,
			rows: X
		})));
	}, Ke = (e) => {
		F((t) => {
			let n = new Map(t);
			for (let t of X) {
				let r = t.candidates?.find((t) => t.source === e);
				r && n.set(t.item_key, {
					...Y(t),
					candidateKey: r.candidate_key
				});
			}
			return n;
		}), z(`已选择 ${e}，点击通过所选采用。`);
	}, qe = async (e) => {
		if (me) return;
		he(e), _e("");
		let t = await u(e);
		ve.current && (he(0), _e(t));
	}, Je = pe(Ce.mirror, p), Ye = Ce.genre_tags || [], Xe = {
		openItem: c,
		openEntity: l,
		onReveal: qe,
		revealing: me,
		revealNote: ge,
		toast: d
	};
	return /* @__PURE__ */ (0, q.jsx)(Me, { children: /* @__PURE__ */ (0, q.jsxs)("div", {
		className: "flex flex-col gap-5 pb-10",
		children: [
			W ? /* @__PURE__ */ (0, q.jsx)(x, {
				tone: "warning",
				title: "本机只能浏览",
				extra: m ? /* @__PURE__ */ (0, q.jsx)("p", {
					className: "text-body-2-regular",
					children: /* @__PURE__ */ (0, q.jsx)(h, {
						href: m,
						children: "前往写入端复核"
					})
				}) : void 0,
				children: Je
			}) : null,
			/* @__PURE__ */ (0, q.jsx)(Be, { tags: Ye }),
			/* @__PURE__ */ (0, q.jsxs)(n, {
				orientation: i ? "horizontal" : "vertical",
				selectedKey: g,
				onSelectionChange: (e) => {
					let t = String(e);
					ue(t) && Ue(t);
				},
				className: "flex flex-col gap-5 review-split:flex-row review-split:items-start review-split:gap-6",
				children: [/* @__PURE__ */ (0, q.jsxs)("div", {
					"data-section-nav": !0,
					className: "w-full min-w-0 review-split:sticky review-split:top-topbar review-split:w-review-tabs review-split:shrink-0",
					children: [/* @__PURE__ */ (0, q.jsx)("h2", {
						id: "reviewcategories",
						children: "复核分类"
					}), /* @__PURE__ */ (0, q.jsx)(Pe, {
						scrollable: i,
						"aria-labelledby": "reviewcategories",
						"data-section-items": !0,
						className: "flex review-split:flex-col review-split:items-stretch",
						children: S.map((e) => {
							let n = Number(we.counts[e] || 0);
							return /* @__PURE__ */ (0, q.jsxs)(t, {
								id: e,
								className: nt,
								isDisabled: Q.isPending || $.isPending,
								"data-pill-selected": g === e ? "" : void 0,
								"data-pill-variant": "gray",
								children: [T[e], n ? /* @__PURE__ */ (0, q.jsx)("span", {
									className: "tabular-nums text-caption-1-medium text-text-secondary",
									children: n.toLocaleString()
								}) : null]
							}, e);
						})
					})]
				}), /* @__PURE__ */ (0, q.jsxs)(e, {
					id: g,
					className: "flex min-w-0 flex-1 flex-col gap-5",
					children: [
						/* @__PURE__ */ (0, q.jsx)(Fe, {
							queueView: v,
							queueCounts: Te,
							onQueueChange: We,
							locked: W,
							groupOptions: Ae,
							groupBy: G,
							onGroupBy: (e) => {
								C(e), k(""), j(1);
							},
							groups: Ne,
							filter: Ie,
							onFilter: (e) => {
								k(e), j(1);
							},
							pageKeys: Le,
							selected: M,
							onSelected: N,
							selectedRows: X,
							metadata: U,
							approvable: X.every((e) => ne(g, e)),
							busy: $.isPending || Q.isPending,
							feedback: R,
							onUnifySource: Ke,
							onRun: Ge
						}),
						J.rows.length ? ze.map((e) => /* @__PURE__ */ (0, q.jsxs)("section", {
							className: "flex flex-col gap-3",
							children: [ze.length > 1 || G !== "candidates" ? /* @__PURE__ */ (0, q.jsxs)("div", {
								className: "flex flex-wrap items-center gap-2",
								children: [/* @__PURE__ */ (0, q.jsx)("h3", {
									className: "text-body-medium text-text-primary",
									children: `${e.title} · ${e.rows.length}`
								}), W ? null : /* @__PURE__ */ (0, q.jsx)(o, {
									variant: "ghost",
									size: "small",
									onClick: () => {
										let t = e.rows.map((e) => e.item_key), n = t.every((e) => M.has(e)), r = new Set(M);
										for (let e of t) n ? r.delete(e) : r.add(e);
										N(r);
									},
									children: e.rows.every((e) => M.has(e.item_key)) ? "清空本组" : "全选本组"
								})]
							}) : null, /* @__PURE__ */ (0, q.jsx)("div", {
								className: "review-grid gap-5",
								children: e.rows.map((e) => /* @__PURE__ */ (0, q.jsx)(tt, {
									category: g,
									row: e,
									queueView: v,
									choice: Y(e),
									onChoice: (t) => F((n) => new Map(n).set(e.item_key, t)),
									selected: M.has(e.item_key),
									onSelect: (t, n) => N((r) => {
										let i = new Set(r);
										return de.current = Ee(i, Le, de.current, e.item_key, t, n), i;
									}),
									locked: W,
									busy: $.isPending || Q.isPending && Q.variables?.row.item_key === e.item_key,
									problem: I.get(e.item_key) || "",
									genreTags: Ye,
									onDecide: (t) => {
										Q.isPending || $.isPending || (L((t) => new Map([...t].filter(([t]) => t !== e.item_key))), Q.mutate({
											row: e,
											status: t,
											category: g
										}));
									},
									handlers: Xe
								}, e.item_key))
							})]
						}, e.key)) : V.isError && !V.data ? /* @__PURE__ */ (0, q.jsx)(x, {
							tone: "error",
							title: "复核队列读取失败",
							action: /* @__PURE__ */ (0, q.jsx)(o, {
								variant: "secondary",
								size: "small",
								disabled: V.isFetching,
								onClick: () => void V.refetch(),
								children: "立即重试"
							}),
							children: B(V.error)
						}) : /* @__PURE__ */ (0, q.jsx)(te, {
							icon: fe,
							title: `此分类没有${D[v]}项目`,
							actions: S.some((e) => e !== g && Number(we.counts[e] || 0) > 0) ? /* @__PURE__ */ (0, q.jsx)(o, {
								size: "small",
								onClick: () => {
									let e = S.find((e) => e !== g && Number(we.counts[e] || 0) > 0);
									e && Ue(e);
								},
								children: "查看其他分类"
							}) : void 0,
							children: v === "pending" ? "可切换分类查看其他待确认资料。" : `${D[v]}的资料会保留在这里，可恢复到待处理。`
						}),
						/* @__PURE__ */ (0, q.jsx)(rt, {
							page: J.page,
							pages: J.pages,
							onPage: j
						})
					]
				})]
			})
		]
	}) });
}
export { it as ReviewPage };

//# debugId=fad36fa2-5f4f-4817-a33b-a6a4487390ae