(function() {
	try {
		var e = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, t = new e.Error().stack;
		t && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[t] = "4b0521d5-ac52-4070-85f4-af5c445c7d99", e._sentryDebugIdIdentifier = "sentry-dbid-4b0521d5-ac52-4070-85f4-af5c445c7d99");
	} catch {}
})();
import { $b4f18e3395fe64d7$export$3d96ec278d3efce4 as e, $b4f18e3395fe64d7$export$3e41faf802a29e71 as t, $b4f18e3395fe64d7$export$b2539bed5023c21c as n, $ea3928288112382f$export$439d29a4e110a164 as r, $fe21c36db05242bb$export$a98f0dcb43a68a25 as i, $fe21c36db05242bb$export$d7b12c4107be0d61 as a, Button as o, ButtonLink as s, Checkbox as c, CheckboxGlyph as l, Chip as u, DEFAULT_CATEGORY as d, ENTITY_REVIEW_KINDS as f, Ea as ee, EmptyState as p, ExternalLink as m, Gg as te, InputBase as h, Note as g, PillTab as _, PillTabList as v, REVIEW_CATEGORIES as y, REVIEW_DECISION_LABELS as b, REVIEW_KEY as ne, REVIEW_LABELS as re, REVIEW_QUEUES as ie, REVIEW_QUEUE_LABELS as x, Select as S, SelectItem as C, SelectionActions as w, SelectionDock as T, TextField as E, Wt as D, __toESM as O, avatarInner as ae, busyProps as k, canApprove as oe, cardClass as A, commonReviewSources as j, currentReviewRow as se, decisionPayload as M, decisionReceipt as ce, defaultChoice as le, errorMessage as N, fetchReview as ue, filterReviewRows as de, groupReviewRows as fe, isReviewCategory as pe, l7 as me, m7 as he, mirrorText as ge, paginationRange as P, pendingGenres as _e, recordGenre as F, reloadReview as ve, require_jsx_runtime as I, require_react as ye, reviewGroupingOptions as be, reviewQueueData as xe, reviewQueueOf as Se, reviewWindow as Ce, rowEvidence as we, rowFieldName as Te, rowSubject as Ee, rowTags as De, rowTitle as Oe, selectReviewRange as ke, settleReviewRows as Ae, spinnerHtml as L, submitDecision as je, useMutation as Me, useOverlayScrollbar as R, useQuery as Ne } from "./peach-app.js";
import { Page as Pe } from "./peach-app.page-QAncjzM1.js";
import { LEGACY_AVATAR_IMG as z } from "./peach-app.legacy-avatar-NSITxLRS.js";
import { PillAriaTabList as Fe } from "./peach-app.pill-aria-tab-list-BMY1ZEv1.js";
// src/react/review/bulk-toolbar.tsx
var B = /* @__PURE__ */ O(ye(), 1), V = I();
function Ie(e) {
	let { groupOptions: t, groupBy: n, onGroupBy: r, groups: i, filter: a, onFilter: s, pageKeys: c, selected: l, onSelected: u, selectedRows: d, metadata: f, approvable: ee, busy: p, feedback: m, onUnifySource: te, onRun: h, queueView: g = "pending" } = e, _ = c.filter((e) => l.has(e)), v = _.length > 0 && _.length === c.length, y = j(d), b = f && d.some((e) => (e.candidates?.length || 0) > 1), ne = y.length ? "统一选择来源" : "所选项目无共同来源";
	return /* @__PURE__ */ (0, V.jsxs)(V.Fragment, { children: [/* @__PURE__ */ (0, V.jsxs)("div", {
		role: "group",
		"aria-label": "复核筛选",
		"data-review-filter": !0,
		"data-glass-pane": "",
		className: "sticky top-topbar z-10 flex flex-wrap items-center gap-2 p-3",
		children: [
			/* @__PURE__ */ (0, V.jsx)(S, {
				"aria-label": "筛选分组方式",
				size: "sm",
				selectedKey: n,
				onSelectionChange: (e) => {
					e !== null && r(String(e));
				},
				children: t.map(([e, t]) => /* @__PURE__ */ (0, V.jsx)(C, {
					id: e,
					children: t
				}, e))
			}),
			i.length > 1 ? /* @__PURE__ */ (0, V.jsxs)(S, {
				"aria-label": n === "field" ? "筛选字段分类" : "筛选当前分类",
				size: "sm",
				prefix: "分类",
				selectedKey: a || "*",
				onSelectionChange: (e) => {
					e !== null && s(String(e) === "*" ? "" : String(e));
				},
				children: [/* @__PURE__ */ (0, V.jsx)(C, {
					id: "*",
					children: "全部"
				}), i.map((e) => /* @__PURE__ */ (0, V.jsx)(C, {
					id: e.key,
					children: `${e.title} · ${e.rows.length}`
				}, e.key))]
			}) : null,
			/* @__PURE__ */ (0, V.jsx)(o, {
				variant: "secondary",
				size: "small",
				leadingIcon: me,
				"aria-pressed": v,
				disabled: p || !c.length,
				onClick: () => {
					let e = new Set(l);
					for (let t of c) v ? e.delete(t) : e.add(t);
					u(e);
				},
				children: v ? "清空当前选择" : a ? "全选当前分类" : "全选本页"
			})
		]
	}), /* @__PURE__ */ (0, V.jsxs)(T, {
		label: "复核所选项目",
		visible: l.size > 0,
		count: `已选 ${l.size} 项`,
		children: [
			b && g !== "ignored" ? /* @__PURE__ */ (0, V.jsxs)(S, {
				"aria-label": "统一选择来源",
				size: "sm",
				selectedKey: "",
				isDisabled: p || !y.length,
				onSelectionChange: (e) => {
					e !== null && e !== "" && te(String(e));
				},
				children: [/* @__PURE__ */ (0, V.jsx)(C, {
					id: "",
					children: ne
				}), y.map((e) => /* @__PURE__ */ (0, V.jsx)(C, {
					id: e,
					children: e
				}, e))]
			}) : null,
			g === "ignored" ? null : /* @__PURE__ */ (0, V.jsx)(o, {
				variant: "ghost",
				size: "small",
				disabled: p || !l.size,
				onClick: () => h("rejected"),
				children: "忽略所选"
			}),
			g === "pending" ? /* @__PURE__ */ (0, V.jsx)(o, {
				variant: "secondary",
				size: "small",
				disabled: p || !l.size,
				onClick: () => h("skipped"),
				children: "稍后处理所选"
			}) : /* @__PURE__ */ (0, V.jsx)(o, {
				variant: g === "ignored" ? "primary" : "secondary",
				size: "small",
				disabled: p || !l.size,
				onClick: () => h("restore"),
				children: "恢复所选"
			}),
			g === "ignored" ? null : /* @__PURE__ */ (0, V.jsx)(o, {
				variant: "primary",
				size: "small",
				disabled: p || !l.size || !ee,
				onClick: () => h("approved"),
				children: "通过所选"
			}),
			/* @__PURE__ */ (0, V.jsx)(o, {
				variant: "ghost",
				size: "small",
				disabled: p,
				onClick: () => u(/* @__PURE__ */ new Set()),
				children: "取消选择"
			}),
			m ? /* @__PURE__ */ (0, V.jsx)("p", {
				role: "status",
				className: "w-full text-body-2-regular text-text-secondary",
				children: m
			}) : null
		]
	})] });
}
// src/react/review/candidate-form.tsx
var H = {
	title: "标题",
	original_title: "原标题",
	runtime: "来源时长",
	director: "导演",
	label: "Label",
	poster_url: "海报",
	cover_url: "封面",
	screenshot_urls: "截图",
	trailer_url: "预告片"
}, U = "reviewgenretags";
function Le({ tags: e }) {
	return e.length ? /* @__PURE__ */ (0, V.jsx)("datalist", {
		id: U,
		children: e.map((e) => /* @__PURE__ */ (0, V.jsx)("option", { value: e }, e))
	}) : null;
}
function W({ candidate: e, selectable: t = !1 }) {
	let n = Object.entries(e.catalog_evidence || {}).filter(([, e]) => e && e.display_value), r = e.content_id || e.provider_id;
	return /* @__PURE__ */ (0, V.jsxs)("span", {
		className: "flex min-w-0 flex-1 flex-col",
		children: [/* @__PURE__ */ (0, V.jsxs)("span", {
			className: "relative flex min-w-0 flex-col gap-0.5 px-4 py-3 group-hover:bg-background-primary-hover group-data-selected:bg-background-primary-hover",
			children: [
				/* @__PURE__ */ (0, V.jsxs)("b", {
					className: "text-body-2-medium text-text-secondary",
					children: [
						e.source,
						e.official ? " · 官方优先" : "",
						r ? ` · ID ${r}` : ""
					]
				}),
				/* @__PURE__ */ (0, V.jsx)("span", {
					className: "text-body-medium break-words text-text-primary",
					children: e.display_value || ""
				}),
				(e.warnings || []).map((e) => /* @__PURE__ */ (0, V.jsx)("i", {
					className: "text-body-2-regular text-status-yellow-text",
					children: e
				}, e)),
				t ? /* @__PURE__ */ (0, V.jsx)("span", {
					"aria-hidden": "true",
					"data-candidate-choice": !0,
					className: "absolute top-4 right-4 inline-grid size-4 place-items-center rounded-full border border-border-checkbox-default bg-background-primary-default group-hover:border-border-checkbox-hover group-data-selected:border-border-focus-ring group-data-selected:bg-accent-600",
					children: /* @__PURE__ */ (0, V.jsx)("span", { className: "size-1.5 rounded-full bg-text-white opacity-0 group-data-selected:opacity-100" })
				}) : null
			]
		}), n.length ? /* @__PURE__ */ (0, V.jsx)("dl", {
			className: "flex flex-col gap-1 border-t border-separator-border bg-background-primary-default px-4 py-2.5",
			children: n.map(([e, t]) => /* @__PURE__ */ (0, V.jsxs)("div", {
				className: "flex min-w-0 flex-wrap gap-x-2",
				children: [
					/* @__PURE__ */ (0, V.jsx)("dt", {
						className: "text-body-2-regular text-text-secondary",
						children: H[e] || e
					}),
					/* @__PURE__ */ (0, V.jsx)("dd", {
						className: "min-w-0 text-body-2-regular break-words text-text-primary",
						children: t.display_value
					}),
					(t.warnings || []).map((e) => /* @__PURE__ */ (0, V.jsx)("small", {
						className: "w-full text-caption-1-regular text-status-yellow-text",
						children: e
					}, e))
				]
			}, e))
		}) : null]
	});
}
function Re({ row: e, fieldName: t, value: n, onChange: r, locked: o }) {
	let s = e.candidates || [];
	return s.length ? s.length === 1 ? /* @__PURE__ */ (0, V.jsx)("div", {
		className: "flex overflow-hidden rounded-surface border border-separator-border bg-background-secondary-default",
		children: /* @__PURE__ */ (0, V.jsx)(W, { candidate: s[0] })
	}) : /* @__PURE__ */ (0, V.jsx)(i, {
		"aria-label": `${t || "资料"}的来源`,
		value: n,
		isDisabled: o,
		onChange: r,
		className: "flex flex-col gap-2",
		children: s.map((e) => /* @__PURE__ */ (0, V.jsx)(a, {
			value: e.candidate_key,
			className: "relative group flex cursor-pointer items-center gap-2 overflow-hidden rounded-surface border border-separator-border bg-background-secondary-default outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring data-selected:border-border-button-active data-disabled:cursor-not-allowed",
			children: /* @__PURE__ */ (0, V.jsx)(W, {
				candidate: e,
				selectable: !0
			})
		}, e.candidate_key))
	}) : null;
}
function G({ genre: e, tags: t, locked: n, toast: r }) {
	let [i, a] = (0, B.useState)(""), [s, c] = (0, B.useState)(""), l = Me({
		mutationFn: (t) => F(e, t),
		onSuccess: async (t, n) => {
			t.ok ? (r(n ? `已把「${e}」收录为标签「${n}」` : `已把「${e}」判为非内容标签`), await ve()) : c(t.error || "服务端拒绝了这次收录");
		},
		onError: (e) => c(N(e))
	}), u = () => {
		let e = i.trim();
		e ? (c(""), l.mutate(e)) : c("先给它一个中文标签");
	};
	return /* @__PURE__ */ (0, V.jsxs)("div", {
		className: "flex flex-wrap items-center gap-2",
		children: [
			/* @__PURE__ */ (0, V.jsx)("b", {
				lang: "ja",
				className: "text-body-medium text-text-primary",
				children: e
			}),
			/* @__PURE__ */ (0, V.jsx)(E, {
				"aria-label": `「${e}」收录成的中文标签`,
				value: i,
				onChange: a,
				maxLength: 40,
				isDisabled: n || l.isPending,
				className: "min-w-40 flex-1",
				children: /* @__PURE__ */ (0, V.jsx)(h, {
					size: "small",
					list: t.length ? U : void 0,
					autoComplete: "off",
					placeholder: "中文标签",
					onKeyDown: (e) => {
						e.key !== "Enter" || e.nativeEvent.isComposing || (e.preventDefault(), u());
					}
				})
			}),
			/* @__PURE__ */ (0, V.jsx)(o, {
				variant: "secondary",
				size: "small",
				disabled: n || l.isPending,
				onClick: u,
				children: "收录"
			}),
			/* @__PURE__ */ (0, V.jsx)(o, {
				variant: "secondary",
				size: "small",
				disabled: n || l.isPending,
				onClick: () => {
					c(""), l.mutate("");
				},
				children: "不是内容"
			}),
			s ? /* @__PURE__ */ (0, V.jsx)("p", {
				role: "status",
				className: "w-full text-body-2-regular text-text-error-primary",
				children: s
			}) : null
		]
	});
}
function ze({ row: e, tags: t, locked: n, toast: r }) {
	let i = _e(e);
	return i.length ? /* @__PURE__ */ (0, V.jsxs)("div", {
		role: "group",
		"aria-label": "未收录 genre",
		className: "flex flex-col gap-2 rounded-surface border border-separator-border bg-background-primary-default px-4 py-3",
		children: [/* @__PURE__ */ (0, V.jsx)("h5", {
			className: "text-body-2-medium text-text-secondary",
			children: `未收录 genre · ${i.length}`
		}), /* @__PURE__ */ (0, V.jsx)("div", {
			role: "list",
			className: "flex flex-col",
			children: i.map((e, i) => /* @__PURE__ */ (0, V.jsx)("div", {
				role: "listitem",
				className: `py-3 first:pt-0 last:pb-0 ${i ? "border-t border-separator-border" : ""}`,
				children: /* @__PURE__ */ (0, V.jsx)(G, {
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
var Be = (e = "") => /^https?:\/\//i.test(e) ? e : "", K = (e = "") => Be(e) || (e.startsWith("/") && !e.startsWith("//") ? e : "");
function q({ url: e }) {
	let t = K(e || "");
	return /* @__PURE__ */ (0, V.jsx)(Ve, { source: t }, t);
}
function Ve({ source: e }) {
	let [t, n] = (0, B.useState)("idle");
	return (0, B.useEffect)(() => {
		if (t !== "loading") return;
		let e = setTimeout(() => n("failed"), 3e4);
		return () => clearTimeout(e);
	}, [t]), /* @__PURE__ */ (0, V.jsxs)("div", {
		className: "relative flex h-review-image items-center justify-center overflow-hidden rounded-surface bg-background-secondary-default",
		children: [t === "loading" ? /* @__PURE__ */ (0, V.jsxs)("span", {
			role: "status",
			className: "absolute flex items-center gap-2 text-body-2-regular text-text-secondary",
			children: [/* @__PURE__ */ (0, V.jsx)("span", { dangerouslySetInnerHTML: { __html: L("正在加载图片") } }), "正在加载图片"]
		}) : null, e && (t === "loading" || t === "ready") ? /* @__PURE__ */ (0, V.jsx)("img", {
			src: e,
			alt: "来源提供的备选图片",
			referrerPolicy: "no-referrer",
			decoding: "async",
			className: `size-full object-contain ${t === "loading" ? "invisible" : ""}`,
			onLoad: () => n("ready"),
			onError: () => n("failed")
		}) : e ? /* @__PURE__ */ (0, V.jsxs)("div", {
			className: "flex flex-col items-center gap-2",
			children: [t === "failed" ? /* @__PURE__ */ (0, V.jsx)("span", {
				className: "text-body-2-regular text-text-secondary",
				children: "未取得来源图片"
			}) : null, /* @__PURE__ */ (0, V.jsx)(o, {
				variant: "secondary",
				size: "small",
				"aria-label": t === "failed" ? "立即重试加载来源图片" : void 0,
				onClick: () => n("loading"),
				children: t === "failed" ? "立即重试" : "查看来源图片"
			})]
		}) : /* @__PURE__ */ (0, V.jsx)("span", {
			className: "text-body-2-regular text-text-secondary",
			children: "未取得来源图片"
		})]
	});
}
function He({ asset: e, openItem: t }) {
	let n = e.name || "";
	return /* @__PURE__ */ (0, V.jsxs)("div", {
		className: "flex min-w-0 items-center gap-2.5 rounded-surface bg-background-secondary-default p-2",
		children: [/* @__PURE__ */ (0, V.jsxs)("button", {
			type: "button",
			onClick: () => t(e.id),
			className: "flex aspect-card-cover w-review-cover-narrow shrink-0 review-tight:w-review-cover cursor-pointer items-center justify-center overflow-hidden rounded-2lg bg-background-tertiary-default outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring",
			children: [e.preview_url ? /* @__PURE__ */ (0, V.jsx)("img", {
				src: e.preview_url,
				alt: "",
				loading: "lazy",
				className: "size-full object-cover"
			}) : /* @__PURE__ */ (0, V.jsx)("span", {
				className: "text-caption-1-regular text-text-secondary",
				children: "无封面"
			}), /* @__PURE__ */ (0, V.jsx)(r, { children: `打开原视频 ${n}` })]
		}), /* @__PURE__ */ (0, V.jsxs)("div", {
			className: "flex min-w-0 flex-col items-start gap-1",
			children: [/* @__PURE__ */ (0, V.jsx)("b", {
				title: n,
				className: "w-full truncate text-body-medium text-text-primary",
				children: e.code || n || "原视频"
			}), /* @__PURE__ */ (0, V.jsx)(o, {
				variant: "secondary",
				size: "small",
				leadingIcon: te,
				onClick: () => t(e.id),
				children: "打开原视频"
			})]
		})]
	});
}
function J({ kind: e, name: t, works: n, avatar: r, openEntity: i }) {
	return /* @__PURE__ */ (0, V.jsxs)("div", {
		className: "flex min-w-0 items-center gap-3",
		children: [/* @__PURE__ */ (0, V.jsx)("button", {
			type: "button",
			"aria-label": `打开创作者页：${t}`,
			onClick: () => i(e, t),
			className: `relative inline-grid size-11 shrink-0 cursor-pointer place-items-center overflow-hidden rounded-full bg-background-secondary-default text-caption-1-medium text-text-secondary outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring ${z}`,
			dangerouslySetInnerHTML: { __html: r }
		}), /* @__PURE__ */ (0, V.jsxs)("div", {
			className: "flex min-w-0 flex-col items-start",
			children: [/* @__PURE__ */ (0, V.jsx)("button", {
				type: "button",
				onClick: () => i(e, t),
				className: "max-w-full cursor-pointer truncate text-body-medium text-text-primary underline-offset-2 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-border-focus-ring",
				children: t
			}), n ? /* @__PURE__ */ (0, V.jsx)("small", {
				className: "tabular-nums text-body-2-regular text-text-secondary",
				children: `${n.toLocaleString()} 部作品`
			}) : null]
		})]
	});
}
function Y({ row: e, openItem: t, openEntity: n, onReveal: r, revealing: i, note: a }) {
	let c = Be(e.profile_url || ""), l = (e.preview_assets || []).slice(0, 6), u = Math.max(0, Number(e.video_count || e.videos || 0));
	return /* @__PURE__ */ (0, V.jsxs)("section", {
		className: "flex flex-col gap-3",
		children: [
			/* @__PURE__ */ (0, V.jsx)("h5", {
				className: "text-body-medium text-text-primary",
				children: `待确认人物：${e.babepedia_name || "未标注"}`
			}),
			/* @__PURE__ */ (0, V.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [c ? /* @__PURE__ */ (0, V.jsx)(s, {
					variant: "secondary",
					size: "small",
					trailingIcon: D,
					href: c,
					target: "_blank",
					rel: "noopener noreferrer",
					children: "来源资料"
				}) : null, /* @__PURE__ */ (0, V.jsx)(o, {
					variant: "secondary",
					size: "small",
					onClick: () => n("creator", e.creator || ""),
					children: `查看全部 ${u.toLocaleString()} 部作品`
				})]
			}),
			/* @__PURE__ */ (0, V.jsx)(q, { url: e.preview_url }),
			/* @__PURE__ */ (0, V.jsx)("p", {
				className: "text-body-2-regular text-text-secondary",
				children: "通过后记录身份判断。"
			}),
			l.length ? /* @__PURE__ */ (0, V.jsxs)(V.Fragment, { children: [/* @__PURE__ */ (0, V.jsx)("h5", {
				className: "text-body-medium text-text-primary",
				children: "本地作品样本"
			}), /* @__PURE__ */ (0, V.jsx)("ul", {
				className: "flex flex-col gap-1",
				children: l.map((e) => /* @__PURE__ */ (0, V.jsxs)("li", {
					className: "flex min-w-0 items-center gap-2",
					children: [/* @__PURE__ */ (0, V.jsx)(o, {
						variant: "ghost",
						size: "small",
						className: "min-w-0",
						onClick: () => t(e.id),
						children: /* @__PURE__ */ (0, V.jsx)("span", {
							title: e.name,
							className: "block max-w-full truncate",
							children: e.name
						})
					}), /* @__PURE__ */ (0, V.jsx)(o, {
						variant: "ghost",
						size: "small",
						"aria-label": `打开 ${e.name} 的文件位置`,
						...k(i === e.id),
						onClick: () => r(e.id),
						children: "文件位置"
					})]
				}, e.id))
			})] }) : /* @__PURE__ */ (0, V.jsx)("p", {
				className: "text-body-2-regular text-text-secondary",
				children: "暂无本地作品样本，打开全部作品核对。"
			}),
			a ? /* @__PURE__ */ (0, V.jsx)("p", {
				role: "status",
				className: "text-body-2-regular text-text-error-primary",
				children: a
			}) : null
		]
	});
}
function Ue({ assets: e, picked: t, onPicked: n, locked: i }) {
	let [a, o] = (0, B.useState)(null), s = new Set(t), c = (t, r) => {
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
	return /* @__PURE__ */ (0, V.jsxs)("div", {
		className: "flex flex-col gap-2",
		children: [/* @__PURE__ */ (0, V.jsx)(w, {
			prefix: /* @__PURE__ */ (0, V.jsx)("span", {
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
		}), /* @__PURE__ */ (0, V.jsx)("div", {
			className: "review-asset-grid gap-1.5",
			children: e.map((e, t) => {
				let n = s.has(e.id);
				return /* @__PURE__ */ (0, V.jsxs)("button", {
					type: "button",
					"aria-pressed": n,
					title: e.name,
					onClick: (e) => c(t, e.shiftKey),
					className: `relative aspect-card-cover cursor-pointer overflow-hidden rounded-surface bg-background-tertiary-default outline-none transition-opacity focus-visible:ring-2 focus-visible:ring-border-focus-ring ${n ? "opacity-100 ring-2 ring-border-button-active ring-inset" : "opacity-50"}`,
					children: [
						/* @__PURE__ */ (0, V.jsx)("img", {
							src: `/poster?id=${e.id}&c=4`,
							alt: "",
							loading: "lazy",
							className: "size-full object-cover"
						}),
						/* @__PURE__ */ (0, V.jsx)("span", {
							className: "absolute top-1 right-1",
							children: /* @__PURE__ */ (0, V.jsx)(l, {
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
						/* @__PURE__ */ (0, V.jsx)(r, { children: `${n ? "已选" : "未选"} ${e.name || e.id}` })
					]
				}, e.id);
			})
		})]
	});
}
// src/react/review/review-card.tsx
var We = A({
	variant: "outlined",
	padding: "none",
	className: "flex flex-col gap-4 px-5 pt-4"
}), X = "flex min-h-6 min-w-0 items-center", Z = 2, Ge = (e) => e === "western_identity" ? "h-review-card-tall" : "h-review-card";
function Ke(e) {
	let { category: t, row: n, choice: r, onChoice: i, selected: a, onSelect: s, locked: l, busy: d, problem: m, genreTags: te, onDecide: h, handlers: g, queueView: _ = "pending" } = e, v = (0, B.useRef)(!1), y = R(), ne = R(), re = t === "metadata_fields", ie = f[t] || "", x = String(n.creator || "").trim(), S = !!ie && !!x, C = Oe(t, n), w = Te(t, n), T = Ee(t, n), E = we(n), D = De(n), O = oe(t, n), A = n.comparison_assets || [], j = n.preview_assets || [], se = b[n.decision || ""], M = A.length > 1 ? /* @__PURE__ */ (0, V.jsxs)("div", {
		className: "flex flex-col gap-3",
		children: [A.slice(0, Z).map((e) => /* @__PURE__ */ (0, V.jsx)(He, {
			asset: e,
			openItem: g.openItem
		}, e.id)), A.length > Z ? /* @__PURE__ */ (0, V.jsx)("p", {
			className: "text-body-2-regular text-text-secondary",
			children: `另有 ${(A.length - Z).toLocaleString()} 部对照作品`
		}) : null]
	}) : S ? /* @__PURE__ */ (0, V.jsx)(J, {
		kind: ie,
		name: x,
		works: Number(n.video_count || n.videos || 0),
		openEntity: g.openEntity,
		avatar: ae(x, n.entity_id ? {
			id: n.entity_id,
			has_image: !!n.has_image,
			image_version: n.image_version,
			avatar_focus: n.avatar_focus
		} : null, null, ie)
	}) : n.asset_id ? /* @__PURE__ */ (0, V.jsx)(He, {
		openItem: g.openItem,
		asset: {
			id: n.asset_id,
			name: n.asset_name,
			preview_url: n.asset_preview_url
		}
	}) : null, ce = re ? /* @__PURE__ */ (0, V.jsx)(Re, {
		row: n,
		fieldName: w,
		value: r.candidateKey,
		onChange: (e) => i({
			...r,
			candidateKey: e
		}),
		locked: l
	}) : t === "creator_tags" ? j.length ? /* @__PURE__ */ (0, V.jsx)(Ue, {
		assets: j,
		picked: r.assets,
		locked: l,
		onPicked: (e) => i({
			...r,
			assets: e
		})
	}) : /* @__PURE__ */ (0, V.jsx)(p, {
		size: "compact",
		icon: ee,
		title: "这批作品尚未抽帧",
		children: `${n.video_count || ""} 条作品还没有可用预览；批准后仍会按所选资料写入标签。`
	}) : t === "fc2_similarity" ? null : t === "western_identity" ? /* @__PURE__ */ (0, V.jsx)(Y, {
		row: n,
		openItem: g.openItem,
		openEntity: g.openEntity,
		onReveal: g.onReveal,
		revealing: g.revealing,
		note: g.revealNote
	}) : /* @__PURE__ */ (0, V.jsx)(q, { url: n.preview_url }), le = S ? M : w ? /* @__PURE__ */ (0, V.jsxs)("h4", {
		className: `${X} flex-wrap gap-2`,
		children: [/* @__PURE__ */ (0, V.jsx)("span", {
			title: w,
			className: "flex max-w-full min-w-0 overflow-hidden rounded-md",
			children: /* @__PURE__ */ (0, V.jsx)(u, {
				variant: "caption",
				color: "blue",
				children: w
			})
		}), /* @__PURE__ */ (0, V.jsx)("span", {
			title: T,
			className: "min-w-0 truncate text-body-medium text-text-primary",
			children: T
		})]
	}) : /* @__PURE__ */ (0, V.jsx)("h4", {
		className: X,
		children: /* @__PURE__ */ (0, V.jsx)("span", {
			title: C,
			className: "min-w-0 truncate text-body-medium text-text-primary",
			children: C
		})
	});
	return /* @__PURE__ */ (0, V.jsxs)("section", {
		"aria-label": C,
		"data-review-key": n.item_key,
		className: `${We} ${Ge(t)} overflow-hidden`,
		children: [
			/* @__PURE__ */ (0, V.jsxs)("header", {
				className: "flex min-w-0 shrink-0 items-start gap-2",
				children: [
					l ? null : /* @__PURE__ */ (0, V.jsx)("span", {
						className: `${X} shrink-0`,
						onPointerDownCapture: (e) => {
							v.current = e.shiftKey;
						},
						onKeyDownCapture: (e) => {
							v.current = e.shiftKey;
						},
						children: /* @__PURE__ */ (0, V.jsx)(c, {
							isSelected: a,
							"aria-label": `选择 ${C}`,
							onChange: (e) => s(v.current, e)
						})
					}),
					/* @__PURE__ */ (0, V.jsx)("div", {
						className: "min-w-0 flex-1",
						children: le
					}),
					se ? /* @__PURE__ */ (0, V.jsx)(u, {
						variant: "caption",
						color: "neutral",
						children: se
					}) : null
				]
			}),
			/* @__PURE__ */ (0, V.jsx)("div", {
				className: "relative flex min-w-0 min-h-0 flex-1 flex-col",
				children: /* @__PURE__ */ (0, V.jsxs)("div", {
					ref: y,
					className: "flex min-w-0 min-h-0 flex-1 flex-col gap-3 overflow-y-auto",
					children: [
						n.source_name ? /* @__PURE__ */ (0, V.jsx)("p", {
							className: "text-body-2-regular text-text-secondary",
							children: `来源写法：${n.source_name}`
						}) : null,
						!S && (n.board || n.assets) ? /* @__PURE__ */ (0, V.jsx)("p", {
							className: "text-body-2-regular text-text-secondary",
							children: `对照文件：${Number(n.video_count || n.assets || 0).toLocaleString()}`
						}) : null,
						!S && M ? M : null,
						D.length || t === "creator_tags" ? /* @__PURE__ */ (0, V.jsx)("div", {
							className: "flex flex-wrap gap-1",
							children: D.length ? D.map((e) => /* @__PURE__ */ (0, V.jsx)(u, {
								variant: "caption",
								color: "soft",
								children: e
							}, e)) : /* @__PURE__ */ (0, V.jsx)("small", {
								className: "text-body-2-regular text-text-secondary",
								children: "暂无待确认标签"
							})
						}) : null,
						ce,
						/* @__PURE__ */ (0, V.jsx)(ze, {
							row: n,
							tags: te,
							locked: l,
							toast: g.toast
						}),
						!re && E ? /* @__PURE__ */ (0, V.jsx)("p", {
							className: "text-body-2-regular text-text-secondary wrap-anywhere",
							children: E
						}) : null
					]
				})
			}),
			re && E ? /* @__PURE__ */ (0, V.jsx)("div", {
				className: "relative -mx-5 -mb-4 shrink-0",
				children: /* @__PURE__ */ (0, V.jsx)("p", {
					ref: ne,
					role: "region",
					"aria-label": "当前信息",
					className: "max-h-22 overflow-y-auto border-t border-separator-border px-5 py-2.5 text-body-2-regular text-text-secondary wrap-anywhere",
					children: E
				})
			}) : null,
			/* @__PURE__ */ (0, V.jsxs)("footer", {
				className: "-mx-5 flex min-h-14 shrink-0 flex-wrap items-center justify-end gap-2 rounded-b-surface border-t border-separator-border bg-background-secondary-default py-3 pr-3 pl-5",
				children: [
					_ === "ignored" ? null : /* @__PURE__ */ (0, V.jsx)(o, {
						variant: "ghost",
						size: "small",
						disabled: l,
						...k(d),
						onClick: () => h("rejected"),
						children: "忽略"
					}),
					_ === "pending" ? /* @__PURE__ */ (0, V.jsx)(o, {
						variant: "secondary",
						size: "small",
						disabled: l,
						...k(d),
						onClick: () => h("skipped"),
						children: "稍后处理"
					}) : /* @__PURE__ */ (0, V.jsx)(o, {
						variant: _ === "ignored" ? "primary" : "secondary",
						size: "small",
						disabled: l,
						...k(d),
						onClick: () => h("restore"),
						children: "恢复待处理"
					}),
					_ === "ignored" ? null : /* @__PURE__ */ (0, V.jsx)(o, {
						variant: "primary",
						size: "small",
						disabled: l || !O,
						...k(d),
						title: O ? void 0 : "没有可采用的资料，可先保留或忽略",
						onClick: () => h("approved"),
						children: O ? "通过" : "不可通过"
					}),
					m ? /* @__PURE__ */ (0, V.jsx)("p", {
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
var qe = "flex cursor-pointer items-center justify-between gap-2";
function Je({ page: e, pages: t, onPage: n }) {
	return t <= 1 ? null : /* @__PURE__ */ (0, V.jsxs)("nav", {
		"aria-label": "复核分页",
		"data-pagination-layout": "",
		className: "inline-grid w-full min-w-0 items-center gap-2",
		children: [
			/* @__PURE__ */ (0, V.jsx)(o, {
				variant: "secondary",
				size: "small",
				disabled: e <= 1,
				onClick: () => n(e - 1),
				children: "上一页"
			}),
			/* @__PURE__ */ (0, V.jsx)("ul", {
				className: "flex min-w-0 flex-wrap items-center justify-center gap-1",
				children: P(e, t).map((t, r) => /* @__PURE__ */ (0, V.jsx)("li", { children: t === "…" ? /* @__PURE__ */ (0, V.jsx)("span", {
					"aria-hidden": !0,
					className: "px-1 text-body-2-regular text-text-tertiary",
					children: "…"
				}) : /* @__PURE__ */ (0, V.jsx)(o, {
					variant: t === e ? "secondary" : "ghost",
					size: "small",
					"aria-label": `第 ${t} 页`,
					"aria-current": t === e ? "page" : void 0,
					onClick: () => n(Number(t)),
					children: t
				}) }, t === "…" ? `dots-${r}` : t))
			}),
			/* @__PURE__ */ (0, V.jsx)(o, {
				variant: "secondary",
				size: "small",
				disabled: e >= t,
				onClick: () => n(e + 1),
				children: "下一页"
			})
		]
	});
}
function Q(r) {
	let [i, a] = (0, B.useState)(() => matchMedia("(max-width:900px)").matches);
	(0, B.useEffect)(() => {
		let e = matchMedia("(max-width:900px)"), t = () => a(e.matches);
		return e.addEventListener("change", t), () => e.removeEventListener("change", t);
	}, []);
	let { route: s, openItem: c, openEntity: l, revealSource: u, toast: f, readOnly: ee, readOnlyMessage: te, writerUrl: h } = r, [b, S] = (0, B.useState)(pe(r.category) ? r.category : d), [C, w] = (0, B.useState)(() => Se(r.queue)), [T, E] = (0, B.useState)("candidates"), [D, O] = (0, B.useState)(""), [ae, k] = (0, B.useState)(1), [A, j] = (0, B.useState)(/* @__PURE__ */ new Set()), [me, P] = (0, B.useState)(/* @__PURE__ */ new Map()), [_e, F] = (0, B.useState)(/* @__PURE__ */ new Map()), [ve, I] = (0, B.useState)(""), ye = (0, B.useRef)(null), [we, Te] = (0, B.useState)(0), [Ee, De] = (0, B.useState)(""), Oe = (0, B.useRef)(!0);
	(0, B.useEffect)(() => () => {
		Oe.current = !1;
	}, []);
	let L = Ne({
		queryKey: ne,
		queryFn: ({ signal: e }) => ue(e)
	}), R = L.data || {
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
	}, z = xe(R, C), H = z.sections[b] || [], U = b === "metadata_fields", W = ee;
	(0, B.useEffect)(() => {
		let e = new Set(H.map((e) => e.item_key));
		j((t) => {
			let n = [...t].filter((t) => e.has(t));
			return n.length === t.size ? t : new Set(n);
		}), P((t) => {
			let n = [...t].filter(([t]) => e.has(t));
			return n.length === t.size ? t : new Map(n);
		}), F((t) => {
			let n = [...t].filter(([t]) => e.has(t));
			return n.length === t.size ? t : new Map(n);
		});
	}, [H]);
	let Re = be(H, U), G = Re.some(([e]) => e === T) ? T : "candidates", ze = fe(H, G), Be = ze.some((e) => e.key === D) ? D : "", K = Ce(de(H, G, Be), ae), q = K.rows.map((e) => e.item_key), Ve = new Set(q), He = ze.map((e) => ({
		...e,
		rows: e.rows.filter((e) => Ve.has(e.item_key))
	})).filter((e) => e.rows.length), J = (e) => me.get(e.item_key) || le(e), Y = H.filter((e) => A.has(e.item_key)), Ue = (e) => {
		let t = new Set(e);
		j((e) => new Set([...e].filter((e) => !t.has(e)))), P((e) => new Map([...e].filter(([e]) => !t.has(e)))), F((e) => new Map([...e].filter(([e]) => !t.has(e))));
	}, We = (e, t) => F((n) => new Map(n).set(e, t)), X = () => {
		E("candidates"), O(""), k(1), j(/* @__PURE__ */ new Set()), P(/* @__PURE__ */ new Map()), F(/* @__PURE__ */ new Map()), I(""), ye.current = null;
	}, Z = (e) => {
		S(e), X(), s({
			category: e === "metadata_fields" ? "" : e,
			queue: C === "pending" ? "" : C
		});
	}, Ge = (e) => {
		w(e), X(), s({
			category: b === "metadata_fields" ? "" : b,
			queue: e === "pending" ? "" : e
		});
	}, Q = Me({
		mutationFn: ({ row: e, status: t, category: n }) => je(M(n, se(n, e), t, J(e))),
		onSuccess: (e, { row: t, status: n, category: r }) => {
			e.ok ? (Ae(r, [t.item_key], n), Ue([t.item_key]), f(ce(n))) : We(t.item_key, e.error || "服务端拒绝了这次判定");
		},
		onError: (e, { row: t }) => We(t.item_key, N(e))
	}), $ = Me({
		mutationFn: async ({ status: e, category: t, rows: n }) => {
			let r = [], i = [];
			for (let [a, o] of n.entries()) {
				if (!Oe.current) break;
				I(`正在处理 ${a} / ${n.length}`);
				try {
					let n = await je(M(t, se(t, o), e, J(o)));
					if (!n.ok) throw Error(n.error || "服务端未采用该项");
					r.push(o.item_key);
				} catch (e) {
					i.push([o.item_key, N(e)]);
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
			Ae(t, n, e), Ue(n), r.forEach(([e, t]) => We(e, t)), I("");
			let i = {
				approved: "通过",
				rejected: "忽略",
				skipped: "移至稍后处理",
				restore: "恢复待处理"
			}[e];
			f(`已${i} ${n.length} 项` + (r.length ? `，${r.length} 项未完成` : ""));
		},
		onError: (e) => {
			I(N(e));
		}
	}), Ye = (e) => {
		!$.isPending && Y.length && (e === "approved" && U && Y.some((e) => !J(e).candidateKey) ? I("请先为所选资料选择要采用的来源。") : (I(""), $.mutate({
			status: e,
			category: b,
			rows: Y
		})));
	}, Xe = (e) => {
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
		}), I(`已选择 ${e}，点击通过所选采用。`);
	}, Ze = async (e) => {
		if (we) return;
		Te(e), De("");
		let t = await u(e);
		Oe.current && (Te(0), De(t));
	}, Qe = ge(R.mirror, te), $e = R.genre_tags || [], et = {
		openItem: c,
		openEntity: l,
		onReveal: Ze,
		revealing: we,
		revealNote: Ee,
		toast: f
	};
	return /* @__PURE__ */ (0, V.jsx)(Pe, { children: /* @__PURE__ */ (0, V.jsxs)("div", {
		className: "flex flex-col gap-5 pb-10",
		children: [
			W ? /* @__PURE__ */ (0, V.jsx)(g, {
				tone: "warning",
				title: "本机只能浏览",
				extra: h ? /* @__PURE__ */ (0, V.jsx)("p", {
					className: "text-body-2-regular",
					children: /* @__PURE__ */ (0, V.jsx)(m, {
						href: h,
						children: "前往写入端复核"
					})
				}) : void 0,
				children: Qe
			}) : null,
			/* @__PURE__ */ (0, V.jsx)(Le, { tags: $e }),
			/* @__PURE__ */ (0, V.jsx)(v, {
				"aria-label": "复核状态",
				"data-pill-nav": "",
				className: "flex w-fit max-w-full flex-nowrap gap-1 overflow-x-auto",
				children: ie.map((e) => /* @__PURE__ */ (0, V.jsxs)(_, {
					variant: "gray",
					isSelected: C === e,
					disabled: Q.isPending || $.isPending,
					onSelect: () => {
						e !== C && Ge(e);
					},
					children: [
						/* @__PURE__ */ (0, V.jsx)("span", {
							"data-copy-key": `review.queue.${e}`,
							children: x[e]
						}),
						" ",
						/* @__PURE__ */ (0, V.jsx)("span", {
							className: "tabular-nums text-caption-1-medium text-text-secondary",
							children: L.data ? y.reduce((t, n) => t + Number(xe(R, e).counts[n] || 0), 0).toLocaleString() : "…"
						})
					]
				}, e))
			}),
			/* @__PURE__ */ (0, V.jsxs)(n, {
				orientation: i ? "horizontal" : "vertical",
				selectedKey: b,
				onSelectionChange: (e) => {
					let t = String(e);
					pe(t) && Z(t);
				},
				className: "flex flex-col gap-5 review-split:flex-row review-split:items-start review-split:gap-6",
				children: [/* @__PURE__ */ (0, V.jsxs)("div", {
					"data-section-nav": !0,
					className: "w-full min-w-0 review-split:sticky review-split:top-topbar review-split:w-review-tabs review-split:shrink-0",
					children: [/* @__PURE__ */ (0, V.jsx)("h2", {
						id: "reviewcategories",
						children: "复核分类"
					}), /* @__PURE__ */ (0, V.jsx)(Fe, {
						scrollable: i,
						"aria-labelledby": "reviewcategories",
						"data-section-items": !0,
						className: "flex review-split:flex-col review-split:items-stretch",
						children: y.map((e) => {
							let n = Number(z.counts[e] || 0);
							return /* @__PURE__ */ (0, V.jsxs)(t, {
								id: e,
								className: qe,
								isDisabled: Q.isPending || $.isPending,
								"data-pill-selected": b === e ? "" : void 0,
								"data-pill-variant": "gray",
								children: [re[e], n ? /* @__PURE__ */ (0, V.jsx)("span", {
									className: "tabular-nums text-caption-1-medium text-text-secondary",
									children: n.toLocaleString()
								}) : null]
							}, e);
						})
					})]
				}), /* @__PURE__ */ (0, V.jsxs)(e, {
					id: b,
					className: "flex min-w-0 flex-1 flex-col gap-5",
					children: [
						H.length && !W ? /* @__PURE__ */ (0, V.jsx)(Ie, {
							queueView: C,
							groupOptions: Re,
							groupBy: G,
							onGroupBy: (e) => {
								E(e), O(""), k(1);
							},
							groups: ze,
							filter: Be,
							onFilter: (e) => {
								O(e), k(1);
							},
							pageKeys: q,
							selected: A,
							onSelected: j,
							selectedRows: Y,
							metadata: U,
							approvable: Y.every((e) => oe(b, e)),
							busy: $.isPending || Q.isPending,
							feedback: ve,
							onUnifySource: Xe,
							onRun: Ye
						}) : null,
						K.rows.length ? He.map((e) => /* @__PURE__ */ (0, V.jsxs)("section", {
							className: "flex flex-col gap-3",
							children: [He.length > 1 || G !== "candidates" ? /* @__PURE__ */ (0, V.jsxs)("div", {
								className: "flex flex-wrap items-center gap-2",
								children: [/* @__PURE__ */ (0, V.jsx)("h3", {
									className: "text-body-medium text-text-primary",
									children: `${e.title} · ${e.rows.length}`
								}), W ? null : /* @__PURE__ */ (0, V.jsx)(o, {
									variant: "ghost",
									size: "small",
									onClick: () => {
										let t = e.rows.map((e) => e.item_key), n = t.every((e) => A.has(e)), r = new Set(A);
										for (let e of t) n ? r.delete(e) : r.add(e);
										j(r);
									},
									children: e.rows.every((e) => A.has(e.item_key)) ? "清空本组" : "全选本组"
								})]
							}) : null, /* @__PURE__ */ (0, V.jsx)("div", {
								className: "review-grid gap-5",
								children: e.rows.map((e) => /* @__PURE__ */ (0, V.jsx)(Ke, {
									category: b,
									row: e,
									queueView: C,
									choice: J(e),
									onChoice: (t) => P((n) => new Map(n).set(e.item_key, t)),
									selected: A.has(e.item_key),
									onSelect: (t, n) => j((r) => {
										let i = new Set(r);
										return ye.current = ke(i, q, ye.current, e.item_key, t, n), i;
									}),
									locked: W,
									busy: $.isPending || Q.isPending && Q.variables?.row.item_key === e.item_key,
									problem: _e.get(e.item_key) || "",
									genreTags: $e,
									onDecide: (t) => {
										Q.isPending || $.isPending || (F((t) => new Map([...t].filter(([t]) => t !== e.item_key))), Q.mutate({
											row: e,
											status: t,
											category: b
										}));
									},
									handlers: et
								}, e.item_key))
							})]
						}, e.key)) : L.isError && !L.data ? /* @__PURE__ */ (0, V.jsx)(g, {
							tone: "error",
							title: "复核队列读取失败",
							action: /* @__PURE__ */ (0, V.jsx)(o, {
								variant: "secondary",
								size: "small",
								disabled: L.isFetching,
								onClick: () => void L.refetch(),
								children: "立即重试"
							}),
							children: N(L.error)
						}) : /* @__PURE__ */ (0, V.jsx)(p, {
							icon: he,
							title: `此分类没有${x[C]}项目`,
							actions: y.some((e) => e !== b && Number(z.counts[e] || 0) > 0) ? /* @__PURE__ */ (0, V.jsx)(o, {
								size: "small",
								onClick: () => {
									let e = y.find((e) => e !== b && Number(z.counts[e] || 0) > 0);
									e && Z(e);
								},
								children: "查看其他分类"
							}) : void 0,
							children: C === "pending" ? "可切换分类查看其他待确认资料。" : `${x[C]}的资料会保留在这里，可恢复到待处理。`
						}),
						/* @__PURE__ */ (0, V.jsx)(Je, {
							page: K.page,
							pages: K.pages,
							onPage: k
						})
					]
				})]
			})
		]
	}) });
}
export { Q as ReviewPage };

//# debugId=4b0521d5-ac52-4070-85f4-af5c445c7d99