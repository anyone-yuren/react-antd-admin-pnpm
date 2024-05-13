// eslint-disable-next-line import/no-extraneous-dependencies
import { lazy } from '@loadable/component';
import { t } from 'i18next';

import LazyLoad from '@/components/LazyLoad';

import { LayoutGuard } from '../guard';

import type { RouteObject } from '../types';

// user module page
const UserRoute: RouteObject = {
  path: '/system',
  element: <LayoutGuard />,
  meta: {
    title: t('系统设置'),
    icon: 'gbeata-ant-design:setting-outlined',
    orderNo: 13,
    iconSize: 20,
  },
  children: [
    {
      path: 'role',
      element: LazyLoad(lazy(() => import('@/views/management/role'))),
      meta: {
        title: t('角色管理'),
        key: 'role',
      },
    },
    {
      path: 'user',
      element: LazyLoad(lazy(() => import('@/views/management/user'))),
      meta: {
        title: t('用户管理'),
        key: 'user',
      },
    },
  ],
};
export default UserRoute;
