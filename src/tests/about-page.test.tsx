import AboutPage from '../pages/AboutPage/AboutPage';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

describe('AboutPage component', () => {
  it('AboutPage  is renders correctly', () => {
    render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>
    );
    const aboutPage = screen.getByTestId('about-page');
    expect(aboutPage).toBeInstanceOf(HTMLDivElement);
  });
});
