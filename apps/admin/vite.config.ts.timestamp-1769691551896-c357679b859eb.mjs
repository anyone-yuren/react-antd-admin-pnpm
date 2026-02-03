// vite.config.ts
import { defineApplicationConfig } from "file:///C:/Users/Administrator/Desktop/demo/react-antd-admin-pnpm/internal/vite-config/dist/index.mjs";
import path from "node:path";
var __vite_injected_original_dirname = "C:\\Users\\Administrator\\Desktop\\demo\\react-antd-admin-pnpm\\apps\\admin";
var vite_config_default = defineApplicationConfig({
  overrides: {
    resolve: {
      alias: {
        // 确保所有 three.js 导入使用同一个实例
        three: path.resolve(__vite_injected_original_dirname, "node_modules/three")
      }
    },
    optimizeDeps: {
      include: ["@iconify/react", "lodash-es", "echarts", "echarts-for-react", "three"]
    },
    server: {
      // Listening on all local ips
      host: true,
      proxy: {
        "/content_api": {
          target: "https://api.juejin.cn",
          changeOrigin: true,
          secure: true
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxBZG1pbmlzdHJhdG9yXFxcXERlc2t0b3BcXFxcZGVtb1xcXFxyZWFjdC1hbnRkLWFkbWluLXBucG1cXFxcYXBwc1xcXFxhZG1pblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcQWRtaW5pc3RyYXRvclxcXFxEZXNrdG9wXFxcXGRlbW9cXFxccmVhY3QtYW50ZC1hZG1pbi1wbnBtXFxcXGFwcHNcXFxcYWRtaW5cXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL0FkbWluaXN0cmF0b3IvRGVza3RvcC9kZW1vL3JlYWN0LWFudGQtYWRtaW4tcG5wbS9hcHBzL2FkbWluL3ZpdGUuY29uZmlnLnRzXCI7LyogZXNsaW50LWRpc2FibGUgaW1wb3J0L25vLWV4dHJhbmVvdXMtZGVwZW5kZW5jaWVzICovXHJcbmltcG9ydCB7IGRlZmluZUFwcGxpY2F0aW9uQ29uZmlnIH0gZnJvbSAnQGdiZWF0YS92aXRlLWNvbmZpZyc7XHJcbmltcG9ydCBwYXRoIGZyb20gJ25vZGU6cGF0aCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVBcHBsaWNhdGlvbkNvbmZpZyh7XHJcbiAgb3ZlcnJpZGVzOiB7XHJcbiAgICByZXNvbHZlOiB7XHJcbiAgICAgIGFsaWFzOiB7XHJcbiAgICAgICAgLy8gXHU3ODZFXHU0RkREXHU2MjQwXHU2NzA5IHRocmVlLmpzIFx1NUJGQ1x1NTE2NVx1NEY3Rlx1NzUyOFx1NTQwQ1x1NEUwMFx1NEUyQVx1NUI5RVx1NEY4QlxyXG4gICAgICAgIHRocmVlOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnbm9kZV9tb2R1bGVzL3RocmVlJyksXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgb3B0aW1pemVEZXBzOiB7XHJcbiAgICAgIGluY2x1ZGU6IFsnQGljb25pZnkvcmVhY3QnLCAnbG9kYXNoLWVzJywgJ2VjaGFydHMnLCAnZWNoYXJ0cy1mb3ItcmVhY3QnLCAndGhyZWUnXSxcclxuICAgIH0sXHJcbiAgICBzZXJ2ZXI6IHtcclxuICAgICAgLy8gTGlzdGVuaW5nIG9uIGFsbCBsb2NhbCBpcHNcclxuICAgICAgaG9zdDogdHJ1ZSxcclxuICAgICAgcHJveHk6IHtcclxuICAgICAgICAnL2NvbnRlbnRfYXBpJzoge1xyXG4gICAgICAgICAgdGFyZ2V0OiAnaHR0cHM6Ly9hcGkuanVlamluLmNuJyxcclxuICAgICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcclxuICAgICAgICAgIHNlY3VyZTogdHJ1ZSxcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICB9LFxyXG59KTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUNBLFNBQVMsK0JBQStCO0FBQ3hDLE9BQU8sVUFBVTtBQUZqQixJQUFNLG1DQUFtQztBQUl6QyxJQUFPLHNCQUFRLHdCQUF3QjtBQUFBLEVBQ3JDLFdBQVc7QUFBQSxJQUNULFNBQVM7QUFBQSxNQUNQLE9BQU87QUFBQTtBQUFBLFFBRUwsT0FBTyxLQUFLLFFBQVEsa0NBQVcsb0JBQW9CO0FBQUEsTUFDckQ7QUFBQSxJQUNGO0FBQUEsSUFDQSxjQUFjO0FBQUEsTUFDWixTQUFTLENBQUMsa0JBQWtCLGFBQWEsV0FBVyxxQkFBcUIsT0FBTztBQUFBLElBQ2xGO0FBQUEsSUFDQSxRQUFRO0FBQUE7QUFBQSxNQUVOLE1BQU07QUFBQSxNQUNOLE9BQU87QUFBQSxRQUNMLGdCQUFnQjtBQUFBLFVBQ2QsUUFBUTtBQUFBLFVBQ1IsY0FBYztBQUFBLFVBQ2QsUUFBUTtBQUFBLFFBQ1Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
