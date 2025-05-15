import { Home } from '@pages/home/home';
import type { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoutes } from './routes';
import { Registration } from '@pages/registration/registration';

export const AppRouter: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path={AppRoutes.HOME_ROUTE} element={<Home />} />
       <Route path={AppRoutes.REGISTRATION_ROUTE} element={<Registration />} />
    </Routes>
  </BrowserRouter>
);
