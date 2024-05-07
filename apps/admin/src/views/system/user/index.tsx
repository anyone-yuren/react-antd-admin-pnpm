import { GAction, GCtrl, GSearchTable, type GSearchTableField, type GTableCtrlField } from 'gbeata';

import { listApi } from './api';

const fields: Array<GSearchTableField> = [
  {
    title: '用户名称',
    key: 'cn1',
    search: true,
    dialog: {
      required: true,
    },
  },
  {
    title: '所属组织',
    key: 'index',
    sort: true,
    search: true,
    dialog: {
      required: true,
    },
  },
  {
    title: '状态',
    key: 'index',
    sort: true,
    dialog: {
      required: true,
    },
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

export default function User() {
  return (
    <GSearchTable
      api={listApi}
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
