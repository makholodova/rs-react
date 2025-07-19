import PokemonLoader from '../components/PokemonLoader/PokemonLoader';
import { render, screen } from '@testing-library/react';

import { describe, it, expect } from 'vitest';

describe('Pokemon loader component', () => {
  it('Pokemon loader is renders correctly', () => {
    render(<PokemonLoader />);
    const loader = screen.getByTestId('pokemon-loader');
    expect(loader).toBeInstanceOf(HTMLDivElement);
  });
});
