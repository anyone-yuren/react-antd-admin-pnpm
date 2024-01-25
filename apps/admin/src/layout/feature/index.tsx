import { Space } from 'antd';

import { DocLink, GithubLink, GlobalSearch, Settings, SlideTheme, UserDropdown, Selectlangulage } from './components';

export default function LayoutFeature() {
  return (
    <Space size={'middle'}>
      <GlobalSearch />
      <Selectlangulage />
      <DocLink />
      <GithubLink />
      <Settings />
      <UserDropdown />
    </Space>
  );
}
