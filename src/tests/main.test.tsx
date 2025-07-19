import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import Main from '../components/Main/Main';
import PokemonService from 'api/pokemon.ts';
import type { CardProps } from 'types/components';

vi.mock('api/pokemon.ts');

const mockPokemon: CardProps[] = [
  { name: 'pikachu', id: 25, height: 4, weight: 60 },
  { name: 'bulbasaur', id: 1, height: 7, weight: 69 },
];

const mockGetAll = PokemonService.getAll as Mock;
const mockSearch = PokemonService.searchByPartialName as Mock;

describe('Main component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it('should show loader during initial fetch', async () => {
    mockGetAll.mockResolvedValue(mockPokemon);

    render(<Main search="" />);

    expect(screen.getByTestId('pokemon-loader')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByTestId('pokemon-loader')).not.toBeInTheDocument();
    });

    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
    expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
  });

  it('should call search API when "search" prop changes', async () => {
    mockSearch.mockResolvedValue([
      { name: 'bulbasaur', id: 1, height: 7, weight: 69 },
    ]);

    const { rerender } = render(<Main search="pika" />);

    expect(mockSearch).toHaveBeenCalledWith('pika');

    rerender(<Main search="bulba" />);

    await waitFor(() => {
      expect(mockSearch).toHaveBeenCalledWith('bulba');
    });
  });
});
