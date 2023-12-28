import { createHashRouter, Navigate, redirect } from 'react-router-dom';

import { getAuthCache } from '@/utils/auth';

import { TOKEN_KEY } from '@/enums/cacheEnum';
import { ExceptionEnum } from '@/enums/exceptionEnum';
import PageException from '@/views/exception';
import LoginPage from '@/views/login';

import { genFullPath } from './helpers';

import type { RouteObject } from './types';
import LazyLoad from '@/components/LazyLoad';
import { LayoutGuard } from './guard';
import React from 'react';

const HomePage = React.lazy(() => import('@/views/home'));

const metaRoutes = import.meta.glob('./routes/*.tsx', { eager: true }) as Recordable;

const routeList: RouteObject[] = [];

// Object.keys(metaRoutes).forEach((key) => {
//   const module = metaRoutes[key].default || {};
//   const moduleList = Array.isArray(module) ? [...module] : [module];
//   genFullPath(moduleList);
//   routeList.push(...moduleList);
// });

const rootRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to='/home' />,
  },
  {
    path: '/login',
    element: <LoginPage />,
    meta: {
      title: '登录页',
      key: 'login',
    },
    loader: () => {
      if (getAuthCache<string>(TOKEN_KEY)) {
        return redirect('/');
      }
      return null;
    },
  },
  {
    path: '/home',
    element: <LayoutGuard />,
    meta: {
      title: '首页',
      icon: 'home',
      affix: true,
      orderNo: 1,
      hideChildrenInMenu: true,
    },
    children: [
      {
        path: '',
        element: LazyLoad(HomePage),
        // errorElement: <ErrorBoundary />,
        meta: {
          title: '首页',
          key: 'home',
          icon: 'home',
          orderNo: 1,
          hideMenu: true,
        },
      },
    ],
  },
  // ...routeList,
  {
    path: '*',
    element: <Navigate to='/404' />,
  },
  {
    path: '/403',
    element: <PageException />,
    loader: () => ({ status: ExceptionEnum.PAGE_NOT_ACCESS, withCard: false }),
  },
  {
    path: '/404',
    element: <PageException />,
    loader: () => ({ status: ExceptionEnum.PAGE_NOT_FOUND, withCard: false }),
  },
];

export { routeList as basicRoutes };

export default createHashRouter(rootRoutes);
