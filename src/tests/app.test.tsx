import type { JSX } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import App from '../App';

vi.mock('components/Header/Header', () => ({
  default: ({
    search,
    onSearchChange,
  }: {
    search: string;
    onSearchChange: (val: string) => void;
  }): JSX.Element => (
    <div data-testid="header" onClick={() => onSearchChange('pikachu')}>
      Header: {search}
    </div>
  ),
}));

vi.mock(
  'components/Main/Main',
  (): Record<string, unknown> => ({
    default: ({ search }: { search: string }) => (
      <div data-testid="main">Main: {search}</div>
    ),
  })
);

describe('App component', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('renders Header and Main after search is ready', async () => {
    localStorage.setItem('search-makholodova', JSON.stringify('bulbasaur'));
    render(<App />);
    await waitFor(() => {
      expect(screen.getByTestId('header')).toBeInTheDocument();
      expect(screen.getByTestId('main')).toHaveTextContent('bulbasaur');
    });
  });

  it('handleSearchChange updates state and localStorage', async () => {
    render(<App />);

    const header = screen.getByTestId('header');

    header.click();

    await waitFor(() => {
      expect(localStorage.getItem('search-makholodova')).toBe('"pikachu"');
      expect(screen.getByTestId('main')).toHaveTextContent('pikachu');
    });
  });
});
