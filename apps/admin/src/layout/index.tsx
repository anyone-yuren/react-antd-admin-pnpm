import { Layout } from 'antd';
import ErrorBoundary from 'antd/es/alert/ErrorBoundary';
import { Outlet, useLocation } from 'react-router-dom';
import '@/gbeata';

import { AppLogo } from '@/components/AppLogo';

import { useTitle } from '@/hooks/web/useTitle';

import { useAppSelector } from '@/stores';

import LayoutHeader from './header';
import useStyles from './index.style';
import LayoutMenu from './menu';
import { useGlobalStore } from 'store';

export const BasicLayout = (props: any) => {
  const { state } = useLocation();
  const { key = 'key' } = state || {};
  useTitle();
  const { Sider, Content } = Layout;
  const { styles } = useStyles();

  const getMenuFold = useAppSelector((st) => st.app.appConfig?.menuSetting?.menuFold);

  const { layoutType, } = useGlobalStore();
  console.log('layoutType:', layoutType);
  
  if(layoutType === "2") {
    return (
      <Layout className={styles.layout_wrapper}>
        <LayoutHeader />
        <Layout>
        <Sider width={240} trigger={null} theme='light' collapsed={getMenuFold} className='ant-layout-sider'>
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
  if(layoutType === "3") {
    return (
      <Layout className={styles.layout_wrapper}>
        <LayoutHeader />
        <Content>
          <ErrorBoundary>
            <Outlet key={key} />
          </ErrorBoundary>
        </Content>
    </Layout>
    );
  } else { // 默认为1
    return (
      <Layout className={styles.layout_wrapper}>
        <Sider width={240} trigger={null} theme='light' collapsed={getMenuFold} className='ant-layout-sider'>
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
  }
};
