import { GAction, GCtrl, GSearchTable, type GSearchTableField, type GTableCtrlField, type Record } from 'gbeata';
import { GetPageInventoryYear } from '@/api/summary';

import { listApi } from './api';

const fields: Array<GSearchTableField> = [
  {
    title: '组织',
    key: 'orgCode',
    search: true,
    dialog: {
      required: true,
    },
  },
  {
    title: '仓库',
    key: 'warehouseCode',
    sort: true,
    search: true,
    dialog: {
      required: true,
    },
  },
  {
    title: '物料编号',
    key: 'materialCode',
    type: 'textarea',
    dialog: true,
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
      api={GetPageInventoryYear}
      // ctrl={ctrl}
      fields={fields}
      rowKey='sort_id'
      dialogFormExtend={{
        fields,
      }}
    ></GSearchTable>
  );
}
