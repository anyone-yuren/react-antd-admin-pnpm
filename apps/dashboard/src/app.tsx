import { ThemeProvider } from 'antd-style';
import { useEffect } from 'react';
import { useGlobalStore } from 'store';
import { GlobalConfig } from 'ui';

import { useVcosole } from '@/hooks/useVonsole';

import MyRoutes from '@/router';
// 这个是全局的页面 还可以做一些其他的操作

export default function App() {
  const [vc] = useVcosole();
  const preset = useGlobalStore((state) => state.preset);
  console.log(preset);

  useEffect(() => {
    console.log('VConsole ?', vc);
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
