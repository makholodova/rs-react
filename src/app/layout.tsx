import React from 'react';
import type { Metadata } from 'next';
import Providers from '@/providers';
import Header from '@/components/Header/Header';
import './index.css';

export const metadata: Metadata = {
  title: 'Pokémon',
  description: 'Pokédex App',
  icons: {
    icon: 'https://assets.pokemon.com/static2/_ui/img/favicon.ico',
  },
};

const LocaleLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
};

export default LocaleLayout;
