import { useRequest } from 'ahooks';
import { Badge, Divider } from 'antd';
import dayjs from 'dayjs';
import {
  GAction,
  GButton,
  GCtrl,
  GSearchTable,
  type GSearchTableField,
  type GTableCtrlField,
  type Record,
} from 'gbeata';
import { useEffect, useMemo, useRef, useState } from 'react';

import useWarehouseOptions from '@/hooks/business/useWarehouseOptions';

import { downloadFile } from '@/utils/download';

import { GetInventoryStatisticsByDate, GetPageInventoryYear } from '@/api/summary';

export default function Demo() {
  const { activeOrgCode, warehouseOptions, orgOptions } = useWarehouseOptions();
  const [warehouseCode, setWarehouseCode] = useState('');
  const [params, setParams] = useState({});
  const table = useRef(null);
  // 根据day.js 获取今天往前3个月的日期和半年的日期
  // 获取今天往前3个月的日期
  const today = dayjs();
  const threeMonthsAgo = today.subtract(3, 'month').format('YYYY-MM-DD');

  // 获取今天往前半年的日期
  const sixMonthsAgo = today.subtract(6, 'month').format('YYYY-MM-DD');

  // 获取今天往前一年的日期
  const yearAgo = today.subtract(12, 'month').format('YYYY-MM-DD');

  // 获取今天往前三年的日期
  const threeYearsAgo = today.subtract(36, 'month').format('YYYY-MM-DD');

  // 获取今天往前五年的日期
  const fiveYearsAgo = today.subtract(60, 'month').format('YYYY-MM-DD');

  // 当前时间
  const currentDate = dayjs();
  const fields: Array<GSearchTableField> = [
    {
      title: '物料名称',
      key: 'materialName',
      align: 'left',
      render: (text, record, index) => {
        const { receivingData } = record;
        const parsedEntryDate = dayjs(receivingData);
        const mouth = currentDate.diff(parsedEntryDate, 'month');
        let color;

        if (mouth >= 3 && mouth < 6) {
          color = 'yellow';
        } else if (mouth >= 6 && mouth < 12) {
          color = 'red';
        } else if (mouth >= 12 && mouth < 36) {
          color = 'purple';
        } else if (mouth >= 36 && mouth < 60) {
          color = 'blue';
        } else if (mouth >= 60) {
          color = 'gray';
        } else {
          color = '';
        }
        return (
          <span>
            {color ? <Badge color={color} style={{ marginRight: 5, transform: 'scale(1.4)' }} /> : null}
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
        // defaultValue: [dayjs(), dayjs()],
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
        { label: '3个月', value: threeMonthsAgo },
        { label: '半年', value: sixMonthsAgo },
        { label: '一年', value: yearAgo },
        { label: '三年', value: threeYearsAgo },
        { label: '五年', value: fiveYearsAgo },
      ],
    },
    {
      title: '仓库',
      key: 'warehouseCode',
      type: 'select-search',
      options: warehouseOptions,
      search: {
        onChange: (value, _) => {
          setWarehouseCode(value);
        },
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
      title: '当前库龄',
      key: 'inventoryYear',
      render: (text, record, index) => <span>{`${text} /天`}</span>,
    },
  ];

  const ctrl: GTableCtrlField = {
    render: (_, record: Record) => (
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

  const { data: countData, run: countApi } = useRequest(GetInventoryStatisticsByDate, {
    defaultParams: [{ orgCode: activeOrgCode }],
  });

  const handleDownload = () => {
    let fileName = '全部';
    if (activeOrgCode && !warehouseCode) {
      fileName = orgOptions.find((item) => item.value === activeOrgCode)?.label;
    } else if (activeOrgCode && warehouseCode) {
      fileName = `${orgOptions.find((item) => item.value === activeOrgCode)?.label}-${warehouseOptions.find((item) => item.value === warehouseCode)?.label}`;
    }
    downloadFile({
      fileUrl: '/Summary/ExportInventoryYear',
      fileName: `${fileName}.xls`,
      // eslint-disable-next-line no-nested-ternary
      postData: { orgCode: activeOrgCode, warehouseCode: '' },
    });
  };

  useEffect(() => {
    // window.location.href = '/login';
  }, []);

  return (
    <GSearchTable
      api={GetPageInventoryYear}
      fields={fields}
      ref={table}
      rowKey='sort_id'
      beforeSearch={(res) => {
        if (res.query.dateRangeStart && !res.query.endDate) {
          res.query.beginDate = res.query.dateRangeStart;
          res.query.endDate = res.query.dateRangeEnd;
        } else if (res.query.endDate) {
          if (res.query.endDate === threeMonthsAgo) {
            res.query.beginDate = sixMonthsAgo;
          } else if (res.query.endDate === sixMonthsAgo) {
            res.query.beginDate = yearAgo;
          } else if (res.query.endDate === yearAgo) {
            res.query.beginDate = threeYearsAgo;
          } else if (res.query.endDate === threeYearsAgo) {
            res.query.beginDate = fiveYearsAgo;
          } else if (res.query.endDate === fiveYearsAgo) {
            res.query.beginDate = '2000-01-01';
          }
        }
        setParams(res);
        return res;
      }}
      tableExtend={{
        rowClassName: (record) => {
          const { receivingData } = record;
          const parsedEntryDate = dayjs(receivingData);
          const mouth = currentDate.diff(parsedEntryDate, 'month');
          if (mouth >= 3 && mouth < 6) {
            return 'bg-yellow-100';
          }
          if (mouth >= 6 && mouth < 12) {
            return 'bg-red-100';
          }
          if (mouth >= 12 && mouth < 36) {
            return 'bg-purple-100';
          }
          if (mouth >= 36 && mouth < 60) {
            // 灰色
            return 'bg-blue-100';
          }
          if (mouth >= 60) {
            // 灰色
            return 'bg-gray-100';
          }
          return '';
        },
      }}
      onParamsChange={(params) => {}}
      extendSearchParams={{ orgCode: activeOrgCode }}
      dialogFormExtend={{
        fields,
      }}
      onLoad={(res) => {
        countApi({ orgCode: activeOrgCode, ...params.query });
      }}
      title={
        <div className='flex flex-col'>
          <div className='flex'>
            统计数据：
            <div className='flex items-center'>
              {countData?.resultData?.map((item) => {
                if (!item.count) return null;
                return (
                  <>
                    <div className='flex items-center'>
                      {item.date} : {(item.count / 10000).toFixed(2)} 万元
                    </div>
                    <Divider type='vertical' />
                  </>
                );
              })}
            </div>
          </div>
          <div>
            库龄图例：<Badge color='yellow' style={{ transform: 'scale(1.4)' }} text={<span></span>}></Badge>三月
            <Divider type='vertical' />
            <Badge color='red' style={{ transform: 'scale(1.4)' }} text={<span></span>}></Badge>半年
            <Divider type='vertical' />
            <Badge color='purple' style={{ transform: 'scale(1.4)' }} text={<span></span>}></Badge>一年
            <Divider type='vertical' />
            <Badge color='blue' style={{ transform: 'scale(1.4)' }} text={<span></span>}></Badge>三年
            <Divider type='vertical' />
            <Badge color='gray' style={{ transform: 'scale(1.4)' }} text={<span></span>}></Badge>五年
          </div>
        </div>
      }
    >
      <GButton type='primary' onClick={handleDownload}>
        {'导出'}
      </GButton>
    </GSearchTable>
  );
}
