import { Form, Select } from 'antd';
import React, { useState } from 'react';

type LayoutType = Parameters<typeof Form>[0]['layout'];

const StoreForm: React.FC = () => {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState<LayoutType>('inline');

  const onFormLayoutChange = ({ layout }: { layout: LayoutType }) => {
    setFormLayout(layout);
  };

  const formItemLayout = formLayout === 'horizontal' ? { labelCol: { span: 4 }, wrapperCol: { span: 14 } } : null;

  return (
    <Form
      {...formItemLayout}
      layout={formLayout}
      form={form}
      variant='filled'
      initialValues={{ layout: formLayout }}
      onValuesChange={onFormLayoutChange}
      style={{ maxWidth: 600 }}
    >
      <Form.Item label='库存组织'>
        <Select popupMatchSelectWidth={120} allowClear>
          <Select.Option value='demo10'>总库</Select.Option>
          <Select.Option value='demo1'>驻一矿供应站</Select.Option>
          <Select.Option value='demo2'>驻二矿供应站</Select.Option>
          <Select.Option value='demo3'>驻三矿供应站</Select.Option>
          <Select.Option value='demo4'>驻四矿供应站</Select.Option>
          <Select.Option value='demo5'>驻五矿供应站</Select.Option>
          <Select.Option value='demo6'>驻六矿供应站</Select.Option>
          <Select.Option value='demo7'>驻七矿供应站</Select.Option>
          <Select.Option value='demo8'>驻八矿供应站</Select.Option>
          <Select.Option value='demo9'>驻九矿供应站</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label='仓库'>
        <Select popupMatchSelectWidth={120} allowClear>
          <Select.Option value='demo1'>劳保仓</Select.Option>
          <Select.Option value='demo2'>交旧仓</Select.Option>
          <Select.Option value='demo3'>库存仓</Select.Option>
          <Select.Option value='demo4'>其他仓</Select.Option>
          <Select.Option value='demo5'>智能仓</Select.Option>
          <Select.Option value='demo6'>总仓</Select.Option>
        </Select>
      </Form.Item>
    </Form>
  );
};

export default StoreForm;
