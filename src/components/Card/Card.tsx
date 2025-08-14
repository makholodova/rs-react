'use client';

import { type FC, useMemo } from 'react';
import HeartIcon from '@/assets/heart.svg';
import styles from './Card.module.css';
import { CardProps } from '@/types/components';
import { RootState } from '@/store/store';
import { getPokemonImageUrl } from '@/units/pokemon-helpers';
import { getRandomColorRGB } from '@/units/generate-colors';
import { capitalize } from '@/units/capitalize';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectedItem, unselectedItem } from '@/store/selectedItemsSlice';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

const Card: FC<CardProps> = ({ name, id }) => {
  const searchParams = useSearchParams();
  const queryString = searchParams?.toString();
  const href = queryString ? `/pokemon/${id}?${queryString}` : `/pokemon/${id}`;

  const imageUrl = getPokemonImageUrl(id);
  const color = useMemo(() => getRandomColorRGB(), []);

  const dispatch = useAppDispatch();
  const isSelected = useAppSelector((state: RootState) =>
    state.selectedItems.items.some((item: CardProps) => item.id === id)
  );

  const handleCheckboxChange = (): void => {
    if (isSelected) {
      dispatch(unselectedItem({ name, id, imageUrl }));
    } else dispatch(selectedItem({ name, id, imageUrl }));
  };

  return (
    <Link href={href} className={styles['card']}>
      <label
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={styles['card__label']}
      >
        <input
          className={styles['card__checkbox']}
          type="checkbox"
          checked={isSelected}
          onClick={(e) => {
            e.stopPropagation();
          }}
          onChange={handleCheckboxChange}
        ></input>
        <HeartIcon />
      </label>
      <div className={styles['card__image']}>
        <Image
          width={96}
          height={96}
          className={styles['card__sprite']}
          src={imageUrl}
          alt={name}
          priority={false}
        />
      </div>
      <div
        className={styles['card__title-wrapper']}
        style={{ backgroundColor: color }}
      >
        <h3 className={styles['card__title']}>{capitalize(name)}</h3>
      </div>
    </Link>
  );
};

export default Card;
