import { useMemo } from 'react';
import { GAction, GCtrl, GSearchTable, type GSearchTableField, type GTableCtrlField, type Record } from 'gbeata';
import { GetPageInventoryYear } from '@/api/summary';
import useWarehouseOptions from '@/hooks/business/useWarehouseOptions';

export default function Demo() {
  const { activeOrgCode, warehouseOptions } = useWarehouseOptions();
  const fields: Array<GSearchTableField> = [
    {
      title: '组织',
      key: 'orgName',
    },
    {
      title: '仓库',
      key: 'warehouseName',
    },
    {
      title: '仓库',
      key: 'warehouseCode',
      type: 'select-search',
      options: warehouseOptions,
      search: true,
      table: false,
    },
    {
      title: '物料名称',
      key: 'materialName',
    },
    {
      title: '物料编号',
      key: 'materialCode',
      search: true,
    },
    {
      title: '规格',
      key: 'materialSize',
    },
    {
      title: '库存数量',
      key: 'quantity',
    },
    {
      title: '入库时间',
      key: 'receivingData',
    },
    {
      title: '当前库龄',
      key: 'inventoryYear',
      render: (text, record, index) => <span>{`${text} /天`}</span>,
    },
  ];

  const ctrl: GTableCtrlField = {
    render: (_, record: Record) => (
      <GCtrl>
        <GAction record={record} action='view'>
          详情
        </GAction>
        <GAction record={record} action='update'>
          编辑
        </GAction>
      </GCtrl>
    ),
  };

  return (
    <GSearchTable
      api={GetPageInventoryYear}
      fields={fields}
      rowKey='sort_id'
      extendSearchParams={{ orgCode: activeOrgCode }}
      dialogFormExtend={{
        fields,
      }}
    ></GSearchTable>
  );
}
