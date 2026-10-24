/**
 * Single source of truth for the Rasengan.js ecosystem as shown on the
 * marketing pages: the three framework layers, every published package, the
 * CLI tooling and the first-party products. The landing page registry, the
 * stack diagram, the skills page and the navbar all read from here, so adding
 * a package means editing this file only.
 */

/**
 * The layers of the stack. Each one maps to a `--layer-*` CSS token defined
 * in `styles/index.css` (exposed to Tailwind as `text-layer-*`, `bg-layer-*`).
 * `tooling` has no token on purpose: it uses the neutral foreground.
 */
export type Layer = 'rasengan' | 'futon' | 'server' | 'tooling';

/** Human labels and CSS color for each layer, used by `LayerChip`. */
export const LAYERS: Record<
  Layer,
  { name: string; short: string; color: string; tagline: string }
> = {
  rasengan: {
    name: 'Rasengan',
    short: 'frontend',
    color: 'var(--layer-rasengan)',
    tagline: 'The full-stack React framework',
  },
  futon: {
    name: 'Futon',
    short: 'runtime',
    color: 'var(--layer-futon)',
    tagline: 'The WinterCG-compatible HTTP runtime',
  },
  server: {
    name: 'Rasengan Server',
    short: 'backend',
    color: 'var(--layer-server)',
    tagline: 'The modular backend framework',
  },
  tooling: {
    name: 'Tooling',
    short: 'tooling',
    color: 'var(--muted-foreground)',
    tagline: 'CLIs and deploy adapters',
  },
};

export type PackageStatus = 'stable' | 'beta';

/** One row of the landing page package registry. */
export type EcosystemPackage = {
  /** npm package name, shown in monospace. */
  name: string;
  layer: Layer;
  status: PackageStatus;
  description: string;
  /** Docs page (internal path) or npm page (absolute URL) for the package. */
  href: string;
};

/**
 * Every published package, grouped by layer. Internal-only packages
 * (`@rasenganjs/runtime`, `uzubase`, `openapi`) are left out on purpose.
 * Status mirrors the version in each package.json (a prerelease tag = beta).
 */
export const PACKAGES: EcosystemPackage[] = [
  // ── Core layers ─────────────────────────────────────────────
  {
    name: 'rasengan',
    layer: 'rasengan',
    status: 'stable',
    description:
      'Full-stack React framework: SSR, SSG, SPA, file and config routing',
    href: '/docs/getting-started/introduction',
  },
  {
    name: '@rasenganjs/futon',
    layer: 'futon',
    status: 'stable',
    description: 'Fetch-native HTTP runtime with Koa-style middleware',
    href: '/docs/futon/getting-started/introduction',
  },
  {
    name: '@rasenganjs/server',
    layer: 'server',
    status: 'stable',
    description: 'Modules, controllers, providers and scoped DI',
    href: '/docs/server/getting-started/introduction',
  },

  // ── Frontend packages ───────────────────────────────────────
  {
    name: '@rasenganjs/mdx',
    layer: 'rasengan',
    status: 'stable',
    description: 'MDX pages, table of contents and code blocks',
    href: '/packages/mdx',
  },
  {
    name: '@rasenganjs/i18n',
    layer: 'rasengan',
    status: 'stable',
    description: 'Locale-aware routing and translations',
    href: '/packages/i18n',
  },
  {
    name: '@rasenganjs/kurama',
    layer: 'rasengan',
    status: 'stable',
    description: 'Lightweight state management, Zustand-inspired',
    href: '/packages/kurama',
  },
  {
    name: '@rasenganjs/image',
    layer: 'rasengan',
    status: 'stable',
    description: 'Lazy images with blur and wave placeholders',
    href: '/packages/image',
  },
  {
    name: '@rasenganjs/theme',
    layer: 'rasengan',
    status: 'stable',
    description: 'Light, dark and system theme management',
    href: '/packages/theme',
  },
  {
    name: '@rasenganjs/kage-demo',
    layer: 'rasengan',
    status: 'stable',
    description: 'Interactive feature tours and onboarding',
    href: '/packages/kage-demo',
  },
  {
    name: '@rasenganjs/io',
    layer: 'rasengan',
    status: 'beta',
    description: 'Real-time client for WebSocket gateways',
    href: '/packages/io',
  },

  // ── Backend packages ────────────────────────────────────────
  {
    name: '@rasenganjs/ws',
    layer: 'server',
    status: 'beta',
    description: 'WebSocket gateways with rooms and broadcasting',
    href: '/packages/ws',
  },
  {
    name: '@rasenganjs/queue',
    layer: 'server',
    status: 'beta',
    description: 'Background jobs with retries and dead-letter',
    href: '/packages/queue',
  },
  {
    name: '@rasenganjs/drizzle',
    layer: 'server',
    status: 'beta',
    description: 'Drizzle ORM integration for Rasengan Server',
    href: '/packages/drizzle',
  },
  {
    name: '@rasenganjs/validators',
    layer: 'server',
    status: 'beta',
    description: 'Schema validation middleware, Zod adapter included',
    href: '/docs/server/ecosystem/validation-adapters',
  },

  // ── Tooling ─────────────────────────────────────────────────
  {
    name: 'create-rasengan',
    layer: 'tooling',
    status: 'stable',
    description: 'Project scaffolding CLI',
    href: '/packages/create-rasengan',
  },
  {
    name: '@rasenganjs/shuriken',
    layer: 'tooling',
    status: 'stable',
    description: 'Clone Rasengan Hub templates from the command line',
    href: 'https://www.npmjs.com/package/@rasenganjs/shuriken',
  },
  {
    name: '@rasenganjs/serve',
    layer: 'tooling',
    status: 'stable',
    description: 'Production server for built apps',
    href: '/packages/serve',
  },
  {
    name: '@rasenganjs/vercel',
    layer: 'tooling',
    status: 'stable',
    description: 'Vercel adapter, Build Output API v3',
    href: '/packages/vercel',
  },
  {
    name: '@rasenganjs/netlify',
    layer: 'tooling',
    status: 'stable',
    description: 'Netlify adapter',
    href: '/packages/netlify',
  },
  {
    name: '@rasenganjs/cloudflare',
    layer: 'tooling',
    status: 'beta',
    description: 'Cloudflare Workers adapter',
    href: 'https://www.npmjs.com/package/@rasenganjs/cloudflare',
  },
  {
    name: '@rasenganjs/sitemap',
    layer: 'tooling',
    status: 'beta',
    description: 'Sitemap generation at build time',
    href: '/packages/sitemap',
  },
];

/** A command-line entry point shown in the landing "Tooling" strip. */
export type Tool = {
  command: string;
  description: string;
  href: string;
};

export const TOOLS: Tool[] = [
  {
    command: 'npx create-rasengan',
    description:
      'Scaffold an app in TS or JS, with Tailwind and the routing mode you want.',
    href: '/docs/api-reference/create-rasengan-cli',
  },
  {
    command: 'npx shuriken clone',
    description: 'Start a project from a Rasengan Hub template.',
    href: 'https://www.npmjs.com/package/@rasenganjs/shuriken',
  },
  {
    command: 'npx skills add',
    description: 'Teach your coding agent the stack with 18 agent skills.',
    href: '/skills',
  },
  {
    command: 'rasengan-server dev',
    description: 'Run the backend with modules, DI and WebSockets.',
    href: '/docs/server/getting-started/cli',
  },
];

/** First-party products built on Rasengan, shared by the navbar and landing. */
export type Product = {
  name: string;
  kind: string;
  href: string;
};

export const PRODUCTS: Product[] = [
  { name: 'Rasengan UI', kind: 'Components', href: 'https://ui.rasengan.dev' },
  { name: 'Rasengan Hub', kind: 'Templates', href: 'https://hub.rasengan.dev' },
  { name: 'Chidori', kind: 'Framework', href: 'https://chidori.rasengan.dev' },
  { name: 'Nindo', kind: 'Framework', href: 'https://nindo.rasengan.dev' },
  { name: 'Chunin', kind: 'Tool', href: 'https://chunin.rasengan.dev' },
];

/** Where the navbar "Deploy" button sends people. */
export const DEPLOY_URL = 'https://hiraiship.com';
