import { resolve } from "path";

import dayjs from "dayjs";
import { readPackageJSON } from "pkg-types";
import { defineConfig, loadEnv, mergeConfig, type UserConfig } from "vite";
import { generateModifyVars } from "../utils/modifyVars";
import { commonConfig } from "./common";
import { createPlugins } from "../plugins";
interface DefineOptions {
  overrides?: UserConfig;
  options?: {};
}

function defineApplicationConfig(options: DefineOptions = {}) {
  const { overrides = {}, options: overrideOptions } = options;

  return defineConfig(async ({ command, mode }) => {
    const root = process.cwd();
    const { TURBO_INVOCATION_DIR } = process.env;
    const isBuild = command === "build";
    const {
      VITE_PUBLIC_PATH,
      VITE_USE_MOCK,
      VITE_BUILD_COMPRESS,
      VITE_ENABLE_ANALYZE,
    } = loadEnv(mode, root);
    const defineData = await createDefineData(root);

    const plugins = await createPlugins({
      isBuild,
      root,
      enableAnalyze: VITE_ENABLE_ANALYZE === "true",
      enableMock: VITE_USE_MOCK === "true",
      compress: VITE_BUILD_COMPRESS,
    });

    const pathResolve = (path: string) => {
      return resolve(root, path);
    };
    const timestamp = new Date().getTime();
    const applicationConfig: UserConfig = {
      base: VITE_PUBLIC_PATH,
      resolve: {
        alias: [
          {
            find: /@\//,
            replacement: pathResolve("src") + "/",
          },
          {
            find: /#\//,
            replacement: pathResolve("types") + "/",
          },
        ],
      },
      define: defineData,
      build: {
        target: "es2015",
        cssTarget: "chrome80",
        minify: "esbuild",
        outDir: TURBO_INVOCATION_DIR + "/" + defineData?.pkg?.name ?? "dist",
        rollupOptions: {
          output: {
            entryFileNames: `assets/entry/[name]-[hash].${timestamp}.js`,
            // 配置大包的分块策略
            manualChunks: {
              react: ["react", "react-router-dom"],
              antd: ["antd", "@ant-design/icons", "antd-style"],
            },
          },
        },
      },

      css: {
        preprocessorOptions: {
          less: {
            javascriptEnabled: true,
            modifyVars: generateModifyVars(),
          },
        },
      },
      plugins,
    };

    const mergedConfig = mergeConfig(commonConfig(mode), applicationConfig);
    return mergeConfig(mergedConfig, overrides);
  });
}

async function createDefineData(root: string) {
  try {
    const pkg = await readPackageJSON(resolve(root, "package.json"));
    const { version, name, dependencies, devDependencies } = pkg;
    const __APP_INFO__ = {
      pkg: { dependencies, devDependencies, version, name },
      lastBuildTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    };
    return {
      __APP_INFO__: JSON.stringify(__APP_INFO__),
      pkg,
    };
  } catch (error) {
    return {};
  }
}
export { defineApplicationConfig };
