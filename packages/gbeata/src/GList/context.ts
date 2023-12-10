import { createContext } from 'react';
import { AnyKeyProps } from '../types/AnyKeyProps';

export const MwListContext = createContext<AnyKeyProps>({
  // 当前列表的数据
  data: [],
  // 已经禁用的 row 组成的 key
  disabledKeys: [],
  // 设置禁用的选项
  setDisabledKeys: (keys: Array<string>) => {},
});
