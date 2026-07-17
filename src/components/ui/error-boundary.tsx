"use client";

import { Component, type ReactNode, type ErrorInfo } from "react";
import { Button } from "./button";
import { AlertCircle } from "lucide-react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(_error: Error): ErrorBoundaryState {
    return { hasError: true, error: _error };
  }

  componentDidCatch(_error: Error, _info: ErrorInfo) {}

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="bg-danger-50 dark:bg-danger-950/30 rounded-full p-4">
              <AlertCircle className="text-danger-500 h-8 w-8" />
            </div>
            <div>
              <p className="text-text-primary text-lg font-medium">
                Something went wrong
              </p>
              <p className="text-text-tertiary mt-1 text-sm">
                {this.state.error?.message ?? "An unexpected error occurred"}
              </p>
            </div>
            <Button variant="secondary" onClick={this.handleRetry}>
              Try Again
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
