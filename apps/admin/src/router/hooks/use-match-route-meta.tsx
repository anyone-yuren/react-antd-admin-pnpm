import { useEffect, useState } from 'react';
import { type Params, useMatches, useOutlet } from 'react-router-dom';

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

/**
 * replace `user/:id`  to `/user/1234512345`
 */
export const replaceDynamicParams = (menuKey: string, params: Params<string>) => {
  let replacedPathName = menuKey;

  // 解析路由路径中的参数名称
  const paramNames = menuKey.match(/:\w+/g);

  if (paramNames) {
    paramNames.forEach((paramName) => {
      // 去掉冒号，获取参数名称
      const paramKey = paramName.slice(1);
      // 检查params对象中是否有这个参数
      if (params[paramKey]) {
        // 使用params中的值替换路径中的参数
        replacedPathName = replacedPathName.replace(paramName, params[paramKey]!);
      }
    });
  }

  return replacedPathName;
};
