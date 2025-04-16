import { coddingEndList, codeTree, trajectories } from 'apis';
import {
  GAction,
  GCtrl,
  GSearchTable,
  type GSearchTableField,
  type GTableCtrlField,
  type Record,
  setDefaultDataFilter,
} from 'gbeata';
import { Empty, List, Modal, Timeline, Tree, Typography, Image } from 'antd';
import { useRef, useState } from 'react';

import useWarehouseOptions from '@/hooks/business/useWarehouseOptions';

import G6Modal from './components/g6Modal';
import TreeModal from './components/treeModal';
import { DownOutlined } from '@ant-design/icons';
import { cloneDeep, forEach } from 'lodash-es';
import dayjs from 'dayjs';
import { useRequest } from 'ahooks';

export default function Demo() {
  const [requestPage, setRequestPage] = useState({
    maxResultCount: 10,
    skipCount: 1,
  });
  const [codeOpen, setCodeOpen] = useState(false);
  const { activeOrgCode } = useWarehouseOptions();
  const [treeData, setTreeData] = useState<any>([]);
  const [items, setItems] = useState([] as any);
  const { run, loading } = useRequest(trajectories, {
    manual: true,
    onSuccess: (res) => {
      if (res) {
        setItems(
          res.map((item) => {
            return {
              children: (
                <>
                  <Typography.Title level={5}>备注：{item.remark}</Typography.Title>

                  <List itemLayout='horizontal' className=''>
                    <List.Item className='!py-1' extra={item.warehouseName}>
                      <List.Item.Meta title={`仓库:`} />
                    </List.Item>
                    <List.Item className='!py-1' extra={item.orderNo}>
                      <List.Item.Meta title={`订单号:`} />
                    </List.Item>
                    <List.Item className='!py-1' extra={item.userName}>
                      <List.Item.Meta title={`操作人:`} />
                    </List.Item>
                    <List.Item className='!py-1' extra={item.qty}>
                      <List.Item.Meta title={`数量:`} />
                    </List.Item>
                    <List.Item
                      className='!py-1'
                      extra={
                        item?.imagePaths?.length ? (
                          <Image.PreviewGroup items={item?.imagePaths}>
                            <Image width={60} src={item?.imagePaths[0]} />
                          </Image.PreviewGroup>
                        ) : null
                      }
                    >
                      <List.Item.Meta title={`图片:`} />
                    </List.Item>
                  </List>
                </>
              ),
              label: dayjs(item.creationTime).format('YYYY-MM-DD HH:mm:ss'),
            };
          }),
        );
      }
    },
  });
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
      width: 210,
      key: 'orderNo',
      search: true,
    },
    {
      title: '批次号',
      width: 300,
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
  const [trajectoryOpen, setTrajectoryOpen] = useState(false);
  const ctrl: GTableCtrlField = {
    width: 210,
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
        <GAction
          record={record}
          onClick={async () => {
            setTrajectoryOpen(true);
            const res = await run(record.id);
          }}
        >
          轨迹详情
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
      <Modal
        title='轨迹详情'
        loading={loading}
        width={'50%'}
        open={trajectoryOpen}
        onCancel={() => setTrajectoryOpen(false)}
      >
        {items?.length ? (
          <div className='max-h-[300px] overflow-y-auto overflow-x-hidden p-4'>
            <Timeline mode='left' items={items}></Timeline>
          </div>
        ) : (
          <Empty description='暂无数据'></Empty>
        )}
      </Modal>

      <G6Modal open={open} record={singleCode} onClose={() => setOpen(false)} />
      {/* <TreeModal open={open} record={singleCode} onClose={() => setOpen(false)} /> */}
    </>
  );
}
