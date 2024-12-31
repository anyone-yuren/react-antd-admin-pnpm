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

import { GetPageOnlineInventory } from '@/api/summary';

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

export default function Demo() {
  const { activeOrgCode, warehouseOptions, orgOptions } = useWarehouseOptions();
  const [initialValues, setInitialValues] = useState({});
  const [warehouseCode, setWarehouseCode] = useState('');
  const [open, setOpen] = useState(false);
  const fields: Array<GSearchTableField> = [
    {
      title: '组织',
      key: 'orgName',
    },
    {
      title: '仓库',
      key: 'warehouseName',
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
      key: 'materialName',
    },
    {
      title: '物料编码',
      key: 'materialCode',
      search: true,
    },
    {
      title: '规格',
      key: 'materialSize',
    },
    {
      title: '数量',
      key: 'quantity',
    },
    {
      title: '批次',
      key: 'batchNumber',
      search: true,
    },
    {
      title: '供应商名称',
      key: 'supplierName',
      search: true,
    },
    {
      title: '供应商编码',
      key: 'supplierCode',
      search: true,
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
      fileUrl: '/summary/ExportOnlineInventory',
      fileName: `${fileName}.xls`,
      // eslint-disable-next-line no-nested-ternary
      postData: { orgCodes: obj.orgCode, warehouseCode: '' },
    });
  };

  return (
    <>
      <GSearchTable
        api={GetPageOnlineInventory}
        extendSearchParams={{ orgCode: activeOrgCode }}
        fields={fields}
        rowKey='sort_id'
        dialogFormExtend={{
          fields,
        }}
        tableExtend={{
          bordered: true,
          scroll: { x: 1200 },
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
