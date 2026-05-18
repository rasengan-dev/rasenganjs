import { Component, type ErrorInfo, type ReactNode } from 'react';
import { errorStore } from './error-store.js';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundaryFallback extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    errorStore.addError(error, 'react', info.componentStack);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      if (
        typeof process !== 'undefined' &&
        process.env?.NODE_ENV === 'production'
      ) {
        return (
          <section
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 100,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
              width: '100vw',
              gap: 10,
              backgroundColor: '#fff',
            }}
          >
            <p
              style={{
                fontSize: '18px',
              }}
            >
              Application Error
            </p>
          </section>
        );
      }
      return null;
    }
    return this.props.children;
  }
}
