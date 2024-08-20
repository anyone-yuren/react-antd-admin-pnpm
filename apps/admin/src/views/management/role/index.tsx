import { GAction, GCtrl, GSearchTable, type GSearchTableField, type GTableCtrlField } from 'gbeata';

import { getRolePageList } from '@/api/auth';

import AuthAction from '../component/auth';
import { listApi } from '../data/api';

const fields: Array<GSearchTableField> = [
  {
    title: '角色名称',
    key: 'roleName',
    search: true,
    dialog: {
      required: true,
    },
  },
];
const ctrl: GTableCtrlField = {
  width: 120,
  render: (_, record) => (
    <GCtrl>
      {/* <AuthAction record={record}>授权</AuthAction> */}
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
      api={getRolePageList}
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
