import type { JSX } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Card from '../components/Card/Card';
import { MemoryRouter } from 'react-router-dom';
import store from '../store/store.ts';
import { Provider } from 'react-redux';

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

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual =
    await vi.importActual<typeof import('react-router-dom')>(
      'react-router-dom'
    );
  return {
    ...actual,
    useNavigate: (): typeof mockNavigate => mockNavigate,
    useLocation: (): Partial<Location> => ({
      search: '?page=3',
      pathname: '/main',
      hash: '',
    }),
  };
});

describe('Card component', () => {
  it('Circle  is renders name ang description', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Card name="pikachu" id={1} weight={5} height={604} />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByText(/pikachu/i)).toBeInstanceOf(HTMLElement);
    expect(screen.getByText(/weight: 5/i)).toBeInstanceOf(HTMLElement);
    expect(screen.getByText(/height: 604/i)).toBeInstanceOf(HTMLElement);
    expect(screen.getByTestId('circle-loader')).toBeInTheDocument();
  });

  it('shows image after it loads', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Card name="bulbasaur" id={2} weight={10} height={999} />
        </Provider>
      </MemoryRouter>
    );
    const image = screen.getByAltText(/bulbasaur/i);
    expect(image).toHaveStyle('display: none');
    fireEvent.load(image);

    expect(image).toHaveStyle({ display: 'block' });
  });

  it('calls navigate with correct URL on card click', () => {
    render(
      <Provider store={store}>
        <Card name="bulbasaur" id={1} weight={5} height={10} />{' '}
      </Provider>
    );

    const card = screen
      .getByRole('heading', { name: /bulbasaur/i })
      .closest('.card');
    expect(card).not.toBeNull();
    fireEvent.click(card as HTMLElement);

    expect(mockNavigate).toHaveBeenCalledWith('/pokemon/1?page=3');
  });
});
