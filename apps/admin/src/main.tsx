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
        },
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
