import Main from '@/components/Main/Main';
import { PageProps } from '@/types/components.ts';

const LeftForPokemon = async ({ searchParams }: PageProps) => {
  const { page } = await searchParams;
  const limit = 20;
  const currentPage = Number(page ?? '1');

  return <Main currentPage={currentPage} limit={limit} />;
};
export default LeftForPokemon;
