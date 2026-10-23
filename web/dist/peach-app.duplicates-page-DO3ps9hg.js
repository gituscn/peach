(function() {
	try {
		var e = typeof window < "u" ? window : typeof global < "u" ? global : typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : {}, t = new e.Error().stack;
		t && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[t] = "7e1ca464-f0af-43d2-8afb-762fd9f399ee", e._sentryDebugIdIdentifier = "sentry-dbid-7e1ca464-f0af-43d2-8afb-762fd9f399ee");
	} catch {}
})();
import { Ci as e, Di as t, Ei as n, Fl as r, Gl as i, Il as a, Kl as o, Oi as s, Pl as c, Sc as l, Si as u, Tc as d, Ti as f, Va as p, Xl as m, Zl as h, au as g, bi as _, cu as v, fs as y, io as b, iu as x, ja as S, ki as C, ms as w, oo as T, pu as E, ro as D, so as O, un as k, uu as A, vn as j, vs as M, wi as N, xi as P, ya as F, yi as I } from "./peach-app.js";
//#region src/react/duplicates/duplicates-page.tsx
var L = /* @__PURE__ */ E(A(), 1), R = v(), z = b("play"), B = b("file-stack"), V = p({
	padding: "none",
	radius: "surface",
	className: "mb-6 overflow-hidden dark:bg-background-primary-default"
}), H = "rounded-sm px-1.5 py-px text-caption-1-regular leading-5", U = "rounded-sm px-2 py-0.5 text-caption-1-regular leading-5", W = "font-mono text-caption-1-regular leading-5 text-text-secondary", G = () => {
	a.invalidateQueries({
		queryKey: I,
		exact: !0
	}), a.invalidateQueries({
		queryKey: j,
		exact: !0
	});
};
function K(e) {
	return e.identical ? /* @__PURE__ */ (0, R.jsx)("span", {
		className: `${U} text-(--keep)`,
		children: "sha1 一致"
	}) : /* @__PURE__ */ (0, R.jsx)("span", {
		className: `${U} text-text-secondary`,
		children: e.evidence === "same_code_short_copy" ? "同番号短版本" : "时长推断"
	});
}
function q({ file: t, prefix: n, openItem: r }) {
	let i = () => r(t.id), a = o[t.location] || t.location || t.drive;
	return /* @__PURE__ */ (0, R.jsxs)("div", {
		className: "duplicate-row items-center gap-3 border-t border-separator-border px-5 py-4 max-compact:p-4",
		children: [
			/* @__PURE__ */ (0, R.jsxs)("button", {
				type: "button",
				onClick: i,
				"aria-label": `预览 ${t.name}`,
				className: "relative row-span-2 inline-grid aspect-16/10 w-full cursor-pointer place-items-center overflow-hidden rounded-2lg bg-background-tertiary-default text-text-secondary",
				children: [/* @__PURE__ */ (0, R.jsx)(z, {
					"aria-hidden": !0,
					className: "size-6"
				}), /* @__PURE__ */ (0, R.jsx)("img", {
					src: `/thumb?id=${t.id}&c=4`,
					alt: "",
					loading: "lazy",
					onError: (e) => e.currentTarget.remove(),
					className: "absolute inset-0 size-full object-contain"
				})]
			}),
			/* @__PURE__ */ (0, R.jsxs)("span", {
				className: "flex min-w-0 items-center gap-2 max-duplicate-narrow:col-start-2 max-duplicate-narrow:-col-end-1",
				children: [/* @__PURE__ */ (0, R.jsx)("button", {
					type: "button",
					onClick: i,
					title: t.name,
					"data-middle-truncate": !0,
					"data-middle-truncate-within": !0,
					className: "min-w-0 shrink cursor-pointer truncate text-left text-body-regular hover:text-text-secondary",
					children: e(t.name, n)
				}), t.is_largest || t.is_longest ? /* @__PURE__ */ (0, R.jsxs)("span", {
					className: "flex flex-none gap-1",
					children: [t.is_largest ? /* @__PURE__ */ (0, R.jsx)("i", {
						className: `${H} not-italic bg-background-primary-hover text-text-secondary`,
						children: "最大"
					}) : null, t.is_longest ? /* @__PURE__ */ (0, R.jsx)("i", {
						className: `${H} not-italic bg-(--keep)/22 text-(--keep)`,
						children: "最长"
					}) : null]
				}) : null]
			}),
			/* @__PURE__ */ (0, R.jsxs)("span", {
				className: `${W} flex min-w-0 items-center gap-1.5`,
				children: [/* @__PURE__ */ (0, R.jsx)(S, { mark: d[t.location] || "database" }), /* @__PURE__ */ (0, R.jsx)("span", {
					title: a,
					className: "min-w-0 truncate",
					children: a
				})]
			}),
			/* @__PURE__ */ (0, R.jsx)("span", {
				className: W,
				children: h(t.size || 0)
			}),
			/* @__PURE__ */ (0, R.jsx)("span", {
				className: W,
				children: m(t.duration)
			}),
			/* @__PURE__ */ (0, R.jsx)("span", {
				className: `${W} col-start-2 -col-end-1 min-w-0 pt-0.5 wrap-anywhere max-duplicate-narrow:col-span-full`,
				children: t.path ?? ""
			})
		]
	});
}
function J({ openItem: e, toast: a, failure: d }) {
	let p = g({
		queryKey: I,
		queryFn: ({ signal: e }) => f(e)
	}), m = g({
		queryKey: c,
		queryFn: ({ signal: e }) => r(e)
	}), [v, b] = (0, L.useState)(""), S = x({
		mutationFn: (e) => P(e, "dispose"),
		onSuccess: (e, t) => {
			G(), a(`已把 ${t.length} 项移入回收站`, { undo: async () => {
				try {
					await P(t, "restore");
				} catch (e) {
					d("撤销移入回收站", e);
				} finally {
					G();
				}
			} });
		},
		onSettled: () => b("")
	}), E = p.data;
	if (!E) return /* @__PURE__ */ (0, R.jsx)("div", {
		className: "mx-auto w-full max-w-board",
		children: /* @__PURE__ */ (0, R.jsx)(O, {
			tone: "error",
			title: "重复文件读取失败",
			children: p.error ? i(p.error) : "未取得重复文件列表，请刷新页面重试。"
		})
	});
	let A = E.groups ?? [], j = C(m.data), z = ({ groups: e, keep: t, key: n }) => {
		if (S.isPending) return;
		let r = N(e, t);
		r.length && l({
			title: "移入回收站",
			body: `将把 ${r.length} 个重复文件的馆藏记录移入回收站，每组保留${_[t] ?? _.largest}。文件共 ${h(s(e, r))}，记录可从回收站还原。`,
			confirmLabel: "移入回收站",
			onConfirm: () => (b(n), S.mutateAsync(r))
		});
	}, H = (e) => D(v === e && S.isPending);
	return /* @__PURE__ */ (0, R.jsxs)("div", {
		className: "mx-auto w-full max-w-board pb-10.5",
		children: [
			/* @__PURE__ */ (0, R.jsx)(k, {
				label: "重复内容",
				figure: `${Number(E.total || 0).toLocaleString()} 组`,
				detail: `${Number(E.files || 0).toLocaleString()} 个文件 · 可回收 ${h(E.reclaimable)}`
			}),
			A.length ? /* @__PURE__ */ (0, R.jsxs)(w, {
				title: "批量保留",
				children: [
					/* @__PURE__ */ (0, R.jsx)(M, {
						busy: v === "all:largest",
						onPress: () => z({
							groups: A,
							keep: "largest",
							key: "all:largest"
						}),
						children: "全部保留最大"
					}),
					/* @__PURE__ */ (0, R.jsx)(M, {
						busy: v === "all:longest",
						onPress: () => z({
							groups: A,
							keep: "longest",
							key: "all:longest"
						}),
						children: "全部保留最长"
					}),
					u(A, j).map((e) => /* @__PURE__ */ (0, R.jsx)(M, {
						busy: v === `all:${e}`,
						onPress: () => z({
							groups: A,
							keep: e,
							key: `all:${e}`
						}),
						children: /* @__PURE__ */ (0, R.jsx)(F, {
							source: e,
							label: `全部优先 ${o[e] || e}`
						})
					}, e))
				]
			}) : null,
			S.isError ? /* @__PURE__ */ (0, R.jsx)("div", {
				className: "mb-5",
				children: /* @__PURE__ */ (0, R.jsx)(O, {
					tone: "error",
					title: "移入回收站失败",
					children: i(S.error)
				})
			}) : null,
			A.length ? A.map((r, i) => {
				let a = [r], s = t(r.files.map((e) => e.name)), c = (e) => `${i}:${e}`;
				return /* @__PURE__ */ (0, R.jsxs)("section", {
					"aria-label": r.code,
					className: V,
					children: [/* @__PURE__ */ (0, R.jsxs)("div", {
						className: "flex flex-wrap items-center gap-3 bg-background-tertiary-default p-5 max-compact:p-4 dark:bg-background-secondary-default",
						children: [
							/* @__PURE__ */ (0, R.jsx)("b", {
								className: "text-title-2-medium text-text-primary",
								children: r.code
							}),
							/* @__PURE__ */ (0, R.jsx)("span", {
								className: "font-mono text-caption-1-regular leading-5 text-text-primary",
								children: `${Number(r.count || 0).toLocaleString()} 个 · 可回收 ${h(r.reclaimable)}`
							}),
							K(r),
							r.cross_drive ? /* @__PURE__ */ (0, R.jsx)("span", {
								className: `${U} text-text-secondary`,
								children: `跨盘 ${r.drives.join(" ")}`
							}) : null,
							/* @__PURE__ */ (0, R.jsxs)("span", {
								className: "ml-auto flex flex-wrap gap-2 max-compact:ml-0 max-compact:w-full",
								children: [
									/* @__PURE__ */ (0, R.jsx)(y, {
										variant: "secondary",
										size: "small",
										...H(c("largest")),
										onClick: () => z({
											groups: a,
											keep: "largest",
											key: c("largest")
										}),
										children: "留最大"
									}),
									/* @__PURE__ */ (0, R.jsx)(y, {
										variant: "secondary",
										size: "small",
										...H(c("longest")),
										onClick: () => z({
											groups: a,
											keep: "longest",
											key: c("longest")
										}),
										children: "留最长"
									}),
									n(r.files, j).map((e) => /* @__PURE__ */ (0, R.jsx)(y, {
										variant: "secondary",
										size: "small",
										...H(c(e)),
										onClick: () => z({
											groups: a,
											keep: e,
											key: c(e)
										}),
										children: /* @__PURE__ */ (0, R.jsx)(F, {
											source: e,
											label: `留 ${o[e] || e}`
										})
									}, e)),
									/* @__PURE__ */ (0, R.jsx)(y, {
										variant: "danger",
										size: "small",
										...H(c("all")),
										onClick: () => z({
											groups: a,
											keep: "all",
											key: c("all")
										}),
										children: "整组回收"
									})
								]
							})
						]
					}), /* @__PURE__ */ (0, R.jsx)("div", { children: r.files.map((t) => /* @__PURE__ */ (0, R.jsx)(q, {
						file: t,
						prefix: s,
						openItem: e
					}, t.id)) })]
				}, `${r.code}-${i}`);
			}) : /* @__PURE__ */ (0, R.jsx)(T, {
				icon: B,
				title: "没有找到重复文件",
				children: "所有来源之间没有检测到内容相同的文件。扫描新来源后，这里会自动更新。"
			}),
			A.length > 0 && E.total > A.length ? /* @__PURE__ */ (0, R.jsx)("p", {
				className: "text-center text-caption-1-regular text-text-secondary",
				children: `显示可回收最多的前 ${A.length.toLocaleString()} 组，共 ${Number(E.total).toLocaleString()} 组；处理掉这些后，其余的会补上来。`
			}) : null
		]
	});
}
//#endregion
export { J as DuplicatesPage };

//# debugId=7e1ca464-f0af-43d2-8afb-762fd9f399ee