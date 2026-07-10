import { describe, it, expect, vi } from 'vitest';
import { GatewayRouter } from '../gateway.js';

describe('GatewayRouter', () => {
  it('registers and exposes handlers by event name', () => {
    const router = new GatewayRouter();
    const handler = vi.fn();

    router.on('sendMessage', handler);

    expect(router.getHandlers().get('sendMessage')).toBe(handler);
  });

  it('throws when the same event is registered twice', () => {
    const router = new GatewayRouter();
    router.on('sendMessage', vi.fn());

    expect(() => router.on('sendMessage', vi.fn())).toThrow(
      /already registered/
    );
  });

  it('supports multiple distinct events', () => {
    const router = new GatewayRouter();
    router.on('join', vi.fn());
    router.on('leave', vi.fn());

    expect(router.getHandlers().size).toBe(2);
  });
});
