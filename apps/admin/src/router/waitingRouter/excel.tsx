import { lazy } from '@loadable/component';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';

import LazyLoad from '@/components/LazyLoad';

import { LayoutGuard } from '../guard';

import type { RouteObject } from '../types';

// excel module page
const ExcelRoute: RouteObject = {
  path: '/excel',
  name: 'Excel',
  element: <LayoutGuard />,
  meta: {
    title: 'Excel',
    icon: 'excel',
    orderNo: 10,
  },
  children: [
    {
      path: 'export-excel',
      name: 'ExportExcel',
      // element: <ExportExcel />,
      element: LazyLoad(lazy(() => import('@/views/excel/export-excel'))),
      meta: {
        title: t('导出Excel'),
        key: 'exportExcel',
      },
    },
    {
      path: 'import-excel',
      name: 'ImportExcel',
      // element: <ImportExcel />,
      element: LazyLoad(lazy(() => import('@/views/excel/import-excel'))),
      meta: {
        title: t('导入Excel'),
        key: 'importExcel',
      },
    },
  ],
};

export default ExcelRoute;
