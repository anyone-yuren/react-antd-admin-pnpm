import { useRequest } from 'ahooks';
import { Badge, Divider } from 'antd';
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

import useWarehouseOptions from '@/hooks/business/useWarehouseOptions';

import { downloadFile } from '@/utils/download';

import { GetInventoryStatisticsByDate, GetNoChangeInventories } from '@/api/summary';

export default function Demo() {
  const { activeOrgCode, warehouseOptions, orgOptions } = useWarehouseOptions();
  const [warehouseCode, setWarehouseCode] = useState('');
  const [params, setParams] = useState({});
  const table = useRef(null);
  const [open, setOpen] = useState(false);
  const [activeOrg, setActiveOrg] = useState([]);
  const [countList, setCountList] = useState({});

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
    threeMonthsAgo: today.subtract(3, 'month').format('YYYY-MM-DD'),
    sixMonthsAgo: today.subtract(6, 'month').format('YYYY-MM-DD'),
    yearAgo: today.subtract(12, 'month').format('YYYY-MM-DD'),
    threeYearsAgo: today.subtract(36, 'month').format('YYYY-MM-DD'),
    fiveYearsAgo: today.subtract(60, 'month').format('YYYY-MM-DD'),
  };

  // 当前时间
  const currentDate = dayjs();

  // 颜色配置映射
  const colorConfig = [
    { rangeStart: dateRanges.sixMonthsAgo, rangeEnd: dateRanges.threeMonthsAgo, color: 'yellow' },
    { rangeStart: dateRanges.yearAgo, rangeEnd: dateRanges.sixMonthsAgo, color: 'red' },
    { rangeStart: dateRanges.threeYearsAgo, rangeEnd: dateRanges.yearAgo, color: 'purple' },
    { rangeStart: dateRanges.fiveYearsAgo, rangeEnd: dateRanges.threeYearsAgo, color: 'blue' },
    { rangeStart: '2000-01-01', rangeEnd: dateRanges.fiveYearsAgo, color: 'gray' },
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
      title: '固定时间',
      key: 'endDate',
      type: 'radio-group',
      table: false,
      search: true,
      options: [
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

  // const { data: countData } = useRequest(GetInventoryStatisticsByDate, {
  //   defaultParams: [{ orgCode: activeOrgCode }],
  // });
  const { data: countData, run: countApi } = useRequest(GetInventoryStatisticsByDate, {
    defaultParams: [{ orgCode: activeOrgCode }],
    manual: true,
  });

  useEffect(() => {
    // 默认行为或重定向逻辑
    countApi({});
    // window.location.href = '/login';
  }, []);

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
    // window.location.href = '/login';
  }, []);

  return (
    <>
      <GSearchTable
        api={GetNoChangeInventories}
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
              [dateRanges.threeMonthsAgo]: dateRanges.sixMonthsAgo,
              [dateRanges.sixMonthsAgo]: dateRanges.yearAgo,
              [dateRanges.yearAgo]: dateRanges.threeYearsAgo,
              [dateRanges.threeYearsAgo]: dateRanges.fiveYearsAgo,
              [dateRanges.fiveYearsAgo]: '2000-01-01',
            };
            res.query.beginDate = endDateMap[res.query.endDate];
            res.query.noChangeDate = res.query.endDate;
          }
          setParams(res);
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
        // title={
        //   <div className='flex flex-col'>
        //     超龄物资总数：
        //     <div className='flex'>
        //       <div className='flex items-center flex-wrap'>
        //         {countData?.resultData?.map((item) => {
        //           if (!item.count) return null;
        //           return (
        //             <>
        //               <div className='flex items-center'>
        //                 {item.date} : {item.count}条，总价值 : {(item.amount / 10000).toFixed(2)}万
        //               </div>
        //               <Divider type='vertical' />
        //             </>
        //           );
        //         })}
        //       </div>
        //     </div>
        //     <div>
        //       库龄图例：<Badge color='yellow' style={{ transform: 'scale(1.4)' }} text={<span></span>}></Badge>三月
        //       <Divider type='vertical' />
        //       <Badge color='red' style={{ transform: 'scale(1.4)' }} text={<span></span>}></Badge>半年
        //       <Divider type='vertical' />
        //       <Badge color='purple' style={{ transform: 'scale(1.4)' }} text={<span></span>}></Badge>一年
        //       <Divider type='vertical' />
        //       <Badge color='blue' style={{ transform: 'scale(1.4)' }} text={<span></span>}></Badge>三年
        //       <Divider type='vertical' />
        //       <Badge color='gray' style={{ transform: 'scale(1.4)' }} text={<span></span>}></Badge>五年
        //     </div>
        //   </div>
        // }
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
            required: true,
            options: orgOptions,

            onChange: async (value) => {
              // 将calue与ActiveOrg对比，获取不同的orgCode
              const added = difference(value, activeOrg);
              const removed = difference(activeOrg, value);

              setActiveOrg(value);
              if (added.length) {
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
              }
            },
          },
          {
            title: '固定时间',
            key: 'endDate',
            type: 'radio-group',
            options: [
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
      ></GDialogForm>
    </>
  );
}
