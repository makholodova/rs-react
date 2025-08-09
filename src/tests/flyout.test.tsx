import { describe, it, expect } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { mockStore } from './mocks.ts';
import Flyout from '../components/Flyout/Flyout';

URL.createObjectURL = vi.fn();

describe('Flyout component', () => {
  afterAll(() => {
    vi.restoreAllMocks();
  });

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
        items: [{ name: 'Pikachu', id: 1 }],
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

  it('handleUnselectAll dispatches clearSelection', () => {
    const store = mockStore({
      selectedItems: { items: [{ name: 'Pikachu', id: 1 }] },
    });

    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    expect(screen.getByText(/Selected cards:/i)).toBeInTheDocument();

    const btn = screen.getByRole('button', { name: /unselect all/i });
    fireEvent.click(btn);

    expect(screen.queryByText(/Selected cards:/i)).not.toBeInTheDocument();
  });
});
