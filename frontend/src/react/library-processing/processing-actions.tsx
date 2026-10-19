import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { RiArrowDownSLine, RiDatabase2Line, RiGlobalLine, RiHardDrive2Line } from '@remixicon/react';
import { Popover } from 'react-aria-components';
import { Button } from '@/components/base/buttons/button';
import { MENU_ITEM, MENU_ITEM_INTERACTIVE, MENU_POPOVER_SURFACE } from '@/components/base/dropdown/menu-styles';
import { cx } from '@/utils/cx';
import { formModal } from '@peach/legacy/ui';
import { MenuDialog } from '../components/menu-dialog';
import { busyProps } from '../settings/use-action';
import { errorMessage } from '../../api';
import { fetchProcessingEstimate, type LibraryProcessingCommand, type ProcessingSpeed, type ProcessingTraffic } from './library-processing';
import { ProcessingEffort } from './processing-effort';
import { TrafficProgress } from './processing-traffic';

function ProcessingPrompt({ command, speed, dialog, onSpeed, busy }: {
  command: LibraryProcessingCommand; speed: ProcessingSpeed; dialog: ReturnType<typeof formModal>;
  onSpeed(value: ProcessingSpeed): void; busy: boolean;
}) {
  const [mode, setMode] = useState(speed);
  const [traffic, setTraffic] = useState<ProcessingTraffic>();
  const [failure, setFailure] = useState('');
  useEffect(() => {
    const controller = new AbortController();
    void fetchProcessingEstimate(command, controller.signal).then(result => {
      if (!result.traffic) throw new Error('服务端未提供流量预估');
      if (!controller.signal.aborted) setTraffic(result.traffic);
    }).catch(error => {
      if (!controller.signal.aborted) setFailure(errorMessage(error));
    }).finally(() => { if (!controller.signal.aborted) dialog.confirmButton.disabled = false });
    return () => controller.abort();
  }, [command, dialog]);
  return <div className="flex flex-col gap-4">
    <div className="flex justify-center"><ProcessingEffort value={mode} busy={busy} onChange={value => { setMode(value); onSpeed(value) }} /></div>
    {traffic ? <TrafficProgress traffic={traffic} initial />
      : <p role="status" className="text-body-2-regular text-text-secondary">{failure ? `流量预估未取得：${failure}` : '正在估算流量…'}</p>}
  </div>;
}

/** 扫描和已有作品补全共用资料流水线，视频预览由媒体库设置决定。 */
export function ProcessingActions({ busy, scan = false, metadataOnly = false, speedMode = 'standard', onRun }: {
  busy: boolean; scan?: boolean; metadataOnly?: boolean; speedMode?: ProcessingSpeed;
  onRun(command: LibraryProcessingCommand): void | Promise<unknown>;
}) {
  const trigger = useRef<HTMLButtonElement>(null);
  const prompt = useRef<ReturnType<typeof formModal> | null>(null);
  const [promptView, setPromptView] = useState<{ host: HTMLElement; dialog: ReturnType<typeof formModal>; command: LibraryProcessingCommand } | null>(null);
  const selectedSpeed = useRef(speedMode);
  useEffect(() => () => prompt.current?.close(), []);
  const [open, setOpen] = useState(false);
  const primary: { label: string; icon: typeof RiDatabase2Line; command: LibraryProcessingCommand } = { label: scan ? '同步媒体库' : '同步这些影片', icon: RiDatabase2Line,
    command: scan ? {} : { stage: 'collect' as const } };
  const options: typeof primary[] = [primary,
    ...(scan ? [{ label: '仅扫描文件', icon: RiHardDrive2Line, command: { stage: 'scan' as const } }] : []),
    ...(scan ? [{ label: '仅同步已入库影片', icon: RiDatabase2Line, command: { stage: 'collect' as const } }] : []),
    { label: '仅生成视频预览', icon: RiHardDrive2Line, command: { stage: 'previews' as const } },
    { label: '仅补全资料', icon: RiGlobalLine, command: { stage: 'metadata' as const } },
  ];
  const run = (command: LibraryProcessingCommand) => {
    if (busy) return;
    setOpen(false);
    if (!scan) {
      void Promise.resolve(onRun(command)).catch(() => { /* 错误由任务入口留在原位 */ });
      return;
    }
    if (prompt.current) return;
    selectedSpeed.current = speedMode;
    const previews = command.stage === 'previews';
    const title = previews ? '生成视频预览' : command.stage === 'scan' ? '扫描媒体文件'
      : command.stage === 'metadata' ? '补全影片资料' : command.stage === 'collect' ? '同步已入库影片' : '同步媒体库';
    const dialog = formModal({
      title,
      description: previews
        ? '生成视频预览会读取视频并占用处理器，可能让电脑变慢。需要同时使用电脑时，可选择低占用模式。'
        : `处理会读取媒体文件${command.stage === 'scan' ? '' : metadataOnly || command.stage === 'metadata' ? '并下载资料' : '、下载资料并生成视频预览'}，可能让电脑变慢。需要同时使用电脑时，可选择低占用模式。`,
      body: '<div class="peach-react" data-processing-prompt></div>',
      confirmLabel: title,
      confirmDisabled: true,
      onConfirm: async () => {
        await onRun({ ...command, ...(selectedSpeed.current === speedMode ? {} : { speed_mode: selectedSpeed.current }) });
      },
    });
    prompt.current = dialog;
    setPromptView({ host: dialog.dialog.querySelector<HTMLElement>('[data-processing-prompt]')!, dialog, command });
    void dialog.done.then(() => { if (prompt.current === dialog) { prompt.current = null; setPromptView(null) } });
  };
  return <>
    {promptView ? createPortal(<ProcessingPrompt command={promptView.command} dialog={promptView.dialog}
      speed={speedMode} busy={busy} onSpeed={value => { selectedSpeed.current = value }} />, promptView.host) : null}
    <span data-button-group data-split-button data-variant="primary">
      <Button leadingIcon={primary.icon} {...busyProps(busy)} onClick={() => run(primary.command)}>{primary.label}</Button>
      <Button ref={trigger} iconOnly leadingIcon={RiArrowDownSLine} aria-label="更多同步方式"
        aria-haspopup="dialog" aria-expanded={open} {...busyProps(busy)} onClick={() => { if (!busy) setOpen(!open) }} />
    </span>
    <Popover triggerRef={trigger} isOpen={open} onOpenChange={setOpen} placement="bottom end" offset={4}
      className={MENU_POPOVER_SURFACE}>
      <MenuDialog aria-label="同步方式" className="flex w-56 flex-col gap-1 outline-none">
        {options.map(({ label, icon: Icon, command }) => {
          const blocked = metadataOnly && 'stage' in command && command.stage === 'previews';
          return <button key={label} type="button" disabled={blocked}
            title={blocked ? '请先在媒体库设置中开启视频预览生成' : undefined}
            className={cx(MENU_ITEM, MENU_ITEM_INTERACTIVE, 'text-body-2-medium')}
            onClick={() => run(command)}><Icon aria-hidden className="size-4 shrink-0" />{label}</button>;
        })}
      </MenuDialog>
    </Popover>
  </>;
}
