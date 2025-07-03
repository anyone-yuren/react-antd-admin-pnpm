import { GAction, GCtrl, GSearchTable, type GSearchTableField, type GTableCtrlField } from 'gbeata';

import useWarehouseOptions from '@/hooks/business/useWarehouseOptions';

import { createWarehouse, getWarehouseList, updateWarehouse, syncWarehouse } from '@/api/warehouse';
import { useRequest } from 'ahooks';
import { message } from 'antd';
import { useRef } from 'react';

export default function StoreHourse() {
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
    width: 120,
    render: (_, record: Record<string, any>) => (
      <GCtrl>
        <GAction record={record} action='view'>
          详情
        </GAction>
        <GAction record={record} danger action='update'>
          编辑
        </GAction>
        {/* <GAction action='delete' color='error' record={record}>
          删除
        </GAction> */}
      </GCtrl>
    ),
  };

  const fields: Array<GSearchTableField> = [
    // {
    //   title: '所属组织',
    //   key: 'orgName',
    //   sort: true,
    //   search: true,
    //   dialog: {
    //     required: true,
    //   },
    // },
    {
      title: '仓库名称',
      key: 'warehouseName',
      search: true,
      dialog: {
        required: true,
      },
    },
    {
      title: '仓库编号',
      key: 'warehouseCode',
      dialog: true,
    },
    {
      title: '手动拣选',
      key: 'isEnablePickup',
      type: 'switch',
      dialog: true,
      render: (_, record) => (record.isEnablePickup ? '是' : '否'),
    },
    {
      title: '所属组织',
      key: 'orgCode',
      type: 'select',
      options: orgOptions,
      dialog: true,
    },
  ];
  return (
    <GSearchTable
      api={getWarehouseList}
      ref={tableRef}
      ctrl={ctrl}
      fields={fields}
      rowKey='sort_id'
      extendSearchParams={{ orgCode: activeOrgCode }}
      dialogFormExtend={{
        fields,
        updateApi: updateWarehouse,
        addApi: createWarehouse,
      }}
    >
      <GAction action='add'>新增</GAction>
      <GAction loading={loading} onClick={() => syncRunAsync({ orgCode: activeOrgCode })}>
        {/* <GAction loading={loading} onClick={() => tableRef.current?.refresh()}> */}
        同步仓库
      </GAction>
    </GSearchTable>
  );
}
