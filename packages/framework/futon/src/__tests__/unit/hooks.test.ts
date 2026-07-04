import { describe, it, expect, vi } from 'vitest';
import { HookSystem } from '../../hooks/index.js';

describe('HookSystem', () => {
  it('registers and fires a handler', () => {
    const hooks = new HookSystem();
    const handler = vi.fn();
    hooks.on('beforeRequest', handler);
    hooks.emit('beforeRequest', 'ctx');
    expect(handler).toHaveBeenCalledWith('ctx');
  });

  it('fires multiple handlers in registration order', () => {
    const hooks = new HookSystem();
    const order: number[] = [];
    hooks.on('beforeRequest', () => order.push(1));
    hooks.on('beforeRequest', () => order.push(2));
    hooks.emit('beforeRequest');
    expect(order).toEqual([1, 2]);
  });

  it('fires handlers for afterResponse hook', () => {
    const hooks = new HookSystem();
    const handler = vi.fn();
    hooks.on('afterResponse', handler);
    hooks.emit('afterResponse', 'ctx', new Response());
    expect(handler).toHaveBeenCalledWith('ctx', expect.any(Response));
  });

  it('fires handlers for onError hook', () => {
    const hooks = new HookSystem();
    const handler = vi.fn();
    hooks.on('onError', handler);
    hooks.emit('onError', new Error('boom'), 'ctx');
    expect(handler).toHaveBeenCalledWith(expect.any(Error), 'ctx');
  });

  it('off() removes a handler', () => {
    const hooks = new HookSystem();
    const handler = vi.fn();
    hooks.on('beforeRequest', handler);
    hooks.off('beforeRequest', handler);
    hooks.emit('beforeRequest');
    expect(handler).not.toHaveBeenCalled();
  });

  it('awaits async handlers', async () => {
    const hooks = new HookSystem();
    let done = false;
    hooks.on('beforeRequest', async () => {
      await new Promise((r) => setTimeout(r, 5));
      done = true;
    });
    await hooks.emit('beforeRequest');
    expect(done).toBe(true);
  });

  it('swallows errors thrown by handlers', async () => {
    const hooks = new HookSystem();
    hooks.on('beforeRequest', () => {
      throw new Error('hook error');
    });
    const second = vi.fn();
    hooks.on('beforeRequest', second);

    await expect(hooks.emit('beforeRequest')).resolves.not.toThrow();
    expect(second).toHaveBeenCalled();
  });

  it('does nothing for unknown hook names', async () => {
    const hooks = new HookSystem();
    await expect(hooks.emit('beforeRequest' as never)).resolves.not.toThrow();
  });

  it('clear() removes all handlers', () => {
    const hooks = new HookSystem();
    const handler = vi.fn();
    hooks.on('beforeRequest', handler);
    hooks.on('afterResponse', handler);
    hooks.clear();
    hooks.emit('beforeRequest');
    hooks.emit('afterResponse');
    expect(handler).not.toHaveBeenCalled();
  });
});
