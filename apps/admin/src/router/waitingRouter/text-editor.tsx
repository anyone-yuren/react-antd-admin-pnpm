import { lazy } from '@loadable/component';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';

import LazyLoad from '@/components/LazyLoad';

import { LayoutGuard } from '../guard';

import type { RouteObject } from '../types';

// text-editor module page
const TextEditorRoute: RouteObject = {
  path: '/editor',
  name: 'Editor',
  element: <LayoutGuard />,
  meta: {
    title: t('文本编辑器'),
    icon: 'editor',
    orderNo: 7,
  },
  children: [
    {
      path: 'markdown',
      name: 'Markdown',
      // element: <MarkdownEditor />,
      element: LazyLoad(lazy(() => import('@/views/editor/markdown'))),
      meta: {
        title: t('Markdown编辑器'),
        key: 'markdown',
      },
    },
    {
      path: 'rich-text',
      name: 'RichText',
      // element: <RichTextEditor />,
      element: LazyLoad(lazy(() => import('@/views/editor/rich-text'))),
      meta: {
        title: t('富文本编辑器'),
        key: 'richText',
      },
    },
    {
      path: 'code-editor',
      name: 'CodeEditor',
      // element: <CodeMirror />,
      element: LazyLoad(lazy(() => import('@/views/editor/code-mirror'))),
      meta: {
        title: t('代码编辑器'),
        key: 'codeEditor',
      },
    },
  ],
};

export default TextEditorRoute;
