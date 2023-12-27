// eslint-disable-next-line import/no-extraneous-dependencies
import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer';

const modules = import.meta.glob('./**/*.ts', { eager: true }) as Recordable;

const mockModules: any[] = [];
Object.keys(modules).forEach((key) => {
  if (key.includes('/_')) return;

  const module = modules[key].default || {};
  const moduleList = Array.isArray(module) ? [...module] : [module];
  mockModules.push(...moduleList);
});
console.log('mockModules', mockModules);

/**
 * Used in a production environment, need to manually import all modules.
 */
export function setupProdMockServer() {
  createProdMockServer(mockModules);
}
