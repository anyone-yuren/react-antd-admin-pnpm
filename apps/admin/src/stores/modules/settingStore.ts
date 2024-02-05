import { getItem, removeItem, setItem } from '@gbeata/utils';
import { create } from 'zustand';

import { StorageEnum, ThemeColorPresets, ThemeLayout, ThemeMode } from '#/enum';

type SettingsType = {
  themeColorPresets: ThemeColorPresets;
  themeMode: ThemeMode;
  themeLayout: ThemeLayout;
  themeStretch: boolean;
  breadCrumb: boolean;
  multiTab: boolean;
  unfold: boolean;
};
type SettingStore = {
  settings: SettingsType;
  actions: {
    setSettings: (settings: SettingsType) => void;
    clearSettings: () => void;
  };
};

const useSettingStore = create<SettingStore>((set) => ({
  settings: getItem<SettingsType>(StorageEnum.Settings) || {
    themeColorPresets: ThemeColorPresets.Default,
    themeMode: ThemeMode.Light,
    themeLayout: ThemeLayout.Vertical,
    themeStretch: false,
    breadCrumb: true,
    multiTab: true,
    unfold: true,
  },
  actions: {
    setSettings: (settings: SettingsType) => {
      set({ settings });
      setItem(StorageEnum.Settings, settings);
    },
    clearSettings: () => {
      removeItem(StorageEnum.Settings);
    },
  },
}));

export const useSettings = () => useSettingStore((state) => state.settings);
export const useSettingActions = () => useSettingStore((state) => state.actions);
export default useSettingStore;
