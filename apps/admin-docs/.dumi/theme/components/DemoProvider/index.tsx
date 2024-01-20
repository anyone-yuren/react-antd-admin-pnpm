import { theme } from 'antd';
import { ThemeAppearance, ThemeMode, ThemeProvider, useTheme, useThemeMode } from 'antd-style';
import type { FC, PropsWithChildren } from 'react';
import { useEffect, useState } from 'react';

import useControlledState from 'use-merge-value';
import { getAntdTheme } from '../../styles';

interface DemoProviderProps extends PropsWithChildren {
  inheritSiteTheme?: boolean;
  defaultTheme?: boolean;
  demoAppearance?: ThemeAppearance;
}

const DemoProvider: FC<DemoProviderProps> = ({
  children,
  inheritSiteTheme = false,
  demoAppearance,
}) => {
  const { isDarkMode } = useTheme();
  const defaultAlgorithm = inheritSiteTheme
    ? isDarkMode
      ? theme.darkAlgorithm
      : theme.defaultAlgorithm
    : undefined;

  const { appearance } = useThemeMode();
  const [demoAppear, setAppear] = useState(appearance);

  const updateAppearance = (value: ThemeMode) => {
    if (value === 'auto') {
      setAppear(appearance);
    } else {
      setAppear(value);
    }
  };

  const [demoThemeMode, setThemeMode] = useControlledState<ThemeMode>(
    (demoAppearance ?? 'auto') as ThemeMode,
    { onChange: updateAppearance },
  );

  useEffect(() => {
    // 不是 auto 意味着 demo 外观已经被锁定，不允许切换
    if (demoThemeMode !== 'auto') return;

    // 如果 demo 主题设为 auto，那么就意味着 demo 外观会随着文档主题变化而变化
    setAppear(appearance);
  }, [demoThemeMode, appearance]);

  return (
    <ThemeProvider
      prefixCls={inheritSiteTheme ? undefined : 'ant'}
      theme={
        inheritSiteTheme
          ? (appearance) => {
              const antdTheme = getAntdTheme(appearance);
              return { ...antdTheme, inherit: false };
            }
          : { inherit: false, algorithm: defaultAlgorithm }
      }
      appearance={demoAppearance ?? demoAppear}
      themeMode={demoThemeMode}
      onThemeModeChange={(mode) => {
        // 如果设定了 demo 外观，那么就不允许切换主题了
        if (!!demoAppearance) return;

        setThemeMode(mode);
      }}
    >
      {children}
    </ThemeProvider>
  );
};

export default DemoProvider;
