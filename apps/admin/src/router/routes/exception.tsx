import { lazy } from '@loadable/component';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';

import LazyLoad from '@/components/LazyLoad';

import { ExceptionEnum } from '@/enums/exceptionEnum';

import { LayoutGuard } from '../guard';

import type { RouteObject } from '../types';

// exception module page
const ExceptionRoute: RouteObject = {
  path: '/exception',
  name: 'ExceptionPage',
  element: <LayoutGuard />,
  meta: {
    title: t('异常页面'),
    icon: 'bug',
    orderNo: 11,
  },
  children: [
    {
      path: 'page-403',
      name: 'Page403',
      // element: <Exception />,
      element: LazyLoad(lazy(() => import('@/views/exception'))),
      meta: {
        title: t('403页面'),
        key: 'page403',
      },
      loader: () => ({ status: ExceptionEnum.PAGE_NOT_ACCESS, withCard: true }),
    },
    {
      path: 'page-404',
      name: 'Page404',
      // element: <Exception />,
      element: LazyLoad(lazy(() => import('@/views/exception'))),
      meta: {
        title: t('404页面'),
        key: 'page404',
      },
      loader: () => ({ status: ExceptionEnum.PAGE_NOT_FOUND, withCard: true }),
    },
    {
      path: 'page-500',
      name: 'Page500',
      // element: <Exception />,
      element: LazyLoad(lazy(() => import('@/views/exception'))),
      meta: {
        title: t('500页面'),
        key: 'page500',
      },
      loader: () => ({ status: ExceptionEnum.SERVER_ERROR, withCard: true }),
    },
  ],
};

export default ExceptionRoute;
