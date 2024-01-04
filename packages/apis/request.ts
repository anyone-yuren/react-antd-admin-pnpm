// eslint-disable-next-line import/no-extraneous-dependencies
import { notification } from 'antd';
import request, { type RequestOptionsInit, extend } from 'umi-request';

// 全局请求参数设置
const PREFIX = '';
export const GRequest = extend({
  timeout: 60000,
  // 记得区分开发环境与生产环境
  prefix: PREFIX,
});

let isRefreshingToken = false; // 是否正在刷新token
const requestQueue: {
  url: string;
  options: RequestOptionsInit;
  resolve: (value: Response | PromiseLike<Response>) => any;
  reject: (reason?: any) => void;
}[] = []; // 请求队列
GRequest.interceptors.request.use((url, options) => {
  const { headers } = options;

  return {
    url,
    options: {
      ...options,
      headers,
    },
  };
});

GRequest.interceptors.response.use(async (response, options) => {
  const { status } = response;
  if (status === 200) {
    const data = await response.clone().json();
    if (data.code !== 0) {
      notification.error({
        message: '请求错误',
        description: data.msg,
      });
      return Promise.reject(data.msg);
    }
    return data;
  }
  if (status === 401) {
    if (!isRefreshingToken) {
      // 重新登录
      const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
      isRefreshingToken = true;
      // 刷新token
      const res = await GRequest('/User/ReLogin', {
        method: 'POST',
        data: userInfo,
      });
      localStorage.setItem('userInfo', JSON.stringify(res.data));
      isRefreshingToken = false;
      const response = GRequest(options.url, options);

      // 重新登录后，将队列中的请求重新发出
      requestQueue.forEach((cb) => cb.resolve(GRequest(cb.url, cb.options)));

      return response;
    }
    // 正在刷新token，将返回一个未执行resolve的promise
    return new Promise((resolve, reject) => {
      requestQueue.push({ url: options.url, options, resolve, reject });
    });
  }
  notification.error({
    message: '请求错误',
    description: response.statusText,
  });
  return Promise.reject(response.statusText);
});

export default request;
