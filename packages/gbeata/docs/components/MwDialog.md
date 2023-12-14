---
group: 其他
---

# GDialog

## 基础示例

```tsx
import React, { useState } from 'react';
import { GDialog, GButton } from 'gbeata';

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

## Drawer 模式

```tsx
import React, { useState } from 'react';
import { GDialog, GButton } from 'gbeata';

export default function Demo() {
  const [visible, setVisible] = useState<boolean>(false);
  return (
    <div>
      <GButton type="primary" onClick={() => setVisible(true)}>
        打开弹窗
      </GButton>
      <GDialog
        drawer
        title="侧边弹窗"
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

## 没有下半部分按钮

设置 `footer={false}` 可以让弹窗没有底部按钮。

```tsx
import React, { useState } from 'react';
import { GDialog, GButton } from 'gbeata';
import { Space } from 'antd';

export default function Demo() {
  const [visible, setVisible] = useState<boolean>(false);
  const [visibleDrawer, setVisibleDrawer] = useState<boolean>(false);
  return (
    <Space>
      <GButton type="primary" onClick={() => setVisible(true)}>
        打开弹窗
      </GButton>
      <GButton type="primary" onClick={() => setVisibleDrawer(true)}>
        打开侧边弹窗
      </GButton>
      <GDialog
        footer={false}
        title="弹窗"
        visible={visible}
        onClose={() => setVisible(false)}
      >
        <p>这里是弹窗的内容。</p>
      </GDialog>
      <GDialog
        footer={false}
        drawer
        title="侧边弹窗"
        visible={visibleDrawer}
        onClose={() => setVisibleDrawer(false)}
      >
        <p>这里是弹窗的内容。</p>
      </GDialog>
    </Space>
  );
}
```

## 元素插槽

```tsx
import React, { useState } from 'react';
import { GDialog, GButton } from 'gbeata';

export default function Demo() {
  const [visible, setVisible] = useState<boolean>(false);
  return (
    <div>
      <GButton type="primary" onClick={() => setVisible(true)}>
        打开弹窗
      </GButton>
      <GDialog
        width={800}
        titleBefore={<GButton>标题之前</GButton>}
        titleAfter={<GButton>标题之后</GButton>}
        cancelBefore={<GButton>关闭之前</GButton>}
        cancelAfter={<GButton>关闭之后</GButton>}
        confirmBefore={<GButton>确认之前</GButton>}
        confirmAfter={<GButton>确认之后</GButton>}
        title="底部元素添加"
        visible={visible}
        setVisible={() => setVisible(false)}
        onConfirm={() => alert('确认')}
      >
        <p>头部有 2 个放置元素。</p>
        <p>底部有 4 个位置可以放置元素。</p>
      </GDialog>
    </div>
  );
}
```

## 参数

| 参数名         | 说明                                    | 参数类型                            | 默认值 |
| -------------- | --------------------------------------- | ----------------------------------- | ------ |
| title          | 标题                                    | ReactNode                           | -      |
| visible        | 是否展示                                | boolean                             | -      |
| setVisible     | 自动关闭弹窗时，可以传递此参数          | Dispatch<SetStateAction<boolean\>\> | -      |
| loading        | 是否正在加载                            | boolean                             | -      |
| footer         | 自定义底部按钮, 设置 false 会隐藏       | ReactNode \| boolean                | -      |
| width          | 弹窗宽度                                | number                              | -      |
| drawer         | 是否侧边展示                            | boolean                             | false  |
| titleBefore    | 标题前置元素                            | ReactNode                           | -      |
| titleAfter     | 标题后置元素                            | ReactNode                           | -      |
| confirmVisible | 确定按钮是否展示                        | boolean                             | true   |
| cancelVisible  | 关闭按钮是否展示                        | boolean                             | true   |
| confirmText    | 确定按钮文字                            | string                              | '确定' |
| cancelText     | 关闭按钮文字                            | string                              | '关闭' |
| confirmProps   | 确认按钮属性                            | GButtonProps                        | {}     |
| cancelProps    | 关闭按钮属性                            | GButtonProps                        | {}     |
| confirmBefore  | 确定按钮前置元素                        | ReactNode                           | -      |
| confirmAfter   | 确定按钮后置元素                        | ReactNode                           | -      |
| cancelBefore   | 关闭按钮前置元素                        | ReactNode                           | -      |
| cancelAfter    | 关闭按钮后置元素                        | ReactNode                           | -      |
| className      | 样式                                    | -                                   | -      |
| onClose        | 弹窗关闭事件                            | () => void                          | 0.48.0 |
| onCancel       | 弹窗关闭事件，效果跟 onClose 一致。     | () => void                          | 0.53.0 |
| onConfirm      | 确认按钮事件监听                        | () => void                          | -      |
| onOk           | 确认按钮事件监听，效果跟 onConfirm 一致 | () => void                          | 0.52.0 |

### 样式设置注意点

```html
// 注意样式设置时，样式会在外层，如果想要设置 body 里的元素样式，请尝试这样写。

<GDialog className="dialog-class"> </GDialog>
<GDialog className="drawer-class" drawer> </GDialog>

<style>
  .dialog-class .ant-modal-body {
    // 这里设置弹窗样式
  }
  .drawer-class .ant-drawer-body {
    // 这里设置侧边弹窗样式
  }
</style>
```

[1]: https://ant-design.gitee.io/components/modal-cn/#API
