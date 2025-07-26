import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Header from '../components/Header/Header';
import { MemoryRouter } from 'react-router-dom';

describe('Header component', () => {
  it('renders logo and buttons', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const logo = screen.getByAltText('Logo');
    expect(logo).toBeInTheDocument();

    const mainLink = screen.getByRole('link', { name: /main/i });
    expect(mainLink).toBeInTheDocument();

    const aboutLink = screen.getByRole('link', { name: /about/i });
    expect(aboutLink).toBeInTheDocument();
  });
});
