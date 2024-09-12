import { GSearchTable, type GSearchTableField } from 'gbeata';

import useWarehouseOptions from '@/hooks/business/useWarehouseOptions';

import { GetPageInventoryPickl } from '@/api/summary';

import { listApi } from './api';

export default function Demo() {
  const { activeOrgCode, warehouseOptions } = useWarehouseOptions();
  const fields: Array<GSearchTableField> = [
    {
      title: '组织',
      key: 'orgName',
      width: 180,
    },
    {
      title: '领料仓库',
      key: 'warehouseName',
      width: 210,
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
      title: '领料单位',
      key: 'deptName',
      search: true,
      width: 200,
    },
    {
      title: '领料人',
      key: 'userName',
      search: true,
      width: 200,
    },
    {
      title: '物料名称',
      key: 'materialName',
      width: 200,
    },
    {
      title: '物料编号',
      key: 'materialCode',
      search: true,
      width: 200,
    },
    {
      title: '规格',
      key: 'materialSize',
      width: 200,
    },
    {
      title: '数量',
      key: 'quantity',
      width: 200,
    },
    {
      title: '领料日期',
      key: 'pickData',
      width: 220,
    },
    {
      title: '领料单号',
      key: 'invoiceCode',
      width: 240,
      search: true,
    },
  ];
  return (
    <GSearchTable
      api={GetPageInventoryPickl}
      // ctrl={ctrl}
      fields={fields}
      rowKey={(record: any) => {
        return record.userName + record.materialCode + record.quantity + Math.random();
      }}
      extendSearchParams={{ orgCode: activeOrgCode }}
      dialogFormExtend={{
        fields,
      }}
      tableExtend={{
        bordered: true,
        scroll: { x: 1200 },
      }}
    ></GSearchTable>
  );
}
