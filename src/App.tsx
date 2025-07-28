import { type FC, useState } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary.tsx';
import AppRoutes from './router';
import Header from 'components/Header/Header.tsx';
import ThemeContext from './context/them-context.ts';

const App: FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  return (
    <ThemeContext value={{ theme, setTheme }}>
      <BrowserRouter>
        <div className={`app ${theme}`}>
          <ErrorBoundary>
            <Header />
            <AppRoutes />
          </ErrorBoundary>
        </div>
      </BrowserRouter>
    </ThemeContext>
  );
};

export default App;
