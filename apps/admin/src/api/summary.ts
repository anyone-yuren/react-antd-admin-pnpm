import { defHttp } from 'apis';

import type { PageListParams, PageListResult } from '#/entity';

export const GetPageInventoryCostl = (data: PageListParams): Promise<any> => {
  return defHttp.post<PageListResult>({
    url: '/Summary/GetPageInventoryCostl',
    data,
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

// 出入库流水
export const GetPageInventoryFlowl = (data: PageListParams): Promise<any> => {
  return defHttp.post<PageListResult>({
    url: '/Summary/GetPageInventoryFlowl',
    data,
  });
};
