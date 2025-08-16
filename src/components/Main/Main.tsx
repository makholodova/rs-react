'use client';
import { FC, useMemo } from 'react';
import { useDispatch } from 'react-redux';
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
} from '@/api/pokemon';

const Main: FC = () => {
  const [search, setSearch] = useLocalStorage('search-makholodova', '');
  const limit = 20;

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const currentPage = parseInt(searchParams?.get('page') ?? '1', 10);
  const offset = (currentPage - 1) * limit;

  const dispatch = useDispatch();

  const {
    data: searchData,
    error: searchError,
    isFetching: isSearchFetching,
  } = useGetPokemonByNameQuery(search.toLowerCase());

  const {
    data: listData,
    error: listError,
    isFetching: isListFetching,
  } = useGetAllPokemonQuery({ offset, limit });

  const items: CardProps[] = useMemo(() => {
    if (search.trim() && searchData?.id && searchData?.name) {
      return [searchData];
    }
    if (listData?.results) {
      return listData.results.map((item) => {
        const idMatch = item.url.match(/\/pokemon\/(\d+)\//);
        const id = idMatch ? parseInt(idMatch[1], 10) : 0;

        return {
          name: item.name,
          id,
        };
      });
    }
    return [];
  }, [search, searchData, listData]);

  const isSearching = Boolean(search.trim());
  const isNoResults =
    isSearching &&
    !isSearchFetching &&
    (!searchData || !searchData.id || !searchData.name);

  const isLoading = search.trim() ? isSearchFetching : isListFetching;
  const isFetchError = Boolean(search.trim() ? searchError : listError);

  const handleRefresh = (): void => {
    dispatch(
      pokemonApi.util.invalidateTags([{ type: 'PokemonList', id: 'LIST' }])
    );
  };

  const handlePageChange = (newPage: number): void => {
    const params = new URLSearchParams(searchParams?.toString() ?? '');
    params.set('page', String(newPage));
    router.replace(`${pathname}?${params.toString()}`);
  };

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
            isNextDisabled={isSearching || isNoResults || items.length < limit}
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
