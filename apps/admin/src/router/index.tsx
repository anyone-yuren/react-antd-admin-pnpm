import { t } from 'i18next';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { createHashRouter, Navigate, redirect, useRoutes } from 'react-router-dom';

import { getAuthCache } from '@/utils/auth';

import { TOKEN_KEY } from '@/enums/cacheEnum';
import { ExceptionEnum } from '@/enums/exceptionEnum';
import PageException from '@/views/exception';
import LoginPage from '@/views/login';

import { genFullPath } from './helpers';

import type { RouteObject } from './types';

const metaRoutes = import.meta.glob('./routes/*.tsx', { eager: true }) as Recordable;

const routeList: RouteObject[] = [];

Object.keys(metaRoutes).forEach((key) => {
  const module = metaRoutes[key].default || {};
  const moduleList = Array.isArray(module) ? [...module] : [module];
  genFullPath(moduleList);
  routeList.push(...moduleList);
});

const rootRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to='/home' />,
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
        return redirect('/');
      }
      return null;
    },
  },
  ...routeList,
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
  const routes = useRoutes(rootRoutes);
  return routes;
};

export default createHashRouter(rootRoutes);
