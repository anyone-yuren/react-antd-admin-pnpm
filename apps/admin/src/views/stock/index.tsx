import {
  GAction,
  GButton,
  GCtrl,
  GDialogForm,
  GSearchTable,
  type GSearchTableField,
  type GTableCtrlField,
  type Record,
} from 'gbeata';
import { useState } from 'react';

import useWarehouseOptions from '@/hooks/business/useWarehouseOptions';

import { downloadFile } from '@/utils/download';

import { GetRealtimeInventories } from '@/api/summary';

import { listApi } from './api';

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

export default function Stock() {
  const [warehouseCode, setWarehouseCode] = useState('');
  const { activeOrgCode, warehouseOptions, orgOptions } = useWarehouseOptions();
  const [open, setOpen] = useState(false);
  const [initialValues, setInitialValues] = useState({});

  const fields: Array<GSearchTableField> = [
    {
      title: '组织',
      width: '120px',
      key: 'orgName',
    },
    {
      title: '仓库',
      key: 'warehouseName',
      width: '120px',
      search: false,
    },
    {
      title: '仓库',
      key: 'warehouseCode',
      type: 'select-search',
      options: warehouseOptions,
      search: {
        onChange: (value, _) => {
          setWarehouseCode(value);
        },
      },
      table: false,
    },
    {
      title: '物料名称',
      width: '120px',
      key: 'materialName',
    },
    {
      title: '物料编码',
      key: 'materialCode',
      width: '220px',
    },
    {
      title: '库位编码',
      key: 'locationCode',
      width: '220px',
      search: true,
    },
    {
      title: '型号',
      key: 'materialModel',
    },
    {
      title: '规格',
      width: '120px',
      key: 'materialSize',
    },
    {
      title: '单价 （元）',
      key: 'unitPriceStr',
      width: '120px',
    },
    {
      title: '数量',
      key: 'quantity',
      width: '120px',
    },
    {
      title: '金额 (元)',
      key: 'amountStr',
      width: '120px',
    },
    {
      title: '供应商',
      width: '220px',
      key: 'supplierName',
    },
    {
      title: '收货日期',
      width: '220px',
      key: 'receivedDate',
    },
  ];

  const handleDownload = async (obj) => {
    let fileName = '全部';
    if (activeOrgCode && !warehouseCode) {
      fileName = orgOptions.find((item) => item.value === activeOrgCode)?.label;
    } else if (activeOrgCode && warehouseCode) {
      fileName = `${orgOptions.find((item) => item.value === activeOrgCode)?.label}-${warehouseOptions.find((item) => item.value === warehouseCode)?.label}`;
    }
    await downloadFile({
      fileUrl: '/DataCenter/ExportRealtimeInventories',
      fileName: `${fileName}.xls`,
      // eslint-disable-next-line no-nested-ternary
      postData: { orgCodes: obj.orgCode, warehouseCode: '' },
    });
  };
  return (
    <>
      <GSearchTable
        api={GetRealtimeInventories}
        extendSearchParams={{ orgCode: activeOrgCode }}
        fields={fields}
        rowKey='sort_id'
        dialogFormExtend={{
          fields,
        }}
        tableExtend={{
          bordered: true,
          scroll: { x: 1500 },
        }}
      >
        <GButton type='primary' onClick={() => setOpen(true)}>
          {'导出'}
        </GButton>
      </GSearchTable>
      <GDialogForm
        open={open}
        width={'70%'}
        mode='add'
        onClose={() => setOpen(false)}
        title='导出'
        initialValues={initialValues}
        addApi={handleDownload}
        fields={[
          {
            title: '组织',
            key: 'orgCode',
            type: 'checkbox-group',
            required: true,
            options: orgOptions,
          },
          {
            type: 'checkbox',
            key: 'remember',
            style: {
              marginLeft: 120,
            },
            onChange: (value) => {
              if (typeof value === 'boolean') {
                if (value) {
                  setInitialValues({
                    ...initialValues,
                    remember: true,
                    orgCode: orgOptions.map((item) => item.key),
                  });
                } else {
                  setInitialValues({
                    ...initialValues,
                    remember: false,
                    orgCode: [],
                  });
                }
              }
            },
            children: '全选',
          },
        ]}
      ></GDialogForm>
    </>
  );
}
