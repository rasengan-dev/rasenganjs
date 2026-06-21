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
    throw new Error(`Cannot resolve dependency "${name}"`);
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
    if (!target) throw new Error('No class to instantiate');

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
