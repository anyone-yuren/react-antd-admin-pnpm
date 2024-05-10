// 参考案例https://juejin.cn/post/7176075684823957561
import { AxiosRequestConfig } from 'axios';
// 用于存储每个请求的标识，用于取消请求
const pendingMap = new Map<string, AbortController>();

export class AxiosCanceler {
  /**
   * @description: 添加请求
   * @param {AxiosRequestConfig} config 请求配置
   * @return void
   * @example
   * const CancelToken = axios.CancelToken;
   * const source = CancelToken.source();
   * axios({...config, cancelToken: source.token})
   * source.cancel('Operation has been canceled by the user.');
   */
  public addPending(config: AxiosRequestConfig): void {
    this.removePending(config);
    const url = getPendingUrl(config);
    const controller = new AbortController();
    config.signal = config.signal || controller.signal;
    if (!pendingMap.has(url)) {
      pendingMap.set(url, controller);
    }
  }

  public removePending(config: AxiosRequestConfig): void {
    const url = getPendingUrl(config);
    if (pendingMap.has(url)) {
      // 如果当前请求在等待中，取消它并将其从等待中移除
      const controller = pendingMap.get(url);
      if (controller) {
        controller.abort(url);
      }
      pendingMap.delete(url);
    }
  }
  /**
   * 重置
   */
  public reset(): void {
    pendingMap.clear();
  }
  /**
   * @description: 清除所有请求
   * @return void
   */
  public removeAllPending(): void {
    pendingMap.forEach((controller) => {
      if (controller) {
        controller.abort();
      }
    });
    this.reset();
  }
}
function getPendingUrl(config: AxiosRequestConfig): string {
  return [config.method, config.url].join('&');
}
