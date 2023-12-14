import { defineConfig } from 'father';

export default defineConfig({
  // more father config: https://github.com/umijs/father/blob/master/docs/config.md
  cjs: {
    output: 'lib',
    // input: 'src/index.ts',
  },
  esm: {
    output: 'es',
    // input: 'src/index.ts',
  },
  umd: {
    output: 'dist',
    entry: 'src/index.ts',
  },
  // extraBabelPlugins: [
  //   [
  //     'babel-plugin-import',
  //     {
  //       libraryName: 'antd',
  //       libraryDirectory: 'es',
  //       style: true,
  //     },
  //   ],
  // ],
});
