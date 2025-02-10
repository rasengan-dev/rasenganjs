import type { FunctionComponent, ComponentType, ComponentProps } from 'react';
import { Suspense, lazy } from 'react';

type DynamicComponent<T extends ComponentType<any>> = FunctionComponent<
  ComponentProps<T>
>;

/**
 * It allows you to defer loading of Client Components,
 * and only include them in the client bundle when they're needed
 * @param load
 * @param fallback
 * @returns
 */
export function dynamicLoad<T extends ComponentType<any>>(
  load: () => Promise<{
    default: T;
  }>,
  fallback = <></> // Default pending UI element
) {
  try {
    const LazyComponent = lazy(load);

    // Return a functional component preserving the exact props type
    const WrappedComponent: DynamicComponent<T> = (props) => (
      <Suspense fallback={fallback}>
        <LazyComponent {...props} />
      </Suspense>
    );

    return WrappedComponent;
  } catch (error) {
    throw new Error(error);
  }
}
