import { GFormProps, RegisterFieldProps } from './g-form';

// 自定义表单类型
export declare function registerField(
  /** 表单类型 */
  fieldType: string,
  /** field 具体实现 */
  field: RegisterFieldProps,
): void;

declare const GForm: React.ForwardRefExoticComponent<
  GFormProps & React.RefAttributes<HTMLDivElement>
>;

export default GForm;
