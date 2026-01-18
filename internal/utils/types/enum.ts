export enum BasicStatus {
  DISABLE,
  ENABLE,
}

export enum PermissionType {
  CATALOGUE,
  MENU,
  BUTTON,
}

export enum StorageEnum {
  User = "user",
  Token = "token",
  Settings = "settings",
  I18N = "i18nextLng",
}

// 缓存键名类型，用于支持特殊的缓存键名
export const CacheKeyEnum = {
  APP_LOCAL_CACHE_KEY: "APP_LOCAL_CACHE_KEY",
  APP_SESSION_CACHE_KEY: "APP_SESSION_CACHE_KEY",
} as const;

export type CacheKey = (typeof CacheKeyEnum)[keyof typeof CacheKeyEnum];
