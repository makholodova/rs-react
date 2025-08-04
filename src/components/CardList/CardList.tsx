import { type FC } from 'react';
import type { CardListProps } from 'types/components.ts';
import PokemonLoader from 'components/PokemonLoader/PokemonLoader.tsx';
import './CardList.css';
import PokemonCardLoader from 'components/Card/PokemonCardLoader.tsx';

const CardList: FC<CardListProps> = ({
  items,
  loading,
  isFetchError,
  search,
}) => {
  if (loading) {
    return <PokemonLoader />;
  }
  if (isFetchError) {
    return <p className="error">Something went wrong..</p>;
  }
  if (!loading && items.length === 0) {
    return (
      <p className="not-found-message">{`No results found for "${search}"`}</p>
    );
  }

  return (
    <div className="card-list">
      {items.map((item, index) => (
        <PokemonCardLoader key={index} name={item.name} />
      ))}
    </div>
  );
};
export default CardList;
