import { Icon, type IconProps } from '@iconify/react';

import useStyles from './style';

interface IconifyIconProps extends IconProps {
  size: IconProps['width'];
}

export default function IconifyIcon({ icon, size, ...props }: IconifyIconProps) {
  const { styles } = useStyles();
  return <Icon icon={icon} {...props} className={styles.anticon} width={size} />;
}
