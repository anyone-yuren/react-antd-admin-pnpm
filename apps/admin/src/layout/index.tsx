import { Layout } from 'antd';
import ErrorBoundary from 'antd/es/alert/ErrorBoundary';
import { Outlet, useLocation } from 'react-router-dom';
import '@/gbeata';

import { AppLogo } from '@/components/AppLogo';

import { useTitle } from '@/hooks/web/useTitle';

import { useSettings } from '@/stores/modules/settingStore';

import LayoutHeader from './header';
import useStyles from './index.style';
import LayoutMenu from './menu';

export const BasicLayout = (props: any) => {
  const { state } = useLocation();
  const { unfold } = useSettings();
  const { key = 'key' } = state || {};
  useTitle();
  const { Sider, Content } = Layout;
  const { styles } = useStyles();
  return (
    <Layout className={styles.layout_wrapper}>
      <Sider width={240} trigger={null} theme='light' collapsed={unfold} className='ant-layout-sider'>
        <AppLogo />
        <LayoutMenu />
      </Sider>
      <Layout>
        <LayoutHeader />
        <Content>
          <ErrorBoundary>
            <Outlet key={key} />
          </ErrorBoundary>
        </Content>
      </Layout>
    </Layout>
  );
};
