import { Component, type ErrorInfo, type ReactNode } from 'react';
import {
  ErrorBoundaryProps,
  ErrorBoundaryState,
} from '../../types/components.ts';
import Fallback from './Fallback.tsx';

export default class ErrorBoundary extends Component<ErrorBoundaryProps> {
  state: ErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  handleReload = (): void => {
    window.location.reload();
  };

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Error:', error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return <Fallback onReload={this.handleReload} />;
    }
    return this.props.children;
  }
}
