import {
  Button,
  Card,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Radio,
  Select,
  Space,
  Switch,
  Table,
} from 'antd';
import dayjs from 'dayjs';
import { t } from 'i18next';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { PageWrapper } from '@/components/Page';

import { TABLE_EDIT_COMPO } from '@/settings/websiteSetting';

import { type DataItem, tableData } from './data';

import type { ColumnType } from 'antd/es/table';

type CellType = 'number' | 'text' | 'radio' | 'date' | 'select' | 'checkbox' | 'switch';

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  cellType: CellType;
  record: DataItem;
  index: number;
  children: React.ReactNode;
}

type theadKey = Record<string, { title: string; type: string }>;
const theadMap: theadKey = {
  key: { title: t('数字输入框'), type: 'number' },
  name: { title: t('输入框'), type: 'text' },
  sex: { title: t('单选框'), type: 'radio' },
  birth: { title: t('日期选择框'), type: 'date' },
  education: { title: t('选择器'), type: 'select' },
  hobby: { title: t('多选框'), type: 'checkbox' },
  forbid: { title: t('开关'), type: 'switch' },
  action: { title: t('按钮'), type: 'button' },
};

const nodeType = (type: CellType, record: DataItem) => {
  switch (type) {
    case 'number':
      return <InputNumber min={1000} max={2000} />;
    case 'text':
      return <Input />;
    case 'radio':
      return <Radio.Group options={[t('男'), t('女')].map((item) => ({ value: item, label: item }))} />;
    case 'date':
      return (
        <div>
          <DatePicker defaultValue={dayjs(record.birth, 'YYYY-MM-DD')} format='YYYY-MM-DD' />
        </div>
      );
    case 'select':
      return (
        <Select
          options={[t('初中'), t('高中'), t('大专'), t('本科')].map((item) => ({ value: item }))}
          style={{ width: '80px' }}
        />
      );
    case 'checkbox':
      return <Checkbox.Group options={record.hobby.split('、')} defaultValue={record.hobby.split('、')} />;
    case 'switch':
      return <Switch defaultChecked={record.forbid} />;
  }
};

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  cellType,
  record,
  index,
  children,
  ...restProps
}) => {
  const cellNode = nodeType(cellType, record);

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item name={dataIndex} style={{ margin: 0 }}>
          {cellNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const TableEditRow: React.FC = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(tableData);
  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record: DataItem) => record.key === editingKey;

  const edit = (record: Partial<DataItem>) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.key!);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as DataItem;

      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  // @ts-ignore
  const columns: ColumnType[] = [
    {
      title: () => (
        <>
          <span>{t('编号')}</span>
          <p className='sub-title'>{t('(数字输入框)')}</p>
        </>
      ),

      dataIndex: 'key',
      width: 70,
      editable: true,
      align: 'center',
    },
    {
      title: () => (
        <>
          <span>{t('姓名')}</span>
          <p className='sub-title'>{t('(输入框)')}</p>
        </>
      ),

      dataIndex: 'name',
      width: 110,
      editable: true,
      align: 'center',
    },
    {
      title: () => (
        <>
          <span>{t('性别')}</span>
          <p className='sub-title'>{t('(单选框)')}</p>
        </>
      ),

      dataIndex: 'sex',
      width: 120,
      editable: true,
      align: 'center',
    },
    {
      title: () => (
        <>
          <span>{t('生日')}</span>
          <p className='sub-title'>{t('(日期选择器)')}</p>
        </>
      ),

      dataIndex: 'birth',
      width: 140,
      editable: true,
      align: 'center',
    },
    {
      title: () => (
        <>
          <span>{t('学历')}</span>
          <p className='sub-title'>{t('(选择器)')}</p>
        </>
      ),

      dataIndex: 'education',
      width: 80,
      editable: true,
      align: 'center',
    },
    {
      title: () => (
        <>
          <span>{t('爱好')}</span>
          <p className='sub-title'>{t('(多选框)')}</p>
        </>
      ),

      dataIndex: 'hobby',
      width: 250,
      editable: true,
      align: 'center',
    },
    {
      title: () => (
        <>
          <span>{t('禁止编辑')}</span>
          <p className='sub-title'>{t('(开关)')}</p>
        </>
      ),

      dataIndex: 'forbid',
      width: 70,
      editable: true,
      align: 'center',
      render: (text: string, record: DataItem) => <span>{record.forbid ? t('是') : t('否')}</span>,
    },
    {
      title: () => (
        <>
          <span>{t('操作')}</span>
          <p className='sub-title'>{t('(按钮)')}</p>
        </>
      ),

      dataIndex: 'action',
      width: 70,
      align: 'center',
      render: (_: any, record: DataItem) => {
        const editable = isEditing(record);
        return editable ? (
          <Space>
            <Button type='primary' ghost onClick={() => save(record.key)}>
              {t('保存')}
            </Button>
            <Popconfirm title={t('是否取消编辑？')} onConfirm={cancel}>
              <Button type='primary' danger ghost>
                {t('取消')}
              </Button>
            </Popconfirm>
          </Space>
        ) : (
          <Button disabled={editingKey !== ''} onClick={() => edit(record)}>
            {t('编辑')}
          </Button>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataItem) => ({
        record,
        cellType: theadMap[col.dataIndex].type,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <PageWrapper plugin={TABLE_EDIT_COMPO}>
      <Card bordered={false}>
        <Form form={form} component={false}>
          <Table
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            dataSource={data}
            columns={mergedColumns}
            pagination={false}
          />
        </Form>
      </Card>
    </PageWrapper>
  );
};

export default TableEditRow;
