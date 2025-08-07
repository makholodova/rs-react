import { render, screen } from '@testing-library/react';

import { Provider } from 'react-redux';

import { BrowserRouter } from 'react-router-dom';
import Main from '../pages/MainPage/MainPage.tsx';
import store from '../store/store.ts';

test('renders component Main', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </Provider>
  );

  expect(screen.getByRole('main')).toBeInTheDocument();
});
