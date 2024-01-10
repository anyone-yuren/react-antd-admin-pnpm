import { resolve } from "node:path";
import colors from "picocolors";

import { readPackageJSON } from "pkg-types";
import { type PluginOption } from "vite";

import { getEnvConfig } from "../utils/env";
import { createContentHash } from "../utils/hash";

const GLOBAL_CONFIG_FILE_NAME = "_app.config.ts";
const PLUGIN_NAME = "app-config";

async function createAppConfigPlugin({
  root,
  isBuild,
}: {
  root: string;
  isBuild: boolean;
}): Promise<PluginOption> {
  let publicPath: string;
  let source: string;
  if (!isBuild) {
    return {
      name: PLUGIN_NAME,
    };
  }
  const { version = "" } = await readPackageJSON(resolve(root, "package.json"));
  return {
    name: PLUGIN_NAME,
    async configResolved(_config) {
      const appTitle = _config?.env?.VITE_GLOB_APP_TITLE ?? "";
      publicPath = _config?.base ?? "";
      source = await getConfigSource(appTitle);
    },
    /**
     * 对给定的索引 HTML 进行转换。
     *
     * @param {string} html - 要转换的 HTML。
     * @return {object} - 转换后的 HTML 及相关标签。
     */
    async transformIndexHtml(html) {
      publicPath = publicPath.endsWith("/") ? publicPath : `${publicPath}/`;

      const appConfigSrc = `${
        publicPath || "/"
      }${GLOBAL_CONFIG_FILE_NAME}?v=${version}-${createContentHash(source)}`;

      return {
        html,
        tags: [
          {
            tag: "script",
            attrs: {
              src: appConfigSrc,
            },
          },
        ],
      };
    },
    async generateBundle() {
      try {
        this.emitFile({
          type: "asset",
          fileName: GLOBAL_CONFIG_FILE_NAME,
          source,
        });

        console.log(colors.cyan(`✨configuration file is build successfully!`));
      } catch (error) {
        console.log(
          colors.red(
            "configuration file configuration file failed to package:\n" + error
          )
        );
      }
    },
  };
}

/**
 * Get the configuration file variable name
 * @param env
 */
const getVariableName = (title: string) => {
  function strToHex(str: string) {
    const result: string[] = [];
    for (let i = 0; i < str.length; ++i) {
      const hex = str.charCodeAt(i).toString(16);
      result.push(("000" + hex).slice(-4));
    }
    return result.join("").toUpperCase();
  }
  return `__PRODUCTION__${strToHex(title) || "__APP"}__CONF__`
    .toUpperCase()
    .replace(/\s/g, "");
};
async function getConfigSource(appTitle: string) {
  const config = await getEnvConfig();
  const variableName = getVariableName(appTitle);
  const windowVariable = `window.${variableName}`;
  // Ensure that the variable will not be modified
  let source = `${windowVariable}=${JSON.stringify(config)};`;
  source += `
      Object.freeze(${windowVariable});
      Object.defineProperty(window, "${variableName}", {
        configurable: false,
        writable: false,
      });
    `.replace(/\s/g, "");
  return source;
}

export { createAppConfigPlugin };
