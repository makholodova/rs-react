import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter, type NavigateFunction } from 'react-router-dom';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';

vi.mock('react-router-dom', async () => {
  const mod =
    await vi.importActual<typeof import('react-router-dom')>(
      'react-router-dom'
    );
  return {
    ...mod,
    useNavigate: (): NavigateFunction => navigateMock,
  };
});

const navigateMock = vi.fn();

describe('NotFoundPage component', () => {
  it('NotFoundPage  is renders correctly', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );
    const notFoundPage = screen.getByTestId('not-found-page');
    expect(notFoundPage).toBeInTheDocument();
  });

  it('navigate to homepage on button click', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );

    const button = screen.getByRole('button', { name: /Go to Homepage/i });
    fireEvent.click(button);
    expect(navigateMock).toHaveBeenCalled();
  });
});
