---
nav: 组件
group: 表格table
order: 6
---

# 禁用表格选项

```tsx
import React from 'react';
import { GSearchTable, GSearchTableField } from 'gbeata';
import { listApi } from '../api';

const fields: Array<GSearchTableField> = [
  {
    title: '姓名',
    key: 'cn',
    type: 'group',
  },
  {
    title: '英文名',
    key: 'en',
  },
];

export default function Demo() {
  return (
    <GSearchTable
      title="下面的表格禁用了 凝光 的选项"
      selectionType="checkbox"
      api={listApi}
      fields={fields}
      searchVisible={false}
      rowKey="sort_id"
      selectShowKey="cn"
      rowSelection={{
        getCheckboxProps: (record: any) => {
          return {
            disabled: record.en === '凝光',
          };
        },
      }}
    />
  );
}
```

```diff
<GSearchTable
+ rowSelection={{
+   getCheckboxProps: (record: any) => {
+     return {
+       disabled: record.en === 'Multiway'
+     }
+   }
+ }}
/>
```
