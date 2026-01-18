---
title: 加载组件
atomId: Loading
package: ui
description: 一个优雅的加载动画组件，支持多种尺寸和自定义配置
group:
  title: 功能
---

# 加载组件

安装`pnpm add ui --filter @gbeata/admin-docs`

<code src="./demos/loading"></code>

## API

| 属性名     | 描述           | 类型                          | 默认值     |
| ---------- | -------------- | ----------------------------- | ---------- |
| loading    | 加载状态       | boolean                       | true       |
| tip        | 加载提示文字   | string                        | '加载中...' |
| size       | 加载动画大小   | 'small' \| 'default' \| 'large' | 'default'  |
| color      | 加载动画颜色   | string                        | '#1890ff'  |
| fullscreen | 是否全屏遮罩   | boolean                       | false      |
| className  | 自定义类名     | string                        | -          |
| style      | 自定义样式     | React.CSSProperties           | -          |
| children   | 子元素内容     | React.ReactNode               | -          |

## 使用场景

### 基础用法

```tsx
import { Loading } from 'ui';

<Loading tip="加载中..." />
```

### 不同尺寸

```tsx
<Loading size="small" />
<Loading size="default" />
<Loading size="large" />
```

### 自定义颜色

```tsx
<Loading color="#52c41a" />
```

### 包裹内容

```tsx
<Loading loading={isLoading}>
  <div>内容区域</div>
</Loading>
```

### 全屏加载

```tsx
<Loading loading={true} fullscreen tip="请稍候..." />
```
