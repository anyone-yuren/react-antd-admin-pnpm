import { Cascader, Form, Select, message } from 'antd';
import React, { useEffect, useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAuthStore } from '@/stores/admin';
import useKeepAlive from '@/hooks/web/useKeepAlive';
import { getOrganizationAndWarehouseTree, setWarehouse, type WarehouseTreeList } from '@/api/auth';
import { useRequest } from 'ahooks';
import { searchRoute } from '@/utils';

import { basicRoutes } from '@/router';

type LayoutType = Parameters<typeof Form>[0]['layout'];

const StoreForm: React.FC = () => {
  // const { activeTabRoutePath, refreshTab } = useKeepAlive();
  const { activeOrgCode, setActiveCode, orgAndWarehouseInfo, setOrgAndWarehouseInfo } = useAuthStore((state) => {
    return {
      orgAndWarehouseInfo: state.orgAndWarehouseInfo,
      setOrgAndWarehouseInfo: state.setOrgAndWarehouseInfo,
      activeOrgCode: state.activeOrgCode,
      setActiveCode: state.setActiveCode,
    };
  });

  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState<LayoutType>('inline');
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { run } = useRequest(getOrganizationAndWarehouseTree, {
    onSuccess: ({ resultData }) => {
      setOrgAndWarehouseInfo(resultData);
    },
    manual: true,
  });

  const orgOptions = useMemo(() => {
    const isExist = !!orgAndWarehouseInfo?.length;
    return isExist
      ? orgAndWarehouseInfo?.map((item: any) => {
          return {
            key: item.warehouseCode,
            value: item.warehouseCode,
            label: item.warehouseName,
          };
        })
      : [];
  }, [orgAndWarehouseInfo]);

  const currRoute = searchRoute(pathname, basicRoutes);

  useEffect(() => {
    run();
    // console.log('activeTabRoutePath', activeTabRoutePath);
    // console.log('refreshTab', refreshTab);
    console.log('i am first');
  }, []);

  const onFormLayoutChange = ({ layout }: { layout: LayoutType }) => {
    setFormLayout(layout);
  };

  const formItemLayout = formLayout === 'horizontal' ? { labelCol: { span: 4 }, wrapperCol: { span: 14 } } : null;

  function getKey() {
    return new Date().getTime().toString();
  }

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
      <Form.Item label='组织'>
        <Select
          allowClear
          className='min-w-[150px]'
          showSearch
          placeholder='请选择组织'
          optionFilterProp='label'
          value={activeOrgCode}
          onChange={(code: string) => {
            setActiveCode(code);
            navigate(currRoute.fullPath, { replace: true, state: { key: getKey() } });
          }}
          onSearch={(val: any) => {}}
          options={orgOptions}
          popupMatchSelectWidth={false}
        />
      </Form.Item>
    </Form>
  );
};

export default StoreForm;
