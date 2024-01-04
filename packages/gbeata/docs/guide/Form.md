# Form 表单基础

```tsx
/**
 * defaultShowCode: true
 */
import React from 'react';
import { GForm, GButton, GFormField } from 'gbeata';

const fields: Array<GFormField> = [
  {
    title: '中文名',
    key: 'cn',
  },
  {
    title: '年龄',
    type: 'slider',
    key: 'sex',
  },
];

export default function Demo() {
  const handleConfirm = (form: any) => {
    console.log(form);
    alert(JSON.stringify(form));
  };

  return (
    <GForm
      fields={fields}
      onConfirm={handleConfirm}
      style={{ width: 400, margin: '0 auto' }}
    >
      <GButton style={{ marginLeft: 120 }} type="primary" htmlType="submit">
        提交
      </GButton>
    </GForm>
  );
}
```

更详细表单支持的类型看[这里](../../components/form#所有的默认表单类型)

## JSX / TSX 语法糖 <Badge>0.1.0</Badge>

```tsx
/**
 * defaultShowCode: true
 */
import React from 'react';
import { GForm, GButton, GFields, GField } from 'gbeata';

export default function Demo() {
  const handleConfirm = (form: any) => {
    console.log(form);
    alert(JSON.stringify(form));
  };

  return (
    <GForm onConfirm={handleConfirm} style={{ width: 400, margin: '0 auto' }}>
      <GFields>
        <GField title="中文名" key="cn" />
        <GField title="年龄" key="sex" type="slider" />
      </GFields>
      <GButton style={{ marginLeft: 120 }} type="primary" htmlType="submit">
        提交
      </GButton>
    </GForm>
  );
}
```

只是换了另一种风格写 `fields` 而已，请不要用其它元素包裹住 `GFields` 和 `GField`。

## 必填表单

```tsx
import React from 'react';
import { GForm, GButton, GFormField } from 'gbeata';

const fields: Array<GFormField> = [
  {
    title: '中文名',
    key: 'cn',
    required: true,
  },
  {
    title: '年龄',
    type: 'slider',
    key: 'sex',
  },
];

export default function Demo() {
  const handleConfirm = (form: any) => {
    console.log(form);
    alert(JSON.stringify(form));
  };

  return (
    <GForm
      fields={fields}
      onConfirm={handleConfirm}
      style={{ width: 400, margin: '0 auto' }}
    >
      <GButton style={{ marginLeft: 120 }} type="primary" htmlType="submit">
        提交
      </GButton>
    </GForm>
  );
}
```

```diff
const fields: Array<GFormField> = [
  {
    title: '中文名',
    key: 'cn',
    // 推荐这种，写起来简单
+   required: true
    // 虽然可以，但这么写会多一些代码
    // rules: [
    //   {
    //     required: true,
    //     message: '请输入中文名'
    //   }
    // ]
  },
  {
    title: '年龄',
    type: 'slider',
    key: 'sex',
  }
]
```

必填方式有两种

1. 直接指定 `required: true`（Multiway 推荐使用这种）
2. 手动填写 `rules`

## 表单默认值

```tsx
import React from 'react';
import { GForm, GButton, GFormField } from 'gbeata';

const fields: Array<GFormField> = [
  {
    title: '中文名',
    key: 'cn',
    required: true,
    defaultValue: '枫原万叶',
  },
  {
    title: '年龄',
    type: 'slider',
    key: 'sex',
    required: true,
    defaultValue: 18,
  },
];

export default function Demo() {
  const handleConfirm = (form: any) => {
    console.log(form);
    alert(JSON.stringify(form));
  };

  return (
    <GForm
      fields={fields}
      onConfirm={handleConfirm}
      style={{ width: 400, margin: '0 auto' }}
    >
      <GButton style={{ marginLeft: 120 }} type="primary" htmlType="submit">
        提交
      </GButton>
    </GForm>
  );
}
```

```diff
const fields: Array<GFormField> = [
  {
    title: '中文名',
    key: 'cn',
    required: true,
+   defaultValue: '枫原万叶'
  },
  {
    title: '年龄',
    type: 'slider',
    key: 'sex',
    required: true,
+   defaultValue: 18
  }
]
```

## 只读表单

### 表单元素只读

```tsx
import React from 'react';
import { GForm, GButton, GFormField } from 'gbeata';
import { Card } from 'antd';

const fields: Array<GFormField> = [
  {
    title: '中文名',
    key: 'cn',
    readonly: true,
    defaultValue: '枫原万叶',
  },
  {
    title: '年龄',
    type: 'slider',
    key: 'sex',
    defaultValue: 18,
  },
];

export default function Demo() {
  const handleConfirm = (form: any) => {
    console.log(form);
    alert(JSON.stringify(form));
  };

  return (
    <Card>
      <GForm
        fields={fields}
        onConfirm={handleConfirm}
        style={{ width: 400, margin: '0 auto' }}
      >
        <GButton style={{ marginLeft: 120 }} type="primary" htmlType="submit">
          提交
        </GButton>
      </GForm>
    </Card>
  );
}
```

```diff
const fields: Array<GFormField> = [
  {
    title: '中文名',
    key: 'cn',
+   readonly: true,
    defaultValue: '枫原万叶'
  },
  {
    title: '年龄',
    type: 'slider',
    key: 'sex',
    defaultValue: 18
  }
]
```

### 表单整体只读

```tsx
import React from 'react';
import { GForm, GButton, GFormField } from 'gbeata';
import { Card } from 'antd';

const fields: Array<GFormField> = [
  {
    title: '中文名',
    key: 'cn',
    defaultValue: '枫原万叶',
  },
  {
    title: '年龄',
    type: 'slider',
    key: 'sex',
    defaultValue: 18,
  },
];

export default function Demo() {
  const handleConfirm = (form: any) => {
    console.log(form);
    alert(JSON.stringify(form));
  };

  return (
    <Card>
      <GForm
        readonly
        fields={fields}
        onConfirm={handleConfirm}
        style={{ width: 400, margin: '0 auto' }}
      >
        <GButton style={{ marginLeft: 120 }} type="primary" htmlType="submit">
          提交
        </GButton>
      </GForm>
    </Card>
  );
}
```

```diff

<GForm
+ readonly
  fields={fields}
/>
  <GButton type="primary" htmlType="submit">
    提交
  </GButton>
</GForm>
```

## desc 模式

### desc 表单

```tsx
import React from 'react';
import { GForm, GButton, GFormField } from 'gbeata';
import { Card } from 'antd';

const fields: Array<GFormField> = [
  {
    title: '中文名',
    key: 'cn',
    defaultValue: '枫原万叶',
  },
  {
    title: '年龄',
    type: 'slider',
    key: 'sex',
    defaultValue: 18,
  },
];

export default function Demo() {
  const handleConfirm = (form: any) => {
    console.log(form);
    alert(JSON.stringify(form));
  };

  return (
    <Card>
      <GForm
        desc
        fields={fields}
        onConfirm={handleConfirm}
        style={{ width: 400, margin: '0 auto' }}
      >
        <GButton style={{ marginTop: 16 }} type="primary" htmlType="submit">
          提交
        </GButton>
      </GForm>
    </Card>
  );
}
```

```diff
<GForm
+ desc
  fields={fields}
>
</GForm>
```

### desc 只读表单

```tsx
import React from 'react';
import { GForm, GButton, GFormField } from 'gbeata';
import { Card } from 'antd';

const fields: Array<GFormField> = [
  {
    title: '中文名',
    key: 'cn',
    defaultValue: '枫原万叶',
  },
  {
    title: '年龄',
    type: 'slider',
    key: 'sex',
    defaultValue: 18,
  },
];

export default function Demo() {
  const handleConfirm = (form: any) => {
    console.log(form);
    alert(JSON.stringify(form));
  };

  return (
    <Card>
      <GForm
        readonly
        desc
        fields={fields}
        onConfirm={handleConfirm}
        style={{ width: 400, margin: '0 auto' }}
      >
        <GButton style={{ marginTop: 16 }} type="primary" htmlType="submit">
          提交
        </GButton>
      </GForm>
    </Card>
  );
}
```

```diff
<GForm
+ desc
+ readonly
  fields={fields}
>
</GForm>
```

## 弹窗表单

```tsx
/**
 * defaultShowCode: true
 */
import React, { useRef } from 'react';
import { GDialogForm, GFormField, GButton, success } from 'gbeata';
import { addApi } from '../api';

const fields: Array<GFormField> = [
  {
    title: '中文名',
    key: 'cn',
    required: true,
  },
  {
    title: '编号',
    key: 'index',
    required: true,
  },
];

export default function Demo() {
  const formRef = useRef<any>();

  const handleAdd = () => {
    formRef.current.add().then(() => {
      success('新增成功');
    });
  };

  return (
    <div>
      <GDialogForm ref={formRef} fields={fields} addApi={addApi} />
      <GButton onClick={handleAdd}>新增</GButton>
    </div>
  );
}
```

更详细的弹窗表单使用，请看[这里](../../components/form/g-dialog-form)
