import type { FC } from 'react';
import styles from './PokemonLoader.module.css';

const PokemonLoader: FC = () => {
  return (
    <div className={styles['pokemon-loader']} data-testid="pokemon-loader">
      <div className={styles['pokeball']}></div>
    </div>
  );
};
export default PokemonLoader;
