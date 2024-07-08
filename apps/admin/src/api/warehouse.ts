import { defHttp } from 'apis';

import type { PageListParams, PageListResult } from '#/entity';

// ---------------- 用户管理 --------------------

export const getWarehouseList = (data: PageListParams): Promise<PageListResult> => {
  return defHttp.post({
    url: '/Warehouse/GetPageData',
    data,
  });
};
