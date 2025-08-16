import { type FC } from 'react';
import { CardListProps } from '@/types/components';
import PokemonLoader from '@/components/PokemonLoader/PokemonLoader';
import Card from '@/components/Card/Card.tsx';
import styles from './CardList.module.css';
import { useTranslations } from 'next-intl';

const CardList: FC<CardListProps> = ({
  items,
  loading,
  isFetchError,
  search,
}) => {
  const t = useTranslations('CardList');

  if (loading) {
    return <PokemonLoader />;
  }
  if (isFetchError) {
    return (
      <>
        {' '}
        <p className={styles['error']}>{t('error.general')}</p>
        <p className={styles['error']}>{t('error.notFound')}</p>
      </>
    );
  }
  if (!loading && items.length === 0) {
    return (
      <p
        className={styles['not-found-message']}
      >{` ${t('empty')} "${search}"`}</p>
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
