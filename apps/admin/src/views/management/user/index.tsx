import { GAction, GCtrl, GSearchTable, type GSearchTableField, type GTableCtrlField } from 'gbeata';

import { getUserList } from '@/api/auth';

import AuthAction from '../component/auth';

const fields: Array<GSearchTableField> = [
  {
    title: '用户名称',
    key: 'realName',
    search: true,
    dialog: {
      required: true,
    },
  },
  {
    title: '角色',
    key: 'roleName',
    dialog: {
      required: true,
    },
  },
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
    title: '状态',
    key: 'index',
    sort: true,
    dialog: {
      required: true,
    },
  },
  {
    title: '仓库权限',
    key: 'warehouseMaster',
  },
];
const ctrl: GTableCtrlField = {
  width: 200,
  render: (_, record) => (
    <GCtrl>
      <GAction record={record} action='view'>
        详情
      </GAction>
      <GAction record={record} action='update'>
        编辑
      </GAction>
      <AuthAction record={record}>授权</AuthAction>
    </GCtrl>
  ),
};

export default function User() {
  return (
    <GSearchTable
      api={getUserList}
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
