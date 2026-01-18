---
title: 流程编辑器
atomId: FlowEditor
package: ui
description: 基于react-flow的动态流程编辑器组件
group:
  title: 功能
---

# 流程编辑器

> 基于react-flow的动态流程编辑器组件，支持节点拖拽、连接、编辑等功能

安装`pnpm add ui --filter @gbeata/admin-docs`
<code src="./demos/floweditor"></code>

## 功能特性

- 🎨 **可视化编辑**：拖拽节点创建流程图
- 🔗 **节点连接**：通过拖拽节点上的锚点来连接节点
- ➕ **添加连接节点**：选中节点后，通过"添加连接节点"按钮快速创建并连接新节点
- ✏️ **节点编辑**：点击节点直接在节点上编辑节点信息，无需弹窗
- 📝 **表格数据**：支持动态添加/删除表格行，每行包含键值对输入
- 🎯 **单选选项**：提供单选按钮组，支持多个选项选择
- 🎯 **多种节点类型**：支持默认、开始、结束、条件、处理等多种节点类型
- 💾 **数据保存**：支持保存流程图数据
- 🗑️ **清空功能**：一键清空所有节点和连线

## API

| 属性名 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| initialNodes | 初始节点数据 | `Node<NodeData>[]` | `[]` |
| initialEdges | 初始连线数据 | `Edge[]` | `[]` |
| onNodesChange | 节点变化回调 | `(nodes: Node<NodeData>[]) => void` | - |
| onEdgesChange | 连线变化回调 | `(edges: Edge[]) => void` | - |
| onSave | 保存回调 | `(nodes: Node<NodeData>[], edges: Edge[]) => void` | - |

## NodeData 类型

| 属性名 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | 节点名称 | `string` | - |
| description | 节点描述 | `string` | - |
| type | 节点类型 | `string` | `'default'` |
| status | 节点状态 | `string` | `'active'` |
| tableData | 表格数据 | `Array<{ key: string; value: string }>` | `[{ key: '', value: '' }]` |
| radioValue | 单选值 | `string` | `'A'` |

## 节点类型

- `default` - 默认节点
- `start` - 开始节点
- `end` - 结束节点
- `condition` - 条件节点
- `process` - 处理节点

## 节点状态

- `active` - 活跃
- `disabled` - 禁用
- `completed` - 完成
- `error` - 错误

## 使用示例

### 基础用法

```tsx
import { FlowEditor } from 'ui';

function App() {
  return <FlowEditor />;
}
```

### 带初始数据

```tsx
import { FlowEditor } from 'ui';
import { Node, Edge } from 'reactflow';

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'custom',
    position: { x: 0, y: 0 },
    data: { label: '开始', description: '流程开始', type: 'start', status: 'active' },
  },
];

const initialEdges: Edge[] = [];

function App() {
  return <FlowEditor initialNodes={initialNodes} initialEdges={initialEdges} />;
}
```

### 监听变化

```tsx
import { FlowEditor } from 'ui';

function App() {
  const handleNodesChange = (nodes) => {
    console.log('节点变化:', nodes);
  };

  const handleEdgesChange = (edges) => {
    console.log('连线变化:', edges);
  };

  const handleSave = (nodes, edges) => {
    console.log('保存数据:', { nodes, edges });
  };

  return (
    <FlowEditor
      onNodesChange={handleNodesChange}
      onEdgesChange={handleEdgesChange}
      onSave={handleSave}
    />
  );
}
```

## 操作说明

1. **添加节点**：点击"添加节点"按钮，会在画布上随机位置创建一个新节点
2. **连接节点**：从一个节点的右侧锚点（蓝色圆点）拖拽到另一个节点的左侧锚点即可创建连线
3. **添加连接节点**：选中某个节点后，点击"添加连接节点"按钮，会自动创建一个新节点并与当前节点连接
4. **编辑节点**：点击任意节点，节点会切换到编辑模式，可以直接在节点上修改节点的名称、描述、类型和状态，再次点击节点可退出编辑模式
5. **保存流程**：点击"保存流程"按钮，会触发`onSave`回调，将当前节点和连线数据传递出去
6. **清空画布**：点击"清空"按钮，会清除所有节点和连线

## 注意事项

- 确保已安装`reactflow`依赖
- 组件高度固定为600px，如需调整高度可通过CSS覆盖
- 节点最小宽度为200px，以容纳编辑表单
