import { useState } from 'react';
import { Tab, TabList, Tabs } from 'react-aria-components';
import { Button } from '@/components/base/buttons/button';
import { CloudDownloadDialog, type DownloadPrefill } from '../activity/cloud-download-dialog';
import { JAV_TABS, javPath } from './jav';

export function JavHeader({ tab, navigate, find }: {
  tab: string; navigate(path: string): void; find(): void;
}) {
  return <div className="flex w-full flex-col gap-4">
    <div className="flex flex-wrap items-center justify-between gap-2">
      <h2 className="text-title-2-semibold text-text-primary">JAV</h2>
      <Button variant={tab === 'wants' ? 'secondary' : 'primary'} onClick={find}>查找资源</Button>
    </div>
    <Tabs selectedKey={tab} onSelectionChange={key => navigate(javPath(String(key)))}>
      <TabList aria-label="JAV 分区" data-section-nav data-section-items className="flex max-w-full gap-1 overflow-x-auto">
        {JAV_TABS.map(([key, label]) => <Tab key={key} id={key}
          className="cursor-pointer whitespace-nowrap rounded-md px-3 py-2 text-body-medium text-text-secondary hover:text-text-primary data-[selected]:bg-background-tertiary-default data-[selected]:text-text-primary focus-visible:outline-2 focus-visible:outline-border-focus-ring">
          {label}
        </Tab>)}
      </TabList>
    </Tabs>
  </div>;
}

/** 馆藏沿用目录的网格、筛选和搜索，分区导航与资源查找放在目录页头。 */
export function JavLibraryHeader({ navigate, receipt }: { navigate(path: string): void; receipt(message: string): void }) {
  const [download, setDownload] = useState<DownloadPrefill | null>(null);
  return <>
    <JavHeader tab="library" navigate={navigate} find={() => setDownload({})} />
    <CloudDownloadDialog prefill={download} close={() => setDownload(null)} receipt={receipt} />
  </>;
}
