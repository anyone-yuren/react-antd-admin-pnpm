import { Segmented } from 'antd';
import { useTheme } from 'antd-style';

import SvgIcon from '@/components/SvgIcon';

import { useSettingActions, useSettings } from '@/stores/modules/settingStore';

import type { SegmentedLabeledOption, SegmentedValue } from 'antd/lib/segmented';

import { ThemeLayout } from '#/enum';

export default function LayoutSettings() {
  const settings = useSettings();
  const { setSettings } = useSettingActions();
  const token = useTheme();
  const options: SegmentedLabeledOption[] = [
    {
      label: (
        <div
          style={{
            padding: '16px',
            color: settings.themeLayout === ThemeLayout.Vertical ? token.colorPrimary : token.colorText,
          }}
        >
          <SvgIcon name='fill' size={32} />
        </div>
      ),
      value: ThemeLayout.Vertical,
    },
    {
      label: (
        <div
          style={{
            padding: '16px',
            color: settings.themeLayout === ThemeLayout.Horizontal ? token.colorPrimary : token.colorText,
          }}
        >
          <SvgIcon name='filling' size={32} />
        </div>
      ),
      value: ThemeLayout.Horizontal,
    },
    {
      label: (
        <div
          style={{
            padding: '16px',
            color: settings.themeLayout === ThemeLayout.Mini ? token.colorPrimary : token.colorText,
          }}
        >
          <SvgIcon name='topFill' size={32} />
        </div>
      ),
      value: ThemeLayout.Mini,
    },
  ];
  return (
    <Segmented
      style={{
        backgroundColor: token.colorBgContainerDisabled,
      }}
      block
      value={settings.themeLayout}
      onChange={(v) => setSettings({ ...settings, themeLayout: v as ThemeLayout })}
      options={options}
    />
  );
}
