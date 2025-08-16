import React from 'react';
import type { Metadata } from 'next';
import Providers from '@/providers';
import Header from '@/components/Header/Header';

import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { routing } from '@/i18n/routing.ts';
import { notFound } from 'next/navigation';

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
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <Providers>
      <NextIntlClientProvider>
        <Header />
        {children}
      </NextIntlClientProvider>
    </Providers>
  );
};

export default LocaleLayout;
