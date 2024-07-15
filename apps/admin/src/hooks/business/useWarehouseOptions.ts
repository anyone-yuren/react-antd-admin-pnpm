import { useMemo } from 'react';

import { useAuthStore } from '@/stores/admin';

function useWarehouseOptions() {
  const { activeOrgCode, orgAndWarehouseInfo } = useAuthStore((state) => {
    return {
      orgAndWarehouseInfo: state.orgAndWarehouseInfo,
      activeOrgCode: state.activeOrgCode,
    };
  });

  const warehouseOptions = useMemo(() => {
    const isExist = !!orgAndWarehouseInfo.length;
    return isExist
      ? orgAndWarehouseInfo
          .filter((item: any) => item.warehouseCode === activeOrgCode)
          .map((item: any) => item['warehouseInfoList'])
          .flat()
          .map((item: any) => {
            return {
              key: item.warehouseCode,
              value: item.warehouseCode,
              label: item.warehouseName,
            };
          })
      : [];
  }, [orgAndWarehouseInfo, activeOrgCode]);

  return {
    activeOrgCode,
    warehouseOptions,
  };
}
export default useWarehouseOptions;
