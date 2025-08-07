import { describe, expect, it } from 'vitest';
import {
  pokemonApi,
  useGetAllPokemonQuery,
  useGetPokemonByNameQuery,
  useGetPokemonByIdQuery,
} from 'api/pokemon.ts';
import { setupApiStore } from './setupApiStore.tsx';
import { renderHook, waitFor } from '@testing-library/react';

describe('Pokemon api', () => {
  it('getAll: fetches and returns list of pokemons', async () => {
    const { wrapper } = setupApiStore(pokemonApi);

    const { result } = renderHook(
      () => useGetAllPokemonQuery({ offset: 0, limit: 2 }),
      { wrapper }
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });
    expect(result.current.data?.results.length).toBe(2);
  });
  it('getByName: returns pikachu card data', async () => {
    const { wrapper } = setupApiStore(pokemonApi);

    const { result } = renderHook(() => useGetPokemonByNameQuery('pikachu'), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual({
      id: 25,
      name: 'pikachu',
    });
  });

  it('getById: returns pikachu full details', async () => {
    const { wrapper } = setupApiStore(pokemonApi);

    const { result } = renderHook(() => useGetPokemonByIdQuery(25), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data?.name).toBe('pikachu');
    expect(result.current.data?.types).toContain('electric');
  });
});
