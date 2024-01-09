import { type UserConfig } from "vite";
const commonConfig: (mode: string) => UserConfig = (mode) => ({
  server: {
    host: true,
  },
  esbuild: {
    // 构建之前，删除某些代码
    drop: mode === "production" ? ["console", "debugger"] : [],
  },
  build: {
    reportCompressedSize: false,
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      maxParallelFileOps: 3,
    },
  },
});

export { commonConfig };
