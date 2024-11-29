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
  path: '/no-change',
  element: <AuthenticatedRoute requiresAuth={'/no-change'} />,
  meta: {
    title: '无动态物资',
    icon: 'gbeata-material-symbols:info-outline-rounded',
    orderNo: 3,
    iconSize: 20,
    hideChildrenInMenu: true,
  },
  children: [
    {
      path: '',
      element: LazyLoad(lazy(() => import('@/views/noChange'))),
      meta: {
        title: '',
        key: '',
      },
    },
  ],
};
export default UserRoute;
