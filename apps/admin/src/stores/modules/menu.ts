// import { createSlice } from '@reduxjs/toolkit';

// import type { MenuState } from '@/stores/types';

// const initialState: MenuState = {
//   menuList: [],
//   isCollapse: false,
// };

// const menu = createSlice({
//   name: 'menu',
//   initialState,
//   reducers: {
//     setMenuList: (state, action) => {
//       state.menuList = action.payload;
//     },
//     updateCollapse: (state, action) => {
//       state.isCollapse = action.payload;
//     },
//   },
// });

// export const { setMenuList, updateCollapse } = menu.actions;

// export default menu.reducer;

import { getItem, setItem } from '@gbeata/utils';
import { create } from 'zustand';

import { StorageEnum } from '#/enum';

type MenusType = Record<string, any>[];
type SettingStore = {
  menuList: MenusType;
  isCollapse: boolean;
  actions: {
    setMenuList: (settings: MenusType) => void;
    updateCollapse: (settings: boolean) => void;
  };
};

const useMenuStore = create<SettingStore>((set) => ({
  menuList: getItem<MenusType>(StorageEnum.Menu) || [],
  isCollapse: true,
  actions: {
    setMenuList: (menuList: MenusType) => {
      debugger;
      set({ menuList });
      setItem(StorageEnum.Menu, menuList);
    },
    updateCollapse: (isCollapse: boolean) => {
      set({ isCollapse });
    },
  },
}));

export const useMenus = () => useMenuStore((state) => state.menuList);
export const useMenuActions = () => useMenuStore((state) => state.actions);
export default useMenuStore;
