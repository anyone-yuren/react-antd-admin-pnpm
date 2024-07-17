import { Col, Flex, Typography } from 'antd';
import { useTheme } from 'antd-style';
import classNames from 'classnames';
import { t } from 'i18next';
import { useEffect, useState, useCallback } from 'react';
import CountUp from 'react-countup';
import { useTranslation } from 'react-i18next';
import { BaseCard } from 'ui';
import { useRequest } from 'ahooks';
import { GetSumDatal } from '@/api/summary';
import useWarehouseOptions from '@/hooks/business/useWarehouseOptions';
import SvgIcon from '@/components/SvgIcon';

import ChartsCard from './ChartsCard';
import useStyles from './styles';

const { Text, Title } = Typography;

export const AnalyzeCard = () => {
  const { activeOrgCode } = useWarehouseOptions();
  const {
    data: sumData,
    error,
    loading: ajaxLoading,
  } = useRequest(() => {
    return GetSumDatal({ orgCode: activeOrgCode });
  });
  const { styles } = useStyles();
  const token = useTheme();

  const getSumDataByKey = useCallback(
    (key: keyof typeof sumData.resultData): number => {
      return sumData?.resultData?.[key] || 0;
    },
    [sumData],
  );

  return (
    <>
      <Col span={9}>
        <BaseCard loading={ajaxLoading}>
          <div className={classNames(styles.flex)}>
            <div className='card-left'>
              <Text strong>{t('入库总资产')}</Text>
              <Title className='count' level={5} style={{ margin: '8px 0' }}>
                <SvgIcon size={20} style={{ marginRight: '4px', color: token.colorPrimary }} name='solar'></SvgIcon>
                +2.6%
              </Title>
              <Title ellipsis level={2} style={{ margin: 0, maxWidth: '100%' }}>
                <CountUp start={0} end={getSumDataByKey('inTotal')} duration={3} />
              </Title>
            </div>
            <div className='card-right'>
              <Flex>
                <p>年入库资产：</p>
                <Text>{getSumDataByKey('inCurrentYear')}</Text>
              </Flex>
              <Flex>
                <p>月入库资产：</p>
                <Text>{getSumDataByKey('inCurrentMouth')}</Text>
              </Flex>
              <Flex>
                <p>日入库资产：</p>
                <Text>{getSumDataByKey('inCurrentDay')}</Text>
              </Flex>
            </div>
          </div>
        </BaseCard>
      </Col>
      <Col span={6}>
        <BaseCard loading={ajaxLoading}>
          <div className={classNames(styles.flex)}>
            <div className='card-left'>
              <Text strong>{t('当前总资产')}</Text>
              <Title className='count' level={5} style={{ margin: '8px 0' }}>
                <SvgIcon size={20} style={{ marginRight: '4px', color: token.colorPrimary }} name='solar'></SvgIcon>
                +5.6%
              </Title>
              <Title level={2} style={{ margin: 0, wordBreak: 'keep-all' }}>
                <CountUp start={0} end={getSumDataByKey('currentTotal')} duration={3} />
              </Title>
            </div>
          </div>
        </BaseCard>
      </Col>
      <Col span={9}>
        <BaseCard loading={ajaxLoading}>
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
              <Title ellipsis level={2} style={{ margin: 0 }}>
                <CountUp start={0} end={getSumDataByKey('outTotal')} duration={3} />
              </Title>
            </div>
            <div className='card-right'>
              <Flex>
                <p>年出库资产：</p>
                <Text>{getSumDataByKey('outCurrentYear')}</Text>
              </Flex>
              <Flex>
                <p>月出库资产：</p>
                <Text>{getSumDataByKey('outCurrentMouth')}</Text>
              </Flex>
              <Flex>
                <p>日出库资产：</p>
                <Text>{getSumDataByKey('outCurrentDay')}</Text>
              </Flex>
            </div>
          </div>
        </BaseCard>
      </Col>
    </>
  );
};
