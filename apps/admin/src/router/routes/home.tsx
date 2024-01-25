// eslint-disable-next-line import/no-extraneous-dependencies
import { lazy } from '@loadable/component';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';

import LazyLoad from '@/components/LazyLoad';

import { LayoutGuard } from '../guard';

import type { RouteObject } from '../types';

const HomePage = lazy(() => import('@/views/home/index'));

// import ErrorBoundary from '@/components/ErrorBoundary';
// Home route
const HomeRoute: RouteObject = {
  path: '/home',
  element: <LayoutGuard />,
  // errorElement: <ErrorBoundary />,
  loader: () => null,
  meta: {
    title: t('首页'),
    icon: 'home',
    affix: true,
    orderNo: 1,
    hideChildrenInMenu: true,
  },
  children: [
    {
      path: '',
      element: LazyLoad(HomePage),
      meta: {
        title: t('首页'),
        key: 'home',
        icon: 'home',
        orderNo: 1,
        hideMenu: true,
      },
      // async lazy() {
      //   const Home = lazy(() => import('@/views/home/index'));
      //   return {
      //     Component: Home,
      //     meta: {
      //       title: '首页',
      //       key: 'home',
      //       icon: 'home',
      //       orderNo: 1,
      //       hideMenu: true,
      //     },
      //   };
      // },
    },
  ],
};

export default HomeRoute;
