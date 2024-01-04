// eslint-disable-next-line import/no-extraneous-dependencies
import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer';

// 获取mock目录data的数据

const modules = import.meta.glob('../mock/data/*.ts', { eager: true }) as Recordable;

const mockModules: any[] = [];
Object.keys(modules).forEach((key) => {
  if (key.includes('/_')) return;

  const module = modules[key].default || {};
  const moduleList = Array.isArray(module) ? [...module] : [module];
  mockModules.push(...moduleList);
});

/**
 * Used in a production environment, need to manually import all modules.
 */
export function setupProdMockServer() {
  console.log(mockModules);
  createProdMockServer(mockModules);
}
