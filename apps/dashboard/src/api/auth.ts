import { defHttp } from 'apis';

import type { SingleResult, UserInfo, UserToken } from '#/entity';

export interface LoginParams {
  username: string;
  password: string;
}

export type SignRes = UserToken & {
  user: UserInfo;
  resultData: string;
};
export interface TotalSumScanDTO {
  /**
   * 当前总值
   */
  currentTotal?: number;
  /**
   * 入库未完成订单数
   */
  inOrderNotTotal?: number;
  /**
   * 入库订单总数
   */
  inOrderTotal?: number;
  /**
   * 矿区组织当前总值排行
   */
  orgTotalPriceList?: null;
  /**
   * 出库订单
   */
  outOrderList?: null;
  /**
   * 出库订单未完成数
   */
  outOrderNotTotal?: number;
  /**
   * 出库订单总数
   */
  outOrderTotal?: number;
  /**
   * 矿区消耗统计
   */
  outOrgTotal?: null;
  /**
   * 总消耗
   */
  totalCost?: number;
}

// User login api
export const loginApi = (data: LoginParams): Promise<SignRes> => {
  // return service({
  //   url: '/login',
  //   method: 'post',
  //   data,
  // });
  return defHttp.post<SignRes>({
    url: '/Auth/login',
    data,
  });
};

export const GetSumScanDatal = (): Promise<SingleResult<TotalSumScanDTO>> => {
  return defHttp.get({
    url: '/Summary/GetSumScanDatal',
  });
};
