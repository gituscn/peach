(function() {
	try {
		var e = typeof window < "u" ? window : typeof global < "u" ? global : typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : {}, t = new e.Error().stack;
		t && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[t] = "784a955c-ce4c-4fa1-99bd-9355f850ad34", e._sentryDebugIdIdentifier = "sentry-dbid-784a955c-ce4c-4fa1-99bd-9355f850ad34");
	} catch {}
})();
import { $o as e, $r as t, Br as n, Ca as r, Do as i, Ec as a, Fr as o, Gl as s, Gr as c, Ho as l, Hr as u, Ir as ee, Jr as d, Kr as f, Li as p, Ll as m, Lr as te, Nr as h, Pr as g, Qo as _, Qr as v, Rr as ne, Ur as y, Va as b, Vo as x, Vr as S, Wr as C, Xa as re, Xr as w, Ya as T, Yr as E, Za as D, Zo as ie, Zr as ae, _a as O, ai as oe, au as se, cu as ce, do as le, ec as ue, ei as de, fs as k, hn as A, ii as j, iu as fe, nc as M, ni as pe, oi as me, oo as he, os as N, ps as ge, pu as P, qr as _e, ri as ve, ro as F, si as ye, so as be, ss as I, ti as xe, uo as Se, uu as Ce, vo as we, wc as L, yo as R, zr as z } from "./peach-app.js";
import { t as Te } from "./peach-app.page-BYr6f5ud.js";
import { t as B } from "./peach-app.legacy-avatar-CV1xk6vD.js";
import { t as Ee } from "./peach-app.pill-aria-tab-list-B1wzfuox.js";
//#region src/react/review/bulk-toolbar.tsx
var V = /* @__PURE__ */ P(Ce(), 1), H = ce();
function De(e) {
	let { groupOptions: t, groupBy: n, onGroupBy: r, groups: i, filter: a, onFilter: o, pageKeys: s, selected: c, onSelected: l, selectedRows: u, metadata: ee, approvable: d, busy: f, feedback: m, onUnifySource: te, onRun: h } = e, g = s.filter((e) => c.has(e)), _ = g.length > 0 && g.length === s.length, v = z(u), ne = ee && u.some((e) => (e.candidates?.length || 0) > 1), y = v.length ? "统一选择来源" : "所选项目无共同来源";
	return /* @__PURE__ */ (0, H.jsxs)(H.Fragment, { children: [/* @__PURE__ */ (0, H.jsxs)("div", {
		role: "group",
		"aria-label": "复核筛选",
		"data-review-filter": !0,
		"data-glass-pane": "",
		className: "sticky top-topbar z-10 flex flex-wrap items-center gap-2 p-3",
		children: [
			/* @__PURE__ */ (0, H.jsx)(p, {
				"aria-label": "筛选分组方式",
				size: "sm",
				selectedKey: n,
				onSelectionChange: (e) => {
					e !== null && r(String(e));
				},
				children: t.map(([e, t]) => /* @__PURE__ */ (0, H.jsx)(O, {
					id: e,
					children: t
				}, e))
			}),
			i.length > 1 ? /* @__PURE__ */ (0, H.jsxs)(p, {
				"aria-label": n === "field" ? "筛选字段分类" : "筛选当前分类",
				size: "sm",
				prefix: "分类",
				selectedKey: a || "*",
				onSelectionChange: (e) => {
					e !== null && o(String(e) === "*" ? "" : String(e));
				},
				children: [/* @__PURE__ */ (0, H.jsx)(O, {
					id: "*",
					children: "全部"
				}), i.map((e) => /* @__PURE__ */ (0, H.jsx)(O, {
					id: e.key,
					children: `${e.title} · ${e.rows.length}`
				}, e.key))]
			}) : null,
			/* @__PURE__ */ (0, H.jsx)(k, {
				variant: "secondary",
				size: "small",
				leadingIcon: x,
				"aria-pressed": _,
				disabled: f || !s.length,
				onClick: () => {
					let e = new Set(c);
					for (let t of s) _ ? e.delete(t) : e.add(t);
					l(e);
				},
				children: _ ? "清空当前选择" : a ? "全选当前分类" : "全选本页"
			})
		]
	}), /* @__PURE__ */ (0, H.jsxs)(ue, {
		label: "复核所选项目",
		visible: c.size > 0,
		count: `已选 ${c.size} 项`,
		children: [
			ne ? /* @__PURE__ */ (0, H.jsxs)(p, {
				"aria-label": "统一选择来源",
				size: "sm",
				selectedKey: "",
				isDisabled: f || !v.length,
				onSelectionChange: (e) => {
					e !== null && e !== "" && te(String(e));
				},
				children: [/* @__PURE__ */ (0, H.jsx)(O, {
					id: "",
					children: y
				}), v.map((e) => /* @__PURE__ */ (0, H.jsx)(O, {
					id: e,
					children: e
				}, e))]
			}) : null,
			/* @__PURE__ */ (0, H.jsx)(k, {
				variant: "danger",
				size: "small",
				disabled: f || !c.size,
				onClick: () => h("rejected"),
				children: "拒绝所选"
			}),
			/* @__PURE__ */ (0, H.jsx)(k, {
				variant: "primary",
				size: "small",
				disabled: f || !c.size || !d,
				onClick: () => h("approved"),
				children: "通过所选"
			}),
			/* @__PURE__ */ (0, H.jsx)(k, {
				variant: "ghost",
				size: "small",
				disabled: f,
				onClick: () => l(/* @__PURE__ */ new Set()),
				children: "取消选择"
			}),
			m ? /* @__PURE__ */ (0, H.jsx)("p", {
				role: "status",
				className: "w-full text-body-2-regular text-text-secondary",
				children: m
			}) : null
		]
	})] });
}
//#endregion
//#region src/react/review/candidate-form.tsx
var U = {
	title: "标题",
	original_title: "原标题",
	runtime: "来源时长",
	director: "导演",
	label: "Label",
	poster_url: "海报",
	cover_url: "封面",
	screenshot_urls: "截图",
	trailer_url: "预告片"
}, W = "reviewgenretags";
function Oe({ tags: e }) {
	return e.length ? /* @__PURE__ */ (0, H.jsx)("datalist", {
		id: W,
		children: e.map((e) => /* @__PURE__ */ (0, H.jsx)("option", { value: e }, e))
	}) : null;
}
function G({ candidate: e, selectable: t = !1 }) {
	let n = Object.entries(e.catalog_evidence || {}).filter(([, e]) => e && e.display_value), r = e.content_id || e.provider_id;
	return /* @__PURE__ */ (0, H.jsxs)("span", {
		className: "flex min-w-0 flex-1 flex-col",
		children: [/* @__PURE__ */ (0, H.jsxs)("span", {
			className: "relative flex min-w-0 flex-col gap-0.5 px-4 py-3 group-hover:bg-background-primary-hover group-data-selected:bg-background-primary-hover",
			children: [
				/* @__PURE__ */ (0, H.jsxs)("b", {
					className: "text-body-2-medium text-text-secondary",
					children: [
						e.source,
						e.official ? " · 官方优先" : "",
						r ? ` · ID ${r}` : ""
					]
				}),
				/* @__PURE__ */ (0, H.jsx)("span", {
					className: "text-body-medium break-words text-text-primary",
					children: e.display_value || ""
				}),
				(e.warnings || []).map((e) => /* @__PURE__ */ (0, H.jsx)("i", {
					className: "text-body-2-regular text-status-yellow-text",
					children: e
				}, e)),
				t ? /* @__PURE__ */ (0, H.jsx)("span", {
					"aria-hidden": "true",
					"data-candidate-choice": !0,
					className: "absolute top-4 right-4 inline-grid size-4 place-items-center rounded-full border border-border-checkbox-default bg-background-primary-default group-hover:border-border-checkbox-hover group-data-selected:border-border-focus-ring group-data-selected:bg-accent-600",
					children: /* @__PURE__ */ (0, H.jsx)("span", { className: "size-1.5 rounded-full bg-text-white opacity-0 group-data-selected:opacity-100" })
				}) : null
			]
		}), n.length ? /* @__PURE__ */ (0, H.jsx)("dl", {
			className: "flex flex-col gap-1 border-t border-separator-border bg-background-primary-default px-4 py-2.5",
			children: n.map(([e, t]) => /* @__PURE__ */ (0, H.jsxs)("div", {
				className: "flex min-w-0 flex-wrap gap-x-2",
				children: [
					/* @__PURE__ */ (0, H.jsx)("dt", {
						className: "text-body-2-regular text-text-secondary",
						children: U[e] || e
					}),
					/* @__PURE__ */ (0, H.jsx)("dd", {
						className: "min-w-0 text-body-2-regular break-words text-text-primary",
						children: t.display_value
					}),
					(t.warnings || []).map((e) => /* @__PURE__ */ (0, H.jsx)("small", {
						className: "w-full text-caption-1-regular text-status-yellow-text",
						children: e
					}, e))
				]
			}, e))
		}) : null]
	});
}
function K({ row: e, fieldName: t, value: n, onChange: r, locked: i }) {
	let a = e.candidates || [];
	return a.length ? a.length === 1 ? /* @__PURE__ */ (0, H.jsx)("div", {
		className: "flex overflow-hidden rounded-surface border border-separator-border bg-background-secondary-default",
		children: /* @__PURE__ */ (0, H.jsx)(G, { candidate: a[0] })
	}) : /* @__PURE__ */ (0, H.jsx)(N, {
		"aria-label": `${t || "资料"}的来源`,
		value: n,
		isDisabled: i,
		onChange: r,
		className: "flex flex-col gap-2",
		children: a.map((e) => /* @__PURE__ */ (0, H.jsx)(I, {
			value: e.candidate_key,
			className: "group flex cursor-pointer items-center gap-2 overflow-hidden rounded-surface border border-separator-border bg-background-secondary-default outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring data-selected:border-border-button-active data-disabled:cursor-not-allowed",
			children: /* @__PURE__ */ (0, H.jsx)(G, {
				candidate: e,
				selectable: !0
			})
		}, e.candidate_key))
	}) : null;
}
function q({ genre: e, tags: t, locked: n, toast: r }) {
	let [i, a] = (0, V.useState)(""), [o, c] = (0, V.useState)(""), l = fe({
		mutationFn: (t) => ae(e, t),
		onSuccess: async (t, n) => {
			t.ok ? (r(n ? `已把「${e}」收录为标签「${n}」` : `已把「${e}」判为非内容标签`), await v()) : c(t.error || "服务端拒绝了这次收录");
		},
		onError: (e) => c(s(e))
	}), u = () => {
		let e = i.trim();
		e ? (c(""), l.mutate(e)) : c("先给它一个中文标签");
	};
	return /* @__PURE__ */ (0, H.jsxs)("div", {
		className: "flex flex-wrap items-center gap-2",
		children: [
			/* @__PURE__ */ (0, H.jsx)("b", {
				lang: "ja",
				className: "text-body-medium text-text-primary",
				children: e
			}),
			/* @__PURE__ */ (0, H.jsx)(le, {
				"aria-label": `「${e}」收录成的中文标签`,
				value: i,
				onChange: a,
				maxLength: 40,
				isDisabled: n || l.isPending,
				className: "min-w-40 flex-1",
				children: /* @__PURE__ */ (0, H.jsx)(Se, {
					size: "small",
					list: t.length ? W : void 0,
					autoComplete: "off",
					placeholder: "中文标签",
					onKeyDown: (e) => {
						e.key !== "Enter" || e.nativeEvent.isComposing || (e.preventDefault(), u());
					}
				})
			}),
			/* @__PURE__ */ (0, H.jsx)(k, {
				variant: "secondary",
				size: "small",
				disabled: n || l.isPending,
				onClick: u,
				children: "收录"
			}),
			/* @__PURE__ */ (0, H.jsx)(k, {
				variant: "secondary",
				size: "small",
				disabled: n || l.isPending,
				onClick: () => {
					c(""), l.mutate("");
				},
				children: "不是内容"
			}),
			o ? /* @__PURE__ */ (0, H.jsx)("p", {
				role: "status",
				className: "w-full text-body-2-regular text-text-error-primary",
				children: o
			}) : null
		]
	});
}
function ke({ row: e, tags: t, locked: n, toast: r }) {
	let i = w(e);
	return i.length ? /* @__PURE__ */ (0, H.jsxs)("div", {
		role: "group",
		"aria-label": "未收录 genre",
		className: "flex flex-col gap-2 rounded-surface border border-separator-border bg-background-primary-default px-4 py-3",
		children: [/* @__PURE__ */ (0, H.jsx)("h5", {
			className: "text-body-2-medium text-text-secondary",
			children: `未收录 genre · ${i.length}`
		}), i.map((e) => /* @__PURE__ */ (0, H.jsx)(q, {
			genre: e,
			tags: t,
			locked: n,
			toast: r
		}, e))]
	}) : null;
}
//#endregion
//#region src/react/review/review-evidence.tsx
var J = (e = "") => /^https?:\/\//i.test(e) ? e : "", Y = (e = "") => J(e) || (e.startsWith("/") && !e.startsWith("//") ? e : "");
function Ae({ url: e }) {
	let t = Y(e || "");
	return /* @__PURE__ */ (0, H.jsx)(je, { source: t }, t);
}
function je({ source: e }) {
	let [t, n] = (0, V.useState)("idle");
	return (0, V.useEffect)(() => {
		if (t !== "loading") return;
		let e = setTimeout(() => n("failed"), 3e4);
		return () => clearTimeout(e);
	}, [t]), /* @__PURE__ */ (0, H.jsxs)("div", {
		className: "relative flex h-review-image items-center justify-center overflow-hidden rounded-surface bg-background-secondary-default",
		children: [t === "loading" ? /* @__PURE__ */ (0, H.jsxs)("span", {
			role: "status",
			className: "absolute flex items-center gap-2 text-body-2-regular text-text-secondary",
			children: [/* @__PURE__ */ (0, H.jsx)("span", { dangerouslySetInnerHTML: { __html: L("正在加载图片") } }), "正在加载图片"]
		}) : null, e && (t === "loading" || t === "ready") ? /* @__PURE__ */ (0, H.jsx)("img", {
			src: e,
			alt: "来源提供的备选图片",
			referrerPolicy: "no-referrer",
			decoding: "async",
			className: `size-full object-contain ${t === "loading" ? "invisible" : ""}`,
			onLoad: () => n("ready"),
			onError: () => n("failed")
		}) : e ? /* @__PURE__ */ (0, H.jsxs)("div", {
			className: "flex flex-col items-center gap-2",
			children: [t === "failed" ? /* @__PURE__ */ (0, H.jsx)("span", {
				className: "text-body-2-regular text-text-secondary",
				children: "未取得来源图片"
			}) : null, /* @__PURE__ */ (0, H.jsx)(k, {
				variant: "secondary",
				size: "small",
				"aria-label": t === "failed" ? "立即重试加载来源图片" : void 0,
				onClick: () => n("loading"),
				children: t === "failed" ? "立即重试" : "查看来源图片"
			})]
		}) : /* @__PURE__ */ (0, H.jsx)("span", {
			className: "text-body-2-regular text-text-secondary",
			children: "未取得来源图片"
		})]
	});
}
function X({ asset: e, openItem: t }) {
	let n = e.name || "";
	return /* @__PURE__ */ (0, H.jsxs)("div", {
		className: "flex min-w-0 items-center gap-2.5 rounded-surface bg-background-secondary-default p-2",
		children: [/* @__PURE__ */ (0, H.jsxs)("button", {
			type: "button",
			onClick: () => t(e.id),
			className: "flex aspect-card-cover w-review-cover-narrow shrink-0 review-tight:w-review-cover cursor-pointer items-center justify-center overflow-hidden rounded-2lg bg-background-tertiary-default outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring",
			children: [e.preview_url ? /* @__PURE__ */ (0, H.jsx)("img", {
				src: e.preview_url,
				alt: "",
				loading: "lazy",
				className: "size-full object-cover"
			}) : /* @__PURE__ */ (0, H.jsx)("span", {
				className: "text-caption-1-regular text-text-secondary",
				children: "无封面"
			}), /* @__PURE__ */ (0, H.jsx)(M, { children: `打开原视频 ${n}` })]
		}), /* @__PURE__ */ (0, H.jsxs)("div", {
			className: "flex min-w-0 flex-col items-start gap-1",
			children: [/* @__PURE__ */ (0, H.jsx)("b", {
				title: n,
				className: "w-full truncate text-body-medium text-text-primary",
				children: e.code || n || "原视频"
			}), /* @__PURE__ */ (0, H.jsx)(k, {
				variant: "secondary",
				size: "small",
				leadingIcon: R,
				onClick: () => t(e.id),
				children: "打开原视频"
			})]
		})]
	});
}
function Z({ kind: e, name: t, works: n, avatar: r, openEntity: i }) {
	return /* @__PURE__ */ (0, H.jsxs)("div", {
		className: "flex min-w-0 items-center gap-3",
		children: [/* @__PURE__ */ (0, H.jsx)("button", {
			type: "button",
			"aria-label": `打开创作者页：${t}`,
			onClick: () => i(e, t),
			className: `relative inline-grid size-11 shrink-0 cursor-pointer place-items-center overflow-hidden rounded-full bg-background-secondary-default text-caption-1-medium text-text-secondary outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring ${B}`,
			dangerouslySetInnerHTML: { __html: r }
		}), /* @__PURE__ */ (0, H.jsxs)("div", {
			className: "flex min-w-0 flex-col items-start",
			children: [/* @__PURE__ */ (0, H.jsx)("button", {
				type: "button",
				onClick: () => i(e, t),
				className: "max-w-full cursor-pointer truncate text-body-medium text-text-primary underline-offset-2 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-border-focus-ring",
				children: t
			}), n ? /* @__PURE__ */ (0, H.jsx)("small", {
				className: "tabular-nums text-body-2-regular text-text-secondary",
				children: `${n.toLocaleString()} 部作品`
			}) : null]
		})]
	});
}
function Me({ row: e, openItem: t, openEntity: n, onReveal: r, revealing: a, note: o }) {
	let s = J(e.profile_url || ""), c = (e.preview_assets || []).slice(0, 6), l = Math.max(0, Number(e.video_count || e.videos || 0));
	return /* @__PURE__ */ (0, H.jsxs)("section", {
		className: "flex flex-col gap-3",
		children: [
			/* @__PURE__ */ (0, H.jsx)("h5", {
				className: "text-body-medium text-text-primary",
				children: `待确认人物：${e.babepedia_name || "未标注"}`
			}),
			/* @__PURE__ */ (0, H.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [s ? /* @__PURE__ */ (0, H.jsx)(ge, {
					variant: "secondary",
					size: "small",
					trailingIcon: i,
					href: s,
					target: "_blank",
					rel: "noopener noreferrer",
					children: "来源资料"
				}) : null, /* @__PURE__ */ (0, H.jsx)(k, {
					variant: "secondary",
					size: "small",
					onClick: () => n("creator", e.creator || ""),
					children: `查看全部 ${l.toLocaleString()} 部作品`
				})]
			}),
			/* @__PURE__ */ (0, H.jsx)(Ae, { url: e.preview_url }),
			/* @__PURE__ */ (0, H.jsx)("p", {
				className: "text-body-2-regular text-text-secondary",
				children: "通过后记录身份判断。"
			}),
			c.length ? /* @__PURE__ */ (0, H.jsxs)(H.Fragment, { children: [/* @__PURE__ */ (0, H.jsx)("h5", {
				className: "text-body-medium text-text-primary",
				children: "本地作品样本"
			}), /* @__PURE__ */ (0, H.jsx)("ul", {
				className: "flex flex-col gap-1",
				children: c.map((e) => /* @__PURE__ */ (0, H.jsxs)("li", {
					className: "flex min-w-0 items-center gap-2",
					children: [/* @__PURE__ */ (0, H.jsx)(k, {
						variant: "ghost",
						size: "small",
						className: "min-w-0",
						onClick: () => t(e.id),
						children: /* @__PURE__ */ (0, H.jsx)("span", {
							title: e.name,
							className: "block max-w-full truncate",
							children: e.name
						})
					}), /* @__PURE__ */ (0, H.jsx)(k, {
						variant: "ghost",
						size: "small",
						"aria-label": `打开 ${e.name} 的文件位置`,
						...F(a === e.id),
						onClick: () => r(e.id),
						children: "文件位置"
					})]
				}, e.id))
			})] }) : /* @__PURE__ */ (0, H.jsx)("p", {
				className: "text-body-2-regular text-text-secondary",
				children: "暂无本地作品样本，打开全部作品核对。"
			}),
			o ? /* @__PURE__ */ (0, H.jsx)("p", {
				role: "status",
				className: "text-body-2-regular text-text-error-primary",
				children: o
			}) : null
		]
	});
}
function Ne({ assets: e, picked: t, onPicked: n, locked: r }) {
	let [i, a] = (0, V.useState)(null), o = new Set(t), s = (t, s) => {
		if (r) return;
		let c = new Set(o);
		if (s && i !== null) {
			let [n, r] = [Math.min(i, t), Math.max(i, t)];
			for (let t = n; t <= r; t++) c.add(e[t].id);
		} else {
			let n = e[t].id;
			c.has(n) ? c.delete(n) : c.add(n);
		}
		a(t), n(e.filter((e) => c.has(e.id)).map((e) => e.id));
	};
	return /* @__PURE__ */ (0, H.jsxs)("div", {
		className: "flex flex-col gap-2",
		children: [/* @__PURE__ */ (0, H.jsxs)("div", {
			className: "flex flex-wrap items-center gap-2",
			children: [
				/* @__PURE__ */ (0, H.jsx)("span", {
					className: "tabular-nums text-body-2-regular text-text-secondary",
					children: `已选 ${o.size} / ${e.length}`
				}),
				/* @__PURE__ */ (0, H.jsx)(k, {
					variant: "ghost",
					size: "small",
					disabled: r,
					onClick: () => n(e.map((e) => e.id)),
					children: "全选"
				}),
				/* @__PURE__ */ (0, H.jsx)(k, {
					variant: "ghost",
					size: "small",
					disabled: r,
					onClick: () => n([]),
					children: "清空"
				})
			]
		}), /* @__PURE__ */ (0, H.jsx)("div", {
			className: "review-asset-grid gap-1.5",
			children: e.map((e, t) => {
				let n = o.has(e.id);
				return /* @__PURE__ */ (0, H.jsxs)("button", {
					type: "button",
					"aria-pressed": n,
					title: e.name,
					onClick: (e) => s(t, e.shiftKey),
					className: `relative aspect-card-cover cursor-pointer overflow-hidden rounded-surface bg-background-tertiary-default outline-none transition-opacity focus-visible:ring-2 focus-visible:ring-border-focus-ring ${n ? "opacity-100 ring-2 ring-border-button-active ring-inset" : "opacity-50"}`,
					children: [
						/* @__PURE__ */ (0, H.jsx)("img", {
							src: `/poster?id=${e.id}&c=4`,
							alt: "",
							loading: "lazy",
							className: "size-full object-cover"
						}),
						/* @__PURE__ */ (0, H.jsx)("span", {
							className: "absolute top-1 right-1",
							children: /* @__PURE__ */ (0, H.jsx)(D, {
								size: "sm",
								state: {
									isSelected: n,
									isIndeterminate: !1,
									isFocusVisible: !1,
									isDisabled: r,
									isHovered: !1
								}
							})
						}),
						/* @__PURE__ */ (0, H.jsx)(M, { children: `${n ? "已选" : "未选"} ${e.name || e.id}` })
					]
				}, e.id);
			})
		})]
	});
}
//#endregion
//#region src/react/review/review-card.tsx
var Pe = b({
	variant: "outlined",
	padding: "none",
	className: "flex flex-col gap-4 px-5 pt-4"
}), Q = "flex min-h-6 min-w-0 items-center", $ = 2, Fe = (e) => e === "western_identity" ? "h-review-card-tall" : "h-review-card";
function Ie(e) {
	let { category: t, row: n, choice: r, onChoice: i, selected: o, onSelect: s, locked: c, busy: l, problem: u, genreTags: ee, onDecide: d, handlers: f } = e, p = (0, V.useRef)(!1), m = T(), te = T(), h = t === "metadata_fields", _ = g[t] || "", v = String(n.creator || "").trim(), y = !!_ && !!v, b = oe(t, n), x = pe(t, n), S = ve(t, n), C = xe(n), w = j(n), E = ne(t, n), D = n.comparison_assets || [], ie = n.preview_assets || [], ae = String(n.decision || "pending") !== "pending", O = D.length > 1 ? /* @__PURE__ */ (0, H.jsxs)("div", {
		className: "flex flex-col gap-3",
		children: [D.slice(0, $).map((e) => /* @__PURE__ */ (0, H.jsx)(X, {
			asset: e,
			openItem: f.openItem
		}, e.id)), D.length > $ ? /* @__PURE__ */ (0, H.jsx)("p", {
			className: "text-body-2-regular text-text-secondary",
			children: `另有 ${(D.length - $).toLocaleString()} 部对照作品`
		}) : null]
	}) : y ? /* @__PURE__ */ (0, H.jsx)(Z, {
		kind: _,
		name: v,
		works: Number(n.video_count || n.videos || 0),
		openEntity: f.openEntity,
		avatar: a(v, n.entity_id ? {
			id: n.entity_id,
			has_image: !!n.has_image,
			image_version: n.image_version,
			avatar_focus: n.avatar_focus
		} : null, null, _)
	}) : n.asset_id ? /* @__PURE__ */ (0, H.jsx)(X, {
		openItem: f.openItem,
		asset: {
			id: n.asset_id,
			name: n.asset_name,
			preview_url: n.asset_preview_url
		}
	}) : null, se = h ? /* @__PURE__ */ (0, H.jsx)(K, {
		row: n,
		fieldName: x,
		value: r.candidateKey,
		onChange: (e) => i({
			...r,
			candidateKey: e
		}),
		locked: c
	}) : t === "creator_tags" ? ie.length ? /* @__PURE__ */ (0, H.jsx)(Ne, {
		assets: ie,
		picked: r.assets,
		locked: c,
		onPicked: (e) => i({
			...r,
			assets: e
		})
	}) : /* @__PURE__ */ (0, H.jsx)(he, {
		size: "compact",
		icon: we,
		title: "这批作品尚未抽帧",
		children: `${n.video_count || ""} 条作品还没有可用预览；批准后仍会按所选资料写入标签。`
	}) : t === "fc2_similarity" ? null : t === "western_identity" ? /* @__PURE__ */ (0, H.jsx)(Me, {
		row: n,
		openItem: f.openItem,
		openEntity: f.openEntity,
		onReveal: f.onReveal,
		revealing: f.revealing,
		note: f.revealNote
	}) : /* @__PURE__ */ (0, H.jsx)(Ae, { url: n.preview_url }), ce = y ? O : x ? /* @__PURE__ */ (0, H.jsxs)("h4", {
		className: `${Q} flex-wrap gap-2`,
		children: [/* @__PURE__ */ (0, H.jsx)("span", {
			title: x,
			className: "flex max-w-full min-w-0 overflow-hidden rounded-md",
			children: /* @__PURE__ */ (0, H.jsx)(A, {
				variant: "caption",
				color: "blue",
				children: x
			})
		}), /* @__PURE__ */ (0, H.jsx)("span", {
			title: S,
			className: "min-w-0 truncate text-body-medium text-text-primary",
			children: S
		})]
	}) : /* @__PURE__ */ (0, H.jsx)("h4", {
		className: Q,
		children: /* @__PURE__ */ (0, H.jsx)("span", {
			title: b,
			className: "min-w-0 truncate text-body-medium text-text-primary",
			children: b
		})
	});
	return /* @__PURE__ */ (0, H.jsxs)("section", {
		"aria-label": b,
		"data-review-key": n.item_key,
		className: `${Pe} ${Fe(t)} overflow-hidden`,
		children: [
			/* @__PURE__ */ (0, H.jsxs)("header", {
				className: "flex min-w-0 shrink-0 items-start gap-2",
				children: [
					c ? null : /* @__PURE__ */ (0, H.jsx)("span", {
						className: `${Q} shrink-0`,
						onPointerDownCapture: (e) => {
							p.current = e.shiftKey;
						},
						onKeyDownCapture: (e) => {
							p.current = e.shiftKey;
						},
						children: /* @__PURE__ */ (0, H.jsx)(re, {
							isSelected: o,
							"aria-label": `选择 ${b}`,
							onChange: (e) => s(p.current, e)
						})
					}),
					/* @__PURE__ */ (0, H.jsx)("div", {
						className: "min-w-0 flex-1",
						children: ce
					}),
					ae ? /* @__PURE__ */ (0, H.jsx)(A, {
						variant: "caption",
						color: "neutral",
						children: n.decision
					}) : null
				]
			}),
			/* @__PURE__ */ (0, H.jsx)("div", {
				className: "relative flex min-w-0 min-h-0 flex-1 flex-col",
				children: /* @__PURE__ */ (0, H.jsxs)("div", {
					ref: m,
					className: "flex min-w-0 min-h-0 flex-1 flex-col gap-3 overflow-y-auto",
					children: [
						n.source_name ? /* @__PURE__ */ (0, H.jsx)("p", {
							className: "text-body-2-regular text-text-secondary",
							children: `来源写法：${n.source_name}`
						}) : null,
						!y && (n.board || n.assets) ? /* @__PURE__ */ (0, H.jsx)("p", {
							className: "text-body-2-regular text-text-secondary",
							children: `对照文件：${Number(n.video_count || n.assets || 0).toLocaleString()}`
						}) : null,
						!y && O ? O : null,
						w.length || t === "creator_tags" ? /* @__PURE__ */ (0, H.jsx)("div", {
							className: "flex flex-wrap gap-1",
							children: w.length ? w.map((e) => /* @__PURE__ */ (0, H.jsx)(A, {
								variant: "caption",
								color: "soft",
								children: e
							}, e)) : /* @__PURE__ */ (0, H.jsx)("small", {
								className: "text-body-2-regular text-text-secondary",
								children: "暂无待确认标签"
							})
						}) : null,
						se,
						/* @__PURE__ */ (0, H.jsx)(ke, {
							row: n,
							tags: ee,
							locked: c,
							toast: f.toast
						}),
						!h && C ? /* @__PURE__ */ (0, H.jsx)("p", {
							className: "text-body-2-regular text-text-secondary wrap-anywhere",
							children: C
						}) : null
					]
				})
			}),
			h && C ? /* @__PURE__ */ (0, H.jsx)("div", {
				className: "relative -mx-5 -mb-4 shrink-0",
				children: /* @__PURE__ */ (0, H.jsx)("p", {
					ref: te,
					role: "region",
					"aria-label": "当前信息",
					className: "max-h-22 overflow-y-auto border-t border-separator-border px-5 py-2.5 text-body-2-regular text-text-secondary wrap-anywhere",
					children: C
				})
			}) : null,
			/* @__PURE__ */ (0, H.jsxs)("footer", {
				className: "-mx-5 flex min-h-14 shrink-0 flex-wrap items-center justify-end gap-2 rounded-b-surface border-t border-separator-border bg-background-secondary-default py-3 pr-3 pl-5",
				children: [
					/* @__PURE__ */ (0, H.jsx)(k, {
						variant: "danger",
						size: "small",
						disabled: c,
						...F(l),
						onClick: () => d("rejected"),
						children: "拒绝"
					}),
					/* @__PURE__ */ (0, H.jsx)(k, {
						variant: "secondary",
						size: "small",
						disabled: c,
						...F(l),
						onClick: () => d("skipped"),
						children: "跳过"
					}),
					/* @__PURE__ */ (0, H.jsx)(k, {
						variant: "primary",
						size: "small",
						disabled: c || !E,
						...F(l),
						title: E ? void 0 : "没有可采用的资料，只能拒绝或跳过",
						onClick: () => d("approved"),
						children: E ? "通过" : "不可通过"
					}),
					u ? /* @__PURE__ */ (0, H.jsx)("p", {
						role: "status",
						className: "w-full text-body-2-regular text-text-error-primary",
						children: u
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
	return t <= 1 ? null : /* @__PURE__ */ (0, H.jsxs)("nav", {
		"aria-label": "复核分页",
		"data-pagination-layout": "",
		className: "inline-grid w-full min-w-0 items-center gap-2",
		children: [
			/* @__PURE__ */ (0, H.jsx)(k, {
				variant: "secondary",
				size: "small",
				disabled: e <= 1,
				onClick: () => n(e - 1),
				children: "上一页"
			}),
			/* @__PURE__ */ (0, H.jsx)("ul", {
				className: "flex min-w-0 flex-wrap items-center justify-center gap-1",
				children: m(e, t).map((t, r) => /* @__PURE__ */ (0, H.jsx)("li", { children: t === "…" ? /* @__PURE__ */ (0, H.jsx)("span", {
					"aria-hidden": !0,
					className: "px-1 text-body-2-regular text-text-tertiary",
					children: "…"
				}) : /* @__PURE__ */ (0, H.jsx)(k, {
					variant: t === e ? "secondary" : "ghost",
					size: "small",
					"aria-label": `第 ${t} 页`,
					"aria-current": t === e ? "page" : void 0,
					onClick: () => n(Number(t)),
					children: t
				}) }, t === "…" ? `dots-${r}` : t))
			}),
			/* @__PURE__ */ (0, H.jsx)(k, {
				variant: "secondary",
				size: "small",
				disabled: e >= t,
				onClick: () => n(e + 1),
				children: "下一页"
			})
		]
	});
}
function ze(i) {
	let [a, p] = (0, V.useState)(() => matchMedia("(max-width:900px)").matches);
	(0, V.useEffect)(() => {
		let e = matchMedia("(max-width:900px)"), t = () => p(e.matches);
		return e.addEventListener("change", t), () => e.removeEventListener("change", t);
	}, []);
	let { route: m, openItem: g, openEntity: v, revealSource: b, toast: x, readOnly: re, readOnlyMessage: w, writerUrl: T } = i, [D, ae] = (0, V.useState)(d(i.category) ? i.category : h), [O, oe] = (0, V.useState)("candidates"), [ce, le] = (0, V.useState)(""), [ue, A] = (0, V.useState)(1), [j, M] = (0, V.useState)(/* @__PURE__ */ new Set()), [pe, N] = (0, V.useState)(/* @__PURE__ */ new Map()), [ge, P] = (0, V.useState)(/* @__PURE__ */ new Map()), [ve, F] = (0, V.useState)(""), I = (0, V.useRef)(null), [xe, Se] = (0, V.useState)(0), [Ce, we] = (0, V.useState)(""), L = (0, V.useRef)(!0);
	(0, V.useEffect)(() => () => {
		L.current = !1;
	}, []);
	let R = se({
		queryKey: ee,
		queryFn: ({ signal: e }) => c(e)
	}), z = R.data || {
		sections: {},
		counts: {}
	}, B = z.sections[D] || [], U = D === "metadata_fields", W = re, G = t(B, U), K = G.some(([e]) => e === O) ? O : "candidates", q = _e(B, K), ke = q.some((e) => e.key === ce) ? ce : "", J = de(f(B, K, ke), ue), Y = J.rows.map((e) => e.item_key), Ae = new Set(Y), je = q.map((e) => ({
		...e,
		rows: e.rows.filter((e) => Ae.has(e.item_key))
	})).filter((e) => e.rows.length), X = (e) => pe.get(e.item_key) || y(e), Z = B.filter((e) => j.has(e.item_key)), Me = (e) => {
		let t = new Set(e);
		M((e) => new Set([...e].filter((e) => !t.has(e)))), N((e) => new Map([...e].filter(([e]) => !t.has(e)))), P((e) => new Map([...e].filter(([e]) => !t.has(e))));
	}, Ne = (e, t) => P((n) => new Map(n).set(e, t)), Pe = (e) => {
		ae(e), oe("candidates"), le(""), A(1), M(/* @__PURE__ */ new Set()), N(/* @__PURE__ */ new Map()), P(/* @__PURE__ */ new Map()), F(""), I.current = null, m({ category: e === "metadata_fields" ? "" : e });
	}, Q = fe({
		mutationFn: ({ row: e, status: t }) => ye(S(D, n(D, e), t, X(e))),
		onSuccess: (e, { row: t, status: n }) => {
			e.ok ? (C(D, [t.item_key]), Me([t.item_key]), x(u(n))) : Ne(t.item_key, e.error || "服务端拒绝了这次判定");
		},
		onError: (e, { row: t }) => Ne(t.item_key, s(e))
	}), $ = fe({
		mutationFn: async (e) => {
			let t = Z, r = [], i = [];
			for (let [a, o] of t.entries()) {
				if (!L.current) break;
				F(`正在处理 ${a} / ${t.length}`);
				try {
					let t = await ye(S(D, n(D, o), e, X(o)));
					if (!t.ok) throw Error(t.error || "服务端未采用该项");
					r.push(o.item_key);
				} catch (e) {
					i.push([o.item_key, s(e)]);
				}
			}
			return {
				status: e,
				done: r,
				failures: i
			};
		},
		onSuccess: ({ status: e, done: t, failures: n }) => {
			C(D, t), Me(t), n.forEach(([e, t]) => Ne(e, t)), F(""), x(`已${e === "approved" ? "通过" : "拒绝"} ${t.length} 项` + (n.length ? `，${n.length} 项未完成` : ""));
		},
		onError: (e) => {
			F(s(e));
		}
	}), Fe = (e) => {
		!$.isPending && Z.length && (e === "approved" && U && Z.some((e) => !X(e).candidateKey) ? F("请先为所选资料选择要采用的来源。") : (F(""), $.mutate(e)));
	}, ze = (e) => {
		N((t) => {
			let n = new Map(t);
			for (let t of Z) {
				let r = t.candidates?.find((t) => t.source === e);
				r && n.set(t.item_key, {
					...X(t),
					candidateKey: r.candidate_key
				});
			}
			return n;
		}), F(`已选择 ${e}，点击通过所选采用。`);
	}, Be = async (e) => {
		if (xe) return;
		Se(e), we("");
		let t = await b(e);
		L.current && (Se(0), we(t));
	}, Ve = E(z.mirror, w), He = z.genre_tags || [], Ue = {
		openItem: g,
		openEntity: v,
		onReveal: Be,
		revealing: xe,
		revealNote: Ce,
		toast: x
	};
	return /* @__PURE__ */ (0, H.jsx)(Te, { children: /* @__PURE__ */ (0, H.jsxs)("div", {
		className: "flex flex-col gap-5 pb-10",
		children: [
			W ? /* @__PURE__ */ (0, H.jsx)(be, {
				tone: "warning",
				title: "本机只能浏览",
				extra: T ? /* @__PURE__ */ (0, H.jsx)("p", {
					className: "text-body-2-regular",
					children: /* @__PURE__ */ (0, H.jsx)(r, {
						href: T,
						children: "前往写入端复核"
					})
				}) : void 0,
				children: Ve
			}) : null,
			/* @__PURE__ */ (0, H.jsx)(Oe, { tags: He }),
			/* @__PURE__ */ (0, H.jsxs)(e, {
				orientation: a ? "horizontal" : "vertical",
				selectedKey: D,
				onSelectionChange: (e) => {
					let t = String(e);
					d(t) && Pe(t);
				},
				className: "flex flex-col gap-5 review-split:flex-row review-split:items-start review-split:gap-6",
				children: [/* @__PURE__ */ (0, H.jsxs)("div", {
					"data-section-nav": !0,
					className: "w-full min-w-0 review-split:sticky review-split:top-topbar review-split:w-review-tabs review-split:shrink-0",
					children: [/* @__PURE__ */ (0, H.jsx)("h2", {
						id: "reviewcategories",
						children: "复核分类"
					}), /* @__PURE__ */ (0, H.jsx)(Ee, {
						scrollable: a,
						"aria-labelledby": "reviewcategories",
						"data-section-items": !0,
						className: "flex review-split:flex-col review-split:items-stretch",
						children: o.map((e) => {
							let t = Number(z.counts[e] || 0);
							return /* @__PURE__ */ (0, H.jsxs)(_, {
								id: e,
								className: Le,
								"data-pill-selected": D === e ? "" : void 0,
								"data-pill-variant": "gray",
								children: [te[e], t ? /* @__PURE__ */ (0, H.jsx)("span", {
									className: "tabular-nums text-caption-1-medium text-text-secondary",
									children: t.toLocaleString()
								}) : null]
							}, e);
						})
					})]
				}), /* @__PURE__ */ (0, H.jsxs)(ie, {
					id: D,
					className: "flex min-w-0 flex-1 flex-col gap-5",
					children: [
						B.length && !W ? /* @__PURE__ */ (0, H.jsx)(De, {
							groupOptions: G,
							groupBy: K,
							onGroupBy: (e) => {
								oe(e), le(""), A(1);
							},
							groups: q,
							filter: ke,
							onFilter: (e) => {
								le(e), A(1);
							},
							pageKeys: Y,
							selected: j,
							onSelected: M,
							selectedRows: Z,
							metadata: U,
							approvable: Z.every((e) => ne(D, e)),
							busy: $.isPending,
							feedback: ve,
							onUnifySource: ze,
							onRun: Fe
						}) : null,
						J.rows.length ? je.map((e) => /* @__PURE__ */ (0, H.jsxs)("section", {
							className: "flex flex-col gap-3",
							children: [je.length > 1 || K !== "candidates" ? /* @__PURE__ */ (0, H.jsxs)("div", {
								className: "flex flex-wrap items-center gap-2",
								children: [/* @__PURE__ */ (0, H.jsx)("h3", {
									className: "text-body-medium text-text-primary",
									children: `${e.title} · ${e.rows.length}`
								}), W ? null : /* @__PURE__ */ (0, H.jsx)(k, {
									variant: "ghost",
									size: "small",
									onClick: () => {
										let t = e.rows.map((e) => e.item_key), n = t.every((e) => j.has(e)), r = new Set(j);
										for (let e of t) n ? r.delete(e) : r.add(e);
										M(r);
									},
									children: e.rows.every((e) => j.has(e.item_key)) ? "清空本组" : "全选本组"
								})]
							}) : null, /* @__PURE__ */ (0, H.jsx)("div", {
								className: "review-grid gap-5",
								children: e.rows.map((e) => /* @__PURE__ */ (0, H.jsx)(Ie, {
									category: D,
									row: e,
									choice: X(e),
									onChoice: (t) => N((n) => new Map(n).set(e.item_key, t)),
									selected: j.has(e.item_key),
									onSelect: (t, n) => M((r) => {
										let i = new Set(r);
										return I.current = me(i, Y, I.current, e.item_key, t, n), i;
									}),
									locked: W,
									busy: Q.isPending && Q.variables?.row.item_key === e.item_key,
									problem: ge.get(e.item_key) || "",
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
						}, e.key)) : R.isError && !R.data ? /* @__PURE__ */ (0, H.jsx)(be, {
							tone: "error",
							title: "复核队列读取失败",
							action: /* @__PURE__ */ (0, H.jsx)(k, {
								variant: "secondary",
								size: "small",
								disabled: R.isFetching,
								onClick: () => void R.refetch(),
								children: "立即重试"
							}),
							children: s(R.error)
						}) : /* @__PURE__ */ (0, H.jsx)(he, {
							icon: l,
							title: "此分类没有待复核项目",
							actions: o.some((e) => e !== D && Number(z.counts[e] || 0) > 0) ? /* @__PURE__ */ (0, H.jsx)(k, {
								size: "small",
								onClick: () => {
									let e = o.find((e) => e !== D && Number(z.counts[e] || 0) > 0);
									e && Pe(e);
								},
								children: "查看其他分类"
							}) : void 0,
							children: "可切换分类查看其他待确认资料。"
						}),
						/* @__PURE__ */ (0, H.jsx)(Re, {
							page: J.page,
							pages: J.pages,
							onPage: A
						})
					]
				})]
			})
		]
	}) });
}
//#endregion
export { ze as ReviewPage };

//# debugId=784a955c-ce4c-4fa1-99bd-9355f850ad34