import type { ReactNode } from 'react';

export type NamedAPIResource = {
  name: string;
  url: string;
};

export interface CardProps {
  name: string;
  id: number;
  url?: string;
}

export interface PokemonDetailProps {
  name: string;
  id: number;
  height: number;
  weight: number;
  types: string[];
  image: string;
  abilities: string[];
  stats: { name: string; base: number }[];
}

export interface RawPokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  types: { type: { name: string } }[];
  abilities: { ability: { name: string } }[];
  stats: { stat: { name: string }; base_stat: number }[];
}

export interface SearchProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export interface CardListProps {
  items: CardProps[];
  loading: boolean;
  isFetchError: boolean;
  search?: string;
}

export interface ErrorBoundaryProps {
  children: ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
}

export type FallbackProps = {
  onReload: () => void;
};

export type Theme = 'light' | 'dark';

export interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}
