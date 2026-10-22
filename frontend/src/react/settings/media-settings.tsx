/* 「媒体库与入库」分组：媒体目录与自动入库，每个文件夹标着挂载状态。
 *
 * 服务端检查管理权限后用 `editable` 控制表单；没有权限时只说明原因。
 * 保存成功后显示持久提示和访问地址，等待服务就绪后跳转。
 *
 * 校验原因由服务端按字段给（400 的 `errors`），页面写回原位，不在前端复制一份路径与端口的判定。 */
import { useEffect, useLayoutEffect, useRef, useState, type FormEvent } from 'react';

import { Button } from '@/components/base/buttons/button';
import { LinkButton } from '@/components/base/buttons/link-button';
import { Checkbox } from '@/components/base/checkbox/checkbox';
import { Input } from '@/components/base/input/input';
import { Select, SelectItem } from '@/components/base/select/select';
import { ConnectionStatus } from '../components/connection-status';

import { ApiError, apiSend, errorMessage } from '../../api';
import { CONFIGURATION_URL, PICK_FOLDER_URL } from '../../configuration-endpoints';
import type { ConfigurationData, ConfigurationGroupProps } from '../bundle';
import { Note } from '../components/note';
import { queryClient } from '../query';
import { RESTART_REDIRECT_MS } from '../restart-redirect';
import { CloudDriveGuide } from './clouddrive-guide';
import { CloudProxySettings } from './cloud-proxy-settings';
import { CONFIGURATION_KEY, fetchConfiguration } from './configuration';
import { groupRoot } from './configuration-panel';
import {
  FolderField, FolderFieldLine, FolderRow, isCloudSource, MEDIA_SOURCES, MediaReadPolicy, MediaReadPolicyHelp, SourceSelect, sourceMark,
  useFolderRows,
} from './folder-rows';
import { sourceDefaultCost, type SourceCost } from '../../core/media-sources';
import { randomId } from '../../core/random-id';
import { libraryAutoChoice, LibraryIconPicker } from './library-icon-picker';
import {
  AUTO_STAGES, LibraryColorPicker, PolicyLegend, PresetSelect, StageChooser, type Preset, type Stage,
} from './library-policy-settings';
import { PushDiscoveryForm } from './push-discovery-settings';
import { rememberMediaShape, rememberSectionHeight } from '../../configuration-skeleton';
import { useLibraryTints } from '../components/library-tint';
import { LIBRARY_FOLDER_HELP } from './library-policy-copy';
import {
  ErrorText, ExternalLink, Fact, FactList, Footer, Help, Section, SourceMark, Stack,
} from './section';
import { busyProps, useAction } from './use-action';

const sourceName = (location: string) => MEDIA_SOURCES.find(([kind]) => kind === location)?.[1] ?? location;
const pickFolder = async (initial: string) =>
  (await apiSend<{ path: string | null }>(PICK_FOLDER_URL, { initial })).path;

interface MediaRow { path: string; location: string; root: string; root_id?: string; library_id: string; library: string; library_icon: string; cost: SourceCost | ''; change_mode?: string }
interface FieldErrors { media_dirs?: string[]; port?: string }
interface SaveResult { saved: boolean; url: string; revision: string }

const blankRow = (path = ''): MediaRow => ({ path, location: 'local', root: '', library_id: randomId(), library: '', library_icon: '', cost: 'free' });

function initialRows(data: ConfigurationData): MediaRow[] {
  const known = data.media_sources?.filter((row) => MEDIA_SOURCES.some(([kind]) => kind === row.location));
  if (known?.length) {
    return known.map((row) => ({
      path: row.path, location: row.location, root: row.root, library: row.library || '', library_icon: row.library_icon || '',
      root_id: row.root_id, library_id: row.library_id || randomId(),
      cost: row.cost ?? sourceDefaultCost(row.location),
    }));
  }
  return (data.media_dirs.length ? data.media_dirs : ['']).map((path) => blankRow(path));
}

const fieldErrorsOf = (cause: unknown): FieldErrors | null => {
  if (!(cause instanceof ApiError) || cause.status !== 400) return null;
  return (cause.body as { errors?: FieldErrors } | null)?.errors ?? null;
};

/* 能编辑时挂载状态标在每个文件夹行上；只读时没有那张表，单列一块。 */
export function MediaSettings({ data, receipt, panel }: ConfigurationGroupProps) {
  const cloud = !!data.media_sources?.some(row => isCloudSource(row.location));
  // 首屏骨架照这一屏的形状排：每个媒体库几个文件夹、有没有 CloudDrive 代理与自动发现。
  useEffect(() => {
    if (!data.editable) return;
    const counts = new Map<string, number>();
    for (const row of initialRows(data)) counts.set(row.library_id, (counts.get(row.library_id) ?? 0) + 1);
    rememberMediaShape({ folders: [...counts.values()], cloud, discovery: !!data.push_discovery });
  }, [data, cloud]);
  // 自动发现那块的高度随前缀行数与 Webhook 配置变化，记下来给首屏骨架占位。
  const discovery = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (discovery.current) rememberSectionHeight('push-discovery', discovery.current.offsetHeight);
  });
  return (
    <div {...groupRoot(panel)}>
      {data.editable ? <MediaForm data={data} receipt={receipt} /> : <Note tone="neutral" title="只读">{data.notice}</Note>}
      {data.editable ? null : <MountStatus data={data} />}
      {cloud ? <CloudProxySettings receipt={receipt} /> : null}
      {data.push_discovery
        ? <div ref={discovery}><PushDiscoveryForm initial={data.push_discovery} receipt={receipt} /></div>
        : null}
    </div>
  );
}

function MediaForm({ data, receipt }: ConfigurationGroupProps) {
  const { rows, edit, add, remove, errors: rowErrors, setErrors: setRowErrors, picking, pick, inputRef } = useFolderRows({
    initial: () => initialRows(data), blank: () => blankRow(), pickFolder, describe: errorMessage,
  });
  const [scanNow, setScanNow] = useState(false);
  const [requireReadPolicy, setRequireReadPolicy] = useState(false);
  const [failure, setFailure] = useState('');
  const [saved, setSaved] = useState<SaveResult | null>(null);
  const revision = useRef(data.revision);
  const action = useAction();
  const [presets, setPresets] = useState<Record<string, Preset>>({});
  const [stages, setStages] = useState<Record<string, readonly Stage[]>>({});
  const tints = useLibraryTints();
  const editLibrary = (index: number, patch: Partial<MediaRow>) => {
    rows.forEach((row, i) => { if (row.library_id === rows[index]!.library_id) edit(i, patch); });
  };
  const libraries = [...new Map(rows.map(row => [row.library_id, row])).values()];
  const chooseLibrary = (index: number, key: string) => {
    const chosen = rows.find(row => row.library_id === key);
    edit(index, chosen ? { library_id: chosen.library_id, library: chosen.library, library_icon: chosen.library_icon }
      : { library_id: randomId(), library: '', library_icon: '' });
  };

  useEffect(() => {
    if (!saved) return undefined;
    const timer = setTimeout(() => location.assign(saved.url), RESTART_REDIRECT_MS);
    return () => clearTimeout(timer);
  }, [saved]);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const missing = rows.findIndex((row) => !row.cost);
    if (missing >= 0) {
      setRequireReadPolicy(true);
      const form = event.currentTarget;
      requestAnimationFrame(() => form.querySelector<HTMLButtonElement>(`[data-media-read-policy="${missing}"] button`)?.focus());
      return;
    }
    setFailure('');
    void action.run('save', (signal) => apiSend<SaveResult>(CONFIGURATION_URL, {
      revision: revision.current,
      media_dirs: rows.map((row) => row.path),
      ...(data.media_sources ? { media_sources: rows } : {}),
      port: String(data.port),
      scan_now: scanNow,
    }, 'POST', signal), (result) => {
      revision.current = result.revision;
      setRowErrors([]);
      receipt('已保存配置');
      setSaved(result);
    }, (cause) => {
      const fields = fieldErrorsOf(cause);
      setRowErrors(fields?.media_dirs ?? []);
      if (!fields || fields.port) setFailure(fields?.port || errorMessage(cause));
    });
  };

  if (saved) {
    return (
      <Section title="媒体目录">
        <Stack>
          <Note tone="success" title="配置已保存">
            Peach 正在重新启动。稍后自动跳转，或点击<LinkButton href={saved.url} size="small">进入馆藏</LinkButton>。
          </Note>
        </Stack>
      </Section>
    );
  }

  // 挂载状态是已保存的那份配置的读数，只标在路径没改过的行上。
  const mountOf = (row: MediaRow) => data.media_sources?.find(source => source.root_id === row.root_id && source.path === row.path);
  const cloud = rows.some((row) => isCloudSource(row.location));
  const missing = cloud ? (data.mount_dependencies ?? []).filter((dependency) => !dependency.available) : [];
  return (
    <Section title="媒体库与目录" onSubmit={submit}>
      <Stack>
        {/* 按媒体库分组：名称、图标、来源色、处理方式属于媒体库，每组只写一次；
            下面列这个媒体库的文件夹，文件夹只管路径、来源与读取策略。 */}
        <PolicyLegend />
        <div role="group" aria-label="媒体库与目录" className="flex flex-col gap-4">
          {libraries.map((library) => {
            const first = rows.findIndex(row => row.library_id === library.library_id);
            const members = rows.map((row, index) => ({ row, index })).filter(({ row }) => row.library_id === library.library_id);
            const preset = presets[library.library_id] ?? 'auto';
            const name = library.library || '未命名媒体库';
            return (
              <div key={library.library_id} data-library-block="" className="flex flex-col gap-3"
                data-library={tints.get(library.library_id)?.color ? library.library_id : undefined}>
                <div data-library-head="">
                  <LibraryIconPicker label={`${name} 图标`} value={library.library_icon} kind={library.location}
                    onChange={(library_icon) => editLibrary(first, { library_icon })} />
                  <Input className="w-full" aria-label={`${name} 名称`} maxLength={80} placeholder="媒体库名称"
                    value={library.library} onChange={(value) => editLibrary(first, { library: value })} />
                  <LibraryColorPicker id={library.library_id} name={library.library} />
                  <PresetSelect name={name} value={preset}
                    onChange={(value) => setPresets(current => ({ ...current, [library.library_id]: value }))} />
                </div>
                {preset === 'custom'
                  ? <StageChooser name={name} value={stages[library.library_id] ?? AUTO_STAGES}
                    onChange={(value) => setStages(current => ({ ...current, [library.library_id]: value }))} />
                  : null}
                <div data-library-folders="" role="group" aria-label={`${name} 的文件夹`}>
                {members.map(({ row, index }) => (
                  <FolderRow key={index} label={`媒体目录 ${index + 1}`} path={row.path}
                    onPath={(path) => edit(index, { path })} error={rowErrors[index]} inputRef={inputRef(index)}
                    picking={picking === index} onPick={() => void pick(index)}
                    onRemove={rows.length > 1 ? () => remove(index) : undefined}
                    status={mountOf(row) ? <MountBadge online={mountOf(row)?.online} /> : null}>
                    <FolderFieldLine>
                      <SourceSelect index={index} value={row.location}
                        onChange={(location) => edit(index, { location, cost: location === 'local' ? 'free' : '' })} />
                      <MediaReadPolicy index={index} cost={row.cost} onChange={(cost) => edit(index, { cost })}
                        error={requireReadPolicy && !row.cost ? '请选择媒体读取策略' : undefined} />
                      {row.root_id && !mountOf(row) ? <FolderField label="变更方式" className="w-full @lg:w-auto @lg:flex-1">
                        <Select className="w-full" aria-label={`目录变更方式 ${index + 1}`}
                          placeholder="选择目录变更方式" selectedKey={row.change_mode || null}
                          onSelectionChange={key => {
                            if (key === 'add') edit(index, { root_id: undefined, root: '', change_mode: '' });
                            else edit(index, { change_mode: 'relocate' });
                          }}>
                          <SelectItem id="relocate">重定位此目录，保留文件记录</SelectItem>
                          <SelectItem id="add">添加另一目录</SelectItem>
                        </Select>
                      </FolderField> : null}
                      {libraries.length > 1 ? <FolderField label="移到媒体库" className="w-full @lg:w-48">
                        <Select className="w-full" aria-label={`目录所属媒体库 ${index + 1}`} selectedKey={row.library_id}
                          onSelectionChange={key => { if (key) chooseLibrary(index, String(key)); }}>
                          {libraries.map(other => <SelectItem key={other.library_id} id={other.library_id}>{other.library || '未命名媒体库'}</SelectItem>)}
                          <SelectItem id="new">新建媒体库</SelectItem>
                        </Select>
                      </FolderField> : null}
                    </FolderFieldLine>
                  </FolderRow>
                ))}
                </div>
              </div>
            );
          })}
        </div>
        {/* 「添加文件夹」给最后那个媒体库多加一个目录，新行就排在这两颗键上方，之后可用「移到媒体库」换组；
            「添加媒体库」新建一组，名称、图标、来源色与处理方式都单独设。 */}
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" onClick={() => {
            const last = libraries[libraries.length - 1];
            add();
            if (last) edit(rows.length, { library_id: last.library_id, library: last.library, library_icon: last.library_icon });
          }}>添加文件夹</Button>
          <Button variant="secondary" onClick={add}>添加媒体库</Button>
        </div>
        <Help>{LIBRARY_FOLDER_HELP}</Help>
        {cloud ? <><MediaReadPolicyHelp /><CloudDriveGuide /></> : null}
        {missing.map((dependency) => (
          <Help key={dependency.name}>
            未检测到 {dependency.name}。<ExternalLink href={dependency.download_url}>下载 {dependency.name}</ExternalLink>
          </Help>
        ))}
        <Checkbox isSelected={scanNow} onChange={setScanNow}>保存后扫描并补全资料</Checkbox>
        {failure ? <Note tone="error" title="没有保存">{failure}</Note> : null}
      </Stack>
      <Footer status="保存后 Peach 会重新启动。">
        <Button type="submit" {...busyProps(action.busy === 'save')}>保存配置</Button>
      </Footer>
    </Section>
  );
}

function MountBadge({ online }: { online: boolean | undefined }) {
  return <ConnectionStatus online={online} />;
}

/* 重取回来的是整份配置，换进整页那一个键：屏幕上只有一份真相，页面上别处读到的
   也是这一次的结果。另存一份的话，挂载点在这里是新的、在「这台电脑」那张表单里还是旧的。 */
function MountStatus({ data }: { data: ConfigurationData }) {
  const sources = data.media_sources;
  const action = useAction();
  if (!sources) return null;
  const refresh = () => void action.run('refresh', (signal) => fetchConfiguration(signal),
    (result) => queryClient.setQueryData(CONFIGURATION_KEY, result));
  return (
    <Section title="挂载状态">
      <FactList>
        {sources.map((row, index) => (
          <Fact key={index} term={<><SourceMark mark={sourceMark(row.location)} />{sourceName(row.location)}</>}>
            {row.path || '未配置挂载点'}<MountBadge online={row.online} />
          </Fact>
        ))}
      </FactList>
      {action.error ? <Stack divided><ErrorText>{action.error}</ErrorText></Stack> : null}
      <Footer>
        <Button variant="secondary" onClick={refresh} {...busyProps(action.busy === 'refresh')}>刷新挂载状态</Button>
      </Footer>
    </Section>
  );
}
