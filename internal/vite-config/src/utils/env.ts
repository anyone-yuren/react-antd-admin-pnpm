import { join } from "node:path";
import dotenv from "dotenv";

import { readFile } from "fs-extra";
/**
 * 获取当前环境下生效的配置文件名
 */
function getConfigFiles() {
  // 前正在运行的 npm 脚本的完整命令 如果运行pnpm dev,值就是vite
  const script = process.env.npm_lifecycle_script as string;
  const reg = new RegExp("--mode ([a-z_\\d]+)");
  const result = reg.exec(script);
  if (result) {
    const mode = result[1] as string;
    return [".env", `.env.${mode}`];
  }
  return [".env", ".env.production"];
}

/**
 * 根据提供的匹配模式和配置文件获取环境配置。
 *
 * @param {string} [match="VITE_GLOB_"] - 用于过滤环境配置键的匹配模式。
 * @param {string[]} [confFiles=getConfigFiles()] - 从中读取环境配置的配置文件。
 * @return {Promise<{ [key: string]: string }>} - 一个解析为包含环境配置的对象的 Promise。
 */
export async function getEnvConfig(
  match = "VITE_GLOB_",
  confFiles = getConfigFiles()
): Promise<{ [key: string]: string }> {
  let envConfig = {};
  confFiles.forEach(async (item) => {
    envConfig = {
      ...envConfig,
      ...dotenv.parse(
        await readFile(join(process.cwd(), item), { encoding: "utf8" })
      ),
    };
  });

  const reg = new RegExp(`^(${match})`);
  Object.keys(envConfig).forEach((key) => {
    if (!reg.test(key)) {
      Reflect.deleteProperty(envConfig, key);
    }
  });
  return envConfig;
}
