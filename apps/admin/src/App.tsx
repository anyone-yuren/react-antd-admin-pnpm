import { ThemeProvider } from 'antd-style';
import { RouterProvider } from 'react-router-dom';
import { useGlobalStore } from 'store';

import cyanImg from '@/assets/images/cyan-blur.png';
import redImg from '@/assets/images/red-blur.png';
import router from '@/router';

function App() {
  const preset = useGlobalStore((state) => state.preset);
  return (
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
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
