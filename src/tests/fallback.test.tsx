import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Fallback from '../components/ErrorBoundary/Fallback';

describe('Fallback component', () => {
  it('renders error message and reset button', () => {
    const mockReload = vi.fn();
    render(<Fallback onReload={mockReload} />);
    expect(
      screen.getByText(/Sorry\. Something went wrong\.\.\./i)
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument();
  });
});
