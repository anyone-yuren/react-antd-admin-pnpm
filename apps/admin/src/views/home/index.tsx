import { Button, Col, Divider, Row, Typography } from 'antd';

import SvgIcon from '@/components/SvgIcon';

import useStyles from './index.style';

import type { FC } from 'react';

const { Title, Text } = Typography;
const HomePage: FC = () => {
  const { styles } = useStyles();
  return (
    <div className={styles['home-container']}>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className='gutter-row' span={16}>
          <div className='user-info'>
            <Row
              style={{
                padding: '40px',
              }}
            >
              <Col span={12}>
                <Title level={3}>欢迎回来 👋 Gbeata</Title>
                <Text type='secondary'>
                  如果你正在使用或者将要使用这个系统，希望你在探索的过程中学有所得，
                  如果正巧你遇到了一个问题，请告诉我们，我们会尽快处理！
                </Text>
                <Divider dashed />
                <Button type='primary'>现在出发！</Button>
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
          </div>
        </Col>
        <Col className='gutter-row' span={8}>
          <div>col-6</div>
        </Col>
      </Row>
    </div>
  );
};

export default HomePage;
