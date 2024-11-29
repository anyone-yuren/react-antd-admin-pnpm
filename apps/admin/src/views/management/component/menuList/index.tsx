import { useRequest } from 'ahooks';
import { Modal, Tree } from 'antd';
import { GButton } from 'gbeata';
import { type Key, useEffect, useMemo, useState } from 'react';

import { updateRole } from '@/api/auth';
import { staticRoutes } from '@/router';

export default function RoleMenuModal(props) {
  const { refreshTable } = props;
  const { id, roleName, menus } = props.record;
  const { runAsync: updateRoleApi, loading } = useRequest(updateRole, {
    manual: true,
    onSuccess: () => {
      refreshTable && refreshTable();
      setOpen(false);
    },
  });
  function processRoutes(routes) {
    return routes.map((route) => {
      const { children, meta, ...rest } = route;

      // 提取 meta.title 并放到与 path 同级
      const processedRoute = { ...rest, title: meta?.title };

      // 如果 children 存在且只有一个子节点
      if (children && children.length === 1) {
        const child = children[0];
        const { fullPath, ...others } = child;
        return {
          ...processedRoute,
          ...others, // 提升子节点内容
          title: child.meta?.title || processedRoute.title, // 使用子节点的 title 优先
        };
      }

      // 如果 children 有多个子节点，递归处理
      if (children && children.length > 1) {
        processedRoute.children = processRoutes(children);
      }
      return processedRoute;
    });
  }
  // 提取路由
  const renderRoutes = processRoutes(staticRoutes);

  const [CheckedKeys, setCheckedKeys] = useState<any[]>([]);

  useEffect(() => {
    setCheckedKeys(menus ? menus.split(',').filter((item) => item !== '/system') : []);
  }, [menus]);

  const [open, setOpen] = useState(false);

  return (
    <>
      <GButton sub type='link' onClick={() => setOpen(true)}>
        授权
      </GButton>
      {open && (
        <Modal
          title='授权'
          open={open}
          width={'50%'}
          destroyOnClose
          confirmLoading={loading}
          onCancel={() => {
            setOpen(false);
          }}
          onOk={async () => {
            // 判断CheckedKeys是否有包含system
            const hasSystem = CheckedKeys.some((item) => item.includes('/system'));
            const sendData = hasSystem ? [...CheckedKeys, '/system'].join(',') : CheckedKeys.join(',');
            await updateRoleApi({
              menus: sendData,
              id,
              roleName,
            });
          }}
        >
          <Tree
            checkable
            defaultCheckedKeys={CheckedKeys}
            fieldNames={{ title: 'title', key: 'fullPath', children: 'children' }}
            onCheck={(checkedKeys, node) => {
              const { halfCheckedKeys } = node;
              setCheckedKeys([...checkedKeys, ...halfCheckedKeys].filter(Boolean) as Key[]); // 过滤掉 undefined checkedKeys);
            }}
            treeData={renderRoutes}
          />
        </Modal>
      )}
    </>
  );
}
