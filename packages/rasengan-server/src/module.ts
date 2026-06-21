import { Controller } from './controller/index.js';
import { ProviderDefinition, ProviderLike } from './container.js';

export interface ModuleConfig {
  prefix?: string;
  imports?: ModuleConfig[];
  controllers?: (new (...args: any[]) => Controller)[];
  providers?: (ProviderLike | ProviderDefinition)[];
}

export function defineModule(config: ModuleConfig): ModuleConfig {
  return config;
}
