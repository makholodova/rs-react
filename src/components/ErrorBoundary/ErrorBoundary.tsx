import { Component, type ErrorInfo } from 'react';
import type {
  ErrorBoundaryProps,
  ErrorBoundaryState,
} from 'types/components.ts';
import Fallback from 'components/ErrorBoundary/Fallback.tsx';

export default class ErrorBoundary extends Component<ErrorBoundaryProps> {
  state: ErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  handleReload = () => {
    window.location.reload();
  };

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <Fallback onReload={this.handleReload} />;
    }
    return this.props.children;
  }
}
