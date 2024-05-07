// eslint-disable-next-line import/no-extraneous-dependencies
import { lazy } from '@loadable/component';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';

import LazyLoad from '@/components/LazyLoad';

import { LayoutGuard } from '../guard';

import type { RouteObject } from '../types';

// user module page
const UserRoute: RouteObject = {
  path: '/system',
  element: <LayoutGuard />,
  meta: {
    title: '系统设置',
    icon: 'ic_user',
    orderNo: 13,
    iconSize: 20,
  },
  children: [
    {
      path: 'role',
      element: LazyLoad(lazy(() => import('@/views/system/role'))),
      meta: {
        title: '角色管理',
        key: 'role',
      },
    },
    {
      path: 'user',
      element: LazyLoad(lazy(() => import('@/views/system/user'))),
      meta: {
        title: '用户管理',
        key: 'user',
      },
    },
  ],
};
export default UserRoute;
