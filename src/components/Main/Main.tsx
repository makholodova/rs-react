'use client';
import { FC, useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import RefreshIcon from '@/assets/refresh.svg';
import Search from '@/components/Search/Search';
import useLocalStorage from '@/hooks/use-local-storage';
import CardList from '@/components/CardList/CardList';
import BaseButton from '@/components/ui/BaseButton/BaseButton';
import Pagination from '@/components/Pagination/Pagination';

import styles from './Main.module.css';
import { CardProps } from '@/types/components';
import {
  pokemonApi,
  useGetAllPokemonQuery,
  useGetPokemonByNameQuery,
} from '@/api/rtk/pokemon.ts';
import { useDispatch } from 'react-redux';

type Props = {
  currentPage: number;
  limit: number;
};
const Main: FC<Props> = ({ currentPage, limit }) => {
  const [search, setSearch] = useLocalStorage('search-makholodova', '');

  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const offset = (currentPage - 1) * limit;

  const {
    data: listData,
    error: listError,
    isFetching: isListFetching,
  } = useGetAllPokemonQuery({ offset, limit });

  const {
    data: searchData,
    error: searchError,
    isFetching: isSearchFetching,
  } = useGetPokemonByNameQuery(search.toLowerCase(), {
    skip: !search.trim(),
  });

  const items: CardProps[] = useMemo(() => {
    if (search.trim() && searchData?.id && searchData?.name) {
      return [searchData];
    }
    return listData?.items ?? [];
  }, [search, searchData, listData]);

  const totalCount = listData?.count ?? 0;
  const isSearching = Boolean(search.trim());
  const isNoResults =
    isSearching &&
    !isSearchFetching &&
    (!searchData || !searchData.id || !searchData.name);

  const isLoading = isSearching ? isSearchFetching : isListFetching;
  const isFetchError = Boolean(search.trim() ? searchError : listError);

  const handleRefresh = (): void => {
    dispatch(
      pokemonApi.util.invalidateTags([{ type: 'PokemonList', id: 'LIST' }])
    );
    router.refresh();
  };

  const handlePageChange = (newPage: number): void => {
    const params = new URLSearchParams(searchParams?.toString() ?? '');
    params.set('page', String(newPage));
    router.replace(`${pathname}?${params.toString()}`);
  };
  const isNextDisabled =
    isSearching || isNoResults || currentPage * limit >= totalCount;
  return (
    <>
      <Search search={search} onSearchChange={setSearch} />
      {!search.trim() && (
        <div className={styles['main-controller']}>
          <BaseButton
            className={styles['refresh__button']}
            onClick={handleRefresh}
          >
            <RefreshIcon className={styles['refresh__icon']} />
          </BaseButton>
          <Pagination
            currentPage={currentPage}
            onPageChange={handlePageChange}
            isNextDisabled={isNextDisabled}
          />
        </div>
      )}
      <CardList
        search={search}
        items={items}
        loading={isLoading}
        isFetchError={isFetchError}
      />
    </>
  );
};
export default Main;
