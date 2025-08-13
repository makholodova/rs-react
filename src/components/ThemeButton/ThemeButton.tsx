'use client';

import { type FC, useContext } from 'react';
import ThemeContext from '@/context/theme-context';
import BaseButton from '@/components/ui/BaseButton/BaseButton';
import MoonIcon from '@/assets/moon.svg';
import SunIcon from '@/assets/sun.svg';
import styles from './ThemeButton.module.css';

const ThemeButton: FC = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = (): void => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <BaseButton className={styles['theme-toggle']} onClick={toggleTheme}>
      {theme === 'light' ? (
        <MoonIcon
          data-testid="moon-icon"
          className={styles['theme-toggle__icon']}
        />
      ) : (
        <SunIcon
          data-testid="sun-icon"
          className={styles['theme-toggle__icon']}
        />
      )}
    </BaseButton>
  );
};

export default ThemeButton;
