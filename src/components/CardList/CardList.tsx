import { type FC } from 'react';
import { CardListProps } from '@/types/components';
import PokemonLoader from '@/components/PokemonLoader/PokemonLoader';
import Card from '@/components/Card/Card.tsx';
import styles from './CardList.module.css';

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
    return (
      <>
        {' '}
        <p className={styles['error']}>Oops! Something went wrong</p>
        <p className={styles['error']}>Pokemon not found</p>
      </>
    );
  }
  if (!loading && items.length === 0) {
    return (
      <p
        className={styles['not-found-message']}
      >{`No results found for "${search}"`}</p>
    );
  }
  return (
    <div className={styles['card-list']}>
      {items.map((item) => (
        <Card key={item.id} {...item} />
      ))}
    </div>
  );
};
export default CardList;
