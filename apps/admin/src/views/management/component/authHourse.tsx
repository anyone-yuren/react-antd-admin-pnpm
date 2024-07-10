import { useRequest } from 'ahooks';
import { Modal, Tabs, Tree } from 'antd';
import { Empty } from 'antd/lib';
import { GButton } from 'gbeata';
import { useEffect, useMemo, useState } from 'react';
import useStyles from './style';

import { getOrganizationAndWarehouseTree, setWarehouse, type WarehouseTreeList } from '@/api/auth';

const AuthHourseAction = ({ record, refreshTable }: any) => {
  const [open, setOpen] = useState(false);
  const [, setActiveKey] = useState('1');
  const { styles } = useStyles();
  const [authData, setAuthData] = useState<WarehouseTreeList[]>([]);
  const { run } = useRequest(getOrganizationAndWarehouseTree, {
    onSuccess: (data) => {
      setAuthData(data?.resultData || []);
    },
    manual: true,
  });

  const { run: setWarehouseApi } = useRequest(setWarehouse, {
    manual: true,
    onSuccess: () => {
      setOpen(false);
      refreshTable();
    },
  });

  useEffect(() => {
    if (record && open) {
      run();
    }
  }, [record, open]);

  const [CheckedKeys, setCheckedKeys] = useState<any[]>(record?.warehouseMaster?.split(',') || []);

  const cacheTree = (data: WarehouseTreeList[]) => {
    return (
      <Tree
        checkable
        treeData={data}
        fieldNames={{ title: 'warehouseName', key: 'warehouseCode' }}
        defaultExpandAll
        checkStrictly
        defaultCheckedKeys={CheckedKeys}
        onCheck={(checkedKeys, node) => {
          setCheckedKeys(checkedKeys?.checked as any);
        }}
      ></Tree>
    );
  };

  const tabsItems = () => {
    const items = authData.map((item) => {
      return {
        key: item.warehouseCode,
        label: item.warehouseName,
        children: item.warehouseInfoList.length ? cacheTree(item.warehouseInfoList) : <Empty description='暂无数据' />,
      };
    });
    return items;
  };

  return (
    <>
      <GButton sub type='link' onClick={() => setOpen(true)}>
        授权仓库
      </GButton>
      <Modal
        title='授权仓库'
        open={open}
        width={'50%'}
        onCancel={() => setOpen(false)}
        onOk={async () => {
          await setWarehouseApi({
            userId: record.id,
            warehouseCodes: CheckedKeys,
          });
        }}
      >
        <div className='h-[400px]'>
          {open && (
            <Tabs
              tabPosition='left'
              defaultActiveKey='1'
              className={`${styles['my-modal-body']} h-[400px] `}
              items={tabsItems()}
              onChange={setActiveKey}
            />
          )}
        </div>
      </Modal>
    </>
  );
};

export default AuthHourseAction;
