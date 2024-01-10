/**
 * Mock plugin for development and production.
 * https://github.com/anncwb/vite-plugin-mock
 */
import path from "node:path";
import { viteMockServe } from "vite-plugin-mock";

export function configMockPlugin({
  isBuild,
  root,
}: {
  isBuild: boolean;
  root: string;
}) {
  console.log("目标路径", __dirname, isBuild, root);

  return viteMockServe({
    mockPath: "mock",
    ignore: /^_/,
    localEnabled: !isBuild,
    prodEnabled: isBuild,
    injectCode: `
          import { setupProdMockServer } from './_createProductionServer';
          setupProdMockServer()
          `,
    // 当前文件夹下的src/main.ts
    injectFile: path.join(root, "/src/main.tsx"),
  });
}
