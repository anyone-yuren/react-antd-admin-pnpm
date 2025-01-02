import { GButton, GDialogForm, GSearchTable, type GSearchTableField } from 'gbeata';
import { useState } from 'react';

import useWarehouseOptions from '@/hooks/business/useWarehouseOptions';

import { downloadFile } from '@/utils/download';

import { GetPageInventoryCostl, GetPageOnlineInventory } from '@/api/summary';

export default function Order() {
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
      title: '订单号',
      key: 'materialName',
      search: true,
    },
    {
      title: '订单类型',
      key: 'materialCode',
      search: true,
    },
    {
      title: '订单状态',
      key: 'materialSize',
      search: true,
    },
    {
      title: 'NCC状态',
      key: 'quantity',
      search: true,
    },
    {
      title: 'NCC消息',
      key: 'batchNumber',
    },
    {
      title: '创建时间',
      key: 'supplierName',
    },
    {
      title: '描述信息',
      key: 'supplierCode',
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

  const expandedRowRender = (record) => {
    return (
      <GSearchTable
        columns={fields}
        dataSource={record.children}
        pagination={false}
        extraVisible={false}
      ></GSearchTable>
    );
  };
  // 维护一个当前展开行的key
  const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([]);
  const handleExpand = (expanded: boolean, record: any) => {
    if (expanded) {
      // 如果展开，则只保存当前行的 key
      setExpandedRowKeys([record.id]);
      // monthlyApi({ orgCode: activeOrgCode, deptCode: record.deptCode });
    } else {
      // 如果收起，则清空 expandedRowKeys 数组
      setExpandedRowKeys([]);
    }
  };
  return (
    <>
      <GSearchTable
        // api={GetPageOnlineInventory}
        api={GetPageInventoryCostl}
        extendSearchParams={{ orgCode: activeOrgCode }}
        fields={fields}
        rowKey='id'
        dialogFormExtend={{
          fields,
        }}
        tableExtend={{
          bordered: true,
          scroll: { x: 1200 },
          expandable: {
            expandedRowRender,
            onExpand: handleExpand,
            expandedRowKeys,
          },
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
