import React from 'react';
import type { Metadata } from 'next';
import './index.css';

export const metadata: Metadata = {
  title: 'Pokémon',
  description: 'Pokédex App',
  icons: {
    icon: 'https://assets.pokemon.com/static2/_ui/img/favicon.ico',
  },
};

const LocaleLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;

  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
};

export default LocaleLayout;
