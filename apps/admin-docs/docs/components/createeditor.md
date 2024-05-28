---
title: 图形绘制编辑器
atomId: CreateEditor
package: ui
description: 基于react-konva封装的一款自由绘画的画板
group:
  title: 功能
---

# 图形绘制编辑器

> 暂时只支持绘制矩形，未来会支持绘制各种形状、图片、svg等\
> 未来会增加编辑器常用功能

安装`pnpm add ui --filter @gbeata/admin-docs`
<code src="./demos/createeditor"></code>

## API

| 属性名    | 描述         | 类型            | 默认值 |
| --------- | ------------ | --------------- | ------ |
| creating  | 是否开始绘制       | boolean | false |
| onFinish | 绘制完成的回调     | ( {start:{x:number,y:number},end:{x:number,y:number} })=>void |  |
| type | 图形的类型 | 'rect' |

