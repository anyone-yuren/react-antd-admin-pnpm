import { SelectProps } from 'antd/lib/select';
import { Option } from '../GForm/g-form';

interface GSelectProps extends SelectProps<any> {
  options?: Array<Option>;
}
