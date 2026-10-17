import { StatusDot } from '@/components/base/badges/status-dot';
import { cx } from '@/utils/cx';

/** 连接状态使用圆点；任务结果和配置状态使用 Chip。 */
export function ConnectionStatus({ online }: { online: boolean | undefined }) {
  return <span data-mount={online === true ? 'online' : online === false ? 'offline' : 'unknown'}
    className={cx('inline-flex items-center gap-1.5 whitespace-nowrap text-body-2-medium',
      online === true ? 'text-notification-success-foreground' : online === false ? 'text-text-error-primary' : 'text-text-secondary')}>
    <StatusDot color={online === true ? 'green' : online === false ? 'yellow' : 'indigo'} />
    {online === true ? '在线' : online === false ? '离线' : '未检测'}
  </span>;
}
