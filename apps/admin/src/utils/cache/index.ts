import { DEFAULT_CACHE_TIME, enableStorageEncryption } from '@/settings/encryptionSetting';

import { createStorage as create, type CreateStorageParams } from './storageCache';

type Options = Partial<CreateStorageParams>;

const createOptions = (storage: Storage, options: Options = {}): Options => ({
  // No encryption in debug mode
  hasEncrypt: enableStorageEncryption,
  storage,
  prefixKey: 'react-admin-design__',
  ...options,
});

const WebStorage = create(createOptions(sessionStorage));

export const createStorage = (storage: Storage = sessionStorage, options: Options = {}) => create(createOptions(storage, options));

export const createSessionStorage = (options: Options = {}) => createStorage(sessionStorage, { ...options, timeout: DEFAULT_CACHE_TIME });

export const createLocalStorage = (options: Options = {}) => createStorage(localStorage, { ...options, timeout: DEFAULT_CACHE_TIME });

export default WebStorage;
