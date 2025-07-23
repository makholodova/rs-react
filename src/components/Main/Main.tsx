import { type FC, useEffect, useState } from 'react';
import type { CardProps, MainProps } from 'types/components.ts';
import PokemonService from 'api/pokemon.ts';
import CardList from 'components/CardList/CardList.tsx';
import BaseButton from 'components/ui/BaseButton/BaseButton.tsx';
import './Main.css';

const Main: FC<MainProps> = ({ search }) => {
  const [items, setItems] = useState<CardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFetchError, setIsFetchError] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setLoading(true);
      setIsFetchError(false);

      try {
        let result: CardProps[];

        if (search.trim()) {
          result = await PokemonService.searchByPartialName(search);
        } else {
          result = await PokemonService.getAll();
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
  }, [search]);

  const handleCrash = (): void => {
    setHasError(true);
  };

  if (hasError) {
    throw new Error('Something went wrong.');
  }
  return (
    <main className="main">
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
    </main>
  );
};
export default Main;
