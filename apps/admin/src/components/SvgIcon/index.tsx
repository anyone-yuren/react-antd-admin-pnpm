import useStyles from './index.module.style';

import type { SvgIconProp } from './types';

export default function SvgIcon({ name, prefix = 'icon', size = 16, style }: SvgIconProp) {
  const { styles } = useStyles();
  const symbolId = `#${prefix}-${name}`;
  const iconStyle = {
    width: `${size}px`,
    height: `${size}px`,
    ...style,
  };

  return (
    <svg className={styles['svg-icon']} style={iconStyle} aria-hidden="true">
      <use href={symbolId} />
    </svg>
  );
}
