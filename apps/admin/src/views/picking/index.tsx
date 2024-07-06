import { GSearchTable, type GSearchTableField } from 'gbeata';
import { GetPageInventoryPickl } from '@/api/summary';

import { listApi } from './api';

const fields: Array<GSearchTableField> = [
  {
    title: '领料单位',
    key: 'deptName',
    search: true,
  },
  {
    title: '领料人',
    key: 'userName',
    search: true,
  },
  {
    title: '物料编码',
    key: 'materialCode',
    search: true,
    dialog: {
      required: true,
    },
  },
  {
    title: '物料描述',
    key: 'materialSize',
    search: true,
  },
  {
    title: '物料类别',
    key: 'materialName',
    type: 'textarea',
  },
  {
    title: '单位',
    key: 'packageName',
  },
  {
    title: '数量',
    key: 'quantity',
  },
  {
    title: '领料日期',
    key: 'pickData',
  },
  {
    title: '领料单号',
    key: 'invoiceCode',
  },
];

export default function Demo() {
  return (
    <GSearchTable
      api={GetPageInventoryPickl}
      // ctrl={ctrl}
      fields={fields}
      rowKey={(record: any) => {
        return record.userName + record.materialCode + record.quantity + Math.random();
      }}
      dialogFormExtend={{
        fields,
      }}
    ></GSearchTable>
  );
}
