import { describe, it, expect, vi } from 'vitest';
import { MemoryGatewayAdapter } from '../adapters/memory.js';

describe('MemoryGatewayAdapter', () => {
  it('delivers a published message to subscribers on the same channel', async () => {
    const adapter = new MemoryGatewayAdapter();
    const onMessage = vi.fn();

    adapter.subscribe('/chat', onMessage);
    await adapter.publish('/chat', { event: 'hello', data: { text: 'hi' } });

    expect(onMessage).toHaveBeenCalledWith({
      event: 'hello',
      data: { text: 'hi' },
    });
  });

  it('does not deliver across different channels', async () => {
    const adapter = new MemoryGatewayAdapter();
    const onChat = vi.fn();
    const onNotifications = vi.fn();

    adapter.subscribe('/chat', onChat);
    adapter.subscribe('/notifications', onNotifications);

    await adapter.publish('/chat', { event: 'hello', data: null });

    expect(onChat).toHaveBeenCalledTimes(1);
    expect(onNotifications).not.toHaveBeenCalled();
  });

  it('fans out to every subscriber on the same channel', async () => {
    const adapter = new MemoryGatewayAdapter();
    const first = vi.fn();
    const second = vi.fn();

    adapter.subscribe('/chat', first);
    adapter.subscribe('/chat', second);

    await adapter.publish('/chat', { event: 'hello', data: null });

    expect(first).toHaveBeenCalledTimes(1);
    expect(second).toHaveBeenCalledTimes(1);
  });

  it('stops delivering after unsubscribe', async () => {
    const adapter = new MemoryGatewayAdapter();
    const onMessage = vi.fn();

    const unsubscribe = adapter.subscribe('/chat', onMessage);
    unsubscribe();

    await adapter.publish('/chat', { event: 'hello', data: null });

    expect(onMessage).not.toHaveBeenCalled();
  });

  it('publishing to a channel with no subscribers is a silent no-op', async () => {
    const adapter = new MemoryGatewayAdapter();
    await expect(
      adapter.publish('/chat', { event: 'hello', data: null })
    ).resolves.toBeUndefined();
  });
});
