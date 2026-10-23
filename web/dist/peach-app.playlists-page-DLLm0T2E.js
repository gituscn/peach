(function() {
	try {
		var e = typeof window < "u" ? window : typeof global < "u" ? global : typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : {}, t = new e.Error().stack;
		t && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[t] = "30308fed-6e40-4a3b-bbfa-ced315736e0d", e._sentryDebugIdIdentifier = "sentry-dbid-30308fed-6e40-4a3b-bbfa-ced315736e0d");
	} catch {}
})();
import { $a as e, Bt as t, Ft as n, Gl as r, Ht as i, It as a, Lt as o, Pt as s, Qa as c, Rt as l, Sc as u, Ua as d, Us as f, Ut as p, Vt as m, ao as h, au as g, ca as _, co as v, cu as y, ds as b, eo as x, fs as S, io as C, iu as w, lo as T, ls as E, oo as D, pu as O, ra as k, ro as A, uu as j, zt as M } from "./peach-app.js";
//#region src/react/playlists/playlists-page.tsx
var N = /* @__PURE__ */ O(j(), 1), P = y(), F = C("ellipsis"), I = C("pencil"), L = C("trash"), R = C("playlist"), z = f(c, e, "text-body-2-medium"), B = "播放列表名称不能为空", V = (e) => async () => {
	try {
		await e();
	} finally {
		m();
	}
};
function H({ toast: e }) {
	let [t, i] = (0, N.useState)(""), [o, s] = (0, N.useState)(""), c = w({
		mutationFn: (e) => n(e),
		onSuccess: (t) => {
			i(""), s(""), m(), e("已新建播放列表", { undo: V(() => a(t.playlist.id)) });
		},
		onError: (e) => s(r(e) || "新建失败")
	});
	return /* @__PURE__ */ (0, P.jsxs)("form", {
		"data-playlist-create": "",
		"aria-label": "新建播放列表",
		onSubmit: (e) => {
			e.preventDefault(), !c.isPending && (t.trim() ? c.mutate(t) : s(B));
		},
		className: "flex flex-wrap items-end gap-2",
		children: [/* @__PURE__ */ (0, P.jsx)("div", {
			className: "min-w-50 max-w-80 flex-1 basis-50 max-board-narrow:min-w-0 max-board-narrow:max-w-none",
			children: /* @__PURE__ */ (0, P.jsx)(T, {
				label: "新播放列表",
				placeholder: "输入名称",
				maxLength: 80,
				value: t,
				onChange: (e) => {
					i(e), s("");
				},
				validationBehavior: "aria",
				isInvalid: !!o,
				hint: o || void 0
			})
		}), /* @__PURE__ */ (0, P.jsx)(S, {
			type: "submit",
			...A(c.isPending),
			children: "新建"
		})]
	});
}
function U({ target: e, close: t, toast: n }) {
	let [a, o] = (0, N.useState)(""), [s, c] = (0, N.useState)(""), l = (0, N.useRef)(null);
	(0, N.useEffect)(() => {
		if (!e) return;
		o(e.name), c("");
		let t = requestAnimationFrame(() => {
			l.current?.focus(), l.current?.select();
		});
		return () => cancelAnimationFrame(t);
	}, [e]);
	let u = w({
		mutationFn: ({ row: e, value: t }) => i(e.id, t),
		onSuccess: (e, { row: r }) => {
			t(), m(), n("已重命名播放列表", { undo: V(() => i(r.id, r.name)) });
		},
		onError: (e) => c(r(e))
	});
	return /* @__PURE__ */ (0, P.jsx)(v, {
		isOpen: !!e,
		onOpenChange: (e) => {
			e || t();
		},
		width: "form",
		children: /* @__PURE__ */ (0, P.jsxs)("form", {
			"data-playlist-rename": "",
			onSubmit: (t) => {
				if (t.preventDefault(), !e || u.isPending) return;
				let n = a.trim();
				n ? u.mutate({
					row: e,
					value: n
				}) : c(B);
			},
			className: "flex min-h-0 flex-col",
			children: [/* @__PURE__ */ (0, P.jsxs)("div", {
				className: "flex flex-col gap-4 p-5",
				children: [/* @__PURE__ */ (0, P.jsx)(b, {
					slot: "title",
					className: "text-title-2-semibold text-text-primary",
					children: "编辑名称"
				}), /* @__PURE__ */ (0, P.jsx)(T, {
					ref: l,
					label: "名称",
					placeholder: "输入名称",
					maxLength: 80,
					value: a,
					onChange: (e) => {
						o(e), c("");
					},
					validationBehavior: "aria",
					isInvalid: !!s,
					hint: s || void 0
				})]
			}), /* @__PURE__ */ (0, P.jsxs)("div", {
				className: "flex justify-between gap-4 p-3",
				children: [/* @__PURE__ */ (0, P.jsx)(S, {
					variant: "secondary",
					onClick: t,
					children: "取消"
				}), /* @__PURE__ */ (0, P.jsx)(S, {
					type: "submit",
					...A(u.isPending),
					children: "保存名称"
				})]
			})]
		})
	});
}
function W({ name: e, onRename: t, onDelete: n }) {
	let r = (0, N.useRef)(null), [i, a] = (0, N.useState)(!1), o = (e) => {
		a(!1), e();
	};
	return /* @__PURE__ */ (0, P.jsxs)(P.Fragment, { children: [/* @__PURE__ */ (0, P.jsx)("button", {
		ref: r,
		type: "button",
		title: "更多操作",
		"aria-label": `播放列表操作：${e}`,
		"aria-haspopup": "dialog",
		"aria-expanded": i,
		"data-playlist-menu": "",
		onClick: () => a(!0),
		className: "flex size-7.5 flex-none cursor-pointer items-center justify-center rounded-2lg text-foreground-icon-secondary outline-none transition-colors hover:bg-background-primary-hover hover:text-foreground-icon-primary aria-expanded:bg-background-primary-hover aria-expanded:text-foreground-icon-primary focus-visible:ring-2 focus-visible:ring-border-focus-ring",
		children: /* @__PURE__ */ (0, P.jsx)(F, {
			"aria-hidden": !0,
			className: "size-4.5"
		})
	}), /* @__PURE__ */ (0, P.jsx)(E, {
		triggerRef: r,
		isOpen: i,
		onOpenChange: a,
		placement: "bottom end",
		offset: 4,
		className: x,
		children: /* @__PURE__ */ (0, P.jsxs)(d, {
			"aria-label": `播放列表操作：${e}`,
			className: "flex w-37.5 flex-col gap-0.5 outline-none",
			children: [/* @__PURE__ */ (0, P.jsxs)("button", {
				type: "button",
				className: z,
				onClick: () => o(t),
				children: [/* @__PURE__ */ (0, P.jsx)(I, {
					"aria-hidden": !0,
					className: "size-(--icon-inline) shrink-0"
				}), "编辑名称"]
			}), /* @__PURE__ */ (0, P.jsxs)("button", {
				type: "button",
				className: z,
				onClick: () => o(n),
				children: [/* @__PURE__ */ (0, P.jsx)(L, {
					"aria-hidden": !0,
					className: "size-(--icon-inline) shrink-0"
				}), "删除播放列表"]
			})]
		})
	})] });
}
function G({ openPlaylist: e, openEntity: n, canFlip: i, toast: c, revision: d }) {
	let f = g({
		queryKey: s,
		queryFn: ({ signal: e }) => o(e)
	}), [v, y] = (0, N.useState)(null), b = (0, N.useRef)(d);
	(0, N.useEffect)(() => {
		b.current !== d && (b.current = d, m());
	}, [d]);
	let x = f.data, S = x?.items ?? [], C = (e) => {
		u({
			title: "删除播放列表",
			body: "这个播放列表将被删除，视频文件保留。",
			confirmLabel: "删除播放列表",
			danger: !0,
			onConfirm: async () => {
				let n = await l(e.id);
				await a(e.id), m(), c("已删除播放列表", n ? { undo: V(() => t(n)) } : void 0);
			}
		});
	};
	return /* @__PURE__ */ (0, P.jsxs)("div", {
		className: "w-full pt-1 pb-10.5",
		children: [
			/* @__PURE__ */ (0, P.jsxs)("header", {
				className: "mb-4 flex items-start justify-between gap-4.5 max-board-narrow:flex-col max-board-narrow:items-stretch",
				children: [/* @__PURE__ */ (0, P.jsxs)("div", { children: [/* @__PURE__ */ (0, P.jsx)("h2", {
					className: "mb-1 text-display-4-medium! text-text-primary",
					children: "播放列表"
				}), /* @__PURE__ */ (0, P.jsx)("p", {
					className: "text-body-2-regular text-text-secondary",
					children: "保存 Mix，按自己的顺序继续播放。"
				})] }), /* @__PURE__ */ (0, P.jsx)(H, { toast: c })]
			}),
			/* @__PURE__ */ (0, P.jsx)("div", {
				className: "mx-auto w-full max-w-board",
				children: x ? S.length ? /* @__PURE__ */ (0, P.jsx)("div", {
					"data-playlist-grid": "",
					className: "card-grid-cover gap-4.5",
					children: S.map((t) => {
						let r = p(t), a = t.name.trim() || "未命名播放列表";
						return /* @__PURE__ */ (0, P.jsx)(k, {
							"data-playlist-card": String(t.id),
							name: a,
							caption: t.source_kind === "mix" ? "由 Mix 保存" : "手动播放列表",
							count: t.item_count,
							poster: t.preview_asset_id ? M(t.preview_asset_id) : null,
							flipImages: async () => (t.preview_ids || []).map(M),
							canFlip: i,
							faces: t.faces || [],
							onOpenEntity: n,
							...r ? { onOpen: () => e(t.id, r) } : {},
							openLabel: `打开播放列表 ${a}`,
							menu: /* @__PURE__ */ (0, P.jsx)(W, {
								name: a,
								onRename: () => y(t),
								onDelete: () => C(t)
							})
						}, t.id);
					})
				}) : /* @__PURE__ */ (0, P.jsx)(D, {
					icon: R,
					title: "还没有播放列表",
					actions: /* @__PURE__ */ (0, P.jsx)(h, {
						target: "[data-playlist-create] input",
						children: "新建播放列表"
					}),
					children: "保存 Mix 或新建列表后，会在这里按自己的顺序继续播放。"
				}) : f.isError ? /* @__PURE__ */ (0, P.jsx)(_, {
					message: r(f.error) || "播放列表读取失败",
					onRetry: () => void f.refetch()
				}) : null
			}),
			/* @__PURE__ */ (0, P.jsx)(U, {
				target: v,
				close: () => y(null),
				toast: c
			})
		]
	});
}
//#endregion
export { G as PlaylistsPage };

//# debugId=30308fed-6e40-4a3b-bbfa-ced315736e0d