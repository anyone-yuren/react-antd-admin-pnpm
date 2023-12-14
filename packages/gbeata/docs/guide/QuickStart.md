---
nav:
  title: 教程
order: 0
group:
  order: 0
---

# 快速开始

通过此教程，让我们一步一步开始使用吧。

## 安装 nrm 配置私有镜像源地址

组件库属于公司内部私有组件库，托管于前端组搭建的 verdaccio 平台，可查看文档 [npm 私服搭建](https://gbeata.feishu.cn/wiki/wikcnTgaXjfe2xaZBPM3hR5P2Be)

建议安装`nrm`管理包的镜像源。

```bash
npm install -g nrm
nrm add mw http://192.168.1.93:4873/
nrm use mw
```

也可以直接使用

```bash
npm i gbeata --registry http://192.168.1.93:4873/
```

## 一、安装 gbeata

### 前置安装

Multiway 依赖于 [Ant Design V4](https://ant-design.gitee.io/index-cn) ，请预先安装好。

### 使用 npm 安装

```bash
npm i gbeata -S
```

### 使用 yarn 安装

```bash
yarn add gbeata -S
```

## 二、测试使用

```tsx
import React from 'react';
import { GButton } from 'gbeata';

export default function Demo() {
  return <GButton>Multiway</GButton>;
}
```

🎉 恭喜您，成功安装了 Multiway，请继续阅读 [表单基础](./normal/form)
