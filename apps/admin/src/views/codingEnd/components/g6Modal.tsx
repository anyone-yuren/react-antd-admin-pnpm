import G6, { type IGraph, type TreeGraphData } from '@antv/g6';
import { useSize } from 'ahooks';
import { Descriptions, Drawer, Flex, Layout, Typography } from 'antd';
import ErrorBoundary from 'antd/es/alert/ErrorBoundary';
import { coddingTree } from 'apis';
import { t } from 'i18next';
import React, { useEffect } from 'react';

import { Description } from '../enum';
import { data as gData } from './data';
import useStyles from './styles';

const { Text, Title } = Typography;
const { Footer, Content } = Layout;

G6.registerNode('card-node', {
  draw: function drawShape(cfg, group) {
    const r = 2;
    const color = '#5B8FF9';
    const w = cfg.size[0];
    const h = cfg.size[1];
    const shape = group.addShape('rect', {
      attrs: {
        x: -w / 2,
        y: -h / 2,
        width: w, // 200,
        height: h, // 60
        stroke: color,
        radius: r,
        fill: '#fff',
      },
      // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
      name: 'main-box',
      draggable: true,
    });

    group.addShape('rect', {
      attrs: {
        x: -w / 2,
        y: -h / 2,
        width: w, // 200,
        height: h / 2, // 60
        fill: color,
        radius: [r, r, 0, 0],
      },
      // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
      name: 'title-box',
      draggable: true,
    });

    // title text
    group.addShape('text', {
      attrs: {
        textBaseline: 'top',
        x: -w / 2 + 8,
        y: -h / 2 + 2,
        lineHeight: 20,
        text: cfg.id,
        fill: '#fff',
      },
      // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
      name: 'title',
    });
    cfg.children &&
      group.addShape('marker', {
        attrs: {
          x: w / 2,
          y: 0,
          r: 6,
          cursor: 'pointer',
          symbol: cfg.collapsed ? G6.Marker.expand : G6.Marker.collapse,
          stroke: '#666',
          lineWidth: 1,
          fill: '#fff',
        },
        // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
        name: 'collapse-icon',
      });
    group.addShape('text', {
      attrs: {
        textBaseline: 'top',
        x: -w / 2 + 8,
        y: -h / 2 + 24,
        lineHeight: 20,
        text: cfg.label,
        fill: 'rgba(0,0,0, 1)',
      },
      // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
      name: `label`,
    });
    return shape;
  },
  setState(name, value, item) {
    if (name === 'collapsed') {
      const marker = item?.get('group').find((ele) => ele.get('name') === 'collapse-icon');
      const icon = value ? G6.Marker.expand : G6.Marker.collapse;
      marker.attr('symbol', icon);
    }
  },
});

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

const G6Modal = ({ open, onClose, record }: { open: boolean; onClose: () => void; record: Record<string, any> }) => {
  const { styles } = useStyles();
  const ref = React.useRef(null);
  const size = useSize(ref);
  let graph: IGraph | null = null;
  const [node, setNode] = React.useState<TreeGraphData | null>(null);
  const [g6Data, setG6Data] = React.useState();
  function transformOrderNoToLabel(tree: TreeNode): TreeNode {
    return {
      ...tree,
      label: tree.orderNo,
      id: String(tree.id),
      children: tree.children ? tree.children.map(transformOrderNoToLabel) : [],
    };
  }
  useEffect(() => {
    if (!open) return;
    const fetchData = async () => {
      const res = await coddingTree(record.id);
      if (res) {
        setG6Data(transformOrderNoToLabel(res));
      }
    };
    fetchData();
  }, [open]);
  useEffect(() => {
    if (!open || !g6Data) return;
    if (!graph) {
      graph = new G6.TreeGraph({
        container: ref.current as unknown as HTMLElement,
        width: size?.width || 750,
        height: size?.height || 600,
        minZoom: 0.5,
        modes: {
          default: ['drag-canvas', 'zoom-canvas'],
        },
        defaultNode: {
          type: 'card-node',
          size: [100, 40],
        },
        defaultEdge: {
          type: 'cubic-horizontal',
          style: {
            endArrow: true,
          },
        },
        layout: {
          type: 'indented',
          direction: 'LR',
          dropCap: false,
          indent: 200,
          getHeight: () => {
            return 60;
          },
        },
      });
    }
    graph.on('node:click', (e) => {
      if (e.target.get('name') === 'collapse-icon' && e.item && graph) {
        e.item.getModel().collapsed = !e.item.getModel().collapsed;
        graph.setItemState(e.item, 'collapsed', !e.item.getModel().collapsed);
        graph.layout();
      }
      setNode(e.item?.getModel() as TreeGraphData);
    });
    graph?.data(g6Data);
    graph.render();
    graph.fitView();
    // eslint-disable-next-line consistent-return
    return () => {
      graph?.destroy();
      graph = null;
      setNode(null);
    };
  }, [open, g6Data]);

  // 处理Descriptions展示的数据
  const items = React.useMemo(() => {
    if (!node) return [];
    const keys = Object.keys(node);
    return keys
      .filter((key) => key !== 'children')
      .map((key) => {
        return {
          label: Description[key],
          children: node[key] as string,
        };
      })
      .filter((item) => item.label !== undefined);
  }, [node]);

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
          <Layout>
            <Content ref={ref}></Content>
            {node && (
              <Footer style={{ maxHeight: 200, overflow: 'auto' }}>
                <Flex gap={8}>
                  {/* <Title level={5} style={{ minWidth: '100px' }}>
                    详细描述:
                  </Title> */}
                  <Descriptions title='详细描述' layout='vertical' items={items} />
                  {/* <Text type='secondary'>{JSON.stringify(node, null, 2)}</Text> */}
                </Flex>
              </Footer>
            )}
          </Layout>
        </Layout>
      </Drawer>
    </ErrorBoundary>
  );
};
export default G6Modal;
