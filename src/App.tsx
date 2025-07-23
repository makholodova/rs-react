import { useEffect, useState } from 'react';
import type { FC } from 'react';
import './App.css';
import Header from 'components/Header/Header.tsx';
import Main from 'components/Main/Main.tsx';
import type { AppState } from 'types/components.ts';

const App: FC = () => {
  const [search, setSearch] = useState<AppState['search']>('');
  const [isSearchReady, setIsSearchReady] =
    useState<AppState['isSearchReady']>(false);

  useEffect(() => {
    const savedSearch = localStorage.getItem('search-makholodova');
    const parsedSearch = savedSearch ? JSON.parse(savedSearch) : '';
    setSearch(parsedSearch);
    setIsSearchReady(true);
  }, []);

  const handleSearchChange = (value: string): void => {
    localStorage.setItem('search-makholodova', JSON.stringify(value));
    setSearch(value);
  };

  return (
    <div className="App">
      <Header search={search} onSearchChange={handleSearchChange} />
      {isSearchReady && <Main search={search} />}
    </div>
  );
};

export default App;
