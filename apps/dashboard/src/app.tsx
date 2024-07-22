import { useGlobalStore } from '@gbeata/store';
import { useRequest } from 'ahooks';
import { ThemeProvider } from 'antd-style';
import md5 from 'md5';
import { useEffect } from 'react';
import { GlobalConfig } from 'ui';

import { useVcosole } from '@/hooks/useVonsole';

import { loginApi } from '@/api/auth';
import MyRoutes from '@/router';
import { useAuthStore } from '@/store/Auth';

import './app.css';
// 这个是全局的页面 还可以做一些其他的操作

export default function App() {
  const [vc] = useVcosole();
  const { setUserToken } = useAuthStore((state) => {
    return {
      setUserToken: state.setUserToken,
    };
  });
  const preset = useGlobalStore((state) => state.preset);

  const { run: login } = useRequest(loginApi, {
    manual: true,
    onSuccess: (data) => {
      setUserToken(data?.resultData);
    },
  });

  useEffect(() => {
    login({
      username: 'admin',
      password: md5('admin'),
    });
  }, []);
  // console.log(preset);

  useEffect(() => {
    if (vc) {
      vc.show();
    }
  }, []);
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
      >
        <MyRoutes />
      </ThemeProvider>
    </GlobalConfig>
  );
}
