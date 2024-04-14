import { useRoutes, Navigate } from 'react-router-dom';

import { Auth } from '../../pages/auth/Auth.tsx';

interface RouteType {
    path: string;
    element: JSX.Element;
}

const routes: RouteType[] = [
  {
    path: '/',
    element: <div>Main page</div>,
  },
  {
    path: '/login',
    element: <Auth/>,
  },
];

export const Router = () => {
  return useRoutes([...routes, { path: '*', element: <Navigate to="/"/> }]);
};
