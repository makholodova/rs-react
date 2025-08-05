import { type FC, useMemo } from 'react';
import type { CardProps } from 'types/components.ts';
import {
  useGetAllPokemonQuery,
  useGetPokemonByNameQuery,
} from 'api/pokemon.ts';
import CardList from 'components/CardList/CardList.tsx';
import './MainPage.css';
import Search from 'components/Search/Search.tsx';
import useLocalStorage from '../../hooks/use-local-storage.ts';
import Pagination from 'components/Pagination/Pagination.tsx';
import { Outlet, useLocation, useSearchParams } from 'react-router-dom';
import Flyout from 'components/Flyout/Flyout.tsx';
import BaseButton from 'components/ui/BaseButton/BaseButton.tsx';
import RefreshIcon from '../../assets/refresh.svg?react';

const Main: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useLocalStorage('search-makholodova', '');

  const limit = 20;
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const offset = (currentPage - 1) * limit;

  const location = useLocation();
  const showDetails = /^\/pokemon\/\d+$/.test(location.pathname);

  const {
    data: searchData,
    error: searchError,
    isLoading: isSearchLoading,
  } = useGetPokemonByNameQuery(search.toLowerCase());

  const {
    data: listData,
    error: listError,
    isLoading: isListLoading,
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
    !isSearchLoading &&
    (!searchData || !searchData.id || !searchData.name);

  const handlePageChange = (newPage: number): void => {
    setSearchParams({ page: newPage.toString() });
  };
  const handleRefresh = (): void => {
    console.log('handleRefresh');
  };
  const isLoading = search.trim() ? isSearchLoading : isListLoading;
  const isFetchError = Boolean(search.trim() ? searchError : listError);

  return (
    <main className="main">
      <div
        className={`main__left ${showDetails ? 'main__left--disabled' : ''}`}
      >
        <Search search={search} onSearchChange={setSearch} />

        <div className="main-controller">
          <BaseButton className="refresh__button" onClick={handleRefresh}>
            <RefreshIcon className="refresh__icon" />
          </BaseButton>
          <Pagination
            currentPage={currentPage}
            onPageChange={handlePageChange}
            isNextDisabled={isSearching || isNoResults || items.length < limit}
          />
        </div>

        <CardList
          search={search}
          items={items}
          loading={isLoading}
          isFetchError={isFetchError}
        />
      </div>

      {showDetails && (
        <div className="main__right">
          <Outlet />
        </div>
      )}
      <Flyout />
    </main>
  );
};
export default Main;
