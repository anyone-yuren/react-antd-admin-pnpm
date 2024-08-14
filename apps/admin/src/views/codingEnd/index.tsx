import { coddingEndList } from 'apis';
import {
  GAction,
  GCtrl,
  GSearchTable,
  type GSearchTableField,
  type GTableCtrlField,
  type Record,
  setDefaultDataFilter,
} from 'gbeata';
import { useRef, useState } from 'react';

import G6Modal from './components/g6Modal';

export default function Demo() {
  const [requestPage, setRequestPage] = useState({
    maxResultCount: 10,
    skipCount: 1,
  });
  const requestRef = useRef<any>();
  setDefaultDataFilter((res: any) => {
    return {
      content: res.items,
      totalCount: res.totalCount,
    };
  });
  const fields: Array<GSearchTableField> = [
    {
      title: '物料名称',
      width: 180,
      key: 'materialName',
      fixed: 'left',
    },
    {
      title: '唯一编码',
      key: 'no',
      width: 200,
      search: true,
      dialog: {
        required: true,
      },
    },
    {
      title: '组织',
      key: 'tenantName',
      width: 200,
      sort: true,
      dialog: {
        required: true,
      },
    },
    {
      title: '仓库',
      width: 180,
      key: 'warehouseName',
      type: 'textarea',
      dialog: true,
    },
    {
      title: '物料编码',
      key: 'materialCode',
      width: 180,
      search: true,
    },
    {
      title: '订单号',
      width: 180,
      key: 'orderNo',
    },
    {
      title: '批次号',
      width: 180,
      key: 'batchNo',
    },
    {
      title: '规格型号',
      width: 180,
      key: 'packageName',
    },
    {
      title: '剩余数量',
      width: 180,
      key: 'remainingQty',
    },
  ];
  const [singleCode, setSingleCode] = useState({});
  const [open, setOpen] = useState(false);
  const ctrl: GTableCtrlField = {
    width: 80,
    fixed: 'right',
    render: (_, record: Record) => (
      <GCtrl>
        <GAction
          record={record}
          onClick={() => {
            setOpen(true);
            setSingleCode(record);
          }}
        >
          详情
        </GAction>
      </GCtrl>
    ),
  };
  return (
    <>
      <GSearchTable
        api={() => {
          return coddingEndList(requestRef.current);
        }}
        ctrl={ctrl}
        fields={fields}
        rowKey='id'
        dialogFormExtend={{
          fields,
        }}
        beforeSearch={(params) => {
          return { ...requestRef.current };
        }}
        onParamsChange={({ pagination, search }) => {
          requestRef.current = {
            maxResultCount: pagination.pageSize,
            skipCount: (pagination.current - 1) * pagination.pageSize,
            ...search,
          };
        }}
        tableExtend={{
          bordered: true,
          scroll: { x: 1200 },
        }}
        // pagination={false}
      ></GSearchTable>

      <G6Modal open={open} record={singleCode} onClose={() => setOpen(false)} />
    </>
  );
}
