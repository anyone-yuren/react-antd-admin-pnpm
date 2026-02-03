import { Button, Input, Radio, Select } from 'antd';
import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';

import type { RadioChangeEvent } from 'antd';

const nodeWrapperStyle: React.CSSProperties = {
  padding: '10px 15px',
  borderRadius: '8px',
  background: 'white',
  border: '2px solid #ddd',
  minWidth: '200px',
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

const nodeTitleStyle: React.CSSProperties = {
  fontWeight: 600,
  fontSize: '14px',
  color: '#333',
  marginBottom: '4px',
};

const nodeDescriptionStyle: React.CSSProperties = {
  fontSize: '12px',
  color: '#666',
};

const formItemStyle: React.CSSProperties = {
  marginBottom: '8px',
  textAlign: 'left',
};

const inputStyle: React.CSSProperties = {
  fontSize: '12px',
  padding: '4px 8px',
};

const handleStyle: React.CSSProperties = {
  width: '10px',
  height: '10px',
  background: '#1890ff',
  border: '2px solid #fff',
  borderRadius: '50%',
};

export interface NodeData {
  label: string;
  description: string;
  type: string;
  status: string;
  tableData: Array<{ key: string; value: string }>;
  radioValue: string;
  [key: string]: any;
}

export interface CustomNodeProps {
  data: NodeData;
  id: string;
  updateNodeData: (id: string, newData: Partial<NodeData>) => void;
}

const CustomNode: React.FC<CustomNodeProps> = ({ data, id, updateNodeData }) => {
  const [editing, setEditing] = useState(true);
  const [localData, setLocalData] = useState(data);

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalData((prev) => ({ ...prev, label: e.target.value }));
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLocalData((prev) => ({ ...prev, description: e.target.value }));
  };

  const handleTypeChange = (value: string) => {
    setLocalData((prev) => ({ ...prev, type: value }));
  };

  const handleStatusChange = (value: string) => {
    setLocalData((prev) => ({ ...prev, status: value }));
  };

  const handleRadioChange = (e: RadioChangeEvent) => {
    setLocalData((prev) => ({ ...prev, radioValue: e.target.value }));
  };

  const handleTableKeyChange = (index: number, value: string) => {
    setLocalData((prev) => {
      const newTableData = [...(prev.tableData || [])];
      newTableData[index].key = value;
      return { ...prev, tableData: newTableData };
    });
  };

  const handleTableValueChange = (index: number, value: string) => {
    setLocalData((prev) => {
      const newTableData = [...(prev.tableData || [])];
      newTableData[index].value = value;
      return { ...prev, tableData: newTableData };
    });
  };

  const handleAddTableRow = () => {
    setLocalData((prev) => ({ ...prev, tableData: [...(prev.tableData || []), { key: '', value: '' }] }));
  };

  const handleRemoveTableRow = (index: number) => {
    setLocalData((prev) => {
      const newTableData = [...(prev.tableData || [])];
      newTableData.splice(index, 1);
      return { ...prev, tableData: newTableData };
    });
  };

  const handleBlur = () => {
    updateNodeData(id, localData);
  };

  const nodeTypeOptions = [
    { label: '默认节点', value: 'default' },
    { label: '开始节点', value: 'start' },
    { label: '结束节点', value: 'end' },
    { label: '条件节点', value: 'condition' },
    { label: '处理节点', value: 'process' },
  ];

  const nodeStatusOptions = [
    { label: '活跃', value: 'active' },
    { label: '禁用', value: 'disabled' },
    { label: '完成', value: 'completed' },
    { label: '错误', value: 'error' },
  ];

  const radioOptions = [
    { label: '选项A', value: 'A' },
    { label: '选项B', value: 'B' },
    { label: '选项C', value: 'C' },
  ];

  return (
    <div>
      <div style={nodeWrapperStyle}>
        <Handle type="target" position={Position.Left} style={handleStyle} />
        {editing ? (
          <div className="nodrag" onClick={(e) => e.stopPropagation()}>
            <div style={formItemStyle}>
              <Input
                value={localData.label}
                onChange={handleLabelChange}
                onBlur={handleBlur}
                placeholder="节点名称"
                style={inputStyle}
              />
            </div>
            <div style={formItemStyle}>
              <Input.TextArea
                value={localData.description}
                onChange={handleDescriptionChange}
                onBlur={handleBlur}
                placeholder="节点描述"
                rows={2}
                style={inputStyle}
              />
            </div>
            <div style={formItemStyle}>
              <Select
                value={localData.type}
                onChange={handleTypeChange}
                onBlur={handleBlur}
                options={nodeTypeOptions}
                style={{ width: '100%' }}
                popupMatchSelectWidth={false}
              />
            </div>
            <div style={formItemStyle}>
              <Select
                value={localData.status}
                onChange={handleStatusChange}
                onBlur={handleBlur}
                options={nodeStatusOptions}
                style={{ width: '100%' }}
                popupMatchSelectWidth={false}
              />
            </div>
            <div style={formItemStyle}>
              <Radio.Group value={localData.radioValue || 'A'} onChange={handleRadioChange}>
                {radioOptions.map((option) => (
                  <Radio key={option.value} value={option.value} style={{ fontSize: '12px' }}>
                    {option.label}
                  </Radio>
                ))}
              </Radio.Group>
            </div>
            <div style={formItemStyle}>
              <div style={{ fontSize: '12px', marginBottom: '4px', fontWeight: 600 }}>表格数据</div>
              {(localData.tableData || []).map((item, index) => (
                <div key={index} style={{ display: 'flex', gap: '4px', marginBottom: '4px' }}>
                  <Input
                    value={item.key}
                    onChange={(e) => handleTableKeyChange(index, e.target.value)}
                    onBlur={handleBlur}
                    placeholder="键"
                    style={{ ...inputStyle, flex: 1 }}
                  />
                  <Input
                    value={item.value}
                    onChange={(e) => handleTableValueChange(index, e.target.value)}
                    onBlur={handleBlur}
                    placeholder="值"
                    style={{ ...inputStyle, flex: 1 }}
                  />
                  <Button
                    size="small"
                    danger
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveTableRow(index);
                    }}
                    style={{ fontSize: '12px', padding: '2px 8px' }}
                  >
                    删除
                  </Button>
                </div>
              ))}
              <Button
                size="small"
                type="dashed"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddTableRow();
                }}
                style={{ width: '100%', fontSize: '12px', marginTop: '4px' }}
              >
                添加行
              </Button>
            </div>
          </div>
        ) : (
          <div onClick={() => setEditing(true)}>
            <div style={nodeTitleStyle}>{data.label}</div>
            <div style={nodeDescriptionStyle}>{data.description}</div>
          </div>
        )}
        <Handle type="source" position={Position.Right} style={handleStyle} />
      </div>
    </div>
  );
};

export default CustomNode;
