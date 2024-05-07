import { GSearchTable, type GSearchTableField } from 'gbeata';

import { listApi } from './api';

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
    title: '单位',
    key: 'des2',
  },
  {
    title: '期初',
    key: 'des3',
  },
  {
    title: '月入数',
    key: 'des4',
  },
  {
    title: '月出数',
    key: 'des5',
  },
  {
    title: '月异入数',
    key: 'des6',
  },
  {
    title: '月异出数',
    key: 'des7',
  },
  {
    title: '期末',
    key: 'des8',
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
