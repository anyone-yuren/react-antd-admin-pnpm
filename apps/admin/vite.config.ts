/* eslint-disable import/no-extraneous-dependencies */
import path from 'node:path';

import { defineApplicationConfig } from '@gbeata/vite-config';

export default defineApplicationConfig({
  overrides: {
    resolve: {
      alias: {
        // 确保所有 three.js 导入使用同一个实例
        three: path.resolve(__dirname, 'node_modules/three'),
      },
    },
    optimizeDeps: {
      include: ['@iconify/react', 'lodash-es', 'echarts', 'echarts-for-react', 'three'],
    },
    server: {
      // Listening on all local ips
      host: true,
      proxy: {
        '/content_api': {
          target: 'https://api.juejin.cn',
          changeOrigin: true,
          secure: true,
        },
      },
    },
  },
});
