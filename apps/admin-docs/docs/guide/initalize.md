---
nav: 指南
group:
  title: 基础
  order: 0
order: 0
---

# 开始

本文将帮助你从零开始启动项目。

## 前言

:::info{title=关于组件}
项目虽然基于`antd5`二次封装组件库 [gbeata](https://github.com/anyone-yuren/react-antd-admin-pnpm/tree/master/packages/gbeata)，但是可能不能满足大部分的要求。所以，如果组件不满足你的要求，完全可以不用甚至删除代码自己写，不必坚持使用项目自带的组件。
:::

## 环境准备

本地环境需要安装 [pnpm](https://pnpm.io/)、[Node.js](http://nodejs.org/) 和 [Git](https://git-scm.com/)

:::warning{title=注意}
推荐使用[pnpm](https://pnpm.io/)，否则依赖可能安装不上。
[Node.js](http://nodejs.org/) 版本要求`14.x`以上，这里推荐 `20.x` 及以上。
推荐安装 [nvm](https://github.com/nvm-sh/nvm/tree/master) 来管理 `Node.js` 版本。
:::

## 工具配置

如果您使用的 IDE 是[vscode](https://code.visualstudio.com/)(推荐)的话，可以安装以下工具来提高开发效率及代码格式化

- [Iconify IntelliSense](https://marketplace.visualstudio.com/items?itemName=antfu.iconify) - Iconify 图标插件

- [I18n-ally](https://marketplace.visualstudio.com/items?itemName=Lokalise.i18n-ally) - i18n 插件

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) - 脚本代码检查
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) - 代码格式化
- [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint) - css 格式化
- [DotENV](https://marketplace.visualstudio.com/items?itemName=mikestead.dotenv) - .env 文件 高亮

在你 clone 项目之后，在 `.vscode/` 目录， `extensions.json` 文件，也会自动提醒你是否需要安装这些插件，如果没有，可以手动安装。

## 代码获取

```bash
# 先找个地方建个空目录。
$ git clone https://github.com/anyone-yuren/react-antd-admin-pnpm.git

```

### 安装依赖

#### pnpm 安装

必须使用 [pnpm](https://pnpm.io/)进行依赖安装（若其他包管理器安装不了需要自行处理）。

如果未安装`pnpm`，可以用下面命令来进行全局安装

```bash
# 全局安装pnpm
npm install -g pnpm
# 验证
pnpm -v # 出现对应版本号即代表安装成功
```

#### 依赖安装命令

在项目根目录下，打开命令窗口执行，耐心等待安装完成即可

```bash
# 安装依赖
pnpm i
```

:::warning
注意:安装依赖时 husky 安装失败
请查看你的源码是否从 github 直接下载的，直接下载是没有 `.git` 文件夹的，而 `husky` 需要依赖 `git` 才能安装。此时需使用 `git init` 初始化项目，再尝试重新安装即可。
:::

### 启动项目

项目由多个系统组成，分别是后台管理系统、文档、组件库文档

```bash
# 启动后台管理系统
$ pnpm dev --filter gbeata-admin

# 启动文档
$ pnpm dev --filter @gbeata/admin-docs

# 启动组件库文档
$ pnpm dev --filter gbeata

```
