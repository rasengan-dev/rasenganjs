import { Provider } from './provider.js';

/**
 * Describes how a dependency should be provided to the container.
 *
 * @example
 * ```ts
 * // Provide a pre-configured value
 * { provide: ConfigToken, useValue: { dbUrl: '...' } }
 *
 * // Provide a class to instantiate (optionally with explicit deps)
 * { provide: Logger, useClass: FileLogger, deps: [ConfigToken] }
 * ```
 */
export interface ProviderDefinition {
  /** Injection token (class constructor or string key). */
  provide: any;
  /**
   * Class to instantiate when the token is resolved.
   * Defaults to `provide` itself if omitted.
   */
  useClass?: new (...args: any[]) => any;
  /** Static value to return when the token is resolved. */
  useValue?: any;
  /** Explicit dependency tokens (used as constructor arguments). */
  deps?: any[];
}

/**
 * A class that extends `Provider` and can be registered with the container.
 */
export type ProviderLike = new (...args: any[]) => Provider;

/**
 * Lightweight dependency-injection container.
 *
 * Supports:
 * - Class-based registration (auto-resolved constructor parameters)
 * - Value-based registration (`useValue`)
 * - Class aliasing (`useClass`)
 * - Explicit dependency lists (`deps`)
 * - Name-based resolution (case-insensitive matching)
 *
 * @example
 * ```ts
 * const container = new Container();
 * container.register(MyService);
 * container.register({ provide: Logger, useValue: console });
 * const svc = container.resolve(MyService);
 * ```
 */
export class Container {
  /**
   * Internal registry mapping tokens to their resolved or pending metadata.
   */
  private registry = new Map<
    any,
    {
      instance?: any;
      useClass?: new (...args: any[]) => any;
      useValue?: any;
      deps?: any[];
    }
  >();

  /**
   * Register a provider or provider definition with the container.
   *
   * @param provider - A class constructor extending `Provider`, or a
   *                   `ProviderDefinition` object with `provide` token.
   */
  register(provider: ProviderLike | ProviderDefinition): void {
    if (typeof provider === 'function') {
      this.registry.set(provider, {});
      return;
    }
    this.registry.set(provider.provide, {
      useClass: provider.useClass ?? provider.provide,
      useValue: provider.useValue,
      deps: provider.deps,
    });
  }

  /**
   * Resolve a dependency by its token.
   *
   * The token can be a class constructor (resolved by name or identity)
   * or a string (resolved by name, case-insensitive).
   *
   * @param token - The injection token to resolve.
   * @returns The instantiated or provided value.
   */
  resolve<T>(token: new (...args: any[]) => T): T {
    if (typeof token === 'string') {
      return this.resolveByName(token) as T;
    }
    return this.resolveByClass(token) as T;
  }

  /**
   * Resolve a dependency by its class constructor.
   * Falls back to auto-instantiation if the class was never explicitly registered.
   */
  private resolveByClass(token: any): any {
    const entry = this.registry.get(token);
    if (!entry) {
      for (const [key, val] of this.registry) {
        if (typeof key === 'function' && key.name === token.name) {
          return this.instantiate(val, token);
        }
      }
      return this.instantiate({}, token);
    }
    return this.instantiate(entry, token);
  }

  /**
   * Resolve a dependency by its name (string-based lookup).
   * Matches case-insensitively against registered class names or string keys.
   *
   * @throws If no matching provider is found, with suggestions from available tokens.
   */
  private resolveByName(name: string): any {
    for (const [key, val] of this.registry) {
      if (
        typeof key === 'function' &&
        key.name.toLowerCase() === name.toLowerCase()
      ) {
        return this.instantiate(val, key);
      }
      if (typeof key === 'string' && key === name) {
        return this.instantiate(val, null);
      }
    }
    const available = [...this.registry.keys()]
      .map((k) => (typeof k === 'function' ? k.name : `"${k}"`))
      .join(', ');
    throw new Error(
      `[rasengan-server] Cannot resolve dependency "${name}". ` +
        `Make sure the provider is registered in your module with ` +
        `a matching class name. Hint: constructor parameter "${name}" ` +
        `resolves to a class named "${name.charAt(0).toUpperCase() + name.slice(1)}". ` +
        `Available providers: ${available || '(none)'}`
    );
  }

  /**
   * Instantiate a provider entry, caching singletons on first resolution.
   *
   * Resolution priority:
   * 1. Return cached instance if already resolved.
   * 2. Return `useValue` if provided.
   * 3. Construct `useClass` (or `fallbackToken`) with explicit `deps`.
   * 4. Construct with auto-detected constructor parameter names.
   * 5. Construct with no arguments.
   */
  private instantiate(
    entry: {
      instance?: any;
      useClass?: any;
      useValue?: any;
      deps?: any[];
    },
    fallbackToken?: any
  ): any {
    if (entry.instance !== undefined) return entry.instance;

    if ('useValue' in entry && entry.useValue !== undefined) {
      return entry.useValue;
    }

    const target = entry.useClass || fallbackToken;
    if (!target)
      throw new Error(
        `[rasengan-server] No class to instantiate for provider entry. ` +
          `Use \`useClass\` or register a constructor function.`
      );

    if (entry.deps) {
      entry.instance = new target(...entry.deps.map((d) => this.resolve(d)));
    } else {
      const paramNames = getConstructorParamNames(target);
      if (paramNames.length > 0) {
        entry.instance = new target(
          ...paramNames.map((n) => this.resolveByName(n))
        );
      } else {
        entry.instance = new target();
      }
    }

    return entry.instance;
  }
}

/**
 * Extract constructor parameter names from a function's source code.
 *
 * Strips comments and type annotations, returning only the parameter
 * identifiers in declaration order. Used by the container for
 * auto-wiring when no explicit `deps` are provided.
 *
 * @param fn - The constructor function to inspect.
 * @returns An array of parameter name strings.
 *
 * @internal
 */
function getConstructorParamNames(fn: Function): string[] {
  const src = fn
    .toString()
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\/\/.*$/gm, '');
  const match = src.match(/constructor\s*\(([^)]*)\)/);
  if (!match) return [];
  return match[1]
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => s.split(/[:=]/)[0].trim())
    .filter(Boolean);
}
