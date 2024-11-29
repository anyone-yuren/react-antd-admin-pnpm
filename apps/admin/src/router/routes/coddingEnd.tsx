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
  path: '/coddingEnd',
  element: <AuthenticatedRoute requiresAuth={'/coddingEnd'} />,
  meta: {
    title: '一码到底管理',
    icon: 'gbeata-material-symbols:qr-code',
    orderNo: 9,
    iconSize: 20,
    hideChildrenInMenu: true,
  },
  children: [
    {
      path: '',
      element: LazyLoad(lazy(() => import('@/views/codingEnd'))),
      meta: {
        title: '',
        key: '',
      },
    },
  ],
};
export default UserRoute;
