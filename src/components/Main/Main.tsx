import { Component } from 'react';
import type { CardProps, MainProps, MainState } from 'types/components.ts';
import PokemonService from 'api/pokemon.ts';
import CardList from 'components/CardList/CardList.tsx';
import BaseButton from 'components/ui/BaseButton/BaseButton.tsx';
import './Main.css';

export default class Main extends Component<MainProps, MainState> {
  state: MainState = {
    items: [],
    loading: true,
    isFetchError: false,
    hasError: false,
  };

  async componentDidMount() {
    this.fetchData(this.props.search);
  }

  async componentDidUpdate(prevProps: MainProps) {
    if (prevProps.search !== this.props.search) {
      this.fetchData(this.props.search);
    }
  }

  fetchData = async (search: string) => {
    this.setState({ loading: true, isFetchError: false });

    try {
      let items: CardProps[];

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
        <CardList
          search={search}
          items={items}
          loading={loading}
          isFetchError={isFetchError}
        />
        <div className="container-button">
          <BaseButton onClick={this.handleCrash} type="submit">
            Check Error Boundary
          </BaseButton>
        </div>
      </main>
    );
  }
}
