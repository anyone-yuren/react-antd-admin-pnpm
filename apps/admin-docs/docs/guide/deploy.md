---
nav: 指南
group: 基础
order: 3
---

# 构建与部署

:::info{title=前言}
在 monorepo 的代码管理模式中，它的场景会偏向大型的项目而去做设计，如一个平台系统的建设，包含多个业务终端，本身样式组件、业务组件、api、工具类、构建部署等等都依赖同一套体系。这就导致我们在做设计的过程中，会将很多公共模块抽离出来单独管理，复杂度自然也会随着提高。

真正在使用的过程，根据实际场景做删减即可，后续再考虑出`template`版本。
:::

## 构建

项目统一在 apps 目录下创建，根据自己需要打包的项目进行构建。

```bash
# 打包gbeata-admin
pnpm build --filter gbeata-admin

# 打包文档
pnpm build --filter @gbeata/admin-docs

# 打包组件库
pnpm build --filter gbeata

# 打包全部
pnpm build
```
