import Flyout from '../components/Flyout/Flyout';
import { render, screen } from '@testing-library/react';

import { describe, it, expect } from 'vitest';
import { Provider } from 'react-redux';
import { mockStore } from './mocks.ts';

URL.createObjectURL = vi.fn();

describe('Flyout component', () => {
  it('Flyout does not render when there are no selected items', () => {
    const store = mockStore({ selectedItems: { items: [] } });
    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    const selectedCards = screen.queryByText(/Selected cards/i);
    expect(selectedCards).not.toBeInTheDocument();
  });
  it('Flyout renders with selected items count', () => {
    const store = mockStore({
      selectedItems: {
        items: [{ name: 'Pikachu', id: 1, height: 125, weight: 30 }],
      },
    });
    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    expect(screen.queryByText(/Selected cards/i)).toBeInTheDocument();
    expect(screen.queryByText('1')).toBeInTheDocument();
  });
});
