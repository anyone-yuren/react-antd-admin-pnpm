import { Space } from 'antd';
import { useTheme } from 'antd-style';
import classNames from 'classnames';

import SvgIcon from '@/components/SvgIcon';

import logo1 from '@/assets/images/logo1.jpg';
import { useSettings } from '@/stores/modules/settingStore';

import useStyles from './app-logo.module.style';

import type { FC } from 'react';

const AppLogo: FC = () => {
  const token = useTheme();
  const { styles } = useStyles();
  const settings = useSettings();
  const getMenuFold = settings.unfold;

  return (
    <div className={classNames('anticon', styles['app-logo'])}>
      <Space>
        {/* <SvgIcon
          style={{
            color: token.colorPrimary,
          }}
          name='logo'
          size={30}
        /> */}
        <img src={logo1} alt='logo' style={{ width: 30, height: 30 }} />
        <div className={styles.container}>
          {!getMenuFold ? <span className={styles.text}>{'中国平煤神马集团'}</span> : ''}
        </div>

        {/* <img className={classNames(styles['logo-name'], { [styles.hidden]: getMenuFold })} src={logoName} alt='logo' /> */}
      </Space>
    </div>
  );
};

export default AppLogo;
