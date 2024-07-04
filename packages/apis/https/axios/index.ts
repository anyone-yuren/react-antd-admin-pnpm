// eslint-disable-next-line import/no-extraneous-dependencies
import { deepMerge, formatRequestDate, getItem, joinTimestamp, setObjToUrlParams } from '@gbeata/utils';
// eslint-disable-next-line import/no-extraneous-dependencies
import { clone, isString } from 'lodash-es';

import { ContentTypeEnum, RequestEnum, ResultEnum, StorageEnum } from '../enums/httpEnum';
import { GAxios } from './Axios';
import axios from 'axios';

import type { RequestOptions, Result } from '../types/axios';
import type { AxiosTransform, CreateAxiosOptions } from './axiosTransform';
import type { AxiosInstance, AxiosResponse } from 'axios';
import { useUserStore } from '@gbeata/store';

/**
 * @description: 数据处理，方便区分多种处理方式
 */
const transform: AxiosTransform = {
  /**
   * @description: 处理响应数据，如果数据不是预期格式，则直接抛出错误
   */
  transformResponseHook: (res: AxiosResponse<Result>, options: RequestOptions) => {
    const { isReturnNativeResponse, isTransformResponse } = options;
    // 如果不返回原生响应头 比如：需要获取响应头时使用该属性
    if (isReturnNativeResponse) {
      return res;
    }
    // 不进行任何处理，直接返回
    // 用于页面代码可能需要直接获取code，data，message这些信息时开启
    if (!isTransformResponse) {
      return res.data;
    }
    const { data } = res;
    // 错误的时候返回
    if (!res.data) {
      throw new Error('请求接口错误');
    }
    //  这里 code，result，message为 后台统一的字段，需要在 types.ts内修改为项目自己的接口返回格式
    const { code, message } = data;

    // 这里逻辑可以根据项目进行修改
    const hasSuccess = data && Reflect.has(data, 'code') && code === ResultEnum.SUCCESS;
    if (hasSuccess) {
      return data.data;
    }
    // 在此处根据自己项目的实际情况对不同的code执行不同的操作
    // 如果不希望中断当前请求，请return数据，否则直接抛出异常即可
    let timeoutMsg = '';
    switch (code) {
      case ResultEnum.TIMEOUT:
        timeoutMsg = '登录超时,请重新登录';
        // TODO 登出操作 带上redirect地址
        break;
      default:
        if (message) {
          timeoutMsg = message;
        }
    }
    throw new Error(timeoutMsg);
  },
  /**
   * @description: 响应错误处理
   */
  responseInterceptorsCatch: (axiosInstance: AxiosInstance, error: any) => {
    const { response, code, message, config } = error || {};
    const err: string = error?.toString?.() ?? '';
    let errMessage = '';
    if (axios.isCancel(error)) {
      return Promise.reject(error);
    }
    try {
      if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
        errMessage = '接口请求超时,请刷新页面重试!';
      }
      if (err?.includes('Network Error')) {
        errMessage = '网络异常,请检查您的网络连接是否正常';
      }
    } catch (error) {
      throw new Error(error as unknown as string);
    }
    // 根据错误状态码处理, 后面抽离出去
    switch (response?.status) {
      case 401:
        errMessage = '登录失效';
        break;
      case 403:
        errMessage = '拒绝访问';
        break;
      case 404:
        errMessage = '请求地址不存在';
        break;
      case 500:
        errMessage = '服务器内部错误';
        break;
      case 501:
        errMessage = '服务未实现';
        break;
      case 502:
        errMessage = '网关错误';
        break;
      case 503:
        errMessage = '服务不可用';
        break;
      default:
        break;
    }
    return Promise.reject(error);
  },
  // 请求之前的处理config
  beforeRequestHook: (config, options) => {
    const { apiUrl, joinPrefix, joinParamsToUrl, formatDate, joinTime = true, urlPrefix } = options;
    if (joinPrefix) {
      config.url = `${urlPrefix}${config.url}`;
    }
    // TODO 在这兼容restFul风格
    const params = config.params || {};
    const data = config.data || false;
    formatDate && data && !isString(data) && formatRequestDate(data);
    if (config.method?.toUpperCase() === RequestEnum.GET) {
      if (!isString(params)) {
        // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
        config.params = Object.assign(params || {}, joinTimestamp(joinTime, false));
      } else {
        // 兼容restful风格
        config.url = config.url + params + `${joinTimestamp(joinTime, true)}`;
        config.params = undefined;
      }
    } else {
      if (!isString(params)) {
        formatDate && formatRequestDate(params);
        if (
          Reflect.has(config, 'data') &&
          config.data &&
          (Object.keys(config.data).length > 0 || config.data instanceof FormData)
        ) {
          config.data = data;
          config.params = params;
        } else {
          // 非GET请求如果没有提供data，则将params视为data
          config.data = params;
          config.params = undefined;
        }
        if (joinParamsToUrl) {
          config.url = setObjToUrlParams(config.url as string, Object.assign({}, config.params, config.data));
        }
      } else {
        // 兼容restful风格
        config.url = config.url + params;
        config.params = undefined;
      }
    }

    return config;
  },
  // 请求拦截器处理
  requestInterceptors: (config, options) => {
    const token = useUserStore.getState().userToken;
    if (token && (config as Recordable).requestOptions?.withToken !== false) {
      // 是否携带token
      (config as Recordable).headers.Authorization = options.authenticationScheme
        ? `${options.authenticationScheme} ${token}`
        : token;
    }
    return config;
  },
};

function createAxios(options?: Partial<CreateAxiosOptions>) {
  return new GAxios(
    deepMerge(
      {
        authenticationScheme: 'Bearer',
        timeout: 10 * 1000,
        header: { 'Content-Type': ContentTypeEnum.JSON },
        transform: clone(transform),
        // 配置项，下面的选项都可以在独立的接口请求中覆盖
        requestOptions: {
          joinPrefix: true,
          // 是否返回原生响应头 比如：需要获取响应头时使用该属性
          isReturnNativeResponse: false,
          // post请求的时候添加参数到url
          joinParamsToUrl: false,
          //  是否加入时间戳
          joinTime: true,
          // 忽略重复请求
          ignoreCancelToken: true,
          // 是否携带token
          withToken: true,
          retryRequest: {
            isOpenRetry: true,
            count: 5,
            waitTime: 100,
          },
          apiUrl: import.meta.env.VITE_API_URL,
          urlPrefix: import.meta.env.VITE_PREFIX_URL,
          // 格式化提交参数时间
          formatDate: true,
        },
      },
      options || {},
    ),
  );
}
export const defHttp = createAxios();
