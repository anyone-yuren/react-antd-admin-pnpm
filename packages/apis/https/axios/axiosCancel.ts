// import type { AxiosRequestConfig } from 'axios';

import { AxiosRequestConfig } from 'axios';

export class AxiosCanceler {
  public addPending(config: AxiosRequestConfig): void {}

  public removePending(config: AxiosRequestConfig): void {}
}
