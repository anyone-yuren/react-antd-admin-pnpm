## monorepo react-admin集成方案

### 简介

方案集成当下最流行的一些前端框架和库做集成，致力于构建一套通用型强的前端后台管理系统解决方案。

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
- ...

### 建设目标

- [x] pnpm turbo vite 集成方案搭建
- [x] 配置代码提交规范与自动化部署
- [x] antd5组件库开发
- [x] 分包设计与应用设计
- [ ] 微前端接入
- [ ] 模板编写

### 第一阶段：组件库设计阶段

- [x] 完成组件库编写和测试
- [x] 升级antd4 => antd5， 升级react与dumi、umi为最新版；
- [x] 完成组件库自动发布npm
- [ ] 发布组件库文档
- [ ] 发布gitPage
- [ ] 新增spring/web动画组件

### 第二阶段:react-antd-admin模板搭建

- [ ] 技术选型

<!-- ```bash
"antd": "^5.x","vite": "^5.x","echarts-for-react": "^3.x","antd-style": "^3.x","@react-spring/web": "^9.x","zustand": "^4.x"
``` -->

- [x] 框架设计
- [x] 主题设计
- [x] 登录页设计
- [x] 状态管理（zustand）
- [x] 路由设计，使用loadable-compoment替代React.lazy
- [x] 主题控制面板
- [x] 模块高亮搜索

## 分支管理

发布组件库分支： `main`

后台管理模板分支： `admin`

## 注意点：

1. 使用semantic-release做自动化发布时，不需要打包的子包，设置`"private": true`

2. 项目中less改造antd-style写法：

```bash
npx @chenshuai2144/less2cssinjs less2js -i src
```

## 贡献

<a href="https://github.com/anyone-yuren/react-antd-admin-pnpm/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=anyone-yuren/react-antd-admin-pnpm" />
</a>

欢迎 PR，当然您也可以扫码进群讨论，或者直接联系我，QQ: 1003473088，如果这是一个很大的变化！欢迎您的加入！
<img src="https://i.imgs.ovh/2024/01/03/0ybmA.jpeg"/>
