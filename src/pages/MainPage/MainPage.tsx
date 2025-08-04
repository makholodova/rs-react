import { type FC, useState } from 'react';
import type { CardProps } from 'types/components.ts';
import {
  useGetAllPokemonsQuery,
  useGetPokemonByNameQuery,
} from 'api/pokemon.ts';
import CardList from 'components/CardList/CardList.tsx';
import BaseButton from 'components/ui/BaseButton/BaseButton.tsx';
import './MainPage.css';
import Search from 'components/Search/Search.tsx';
import useLocalStorage from '../../hooks/use-local-storage.ts';
import Pagination from 'components/Pagination/Pagination.tsx';
import {
  Outlet,
  useLocation,
  useOutlet,
  useSearchParams,
} from 'react-router-dom';
import Flyout from 'components/Flyout/Flyout.tsx';

const Main: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useLocalStorage('search-makholodova', '');
  const [hasError, setHasError] = useState(false);

  const limit = 20;
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const offset = (currentPage - 1) * limit;

  const location = useLocation();
  const outlet = useOutlet();

  const showDetails = /^\/pokemon\/\d+$/.test(location.pathname);

  const items: CardProps[] = [];

  const {
    data: searchData,
    error: searchError,
    isLoading: isSearchLoading,
  } = useGetPokemonByNameQuery(search.toLowerCase());

  const {
    data: listData,
    error: listError,
    isLoading: isListLoading,
  } = useGetAllPokemonsQuery({ offset, limit });
  if (search.trim() && searchData) {
    items.push({
      name: searchData.name,
      height: searchData.height,
      id: searchData.id,
      weight: searchData.weight,
    });
  } else if (listData?.results) {
    items.push(
      ...listData.results.map((item) => {
        const idMatch = item.url.match(/\/pokemon\/(\d+)\//);
        const id = idMatch ? parseInt(idMatch[1], 10) : 0;

        return {
          name: item.name,
          id,
          weight: 0,
          height: 0,
        };
      })
    );
  }

  const handlePageChange = (newPage: number): void => {
    setSearchParams({ page: newPage.toString() });
  };

  const handleCrash = (): void => {
    setHasError(true);
  };

  if (hasError) {
    throw new Error('Something went wrong.');
  }

  const isLoading = search.trim() ? isSearchLoading : isListLoading;
  const isFetchError = Boolean(search.trim() ? searchError : listError);

  return (
    <main className="main">
      <div className={`main__left ${outlet ? 'main__left--disabled' : ''}`}>
        <Search search={search} onSearchChange={setSearch} />
        <Pagination
          currentPage={currentPage}
          onPageChange={handlePageChange}
          isNextDisabled={items.length < limit}
        />
        <CardList
          search={search}
          items={items}
          loading={isLoading}
          isFetchError={isFetchError}
        />

        <div className="container-button">
          <BaseButton onClick={handleCrash} type="submit">
            Check Error Boundary
          </BaseButton>
        </div>
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
