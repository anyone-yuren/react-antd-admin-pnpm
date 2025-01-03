import { useRequest } from 'ahooks';
import { Badge, Divider } from 'antd';
import classNames from 'classnames';
import dayjs from 'dayjs';
import {
  GAction,
  GButton,
  GCtrl,
  GDialogForm,
  GField,
  GFields,
  GSearchTable,
  type GSearchTableField,
  type GTableCtrlField,
  type Record,
} from 'gbeata';
import { difference } from 'ramda';
import { useEffect, useMemo, useRef, useState } from 'react';

import BaseCharts from '@/components/BaseChart';
import Loading from '@/components/LazyLoad/src/Loading';

import useWarehouseOptions from '@/hooks/business/useWarehouseOptions';

import { downloadFile } from '@/utils/download';

import { GetInventoryStatisticsByDate, GetPageInventoryYear } from '@/api/summary';

export default function Demo() {
  const { activeOrgCode, warehouseOptions, orgOptions } = useWarehouseOptions();
  const [warehouseCode, setWarehouseCode] = useState('');
  const [params, setParams] = useState({});
  const table = useRef(null);
  const [open, setOpen] = useState(false);
  const [activeOrg, setActiveOrg] = useState([]);
  const [countList, setCountList] = useState({});

  const [initialValues, setInitialValues] = useState({});

  const renderCounts = useMemo(() => {
    return Object.keys(countList).map((key) => {
      return (
        <div className='flex gap-2' key={key}>
          <div className='w-100'>{orgOptions.find((item) => item.key === key)?.label}</div>
          <div className='flex flex-1 items-center flex-wrap'>
            {countList[key]?.map((item) => {
              return (
                <>
                  <div className='flex items-center'>
                    {item.date} : {item.count}条，总价值 : {(item.amount / 10000).toFixed(2)}万
                  </div>
                  <Divider type='vertical' />
                </>
              );
            })}
          </div>
        </div>
      );
    });
  }, [countList]);

  // 获取日期相关数据
  const today = dayjs();
  const dateRanges = {
    // 三个月内
    today: today.format('YYYY-MM-DD'),
    threeMonthsAgo: today.subtract(3, 'month').format('YYYY-MM-DD'),
    sixMonthsAgo: today.subtract(6, 'month').format('YYYY-MM-DD'),
    yearAgo: today.subtract(12, 'month').format('YYYY-MM-DD'),
    threeYearsAgo: today.subtract(36, 'month').format('YYYY-MM-DD'),
    fiveYearsAgo: today.subtract(60, 'month').format('YYYY-MM-DD'),
  };

  // 当前时间
  const currentDate = dayjs();
  // const colors = ['#00a5a7', '#00a72d', '#a7a400', '#d8d400', '#ff6802', '#ce0000'];
  // 颜色配置映射
  const colorConfig = [
    { rangeStart: dateRanges.sixMonthsAgo, rangeEnd: dateRanges.threeMonthsAgo, color: '#00a72d' },
    { rangeStart: dateRanges.yearAgo, rangeEnd: dateRanges.sixMonthsAgo, color: '#a7a400' },
    { rangeStart: dateRanges.threeYearsAgo, rangeEnd: dateRanges.yearAgo, color: '#d8d400' },
    { rangeStart: dateRanges.fiveYearsAgo, rangeEnd: dateRanges.threeYearsAgo, color: '#ff6802' },
    { rangeStart: '2000-01-01', rangeEnd: dateRanges.fiveYearsAgo, color: '#ce0000' },
  ];

  // 提取颜色逻辑为函数
  const getColorForDate = (parsedDate) => {
    const matchingColor = colorConfig.find(({ rangeStart, rangeEnd }) => {
      return parsedDate.isBefore(rangeEnd) && (parsedDate.isAfter(rangeStart) || parsedDate.isSame(rangeStart));
    });
    return matchingColor ? matchingColor.color : '';
  };

  const fields: Array<GSearchTableField> = [
    {
      title: '物料名称',
      key: 'materialName',
      align: 'left',
      render: (text, record) => {
        const { receivingData } = record;
        const parsedEntryDate = dayjs(receivingData);
        const color = getColorForDate(parsedEntryDate);
        return (
          <span>
            {color && <Badge color={color} style={{ marginRight: 5, transform: 'scale(1.4)' }} />}
            {text}
          </span>
        );
      },
    },
    {
      title: '组织',
      key: 'orgName',
    },
    {
      title: '仓库',
      key: 'warehouseName',
    },

    {
      title: '时间段',
      key: 'date-range',
      type: 'date-range',
      search: {
        startKey: 'dateRangeStart',
        endKey: 'dateRangeEnd',
      },
      table: false,
    },
    {
      title: '固定时间',
      key: 'endDate',
      type: 'radio-group',
      table: false,
      search: true,
      options: [
        { label: '三个月内', value: dateRanges.today },
        { label: '三个月', value: dateRanges.threeMonthsAgo },
        { label: '半年', value: dateRanges.sixMonthsAgo },
        { label: '一年', value: dateRanges.yearAgo },
        { label: '三年', value: dateRanges.threeYearsAgo },
        { label: '五年', value: dateRanges.fiveYearsAgo },
      ],
    },
    {
      title: '仓库',
      key: 'warehouseCode',
      type: 'select-search',
      options: warehouseOptions,
      search: {
        onChange: (value) => setWarehouseCode(value),
      },
      table: false,
    },
    {
      title: '物料编号',
      key: 'materialCode',
      search: true,
    },
    {
      title: '规格',
      key: 'materialSize',
    },
    {
      title: '批次号',
      key: 'batchNumber',
      search: true,
    },
    {
      title: '库存数量',
      key: 'quantity',
    },
    {
      title: '入库时间',
      key: 'receivingData',
    },
    {
      title: '入库天数',
      key: 'inventoryYear',
      render: (text) => <span>{`${text} /天`}</span>,
    },
  ];

  const ctrl: GTableCtrlField = {
    render: (_, record) => (
      <GCtrl>
        <GAction record={record} action='view'>
          详情
        </GAction>
        <GAction record={record} action='update'>
          编辑
        </GAction>
      </GCtrl>
    ),
  };

  const {
    data: countData,
    run: countApi,
    loading: countLoading,
  } = useRequest(GetInventoryStatisticsByDate, {
    defaultParams: [{ orgCode: activeOrgCode }],
    manual: true,
  });

  const handleDownload = async (obj) => {
    const orgLabel = orgOptions
      .filter((item) => obj?.orgCode?.includes(item.value))
      .map((item) => {
        return item.label;
      });

    await downloadFile({
      fileUrl: '/Summary/ExportInventoryYear',
      fileName: `${orgLabel.join('-')}.xls`,
      // fileName: `汇总.xls`,
      postData: {
        // orgCode: activeOrgCode,
        orgCodes: obj.orgCode,
        warehouseCode: '',
        beginDate: obj?.beginDate,
        endDate: obj?.endDate,
      },
    });
    setOpen(false);
  };

  useEffect(() => {
    // 默认行为或重定向逻辑
    countApi({ orgCode: activeOrgCode });
    // window.location.href = '/login';
  }, []);

  const renderChart = useMemo(() => {
    const data = countData?.resultData;

    // 处理饼图数据
    const countDataPie = data?.map((item) => ({
      name: item.date,
      value: item.count,
    }));
    const amountDataPie = data?.map((item) => ({
      name: item.date,
      value: (item.amount / 10000).toFixed(2),
    }));

    // 配置数量饼图
    const countOption = {
      title: {
        text: '超龄条数分布',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)',
      },
      legend: {
        top: '10%',
        left: 'center',
      },
      series: [
        {
          name: '条数',
          type: 'pie',
          radius: '50%',
          data: countDataPie,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
          itemStyle: {
            color: (params) => {
              const colors = ['#00a5a7', '#00a72d', '#a7a400', '#d8d400', '#ff6802', '#ce0000'];
              return colors[params.dataIndex % colors.length];
            },
          },
        },
      ],
    };

    // 配置金额饼图
    const amountOption = {
      title: {
        text: '超龄价值分布',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} 万 ({d}%)',
      },
      legend: {
        top: '10%',
        left: 'center',
      },
      series: [
        {
          name: '价值',
          type: 'pie',
          radius: '50%',
          data: amountDataPie,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
          itemStyle: {
            color: (params) => {
              const colors = ['#00a5a7', '#00a72d', '#a7a400', '#d8d400', '#ff6802', '#ce0000'];
              return colors[params.dataIndex % colors.length];
            },
          },
        },
      ],
    };

    return (
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div className='w-1/2'>
          <BaseCharts option={countOption} height={300} />
        </div>
        <div className='w-1/2'>
          <BaseCharts option={amountOption} height={300} />
        </div>
      </div>
    );
  }, [countData]);

  return (
    <>
      <GSearchTable
        api={GetPageInventoryYear}
        fields={fields}
        ref={table}
        rowKey='sort_id'
        beforeSearch={(res) => {
          // 日期范围逻辑调整
          if (res.query.dateRangeStart && !res.query.endDate) {
            res.query.beginDate = res.query.dateRangeStart;
            res.query.endDate = res.query.dateRangeEnd;
          } else if (res.query.endDate) {
            const endDateMap = {
              [dateRanges.today]: dateRanges.threeMonthsAgo,
              [dateRanges.threeMonthsAgo]: dateRanges.sixMonthsAgo,
              [dateRanges.sixMonthsAgo]: dateRanges.yearAgo,
              [dateRanges.yearAgo]: dateRanges.threeYearsAgo,
              [dateRanges.threeYearsAgo]: dateRanges.fiveYearsAgo,
              [dateRanges.fiveYearsAgo]: '2000-01-01',
            };
            res.query.beginDate = endDateMap[res.query.endDate];
          }
          setParams(res);
          countApi({
            endDate: res.query.endDate,
            beginDate: res.query.beginDate,
            orgCode: activeOrgCode,
            warehouseCode,
          });
          return res;
        }}
        tableExtend={{
          rowClassName: (record) => {
            const { receivingData } = record;
            const parsedEntryDate = dayjs(receivingData);
            const color = getColorForDate(parsedEntryDate);
            return color ? `bg-${color}-100` : '';
          },
          bordered: true,
          scroll: { x: 1200 },
        }}
        onParamsChange={(params) => {}}
        extendSearchParams={{ orgCode: activeOrgCode }}
        dialogFormExtend={{
          fields,
        }}
        onLoad={(res) => {
          // countApi({ orgCode: activeOrgCode, ...params.query });
        }}
        tableHeader={<div>{countLoading ? <Loading /> : renderChart}</div>}
      >
        {/* <GButton type='primary' onClick={handleDownload}>
          导出
        </GButton> */}
        <GButton type='primary' onClick={() => setOpen(true)}>
          导出
        </GButton>
        <GAction type='primary' tableFooterExtraOnly onClick={() => {}}>
          {'批量激活'}
        </GAction>
      </GSearchTable>
      <GDialogForm
        open={open}
        width={'70%'}
        mode='add'
        onClose={() => setOpen(false)}
        title='导出'
        addApi={handleDownload}
        onCancel={() => {
          setCountList({});
        }}
        beforeSubmit={(res: any) => {
          if (res.dateRangeStart && !res.endDate) {
            res.beginDate = res.dateRangeStart;
            res.endDate = res.dateRangeEnd;
          } else if (res.endDate) {
            const endDateMap = {
              [dateRanges.today]: dateRanges.threeMonthsAgo,
              [dateRanges.threeMonthsAgo]: dateRanges.sixMonthsAgo,
              [dateRanges.sixMonthsAgo]: dateRanges.yearAgo,
              [dateRanges.yearAgo]: dateRanges.threeYearsAgo,
              [dateRanges.threeYearsAgo]: dateRanges.fiveYearsAgo,
              [dateRanges.fiveYearsAgo]: '2000-01-01',
            };
            res.beginDate = endDateMap[res.endDate];
          }
          setParams(res);
          return res;
        }}
        fields={[
          {
            title: '组织',
            key: 'orgCode',
            type: 'checkbox-group',
            style: {
              marginTop: '5px',
            },
            required: true,
            options: orgOptions,

            onChange: async (value) => {
              // 将calue与ActiveOrg对比，获取不同的orgCode
              const added = difference(value, activeOrg);
              const removed = difference(activeOrg, value);

              setActiveOrg(value);
              if (added.length) {
                setInitialValues({
                  ...initialValues,
                  orgCode: value,
                });
                // 添加
                const res = await GetInventoryStatisticsByDate({ orgCode: added[0] });
                setCountList({ ...countList, [added[0]]: res?.resultData });
              }
              if (removed.length) {
                // 从countList删除
                setCountList((prev) => {
                  const newData = { ...prev };
                  removed.forEach((org) => {
                    delete newData[org];
                  });
                  return newData;
                });
                setInitialValues({
                  ...initialValues,
                  orgCode: value,
                  remember: false,
                });
              }
            },
          },
          {
            type: 'checkbox',
            key: 'remember',
            style: {
              marginLeft: 120,
            },
            onChange: async (value) => {
              if (typeof value === 'boolean') {
                if (value) {
                  const allOrgs = orgOptions.map((item) => item.key);
                  setInitialValues({
                    ...initialValues,
                    remember: true,
                    orgCode: allOrgs,
                  });
                  // 比较全选数据与activeOrg差异，循环请求
                  const added = difference(allOrgs, activeOrg);
                  const promises = added.map(async (org) => {
                    const result = await GetInventoryStatisticsByDate({ orgCode: org });
                    return { [org]: result?.resultData };
                  });
                  const results = await Promise.all(promises);
                  setCountList({ ...countList, ...results.reduce((acc, cur) => ({ ...acc, ...cur }), {}) });
                } else {
                  setInitialValues({
                    ...initialValues,
                    remember: false,
                    orgCode: [],
                  });
                  setActiveOrg([]);
                  setCountList({});
                }
              }
            },
            children: '全选',
          },
          {
            title: '时间段',
            key: 'date-range',
            type: 'date-range',
            startKey: 'dateRangeStart',
            endKey: 'dateRangeEnd',
          },
          {
            title: '固定时间',
            key: 'endDate',
            type: 'radio-group',
            options: [
              { label: '三个月内', value: dateRanges.today },
              { label: '三个月', value: dateRanges.threeMonthsAgo },
              { label: '半年', value: dateRanges.sixMonthsAgo },
              { label: '一年', value: dateRanges.yearAgo },
              { label: '三年', value: dateRanges.threeYearsAgo },
              { label: '五年', value: dateRanges.fiveYearsAgo },
            ],
          },
          {
            title: '超龄汇总',
            type: 'custom',
            renderContent: () => <div>{renderCounts}</div>,
          },
        ]}
        initialValues={initialValues}
        dialogExtend={{
          classNames: {
            body: 'h-[400px] overflow-y-auto',
          },
        }}
      ></GDialogForm>
    </>
  );
}
