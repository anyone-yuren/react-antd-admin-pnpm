import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { AnyKeyProps, registerField } from 'gbeata';
import React from 'react';

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
      <span className="mw-form-text">{text || '-'}</span>
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
  const setValue = (value: dayjs.Dayjs) => {
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
      <span className="mw-form-text">{text || '-'}</span>
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
