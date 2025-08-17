import { Suspense } from 'react';
import Main from '@/components/Main/Main';
import PokemonLoader from '@/components/PokemonLoader/PokemonLoader.tsx';
import { PageProps } from '@/types/components.ts';

const MainPage = async ({ searchParams }: PageProps) => {
  const { page } = await searchParams;
  const limit = 20;
  const currentPage = Number(page ?? '1');

  return (
    <Suspense fallback={<PokemonLoader />}>
      <Main currentPage={currentPage} limit={limit} />
    </Suspense>
  );
};
export default MainPage;
