import { useGlobalStore } from '@/stores/admin';
import { ThemeProvider } from 'antd-style';
import { useEffect, useState } from 'react';
import { HashRouter, RouterProvider } from 'react-router-dom';
import { GlobalConfig } from 'ui';

import cyanImg from '@/assets/images/cyan-blur.png';
import redImg from '@/assets/images/red-blur.png';
import router, { Router } from '@/router';
import CustomGlobal from '@/styles/GlobalPager';

import LoadingPage from './components/LoadingPage';

function App() {
  const { preset } = useGlobalStore((state) => {
    return {
      preset: state.preset,
    };
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 异步操作模拟（例如数据加载、初始化等）
    const asyncOperation = async () => {
      // 模拟异步操作
      await new Promise((resolve) => {
        setTimeout(resolve, 3000);
      });
      // 完成异步操作后，切换到主应用
      setLoading(false);
    };

    asyncOperation();
  }, []); // 仅在组件挂载时执行
  return (
    <GlobalConfig>
      <ThemeProvider
        defaultThemeMode='light'
        theme={{
          token: {
            colorPrimary: preset,
            colorInfo: '#00B8D9',
            colorSuccess: '#22C55E',
            colorWarning: '#FFAB00',
            colorError: '#FF5630',
            colorLink: preset,
          },
        }}
        customToken={{
          colorDefault: '#212b36',
          paperRedImg: redImg as string,
          paperCyanImg: cyanImg as string,
        }}
      >
        <CustomGlobal />
        {loading ? <LoadingPage /> : <RouterProvider router={router} />}
        {/* {loading ? (
          <LoadingPage />
        ) : (
          <HashRouter>
            <Router />
          </HashRouter>
        )} */}
      </ThemeProvider>
    </GlobalConfig>
  );
}

export default App;
