import { Space } from 'antd';

import { DocLink, GithubLink, GlobalSearch, Settings, SlideTheme, UserDropdown } from './components';

export default function LayoutFeature() {
  return (
    <Space size={'middle'}>
      <GlobalSearch />
      <DocLink />
      <GithubLink />
      <Settings />
      <UserDropdown />
    </Space>
  );
}
