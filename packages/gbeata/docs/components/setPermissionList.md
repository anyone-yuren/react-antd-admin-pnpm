---
group: 全局配置
---

# 按钮权限控制

此参数用于控制 MwButton 或者 MwAction 的展示权限。

```tsx
import React from 'react';
import { MwButton, MwCtrl, MwAction, setPermissionList } from 'multiway';
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
        <MwButton onClick={addPermission}>设置权限</MwButton>
        <MwButton onClick={clearPermission}>清空权限</MwButton>
      </Space>
      <div style={{ marginTop: 12 }}>
        <MwButton permission="delete">删除</MwButton>
        <MwCtrl>
          <MwAction permission="delete">删除</MwAction>
        </MwCtrl>
      </div>
    </>
  );
}
```

```js
import { setPermissionList } from 'multiway';

const addPermission = () => {
  setPermissionList(['delete']);
};

const clearPermission = () => {
  setPermissionList([]);
};
```

<embed src="./index.md"></embed>
