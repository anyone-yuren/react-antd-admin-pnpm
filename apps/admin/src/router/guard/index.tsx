import { BasicLayout } from '@/layout';

import { GuardRoute } from './guardRoute';

export const LayoutGuard = () => (
  <GuardRoute>
    <BasicLayout />
  </GuardRoute>
);
