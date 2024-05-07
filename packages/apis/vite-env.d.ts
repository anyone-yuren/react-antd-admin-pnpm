interface ImportMetaEnv {
  readonly VITE_GLOB_APP_TITLE: string
  readonly VITE_APP_BASE_API: string
  readonly VITE_APP_HOMEPAGE: string
  readonly VITE_APP_ENV: 'development' | 'production'

  // 更多环境变量
  readonly VITE_PREFIX_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
