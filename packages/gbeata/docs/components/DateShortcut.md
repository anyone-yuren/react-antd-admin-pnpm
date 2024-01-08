---
group: 全局配置
---

# Date 表单日期快捷选项

> 打开过此页面后，其它页面的 `date` 会有影响。<br />
> 注册过后，GSearchTable、GDialogForm 也会生效。

1. 注册覆盖默认的日期 `date` 与 `date-range` 类型
2. 注册文件放可在 /gbeata/index.tsx 目录下
3. 在 app.ts 引入 gbeata 文件

点击任意一个日期选择框，观察弹出层的最下方的快捷按钮，【今日】、【今天】、【昨天】等等。

```tsx
import React from 'react';
import { GForm, GFormField, GButton } from 'gbeata';
import './config.tsx';

const fields: Array<GFormField> = [
  {
    title: '日期区间',
    key: 'date-range',
    type: 'date-range',
  },
  {
    title: '日期区间时间',
    key: 'datetime-range',
    type: 'date-range',
    showTime: true,
  },
  {
    title: '日期',
    key: 'date',
    type: 'date',
  },
  {
    title: '日期时间',
    key: 'datetime',
    type: 'date',
    showTime: true,
  },
];

export default function Demo() {
  const handleConfirm = (form: any) => {
    alert(JSON.stringify(form));
  };
  return (
    <GForm fields={fields} onConfirm={handleConfirm}>
      <GButton style={{ marginLeft: 120 }} type="primary" htmlType="submit">
        提交
      </GButton>
    </GForm>
  );
}
```

```tsx | pure
// 请在 /gbeata/index.tsx 里面补充下面代码
import React from 'react';
import { registerField, AnyKeyProps } from 'gbeata';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';

// 区间日期快捷选项
const presets: any = {
  今天: [dayjs().startOf('day'), dayjs().endOf('day')],
  昨天: [dayjs().subtract(1, 'day'), dayjs().subtract(1, 'day').endOf('day')],
  本周: [dayjs().startOf('week'), dayjs().endOf('day')],
  上周: [
    dayjs().startOf('week').subtract(7, 'day'),
    dayjs().endOf('week').subtract(7, 'day'),
  ],
  本月: [dayjs().startOf('month'), dayjs().endOf('day')],
  上月: [
    dayjs().subtract(1, 'month').startOf('month'),
    dayjs().subtract(1, 'month').endOf('month'),
  ],
};

// 注册区间日期
registerField('date-range', {
  type: 'data-range',
  defaultValue: [],
  render: ({ field, readonly, getFieldValue }: AnyKeyProps) => {
    let text = getFieldValue(field.key);
    if (text) {
      text = text.join('\n');
    }
    return readonly ? (
      <span className="g-form-text">{text || '-'}</span>
    ) : (
      <DatePicker.RangePicker
        presets={presets}
        placeholder={['开始日期', '结束日期']}
        className="max-width"
        {...field.props}
      />
    );
  },
});

// 日期快捷选项
const renderExtraFooter = ({ setFieldsValue, field }: AnyKeyProps) => {
  /**
   * 填充日期
   * @param value 日期
   */
  const setValue = (value: any) => {
    setFieldsValue({
      [field.key]: value,
    });
  };
  return (
    <>
      <a
        className="ant-picker-now-btn"
        style={{ marginRight: 4 }}
        onClick={() => setValue(dayjs().startOf('day'))}
      >
        今天早上
      </a>
      <a
        className="ant-picker-now-btn"
        style={{ marginRight: 4 }}
        onClick={() => setValue(dayjs().endOf('day'))}
      >
        今天晚上
      </a>
      <a
        className="ant-picker-now-btn"
        style={{ marginRight: 4 }}
        onClick={() => setValue(dayjs().subtract(1, 'day').startOf('day'))}
      >
        昨天早上
      </a>
      <a
        className="ant-picker-now-btn"
        onClick={() => setValue(dayjs().subtract(1, 'day').endOf('day'))}
      >
        昨天晚上
      </a>
    </>
  );
};

// 注册日期
registerField('date', {
  type: 'date',
  defaultValue: null,
  render: ({ field, readonly, getFieldValue, setFieldsValue }: AnyKeyProps) => {
    let text = getFieldValue(field.key, readonly);
    if (typeof text !== 'string') {
      text = '';
    }
    return readonly ? (
      <span className="g-form-text">{text || '-'}</span>
    ) : (
      <DatePicker
        renderExtraFooter={() => renderExtraFooter({ setFieldsValue, field })}
        className="max-width"
        placeholder={`请选择${field.title || ''}`}
        {...field.props}
      />
    );
  },
});
```

<embed src="./index.md"></embed>
