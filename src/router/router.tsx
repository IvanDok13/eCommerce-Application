import { Home } from '@pages/home/home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoutes } from './routes';

export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path={AppRoutes.HOME_ROUTE} element={<Home />} />
    </Routes>
  </BrowserRouter>
);
