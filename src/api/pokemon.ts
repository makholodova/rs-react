import type {
  CardProps,
  NamedAPIResource,
  PokemonDetailProps,
  RawPokemon,
} from 'types/components.ts';

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'https://pokeapi.co/api/v2';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
  endpoints: (build) => ({
    getAllPokemon: build.query<
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
  useGetAllPokemonQuery,
  useGetPokemonByNameQuery,
  useGetPokemonByIdQuery,
} = pokemonApi;
