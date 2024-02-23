import { ascend } from 'ramda';

import type { AppRouteObject, RouteMeta } from '#/router';

/**
 * 根据特定条件过滤菜单项并对过滤后的项目进行排序，并按照order升序返回
 *
 * @param {AppRouteObject[]} items - The array of items to be filtered and sorted
 * @return {AppRouteObject[]} The filtered and sorted array of items
 */
export const menuFilter = (items: AppRouteObject[]) => {
  return items
    .filter((item) => {
      const show = item.meta?.key;
      if (show && item.children) {
        // eslint-disable-next-line no-param-reassign
        item.children = menuFilter(item.children);
      }
      return show;
    })
    .sort(ascend((item) => item.order || Infinity));
};

/**
 * 将菜单路由扁平化为 RouteMeta 对象的单个数组。
 *
 * @param {AppRouteObject[]} routes - an array of AppRouteObject representing the menu routes
 * @return {RouteMeta[]} a single array of RouteMeta objects
 */
export function flattenMenuRoutes(routes: AppRouteObject[]) {
  return routes.reduce<RouteMeta[]>((prev, item) => {
    const { meta, children } = item;
    if (meta) prev.push(meta);
    if (children) prev.push(...flattenMenuRoutes(children));
    return prev;
  }, []);
}
