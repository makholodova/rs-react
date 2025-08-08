import {
  type ChangeEvent,
  type FC,
  type FormEvent,
  useEffect,
  useState,
} from 'react';
import type { SearchProps } from 'types/components.ts';
import BaseInput from 'components/ui/BaseInput/BaseInput.tsx';
import BaseButton from 'components/ui/BaseButton/BaseButton.tsx';
import './Search.css';

const Search: FC<SearchProps> = ({ search: propSearch, onSearchChange }) => {
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
    <form onSubmit={handleSubmit} className="search-container">
      <BaseInput
        type="search"
        placeholder="Enter the full name of the pokemon..."
        value={search}
        onChange={handleInput}
      />
      <BaseButton className="header-button" type="submit">
        Search
      </BaseButton>
    </form>
  );
};
export default Search;
