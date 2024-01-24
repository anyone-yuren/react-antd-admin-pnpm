---
group: 深入
order: 1
---

# 文档部署

:::info{title=前言}
文档使用`dumi2`搭建，具体搭建方式可查看[文档搭建指南](https://d.umijs.org/guide/initialize)。

其中主题使用的是[dumi-theme-antd-style](https://dumi-theme-antd-style.arvinx.app/) ，具体配置可查看[文档配置指南](https://dumi-theme-antd-style.arvinx.com/zh-CN/config)。
:::

> 其中，主题部分可以查看`.dumi/theme`目录，可以根据你自己的需要，修改自定义主题。

## 编写 github Actions

在目录`/.github/workflows`下创建一个名为`deploy-docs.yml`的文件，内容如下：

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches:
      - release-admin
jobs:
  deploy:
    name: Deploy to GitHub Pages
    runs-on: ubuntu-latest
    steps:
      - name: Chekcout 🛎️ # 步骤名
        uses: actions/checkout@master # 使用插件 => https://github.com/actions/checkout

      - name: Install pnpm
        uses: pnpm/action-setup@v2.2.4

      - name: Use Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'pnpm'

      - name: Install dependencies
        shell: bash
        run: pnpm install

      # step 3. 安装依赖并打包
      - name: Install and Build 🔧
        run: |
          pnpm config set registry https://registry.npmmirror.com
          pnpm build --filter @gbeata/admin-docs

      - name: Deploy
        uses: s0/git-publish-subdir-action@develop
        env:
          REPO: git@github.com:anyone-yuren/gbeata-admin-docs.git
          BRANCH: gh-pages
          FOLDER: docs-dist
          SSH_PRIVATE_KEY: ${{ secrets.SSH_PRIVATE_KEY }}
```

`SSH_PRIVATE_KEY`为私钥，如何获取?可以参考[如何获取 github 的 ssh 私钥](https://help.github.com/en/articles/connecting-to-github-with-ssh)

## 发布文档

在`push`到`release-admin`分支时，会触发 github actions，触发后会自动打包文档，并上传到[gbeata-admin-docs](https://github.com/anyone-yuren/gbeata-admin-docs)`gh-pages`分支。

同时在[gbeata-admin-docs](https://github.com/anyone-yuren/gbeata-admin-docs)代码仓库开启 github pages，每次 release-admin 分支 push 时，会自动触发 gh-pages，会自动打包文档并上传到[gbeata-admin-docs](https://github.com/anyone-yuren/gbeata-admin-docs)`gh-pages`分支自动更新文档。
