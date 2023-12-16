import { ThemeProvider } from 'antd-style';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import '@/design/index.less';
// register svg icon
import 'virtual:svg-icons-register';

import App from './App';
import { persistor, store } from './stores';

interface NewToken {
  colorDefault: string;
}

// 通过给 antd-style 扩展 CustomToken 对象类型定义，可以为 useTheme 中增加相应的 token 对象
declare module 'antd-style' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface CustomToken extends NewToken {}
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider
      defaultThemeMode='light'
      theme={{
        token: {
          colorPrimary: '#00A76F',
          colorInfo: '#00B8D9',
          colorSuccess: '#22C55E',
          colorWarning: '#FFAB00',
          colorError: '#FF5630',
          colorLink: '#00A76F',
        },
      }}
      customToken={{
        colorDefault: '#212b36',
      }}
    >
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
);
