import type {
  CardProps,
  NamedAPIResource,
  PokemonDetailProps,
} from 'types/components.ts';

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export interface RawPokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  types: { type: { name: string } }[];
  abilities: { ability: { name: string } }[];
  stats: { stat: { name: string }; base_stat: number }[];
}
const BASE_URL = 'https://pokeapi.co/api/v2';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
  endpoints: (build) => ({
    getAllPokemons: build.query<
      { results: NamedAPIResource[] },
      { offset: number; limit: number }
    >({
      query: ({ offset = 0, limit = 20 }) =>
        `/pokemon?offset=${offset}&limit=${limit}`,
    }),
    getPokemonByName: build.query<CardProps, string>({
      query: (name) => `pokemon/${name.toLowerCase()}`,
      transformResponse: (raw: RawPokemon): CardProps => ({
        id: raw.id,
        name: raw.name,
        height: raw.height,
        weight: raw.weight,
      }),
    }),
    getPokemonById: build.query<PokemonDetailProps, number>({
      query: (id) => `pokemon/${id}`,
      transformResponse: (raw: RawPokemon): PokemonDetailProps => ({
        id: raw.id,
        name: raw.name,
        image: raw.sprites?.other?.['official-artwork']?.front_default,
        height: raw.height,
        weight: raw.weight,
        types: raw.types.map((t) => t.type.name),
        abilities: raw.abilities.map((a) => a.ability.name),
        stats: raw.stats.map((s) => ({
          name: s.stat.name,
          base: s.base_stat,
        })),
      }),
    }),
  }),
});
export const {
  useGetAllPokemonsQuery,
  useGetPokemonByNameQuery,
  useGetPokemonByIdQuery,
} = pokemonApi;
