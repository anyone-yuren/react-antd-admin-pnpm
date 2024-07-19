import { Decoration6, DigitalFlop, ScrollBoard } from '@jiaminghi/data-view-react';
import { Col, Flex, Layout, Row } from 'antd';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import OldChart from './components/oldChart';
import TransferChart from './components/transferChart';
import { consumeConfig, deliveryConfig, errorConfig, outConfig } from './data';
import useStyles from './index.style';

const { Header, Content } = Layout;

const publicPath = import.meta.env.VITE_PUBLIC_PATH;
function Home() {
  const navigate = useNavigate();
  const goAboutPage = () => {
    navigate('/about');
  };
  const { styles } = useStyles();

  const formatter = (value: number) => {
    const numbers = value.toString().split('').reverse();
    const segs = [];

    while (numbers.length) segs.push(numbers.splice(0, 3).join(''));

    return segs.join(',').split('').reverse().join('');
  };

  const config = {
    number: [31213],
    content: '{nt}万',
    formatter,
    style: {
      fontSize: 34,
      stroke: '#00FFF3',
      lineWidth: 2,
      // shadowColor: '#00FFF3',
      // shadowOffsetX: 10,

      // stroke: [12, 34, 21, 0],
    },
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header className={styles['home-header']}>
        <Flex align='center' justify='space-around' style={{ width: '100%' }}>
          <div className={'home-header__title'}>仓储汇总大屏</div>
        </Flex>
      </Header>
      <Content className={styles['home-content']}>
        <div className='home-content_bg'></div>
        <Row gutter={16} style={{ flex: 'auto' }}>
          {/* 左侧 */}
          <Col className='gutter-row' span={6}>
            <div className='gutter-box'>
              {/* <Row gutter={16} style={{ height: '100%' }}>
                <Col span={24} style={{ height: '50%' }}> */}
              <div className='card' style={{ height: '100%' }}>
                <div className='card-title'>一码到底变更记录</div>
                <ScrollBoard config={consumeConfig} style={{ height: 'calc(100% - 50px' }} />
              </div>
              {/* </Col> */}
              {/* <Col span={24} style={{ height: '50%' }}> */}
              <div className='card' style={{ height: '100%' }}>
                <div className='card-title'>矿资物资消耗排行</div>
                <TransferChart style={{ height: 'calc(100% - 50px' }} />
              </div>
              {/* </Col>
              </Row> */}
            </div>
          </Col>
          {/* 中间 */}
          <Col className='gutter-row' span={12}>
            <Flex vertical gap={16} justify={'space-between'} style={{ height: '100%' }}>
              <motion.div
                initial={{ translateY: 20, opacity: 0 }}
                whileInView={{ translateY: 0, opacity: 1 }}
                transition={{ type: 'spring' }}
              >
                <div className='center'>
                  <Row gutter={16}>
                    <Col span={7} style={{ padding: '24px 8px' }}>
                      <Row gutter={[24, 24]}>
                        <Col span={24}>
                          <div className='box'>
                            <div className='count'>535</div>
                            <div className='dec'>单日入库订单数</div>
                          </div>
                        </Col>
                        <Col span={12}>
                          <div className='box'>
                            <div className='count'>535</div>
                            <div className='dec'>未完成订单</div>
                          </div>
                        </Col>
                        <Col span={12}>
                          <div className='box'>
                            <div className='count'>34.32%</div>
                            <div className='dec'>入库完成率</div>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                    <Col span={10} className='total-box'>
                      <div className='total'>15983万</div>
                      <div className='total-dec'>物资总价值</div>
                    </Col>
                    <Col span={7} style={{ padding: '24px 8px' }}>
                      <Row gutter={[24, 24]}>
                        <Col span={24}>
                          <div className='box'>
                            <div className='count'>535</div>
                            <div className='dec'>单日出库订单数</div>
                          </div>
                        </Col>
                        <Col span={12}>
                          <div className='box'>
                            <div className='count'>535</div>
                            <div className='dec'>已出订单</div>
                          </div>
                        </Col>
                        <Col span={12}>
                          <div className='box'>
                            <div className='count'>535</div>
                            <div className='dec'>待出订单</div>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <div className='tip-box'>
                    <p className='tip'>今日消耗物资金额</p>
                    <DigitalFlop config={config} style={{ width: '200px', height: '50px' }} />
                  </div>
                  <div className='tip-box' style={{ marginTop: 0 }}>
                    <Decoration6 color={['#66FFFF85', '#0066ff85']} style={{ width: '100%', height: '10px' }} />
                  </div>
                </div>
              </motion.div>
              <div className='buttom'>
                <Row gutter={16} style={{ flex: 'auto' }}>
                  <Col className='gutter-row' span={12}>
                    <div className='gutter-box'>
                      <div className='card'>
                        <div className='card-title'>出库订单统计</div>
                        <ScrollBoard config={outConfig} style={{ height: 'calc( 100% - 50px)' }} />
                      </div>
                    </div>
                  </Col>
                  <Col className='gutter-row' span={12}>
                    <div className='gutter-box'>
                      <div className='card'>
                        <div className='card-title'>交旧排行</div>
                        <OldChart style={{ height: 'calc( 100% - 50px)' }} />
                        {/* <ScrollBoard config={errorConfig} style={{ height: 'calc( 100% - 50px)' }} /> */}
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </Flex>
          </Col>
          {/* 右侧 */}
          <Col className='gutter-row' span={6}>
            <div className='gutter-box'>
              <div className='card'>
                <div className='card-title'>异常消耗情况</div>
                <ScrollBoard config={errorConfig} style={{ height: 'calc( 100% - 50px)' }} />
              </div>
              <div className='card'>
                <div className='card-title'>待配送订单</div>
                <ScrollBoard config={deliveryConfig} style={{ height: 'calc( 100% - 50px)' }} />
              </div>
            </div>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

export default Home;
