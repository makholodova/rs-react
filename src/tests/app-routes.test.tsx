import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AppRoutes from '../router';

it('renders About page', () => {
  render(
    <MemoryRouter initialEntries={['/about']}>
      <AppRoutes />
    </MemoryRouter>
  );

  expect(
    screen.getByRole('heading', { name: /марина холодова/i })
  ).toBeInTheDocument();
});
