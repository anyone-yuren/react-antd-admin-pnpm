import { FlowEditor } from 'ui';

import type { Edge, Node } from 'reactflow';

export default () => {
  const initialNodes: Node[] = [
    {
      id: '1',
      type: 'custom',
      position: { x: 100, y: 100 },
      data: { label: '开始', description: '流程开始节点', type: 'start', status: 'active' },
    },
    {
      id: '2',
      type: 'custom',
      position: { x: 400, y: 100 },
      data: { label: '处理', description: '数据处理节点', type: 'process', status: 'active' },
    },
    {
      id: '3',
      type: 'custom',
      position: { x: 700, y: 100 },
      data: { label: '结束', description: '流程结束节点', type: 'end', status: 'active' },
    },
  ];

  const initialEdges: Edge[] = [
    {
      id: 'e1-2',
      source: '1',
      target: '2',
      animated: true,
    },
    {
      id: 'e2-3',
      source: '2',
      target: '3',
      animated: true,
    },
  ];

  const handleSave = (nodes: Node[], edges: Edge[]) => {
    console.log('保存流程数据:', { nodes, edges });
  };

  return (
    <>
      <FlowEditor initialNodes={initialNodes} initialEdges={initialEdges} onSave={handleSave} />
    </>
  );
};
