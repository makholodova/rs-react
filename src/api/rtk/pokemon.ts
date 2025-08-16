import {
  CardProps,
  RawPokemon,
  PokemonDetailProps,
} from '@/types/components.js';

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { NamedAPIResource } from '@/types/components.js';

const BASE_URL = 'https://pokeapi.co/api/v2';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
  keepUnusedDataFor: 300,
  tagTypes: ['Pokemon', 'PokemonList'],
  endpoints: (build) => ({
    getAllPokemon: build.query<
      { items: CardProps[]; count: number },
      { offset: number; limit: number }
    >({
      query: ({ offset = 0, limit = 20 }) =>
        `/pokemon?offset=${offset}&limit=${limit}`,
      transformResponse: (raw: {
        count: number;
        results: NamedAPIResource[];
      }): { items: CardProps[]; count: number } => ({
        count: raw?.count ?? 0,
        items: (raw?.results ?? []).map(({ name, url }) => {
          const id = Number(url.match(/\/pokemon\/(\d+)\//)?.[1] ?? 0);
          return { id, name };
        }),
      }),
      providesTags: () => [{ type: 'PokemonList', id: 'LIST' } as const],
    }),

    getPokemonByName: build.query<CardProps, string>({
      query: (name) => `pokemon/${name.toLowerCase()}`,
      transformResponse: (raw: RawPokemon): CardProps => ({
        id: raw.id,
        name: raw.name,
      }),
      providesTags: (_result, _error, name) => [{ type: 'Pokemon', id: name }],
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
      providesTags: (_result, _error, id) => [{ type: 'Pokemon', id }],
    }),
  }),
});
export const {
  useGetPokemonByNameQuery,
  useGetPokemonByIdQuery,
  useGetAllPokemonQuery,
} = pokemonApi;
