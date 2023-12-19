import { Button, Col, Divider, Row, Typography } from 'antd';
import { useTheme } from 'antd-style';
import { type FC, useState } from 'react';
import { AnimatePanel, BaseSlick, Translatex } from 'ui';

import SvgIcon from '@/components/SvgIcon';

import cover_1 from '@/assets/images/cover_1.jpg';
import cover_2 from '@/assets/images/cover_2.jpg';
import cover_3 from '@/assets/images/cover_3.jpg';
import cover_4 from '@/assets/images/cover_4.jpg';
import cover_5 from '@/assets/images/cover_5.jpg';

import CommitTable from './components/CommitTable';
import useStyles from './index.style';

const { Title, Text } = Typography;
const HomePage: FC = () => {
  debugger;
  const { styles } = useStyles();
  const token = useTheme();
  const [current, setCurrent] = useState(1);
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
            </AnimatePanel>
          </div>
        </Col>
        <Col className='gutter-row' span={8}>
          <div className='slick g-paper'>
            <BaseSlick
              sliderConfig={{
                dots: true,
                infinite: true,
                speed: 500,
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 4000,
                afterChange: (index) => {
                  setCurrent(index + 1);
                },
              }}
            >
              <div className='image-box'>
                <img src={cover_1} alt='' />
                <div className='img-info'>
                  <Translatex run={current === 1} delay={100}>
                    <Text ellipsis style={{ fontWeight: 'bold', color: token.colorPrimary }} type='success'>
                      作者：Gbeata
                    </Text>
                  </Translatex>
                  <Translatex run={current === 1} delay={200}>
                    <Title style={{ color: 'white', margin: '8px 0' }} ellipsis level={4} color='white'>
                      还没有想清楚如何介绍自己和系统之前，就请允许我使用这些文字占位吧～
                    </Title>
                  </Translatex>
                  <Translatex run={current === 1} delay={300}>
                    <Text ellipsis style={{ color: 'white' }}>
                      详细介绍下自己吧：我是一个小前端呀小前端，小前端啊小前端
                    </Text>
                  </Translatex>
                </div>
              </div>
              <div className='image-box'>
                <img src={cover_2} alt='' />
                <div className='img-info'>
                  <Translatex run={current === 2} delay={100}>
                    <Text ellipsis style={{ fontWeight: 'bold', color: token.colorPrimary }} type='success'>
                      作者：Gbeata
                    </Text>
                  </Translatex>
                  <Translatex run={current === 2} delay={200}>
                    <Title style={{ color: 'white', margin: '8px 0' }} ellipsis level={4} color='white'>
                      还没有想清楚如何介绍自己和系统之前，就请允许我使用这些文字占位吧～
                    </Title>
                  </Translatex>
                  <Translatex run={current === 2} delay={300}>
                    <Text ellipsis style={{ color: 'white' }}>
                      详细介绍下自己吧：我是一个小前端呀小前端，小前端啊小前端
                    </Text>
                  </Translatex>
                </div>
              </div>
              <div className='image-box'>
                <img src={cover_3} alt='' />
                <div className='img-info'>
                  <Translatex run={current === 3} delay={100}>
                    <Text ellipsis style={{ fontWeight: 'bold', color: token.colorPrimary }} type='success'>
                      作者：Gbeata
                    </Text>
                  </Translatex>
                  <Translatex run={current === 3} delay={200}>
                    <Title style={{ color: 'white', margin: '8px 0' }} ellipsis level={4} color='white'>
                      还没有想清楚如何介绍自己和系统之前，就请允许我使用这些文字占位吧～
                    </Title>
                  </Translatex>
                  <Translatex run={current === 3} delay={300}>
                    <Text ellipsis style={{ color: 'white' }}>
                      详细介绍下自己吧：我是一个小前端呀小前端，小前端啊小前端
                    </Text>
                  </Translatex>
                </div>
              </div>
              <div className='image-box'>
                <img src={cover_4} alt='' />
                <div className='img-info'>
                  <Translatex run={current === 4} delay={100}>
                    <Text ellipsis style={{ fontWeight: 'bold', color: token.colorPrimary }} type='success'>
                      作者：Gbeata
                    </Text>
                  </Translatex>
                  <Translatex run={current === 4} delay={200}>
                    <Title style={{ color: 'white', margin: '8px 0' }} ellipsis level={4} color='white'>
                      还没有想清楚如何介绍自己和系统之前，就请允许我使用这些文字占位吧～
                    </Title>
                  </Translatex>
                  <Translatex run={current === 4} delay={300}>
                    <Text ellipsis style={{ color: 'white' }}>
                      详细介绍下自己吧：我是一个小前端呀小前端，小前端啊小前端
                    </Text>
                  </Translatex>
                </div>
              </div>
              <div className='image-box'>
                <img src={cover_5} alt='' />
                <div className='img-info'>
                  <Translatex run={current === 5} delay={100}>
                    <Text ellipsis style={{ fontWeight: 'bold', color: token.colorPrimary }} type='success'>
                      作者：Gbeata
                    </Text>
                  </Translatex>
                  <Translatex run={current === 5} delay={200}>
                    <Title style={{ color: 'white', margin: '8px 0' }} ellipsis level={4} color='white'>
                      还没有想清楚如何介绍自己和系统之前，就请允许我使用这些文字占位吧～
                    </Title>
                  </Translatex>
                  <Translatex run={current === 5} delay={300}>
                    <Text ellipsis style={{ color: 'white' }}>
                      详细介绍下自己吧：我是一个小前端呀小前端，小前端啊小前端
                    </Text>
                  </Translatex>
                </div>
              </div>
            </BaseSlick>
          </div>
        </Col>
        <Col span={24}>
          <CommitTable />
        </Col>
      </Row>
    </div>
  );
};

export default HomePage;
