import { useCallback, useEffect, useState } from 'react';

import { useMatchRouteMeta, useRouter } from '@/router/hooks';

import type { RouteMeta } from '#/router';

export type KeepAliveTab = RouteMeta & {
  children?: any;
};

export default function useKeepAlive() {
  const { VITE_APP_HOME: HOMEPAGE } = import.meta.env;
  const { push } = useRouter();
  const [tabs, setTabs] = useState<KeepAliveTab[]>([]);
  const [activeTabRoutePath, setActiveTabRoutePath] = useState<string>();
  const currentRouteMeta = useMatchRouteMeta();

  const closeTab = useCallback(
    (path = activeTabRoutePath) => {
      if (tabs.length === 1) return;
      const deleteTabIndex = tabs.findIndex((item) => item.key === path);
      if (deleteTabIndex > 0) {
        push(tabs[deleteTabIndex - 1].key);
      } else {
        push(tabs[deleteTabIndex + 1].key);
      }
    },
    [activeTabRoutePath],
  );
}
