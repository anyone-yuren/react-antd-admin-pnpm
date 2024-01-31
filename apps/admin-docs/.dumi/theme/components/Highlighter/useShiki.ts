import { useCallback, useEffect, useMemo, useRef } from 'react';
import { Highlighter, Theme, getHighlighter, setCDN } from 'shiki-es';
import useControlledState from 'use-merge-value';

import { languageMap } from './language';

export interface ShikiSyntaxTheme {
  dark: Theme;
  light: Theme;
}

export interface ShikiOptions {
  onInit?: (instance: Highlighter) => void;
  onLoadingChange?: (loading: boolean) => void;
  theme?: Partial<ShikiSyntaxTheme>;
}

// 使用 element cdn 提升加载速度
setCDN('https://npm.elemecdn.com/shiki-es/dist/assets');

const defaultTheme: ShikiSyntaxTheme = {
  dark: 'github-dark',
  light: 'github-light',
};

export const useShiki = ({ onLoadingChange, theme }: ShikiOptions) => {
  const mergeTheme = useMemo(() => ({ ...defaultTheme, ...theme }), [theme]);
  const [THEME] = useControlledState(defaultTheme, { value: mergeTheme });

  const shikiRef = useRef<Highlighter | null>(null);

  const initHighlighter = async (theme: ShikiSyntaxTheme) => {
    onLoadingChange?.(true);

    shikiRef.current = await getHighlighter({
      langs: Object.keys(languageMap) as any,
      themes: Object.values(theme),
    });

    onLoadingChange?.(false);
  };

  // 初始化 Shiki HightLighter
  useEffect(() => {
    initHighlighter(THEME);
  }, [THEME]);

  return useCallback(
    (text: string, language: any, isDarkMode: boolean) => {
      try {
        return (
          shikiRef.current?.codeToHtml(text, {
            lang: language,
            theme: isDarkMode ? THEME.dark : THEME.light,
          }) || ''
        );
      } catch (e) {
        onLoadingChange?.(true);
        initHighlighter(THEME);
      }
    },
    [THEME],
  );
};
