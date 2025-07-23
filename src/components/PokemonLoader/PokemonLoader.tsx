import type { FC } from 'react';
import './PokemonLoader.css';

const PokemonLoader: FC = () => {
  return (
    <div className="pokemon-loader" data-testid="pokemon-loader">
      <div className="pokeball"></div>
    </div>
  );
};
export default PokemonLoader;
