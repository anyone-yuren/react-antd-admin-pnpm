---
order: 1
---

## 基础表格

```tsx
/**
 * defaultShowCode: true
 */
import React from 'react';
import { GSearchTable, GSearchTableField, Record } from 'gbeata';

const data: Array<Record> = [
  {
    key: '1',
    cn: '枫原万叶',
    index: 'R001',
    des: '总有地上的生灵，敢于面对雷霆的威光。',
  },
  {
    key: '2',
    cn: '温迪',
    index: 'PL03',
    des: '若你困于无风之地，我将奏响高天之歌。',
  },
];

const fields: Array<GSearchTableField> = [
  {
    title: '姓名',
    key: 'cn',
  },
  {
    title: '编号',
    key: 'index',
  },
  {
    title: '描述',
    key: 'des',
  },
];

export default function Demo() {
  return <GSearchTable title="简易表格" data={data} fields={fields} />;
}
```

少写一个 `dataIndex`，其它的跟原本表格差不多。

## JSX / TSX 语法糖 <Badge>0.1.0</Badge>

```tsx
import React from 'react';
import { GSearchTable, Record, GFields, GField } from 'gbeata';

const data: Array<Record> = [
  {
    key: '1',
    cn: '枫原万叶',
    index: 'R001',
    des: '总有地上的生灵，敢于面对雷霆的威光。',
  },
  {
    key: '2',
    cn: '温迪',
    index: 'PL03',
    des: '若你困于无风之地，我将奏响高天之歌。',
  },
];

export default function Demo() {
  return (
    <GSearchTable title="简易表格" data={data}>
      <GFields>
        <GField title="姓名" key="cn" />
        <GField title="编号" key="index" />
        <GField title="描述" key="des" />
      </GFields>
    </GSearchTable>
  );
}
```

```diff
-const fields: Array<GSearchTableField> = [
-  {
-    title: '姓名',
-    key: 'cn'
-  },
-  {
-    title: '编号',
-    key: 'index'
-  },
-  {
-    title: '描述',
-    key: 'des'
-  }
-]

export default function Demo() {
  return (
    <GSearchTable
      title="简易表格"
      data={data}
-     fields={fields}
    >
+     <GFields>
+       <GField title="姓名" key="cn" />
+       <GField title="编号" key="index" />
+       <GField title="描述" key="des" />
+     </GFields>
    </GSearchTable>
  )
}
```

只是换了另一种风格写 `fields` 而已，请不要用其它元素包裹住 `GFields` 和 `GField`。

## 带接口的表格

```tsx
/**
 * defaultShowCode: true
 */
import React from 'react';
import { GSearchTable, GSearchTableField } from 'gbeata';
import { listApi } from '../api';

const fields: Array<GSearchTableField> = [
  {
    title: '姓名',
    key: 'cn',
  },
  {
    title: '编号',
    key: 'index',
  },
  {
    title: '描述',
    key: 'des',
  },
];

export default function Demo() {
  return <GSearchTable api={listApi} title="简易表格" fields={fields} />;
}
```

是不是一下子就干净了很多，不需要自己请求接口，也不需要处理翻页，Multiway 会自己处理。

对示例代码里的 listApi 有疑问或者想要自定义？ 🤔️ 可以点[这里](../../components/global/set-default-search-filter)查看请求提交处理，点[这里](../../components/global/set-default-data-filter)查看请求返回处理。

如果你的接口不是返回以上的格式，可以创建一个 `gbeata.init.tsx` 文件，提前引入一次就好了，具体请看[这里](../../components/%E5%85%A8%E5%B1%80%E6%96%B9%E6%B3%95/set-default-search-filter)。

## 查询表格

一般表格都会在顶部放一个查询区域，用来筛选表格，让我们把它做出来。

```tsx
import React from 'react';
import { GSearchTable, GSearchTableField } from 'gbeata';
import { listApi } from '../api';

const fields: Array<GSearchTableField> = [
  {
    title: '姓名',
    key: 'cn',
    search: true,
  },
  {
    title: '编号',
    key: 'index',
  },
  {
    title: '职业',
    key: 'class',
    type: 'select',
    options: [
      { label: '站场C', value: '近卫' },
      { label: '副C', value: '狙击' },
      { label: '后台C', value: '术师' },
      { label: '速切', value: '医疗' },
      { label: '盾奶', value: '重装' },
      { label: '盾C', value: '辅助' },
      { label: '盾辅', value: '特种' },
      { label: '纯妈', value: '先锋' },
    ],
    search: true,
  },
  {
    title: '描述',
    key: 'des',
  },
];

export default function Demo() {
  return (
    <GSearchTable
      api={listApi}
      title="看上面☝️我多了个查询框"
      fields={fields}
    />
  );
}
```

```diff
// 输入框
{
  title: '姓名',
  key: 'cn',
  // 表述顶部出现查询区域，默认为输入框
+ search: true
}

// 选择框
{
  title: '职业',
  key: 'class',
  // 设定类型为查询框
+ type: 'select',
  // 表格会根据 options 展示 label，选择框会作为选项
+ options: [
+  { label: '站场C', value: '近卫' },
+      { label: '副C', value: '狙击' },
+     { label: '后台C', value: '术师' },
+      { label: '速切', value: '医疗' },
+      { label: '盾奶', value: '重装' },
+      { label: '盾C', value: '辅助' },
+      { label: '盾辅', value: '特种' },
+      { label: '纯妈', value: '先锋' }
+ ],
+ search: true
},
```

## 右侧查询表格

如果只有一个查询条件，可以考虑把查询条件放在右侧。

```tsx
import React from 'react';
import { GSearchTable, GSearchTableField } from 'gbeata';
import { listApi } from '../api';

const fields: Array<GSearchTableField> = [
  {
    title: '姓名',
    key: 'cn',
    search: {
      type: 'search',
      position: 'more',
    },
  },
  {
    title: '编号',
    key: 'index',
  },
  {
    title: '职业',
    key: 'class',
    type: 'select',
    options: [
      { label: '站场C', value: '近卫' },
      { label: '副C', value: '狙击' },
      { label: '后台C', value: '术师' },
      { label: '速切', value: '医疗' },
      { label: '盾奶', value: '重装' },
      { label: '盾C', value: '辅助' },
      { label: '盾辅', value: '特种' },
      { label: '纯妈', value: '先锋' },
    ],
  },
  {
    title: '描述',
    key: 'des',
  },
];

export default function Demo() {
  return (
    <GSearchTable
      api={listApi}
      title="你看，我把查询框放到了右边👉"
      fields={fields}
    />
  );
}
```

```diff
{
  title: '姓名',
  key: 'cn',
  // 这样会带个搜索按钮
  search: {
+   type: 'search',
    // 把这个查询条件放到右侧
+   position: 'more'
  }
},
```

更详细的筛选于排序使用方法看[这里](../../components/table/筛选与排序)

## 筛选与排序

```tsx
import React from 'react';
import { GSearchTable, GSearchTableField } from 'gbeata';
import { listApi } from '../api';

const fields: Array<GSearchTableField> = [
  {
    title: '姓名',
    key: 'cn',
  },
  {
    title: '编号',
    key: 'index',
    sort: true,
  },
  {
    title: '职业',
    key: 'class',
    options: [
      { label: '站场C', value: '近卫' },
      { label: '副C', value: '狙击' },
      { label: '后台C', value: '术师' },
      { label: '速切', value: '医疗' },
      { label: '盾奶', value: '重装' },
      { label: '盾C', value: '辅助' },
      { label: '盾辅', value: '特种' },
      { label: '纯妈', value: '先锋' },
    ],
    filter: true,
  },
  {
    title: '描述',
    key: 'des',
  },
];

export default function Demo() {
  return (
    <GSearchTable
      api={listApi}
      rowKey="sort_id"
      title="表格标题"
      fields={fields}
    />
  );
}
```

```diff
{
  title: '编号',
  key: 'index',
+ sort: true
},
{
  title: '职业',
  key: 'class',
  options: [
   { label: '站场C', value: '近卫' },
      { label: '副C', value: '狙击' },
      { label: '后台C', value: '术师' },
      { label: '速切', value: '医疗' },
      { label: '盾奶', value: '重装' },
      { label: '盾C', value: '辅助' },
      { label: '盾辅', value: '特种' },
      { label: '纯妈', value: '先锋' }
  ],
+ filter: true
},
```

更详细的筛选于排序使用方法看[这里](../../components/table/sort-filter)

## 指令按钮

### 新增、详情、编辑

```tsx
import React from 'react';
import {
  GSearchTable,
  GSearchTableField,
  GTableCtrlField,
  GAction,
  Record,
  GCtrl,
} from 'gbeata';
import { listApi, addApi, updateApi } from '../api';

const fields: Array<GSearchTableField> = [
  {
    title: '姓名',
    key: 'cn',
    search: true,
    dialog: {
      required: true,
    },
  },
  {
    title: '编号',
    key: 'index',
    sort: true,
    search: true,
    dialog: {
      required: true,
    },
  },
  {
    title: '职业',
    key: 'class',
    type: 'select',
    options: [
      { label: '站场C', value: '近卫' },
      { label: '副C', value: '狙击' },
      { label: '后台C', value: '术师' },
      { label: '速切', value: '医疗' },
      { label: '盾奶', value: '重装' },
      { label: '盾C', value: '辅助' },
      { label: '盾辅', value: '特种' },
      { label: '纯妈', value: '先锋' },
    ],
    filter: true,
    dialog: true,
  },
  {
    title: '描述',
    key: 'des',
    type: 'textarea',
    dialog: true,
  },
];

const ctrl: GTableCtrlField = {
  render: (_, record: Record) => (
    <GCtrl>
      <GAction record={record} action="view">
        详情
      </GAction>
      <GAction record={record} action="update">
        编辑
      </GAction>
    </GCtrl>
  ),
};

export default function Demo() {
  return (
    <GSearchTable
      api={listApi}
      title="尝试点击【新增】【详情】【编辑】等按钮"
      ctrl={ctrl}
      fields={fields}
      dialogFormExtend={{
        fields,
        addApi,
        updateApi,
      }}
    >
      <GAction action="add">新增</GAction>
    </GSearchTable>
  );
}
```

```diff
const fields: Array<GSearchTableField> = [
  {
    title: '姓名',
    key: 'cn',
    search: true,
+   dialog: {
+     required: true
+   }
  },
  {
    title: '编号',
    key: 'index',
    sort: true
    search: true,
+   dialog: {
+     required: true
+   }
  },
  {
    title: '职业',
    key: 'class',
    type: 'select',
    options: [
      { label: '站场C', value: '近卫' },
      { label: '副C', value: '狙击' },
      { label: '后台C', value: '术师' },
      { label: '速切', value: '医疗' },
      { label: '盾奶', value: '重装' },
      { label: '盾C', value: '辅助' },
      { label: '盾辅', value: '特种' },
      { label: '纯妈', value: '先锋' }
    ],
    filter: true
+   dialog: true
  },
  {
    title: '描述',
    key: 'des',
+   type: 'textarea',
+   dialog: true
  }
]

+const ctrl: GTableCtrlField = {
+ render: (_, record: Record) => (
+   <GCtrl>
+     <GAction record={record} action="view">详情</GAction>
+     <GAction record={record} action="update">编辑</GAction>
+   </GCtrl>
+ )
+}

<GSearchTable
 api={listApi}
 title="尝试点击【新增】【详情】【编辑】等按钮"
 fields={fields}
+ ctrl={ctrl}
+ dialogFormExtend={{
+   fields,
+   addApi,
+   updateApi
+ }}
>
+ <GAction action="add">新增</GAction>
</GSearchTable>
```

:::info
此例子 addApi、updateApi 都是模拟接口，实际场景推荐使用 axios
:::

```js
/**
 * 模拟新增
 * @param params 保存参数
 */
export const addApi = (params: AnyKeyProps): Promise<any> => {
  return new Promise((resolve) => {
    data.unshift({
      id: Date.now(),
      sort_id: Date.now(),
      ...params,
    });
    resolve({
      msg: '请求成功',
      data: Date.now(),
    });
  });
};

/**
 * 模拟修改
 * @param params 保存参数
 */
export const updateApi = (params: AnyKeyProps): Promise<any> => {
  return new Promise((resolve) => {
    let index: number = data.findIndex((row) => row.id === params.id);
    if (index >= 0 && data[index]) {
      data[index] = {
        ...data[index],
        ...params,
      };
    }
    resolve({
      msg: '请求成功',
      data: data[index],
    });
  });
};
```

大概只增加了 20 行代码就能实现了 新增、详情、编辑，好用吧～

### 删除、批量删除

```tsx
import React from 'react';
import {
  GSearchTable,
  GSearchTableField,
  GTableCtrlField,
  GAction,
  Record,
  GCtrl,
} from 'gbeata';
import { listApi, addApi, updateApi, deleteApi } from '../api';

const fields: Array<GSearchTableField> = [
  {
    title: '姓名',
    key: 'cn',
    search: true,
    dialog: {
      required: true,
    },
  },
  {
    title: '编号',
    key: 'index',
    sort: true,
    search: true,
    dialog: {
      required: true,
    },
  },
  {
    title: '职业',
    key: 'class',
    type: 'select',
    options: [
      { label: '站场C', value: '近卫' },
      { label: '副C', value: '狙击' },
      { label: '后台C', value: '术师' },
      { label: '速切', value: '医疗' },
      { label: '盾奶', value: '重装' },
      { label: '盾C', value: '辅助' },
      { label: '盾辅', value: '特种' },
      { label: '纯妈', value: '先锋' },
    ],
    filter: true,
    dialog: true,
  },
  {
    title: '描述',
    key: 'des',
    type: 'textarea',
    dialog: true,
  },
];

const ctrl: GTableCtrlField = {
  render: (_, record: Record) => (
    <GCtrl>
      <GAction record={record} action="view">
        详情
      </GAction>
      <GAction record={record} action="update">
        编辑
      </GAction>
      <GAction record={record} action="delete">
        删除
      </GAction>
    </GCtrl>
  ),
};

export default function Demo() {
  return (
    <GSearchTable
      api={listApi}
      title="尝试勾选几条数据，点个批量删除，还有列表上也有个删除"
      ctrl={ctrl}
      fields={fields}
      selectionType="checkbox"
      rowKey="sort_id"
      selectShowKey="cn"
      deleteApi={deleteApi}
      dialogFormExtend={{
        fields,
        addApi,
        updateApi,
      }}
    >
      <GAction action="add">新增</GAction>
      <GAction action="batch-delete">批量删除</GAction>
    </GSearchTable>
  );
}
```

```diff

const ctrl: GTableCtrlField = {
  render: (_, record: Record) => (
    <GCtrl>
      <GAction record={record} action="view">详情</GAction>
      <GAction record={record} action="update">编辑</GAction>
+     <GAction record={record} action="delete">删除</GAction>
    </GCtrl>
  )
}

<GSearchTable
  api={listApi}
  title="尝试勾选几条数据，点个批量删除，还有列表上也有个删除"
  ctrl={ctrl}
  fields={fields}
+ selectionType="checkbox"
+ rowKey="sort_id"
+ selectShowKey="cn"
+ deleteApi={deleteApi}
  dialogFormExtend={{
    fields,
    addApi,
    updateApi
  }}
>
  <GAction action="add">新增</GAction>
+ <GAction action="batch-delete">批量删除</GAction>
</GSearchTable>
```

同样也很简单，只需要 5 行代码，实现删除 & 批量删除。

:::info
此例子 deleteApi 都是模拟接口，deleteApi 是支持批量删除的，实际场景推荐使用 axios
:::

```js
/**
 * 模拟删除
 * @param params 删除的 id
 */
export const deleteApi = (params: AnyKeyProps): Promise<any> => {
  return new Promise((resolve) => {
    data = data.filter((row) => {
      return !params.includes(row.sort_id);
    });
    resolve({
      msg: '删除成功',
      data: null,
    });
  });
};
```

更详细的指令按钮介绍，请看[这里](../../components/button/mw-action)
