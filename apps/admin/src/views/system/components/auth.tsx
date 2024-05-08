import { Modal, Tabs, Tree } from 'antd';
import { GButton } from 'gbeata';
import { useMemo, useState } from 'react';

import { treeToList } from '@/utils/helper/treeHelper';

import { api } from './api';

const AuthAction = ({ record }: any) => {
  const [open, setOpen] = useState(false);
  const [activeKey, setActiveKey] = useState('1');
  const [CheckedKeys, setCheckedKeys] = useState<string[]>([]);
  const cacheTree = (data) => {
    return (
      <Tree
        checkable
        treeData={data}
        fieldNames={{ title: 'displayName', key: 'name' }}
        defaultExpandAll
        checkStrictly
        defaultCheckedKeys={CheckedKeys}
        onCheck={(checkedKeys, node) => {
          const updatedCheckedKeys = new Set(CheckedKeys);

          if (!node.checked) {
            updatedCheckedKeys.delete(node.node.key);
          } else {
            checkedKeys.checked.forEach((key) => updatedCheckedKeys.add(key));
          }

          setCheckedKeys(Array.from(updatedCheckedKeys));
        }}
      ></Tree>
    );
  };

  const tabsItems = useMemo(() => {
    const checkedKeys = [];
    const items = api.map((item) => {
      const node = treeToList(item.permissions)
        .filter((t) => t.isGranted)
        .map((t) => t.name);
      checkedKeys.push(...node);
      return {
        key: item.name,
        label: item.displayName,
        children: cacheTree(item.permissions),
      };
    });
    setCheckedKeys(checkedKeys);
    return items;
  }, [open]);

  return (
    <>
      <GButton sub type='link' onClick={() => setOpen(true)}>
        授权
      </GButton>
      <Modal
        title='授权'
        open={open}
        onCancel={() => setOpen(false)}
        onOk={() => {
          console.log(CheckedKeys);
        }}
      >
        {open && <Tabs tabPosition='left' defaultActiveKey='1' items={tabsItems} onChange={setActiveKey} />}
      </Modal>
    </>
  );
};

export default AuthAction;
