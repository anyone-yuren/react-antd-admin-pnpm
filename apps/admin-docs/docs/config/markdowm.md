---
group: 文档渲染配置
toc: content
---

# Demo 配置

Demo 的配置用于控制 demo 渲染。

对于代码块 demo 来说，仅有 FrontMatter 一种配置方式：

<pre>
```jsx
/**
 * title: demo 标题
 */
import React from 'react';

export default () => <>Hello world!</>;
```
</pre>

对于外部 demo 来说，除了可以和代码块 demo 一样通过 FrontMatter 配置外，还可以通过 `code` 标签属性进行配置：
