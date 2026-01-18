import { useEffect, useState } from 'react';
import { useMatches, useOutlet } from 'react-router-dom';

import { useFlattenedRoutes } from './use-flattened-routes';
import { useRouter } from './use-router';

import type { RouteMeta } from '#/router';
/**
 * 返回当前路由Meta信息
 */
export function useMatchRouteMeta() {
  const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;
  const [matchRouteMeta, setMatchRouteMeta] = useState<RouteMeta>();
  // 获取路由组件实例
  const children = useOutlet();
  // 获取所有匹配到路由
  const matches = useMatches();
  debugger;
  // 获取拍平后到路由菜单
  const flattenedRoutes = useFlattenedRoutes();
  // const pathname = usePathname();
  const { push } = useRouter();

  useEffect(() => {
    const lastRoute = matches.at(-1);

    const currentRouteMeta = flattenedRoutes.find(
      (item) => `${item.key}/` === lastRoute?.pathname || item.key === lastRoute?.pathname,
    );
    if (currentRouteMeta) {
      if (!currentRouteMeta.hideTab) {
        currentRouteMeta.outlet = children;
        setMatchRouteMeta(currentRouteMeta);
      }
    } else {
      push(HOMEPAGE);
    }
  }, [matches]);
  return matchRouteMeta;
}
