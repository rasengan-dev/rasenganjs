import { useEffect, type ReactNode } from 'react';
import { ErrorBoundaryFallback } from './ErrorBoundaryFallback.js';
import { errorStore } from './error-store.js';
import { ErrorOverlay } from './ErrorOverlay.js';

interface Props {
  children: ReactNode;
  devMode: boolean;
}

export function ErrorOverlayProvider({ children, devMode }: Props) {
  useEffect(() => {
    if (!devMode) return;

    const onError = (event: ErrorEvent) => {
      errorStore.addError(event.error || new Error(event.message), 'global');
    };

    const onRejection = (event: PromiseRejectionEvent) => {
      const error =
        event.reason instanceof Error
          ? event.reason
          : new Error(String(event.reason));
      errorStore.addError(error, 'global');
    };

    window.addEventListener('error', onError);
    window.addEventListener('unhandledrejection', onRejection);

    const hot = (import.meta as { hot?: { on: Function; off: Function } }).hot;

    const handleViteError = (data: { err?: Error }) => {
      if (data?.err) {
        errorStore.addError(data.err, 'vite');
      }
    };

    if (typeof hot?.on === 'function') {
      hot.on('vite:error', handleViteError);
    }

    return () => {
      window.removeEventListener('error', onError);
      window.removeEventListener('unhandledrejection', onRejection);

      if (typeof hot?.off === 'function') {
        hot.off('vite:error', handleViteError);
      }
    };
  }, [devMode]);

  return (
    <>
      <ErrorBoundaryFallback>{children}</ErrorBoundaryFallback>
      {devMode && <ErrorOverlay />}
    </>
  );
}
