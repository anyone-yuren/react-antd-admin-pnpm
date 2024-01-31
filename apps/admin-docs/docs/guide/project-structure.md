---
nav: 指南
group: 基础
order: 1
---

# 目录结构

## 架构设计

> 持续更新中...

<iframe id="embed_dom" name="embed_dom" frameborder="0" style="display:block;width:100%; height:475px;" src="https://www.processon.com/embed/65b06a0a4ceaf60ac04ddc82"></iframe>

## 结构介绍

```bash
├── .changeset # 用于生成 changelog， 执行`pnpm init-changeset`命令时会自动创建
|  ├── README.md
|  └── config.json
├── .github   # github流水线，根据 不同分支commit，自动触发不同的流水线
|  └── workflows
|     ├── blank.yml # 发布gbeata组件库
|     ├── deploy-docs.yml # 发布文档
|     ├── gh-page.yml # 发布admin github pages项目
|     └── push-message.yml # 消息推送
├── .gitignore
├── .husky   # 钩子，prepare安装自动生成
├── .npmrc   # npm 配置
├── .prettierignore # prettier忽略
├── .releaserc.js # 发布组件包与CHANGELOG生成配置
├── .vscode   # vscode 配置
|  ├── extensions.json # vscode 插件
|  └── settings.json # vscode 配置
├── CHANGELOG.md # CHANGELOG
├── README.zh-CN.md # 中文
├── Readme.md # 英文
├── apps # 项目
|  ├── .DS_Store
|  ├── admin # gbeata-admin 后台管理系统
|  └── admin-docs # gbeata-admin 文档
├── commitlint.config.cjs # commitlint 代码提交规范配置
├── internal # 内部模块，封装统一项目公共配置
|  ├── eslint-config # eslint公共配置模块
|  ├── ts-config # typescript公共配置模块
|  ├── utils # 公共函数集
|  └── vite-config # vite公共配置模块
├── meta.json # 项目元数据
├── package.json
├── packages
|  ├── apis # 系统公共请求服务
|  ├── gbeata # 组件库
|  ├── store # 状态管理<zustand>
|  ├── three # 3D组件库
|  └── ui # 功能组件库（动画、图标之类）
├── plop # plop脚手架，用于生成项目模板
|  └── app # 项目模板
├── plopfile.js # plop脚手架配置
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
└── turbo.json # turbo脚手架配置
```
