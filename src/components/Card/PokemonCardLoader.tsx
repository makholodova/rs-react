import type { FC } from 'react';
import Card from 'components/Card/Card.tsx';
import { useGetPokemonByNameQuery } from 'api/pokemon.ts';
import CircleLoader from 'components/CircleLoader/CircleLoader.tsx';

const PokemonCardLoader: FC<{ name: string }> = ({ name }) => {
  const { data, isLoading, error } = useGetPokemonByNameQuery(name);
  if (isLoading) return <CircleLoader />;
  if (error || !data) return null;

  return (
    <Card
      name={data.name}
      id={data.id}
      height={data.height}
      weight={data.weight}
    />
  );
};
export default PokemonCardLoader;
