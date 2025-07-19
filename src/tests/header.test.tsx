import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Header from '../components/Header/Header';
import type { JSX } from 'react';
vi.mock('components/Search/Search', () => ({
  default: ({
    search,
    onSearchChange,
  }: {
    search: string;
    onSearchChange: (val: string) => void;
  }): JSX.Element => (
    <div data-testid="search" onClick={() => onSearchChange('mocked')}>
      Search: {search}
    </div>
  ),
}));

describe('Header component', () => {
  it('renders logo and search input', () => {
    render(<Header search="pikachu" onSearchChange={() => {}} />);

    const logo = screen.getByAltText('Logo');
    expect(logo).toBeInTheDocument();

    const search = screen.getByTestId('search');
    expect(search).toBeInTheDocument();
    expect(search).toHaveTextContent('pikachu');
  });
});
