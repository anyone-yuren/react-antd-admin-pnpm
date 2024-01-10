/* eslint-disable import/no-extraneous-dependencies */
import { defineApplicationConfig } from '@gbeata/vite-config';

export default defineApplicationConfig({
  overrides: {
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
