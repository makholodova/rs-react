import { Component, type ErrorInfo } from 'react';
import type {
  ErrorBoundaryProps,
  ErrorBoundaryState,
} from 'types/components.ts';
import BaseButton from 'components/ui/BaseButton/BaseButton.tsx';
import './ErrorBoundary.css';

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
      return (
        <div className="error-boundary">
          <h2 className="error-boundary__message">
            Sorry. Something went wrong...
            <br />
            Please, reload the page
          </h2>
          <BaseButton
            onClick={this.handleReload}
            className="error-boundary__button"
          >
            Reset
          </BaseButton>
        </div>
      );
    }
    return this.props.children;
  }
}
