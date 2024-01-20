import { memo, useEffect, type FC } from 'react';
import { Flexbox } from 'react-layout-kit';

import LangSwitch from 'dumi/theme/slots/LangSwitch';
import Logo from 'dumi/theme/slots/Logo';
import Navbar from 'dumi/theme/slots/Navbar';
import SearchBar from 'dumi/theme/slots/SearchBar';

import Burger from '../../components/Burger';
import GithubButton from '../../components/GithubButton';
import ThemeSwitch from '../../components/ThemeSwitch';

import { useResponsive } from 'antd-style';
import { usePrefersColor } from 'dumi';
import { useSiteStore } from '../../store/useSiteStore';
import { useThemeStore } from '../../store/useThemeStore';
import { useStyle } from './style';

const Switcher = () => {
  const themeMode = useThemeStore((s) => s.themeMode);
  const [, , setColorMode] = usePrefersColor();
  useEffect(() => setColorMode(themeMode), [themeMode]);
  return (
    <ThemeSwitch
      value={themeMode}
      onChange={(mode) => {
        useThemeStore.setState({ themeMode: mode });
      }}
    />
  );
};

const Header: FC = () => {
  const hasHeader = useSiteStore((s) => !!s.routeMeta.frontmatter);

  const { mobile } = useResponsive();
  const { styles } = useStyle();

  return !hasHeader ? null : (
    <div className={styles.header}>
      <Flexbox
        horizontal
        distribution={'space-between'}
        align={'center'}
        width={'auto'}
        className={styles.content}
      >
        {mobile ? (
          <>
            <Flexbox>
              <Burger />
            </Flexbox>
            <Flexbox horizontal className={styles.left}>
              <Logo />
            </Flexbox>
            <Flexbox>
              <Switcher />
            </Flexbox>
          </>
        ) : (
          <>
            <Flexbox horizontal className={styles.left}>
              <Logo />
            </Flexbox>
            <Flexbox style={{ marginLeft: 48, alignSelf: 'end' }}>
              <Navbar />
            </Flexbox>
            <section className={styles.right}>
              <div />
              <Flexbox
                gap={16}
                horizontal
                align={'center'}
                className="dumi-default-header-right-aside"
              >
                <SearchBar />
                <LangSwitch />
                <GithubButton />
                <Switcher />
              </Flexbox>
            </section>
          </>
        )}
      </Flexbox>
    </div>
  );
};

export default memo(Header);
