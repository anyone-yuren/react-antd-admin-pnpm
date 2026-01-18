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

import { ThemeLayout } from '#/enum';

export const BasicLayout = (props: any) => {
  const { state } = useLocation();
  const { unfold, themeLayout } = useSettings();
  const { key = 'key' } = state || {};
  useTitle();
  const { Sider, Content, Header } = Layout;
  const { styles } = useStyles();

  // 水平布局（菜单在顶部）
  if (themeLayout === ThemeLayout.Horizontal) {
    return (
      <Layout className={styles.layout_wrapper}>
        <LayoutHeader />
        <Layout>
          <Sider width={240} trigger={null} theme='light' collapsed={unfold} className='ant-layout-sider'>
            <AppLogo />
            <LayoutMenu />
          </Sider>
          <Content>
            <ErrorBoundary>
              <Outlet key={key} />
            </ErrorBoundary>
          </Content>
        </Layout>
      </Layout>
    );
  }

  // 迷你布局（侧边栏更小）
  if (themeLayout === ThemeLayout.Mini) {
    return (
      <Layout className={styles.layout_wrapper}>
        <Layout>
          <LayoutHeader />
          <Header
            className='ant-layout-header'
            style={{ display: 'flex', alignItems: 'center', padding: '0 24px', height: '64px', background: '#fff' }}
          >
            <AppLogo />
            <LayoutMenu />
          </Header>
          <Content>
            <ErrorBoundary>
              <Outlet key={key} />
            </ErrorBoundary>
          </Content>
        </Layout>
      </Layout>
    );
  }

  // 默认返回垂直布局
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
