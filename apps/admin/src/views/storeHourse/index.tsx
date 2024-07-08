import { GAction, GCtrl, GSearchTable, type GSearchTableField, type GTableCtrlField } from 'gbeata';

import { getWarehouseList } from '@/api/warehouse';

const fields: Array<GSearchTableField> = [
  {
    title: '所属组织',
    key: 'orgName',
    sort: true,
    search: true,
    dialog: {
      required: true,
    },
  },
  {
    title: '仓库名称',
    key: 'warehouseName',
    search: true,
    dialog: {
      required: true,
    },
  },
  {
    title: '仓库编号',
    key: 'warehouseCode',
    dialog: true,
  },
];

export default function StoreHourse() {
  const ctrl: GTableCtrlField = {
    width: 200,
    render: (_, record: Record<string, any>) => (
      <GCtrl>
        <GAction record={record} action='view'>
          详情
        </GAction>
        <GAction record={record} action='update'>
          编辑
        </GAction>
        <GAction action='delete' color='error' record={record}>
          删除
        </GAction>
      </GCtrl>
    ),
  };
  return (
    <GSearchTable
      api={getWarehouseList}
      ctrl={ctrl}
      fields={fields}
      rowKey='sort_id'
      dialogFormExtend={{
        fields,
      }}
    >
      <GAction action='add'>新增</GAction>
    </GSearchTable>
  );
}
