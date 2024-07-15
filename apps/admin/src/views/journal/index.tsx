import {
  GAction,
  GCtrl,
  GSearchTable,
  type GSearchTableField,
  type GTableCtrlField,
  type Record,
  useOptions,
} from 'gbeata';
import { GetPageInventoryFlowl } from '@/api/summary';
import useWarehouseOptions from '@/hooks/business/useWarehouseOptions';

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

const response = {
  success: true,
  message: '',
  resultData: [
    {
      itemId: 1,
      itemValue: 'Inbound',
      itemName: '入库',
    },
    {
      itemId: 2,
      itemValue: 'Outbound',
      itemName: '出库',
    },
    {
      itemId: 3,
      itemValue: 'Profit',
      itemName: '盘盈',
    },
    {
      itemId: 4,
      itemValue: 'Loss',
      itemName: '盘亏',
    },
  ],
  statusCode: 200,
};

export default function Demo() {
  const { options: journalTypeOptions } = useOptions(
    () => {
      return Promise.resolve(response);
    },
    {
      path: ['resultData'],
      transform: {
        label: 'itemName',
        value: 'itemId',
      },
    },
  );
  const { activeOrgCode, warehouseOptions } = useWarehouseOptions();

  const fields: Array<GSearchTableField> = [
    {
      title: '组织',
      key: 'orgName',
      width: 200,
    },
    {
      title: '仓库',
      key: 'warehouseName',
      width: 200,
      search: false,
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
      width: 200,
    },
    {
      title: '物料编号',
      key: 'materialCode',
      search: true,
      width: 200,
    },
    {
      title: '物料规格',
      key: 'materialSize',
      width: 200,
    },
    {
      title: '货位',
      key: 'locationCode',
      width: 200,
    },
    {
      title: '流水水量',
      key: 'changeQuantity',
      width: 200,
    },
    {
      title: '流水类型',
      key: 'journalType',
      options: journalTypeOptions,
      type: 'select-search',
      search: true,
      width: 200,
    },
    {
      title: '批次号',
      key: 'batchNumber',
      search: true,
      width: 200,
    },
    {
      title: '流水时间',
      key: 'createTime',
      width: 200,
      ellipsis: 'true',
    },
  ];

  return (
    <GSearchTable
      api={GetPageInventoryFlowl}
      fields={fields}
      rowKey='sort_id'
      extendSearchParams={{ orgCode: activeOrgCode }}
      dialogFormExtend={{
        fields,
      }}
      scrollX={800}
    ></GSearchTable>
  );
}
