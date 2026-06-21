import type { RuntimeAdapter, Application } from '@rasenganjs/runtime';
import type { ServeOptions } from '@rasenganjs/runtime';

export interface AdapterOptions {
  port?: number;
  host?: string;
  preset?: 'node' | 'bun' | 'workerd';
  production?: boolean;
}

async function importPkg(
  name: string
): Promise<Record<string, new (...args: any[]) => RuntimeAdapter>> {
  return import(name);
}

export async function selectAdapter(
  options: AdapterOptions
): Promise<RuntimeAdapter> {
  if (options.production) {
    return loadProdAdapter(options);
  }
  return detectDevAdapter(options);
}

async function detectDevAdapter(
  options: AdapterOptions
): Promise<RuntimeAdapter> {
  try {
    const isBun =
      typeof process !== 'undefined' &&
      typeof (process as any).versions !== 'undefined' &&
      (process as any).versions.bun;
    if (isBun) {
      const mod = await importPkg('@rasenganjs/runtime-bun');
      return new mod.BunDevAdapter({
        port: options.port,
        host: options.host,
      });
    }
  } catch {
    // not Bun
  }

  const mod = await importPkg('@rasenganjs/runtime-node');
  return new mod.NodeDevAdapter({ port: options.port, host: options.host });
}

async function loadProdAdapter(
  options: AdapterOptions
): Promise<RuntimeAdapter> {
  switch (options.preset) {
    case 'bun': {
      const mod = await importPkg('@rasenganjs/runtime-bun');
      return new mod.BunProdAdapter({
        port: options.port,
        host: options.host,
      });
    }
    case 'workerd': {
      const mod = await importPkg('@rasenganjs/runtime-workerd');
      return new mod.WorkerdProdAdapter();
    }
    default: {
      const mod = await importPkg('@rasenganjs/runtime-node');
      return new mod.NodeProdAdapter({
        port: options.port,
        host: options.host,
      });
    }
  }
}
