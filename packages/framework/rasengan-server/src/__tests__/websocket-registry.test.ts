import { describe, it, expect } from 'vitest';
import { WebSocketRegistry } from '../websocket/registry.js';
import type { WebSocketHandlers } from '../websocket/types.js';

describe('WebSocketRegistry', () => {
  it('registers and matches a static path', () => {
    const registry = new WebSocketRegistry();
    const handlers: WebSocketHandlers = { open: () => {} };

    registry.register('/chat', handlers);

    expect(registry.match('/chat')).toBe(handlers);
  });

  it('returns undefined for an unregistered path', () => {
    const registry = new WebSocketRegistry();
    registry.register('/chat', {});

    expect(registry.match('/nope')).toBeUndefined();
  });

  it('normalises trailing slashes for both register and match', () => {
    const registry = new WebSocketRegistry();
    const handlers: WebSocketHandlers = {};

    registry.register('/chat/', handlers);

    expect(registry.match('/chat')).toBe(handlers);
    expect(registry.match('/chat/')).toBe(handlers);
  });

  it('preserves the root path "/"', () => {
    const registry = new WebSocketRegistry();
    const handlers: WebSocketHandlers = {};

    registry.register('/', handlers);

    expect(registry.match('/')).toBe(handlers);
  });

  it('throws when the same path is registered twice', () => {
    const registry = new WebSocketRegistry();
    registry.register('/chat', {});

    expect(() => registry.register('/chat', {})).toThrow(/already registered/);
  });

  it('reports isEmpty correctly', () => {
    const registry = new WebSocketRegistry();
    expect(registry.isEmpty).toBe(true);

    registry.register('/chat', {});
    expect(registry.isEmpty).toBe(false);
  });
});
