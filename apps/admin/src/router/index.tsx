import { t } from 'i18next';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { createHashRouter, Navigate, redirect, type RouteObject, useRoutes } from 'react-router-dom';

import { getAuthCache } from '@/utils/auth';

import { TOKEN_KEY } from '@/enums/cacheEnum';
import { ExceptionEnum } from '@/enums/exceptionEnum';
import { BasicLayout } from '@/layout';
import PageException from '@/views/exception';
import LoginPage from '@/views/login';

import { GuardRoute } from './guard/guardRoute';
import { genFullPath } from './helpers';

import type { AppRouteObject } from './types';

const metaRoutes = import.meta.glob('./routes/*.tsx', { eager: true }) as Recordable;

const routeList: AppRouteObject[] = [];
Object.keys(metaRoutes).forEach((key) => {
  const module = metaRoutes[key].default || {};
  const moduleList = Array.isArray(module) ? [...module] : [module];
  genFullPath(moduleList);
  routeList.push(...moduleList);
});

const rootRoutes: AppRouteObject[] = [
  {
    path: '/',
    element: (
      <GuardRoute>
        <BasicLayout />
      </GuardRoute>
    ),
    children: [{ index: true, element: <Navigate to='/home' replace /> }, ...routeList],
    // element: <Navigate to='/home' />,
  },
  {
    path: '/login',
    element: <LoginPage />,
    meta: {
      title: t('登录页'),
      key: 'login',
    },
    loader: () => {
      if (getAuthCache<string>(TOKEN_KEY)) {
        debugger;
        return redirect('/');
      }
      return null;
    },
  },

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

export const Router = () => {
  const routes = useRoutes(rootRoutes as unknown as RouteObject[]);
  return routes;
};

export default createHashRouter(rootRoutes as unknown as RouteObject[]);
