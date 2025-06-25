import { Component } from 'react';
import './Card.css';
import {
  extractPokemonIdFromUrl,
  getPokemonImageUrl,
} from '../../units/pokemon.ts';
import type { PokemonListItem } from '../../types/pokemon.ts';
import { getRandomColorRGB } from '../../units/generate-colors.ts';

export default class Card extends Component<PokemonListItem> {
  color: string;
  constructor(props: PokemonListItem) {
    super(props);
    this.color = getRandomColorRGB();
  }
  render() {
    const { name, url } = this.props;
    const id = extractPokemonIdFromUrl(url);
    const imageUrl = getPokemonImageUrl(id);

    return (
      <div className="card">
        <div className="card__image">
          <img className="card__sprite" src={imageUrl} alt={name} />
        </div>
        <div
          className="card__title-wrapper"
          style={{ backgroundColor: this.color }}
        >
          <h3 className="card__title">
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </h3>
        </div>
      </div>
    );
  }
}
