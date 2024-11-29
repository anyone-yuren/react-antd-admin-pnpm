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
  path: '/consume',
  element: <AuthenticatedRoute requiresAuth={'/consume'} />,
  meta: {
    title: '消耗统计',
    icon: 'gbeata-iwwa:consumption-o',
    orderNo: 6,
    iconSize: 20,
    hideChildrenInMenu: true,
  },
  children: [
    {
      path: '',
      element: LazyLoad(lazy(() => import('@/views/consume'))),
      meta: {
        title: '',
        key: '',
      },
    },
  ],
};
export default UserRoute;
