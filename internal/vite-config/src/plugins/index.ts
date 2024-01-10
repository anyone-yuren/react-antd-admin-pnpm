import { type PluginOption } from "vite";
import react from "@vitejs/plugin-react-swc";
import { createAppConfigPlugin } from "./appConfig";
import { configMockPlugin } from "./mock";
import { configSvgIconsPlugin } from "./svgSprite";

interface Options {
  isBuild: boolean;
  root: string;
  compress: string;
  enableAnalyze?: boolean;
  enableMock?: boolean;
}

async function createPlugins({
  isBuild,
  root,
  compress,
  enableAnalyze,
  enableMock,
}: Options): Promise<PluginOption[]> {
  const vitePlugins: (PluginOption | PluginOption[])[] = [react()];

  const appConfigPlugin = await createAppConfigPlugin({
    root,
    isBuild,
  });
  vitePlugins.push(appConfigPlugin);

  // vite-plugin-svg-icons
  vitePlugins.push(configSvgIconsPlugin({ isBuild }));

  if (enableMock) {
    vitePlugins.push(configMockPlugin({ isBuild, root }));
  }
  return vitePlugins;
}

export { createPlugins };
