import type { ThemeMode } from 'antd-style';
import equal from 'fast-deep-equal';
import { persist } from 'zustand/middleware';
import { createWithEqualityFn } from 'zustand/traditional';

interface Store {
  themeMode: ThemeMode;
}
export const useThemeStore = createWithEqualityFn<Store>()(
  persist(
    () => ({
      themeMode: 'auto' as ThemeMode,
    }),
    { name: 'ANTD_STYLE_DOC_STORE' },
  ),
  equal,
);
