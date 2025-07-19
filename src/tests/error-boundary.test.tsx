import type { JSX } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';

const ProblemChild = (): JSX.Element => {
  throw new Error('ErrorBoundary!');
};

describe('ErrorBoundary component', () => {
  it('renders children when no error occurs', () => {
    render(
      <ErrorBoundary>
        <div>Safe content</div>
      </ErrorBoundary>
    );
    expect(screen.getByText('Safe content')).toBeInTheDocument();
  });

  it('shows fallback UI when error is thrown', () => {
    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );

    expect(
      screen.getByText(/sorry\. something went wrong/i)
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument();
  });
  it('calls window.location.reload when reset button is clicked', () => {
    const reloadMock = vi.fn();

    Object.defineProperty(window, 'location', {
      value: { ...window.location, reload: reloadMock },
      writable: true,
      configurable: true,
    });

    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );

    const button = screen.getByRole('button', { name: /reset/i });
    fireEvent.click(button);
    expect(reloadMock).toHaveBeenCalled();
  });
});
