import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../App';

describe('App component', () => {
  it('renders Header with links', () => {
    render(<App />);

    expect(screen.getByAltText(/logo/i)).toBeInTheDocument();

    expect(screen.getByRole('link', { name: /main/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
  });

  it('renders NotFound page for unknown route', () => {
    window.history.pushState({}, '', '/some-unknown-page');
    render(<App />);

    expect(screen.getByText(/not found/i)).toBeInTheDocument();
  });
});
