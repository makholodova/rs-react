import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import PokemonDetail from '../components/PokemonDetail/PokemonDetail';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import PokemonService from 'api/pokemon';

vi.mock('api/pokemon');

const mockPokemon = {
  name: 'pikachu',
  id: 25,
  image: 'https://img.pokemon.fake/25.png',
  height: 4,
  weight: 60,
  types: ['electric'],
  abilities: ['static', 'lightning-rod'],
  stats: [
    { name: 'speed', base: 90 },
    { name: 'attack', base: 55 },
  ],
};

describe('PokemonDetail component', () => {
  const mockGetById = PokemonService.getById as unknown as ReturnType<
    typeof vi.fn
  >;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders Pokémon details after loading', async () => {
    mockGetById.mockResolvedValueOnce(mockPokemon);

    render(
      <MemoryRouter initialEntries={['/pokemon/25']}>
        <Routes>
          <Route path="/pokemon/:id" element={<PokemonDetail />} />
        </Routes>
      </MemoryRouter>
    );

    await screen.findByText(/pikachu/i);
    expect(screen.getByText(/height: 4/i)).toBeInTheDocument();
    expect(screen.getByText(/weight: 60/i)).toBeInTheDocument();
    expect(screen.getByText(/electric/i)).toBeInTheDocument();
    expect(screen.getByText(/static, lightning-rod/i)).toBeInTheDocument();
    expect(screen.getByText(/speed: 90/i)).toBeInTheDocument();
  });
});
