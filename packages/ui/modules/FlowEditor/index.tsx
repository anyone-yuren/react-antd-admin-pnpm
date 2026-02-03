import { Button, message, Space } from 'antd';
import React, { useCallback, useMemo } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  type Connection,
  Controls,
  type Edge,
  MarkerType,
  MiniMap,
  type Node,
  type NodeTypes,
  useEdgesState,
  useNodesState,
} from 'reactflow';

import CustomNode from './CustomNode';

import type { NodeData } from './CustomNode';

import 'reactflow/dist/style.css';

const containerStyle: React.CSSProperties = {
  width: '100%',
  height: '600px',
  position: 'relative',
};

const reactFlowStyle: React.CSSProperties = {
  backgroundColor: '#f5f5f5',
};

export interface FlowEditorProps {
  initialNodes?: Node<NodeData>[];
  initialEdges?: Edge[];
  onNodesChange?: (nodes: Node<NodeData>[]) => void;
  onEdgesChange?: (edges: Edge[]) => void;
  onSave?: (nodes: Node<NodeData>[], edges: Edge[]) => void;
}

const FlowEditor: React.FC<FlowEditorProps> = ({ initialNodes = [], initialEdges = [], onNodesChange, onSave }) => {
  const [nodes, setNodes, onNodesChangeHandler] = useNodesState<NodeData>(initialNodes);
  const [edges, setEdges, onEdgesChangeHandler] = useEdgesState(initialEdges);

  const updateNodeData = useCallback(
    (id: string, newData: Partial<NodeData>) => {
      setNodes((nds) => {
        const updatedNodes = nds.map((node) =>
          (node.id === id
            ? {
                ...node,
                data: { ...node.data, ...newData },
              }
            : node));
        onNodesChange?.(updatedNodes);
        return updatedNodes;
      });
    },
    [onNodesChange],
  );

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge({ ...params, markerEnd: { type: MarkerType.ArrowClosed } }, eds)),
    [setEdges],
  );

  const handleAddNode = useCallback(() => {
    const newNode: Node<NodeData> = {
      id: `node-${Date.now()}`,
      type: 'custom',
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: {
        label: `节点 ${nodes.length + 1}`,
        description: '新节点描述',
        type: 'default',
        status: 'active',
        tableData: [{ key: '', value: '' }],
        radioValue: 'A',
      },
    };
    setNodes((nds) => [...nds, newNode]);
  }, [setNodes, nodes.length]);

  const handleSaveFlow = useCallback(() => {
    onSave?.(nodes, edges);
    message.success('流程图保存成功');
  }, [nodes, edges, onSave]);

  const handleClear = useCallback(() => {
    setNodes([]);
    setEdges([]);
    message.success('流程图已清空');
  }, [setNodes, setEdges]);

  const nodeTypes: NodeTypes = useMemo(
    () => ({
      custom: (props) => <CustomNode {...props} updateNodeData={updateNodeData} />,
    }),
    [updateNodeData],
  );

  return (
    <div style={containerStyle}>
      <Space style={{ marginBottom: 16 }}>
        <Button type='primary' onClick={handleAddNode}>
          添加节点
        </Button>
        <Button onClick={handleSaveFlow}>保存流程</Button>
        <Button danger onClick={handleClear}>
          清空
        </Button>
      </Space>
      <ReactFlow
        style={reactFlowStyle}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChangeHandler}
        onEdgesChange={onEdgesChangeHandler}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Controls />
        <MiniMap />
        <Background variant='dots' gap={12} size={1} />
      </ReactFlow>
    </div>
  );
};

export default FlowEditor;
