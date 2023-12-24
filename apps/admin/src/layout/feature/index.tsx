import { Space } from 'antd';

import { DocLink, GithubLink, Settings, SlideTheme, UserDropdown } from './components';

export default function LayoutFeature() {
  return (
    <Space size={'middle'}>
      <DocLink />
      <GithubLink />
      <Settings />
      <UserDropdown />
    </Space>
  );
}
