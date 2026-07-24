/**
 * @module DI — dependency-injection container
 *
 * Lightweight IoC container with class-based and value-based resolution,
 * auto-wiring via constructor parameter names, singleton caching, and
 * lifecycle hooks (`onInit` / `onDestroy`).
 */

export { Container } from './container.js';
export type { ProviderDefinition, ProviderLike } from './container.js';
export { Provider } from './provider.js';
