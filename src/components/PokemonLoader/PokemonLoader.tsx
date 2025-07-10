import { Component, type ReactNode } from 'react';
import './PokemonLoader.css';

export default class PokemonLoader extends Component {
  render(): ReactNode {
    return (
      <div className="pokemon-loader">
        <div className="pokeball"></div>
      </div>
    );
  }
}
