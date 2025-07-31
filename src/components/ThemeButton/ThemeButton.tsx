import { type FC, useContext } from 'react';
import BaseButton from 'components/ui/BaseButton/BaseButton.tsx';
import MoonIcon from '../../assets/moon.svg?react';
import SunIcon from '../../assets/sun.svg?react';
import './ThemeButton.css';
import ThemeContext from '../../context/them-context.ts';

const ThemeButton: FC = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const toggleTheme = (): void => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  return (
    <BaseButton className="theme-toggle" onClick={toggleTheme}>
      {theme === 'light' ? (
        <MoonIcon data-testid="moon-icon" className="theme-toggle__icon" />
      ) : (
        <SunIcon data-testid="sun-icon" className="theme-toggle__icon" />
      )}
    </BaseButton>
  );
};

export default ThemeButton;
