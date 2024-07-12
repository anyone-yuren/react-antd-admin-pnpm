/* eslint-disable import/no-extraneous-dependencies */
import { defineApplicationConfig } from '@gbeata/vite-config';
import { loadEnv } from 'vite';

const root = process.cwd();

const { VITE_APP_BASE_API, VITE_APP_UNIQUE_API } = loadEnv(process.env.NODE_ENV as string, root);

export default defineApplicationConfig({
  overrides: {
    optimizeDeps: {
      include: ['@iconify/react', 'lodash-es', 'echarts', 'echarts-for-react'],
    },
    server: {
      // Listening on all local ips
      host: true,
      proxy: {
        // '/api': {
        //   target: VITE_APP_BASE_API,
        //   changeOrigin: true,
        //   secure: true,
        // },
        '/api/unique-code': {
          target: VITE_APP_UNIQUE_API,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/unique-code/, '/api/unique-code'),
        },
        // 配置第二个代理地址
        '^/api(?!/unique-code)': {
          target: VITE_APP_BASE_API,
          changeOrigin: true,
          secure: true,
          rewrite: (path) => path.replace(/^\/api/, '/api'),
        },
      },
    },
  },
});
