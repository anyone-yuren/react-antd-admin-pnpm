import { Option } from '../MwForm/mw-form'
import { SelectProps } from 'antd/lib/select'

interface MwSelectProps extends SelectProps<any> {
  options?: Array<Option>
}
