import type { FC } from 'react';

import { Route, Routes } from 'react-router-dom';
import MainPage from '../pages/MainPage/MainPage.tsx';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage.tsx';
import AboutPage from '../pages/AboutPage/AboutPage.tsx';
import PokemonDetail from 'components/PokemonDetail/PokemonDetail.tsx';

const AppRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />}>
        <Route path="pokemon/:id" element={<PokemonDetail />} />
      </Route>
      <Route path="/about" element={<AboutPage />}></Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
