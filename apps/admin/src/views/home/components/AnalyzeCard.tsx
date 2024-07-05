import { Col, Flex, Typography } from 'antd';
import { useTheme } from 'antd-style';
import classNames from 'classnames';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { useTranslation } from 'react-i18next';
import { BaseCard } from 'ui';

import SvgIcon from '@/components/SvgIcon';

import ChartsCard from './ChartsCard';
import useStyles from './styles';

const { Text, Title } = Typography;

export const AnalyzeCard = () => {
  const { styles } = useStyles();
  const token = useTheme();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);
  return (
    <>
      <Col span={8}>
        <BaseCard loading={loading}>
          <div className={classNames(styles.flex)}>
            <div className='card-left'>
              <Text strong>{t('入库总资产')}</Text>
              <Title className='count' level={5} style={{ margin: '8px 0' }}>
                <SvgIcon size={20} style={{ marginRight: '4px', color: token.colorPrimary }} name='solar'></SvgIcon>
                +2.6%
              </Title>
              <Title level={2} style={{ margin: 0 }}>
                <CountUp start={0} end={122} duration={3} />
              </Title>
            </div>
            <div className='card-right'>
              {/* <ChartsCard
                loading={loading}
                options={{
                  tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                      type: 'shadow',
                    },
                  },
                  grid: {
                    left: '30%',
                    right: '0%',
                    bottom: '0%',
                    top: '40%',
                    containLabel: true,
                  },
                  xAxis: [
                    {
                      show: false,
                      type: 'category',
                      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    },
                  ],

                  yAxis: [
                    {
                      show: false,
                      type: 'value',
                    },
                  ],

                  series: [
                    {
                      name: 'Direct',
                      type: 'bar',
                      barWidth: '40%',
                      itemStyle: {
                        color: token.colorPrimary,
                      },
                      data: [10, 52, 200, 334, 390, 330, 220],
                    },
                  ],
                }}
              ></ChartsCard> */}
              <Flex>
                <p>年入库资产：</p>
                <Text>14.4万</Text>
              </Flex>
              <Flex>
                <p>月入库资产：</p>
                <Text>4.4万</Text>
              </Flex>
              <Flex>
                <p>日入库资产：</p>
                <Text>0.4万</Text>
              </Flex>
            </div>
          </div>
        </BaseCard>
      </Col>
      <Col span={8}>
        <BaseCard loading={loading}>
          <div className={classNames(styles.flex)}>
            <div className='card-left'>
              <Text strong>{t('出库总资产')}</Text>
              <Title className='count' level={5} style={{ margin: '8px 0' }}>
                <SvgIcon
                  size={20}
                  style={{ marginRight: '4px', color: token.colorError, transform: 'rotate(180deg)' }}
                  name='solar'
                ></SvgIcon>
                -2.6%
              </Title>
              <Title level={2} style={{ margin: 0 }}>
                <CountUp start={0} end={1322} duration={3} />
              </Title>
            </div>
            <div className='card-right'>
              <Flex>
                <p>年出库资产：</p>
                <Text>14.4万</Text>
              </Flex>
              <Flex>
                <p>月出库资产：</p>
                <Text>4.4万</Text>
              </Flex>
              <Flex>
                <p>日出库资产：</p>
                <Text>0.4万</Text>
              </Flex>
              {/* <ChartsCard
                loading={loading}
                options={{
                  tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                      type: 'shadow',
                    },
                  },
                  grid: {
                    left: '30%',
                    right: '0%',
                    bottom: '0%',
                    top: '40%',
                    containLabel: true,
                  },
                  xAxis: [
                    {
                      show: false,
                      type: 'category',
                      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    },
                  ],

                  yAxis: [
                    {
                      show: false,
                      type: 'value',
                    },
                  ],

                  series: [
                    {
                      name: 'Direct',
                      type: 'bar',
                      barWidth: '40%',
                      itemStyle: {
                        color: token.colorPrimary,
                      },
                      data: [200, 334, 390, 30, 120, 132, 220],
                    },
                  ],
                }}
              ></ChartsCard> */}
            </div>
          </div>
        </BaseCard>
      </Col>
      <Col span={8}>
        <BaseCard loading={loading}>
          <div className={classNames(styles.flex)}>
            <div className='card-left'>
              <Text strong>{t('当前总资产')}</Text>
              <Title className='count' level={5} style={{ margin: '8px 0' }}>
                <SvgIcon size={20} style={{ marginRight: '4px', color: token.colorPrimary }} name='solar'></SvgIcon>
                +5.6%
              </Title>
              <Title level={2} style={{ margin: 0 }}>
                <CountUp start={0} end={12322} duration={3} />
              </Title>
            </div>
            <div className='card-right'>
              <ChartsCard
                loading={loading}
                options={{
                  tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                      type: 'shadow',
                    },
                  },
                  grid: {
                    left: '30%',
                    right: '0%',
                    bottom: '0%',
                    top: '40%',
                    containLabel: true,
                  },
                  xAxis: [
                    {
                      show: false,
                      type: 'category',
                      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    },
                  ],

                  yAxis: [
                    {
                      show: false,
                      type: 'value',
                    },
                  ],

                  series: [
                    {
                      name: 'Direct',
                      type: 'bar',
                      barWidth: '40%',
                      itemStyle: {
                        color: token.colorPrimary,
                      },
                      data: [10, 52, 100, 34, 90, 100, 120],
                    },
                  ],
                }}
              ></ChartsCard>
            </div>
          </div>
        </BaseCard>
      </Col>
    </>
  );
};
