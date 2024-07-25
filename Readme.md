<a name="readme-top"></a>

<div align="center">

<img height="120" src="https://raw.githubusercontent.com/anyone-yuren/multiway/master/favicon.ico">

<h1>Gbeata Admin</h1>

Gbeata Admin是一套用于快速构建后台管理系统模板

文档地址：[https://anyone-yuren.github.io/gbeata-admin-docs](https://anyone-yuren.github.io/gbeata-admin-docs)

[English](./README.md) ・ 简体中文 ・ [更新日志](./CHANGELOG.md) · [报告问题][github-issues-link] · [请求功能][github-issues-link]

<!-- SHIELD GROUP -->

[![][npm-release-shield]][npm-release-link]
[![][npm-downloads-shield]][npm-downloads-link]
[![][github-releasedate-shield]][github-releasedate-link]
[![][github-action-release-shield]][github-action-release-link]<br/>
[![][github-contributors-shield]][github-contributors-link]
[![][github-forks-shield]][github-forks-link]
[![][github-stars-shield]][github-stars-link]
[![][github-issues-shield]][github-issues-link]
[![][github-license-shield]][github-license-link]

![][banner]

<h3>新增大屏面板:分支 wk-admin-dashboard</h3>

![][dashboard]

</div>
<div align="center">

</div>
<details open>
<summary><kbd>目录</kbd></summary>

#### 目录

- [简介](#简介)
  - [动机 ｜ 为什么想做这个](#动机--为什么想做这个)
  - [特性](#特性)
- [建设目标](#建设目标)
  - [第一阶段：组件库设计阶段](#第一阶段组件库设计阶段)
  - [第二阶段:react-antd-admin模板搭建](#第二阶段react-antd-admin模板搭建)
- [使用](#使用)
- [分支管理](#分支管理)
- [注意点：](#注意点)
- [贡献](#贡献)

####

</details>

## 简介

> \[!IMPORTANT]\
> 方案集成当下最流行的一些前端框架和库做集成，致力于构建一套通用型强的前端后台管理系统解决方案。

### 动机 ｜ 为什么想做这个

antd5已经发布很久了，之前一直在维护的一套基于antd4版本的方案由于一直在内部项目中迭代，没办法抽出时间升级，随着前端技术的迭代更新和业务需求的不断扩展，趁着内部升级的机会，也把这一年多在项目中沉淀的一些技术方案做一次整理分享。

### 特性

> 它能做什么

本方案中会集成当下主流的前端设计思路，虽然当下关于react的后台模板，市面上可选择性很多，但与其他方案不同的是，关注功能组件与业务组件开发的同时，更多的精力会放在代码本身的原子化设计和解耦上，具备的特性包括（**_持续补充_**）

- 组件库设计
- admin设计
- CICD持续集成
- 容器化部署
- 代码规范设计
- 基础模板库设计
- ...

## 建设目标

- [x] pnpm turbo vite 集成方案搭建
- [x] 配置代码提交规范与自动化部署
- [x] antd5组件库开发
- [x] 分包设计与应用设计
- [x] 自动化tag版本打包
- [ ] plop基础项目模板创建
- [ ] 微前端接入
- [ ] 模板编写

### 第一阶段：组件库设计阶段

- [x] 完成组件库编写和测试
- [x] 升级antd4 => antd5， 升级react与dumi、umi为最新版；
- [x] 完成组件库自动发布npm
- [ ] 发布组件库文档

  5.0组件文档更新会滞后写，也可以参考4.0版本的组件文档使用，只是所有的`multiway` 更名为 `gbeata` [文档地址](http://120.79.85.168:9001/)

- [ ] 发布gitPage
- [ ] 新增spring/web动画组件

### 第二阶段:react-antd-admin模板搭建

- [x] 技术选型
- [x] 框架设计
- [x] 主题设计
- [x] 登录页设计
- [x] 状态管理（zustand）
- [x] 路由设计，使用loadable-compoment替代React.lazy
- [x] 主题控制面板
- [x] 模块高亮搜索
- [x] 系统模板创建

## 使用

> \[!IMPORTANT]\
> 代码中包含gbeata组件库，如果不想使用到package/gbeata组件库源码，可直接从npm包中安装。

```bash
git clone git@github.com:anyone-yuren/react-antd-admin-pnpm.git

pnpm bootstrap

pnpm dev --filter gbeata-admin
```

也可以直接使用pnpm dev，但这样就会启动项目中所有包含dev命令的包项目。

<div align="right">

[![][back-to-top]](#readme-top)

</div>

## 分支管理

发布组件库分支： `main`

后台管理模板分支： `admin`

<div align="right">

[![][back-to-top]](#readme-top)

</div>

## 注意点：

1. 使用semantic-release做自动化发布时，不需要打包的子包，设置`"private": true`

2. 项目中less改造antd-style写法：

```bash
npx @chenshuai2144/less2cssinjs less2js -i src
```

3. 关于本地运行项目，出现gbeata未定义的问题，起初在设计组件库阶段，并没有打算直接在项目包中直接应用workspace中的源码，所以，你可以在执行 ` pnpm dev --filter gbeata-admin` 之前，请先将gbeata组件包打包生成lib目录， 执行` pnpm build --filter gbeata`
<div align="right">

[![][back-to-top]](#readme-top)

</div>

## 贡献

欢迎各种类型的贡献，如果您有兴趣贡献代码，请随时查看我们的 GitHub [问题][github-issues-link]，并展示您的才华。

[![][pr-welcome-shield]][pr-welcome-link]

<a href="https://github.com/anyone-yuren/react-antd-admin-pnpm/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=anyone-yuren/react-antd-admin-pnpm" />
</a>

欢迎 PR，当然您也可以扫码进群讨论，或者直接联系我，QQ: 1003473088，如果这是一个很大的变化！欢迎您的加入！

<img src="https://raw.githubusercontent.com/anyone-yuren/multiway/master/WechatIMG8679.jpeg"/>
<div align="right">

[![][back-to-top]](#readme-top)

</div>

<!-- LINK GROUP -->

[back-to-top]: https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square
[banner]: https://github.com/anyone-yuren/multiway/blob/master/iShot_2024-01-05_17.05.52.gif?raw=true
[dashboard]: https://github.com/anyone-yuren/multiway/blob/master/iShot_2024-07-25_19.52.09.gif?raw=true
[bun-link]: https://bun.sh
[bun-shield]: https://img.shields.io/badge/-speedup%20with%20bun-black?logo=bun&style=for-the-badge
[codespaces-link]: https://codespaces.new/anyone-yuren/react-antd-admin-pnpm
[codespaces-shield]: https://github.com/codespaces/badge.svg
[contributors-contrib]: https://contrib.rocks/image?repo=anyone-yuren/react-antd-admin-pnpm
[contributors-link]: https://github.com/anyone-yuren/react-antd-admin-pnpm/graphs/contributors
[discord-link]: https://discord.gg/AYFPHvv2jT
[discord-shield]: https://img.shields.io/discord/1127171173982154893?color=5865F2&label=discord&labelColor=black&logo=discord&logoColor=white&style=flat-square
[fossa-license-link]: https://app.fossa.com/projects/git%2Bgithub.com%2Fanyone-yuren%2Freact-antd-admin-pnpm
[fossa-license-shield]: https://app.fossa.com/api/projects/git%2Bgithub.com%2Fanyone-yuren%2Freact-antd-admin-pnpm.svg?type=large
[github-action-release-link]: https://github.com/anyone-yuren/react-antd-admin-pnpm/actions/workflows/blank.yml
[github-action-release-shield]: https://img.shields.io/github/actions/workflow/status/anyone-yuren/react-antd-admin-pnpm/release.yml?label=release&labelColor=black&logo=githubactions&logoColor=white&style=flat-square
[github-action-test-link]: https://github.com/actions/workflows/anyone-yuren/react-antd-admin-pnpm/test.yml
[github-action-test-shield]: https://img.shields.io/github/actions/workflow/status/anyone-yuren/react-antd-admin-pnpm/test.yml?label=test&labelColor=black&logo=githubactions&logoColor=white&style=flat-square
[github-contributors-link]: https://github.com/anyone-yuren/react-antd-admin-pnpm/graphs/contributors
[github-contributors-shield]: https://img.shields.io/github/contributors/anyone-yuren/react-antd-admin-pnpm?color=c4f042&labelColor=black&style=flat-square
[github-forks-link]: https://github.com/anyone-yuren/react-antd-admin-pnpm/network/members
[github-forks-shield]: https://img.shields.io/github/forks/anyone-yuren/react-antd-admin-pnpm?color=8ae8ff&labelColor=black&style=flat-square
[github-issues-link]: https://github.com/anyone-yuren/react-antd-admin-pnpm/issues
[github-issues-shield]: https://img.shields.io/github/issues/anyone-yuren/react-antd-admin-pnpm?color=ff80eb&labelColor=black&style=flat-square
[github-license-link]: https://github.com/anyone-yuren/react-antd-admin-pnpm/blob/master/LICENSE
[github-license-shield]: https://img.shields.io/github/license/anyone-yuren/react-antd-admin-pnpm?color=white&labelColor=black&style=flat-square
[github-releasedate-link]: https://github.com/anyone-yuren/react-antd-admin-pnpm/releases
[github-releasedate-shield]: https://img.shields.io/github/release-date/anyone-yuren/react-antd-admin-pnpm?labelColor=black&style=flat-square
[github-stars-link]: https://github.com/anyone-yuren/react-antd-admin-pnpm/network/stargazers
[github-stars-shield]: https://img.shields.io/github/stars/anyone-yuren/react-antd-admin-pnpm?color=ffcb47&labelColor=black&style=flat-square
[react-antd-admin-pnpm]: https://github.com/anyone-yuren/react-antd-admin-pnpm
[lobe-commit]: https://github.com/anyone-yuren/lobe-commit/tree/master/packages/lobe-commit
[lobe-i18n]: https://github.com/anyone-yuren/lobe-commit/tree/master/packages/lobe-i18n
[lobe-theme]: https://github.com/anyone-yuren/sd-webui-lobe-theme
[npm-downloads-link]: https://www.npmjs.com/package/gbeata
[npm-downloads-shield]: https://img.shields.io/npm/dt/@anyone-yuren/ui?labelColor=black&style=flat-square
[npm-release-link]: https://www.npmjs.com/package/gbeata
[npm-release-shield]: https://img.shields.io/npm/v/@anyone-yuren/ui?color=369eff&labelColor=black&logo=npm&logoColor=white&style=flat-square
[pr-welcome-link]: https://github.com/anyone-yuren/react-antd-admin-pnpm/pulls
[pr-welcome-shield]: https://img.shields.io/badge/🤯_pr_welcome-%E2%86%92-ffcb47?labelColor=black&style=for-the-badge
[profile-link]: https://github.com/anyone-yuren
