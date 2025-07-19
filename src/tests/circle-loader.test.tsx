import CircleLoader from '../components/CircleLoader/CircleLoader';
import { render, screen } from '@testing-library/react';

import { describe, it, expect } from 'vitest';

describe('Circle loader component', () => {
  it('Circle loader is renders correctly', () => {
    render(<CircleLoader />);
    const loader = screen.getByTestId('circle-loader');
    expect(loader).toBeInstanceOf(HTMLDivElement);
  });
});
