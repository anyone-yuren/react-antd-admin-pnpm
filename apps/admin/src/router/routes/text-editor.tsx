import { lazy } from 'react';

import LazyLoad from '@/components/LazyLoad';

import { LayoutGuard } from '../guard';

import type { RouteObject } from '../types';

// text-editor module page
const TextEditorRoute: RouteObject = {
  path: '/editor',
  element: <LayoutGuard />,
  meta: {
    title: '文本编辑器',
    icon: 'editor',
    orderNo: 7,
  },
  children: [
    {
      path: 'markdown',
      element: LazyLoad(lazy(() => import('@/views/editor/markdown'))),
      meta: {
        title: 'Markdown编辑器',
        key: 'markdown',
      },
    },
    {
      path: 'rich-text',
      element: LazyLoad(lazy(() => import('@/views/editor/rich-text'))),
      meta: {
        title: '富文本编辑器',
        key: 'richText',
      },
    },
    {
      path: 'code-editor',
      element: LazyLoad(lazy(() => import('@/views/editor/code-mirror'))),
      meta: {
        title: '代码编辑器',
        key: 'codeEditor',
      },
    },
  ],
};

export default TextEditorRoute;
