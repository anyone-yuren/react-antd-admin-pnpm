import { defHttp } from 'apis';

import { service } from '@/utils/axios';

import type { UserInfo, UserToken } from '#/entity';

export interface LoginParams {
  username: string;
  password: string;
}

export type SignRes = UserToken & {
  user: UserInfo;
};

// User login api
export const loginApi = (data: LoginParams): Promise<SignRes> => {
  // return service({
  //   url: '/login',
  //   method: 'post',
  //   data,
  // });
  return defHttp.post<SignRes>({
    url: '/login',
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
  return service({
    url: '/table/getTableList',
    method: 'get',
    params,
  });
}

// juejin api
export function getJueJinList(params) {
  return service({
    url: 'article/queryList',
    method: 'post',
    data: params,
  });
}

export function getUsersList<T>() {
  return service({
    url: 'user/getUserList',
    method: 'get',
  }) as unknown as Promise<T>;
}
