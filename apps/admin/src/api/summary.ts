import { defHttp } from 'apis';

import type { PageListParams, PageListResult } from '#/entity';

export const GetPageInventoryCostl = (data: PageListParams): Promise<any> => {
  return defHttp.post<PageListResult>({
    url: '/Summary/GetPageInventoryCostl',
    data,
  });
};
export const GetPageInventoryMonthlyCost = (data: any): Promise<any> => {
  return defHttp.post<any>({
    url: '/Summary/GetPageInventoryMonthlyCost',
    data,
  });
};

export const GetInventoryTotalCost = (data: any): Promise<any> => {
  return defHttp.post<PageListResult>({
    url: '/Summary/GetInventoryTotalCost',
    data,
  });
};

export const GetDeptList = (params: any): Promise<any> => {
  return defHttp.get<PageListResult>({
    url: '/Summary/GetDeptList',
    params,
  });
};

// 领料明细统计

export const GetPageInventoryPickl = (data: PageListParams): Promise<any> => {
  return defHttp.post<PageListResult>({
    url: '/Summary/GetPageInventoryPickl',
    data,
  });
};

// 在线库存
export const GetPageOnlineInventory = (data: PageListParams): Promise<any> => {
  return defHttp.post<PageListResult>({
    url: '/Summary/GetPageOnlineInventory',
    data,
  });
};

// 库龄管理
export const GetPageInventoryYear = (data: PageListParams): Promise<any> => {
  return defHttp.post<PageListResult>({
    url: '/Summary/GetPageInventoryYear',
    data,
  });
};

export const GetNoChangeInventories = (data: any): Promise<any> => {
  return defHttp.post<PageListResult>({
    url: '/Summary/GetNoChangeInventories',
    data,
  });
};

export const GetInventoryStatisticsByDate = (data: any): Promise<any> => {
  return defHttp.post<PageListResult>({
    url: '/Summary/GetInventoryStatisticsByDate',
    data,
  });
};

// 出入库流水
export const GetPageInventoryFlowl = (data: PageListParams): Promise<any> => {
  return defHttp.post<PageListResult>({
    url: '/Summary/GetPageInventoryFlowl',
    data,
  });
};

// 总计
export const GetSumDatal = (params: any): Promise<any> => {
  return defHttp.get<PageListResult>({
    url: '/Summary/GetSumDatal',
    params,
  });
};

export const getTotalAmountSummary = (params: any): Promise<any> => {
  return defHttp.get<PageListResult>({
    url: '/Summary/GetTotalAmountSummary',
    params,
  });
};

export const getWarehouseAmountSummary = (params: any): Promise<any> => {
  return defHttp.get<PageListResult>({
    url: '/Summary/GetWarehouseAmountSummary',
    params,
  });
};

export const getDeptAmountSummary = (params: any): Promise<any> => {
  return defHttp.get<PageListResult>({
    url: '/Summary/GetDeptAmountSummary',
    params,
  });
};
// 预警通知
export const GetNotificationList = (params?: any): Promise<any> => {
  return defHttp.get<PageListResult>({
    url: '/Notification/GetNotificationList',
    params,
  });
};

export const GetRealtimeInventories = (data: any): Promise<any> => {
  return defHttp.post<PageListResult>({
    url: '/DataCenter/GetRealtimeInventories',
    data,
  });
};

// 异常消耗列表
export const GetMaterialMonthlyChangeDetail = (data: any): Promise<any> => {
  return defHttp.post<PageListResult>({
    url: '/Summary/GetMaterialMonthlyChangeDetail',
    data,
  });
};

export const Getorders = (data: any): Promise<any> => {
  return defHttp.post<PageListResult>({
    url: '/Summary/Getorders',
    data,
  });
};

export const Getorderlines = (params: any): Promise<any> => {
  return defHttp.get<PageListResult>({
    url: '/Summary/Getorderlines',
    params,
  });
};

export const uploadStock = (data: any) => {
  return defHttp.post<any>({
    url: '/openapi/ERP/ImportFirstInventory',
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}