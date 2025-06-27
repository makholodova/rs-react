import { Component } from 'react';
import './Main.css';
import type { PokemonListItem } from 'types/pokemon.ts';
import PokemonService from 'api/pokemon.ts';
import CardList from 'components/CardList/CardList.tsx';
import BaseButton from 'components/ui/BaseButton/BaseButton.tsx';

interface Props {
  search: string;
}

interface State {
  items: PokemonListItem[];
  loading: boolean;
  isFetchError: boolean;
}

export default class Main extends Component<Props, State> {
  state: State = {
    items: [],
    loading: true,
    isFetchError: false,
  };

  async componentDidMount() {
    this.fetchData(this.props.search);
  }

  async componentDidUpdate(prevProps: Props) {
    if (prevProps.search !== this.props.search) {
      this.fetchData(this.props.search);
    }
  }
  fetchData = async (search: string) => {
    this.setState({ loading: true, isFetchError: false });

    try {
      let items: PokemonListItem[];

      if (search.trim()) {
        console.log('search', search.trim());
        const data = await PokemonService.searchByName(search);
        console.log('data', data);
        if (data) {
          items = [
            {
              name: data.name,
              id: data.id,
              height: data.height,
              weight: data.weight,
            },
          ];
        } else {
          items = [];
        }
      } else {
        items = await PokemonService.getAll();
      }

      this.setState({ items });
    } catch (err) {
      console.error('Ошибка при загрузке:', err);
      this.setState({ isFetchError: true, items: [] });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { items, loading, isFetchError } = this.state;
    return (
      <main className="main">
        <CardList items={items} loading={loading} isFetchError={isFetchError} />
        <div className="container-button">
          <BaseButton type="submit">Check Error Boundary</BaseButton>
        </div>
      </main>
    );
  }
}
