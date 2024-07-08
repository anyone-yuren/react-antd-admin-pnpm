import { GSearchTable, type GSearchTableField } from 'gbeata';

import { GetPageInventoryCostl } from '@/api/summary';

import { listApi } from './api';

const fields: Array<GSearchTableField> = [
  {
    title: '组织',
    key: 'orgName',
    search: true,
    dialog: {
      required: true,
    },
  },
  {
    title: '矿队',
    key: 'deptName',
    sort: true,
    search: true,
    dialog: {
      required: true,
    },
  },
  {
    title: '消耗物资价值',
    key: 'cost',
  },
];

export default function Demo() {
  return (
    <GSearchTable
      api={GetPageInventoryCostl}
      // ctrl={ctrl}
      fields={fields}
      rowKey='sort_id'
      dialogFormExtend={{
        fields,
      }}
    ></GSearchTable>
  );
}
