import { GSearchTable, type GSearchTableField } from 'gbeata';

import useWarehouseOptions from '@/hooks/business/useWarehouseOptions';

import { GetPageInventoryCostl } from '@/api/summary';

import { listApi } from './api';

const fields: Array<GSearchTableField> = [
  {
    title: '组织',
    key: 'orgName',
  },
  {
    title: '区队',
    key: 'deptName',
    sort: true,
    search: true,
  },
  {
    title: '消耗物资金额',
    key: 'cost',
  },
];

export default function Demo() {
  const { activeOrgCode } = useWarehouseOptions();
  return (
    <GSearchTable
      api={GetPageInventoryCostl}
      // ctrl={ctrl}
      extendSearchParams={{ orgCode: activeOrgCode }}
      fields={fields}
      rowKey='sort_id'
      dialogFormExtend={{
        fields,
      }}
    ></GSearchTable>
  );
}
