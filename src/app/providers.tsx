'use client';
import { ReactNode, StrictMode, useState } from 'react';
import { Provider } from 'react-redux';
import store from '@/store/store';
import ThemeContext from '@/context/them-context';

const Providers = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  return (
    <StrictMode>
      <Provider store={store}>
        <ThemeContext value={{ theme, setTheme }}>
          <div className={`app ${theme}`}>{children}</div>
        </ThemeContext>
      </Provider>
    </StrictMode>
  );
};

export default Providers;
