import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

describe('NotFoundPage component', () => {
  it('NotFoundPage  is renders correctly', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );
    const notFoundPage = screen.getByTestId('not-found-page');
    expect(notFoundPage).toBeInstanceOf(HTMLDivElement);
  });
});
