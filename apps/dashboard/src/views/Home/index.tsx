import { BorderBox8, BorderBox10, Decoration6, DigitalFlop, ScrollBoard } from '@jiaminghi/data-view-react';
import { useRequest } from 'ahooks';
import { Col, Empty, Flex, Layout, Row, Skeleton } from 'antd';
import { motion } from 'framer-motion';
import { values } from 'lodash-es';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { GetCode, GetSumScanDatal, type TotalSumScanDTO } from '@/api/auth';
import { useAuthStore } from '@/store/Auth';

import OldChart from './components/oldChart';
import PayChart from './components/payChart';
import TransferChart from './components/transferChart';
import { amountConfig, consumeConfig, deliveryConfig, errorConfig, errorConfig1, outConfig } from './data';
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
      setBatchCodeList(res.data || {});
    },
  });

  const { data, run, loading } = useRequest(GetSumScanDatal, {
    manual: true,
    pollingInterval: 50000,
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
      number: [Math.round((tatalData?.totalCost / 10000) * 100) / 100 || 0],
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
                  {tatalData?.materialMonthlyChangeList ? (
                    <ScrollBoard
                      config={{
                        ...errorConfig1,
                        data: tatalData?.materialMonthlyChangeList?.map((item) => {
                          const datas = values(item);
                          datas[3] = `${Math.round((datas[3] * 100) / 100)} / ${Math.round((datas[4] * 100) / 100)}`;
                          datas[2] = `<div style="color:${datas[2] > 0 ? 'green' : 'red'};display: flex; align-items: center; gap: 4px"><span style="width:4px;height:4px;border-radius:50%;display:inline-block;background:${datas[2] > 0 ? 'green' : 'red'}"></span>${parseFloat((datas[2] * 100).toFixed(2))}%</div>`;
                          datas.pop();

                          // 去除datas最后一项
                          return datas;
                        }),
                      }}
                      style={{ height: 'calc( 100% - 50px)' }}
                    />
                  ) : (
                    <Skeleton active />
                  )}
                </div>
                <div className='gutter-box' style={{ padding: '0px' }}>
                  <div className='card'>
                    <div className='card-title'>物资累计领用金额（万）</div>
                    {tatalData.invoiceSupplierSummaryList ? (
                      <OldChart style={{ height: 'calc( 100% - 50px)' }} data={tatalData.invoiceSupplierSummaryList} />
                    ) : (
                      <Skeleton active />
                    )}
                  </div>
                </div>
                {/* </Col> */}
                {/* <Col span={24} style={{ height: '50%' }}> */}
                {/* <div className='card' style={{ height: '100%' }}>
                  <div className='card-title'>矿资物资消耗</div>
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
                                parseFloat((1 - tatalData?.inOrderNotTotal / tatalData?.inOrderTotal || 1).toFixed(2)) *
                                100
                              ).toFixed(0)}
                              %
                            </div>
                            <div className='dec'>入库完成率</div>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                    <Col span={10} className='total-box'>
                      <div className='total'>{Math.round(tatalData?.currentTotal / 10000)}</div>
                      <div className='total-dec'>物资总价值</div>
                      <p
                        style={{
                          color: '#fff',
                          margin: 0,
                          fontSize: '20px',
                        }}
                      >
                        （万）
                      </p>
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
                                parseFloat(
                                  (1 - tatalData?.outOrderNotTotal / tatalData?.outOrderTotal || 1).toFixed(2),
                                ) * 100
                              ).toFixed(0)}
                              %
                              {/* {(1 - tatalData?.outOrderNotTotal / tatalData?.outOrderTotal || 1).toFixed(2) * 100}% */}
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
                          <div className='card-title'>区队领用消耗</div>
                          {tatalData.outOrgTotal ? (
                            <TransferChart style={{ height: 'calc(100% - 50px' }} data={tatalData.outOrgTotal} />
                          ) : (
                            <Skeleton active />
                          )}
                        </div>
                      </div>
                    </BorderBox10>
                    {/* <div className='card' style={{ height: '100%' }}>
                      <div className='card-title'>矿资物资消耗</div>
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
                  <div className='card-title'>库存金额</div>
                  <ScrollBoard
                    config={{
                      ...errorConfig,
                      data: tatalData?.orgTotalPriceList?.map((item) => {
                        const datas = values(item);
                        datas[1] = `${Math.round((datas[1] / 10000) * 100) / 100}万元`;
                        datas[2] = parseFloat(datas[2].toFixed(2));
                        return datas.slice(0, -1);
                      }),
                    }}
                    style={{ height: 'calc( 100% - 50px)' }}
                  />
                </div>
                <div className='card' style={{ height: '100%' }}>
                  <div className='card-title'>供货商累计到货金额</div>
                  {tatalData?.supplierSummaryList ? (
                    <PayChart style={{ height: 'calc( 100% - 50px)' }} data={tatalData?.supplierSummaryList} />
                  ) : (
                    <Skeleton active />
                  )}
                  {/* <ScrollBoard config={{ ...amountConfig }} style={{ height: 'calc( 100% - 50px)' }} /> */}
                </div>
                <div className='card' style={{ height: '100%' }}>
                  <div className='card-title'>供货商库存金额</div>
                  <ScrollBoard
                    config={{
                      ...outConfig,
                      data: tatalData?.supplierInventoryList?.map((item) => {
                        const datas = values(item);
                        datas[1] = `${Math.round((datas[1] / 10000) * 100) / 100}万元`;
                        // datas[2] = `${parseFloat(datas[2].toFixed(2))}%`;
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
