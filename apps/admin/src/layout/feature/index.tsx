import { Space } from 'antd';

import {
  // DocLink,
  // GithubLink,
  GlobalSearch,
  // Selectlangulage,
  Settings,
  // SlideTheme,
  StoreForm,
  UserDropdown,
} from './components';

export default function LayoutFeature() {
  return (
    <Space size={'middle'}>
      <StoreForm />
      <GlobalSearch />
      {/* <Selectlangulage />
      <DocLink />
      <GithubLink /> */}
      <Settings />
      <UserDropdown />
    </Space>
  );
}
