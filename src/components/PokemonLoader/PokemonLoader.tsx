import './PokemonLoader.css';
import { Component } from 'react';

export default class PokemonLoader extends Component {
  render() {
    return (
      <div className="pokemon-loader">
        <div className="pokeball"></div>
      </div>
    );
  }
}
