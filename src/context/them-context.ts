import { createContext } from 'react';
import type { ThemeContextType } from 'types/components.ts';

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  setTheme: () => {},
});
export default ThemeContext;
