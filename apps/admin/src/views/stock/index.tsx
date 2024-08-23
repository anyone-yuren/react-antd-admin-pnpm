import {
  GAction,
  GButton,
  GCtrl,
  GSearchTable,
  type GSearchTableField,
  type GTableCtrlField,
  type Record,
} from 'gbeata';
import { useState } from 'react';

import useWarehouseOptions from '@/hooks/business/useWarehouseOptions';

import { downloadFile } from '@/utils/download';

import { GetRealtimeInventories } from '@/api/summary';

import { listApi } from './api';

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

export default function Stock() {
  const [warehouseCode, setWarehouseCode] = useState('');
  const { activeOrgCode, warehouseOptions, orgOptions } = useWarehouseOptions();
  console.log(warehouseOptions);

  const fields: Array<GSearchTableField> = [
    {
      title: '组织',
      key: 'orgName',
    },
    {
      title: '仓库',
      key: 'warehouseName',
      search: false,
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
      title: '物料名称',
      key: 'materialName',
    },
    {
      title: '库位编码',
      key: 'locationCode',
      search: true,
    },
    {
      title: '型号',
      key: 'materialModel',
    },
    {
      title: '规格',
      key: 'materialSize',
    },
    {
      title: '数量',
      key: 'quantity',
    },
    {
      title: '供应商',
      key: 'supplierName',
    },
    {
      title: '收货日期',
      key: 'receivedDate',
    },
  ];

  const handleDownload = () => {
    let fileName = '全部';
    if (activeOrgCode && !warehouseCode) {
      fileName = orgOptions.find((item) => item.value === activeOrgCode)?.label;
    } else if (activeOrgCode && warehouseCode) {
      fileName = `${orgOptions.find((item) => item.value === activeOrgCode)?.label}-${warehouseOptions.find((item) => item.value === warehouseCode)?.label}`;
    }
    downloadFile({
      fileUrl: '/DataCenter/ExportRealtimeInventories',
      fileName: `${fileName}.xls`,
      // eslint-disable-next-line no-nested-ternary
      postData: { orgCode: activeOrgCode, warehouseCode: '' },
    });
  };
  return (
    <GSearchTable
      api={GetRealtimeInventories}
      extendSearchParams={{ orgCode: activeOrgCode }}
      fields={fields}
      rowKey='sort_id'
      dialogFormExtend={{
        fields,
      }}
      tableExtend={{
        bordered: true,
        scroll: { x: 1200 },
      }}
    >
      <GButton type='primary' onClick={handleDownload}>
        {'导出'}
      </GButton>
    </GSearchTable>
  );
}
