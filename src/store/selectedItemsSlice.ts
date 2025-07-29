import { createSlice } from '@reduxjs/toolkit';
import type { CardProps } from 'types/components.ts';

interface SelectedItemsState {
  items: CardProps[];
}

const initialState: SelectedItemsState = { items: [] };

const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    selectedItem: (state, action) => {
      if (!state.items.find((item) => item.id === action.payload.id)) {
        state.items.push(action.payload);
      }
    },
    unselectedItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    clearSelection: (state) => {
      state.items = [];
    },
  },
});

export const { selectedItem, unselectedItem, clearSelection } =
  selectedItemsSlice.actions;

export default selectedItemsSlice.reducer;
