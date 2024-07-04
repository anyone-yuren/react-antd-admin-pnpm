import { defHttp } from 'apis';

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
