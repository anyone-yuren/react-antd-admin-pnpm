import { readPackageJSON } from "pkg-types";
import { defineConfig, mergeConfig, type UserConfig } from "vite";

import dts from "vite-plugin-dts";
import { commonConfig } from "./common";

interface DefineOptions {
  overrides?: UserConfig;
  options?: {};
}

function definePackageConfig(options: DefineOptions = {}) {
  const { overrides = {} } = options;
  const root = process.cwd();
  return defineConfig(async ({ mode }) => {
    const { dependencies = {}, peerDependencies = {} } =
      await readPackageJSON(root);
    const packageConfig: UserConfig = {
      build: {
        lib: {
          entry: "src/index.ts",
          fileName: () => "index.mjs",
          formats: ["es", "umd"],
        },
        rollupOptions: {
          external: [
            ...Object.keys(dependencies),
            ...Object.keys(peerDependencies),
          ],
        },
      },
      plugins: [
        dts({
          logLevel: "error",
        }),
      ],
    };
    const mergedConfig = mergeConfig(commonConfig(mode), packageConfig);
    return mergeConfig(mergedConfig, overrides);
  });
}

export { definePackageConfig };
