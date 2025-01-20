import { useRequest } from 'ahooks';
import { Divider } from 'antd';
import { GSearchTable, type GSearchTableField } from 'gbeata';
import { useState } from 'react';

import useWarehouseOptions from '@/hooks/business/useWarehouseOptions';

import { GetDeptList, GetInventoryTotalCost, GetPageInventoryCostl, GetPageInventoryMonthlyCost } from '@/api/summary';

export default function Demo() {
  const { activeOrgCode } = useWarehouseOptions();
  const { data: deptList } = useRequest(GetDeptList, {
    defaultParams: [{ orgCode: activeOrgCode }],
  });

  const { data: sumData, run: countApi } = useRequest(GetInventoryTotalCost, {
    defaultParams: [{ orgCode: activeOrgCode }],
  });
  const { data: monthlyData, run: monthlyApi } = useRequest(GetPageInventoryMonthlyCost, {
    defaultParams: [{ orgCode: activeOrgCode }],
    manual: true,
  });

  // 维护一个当前展开行的key
  const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([]);

  const fields: Array<GSearchTableField> = [
    {
      title: '组织',
      key: 'orgName',
    },
    {
      title: '区队',
      key: 'deptName',
      sort: true,
      search: {
        type: 'select',
        options: deptList?.resultData?.map((item) => ({ label: item, value: item })),
        // onChange: (value, _) => {
        //   countApi({ orgCode: activeOrgCode, deptName: value });
        // },
      },
    },
    {
      title: '消耗物资金额',
      key: 'cost',
      render: (text, record) => {
        const { cost } = record;
        return `${(cost / 10000).toFixed(2)}万元`; // 转换成万元 保留两位小数
      },
    },
  ];

  const handleExpand = (expanded: boolean, record: any) => {
    if (expanded) {
      // 如果展开，则只保存当前行的 key
      setExpandedRowKeys([record.id]);
      monthlyApi({ orgCode: activeOrgCode, deptCode: record.deptCode });
    } else {
      // 如果收起，则清空 expandedRowKeys 数组
      setExpandedRowKeys([]);
    }
  };

  return (
    <GSearchTable
      api={GetPageInventoryCostl}
      extendSearchParams={{ orgCode: activeOrgCode || '' }}
      fields={fields}
      rowKey='id'
      onLoad={(res) => {
        countApi({ deptName: res.length === 1 ? res[0].deptName : '', orgCode: activeOrgCode });
      }}
      tableExtend={{
        expandable: {
          expandedRowRender: (record) => {
            return (
              <div>
                <p>月份统计</p>
                <div className='flex flex-col gap-2'>
                  {monthlyData?.resultData?.map((item) => (
                    <div key={item.month}>
                      <div className='flex items-center justify-between gap-2'>
                        <p>{item.month}</p>
                        <p>{(item.value / 10000).toFixed(2)}万元</p>
                      </div>
                      <Divider className='m-1' />
                    </div>
                  ))}
                </div>
              </div>
            );
          },
          onExpand: handleExpand,
          expandedRowKeys, // 只展开当前行
        },
      }}
      // title={<span>总金额: {sumData?.resultData ? `${(sumData.resultData / 10000).toFixed(2)}万元` : '-'}</span>}
      dialogFormExtend={{
        fields,
      }}
    />
  );
}
