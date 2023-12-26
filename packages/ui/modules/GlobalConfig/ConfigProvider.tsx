import { ConfigProvider } from 'antd';

import SvgIcon from '../SvgIcon';

import type { ConfigProviderProps } from 'antd/es/config-provider';
import type { FC } from 'react';

export interface GlobalConfigProps extends ConfigProviderProps {}
const GlobalConfig: FC<GlobalConfigProps> = ({ children, ...rest }) => {
  const customizeRenderEmpty = () => (
    <div style={{ textAlign: 'center' }}>
      <SvgIcon name='ic_content' size={120} />
      <p>Data Not Found</p>
    </div>
  );
  return (
    <ConfigProvider renderEmpty={customizeRenderEmpty} {...rest}>
      {children}
    </ConfigProvider>
  );
};
export default GlobalConfig;
