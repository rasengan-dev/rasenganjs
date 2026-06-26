import type { Middleware } from '@rasenganjs/runtime';
import { Controller } from '../controller/index.js';
import { ProviderDefinition, ProviderLike } from '../di/container.js';

export interface ModuleConfig {
  prefix?: string;
  middlewares?: Middleware[];
  imports?: ModuleConfig[];
  controllers?: (new (...args: any[]) => Controller)[];
  providers?: (ProviderLike | ProviderDefinition)[];
}

export function defineModule(config: ModuleConfig): ModuleConfig {
  return config;
}
