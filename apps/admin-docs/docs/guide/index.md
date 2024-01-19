---
nav:
  title: 指南
  order: -1
group:
  title: 介绍
  order: -1
---

# 什么是 gbeata-admin

<!-- dumi，中文发音**嘟米**，是一款为组件开发场景而生的静态站点框架，与 [father](https://github.com/umijs/father) 一起为开发者提供一站式的组件开发体验，**father 负责组件源码构建，而 dumi 负责组件开发及组件文档生成**。 -->

最开始对于 gbeata-admin 的定位只是为了做一套后台模板，但在不断的整合与升级的过程中，gbeata-admin 的定位发生了变化，里面基本囊括了中后台管理系统所有的技术栈和架构设计。
包括二次封装组件、多包管理、CICD、动态主题、国际化、权限控制、脚手架通用模板、vite
、eslint、ts 通用配置、微前端等功能。

项目中使用秉持使用最新的技术栈，可以作为项目的启动模板，帮助你快速搭建企业级中后台模板，也可以作为示例，帮助你如何搭建属于自己的前端技术体系。

## 开始之前

在使用 gbeata-admin 之前，需要你先对几个概念有所了解，这样会有利于你在使用与学习的过程中，避免一些不必要的疑惑。

- [turborepo](https://turbo.build/): 一个包管理工具，可以帮助我们将项目打包成多个包，并且可以通过单一包管理工具来管理多个包，减少了每个包的依赖关系，与 monorepo、pnpm 简直就是珠联璧合。
- pnpm 多包管理
- vite、unbuild、father.js 等打包构建工具。
- [eslint](https://eslint.org/)、[tsconfig.json](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)、[prettier](https://prettier.io/)
- [react](https://reactjs.org/)、[react-dom](https://reactjs.org/)（6.24.1）、[umi](https://umijs.org/)

**上上强度**

- plop 脚手架
- qiankun 微前端
- styled components
- ...

当然，如果你不熟悉上面的几点，并不想你的使用，相反，你可以通过次案例来补全这一块的技能。

如果你已经对这些概念了解， 请直接 [快速上手](./initalize)

## 问题反馈

如果在使用过程中发现任何问题、或者有改善建议，欢迎在 GitHub Issues 进行反馈：https://github.com/anyone-yuren/react-antd-admin-pnpm/issues

或加我微信加入讨论群：

<div style="display: flex;justify-content: center">
  <img data-type="dingtalk" src="https://raw.githubusercontent.com/anyone-yuren/multiway/master/WechatIMG8679.jpeg" width="300" />
</div>
