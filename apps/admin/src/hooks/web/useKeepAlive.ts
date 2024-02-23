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
      tabs.splice(deleteTabIndex, 1);
      setTabs([...tabs]);
    },
    [activeTabRoutePath],
  );
  const closeOthersTab = useCallback(
    (path = activeTabRoutePath) => {
      setTabs((prev) => prev.filter((item) => item.key === path));
    },
    [activeTabRoutePath],
  );

  const closeAll = useCallback(() => {
    setTabs([]);
    push(HOMEPAGE);
  }, [push]);

  const closeLeft = useCallback(
    (path = activeTabRoutePath) => {
      const deleteTabIndex = tabs.findIndex((item) => item.key === path);
      setTabs(tabs.slice(deleteTabIndex));
    },
    [push, tabs],
  );

  const closeRight = useCallback(
    (path = activeTabRoutePath) => {
      const deleteTabIndex = tabs.findIndex((item) => item.key === path);
      setTabs(tabs.slice(0, deleteTabIndex + 1));
    },
    [push, tabs],
  );
  /**
   * Refresh specified tab
   */
  const refreshTab = useCallback(
    (path = activeTabRoutePath) => {
      setTabs((prev) => {
        const index = prev.findIndex((item) => item.key === path);

        if (index >= 0) {
          // eslint-disable-next-line no-param-reassign
          prev[index].timeStamp = getKey();
        }

        return [...prev];
      });
    },
    [activeTabRoutePath],
  );
  /**
   *  检测是否已经存在，如果不存在就添加
   */
  // useEffect(() => {
  //   if (!currentRouteMeta) return;
  //   const existed = tabs.find((item) => item.key === currentRouteMeta.key);
  //   if (!existed) {
  //     setTabs((prev) => [...prev, { ...currentRouteMeta, children: currentRouteMeta.outlet, timeStamp: getKey() }]);
  //   }
  //   setActiveTabRoutePath(currentRouteMeta.key);
  // }, [currentRouteMeta]);
  return {
    tabs,
    activeTabRoutePath,
    setTabs,
    closeTab,
    closeOthersTab,
    refreshTab,
    closeAll,
    closeLeft,
    closeRight,
  };
}

function getKey() {
  return new Date().getTime().toString();
}
