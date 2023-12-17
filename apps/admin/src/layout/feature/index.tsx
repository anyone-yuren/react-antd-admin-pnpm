import { Space } from 'antd';

import { DocLink, FullScreen, GithubLink, Settings, SlideTheme, UserDropdown } from './components';

export default function LayoutFeature() {
  return (
    <Space size={'middle'}>
      <FullScreen />
      <DocLink />
      <GithubLink />
      <Settings />
      <UserDropdown />
    </Space>
  );
}
