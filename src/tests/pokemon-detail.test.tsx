import { render, screen } from '@testing-library/react';

import { Provider } from 'react-redux';

import { MemoryRouter, Route, Routes } from 'react-router-dom';
import store from '../store/store.ts';
import PokemonDetail from 'components/PokemonDetail/PokemonDetail.tsx';

test('renders Pokémon details after loading', () => {
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/pokemon/25']}>
        <Routes>
          <Route path="/pokemon/:id" element={<PokemonDetail />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );

  expect(screen.getByTestId('pokemon-loader')).toBeInTheDocument();
});
