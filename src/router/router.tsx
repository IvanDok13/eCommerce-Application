import { Home } from '@pages/home/home';
import { Login } from '@pages/login/login';
import type { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoutes } from './routes';

export const AppRouter: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path={AppRoutes.HOME_ROUTE} element={<Home />} />
      <Route path={AppRoutes.LOGIN_ROUTE} element={<Login />} />
    </Routes>
  </BrowserRouter>
);
