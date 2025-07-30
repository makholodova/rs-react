import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import PokemonService from 'api/pokemon.ts';
import { MemoryRouter } from 'react-router-dom';

vi.mock('hooks/use-local-storage.ts', () => ({
  default: (): [string, () => void] => ['bulba', vi.fn()],
}));

vi.mock('api/pokemon.ts');
import Main from '../pages/MainPage/MainPage.tsx';
import { Provider } from 'react-redux';
import store from '../store/store.ts';

const mockGetAll = PokemonService.getAll as Mock;
const mockSearch = PokemonService.searchByPartialName as Mock;

describe('Main component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGetAll.mockResolvedValue([]);
    mockSearch.mockResolvedValue([]);
  });

  it('should show loader during initial fetch', async (): Promise<void> => {
    mockSearch.mockResolvedValue([
      { name: 'bulbasaur', id: 1, height: 7, weight: 69 },
    ]);

    render(
      <MemoryRouter initialEntries={['/']}>
        <Provider store={store}>
          <Main />
        </Provider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(mockSearch).toHaveBeenCalledWith('bulba');
    });

    expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
  });

  it('should call search API when search from localStorage is "bulba"', async () => {
    mockSearch.mockResolvedValue([
      { name: 'bulbasaur', id: 1, height: 7, weight: 69 },
    ]);

    render(
      <MemoryRouter>
        <Provider store={store}>
          <Main />
        </Provider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(mockSearch).toHaveBeenCalledWith('bulba');
    });
    expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
  });
});
