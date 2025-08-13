import { createContext } from 'react';
import { ThemeContextType } from '@/types/components';

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  setTheme: () => {},
});
export default ThemeContext;
