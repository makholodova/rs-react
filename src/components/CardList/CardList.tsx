import { Component } from 'react';
import './CardList.css';
import type { PokemonListItem } from 'types/pokemon.ts';
import Card from 'components/Card/Card.tsx';
import PokemonLoader from 'components/PokemonLoader/PokemonLoader.tsx';

interface Props {
  items: PokemonListItem[];
  loading: boolean;
  isFetchError: boolean;
}

export default class CardList extends Component<Props> {
  render() {
    const { items, loading, isFetchError } = this.props;

    if (loading) {
      return <PokemonLoader />;
    }
    if (isFetchError) {
      return <p>Something went wrong</p>;
    }

    return (
      <div className="card-list">
        {items.map((item, index) => (
          <Card key={index} {...item} />
        ))}
      </div>
    );
  }
}
