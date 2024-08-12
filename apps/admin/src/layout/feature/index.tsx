import { Space } from 'antd';

import {
  // GithubLink,
  GlobalSearch,
  OnlineNotification,
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
      <OnlineNotification />
      <GlobalSearch />
      {/* <Selectlangulage />
      <DocLink />
      <GithubLink /> */}
      <Settings />
      <UserDropdown />
    </Space>
  );
}
