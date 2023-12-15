import { defineConfig } from 'father';

export default defineConfig({
  // more father config: https://github.com/umijs/father/blob/master/docs/config.md
  esm: {
    ignores: [
      'src/**/*.md', // 避免打包demo文件到npm包里面
    ],
    output: 'es',
  },
  cjs: {
    ignores: [
      'src/**/*.md', // 避免打包demo文件到npm包里面
    ],
    output: 'lib',
  },
  // 打包的时候自动引入antd的样式链接
  extraBabelPlugins: [
    [
      'babel-plugin-import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
    ],
  ],
});
