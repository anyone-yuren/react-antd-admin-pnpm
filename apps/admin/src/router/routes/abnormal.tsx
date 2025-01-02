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
  path: '/abnormal',
  element: <AuthenticatedRoute requiresAuth={'/abnormal'} />,
  meta: {
    title: '异常消耗',
    icon: 'gbeata-fluent:line-horizontal-5-error-20-regular',
    orderNo: 4,
    iconSize: 20,
    hideChildrenInMenu: true,
  },
  children: [
    {
      path: '',
      element: LazyLoad(lazy(() => import('@/views/abnormal'))),
      meta: {
        title: '',
        key: '',
      },
    },
  ],
};
export default UserRoute;
