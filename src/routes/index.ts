import { lazy } from 'react';

const Settings = lazy(() => import('../pages/Settings'));

const List = lazy(() => import('../pages/Dashboard/List'));

const Stats = lazy(() => import('../pages/Dashboard/Stats'));
const coreRoutes = [
  {
    path: '/settings',
    title: 'Settings',
    component: Settings,
  },
  {
    path: '/list',
    title: 'List Tasks',
    component: List,
  },
  {
    path: '/stats',
    title: 'Stats Tasks',
    component: Stats,
  },
];

const routes = [...coreRoutes];
export default routes;
