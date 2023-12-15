import { GFormField } from '../GForm/g-form';
import { GSearchTableField } from '../GSearchTable/g-search-table';

// 定义一个联合类型，包含 GFormField 和 GSearchTableField 的公共属性
type CommonField = GFormField | GSearchTableField;

// 优化后的函数接收 CommonField 类型的参数
export default function GField() {
  return null;
}
