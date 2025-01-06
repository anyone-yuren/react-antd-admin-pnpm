import { useRequest } from 'ahooks';
import dayjs from 'dayjs';
import { GButton, GDialogForm, GSearchTable, type GSearchTableField } from 'gbeata';
import { use } from 'i18next';
import { useCallback, useState } from 'react';

import useWarehouseOptions from '@/hooks/business/useWarehouseOptions';

import { downloadFile } from '@/utils/download';

import { Getorderlines, Getorders } from '@/api/summary';

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
      key: 'orderCode',
      search: true,
    },
    {
      title: '订单类型',
      key: 'orderTypeName',
      search: true,
    },
    {
      title: '订单状态',
      key: 'isComplete',
      search: true,
      table: false,
      type: 'radio-group',
      options: [
        {
          label: '完成',
          value: 1,
        },
        {
          label: '未完成',
          value: 0,
        },
      ],
    },
    {
      title: '订单状态',
      key: 'orderStatus',
      search: true,
      type: 'select',
      options: [
        { label: '收货单新增', value: '1-1' },
        { label: '收货单待收货', value: '1-2' },
        { label: '收货单收货中', value: '1-3' },
        { label: '收货单完成', value: '1-4' },
        { label: '收货单取消', value: '1-5' },
        { label: '收货单手动完成', value: '1-6' },
        { label: '发货单新增', value: '2-1' },
        { label: '发货单待分配', value: '2-2' },
        { label: '发货单分配中', value: '2-3' },
        { label: '发货单分配异常', value: '2-4' },
        { label: '发货单出库中', value: '2-5' },
        { label: '发货单完成', value: '2-6' },
        { label: '发货单取消', value: '2-7' },
        { label: '发货单手动完成', value: '2-8' },
      ],
    },
    {
      title: 'NCC状态',
      key: 'isUploadERP',
      search: true,
      type: 'radio-group',
      options: [
        { label: '未上传', value: false },
        { label: '已上传', value: true },
      ],
    },
    {
      title: 'NCC消息',
      key: 'tipMessage',
    },
    {
      title: '创建时间',
      key: 'createTime',
      render: (text, record) => {
        return dayjs(text).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    {
      title: '描述信息',
      key: 'description',
    },
  ];
  const childFields: Array<GSearchTableField> = [
    {
      title: '行号',
      key: 'lineNo',
    },
    {
      title: '物料编码',
      key: 'materialCode',
    },
    {
      title: '物料名称',
      key: 'materialName',
    },
    {
      title: '行单状态',
      key: 'orderStatus',
    },
    {
      title: '规格',
      key: 'materialSize',
    },
    {
      title: '单位',
      key: 'unitName',
    },
    {
      title: '批次',
      key: 'batchNumber',
    },
    {
      title: '应收',
      key: 'expectedQuantity',
    },
    {
      title: '已收',
      key: 'quantity',
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
      fileUrl: '/summary/ExportOrders',
      fileName: `${fileName}.xls`,
      // eslint-disable-next-line no-nested-ternary
      postData: { orgCodes: obj.orgCode, warehouseCode: '' },
    });
  };
  const {
    data: childData,
    run: runGetorderlines,
    loading: childLoading,
  } = useRequest(Getorderlines, {
    manual: true,
  });
  const expandedRowRender = useCallback(
    (record) => {
      const data = childLoading ? [] : childData?.resultData;
      return (
        <GSearchTable
          fields={childFields}
          tableExtend={{
            loading: childLoading,
          }}
          data={data}
          pagination={false}
          extraVisible={false}
        ></GSearchTable>
      );
    },
    [childData, childLoading],
  );
  // 维护一个当前展开行的key
  const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([]);

  const handleExpand = (expanded: boolean, record: any) => {
    if (expanded) {
      // 如果展开，则只保存当前行的 key
      setExpandedRowKeys([record.id]);
      runGetorderlines({ id: record.id });
    } else {
      // 如果收起，则清空 expandedRowKeys 数组
      setExpandedRowKeys([]);
    }
  };
  return (
    <>
      <GSearchTable
        // api={GetPageOnlineInventory}
        api={Getorders}
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
