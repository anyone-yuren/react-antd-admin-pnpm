import { GSearchTable, type GSearchTableField } from 'gbeata';

import { listApi } from './api';

const fields: Array<GSearchTableField> = [
  {
    title: '领料单位',
    key: 'cn1',
    search: true,
    dialog: {
      required: true,
    },
  },
  {
    title: '物料编码',
    key: 'index',
    sort: true,
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
    title: '单位',
    key: 'des2',
  },
  {
    title: '数量',
    key: 'des4',
  },
  {
    title: '领料日期',
    key: 'des5',
  },
  {
    title: '领料单号',
    key: 'des6',
  },
];

export default function Demo() {
  return (
    <GSearchTable
      api={listApi}
      // ctrl={ctrl}
      fields={fields}
      rowKey='sort_id'
      dialogFormExtend={{
        fields,
      }}
    ></GSearchTable>
  );
}
