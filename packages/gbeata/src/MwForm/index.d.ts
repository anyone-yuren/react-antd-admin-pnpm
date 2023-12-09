import { MwFormProps, RegisterFieldProps } from './mw-form'

// 自定义表单类型
export declare function registerField(
  /** 表单类型 */
  fieldType: string,
  /** field 具体实现 */
  field: RegisterFieldProps
): void

declare const MwForm: React.ForwardRefExoticComponent<MwFormProps & React.RefAttributes<HTMLDivElement>>

export default MwForm
