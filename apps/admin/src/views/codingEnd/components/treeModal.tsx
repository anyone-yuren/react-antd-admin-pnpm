import G6, { type IGraph, type TreeGraphData } from '@antv/g6';
import { useSize } from 'ahooks';
import { Card, Descriptions, Drawer, Flex, Image, Layout, Tree, Typography } from 'antd';
import ErrorBoundary from 'antd/es/alert/ErrorBoundary';
import { coddingTree } from 'apis';
import dayjs from 'dayjs';
import { t } from 'i18next';
import React, { useEffect } from 'react';

import { Description } from '../enum';
import { data as gData } from './data';
import useStyles from './styles';

const { Text, Title } = Typography;
const { Footer, Content } = Layout;

interface TreeNode {
  organizationName?: string;
  warehouseName?: string;
  orderNo?: string;
  batchNo?: string;
  remark?: string;
  placeCode?: string;
  locationCode?: string;
  qty?: number;
  imagePaths?: any;
  code?: any;
  children: TreeNode[];
  creationTime?: string;
  id: string;
  label?: string;
}

const TreeModal = ({ open, onClose, record }: { open: boolean; onClose: () => void; record: Record<string, any> }) => {
  const { styles } = useStyles();
  const ref = React.useRef(null);
  const size = useSize(ref);

  return (
    <ErrorBoundary>
      <Drawer
        classNames={{
          content: styles.driwer,
        }}
        title={t('动态')}
        placement='right'
        width={720}
        onClose={onClose}
        open={open}
        // extra={<>12</>}
        // mask={false}
      >
        <Layout style={{ height: '100%' }}>
          <Content ref={ref}>
            <Tree
              showLine={true}
              defaultExpandedKeys={[]}
              onSelect={(key, { selectedNodes }) => {
                console.log(selectedNodes);
              }}
              se
              treeData={[gData]}
              titleRender={(nodeData) => {
                console.log(nodeData);
                const items = [
                  {
                    key: '1',
                    label: '订单编号',
                    children: nodeData?.code?.orderNo || '',
                  },
                  {
                    key: '2',
                    label: '图片',
                    children: nodeData?.imagePaths?.length ? (
                      <Image.PreviewGroup items={nodeData.imagePaths}>
                        <Image
                          width={60}
                          src={'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'}
                        />
                      </Image.PreviewGroup>
                    ) : null,
                  },
                  {
                    key: '3',
                    label: '去向',
                    children: '待开发',
                    span: 2,
                  },
                ];
                return (
                  <Card
                    title={nodeData.warehouseName}
                    extra={<>{dayjs(nodeData.creationTime).format('YYYY-MM-DD')}</>}
                    size='small'
                  >
                    <Descriptions size='small' bordered items={items} column={2}></Descriptions>
                  </Card>
                );
              }}
            />
          </Content>
        </Layout>
      </Drawer>
    </ErrorBoundary>
  );
};
export default TreeModal;
