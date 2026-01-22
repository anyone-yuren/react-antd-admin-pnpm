---
title: 10W级渲染组件
atomId: InstancedPoints
package: ui
description: 基于react-three/fiber构建的大量相同Mesh渲染组件
group:
  title: 特效
---

# 10W级渲染组件

基于 `react-three/fiber` , 主要使用 `InstancedMesh` 构建的大量相同Mesh渲染组件，支持渲染 10 万个以上的点，并提供框选和高亮选中点的功能。

安装`pnpm add ui --filter @gbeata/admin-docs`

<code src="./demos/InstancedMesh100k.tsx"></code>

## API

### InstancedPoints

纯 `react-three/fiber` 组件，需要在 `Canvas` 内部使用。

| 属性名        | 描述           | 类型     | 默认值   |
| ------------- | -------------- | -------- | -------- |
| count         | 点的数量       | number   | 100000   |
| color         | 未选中点的颜色 | string   | '#4CAF50'|
| selectedColor | 选中点的颜色   | string   | '#F44336'|
| enableSelection | 是否启用框选 | boolean  | true     |
