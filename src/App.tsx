import { Component } from 'react';
import './App.css';
import PokemonService from './api/pokemonApi.ts';
import Card from './components/Card/Card';
import type { PokemonListItem } from './types/pokemon.ts';

interface State {
  items: PokemonListItem[];
}

export default class App extends Component<object, State> {
  state: State = {
    items: [],
  };

  async componentDidMount() {
    try {
      const items = await PokemonService.getAll();
      console.log('Массив покемонов:', items);
      this.setState({ items });
    } catch (err) {
      console.error('Ошибка при загрузке:', err);
    }
  }

  render() {
    const { items } = this.state;
    return (
      <div className="App">
        <div className="card-list">
          {items.length > 0 ? (
            items.map((item, index) => (
              <Card key={index} name={item.name} url={item.url} />
            ))
          ) : (
            <p>Загрузка...</p>
          )}
        </div>
      </div>
    );
  }
}
