// eslint-disable-next-line import/no-extraneous-dependencies
import { lazy } from '@loadable/component';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';

import LazyLoad from '@/components/LazyLoad';

import { LayoutGuard } from '../guard';

import type { RouteObject } from '../types';

// user module page
const UserRoute: RouteObject = {
  path: '/stock',
  meta: {
    title: '现存量',
    icon: 'gbeata-material-symbols:delete-sweep-outline-sharp',
    orderNo: 3,
    iconSize: 20,
    hideChildrenInMenu: true,
  },
  children: [
    {
      path: '',
      element: LazyLoad(lazy(() => import('@/views/stock'))),
      meta: {
        title: '',
        key: '',
      },
    },
  ],
};
export default UserRoute;
