import { GAction, GCtrl, GSearchTable, type GSearchTableField, type GTableCtrlField } from 'gbeata';

import AuthAction from '../components/auth';
import { listApi } from './api';

const fields: Array<GSearchTableField> = [
  {
    title: '角色名称',
    key: 'cn1',
    search: true,
    dialog: {
      required: true,
    },
  },
  {
    title: '状态',
    key: 'index',
    sort: true,
    type: 'radio-group',
    defaultValue: 1,
    options: [
      { label: '启用', value: 1 },
      { label: '禁用', value: 2 },
    ],
    dialog: {
      required: true,
    },
  },
];
const ctrl: GTableCtrlField = {
  width: 200,
  render: (_, record) => (
    <GCtrl>
      <AuthAction record={record}>授权</AuthAction>
      <GAction record={record} action='update'>
        编辑
      </GAction>
      <GAction record={record} danger action='delete'>
        删除
      </GAction>
    </GCtrl>
  ),
};

export default function Role() {
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
