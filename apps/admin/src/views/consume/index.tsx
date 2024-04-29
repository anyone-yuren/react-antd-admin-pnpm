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
    title: '消耗物资价值',
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
