'use client';

import { type FC } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { Link } from '@/i18n/navigation.ts';
import Image from 'next/image';
import CloseIcon from '@/assets/close.svg';
import RefreshIcon from '@/assets/refresh.svg';
import BaseButton from '@/components/ui/BaseButton/BaseButton';
import PokemonLoader from '@/components/PokemonLoader/PokemonLoader';
import styles from './PokemonDetail.module.css';
import { capitalize } from '@/units/capitalize';
import { useDispatch } from 'react-redux';
import { pokemonApi, useGetPokemonByIdQuery } from '@/api/pokemon';
import { useTranslations } from 'next-intl';

const PokemonDetail: FC = () => {
  const t = useTranslations('PokemonDetail');

  const params = useParams<{ id: string }>();

  const id = params?.id;
  const numericId = Number(id);

  const dispatch = useDispatch();
  const router = useRouter();

  const searchParams = useSearchParams();
  const queryString = searchParams?.toString();

  const handleRefresh = (): void => {
    dispatch(
      pokemonApi.util.invalidateTags([{ type: 'Pokemon', id: numericId }])
    );
  };

  const handleClose = () => {
    if (window.history.length > 1) router.back();
    else router.push(queryString ? `/?${queryString}` : '/');
  };
  const {
    data: pokemon,
    isFetching,
    error,
  } = useGetPokemonByIdQuery(numericId);

  if (isFetching) return <PokemonLoader />;

  if (error || !pokemon)
    return (
      <div>
        <Link href={'/'} className={styles['close-button']}>
          <CloseIcon />
        </Link>
        <div>{t('notFound')}</div>
      </div>
    );

  return (
    <>
      <div className={styles['pokemon-detail__controls']}>
        <BaseButton
          className={styles['refresh__button']}
          onClick={handleRefresh}
        >
          <RefreshIcon className={styles['refresh__icon']} />
        </BaseButton>
        <BaseButton onClick={handleClose} className={styles['close-button']}>
          <CloseIcon />
        </BaseButton>
      </div>

      <div className={styles['pokemon-detail']}>
        <div className={styles['pokemon-detail__image']}>
          <Image
            width={150}
            height={150}
            className={styles['pokemon-detail__img']}
            src={pokemon.image}
            alt={pokemon.name}
            priority={false}
          />
        </div>

        <h3 className={styles['pokemon-detail__name']}>
          {capitalize(pokemon.name)}
        </h3>

        <div className={styles['pokemon-detail__info']}>
          <p>
            {t('height')}: {pokemon.height}
          </p>
          <p>
            {t('weight')}: {pokemon.weight}
          </p>
          <div className={styles['pokemon-detail__block']}>
            <strong>{t('types')}:</strong>
            <div className={styles['pokemon-detail__types']}>
              {pokemon.types?.map((type) => (
                <span
                  key={type}
                  className={`${styles['type-badge']} ${styles[`type-${type}`]}`}
                >
                  {type}
                </span>
              ))}
            </div>
          </div>

          <div className={styles['pokemon-detail__block']}>
            <strong>{t('abilities')}:</strong>
            <p>{pokemon.abilities?.join(', ')}</p>
          </div>

          <div className={styles['pokemon-detail__block']}>
            <strong>{t('stats')}:</strong>
            <ul className={styles['pokemon-detail__stats']}>
              {pokemon.stats?.map((stat) => (
                <li key={stat.name}>
                  {capitalize(stat.name)}: {stat.base}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
export default PokemonDetail;
