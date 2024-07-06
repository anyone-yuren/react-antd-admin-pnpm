import { setDefaultDataFilter, setDefaultSearchFilter, setGlobalDialogField } from 'gbeata';

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
  return searchData;
});
