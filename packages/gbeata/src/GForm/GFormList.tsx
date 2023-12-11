import { CopyOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Space, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import { GSearchTableField } from '../GSearchTable/g-search-table';
import {
  FORM_TYPE_DATE,
  FORM_TYPE_DATE_RANGE,
  FORM_TYPE_LIST,
} from '../constant';
import locale from '../locale';
import { AnyKeyProps } from '../types/AnyKeyProps';
import { GFormField, GFormProps } from './g-form';
import { getDateValue } from './parseFields';

interface AyFormListProps {
  field: GFormField;
  formInstant: AnyKeyProps;
  ayFormProps: GFormProps;
  getFormItem: (
    fields: Array<GFormField | GSearchTableField>,
    formInstans: AnyKeyProps,
    props: GFormProps,
    childrenType?: 'group' | 'card' | 'input-group' | 'list',
  ) => React.ReactNode;
}

export default function GFormList(props: AyFormListProps) {
  const { field, getFormItem, formInstant, ayFormProps } = props;
  const { readonly } = ayFormProps;

  // 最少行 & 最大行
  const { min = 0, max = Infinity } = field;
  // 当前行数
  const [recordNum, setRecordNum] = useState(0);

  useEffect(() => {
    setRecordNum(formInstant.getFieldValue(field.key).length);
  }, []);

  /**
   * 复制这行数据到末尾
   * @param name 实际上是当前行 index
   */
  const handleCopy = (name: number) => {
    try {
      let value = formInstant.getFieldValue(field.key);
      let newValue = [...value, value[name]];
      setRecordNum(newValue.length);
      formInstant.setFieldsValue({ [field.key || '']: newValue });
    } catch {
      console.error('复制失败');
    }
  };

  /**
   * 删除这行数据
   * @param name 实际上是当前行 index
   * @param remove 删除方法
   */
  const handleRemove = (name: number, remove: (name: number) => void) => {
    remove(name);
    setRecordNum(Number(recordNum) - 1);
  };

  /**
   * 新增一行
   * @param add 新增方法
   */
  const handleAdd = (
    add: (defaultValue?: any, insertIndex?: number | undefined) => void,
  ) => {
    add(field.creatorRecord || {});
    setRecordNum(Number(recordNum) + 1);
  };

  return (
    <Form.List
      {...field.props}
      name={field.key || field.label}
      key={field.key || field.label}
    >
      {(fields, { add, remove }) => {
        let value = readonly ? formInstant.getFieldValue(field.key) : [];
        return (
          <>
            {fields.map(({ key, name, ...restField }) => {
              let children = field.children || [];
              if (!Array.isArray(children)) {
                children = [children];
              }
              let content = getFormItem(
                children.map((child: GFormField) => {
                  let newField: GFormField = {
                    ...child,
                    formItemProps: {
                      ...field.formItemProps,
                      ...restField,
                      name: [name, child.key],
                    },
                  };
                  if (readonly && !newField.render) {
                    try {
                      let text = value[name][child.key];
                      // 日期或者日期区间
                      if (
                        newField.type === FORM_TYPE_DATE ||
                        (Array.isArray(text) &&
                          newField.type === FORM_TYPE_DATE_RANGE)
                      ) {
                        text = getDateValue(text, newField, readonly);
                      }
                      newField.text = text;
                    } catch {
                      console.error('g-form-list 转换错误');
                    }
                  }
                  return newField;
                }) as Array<GFormField | GSearchTableField>,
                formInstant,
                ayFormProps,
                FORM_TYPE_LIST,
              );
              return (
                <Space
                  key={`${field.key}-${key}`}
                  className="g-form-list-item"
                  align="end"
                  {...field.spaceProps}
                >
                  {content}
                  {!readonly && (
                    <Space className="g-form-list-actions">
                      {recordNum < max && (
                        <span
                          className="g-form-list-action"
                          onClick={() => handleCopy(name)}
                        >
                          <Tooltip title={locale.form.copyToEnd}>
                            <CopyOutlined />
                          </Tooltip>
                        </span>
                      )}

                      {recordNum > min && (
                        <span
                          className="g-form-list-action"
                          onClick={() => handleRemove(name, remove)}
                        >
                          <Tooltip title={locale.form.removeRow}>
                            <DeleteOutlined />
                          </Tooltip>
                        </span>
                      )}
                    </Space>
                  )}
                </Space>
              );
            })}
            {recordNum < max && !readonly && (
              <Button
                type="dashed"
                onClick={() => handleAdd(add)}
                icon={<PlusOutlined />}
              >
                {locale.form.addItem}
              </Button>
            )}
          </>
        );
      }}
    </Form.List>
  );
}
