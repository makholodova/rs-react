import { useEffect, useState } from 'react';
import type { FC } from 'react';
import './App.css';
import Header from 'components/Header/Header.tsx';
import Main from 'components/Main/Main.tsx';
import useLocalStorage from './hooks/use-local-storage.ts';

const App: FC = () => {
  const [search, setSearch] = useLocalStorage('search-makholodova', '');
  const [isSearchReady, setIsSearchReady] = useState(false);

  useEffect(() => {
    setIsSearchReady(true);
  }, []);

  return (
    <div className="App">
      <Header search={search} onSearchChange={setSearch} />
      {isSearchReady && <Main search={search} />}
    </div>
  );
};

export default App;
