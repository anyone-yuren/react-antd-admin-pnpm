import { BorderBox8, BorderBox10, Decoration6, DigitalFlop, ScrollBoard } from '@jiaminghi/data-view-react';
import { useRequest } from 'ahooks';
import { Col, Flex, Layout, Row, Skeleton } from 'antd';
import { motion } from 'framer-motion';
import { values } from 'lodash-es';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { GetCode, GetSumScanDatal, type TotalSumScanDTO } from '@/api/auth';
import { useAuthStore } from '@/store/Auth';

import OldChart from './components/oldChart';
import PayChart from './components/payChart';
import TransferChart from './components/transferChart';
import { amountConfig, consumeConfig, deliveryConfig, errorConfig, outConfig } from './data';
import useStyles from './index.style';

const { Header, Content } = Layout;

const publicPath = import.meta.env.VITE_PUBLIC_PATH;
function Home() {
  const { styles } = useStyles();
  const [tatalData, setTatalData] = useState<TotalSumScanDTO>({});

  const [batchCodeList, setBatchCodeList] = useState<any>([]);

  const { userToken } = useAuthStore((state) => {
    return {
      userToken: state.userToken,
    };
  });

  const { data: batchCodes, run: getBatchCode } = useRequest(GetCode, {
    manual: true,
    onSuccess: (res) => {
      console.log(res?.data?.map((item) => values(item)));

      setBatchCodeList(res.data || {});
    },
  });

  const { data, run, loading } = useRequest(GetSumScanDatal, {
    manual: true,
    onSuccess: (res) => {
      setTatalData(res.resultData || {});
    },
  });

  useEffect(() => {
    if (userToken) {
      run();
      getBatchCode();
    }
  }, [userToken]);

  useEffect(() => {
    if (data) {
      outConfig.data = data?.outOrderList?.map((item) => {
        return values(item);
      });
    }
  }, [data]);

  const formatter = (value: number) => {
    const numbers = value.toString().split('').reverse();
    const segs = [];

    while (numbers.length) segs.push(numbers.splice(0, 3).join(''));

    return segs.join(',').split('').reverse().join('');
  };

  const config = useCallback(() => {
    return {
      number: [tatalData.totalCost || 0],
      content: '{nt}万',
      formatter,
      style: {
        fontSize: 34,
        stroke: '#00FFF3',
        lineWidth: 2,
        width: '300px',
        // shadowColor: '#00FFF3',
        // shadowOffsetX: 10,

        // stroke: [12, 34, 21, 0],
      },
    };
  }, [tatalData]);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        className={styles['home-header']}
        onClick={() => {
          if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
          } else if (document.exitFullscreen) {
            document.exitFullscreen();
          }
        }}
      >
        <Flex align='center' justify='space-around' style={{ width: '100%' }}>
          <div className={'home-header__title'}>仓储汇总大屏</div>
        </Flex>
      </Header>
      <Content className={styles['home-content']}>
        <div className='home-content_bg'></div>
        <Row gutter={16} style={{ flex: 'auto' }}>
          {/* 左侧 */}
          <Col className='gutter-row' span={6}>
            <BorderBox8 dur={10}>
              <div className='gutter-box'>
                {/* <Row gutter={16} style={{ height: '100%' }}>
                <Col span={24} style={{ height: '50%' }}> */}
                {/* <div className='card' style={{ height: '100%' }}>
                  <div className='card-title'>一码到底变更记录</div>
                  <ScrollBoard
                    config={{
                      ...consumeConfig,
                      data: batchCodeList?.map((item) => {
                        const { id, ...rest } = item;
                        return values(rest);
                      }),
                    }}
                    style={{ height: 'calc(100% - 50px' }}
                  />
                </div> */}
                <div className='card' style={{ height: '100%' }}>
                  <div className='card-title'>异常消耗情况</div>
                  <ScrollBoard
                    config={{
                      ...errorConfig,
                      data: tatalData?.orgTotalPriceList?.map((item) => {
                        const datas = values(item);
                        datas[1] = parseFloat(datas[1].toFixed(2));
                        datas[2] = parseFloat(datas[2].toFixed(2));
                        return datas;
                      }),
                    }}
                    style={{ height: 'calc( 100% - 50px)' }}
                  />
                </div>
                <div className='gutter-box'>
                  <div className='card'>
                    <div className='card-title'>实时库存</div>
                    <OldChart style={{ height: 'calc( 100% - 50px)' }} data={tatalData.materialSummaryList} />
                  </div>
                </div>
                {/* </Col> */}
                {/* <Col span={24} style={{ height: '50%' }}> */}
                {/* <div className='card' style={{ height: '100%' }}>
                  <div className='card-title'>矿资物资消耗排行</div>
                  <TransferChart style={{ height: 'calc(100% - 50px' }} />
                </div> */}
                {/* </Col>
              </Row> */}
              </div>
            </BorderBox8>
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
                            <div className='count'>{tatalData?.inOrderTotal || '-'}</div>
                            <div className='dec'>单日入库订单数</div>
                          </div>
                        </Col>
                        <Col span={12}>
                          <div className='box'>
                            <div className='count'>{tatalData?.inOrderNotTotal || '-'}</div>
                            <div className='dec'>未完成订单</div>
                          </div>
                        </Col>
                        <Col span={12}>
                          <div className='box'>
                            <div className='count'>
                              {(
                                tatalData?.inOrderTotal / (tatalData?.inOrderTotal + tatalData?.inOrderNotTotal) || 1
                              ).toFixed(2) * 100}
                              %
                            </div>
                            <div className='dec'>入库完成率</div>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                    <Col span={10} className='total-box'>
                      <div className='total'>{tatalData?.currentTotal}</div>
                      <div className='total-dec'>物资总价值</div>
                    </Col>
                    <Col span={7} style={{ padding: '24px 8px' }}>
                      <Row gutter={[24, 24]}>
                        <Col span={24}>
                          <div className='box'>
                            <div className='count'>{tatalData?.outOrderTotal || '-'}</div>
                            <div className='dec'>单日出库订单数</div>
                          </div>
                        </Col>
                        <Col span={12}>
                          <div className='box'>
                            <div className='count'>{tatalData?.outOrderNotTotal || '-'}</div>
                            <div className='dec'>未出订单</div>
                          </div>
                        </Col>
                        <Col span={12}>
                          <div className='box'>
                            <div className='count'>
                              {(
                                tatalData?.outOrderTotal / (tatalData?.outOrderTotal + tatalData?.outOrderNotTotal) || 1
                              ).toFixed(2) * 100}
                              %
                            </div>
                            <div className='dec'>出库完成率</div>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <div className='tip-box'>
                    <p className='tip'>今日消耗物资金额</p>
                    <DigitalFlop config={config()} style={{ width: '300px', height: '50px' }} />
                  </div>
                  <div className='tip-box' style={{ marginTop: 0 }}>
                    <Decoration6 color={['#66FFFF85', '#0066ff85']} style={{ width: '100%', height: '10px' }} />
                  </div>
                </div>
              </motion.div>
              <div className='buttom'>
                <Row gutter={16} style={{ flex: 'auto' }}>
                  <Col span={24} className='gutter-row'>
                    <BorderBox10>
                      <div className='gutter-box'>
                        <div className='card'>
                          <div className='card-title'>矿资物资消耗排行</div>
                          <TransferChart style={{ height: 'calc(100% - 50px' }} data={tatalData.outOrgTotal} />
                        </div>
                      </div>
                    </BorderBox10>
                    {/* <div className='card' style={{ height: '100%' }}>
                      <div className='card-title'>矿资物资消耗排行</div>
                      <TransferChart style={{ height: 'calc(100% - 50px' }} />
                    </div> */}
                  </Col>
                  {/* <Col className='gutter-row' span={12}>
                    <BorderBox10>
                      <div className='gutter-box'>
                        <div className='card'>
                          <div className='card-title'>出库订单统计</div>
                          {loading ? (
                            <Skeleton active />
                          ) : (
                            <ScrollBoard
                              config={{ ...outConfig, data: tatalData?.outOrderList?.map((item) => values(item)) }}
                              style={{ height: 'calc( 100% - 50px)' }}
                            />
                          )}
                        </div>
                      </div>
                    </BorderBox10>
                  </Col>
                  <Col className='gutter-row' span={12}>
                    <BorderBox10>
                      <div className='gutter-box'>
                        <div className='card'>
                          <div className='card-title'>实时库存</div>
                          <OldChart style={{ height: 'calc( 100% - 50px)' }} />
                        </div>
                      </div>
                    </BorderBox10>
                  </Col> */}
                </Row>
              </div>
            </Flex>
          </Col>
          {/* 右侧 */}
          <Col className='gutter-row' span={6}>
            <BorderBox8 dur={10} reverse>
              <div className='gutter-box'>
                <div className='card' style={{ height: '100%' }}>
                  <div className='card-title'>物资价值排行</div>
                  <ScrollBoard
                    config={{
                      ...errorConfig,
                      data: tatalData?.orgTotalPriceList?.map((item) => {
                        const datas = values(item);
                        datas[1] = parseFloat(datas[1].toFixed(2));
                        datas[2] = parseFloat(datas[2].toFixed(2));
                        return datas;
                      }),
                    }}
                    style={{ height: 'calc( 100% - 50px)' }}
                  />
                </div>
                <div className='card' style={{ height: '100%' }}>
                  <div className='card-title'>到货金额排行</div>
                  <PayChart style={{ height: 'calc( 100% - 50px)' }} data={tatalData?.supplierSummaryList} />
                  {/* <ScrollBoard config={{ ...amountConfig }} style={{ height: 'calc( 100% - 50px)' }} /> */}
                </div>
                <div className='card' style={{ height: '100%' }}>
                  <div className='card-title'>出库订单统计</div>
                  <ScrollBoard
                    config={{
                      ...outConfig,
                      data: tatalData?.outOrderList?.map((item) => {
                        const datas = values(item);
                        datas[3] = parseFloat((datas[2] / datas[1]).toFixed(2)) || 0;
                        return datas;
                      }),
                    }}
                    style={{ height: 'calc( 100% - 50px)' }}
                  />
                </div>
              </div>
            </BorderBox8>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

export default Home;
