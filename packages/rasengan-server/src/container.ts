import { Provider } from './provider/index.js';

export interface ProviderDefinition {
  provide: any;
  useClass?: new (...args: any[]) => any;
  useValue?: any;
  deps?: any[];
}

export type ProviderLike = new (...args: any[]) => Provider;

export class Container {
  private registry = new Map<
    any,
    {
      instance?: any;
      useClass?: new (...args: any[]) => any;
      useValue?: any;
      deps?: any[];
    }
  >();

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

  resolve<T>(token: new (...args: any[]) => T): T {
    if (typeof token === 'string') {
      return this.resolveByName(token) as T;
    }
    return this.resolveByClass(token) as T;
  }

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
