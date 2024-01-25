import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import '@/design/index.less';
// register svg icon
import 'virtual:svg-icons-register';

import App from './App';
import { persistor, store } from './stores';
import '@/i18n/i18n';

interface NewToken {
  colorDefault: string;
  paperRedImg: string;
  paperCyanImg: string;
}

// 通过给 antd-style 扩展 CustomToken 对象类型定义，可以为 useTheme 中增加相应的 token 对象
declare module 'antd-style' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface CustomToken extends NewToken {}
}

// const { preset } = useGlobalState();
// console.log(preset);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
