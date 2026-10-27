(function() {
	try {
		var e = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, t = new e.Error().stack;
		t && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[t] = "b5865f49-d9fa-4fba-8cef-823a4056c0b4", e._sentryDebugIdIdentifier = "sentry-dbid-b5865f49-d9fa-4fba-8cef-823a4056c0b4");
	} catch {}
})();
import { $b4f18e3395fe64d7$export$3d96ec278d3efce4 as e, $b4f18e3395fe64d7$export$3e41faf802a29e71 as t, $b4f18e3395fe64d7$export$b2539bed5023c21c as n, $ea3928288112382f$export$439d29a4e110a164 as r, $fe21c36db05242bb$export$a98f0dcb43a68a25 as i, $fe21c36db05242bb$export$d7b12c4107be0d61 as a, Button as o, ButtonLink as s, Checkbox as c, CheckboxGlyph as l, Chip as u, DEFAULT_CATEGORY as d, ENTITY_REVIEW_KINDS as f, Ea as ee, EmptyState as p, ExternalLink as m, Gg as te, InputBase as h, Note as g, PillTab as _, PillTabList as v, REVIEW_CATEGORIES as y, REVIEW_DECISION_LABELS as b, REVIEW_KEY as ne, REVIEW_LABELS as x, REVIEW_QUEUES as S, REVIEW_QUEUE_LABELS as C, Select as w, SelectItem as T, SelectionActions as E, SelectionDock as D, TextField as O, Wt as k, __toESM as A, avatarInner as j, busyProps as M, canApprove as re, cardClass as N, commonReviewSources as P, currentReviewRow as ie, decisionPayload as F, decisionReceipt as ae, defaultChoice as oe, errorMessage as I, fetchReview as se, filterReviewRows as ce, groupReviewRows as le, isReviewCategory as ue, l7 as de, m7 as fe, mirrorText as pe, paginationRange as L, pendingGenres as me, recordGenre as R, reloadReview as he, require_jsx_runtime as ge, require_react as _e, reviewGroupingOptions as ve, reviewQueueData as ye, reviewQueueOf as be, reviewWindow as xe, rowEvidence as Se, rowFieldName as Ce, rowSubject as we, rowTags as z, rowTitle as B, selectReviewRange as Te, settleReviewRows as Ee, spinnerHtml as V, submitDecision as De, useMutation as Oe, useOverlayScrollbar as ke, useQuery as Ae } from "./peach-app.js";
import { Page as je } from "./peach-app.page-QAncjzM1.js";
import { LEGACY_AVATAR_IMG as H } from "./peach-app.legacy-avatar-NSITxLRS.js";
import { PillAriaTabList as Me } from "./peach-app.pill-aria-tab-list-BMY1ZEv1.js";
// src/react/review/bulk-toolbar.tsx
var U = /* @__PURE__ */ A(_e(), 1), W = ge();
function Ne(e) {
	let { groupOptions: t, groupBy: n, onGroupBy: r, groups: i, filter: a, onFilter: s, pageKeys: c, selected: l, onSelected: u, selectedRows: d, metadata: f, approvable: ee, busy: p, feedback: m, onUnifySource: te, onRun: h, queueView: g = "pending", queueCounts: y, onQueueChange: b, locked: ne } = e, x = c.filter((e) => l.has(e)), E = x.length > 0 && x.length === c.length, O = P(d), k = f && d.some((e) => (e.candidates?.length || 0) > 1), A = O.length ? "统一选择来源" : "所选项目无共同来源";
	return /* @__PURE__ */ (0, W.jsxs)(W.Fragment, { children: [/* @__PURE__ */ (0, W.jsxs)("div", {
		role: "group",
		"aria-label": "复核筛选",
		"data-review-filter": !0,
		"data-glass-pane": "",
		className: "sticky top-topbar z-10 flex flex-wrap items-center gap-2 p-3",
		children: [/* @__PURE__ */ (0, W.jsx)(v, {
			"aria-label": "复核状态",
			"data-pill-nav": "",
			className: "flex max-w-full flex-nowrap gap-1 overflow-x-auto",
			children: S.map((e) => /* @__PURE__ */ (0, W.jsxs)(_, {
				variant: "gray",
				isSelected: g === e,
				disabled: p,
				onSelect: () => {
					e !== g && b(e);
				},
				children: [
					/* @__PURE__ */ (0, W.jsx)("span", {
						"data-copy-key": `review.queue.${e}`,
						children: C[e]
					}),
					" ",
					/* @__PURE__ */ (0, W.jsx)("span", {
						className: "tabular-nums text-caption-1-medium text-text-secondary",
						children: y ? y[e].toLocaleString() : "…"
					})
				]
			}, e))
		}), c.length ? /* @__PURE__ */ (0, W.jsxs)(W.Fragment, { children: [
			/* @__PURE__ */ (0, W.jsx)(w, {
				"aria-label": "筛选分组方式",
				size: "sm",
				selectedKey: n,
				onSelectionChange: (e) => {
					e !== null && r(String(e));
				},
				children: t.map(([e, t]) => /* @__PURE__ */ (0, W.jsx)(T, {
					id: e,
					children: t
				}, e))
			}),
			i.length > 1 ? /* @__PURE__ */ (0, W.jsxs)(w, {
				"aria-label": n === "field" ? "筛选字段分类" : "筛选当前分类",
				size: "sm",
				prefix: "分类",
				selectedKey: a || "*",
				onSelectionChange: (e) => {
					e !== null && s(String(e) === "*" ? "" : String(e));
				},
				children: [/* @__PURE__ */ (0, W.jsx)(T, {
					id: "*",
					children: "全部"
				}), i.map((e) => /* @__PURE__ */ (0, W.jsx)(T, {
					id: e.key,
					children: `${e.title} · ${e.rows.length}`
				}, e.key))]
			}) : null,
			ne ? null : /* @__PURE__ */ (0, W.jsx)(o, {
				variant: "secondary",
				size: "small",
				leadingIcon: de,
				"aria-pressed": E,
				disabled: p || !c.length,
				onClick: () => {
					let e = new Set(l);
					for (let t of c) E ? e.delete(t) : e.add(t);
					u(e);
				},
				children: E ? "清空当前选择" : a ? "全选当前分类" : "全选本页"
			})
		] }) : null]
	}), /* @__PURE__ */ (0, W.jsxs)(D, {
		label: "复核所选项目",
		visible: !ne && l.size > 0,
		count: `已选 ${l.size} 项`,
		children: [
			k && g !== "ignored" ? /* @__PURE__ */ (0, W.jsxs)(w, {
				"aria-label": "统一选择来源",
				size: "sm",
				selectedKey: "",
				isDisabled: p || !O.length,
				onSelectionChange: (e) => {
					e !== null && e !== "" && te(String(e));
				},
				children: [/* @__PURE__ */ (0, W.jsx)(T, {
					id: "",
					children: A
				}), O.map((e) => /* @__PURE__ */ (0, W.jsx)(T, {
					id: e,
					children: e
				}, e))]
			}) : null,
			g === "ignored" ? null : /* @__PURE__ */ (0, W.jsx)(o, {
				variant: "ghost",
				size: "small",
				disabled: p || !l.size,
				onClick: () => h("rejected"),
				children: "忽略所选"
			}),
			g === "pending" ? /* @__PURE__ */ (0, W.jsx)(o, {
				variant: "secondary",
				size: "small",
				disabled: p || !l.size,
				onClick: () => h("skipped"),
				children: "稍后处理所选"
			}) : /* @__PURE__ */ (0, W.jsx)(o, {
				variant: g === "ignored" ? "primary" : "secondary",
				size: "small",
				disabled: p || !l.size,
				onClick: () => h("restore"),
				children: "恢复所选"
			}),
			g === "ignored" ? null : /* @__PURE__ */ (0, W.jsx)(o, {
				variant: "primary",
				size: "small",
				disabled: p || !l.size || !ee,
				onClick: () => h("approved"),
				children: "通过所选"
			}),
			/* @__PURE__ */ (0, W.jsx)(o, {
				variant: "ghost",
				size: "small",
				disabled: p,
				onClick: () => u(/* @__PURE__ */ new Set()),
				children: "取消选择"
			}),
			m ? /* @__PURE__ */ (0, W.jsx)("p", {
				role: "status",
				className: "w-full text-body-2-regular text-text-secondary",
				children: m
			}) : null
		]
	})] });
}
// src/react/review/candidate-form.tsx
var Pe = {
	title: "标题",
	original_title: "原标题",
	runtime: "来源时长",
	director: "导演",
	label: "Label",
	poster_url: "海报",
	cover_url: "封面",
	screenshot_urls: "截图",
	trailer_url: "预告片"
}, G = "reviewgenretags";
function Fe({ tags: e }) {
	return e.length ? /* @__PURE__ */ (0, W.jsx)("datalist", {
		id: G,
		children: e.map((e) => /* @__PURE__ */ (0, W.jsx)("option", { value: e }, e))
	}) : null;
}
function Ie({ candidate: e, selectable: t = !1 }) {
	let n = Object.entries(e.catalog_evidence || {}).filter(([, e]) => e && e.display_value), r = e.content_id || e.provider_id;
	return /* @__PURE__ */ (0, W.jsxs)("span", {
		className: "flex min-w-0 flex-1 flex-col",
		children: [/* @__PURE__ */ (0, W.jsxs)("span", {
			className: "relative flex min-w-0 flex-col gap-0.5 px-4 py-3 group-hover:bg-background-primary-hover group-data-selected:bg-background-primary-hover",
			children: [
				/* @__PURE__ */ (0, W.jsxs)("b", {
					className: "text-body-2-medium text-text-secondary",
					children: [
						e.source,
						e.official ? " · 官方优先" : "",
						r ? ` · ID ${r}` : ""
					]
				}),
				/* @__PURE__ */ (0, W.jsx)("span", {
					className: "text-body-medium break-words text-text-primary",
					children: e.display_value || ""
				}),
				(e.warnings || []).map((e) => /* @__PURE__ */ (0, W.jsx)("i", {
					className: "text-body-2-regular text-status-yellow-text",
					children: e
				}, e)),
				t ? /* @__PURE__ */ (0, W.jsx)("span", {
					"aria-hidden": "true",
					"data-candidate-choice": !0,
					className: "absolute top-4 right-4 inline-grid size-4 place-items-center rounded-full border border-border-checkbox-default bg-background-primary-default group-hover:border-border-checkbox-hover group-data-selected:border-border-focus-ring group-data-selected:bg-accent-600",
					children: /* @__PURE__ */ (0, W.jsx)("span", { className: "size-1.5 rounded-full bg-text-white opacity-0 group-data-selected:opacity-100" })
				}) : null
			]
		}), n.length ? /* @__PURE__ */ (0, W.jsx)("dl", {
			className: "flex flex-col gap-1 border-t border-separator-border bg-background-primary-default px-4 py-2.5",
			children: n.map(([e, t]) => /* @__PURE__ */ (0, W.jsxs)("div", {
				className: "flex min-w-0 flex-wrap gap-x-2",
				children: [
					/* @__PURE__ */ (0, W.jsx)("dt", {
						className: "text-body-2-regular text-text-secondary",
						children: Pe[e] || e
					}),
					/* @__PURE__ */ (0, W.jsx)("dd", {
						className: "min-w-0 text-body-2-regular break-words text-text-primary",
						children: t.display_value
					}),
					(t.warnings || []).map((e) => /* @__PURE__ */ (0, W.jsx)("small", {
						className: "w-full text-caption-1-regular text-status-yellow-text",
						children: e
					}, e))
				]
			}, e))
		}) : null]
	});
}
function K({ row: e, fieldName: t, value: n, onChange: r, locked: o }) {
	let s = e.candidates || [];
	return s.length ? s.length === 1 ? /* @__PURE__ */ (0, W.jsx)("div", {
		className: "flex overflow-hidden rounded-surface border border-separator-border bg-background-secondary-default",
		children: /* @__PURE__ */ (0, W.jsx)(Ie, { candidate: s[0] })
	}) : /* @__PURE__ */ (0, W.jsx)(i, {
		"aria-label": `${t || "资料"}的来源`,
		value: n,
		isDisabled: o,
		onChange: r,
		className: "flex flex-col gap-2",
		children: s.map((e) => /* @__PURE__ */ (0, W.jsx)(a, {
			value: e.candidate_key,
			className: "relative group flex cursor-pointer items-center gap-2 overflow-hidden rounded-surface border border-separator-border bg-background-secondary-default outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring data-selected:border-border-button-active data-disabled:cursor-not-allowed",
			children: /* @__PURE__ */ (0, W.jsx)(Ie, {
				candidate: e,
				selectable: !0
			})
		}, e.candidate_key))
	}) : null;
}
function Le({ genre: e, tags: t, locked: n, toast: r }) {
	let [i, a] = (0, U.useState)(""), [s, c] = (0, U.useState)(""), l = Oe({
		mutationFn: (t) => R(e, t),
		onSuccess: async (t, n) => {
			t.ok ? (r(n ? `已把「${e}」收录为标签「${n}」` : `已把「${e}」判为非内容标签`), await he()) : c(t.error || "服务端拒绝了这次收录");
		},
		onError: (e) => c(I(e))
	}), u = () => {
		let e = i.trim();
		e ? (c(""), l.mutate(e)) : c("先给它一个中文标签");
	};
	return /* @__PURE__ */ (0, W.jsxs)("div", {
		className: "flex flex-wrap items-center gap-2",
		children: [
			/* @__PURE__ */ (0, W.jsx)("b", {
				lang: "ja",
				className: "text-body-medium text-text-primary",
				children: e
			}),
			/* @__PURE__ */ (0, W.jsx)(O, {
				"aria-label": `「${e}」收录成的中文标签`,
				value: i,
				onChange: a,
				maxLength: 40,
				isDisabled: n || l.isPending,
				className: "min-w-40 flex-1",
				children: /* @__PURE__ */ (0, W.jsx)(h, {
					size: "small",
					list: t.length ? G : void 0,
					autoComplete: "off",
					placeholder: "中文标签",
					onKeyDown: (e) => {
						e.key !== "Enter" || e.nativeEvent.isComposing || (e.preventDefault(), u());
					}
				})
			}),
			/* @__PURE__ */ (0, W.jsx)(o, {
				variant: "secondary",
				size: "small",
				disabled: n || l.isPending,
				onClick: u,
				children: "收录"
			}),
			/* @__PURE__ */ (0, W.jsx)(o, {
				variant: "secondary",
				size: "small",
				disabled: n || l.isPending,
				onClick: () => {
					c(""), l.mutate("");
				},
				children: "不是内容"
			}),
			s ? /* @__PURE__ */ (0, W.jsx)("p", {
				role: "status",
				className: "w-full text-body-2-regular text-text-error-primary",
				children: s
			}) : null
		]
	});
}
function Re({ row: e, tags: t, locked: n, toast: r }) {
	let i = me(e);
	return i.length ? /* @__PURE__ */ (0, W.jsxs)("div", {
		role: "group",
		"aria-label": "未收录 genre",
		className: "flex flex-col gap-2 rounded-surface border border-separator-border bg-background-primary-default px-4 py-3",
		children: [/* @__PURE__ */ (0, W.jsx)("h5", {
			className: "text-body-2-medium text-text-secondary",
			children: `未收录 genre · ${i.length}`
		}), /* @__PURE__ */ (0, W.jsx)("div", {
			role: "list",
			className: "flex flex-col",
			children: i.map((e, i) => /* @__PURE__ */ (0, W.jsx)("div", {
				role: "listitem",
				className: `py-3 first:pt-0 last:pb-0 ${i ? "border-t border-separator-border" : ""}`,
				children: /* @__PURE__ */ (0, W.jsx)(Le, {
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
var q = (e = "") => /^https?:\/\//i.test(e) ? e : "", ze = (e = "") => q(e) || (e.startsWith("/") && !e.startsWith("//") ? e : "");
function Be({ url: e }) {
	let t = ze(e || "");
	return /* @__PURE__ */ (0, W.jsx)(Ve, { source: t }, t);
}
function Ve({ source: e }) {
	let [t, n] = (0, U.useState)("idle");
	return (0, U.useEffect)(() => {
		if (t !== "loading") return;
		let e = setTimeout(() => n("failed"), 3e4);
		return () => clearTimeout(e);
	}, [t]), /* @__PURE__ */ (0, W.jsxs)("div", {
		className: "relative flex h-review-image items-center justify-center overflow-hidden rounded-surface bg-background-secondary-default",
		children: [t === "loading" ? /* @__PURE__ */ (0, W.jsxs)("span", {
			role: "status",
			className: "absolute flex items-center gap-2 text-body-2-regular text-text-secondary",
			children: [/* @__PURE__ */ (0, W.jsx)("span", { dangerouslySetInnerHTML: { __html: V("正在加载图片") } }), "正在加载图片"]
		}) : null, e && (t === "loading" || t === "ready") ? /* @__PURE__ */ (0, W.jsx)("img", {
			src: e,
			alt: "来源提供的备选图片",
			referrerPolicy: "no-referrer",
			decoding: "async",
			className: `size-full object-contain ${t === "loading" ? "invisible" : ""}`,
			onLoad: () => n("ready"),
			onError: () => n("failed")
		}) : e ? /* @__PURE__ */ (0, W.jsxs)("div", {
			className: "flex flex-col items-center gap-2",
			children: [t === "failed" ? /* @__PURE__ */ (0, W.jsx)("span", {
				className: "text-body-2-regular text-text-secondary",
				children: "未取得来源图片"
			}) : null, /* @__PURE__ */ (0, W.jsx)(o, {
				variant: "secondary",
				size: "small",
				"aria-label": t === "failed" ? "立即重试加载来源图片" : void 0,
				onClick: () => n("loading"),
				children: t === "failed" ? "立即重试" : "查看来源图片"
			})]
		}) : /* @__PURE__ */ (0, W.jsx)("span", {
			className: "text-body-2-regular text-text-secondary",
			children: "未取得来源图片"
		})]
	});
}
function J({ asset: e, openItem: t }) {
	let n = e.name || "";
	return /* @__PURE__ */ (0, W.jsxs)("div", {
		className: "flex min-w-0 items-center gap-2.5 rounded-surface bg-background-secondary-default p-2",
		children: [/* @__PURE__ */ (0, W.jsxs)("button", {
			type: "button",
			onClick: () => t(e.id),
			className: "flex aspect-card-cover w-review-cover-narrow shrink-0 review-tight:w-review-cover cursor-pointer items-center justify-center overflow-hidden rounded-2lg bg-background-tertiary-default outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring",
			children: [e.preview_url ? /* @__PURE__ */ (0, W.jsx)("img", {
				src: e.preview_url,
				alt: "",
				loading: "lazy",
				className: "size-full object-cover"
			}) : /* @__PURE__ */ (0, W.jsx)("span", {
				className: "text-caption-1-regular text-text-secondary",
				children: "无封面"
			}), /* @__PURE__ */ (0, W.jsx)(r, { children: `打开原视频 ${n}` })]
		}), /* @__PURE__ */ (0, W.jsxs)("div", {
			className: "flex min-w-0 flex-col items-start gap-1",
			children: [/* @__PURE__ */ (0, W.jsx)("b", {
				title: n,
				className: "w-full truncate text-body-medium text-text-primary",
				children: e.code || n || "原视频"
			}), /* @__PURE__ */ (0, W.jsx)(o, {
				variant: "secondary",
				size: "small",
				leadingIcon: te,
				onClick: () => t(e.id),
				children: "打开原视频"
			})]
		})]
	});
}
function Y({ kind: e, name: t, works: n, avatar: r, openEntity: i }) {
	return /* @__PURE__ */ (0, W.jsxs)("div", {
		className: "flex min-w-0 items-center gap-3",
		children: [/* @__PURE__ */ (0, W.jsx)("button", {
			type: "button",
			"aria-label": `打开创作者页：${t}`,
			onClick: () => i(e, t),
			className: `relative inline-grid size-11 shrink-0 cursor-pointer place-items-center overflow-hidden rounded-full bg-background-secondary-default text-caption-1-medium text-text-secondary outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring ${H}`,
			dangerouslySetInnerHTML: { __html: r }
		}), /* @__PURE__ */ (0, W.jsxs)("div", {
			className: "flex min-w-0 flex-col items-start",
			children: [/* @__PURE__ */ (0, W.jsx)("button", {
				type: "button",
				onClick: () => i(e, t),
				className: "max-w-full cursor-pointer truncate text-body-medium text-text-primary underline-offset-2 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-border-focus-ring",
				children: t
			}), n ? /* @__PURE__ */ (0, W.jsx)("small", {
				className: "tabular-nums text-body-2-regular text-text-secondary",
				children: `${n.toLocaleString()} 部作品`
			}) : null]
		})]
	});
}
function He({ row: e, openItem: t, openEntity: n, onReveal: r, revealing: i, note: a }) {
	let c = q(e.profile_url || ""), l = (e.preview_assets || []).slice(0, 6), u = Math.max(0, Number(e.video_count || e.videos || 0));
	return /* @__PURE__ */ (0, W.jsxs)("section", {
		className: "flex flex-col gap-3",
		children: [
			/* @__PURE__ */ (0, W.jsx)("h5", {
				className: "text-body-medium text-text-primary",
				children: `待确认人物：${e.babepedia_name || "未标注"}`
			}),
			/* @__PURE__ */ (0, W.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [c ? /* @__PURE__ */ (0, W.jsx)(s, {
					variant: "secondary",
					size: "small",
					trailingIcon: k,
					href: c,
					target: "_blank",
					rel: "noopener noreferrer",
					children: "来源资料"
				}) : null, /* @__PURE__ */ (0, W.jsx)(o, {
					variant: "secondary",
					size: "small",
					onClick: () => n("creator", e.creator || ""),
					children: `查看全部 ${u.toLocaleString()} 部作品`
				})]
			}),
			/* @__PURE__ */ (0, W.jsx)(Be, { url: e.preview_url }),
			/* @__PURE__ */ (0, W.jsx)("p", {
				className: "text-body-2-regular text-text-secondary",
				children: "通过后记录身份判断。"
			}),
			l.length ? /* @__PURE__ */ (0, W.jsxs)(W.Fragment, { children: [/* @__PURE__ */ (0, W.jsx)("h5", {
				className: "text-body-medium text-text-primary",
				children: "本地作品样本"
			}), /* @__PURE__ */ (0, W.jsx)("ul", {
				className: "flex flex-col gap-1",
				children: l.map((e) => /* @__PURE__ */ (0, W.jsxs)("li", {
					className: "flex min-w-0 items-center gap-2",
					children: [/* @__PURE__ */ (0, W.jsx)(o, {
						variant: "ghost",
						size: "small",
						className: "min-w-0",
						onClick: () => t(e.id),
						children: /* @__PURE__ */ (0, W.jsx)("span", {
							title: e.name,
							className: "block max-w-full truncate",
							children: e.name
						})
					}), /* @__PURE__ */ (0, W.jsx)(o, {
						variant: "ghost",
						size: "small",
						"aria-label": `打开 ${e.name} 的文件位置`,
						...M(i === e.id),
						onClick: () => r(e.id),
						children: "文件位置"
					})]
				}, e.id))
			})] }) : /* @__PURE__ */ (0, W.jsx)("p", {
				className: "text-body-2-regular text-text-secondary",
				children: "暂无本地作品样本，打开全部作品核对。"
			}),
			a ? /* @__PURE__ */ (0, W.jsx)("p", {
				role: "status",
				className: "text-body-2-regular text-text-error-primary",
				children: a
			}) : null
		]
	});
}
function Ue({ assets: e, picked: t, onPicked: n, locked: i }) {
	let [a, o] = (0, U.useState)(null), s = new Set(t), c = (t, r) => {
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
	return /* @__PURE__ */ (0, W.jsxs)("div", {
		className: "flex flex-col gap-2",
		children: [/* @__PURE__ */ (0, W.jsx)(E, {
			prefix: /* @__PURE__ */ (0, W.jsx)("span", {
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
		}), /* @__PURE__ */ (0, W.jsx)("div", {
			className: "review-asset-grid gap-1.5",
			children: e.map((e, t) => {
				let n = s.has(e.id);
				return /* @__PURE__ */ (0, W.jsxs)("button", {
					type: "button",
					"aria-pressed": n,
					title: e.name,
					onClick: (e) => c(t, e.shiftKey),
					className: `relative aspect-card-cover cursor-pointer overflow-hidden rounded-surface bg-background-tertiary-default outline-none transition-opacity focus-visible:ring-2 focus-visible:ring-border-focus-ring ${n ? "opacity-100 ring-2 ring-border-button-active ring-inset" : "opacity-50"}`,
					children: [
						/* @__PURE__ */ (0, W.jsx)("img", {
							src: `/poster?id=${e.id}&c=4`,
							alt: "",
							loading: "lazy",
							className: "size-full object-cover"
						}),
						/* @__PURE__ */ (0, W.jsx)("span", {
							className: "absolute top-1 right-1",
							children: /* @__PURE__ */ (0, W.jsx)(l, {
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
						/* @__PURE__ */ (0, W.jsx)(r, { children: `${n ? "已选" : "未选"} ${e.name || e.id}` })
					]
				}, e.id);
			})
		})]
	});
}
// src/react/review/review-card.tsx
var We = N({
	variant: "outlined",
	padding: "none",
	className: "flex flex-col gap-4 px-5 pt-4"
}), X = "flex min-h-6 min-w-0 items-center", Z = 2, Q = (e) => e === "western_identity" ? "h-review-card-tall" : "h-review-card";
function Ge(e) {
	let { category: t, row: n, choice: r, onChoice: i, selected: a, onSelect: s, locked: l, busy: d, problem: m, genreTags: te, onDecide: h, handlers: g, queueView: _ = "pending" } = e, v = (0, U.useRef)(!1), y = ke(), ne = ke(), x = t === "metadata_fields", S = f[t] || "", C = String(n.creator || "").trim(), w = !!S && !!C, T = B(t, n), E = Ce(t, n), D = we(t, n), O = Se(n), k = z(n), A = re(t, n), N = n.comparison_assets || [], P = n.preview_assets || [], ie = b[n.decision || ""], F = N.length > 1 ? /* @__PURE__ */ (0, W.jsxs)("div", {
		className: "flex flex-col gap-3",
		children: [N.slice(0, Z).map((e) => /* @__PURE__ */ (0, W.jsx)(J, {
			asset: e,
			openItem: g.openItem
		}, e.id)), N.length > Z ? /* @__PURE__ */ (0, W.jsx)("p", {
			className: "text-body-2-regular text-text-secondary",
			children: `另有 ${(N.length - Z).toLocaleString()} 部对照作品`
		}) : null]
	}) : w ? /* @__PURE__ */ (0, W.jsx)(Y, {
		kind: S,
		name: C,
		works: Number(n.video_count || n.videos || 0),
		openEntity: g.openEntity,
		avatar: j(C, n.entity_id ? {
			id: n.entity_id,
			has_image: !!n.has_image,
			image_version: n.image_version,
			avatar_focus: n.avatar_focus
		} : null, null, S)
	}) : n.asset_id ? /* @__PURE__ */ (0, W.jsx)(J, {
		openItem: g.openItem,
		asset: {
			id: n.asset_id,
			name: n.asset_name,
			preview_url: n.asset_preview_url
		}
	}) : null, ae = x ? /* @__PURE__ */ (0, W.jsx)(K, {
		row: n,
		fieldName: E,
		value: r.candidateKey,
		onChange: (e) => i({
			...r,
			candidateKey: e
		}),
		locked: l
	}) : t === "creator_tags" ? P.length ? /* @__PURE__ */ (0, W.jsx)(Ue, {
		assets: P,
		picked: r.assets,
		locked: l,
		onPicked: (e) => i({
			...r,
			assets: e
		})
	}) : /* @__PURE__ */ (0, W.jsx)(p, {
		size: "compact",
		icon: ee,
		title: "这批作品尚未抽帧",
		children: `${n.video_count || ""} 条作品还没有可用预览；批准后仍会按所选资料写入标签。`
	}) : t === "fc2_similarity" ? null : t === "western_identity" ? /* @__PURE__ */ (0, W.jsx)(He, {
		row: n,
		openItem: g.openItem,
		openEntity: g.openEntity,
		onReveal: g.onReveal,
		revealing: g.revealing,
		note: g.revealNote
	}) : /* @__PURE__ */ (0, W.jsx)(Be, { url: n.preview_url }), oe = w ? F : E ? /* @__PURE__ */ (0, W.jsxs)("h4", {
		className: `${X} flex-wrap gap-2`,
		children: [/* @__PURE__ */ (0, W.jsx)("span", {
			title: E,
			className: "flex max-w-full min-w-0 overflow-hidden rounded-md",
			children: /* @__PURE__ */ (0, W.jsx)(u, {
				variant: "caption",
				color: "blue",
				children: E
			})
		}), /* @__PURE__ */ (0, W.jsx)("span", {
			title: D,
			className: "min-w-0 truncate text-body-medium text-text-primary",
			children: D
		})]
	}) : /* @__PURE__ */ (0, W.jsx)("h4", {
		className: X,
		children: /* @__PURE__ */ (0, W.jsx)("span", {
			title: T,
			className: "min-w-0 truncate text-body-medium text-text-primary",
			children: T
		})
	});
	return /* @__PURE__ */ (0, W.jsxs)("section", {
		"aria-label": T,
		"data-review-key": n.item_key,
		className: `${We} ${Q(t)} overflow-hidden`,
		children: [
			/* @__PURE__ */ (0, W.jsxs)("header", {
				className: "flex min-w-0 shrink-0 items-start gap-2",
				children: [
					l ? null : /* @__PURE__ */ (0, W.jsx)("span", {
						className: `${X} shrink-0`,
						onPointerDownCapture: (e) => {
							v.current = e.shiftKey;
						},
						onKeyDownCapture: (e) => {
							v.current = e.shiftKey;
						},
						children: /* @__PURE__ */ (0, W.jsx)(c, {
							isSelected: a,
							"aria-label": `选择 ${T}`,
							onChange: (e) => s(v.current, e)
						})
					}),
					/* @__PURE__ */ (0, W.jsx)("div", {
						className: "min-w-0 flex-1",
						children: oe
					}),
					ie ? /* @__PURE__ */ (0, W.jsx)(u, {
						variant: "caption",
						color: "neutral",
						children: ie
					}) : null
				]
			}),
			/* @__PURE__ */ (0, W.jsx)("div", {
				className: "relative flex min-w-0 min-h-0 flex-1 flex-col",
				children: /* @__PURE__ */ (0, W.jsxs)("div", {
					ref: y,
					className: "flex min-w-0 min-h-0 flex-1 flex-col gap-3 overflow-y-auto",
					children: [
						n.source_name ? /* @__PURE__ */ (0, W.jsx)("p", {
							className: "text-body-2-regular text-text-secondary",
							children: `来源写法：${n.source_name}`
						}) : null,
						!w && (n.board || n.assets) ? /* @__PURE__ */ (0, W.jsx)("p", {
							className: "text-body-2-regular text-text-secondary",
							children: `对照文件：${Number(n.video_count || n.assets || 0).toLocaleString()}`
						}) : null,
						!w && F ? F : null,
						k.length || t === "creator_tags" ? /* @__PURE__ */ (0, W.jsx)("div", {
							className: "flex flex-wrap gap-1",
							children: k.length ? k.map((e) => /* @__PURE__ */ (0, W.jsx)(u, {
								variant: "caption",
								color: "soft",
								children: e
							}, e)) : /* @__PURE__ */ (0, W.jsx)("small", {
								className: "text-body-2-regular text-text-secondary",
								children: "暂无待确认标签"
							})
						}) : null,
						ae,
						/* @__PURE__ */ (0, W.jsx)(Re, {
							row: n,
							tags: te,
							locked: l,
							toast: g.toast
						}),
						!x && O ? /* @__PURE__ */ (0, W.jsx)("p", {
							className: "text-body-2-regular text-text-secondary wrap-anywhere",
							children: O
						}) : null
					]
				})
			}),
			x && O ? /* @__PURE__ */ (0, W.jsx)("div", {
				className: "relative -mx-5 -mb-4 shrink-0",
				children: /* @__PURE__ */ (0, W.jsx)("p", {
					ref: ne,
					role: "region",
					"aria-label": "当前信息",
					className: "max-h-22 overflow-y-auto border-t border-separator-border px-5 py-2.5 text-body-2-regular text-text-secondary wrap-anywhere",
					children: O
				})
			}) : null,
			/* @__PURE__ */ (0, W.jsxs)("footer", {
				className: "-mx-5 flex min-h-14 shrink-0 flex-wrap items-center justify-end gap-2 rounded-b-surface border-t border-separator-border bg-background-secondary-default py-3 pr-3 pl-5",
				children: [
					_ === "ignored" ? null : /* @__PURE__ */ (0, W.jsx)(o, {
						variant: "ghost",
						size: "small",
						disabled: l,
						...M(d),
						onClick: () => h("rejected"),
						children: "忽略"
					}),
					_ === "pending" ? /* @__PURE__ */ (0, W.jsx)(o, {
						variant: "secondary",
						size: "small",
						disabled: l,
						...M(d),
						onClick: () => h("skipped"),
						children: "稍后处理"
					}) : /* @__PURE__ */ (0, W.jsx)(o, {
						variant: _ === "ignored" ? "primary" : "secondary",
						size: "small",
						disabled: l,
						...M(d),
						onClick: () => h("restore"),
						children: "恢复待处理"
					}),
					_ === "ignored" ? null : /* @__PURE__ */ (0, W.jsx)(o, {
						variant: "primary",
						size: "small",
						disabled: l || !A,
						...M(d),
						title: A ? void 0 : "没有可采用的资料，可先保留或忽略",
						onClick: () => h("approved"),
						children: A ? "通过" : "不可通过"
					}),
					m ? /* @__PURE__ */ (0, W.jsx)("p", {
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
	return t <= 1 ? null : /* @__PURE__ */ (0, W.jsxs)("nav", {
		"aria-label": "复核分页",
		"data-pagination-layout": "",
		className: "inline-grid w-full min-w-0 items-center gap-2",
		children: [
			/* @__PURE__ */ (0, W.jsx)(o, {
				variant: "secondary",
				size: "small",
				disabled: e <= 1,
				onClick: () => n(e - 1),
				children: "上一页"
			}),
			/* @__PURE__ */ (0, W.jsx)("ul", {
				className: "flex min-w-0 flex-wrap items-center justify-center gap-1",
				children: L(e, t).map((t, r) => /* @__PURE__ */ (0, W.jsx)("li", { children: t === "…" ? /* @__PURE__ */ (0, W.jsx)("span", {
					"aria-hidden": !0,
					className: "px-1 text-body-2-regular text-text-tertiary",
					children: "…"
				}) : /* @__PURE__ */ (0, W.jsx)(o, {
					variant: t === e ? "secondary" : "ghost",
					size: "small",
					"aria-label": `第 ${t} 页`,
					"aria-current": t === e ? "page" : void 0,
					onClick: () => n(Number(t)),
					children: t
				}) }, t === "…" ? `dots-${r}` : t))
			}),
			/* @__PURE__ */ (0, W.jsx)(o, {
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
	let [i, a] = (0, U.useState)(() => matchMedia("(max-width:900px)").matches);
	(0, U.useEffect)(() => {
		let e = matchMedia("(max-width:900px)"), t = () => a(e.matches);
		return e.addEventListener("change", t), () => e.removeEventListener("change", t);
	}, []);
	let { route: s, openItem: c, openEntity: l, revealSource: u, toast: f, readOnly: ee, readOnlyMessage: te, writerUrl: h } = r, [_, v] = (0, U.useState)(ue(r.category) ? r.category : d), [b, w] = (0, U.useState)(() => be(r.queue)), [T, E] = (0, U.useState)("candidates"), [D, O] = (0, U.useState)(""), [k, A] = (0, U.useState)(1), [j, M] = (0, U.useState)(/* @__PURE__ */ new Set()), [N, P] = (0, U.useState)(/* @__PURE__ */ new Map()), [de, L] = (0, U.useState)(/* @__PURE__ */ new Map()), [me, R] = (0, U.useState)(""), he = (0, U.useRef)(null), [ge, _e] = (0, U.useState)(0), [Se, Ce] = (0, U.useState)(""), we = (0, U.useRef)(!0);
	(0, U.useEffect)(() => () => {
		we.current = !1;
	}, []);
	let z = Ae({
		queryKey: ne,
		queryFn: ({ signal: e }) => se(e)
	}), B = z.data || {
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
	}, V = ye(B, b), ke = z.data ? Object.fromEntries(S.map((e) => [e, y.reduce((t, n) => t + Number(ye(B, e).counts[n] || 0), 0)])) : void 0, H = V.sections[_] || [], Pe = _ === "metadata_fields", G = ee;
	(0, U.useEffect)(() => {
		let e = new Set(H.map((e) => e.item_key));
		M((t) => {
			let n = [...t].filter((t) => e.has(t));
			return n.length === t.size ? t : new Set(n);
		}), P((t) => {
			let n = [...t].filter(([t]) => e.has(t));
			return n.length === t.size ? t : new Map(n);
		}), L((t) => {
			let n = [...t].filter(([t]) => e.has(t));
			return n.length === t.size ? t : new Map(n);
		});
	}, [H]);
	let Ie = ve(H, Pe), K = Ie.some(([e]) => e === T) ? T : "candidates", Le = le(H, K), Re = Le.some((e) => e.key === D) ? D : "", q = xe(ce(H, K, Re), k), ze = q.rows.map((e) => e.item_key), Be = new Set(ze), Ve = Le.map((e) => ({
		...e,
		rows: e.rows.filter((e) => Be.has(e.item_key))
	})).filter((e) => e.rows.length), J = (e) => N.get(e.item_key) || oe(e), Y = H.filter((e) => j.has(e.item_key)), He = (e) => {
		let t = new Set(e);
		M((e) => new Set([...e].filter((e) => !t.has(e)))), P((e) => new Map([...e].filter(([e]) => !t.has(e)))), L((e) => new Map([...e].filter(([e]) => !t.has(e))));
	}, Ue = (e, t) => L((n) => new Map(n).set(e, t)), We = () => {
		E("candidates"), O(""), A(1), M(/* @__PURE__ */ new Set()), P(/* @__PURE__ */ new Map()), L(/* @__PURE__ */ new Map()), R(""), he.current = null;
	}, X = (e) => {
		v(e), We(), s({
			category: e === "metadata_fields" ? "" : e,
			queue: b === "pending" ? "" : b
		});
	}, Z = (e) => {
		w(e), We(), s({
			category: _ === "metadata_fields" ? "" : _,
			queue: e === "pending" ? "" : e
		});
	}, Q = Oe({
		mutationFn: ({ row: e, status: t, category: n }) => De(F(n, ie(n, e), t, J(e))),
		onSuccess: (e, { row: t, status: n, category: r }) => {
			e.ok ? (Ee(r, [t.item_key], n), He([t.item_key]), f(ae(n))) : Ue(t.item_key, e.error || "服务端拒绝了这次判定");
		},
		onError: (e, { row: t }) => Ue(t.item_key, I(e))
	}), $ = Oe({
		mutationFn: async ({ status: e, category: t, rows: n }) => {
			let r = [], i = [];
			for (let [a, o] of n.entries()) {
				if (!we.current) break;
				R(`正在处理 ${a} / ${n.length}`);
				try {
					let n = await De(F(t, ie(t, o), e, J(o)));
					if (!n.ok) throw Error(n.error || "服务端未采用该项");
					r.push(o.item_key);
				} catch (e) {
					i.push([o.item_key, I(e)]);
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
			Ee(t, n, e), He(n), r.forEach(([e, t]) => Ue(e, t)), R("");
			let i = {
				approved: "通过",
				rejected: "忽略",
				skipped: "移至稍后处理",
				restore: "恢复待处理"
			}[e];
			f(`已${i} ${n.length} 项` + (r.length ? `，${r.length} 项未完成` : ""));
		},
		onError: (e) => {
			R(I(e));
		}
	}), Je = (e) => {
		!$.isPending && Y.length && (e === "approved" && Pe && Y.some((e) => !J(e).candidateKey) ? R("请先为所选资料选择要采用的来源。") : (R(""), $.mutate({
			status: e,
			category: _,
			rows: Y
		})));
	}, Ye = (e) => {
		P((t) => {
			let n = new Map(t);
			for (let t of Y) {
				let r = t.candidates?.find((t) => t.source === e);
				r && n.set(t.item_key, {
					...J(t),
					candidateKey: r.candidate_key
				});
			}
			return n;
		}), R(`已选择 ${e}，点击通过所选采用。`);
	}, Xe = async (e) => {
		if (ge) return;
		_e(e), Ce("");
		let t = await u(e);
		we.current && (_e(0), Ce(t));
	}, Ze = pe(B.mirror, te), Qe = B.genre_tags || [], $e = {
		openItem: c,
		openEntity: l,
		onReveal: Xe,
		revealing: ge,
		revealNote: Se,
		toast: f
	};
	return /* @__PURE__ */ (0, W.jsx)(je, { children: /* @__PURE__ */ (0, W.jsxs)("div", {
		className: "flex flex-col gap-5 pb-10",
		children: [
			G ? /* @__PURE__ */ (0, W.jsx)(g, {
				tone: "warning",
				title: "本机只能浏览",
				extra: h ? /* @__PURE__ */ (0, W.jsx)("p", {
					className: "text-body-2-regular",
					children: /* @__PURE__ */ (0, W.jsx)(m, {
						href: h,
						children: "前往写入端复核"
					})
				}) : void 0,
				children: Ze
			}) : null,
			/* @__PURE__ */ (0, W.jsx)(Fe, { tags: Qe }),
			/* @__PURE__ */ (0, W.jsxs)(n, {
				orientation: i ? "horizontal" : "vertical",
				selectedKey: _,
				onSelectionChange: (e) => {
					let t = String(e);
					ue(t) && X(t);
				},
				className: "flex flex-col gap-5 review-split:flex-row review-split:items-start review-split:gap-6",
				children: [/* @__PURE__ */ (0, W.jsxs)("div", {
					"data-section-nav": !0,
					className: "w-full min-w-0 review-split:sticky review-split:top-topbar review-split:w-review-tabs review-split:shrink-0",
					children: [/* @__PURE__ */ (0, W.jsx)("h2", {
						id: "reviewcategories",
						children: "复核分类"
					}), /* @__PURE__ */ (0, W.jsx)(Me, {
						scrollable: i,
						"aria-labelledby": "reviewcategories",
						"data-section-items": !0,
						className: "flex review-split:flex-col review-split:items-stretch",
						children: y.map((e) => {
							let n = Number(V.counts[e] || 0);
							return /* @__PURE__ */ (0, W.jsxs)(t, {
								id: e,
								className: Ke,
								isDisabled: Q.isPending || $.isPending,
								"data-pill-selected": _ === e ? "" : void 0,
								"data-pill-variant": "gray",
								children: [x[e], n ? /* @__PURE__ */ (0, W.jsx)("span", {
									className: "tabular-nums text-caption-1-medium text-text-secondary",
									children: n.toLocaleString()
								}) : null]
							}, e);
						})
					})]
				}), /* @__PURE__ */ (0, W.jsxs)(e, {
					id: _,
					className: "flex min-w-0 flex-1 flex-col gap-5",
					children: [
						/* @__PURE__ */ (0, W.jsx)(Ne, {
							queueView: b,
							queueCounts: ke,
							onQueueChange: Z,
							locked: G,
							groupOptions: Ie,
							groupBy: K,
							onGroupBy: (e) => {
								E(e), O(""), A(1);
							},
							groups: Le,
							filter: Re,
							onFilter: (e) => {
								O(e), A(1);
							},
							pageKeys: ze,
							selected: j,
							onSelected: M,
							selectedRows: Y,
							metadata: Pe,
							approvable: Y.every((e) => re(_, e)),
							busy: $.isPending || Q.isPending,
							feedback: me,
							onUnifySource: Ye,
							onRun: Je
						}),
						q.rows.length ? Ve.map((e) => /* @__PURE__ */ (0, W.jsxs)("section", {
							className: "flex flex-col gap-3",
							children: [Ve.length > 1 || K !== "candidates" ? /* @__PURE__ */ (0, W.jsxs)("div", {
								className: "flex flex-wrap items-center gap-2",
								children: [/* @__PURE__ */ (0, W.jsx)("h3", {
									className: "text-body-medium text-text-primary",
									children: `${e.title} · ${e.rows.length}`
								}), G ? null : /* @__PURE__ */ (0, W.jsx)(o, {
									variant: "ghost",
									size: "small",
									onClick: () => {
										let t = e.rows.map((e) => e.item_key), n = t.every((e) => j.has(e)), r = new Set(j);
										for (let e of t) n ? r.delete(e) : r.add(e);
										M(r);
									},
									children: e.rows.every((e) => j.has(e.item_key)) ? "清空本组" : "全选本组"
								})]
							}) : null, /* @__PURE__ */ (0, W.jsx)("div", {
								className: "review-grid gap-5",
								children: e.rows.map((e) => /* @__PURE__ */ (0, W.jsx)(Ge, {
									category: _,
									row: e,
									queueView: b,
									choice: J(e),
									onChoice: (t) => P((n) => new Map(n).set(e.item_key, t)),
									selected: j.has(e.item_key),
									onSelect: (t, n) => M((r) => {
										let i = new Set(r);
										return he.current = Te(i, ze, he.current, e.item_key, t, n), i;
									}),
									locked: G,
									busy: $.isPending || Q.isPending && Q.variables?.row.item_key === e.item_key,
									problem: de.get(e.item_key) || "",
									genreTags: Qe,
									onDecide: (t) => {
										Q.isPending || $.isPending || (L((t) => new Map([...t].filter(([t]) => t !== e.item_key))), Q.mutate({
											row: e,
											status: t,
											category: _
										}));
									},
									handlers: $e
								}, e.item_key))
							})]
						}, e.key)) : z.isError && !z.data ? /* @__PURE__ */ (0, W.jsx)(g, {
							tone: "error",
							title: "复核队列读取失败",
							action: /* @__PURE__ */ (0, W.jsx)(o, {
								variant: "secondary",
								size: "small",
								disabled: z.isFetching,
								onClick: () => void z.refetch(),
								children: "立即重试"
							}),
							children: I(z.error)
						}) : /* @__PURE__ */ (0, W.jsx)(p, {
							icon: fe,
							title: `此分类没有${C[b]}项目`,
							actions: y.some((e) => e !== _ && Number(V.counts[e] || 0) > 0) ? /* @__PURE__ */ (0, W.jsx)(o, {
								size: "small",
								onClick: () => {
									let e = y.find((e) => e !== _ && Number(V.counts[e] || 0) > 0);
									e && X(e);
								},
								children: "查看其他分类"
							}) : void 0,
							children: b === "pending" ? "可切换分类查看其他待确认资料。" : `${C[b]}的资料会保留在这里，可恢复到待处理。`
						}),
						/* @__PURE__ */ (0, W.jsx)(qe, {
							page: q.page,
							pages: q.pages,
							onPage: A
						})
					]
				})]
			})
		]
	}) });
}
export { $ as ReviewPage };

//# debugId=b5865f49-d9fa-4fba-8cef-823a4056c0b4