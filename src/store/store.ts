import { configureStore } from '@reduxjs/toolkit';
import selectedItemsReducer from './selectedItemsSlice';

const store = configureStore({
  reducer: {
    selectedItems: selectedItemsReducer,
  },
});

export default store;

export type StoreState = ReturnType<typeof store.getState>;
