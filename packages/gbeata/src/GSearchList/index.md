---
nav: 组件
group: 表格table
order: 1
---

# GSearchList 查询列表

## 卡片布局

<code src="./AySearchListDemo"></code>

## JSX / TSX 语法糖

<code src="./AySearchListDemoTsx"></code>

```diff
-const fields: Array<GSearchTableField> = [
-  {
-    title: '英文名',
-    key: 'en',
-    search: true,
-    dialog: {
-      required: true,
-      rules: [{ pattern: /^[a-z|A-Z|0-9]{1,}$/, message: '请输入字母或者数字' }]
-    }
-  },
-  {
-    title: '中文名',
-    key: 'cn',
-    search: true,
-    dialog: {
-      required: true
-    }
-  },
-  {
-    title: '职业',
-    key: 'class',
-    type: 'select',
-    search: true,
-    dialog: true,
-    options: professionOptions
-  },
-  {
-    title: '描述',
-    type: 'textarea',
-    key: 'des',
-    dialog: true
-  }
-]

return (
  <GSearchList
    title="列表标题"
-   fields={fields}
    dialogFormExtend={{
-     fields: fields,
      updateApi,
      addApi
    }}
  >
+    <GFields>
+      <GField
+        title="英文名"
+        key="en"
+        search
+        dialog={{ required: true, rules: [{ pattern: /^[a-z|A-Z|0-9]{1,}$/, message: '请输入字母或者数字' }] }}
+      />
+      <GField title="中文名" key="cn" search dialog={{ required: true }} />
+      <GField title="职业" key="class" type="select" search dialog options={professionOptions} />
+      <GField title="职描述业" key="des" type="textarea" dialog />
+   </GFields>
  </GSearchList>
)
```

只是换了另一种风格写 `fields` 而已，请不要用其它元素包裹住 `GFields` 和 `GField`。

## 卡片布局 & tag 查询

<code src="./AySearchListCardDemo"></code>

## GSearchList.Selection

可以在 `renderItem` 时将 `GSearchList.Selection` 插在任意位置，让列表拥有勾选的功能，`v0.50.0` 只支持多选。

```diff
<GSearchList
  title="列表标题"
+ selectionType="checkbox"
+ selectShowKey="cn"
  renderItem={(record: AnyKeyProps, index: number) => {
    return (
      <List.Item key={record.sort_id}>
+       <GSearchList.Selection record={record} />
      </List.Item>
    )
  }}
/>
```

### 禁用选项

```diff
<GSearchList.Selection
  record={record}
+ disabled
/>
```

### GSearchList.SelectionAll

当你需要模拟一个全选的选项时，可以插入此元素。

如下面的例子，插入一个虚拟的头部。

```diff
<GSearchList
+ listHeader={
+   <Row style={{ backgroundColor: '#fafafa', padding: '12px 24px', fontWeight: 500 }}>
+     <Col flex="20px">
+       <GSearchList.SelectionAll />
+     </Col>
+     <Col flex="1" style={{ paddingLeft: 8 }}>
+       干员信息
+     </Col>
+     <Col flex="130px">操作</Col>
+   </Row>
+ }
/>
```

其它 Api 跟 GSearchTable 大部分 Api 相同，可参考 [GSearchTable](../g-search-table#参数) 文档
