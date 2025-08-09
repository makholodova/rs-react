import { describe, expect, it, afterEach } from 'vitest';
import {
  pokemonApi,
  useGetAllPokemonQuery,
  useGetPokemonByNameQuery,
  useGetPokemonByIdQuery,
} from 'api/pokemon.ts';
import { setupApiStore } from './setupApiStore.tsx';
import { act, renderHook, waitFor } from '@testing-library/react';

afterEach(() => {
  vi.clearAllMocks();
});

describe('Pokemon api', () => {
  it('getAll: fetches and returns list of pokemons', async () => {
    const { wrapper, store } = setupApiStore(pokemonApi);
    const { result, unmount } = renderHook(
      () => useGetAllPokemonQuery({ offset: 0, limit: 2 }),
      { wrapper }
    );

    await waitFor(() => {
      expect(result.current.data).toBeTruthy();
    });
    expect(result.current.data?.results.length).toBe(2);

    unmount();
    act(() => {
      store.dispatch(pokemonApi.util.resetApiState());
    });
  });

  it('getByName: returns pikachu card data', async () => {
    const { wrapper, store } = setupApiStore(pokemonApi);
    const { result, unmount } = renderHook(
      () => useGetPokemonByNameQuery('pikachu'),
      {
        wrapper,
      }
    );

    await waitFor(() => {
      expect(result.current.data).toBeTruthy();
    });
    expect(result.current.data).toEqual({
      id: 25,
      name: 'pikachu',
    });
    unmount();
    act(() => {
      store.dispatch(pokemonApi.util.resetApiState());
    });
  });

  it('getById: returns pikachu full details', async () => {
    const { wrapper, store } = setupApiStore(pokemonApi);

    const { result, unmount } = renderHook(() => useGetPokemonByIdQuery(25), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data?.name).toBe('pikachu');
    expect(result.current.data?.types).toContain('electric');
    unmount();
    act(() => {
      store.dispatch(pokemonApi.util.resetApiState());
    });
  });
});
