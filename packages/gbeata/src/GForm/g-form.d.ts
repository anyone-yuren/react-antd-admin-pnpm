import { ReactNode } from 'react';
export interface Option {
  /** 页面展示的值 */
  label?: ReactNode | string | number;
  /** 实际所取到的值 */
  value: any;
  /** 是否禁用 */
  disabled?: boolean;
  /** 子元素 */
  children?: Array<Option>;
  /** 描述，card-group 时使用 */
  description?: ReactNode | string | number;
  /** 图片，card-group 时使用 */
  cover?: ReactNode | string | number;
  [key: string]: any;
}
