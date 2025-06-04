import { NotFoundPage } from '@pages/404/not-found-page';
import { Home } from '@pages/home/home';
import { Login } from '@pages/login/login';
import { Profile } from '@pages/profile/profile-page';
import { Registration } from '@pages/registration/registration';
import type { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoutes } from './routes';
import { Catalog } from '@pages/catalog/catalog';

export const AppRouter: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path={AppRoutes.HOME_ROUTE} element={<Home />} />
      <Route path={AppRoutes.LOGIN_ROUTE} element={<Login />} />
      <Route path={AppRoutes.REGISTRATION_ROUTE} element={<Registration />} />
      <Route path={AppRoutes.USER_PROFILE_ROUTE} element={<Profile />} />
      <Route path={AppRoutes.CATALOG_ROUTE} element={<Catalog />} />
      <Route path={AppRoutes.CATALOG_CATEGORY_ROUTE} element={<Catalog />} />
      <Route path={AppRoutes.ERROR_ROUTE} element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
);
