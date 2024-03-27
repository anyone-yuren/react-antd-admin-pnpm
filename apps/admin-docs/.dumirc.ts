import { defineConfig } from 'dumi';

export default defineConfig({
  themeConfig: {
    name: 'gbeata-admin',
    logo: 'https://raw.githubusercontent.com/anyone-yuren/multiway/master/logo.png',
    socialLinks: {
      github: 'https://github.com/anyone-yuren/react-antd-admin-pnpm',
    },
    footer: 'MIT Licensed | Copyright © 2024-present gbeata',
  },
  favicons: [
    'https://raw.githubusercontent.com/anyone-yuren/multiway/master/logo.png',
  ],
  publicPath:
    process.env.NODE_ENV === 'production' ? '/' : '/',
  outputPath: '../../docs-dist',
  base: process.env.NODE_ENV === 'production' ? '/gbeata-admin-docs/' : '/',
});
