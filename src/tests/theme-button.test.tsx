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

  it("call setTheme with 'light'  when current them is 'dark' ", () => {
    const mockSetTheme = vi.fn();

    render(
      <ThemeContext value={{ theme: 'dark', setTheme: mockSetTheme }}>
        <ThemeButton />
      </ThemeContext>
    );

    const button = screen.getByRole('button');
    button.click();
    expect(mockSetTheme).toHaveBeenCalledWith('light');
  });

  it("call setTheme with 'dark'  when current them is 'light' ", () => {
    const mockSetTheme = vi.fn();

    render(
      <ThemeContext value={{ theme: 'light', setTheme: mockSetTheme }}>
        <ThemeButton />
      </ThemeContext>
    );

    const button = screen.getByRole('button');
    button.click();
    expect(mockSetTheme).toHaveBeenCalledWith('dark');
  });
});
