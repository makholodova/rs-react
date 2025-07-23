import type { ReactNode } from 'react';

export interface AppState extends SearchState {
  isSearchReady: boolean;
}

export interface HeaderProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export interface MainProps {
  search: string;
}

export interface SearchProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export interface SearchState {
  search: string;
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
