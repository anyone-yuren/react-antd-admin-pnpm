import { Segmented, Tooltip } from 'antd';
import { type ThemeMode, useThemeMode } from 'antd-style';

const options = [
  { label: '自动', value: 'auto' },
  { label: '亮色', value: 'light' },
  { label: '暗色', value: 'dark' },
];
export default function SlideTheme() {
  const { themeMode, setThemeMode } = useThemeMode();
  return (
    <Tooltip title='切换主题' placement='bottom' mouseEnterDelay={0.5}>
      <Segmented
        style={{ margin: '0 8px' }}
        value={themeMode}
        onChange={(v) => setThemeMode(v as ThemeMode)}
        options={options}
      />
    </Tooltip>
  );
}
