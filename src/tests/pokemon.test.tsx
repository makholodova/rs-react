import { describe, expect, it } from 'vitest';
import pokemon from '../api/pokemon';

describe('Pokemon api', () => {
  const pikachu = {
    name: 'pikachu',
    url: 'https://pokeapi.co/api/v2/pokemon/25',
  };
  const bulbasaur = {
    name: 'bulbasaur',
    url: 'https://pokeapi.co/api/v2/pokemon/1',
  };
  const charmander = {
    name: 'charmander',
    url: 'https://pokeapi.co/api/v2/pokemon/4',
  };

  let mockFetch: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.restoreAllMocks();
    mockFetch = vi.fn();
    globalThis.fetch = mockFetch;
  });

  it('getAll: fetches and returns list of pokemons with details', async () => {
    mockFetch
      .mockResolvedValueOnce({
        json: async () => ({ results: [pikachu, bulbasaur] }),
      })

      .mockResolvedValueOnce({
        json: async () => ({
          name: 'pikachu',
          id: 25,
          height: 4,
          weight: 60,
        }),
      })
      .mockResolvedValueOnce({
        json: async () => ({
          name: 'bulbasaur',
          id: 1,
          height: 7,
          weight: 80,
        }),
      });

    const result = await pokemon.getAll(2);

    expect(result).toEqual([
      { name: 'pikachu', id: 25, height: 4, weight: 60 },
      { name: 'bulbasaur', id: 1, height: 7, weight: 80 },
    ]);
    expect(mockFetch).toHaveBeenCalledTimes(3);
  });

  it('searchByPartialName: filters and fetches only matching pokemons', async () => {
    pokemon.allNames = [pikachu, bulbasaur];

    mockFetch.mockResolvedValueOnce({
      json: async () => ({
        name: 'pikachu',
        id: 25,
        height: 4,
        weight: 60,
      }),
    });

    const result = await pokemon.searchByPartialName('pika');
    expect(result).toEqual([
      { name: 'pikachu', id: 25, height: 4, weight: 60 },
    ]);
  });

  it('getPokemonDetails: returns null on fetch failure', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Fetch failed'));
    vi.spyOn(console, 'error').mockImplementation(() => {});

    const result = await pokemon.getPokemonDetails({
      name: 'missingno',
      url: 'https://pokeapi.co/api/v2/pokemon/0',
    });

    expect(result).toBeNull();
  });

  it('loadAllNames: fetches and caches data when empty', async () => {
    pokemon.allNames = [];

    mockFetch.mockResolvedValueOnce({
      json: async () => ({
        results: [charmander],
      }),
    });

    const result = await pokemon.loadAllNames();

    expect(result).toEqual([charmander]);
    expect(pokemon.allNames).toEqual(result);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('loadAllNames: returns cached data if already loaded', async () => {
    pokemon.allNames = [bulbasaur];

    const result = await pokemon.loadAllNames();

    expect(result).toEqual([bulbasaur]);
    expect(mockFetch).toHaveBeenCalledTimes(0);
  });

  it('getById: returns detailed Pokémon data', async () => {
    mockFetch.mockResolvedValueOnce({
      json: async () => ({
        name: 'pikachu',
        id: 25,
        height: 4,
        weight: 60,
        sprites: {
          other: {
            'official-artwork': {
              front_default: 'https://img.pokemon.fake/25.png',
            },
          },
        },
        types: [{ type: { name: 'electric' } }],
        abilities: [
          { ability: { name: 'static' } },
          { ability: { name: 'lightning-rod' } },
        ],
        stats: [
          { stat: { name: 'hp' }, base_stat: 35 },
          { stat: { name: 'attack' }, base_stat: 55 },
        ],
      }),
    });

    const result = await pokemon.getById(25);

    expect(result).toEqual({
      name: 'pikachu',
      id: 25,
      image: 'https://img.pokemon.fake/25.png',
      height: 4,
      weight: 60,
      types: ['electric'],
      abilities: ['static', 'lightning-rod'],
      stats: [
        { name: 'hp', base: 35 },
        { name: 'attack', base: 55 },
      ],
    });

    expect(mockFetch).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/pokemon/25'
    );
  });
});
