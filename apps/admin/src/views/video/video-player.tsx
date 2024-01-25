// @ts-nocheck
import { Card, Col, Row } from 'antd';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';
import {
  BigPlayButton,
  ControlBar,
  CurrentTimeDisplay,
  PlaybackRateMenuButton,
  Player,
  TimeDivider,
  VolumeMenuButton,
} from 'video-react';

import { PageWrapper } from '@/components/Page';

import { VIDEO_PLUGIN, VIDEO_RES_SRC } from '@/settings/websiteSetting';

import 'video-react/dist/video-react.css';

const VideoPlayers = () => (
  <PageWrapper plugin={VIDEO_PLUGIN}>
    <Row gutter={12}>
      <Col span={12}>
        <Card title={t('传统视频播放器')} bordered={false}>
          <video src={VIDEO_RES_SRC} controls style={{ width: '100%', outline: 'none' }} />
        </Card>
      </Col>
      <Col span={12}>
        <Card title={t('视频播放插件')} bordered={false}>
          <Player src={VIDEO_RES_SRC} fluid preload='auto' aspectRatio='16:9'>
            <BigPlayButton position='center' />
            <ControlBar>
              <CurrentTimeDisplay order={4.1} />
              <TimeDivider order={4.2} />
              <VolumeMenuButton vertical order={7.0} />
              <PlaybackRateMenuButton rates={[0.5, 1.0, 1.5, 2.0]} order={7.2} />
            </ControlBar>
          </Player>
        </Card>
      </Col>
    </Row>
  </PageWrapper>
);

export default VideoPlayers;
