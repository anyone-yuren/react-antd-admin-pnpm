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
  path: '/materialMagement',
  element: <AuthenticatedRoute requiresAuth={'/materialMagement'} />,
  meta: {
    title: '物料管理',
    icon: 'gbeata-lets-icons:materials-light',
    orderNo: 12,
    iconSize: 20,
    hideChildrenInMenu: true,
  },
  children: [
    {
      path: '',
      element: LazyLoad(lazy(() => import('@/views/materialMagement'))),
      meta: {
        title: '',
        key: '',
      },
    },
  ],
};
export default UserRoute;
