/// <reference types="vite/client" />
/// <reference types="../lib/types/index.d.ts" />

// Markdown files

declare module '*.mdx' {
  import { type MDXPageComponent } from '../lib/esm/index.js';

  let MDXComponent: MDXPageComponent;

  export default MDXComponent;
}

declare module '*.md' {
  import { type MDXPageComponent } from '../lib/esm/index.js';

  let MDXComponent: MDXPageComponent;

  export default MDXComponent;
}

// ?raw files

declare module '*.js?raw' {
  const value: string;
  export default value;
}

// Virtual modules

/**
 * virtual-rasengan-router.d.ts
 */
declare module 'virtual:rasengan:router' {
  import { RouterComponent } from '../lib/esm/routing/interfaces.js';

  // Define the type you expect Router to have.
  // Assuming flatRoutes returns a component
  const Router: RouterComponent;

  export default Router;
}

// declare module "virtual:rasengan-config" {
// 	import { type ProductionAppConfig } from "../lib/esm/core/config/types.js";

// 	export const __RASENGAN_CONFIG__: ProductionAppConfig;
// }

interface Window {
  __staticRouterHydrationData: any;
  __RASENGAN_SPA_MODE__: boolean;
}
