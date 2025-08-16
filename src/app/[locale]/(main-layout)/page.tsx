import { FC, Suspense } from 'react';
import Main from '@/components/Main/Main';
import PokemonLoader from '@/components/PokemonLoader/PokemonLoader.tsx';

const MainPage: FC = () => {
  return (
    <Suspense fallback={<PokemonLoader />}>
      <Main />
    </Suspense>
  );
};
export default MainPage;
