import { lazy } from '@loadable/component';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';

import LazyLoad from '@/components/LazyLoad';

import { LayoutGuard } from '../guard';

import type { RouteObject } from '../types';

// component module page
const CompoRoute: RouteObject = {
  path: '/compo',
  name: 'Compo',
  element: <LayoutGuard />,
  meta: {
    title: '组件',
    icon: 'compo',
    orderNo: 6,
  },
  children: [
    {
      path: 'point-cloud',
      name: 'pointCloud',
      element: LazyLoad(lazy(() => import('@/views/compo/point-cloud'))),
      meta: {
        title: '10w点云',
        key: 'pointCloud',
      },
    },
    {
      path: 'image-upload',
      name: 'ImageUpload',
      // element: <ImageUpload />,
      element: LazyLoad(lazy(() => import('@/views/compo/image-upload'))),
      meta: {
        title: '图片上传',
        key: 'imageUpload',
      },
    },
    {
      path: 'drag',
      name: 'Drag',
      meta: {
        title: '拖拽',
      },
      children: [
        {
          path: 'drag-list',
          name: 'DragList',
          // element: <DragList />,
          element: LazyLoad(lazy(() => import('@/views/compo/drag/drag-list'))),
          meta: {
            title: '列表拖拽',
            key: 'dragList',
          },
        },
        {
          path: 'drag-resize',
          name: 'DragResize',
          // element: <DragResize />,
          element: LazyLoad(lazy(() => import('@/views/compo/drag/drag-resize'))),
          meta: {
            title: '组件拖拽',
            key: 'dragResize',
          },
        },
      ],
    },
    {
      path: 'transfer',
      name: 'Transfer',
      // element: <Transfer />,
      element: LazyLoad(lazy(() => import('@/views/compo/transfer'))),
      meta: {
        title: '穿梭框',
      },
    },
    {
      path: 'count-up',
      name: 'CountUp',
      // element: <CountUp />,
      element: LazyLoad(lazy(() => import('@/views/compo/count-up'))),
      meta: {
        title: '数字滚动',
        key: 'countUp',
      },
    },
    {
      path: 'loading-test',
      name: 'LoadingTest',
      element: LazyLoad(lazy(() => import('@/views/compo/loading-test'))),
      meta: {
        title: '加载组件',
        key: 'loadingTest',
      },
    },
    {
      path: 'point-cloud-viewer',
      name: 'PointCloudViewer',
      element: LazyLoad(lazy(() => import('@/views/compo/point-cloud-viewer'))),
      meta: {
        title: '点云渲染',
        key: 'pointCloudViewer',
      },
    },
    {
      path: 'flow-editor',
      name: 'FlowEditor',
      element: LazyLoad(lazy(() => import('@/views/compo/flow-editor'))),
      meta: {
        title: '流程编辑器',
        key: 'flowEditor',
      },
    },
    {
      path: 'robot-viewer',
      name: 'RobotViewer',
      element: LazyLoad(lazy(() => import('@/views/compo/robot-viewer'))),
      meta: {
        title: '机器人查看器',
        key: 'robotViewer',
      },
    },
  ],
};

export default CompoRoute;
