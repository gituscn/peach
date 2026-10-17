# 扫描任务控件取证

2026-10-18 通过隔离 `agent-browser` 会话检查公开演示。本文件为人工取证笔记，不作为上游 Markdown 快照登记。

## 公开参考

- [Agent Progress](https://www.boardui.com/components/agent-progress)：实测外框宽 341px，`rounded-2xl` 对应 16px 圆角，1px `border-button-default` 边框，`background-primary-default` 表面，`shadow-xs` 对应浅色 `0 1px 2px / 5%` 接触阴影。可展开与收起，阶段行高 32px、行间距 6px，标题行高 20px。官方示例按 `stepDuration` 推进。
- [Composer Panel](https://www.boardui.com/components/composer-panel)：实测模型菜单内的 Effort 浮层有六个停点，轨道宽 240px、高 27px；拖柄宽 21px、高 27px，左右预留各 10.5px。最高档在轨道内用两层 canvas 绘制流光，装饰不接收指针，滑块由 React Aria 驱动。
- 用户截图确认最高档保留流光，三档文案上方为最慢／最快，下方为占用少／占用多。用户明确要求参考公开代码和 CSS 自行实现组件。

公开演示截图存于本机 `attic/evidence/20261017-processing-controls/`：

| 文件 | SHA-256 |
| --- | --- |
| `reference-effort.png` | `20551f789bb235a3ec1da5c17e8616d9a189b5b6750003dee29349d789ca0d66` |
| `reference-agent-progress.png` | `179620ca3e3fedb40c2cc5d1899e79a46fd15d10871d45f337cacfc8db2bb288` |

## Peach 适配

保留折叠后可找回进度的交互；常驻任务面位于右下角。普通 Toast 和任务卡共用 Agent Progress 外框：通知栈内的浮层半径引用既有 `radius-2xl`，边框沿用 `border-button-default`，阴影沿用 `elevation-xs`；内容宽度、字号、内边距与控制排版各自保留。未知总量不显示百分比；圆环表达当前阶段完成率，正文来自实际任务阶段和文件名。后端逐资产执行资料、封面和预览，页面不按演示计时器自动完成阶段。

Effort 是重建方案，不是官方 Pro 源码副本。轨道与拖柄采用实测几何，圆角使用站点 token，六档调整为低占用、标准、全速三档；键盘和拖动沿用 React Aria Slider，最高档用 SVG 流光和 CSS 粒子替代 canvas。流光形状与波动是根据用户截图重建，未取得上游绘制算法，不能称为逐帧复刻。所有流光层读取站点强调色色阶，默认蓝色可随配色切换。

任务面复用 Sonner 的持久通知，普通回执在上方独立堆叠；收起保留暂停、速度与预计时间，运行及暂停时不能自动或滑动关闭。完成后撤下任务卡，由既有去重逻辑发送一条回执；失败保留查看入口并允许关闭。
