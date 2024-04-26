import { GAction, GCtrl, GSearchTable, type GSearchTableField, type GTableCtrlField, type Record } from 'gbeata';
import { useState } from 'react';

import { listApi } from './api';
import G6Modal from './components/g6Modal';

const fields: Array<GSearchTableField> = [
  {
    title: '物料编码',
    key: 'cn1',
    search: true,
    dialog: {
      required: true,
    },
  },
  {
    title: '物料描述',
    key: 'index',
    sort: true,
    search: true,
    dialog: {
      required: true,
    },
  },
  {
    title: '物料类别',
    key: 'des1',
    type: 'textarea',
    dialog: true,
  },
  {
    title: '库存数量',
    key: 'des2',
  },
  {
    title: '库存单位',
    key: 'des3',
  },
  {
    title: '库存价值',
    key: 'des4',
  },
];

export default function Demo() {
  const [open, setOpen] = useState(false);
  const ctrl: GTableCtrlField = {
    render: (_, record: Record) => (
      <GCtrl>
        <GAction record={record} onClick={() => setOpen(true)}>
          详情
        </GAction>
      </GCtrl>
    ),
  };
  return (
    <>
      <GSearchTable
        api={listApi}
        ctrl={ctrl}
        fields={fields}
        rowKey='sort_id'
        dialogFormExtend={{
          fields,
        }}
      ></GSearchTable>

      <G6Modal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
