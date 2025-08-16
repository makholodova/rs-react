'use client';

import {
  type ChangeEvent,
  type FC,
  type FormEvent,
  useEffect,
  useState,
} from 'react';
import { SearchProps } from '@/types/components';
import BaseInput from '../ui/BaseInput/BaseInput';
import BaseButton from '../ui/BaseButton/BaseButton';
import styles from './Search.module.css';
import { useTranslations } from 'next-intl';

const Search: FC<SearchProps> = ({ search: propSearch, onSearchChange }) => {
  const t = useTranslations('Search');
  const [search, setSearch] = useState(propSearch);

  useEffect(() => {
    setSearch(propSearch || '');
  }, [propSearch]);

  const handleInput = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setSearch(value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onSearchChange(search.trim());
  };

  return (
    <form onSubmit={handleSubmit} className={styles['search-container']}>
      <BaseInput
        type="search"
        placeholder={t('placeholder')}
        value={search}
        onChange={handleInput}
      />
      <BaseButton className={styles['header-button']} type="submit">
        {t('button')}
      </BaseButton>
    </form>
  );
};
export default Search;
