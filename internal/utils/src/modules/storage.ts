import type { CacheKey, StorageEnum } from "../../types/enum";

export type StorageKey = StorageEnum | CacheKey;

export const getItem = <T>(key: StorageKey): T | null => {
  let value = null;
  try {
    const result = window.localStorage.getItem(key);
    if (result !== null && result !== "undefined") {
      value = JSON.parse(result);
    }
  } catch (error) {
    console.error(error);
  }
  return value;
};

export const getStringItem = (key: StorageKey): string | null => {
  return localStorage.getItem(key);
};

export const setItem = <T>(key: StorageKey, value: T): void => {
  localStorage.setItem(key, JSON.stringify(value));
};
export const removeItem = (key: StorageKey): void => {
  localStorage.removeItem(key);
};
export const clearItems = () => {
  localStorage.clear();
};
