import { basicRoutes } from '..';
import { transformRouteToMenu } from '../helpers';

import type { AppMenu } from '../types';

// Get async menus
export async function getAsyncMenus(): Promise<AppMenu[]> {
  const staticMenus = transformRouteToMenu(basicRoutes);
  staticMenus.sort((a, b) => (a?.orderNo || staticMenus.length) - (b?.orderNo || staticMenus.length));

  return staticMenus.filter((item) => !item.hideMenu);
}
