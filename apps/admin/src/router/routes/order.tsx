// eslint-disable-next-line import/no-extraneous-dependencies
import { lazy } from '@loadable/component';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';

import LazyLoad from '@/components/LazyLoad';

import { LayoutGuard } from '../guard';
import AuthenticatedRoute from '../hooks/permission';

import type { RouteObject } from '../types';

// user module page
const UserRoute: RouteObject = {
  path: '/order',
  element: <AuthenticatedRoute requiresAuth={'/order'} />,
  meta: {
    title: '订单管理',
    icon: 'gbeata-fe:list-order',
    orderNo: 6,
    iconSize: 20,
    hideChildrenInMenu: true,
  },
  children: [
    {
      path: '',
      element: LazyLoad(lazy(() => import('@/views/order'))),
      meta: {
        title: '',
        key: '',
      },
    },
  ],
};
export default UserRoute;
