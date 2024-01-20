import { Link } from 'dumi';
import isEqual from 'fast-deep-equal';
import { memo, type FC } from 'react';
import { shallow } from 'zustand/shallow';

import { siteSelectors, useSiteStore } from '../../store';
import { useStyles } from './style';

const Logo: FC = () => {
  const themeConfig = useSiteStore((s) => s.siteData.themeConfig, isEqual);
  const locale = useSiteStore((s) => s.locale, isEqual);
  const logo = useSiteStore(siteSelectors.logo, shallow);

  const { styles, cx } = useStyles();

  return (
    themeConfig && (
      <Link className={cx(styles)} to={'base' in locale ? locale.base : '/'}>
        {!!logo && <img src={logo} alt={themeConfig.name} height={32} />}
        {themeConfig.name}
      </Link>
    )
  );
};

export default memo(Logo);
