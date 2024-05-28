---
title: 弹窗组件
atomId: ButtonModal
package: ui
description: 基于antd v5封装的组件
group:
  title: 功能
---

# 弹窗组件

> 点击按钮即可触发弹窗

安装`pnpm add ui --filter @gbeata/admin-docs`
<code src="./demos/buttonmodal"></code>

## API

| 属性名    | 描述         | 类型            | 默认值 |
| --------- | ------------ | --------------- | ------ |
| children  | 弹窗的body元素       | React.ReactNode |  |
| modalProps | modal需要的props     | ModalProps | [ModalProps](https://ant.design/components/modal-cn#api) |
| buttonProps | button需要的props | ButtonProps | [ButtonProps](https://ant.design/components/button-cn) & {text: string}

