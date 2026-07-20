import type { BuildSummary, ModuleSummary } from '../server/app.js';
import {
  red,
  green,
  yellow,
  blue,
  magenta,
  cyan,
  gray,
  bold,
} from './color.js';

/** Per-HTTP-method color, matching common REST-client convention. */
const METHOD_COLOR: Record<string, (s: string) => string> = {
  GET: blue,
  POST: green,
  PUT: yellow,
  PATCH: magenta,
  DELETE: red,
};

function colorMethod(method: string): string {
  const color = METHOD_COLOR[method] ?? cyan;
  return color(method.padEnd(6));
}

/**
 * Human-readable label for a plugin extension key, e.g. `"gateways"` →
 * `"Gateways"`. Purely cosmetic — core still never hardcodes what a
 * "gateway" is; it only knows the key a module declared.
 */
function labelFor(key: string): string {
  return key.charAt(0).toUpperCase() + key.slice(1);
}

function printModule(mod: ModuleSummary): void {
  const header = mod.prefix
    ? `${bold(mod.name)} ${gray(`(prefix: ${mod.prefix})`)}`
    : bold(mod.name);
  console.log(`${gray('▸')} ${header}`);

  for (const route of mod.routes) {
    console.log(`    ${colorMethod(route.method)} ${route.path}`);
  }

  if (mod.providers.length > 0) {
    console.log(`    ${gray('Providers:')}   ${mod.providers.join(', ')}`);
  }

  for (const [key, names] of Object.entries(mod.pluginGroups)) {
    if (names.length === 0) continue;
    console.log(`    ${gray(labelFor(key) + ':')}   ${names.join(', ')}`);
  }

  if (mod.middlewareCount > 0) {
    console.log(`    ${gray('Middleware:')}  ${mod.middlewareCount}`);
  }

  console.log('');
}

/**
 * Print the colored, per-module build/boot summary: routes, providers,
 * and plugin-declared classes (gateways, etc.), followed by a one-line
 * total with the module/route counts and `compile()`'s wall-clock time.
 *
 * Used both by `cli/build.ts`'s dry-run (build-time) and `bootstrap()`
 * (real boot — `dev` and `start`), so the two never drift apart.
 */
function isEmpty(mod: ModuleSummary): boolean {
  return (
    mod.routes.length === 0 &&
    mod.providers.length === 0 &&
    mod.middlewareCount === 0 &&
    Object.values(mod.pluginGroups).every((names) => names.length === 0)
  );
}

export function printBuildSummary(summary: BuildSummary): void {
  console.log('');

  // A pure "glue" module (only `imports`, e.g. a root AppModule) has
  // nothing of its own to show — printing an empty block would just be
  // noise.
  const nonEmpty = summary.modules.filter((mod) => !isEmpty(mod));
  for (const mod of nonEmpty) {
    printModule(mod);
  }

  const routeCount = summary.modules.reduce(
    (sum, mod) => sum + mod.routes.length,
    0
  );
  const moduleWord = summary.modules.length === 1 ? 'module' : 'modules';
  const routeWord = routeCount === 1 ? 'route' : 'routes';

  console.log(
    `${green('✓')} Compiled ${bold(String(summary.modules.length))} ${moduleWord} ` +
      `${gray('·')} ${bold(String(routeCount))} ${routeWord} ` +
      `${gray('in')} ${bold(`${summary.durationMs.toFixed(1)}ms`)}`
  );
  console.log('');
}
