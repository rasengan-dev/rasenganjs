import type { RuntimeAdapter } from '@rasenganjs/runtime';

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
      try {
        const mod = await importPkg('@rasenganjs/runtime-bun');
        return new mod.BunDevAdapter({
          port: options.port,
          host: options.host,
        });
      } catch {
        console.error(
          `[rasengan-server] Cannot load @rasenganjs/runtime-bun adapter. ` +
            `Make sure the package is installed: \`npm install @rasenganjs/runtime-bun\``
        );
        console.log(
          '[rasengan-server] Bun runtime detected but package not installed'
        );
      }
    }
  } catch {
    console.log('[rasengan-server] Bun runtime detection failed');
  }

  try {
    const mod = await importPkg('@rasenganjs/runtime-node');
    return new mod.NodeDevAdapter({ port: options.port, host: options.host });
  } catch {
    throw new Error(
      `[rasengan-server] Cannot load @rasenganjs/runtime-node adapter. ` +
        `Make sure the package is installed: \`npm install @rasenganjs/runtime-node\``
    );
  }
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
