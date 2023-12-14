---
group: 按钮组件
order: 3
---

# GCtrl

- GCtrl 下的元素会渲染成 GAction 按钮，无论是什么元素。
- 按钮与按钮之间会有一个分割线（Divider）。
- 默认情况下超过 3 个子元素会进入折叠状态，自动折叠成下拉菜单。
- 折叠状态下的事件绑定会由 onClick 变成 onConfirm。
- 折叠状态下的 confirm 会变成弹窗确认。

## 基础示例

```tsx
import React from 'react';
import { GCtrl, GAction } from 'gbeata';

export default function Demo() {
  return (
    <GCtrl>
      <GAction onClick={() => alert('修改')}>修改</GAction>
      <GAction onClick={() => alert('详情')}>详情</GAction>
      <GAction
        confirm
        confirmMsg="确定要删除吗？"
        onConfirm={() => alert('删除')}
      >
        删除
      </GAction>
      <GAction
        confirm
        confirmMsg="确定要审批吗？"
        onConfirm={() => alert('审批')}
      >
        审批
      </GAction>
      <GAction onClick={() => alert('复制')}>复制</GAction>
    </GCtrl>
  );
}
```

## 配合 GSearchTable

GSearchTable 下 GCtrl 的样式会更加紧凑。

此表格只演示 GCtrl 样式，点击操作列的按钮是没有效果的，想看效果点 [GSearchTable][gsearchtable]。

```tsx
import React from 'react';
import { GSearchTable, GAction, GCtrl, GSearchTableField } from 'gbeata';
import { GTableCtrlField } from 'gbeata/lib/GTable/mw-table';

/**
 * 测试接口，实际过程中推荐使用 axios 接口
 * */
const listApi = () => {
  return new Promise((resolve) => {
    const data = [
      {
        id: '1',
        name: 'Multiway',
        cname: '阿米娅',
      },
      {
        id: '2',
        name: 'Exusiai',
        cname: '能天使',
      },
    ];
    setTimeout(() => {
      resolve({
        content: data,
        total: 2,
      });
    }, 1000);
  });
};

const fields: Array<GSearchTableField> = [
  {
    title: '姓名',
    key: 'cname',
  },
  {
    title: '英文名',
    key: 'name',
  },
];

const ctrl: GTableCtrlField = {
  width: 240,
  render: (value, record) => {
    return (
      <GCtrl>
        <GAction>编辑</GAction>
        <GAction>详情</GAction>
        <GAction>删除</GAction>
        <GAction>审批</GAction>
        <GAction>复制</GAction>
      </GCtrl>
    );
  },
};

export default function Demo() {
  return (
    <GSearchTable
      searchVisible={false}
      extraVisible={false}
      title="注意操作列的按钮"
      api={listApi}
      fields={fields}
      ctrl={ctrl}
    />
  );
}
```

## 参数

### max

- Type: number
- Default: 3

超过这个数值，会被折叠成下拉菜单。

### size

- Type: 'small' | 'middle' | 'large' | number
- Default: 0

按钮间的大小。

### split

- Type: ReactNode
- Default: `<Divider type="vertical" />`

默认按钮之间有个分割线，可以设置 false 来取消分割线。

### sub

- Type: boolean
- Default: false

可以让 GCtrl 下所有的按钮变成[次级按钮](./mw-button#次级字体)。

### more

- Type: string
- Default: '更多'

下拉菜单的文字，默认会带一个 Icon，需要先配置 max 参数。

```tsx
import React from 'react';
import { GCtrl, GAction } from 'gbeata';

export default function Demo() {
  return (
    <GCtrl max={2} more="...">
      <GAction onClick={() => alert('修改')}>修改</GAction>
      <GAction onClick={() => alert('详情')}>详情</GAction>
      <GAction
        confirm
        confirmMsg="确定要删除吗？"
        onConfirm={() => alert('删除')}
      >
        删除
      </GAction>
      <GAction
        confirm
        confirmMsg="确定要审批吗？"
        onConfirm={() => alert('审批')}
      >
        审批
      </GAction>
      <GAction onClick={() => alert('复制')}>复制</GAction>
    </GCtrl>
  );
}
```

[gsearchtable]: ../g-search-table
