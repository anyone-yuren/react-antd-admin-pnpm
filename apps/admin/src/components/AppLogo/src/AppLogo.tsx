import { Space } from 'antd'
import classNames from 'classnames'
import { FC } from 'react'

import logoImg from '@/assets/images/logo.png'
import logoName from '@/assets/images/name_white.png'
import { useAppSelector } from '@/stores'

import styles from './app-logo.module.less'

const AppLogo: FC = () => {
  const getMenuFold = useAppSelector(state => state.app.appConfig?.menuSetting?.menuFold)

  return (
    <div className={classNames('anticon', styles['app-logo'])}>
      <Space>
        <img className={styles['logo-img']} src={logoImg} alt='logo' />
        <img className={classNames(styles['logo-name'], { [styles.hidden]: getMenuFold })} src={logoName} alt='logo' />
      </Space>
    </div>
  )
}

export default AppLogo
