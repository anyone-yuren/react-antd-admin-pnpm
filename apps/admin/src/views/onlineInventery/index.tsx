import { GAction, GCtrl, GSearchTable, type GSearchTableField, type GTableCtrlField, type Record } from 'gbeata';
import { GetPageOnlineInventory } from '@/api/summary';
import useWarehouseOptions from '@/hooks/business/useWarehouseOptions';

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

export default function Demo() {
  const { activeOrgCode, warehouseOptions } = useWarehouseOptions();
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
      title: '物料编码',
      key: 'materialCode',
      search: true,
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
      title: '批次',
      key: 'batchNumber',
      search: true,
    },
  ];
  return (
    <GSearchTable
      api={GetPageOnlineInventory}
      extendSearchParams={{ orgCode: activeOrgCode }}
      fields={fields}
      rowKey='sort_id'
      dialogFormExtend={{
        fields,
      }}
    ></GSearchTable>
  );
}
