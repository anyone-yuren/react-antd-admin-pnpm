---
group:
  title: 规范
  order: 2
---

# eslint 规范

## 注意点

:::info{title=注意}
在开发阶段，如何确保自己的代码符合规范，是一个重要的问题。
:::

### 确认是否开启

在`.vscode/settings.json`中，已经添加自动检查配置，如下所示：

```json
"eslint.enable": true, // 开启eslint检查
"editor.codeActionsOnSave": {
  "source.fixAll.eslint": "explicit",
},
```

在终端`输出`中，选择 ESlint，查看是否正常启动。如果启动成功，则在控制台会提示如下：

```bash
[Info  - 22:47:21] ESLint server is starting.
[Info  - 22:47:22] ESLint server running in node v18.15.0
[Info  - 22:47:22] ESLint server is running.
```

> 有时候版本升级会影响正常的 eslint 启动，eslint 升级有时候会伴随着 `vscode` 无法启动 eslint server 的问题，这时候，最好检查输出控制台，查看当前`vscode`的版本是否支持 eslint。
