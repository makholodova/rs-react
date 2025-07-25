import type { ReactNode } from 'react';

export interface SearchProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export type NamedAPIResource = {
  name: string;
  url: string;
};

export interface CardProps {
  name: string;
  id: number;
  height: number;
  weight: number;
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
