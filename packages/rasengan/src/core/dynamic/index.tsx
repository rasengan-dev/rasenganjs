import type { FunctionComponent, ComponentType, ComponentProps } from 'react';
import { Suspense, lazy } from 'react';
import { Module, RouteNode } from '../../routing/utils';

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

/**
 * It allows you to defer loading of page components,
 * and only include them in the client bundle when they're needed
 * @param filePath Path to the page component we want to load lazily
 * @returns
 */
export function lazyLoadPage(routePath: string, filePath: string) {
  // use import.meta.glob with a fixed pattern that covers your pages
  const modules = import.meta.glob(
    '/src/app/**/*.{js,ts,jsx,tsx,md,mdx}'
  ) as Record<string, () => Promise<Module>>;

  // if started with ./ then removed it
  const normalizePath = filePath.startsWith('./')
    ? filePath.slice(2)
    : filePath;

  // Get the full path from the modules object
  const fullPath = Object.keys(modules).find((key) =>
    key.endsWith(normalizePath)
  );

  if (!fullPath) {
    throw new Error(
      `[rasengan lazyLoad]: No module found for path "${filePath}". Did you include it in the glob?`
    );
  }

  const loader = modules[fullPath];
  if (!loader) {
    throw new Error(
      `[rasengan lazyLoad]: No module found for path "${filePath}". Did you include it in the glob?`
    );
  }

  const page = {
    path: routePath,
    fullPath,
    segment: routePath, // TODO: Handle segments
    module: loader,
    source: filePath,
    isLayout: false,
  } satisfies RouteNode;

  return page;
}
