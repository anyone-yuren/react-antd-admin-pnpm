import { lazy } from '@loadable/component';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';

import LazyLoad from '@/components/LazyLoad';

import { LayoutGuard } from '../guard';

import type { RouteObject } from '../types';

// video module page
const VideoRoute: RouteObject = {
  path: '/video',
  name: 'Video',
  element: <LayoutGuard />,
  meta: {
    title: t('视频处理'),
    icon: 'video',
    orderNo: 5,
  },
  children: [
    {
      path: 'video-player',
      name: 'VideoPlayer',
      // element: <VideoPlayer />,
      element: LazyLoad(lazy(() => import('@/views/video/video-player'))),
      meta: {
        title: t('视频播放器'),
        key: 'videoPlayer',
      },
    },
  ],
};

export default VideoRoute;
