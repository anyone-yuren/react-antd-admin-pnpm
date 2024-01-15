import { type Action, configureStore, type ThunkAction } from '@reduxjs/toolkit';
import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import appSlice from './modules/app';
import menuSlice from './modules/menu';
import tagsSlice from './modules/tags';
import userSlice from './modules/user';

import type { Store } from 'redux';

const persistConfig = {
  key: 'redux-persist',
  storage,
};

export const store: Store = configureStore({
  reducer: {
    app: persistReducer(persistConfig, appSlice),
    menu: persistReducer(persistConfig, menuSlice),
    tags: persistReducer(persistConfig, tagsSlice),
    user: persistReducer(persistConfig, userSlice),
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
  devTools: true,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
