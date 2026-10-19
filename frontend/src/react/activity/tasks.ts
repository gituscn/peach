/* 任务中心的数据契约与折算：`/api/tasks` 一次请求供整页三段使用。
 *
 * 分三次取会出现「在跑那段是新的、完成那段是旧的」这种自相矛盾的一屏，所以只有一个
 * queryKey。首屏由 `prefetchTasks` 写进 Query 缓存，组件挂上去读的就是它。 */
import { apiGet } from '../../api';
import { requestErrorMessage } from '../../core/request-error';
import { queryClient } from '../query';

export const TASKS_URL = '/api/tasks';
/** 整页共用这一个键：三段是同一次响应的三个字段。 */
export const TASKS_KEY = ['tasks'] as const;

export interface TaskRunPayload {
  id: number;
  task_key: string;
  task_label: string;
  trigger: string;
  status: string;
  host: string;
  started_at: string | null;
  finished_at: string | null;
  elapsed_seconds: number | null;
  progress_current: number | null;
  progress_total: number | null;
  progress_label: string;
  result_summary: Record<string, unknown>;
  error: string;
  /** 派出这一轮的父任务；不是后继时为 null（ADR-0040）。 */
  parent_run_id: number | null;
  root_run_id: number | null;
  /** 这条后继要做的那件事的全名。不是后继时是空串，界面据此判断它挂不挂到父卡片下。 */
  followup_key: string;
  followup_depth: number;
}

export interface ActivityData {
  available: boolean;
  result_versions?: Record<string, string>;
  message?: string;
  running: TaskRunPayload[];
  skipped: TaskRunPayload[];
  finished: TaskRunPayload[];
  /** 「最近完成」这一页后面还有更早的。 */
  finished_has_more?: boolean;
}

/** 往前翻的一页：只有「最近完成」，在跑与被挡下的由轮询那一份负责。 */
export interface FinishedPage {
  finished: TaskRunPayload[];
  finished_has_more: boolean;
}

/** 以 `oldest` 为游标取它之前的一页。游标是它的结束时刻加 id，与服务端的排序键一致。 */
export const fetchEarlier = (oldest: TaskRunPayload, signal?: AbortSignal) => {
  const query = new URLSearchParams({
    before_finished_at: oldest.finished_at || '', before_id: String(oldest.id) });
  return apiGet<FinishedPage>(`${TASKS_URL}?${query}`, signal);
};

/** 几批终态行并成一列：同一轮只留一条，按结束时刻从新到旧、同一时刻按 id 从大到小，
 *  和服务端翻页的排序键同一个，拼接处才不会乱序。终态落地后不再变，重复的哪一份都一样。 */
export function mergeFinished(...batches: TaskRunPayload[][]): TaskRunPayload[] {
  const byId = new Map<number, TaskRunPayload>();
  for (const batch of batches) for (const row of batch) if (!byId.has(row.id)) byId.set(row.id, row);
  return [...byId.values()].sort((a, b) => {
    const left = a.finished_at || '', right = b.finished_at || '';
    if (left !== right) return left < right ? 1 : -1;
    return b.id - a.id;
  });
}

/** 有东西在跑就两秒一次（和进度写库的节流同一个数），全是终态时十秒一次。 */
export const RUNNING_POLL_MS = 2000;
export const SETTLED_POLL_MS = 10000;
export const pollInterval = (data: ActivityData | undefined): number =>
  data?.running?.length ? RUNNING_POLL_MS : SETTLED_POLL_MS;

export const fetchTasks = (signal?: AbortSignal) => apiGet<ActivityData>(TASKS_URL, signal);

/** 首屏：取完数才画。中止时 `fetchQuery` 把 `AbortError` 抛回给挂载方，它据此放弃这一次。 */
export async function prefetchTasks(signal: AbortSignal): Promise<void> {
  await queryClient.fetchQuery({ queryKey: TASKS_KEY, queryFn: () => fetchTasks(signal) });
}

export const TRIGGER_LABELS: Record<string, string> = {
  manual: '手动', scheduled: '定时', startup: '启动', cli: '命令行',
};

const STATUS_LABELS: Record<string, string> = {
  pending: '排队中', running: '进行中', succeeded: '已完成',
  failed: '失败', cancelled: '已取消', interrupted: '意外中断',
};

/** 状态的中文名。表里的状态集是封闭的，认不出来只可能是表先改了，那就原样显示。 */
export const statusLabel = (status: string): string => STATUS_LABELS[status] || status;

/* 主摘要使用已定义的中文字段；原始状态字典由技术详情保留。 */
const SUMMARY_LABELS: Record<string, string> = {
  checked: '已检查', total: '总数', scanned: '已扫描', identified: '已识别',
  candidates: '作品资料', covers: '封面', changed: '已改动', operation: '操作',
  ok: '取得', miss: '未取得', kept: '保留', planned: '计划', done: '已处理', added: '新增',
  written: '已保存', removed: '已移除', issue_count: '需要处理',
  followups_duplicate: '补充任务已在排队', followups_truncated: '补充任务超出数量上限',
  followups_depth_exceeded: '补充任务超出层级上限', name: '名称',
  matched: '匹配项', size: '尺寸', source: '来源', cover_network: '封面图片连接失败',
  probed: '已读取媒体信息', previews: '预览图', paused_count: '等待来源恢复',
  auto_applied: '已自动保存', auto_rejected: '未采用', performer_avatars: '女优头像',
  performer_profile_failed: '女优资料采集失败', performer_aliases: '女优别名',
  performer_profile_conflicts: '女优资料待复核', conflicts: '待复核冲突',
};

/** 把一批任务按 `parent_run_id` 归到各自的父任务下。没有父的那些留在外面。 */
export function groupFollowups(rows: TaskRunPayload[]): Map<number, TaskRunPayload[]> {
  const grouped = new Map<number, TaskRunPayload[]>();
  for (const row of rows) {
    if (!row.followup_key || row.parent_run_id == null) continue;
    const siblings = grouped.get(row.parent_run_id);
    if (siblings) siblings.push(row);
    else grouped.set(row.parent_run_id, [row]);
  }
  return grouped;
}

/** 连着的几轮收成一张卡：`runs[0]` 是最新那一轮。 */
export interface RunFold { run: TaskRunPayload; runs: TaskRunPayload[] }

/** 「最近完成」按时间顺序折叠：一段连续的例行轮次里，同一种任务并成一张卡，摆在它
 *  最新那一轮的位置上。任何一轮不是例行的（手动、失败、有新增或派了后继）都会截断这一段
 *  ——折叠只收「按时跑了、什么也没发生」的那些，有事的那一轮必须单独看得见。 */
export function foldRoutine(rows: TaskRunPayload[],
                            routine: (run: TaskRunPayload) => boolean): RunFold[] {
  const folds: RunFold[] = [];
  let open = new Map<string, RunFold>();
  for (const run of rows) {
    if (!routine(run)) {
      open = new Map();
      folds.push({ run, runs: [run] });
      continue;
    }
    const fold = open.get(run.task_key);
    if (fold) fold.runs.push(run);
    else {
      const started = { run, runs: [run] };
      open.set(run.task_key, started);
      folds.push(started);
    }
  }
  return folds;
}

/** 按时跑完、什么也没发生的一轮：定时触发、成功、没有新增也没派后继。 */
export const isRoutine = (run: TaskRunPayload) => run.trigger === 'scheduled'
  && run.status === 'succeeded' && !run.error
  && !(Number(run.result_summary?.added) > 0) && !(Number(run.result_summary?.followups) > 0);

export const isActive = (run: TaskRunPayload) => run.status === 'pending' || run.status === 'running';

/** 后继那一行的说明：它在做哪一件（标签去掉与任务名重复的前缀）、做到第几项或结果如何。
 *  标题已经是任务名，这里再写一遍「取新作资料：」读起来就是同一句话说了两次。 */
export function followupDetail(row: TaskRunPayload): string {
  const prefix = `${row.task_label}：`;
  const label = row.progress_label || '';
  const item = String(row.result_summary?.name || '')
    || (label.startsWith(prefix) ? label.slice(prefix.length) : label === row.task_label ? '' : label);
  const total = row.progress_total || 0;
  const { name: _name, ...result } = row.result_summary || {};
  const tail = readableErrorHeadline(row.error) || summaryText(result)
    || (isActive(row) && total > 0 ? `${progressText(row.progress_current, total)} 项` : '');
  return [item, tail].filter(Boolean).join(' · ');
}

/** 秒数说成「几分几秒」。跑了几小时的批处理也要一眼读得出量级：满 48 小时按天说。 */
export function elapsedText(seconds: number | null | undefined): string {
  if (typeof seconds !== 'number' || !Number.isFinite(seconds) || seconds < 0) return '';
  const whole = Math.floor(seconds);
  if (whole < 60) return `${whole} 秒`;
  const minutes = Math.floor(whole / 60);
  if (minutes < 60) return `${minutes} 分 ${whole % 60} 秒`;
  const hours = Math.floor(minutes / 60);
  if (hours < 48) return `${hours} 小时 ${minutes % 60} 分`;
  return `${Math.floor(hours / 24).toLocaleString()} 天 ${hours % 24} 小时`;
}

/** 进度读数「已做 / 总数」：服务端偶尔报出超过总数的已做数，按总数封顶。 */
export function progressText(current: number | null | undefined, total: number | null | undefined): string {
  const all = Math.max(0, Number(total) || 0);
  const done = Math.min(all, Math.max(0, Number(current) || 0));
  return `${done.toLocaleString()} / ${all.toLocaleString()}`;
}

/** 一段报错在列表里只露的那一行。Python traceback 的第一行永远是「Traceback (most recent call
 *  last):」，说明不了什么，取最后一行的异常类型与消息；别的取第一行非空。 */
export function errorHeadline(text: string | null | undefined): string {
  const lines = String(text || '').split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  if (!lines.length) return '';
  return /^Traceback \(most recent call last\)/.test(lines[0]!) ? lines[lines.length - 1]! : lines[0]!;
}

/** 异常类型和原始堆栈由详情保留，摘要说明实际原因。 */
export function readableErrorHeadline(text: string | null | undefined): string {
  const head = errorHeadline(text);
  const technical = head.match(/^(?:[\w.]*Error|Exception):\s*(.*)$/);
  if (!technical) return head;
  return requestErrorMessage(technical[1]);
}

const OUTCOME_LABELS: Record<string, string> = {
  '没有新写法': '未发现新别名', '已装上': '已保存资料图片',
  '已装着认得准的小图': '已保留身份核对通过的小尺寸图片',
  '档案已不存在': '资料记录已不存在', '资料未过期': '现有资料仍在有效期内',
  '图太小': '图片分辨率不足', '官网未取得': '未取得厂牌官网信息',
  '两站都没有作品一览': '两个来源均未提供作品列表',
  '哪一站都没对上她': '未找到与该人物相符的资料页',
  '两站都没对上她': '两个来源均未找到与该人物相符的资料页',
  '三站都没对上她': '三个来源均未找到与该人物相符的资料页',
  '已有身份': '已有创作者分类', '已变': '资料已被其他操作修改，本次未保存',
};
const SOURCE_NAMES: Record<string, string> = { avwikidb: 'AVWikiDB', javdb: 'JavDB', 'minnano-av': 'みんなのAV' };
const OPERATION_LABELS: Record<string, string> = {
  like: '标记喜欢', seen: '标记看过', later: '加入稍后看', dispose: '移入回收站',
  restore: '还原', delete: '永久删除', 'empty-trash': '清空回收站',
  'dismiss-junk': '确认不是垃圾', 'reconsider-junk': '重新判定垃圾', region: '判定产地',
};
const outcomeText = (text: string): string => OUTCOME_LABELS[text] || text
  .replace(/(avwikidb|javdb|minnano-av) (绑定|写入)/gi, (_, site: string, action: string) =>
    action === '绑定' ? `已关联 ${SOURCE_NAMES[site.toLowerCase()]} 资料页`
      : `已保存来自 ${SOURCE_NAMES[site.toLowerCase()]} 的资料`)
  .replace(/^探针不可用：/, '无法读取媒体信息：');

/** 时间戳说成本地的「月-日 时:分」。数据库里存的是 UTC，界面上一律按本机时区读。 */
export function momentText(stamp: string | null | undefined): string {
  if (!stamp) return '';
  const moment = new Date(stamp);
  if (Number.isNaN(moment.getTime())) return '';
  return moment.toLocaleString(undefined,
    { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
}

/* 不进摘要的键：「谁挡的」已经写在错误那一句里；其余是域状态字典里的簿记——状态、
   起止时间戳、请求号和任务号，卡片标题、徽章和时间那一行已经说过，原样摆出来只是一串
   英文键和纪元秒。 */
const SUMMARY_HIDDEN = new Set([
  'blocked_by', 'status', 'run_id', 'request_id', 'started_at', 'completed_at', 'finished_at',
]);

/** 任务结果只展示面向使用者的字段。 */
export function summaryItems(summary: Record<string, unknown>): string[] {
  return Object.entries(summary || {})
    .filter(([key, value]) => !SUMMARY_HIDDEN.has(key)
      && (key in SUMMARY_LABELS || key === 'outcome' || key === 'followups' || key === 'error')
      && (typeof value === 'number' || typeof value === 'string')
      && String(value) !== '' && (value !== 0 || key === 'checked' || key === 'total'))
    .map(([key, value]) => {
      if (key === 'followups') return `已安排 ${Number(value).toLocaleString()} 项补充任务`;
      if (key === 'error') return readableErrorHeadline(String(value));
      if (key === 'outcome') return outcomeText(String(value));
      if (key === 'operation') return `操作：${OPERATION_LABELS[String(value)] || '批量操作'}`;
      return `${SUMMARY_LABELS[key]} ${typeof value === 'number' ? value.toLocaleString() : value}`;
    });
}

export const summaryText = (summary: Record<string, unknown>): string => summaryItems(summary).join(' · ');
