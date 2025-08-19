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

// export const getMaterialInfo = async (params: IgetMaterialInfoParams) => post("/Material/GetPageData", { ...params });

// 获取物料列表
export const getMaterialList = (data: PageListParams): Promise<PageListResult> => {
  return defHttp.post({
    url: '/Material/GetPageData',
    data,
  });
};

// 更新物料阈值
export const updateMaterialRatio = (data: PageListParams): Promise<PageListResult> => {
  return defHttp.post({
    url: '/Material/UpdateProportion',
    data,
  });
};
