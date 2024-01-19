import { defineConfig } from 'dumi';

export default defineConfig({
  themeConfig: {
    name: '@gbeata/admin-docs',
  },
  publicPath:
    process.env.NODE_ENV === 'production' ? '/gbeata-admin-docs/' : '/',
  outputPath: '../../docs-dist',
  base: process.env.NODE_ENV === 'production' ? '/gbeata-admin-docs/' : '/',
});
