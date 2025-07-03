import { defHttp } from 'apis';

import type { PageListParams, PageListResult } from '#/entity';

// ---------------- 用户管理 --------------------

export const getWarehouseList = (data: PageListParams): Promise<PageListResult> => {
  return defHttp.post({
    url: '/Warehouse/GetPageData',
    data,
  });
};

export const createWarehouse = (data: any): Promise<PageListResult> => {
  return defHttp.post({
    url: '/Warehouse/Add',
    data,
  });
};

export const updateWarehouse = (data: any): Promise<PageListResult> => {
  return defHttp.post({
    url: '/Warehouse/Update',
    data,
  });
};

// 同步仓库
export const syncWarehouse = (data: any): Promise<PageListResult> => {
  return defHttp.post({
    url: `/Warehouse/Synchronize?orgCode=${data.orgCode}`,
  });
};
