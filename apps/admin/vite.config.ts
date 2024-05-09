/* eslint-disable import/no-extraneous-dependencies */
import { defineApplicationConfig } from '@gbeata/vite-config';
import { loadEnv } from 'vite';

const root = process.cwd();

const { VITE_APP_BASE_API } = loadEnv(process.env.NODE_ENV as string, root);

export default defineApplicationConfig({
  overrides: {
    optimizeDeps: {
      include: ['@iconify/react', 'lodash-es', 'echarts', 'echarts-for-react'],
    },
    server: {
      // Listening on all local ips
      host: true,
      proxy: {
        '/api/Auth': {
          target: VITE_APP_BASE_API,
          changeOrigin: true,
          secure: true,
        },
        '/api/unique-code': {
          target: 'http://120.77.76.98:25026',
          changeOrigin: true,
          secure: true,
        },
      },
    },
  },
});
