import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ThemeButton from 'components/ThemeButton/ThemeButton.tsx';
import ThemeContext from '../context/them-context.ts';

describe('ThemeButton component', () => {
  it('renders MoonIcon when theme is light', () => {
    const mockSetTheme = vi.fn();

    render(
      <ThemeContext value={{ theme: 'light', setTheme: mockSetTheme }}>
        <ThemeButton />
      </ThemeContext>
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByTestId('moon-icon')).toBeInTheDocument();
  });

  it('renders SunIcon when theme is dark', () => {
    const mockSetTheme = vi.fn();

    render(
      <ThemeContext value={{ theme: 'dark', setTheme: mockSetTheme }}>
        <ThemeButton />
      </ThemeContext>
    );

    expect(screen.getByTestId('sun-icon')).toBeInTheDocument();
  });
});
