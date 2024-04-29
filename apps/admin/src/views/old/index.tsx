import { GSearchTable, type GSearchTableField } from 'gbeata';

import { listApi } from './api';

const fields: Array<GSearchTableField> = [
  {
    title: '组织',
    key: 'cn1',
    search: true,
    dialog: {
      required: true,
    },
  },
  {
    title: '矿队',
    key: 'index',
    sort: true,
    search: true,
    dialog: {
      required: true,
    },
  },
  {
    title: '物料',
    key: 'des1',
    type: 'textarea',
    dialog: true,
  },
  {
    title: '领用数量',
    key: 'des2',
  },
  {
    title: '归还数量',
    key: 'des3',
  },
  {
    title: '交旧率',
    key: 'des4',
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
