---
group:
  title: 通用组件
---

# BasicModal

`BasicModal` 是对 Modal 做了一层简单的封装，支持拖拽移动弹出框

引用方式：`import { BasicModal } from 'KellyCOM';`

## 功能特点：

- 在 antd 基础上封装了拖拽的功能，支持拖拽移动弹出框

## 基础使用：

<code src="./demo/Demo.tsx"></code>

## API

## API

| 参数            |                               说明                               |         类型         | 默认值  |
| :-------------- | :--------------------------------------------------------------: | :------------------: | :-----: |
| draggable       |                      Modal 可否支持鼠标拖拽                      |      `boolean`       | `true ` |
| afterClose      |                      Modal 完全关闭后的回调                      |      `function`      |    -    |
| autoFocusButton |                      指定自动获得焦点的按钮                      | `null / ok / cancel` |  `ok`   |
| cancelText      |                 设置 Modal.confirm 取消按钮文字                  |       `string`       | `取消 ` |
| width           |                               宽度                               |    string: number    |   416   |
| title           |                               标题                               |      ReactNode       |    -    |
| maskClosable    |                       点击蒙层是否允许关闭                       |      `boolean`       | `false` |
| onCancel        |   取消回调，参数为关闭函数，返回 promise 时 resolve 后自动关闭   |   function(close)    |    -    |
| onOk            | 点击确定回调，参数为关闭函数，返回 promise 时 resolve 后自动关闭 |   function(close)    |    -    |