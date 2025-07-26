import { type FC, useEffect, useState } from 'react';
import type { CardProps } from 'types/components.ts';
import PokemonService from 'api/pokemon.ts';
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

const Main: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useLocalStorage('search-makholodova', '');
  const [items, setItems] = useState<CardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFetchError, setIsFetchError] = useState(false);
  const [hasError, setHasError] = useState(false);

  const limit = 20;
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const offset = (currentPage - 1) * limit;

  const location = useLocation();
  const outlet = useOutlet();

  const showDetails = /^\/pokemon\/\d+$/.test(location.pathname);

  const handlePageChange = (newPage: number): void => {
    setSearchParams({ page: newPage.toString() });
  };

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setLoading(true);
      setIsFetchError(false);

      try {
        let result: CardProps[];

        if (search.trim()) {
          result = await PokemonService.searchByPartialName(search);
        } else {
          result = await PokemonService.getAll(offset, limit);
        }
        setItems(result);
      } catch {
        setIsFetchError(true);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [search, offset]);

  const handleCrash = (): void => {
    setHasError(true);
  };

  if (hasError) {
    throw new Error('Something went wrong.');
  }
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
          loading={loading}
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
    </main>
  );
};
export default Main;
