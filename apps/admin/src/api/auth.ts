import { defHttp } from 'apis';

import type { UserInfo, UserToken } from '#/entity';

export interface LoginParams {
  username: string;
  password: string;
}

export type SignRes = UserToken & {
  user: UserInfo;
  resultData: string;
};
export type WarehouseTreeList = {
  warehouseCode: string;
  warehouseName: string;
  warehouseInfoList: WarehouseTreeList[];
};
export type Permission = {
  id: string;
  roleId: string;
  roleName: string;
  isAdmin: boolean;
  userName: string;
  avator: string;
  realName: string;
  userSex: string;
  userSexDisplay: string;
  birthday: string;
  createName?: string;
  createTime?: string;
  orgCode?: string;
  warehouseInfoList: any[];
  warehouseTreeList: WarehouseTreeList[];
  permission: string[];
};

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

// Get User info
export function getUserInfo(): Promise<any> {
  // return service({
  //   url: '/getUserInfo',
  //   method: 'get',
  // });
  return defHttp.get({
    url: '/getUserInfo',
  });
}

// User logout api
export function logoutApi() {
  // return service({
  //   url: '/logout',
  //   method: 'get',
  // });
  return defHttp.get({
    url: '/logout',
  });
}

// Table list
export function getTableList(params: any) {
  // return service({
  //   url: '/table/getTableList',
  //   method: 'get',
  //   params,
  // });
  return defHttp.get({
    url: '/table/getTableList',
    params,
  });
}

// juejin api
export function getJueJinList(params) {
  // return service({
  //   url: 'article/queryList',
  //   method: 'post',
  //   data: params,
  // });
  return defHttp.post({
    url: '/article/queryList',
    data: params,
  });
}

export function getUsersList<T>() {
  // return service({
  //   url: 'user/getUserList',
  //   method: 'get',
  // }) as unknown as Promise<T>;

  return defHttp.get<T>({
    url: '/user/getUserList',
  });
}

export const getLoginUserPermission = (): Promise<Permission> => {
  return defHttp.get<Permission>({
    url: '/Auth/GetLoginUserPermission',
  });
};
