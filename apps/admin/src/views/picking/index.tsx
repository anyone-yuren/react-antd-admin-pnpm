import { GSearchTable, type GSearchTableField } from 'gbeata';
import { GetPageInventoryPickl } from '@/api/summary';
import useWarehouseOptions from '@/hooks/business/useWarehouseOptions';

import { listApi } from './api';

export default function Demo() {
  const { activeOrgCode } = useWarehouseOptions();
  const fields: Array<GSearchTableField> = [
    {
      title: '组织',
      key: 'orgName',
    },
    {
      title: '领料仓库',
      key: 'warehouseName',
    },
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
  return (
    <GSearchTable
      api={GetPageInventoryPickl}
      // ctrl={ctrl}
      fields={fields}
      rowKey={(record: any) => {
        return record.userName + record.materialCode + record.quantity + Math.random();
      }}
      extendSearchParams={{ orgCode: activeOrgCode }}
      dialogFormExtend={{
        fields,
      }}
    ></GSearchTable>
  );
}
