import type { CardProps, NamedAPIResource } from 'types/components.ts';

const BASE_URL = 'https://pokeapi.co/api/v2';

class PokemonService {
  public allNames: NamedAPIResource[] = [];

  async searchByPartialName(query: string): Promise<CardProps[]> {
    const names = await this.loadAllNames();
    const filtered = names.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );

    const detailed = await Promise.all(
      filtered.map(async (item) => this.getPokemonDetails(item))
    );

    return detailed.filter((item) => item !== null);
  }

  async getAll(offset = 0, limit = 20): Promise<CardProps[]> {
    const res = await fetch(
      `${BASE_URL}/pokemon?offset=${offset}&limit=${limit}`
    );
    const data = await res.json();
    const results: { name: string; url: string }[] = data.results;

    const detailedItems = await Promise.all(
      results.map(async (item) => this.getPokemonDetails(item))
    );

    return detailedItems.filter((item) => item !== null);
  }

  public async getPokemonDetails(
    item: NamedAPIResource
  ): Promise<CardProps | null> {
    try {
      const res = await fetch(item.url);
      const data = await res.json();
      return {
        name: data.name,
        id: data.id,
        height: data.height,
        weight: data.weight,
      };
    } catch (err) {
      console.error(`Ошибка при загрузке ${item.name}:`, err);
      return null;
    }
  }

  public async loadAllNames(): Promise<NamedAPIResource[]> {
    if (this.allNames.length > 0) return this.allNames;

    const res = await fetch(`${BASE_URL}/pokemon?limit=1302`);
    const data = await res.json();
    this.allNames = data.results;
    return this.allNames;
  }
}

export default new PokemonService();
