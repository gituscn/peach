(function() {
	try {
		var e = typeof window < "u" ? window : typeof global < "u" ? global : typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : {}, t = new e.Error().stack;
		t && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[t] = "5d38737a-8167-4a7a-b8b7-f256ab67572b", e._sentryDebugIdIdentifier = "sentry-dbid-5d38737a-8167-4a7a-b8b7-f256ab67572b");
	} catch {}
})();
import { $b4f18e3395fe64d7$export$3d96ec278d3efce4 as e, $b4f18e3395fe64d7$export$3e41faf802a29e71 as t, $b4f18e3395fe64d7$export$b2539bed5023c21c as n, $ea3928288112382f$export$439d29a4e110a164 as r, $fe21c36db05242bb$export$a98f0dcb43a68a25 as i, $fe21c36db05242bb$export$d7b12c4107be0d61 as a, Button as o, ButtonLink as s, Checkbox as c, CheckboxGlyph as l, Chip as u, DEFAULT_CATEGORY as d, ENTITY_REVIEW_KINDS as f, Ea as ee, EmptyState as p, ExternalLink as m, Gg as h, InputBase as g, Note as _, REVIEW_CATEGORIES as v, REVIEW_KEY as y, REVIEW_LABELS as te, Select as b, SelectItem as x, SelectionDock as S, TextField as C, Wt as w, __toESM as T, avatarInner as ne, busyProps as E, canApprove as re, cardClass as D, commonReviewSources as O, currentReviewRow as k, decisionPayload as A, decisionReceipt as j, defaultChoice as ie, dropReviewRows as ae, errorMessage as M, fetchReview as oe, filterReviewRows as se, groupReviewRows as ce, isReviewCategory as le, l7 as ue, m7 as de, mirrorText as fe, paginationRange as N, pendingGenres as pe, recordGenre as P, reloadReview as me, require_jsx_runtime as F, require_react as he, reviewGroupingOptions as ge, reviewWindow as _e, rowEvidence as ve, rowFieldName as ye, rowSubject as be, rowTags as xe, rowTitle as I, selectReviewRange as Se, spinnerHtml as L, submitDecision as Ce, useMutation as we, useOverlayScrollbar as R, useQuery as Te } from "./peach-app.js";
import { Page as Ee } from "./peach-app.page-Irl_Wogd.js";
import { LEGACY_AVATAR_IMG as z } from "./peach-app.legacy-avatar-CtPLcaNX.js";
import { PillAriaTabList as De } from "./peach-app.pill-aria-tab-list-CJ47JigD.js";
//#region src/react/review/bulk-toolbar.tsx
var B = /* @__PURE__ */ T(he(), 1), V = F();
function Oe(e) {
	let { groupOptions: t, groupBy: n, onGroupBy: r, groups: i, filter: a, onFilter: s, pageKeys: c, selected: l, onSelected: u, selectedRows: d, metadata: f, approvable: ee, busy: p, feedback: m, onUnifySource: h, onRun: g } = e, _ = c.filter((e) => l.has(e)), v = _.length > 0 && _.length === c.length, y = O(d), te = f && d.some((e) => (e.candidates?.length || 0) > 1), C = y.length ? "统一选择来源" : "所选项目无共同来源";
	return /* @__PURE__ */ (0, V.jsxs)(V.Fragment, { children: [/* @__PURE__ */ (0, V.jsxs)("div", {
		role: "group",
		"aria-label": "复核筛选",
		"data-review-filter": !0,
		"data-glass-pane": "",
		className: "sticky top-topbar z-10 flex flex-wrap items-center gap-2 p-3",
		children: [
			/* @__PURE__ */ (0, V.jsx)(b, {
				"aria-label": "筛选分组方式",
				size: "sm",
				selectedKey: n,
				onSelectionChange: (e) => {
					e !== null && r(String(e));
				},
				children: t.map(([e, t]) => /* @__PURE__ */ (0, V.jsx)(x, {
					id: e,
					children: t
				}, e))
			}),
			i.length > 1 ? /* @__PURE__ */ (0, V.jsxs)(b, {
				"aria-label": n === "field" ? "筛选字段分类" : "筛选当前分类",
				size: "sm",
				prefix: "分类",
				selectedKey: a || "*",
				onSelectionChange: (e) => {
					e !== null && s(String(e) === "*" ? "" : String(e));
				},
				children: [/* @__PURE__ */ (0, V.jsx)(x, {
					id: "*",
					children: "全部"
				}), i.map((e) => /* @__PURE__ */ (0, V.jsx)(x, {
					id: e.key,
					children: `${e.title} · ${e.rows.length}`
				}, e.key))]
			}) : null,
			/* @__PURE__ */ (0, V.jsx)(o, {
				variant: "secondary",
				size: "small",
				leadingIcon: ue,
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
	}), /* @__PURE__ */ (0, V.jsxs)(S, {
		label: "复核所选项目",
		visible: l.size > 0,
		count: `已选 ${l.size} 项`,
		children: [
			te ? /* @__PURE__ */ (0, V.jsxs)(b, {
				"aria-label": "统一选择来源",
				size: "sm",
				selectedKey: "",
				isDisabled: p || !y.length,
				onSelectionChange: (e) => {
					e !== null && e !== "" && h(String(e));
				},
				children: [/* @__PURE__ */ (0, V.jsx)(x, {
					id: "",
					children: C
				}), y.map((e) => /* @__PURE__ */ (0, V.jsx)(x, {
					id: e,
					children: e
				}, e))]
			}) : null,
			/* @__PURE__ */ (0, V.jsx)(o, {
				variant: "danger",
				size: "small",
				disabled: p || !l.size,
				onClick: () => g("rejected"),
				children: "拒绝所选"
			}),
			/* @__PURE__ */ (0, V.jsx)(o, {
				variant: "primary",
				size: "small",
				disabled: p || !l.size || !ee,
				onClick: () => g("approved"),
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
//#endregion
//#region src/react/review/candidate-form.tsx
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
function ke({ tags: e }) {
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
function G({ row: e, fieldName: t, value: n, onChange: r, locked: o }) {
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
			className: "group flex cursor-pointer items-center gap-2 overflow-hidden rounded-surface border border-separator-border bg-background-secondary-default outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring data-selected:border-border-button-active data-disabled:cursor-not-allowed",
			children: /* @__PURE__ */ (0, V.jsx)(W, {
				candidate: e,
				selectable: !0
			})
		}, e.candidate_key))
	}) : null;
}
function K({ genre: e, tags: t, locked: n, toast: r }) {
	let [i, a] = (0, B.useState)(""), [s, c] = (0, B.useState)(""), l = we({
		mutationFn: (t) => P(e, t),
		onSuccess: async (t, n) => {
			t.ok ? (r(n ? `已把「${e}」收录为标签「${n}」` : `已把「${e}」判为非内容标签`), await me()) : c(t.error || "服务端拒绝了这次收录");
		},
		onError: (e) => c(M(e))
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
			/* @__PURE__ */ (0, V.jsx)(C, {
				"aria-label": `「${e}」收录成的中文标签`,
				value: i,
				onChange: a,
				maxLength: 40,
				isDisabled: n || l.isPending,
				className: "min-w-40 flex-1",
				children: /* @__PURE__ */ (0, V.jsx)(g, {
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
function Ae({ row: e, tags: t, locked: n, toast: r }) {
	let i = pe(e);
	return i.length ? /* @__PURE__ */ (0, V.jsxs)("div", {
		role: "group",
		"aria-label": "未收录 genre",
		className: "flex flex-col gap-2 rounded-surface border border-separator-border bg-background-primary-default px-4 py-3",
		children: [/* @__PURE__ */ (0, V.jsx)("h5", {
			className: "text-body-2-medium text-text-secondary",
			children: `未收录 genre · ${i.length}`
		}), i.map((e) => /* @__PURE__ */ (0, V.jsx)(K, {
			genre: e,
			tags: t,
			locked: n,
			toast: r
		}, e))]
	}) : null;
}
//#endregion
//#region src/react/review/review-evidence.tsx
var q = (e = "") => /^https?:\/\//i.test(e) ? e : "", J = (e = "") => q(e) || (e.startsWith("/") && !e.startsWith("//") ? e : "");
function je({ url: e }) {
	let t = J(e || "");
	return /* @__PURE__ */ (0, V.jsx)(Me, { source: t }, t);
}
function Me({ source: e }) {
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
function Y({ asset: e, openItem: t }) {
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
				leadingIcon: h,
				onClick: () => t(e.id),
				children: "打开原视频"
			})]
		})]
	});
}
function X({ kind: e, name: t, works: n, avatar: r, openEntity: i }) {
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
function Ne({ row: e, openItem: t, openEntity: n, onReveal: r, revealing: i, note: a }) {
	let c = q(e.profile_url || ""), l = (e.preview_assets || []).slice(0, 6), u = Math.max(0, Number(e.video_count || e.videos || 0));
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
					trailingIcon: w,
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
			/* @__PURE__ */ (0, V.jsx)(je, { url: e.preview_url }),
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
						...E(i === e.id),
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
function Z({ assets: e, picked: t, onPicked: n, locked: i }) {
	let [a, s] = (0, B.useState)(null), c = new Set(t), u = (t, r) => {
		if (i) return;
		let o = new Set(c);
		if (r && a !== null) {
			let [n, r] = [Math.min(a, t), Math.max(a, t)];
			for (let t = n; t <= r; t++) o.add(e[t].id);
		} else {
			let n = e[t].id;
			o.has(n) ? o.delete(n) : o.add(n);
		}
		s(t), n(e.filter((e) => o.has(e.id)).map((e) => e.id));
	};
	return /* @__PURE__ */ (0, V.jsxs)("div", {
		className: "flex flex-col gap-2",
		children: [/* @__PURE__ */ (0, V.jsxs)("div", {
			className: "flex flex-wrap items-center gap-2",
			children: [
				/* @__PURE__ */ (0, V.jsx)("span", {
					className: "tabular-nums text-body-2-regular text-text-secondary",
					children: `已选 ${c.size} / ${e.length}`
				}),
				/* @__PURE__ */ (0, V.jsx)(o, {
					variant: "ghost",
					size: "small",
					disabled: i,
					onClick: () => n(e.map((e) => e.id)),
					children: "全选"
				}),
				/* @__PURE__ */ (0, V.jsx)(o, {
					variant: "ghost",
					size: "small",
					disabled: i,
					onClick: () => n([]),
					children: "清空"
				})
			]
		}), /* @__PURE__ */ (0, V.jsx)("div", {
			className: "review-asset-grid gap-1.5",
			children: e.map((e, t) => {
				let n = c.has(e.id);
				return /* @__PURE__ */ (0, V.jsxs)("button", {
					type: "button",
					"aria-pressed": n,
					title: e.name,
					onClick: (e) => u(t, e.shiftKey),
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
//#endregion
//#region src/react/review/review-card.tsx
var Pe = D({
	variant: "outlined",
	padding: "none",
	className: "flex flex-col gap-4 px-5 pt-4"
}), Q = "flex min-h-6 min-w-0 items-center", $ = 2, Fe = (e) => e === "western_identity" ? "h-review-card-tall" : "h-review-card";
function Ie(e) {
	let { category: t, row: n, choice: r, onChoice: i, selected: a, onSelect: s, locked: l, busy: d, problem: m, genreTags: h, onDecide: g, handlers: _ } = e, v = (0, B.useRef)(!1), y = R(), te = R(), b = t === "metadata_fields", x = f[t] || "", S = String(n.creator || "").trim(), C = !!x && !!S, w = I(t, n), T = ye(t, n), D = be(t, n), O = ve(n), k = xe(n), A = re(t, n), j = n.comparison_assets || [], ie = n.preview_assets || [], ae = String(n.decision || "pending") !== "pending", M = j.length > 1 ? /* @__PURE__ */ (0, V.jsxs)("div", {
		className: "flex flex-col gap-3",
		children: [j.slice(0, $).map((e) => /* @__PURE__ */ (0, V.jsx)(Y, {
			asset: e,
			openItem: _.openItem
		}, e.id)), j.length > $ ? /* @__PURE__ */ (0, V.jsx)("p", {
			className: "text-body-2-regular text-text-secondary",
			children: `另有 ${(j.length - $).toLocaleString()} 部对照作品`
		}) : null]
	}) : C ? /* @__PURE__ */ (0, V.jsx)(X, {
		kind: x,
		name: S,
		works: Number(n.video_count || n.videos || 0),
		openEntity: _.openEntity,
		avatar: ne(S, n.entity_id ? {
			id: n.entity_id,
			has_image: !!n.has_image,
			image_version: n.image_version,
			avatar_focus: n.avatar_focus
		} : null, null, x)
	}) : n.asset_id ? /* @__PURE__ */ (0, V.jsx)(Y, {
		openItem: _.openItem,
		asset: {
			id: n.asset_id,
			name: n.asset_name,
			preview_url: n.asset_preview_url
		}
	}) : null, oe = b ? /* @__PURE__ */ (0, V.jsx)(G, {
		row: n,
		fieldName: T,
		value: r.candidateKey,
		onChange: (e) => i({
			...r,
			candidateKey: e
		}),
		locked: l
	}) : t === "creator_tags" ? ie.length ? /* @__PURE__ */ (0, V.jsx)(Z, {
		assets: ie,
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
	}) : t === "fc2_similarity" ? null : t === "western_identity" ? /* @__PURE__ */ (0, V.jsx)(Ne, {
		row: n,
		openItem: _.openItem,
		openEntity: _.openEntity,
		onReveal: _.onReveal,
		revealing: _.revealing,
		note: _.revealNote
	}) : /* @__PURE__ */ (0, V.jsx)(je, { url: n.preview_url }), se = C ? M : T ? /* @__PURE__ */ (0, V.jsxs)("h4", {
		className: `${Q} flex-wrap gap-2`,
		children: [/* @__PURE__ */ (0, V.jsx)("span", {
			title: T,
			className: "flex max-w-full min-w-0 overflow-hidden rounded-md",
			children: /* @__PURE__ */ (0, V.jsx)(u, {
				variant: "caption",
				color: "blue",
				children: T
			})
		}), /* @__PURE__ */ (0, V.jsx)("span", {
			title: D,
			className: "min-w-0 truncate text-body-medium text-text-primary",
			children: D
		})]
	}) : /* @__PURE__ */ (0, V.jsx)("h4", {
		className: Q,
		children: /* @__PURE__ */ (0, V.jsx)("span", {
			title: w,
			className: "min-w-0 truncate text-body-medium text-text-primary",
			children: w
		})
	});
	return /* @__PURE__ */ (0, V.jsxs)("section", {
		"aria-label": w,
		"data-review-key": n.item_key,
		className: `${Pe} ${Fe(t)} overflow-hidden`,
		children: [
			/* @__PURE__ */ (0, V.jsxs)("header", {
				className: "flex min-w-0 shrink-0 items-start gap-2",
				children: [
					l ? null : /* @__PURE__ */ (0, V.jsx)("span", {
						className: `${Q} shrink-0`,
						onPointerDownCapture: (e) => {
							v.current = e.shiftKey;
						},
						onKeyDownCapture: (e) => {
							v.current = e.shiftKey;
						},
						children: /* @__PURE__ */ (0, V.jsx)(c, {
							isSelected: a,
							"aria-label": `选择 ${w}`,
							onChange: (e) => s(v.current, e)
						})
					}),
					/* @__PURE__ */ (0, V.jsx)("div", {
						className: "min-w-0 flex-1",
						children: se
					}),
					ae ? /* @__PURE__ */ (0, V.jsx)(u, {
						variant: "caption",
						color: "neutral",
						children: n.decision
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
						!C && (n.board || n.assets) ? /* @__PURE__ */ (0, V.jsx)("p", {
							className: "text-body-2-regular text-text-secondary",
							children: `对照文件：${Number(n.video_count || n.assets || 0).toLocaleString()}`
						}) : null,
						!C && M ? M : null,
						k.length || t === "creator_tags" ? /* @__PURE__ */ (0, V.jsx)("div", {
							className: "flex flex-wrap gap-1",
							children: k.length ? k.map((e) => /* @__PURE__ */ (0, V.jsx)(u, {
								variant: "caption",
								color: "soft",
								children: e
							}, e)) : /* @__PURE__ */ (0, V.jsx)("small", {
								className: "text-body-2-regular text-text-secondary",
								children: "暂无待确认标签"
							})
						}) : null,
						oe,
						/* @__PURE__ */ (0, V.jsx)(Ae, {
							row: n,
							tags: h,
							locked: l,
							toast: _.toast
						}),
						!b && O ? /* @__PURE__ */ (0, V.jsx)("p", {
							className: "text-body-2-regular text-text-secondary wrap-anywhere",
							children: O
						}) : null
					]
				})
			}),
			b && O ? /* @__PURE__ */ (0, V.jsx)("div", {
				className: "relative -mx-5 -mb-4 shrink-0",
				children: /* @__PURE__ */ (0, V.jsx)("p", {
					ref: te,
					role: "region",
					"aria-label": "当前信息",
					className: "max-h-22 overflow-y-auto border-t border-separator-border px-5 py-2.5 text-body-2-regular text-text-secondary wrap-anywhere",
					children: O
				})
			}) : null,
			/* @__PURE__ */ (0, V.jsxs)("footer", {
				className: "-mx-5 flex min-h-14 shrink-0 flex-wrap items-center justify-end gap-2 rounded-b-surface border-t border-separator-border bg-background-secondary-default py-3 pr-3 pl-5",
				children: [
					/* @__PURE__ */ (0, V.jsx)(o, {
						variant: "danger",
						size: "small",
						disabled: l,
						...E(d),
						onClick: () => g("rejected"),
						children: "拒绝"
					}),
					/* @__PURE__ */ (0, V.jsx)(o, {
						variant: "secondary",
						size: "small",
						disabled: l,
						...E(d),
						onClick: () => g("skipped"),
						children: "跳过"
					}),
					/* @__PURE__ */ (0, V.jsx)(o, {
						variant: "primary",
						size: "small",
						disabled: l || !A,
						...E(d),
						title: A ? void 0 : "没有可采用的资料，只能拒绝或跳过",
						onClick: () => g("approved"),
						children: A ? "通过" : "不可通过"
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
//#endregion
//#region src/react/review/review-page.tsx
var Le = "flex cursor-pointer items-center justify-between gap-2";
function Re({ page: e, pages: t, onPage: n }) {
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
				children: N(e, t).map((t, r) => /* @__PURE__ */ (0, V.jsx)("li", { children: t === "…" ? /* @__PURE__ */ (0, V.jsx)("span", {
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
function ze(r) {
	let [i, a] = (0, B.useState)(() => matchMedia("(max-width:900px)").matches);
	(0, B.useEffect)(() => {
		let e = matchMedia("(max-width:900px)"), t = () => a(e.matches);
		return e.addEventListener("change", t), () => e.removeEventListener("change", t);
	}, []);
	let { route: s, openItem: c, openEntity: l, revealSource: u, toast: f, readOnly: ee, readOnlyMessage: h, writerUrl: g } = r, [b, x] = (0, B.useState)(le(r.category) ? r.category : d), [S, C] = (0, B.useState)("candidates"), [w, T] = (0, B.useState)(""), [ne, E] = (0, B.useState)(1), [D, O] = (0, B.useState)(/* @__PURE__ */ new Set()), [ue, N] = (0, B.useState)(/* @__PURE__ */ new Map()), [pe, P] = (0, B.useState)(/* @__PURE__ */ new Map()), [me, F] = (0, B.useState)(""), he = (0, B.useRef)(null), [ve, ye] = (0, B.useState)(0), [be, xe] = (0, B.useState)(""), I = (0, B.useRef)(!0);
	(0, B.useEffect)(() => () => {
		I.current = !1;
	}, []);
	let L = Te({
		queryKey: y,
		queryFn: ({ signal: e }) => oe(e)
	}), R = L.data || {
		sections: {},
		counts: {}
	}, z = R.sections[b] || [], H = b === "metadata_fields", U = ee, W = ge(z, H), G = W.some(([e]) => e === S) ? S : "candidates", K = ce(z, G), Ae = K.some((e) => e.key === w) ? w : "", q = _e(se(z, G, Ae), ne), J = q.rows.map((e) => e.item_key), je = new Set(J), Me = K.map((e) => ({
		...e,
		rows: e.rows.filter((e) => je.has(e.item_key))
	})).filter((e) => e.rows.length), Y = (e) => ue.get(e.item_key) || ie(e), X = z.filter((e) => D.has(e.item_key)), Ne = (e) => {
		let t = new Set(e);
		O((e) => new Set([...e].filter((e) => !t.has(e)))), N((e) => new Map([...e].filter(([e]) => !t.has(e)))), P((e) => new Map([...e].filter(([e]) => !t.has(e))));
	}, Z = (e, t) => P((n) => new Map(n).set(e, t)), Pe = (e) => {
		x(e), C("candidates"), T(""), E(1), O(/* @__PURE__ */ new Set()), N(/* @__PURE__ */ new Map()), P(/* @__PURE__ */ new Map()), F(""), he.current = null, s({ category: e === "metadata_fields" ? "" : e });
	}, Q = we({
		mutationFn: ({ row: e, status: t }) => Ce(A(b, k(b, e), t, Y(e))),
		onSuccess: (e, { row: t, status: n }) => {
			e.ok ? (ae(b, [t.item_key]), Ne([t.item_key]), f(j(n))) : Z(t.item_key, e.error || "服务端拒绝了这次判定");
		},
		onError: (e, { row: t }) => Z(t.item_key, M(e))
	}), $ = we({
		mutationFn: async (e) => {
			let t = X, n = [], r = [];
			for (let [i, a] of t.entries()) {
				if (!I.current) break;
				F(`正在处理 ${i} / ${t.length}`);
				try {
					let t = await Ce(A(b, k(b, a), e, Y(a)));
					if (!t.ok) throw Error(t.error || "服务端未采用该项");
					n.push(a.item_key);
				} catch (e) {
					r.push([a.item_key, M(e)]);
				}
			}
			return {
				status: e,
				done: n,
				failures: r
			};
		},
		onSuccess: ({ status: e, done: t, failures: n }) => {
			ae(b, t), Ne(t), n.forEach(([e, t]) => Z(e, t)), F(""), f(`已${e === "approved" ? "通过" : "拒绝"} ${t.length} 项` + (n.length ? `，${n.length} 项未完成` : ""));
		},
		onError: (e) => {
			F(M(e));
		}
	}), Fe = (e) => {
		!$.isPending && X.length && (e === "approved" && H && X.some((e) => !Y(e).candidateKey) ? F("请先为所选资料选择要采用的来源。") : (F(""), $.mutate(e)));
	}, ze = (e) => {
		N((t) => {
			let n = new Map(t);
			for (let t of X) {
				let r = t.candidates?.find((t) => t.source === e);
				r && n.set(t.item_key, {
					...Y(t),
					candidateKey: r.candidate_key
				});
			}
			return n;
		}), F(`已选择 ${e}，点击通过所选采用。`);
	}, Be = async (e) => {
		if (ve) return;
		ye(e), xe("");
		let t = await u(e);
		I.current && (ye(0), xe(t));
	}, Ve = fe(R.mirror, h), He = R.genre_tags || [], Ue = {
		openItem: c,
		openEntity: l,
		onReveal: Be,
		revealing: ve,
		revealNote: be,
		toast: f
	};
	return /* @__PURE__ */ (0, V.jsx)(Ee, { children: /* @__PURE__ */ (0, V.jsxs)("div", {
		className: "flex flex-col gap-5 pb-10",
		children: [
			U ? /* @__PURE__ */ (0, V.jsx)(_, {
				tone: "warning",
				title: "本机只能浏览",
				extra: g ? /* @__PURE__ */ (0, V.jsx)("p", {
					className: "text-body-2-regular",
					children: /* @__PURE__ */ (0, V.jsx)(m, {
						href: g,
						children: "前往写入端复核"
					})
				}) : void 0,
				children: Ve
			}) : null,
			/* @__PURE__ */ (0, V.jsx)(ke, { tags: He }),
			/* @__PURE__ */ (0, V.jsxs)(n, {
				orientation: i ? "horizontal" : "vertical",
				selectedKey: b,
				onSelectionChange: (e) => {
					let t = String(e);
					le(t) && Pe(t);
				},
				className: "flex flex-col gap-5 review-split:flex-row review-split:items-start review-split:gap-6",
				children: [/* @__PURE__ */ (0, V.jsxs)("div", {
					"data-section-nav": !0,
					className: "w-full min-w-0 review-split:sticky review-split:top-topbar review-split:w-review-tabs review-split:shrink-0",
					children: [/* @__PURE__ */ (0, V.jsx)("h2", {
						id: "reviewcategories",
						children: "复核分类"
					}), /* @__PURE__ */ (0, V.jsx)(De, {
						scrollable: i,
						"aria-labelledby": "reviewcategories",
						"data-section-items": !0,
						className: "flex review-split:flex-col review-split:items-stretch",
						children: v.map((e) => {
							let n = Number(R.counts[e] || 0);
							return /* @__PURE__ */ (0, V.jsxs)(t, {
								id: e,
								className: Le,
								"data-pill-selected": b === e ? "" : void 0,
								"data-pill-variant": "gray",
								children: [te[e], n ? /* @__PURE__ */ (0, V.jsx)("span", {
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
						z.length && !U ? /* @__PURE__ */ (0, V.jsx)(Oe, {
							groupOptions: W,
							groupBy: G,
							onGroupBy: (e) => {
								C(e), T(""), E(1);
							},
							groups: K,
							filter: Ae,
							onFilter: (e) => {
								T(e), E(1);
							},
							pageKeys: J,
							selected: D,
							onSelected: O,
							selectedRows: X,
							metadata: H,
							approvable: X.every((e) => re(b, e)),
							busy: $.isPending,
							feedback: me,
							onUnifySource: ze,
							onRun: Fe
						}) : null,
						q.rows.length ? Me.map((e) => /* @__PURE__ */ (0, V.jsxs)("section", {
							className: "flex flex-col gap-3",
							children: [Me.length > 1 || G !== "candidates" ? /* @__PURE__ */ (0, V.jsxs)("div", {
								className: "flex flex-wrap items-center gap-2",
								children: [/* @__PURE__ */ (0, V.jsx)("h3", {
									className: "text-body-medium text-text-primary",
									children: `${e.title} · ${e.rows.length}`
								}), U ? null : /* @__PURE__ */ (0, V.jsx)(o, {
									variant: "ghost",
									size: "small",
									onClick: () => {
										let t = e.rows.map((e) => e.item_key), n = t.every((e) => D.has(e)), r = new Set(D);
										for (let e of t) n ? r.delete(e) : r.add(e);
										O(r);
									},
									children: e.rows.every((e) => D.has(e.item_key)) ? "清空本组" : "全选本组"
								})]
							}) : null, /* @__PURE__ */ (0, V.jsx)("div", {
								className: "review-grid gap-5",
								children: e.rows.map((e) => /* @__PURE__ */ (0, V.jsx)(Ie, {
									category: b,
									row: e,
									choice: Y(e),
									onChoice: (t) => N((n) => new Map(n).set(e.item_key, t)),
									selected: D.has(e.item_key),
									onSelect: (t, n) => O((r) => {
										let i = new Set(r);
										return he.current = Se(i, J, he.current, e.item_key, t, n), i;
									}),
									locked: U,
									busy: Q.isPending && Q.variables?.row.item_key === e.item_key,
									problem: pe.get(e.item_key) || "",
									genreTags: He,
									onDecide: (t) => {
										Q.isPending || $.isPending || (P((t) => new Map([...t].filter(([t]) => t !== e.item_key))), Q.mutate({
											row: e,
											status: t
										}));
									},
									handlers: Ue
								}, e.item_key))
							})]
						}, e.key)) : L.isError && !L.data ? /* @__PURE__ */ (0, V.jsx)(_, {
							tone: "error",
							title: "复核队列读取失败",
							action: /* @__PURE__ */ (0, V.jsx)(o, {
								variant: "secondary",
								size: "small",
								disabled: L.isFetching,
								onClick: () => void L.refetch(),
								children: "立即重试"
							}),
							children: M(L.error)
						}) : /* @__PURE__ */ (0, V.jsx)(p, {
							icon: de,
							title: "此分类没有待复核项目",
							actions: v.some((e) => e !== b && Number(R.counts[e] || 0) > 0) ? /* @__PURE__ */ (0, V.jsx)(o, {
								size: "small",
								onClick: () => {
									let e = v.find((e) => e !== b && Number(R.counts[e] || 0) > 0);
									e && Pe(e);
								},
								children: "查看其他分类"
							}) : void 0,
							children: "可切换分类查看其他待确认资料。"
						}),
						/* @__PURE__ */ (0, V.jsx)(Re, {
							page: q.page,
							pages: q.pages,
							onPage: E
						})
					]
				})]
			})
		]
	}) });
}
//#endregion
export { ze as ReviewPage };

//# debugId=5d38737a-8167-4a7a-b8b7-f256ab67572b