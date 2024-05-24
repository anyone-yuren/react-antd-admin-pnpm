---
title: 标签页
atomId: Tabs
package: ui
description: 选项卡切换组件
group:
  title: 功能
---

# 标签页组件

> 选项卡切换组件

安装`pnpm add ui --filter @gbeata/admin-docs`
<code src="./demos/tabs"></code>

## API

| 属性名    | 描述         | 类型            | 默认值 |
| --------- | ------------ | --------------- | ------ |
| defaultActiveKey  | 初始化选中面板的 key      | string | undefined |
| items | 配置选项卡内容     |   {key: string;label: string;children: string \| JSX.Element;} | [] |
| onChange  | 切换面板的回调      | (key: string) => void; | - |

