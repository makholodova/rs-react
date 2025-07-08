import { Component } from 'react';
import './PokemonLoader.css';

export default class PokemonLoader extends Component {
  render() {
    return (
      <div className="pokemon-loader">
        <div className="pokeball"></div>
      </div>
    );
  }
}
