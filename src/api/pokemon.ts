import type { CardProps } from 'types/components.ts';

const BASE_URL = 'https://pokeapi.co/api/v2';

class PokemonService {
  async getAll(limit = 30): Promise<CardProps[]> {
    const res = await fetch(`${BASE_URL}/pokemon?limit=${limit}`);
    const data = await res.json();
    const results: { name: string; url: string }[] = data.results;

    const detailedItems = await Promise.all(
      results.map(async ({ name, url }) => {
        try {
          const res = await fetch(url);
          const data = await res.json();

          return {
            name: data.name,
            id: data.id,
            height: data.height,
            weight: data.weight,
          };
        } catch (err) {
          console.error(`Ошибка при загрузке покемона ${name}:`, err);
          return null;
        }
      })
    );

    return detailedItems.filter((item): item is CardProps => item !== null);
  }

  async searchByName(name: string): Promise<CardProps | null> {
    const res = await fetch(`${BASE_URL}/pokemon/${name.toLowerCase()}`);

    if (!res.ok) {
      if (res.status === 404) {
        return null;
      }
      throw new Error(`API error: ${res.status}`);
    }
    const data = await res.json();
    return {
      name: data.name,
      id: data.id,
      height: data.height,
      weight: data.weight,
    };
  }
}

export default new PokemonService();
