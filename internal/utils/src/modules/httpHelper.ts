import { isObject, isString } from "lodash-es";

const DATE_TIME_FORMAT = "YYYY-MM-DD HH:mm:ss";
declare type Recordable<T = any> = Record<string, T>;
/**
 * 格式化请求日期参数，通过递归迭代对象并将日期值应用格式化。
 *
 * @param {Recordable} params - 包含请求日期参数的对象。
 * @return {void} 此函数不返回值。
 */
export function formatRequestDate(params: Recordable) {
  if (Object.prototype.toString.call(params) !== "[object Object]") {
    return;
  }
  Object.keys(params).forEach((key) => {
    const format = params[key]?.format ?? null;
    if (format && typeof format === "function") {
      // eslint-disable-next-line no-param-reassign
      params[key] = params[key].format(DATE_TIME_FORMAT);
    }
    if (isString(key)) {
      const value = params[key];
      if (value) {
        // eslint-disable-next-line no-param-reassign
        params[key] = isString(value) ? value.trim() : JSON.stringify(value);
      }
    }
    if (isObject(params[key])) {
      formatRequestDate(params[key]);
    }
  });
}

export function joinTimestamp(join: boolean, restful = false): string | object {
  if (!join) {
    return restful ? "" : {};
  }
  const now = new Date().getTime();
  if (restful) {
    return `?_t=${now}`;
  }
  return { _t: now };
}

/**
 * Add the object as a parameter to the URL
 * @param baseUrl url
 * @param obj
 * @returns {string}
 * eg:
 *  let obj = {a: '3', b: '4'}
 *  setObjToUrlParams('www.baidu.com', obj)
 *  ==>www.baidu.com?a=3&b=4
 */

export function setObjToUrlParams(baseUrl: string, obj: any): string {
  const parameters = Object.keys(obj)
    .map((key) => `${key}=${encodeURIComponent(obj[key])}`)
    .join("&");

  return parameters ? `${baseUrl}?${parameters}` : baseUrl;
}
