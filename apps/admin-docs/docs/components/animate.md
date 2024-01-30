---
title: 动画组件
atomId: Translatex
package: ui
description: 封装react-spring/web的动画组件
group:
  title: 特效
---

# 页面组件动画

安装`pnpm add ui --filter @gbeata/admin-docs`
<code src="./demos/animatex"></code>

## API

| 属性名    | 描述         | 类型            | 默认值 |
| --------- | ------------ | --------------- | ------ |
| children  | 子元素       | React.ReactNode |
| direction | 动画方向     | 'left' & 'top'  | 'left' |
| delay     | 动画延迟时间 | number          |
| run       | 动画是否开启 | boolean         |
| config    | 动画配置     | AnimationConfig |
| className | 动画类名     | string          |
