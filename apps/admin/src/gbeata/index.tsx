import {
  setDefaultDataFilter,
  setDefaultSearchFilter,
  setGlobalDialogField,
  registerField,
  AnyKeyProps,
  GSelect,
} from 'gbeata';

import type { PageListResult } from '#/entity';
/**
 * 表格请求后过滤
 * @param data object 接口请求完成的数据
 */
setDefaultDataFilter((res: PageListResult) => ({
  // 表格列表的数据
  content: res.resultData.pageData,
  // 数据总共 n 条
  totalCount: res.resultData.totalCount,
  ...res,
}));

setGlobalDialogField(() => ({
  maskClosable: false,
  destroyOnClose: true,
}));

setDefaultSearchFilter((params: Record<string, any>) => {
  const searchData: Record<string, any> = {
    pageSize: params.pagination.pageSize,
    pageIndex: params.pagination.current,
  };
  const paramsSearch = params.search;
  searchData.query = paramsSearch;
  console.log('searchData', params, searchData);
  return searchData;
});

/**
 * 通过选项列表把 value 变成 label
 * @param value 当前值
 * @param options 选项列表
 */
export const getValueByOptions = (value: any, options: Array<Option>) => {
  let option = options.find((option) => option.value === value);
  return option ? option.label : value;
};
// 注册选择框
registerField('select-search', {
  type: 'select-search',
  defaultValue: undefined,
  render: ({ field, readonly, getFieldValue }: AnyKeyProps) => {
    if (readonly) {
      let value = getFieldValue(field.key);
      let text = '';
      if (Array.isArray(value)) {
        if (!value.length) {
          text = '';
        }
        text = value.map((item) => getValueByOptions(item, field.options)).join(field.splitText || '、');
      } else {
        text = getValueByOptions(value, field.options);
      }
      return <span className='g-form-text'>{text || '-'}</span>;
    }

    return (
      <GSelect
        showSearch
        optionFilterProp='label'
        placeholder={`请选择${field.title || ''}`}
        disabled={readonly}
        allowClear={true}
        options={field.options}
        {...field.props}
      />
    );
  },
});
