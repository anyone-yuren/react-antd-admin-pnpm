import { useRoutes } from 'react-router-dom';

import Home from '@/views/Home';

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <Home />,
    },
  ]);
}
