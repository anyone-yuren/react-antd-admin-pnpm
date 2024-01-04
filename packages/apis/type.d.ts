export interface IResponse<T> {
  code: boolean;
  data: T;
  msg: string;
}
