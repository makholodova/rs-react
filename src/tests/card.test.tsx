import type { JSX } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Card from '../components/Card/Card';

vi.mock('components/CircleLoader/CircleLoader', () => ({
  default: (): JSX.Element => <div data-testid="circle-loader" />,
}));

vi.mock(
  'units/generate-colors',
  (): Record<string, () => string> => ({
    getRandomColorRGB: () => 'rgb(255, 0, 0)',
  })
);

vi.mock(
  'units/pokemon-helpers',
  (): Record<string, (id: number) => string> => ({
    getPokemonImageUrl: (id: number) => `https://img.pokemon.fake/${id}.png`,
  })
);

describe('Card component', () => {
  it('Circle  is renders name ang description', () => {
    render(<Card name={'pikachu'} id={1} weight={5} height={604} />);

    expect(screen.getByText(/pikachu/i)).toBeInstanceOf(HTMLElement);
    expect(screen.getByText(/weight: 5/i)).toBeInstanceOf(HTMLElement);
    expect(screen.getByText(/height: 604/i)).toBeInstanceOf(HTMLElement);
    expect(screen.getByTestId('circle-loader')).toBeInTheDocument();
  });

  it('shows image after it loads', () => {
    render(<Card name="bulbasaur" id={2} weight={10} height={999} />);
    const image = screen.getByAltText(/bulbasaur/i);
    expect(image).toHaveStyle('display: none');
    fireEvent.load(image);

    expect(image).toHaveStyle({ display: 'block' });
  });
});
