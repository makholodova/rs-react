import reducer, {
  selectedItem,
  unselectedItem,
  clearSelection,
} from '../store/selectedItemsSlice';
import type { CardProps } from 'types/components.ts';

describe('selectedItemsSlice', () => {
  const sampleItem: CardProps = {
    id: 1,
    name: 'Pikachu',
  };

  it('should add an item if it is not already selected', () => {
    const prevState = { items: [] };
    const nextState = reducer(prevState, selectedItem(sampleItem));
    expect(nextState.items).toHaveLength(1);
    expect(nextState.items[0]).toEqual(sampleItem);
  });

  it('should not add an item if it is already selected', () => {
    const prevState = { items: [sampleItem] };
    const nextState = reducer(prevState, selectedItem(sampleItem));
    expect(nextState.items).toHaveLength(1);
  });

  it('should remove an item by id', () => {
    const prevState = { items: [sampleItem] };
    const nextState = reducer(prevState, unselectedItem({ id: 1 }));
    expect(nextState.items).toHaveLength(0);
  });

  it('should clear all selected items', () => {
    const prevState = { items: [sampleItem] };
    const nextState = reducer(prevState, clearSelection());
    expect(nextState.items).toHaveLength(0);
  });
});
