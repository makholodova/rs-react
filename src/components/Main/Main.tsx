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
  hasError: boolean;
}

export default class Main extends Component<Props, State> {
  state: State = {
    items: [],
    loading: true,
    isFetchError: false,
    hasError: false,
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
        const data = await PokemonService.searchByName(search);
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
    } catch {
      this.setState({ isFetchError: true, items: [] });
    } finally {
      this.setState({ loading: false });
    }
  };
  handleCrash = () => {
    this.setState({ hasError: true });
  };
  render() {
    const { items, loading, isFetchError } = this.state;
    const { search } = this.props;
    if (this.state.hasError) {
      throw new Error('Something went wrong.');
    }
    return (
      <main className="main">
        {!loading && !isFetchError && items.length === 0 && search.trim() && (
          <div className="not-found-message">
            {`No results found for "${search}"`}
          </div>
        )}
        <CardList items={items} loading={loading} isFetchError={isFetchError} />
        <div className="container-button">
          <BaseButton onClick={this.handleCrash} type="submit">
            Check Error Boundary
          </BaseButton>
        </div>
      </main>
    );
  }
}
