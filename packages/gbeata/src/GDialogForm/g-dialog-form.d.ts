import { ModalProps } from 'antd/lib/modal';
import { ReactNode } from 'react';
import { Field } from '../GForm/g-form';
import { ExtendField, GSearchTableField } from '../GSearchTable/g-search-table';
import { AnyKeyProps } from '../types/AnyKeyProps';

declare type ModeType = 'add' | 'update' | 'view' | 'custom' | string;

export interface GDialogFormProps extends ModalProps {
  /** 弹窗标题 */
  title?: string;
  /** 用抽屉来展示 */
  drawer?: boolean;
  /** 表单项 */
  fields?: Array<GDialogFormField | GSearchTableField>;
  /** form 的 span */
  span?: number;
  /** 新增 api */
  addApi?(params?: AnyKeyProps): Promise<AnyKeyProps>;
  /** 修改 api */
  updateApi?(params?: AnyKeyProps): Promise<AnyKeyProps>;
  /** 弹窗宽度 */
  width?: number | string;
  /** 表单名字 */
  name?: string;
  /** 提交前校验 */
  beforeSubmit?(params?: AnyKeyProps, mode?: string): boolean | AnyKeyProps;
  /** 表格其它属性扩展 */
  dialogExtend?: AnyKeyProps;
  /** 表单其它属性扩展 */
  formExtend?: AnyKeyProps;
  /** 是否只使用申明了 dialog 的 Field */
  dialogOnly?: boolean;
  /** 是否可见 */
  open?: boolean;
  /** 打开弹窗后的默认值 */
  initialValues?: AnyKeyProps;
  /** 关闭弹窗监听 */
  onClose?: () => void;
  /** 关闭弹窗监听 */
  onCancel?: () => void;
  /** 模式 */
  mode?: 'add' | 'update' | 'view';
  /** 弹窗数据是否在加载中 */
  spinning?: boolean;
  /** 成功监听 */
  onSuccess?: ({
    data,
    values,
    params,
    initParams,
    closeDialog,
  }: AnyKeyProps) => void;
  /** 成功监听 */
  onError?: ({
    data,
    values,
    params,
    initParams,
    closeDialog,
  }: AnyKeyProps) => void;
  /** 成功后是否自动关闭 */
  autoClose?: boolean;
  children?: ReactNode;
  stopLoading?: boolean;
}

export interface GDialogFormField extends Field {
  /** 弹窗选项 */
  dialog?: ExtendField;

  /** table 参数 (写了也没用) */
  table?: any;

  /** search 参数 (写了也没用) */
  search?: any;
}

export interface GDialogFormRef extends AnyKeyProps {
  /**
   * 弹窗新增模式
   * @param params 初始表单数据
   * @param title 弹窗标题，默认“新增”
   */
  add(params?: AnyKeyProps, title?: ReactNode): Promise<any>;
  /**
   * 弹窗修改模式
   * @param params 初始表单数据
   * @param title 弹窗标题，默认“修改”
   */
  update(params?: AnyKeyProps, title?: ReactNode): Promise<any>;
  /**
   * 弹窗详情模式
   * @param params 初始表单数据
   * @param title 弹窗标题，默认“详情”
   */
  view(params?: AnyKeyProps, title?: ReactNode): void;
  /**
   * 关闭弹窗
   */
  closeDialog(): void;
}
