/**
 * 此文件为模拟模拟接口的文件，不要复制，仅供参考
 */
import type { AnyKeyProps, Record } from 'gbeata';

/**
 * 模拟数据
 */
let data: Array<Record> = [];

// 没有数据，加载数据
const loadData = () => {
  if (!data.length) {
    const local = localStorage.getItem('CHARA_DATA_1015');
    // 本地有数据用本地
    if (local) {
      data = JSON.parse(local);
    } else {
      fetch('https://sunflower-assets.oss-cn-hangzhou.aliyuncs.com/data/data.json')
        .then((res) => {
          return res.json();
        })
        .then((json) => {
          data = json.reverse();
          localStorage.setItem('CHARA_DATA_1015', JSON.stringify(data));
        });
    }
  }
};

loadData();

/**
 * 模拟列表请求接口，实际过程中请使用 axios 接口
 * @param params 查询参数
 * */
export const listApi = (params: AnyKeyProps): Promise<any> => {
  console.info('列表请求数据', params);
  const searchParams = {
    ...params.search,
    ...params.filters,
  };
  return new Promise((resolve) => {
    setTimeout(() => {
      // 筛选
      let content = data.filter((item) => {
        let result = true;
        // eslint-disable-next-line no-restricted-syntax, guard-for-in
        for (const key in searchParams) {
          // 查询值
          const value = searchParams[key];
          // eslint-disable-next-line no-prototype-builtins
          if (item.hasOwnProperty(key) && item[key] !== undefined && value !== null) {
            if (
              (Array.isArray(value) && !value.includes(item[key])) ||
              (typeof value === 'number' && Number(item[key]) === value) ||
              (typeof value === 'string' && !`${item[key]}`.includes(`${value}`))
            ) {
              result = false;
            }
          }
        }
        return result;
      });
      // 排序
      const sorts = params.sorts || [];
      sorts.forEach((option: AnyKeyProps) => {
        const { key, order } = option;
        content.sort((a, b) => (order === 'descend' ? a[key] - b[key] : b[key] - a[key]));
      });
      // 总数
      const totalCount = content.length;
      // 分页
      content = content.slice(params.pageSize * (params.pageIndex - 1), params.pageSize * params.pageIndex);
      resolve({
        content,
        totalCount,
      });
    }, 300);
  });
};
