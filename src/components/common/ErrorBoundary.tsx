import React, { Component, ErrorInfo, ReactNode } from 'react';
import { ApiError } from '../../services/api/base';

interface Props {
  children: ReactNode;
  fallback?: ReactNode | ((error: Error) => ReactNode);
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * ErrorBoundary component to catch JavaScript errors in child component tree
 * and display a fallback UI instead of crashing the entire app
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log the error to console
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    
    // Call the optional onError callback
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        if (typeof this.props.fallback === 'function') {
          return this.props.fallback(this.state.error!);
        }
        return this.props.fallback;
      }

      // Default fallback UI
      let errorMessage = 'An unexpected error occurred';
      
      // Handle API errors specifically
      if (this.state.error && 'status' in this.state.error) {
        const apiError = this.state.error as ApiError;
        
        switch (apiError.status) {
          case 401:
            errorMessage = 'You need to log in to access this resource';
            break;
          case 403:
            errorMessage = 'You do not have permission to access this resource';
            break;
          case 404:
            errorMessage = 'The requested resource was not found';
            break;
          case 500:
            errorMessage = 'Server error occurred. Please try again later';
            break;
          default:
            errorMessage = apiError.message || errorMessage;
        }
      } else if (this.state.error) {
        errorMessage = this.state.error.message || errorMessage;
      }

      return (
        <div className="p-4 border rounded-md bg-red-50 border-red-200">
          <h2 className="text-lg font-semibold text-red-700 mb-2">Something went wrong</h2>
          <p className="text-red-600">{errorMessage}</p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 