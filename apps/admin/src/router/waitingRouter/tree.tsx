import { lazy } from '@loadable/component';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';

import LazyLoad from '@/components/LazyLoad';

import { LayoutGuard } from '../guard';

import type { RouteObject } from '../types';

// tree module page
const TreeRoute: RouteObject = {
  path: '/tree',
  name: 'Tree',
  element: <LayoutGuard />,
  meta: {
    title: t('树形结构'),
    icon: 'tree',
    orderNo: 9,
  },
  children: [
    {
      path: 'org-tree',
      name: 'OrgTree',
      // element: <OrgTree />,
      element: LazyLoad(lazy(() => import('@/views/tree/org-tree'))),
      meta: {
        title: t('组织树'),
        key: 'orgTree',
      },
    },
    {
      path: 'antd-tree',
      name: 'AntdTree',
      // element: <AntdTree />,
      element: LazyLoad(lazy(() => import('@/views/tree/antd-tree'))),
      meta: {
        title: t('控件树'),
        key: 'antdTree',
      },
    },
  ],
};

export default TreeRoute;
