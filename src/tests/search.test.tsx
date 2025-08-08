import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import Search from '../components/Search/Search';

describe('Search component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders with initial search prop', () => {
    render(<Search search="pikachu" onSearchChange={() => {}} />);
    const input = screen.getByPlaceholderText(
      /Enter the full name of the pokemon.../i
    );
    expect(input).toHaveValue('pikachu');
  });

  it('updates state on input change', () => {
    render(<Search search="" onSearchChange={() => {}} />);
    const input = screen.getByPlaceholderText(
      /Enter the full name of the pokemon.../i
    );

    fireEvent.change(input, { target: { value: 'bulbasaur' } });

    expect(input).toHaveValue('bulbasaur');
  });

  it('calls onSearchChange with trimmed value on submit', () => {
    const onSearchChange = vi.fn();
    render(<Search search="" onSearchChange={onSearchChange} />);

    const input = screen.getByPlaceholderText(
      /Enter the full name of the pokemon.../i
    );
    fireEvent.change(input, { target: { value: ' charmander  ' } });

    const form = input.closest('form');
    expect(form).not.toBeNull();
    fireEvent.submit(form as HTMLFormElement);

    expect(onSearchChange).toHaveBeenCalledWith('charmander');
  });

  it('updates internal state if search prop changes', () => {
    const { rerender } = render(
      <Search search="first" onSearchChange={() => {}} />
    );
    const input = screen.getByPlaceholderText(
      /Enter the full name of the pokemon.../i
    );
    expect(input).toHaveValue('first');

    rerender(<Search search="second" onSearchChange={() => {}} />);
    expect(input).toHaveValue('second');
  });
});
