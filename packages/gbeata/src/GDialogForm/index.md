---
nav: 组件
group: 表单form
order: 1
---

# GDialogForm 弹窗表单

GDialogForm 提供了用 `state` 控制的方式，作为默认推荐的使用方式。

以前的用法请查看[另一种使用方式](#另一种使用方式)。

## 基础使用 <Badge>0.1.0</Badge>

```tsx
import React, { useState, useRef } from 'react';
import { GButton, GDialogFormField, GDialogForm } from 'gbeata';
import { Space, message } from 'antd';
import { professionOptions } from '../api';

export default function AyDialogFormDemo() {
  const formRef = useRef<any>();
  // 弹窗是否可见
  const [visible, setVisible] = useState(false);

  const fields: Array<GDialogFormField> = [
    {
      title: '姓名',
      key: 'cn',
      required: true,
    },
    {
      title: '初始HP',
      key: 'ori-hp',
    },
    {
      title: '职业',
      key: 'class',
      type: 'select',
      options: professionOptions,
    },
  ];

  /** 新增 */
  const handleAdd = () => {
    setVisible(true);
  };

  return (
    <div className="demo">
      <Space>
        <GButton onClick={handleAdd}>新增</GButton>
      </Space>
      <GDialogForm
        ref={formRef}
        visible={visible}
        fields={fields}
        addApi={() => new Promise((resolve) => resolve({}))}
        onClose={() => setVisible(false)}
        onSuccess={() => message.success('操作成功')}
      />
    </div>
  );
}
```

## 默认值设置 <Badge>0.1.0</Badge>

`initialValues` 可以在打开弹窗后，给表单设置初始值。

```tsx
import React, { useState, useRef } from 'react';
import { GButton, GDialogFormField, GDialogForm } from 'gbeata';
import { Space, message } from 'antd';
import { professionOptions } from '../api';

export default function AyDialogFormDemo() {
  const formRef = useRef<any>();
  // 弹窗是否可见
  const [visible, setVisible] = useState(false);

  const fields: Array<GDialogFormField> = [
    {
      title: '姓名',
      key: 'cn',
      required: true,
    },
    {
      title: '初始HP',
      key: 'ori-hp',
    },
    {
      title: '职业',
      key: 'class',
      type: 'select',
      options: professionOptions,
    },
  ];

  /** 新增 */
  const handleAdd = () => {
    setVisible(true);
  };

  return (
    <div className="demo">
      <Space>
        <GButton onClick={handleAdd}>新增</GButton>
      </Space>
      <GDialogForm
        ref={formRef}
        visible={visible}
        fields={fields}
        initialValues={{
          cn: 'gbeata',
        }}
        addApi={() => new Promise((resolve) => resolve({}))}
        onClose={() => setVisible(false)}
        onSuccess={() => message.success('操作成功')}
      />
    </div>
  );
}
```

## 新增、编辑、详情 <Badge>0.1.0</Badge>

当需要用到这三种模式时，推荐把属性聚合在一起使用。

如下面这个例子，分开来存储会更加直观。

visible 控制显示，initialValues 控制默认值，mode 控制弹窗模式（会影响标题、是否只读），spinning 控制弹窗数据是否正在加载中。

```tsx
import React, { useState } from 'react';
import { GButton, GDialogFormField, GDialogForm } from 'gbeata';
import { Space, message } from 'antd';
import { detailApi, professionOptions } from '../api';

interface IProps {
  visible: boolean;
  initialValues: any;
  mode: 'add' | 'update' | 'view';
  spinning: boolean;
}

const defaultProps: IProps = {
  // 是否可见
  visible: false,
  // 弹窗默认值
  initialValues: {},
  // 模式， view 模式下表格会只读
  mode: 'add',
  // 是否正在加载
  spinning: false,
};

export default function AyDialogFormDemo() {
  // 弹窗属性
  const [dialogProps, setDialogProps] = useState<IProps>(defaultProps);

  const fields: Array<GDialogFormField> = [
    {
      title: '姓名',
      key: 'cn',
      required: true,
    },
    {
      title: '初始HP',
      key: 'ori-hp',
    },
    {
      title: '职业',
      key: 'class',
      type: 'select',
      options: professionOptions,
    },
  ];

  /** 新增 */
  const handleAdd = () => {
    setDialogProps({
      mode: 'add',
      initialValues: {},
      visible: true,
      spinning: false,
    });
  };

  /** 编辑 */
  const handleUpdate = () => {
    setDialogProps({
      mode: 'update',
      initialValues: {},
      visible: true,
      spinning: true,
    });
    // 获取详情
    detailApi(55).then((res) => {
      setDialogProps({
        mode: 'update',
        initialValues: res.data,
        visible: true,
        spinning: false,
      });
    });
  };

  /** 详情 */
  const handleView = () => {
    setDialogProps({
      mode: 'view',
      initialValues: {},
      visible: true,
      spinning: true,
    });
    // 获取详情
    detailApi(55).then((res) => {
      setDialogProps({
        mode: 'view',
        initialValues: res.data,
        visible: true,
        spinning: false,
      });
    });
  };

  return (
    <div className="demo">
      <Space>
        <GButton onClick={handleAdd}>新增</GButton>
        <GButton onClick={handleUpdate}>编辑</GButton>
        <GButton onClick={handleView}>详情</GButton>
      </Space>
      <GDialogForm
        {...dialogProps}
        fields={fields}
        addApi={() => new Promise((resolve) => resolve({}))}
        updateApi={() => new Promise((resolve) => resolve({}))}
        onClose={() => setDialogProps(defaultProps)}
        onSuccess={() => message.success('操作成功')}
      />
    </div>
  );
}
```

## JSX / TSX 语法糖 <Badge>0.41.0</Badge>

```tsx
import React, { useState } from 'react';
import { GButton, GDialogForm, GFields, GField } from 'gbeata';
import { Space, message } from 'antd';
import { detailApi, professionOptions } from '../api';

interface IProps {
  visible: boolean;
  initialValues: any;
  mode: 'add' | 'update' | 'view';
  spinning: boolean;
}

const defaultProps: IProps = {
  // 是否可见
  visible: false,
  // 弹窗默认值
  initialValues: {},
  // 模式， view 模式下表格会只读
  mode: 'add',
  // 是否正在加载
  spinning: false,
};

export default function AyDialogFormDemo() {
  // 弹窗属性
  const [dialogProps, setDialogProps] = useState<IProps>(defaultProps);

  /** 新增 */
  const handleAdd = () => {
    setDialogProps({
      mode: 'add',
      initialValues: {},
      visible: true,
      spinning: false,
    });
  };

  /** 编辑 */
  const handleUpdate = () => {
    setDialogProps({
      mode: 'update',
      initialValues: {},
      visible: true,
      spinning: true,
    });
    // 获取详情
    detailApi(55).then((res) => {
      setDialogProps({
        mode: 'update',
        initialValues: res.data,
        visible: true,
        spinning: false,
      });
    });
  };

  /** 详情 */
  const handleView = () => {
    setDialogProps({
      mode: 'view',
      initialValues: {},
      visible: true,
      spinning: true,
    });
    // 获取详情
    detailApi(55).then((res) => {
      setDialogProps({
        mode: 'view',
        initialValues: res.data,
        visible: true,
        spinning: false,
      });
    });
  };

  return (
    <div className="demo">
      <Space>
        <GButton onClick={handleAdd}>新增</GButton>
        <GButton onClick={handleUpdate}>编辑</GButton>
        <GButton onClick={handleView}>详情</GButton>
      </Space>
      <GDialogForm
        {...dialogProps}
        addApi={() => new Promise((resolve) => resolve({}))}
        updateApi={() => new Promise((resolve) => resolve({}))}
        onClose={() => setDialogProps(defaultProps)}
        onSuccess={() => message.success('操作成功')}
      >
        <GFields>
          <GField title="姓名" key="cn" required />
          <GField title="初始HP" key="ori-hp" />
          <GField
            title="职业"
            key="class"
            type="select"
            options={professionOptions}
          />
        </GFields>
      </GDialogForm>
    </div>
  );
}
```

```diff
-const fields: Array<GDialogFormField> = [
- {
-   title: '姓名',
-   key: 'cn'
- },
- {
-   title: '初始HP',
-   key: 'ori-hp'
- },
- {
-   title: '职业',
-   key: 'class',
-   type: 'select',
-   options: professionOptions
- }
-]

<GDialogForm
- fields={fields}
>
+ <GFields>
+   <GField title="姓名" key="cn" />
+   <GField title="初始HP" key="ori-hp" />
+   <GField title="职业" key="class" type="select" options={professionOptions} />
+ </GFields>
</GDialogForm>
```

只是换了另一种风格写 `fields` 而已，请不要用其它元素包裹住 `GFields` 和 `GField`。

## 侧边弹窗

添加 `drawer` 可让弹窗变成 Drawer 状态显示，最好添加 `formLayout: 'vertical'`，让表单的 `label` 放在输入框上面。

```tsx
import React, { useState } from 'react';
import { GButton, GDialogFormField, GDialogForm } from 'gbeata';
import { Space, message } from 'antd';
import { professionOptions } from '../api';

export default function AyDialogFormDemo() {
  // 弹窗是否可见
  const [visible, setVisible] = useState(false);

  const fields: Array<GDialogFormField> = [
    {
      title: '姓名',
      key: 'cn',
      required: true,
    },
    {
      title: '初始HP',
      key: 'ori-hp',
    },
    {
      title: '职业',
      key: 'class',
      type: 'select',
      options: professionOptions,
    },
  ];

  /** 新增 */
  const handleAdd = () => {
    setVisible(true);
  };

  return (
    <div className="demo">
      <Space>
        <GButton onClick={handleAdd}>新增</GButton>
      </Space>
      <GDialogForm
        visible={visible}
        fields={fields}
        drawer
        formExtend={{
          formLayout: 'vertical',
        }}
        addApi={() => new Promise((resolve) => resolve({}))}
        onClose={() => setVisible(false)}
        onSuccess={() => message.success('操作成功')}
      />
    </div>
  );
}
```

## 失败监听

```tsx
import React, { useState } from 'react';
import { GButton, GDialogFormField, GDialogForm, AnyKeyProps } from 'gbeata';
import { Space, message } from 'antd';

export default function AyDialogFormDemo() {
  // 弹窗是否可见
  const [visible, setVisible] = useState(false);

  const fields: Array<GDialogFormField> = [
    {
      type: 'textarea',
      key: 'reason',
      placeholder: '请输入审批意见',
      help: '*点击确定后，会提示失败消息，请打开 console，查看打印的数据。',
      defaultValue: '',
      formItemProps: {
        style: {
          marginBottom: 0,
        },
      },
    },
  ];

  /** 新增 */
  const handleAdd = () => {
    setVisible(true);
  };

  return (
    <div className="demo">
      <Space>
        <GButton onClick={handleAdd}>审批</GButton>
      </Space>
      <GDialogForm
        title="审批通过"
        visible={visible}
        fields={fields}
        span={24}
        addApi={() =>
          new Promise((resolve, reject) =>
            reject({ msg: '我是接口返回的数据' }),
          )
        }
        onClose={() => setVisible(false)}
        onError={(props: AnyKeyProps) => {
          message.error('操作失败');
          console.log(props);
        }}
      />
    </div>
  );
}
```

## 另一种使用方式

gbeata 提供了另一种使用方式，通过 add()、update()、view() 方法，可以减少声明 `state` 的声明，在 `GSearchTable` 里，内嵌的 `GDialogForm` 也默认的是此使用方式。

```tsx
import React, { useRef } from 'react';
import {
  GButton,
  GDialogFormField,
  GDialogForm,
  success,
  AnyKeyProps,
} from 'gbeata';
import { Space } from 'antd';
import { detailApi, addApi, updateApi, professionOptions } from '../api';

export default function AyDialogFormDemo() {
  const formRef = useRef<any>();

  const fields: Array<GDialogFormField> = [
    {
      title: '姓名',
      key: 'cn',
    },
    {
      title: '初始HP',
      key: 'ori-hp',
    },
    {
      title: '职业',
      key: 'class',
      type: 'select',
      options: professionOptions,
    },
  ];

  const handleAdd = () => {
    formRef.current.add().then((data: AnyKeyProps) => {
      console.log(data);
      success('新增成功');
    });
  };

  const handleUpdate = () => {
    // 获取详情
    detailApi(55).then((res) => {
      formRef.current.update(res.data).then((data: AnyKeyProps) => {
        console.log(data);
        success('编辑成功');
      });
    });
  };

  const handleView = () => {
    detailApi(55).then((res) => {
      formRef.current.view(res.data);
    });
  };

  return (
    <div className="demo">
      <Space>
        <GButton onClick={handleAdd}>新增</GButton>
        <GButton onClick={handleUpdate}>编辑</GButton>
        <GButton onClick={handleView}>详情</GButton>
      </Space>
      <GDialogForm
        ref={formRef}
        fields={fields}
        addApi={addApi}
        updateApi={updateApi}
      />
    </div>
  );
}
```

## Props

| 方法名       | 说明                                                  | 可选值                                                     | 默认值 | 版本  |
| ------------ | ----------------------------------------------------- | ---------------------------------------------------------- | ------ | ----- |
| title        | 弹窗的标题，如不设置，则按照 mode 设置默认值。        | string                                                     | -      | -     |
| name         | 弹窗名字，一般不需要设置。                            | string                                                     | -      | -     |
| width        | 弹窗宽度。                                            | number                                                     | -      | -     |
| span         | 每个 Field 所占的 span 值。                           | number                                                     | 24     | -     |
| fields       | 表单项，跟 GForm 一致。                               | Array[GFormField]                                          | -      | -     |
| addApi       | 进入编辑模式。                                        | Promise                                                    | -      | -     |
| updateApi    | 进出详情模式。                                        | Promise                                                    | -      | -     |
| beforeSubmit | 表单的提交前校验，return false 则不会提交。           | (params?: AnyKeyProps, mode?: string) => boolean \| obejct | -      | -     |
| dialogOnly   | 是否只使用申明了 dialog 的 Field。                    | boolean                                                    | false  | -     |
| dialogExtend | [GDialog](../g-dialog#参数) 的扩展值。                | object                                                     | -      | -     |
| formExtend   | [GForm](../form#props-参数) 的扩展值。                | object                                                     | -      | -     |
| autoClose    | 成功后是否自动关闭弹窗。                              | boolean                                                    | true   | -     |
| drawer       | 是否用 Drawer 替换 Modal。                            | boolean                                                    | false  | -     |
| visible      | 弹窗是否可见。                                        | boolean                                                    | false  | 0.1.0 |
| defaultValue | 弹窗打开后，表单的默认值                              | object                                                     | {}     | 0.1.0 |
| mode         | 打开的模式，会影响标题和只读，设置 'view'后表单只读。 | 'add'\| 'update' \| 'view'                                 | 'add'  | 0.1.0 |
| spinning     | 打开弹窗后，表单是否处于正在加载数据的阶段。          | boolean                                                    | false  | 0.1.0 |
| onSuccess    | 成功回调，可见[下方](#config-返回值)具体说明。        | ({ data, values, params, initParams, closeDialog })        | -      | 0.1.0 |
| onError      | 失败回调，可见[下方](#config-返回值)具体说明。        | ({ data, values, params, initParams, closeDialog })        | -      | 0.1.0 |
| onClose      | 弹窗关闭事件监听。                                    | () => void                                                 | -      | 0.1.0 |
| onCancel     | 弹窗关闭事件，效果跟 onClose 一致。                   | () => void                                                 | 0.53.0 |

## Method

| 方法名                         | 说明                                                        | 使用案例                                                  |
| ------------------------------ | ----------------------------------------------------------- | --------------------------------------------------------- |
| add                            | 进入新增模式，会自动设置 mode="add"。                       | formRef.current.add(record: Record, [config](#config))    |
| update                         | 进入编辑模式，会自动设置 mode="update"。                    | formRef.current.update(record: Record, [config](#config)) |
| view                           | 进入详情模式，会自动设置 mode="view"。                      | formRef.current.view(record: Record, [config](#config))   |
| closeDialog                    | 关闭弹窗。                                                  | formRef.current.view(record: Record)                      |
| getFormRef                     | 获取里面嵌套的 GForm 的对象，可以调用 GForm 的一些方法。    | formRef.current.getFormRef()                              |
| refreshFields                  | 刷新 form 的列。                                            | formRef.current.refreshFields()                           |
| submit()                       | 主动提交表单。                                              | -                                                         |
| resetFields()                  | 重置表单。                                                  | -                                                         |
| getFieldValue(key: string)     | 根据 key 获取表单值。                                       | any                                                       |
| getFieldsValue()               | 获取所有表单值。                                            | values: Object                                            |
| getFormatFieldsValue()         | 获取已经过滤后的表单值，当有嵌套时使用。                    | values: Object                                            |
| setFieldsValue(values: Object) | 设置表单值。                                                | -                                                         |
| refreshFields()                | 重新渲染表单，如果动态改变了 fields，可以用此参数重新渲染。 | -                                                         |

## config

| 参数      | 说明                                         | 返回值                                               |
| --------- | -------------------------------------------- | ---------------------------------------------------- |
| onSuccess | 成功回调，可见[下方](#config-返回值)具体说明 | ({ data, values, params, initParams, closeDialog })  |
| onError   | 失败回调，可见[下方](#config-返回值)具体说明 | ({ error, values, params, initParams, closeDialog }) |

## config 返回值

| 参数        | 说明             | 类型                   |
| ----------- | ---------------- | ---------------------- |
| data        | 请求成功的返回值 | obejct                 |
| error       | 请求失败的返回值 | 接口返回什么就返回什么 |
| values      | 表单的提交数据   | obejct                 |
| params      | 接口请求的数据   | obejct                 |
| initParams  | 请求的默认数据   | object                 |
| closeDialog | 关闭弹窗的方法   | function               |
