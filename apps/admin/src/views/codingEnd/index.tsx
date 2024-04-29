import { GAction, GCtrl, GSearchTable, type GSearchTableField, type GTableCtrlField, type Record } from 'gbeata';
import { useState } from 'react';

import { listApi } from './api';
import G6Modal from './components/g6Modal';

const fields: Array<GSearchTableField> = [
  {
    title: '唯一编码',
    key: 'cn1',
    search: true,
    dialog: {
      required: true,
    },
  },
  {
    title: '组织',
    key: 'index',
    sort: true,
    search: true,
    dialog: {
      required: true,
    },
  },
  {
    title: '仓库',
    key: 'des1',
    type: 'textarea',
    dialog: true,
  },
  {
    title: '物料编码',
    key: 'des2',
  },
  {
    title: '物料名称',
    key: 'des3',
  },
  {
    title: '订单号',
    key: 'des4',
  },
  {
    title: '批次号',
    key: 'des5',
  },
  {
    title: '规格型号',
    key: 'des6',
  },
  {
    title: '创建时间',
    key: 'des7',
  },
  {
    title: '创建人',
    key: 'des8',
  },
  {
    title: '剩余数量',
    key: 'des9',
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
