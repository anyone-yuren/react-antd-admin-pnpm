import { useAuthStore } from '@gbeata/store';
import { Cascader, Form } from 'antd';
import React, { useState } from 'react';

type LayoutType = Parameters<typeof Form>[0]['layout'];

const StoreForm: React.FC = () => {
  const { userInfo } = useAuthStore((state) => {
    return {
      userInfo: state.userInfo,
    };
  });
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
      <Form.Item label='矿库'>
        <Cascader
          options={userInfo?.warehouseTreeList || []}
          fieldNames={{ label: 'warehouseName', value: 'warehouseCode', children: 'warehouseInfoList' }}
        ></Cascader>
      </Form.Item>
    </Form>
  );
};

export default StoreForm;
