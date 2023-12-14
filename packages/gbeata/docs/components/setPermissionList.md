---
group: 全局配置
---

# 按钮权限控制

此参数用于控制 GButton 或者 GAction 的展示权限。

```tsx
import React from 'react';
import { GButton, GCtrl, GAction, setPermissionList } from 'gbeata';
import { Space } from 'antd';

export default function Demo() {
  const addPermission = () => {
    setPermissionList(['delete']);
  };

  const clearPermission = () => {
    setPermissionList([]);
  };

  return (
    <>
      <Space>
        <GButton onClick={addPermission}>设置权限</GButton>
        <GButton onClick={clearPermission}>清空权限</GButton>
      </Space>
      <div style={{ marginTop: 12 }}>
        <GButton permission="delete">删除</GButton>
        <GCtrl>
          <GAction permission="delete">删除</GAction>
        </GCtrl>
      </div>
    </>
  );
}
```

```js
import { setPermissionList } from 'gbeata';

const addPermission = () => {
  setPermissionList(['delete']);
};

const clearPermission = () => {
  setPermissionList([]);
};
```

<embed src="./index.md"></embed>
