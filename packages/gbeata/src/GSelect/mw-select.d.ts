import { SelectProps } from 'antd/lib/select';
import { Option } from '../GForm/g-form';

interface MwSelectProps extends SelectProps<any> {
  options?: Array<Option>;
}
