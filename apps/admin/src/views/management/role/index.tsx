import { GAction, GCtrl, GSearchTable, type GSearchTableField, type GTableCtrlField } from 'gbeata';
import { useRef } from 'react';

import { addRole, deleteRole, getRolePageList, updateRole } from '@/api/auth';

import AuthAction from '../component/auth';
import RoleMenuModal from '../component/menuList';
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

export default function Role() {
  const table = useRef();
  const ctrl: GTableCtrlField = {
    width: 120,
    render: (_, record) => (
      <GCtrl>
        {/* <AuthAction record={record}>授权</AuthAction> */}
        <RoleMenuModal record={record} refreshTable={() => table.current?.refresh()} />
        <GAction record={record} action='update'>
          编辑
        </GAction>
        {/* <GAction record={record} danger action='delete'>
          删除
        </GAction> */}
      </GCtrl>
    ),
  };
  return (
    <GSearchTable
      ref={table}
      api={getRolePageList}
      ctrl={ctrl}
      fields={fields}
      rowKey='id'
      deleteApi={deleteRole}
      dialogFormExtend={{
        fields,
        addApi: addRole,
        updateApi: updateRole,
      }}
    >
      <GAction action='add'>新增</GAction>
    </GSearchTable>
  );
}
