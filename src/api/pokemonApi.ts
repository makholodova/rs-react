import type { PokemonListItem } from '../types/pokemon.ts';

class PokemonService {
  async getAll(limit = 30): Promise<PokemonListItem[]> {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
    if (!res.ok) throw new Error('Ошибка загрузки списка покемонов');
    const data = await res.json();
    return data.results;
  }
}

export default new PokemonService();
