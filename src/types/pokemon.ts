import type { ReactNode } from 'react';

export interface PokemonListItem {
  name: string;
  id: number;
  height: number;
  weight: number;
  url?: string;
}

export interface ErrorBoundaryProps {
  children: ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
}
