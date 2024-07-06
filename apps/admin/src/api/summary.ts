import { defHttp } from 'apis';

import type { PageListParams, PageListResult } from '#/entity';

export const GetPageInventoryCostl = (data: PageListParams): Promise<any> => {
  return defHttp.post<PageListResult>({
    url: '/Summary/GetPageInventoryCostl',
    data,
  });
};
