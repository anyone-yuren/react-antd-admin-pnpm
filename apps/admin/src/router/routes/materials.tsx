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
  path: '/materials',
  element: <AuthenticatedRoute requiresAuth={'/materials'} />,
  meta: {
    title: '物料进出存',
    icon: 'gbeata-ic:round-recycling',
    orderNo: 7,
    iconSize: 20,
    hideChildrenInMenu: true,
  },
  children: [
    {
      path: '',
      element: LazyLoad(lazy(() => import('@/views/materials'))),
      meta: {
        title: '',
        key: '',
      },
    },
  ],
};
export default UserRoute;
