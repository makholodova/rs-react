'use client';

import { type FC } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import CloseIcon from '@/assets/close.svg';
import RefreshIcon from '@/assets/refresh.svg';
import BaseButton from '@/components/ui/BaseButton/BaseButton';
import PokemonLoader from '@/components/PokemonLoader/PokemonLoader';
import styles from './PokemonDetail.module.css';
import { capitalize } from '@/units/capitalize';
import { useDispatch } from 'react-redux';
import { pokemonApi, useGetPokemonByIdQuery } from '@/api/pokemon';

const PokemonDetail: FC = () => {
  const params = useParams<{ id: string }>();

  const id = params?.id;
  const numericId = Number(id);

  const dispatch = useDispatch();

  const handleRefresh = (): void => {
    dispatch(
      pokemonApi.util.invalidateTags([{ type: 'Pokemon', id: numericId }])
    );
  };

  const router = useRouter();
  const searchParams = useSearchParams();
  const queryString = searchParams?.toString();

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
        <div>Pokemon not found</div>
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
            width={250}
            height={250}
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
          <p>Height: {pokemon.height}</p>
          <p>Weight: {pokemon.weight}</p>
          <div className={styles['pokemon-detail__block']}>
            <strong>Types:</strong>
            <div className={styles['pokemon-detail__types']}>
              {pokemon.types?.map((type) => (
                <span key={type} className={`type-badge type-${type}`}>
                  {type}
                </span>
              ))}
            </div>
          </div>

          <div className={styles['pokemon-detail__block']}>
            <strong>Abilities:</strong>
            <p>{pokemon.abilities?.join(', ')}</p>
          </div>

          <div className={styles['pokemon-detail__block']}>
            <strong>Stats:</strong>
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
