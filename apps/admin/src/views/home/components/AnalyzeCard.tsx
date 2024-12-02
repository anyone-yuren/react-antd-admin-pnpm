import { useRequest } from 'ahooks';
import { Col, Flex, Table, Typography } from 'antd';
import { useTheme } from 'antd-style';
import classNames from 'classnames';
import { t } from 'i18next';
import { cloneDeep } from 'lodash-es';
import { useCallback, useEffect, useMemo, useState } from 'react';
import CountUp from 'react-countup';
import { useTranslation } from 'react-i18next';
import { BaseCard } from 'ui';

import BaseCharts from '@/components/BaseChart';
import SvgIcon from '@/components/SvgIcon';

import useWarehouseOptions from '@/hooks/business/useWarehouseOptions';

import { GetSumDatal } from '@/api/summary';

import ChartsCard from './ChartsCard';
import useStyles from './styles';

const { Text, Title } = Typography;

export const AnalyzeCard = (props: any) => {
  // 将元转换为万并保留2位小数
  const convertToWan = (yuan: number) => {
    const num = Number(yuan);
    if (num === 0) return 0;
    if (num < 10000) return num;

    return (num / 10000).toFixed(2);
  };
  const { sumData, ajaxLoading, totalAmountSummary } = props;

  const sumData1 = cloneDeep(sumData);

  console.log(sumData1, '子');

  // const { activeOrgCode } = useWarehouseOptions();
  // const {
  //   data: sumData1,
  //   error,
  //   loading: ajaxLoading,
  // } = useRequest(() => {
  //   return GetSumDatal({ orgCode: activeOrgCode });
  // });
  const { styles } = useStyles();
  const token = useTheme();

  const getSumDataByKey = useCallback(
    (key: keyof typeof sumData1.resultData): number => {
      return ((sumData1?.resultData?.[key] || 0) / 10000).toFixed(2);
    },
    [sumData1],
  );

  const columns = [
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '年（万）',
      dataIndex: 'year',
      key: 'year',
    },
    {
      title: '月（万）',
      dataIndex: 'month',
      key: 'month',
    },
    {
      title: '日（万）',
      dataIndex: 'day',
      key: 'day',
    },
  ];

  const memoRender = useCallback(() => {
    if (!sumData1) {
      return {};
    }
    const { resultData = {} } = sumData1;
    const { receiptSummary = [], invoiceSummary = [] } = resultData;

    const receiptSummary1 = cloneDeep(receiptSummary);

    const invoiceSummary1 = cloneDeep(invoiceSummary);

    // 遍历receiptSummary将数据转换为万
    receiptSummary1.forEach((item: any) => {
      item.year = convertToWan(item.year);
      item.month = convertToWan(item.month);
      item.day = convertToWan(item.day);
    });

    // // 遍历invoiceSummary将数据转换为万
    invoiceSummary1.forEach((item: any) => {
      item.year = convertToWan(item.year);
      item.month = convertToWan(item.month);
      item.day = convertToWan(item.day);
    });

    // const arrayReceiptSummary = Object.keys(receiptSummary);
    const renderReceiptSummary = () => {
      return <Table size='small' pagination={false} dataSource={receiptSummary1} columns={columns} />;
    };
    const renderInvoiceSummary = () => {
      return <Table size='small' pagination={false} dataSource={invoiceSummary1} columns={columns} />;
    };
    return {
      renderReceiptSummary,
      renderInvoiceSummary,
    };
  }, [sumData1]);

  const totalOptions = useCallback(() => {
    if (!totalAmountSummary) {
      return {};
    }
    const { resultData = [] } = totalAmountSummary;
    // 获取数据中orgName的值和amountStr的值
    const orgNames = resultData.map((item: any) => item.orgName);
    const amountStrs = resultData.map((item: any) => convertToWan(item.amount));

    const option = {
      tooltip: {},
      legend: {
        data: [''],
      },
      grid: {
        top: '3%',
        left: '2%',
        right: '2%',
        bottom: '0%',
        containLabel: true,
      },
      xAxis: {
        data: orgNames,
        axisLabel: {
          interval: 0, // 显示所有标签
          rotate: 10, // 标签旋转45度，避免重叠
          formatter: (value: string) => (value.length > 8 ? `${value.slice(0, 10)}...` : value), // 可选：过长时截断
        },
      },
      yAxis: {},
      series: [
        {
          name: '金额',
          type: 'bar',
          data: amountStrs,
        },
      ],
    };
    return option;
  }, [totalAmountSummary]);

  return (
    <>
      <Col span={24}>
        <BaseCard loading={ajaxLoading}>
          <div className={classNames(styles.flex)}>
            <div className=' flex items-center gap-2'>
              <Text strong>{t('当前总金额')}:</Text>
              <Title level={3} style={{ margin: 0, wordBreak: 'keep-all' }}>
                {/* <CountUp start={0} end={getSumDataByKey('currentTotal')} duration={3} /> 万元 */}
                {getSumDataByKey('currentTotal')} 万元
              </Title>
            </div>
            <div>
              <BaseCharts option={totalOptions()} height={300} />
            </div>
          </div>
        </BaseCard>
      </Col>
      <Col span={12}>
        <BaseCard loading={ajaxLoading}>
          <div className={classNames(styles.flex)}>
            <div className='flex items-center gap-2'>
              <Text strong>{t('入库总金额')}:</Text>
              <Title ellipsis level={3} style={{ margin: 0, maxWidth: '100%' }}>
                {/* <CountUp start={0} end={getSumDataByKey('totalReceiptAmount')} duration={3} /> */}
                {getSumDataByKey('totalReceiptAmount')} 万元
              </Title>
            </div>
            <div>{sumData1 && memoRender()?.renderReceiptSummary()}</div>
          </div>
        </BaseCard>
      </Col>
      <Col span={12}>
        <BaseCard loading={ajaxLoading}>
          <div className={classNames(styles.flex)}>
            <div className='flex items-center gap-2'>
              <Text strong>{t('出库总金额')}:</Text>
              <Title ellipsis level={3} style={{ margin: 0 }}>
                {/* <CountUp start={0} end={getSumDataByKey('totalInvoiceAmount')} duration={3} /> */}
                {getSumDataByKey('currentTotal')} 万元
              </Title>
            </div>
            <div>{sumData1 && memoRender()?.renderInvoiceSummary()}</div>
          </div>
        </BaseCard>
      </Col>
    </>
  );
};
