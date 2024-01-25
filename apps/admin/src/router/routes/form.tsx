import { lazy } from '@loadable/component';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';

import LazyLoad from '@/components/LazyLoad';

import { LayoutGuard } from '../guard';

import type { RouteObject } from '../types';

// form module page
const FormRoute: RouteObject = {
  path: '/form',
  name: 'Form',
  element: <LayoutGuard />,
  meta: {
    title: t('表单'),
    icon: 'form',
    orderNo: 3,
  },
  children: [
    {
      path: 'basic-form',
      name: 'BasicForm',
      // element: <BasicForm />,
      element: LazyLoad(lazy(() => import('@/views/form/basic-form'))),
      meta: {
        title: t('基础表单'),
        key: 'basicForm',
      },
    },
    {
      path: 'search-form',
      name: 'SearchForm',
      // element: <SearchForm />,
      element: LazyLoad(lazy(() => import('@/views/form/search-form'))),
      meta: {
        title: t('查询表单'),
        key: 'searchForm',
      },
    },
    // {
    //   path: 'form-designer',
    //   name: 'FormDesigner',
    //   // element: <BlankPage />,
    //   element: LazyLoad(lazy(() => import('@/views/blank'))),
    //   meta: {
    //     title: '表单设计器',
    //     key: 'formDesigner',
    //   },
    // },
  ],
};

export default FormRoute;
