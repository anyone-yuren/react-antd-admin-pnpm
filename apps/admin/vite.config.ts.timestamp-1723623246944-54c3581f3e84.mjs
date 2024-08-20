// vite.config.ts
import { defineApplicationConfig } from "file:///Users/suironghua/Desktop/multiway_git/frontend-c24028-Summary/internal/vite-config/dist/index.mjs";
import { loadEnv } from "file:///Users/suironghua/Desktop/multiway_git/frontend-c24028-Summary/node_modules/.pnpm/vite@4.5.0_@types+node@20.11.3_less@4.2.0_terser@5.26.0/node_modules/vite/dist/node/index.js";
var root = process.cwd();
var { VITE_APP_BASE_API, VITE_APP_UNIQUE_API } = loadEnv(process.env.NODE_ENV, root);
var vite_config_default = defineApplicationConfig({
  overrides: {
    optimizeDeps: {
      include: ["@iconify/react", "lodash-es", "echarts", "echarts-for-react"]
    },
    server: {
      // Listening on all local ips
      host: true,
      proxy: {
        // '/api': {
        //   target: VITE_APP_BASE_API,
        //   changeOrigin: true,
        //   secure: true,
        // },
        "/api/unique-code": {
          target: VITE_APP_UNIQUE_API,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/unique-code/, "/api/unique-code")
        },
        // 配置第二个代理地址
        "^/api(?!/unique-code)": {
          target: VITE_APP_BASE_API,
          changeOrigin: true,
          secure: true,
          rewrite: (path) => path.replace(/^\/api/, "/api")
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvc3Vpcm9uZ2h1YS9EZXNrdG9wL211bHRpd2F5X2dpdC9mcm9udGVuZC1jMjQwMjgtU3VtbWFyeS9hcHBzL2FkbWluXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvc3Vpcm9uZ2h1YS9EZXNrdG9wL211bHRpd2F5X2dpdC9mcm9udGVuZC1jMjQwMjgtU3VtbWFyeS9hcHBzL2FkbWluL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9zdWlyb25naHVhL0Rlc2t0b3AvbXVsdGl3YXlfZ2l0L2Zyb250ZW5kLWMyNDAyOC1TdW1tYXJ5L2FwcHMvYWRtaW4vdml0ZS5jb25maWcudHNcIjsvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvbm8tZXh0cmFuZW91cy1kZXBlbmRlbmNpZXMgKi9cbmltcG9ydCB7IGRlZmluZUFwcGxpY2F0aW9uQ29uZmlnIH0gZnJvbSAnQGdiZWF0YS92aXRlLWNvbmZpZyc7XG5pbXBvcnQgeyBsb2FkRW52IH0gZnJvbSAndml0ZSc7XG5cbmNvbnN0IHJvb3QgPSBwcm9jZXNzLmN3ZCgpO1xuXG5jb25zdCB7IFZJVEVfQVBQX0JBU0VfQVBJLCBWSVRFX0FQUF9VTklRVUVfQVBJIH0gPSBsb2FkRW52KHByb2Nlc3MuZW52Lk5PREVfRU5WIGFzIHN0cmluZywgcm9vdCk7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUFwcGxpY2F0aW9uQ29uZmlnKHtcbiAgb3ZlcnJpZGVzOiB7XG4gICAgb3B0aW1pemVEZXBzOiB7XG4gICAgICBpbmNsdWRlOiBbJ0BpY29uaWZ5L3JlYWN0JywgJ2xvZGFzaC1lcycsICdlY2hhcnRzJywgJ2VjaGFydHMtZm9yLXJlYWN0J10sXG4gICAgfSxcbiAgICBzZXJ2ZXI6IHtcbiAgICAgIC8vIExpc3RlbmluZyBvbiBhbGwgbG9jYWwgaXBzXG4gICAgICBob3N0OiB0cnVlLFxuICAgICAgcHJveHk6IHtcbiAgICAgICAgLy8gJy9hcGknOiB7XG4gICAgICAgIC8vICAgdGFyZ2V0OiBWSVRFX0FQUF9CQVNFX0FQSSxcbiAgICAgICAgLy8gICBjaGFuZ2VPcmlnaW46IHRydWUsXG4gICAgICAgIC8vICAgc2VjdXJlOiB0cnVlLFxuICAgICAgICAvLyB9LFxuICAgICAgICAnL2FwaS91bmlxdWUtY29kZSc6IHtcbiAgICAgICAgICB0YXJnZXQ6IFZJVEVfQVBQX1VOSVFVRV9BUEksXG4gICAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxuICAgICAgICAgIHJld3JpdGU6IChwYXRoKSA9PiBwYXRoLnJlcGxhY2UoL15cXC9hcGlcXC91bmlxdWUtY29kZS8sICcvYXBpL3VuaXF1ZS1jb2RlJyksXG4gICAgICAgIH0sXG4gICAgICAgIC8vIFx1OTE0RFx1N0Y2RVx1N0IyQ1x1NEU4Q1x1NEUyQVx1NEVFM1x1NzQwNlx1NTczMFx1NTc0MFxuICAgICAgICAnXi9hcGkoPyEvdW5pcXVlLWNvZGUpJzoge1xuICAgICAgICAgIHRhcmdldDogVklURV9BUFBfQkFTRV9BUEksXG4gICAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxuICAgICAgICAgIHNlY3VyZTogdHJ1ZSxcbiAgICAgICAgICByZXdyaXRlOiAocGF0aCkgPT4gcGF0aC5yZXBsYWNlKC9eXFwvYXBpLywgJy9hcGknKSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUNBLFNBQVMsK0JBQStCO0FBQ3hDLFNBQVMsZUFBZTtBQUV4QixJQUFNLE9BQU8sUUFBUSxJQUFJO0FBRXpCLElBQU0sRUFBRSxtQkFBbUIsb0JBQW9CLElBQUksUUFBUSxRQUFRLElBQUksVUFBb0IsSUFBSTtBQUUvRixJQUFPLHNCQUFRLHdCQUF3QjtBQUFBLEVBQ3JDLFdBQVc7QUFBQSxJQUNULGNBQWM7QUFBQSxNQUNaLFNBQVMsQ0FBQyxrQkFBa0IsYUFBYSxXQUFXLG1CQUFtQjtBQUFBLElBQ3pFO0FBQUEsSUFDQSxRQUFRO0FBQUE7QUFBQSxNQUVOLE1BQU07QUFBQSxNQUNOLE9BQU87QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsUUFNTCxvQkFBb0I7QUFBQSxVQUNsQixRQUFRO0FBQUEsVUFDUixjQUFjO0FBQUEsVUFDZCxTQUFTLENBQUMsU0FBUyxLQUFLLFFBQVEsdUJBQXVCLGtCQUFrQjtBQUFBLFFBQzNFO0FBQUE7QUFBQSxRQUVBLHlCQUF5QjtBQUFBLFVBQ3ZCLFFBQVE7QUFBQSxVQUNSLGNBQWM7QUFBQSxVQUNkLFFBQVE7QUFBQSxVQUNSLFNBQVMsQ0FBQyxTQUFTLEtBQUssUUFBUSxVQUFVLE1BQU07QUFBQSxRQUNsRDtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
