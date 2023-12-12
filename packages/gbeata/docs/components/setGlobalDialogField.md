---
group: 全局配置
---

# GDialog 全局处理弹窗公用行为

## 约定返回的格式

可以通过 `setGlobalDialogField` 设置一些弹窗的默认属性，比如你要全局控制弹窗是否可点击蒙层关闭。

```tsx
import React, { useState } from 'react';
import { GDialog, GButton, setGlobalDialogField } from 'gbeata';

setGlobalDialogField(() => {
  return {
    maskClosable: false,
  };
});

export default function Demo() {
  const [visible, setVisible] = useState<boolean>(false);
  return (
    <div>
      <GButton type="primary" onClick={() => setVisible(true)}>
        打开弹窗
      </GButton>
      <GDialog
        title="弹窗"
        visible={visible}
        onClose={() => setVisible(false)}
        onConfirm={() => alert('确认')}
      >
        <p>这里是弹窗的内容。</p>
      </GDialog>
    </div>
  );
}
```

## 组件内控制

如果你想覆盖全局默认的配置，可以在组件内单独执行`setGlobalDialogField`覆盖全局配置，以查询表格为例：

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
      { label: '近卫干员', value: '近卫' },
      { label: '狙击干员', value: '狙击' },
      { label: '术师重装', value: '术师' },
      { label: '医疗干员', value: '医疗' },
      { label: '重装干员', value: '重装' },
      { label: '辅助干员', value: '辅助' },
      { label: '特种干员', value: '特种' },
      { label: '先锋干员', value: '先锋' },
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
      rowKey="sort_id"
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
      { label: '近卫干员', value: '近卫' },
      { label: '狙击干员', value: '狙击' },
      { label: '术师重装', value: '术师' },
      { label: '医疗干员', value: '医疗' },
      { label: '重装干员', value: '重装' },
      { label: '辅助干员', value: '辅助' },
      { label: '特种干员', value: '特种' },
      { label: '先锋干员', value: '先锋' }
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
  ctrl={ctrl}
+ dialogFormExtend={{
+   dialogExtend: {
+					maskClosable: false
+				}
+ }}
>
+ <GAction action="add">新增</GAction>
</GSearchTable>
```

<embed src="./index.md"></embed>
