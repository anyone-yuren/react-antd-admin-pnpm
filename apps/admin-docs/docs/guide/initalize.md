---
nav: 指南
group:
  title: 基础
  order: 0
order: 0
---

# 初始化

## 环境准备

确保正确安装 [Node.js](https://nodejs.org/en/) 且版本为 16+ 即可。

```bash
$ node -v
v16.20.2

$ pnpm -v
v8.7.4
```

## 安装

```bash
# 先找个地方建个空目录。
$ git clone https://github.com/anyone-yuren/react-antd-admin-pnpm.git

# 通过 pnpm 安装依赖
$ pnpm install

# 打开后台管理系统
$ pnpm dev --filter gbeata-admin

# 打开文档系统
$ pnpm dev --filter @gbeata/admin-docs

# 打开组件库
$ pnpm dev --filter gbeata
```

根据你自己的选择，打开你想要的系统。
