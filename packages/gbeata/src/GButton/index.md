---
nav:
  path: /components
title: '按钮'
group:
  title: 组件
  order: 1
---

# GButton <Badge>0.0.5</Badge>

```tsx
import React, { useState } from 'react';
import { GButton, setPermissionList } from 'gbeata';

export default function Demo() {
  return <GButton onClick={() => alert('G')}>gbeata</GButton>;
}
```

# 次级按钮

会去除按钮的颜色、边框、内边距、高度等属性。

```tsx
import React from 'react';
import { GButton } from 'gbeata';

export default function Demo() {
  return (
    <GButton sub onClick={() => alert('G')}>
      gbeata
    </GButton>
  );
}
```

## confirm

可以在按钮点击时进行确认，同时 onClick 方法要换成 onConfirm 方法。

```tsx
import React from 'react';
import { GButton } from 'gbeata';

export default function Demo() {
  return (
    <GButton
      confirm
      confirmMsg="确定删除吗？"
      danger
      onConfirm={() => alert('确定')}
    >
      删除
    </GButton>
  );
}
```

### tooltip

```tsx
import React from 'react';
import { GButton } from 'gbeata';

export default function Demo() {
  return (
    <GButton tooltip="你好" onClick={() => alert('G')}>
      悬浮提示
    </GButton>
  );
}
```

## 权限

```tsx
import React from 'react';
import { GButton, setPermissionList } from 'gbeata';

// 注释掉此行，将不会展示相关按钮
setPermissionList(['delete']);

export default function Demo() {
  return <GButton permission="delete">删除</GButton>;
}
```

权限控制可以看[这里](../global/set-permission-list)

## 参数

| 参数名     | 说明                                           | 参数类型 | 默认值 |
| ---------- | ---------------------------------------------- | -------- | ------ |
| confirm    | 是否需要确认                                   | boolean  | false  |
| confirmMsg | 确认框提示文字，需要先设置 confirm 属性为 true | string   | -      |
| onConfirm  | 确认完成事件，需要先设置 confirm 属性为 true   | Function | -      |
| onClick    | 点击事件                                       | Function | -      |
| permission | 权限                                           | string   | -      |

其它属性保持跟 antd Button 属性一致。
