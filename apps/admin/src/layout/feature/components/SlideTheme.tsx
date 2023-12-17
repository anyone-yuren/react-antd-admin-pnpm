import { Segmented, Tooltip } from 'antd';
import { type ThemeMode, useTheme, useThemeMode } from 'antd-style';

import SvgIcon from '@/components/SvgIcon';

import type { SegmentedLabeledOption } from 'antd/lib/segmented';

export default function SlideTheme() {
  const { themeMode, setThemeMode } = useThemeMode();
  const token = useTheme();
  const options: SegmentedLabeledOption[] = [
    {
      label: (
        <div style={{ padding: '16px', color: token.colorPrimary }}>
          <SvgIcon style={{ color: token.colorPrimary }} name='sun' size={18} />
        </div>
      ),
      value: 'light',
    },
    {
      label: (
        <div style={{ padding: '16px', color: token.colorPrimary }}>
          <SvgIcon name='moon' size={18} />
        </div>
      ),
      value: 'dark',
    },
  ];
  return (
    <Segmented
      style={{
        backgroundColor: token.colorBgContainerDisabled,
      }}
      block
      value={themeMode}
      onChange={(v) => setThemeMode(v as ThemeMode)}
      options={options}
    />
  );
}
