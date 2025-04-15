import { coddingEndList, codeTree } from 'apis';
import {
  GAction,
  GCtrl,
  GSearchTable,
  type GSearchTableField,
  type GTableCtrlField,
  type Record,
  setDefaultDataFilter,
} from 'gbeata';
import { Modal, Tree } from 'antd';
import { useRef, useState } from 'react';

import useWarehouseOptions from '@/hooks/business/useWarehouseOptions';

import G6Modal from './components/g6Modal';
import TreeModal from './components/treeModal';
import { DownOutlined } from '@ant-design/icons';
import { cloneDeep, forEach } from 'lodash-es';

export default function Demo() {
  const [requestPage, setRequestPage] = useState({
    maxResultCount: 10,
    skipCount: 1,
  });
  const [codeOpen, setCodeOpen] = useState(false);
  const { activeOrgCode } = useWarehouseOptions();
  const [treeData, setTreeData] = useState<any>([]);
  const requestRef = useRef<any>();
  const updateNoWidthQty = (node) => {
    node.no = `${node.no} 数量: ${node.qty}`;
    forEach(node.children, updateNoWidthQty);
    return node;
  };
  setDefaultDataFilter((res: any) => {
    return {
      content: res.items,
      totalCount: res.totalCount,
    };
  });
  const fields: Array<GSearchTableField> = [
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
      title: '物料编码',
      key: 'materialCode',
      width: 180,
      search: true,
    },
    {
      title: '订单号',
      width: 180,
      key: 'orderNo',
      search: true,
    },
    {
      title: '批次号',
      width: 180,
      key: 'batchNo',
      search: true,
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
    width: 150,
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
        <GAction
          record={record}
          onClick={async () => {
            const res = await codeTree(record.id);
            if (res) {
              const cloneRes = updateNoWidthQty(cloneDeep(res));
              setTreeData([cloneRes]);
              setCodeOpen(true);
            }
          }}
        >
          拆码明细
        </GAction>
      </GCtrl>
    ),
  };
  return (
    <>
      <GSearchTable
        api={() => {
          return coddingEndList({ ...requestRef.current, orgCode: activeOrgCode || '' });
        }}
        ctrl={ctrl}
        fields={fields}
        rowKey='id'
        dialogFormExtend={{
          fields,
        }}
        beforeSearch={(params) => {
          return { ...requestRef.current, orgCode: activeOrgCode };
        }}
        onParamsChange={({ pagination, search }) => {
          requestRef.current = {
            maxResultCount: pagination.pageSize,
            skipCount: (pagination.current - 1) * pagination.pageSize,
            orgCode: activeOrgCode,
            ...search,
          };
        }}
        tableExtend={{
          bordered: true,
          scroll: { x: 1200 },
        }}
        // pagination={false}
      ></GSearchTable>
      <Modal title='码详情' open={codeOpen} onCancel={() => setCodeOpen(false)}>
        <div className='max-h-[500px] overflow-auto'>
          <Tree
            showLine
            switcherIcon={<DownOutlined />}
            treeData={treeData}
            defaultExpandAll
            fieldNames={{
              title: 'no',
              children: 'children',
            }}
          />
        </div>
      </Modal>

      <G6Modal open={open} record={singleCode} onClose={() => setOpen(false)} />
      {/* <TreeModal open={open} record={singleCode} onClose={() => setOpen(false)} /> */}
    </>
  );
}
