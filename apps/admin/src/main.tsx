import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import '@/design/index.less';
// register svg icon
import 'virtual:svg-icons-register';
import '@/i18n/i18n';

import App from './App';
import { persistor, store } from './stores';

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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnReconnect: false, // 重连时不重新请求
      refetchOnWindowFocus: false, // 窗口焦点变化时不重新请求
      retry: 3, // 重试次数
      staleTime: 5 * 60 * 1000, // 5分钟内数据不会重新请求
      gcTime: 5 * 60 * 1000, // 数据过期时间，超过5分钟后会被清理
    },
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <App />
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
