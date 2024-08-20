import {
  GAction,
  GButton,
  GCtrl,
  GSearchTable,
  type GSearchTableField,
  type GTableCtrlField,
  type Record,
} from 'gbeata';

import useWarehouseOptions from '@/hooks/business/useWarehouseOptions';

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
  const { activeOrgCode, warehouseOptions } = useWarehouseOptions();
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
      search: true,
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
      title: '规格',
      key: 'materialModel',
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
    // download({
    //   fileUrl: '/Storage/ExportData',
    //   fileName: isAll
    //     ? `${selectedArea?.warehouseName}.xls`
    //     : `${
    //         selectedArea.warehouseInfoList.find((item) => item.warehouseCode === warehouseCode[1])?.warehouseName
    //       }.xls`,
    //   requestType: post,
    //   postData: { isAll },
    // });
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
