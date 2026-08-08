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
 * A class registrable with the container. Extending `Provider` is what
 * opts a class into lifecycle hooks (`onInit`/`onDestroy`), but any class
 * is a valid provider — gateways and other plugin-declared classes are
 * listed under `providers` to become exportable (RFC-0003), and must not
 * be rejected by the type for lacking lifecycle members.
 */
export type ProviderLike = new (...args: any[]) => any;

/**
 * The resolution surface handed to controllers/plugins during compile —
 * a module-scoped view of the container (see `Container.forModule()`).
 * `Container` itself satisfies it (root scope: sees everything).
 */
export interface ContainerView {
  resolve<T>(token: new (...args: any[]) => T): T;
}

/**
 * A scope owner — in practice a `ModuleConfig` object. The container only
 * uses it as an identity key and, when present, reads `name`/`prefix`
 * for error messages.
 */
type ScopeOwner = { name?: string; prefix?: string } & object;

/**
 * Lightweight dependency-injection container with module-scoped
 * visibility (RFC-0003).
 *
 * Supports:
 * - Class-based registration (auto-resolved constructor parameters)
 * - Value-based registration (`useValue`)
 * - Class aliasing (`useClass`)
 * - Explicit dependency lists (`deps`)
 * - Name-based resolution (case-insensitive matching)
 * - Module scoping — a token registered with an owner is only visible to
 *   that owner's scope and to scopes whose visible set includes it
 *   (computed by `ServerApp.compile()` from `imports`/`exports`/`global`)
 * - Lifecycle hooks — `onInit()` on all resolved providers after
 *   compilation, `onDestroy()` in reverse order on graceful shutdown
 *
 * Scoping model: ONE registry and ONE instance per token (singletons are
 * shared by every module that can see them); visibility is a filter on
 * top, never a second cache. A provider's own constructor dependencies
 * always resolve in the scope of the module that OWNS the provider, so a
 * shared singleton behaves identically no matter which module triggered
 * its construction.
 *
 * @example
 * ```ts
 * const container = new Container();
 * container.register(MyService, userModule);
 * container.setScope(userModule, new Set([MyService]));
 * const svc = container.forModule(userModule).resolve(MyService);
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

  /** Token → the module that declared it. Absent = root-owned (visible everywhere). */
  private owners = new Map<any, ScopeOwner>();

  /** Module → tokens visible to it (own + imported exports + global exports). */
  private scopes = new Map<ScopeOwner, Set<any>>();

  /**
   * Track all resolved Provider instances that implement lifecycle hooks.
   * Used by `initAll()` (forward order) and `destroyAll()` (reverse order).
   */
  private lifecycleInstances: Provider[] = [];

  /**
   * Entries currently mid-construction, in resolution order. `instantiate()`
   * pushes before constructing and pops in a `finally` — re-entering the
   * same entry while it's on this stack means a provider (transitively)
   * depends on itself, caught here instead of overflowing the call stack.
   */
  private resolutionStack: Array<{ entry: object; name: string }> = [];

  /**
   * Register a provider or provider definition with the container.
   *
   * @param provider - A class constructor extending `Provider`, or a
   *                   `ProviderDefinition` object with `provide` token.
   * @param owner - The module declaring this provider. Omitted = root
   *                scope (visible to every module) — used by tests and
   *                programmatic setups that skip modules entirely.
   * @throws If `token` is already owned by a DIFFERENT module — the same
   *         class declared as a provider in two modules is always a
   *         mistake (RFC-0003: a provider belongs to exactly one module;
   *         share it via that module's `exports` instead). Re-registering
   *         under the SAME owner is allowed (idempotent).
   */
  register(
    provider: ProviderLike | ProviderDefinition,
    owner?: ScopeOwner
  ): void {
    const token = typeof provider === 'function' ? provider : provider.provide;

    const existingOwner = this.owners.get(token);
    if (owner && existingOwner && existingOwner !== owner) {
      const name = typeof token === 'function' ? token.name : `"${token}"`;
      throw new Error(
        `[rasengan-server] ${name} is already registered by ` +
          `${this.describeModule(existingOwner)}. A provider can only belong ` +
          `to one module — add it to that module's \`exports\` and import it ` +
          `from here instead of declaring it twice.`
      );
    }

    if (typeof provider === 'function') {
      this.registry.set(provider, {});
    } else {
      this.registry.set(provider.provide, {
        useClass: provider.useClass ?? provider.provide,
        useValue: provider.useValue,
        deps: provider.deps,
      });
    }
    if (owner) {
      this.owners.set(token, owner);
    } else {
      this.owners.delete(token);
    }
  }

  /**
   * Set the visible-token set for a module. Computed once by
   * `ServerApp.compile()` after every module's providers are registered.
   */
  setScope(owner: ScopeOwner, visible: Set<any>): void {
    this.scopes.set(owner, visible);
  }

  /**
   * A resolution view bound to `owner`'s scope — same `resolve()` shape,
   * used for controllers, plugin dispatch (`ModulePlugin.register`) and
   * the eager resolution pass.
   */
  forModule(owner: ScopeOwner): ContainerView {
    return {
      resolve: <T>(token: new (...args: any[]) => T): T =>
        this.resolveScoped(token, owner) as T,
    };
  }

  /**
   * Resolve a dependency by its token in the ROOT scope (sees every
   * registration). Module-scoped code resolves through `forModule()`.
   */
  resolve<T>(token: new (...args: any[]) => T): T {
    return this.resolveScoped(token, undefined) as T;
  }

  private resolveScoped(token: any, scope: ScopeOwner | undefined): any {
    if (typeof token === 'string') {
      return this.resolveByName(token, scope);
    }
    return this.resolveByClass(token, scope);
  }

  /**
   * Call `onInit()` on every resolved provider that implements it.
   * Invoked in registration order after the application is compiled.
   */
  async initAll(): Promise<void> {
    for (const instance of this.lifecycleInstances) {
      await instance.onInit?.();
    }
  }

  /**
   * Call `onDestroy()` on every resolved provider that implements it.
   * Invoked in reverse registration order on graceful shutdown.
   */
  async destroyAll(): Promise<void> {
    for (const instance of this.lifecycleInstances.reverse()) {
      await instance.onDestroy?.();
    }
  }

  // ── Visibility ─────────────────────────────────────────────────────

  /**
   * Whether `scope` may resolve `token`. Root scope (undefined) and
   * root-owned tokens (no owner) are always visible. Ownership is also
   * checked directly so classes auto-registered AFTER scopes were
   * computed (controllers, plugin-resolved gateways) stay visible to
   * their own module.
   */
  private isVisible(token: any, scope: ScopeOwner | undefined): boolean {
    if (!scope) return true;
    const owner = this.owners.get(token);
    if (!owner || owner === scope) return true;
    return this.scopes.get(scope)?.has(token) ?? false;
  }

  private describeModule(owner: ScopeOwner | undefined): string {
    if (!owner) return 'the root scope';
    if (owner.name) return `module "${owner.name}"`;
    if (owner.prefix) return `the module with prefix "${owner.prefix}"`;
    return 'an unnamed module';
  }

  // ── Resolution ─────────────────────────────────────────────────────

  /**
   * Resolve a dependency by its class constructor.
   *
   * An unregistered class is auto-registered as a PRIVATE provider owned
   * by the resolving scope, then cached — this is how controllers and
   * plugin-resolved classes (gateways, queues) become singletons without
   * appearing in `providers`. Name-based resolution never auto-creates.
   */
  private resolveByClass(token: any, scope: ScopeOwner | undefined): any {
    const entry = this.registry.get(token);
    if (entry) {
      if (!this.isVisible(token, scope)) {
        throw new Error(this.visibilityError(token.name, token, scope));
      }
      return this.instantiate(entry, token, this.owners.get(token) ?? scope);
    }

    // Match by class name for same-named tokens registered under aliases.
    for (const [key, value] of this.registry) {
      if (
        typeof key === 'function' &&
        key.name === token.name &&
        this.isVisible(key, scope)
      ) {
        return this.instantiate(value, token, this.owners.get(key) ?? scope);
      }
    }

    // Auto-register: private to the resolving scope, cached as a singleton.
    this.register(token, scope);
    return this.instantiate(this.registry.get(token)!, token, scope);
  }

  /**
   * Resolve a dependency by its name (string-based lookup, used for
   * constructor parameter auto-wiring). Matches case-insensitively
   * against registered class names or string keys — own providers first
   * (unambiguous by construction: a scope has at most one provider per
   * name), then the rest of the visible set.
   *
   * @throws A directed error when the name exists but isn't visible from
   *         `scope`, when two DIFFERENT visible (non-owned) providers
   *         share the name — ambiguous, no implicit winner — or when it
   *         doesn't exist at all.
   */
  private resolveByName(name: string, scope: ScopeOwner | undefined): any {
    const matches = (key: any) =>
      typeof key === 'function'
        ? key.name.toLowerCase() === name.toLowerCase()
        : key === name;

    // Own pass — the scope's own provider always wins, unambiguously.
    for (const [key, entry] of this.registry) {
      if (!matches(key) || !this.isVisible(key, scope)) continue;
      if (scope && this.owners.get(key) === scope) {
        return this.instantiate(
          entry,
          typeof key === 'function' ? key : null,
          scope
        );
      }
    }

    // Non-owned visible pass — collect every match instead of taking the
    // first, so two different imported modules exporting a same-named
    // provider throw instead of silently picking whichever registered
    // first (the exact collision RFC-0003 exists to close).
    const candidates: Array<{ key: any; entry: any }> = [];
    for (const [key, entry] of this.registry) {
      if (!matches(key) || !this.isVisible(key, scope)) continue;
      candidates.push({ key, entry });
    }

    if (candidates.length > 1) {
      const owners = candidates.map((c) =>
        this.describeModule(this.owners.get(c.key))
      );
      throw new Error(
        `[rasengan-server] "${name}" is ambiguous in ${this.describeModule(scope)} ` +
          `— visible from multiple modules (${owners.join(', ')}). Disambiguate ` +
          `with an explicit \`deps: [...]\` entry naming the exact class.`
      );
    }
    if (candidates.length === 1) {
      const { key, entry } = candidates[0];
      const owner = this.owners.get(key);
      return this.instantiate(
        entry,
        typeof key === 'function' ? key : null,
        owner ?? scope
      );
    }

    // Nothing visible — find an invisible match for a directed error.
    for (const key of this.registry.keys()) {
      if (matches(key)) {
        throw new Error(this.visibilityError(name, key, scope));
      }
    }

    const available = [...this.registry.keys()]
      .filter((k) => this.isVisible(k, scope))
      .map((k) => (typeof k === 'function' ? k.name : `"${k}"`))
      .join(', ');
    throw new Error(
      `[rasengan-server] Cannot resolve dependency "${name}" from ` +
        `${this.describeModule(scope)}. Make sure the provider is registered ` +
        `in your module with a matching class name. Hint: constructor ` +
        `parameter "${name}" resolves to a class named ` +
        `"${name.charAt(0).toUpperCase() + name.slice(1)}". ` +
        `Providers visible here: ${available || '(none)'}`
    );
  }

  /** Directed message for "exists, but your module can't see it" (RFC-0003). */
  private visibilityError(
    requested: string,
    token: any,
    scope: ScopeOwner | undefined
  ): string {
    const owner = this.owners.get(token);
    const tokenName = typeof token === 'function' ? token.name : `"${token}"`;
    return (
      `[rasengan-server] ${this.describeModule(scope)} cannot resolve ` +
      `"${requested}". ${tokenName} exists in ${this.describeModule(owner)} ` +
      `but is not visible here — add it to that module's \`exports\` and ` +
      `add that module to this module's \`imports\` (or mark the owning ` +
      `module \`global: true\`).`
    );
  }

  /**
   * Instantiate a provider entry, caching singletons on first resolution.
   *
   * `ownerScope` is the scope the entry's OWN dependencies resolve in —
   * always the owning module (never the requester), so shared singletons
   * are deterministic regardless of who resolves them first.
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
    fallbackToken: any,
    ownerScope: ScopeOwner | undefined
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

    const name = target.name || '(anonymous)';
    const cycleStart = this.resolutionStack.findIndex((f) => f.entry === entry);
    if (cycleStart !== -1) {
      const chain = [
        ...this.resolutionStack.slice(cycleStart).map((f) => f.name),
        name,
      ].join(' → ');
      throw new Error(
        `[rasengan-server] Circular dependency detected: ${chain}`
      );
    }

    this.resolutionStack.push({ entry, name });
    try {
      if (entry.deps) {
        entry.instance = new target(
          ...entry.deps.map((d) => this.resolveScoped(d, ownerScope))
        );
      } else {
        const paramNames = getConstructorParamNames(target);
        if (paramNames.length > 0) {
          entry.instance = new target(
            ...paramNames.map((n) => this.resolveByName(n, ownerScope))
          );
        } else {
          entry.instance = new target();
        }
      }
    } finally {
      this.resolutionStack.pop();
    }

    if (entry.instance instanceof Provider) {
      this.lifecycleInstances.push(entry.instance);
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
