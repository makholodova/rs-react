import type { JSX } from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import CardList from '../components/CardList/CardList';

vi.mock('components/PokemonLoader/PokemonLoader', () => ({
  default: (): JSX.Element => <div data-testid="pokemon-loader" />,
}));

vi.mock('components/Card/Card.tsx', () => ({
  default: ({ name }: { name: string }): JSX.Element => (
    <div data-testid="card">{name}</div>
  ),
}));

describe('CardList  component', () => {
  it('renders loader when loading is true', () => {
    render(
      <CardList search="" items={[]} loading={true} isFetchError={false} />
    );
    expect(screen.getByTestId('pokemon-loader')).toBeInTheDocument();
  });

  it('renders error  massage when  message when isFetchError is true', () => {
    render(
      <CardList search="" items={[]} loading={false} isFetchError={true} />
    );
    expect(screen.getByText('Something went wrong..')).toBeInTheDocument();
  });

  it('renders "no results" message when no items and not loading', () => {
    render(
      <CardList
        search="pikachu"
        items={[]}
        loading={false}
        isFetchError={false}
      />
    );
    expect(
      screen.getByText('No results found for "pikachu"')
    ).toBeInTheDocument();
  });

  it('renders cards when items are present', () => {
    const items = [
      {
        name: 'pikachu',
        id: 1,
        height: 4,
        weight: 60,
      },
      {
        name: 'bulbasaur',
        id: 2,
        height: 7,
        weight: 80,
      },
    ];

    render(
      <CardList search="" items={items} loading={false} isFetchError={false} />
    );
    const cards = screen.getAllByTestId('card');

    expect(cards.length).toBe(2);
    expect(cards[0]).toHaveTextContent('pikachu');
    expect(cards[1]).toHaveTextContent('bulbasaur');
  });
});
