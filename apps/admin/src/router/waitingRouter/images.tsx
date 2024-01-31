import { lazy } from '@loadable/component';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';

import LazyLoad from '@/components/LazyLoad';

import { LayoutGuard } from '../guard';

import type { RouteObject } from '../types';

// image module page
const ImageRoute: RouteObject = {
  path: '/image',
  name: 'Image',
  element: <LayoutGuard />,
  meta: {
    title: t('图片处理'),
    icon: 'image',
    orderNo: 4,
  },
  children: [
    {
      path: 'image-cropper',
      name: 'ImageCropper',
      // element: <ImageCropper />,
      element: LazyLoad(lazy(() => import('@/views/image/image-cropper'))),
      meta: {
        title: t('图片裁剪'),
        key: 'imageCropper',
      },
    },
    {
      path: 'image-compress',
      name: 'ImageCompress',
      // element: <ImageCompress />,
      element: LazyLoad(lazy(() => import('@/views/image/image-compress'))),
      meta: {
        title: t('图片压缩'),
        key: 'imageCompress',
      },
    },
  ],
};

export default ImageRoute;
