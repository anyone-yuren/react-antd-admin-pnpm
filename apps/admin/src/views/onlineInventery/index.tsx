import { GAction, GCtrl, GSearchTable, type GSearchTableField, type GTableCtrlField, type Record } from 'gbeata';
import { GetPageOnlineInventory } from '@/api/summary';

import { listApi } from './api';

const fields: Array<GSearchTableField> = [
  {
    title: '组织',
    key: 'orgName',
    search: true,
  },
  {
    title: '仓库',
    key: 'warehouseName',
    search: true,
  },
  {
    title: '物料名称',
    key: 'materialName',
    type: 'textarea',
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
  },
  {
    title: '入库时间',
    key: 'des4',
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

export default function Demo() {
  return (
    <GSearchTable
      api={GetPageOnlineInventory}
      // ctrl={ctrl}
      fields={fields}
      rowKey='sort_id'
      dialogFormExtend={{
        fields,
      }}
    ></GSearchTable>
  );
}
