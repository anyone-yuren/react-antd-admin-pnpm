// 系统公共数据
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { getWarehouseList } from '@/api/warehouse';

type CommonsState = {
  // 公共数据
  hourseList: any[];
  getHourseList: () => void;
  setHourseList: (hourseList: any[]) => void;
};
const useCommonsStore = create<CommonsState>()(
  persist(
    (set, get) => {
      return {
        hourseList: [],
        getHourseList: async () => {
          // 判断是否存在仓库hourseList缓存
          const { hourseList } = get();
          if (hourseList.length > 0) {
            return hourseList;
          }
          // 没有数据，加载数据
          const res = await getWarehouseList({
            pageIndex: 1,
            pageSize: 1000,
          });
          const { pageData = [] } = res?.resultData || {};
          set({ hourseList: pageData });
          return pageData;
        },
        setHourseList: (hourseList: any[]) => {
          set({ hourseList });
        },
      };
    },
    {
      name: 'commons',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
export default useCommonsStore;
