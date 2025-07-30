import { configureStore } from '@reduxjs/toolkit';
import selectedItemsReducer from '../store/selectedItemsSlice.ts';
import type { CardProps } from 'types/components.ts';

interface RootState {
  selectedItems: { items: CardProps[] };
}

export function mockStore(preloadedState: RootState) {
  return configureStore({
    reducer: { selectedItems: selectedItemsReducer },
    preloadedState,
  });
}
