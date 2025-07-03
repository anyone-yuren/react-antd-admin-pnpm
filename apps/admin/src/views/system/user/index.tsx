import { GAction, GCtrl, GSearchTable, type GSearchTableField, type GTableCtrlField } from 'gbeata';

import AuthAction from '../components/auth';
import { listApi } from './api';
import { useRef } from 'react';
import { useRequest } from 'ahooks';
import { message } from 'antd';
import useWarehouseOptions from '@/hooks/business/useWarehouseOptions';

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
  const { activeOrgCode } = useWarehouseOptions();
  const tableRef = useRef(null);
  const { runAsync: syncRunAsync, loading } = useRequest(syncUser, {
    manual: true,
    onSuccess: () => {
      message.success('同步用户成功');
      tableRef.current?.refresh();
    },
  });
  return (
    <GSearchTable
      ref={tableRef}
      api={listApi}
      ctrl={ctrl}
      fields={fields}
      rowKey='sort_id'
      dialogFormExtend={{
        fields,
      }}
    >
      <GAction action='add'>新增</GAction>
      <GAction
        onClick={async () => {
          await syncRunAsync({ orgCode: activeOrgCode });
        }}
      >
        刷新
      </GAction>
    </GSearchTable>
  );
}
