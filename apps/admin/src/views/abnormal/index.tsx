import { GButton, GDialogForm, GSearchTable, type GSearchTableField } from 'gbeata';
import { useState } from 'react';

import useWarehouseOptions from '@/hooks/business/useWarehouseOptions';

import { downloadFile } from '@/utils/download';

import { GetMaterialMonthlyChangeDetail } from '@/api/summary';

export default function Abnormal() {
  const { activeOrgCode, warehouseOptions, orgOptions } = useWarehouseOptions();
  const [initialValues, setInitialValues] = useState({});
  const [warehouseCode, setWarehouseCode] = useState('');
  const [open, setOpen] = useState(false);
  const fields: Array<GSearchTableField> = [
    {
      title: '组织',
      key: 'orgName',
    },
    // {
    //   title: '仓库',
    //   key: 'warehouseName',
    //   search: false,
    // },
    // {
    //   title: '仓库',
    //   key: 'warehouseCode',
    //   type: 'select-search',
    //   options: warehouseOptions,
    //   search: {
    //     onChange: (value, _) => {
    //       setWarehouseCode(value);
    //     },
    //   },
    //   table: false,
    // },
    {
      title: '物料名称',
      key: 'materialName',
      search: true,
    },
    {
      title: '物料编码',
      key: 'materialCode',
      search: true,
    },
    {
      title: '去年平均消耗',
      key: 'average',
    },
    {
      title: '上月消耗',
      key: 'quantity',
    },
    {
      title: '增减比率',
      key: 'value',
      render: (text, record) => {
        return `${(text * 100).toFixed(2)}%`;
      },
    },
    {
      title: '增减状态',
      key: 'status',
      renderType: 'switch',
      type: 'radio-group',
      render: (text, record) => {
        const { value } = record;
        return value > 0 ? '增加' : '减少';
      },
      options: [
        {
          label: '增加',
          value: 1,
        },
        {
          label: '减少',
          value: 2,
        },
      ],
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
      fileUrl: '/summary/ExportMaterialMonthlyChangeDetail',
      fileName: `${fileName}.xls`,
      // eslint-disable-next-line no-nested-ternary
      postData: { orgCodes: obj.orgCode, warehouseCode: '' },
    });
  };

  return (
    <>
      <GSearchTable
        api={GetMaterialMonthlyChangeDetail}
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
