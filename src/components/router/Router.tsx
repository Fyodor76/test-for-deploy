import { useRoutes, Navigate } from 'react-router-dom';

import { Auth } from '../../pages/auth/Auth.tsx';
import { Main } from '../../pages/main/Main.tsx';

interface RouteType {
    path: string;
    element: JSX.Element;
}

const routes: RouteType[] = [
  {
    path: '/wb-front/',
    element: <Main/>,
  },
  {
    path: '/wb-front/login/',
    element: <Auth/>,
  },
];

export const Router = () => {
  return useRoutes([...routes, { path: '*', element: <Navigate to="/"/> }]);
};
