---
title: 点云组件
atomId: PointCloud
package: ui
description: 基于 three.js 和 react-three/fiber 编写的点云渲染组件，支持 10 万个点的渲染、框选和高亮
group:
  title: 3D组件
---

# 点云组件

> 基于 three.js 和 react-three/fiber 编写的点云渲染组件，支持 10 万个点的渲染、鼠标框选和高亮显示选中的点

安装`pnpm add ui --filter @gbeata/admin-docs`
<code src="./demos/point"></code>

## API

| 属性名            | 描述                  | 类型                                  | 默认值     |
| ----------------- | --------------------- | ------------------------------------- | ---------- |
| pointCount        | 点的数量              | number                                | 100000     |
| range             | 点云的范围            | number                                | 100        |
| defaultColor      | 点的默认颜色          | string                                | '#888888'  |
| selectedColor     | 选中点的颜色          | string                                | '#ff0000'  |
| pointSize         | 点的半径              | number                                | 0.1        |
| height            | 容器高度              | number                                | 600        |
| onSelectionChange | 选中点变化的回调      | (selectedIndices: number[]) => void   | -          |
