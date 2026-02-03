import { clearItems, getItem, setItem } from '@gbeata/utils';

import {
  type APP_CONFIG_KEY,
  APP_LOCAL_CACHE_KEY,
  APP_SESSION_CACHE_KEY,
  type APP_TAGS_KEY,
  type TOKEN_KEY,
  type USER_INFO_KEY,
} from '@/enums/cacheEnum';
import { DEFAULT_CACHE_TIME } from '@/settings/encryptionSetting';

import { type Cache, Memory } from './memory';

import type { RouteObject } from '@/router/types';
import type { UserInfo } from '@/types';
import type { AppConfig } from '@/types/config';
import type { CacheKey } from '@gbeata/utils/types/enum';

interface BasicStore {
  [TOKEN_KEY]: string | number | null | undefined;
  [USER_INFO_KEY]: UserInfo;
  [APP_CONFIG_KEY]: AppConfig;
  [APP_TAGS_KEY]: RouteObject[];
}

type LocalStore = BasicStore;
type SessionStore = BasicStore;

export type BasicKeys = keyof BasicStore;
type LocalKeys = keyof LocalStore;
type SessionKeys = keyof SessionStore;

const localMemory = new Memory(DEFAULT_CACHE_TIME);
const sessionMemory = new Memory(DEFAULT_CACHE_TIME);

function initPersistentMemory() {
  const localCache = getItem<Record<string, Cache>>(APP_LOCAL_CACHE_KEY as CacheKey);
  const sessionCache = getItem<Record<string, Cache>>(APP_SESSION_CACHE_KEY as CacheKey);
  localCache && localMemory.resetCache(localCache);
  sessionCache && sessionMemory.resetCache(sessionCache);
}

export class Persistent {
  static getLocal<T>(key: LocalKeys) {
    return localMemory.get(key)?.value as Nullable<T>;
  }

  static setLocal(key: LocalKeys, value: LocalStore[LocalKeys], immediate = false): void {
    localMemory.set(key, value);
    immediate && setItem(APP_LOCAL_CACHE_KEY as CacheKey, localMemory.getCache);
  }

  static removeLocal(key: LocalKeys, immediate = false): void {
    localMemory.remove(key);
    immediate && setItem(APP_LOCAL_CACHE_KEY as CacheKey, localMemory.getCache);
  }

  static clearLocal(immediate = false): void {
    localMemory.clear();
    immediate && clearItems();
  }

  static getSession<T>(key: SessionKeys) {
    return sessionMemory.get(key)?.value as Nullable<T>;
  }

  static setSession(key: SessionKeys, value: SessionStore[SessionKeys], immediate = false): void {
    sessionMemory.set(key, value);
    immediate && setItem(APP_SESSION_CACHE_KEY as CacheKey, sessionMemory.getCache);
  }

  static removeSession(key: SessionKeys, immediate = false): void {
    sessionMemory.remove(key);
    immediate && setItem(APP_SESSION_CACHE_KEY as CacheKey, sessionMemory.getCache);
  }

  static clearSession(immediate = false): void {
    sessionMemory.clear();
    immediate && clearItems();
  }

  static clearAll(immediate = false) {
    sessionMemory.clear();
    localMemory.clear();
    if (immediate) {
      clearItems();
    }
  }
}

function storageChange(e: any) {
  const { key, newValue, oldValue } = e;

  if (!key) {
    Persistent.clearAll();
    return;
  }

  if (!!newValue && !!oldValue) {
    if (APP_LOCAL_CACHE_KEY === key) {
      Persistent.clearLocal();
    }
    if (APP_SESSION_CACHE_KEY === key) {
      Persistent.clearSession();
    }
  }
}

window.addEventListener('storage', storageChange);

initPersistentMemory();
