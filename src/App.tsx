import type { FC } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary.tsx';
import AppRoutes from './router';
import Header from 'components/Header/Header.tsx';

const App: FC = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Header />
        <AppRoutes />
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default App;
