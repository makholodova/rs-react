import { type FC } from 'react';
import type { CardListProps } from 'types/components.ts';
import Card from 'components/Card/Card.tsx';
import PokemonLoader from 'components/PokemonLoader/PokemonLoader.tsx';
import './CardList.css';

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
        <Card key={index} {...item} />
      ))}
    </div>
  );
};
export default CardList;
