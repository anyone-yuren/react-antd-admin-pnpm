import { GAction, GCtrl, GSearchTable, type GSearchTableField, type GTableCtrlField } from 'gbeata';

import useWarehouseOptions from '@/hooks/business/useWarehouseOptions';

import { createWarehouse, getMaterialList, updateMaterialRatio, syncWarehouse } from '@/api/warehouse';
import { useRequest } from 'ahooks';
import { message, Slider } from 'antd';
import { useRef } from 'react';

export default function MaterialMagement() {
  const { activeOrgCode, orgOptions } = useWarehouseOptions();
  const tableRef = useRef(null);
  const { runAsync: syncRunAsync, loading } = useRequest(syncWarehouse, {
    manual: true,
    onSuccess: () => {
      message.success('同步仓库成功');
      tableRef.current?.refresh();
    },
  });
  const ctrl: GTableCtrlField = {
    width: 80,
    fixed: 'right',
    render: (_, record: Record<string, any>) => (
      <GCtrl>
        <GAction
          record={record}
          danger
          action='update'
          params={{
            deliveryRatio: [record.minInvoiceProportion, record.maxInvoiceProportion],
            receivingRatio: [record.minReceiptProportion, record.maxReceiptProportion],
          }}
        >
          编辑
        </GAction>
        {/* <GAction action='delete' color='error' record={record}>
          删除
        </GAction> */}
      </GCtrl>
    ),
  };

  const fields: Array<GSearchTableField> = [
    {
      title: '物料编码',
      key: 'materialCode',
      search: true,
      width: 100,
    },
    {
      title: '物料名称',
      key: 'materialName',
      width: 100,
      search: true,
    },
    {
      title: '物料规格',
      key: 'materialSize',
      width: 150,
      search: false,
    },
    {
      title: '最低收货比例',
      key: 'minReceiptProportion',
      width: 120,
    },
    {
      title: '最高收货比例',
      key: 'maxReceiptProportion',
      width: 120,
    },
    {
      title: '最低发货比例',
      key: 'minInvoiceProportion',
      width: 120,
    },
    {
      title: '最高发货比例',
      key: 'maxInvoiceProportion',
      width: 120,
    },
    {
      title: '描述信息',
      width: 250,
      key: 'materialDescription',
      search: false,
      type: 'textarea',
      ellipsis: 'true',
    },
    {
      title: '收货比例',
      key: 'receivingRatio',
      width: 100,
      tooltip: '物料收货数量只允许在设置的范围内',
      table: false,
      dialog: {
        span: 12,
      },
      type: 'custom',
      renderContent: (record: Record) => {
        return <Slider tooltip={{}} max={200} min={0} range />;
      },
    },
    {
      title: '发货比例',
      key: 'deliveryRatio',
      tooltip: '物料发货数量只允许在设置的范围内',
      table: false,
      dialog: {
        span: 12,
      },
      type: 'custom',
      renderContent: (record: Record) => {
        return <Slider tooltip={{}} max={200} min={0} range />;
      },
    },
    {
      title: '最低库存',
      key: 'minInventoryProportion',
      dialog: {
        span: 12,
      },
      width: 120,
    },
    {
      title: '最高库存',
      key: 'maxInventoryProportion',
      dialog: {
        span: 12,
      },
      width: 120,
    },
  ];
  return (
    <GSearchTable
      api={getMaterialList}
      ref={tableRef}
      ctrl={ctrl}
      fields={fields}
      rowKey='sort_id'
      extendSearchParams={{ orgCode: activeOrgCode }}
      dialogFormExtend={{
        fields,
        updateApi: async (params: Record<string, any>) => {
          const { receivingRatio, deliveryRatio } = params!;
          if (receivingRatio) {
            const [min, max] = receivingRatio;
            params.minReceiptProportion = min;
            params.maxReceiptProportion = max;
          }
          if (deliveryRatio) {
            const [min, max] = deliveryRatio;
            params.minInvoiceProportion = min;
            params.maxInvoiceProportion = max;
          }
          const res = {
            ...params,
          };
          return updateMaterialRatio(res);
        },
        width: '50%',
      }}
      tableExtend={{
        bordered: true,
        scroll: { x: 1800 },
      }}
    ></GSearchTable>
  );
}
