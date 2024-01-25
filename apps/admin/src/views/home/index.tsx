// eslint-disable-next-line import/no-extraneous-dependencies
import { MacBook } from '@gbeata/three';
import { Button, Col, Divider, Row, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { AnimatePanel } from 'ui';

import SvgIcon from '@/components/SvgIcon';
import UserCard from '@/components/UserCard';

import { AnalyzeCard } from './components/AnalyzeCard';
import JuejinTable from './components/juejinTable';
import SlickBox from './components/SlickBox';
import useStyles from './index.style';

import type { FC } from 'react';

const { Title, Text } = Typography;
const HomePage: FC = () => {
  const { styles } = useStyles();
  const { t } = useTranslation();
  return (
    <div className={styles['home-container']}>
      <Row gutter={[16, 16]}>
        <Col className='gutter-row' span={16}>
          <div className='user-info g-paper'>
            <AnimatePanel
              panelConfig={{
                friction: 2,
                precision: 0.02,
              }}
            >
              <Row
                style={{
                  padding: '40px',
                }}
              >
                <Col span={12}>
                  <Title level={3}>{t('欢迎回来 👋 Gbeata')}</Title>
                  <Text type='secondary'>
                    {t(
                      '如果你正在使用或者将要使用这个系统，希望你在探索的过程中学有所得，                     如果正巧你遇到了一个问题，请告诉我们，我们会尽快处理！',
                    )}
                  </Text>
                  <Divider dashed />
                  <Button type='primary'>{t('现在出发！')}</Button>
                </Col>
                <Col span={12}>
                  <SvgIcon
                    name='homeinfo'
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                  />
                </Col>
              </Row>
            </AnimatePanel>
          </div>
        </Col>
        <Col className='gutter-row' span={8}>
          <div className='slick g-paper'>
            <SlickBox />
          </div>
        </Col>
        <AnalyzeCard />
        <Col span={12}>
          <UserCard></UserCard>
        </Col>
        <Col span={12}>
          {/* <CommitTable /> */}
          <MacBook />
        </Col>
        <Col span={24}>
          <JuejinTable />
          {/* <Text>
             其实呢，大部分普通人的生活，就是在做那些零零碎碎的小事，工作也好，生活也好，哪有那么多惊天动地的大事呢，只不过我们很多时候并没有用心，又或者我们太忙碌，大焦虑，无法从这些小事中品出温情，获得满足。
             借此记录自己每天的点点滴滴，充实自己。
            </Text> */}
        </Col>
      </Row>
    </div>
  );
};

export default HomePage;
