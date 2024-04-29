import { GAction, GCtrl, GSearchTable, type GSearchTableField, type GTableCtrlField } from 'gbeata';

import { listApi } from './api';

const fields: Array<GSearchTableField> = [
  {
    title: '仓库名称',
    key: 'cn1',
    search: true,
    dialog: {
      required: true,
    },
  },
  {
    title: '所属矿队',
    key: 'index',
    type: 'select',
    options: [],
    sort: true,
    search: true,
    dialog: {
      required: true,
    },
  },
  {
    title: '管理员',
    key: 'des1',
    type: 'select',
    options: [],
    dialog: true,
  },
  {
    title: '创建时间',
    key: 'des2',
  },
];

export default function Demo() {
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
